<?php

namespace App\Http\Actions\Member;

use App\Models\Member;

class GetMemberIDAction
{
    public $thread_id;

    public function __construct($thread_id)
    {
        $this->thread_id = $thread_id;
    }

    public function execute()
    {
        $thread_id = $this->thread_id;

        $member = Member::where('thread_id', $thread_id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        return $member->member_id;
    }
}
