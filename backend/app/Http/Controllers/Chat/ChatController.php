<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Chat\StoreChatRequest;
use App\Http\Actions\Chat\StoreChatAction;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function send(StoreChatRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $user_id = $request->input('user_id');
            $message = $request->input('message');
            $attachment = $request->file('attachment');

            $storeChatAction = new StoreChatAction($message, null, $attachment, $user_id);
            $chat = $storeChatAction->execute();

            return response()->json(['chat' => $chat]);
        }, 2);
    }
}
