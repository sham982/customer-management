<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->string('full_name');  // Customer's full name (required)
            $table->string('phone_number');  // Phone number (required)
            $table->string('tin')->nullable();  // Tax Identification Number (optional)
            $table->string('vat_reg_no')->nullable();  // VAT registration number (optional)
            $table->date('registration_date');  // Date of registration (required)
            $table->text('address');  // Customer address (required)
            $table->boolean('status')->default(true);  // Active status (default: true)
            $table->timestamps();  // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
