<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Warehouse extends Model
{
    //
    use SoftDeletes;

    protected $fillable = ['name', 'address', 'photo', 'phone'];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'warehouse_products')
        ->withPivot('stock')
        ->withTimestamps();
    }

    public function getPhotoAttribute($value)
    {
        if (!$value) {
            return null;
        }

        return url(Storage::url($value));
    }
}
