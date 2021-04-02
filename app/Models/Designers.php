<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Designers extends Model
{
          /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'designers';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'gender', 'birth', 'education', 'special', 'experience', 'country', 'postal_code', 'place', 'description', 'avatar'
    ];

    protected $appends = ['name', 'email', 'phone', 'role'];

    public function getNameAttribute(){
        return User::find($this->user_id)->name;
    }

    public function getEmailAttribute(){
        return User::find($this->user_id)->email;
    }

    public function getPhoneAttribute(){
        return User::find($this->user_id)->phone;
    }

    public function getRoleAttribute(){
        return User::find($this->user_id)->role;
    }
}
