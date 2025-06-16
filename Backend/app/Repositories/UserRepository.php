<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{

    public function getAll(array $fields)
    {
        return User::select($fields)->latest()->paginate(50);
    }

    public function getById(int $id, array $fields)
    {
        return User::select($fields)->findOrFail($id);
    }

    public function create(array $data)
    {
        return User::create($data);
    }

    public function update(int $id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function delete(int $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }


}
