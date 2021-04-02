<form method="POST" action="{{ url('register/step1') }}" id="signup-step1-form">
    @csrf
    <div class="form-group row">
        <div class="col-6">
            <label for="signup_first_name">First name *</label>
            <input type="text" name="signup_first_name" id="signup_first_name" class="form-control" required data-msg-required="Please enter your first name">
        </div>
        <div class="col-6">
            <label for="signup_last_name">Last name *</label>
            <input type="text" name="signup_last_name" id="signup_last_name" class="form-control" required data-msg-required="Please enter your last name">
        </div>
    </div>
    <div class="form-group row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <label for="signup_phone">Phone number *</label>
            <input type="text" name="signup_phone" id="signup_phone" class="form-control" required data-msg-required="Please enter your phone">
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 mt-3 mt-lg-0">
            <label for="signup_email">E-mail *</label>
            <input type="email" name="signup_email" id="signup_email" class="form-control" required data-msg-required="Please enter your email address">
        </div>
    </div>
    <div class="form-group row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
            <label for="signup_password">Password *</label>
            <input type="password" class="form-control" name="signup_password" id="signup_password" required data-msg-required="Please enter a password">
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 mt-3 mt-lg-0">
            <label for="signup_password_confirmation">Retype password *</label>
            <input type="password" class="form-control" name="signup_password_confirmation" id="signup_password_confirmation" equalTo="#signup_password">
        </div>
    </div>
    <div class="form-group row">
        <div class="col-12">
            <label for="signup_role" class="labelfocus">Select type of user *</label>
            <select name="signup_role" class="form-control" id="signup_role" required>
                <option {{ Request::segment(1) == 'personal-trainer' ? "selected" : "" }} value="0">Personal Trainer</option>
                <option {{ Request::segment(1) == 'program-designer' ? "selected" : "" }} value="1">Program Designer</option>
                <option {{ Request::segment(1) == 'strength-athlete' ? "selected" : "" }} value="2">Strength Athlete</option>
            </select>
        </div>
    </div>
    <div class="checkbox custom-checkbox">
        <label>
            <input type="checkbox" value="" id="agreement-checkbox">By signing up you agree to the <a href="{{ route('tos') }}">Terms of Service</a> & <a href="{{ route('privacy') }}">Privacy Policy</a>.
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="wrapper-btn text-center text-md-right mt-3">
        <input id="submit-button" type="submit" value="CONTINUE" class="btn btn-green-gradient btn-block px-5 py-3 signup-submit" disabled>
    </div>
    <!-- <div class="no-sign-up text-center mt-3">
        <p>Already have an account? <a href="{{ route('login') }}">Login to your account.</a></p>
    </div> -->
</form>