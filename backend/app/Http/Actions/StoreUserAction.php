<?php

namespace App\Http\Actions;

use App\Models\User;
use App\Http\Resources\UserResource;
use Exception;

class StoreUserAction
{
    public function execute(array $userData): UserResource
    {
        try {
            $user = User::create($userData);
            $userResource = new UserResource($user);

            return $userResource;
        } catch (Exception $e) {
            return response()->json(['error', 'Something went wrong'], 500);
        }
    }
}
