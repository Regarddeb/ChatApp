<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $table = 'chats';

    protected $primaryKey = 'chat_id';

    protected $fillable = [
        'message',
        'has_attachment',
        'user_id',
        'thread_id',
        'reply_to'
    ];
}
