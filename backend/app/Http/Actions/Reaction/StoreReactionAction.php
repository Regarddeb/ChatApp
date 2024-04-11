<?php

namespace App\Http\Actions\Reaction;

use App\Http\Actions\Member\GetMemberIDAction;
use App\Http\Actions\Reaction\CheckReactionExistsAction;
use App\Http\Actions\Reaction\DeleteReactionAction;
use App\Http\Actions\Reaction\HasPreviousReactionAction;
use App\Models\Reaction;

class StoreReactionAction
{
    public $chat_id, $reaction, $thread_id;

    public function __construct($chat_id, $reaction, $thread_id)
    {
        $this->chat_id = $chat_id;
        $this->reaction = $reaction;
        $this->thread_id = $thread_id;
    }

    public function execute()
    {
        $chat_id = $this->chat_id;
        $reaction = $this->reaction;
        $thread_id = $this->thread_id;

        $getMemberIDAction = new GetMemberIDAction($thread_id);
        $member_id = $getMemberIDAction->execute();

        $checkReactionExistsAction = new CheckReactionExistsAction($reaction, $member_id, $chat_id);
        $reactionExists = $checkReactionExistsAction->execute();

        if ($reactionExists) {
            $deleteReactionAction = new DeleteReactionAction($reactionExists->reaction_id);
            $deleteReactionAction->execute();
        } else {
            $hasPreviousReactionAction = new HasPreviousReactionAction($chat_id, $member_id);
            $hasPreviousReactionAction->execute();

            Reaction::create([
                'reaction' => $reaction,
                'chat_id' => $chat_id,
                'member_id' => $member_id
            ]);
        }
    }
}
