<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reaction extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'reactions';

    protected $primaryKey = 'reaction_id';

    protected $fillable = [
        'reaction_id',
        'reaction',
        'chat_id',
        'member_id'
    ];

    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }
}
