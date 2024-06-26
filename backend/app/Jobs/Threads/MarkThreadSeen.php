<?php

namespace App\Jobs\Threads;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Models\Seen_By;
use App\Models\Chat;
use App\Models\Member;

class MarkThreadSeen implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $thread_id;

    /**
     * Create a new job instance.
     */
    public function __construct($thread_id)
    {
        $this->thread_id = $thread_id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $thread_id = $this->thread_id;

        $member = Member::where('user_id', auth()->id())->where('thread_id', $thread_id)->first();

        $latestChat = Chat::latest()->first();

        Seen_By::create([
            'member_id' => $member->member_id,
            'thread_id' => $thread_id,
            'chat_id' => $latestChat->chat_id
        ]);
    }
}
