<?php

namespace App\Http\Actions\Chat;

use App\Models\Member;

class StoreMembersAction
{
    public $thread_id, $user_ids;
    public function __construct($thread_id, $user_ids)
    {
        $this->thread_id = $thread_id;
        $this->user_ids = $user_ids;
    }

    public function execute()
    {
        $thread_id = $this->thread_id;
        $user_ids = $this->user_ids;

        foreach ($user_ids as $user_id) {
            Member::create([
                'user_id' => $user_id,
                'thread_id' => $thread_id,
                'typing' => 0
            ]);
        }
    }
}
