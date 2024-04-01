<?php

namespace App\Http\Traits;

use App\Models\User;
use App\Http\Resources\UserListResource;

trait UserListTrait
{
    // Add your trait methods here
    public function UserListTrait($search)
    {
        $users = User::when($search, function ($query) use ($search) {
            $query->where('username', 'LIKE', '%' . $search . '%');
        })
            ->whereNot('id', auth()->id())
            ->orderBy('active', 'desc')
            ->paginate(15);
        return $users;
    }
}
