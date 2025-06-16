<?php

namespace App\Repositories;

use App\Models\Merchant;

class MerchantRepository
{

    public function getAll(array $fields)
    {
        return Merchant::select($fields)->with(['keeper', 'products.category'])->latest()->paginate(10);
    }

    public function getById(int $id, array $fields)
    {
        return Merchant::select($fields)->with(['keeper', 'products.category'])->findOrFail($id);
    }

    public function create(array $data)
    {
        return Merchant::create($data);
    }

    public function update(int $id, array $data)
    {
        $merchant = Merchant::findOrFail($id);
        $merchant->update($data);
        return $merchant;
    }

    public function delete(int $id)
    {
        $merchant = Merchant::findOrFail($id);
        $merchant->delete();
    }

    public function getByKeeperId(int $keeperId, array $fields)
    {
        return Merchant::select($fields)
            ->where('keeper_id', $keeperId)
            ->with(['products.category', 'keeper'])
            ->firstOrFail();
    }

}
