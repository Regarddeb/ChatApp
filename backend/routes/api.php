<?php

use App\Http\Controllers\Chat\ChatController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::post('store', 'store')->name('store');
    Route::post('login', 'login')->name('login');
    Route::post('logout', 'logout')->name('logout');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('all-users', 'allUsers');
    });
});

Route::controller(ChatController::class)->prefix('chat')->group(function () {
    Route::post('send', 'send');
});
