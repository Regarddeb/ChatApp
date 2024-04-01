<?php

namespace App\Http\Actions\User;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthUserAction
{
    public function execute(array $credentials)
    {
        $field = filter_var($credentials['email_username'], FILTER_VALIDATE_EMAIL)
            ? 'email'
            : 'username';

        $credentials = [
            $field => $credentials['email_username'],
            'password' => $credentials['password'],
        ];

        try {
            if (Auth::attempt($credentials)) {
                $user = User::find(Auth::user()->id);

                $token = $user->createToken('token')->plainTextToken;
                $userResource = new UserResource($user);
                return response()->json(['user' => $userResource, 'token' => $token]);
            } else {
                // Handle invalid credentials
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
