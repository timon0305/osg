@extends('layouts.public')
@section('title', 'Sign up') 

@section('content')
    <div class="register">
        <div class="row m-0">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 p-0 f-0">
                <div class="sign-up-benefits-wrapper">
                    <div class="row justify-content-center m-0">
                        <div class="col-12 col-sm-12 col-md-8">
                            <div class="benefits">
                                <div class="text-center mb-5">
                                    <h2>
                                        <small>Benefits as a</small>Member
                                    </h2>
                                </div>
                                <ul>
                                    <li>Lorem ipsum dolor sit amet consectetur ipsum dolor</li>
                                    <li>Lorem ipsum dolor sit amet consectetur ipsum dolor</li>
                                    <li>Lorem ipsum dolor sit amet consectetur ipsum dolor</li>
                                    <li>Lorem ipsum dolor sit amet consectetur ipsum dolor</li>
                                    <li>Lorem ipsum dolor sit amet consectetur ipsum dolor</li>
                                    <li>Lorem ipsum dolor sit amet consectetur ipsum dolor</li>
                                    <li>Lorem ipsum dolor sit amet consectetur ipsum dolor</li>
                                    <li>Lorem ipsum dolor sit amet consectetur ipsum dolor</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                <div class="sign-up-form-wrapper">
                    <div class="content-form h-100">
                        <div class="row justify-content-center">
                            <div class="col-12 col-sm-10 col-md-8 align-self-center">
                                <div class="text-center mb-5">
                                    <h2>
                                        <small class="step_round">Step 1 of 2</small>Sign up
                                    </h2>
                                    <h5 class="step_title">Our web app is under development. Sign up now, and we will inform you once we are live.</h5>
                                </div>
                                <div class="image-upload mb-5">
                                    <div class="icon-box">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-user fa-w-14 fa-lg"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" class=""></path></svg>
                                    </div>
                                    <div class="upload-section">
                                        <p class="title">Upload photo</p>
                                        <label for="avatarInput">
                                            <div role="button" class="kGsBD add_phto">Upload file</div>
                                        </label>
                                        <input class="bJGPFf" id="avatarInput" type="file" accept="image/*">
                                        <p>jpg, jpeg, png, Max file size: 20MB</p>
                                    </div>
                                </div>
                                <form id="step1-form">
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <input type="text" name="first_name" id="first_name" class="form-control" required data-msg-required="Please enter your first name" value="{{ isset($first_name) ? $first_name: '' }}">
                                            <label for="first_name">First name *</label>
                                        </div>
                                        <div class="col-6">
                                            <input type="text" name="last_name" id="last_name" class="form-control" required data-msg-required="Please enter your last name" value="{{ isset($last_name) ? $last_name : '' }}">
                                            <label for="last_name">Last name *</label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                                            <input type="text" name="phone" id="phone" class="form-control" required data-msg-required="Please enter your phone" value="{{ isset($phone) ? $phone : '' }}">
                                            <label for="phone">Phone number *</label>
                                        </div>
                                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 mt-3 mt-lg-0">
                                            <input type="email" name="email" id="email" class="form-control" required data-msg-required="Please enter your email address" value="{{ isset($email) ? $email : '' }}">
                                            <label for="email">E-mail *</label>
                                            @if ($errors->any())
                                                @foreach ($errors->all() as $error)
                                                    <span class="validate-error">{{ $error }}</span>
                                                @endforeach
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                                            <input type="password" class="form-control" name="password" id="password" required data-msg-required="Please enter a password" value="{{ isset($password) ? $password : '' }}">
                                            <label for="password">Password *</label>
                                        </div>
                                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 mt-3 mt-lg-0">
                                            <input type="password" class="form-control" name="password_confirmation" id="password_confirmation" equalTo="#password" value="{{ isset($password) ? $password : '' }}">
                                            <label for="password_confirmation">Retype password *</label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="role" class="labelfocus">Select type of user *</label>
                                            <select name="role" class="form-control" id="role" required>
                                                <option {{ isset($role) && $role=='0' ? "selected" : "" }} value="0">Personal Trainer</option>
                                                <option {{ isset($role) && $role=='1' ? "selected" : "" }} value="1">Program Designer</option>
                                                <option {{ isset($role) && $role=='2' ? "selected" : "" }} value="2">Strength Athlete</option>
                                            </select>
                                            <button type="button" id="question_role"
                                                    class="btn btn-default has-spinner-two"
                                                    data-toggle="popover"
                                                    data-trigger="focus"
                                                    data-html="true"
                                                    data-placement="bottom" data-original-title=""
                                                    data-content="After creating a specific profile you have the possibility to connect more than one profile to your profile account."
                                                    aria-describedby="popover335446"><img src="/images/question-ikon.png"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="checkbox custom-checkbox">
                                        <label>
                                            <input type="checkbox" value="" id="agreement-checkbox">By signing up you agree to the <a href="{{ route('tos') }}">Terms of Service</a> & <a href="{{ route('privacy') }}">Privacy Policy</a>.
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="wrapper-btn text-center text-md-right mt-3">
                                        <input type="submit" id="submit-button" value="CONTINUE" class="btn btn-green-gradient btn-block px-5 py-3">
                                    </div>
                                </form>
                                <form method="POST" action="{{ route('register') }}" id="personal-form">
                                    @csrf
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="per_gender">Gender *</label>
                                            <select name="per_gender" class="form-control" id="per_gender" required data-msg-required="Please enter your gender">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <label for="per_birth">Date of Birth *</label>
                                            <input type="text" name="per_birth" id="per_birth" class="form-control date-picker" required data-msg-required="Please enter your date of your birth" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="per_education">Education *</label>
                                            <input type="text" name="per_education" id="per_education" class="form-control" required data-msg-required="Please enter your education">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="per_special">Specialites *</label>
                                            <input type="text" name="per_special" id="per_special" class="form-control" required data-msg-required="Please enter your specialities">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="per_experience">Experience *</label>
                                            <input type="number" name="per_experience" id="per_experience" class="form-control" required data-msg-required="Please enter your experience">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="per_country">Country *</label>
                                            <select name="per_country" class="form-control" id="per_country" required>
                                                <option value="Norway">Norway</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Finland">Finland</option>
                                                <option value="Russia">Russia</option>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <label for="per_location">Location *</label>
                                            <input type="text" name="per_location" id="per_location" class="form-control" required data-msg-required="Please enter your date of your location">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="per_address">Workplace address *</label>
                                            <input type="text" name="per_address" id="per_address" class="form-control" required data-msg-required="Please enter your workplace address">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="per_postal">Postal code *</label>
                                            <input type="number" name="per_postal" id="per_postal" class="form-control" required data-msg-required="Please enter your postal code">
                                        </div>
                                        <div class="col-6">
                                            <label for="per_place">Place *</label>
                                            <input type="text" name="per_place" id="per_place" class="form-control" required data-msg-required="Please enter your place">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="per_description">Short description about me *</label>
                                            <textarea name="per_description" id="per_description" class="form-control" required data-msg-required="Please enter your description"></textarea>
                                        </div>
                                    </div>
                                    <div class="wrapper-btn text-center text-md-right mt-3">
                                        <input type="submit" value="SIGN UP" class="btn btn-green-gradient btn-block px-5 py-3 register-button">
                                    </div>
                                </form>
                                <form method="POST" action="{{ route('register') }}" id="program-form">
                                    @csrf
                                    <div class="form-group row">
                                        <div class="col-6">
                                        <label for="pro_gender">Gender *</label>
                                        <select name="pro_gender" class="form-control" id="pro_gender" required data-msg-required="Please enter your gender">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        </div>
                                        <div class="col-6">
                                            <label for="pro_birth">Date of Birth *</label>
                                            <input type="text" name="pro_birth" id="pro_birth" class="form-control date-picker" required data-msg-required="Please enter your date of your birth" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="pro_education">Education *</label>
                                            <input type="text" name="pro_education" id="pro_education" class="form-control" required data-msg-required="Please enter your education">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="pro_special">Specialities *</label>
                                            <input type="text" name="pro_special" id="pro_special" class="form-control" required data-msg-required="Please enter your specialites">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="pro_experience">Experience *</label>
                                            <input type="number" name="pro_experience" id="pro_experience" class="form-control" required data-msg-required="Please enter your experience">
                                        </div>
                                        <div class="col-6">
                                            <label for="pro_country">Country *</label>
                                            <select name="pro_country" class="form-control" id="pro_country" required>
                                                <option value="Norway">Norway</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Finland">Finland</option>
                                                <option value="Russia">Russia</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="pro_postal">Postal code *</label>
                                            <input type="number" name="pro_postal" id="pro_postal" class="form-control" required data-msg-required="Please enter your postal code">
                                        </div>
                                        <div class="col-6">
                                            <label for="pro_place">Place *</label>
                                            <input type="text" name="pro_place" id="pro_place" class="form-control" required data-msg-required="Please enter your place">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="pro_description">Short description about me *</label>
                                            <textarea name="pro_description" id="pro_description" class="form-control" required data-msg-required="Please enter your description"></textarea>
                                        </div>
                                    </div>
                                    <div class="wrapper-btn text-center text-md-right mt-3">
                                        <input type="submit" value="SIGN UP" class="btn btn-green-gradient btn-block px-5 py-3 register-button">
                                    </div>
                                </form>
                                <form method="POST" action="{{ route('register') }}" id="strength-form">
                                    @csrf
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="str_gender">Gender *</label>
                                            <select name="str_gender" class="form-control" id="str_gender" required data-msg-required="Please enter your gender">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <label for="str_birth">Date of Birth *</label>
                                            <input name="str_birth" id="str_birth" class="form-control" required data-msg-required="Please enter your date of your birth" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="str_height">Height *</label>
                                            <select name="str_height" class="form-control" id="str_height" required data-msg-required="Please enter your height">
                                                <option value="0-139">0-139</option>
                                                <option value="140-149">140-149</option>
                                                <option value="150-159">150-159</option>
                                                <option value="160-169">160-169</option>
                                                <option value="170-179">170-179</option>
                                                <option value="180-189">180-189</option>
                                                <option value="190-199">190-199</option>
                                                <option value="200-219">200-219</option>
                                                <option value="220+">220+</option>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <label for="str_muscle">Muscle Fiber Type *</label>
                                            <select name="str_muscle" class="form-control" id="str_muscle" required>
                                                <option value="fast">Fast Twitch</option>
                                                <option value="slow">Slow Twitch</option>
                                                <option value="mixed">Mixed</option>
                                            </select>
                                            <button type="button" id="question_muscle"
                                                    class="btn btn-default has-spinner-two"
                                                    data-toggle="popover"
                                                    data-trigger="focus"
                                                    data-html="true"
                                                    data-placement="bottom" data-original-title=""
                                                    data-content="<div><b>Fast twitch:</b> naturally good at strength and/or explosive activities like sprinting, jumping and power lifting.<br/> <b>Slow twitch:</b> naturally good at long distance endurance activities like cross country skiing, running and bicykling.<br/> <b>Mixed:</b> a mix of fast- and  slow twich muscle fibers.</div>"
                                                    aria-describedby="popover335446"><img src="/images/question-ikon.png"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="str_interest">Interests *</label>
                                            <input type="text" name="str_interest" id="str_interest" class="form-control" required data-msg-required="Please enter your interests">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="str_experience">Experience *</label>
                                            <input type="number" name="str_experience" id="str_experience" class="form-control" required data-msg-required="Please enter your experience">
                                        </div>
                                        <div class="col-6">
                                            <label for="str_country">Country *</label>
                                            <select name="str_country" class="form-control" id="str_country" required>
                                                <option value="Norway">Norway</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Finland">Finland</option>
                                                <option value="Russia">Russia</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-6">
                                            <label for="str_postal">Postal code *</label>
                                            <input type="number" name="str_postal" id="str_postal" class="form-control" required data-msg-required="Please enter your postal code">
                                        </div>
                                        <div class="col-6">
                                            <label for="str_place">Place *</label>
                                            <input type="text" name="str_place" id="str_place" class="form-control" required data-msg-required="Please enter your place">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <label for="str_description">Short description about me *</label>
                                            <textarea name="str_description" id="str_description" class="form-control" required data-msg-required="Please enter your description"></textarea>
                                        </div>
                                    </div>
                                    <div class="wrapper-btn text-center text-md-right mt-3">
                                        <input type="submit" value="SIGN UP" class="btn btn-green-gradient btn-block px-5 py-3 register-button">
                                    </div>
                                </form>
                                <!-- <div class="no-sign-up text-center mt-3">
                                    <p>Already have an account? <a href="{{ route('login') }}">Login to your account.</a></p>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section ('scripts')
<script>
	jQuery(function(){
		new osg.Controllers.home();
		new osg.Controllers.SignUp();
	});
</script>
@endsection