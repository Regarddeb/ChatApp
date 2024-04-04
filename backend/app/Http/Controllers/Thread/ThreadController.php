<?php

namespace App\Http\Controllers\Thread;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Models\Thread;

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
                'user' => function ($query) use ($searchTerm) {
                    $query->whereNot('id', auth()->id())
                        ->when($searchTerm, function ($query) use ($searchTerm) {
                            $query->where('username', 'like', '%' . $searchTerm . '%');
                        });
                },
                'latestChat.seenBy.member'
            ])
            ->join('members', 'members.thread_id', '=', 'threads.thread_id')
            ->whereIn('members.user_id', [auth()->id()])
            ->paginate(15);

        return response()->json(['threads' => $threads], 200);
    }

    public function threadWith($user_id)
    {
        $thread = Thread::whereHas('member', function ($query) use ($user_id) {
            $query->whereIn('user_id', [$user_id, auth()->id()])
                ->groupBy('thread_id')
                ->havingRaw('COUNT(user_id) = 2');
        })->get();

        return $thread;
    }
}
