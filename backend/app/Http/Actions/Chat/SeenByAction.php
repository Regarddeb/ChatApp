<?php

namespace App\Http\Actions\Chat;

use App\Models\Seen_By;
use App\Models\Thread;

class SeenByAction
{
    public $chat_id, $member_id, $thread_id;

    public function __construct($chat_id, $member_id, $thread_id)
    {
        $this->chat_id = $chat_id;
        $this->member_id = $member_id;
        $this->thread_id = $thread_id;
    }

    public function execute()
    {
        $chat_id = $this->chat_id;
        $member_id = $this->member_id;
        $thread_id = $this->thread_id;

        if (!$member_id) {
            $thread = Thread::with(['member' => function ($query) {
                $query->where('user_id', auth()->id());
            }])
                ->where('thread_id', $thread_id)
                ->first();

            $member_id = $thread->member[0]->member_id;
        }

        Seen_By::create([
            'chat_id' => $chat_id,
            'member_id' => $member_id
        ]);
    }
}
