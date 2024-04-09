<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Http\Requests\User\UserRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\ChangeDPRequest;

use App\Http\Actions\User\StoreUserAction;
use App\Http\Actions\User\AuthUserAction;
use App\Http\Actions\User\ChangeDPAction;

class UserController extends Controller
{
    public function store(UserRequest $userRequest): JsonResponse
    {
        return DB::transaction(function () use ($userRequest) {
            $validatedData = $userRequest->validated();

            $storeUserAction = new StoreUserAction;
            $userData = $storeUserAction->execute($validatedData);

            return response()->json(['userData' => $userData]);
        });
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

    public function allUsers(Request $request): JsonResponse
    {
        $searchTerm = $request->input('search');

        $users = User::when($searchTerm, function ($query) use ($searchTerm) {
            $query->where('username', 'LIKE', '%' . $searchTerm . '%');
        })
            ->whereNot('id', auth()->id())
            ->orderBy('active', 'desc')
            ->paginate(15);

        return response()->json(['users' => $users]);
    }

    public function logout(): JsonResponse
    {
        $user = User::find(auth()->id());
        $user->active = 0;
        $user->save();

        Auth::guard('web')->logout();

        return response()->json(['message' => 'Logged out'], 200);
    }

    public function changeDP(ChangeDPRequest $request): JsonResponse
    {
        $image = $request->file('dpFile');
        return DB::transaction(function () use ($image) {
            $changeDp = new ChangeDPAction($image);
            $displayPicPath = $changeDp->execute();

            return response()->json(['message' => 'Display picture updated.', 'path' => $displayPicPath], 200);
        });
    }
}
