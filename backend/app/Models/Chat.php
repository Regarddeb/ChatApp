<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class, 'thread_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function attachment(): HasOne
    {
        return $this->hasOne(Attachment::class, 'chat_id');
    }

    public function reply(): HasMany
    {
        return $this->hasMany(Chat::class, 'reply_to', 'chat_id');
    }

    public function seenBy(): HasMany
    {
        return $this->hasMany(Seen_By::class, 'chat_id');
    }
}
