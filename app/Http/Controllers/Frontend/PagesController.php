<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;

class PagesController extends Controller
{

    public function index(){
        return Auth::check() ? $this->ngx() : view('pages.home', ['title' => 'Home']);
    }

    public function ngx(){
        return Auth::user()->email_verified_at === null ? redirect('/email/verify') :view('pages.spa');
    }
    
    public function about(){
        return view('pages.about', ['title' => 'About']);
    }

    public function howItWorks(){
        return view('pages.how-it-works', ['title' => 'How it works']);
    }

    public function features(){
        return view('pages.features', ['title' => 'Features']);
    }

    public function strengthAthlete(){
        return view('pages.strength-athlete', ['title' => 'Strength Athlete ']);
    }

    public function programDesigner(){
        return view('pages.program-designer', ['title' => 'Program Designer ']);
    }

    public function personalTrainer(){
        return view('pages.personal-trainer', ['title' => 'Personal Trainer ']);
    }

    public function verify(Request $request){
        $user = User::where('api_token', $request->code)->update(['email_verified_at' => Carbon::now()]);
        return redirect('/');
    }

    public function signupStep1(Request $request) {
        return view('auth.register', [
            'first_name'=>$request->signup_first_name, 
            'last_name'=>$request->signup_last_name, 
            'phone'=>$request->signup_phone, 
            'email'=>$request->signup_email, 
            'password'=>$request->signup_password, 
            'role'=>$request->signup_role, 
        ]);
    }
}
