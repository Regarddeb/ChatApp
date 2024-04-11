<?php

namespace App\Http\Actions\Reaction;

use App\Models\Reaction;

class DeleteReactionAction
{
    public $reaction_id;

    public function __construct($reaction_id)
    {
        $this->reaction_id = $reaction_id;
    }

    public function execute()
    {
        $reaction_id = $this->reaction_id;

        $deleted  = Reaction::destroy($reaction_id);

        if (!$deleted) {
            throw new \Exception('Failed to remove reaction');
        }

        return;
    }
}
