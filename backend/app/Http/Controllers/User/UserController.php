<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;

use App\Http\Requests\User\UserRequest;
use App\Http\Requests\User\LoginRequest;

use App\Http\Traits\UserListTrait;
use App\Http\Actions\User\StoreUserAction;
use App\Http\Actions\User\AuthUserAction;

class UserController extends Controller
{
    use UserListTrait;
    public function store(UserRequest $userRequest): JsonResponse
    {
        $validatedData = $userRequest->validated();

        $storeUserAction = new StoreUserAction;
        $userData = $storeUserAction->execute($validatedData);

        return response()->json(['userData' => $userData]);
    }

    public function login(LoginRequest $loginRequest): JsonResponse
    {
        $validatedData = $loginRequest->validated();

        $authUserAction = new AuthUserAction;
        $userData = $authUserAction->execute($validatedData);

        if ($userData) {
            return response()->json(['message' => 'Login successful', 'user' => $userData]);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }

    public function allUsers()
    {
        $users = $this->UserListTrait();
        return response()->json(['users' => $users]);
    }
    
}
