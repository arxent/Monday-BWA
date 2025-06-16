<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserService
{

    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll(array $fields)
    {
        return $this->userRepository->getAll($fields);
    }

    public function getById(int $id, array $fields)
    {
        return $this->userRepository->getById($id, $fields ?? ['*']);
    }

    public function create(array $data)
    {
        $data['password'] = bcrypt($data['password']); // 123password -> 1230912!@#!212uqkwqje1k2j32 -> 123password

        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $data['photo'] = $this->uploadPhoto($data['photo']);
        }

        return $this->userRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        $fields = ['*'];
        $user = $this->userRepository->getById($id, $fields);

        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            if (!empty($user->photo)) {
                $this->deletePhoto($user->photo);
            }
            $data['photo'] = $this->uploadPhoto($data['photo']);
        }

        return $this->userRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        $fields = ['*'];
        $user = $this->userRepository->getById($id, $fields);

        if ($user->photo) {
            $this->deletePhoto($user->photo);
        }

        $this->userRepository->delete($id);
    }

    private function uploadPhoto(UploadedFile $photo)
    {
        return $photo->store('users', 'public');
    }

    private function deletePhoto(string $photoPath)
    {
        $relativePath = 'users/' . basename($photoPath);
        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
    }


}
