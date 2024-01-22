<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\User\UserRequest;
use App\Http\Actions\StoreUserAction;
use Illuminate\Http\JsonResponse;
use Exception;

class UserController extends Controller
{
    public function store(UserRequest $userRequest): JsonResponse
    {
        $validatedData = $userRequest->validated();

        $storeUserAction = new StoreUserAction;
        $userData = $storeUserAction->execute($validatedData);

        return response()->json(['userData' => $userData]);
    }

    public function login()
    {
        
    }
}
