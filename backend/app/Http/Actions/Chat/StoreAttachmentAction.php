<?php

namespace App\Http\Actions\Chat;

use App\Models\Attachment;
use Illuminate\Support\Facades\Storage;

class StoreAttachmentAction
{
    public $attachment, $chat_id, $thread_id;

    public function __construct($attachment, $chat_id, $thread_id)
    {
        $this->attachment = $attachment;
        $this->chat_id = $chat_id;
        $this->thread_id = $thread_id;
    }

    public function execute()
    {
        $attachment = $this->attachment;
        $chat_id = $this->chat_id;
        $thread_id = $this->thread_id;

        $attachmentPath = Storage::putFile('public/attachments/' . $thread_id, $attachment, 'public');

        Attachment::create([
            'chat_id' => $chat_id,
            'attachment_path' => $attachmentPath
        ]);
    }
}
