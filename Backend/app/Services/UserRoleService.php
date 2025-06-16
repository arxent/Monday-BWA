<?php

namespace App\Services;

use App\Repositories\UserRoleRepository;


class UserRoleService
{

    private UserRoleRepository $userRoleRepository;

    public function __construct(UserRoleRepository $userRoleRepository)
    {
        $this->userRoleRepository = $userRoleRepository;
    }

    public function assignRole(int $userId, int $roleId)
    {
        return $this->userRoleRepository->assignRoleToUser($userId, $roleId);
    }

    public function removeRole(int $userId, int $roleId)
    {
        return $this->userRoleRepository->removeRoleFromUser($userId, $roleId);
    }

    public function listUserRoles(int $userId)
    {
        return $this->userRoleRepository->getUserRoles($userId);
    }

}
