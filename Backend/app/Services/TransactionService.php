<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\MerchantProduct;
use App\Models\TransactionProduct;
use App\Repositories\TransactionRepository;
use App\Repositories\MerchantProductRepository;
use App\Repositories\ProductRepository;
use App\Repositories\MerchantRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TransactionService
{
    private TransactionRepository $transactionRepository;
    private MerchantProductRepository $merchantProductRepository;
    private ProductRepository $productRepository;
    private MerchantRepository $merchantRepository;

    public function __construct(
        TransactionRepository $transactionRepository,
        MerchantProductRepository $merchantProductRepository,
        ProductRepository $productRepository,
        MerchantRepository $merchantRepository
    ) {
        $this->transactionRepository = $transactionRepository;
        $this->merchantProductRepository = $merchantProductRepository;
        $this->productRepository = $productRepository;
        $this->merchantRepository = $merchantRepository;
    }

    public function getAll(array $fields)
    {
        return $this->transactionRepository->getAll($fields);
    }

    public function getTransactionById(int $id, array $fields)
    {
        $transaction = $this->transactionRepository->getById($id, $fields ?? ['*']);

        if (!$transaction) {
            throw ValidationException::withMessages([
                'transaction_id' => ['Transaction not found.']
            ]);
        }

        return $transaction;
    }

    public function getTransactionsByMerchant(int $merchantId)
    {
        return $this->transactionRepository->getTransactionsByMerchant($merchantId);
    }

    public function createTransaction(array $data)
    {
        return DB::transaction(function () use ($data) {
            $merchant = $this->merchantRepository->getById($data['merchant_id'], ['id', 'keeper_id']);

            if (!$merchant) {
                throw ValidationException::withMessages([
                    'merchant_id' => ['Merchant not found.']
                ]);
            }

            if (Auth::id() !== $merchant->keeper_id) {
                throw ValidationException::withMessages([
                    'authorization' => ['Unauthorized: You can only process transactions for your assigned merchant.']
                ]);
            }

            $transaction = Transaction::create([
                'name' => $data['name'],
                'phone' => $data['phone'],
                'merchant_id' => $data['merchant_id'],
                'sub_total' => 0,
                'tax_total' => 0,
                'grand_total' => 0,
            ]);

            $subTotal = 0;

            foreach ($data['products'] as $item) {
                $merchantProduct = MerchantProduct::where('merchant_id', $data['merchant_id'])
                    ->where('product_id', $item['product_id'])
                    ->first();

                if (!$merchantProduct || $merchantProduct->stock < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'stock' => ["Not enough stock for product ID {$item['product_id']} in this merchant."]
                    ]);
                }

                $price = $merchantProduct->product->price;
                $itemSubtotal = $price * $item['quantity'];
                $subTotal += $itemSubtotal;

                // Simpan detail transaksi
                TransactionProduct::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $price,
                    'sub_total' => $itemSubtotal
                ]);

                // Kurangi stok merchant
                $merchantProduct->decrement('stock', $item['quantity']);
            }

            $tax = $subTotal * 0.1;
            $grandTotal = $subTotal + $tax;

            $transaction->update([
                'sub_total' => $subTotal,
                'tax_total' => $tax,
                'grand_total' => $grandTotal,
            ]);

            return $transaction->fresh(['transactionProducts.product', 'merchant']);
        });
    }
}
