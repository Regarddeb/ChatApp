<?php

namespace App\Http\Actions\Reaction;

use App\Models\Reaction;

class CheckReactionExistsAction
{
    public $reaction, $member_id, $chat_id;
    public function __construct($reaction, $member_id, $chat_id)
    {
        $this->reaction = $reaction;
        $this->member_id = $member_id;
        $this->chat_id = $chat_id;
    }

    public function execute()
    {
        $reaction = $this->reaction;
        $member_id = $this->member_id;
        $chat_id = $this->chat_id;

        $reactionExists = Reaction::where('member_id', $member_id)
            ->where('reaction', $reaction)
            ->where('chat_id', $chat_id)
            ->first();
        
        return $reactionExists;
    }
}
