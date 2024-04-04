<?php

namespace App\Http\Actions\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Exception;

use App\Models\User;
use App\Http\Resources\UserResource;

class StoreUserAction
{
    public function execute(array $userData): JsonResponse
    {
        $user = User::create([
            'username' => $userData['username'],
            'email' => $userData['email'],
            'password' => bcrypt($userData['password']),
            'display_picture_path' => null,
            'active' => 1,
        ]);

        if (!Auth::attempt(['email' => $user->email, 'password' => $userData['password']])) {
            throw new Exception('Authentication Failed');
        }

        $userResource = new UserResource($user);
        $token = $user->createToken('token')->plainTextToken;
        return response()->json(['user' => $userResource, 'token' => $token]);
    }
}
