<?php

namespace App\Http\Actions\User;

use App\Http\Resources\UserResource;
use App\Models\User;
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
            $user->active = 1;
            $user->save();
            return response()->json(['user' => $userResource, 'token' => $token]);
        }

        return null;
    }

    
}
