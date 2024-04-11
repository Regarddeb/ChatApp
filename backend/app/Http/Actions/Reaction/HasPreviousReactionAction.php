<?php

namespace App\Http\Actions\Reaction;

use App\Models\Reaction;

class HasPreviousReactionAction
{
    public $chat_id, $member_id;

    public function __construct($chat_id, $member_id)
    {
        $this->chat_id = $chat_id;
        $this->member_id = $member_id;
    }

    public function execute()
    {
        $chat_id = $this->chat_id;
        $member_id = $this->member_id;

        $hasReaction = Reaction::where('member_id', $member_id)
            ->where('chat_id', $chat_id)
            ->first();

        if ($hasReaction) {
            Reaction::destroy($hasReaction->reaction_id);
        }

        return;
    }
}
