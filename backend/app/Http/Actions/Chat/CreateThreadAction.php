<?php

namespace App\Http\Actions\Chat;

use App\Models\Thread;

class CreateThreadAction
{
    public function execute()
    {
        $thread = Thread::create([
            'group' => 0,
            'member_count' => 2
        ]);

        return $thread->thread_id;
    }
}