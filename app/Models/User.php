<?php

namespace App\Models;

use App\Notification;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'phone', 'email', 'password', 'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $appends = ['avatar', 'notifications'];

    public function getAvatarAttribute(){
        if ($this->role == 'PersonalTrainer') {
            $person = Trainers::where('user_id', $this->id)->first();
        }else if($this->role == 'ProgramDesigner') {
            $person = Designers::where('user_id', $this->id)->first();
        }else {
            $person = Athletes::where('user_id', $this->id)->first();
        }

        if(isset($person))
            return $person->avatar;
        else
            return null;
    }

    public function getNotificationsAttribute(){
        return Notification::where('user_id', $this->id)->where('is_read', '0')->get();
    }
}
