<section id="main-call-to-action">
    <img src="images/header-bg.png" class="w-100 img-fluid mx-auto d-block" alt="">
    <div class="content-cta">
        <div class="container h-100">
            <div class="row justify-content-center align-items-center h-100">
                <div class="col-12 col-sm-12 col-md-12 col-lg-10">
                    <h2><small>A NEW WAY TO</small>  CREATE, FIND & TRACK <br>STRENGTH TRAINING PROGRAMS</h2>
                    <div class="stars">
                        <img src="images/stars.png" class="img-fluid d-block mx-auto" alt="">
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="button-group">
                            <a class="btn btn-green-gradient px-5 py-3 mt-3 mt-sm-0" href="{{ url('register') }}">Get started</a>
                            <a class="btn btn-yellow-gradient py-3 px-4 mr-0" href="{{ url('how-it-works') }}">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="#learn-more" class="view-more anchor"><i class="fa fa-angle-down"></i></a>
    </div>
</section>

<a name="learn-more" id="learn-more"></a>
<section id="secondary-call-to-action">
    <div class="row no-gutters">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4">
            <div class="call-to-action calbg">
                <img src="images/girl-training.jpg" class="w-100 img-fluid mx-auto d-block" alt="">
                <div class="content">
                    <h2><small>I am a</small>Strength Athlete</h2>
                    <p>Discover the optimal strength training program for you and compare your results to other strength athletes similar to you.</p>
                    <div class="buttons">
                        <a class="btn btn-green-gradient py-3 px-4 mr-0 mr-md-4" href="{{route('register', ['strengthAthlete'])}}">Sign Up</a>
                        <a class="btn btn-yellow-gradient py-3 px-4 mr-0 mr-md-4" href="{{ url('strength-athlete') }}">Learn More</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-4 col-sm-12 col-md-4">
            <div class="call-to-action calbg">
                <img src="images/list.jpg" class="w-100 img-fluid mx-auto d-block" alt="">
                <div class="content">
                    <h2><small>I am a</small>Program Designer</h2>
                    <p>Develop and publish training programs. Receive feedback and reviews on how different strength athletes respond to your program through our wide user experience database.</p>
                    <div class="buttons">
                        <a class="btn btn-green-gradient py-3 px-4 mr-0 mr-md-4" href="{{route('register', ['programDesigner'])}}">Sign Up</a>
                        <a class="btn btn-yellow-gradient py-3 px-4 mr-0 mr-md-4" href="{{ url('program-designer') }}">Learn More</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-4 col-sm-12 col-md-4">
            <div class="call-to-action calbg personal-trainer">
                <img src="images/hands-five.jpg" class="w-100 img-fluid mx-auto d-block" alt="">
                <div class="content">
                    <h2><small>I am a</small>Personal Trainer</h2>
                    <p>Build your client base and communicate with your clients. Find the best, tailored strength training programs for strength athletes.</p>
                    <div class="buttons">
                        <a class="btn btn-green-gradient py-3 px-4 mr-0 mr-md-4" href="{{route('register', ['personalTrainer'])}}">Sign Up</a>
                        <a class="btn btn-yellow-gradient py-3 px-4 mr-0 mr-md-4" href="{{ url('personal-trainer')}}">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
