<?php

namespace App\Services;

use App\Repositories\MerchantRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MerchantService
{

    private MerchantRepository $merchantRepository;

    public function __construct(MerchantRepository $merchantRepository)
    {
        $this->merchantRepository = $merchantRepository;
    }

    public function getAll(array $fields)
    {
        return $this->merchantRepository->getAll($fields);
    }

    public function getById(int $id, array $fields)
    {
        return $this->merchantRepository->getById($id, $fields ?? ['*']);
    }

    public function create(array $data)
    {
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $data['photo'] = $this->uploadPhoto($data['photo']);
        }

        return $this->merchantRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        $fields = ['*'];
        $merchant = $this->merchantRepository->getById($id, $fields);

        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            if (!empty($merchant->photo)) {
                $this->deletePhoto($merchant->photo);
            }
            $data['photo'] = $this->uploadPhoto($data['photo']);
        }

        return $this->merchantRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        $fields = ['*'];
        $merchant = $this->merchantRepository->getById($id, $fields);

        if ($merchant->photo) {
            $this->deletePhoto($merchant->photo);
        }

        $this->merchantRepository->delete($id);
    }


    public function getByKeeperId(int $keeperId)
    {
        $fields = ['*'];
        return $this->merchantRepository->getByKeeperId($keeperId, $fields);
    }


    private function uploadPhoto(UploadedFile $photo)
    {
        return $photo->store('merchants', 'public');
    }

    private function deletePhoto(string $photoPath)
    {
        $relativePath = 'merchants/' . basename($photoPath);
        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
    }



}
