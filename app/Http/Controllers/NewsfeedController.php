<?php

namespace App\Http\Controllers;

use App\Models\Newsfeed;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use DateTime;

class NewsfeedController extends Controller
{
    public function deleteParentNewsfeed(Request $request){
        $id = $request->get('id', null);
        if($id != null){
            DB::table('newsfeeds')->where(['id' => $id])->delete();
            DB::table('newsfeeds')->where(['parent_id' => $id])->delete();
        }
    }
    public function updateNewsfeed(Request $request){
        $id = $request->get('id', null);
        $content_text = $request->get('content_text', null);
        DB::table('newsfeeds')->where("id", $id)->update(['content_text' => $content_text]);

        return response()->json([
            "response" => $id
        ]);
    }
    public function setNewsfeed(Request $request){
        $user = auth()->user();
        $content_text = $request->get('content_text', null);
        $parent_id = $request->get('parent_id', 0);
        $content_photoUrls = array();
        $content_videoUrls = array();
        $file_cnt = intval($request->get('file_cnt', 0));
        $has_file = false;
        if($parent_id != 0){
            if ($request->file('file') && $request->file('file')->isValid()){
                $has_file = true;
                $fileName = time().'.'.$request->file('file')->extension();
                $request->file('file')->move(public_path('assets/uploads/newsfeeds'), $fileName);
                $content_type = mime_content_type('./assets/uploads/newsfeeds/'.$fileName);
                if(strpos($content_type, 'image/') !== false) {
                    array_push($content_photoUrls, './assets/uploads/newsfeeds/'.$fileName);
                } else {
                    array_push($content_videoUrls, './assets/uploads/newsfeeds/'.$fileName);
                }
            }
        }else{
            if($file_cnt != 0) {
                for($i = 0; $i < $file_cnt; $i++) {
                    $fileName = time().'.file'.$i.'.'.$request->file('file'.$i)->extension();
                    $request->file('file'.$i)->move(public_path('assets/uploads/newsfeeds'), $fileName);
                    $content_type = mime_content_type('./assets/uploads/newsfeeds/'.$fileName);
                    if(strpos($content_type, 'image/') !== false) {
                        array_push($content_photoUrls, './assets/uploads/newsfeeds/'.$fileName);
                    } else {
                        array_push($content_videoUrls, './assets/uploads/newsfeeds/'.$fileName);
                    }
                }
            }
        }

        $newsfeed = [
            'user_id' => $user->id,
            'content_text' => $content_text,
            'parent_id' => $parent_id,
            'content_photoUrls' => json_encode($content_photoUrls),
            'content_videoUrls' => json_encode($content_videoUrls),
        ];

        DB::table('newsfeeds')->insert($newsfeed);
        $newsfeedId = DB::getPdo()->lastInsertId();

        return response()->json([
            "response" => $newsfeedId,
            "content_photoUrls" => $content_photoUrls,
            "content_videoUrls" => $content_videoUrls
        ]);
    }

    public function getNewsfeeds(Request $request){
        $no_limit = $request->get('nolimit', false);
        $offset = $request->get('offset', 0);

        $user = auth()->user();
        $newsfeeds = [
            "posts" => [
                [
                    "author" => [
                        "name" => 'Sarah Smith',
                        "imageUrl" => './assets/images/sara-smith.png'
                    ],
                    "content" => [
                        "text" => 'Best coaching ever! Looking forward to the next session, Nohman!',
                    ],
                    "postedAt" => '30 minutes ago'
                ],
                [
                    "author" => [
                        "name" => 'Nohman Janjua',
                        "imageUrl" => './assets/images/personal-trainer-icon.png'
                    ],
                    "content" => [
                        "text" => 'Impressive maximum strength  development by @Helge Andersen',
                        "photoUrls" => ['./assets/images/feed-img-full.jpg'],
                        "videoUrl" => './assets/images/video.jpg'
                    ],
                    "postedAt" => '5 hours ago'
                ],
                [
                    "author" => [
                        "name" => 'Lara James',
                        "imageUrl" => './assets/images/icons/icon-account-gray.png'
                    ],
                    "content" => [
                        "text" => 'Here are some pictures from today’s session. Loved it!',
                        "photoUrls" => ['./assets/images/personal-trainer-feed-1.jpg', './assets/images/personal-trainer-feed-2.jpg', './assets/images/personal-trainer-feed-3.jpg']
                    ],
                    "comments" => [
                        [
                            "author" => [
                                "name" => 'Nohman Janjua',
                                "imageUrl" => './assets/images/personal-trainer-icon.png'
                            ],
                            "text" => 'Pictures looks awesome! Next session is going to be great!',
                            "postedAt" => '30 minutes ago'
                        ]
                    ],
                    "postedAt" => 'July 20, 2018'
                ]
            ]
        ];

        $posts = array();

        $parentNewsfeeds = $no_limit ? DB::table("newsfeeds")
                            ->where(["parent_id"=>'0'])
                            ->orderBy('updatedAt', 'desc')
                            ->limit(5)
                            ->offset($offset)
                            ->get()
                            :
                             DB::table("newsfeeds")
                            ->where(["parent_id"=>'0'])
                            ->orderBy('updatedAt', 'desc')
                            ->limit(3)
                            ->get();
        $com = [];
        foreach($parentNewsfeeds as $parentNewsfeed){
            $newPost = $this->get_post_by_userId($parentNewsfeed, $user->id);
            $comments = DB::table("newsfeeds")
                            ->where(["parent_id"=>$parentNewsfeed->id])
                            ->orderBy('updatedAt', 'desc')
                            ->limit(3)
                            ->get();
            foreach($comments as $comment){
                // array_push($newPost['comments'], $this->get_post_by_userId($comment, $user->id));
                array_unshift($newPost['comments'], $this->get_post_by_userId($comment, $user->id));
            }

            array_push($posts, $newPost);
        }

        $users = User::select('name')->get();

        return response()->json([
            "posts" => $posts,
            "no_limit" => $no_limit,
            "users" => $users
        ]);
    }

    public function loadMoreComments(Request $request) {
        $newComments = array();
        $parent_id = $request->get('parent_id', 0);
        $offset = $request->get('offset', 0);
        $comments = DB::table("newsfeeds")
                            ->where(["parent_id"=>$parent_id])
                            ->orderBy('updatedAt', 'desc')
                            ->offset($offset)
                            ->limit(3)
                            ->get();

        foreach($comments as $comment){
            array_push($newComments, $this->get_post_by_userId($comment, $parent_id, true));
        }
        return response()->json([
            "comments" => $newComments
        ]);
    }

    private function get_post_by_userId($parentNewsfeed, $cur_user_id, $is_comment = false){
        $newPost = array();
        $postUser = DB::table("users")->where(['id'=>$parentNewsfeed->user_id])->first();
        $userInfo = null;
        if($postUser){
            if ($postUser->role == "PersonalTrainer") {
                $userInfo = DB::table('trainers')->where(['user_id' => $parentNewsfeed->user_id])->first();
            } else if ($postUser->role == "ProgramDesigner") {
                $userInfo = DB::table('designers')->where(['user_id' => $parentNewsfeed->user_id])->first();
            } else {
                $userInfo = DB::table('athletes')->where(['user_id' => $parentNewsfeed->user_id])->first();
            }
            $newPost = [
                "postId" => $parentNewsfeed->id,
                "author" => [
                    "name" => $postUser->name,
                    "imageUrl" => $userInfo->avatar
                ],
                "content" => [
                    "text" => str_replace("\n", "<br/>", $parentNewsfeed->content_text),
                    "originalText" => $parentNewsfeed->content_text,
                    "photoUrls" => json_decode($parentNewsfeed->content_photoUrls),
                    "videoUrls" => json_decode($parentNewsfeed->content_videoUrls)
                ],
                "commentText" => "",
                "postedAt" => $this->time_elapsed_string($parentNewsfeed->updatedAt, $parentNewsfeed->parent_id),
                "comments" => [],
                "editable" => ($is_comment == false
                                    ? (($parentNewsfeed->user_id == $cur_user_id)?true:false)
                                    : (($parentNewsfeed->parent_id == $cur_user_id)?true:false)),
                "isEdit" => false
            ];
        }
        return $newPost;
    }

    private function time_elapsed_string($datetime, $parent_id = false) {
        // if($parent_id == '0'){
        //     return date("F d, Y", strtotime($datetime));
        // }
        $mysqlNow = DB::select("select Now() as now");

        $now = new DateTime($mysqlNow[0]->now);
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }
        $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }
}
