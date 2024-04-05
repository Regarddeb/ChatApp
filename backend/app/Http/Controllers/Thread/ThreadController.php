<?php

namespace App\Http\Controllers\Thread;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Models\Thread;
use App\Models\Chat;
use App\Http\Requests\Thread\AllChatsRequest;
use App\Http\Requests\Thread\ThreadWithRequest;

class ThreadController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $searchTerm = $request->input('search');

        $threads = Thread::withCount('member')
            ->with([
                'latestChat.user' => function ($query) {
                    $query->whereNot('id', auth()->id());
                },
                'user' => function ($query) {
                    $query->whereNot('id', auth()->id());
                },
                'latestChat.seenBy.member',
                'member.user'
            ])
            ->join('members', 'members.thread_id', '=', 'threads.thread_id')
            ->join('users', 'users.id', '=', 'members.user_id')
            ->when($searchTerm, function ($query) use ($searchTerm) {
                $query
                    ->whereNot('id', auth()->id())
                    ->where('username', 'like', '%' . $searchTerm . '%');
            })
            ->whereIn('members.user_id', [auth()->id()])
            ->paginate(15);

        return response()->json(['threads' => $threads], 200);
    }

    public function threadWith($user_id): JsonResponse
    {
        $thread = Thread::whereHas('member', function ($query) use ($user_id) {
            $query->whereIn('user_id', [$user_id, auth()->id()])
                ->groupBy('thread_id')
                ->havingRaw('COUNT(user_id) = 2');
        })->get();

        return response()->json(['threads' => $thread], 200);
    }

    public function allChats($thread_id): JsonResponse
    {
        $chats = Chat::with([
            'attachment',
            'seenBy',
            'reply',
            'user',
            'reaction'
        ])
            ->where('thread_id', $thread_id)
            ->paginate(20);

        return response()->json(['chats' => $chats], 200);
    }
}
