<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreChatRequest;
use App\Http\Actions\Chat\StoreChatAction;

class ChatController extends Controller
{
    public function send(Request $request)
    {
        $user_id = $request->input('user_id');
        $message = $request->input('message');
        $attachment = $request->file('attachment');

        // Save the attachment to storage
        // $attachmentPath = $attachment ? $attachment->store('attachments', 'public') : null;

        return response()->json([
            'user_id' => $user_id,
            'message' => $message,
            // 'attachment_path' => $attachmentPath, // Return the path or URL to the stored file
        ]);
    }
}
