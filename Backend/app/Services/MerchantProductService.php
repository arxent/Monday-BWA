<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\MerchantProductRepository;
use App\Repositories\MerchantRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class MerchantProductService
{
    private MerchantRepository $merchantRepository;
    private MerchantProductRepository $merchantProductRepository;

    public function __construct(
        MerchantRepository $merchantRepository,
        MerchantProductRepository $merchantProductRepository
    ) {
        $this->merchantRepository = $merchantRepository;
        $this->merchantProductRepository = $merchantProductRepository;
    }

    public function assignProductToMerchant(array $data)
    {
        return DB::transaction(function () use ($data) {
            $existingProduct = $this->merchantProductRepository->getByMerchantAndProduct(
                $data['merchant_id'],
                $data['product_id']
            );

            if ($existingProduct) {
                throw ValidationException::withMessages([
                    'product' => ['Product already exists in this merchant.']
                ]);
            }

            // Get stock from table `products`
            $product = Product::findOrFail($data['product_id']);

            if ($product->stock < $data['stock']) {
                throw ValidationException::withMessages([
                    'stock' => ['Not enough stock in master product.']
                ]);
            }

            // Create merchant product
            $assigned = $this->merchantProductRepository->create([
                'merchant_id' => $data['merchant_id'],
                'product_id' => $data['product_id'],
                'stock' => $data['stock']
            ]);

            // Reduce master stock
            $product->decrement('stock', $data['stock']);

            return $assigned;
        });
    }

    public function updateStock(int $merchantId, int $productId, int $newStock)
    {
        return DB::transaction(function () use ($merchantId, $productId, $newStock) {
            $existing = $this->merchantProductRepository->getByMerchantAndProduct($merchantId, $productId);

            if (!$existing) {
                throw ValidationException::withMessages([
                    'product' => ['Product not assigned to this merchant.']
                ]);
            }

            return $this->merchantProductRepository->updateStock($merchantId, $productId, $newStock);
        });
    }

    public function removeProductFromMerchant(int $merchantId, int $productId)
    {
        $merchant = $this->merchantRepository->getById($merchantId, $fields ?? ['*']);

        if (!$merchant) {
            throw ValidationException::withMessages([
                'product' => ['Merchant not found.']
            ]);
        }

        $exists = $this->merchantProductRepository->getByMerchantAndProduct($merchantId, $productId);

        if (!$exists) {
            throw ValidationException::withMessages([
                'product' => ['Product not assigned to this merchant.']
            ]);
        }

        $merchant->products()->detach($productId);
    }
}
