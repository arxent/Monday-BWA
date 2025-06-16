<?php

namespace App\Repositories;

use App\Models\MerchantProduct;
use Illuminate\Validation\ValidationException;

class MerchantProductRepository
{

    public function create(array $data)
    {
        return MerchantProduct::create($data);
    }

    public function getByMerchantAndProduct(int $merchantId, int $productId)
    {
        return MerchantProduct::where('merchant_id', $merchantId)
            ->where('product_id', $productId)
            ->first();
    }

    public function updateStock(int $merchantId, int $productId, int $stock)
    {
        $merchantProduct = $this->getByMerchantAndProduct($merchantId, $productId);

        if (!$merchantProduct) {
            throw ValidationException::withMessages([
                'product_id' => ['Product not found for this merchant.']
            ]);
        }

        $merchantProduct->update(['stock' => $stock]);

        return $merchantProduct;
    }

}
