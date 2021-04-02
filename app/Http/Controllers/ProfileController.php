<?php

namespace App\Http\Controllers;

use App\Friends;
use App\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function search(Request $request){

        $user = auth()->user();
        $keyword = $request->get('searchTxt', '');
        $users = array();
        $programs = array();
        if($keyword) {
            $users = DB::table("users")->select('id', 'name')->where('name', 'like', '%' . $keyword . '%')->get();
            $programs = DB::table("programs")->select('user', 'name')->where('name', 'like', '%' . $keyword . '%')->get();
        }

        return response()->json([
            "success" => 0,
            "users" => $users,
            "programs" => $programs
        ]);
    }

    public function requestFriend(Request $request){

        $user = auth()->user();
        if($request->friend_id) {
            $friend_id = $request->friend_id;
            $friend = new Friends();
            $friend->from_user_id = $user->id;
            $friend->to_user_id = $friend_id;
            $friend->is_allow = 1;
            $friend->save();

            $notification = new Notification();
            $notification->user_id = $friend_id;
            $notification->type = 1;
            $notification->content = $user->name." sent a friend request to you.";
            $notification->save();
        }

        return response()->json([
            "success" => 1
        ]);
    }

}
