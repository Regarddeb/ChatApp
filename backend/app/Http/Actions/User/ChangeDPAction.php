<?php

namespace App\Http\Actions\User;

use Illuminate\Support\Facades\Storage;
use App\Models\User;

class ChangeDPAction
{
    public $image;
    public function __construct($image)
    {
        $this->image = $image;
    }

    public function execute()
    {
        $image = $this->image;
        $user = User::find(auth()->id());
        $prevPath = null;

        if ($user->display_picture_path) {
            $prevPath = $user->display_picture_path;
        }

        $displayPicPath = Storage::putFile('public/displayPic/' . auth()->id(), $image, 'public');
        $displayPicPath = str_replace('public/', '', $displayPicPath);

        $user->display_picture_path = $displayPicPath;
        $user->save();

        if (Storage::disk('local')->exists('public/' . $prevPath)) {
            Storage::delete('public/' . $prevPath);
        }

        return $displayPicPath;
    }
}
