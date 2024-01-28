<?php

namespace App\Http\Actions;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthUserAction
{
    public function execute(array $credentials)
    {
        $user = User::where('username', $credentials['email_username'])
            ->orWhere('email', $credentials['email_username'])
            ->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            $token = $user->createToken('token')->plainTextToken;
            $userResource = new UserResource($user);
            return response()->json(['user' => $userResource, 'token' => $token]);
        }

        // Authentication failed
        return null;
    }
}
