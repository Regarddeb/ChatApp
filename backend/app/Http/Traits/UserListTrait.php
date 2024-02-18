<?php

namespace App\Http\Traits;

use App\Models\User;
use App\Http\Resources\UserListResource;

trait UserListTrait
{
    // Add your trait methods here
    public function UserListTrait()
    {
        $users = User::paginate(10);
        
    }
}
