<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'phone_number',
        'tin',
        'vat_reg_no',
        'registration_date',
        'address',
        'status',
    ];
}