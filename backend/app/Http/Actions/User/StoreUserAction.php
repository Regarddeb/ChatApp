<?php

namespace App\Http\Actions\User;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Exception;

class StoreUserAction
{
    public function execute(array $userData): JsonResponse
    {
        try {
            $user = User::create([
                'username' => $userData['username'],
                'email' => $userData['email'],
                'password' => bcrypt($userData['password']),
                'display_picture_path' => null,
                'active' => 1,
            ]);
            $userResource = new UserResource($user);
            $token = $user->createToken('token')->plainTextToken;
            return response()->json(['user' => $userResource, 'token' => $token]);
        } catch (Exception $e) {
            return response()->json(['error', 'Something went wrong'], 500);
        }
    }
}
