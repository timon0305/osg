<?php

namespace App\Http\Controllers;

use App\Friends;
use App\Models\User;
use App\Notification;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    public function getFriends(Request $request){

        $user_id = auth()->user()->id;
        $type = 0;
        if(isset($request->is_type))
            $type = $request->is_type;
        $total_cnt = Friends::where('is_allow', 2)
            ->where(function($query) use ($user_id) {
                $query->where('from_user_id', $user_id)
                      ->orWhere('to_user_id', $user_id);
            })->count();

        if($type == 0) {
            $friends = Friends::where('is_allow', 2)
                            ->where(function($query) use ($user_id) {
                                $query->where('from_user_id', $user_id)
                                      ->orWhere('to_user_id', $user_id);
                            })->get();
        } else {
            $friends = Friends::where('is_allow', 1)->where('to_user_id', $user_id)->get();
        }

        $friend_ids = array();
        foreach($friends as $friend) {
            if ($friend->from_user_id == $user_id) {
                array_push($friend_ids, $friend->to_user_id);
            } else {
                array_push($friend_ids, $friend->from_user_id);
            }
        }

        $users = User::whereIn('id', $friend_ids)->get();

        return response()->json([
            "success" => 0,
            "total_cnt" => $total_cnt,
            "friends" => $users
        ]);
    }

    public function acceptFriend(Request $request){

        $user = auth()->user();
        if($request->friend_id) {
            $friend_id = $request->friend_id;
            $friend = Friends::where('from_user_id', $friend_id)->where('to_user_id', $user->id)->first();
            $friend->is_allow = 2;
            $friend->save();

            $notification = new Notification();
            $notification->user_id = $friend_id;
            $notification->type = 1;
            $notification->content = $user->name." accepted your friend request.";
            $notification->save();
        }

        return response()->json([
            "success" => 1
        ]);
    }

    public function getNotifications(Request $request){
        $user_id = auth()->user()->id;
        $notifications = Notification::where('user_id', $user_id)->where('is_read', '0')->orderBy('created_at', 'desc')->get();
        return response()->json([
            "notifications" => $notifications
        ]);
    }

    public function setNotification(Request $request){
        $user_id = auth()->user()->id;
        $notificationId = $request->notification_id;
        $notification = Notification::find($notificationId);
        $notification->is_read = 1;
        $notification->save();

        $notifications = Notification::where('user_id', $user_id)->where('is_read', '0')->orderBy('created_at', 'desc')->get();
        return response()->json([
            "notifications" => $notifications
        ]);
    }
}
