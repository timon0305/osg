<?php

namespace App\Services;

use App\Models\User;
use App\Models\Trainers;
use App\Models\Designers;
use App\Models\Athletes;
use Illuminate\Support\Facades\Hash;

use NZTim\Mailchimp\Mailchimp;
use NZTim\Mailchimp\MailchimpException;
use NZTim\Mailchimp\Exception\MailchimpBadRequestException;

abstract class UserRole{
    const PersonalTrainer = 'PersonalTrainer';
    const ProgramDesigner = 'ProgramDesigner';
    const StrengthAthlete = 'StrengthAthlete';
}

class UserService 
{
    private $roles = [UserRole::PersonalTrainer, UserRole::ProgramDesigner, UserRole::StrengthAthlete];
    protected $mc;

    public function __construct() {
        $apikey = env('MC_KEY', 'aac2744bf57f35d5d61713f3921ac80e-us4');
        $this->mc = new Mailchimp($apikey);
    }

    public function getAll() {
        return User::all();
    }

    public function register(array $data) 
    {
        $user = User::create([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        $user->role = $this->getRole($data['role']);
        $user->api_token = str_random(60);
        $user->save();

        $first_name = explode(" ", $data['name'])[0];
        $last_name = explode(" ", $data['name'])[1];

        if ($user->role == "PersonalTrainer") {
            $trainers = Trainers::create([
                'user_id' => $user->id,
                'gender' => $data['per_gender'],
                'birth' => $data['per_birth'],
                'education' => $data['per_education'],
                'special' => $data['per_special'],
                'experience' => $data['per_experience'],
                'country' => $data['per_country'],
                'location' => $data['per_location'],
                'workplace_address' => $data['per_address'],
                'place' => $data['per_place'],
                'postal_code' => $data['per_postal'],
                'description' => $data['per_description']
            ]);
            if (isset($data['avatar'])) {
                $trainers->avatar = $data['avatar'];
                $trainers->save();
            }
            try {
                $this->mc->subscribe(env('MC_AUDIENCE_ID', '15d0b87b28'), $data['email'], $merge = [
                    'FNAME' => $first_name,
                    'LNAME' => $last_name,
                    'ADDRESS' => $data['per_address'],
                    'PHONE' => $data['phone'],
                    'BIRTHDAY' => $data['per_birth'],
                    'USERTYPE' => $this->getRole($data['role']),
                    'GENDER' => $data['per_gender'],
                    'EDUCATION' => $data['per_education'],
                    'EXPERIENCE' => $data['per_experience'],
                    'SPECIALITY' => $data['per_special'],
                    'COUNTRY' => $data['per_country'],
                    'PLACE' => $data['per_place'],
                    'POSTALCODE' => $data['per_postal']
                ], false);
            } catch (MailchimpException $e) {
                return redirect()->back()->with('error','Email is Already Subscribed');
            } catch (MailchimpBadRequestException $e) {
                return redirect()->back()->with('error','Error from MailChimp');
            }
        } else if ($user->role == "ProgramDesigner") {
            $desingers = Designers::create([
                'user_id' => $user->id,
                'gender' => $data['pro_gender'],
                'birth' => $data['pro_birth'],
                'education' => $data['pro_education'],
                'special' => $data['pro_special'],
                'experience' => $data['pro_experience'],
                'country' => $data['pro_country'],
                'place' => $data['pro_place'],
                'postal_code' => $data['pro_postal'],
                'description' => $data['pro_description']
            ]);
            if (isset($data['avatar'])) {
                $desingers->avatar = $data['avatar'];
                $desingers->save();
            }
            try {
                $this->mc->subscribe(env('MC_AUDIENCE_ID', '15d0b87b28'), $data['email'], $merge = [
                    'FNAME' => $first_name,
                    'LNAME' => $last_name,
                    'ADDRESS' => '',
                    'PHONE' => $data['phone'],
                    'BIRTHDAY' => $data['pro_birth'],
                    'USERTYPE' => $this->getRole($data['role']),
                    'GENDER' => $data['pro_gender'],
                    'EDUCATION' => $data['pro_education'],
                    'EXPERIENCE' => $data['pro_experience'],
                    'SPECIALITY' => $data['pro_special'],
                    'COUNTRY' => $data['pro_country'],
                    'PLACE' => $data['pro_place'],
                    'POSTALCODE' => $data['pro_postal']
                ], false);
            } catch (MailchimpException $e) {
                return redirect()->back()->with('error','Email is Already Subscribed');
            } catch (MailchimpBadRequestException $e) {
                return redirect()->back()->with('error','Error from MailChimp');
            }
        } else {
            $atheletes = Athletes::create([
                'user_id' => $user->id,
                'gender' => $data['str_gender'],
                'birth' => $data['str_birth'],
                'height' => $data['str_height'],
                'muscle_type' => $data['str_muscle'],
                'interest' => $data['str_interest'],
                'experience' => $data['str_experience'],
                'country' => $data['str_country'],
                'place' => $data['str_place'],
                'postal_code' => $data['str_postal'],
                'description' => $data['str_description']
            ]);
            if (isset($data['avatar'])) {
                $atheletes->avatar = $data['avatar'];
                $atheletes->save();
            }
            try {
                $this->mc->subscribe(env('MC_AUDIENCE_ID', '15d0b87b28'), $data['email'], $merge = [
                    'FNAME' => $first_name,
                    'LNAME' => $last_name,
                    'ADDRESS' => '',
                    'PHONE' => $data['phone'],
                    'BIRTHDAY' => $data['str_birth'],
                    'USERTYPE' => $this->getRole($data['role']),
                    'GENDER' => $data['str_gender'],
                    'EDUCATION' => '',
                    'EXPERIENCE' => $data['str_experience'],
                    'SPECIALITY' => '',
                    'COUNTRY' => $data['str_country'],
                    'PLACE' => $data['str_place'],
                    'POSTALCODE' => $data['str_postal']
                ], false);
            } catch (MailchimpException $e) {
                return redirect()->back()->with('error','Email is Already Subscribed');
            } catch (MailchimpBadRequestException $e) {
                return redirect()->back()->with('error','Error from MailChimp');
            }
        }
       
        return $user;
    }

    private function getRole($id){
        return $this->roles[intval($id)];
    }

}
