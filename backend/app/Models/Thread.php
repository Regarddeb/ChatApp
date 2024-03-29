<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
