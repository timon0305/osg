<footer>
    <div class="container">
      <div class="row justify-content-around">
        <div class="col-6 col-sm-auto mb-5 mb-md-0">
        <h3>Product</h3>
          <ul>
            <li><a href="{{ url('features')}}">Features</a></li>
            <li><a href="{{ url('strength-athlete')}}">Strength Athlete</a></li>
            <li><a href="{{ url('program-designer')}}">Program Designer</a></li>
            <li><a href="{{ url('personal-trainer')}}">Personal Trainer</a></li>
          </ul>
        </div>
        <div class="col-6 col-sm-auto mb-5 mb-md-0">
        <h3>About</h3>
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="{{ url('about')}}">About us</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="col-6 col-sm-auto mb-5 mb-md-0">
        <h3>For Users</h3>
          <ul>
            <!-- <li><a href="{{ url('login')}}">Login</a></li> -->
            <li><a href="{{ url('register')}}">Get Started</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>
        <div class="col-6 col-sm-auto mb-5 mb-md-0">
        <h3>Follow Us</h3>
          <ul>
            <li><a href="#"><i class="fa fa-facebook-f"></i> Facebook</a></li>
            <li><a href="#"><i class="fa fa-twitter"></i> Twitter</a></li>
            <li><a href="#"><i class="fa fa-instagram"></i> Instagram</a></li>
            <li><a href="#"><i class="fa fa-youtube"></i> Youtube</a></li>
          </ul>
        </div>
        <div class="col-6 col-sm-auto mb-5 mb-md-0">
        <h3 class="no-blur">Download</h3>
          <ul>
            <li><a href="#" class="img-fluid mx-auto d-block mb-3"><img src="/images/btn--google-play.png" alt="Google-Play"></a></li>
            <li><a href="#" class="img-fluid mx-auto d-block"><img src="/images/btn--app-store.png" alt="App-Store"></a></li>
          </ul>
        </div>
      </div>
      <section class="footer-info">
        <div class="row">
          <div class="col-12 col-sm-12 col-lg-8 text-center text-lg-left">
              <img src="/images/logo.png" alt="logo" class="img-fluid d-inline-block logo-footer">
              <p class="d-inline-block">Copyright {{date('Y')}} © Optimal Strength Gains AS. All Rights Reserved.</p>
          </div>
          <div class="col-12 col-sm-12 col-lg-4 text-center text-lg-right">
            <p><a href="https://fantasylab.io/ui-ux-design" target="_blank"><span>UI & UX Design & </span></a><a href="https://fantasylab.io/web-development" target="_blank"><span>Web Development: </span></a><a href="https://fantasylab.io" target="_blank"><span>FantasyLab.</span></a></p>
          </div>
        </div>
      </section>
    </div>
  </footer>