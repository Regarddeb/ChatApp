<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;

    protected $table = 'attachments';

    protected $primaryKey = 'attachment_id';

    protected $fillable = [
        'chat_id',
        'attachemnt_path',
    ];
}
