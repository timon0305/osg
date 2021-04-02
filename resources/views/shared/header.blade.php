<header>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container position-relative">
        <a class="navbar-brand" href="{{ url('/') }}"><img src="/images/logo.png" class="img-fluid d-block mx-auto" alt=""></a>
        <button class="navbar-toggler" type="button">
            <span class="bar1"></span>
            <span class="bar2"></span>
            <span class="bar3"></span>
        </button>

        <div class="collapse navbar-collapse mobile" id="navbarSupportedContent">
            <div class="ml-auto navbar-nav">
                <ul class="menu-box navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="{{route('home')}}">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{route('about')}}">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{route('how-it-works')}}">How it works</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{route('features')}}">Features</a>
                    </li>
                </ul>
                <ul class="nav-session">
                    <!-- <li>
                        <a class="white-text" href="{{route('login')}}">Login</a>
                    </li> -->
                    <li>
                        <a class="btn btn-green-gradient px-4" href="{{route('register')}}">Sign up</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </nav>
</header>