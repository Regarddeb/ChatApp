<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\Chat\StoreChatRequest;
use App\Http\Actions\Chat\StoreChatAction;
use App\Http\Requests\Chat\StoreReactionRequest;
use App\Http\Actions\Reaction\StoreReactionAction;

class ChatController extends Controller
{
    public function send(StoreChatRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $user_id = $request->input('user_id');
            $message = $request->input('message');
            $attachment = $request->file('attachment');
            $thread_id = $request->input('thread_id');
            $reply_to = $request->input('reply_to');

            $storeChatAction = new StoreChatAction($message, $thread_id, $attachment, $user_id, $reply_to);
            $chat = $storeChatAction->execute();

            return response()->json(['chat' => $chat]);
        }, 2);
    }

    public function storeReaction(StoreReactionRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $chat_id = $request->input('chat_id');
            $reaction = $request->input('reaction');
            $thread_id = $request->input('thread_id');

            $storeReactionAction = new StoreReactionAction($chat_id, $reaction, $thread_id);
            $storeReactionAction->execute();

            return response()->json(['request' => [$chat_id, $reaction, $thread_id]]);
        });
    }
}
