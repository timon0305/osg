@extends('layouts.public')
@section('title', $title)
@section('content')
<div class="learn-more">
   <div class="btn text-center p-0 sticky-btn">
      <a href="{{ url('register') }}" id="register-btn">Create Free Account</a>
   </div>
   <div class="container-fluid tophead abouthead">
      <div class="row no-gutters desktop">
         <div class="content">
            <div class="left-head">
               <p>OUR MISSION</p>
               <h2>Our mission is to make workout tracking simple and provide effective workouts with our state-of-the-art training platform.</h2>
            </div>
            <div class="right-head">
               <img src="/images/osg-about-banner-icon.png">
            </div>
         </div>
      </div>

      <div class="row mobile">
         <div class="content">
            <div class="left-head">
               <p>OUR MISSION</p>
               <h2>Our mission is to provide you with the best and most comprehensive digital strength training platform available.</h2>
            </div>
            <div class="right-head">
               <div class="img text-center">
                  <img src="images/mobileban2.png" class="img-fluid"/>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="container-fluid whatsolve">
      <div class="row justify-content-center">
         <div class="col-lg-5 text-center pt-5">
            <p>OUR SOLUTION</p>
            <h2>We want to help you make the right choices for your own unique performance and strength needs. We add intuitive feedback mechanisms to guide you through your strength performance journey. </h2>
         </div>
      </div>
      <div class="row justify-content-center what-sec">
         <div class="col-lg-3 text-center">
            <img src="images/cup.png" class="img-fluid">
            <h2>Achieving results</h2>
            <h4>Objective benchmarks will tell you where you are, which goals to strive for, and call even predict how successful you will be in a given program. </h4>
         </div>
         <div class="col-lg-3 text-center">
            <img src="images/book.png" class="img-fluid">
            <h2>Empowerment & Learning</h2>
            <h4>You are unique, the way your body adapts and responds to the same training program and variables is not the same as for other Strength Athletes.</h4>
         </div>
         <div class="col-lg-3 text-center">
            <img src="images/future.png" class="img-fluid">
            <h2>Getting past plateus</h2>
            <h4>Have you ever noticed that the size of adaptions decreases with increased training experience and already achieved results?  
            </h4>
         </div>
      </div>
   </div>
   <div class="container-fluid storybg">
      <div class="row">
         <div class="content">
            <div class="storycont">
               <p>OUR STORY</p>
               <h2>The OSG team is passionate about strength training.</h2>
               <h4>A large portion of the strength training literature are just theories, and theories does not become knowledge until it has been thorough tested in practice. So we got the idea: how about creating a platform that identifies which programs that work, who they work for, and what unique characteristics these programs have? What about implementing scientific strength training principles and feedback mechanisms, which takes the guessing out of the equation? </h4>
               <h4>We aspired to create something new and useful, where you save time and gain valuable insights and increased strength gains.</h4>
               <h4>We hope that you will find OSG as helpful, intuitive and fun as we do.</h4>
            </div>
            <div class="img-cont">
               <img src="images/Our-stort-Ipad.png" class="img-fluid">
            </div>
         </div>
      </div>
   </div>
   <div class="container-fluid ourteam">
      <div class="row">
      <div class="col-lg-6 offset-lg-2 teamcont">
      <p>OUR TEAM</p>
      <h2>We value passion, innovation, technology, openness, empowerment and hard work.</h2>
      </div>
      </div>
      <div class="row teampersons justify-content-center">
      <div class="col-lg-3">
      <img src="images/Our-Team-1.png" class="img-fluid">
      <h2>Andreas Stensrud</h2>
      <h4>Chief Executive Officer</h4>
      <h6 class="andbio" id="andbio">See bio</h6>
      <h5 class="andbioexp">Andreas co-founded OSG in 2018, and has a background in medicine, personal training and has 20 years of strength training experience. </h5>
      </div>
      <div class="col-lg-3">
      <img src="images/Our-Team-2.png" class="img-fluid">
      <h2>Kamil Okonski
      </h2>
      <h4>Chief Marketing Officer</h4>
      <h6 class="kambio" id="kambio">See bio</h6>
      <h5 class="kambioexp">Kamil is a co-founder of OSG, and has background in strategic management and broad expertise in discovering consumer habits and market trends.</h5>
      </div>
      <div class="col-lg-3">
      <img src="images/Our-Team-3.png" class="img-fluid">
      <h2>Nohman Janjua</h2>
      <h4>Chief Creative Officer</h4>
      <h6 class="nohbio" id="nohbio">See bio</h6>
      <h5 class="nohbioexp">Nohman leads our design and development team and is co-founder of a leading design and software development company in Norway called FantasyLab. </h5>
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
<style type="text/css">
   body {
      background: #000000!important;
   }
   .get-started-content {
      background: white;
   }
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
   $(".andbioexp").hide();
   $(".kambioexp").hide();
   $(".nohbioexp").hide();

   $(".andbio").click(function(){
   $(".andbioexp").slideToggle();
   });

   $(".kambio").click(function(){
   $(".kambioexp").slideToggle();
   });

   $(".nohbio").click(function(){
   $(".nohbioexp").slideToggle();
   });

   $(".andbio").click(function(){
     let a = $(".andbio").html();
     if(a == 'See bio'){
      $(".andbio").html('Close bio');
     }else{
      $(".andbio").html('See bio');
     }
   });

   $(".kambio").click(function(){
     let a = $(".kambio").html();
     if(a == 'See bio'){
      $(".kambio").html('Close bio');
     }else{
      $(".kambio").html('See bio');
     }
   });

   $(".nohbio").click(function(){
     let a = $(".nohbio").html();
     if(a == 'See bio'){
      $(".nohbio").html('Close bio');
     }else{
      $(".nohbio").html('See bio');
     }
   });
</script>
@endsection
