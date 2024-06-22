<?php

namespace App\Http\Actions\Thread;

use App\Models\Member;
use App\Models\Seen_By;
use App\Models\Chat;

class MarkThreadSeenAction
{
    public $thread_id;

    public function __construct($thread_id)
    {
        $this->thread_id = $thread_id;
    }

    public function execute()
    {
        $thread_id = $this->thread_id;
        $member = Member::where('user_id', auth()->id())->where('thread_id', $thread_id)->first();

        $latestChat = Chat::latest()->first();

        Seen_By::create([
            'member_id' => $member->member_id,
            'thread_id' => $thread_id,
            'chat_id' => $latestChat->chat_id
        ]);
    }
}
