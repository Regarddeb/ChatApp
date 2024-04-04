<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Seen_By extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'seen_by';

    protected $primaryKey = 'seen_by_id';

    protected $fillable = [
        'member_id',
        'chat_id',
    ];

    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
