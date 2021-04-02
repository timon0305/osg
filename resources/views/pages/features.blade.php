@extends('layouts.public') 
@section('title', $title) 
@section('content')
<div class="learn-more">
   <div class="btn text-center p-0 sticky-btn" id="sticky-btn">
      <a href="{{ url('register') }}" id="register-btn">Create Free Account</a>
   </div>
   <div class="container-fluid topgetstart" id="start-top">
      <div class="row justify-content-center">
         <div class="col-lg-9 offset-lg-1">
            <ul>
               <li><a href="#strengthdiv" class="active" id="li1"><span>1</span>STRENGTH STANDARDS</a></li>
               <li><a href="#expdiv" id="li2"><span>2</span>EXPERIENCE BANK</a></li>
               <li><a href="#autodiv" id="li3"><span>3</span>AUTO REGULATION</a></li>
               <li><a href="#designdiv" id="li4"><span>4</span>PROGRAM DESIGNS</a></li>
            </ul>
         </div>
         <!--<div class="col-lg-2">
            <button class="btn">GET STARTED</button>
         </div> -->
      </div>
   </div>
   <div class="container-fluid tophead featureshead">
      <div class="row no-gutters desktop">
         <div class="content">
            <div class="left-head">
               <img src="/images/osg-banner-icon.png">
            </div>
            <div class="right-head">
               <p>FEATURES</p>
               <h2>We are proud to present you with OSG’s features. By implementing important scientific strength training theory and principles, your training will become both effective and fun.
               </h2>
            </div>
         </div>
      </div>
      <div class="row mobile">
         <div class="content">
            <img src="images/mobileban1.png" class="img-fluid"/>
            <h2>We are proud to present you with Optimal Strength Gains features.</h2>
            <!-- <div class="btn text-center p-0">
               <a href="{{ url('register') }}" >Create Free Account</a>
            </div> -->
         </div>
      </div>
   </div>
   <div class="container-fluid starter123 top_start featuretop" id="strengthdiv">

      <div class="row mobilechange11 desktop">
         <div class="col-lg-6 text-center">
            <img src="images/featurebg2.png" class="img-fluid" style="width: 80%!important;"/>
         </div>

         <div class="col-lg-5 storycont feature-strength">
            <p>STRENGTH STANDARDS</p>
            <h2>Strength standards are objective benchmarks that shows how strong you are compared to other Strength athletes. Strength standards are beneficial when setting goals and tracking your individual progress.</h2>
         </div>
      </div>

      <div class="row mobilechange11 mobile mt-4">
         
         <div class="col-lg-6 text-center mt-4">
            <img src="images/featurebg2.png" class="img-fluid" style="width: 80%!important;"/>
         </div>

         <div class="col-lg-5 storycont text-center">
            <p>STRENGTH STANDARDS</p>
            <h2>Strength standards are objective benchmarks that shows how strong you are compared to other Strength athletes. Strength standards are beneficial when setting goals and tracking your individual progress.</h2>
         </div>
         
      </div>

      <div class="row benefitcontent justify-content-center">
         <div class="col-lg-3">
            <span>1</span>
            <h3>Level</h3>
            <p>The Strength athletes level is a product of your one repetition maximum (1 RM) in a given exercise combined with your body weight or weight class.</p>
         </div>
         <div class="col-lg-3">
            <span>2</span>
            <h3>Body Weight</h3>
            <p>In general, the heavier you are the more absolute strength you can develop, which means that a heavier lifter can lift the highest amount of weight.</p>
         </div>
         <div class="col-lg-3">
            <span>3</span>
            <h3>Height</h3>
            <p>Lifting weights involves applying force against a resistance. The amount of force you apply over a given distance shows us just how much work you have done.</p>
         </div>
      </div>
      <div class="row benefitcontent justify-content-center">
         <div class="col-lg-3">
            <span>4</span>
            <h3>Waist to Hip Ratio</h3>
            <p>Waist to hip ratio is an indirect measurement of your body-fat mass. A smaller waist to hip ratio and high body weight indicates more muscle mass and a smaller body-fat percentage.</p>
         </div>
         <div class="col-lg-3">
            <span>5</span>
            <h3>Age</h3>
            <p>Someone who is in their 20’s will have a better potential to lift heavier and respond better to strength training in general, compared to someone in their 50’s.</p>
         </div>
         <div class="col-lg-3">
            <span>6</span>
            <h3>Dominant Muscle Fiber Type</h3>
            <p>Fast-twitch muscle fibers generate more power and strength but fatigue much faster and require more time for recovery. Slow-twitch muscle fibers can sustain activity for longer periods.</p>
         </div>
      </div>
   </div>
   <div class="container-fluid starter123 top_start experience" id="expdiv">
      <div class="row">
         <div class="col-lg-5 offset-lg-1 text-center">
            <img src="images/bankbg.png" class="img-fluid" style="width: 80%;"/>
         </div>
         <div class="col-lg-4 storycont experience-bank">
            <p>EXPERIENCE BANK</p>
            <h2>The Experience bank gathers information about your progress after completing a program. It also guides you to the programs that you will most likely respond the best to.
            </h2>
         </div>
      </div>
      <div class="row benefitcontent justify-content-center">
         <div class="col-lg-3">
            <span>1</span>
            <h3>Test Exercises</h3>
            <p>Each program has one to several test exercises, and each test exercise has an Experience bank for men and one Experience bank for women.</p>
         </div>
         <div class="col-lg-3">
            <span>2</span>
            <h3>The Results</h3>
            <p>By completing the pre- and post “as many reps as possible” (AMRAP) test set in the test exercise, we can calculate your 1 RM, level and percentage increase or results.</p>
         </div>
         <div class="col-lg-3">
            <span>3</span>
            <h3>Variables</h3>
            <p>Your results are tagged with your individual input variables which affects performance such as level, body weight, height, waist to hip ratio, age and dominant muscle fiber type.</p>
         </div>
      </div>
      <div class="row benefitcontent justify-content-center">
         <div class="col-lg-3">
            <span>4</span>
            <h3>Mirror Athletes</h3>
            <p>Your Mirror athletes are other real world Strength athletes who are similar to you in regard to strength level, body weight, height, waist to hip ratio, age, and dominant muscle fiber type.</p>
         </div>
         <div class="col-lg-3">
            <span>5</span>
            <h3>Responsiveness</h3>
            <p>The Strength athlete log in profile will display how well you responded to the completed program compared to the other Strength athletes.</p>
         </div>
         <div class="col-lg-3">
            <span>6</span>
            <h3>Guidance</h3>
            <p>The Experience bank search section will tell you which programs you most likely will respond best to, based on earlier input from other Strength athletes with similar traits.</p>
         </div>
      </div>
   </div>
      
   <div class="container-fluid starter123 top_start autotop" id="autodiv">

      <div class="row mobilechange11 desktop">
      <div class="col-lg-6 text-center">
            <img src="images/autobg.png" class="img-fluid" style="width: 80%!important;"/>
         </div>
         <div class="col-lg-5 storycont feature-strength mt-5">
            <p>AUTO REGULATION</p>
            <h2>Strength does not always evolve as planned in the Progression builder, since predetermined programs does not take into account the individual lifters fatigue level on a daily basis.</h2>
         </div>

      </div>

      <div class="row mobilechange11 mobile mt-4">
         <div class="col-lg-6 text-center mt-4">
            <img src="images/autobg.png" class="img-fluid" style="width: 80%!important;"/>
         </div>
         <div class="col-lg-5 storycont text-center">
            <p>AUTO REGULATION</p>
            <h2>Strength does not always evolve as planned in the Progression builder, since predetermined programs does not take into account the individual lifters fatigue level on a daily basis.</h2>
         </div>
      </div>

      <div class="row benefitcontent justify-content-center">
         <div class="col-lg-3">
            <span>1</span>
            <h3>Fatique</h3>
            <p>The predetermined weight increased from session to session is not always doable since it does not take into account your current shape, degree of readiness, stress and sleep level.
            </p>
         </div>
         <div class="col-lg-3">
            <span>2</span>
            <h3>Load Progression</h3>
            <p>Autoregulation is a very useful system that automatically individualizes load progression and allows you to train with higher loads on days with low fatigue and vice versa.</p>
         </div>
         <div class="col-lg-3">
            <span>3</span>
            <h3>Training Log</h3>
            <p>By comparing the target reps with performed reps and target reps to failure (RTF) with performed RTF, the load on the next set is either up- or down regulated.
            </p>
         </div>
      </div>
      <div class="row benefitcontent justify-content-center">
         <div class="col-lg-3">
            <span>4</span>
            <h3>Reps to Failure</h3>
            <p>RTF are based on how many repetitions are remaining at the completion of a set and adjusts load automatically to match athlete capabilities on a set-to-set basis.</p>
         </div>
         <div class="col-lg-3">
            <span>5</span>
            <h3>The RTF Scale</h3>
            <p>The RTF scale is rated from zero to ten, and measures the feeling of effort, strain discomfort, and/or fatigue experienced during resistance training.</p>
         </div>
         <div class="col-lg-3">
            <span>6</span>
            <h3>Individualization</h3>
            <p>Autoregulation not only individualizes week-to-week progression, but it allows for different days within a week to be progressed individually.</p>
         </div>
      </div>
   </div>
   <div class="container-fluid starter123 top_start pdesign" id="designdiv">
      <div class="row">
         <div class="col-lg-5 offset-lg-1 text-center">
            <img src="images/pdesignbg.png" class="img-fluid" style="width: 80%;"/>
         </div>
         <div class="col-lg-4 storycont experience-bank experience-bank1">
            <p>PROGRAM DESIGNS</p>
            <h2>After completing programs, the Program designs reveals how much (volume) and often (frequency) you should train, with what intensity (load and RTF), with which exercises and more.
            </h2>
         </div>
      </div>
      <div class="row benefitcontent justify-content-center">
         <div class="col-lg-3">
            <span class="vol-span">1</span>
            <h3 class="vol-change">Volume</h3>
            <p>Volume is the same as reps x sets and can be measured by total reps per muscle group per week. Volume can also be calculated as reps x sets x load, which is called volume load.</p>
         </div>
         <div class="col-lg-3">
            <span class="inten-span">2</span>
            <h3 class="inten-change">Intensity</h3>
            <p>The intensity of load are how much you are lifting (percentage of 1 repetition maximum), and the intensity of effort are how close you are to failure (Reps to failure).</p>
         </div>
         <div class="col-lg-3">
            <span class="freq-span">3</span>
            <h3 class="freq-change">Frequency</h3>
            <p>Frequency is how you spread volume and intensity across a training week. Frequency can be measured by training sessions per muscle group per week.</p>
         </div>
      </div>
      <div class="row benefitcontent justify-content-center">
         <div class="col-lg-3">
            <span>4</span>
            <h3>Progression Strategies</h3>
            <p>Volume, intensity and frequency are all interrelated and affect one another. The Program designer can choose between volume-, intensity- and/or frequency progression strategies.</p>
         </div>
         <div class="col-lg-3">
            <span>5</span>
            <h3>Periodization Models</h3>
            <p>The manipulation of volume, intensity and frequency over time, can be done by utilizing periodization models like linear-, wave loading-, block-, and undulation periodization.</p>
         </div>
         <div class="col-lg-3">
            <span>6</span>
            <h3>Rest Period</h3>
            <p>Rest period between sets is measured in seconds and minutes. A short rest period for example is 30 seconds and a long rest period could be 4-5 minutes.</p>
         </div>
      </div>
      <div class="row benefitcontent justify-content-center lastbank">
         <div class="col-lg-3">
            <span>7</span>
            <h3>Exercise Selection</h3>
            <p>Multi joint exercises are movements that activate several muscles and generate a lot of strength, and Single joint exercises or isolation exercises engage a single muscle group.</p>
         </div>
         <div class="col-lg-3">
            <span>8</span>
            <h3>Tempo</h3>
            <p>E.g. “3-0-2-1”, means 3 seconds lowering the load (eccentric), 0 seconds in the bottom position (stretch), 2 seconds raising the load (concentric), and 1 second at the top position (peak).</p>
         </div>
         <div class="col-lg-3">
         </div>
      </div>
   </div>
   <div class="container-fluid get-started-content">
      <div class="row">
         <div class="col-lg-6 offset-lg-2 no_left text-box">
            <h4>GET STARTED</h4>
            <h3>Create your profile today and start achieving your fitness goals.</h3>
         </div>
      </div>
      <div class="row getstartgrid">
         <div class="col-lg-3 offset-lg-2 no_left">
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
         element.style.cssText += "top: -46px;";
       } else {                                                                        
         element.style.cssText += "top: -5px;";
       }
     }
     window.onscroll = myFunction;
     
     $('#li1').click(function(){
       $(this).addClass('active');
       $('#li2').removeClass('active');
       $('#li3').removeClass('active');
       $('#li4').removeClass('active');
     });
   
     $('#li2').click(function(){
       $(this).addClass('active');
       $('#li1').removeClass('active');
       $('#li3').removeClass('active');
       $('#li4').removeClass('active');
     });
   
     $('#li3').click(function(){
       $(this).addClass('active');
       $('#li2').removeClass('active');
       $('#li1').removeClass('active');
       $('#li4').removeClass('active');
     });
   
     $('#li4').click(function(){
       $(this).addClass('active');
       $('#li2').removeClass('active');
       $('#li3').removeClass('active');
       $('#li1').removeClass('active');
     });
       
</script>
@endsection