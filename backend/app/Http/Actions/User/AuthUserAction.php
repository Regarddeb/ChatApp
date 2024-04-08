<?php

namespace App\Http\Actions\User;

use App\Http\Resources\UserResource;
use App\Models\User;
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

        if (Auth::attempt($credentials)) {
            $user = User::find(Auth::user()->id);
            $user->active = 1;
            $user->save();

            $token = $user->createToken('token')->plainTextToken;
            $userResource = new UserResource($user);
            return response()->json(['user' => $userResource, 'token' => $token]);
        } else {
            return false;
        }
    }
}
