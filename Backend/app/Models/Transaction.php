<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    //
    use SoftDeletes;

    protected $fillable = ['name', 'phone', 'sub_total', 'tax_total', 'grand_total', 'merchant_id'];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    public function transactionProducts()
    {
        return $this->hasMany(TransactionProduct::class);
    }
}
