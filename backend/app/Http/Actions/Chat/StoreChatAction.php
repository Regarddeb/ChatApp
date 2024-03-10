<?php

namespace App\Http\Actions\Chat;

class StoreChatAction
{
    public $message, $thread_id, $attachment;
    public function __construct($message, $thread_id, $attachment)
    {
        $this->message = $message;
        $this->thread_id = $thread_id;
        $this->attachment = $attachment;
    }

    public function execute()
    {
        $message = $this->message;
        $thread_id = $this->thread_id;
        $attachment = $this->attachment;
        
    }
}