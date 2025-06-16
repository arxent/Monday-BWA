<?php

namespace App\Repositories;

use Spatie\Permission\Models\Role;

class RoleRepository
{

    public function getAll(array $fields)
    {
        return Role::select($fields)->latest()->paginate(50);
    }

    public function getById(int $id, array $fields)
    {
        return Role::select($fields)->findOrFail($id);
    }

    public function create(array $data)
    {
        return Role::create([
            'name' => $data['name'],
            'guard_name' => 'web', // web, sanctum, etc
        ]);
    }

    public function update(int $id, array $data)
    {
        $role = Role::findOrFail($id);
        $role->update($data);
        return $role;
    }

    public function delete(int $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
    }

}
