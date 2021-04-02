@extends('layouts.public') 
@section('title', $title) 

@section('content')
<div class="program_designer home">
<section id="main-call-to-action">
    <img src="images/program-designer-banner.png" class="w-100 img-fluid mx-auto d-block" alt="">
    <div class="content-cta">
        <div class="container h-100">
            <div class="row justify-content-center align-items-center h-100">
                <div class="col-12 col-sm-12 col-md-12 col-lg-10 learnmore-bannercontent ">
                <div class="banner_img"><img src="images/program_banner_img.png" alt=""></div>
                <h2><small>I am a</small>PROGRAM DESIGNER</h2>
 
                    <div class="stars">
                        <img src="images/stars.png" class="img-fluid d-block mx-auto" alt="">
                        <p class="content">Do you want to put your strength training program to the ultimate test? Do you want to be able to design a flawless program and get feedback on how Strength athletes respond to it? </p>
                        <p class="content">A theoretical strength training program tested in practice can give you the knowledge you need to become an exceptionally good program designer.</p>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-12 col-sm-12 col-md-10 col-lg-8">
                            <form class="get-started" method="GET" action="{{ url('register') }}">
                                <div class="form-group row">
                                    <div class="col-12 col-sm-6 col-lg-7 d-flex justify-content-center"><input type="email" id="e-mail" name="email" placeholder="E-mail address" class="form-control py-3"></div>
                                    <div class="col-12 col-sm-6 col-lg-5  d-flex justify-content-center"><button type="submit" class="btn btn-green-gradient btn-block px-5 py-3 mt-3 mt-sm-0">Get started</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</section>

<div class="benefit_bg">
   <div class="benefit">
      <h4>BENEFITS</h4>
      <div class="row mx-auto">
         <div class="benefit_build">
            <img src="images/benefit_build_img.png" alt="images">
            <p>
            Build fantastic strength training programs. An effective program is built up around training principles such as specificity, overload, variation and proper fatigue management to ensure adequate recovery, adaption and increase in performance. Your most important tools are volume-, intensity-, and frequency strategies, followed by exercises selection, methods, rest periods and tempo.
            </p>
         </div>
         <div class="benefit_fdbck">
            <img src="images/benefit_fdbck_img.png" alt="images">
            <p>
            Get feedback on how different Strength athletes respond to your program and compare the results with other strength programs. Level, gender, age, body weight, height, lean body mass and dominant muscle fiber type are variables that affect the results. For example, advanced lifters that are closer to their genetic limit will most likely respond with less magnitude compared to novice lifters.
            </p>
         </div>
         <div class="benefit_strength">
            <img src="images/benefit_strength_img.png" alt="images">
            <p>
            Autoregulation automatically regulates the training load for an exercise and muscle group. It allows the individual athlete to train with lighter loads on days with high fatigue, and with higher loads on days with low fatigue when he or she feel strong and recovered. Autoregulation automatically individualizes the load progression based on your current shape, and degree of readiness.
            </p>
         </div>
      </div>
   </div>
</div>
<div class="calendar_build">
   <div class="container">
      <div class="build_content">
         <h3>THE CALENDAR BUILDER</h3>
         <p>Build strength training programs in the Calendar builder, with drag and drop exercises and creating different sessions, then drag and drop sessions into the calendar. Create a desired split routine and choose the length of the program.</p>
         <p>In the Calendar builder you will create static programs, which means that for example Session 1 has the same variables in every week throughout the entire program.</p>
      </div>
      <img src="images/calendar_build_img.png" alt="">
   </div>
</div>
<div class="progress_build">
   <div class="container">
      <div class="row mx-auto">
         <div class="progress_build_lft">
            <h3>THE PROGRESSION BUILDER</h3>
            <p>The next step is creating a progressive overload strategy in the Progression builder. Progressive overload is a crucial concept and requires a gradual increase in volume (set x reps), intensity (Reps to failure and percentage of 1 RM) and/or frequency (sessions per muscle group/exercise per week) over time, in order to increase strength performance. Select also desired tempo, pause length and methods like straight-, super-, pre-exhaust-, giant-, drop- and pyramid set. </p>
            <p>Your goal as a Program designer is to design a program that allows for the greatest increase in the test exercises. The only mandatory rule is to choose a test exercise (or several) that are executed in the first (pretest) and last week (posttest) of the program. The test AMRAP set (as many reps as possible) will calculate the individual Strength athlete’s one repetition maximum kg value (1 RM) and is used to find the lifters level using the Strength standards. The pre- and post- 1 RM kg values are then used to determine the individual lifters result or percentage increase. The Strength athlete’s results are stored in your Experience bank.</p>
            <p>Insert some light sessions or deload weeks every now and then to ensure proper fatigue management, recovery and adoption, which is especially important before the final one repetition maximum (1 RM) test in the final week. </p>
            <p>Publish the program and make it available for the Strength athletes.</p>
         </div>
         <div class="progress_build_img">
            <img src="images/progress_build_img.png" alt="">
         </div>
      </div>
   </div>
</div>
<div class="publish_program">
   <div class="container">
      <div class="publish_content">
         <h3>PUBLISHED PROGRAMS</h3>
         <p>The published programs table shows an overview of all of your published programs, and variables like the program name, published date, number of completions, category and training split.
         </p>
      </div>
      <div class="publish_table">
         <img src="images/screenshots/Published programs.png" alt="">
      </div>
   </div>
</div>
<div class="bank_experience">
   <div class="container">
      <div class="row">
         <div class="bnk_exp_content">
            <h3>EXPERIENCE BANK</h3>
            <p>Every program has one to three test exercises, where the Strength athlete is conducting a test AMRAP set (as many reps as possible), in the first and last week of the program. </p>
            <p>The test AMRAP set will automatically calculate the 1 repetition maximum (1 RM), which is the highest weight the Strength athlete is able to perform with only one repetition and maximum effort (zero reps to failure) in the test exercise. </p>
            <p>The 1 RM results (kg) combined with body weight determines the Strength athlete’s level, ranging from Untrained to Elite level. </p>
            <p>By comparing the pre- and post 1 RM test result, we can calculate the Strength athlete’s result or the percentage increase value in the test exercise. </p>
            <p>All the percentage increase values are stored in the program’s Experience bank along with variables which affects performance such as test exercise, gender, level, body weight, age, height, waist to hip ratio and more. The percentage increase values displayed in the Experience bank are median values. The median (average) is the “middle” of a sorted list from smallest to largest of all the percentage increase values. </p>
            <p><b>The Top 3 Results</b> table displays which traits or variables and which Mirror athletes that achieved the best result after completing the program, for each level. </p>
            <p><b>Your expected result</b> table predicts the results the individual Strength athlete may achieve if he or she choose to start and complete the program, and properly manage his or hers fatigue and recovery abilities and facilitate for optimal output.</p>
         </div>
         <div class="bnk_exp_table">
            <div class="row">
               <img src="images/screenshots/experience-bank.png" alt="">
            </div>
         </div>
      </div>
   </div>
</div>
<div class="reviews">
   <div class="review_content">
      <h3>REVIEWS</h3>
      <p>In the review section, Strength athletes and Personal trainers can give feedback on their experience with your program. This enables you to learn and improve your work.</p>
   </div>
   <div class="review_chart">
      <div class="user_review">
         <img src="images/screenshots/userreview_img1.png" alt="">
      </div>
      <div class="user_review">
         <img src="images/screenshots/userreview_img2.png" alt="">
      </div>
      <div class="user_review">
         <img src="images/screenshots/userreview_img3.png" alt="">
      </div>
      <div class="user_review">
         <img src="images/screenshots/userreview_img4.png" alt="">
      </div>
      <div class="user_review">
         <img src="images/screenshots/userreview_img5.png" alt="">
      </div>
   </div>
</div>
<div class="program_design">
   <div class="container">
      <div class="program_content">
         <h3>PROGRAM DESIGN</h3>
         <P>The program design summarizes how the strength training program is structured, concerning the most important variables, like training volume, intensity, frequency and more. </p>
         <p>For the Strength athlete the program design reveals why he or she responds to it, for example exceptionally good like a high responder, or exceptionally bad like a low responder. </p>
         <p>Exercise selection is not necessarily the most important variable in a training design.</p>
      </div>
      <div class="table-top-program">
         <div class="table-responsive">
            <img src="images/screenshots/Program Design.png" alt="">
         </div>
      </div>
   </div>
</div>
<div class="training_program">
   <div class="container">
      <div class="training_program_content">
         <h3>THE TRAINING PROGRAM</h3>
         <p>The calendar function in the Program designer profile is simply called the Training program. </p>
         <p>Here the Strength athlete can see all the details of the training program, like training days, exercises, sets, reps, method and more. </p>
         <p>The Strength athlete can then download the desired program to his or her Calendar & workout log, ready to start the program where the sessions are logged on the Strength athlete’s mobile phone.</p>
      </div>
      <div class="osg-personal-trainer-booking-calendar">
         <img src="images/screenshots/calendar_pop.png" alt="calendar" class="calender_img">
      </div>
   </div>
</div>
<div class="program-news">
<div class="row mx-auto">
   <div class="container">
      <div class="news_feed d-flex">
         <div class="new_feed_lftcol">
            <div class="news_content">
               <h3>NEWSFEED</h3>
               <p>Communicate with your clients, give them guidance and answer questions. </p>
               <p>The Newsfeed gives you also the opportunity to attract new clients by marketing, blogging and by taking an active approach.</p>
            </div>
         </div>
         <div class="new_feed_rgtcol">
            <img src="images/screenshots/newsfeed_program.png" alt="">
         </div>
      </div>
   </div>
</div>
</div>

<section id="get-started" class="starter_log">
    <div class="col-lg-12 col-12 col-sm-12 col-md-8 align-self-center d-flex justify-content-center">
        <div class="content-form col-lg-8 content-form">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-10 col-lg-8 py-5 py-md-0">
                    <h2 class="black">
                        SIGN UP
                        <small>Our web app is under development. Sign up now, and we will inform you once we are live.</small>
                    </h2>
                    @include('shared.registration-form')
                </div>
            </div>
        </div>
    </div>
</section>
@endsection

@section ('scripts')
<script>
	jQuery(function(){
		new osg.Controllers.home();
		new osg.Controllers.SignupStep();
	});
</script>
@endsection