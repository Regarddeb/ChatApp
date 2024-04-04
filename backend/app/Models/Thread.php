<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Thread extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'threads';

    protected $primaryKey = 'thread_id';

    protected $fillable = [
        'group',
        'member_count',
    ];

    public function chat(): HasMany
    {
        return $this->hasMany(Chat::class, 'thread_id');
    }

    public function latestChat(): HasOne
    {
        return $this->hasOne(Chat::class, 'thread_id')->latest();
    }

    public function threadDeletedBy(): HasMany
    {
        return $this->hasMany(Thread_Deleted_By::class, 'thread_id');
    }

    public function member(): HasMany
    {
        return $this->hasMany(Member::class, 'thread_id');
    }

    public function user(): HasManyThrough
    {
        return $this->hasManyThrough(
            User::class,
            Member::class,
            'thread_id',
            'id',
            'thread_id',
            'user_id'
        );
    }
}
