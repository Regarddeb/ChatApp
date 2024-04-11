<?php

namespace App\Http\Actions\Chat;

use App\Http\Actions\Chat\CreateThreadAction;
use App\Http\Actions\Chat\StoreAttachmentAction;
use App\Http\Actions\Member\StoreMembersAction;
use App\Http\Actions\Chat\SeenByAction;
use App\Models\Chat;

class StoreChatAction
{
    public $message, $thread_id, $attachment, $user_id;
    public function __construct($message, $thread_id, $attachment, $user_id)
    {
        $this->user_id = $user_id;
        $this->message = $message;
        $this->thread_id = $thread_id;
        $this->attachment = $attachment;
    }

    public function execute()
    {
        $receiver_id = $this->user_id;
        $message = $this->message;
        $thread_id = $this->thread_id;
        $attachment = $this->attachment;
        $myMemberID = 0;

        if (!$thread_id) {
            $createThreadAction = new CreateThreadAction();
            $thread_id = $createThreadAction->execute();

            $storeMembersAction = new StoreMembersAction($thread_id, [$receiver_id, auth()->user()->id]);
            $myMemberID = $storeMembersAction->execute();
        }

        $chat = Chat::create([
            'message' => $message,
            'has_attachment' => !$attachment ? 0 : 1,
            'user_id' => auth()->id(),
            'thread_id' => $thread_id,
            'reply_to' => null
        ]);

        if ($attachment) {
            $storeAttachmentAction = new StoreAttachmentAction($attachment, $chat->chat_id, $thread_id);
            $storeAttachmentAction->execute();
        }

        $seenByAction = new SeenByAction($chat->chat_id, $myMemberID, $thread_id);
        $seenByAction->execute();

        return $chat;
    }
}
