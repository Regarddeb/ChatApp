<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $table = 'members';

    protected $primaryKey = 'member_id';

    protected $fillable = [
        'user_id',
        'thread_id',
        'typing'
    ];
}
