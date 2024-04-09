<?php

use App\Http\Middleware\LoggedIn;
use App\Http\Controllers\Chat\ChatController;
use App\Http\Controllers\Thread\ThreadController;
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

Route::controller(UserController::class)
    ->prefix('user')
    ->group(function () {
        Route::post('store', 'store');
        Route::post('login', 'login');

        Route::middleware(['auth:sanctum', LoggedIn::class])
            ->group(function () {
                Route::get('all-users', 'allUsers');
                Route::patch('logout', 'logout');
                Route::post('changeDP', 'changeDP');
            });
    });

Route::controller(ChatController::class)
    ->middleware(['auth:sanctum', LoggedIn::class])
    ->prefix('chat')
    ->group(function () {
        Route::post('send', 'send');
    });

Route::controller(ThreadController::class)
    ->middleware(['auth:sanctum', LoggedIn::class])
    ->prefix('thread')
    ->group(function () {
        Route::get('all-threads', 'index');
        Route::get('with/{user_id}', 'threadWith');
        Route::get('all-chats/{thread_id}', 'allChats');
    });
