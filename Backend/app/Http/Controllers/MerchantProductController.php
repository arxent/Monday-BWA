<?php

namespace App\Http\Controllers;

use App\Http\Requests\MerchantProductRequest;
use App\Http\Requests\MerchantProductUpdateRequest;
use App\Services\MerchantProductService;
use App\Services\MerchantService;
use Illuminate\Http\Request;

class MerchantProductController extends Controller
{
    //

    private MerchantProductService $merchantProductService;
    private MerchantService $merchantService;

    public function __construct(MerchantProductService $merchantProductService, MerchantService $merchantService,)
    {
        $this->merchantService = $merchantService;
        $this->merchantProductService = $merchantProductService;
    }

    public function store(MerchantProductRequest $request, int $merchantId)
    {
        $this->merchantProductService->assignProductToMerchant([
            'merchant_id' => $merchantId,
            'product_id' => $request->product_id,
            'stock' => $request->stock
        ]);

        return response()->json(['message' => 'Product assigned to merchant successfully']);
    }

    public function update(MerchantProductUpdateRequest $request, int $merchantId, int $productId)
    {
        $this->merchantProductService->updateStock($merchantId, $productId, $request->stock);

        return response()->json(['message' => 'Stock updated successfully']);
    }

    public function destroy(int $merchant, int $product)
    {
        $this->merchantProductService->removeProductFromMerchant($merchant, $product);

        return response()->json([
            'message' => 'Product detached from merchant successfully',
        ]);
    }

}
