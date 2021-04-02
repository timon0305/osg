@extends('layouts.public')
@section('title', $title)

@section('content')

<div class="strength_athlete home">
	<section id="main-call-to-action">
		<img src="images/strength-athlete-banner-new.png" class="w-100 img-fluid mx-auto d-block" alt="">
		<div class="content-cta">
			<div class="container h-100">
				<div class="row justify-content-center align-items-center h-100">
					<div class="col-12 col-sm-12 col-md-12 col-lg-10 learnmore-bannercontent ">
						<div class="banner_img"><img src="images/benifit_follow_img.png" alt=""></div>
						<h2><small>I am a</small>STRENGTH ATHLETE</h2>
						<div class="stars">
							<img src="images/stars.png" class="img-fluid d-block mx-auto" alt="">
							<p class="content">Has your progress stalled? If your main focus is to increase muscle mass or strength, or you want to learn what programs and program designs that suits you best, then Optimal Strength Gains is the solution for you.
							</p>
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
				<div class="benefits_reister">
					<img src="images/benefit_build_img.png" alt="images">
					<p>The Program Design will reveal the programs that suit you the best regarding the different training variables. The more programs you complete, the better guidance we can provide to you. </p>
				</div>
				<div class="benefits_follow">
					<img src="images/benefit_fdbck_img.png" alt="images">
					<p>Get feedback on how well you responded to a completed strength training program, compared to other Strength athletes with similar traits and variables. </p>
				</div>
			</div>
		</div>
	</div>
	<div class="trophy_wall_parent">
		<div class="container trophy-walls1">
			<div class="row justify-content-center">
				<div class="col-lg-7 timeline_content">
					<h1>TROPHY WALL</h1>
					<p>Choose one exercise for each of the three major muscle groups;  chest, back and quads, that you want to monitor closely. See how your strength level progresses from one program to the next and compare your strength level to other Strength athletes. Get rewarded with a golden trophy each time you reach a new and higher level.</p>
				</div>
				<div class="tropches">
					<img src="images/screenshots/Graph 1.png" alt="">
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid d-flex trophy-walls">
		<div class="row justify-content-center">
			<div class="col-lg-5 trophy_content">
				<h1>TIMELINE</h1>
				<p>Get an overview of all the programs you have completed, and the status and fluctuation of important lifestyle factors like calorie consumption, body weight in combination with hip to waist ratio, stress level and sleep level. </p>
				<p>The timeline will intuitively tell you where you need to improve regarding lifestyle and fatigue factors.</p>
			</div>
			<div class="col-lg-10 trophy_table d-flex justify-content-center">
				<img src="images/screenshots/Timeline.png" alt="" class="img-fluid">
			</div>
		</div>
	</div>
	<div class="container-fluid d-flex performance-you">
		<div class="row justify-content-center">
			<div class="col-lg-6 performance_content">
				<h1>PERFORMANCE TABLE</h1>
				<p>The Performance table analyzes all the programs you have completed and shows detailed information like one repetition maximum results (1 RM) in the test exercises, relevant background information, average sleep-, stress- and energy level.</p>
				<p>Analyze your achieved results or percentage increase, in the programs test exercises. By comparing your results to the program designers Experience bank, we can find out how well you responded to a specific program, compared to other Strength athletes, like your Mirror athletes. Your Mirror athletes are the Strength athletes who resembles you the most by having the same gender, age, height, weight, waist to hip ratio, strength level and more, like you.</p>
				<p>In the Fatigue & Recovery section you can see how well you adopted to the program and how your fatigue levels varied from session to session and over time. </p>
				<p>Read your exercise notes and get recommendations for further improvements.</p>
			</div>
			<div class="col-lg-8 performance_table justify-content-center">
				<img src="images/screenshots/performance-table.png" alt="" class="img-fluid">
			</div>
		</div>
	</div>
	<div class="container-fluid top_permo">
		<div class="row justify-content-center">
			<div class="col-lg-6">
				<h1>TOP PROGRAM DESIGNS </h1>
				<p>People are different and respond differently to the same program design. The Program designs identifies the main structure of the program, in terms of intensity, training volume, frequency and more. </p>
				<p>The Top training design table tells you which program and program design you responded best to, for each major muscle group.</p>
			</div>
			<div class="col-lg-10">
				<div class="table-top-program">
					<img src="images/screenshots/TopProgram.png" alt="" class="img-fluid">
				</div>
			</div>
		</div>
	</div>
	<div class="container-fluid d-flex calendar-sec">
		<div class="row justify-content-center">
			<div class="col-lg-6">
				<h1>CALENDAR & TRAINING LOG</h1>
				<p>Download a desired program from a Program designer profile, to your calendar. Log the sets on your mobile phone during the work out with the help of an auto-regulation function that automatically adjusts your working load based on your current fatigue and energy level. </p>
				<p>The green days in the calendar are sessions you have completed, the red days are sessions you missed, and the blue days are upcoming sessions.</p>
			</div>
			<div class="col-lg-8 strength_calendar">
				<br>
				<img src="images/screenshots/strength_calendar.png" alt="" class="img-fluid">
			</div>
		</div>
	</div>
	<div class="strength-news">
		<div class="container">
      <div class=" row">
				<div class="col-lg-6 mobile">
					<div class="news_content">
						<h3 class="text-uppercase">Workout Log</h3>
						<p>Track your progress on a set-to-set basis. The strength programs have individualized and built in progression strategy or strategies. If you exceed the target reps or target reps to failure (RTF), the working load on the next set is increased, or vice versa. This allows you to progress at your own rate while having clear targets to aim for.</p>
					</div>
				</div>
				<div class="col-lg-6">
					<img src="images/screenshots/workout-log.png" alt="" class="img-fluid">
				</div>
				<div class="col-lg-6 desktop">
					<div class="news_content">
						<h3 class="text-uppercase">Workout Log</h3>
						<p>Track your progress on a set-to-set basis. The strength programs have individualized and built in progression strategy or strategies. If you exceed the target reps or target reps to failure (RTF), the working load on the next set is increased, or vice versa. This allows you to progress at your own rate while having clear targets to aim for.</p>
					</div>
				</div>
      </div>
   	</div>
	</div>
	<div class="strength-news news_feed">
		<div class="container">
			<div class=" row">
				<div class="col-lg-6">
					<div class="news_content">
						<h3>NEWSFEED</h3>
						<p>Communicate with your clients, give them guidance and answer questions. The Newsfeed gives you also the opportunity to attract new clients by marketing, blogging and by taking an active approach.</p>
					</div>
				</div>
				<div class="col-lg-6">
					<img src="images/screenshots/strength_feed.png" alt="" class="img-fluid">
				</div>
			</div>
		</div>
	</div>
  <div class="home strength_form">
  	<section id="get-started" class="starter_log">
   		<div class="col-lg-12 col-12 col-sm-12 col-md-8 align-self-center d-flex justify-content-center">
       	<div class="content-form col-lg-8">
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
  </div>
</div>

@endsection

@section ('scripts')
<script>
	jQuery(function(){
		new osg.Controllers.home();
		new osg.Controllers.SignupStep();
	});
</script>
@endsection