<?php

namespace App\Http\Actions;

use App\Models\User;
use App\Http\Resources\UserResource;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\JsonResponse;
use Exception;

class StoreUserAction
{
    public function execute(array $userData): JsonResponse
    {
        try {
            $user = User::create($userData);
            $userResource = new UserResource($user);
            $token = $user->createToken('token')->plainTextToken;
            return response()->json(['user' => $userResource, 'token' => $token]);
        } catch (Exception $e) {
            return response()->json(['error', 'Something went wrong'], 500);
        }
    }
}
