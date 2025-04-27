<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(base_path('routes/api.php')); // API routes
Route::view('/{any}', 'app')->where('any', '.*'); // Frontend routes