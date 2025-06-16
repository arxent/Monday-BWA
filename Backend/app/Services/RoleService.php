<?php

namespace App\Services;

use App\Repositories\RoleRepository;

class RoleService
{

    private RoleRepository $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function getAll(array $fields )
    {
        return $this->roleRepository->getAll($fields);
    }

    public function getById(int $id, array $fields )
    {
        return $this->roleRepository->getById($id, $fields ?? ['*']);
    }

    public function create(array $data)
    {
        return $this->roleRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->roleRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        $this->roleRepository->delete($id);
    }

}
