<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{

    public function getAll(array $fields)
    {
        return Product::select($fields)->with(['category'])->latest()->paginate(50);
    }

    public function getById(int $id, array $fields)
    {
        return Product::select($fields)->with(['category'])->findOrFail($id);
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function update(int $id, array $data)
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function delete(int $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
    }

}
