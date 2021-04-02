@extends('layouts.public')
@section('title', $title)

@section('content')
<div class="learn-more">
   <div class="btn text-center p-0 sticky-btn" id="sticky-btn">
      <a href="{{ url('register') }}" id="register-btn">Create Free Account</a>
   </div>
   <div class="container-fluid topgetstart" id="start-top">
      <div class="row justify-content-center">
         <div class="col-lg-8 offset-lg-2">
            <ul>
               <li><a href="#strengthdiv" id="stdiv" class="active"><span>1</span>STRENGTH ATHLETE</a></li>
               <li><a href="#programdiv" id="prdiv"><span >2</span>PROGRAM DESIGNER</a></li>
               <li><a href="#personaldiv" id="pediv"><span>3</span>PERSONAL TRAINER</a></li>
            </ul>
         </div>
         <!--<div class="col-lg-2">
            <button class="btn">GET STARTED</button>
         </div> -->
      </div>
   </div>
   <div class="container-fluid tophead howtop">
      <div class="row no-gutters">
         <div class="howtop-content">
            <div class="lefthead">
               <p>HOW IT WORKS</p>
               <h2>Each of the three profile types and the four features work together symbiotically, where they enhance each other through data analysis.
               </h2>
            </div>
            <div class="desktop-img">
               <img src="/images/bannerright.png">
            </div>
            <div class="mobile-img">
               <img src="/images/how-it-works-mobile.png">
            </div>
         </div>
      </div>
   </div>
   <div class="container-fluid starter123 top_start howstart"  id="strengthdiv">
      <div class="row">
         <div class="col-lg-1 mt-4 mb-4 numbe1 mobile">
            <img src="images/hownum1.png" class="img-fluid numimg">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how1.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1 mt-4 numbe1 desktop">
            <img src="images/hownum1.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <p>STRENGTH ATHLETE</p>
            <h2>Search & find programs</h2>
            <h5>Find the most optimal programs for you via our search feature in the Program designs or Experience bank sections. Then upload the desired program to your own Calendar & workout log</h5>
         </div>
      </div>
   </div>
   <div class="container-fluid starter123">
      <div class="row">
         <div class="col-lg-6 offset-lg-2">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how11.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <h2>Start training</h2>
            <h5>Start the training program and track each session on your smart phone. Your workload will automatically adjust on a set-to-set basis, depending on your current fatigue level.</h5>
         </div>
      </div>
   </div>
   <div class="container-fluid starter123 top_start1">
      <div class="row">
         <div class="col-lg-6 offset-lg-2">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how8.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <h2>Complete the program</h2>
            <h5>Complete the program and get your results analyzed, by comparing your results with the Strength standards and the Experience banks. Learn which program design best suits you.
            </h5>
         </div>
      </div>
      <div class="d-flex justify-content-center">
         <a class="btn btn-yellow-gradient py-3 px-4 mr-0 text-uppercase" href="{{ url('strength-athlete') }}">Learn More</a>
      </div>
   </div>
   <div class="container-fluid secstarter123 top_start" id="programdiv">
      <div class="row">
         <div class="col-lg-1 mt-4 mb-4 numbe1 mobile">
            <img src="images/hownum2.png" class="numimg">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how3.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1 mt-4 numbe1 desktop">
            <img src="images/hownum2.png" class="numimg">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <p>PROGRAM DESIGNER</p>
            <h2>Design strength training programs</h2>
            <h5>Design comprehensive strength training programs in the Calendar builder and Progression builder. Display the Program design, and publish your program making it available for the Strength athletes.</h5>
         </div>
      </div>
   </div>
   <div class="container-fluid secstarter123">
      <div class="row">
         <div class="col-lg-6 offset-lg-2">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how4.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <h2>Get feedback</h2>
            <h5>Get objective feedback on how well different Strength athletes respond to your program. Get subjective feedback from Strength athletes such as reviews and comments in your newsfeed.</h5>
         </div>
      </div>
   </div>
   <div class="container-fluid secstarter123 top_start1">
      <div class="row">
         <div class="col-lg-6 offset-lg-2">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how9.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <h2>Learn and Improve</h2>
            <h5>Learn how your theoretical program works in practice, and use your gained insights and knowledge to build even better programs. Use our Learn more section to master the fundamental strength training principles.</h5>
         </div>
      </div>
      <div class="d-flex justify-content-center">
         <a class="btn btn-yellow-gradient py-3 px-4 mr-0 text-uppercase" href="{{ url('program-designer') }}">Learn More</a>
      </div>
   </div>
   <div class="container-fluid thirdstarter123 top_start" id="personaldiv">
      <div class="row">
         <div class="col-lg-1 mt-4 mb-4 numbe1 mobile">
            <img src="images/hownum3.png" class="numimg">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how5.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1 mt-4 numbe1 desktop">
            <img src="images/hownum3.png" class="numimg">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <p>PERSONAL TRAINER</p>
            <h2>Register your clients</h2>
            <h5>Register your clients as Strength athletes. Find the best programs through the Program designs or Experience banks sites. As an online coach you can follow up your clients closely at their Strength athlete profiles. </h5>
         </div>
      </div>
   </div>
   <div class="container-fluid thirdstarter123">
      <div class="row">
         <div class="col-lg-6 offset-lg-2">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how10.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <h2>Faciliate your bookings</h2>
            <h5>Display where you work, your background and specialities, your offers and when you are available so that strength athletes can  book one-to-one sessions in your calendar.</h5>
         </div>
      </div>
   </div>
   <div class="container-fluid thirdstarter123 top_start1">
      <div class="row">
         <div class="col-lg-6 offset-lg-2">
         </div>
         <div class="col-lg-5" align="right">
            <img src="images/how7.png" class="img-fluid roundimg">
         </div>
         <div class="col-lg-1">
         </div>
         <div class="col-lg-4 mobnumbg1">
            <h2>My clients results</h2>
            <h5>My clients results will tell the truth regards to the results your clients are getting. Use this to your advantage when it comes to learning, improving end even as an effective marketing tool.  </h5>
         </div>
      </div>
      <div class="d-flex justify-content-center">
         <a class="btn btn-yellow-gradient py-3 px-4 mr-0 text-uppercase" href="{{ url('personal-trainer') }}">Learn More</a>
      </div>
   </div>
   <div class="container-fluid benefitscont">
      <div class="row">
         <div class="col-lg-12 text-center">
            <h5>BENEFITS</h5>
            <h2>Why Optimal Strength Gains?</h2>
         </div>
      </div>
      <div class="row benefitcontent">
         <div class="col-lg-2">
         </div>
         <div class="col-lg-2">
            <span>1</span>
            <h3>It adds value</h3>
            <p>Don't base your desicions only on subjective assumptions.</p>
         </div>
         <div class="col-lg-2">
            <span>2</span>
            <h3>It's intuitive</h3>
            <p>Your profile is all displayed on one site, with no hidden info. </p>
         </div>
         <div class="col-lg-2">
            <span>3</span>
            <h3>It’s fun</h3>
            <p>Reach your goals and interact with other strength enthusiasts.</p>
         </div>
         <div class="col-lg-2">
            <span>4</span>
            <h3>It’s new</h3>
            <p>The platform represents features never seen before. </p>
         </div>
         <div class="col-lg-2">
         </div>
      </div>
   </div>
   <div class="container-fluid get-started-content">
      <div class="row">
         <div class="col-lg-6 offset-lg-2">
            <h4>GET STARTED</h4>
            <h3>Create your profile today and start achieving your fitness goals.</h3>
         </div>
      </div>
      <div class="row getstartgrid">
         <div class="col-lg-3 offset-lg-2">
            <div class="img-content">
               <img src="images/howpro1.png" class="img-fluid">
               <h2>The Strength Athlete</h2>
               <p class="mb-0">When you complete programs you will see how well you responded compared to your peer trainee. Learn which program design suits you the best and take action!</p>
               <div class="btn-group">
                  <a href="{{ url('register?strengthAthlete') }}"> <button class="btn">SIGN UP</button></a>
                  <a href="{{ url('strength-athlete') }}" class="learn">LEARN MORE</a>
               </div>
            </div>
         </div>
         <div class="col-lg-3">
            <div class="img-content">
               <img src="images/howpro2.png" class="img-fluid">
               <h2>The Program Designer</h2>
               <p class="mb-0">Create and publish your own programs! Get feedback on how different Strength athletes respond to your program through the Experience bank and users Reviews.</p>
               <div class="btn-group">
                  <a href="{{ url('register?programDesigner')}}"><button class="btn">SIGN UP</button></a>
                  <a href="{{ url('program-designer') }}" class="learn">LEARN MORE</a>
               </div>
            </div>
         </div>
         <div class="col-lg-3">
            <div class="img-content">
               <img src="images/howpro3.png" class="img-fluid">
               <h2>The Personal Trainer</h2>
               <p class="mb-0">Interact with your clients! Let Optimal Strength Gains find the best strength training programs for customers with different needs and goals.</p>
               <div class="btn-group">
                  <a href="{{ url('register?personalTrainer') }}"><button class="btn">SIGN UP</button></a>
                  <a href="{{ url('personal-trainer') }}" class="learn">LEARN MORE</a>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>

function myFunction() {
   var element = document.getElementById("start-top");
   var desiredPosition = 50;
   if (window.pageYOffset > desiredPosition) {
      element.style.cssText += "top: -48px;";
   } else {
      element.style.cssText += "top: -6px;";
   }
  }
  window.onscroll = myFunction;

  $('#prdiv').click(function(){
    $(this).addClass('active');
    $('#pediv').removeClass('active');
    $('#stdiv').removeClass('active');
  });

  $('#stdiv').click(function(){
    $(this).addClass('active');
    $('#pediv').removeClass('active');
    $('#prdiv').removeClass('active');
  });

  $('#pediv').click(function(){
    $(this).addClass('active');
    $('#stdiv').removeClass('active');
    $('#prdiv').removeClass('active');
  });

    </script>
@endsection
