<?php

namespace App\Services;

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

    public function __construct
    (
        TransactionRepository $transactionRepository,
        MerchantProductRepository $merchantProductRepository,
        ProductRepository $productRepository,
        MerchantRepository $merchantRepository
    )
    {
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

            $products = [
                // product1, product2 dst...
            ];

            $subTotal = 0;

            foreach ($data['products'] as $productData) {

                $merchantProduct = $this->merchantProductRepository->getByMerchantAndProduct(
                    $data['merchant_id'],
                    $productData['product_id']
                );

                if (!$merchantProduct || $merchantProduct->stock < $productData['quantity']) {
                    throw ValidationException::withMessages([
                        'stock' => ["Insufficient stock for product ID: " . $productData['product_id']]
                    ]);
                }

                $product = $this->productRepository->getById($productData['product_id'], ['price']);

                if (!$product) {
                    throw ValidationException::withMessages([
                        'product_id' => ["Product ID {$productData['product_id']} not found."]
                    ]);
                }

                $price = $product->price;
                $productSubTotal = $productData['quantity'] * $price;
                $subTotal += $productSubTotal;
                // 0 ... + 129000 + 228000 +  ....

                $products[] = [
                    'product_id' => $productData['product_id'],
                    'quantity' => $productData['quantity'],
                    'price' => $price,
                    'sub_total' => $productSubTotal,
                ];

                $newStock = max(0, $merchantProduct->stock - $productData['quantity']);

                $this->merchantProductRepository->updateStock(
                    $data['merchant_id'],
                    $productData['product_id'],
                    $newStock
                );

            }

            $taxTotal = $subTotal * 0.1;
            $grandTotal = $subTotal + $taxTotal;

            $transaction = $this->transactionRepository->create([
                'name' => $data['name'],
                'phone' => $data['phone'],
                'merchant_id' => $data['merchant_id'],
                'sub_total' => $subTotal,
                'tax_total' => $taxTotal,
                'grand_total' => $grandTotal,
            ]);

            $this->transactionRepository->createTransactionProducts($transaction->id, $products);

            return $transaction->fresh();

        });

    }


}
