<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request) {
        $rules = array('email' => 'required|email', 'password' => 'required|alphaNum');

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Redirect::to('/login')->withErrors($validator)->withInput(Input::except('password'));
        } else {
            // create our user data for the authentication
            $available_emails = ["nohman@janjua.net", "admin@fantasylab.io", "devtool@fantasylab.io", "andreas,stensrud@gmail.com", "nohman@fantasylab.io", "chrome@test.com"];
            $userdata = array(
                'password'  => $request->password,
                'email'     => $request->email
            );
            if (in_array($request->email, $available_emails) && Auth::attempt($userdata,true)) {
                return redirect('/');
            } else {
                return Redirect::back()->with('alert-success', 'Enter Correct Email and Password');
            }
        }
    }
}
