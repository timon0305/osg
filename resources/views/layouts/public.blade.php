<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') | Optimal Strength Gains</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="{{ asset('css/osg.typography.css') }}">
    <link rel="stylesheet" href="{{ asset('css/osg.css') }}">
    <link href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" rel="stylesheet" type="text/css" />
  </head>

  <body class="osg-public">
    @include('shared.header') @yield('content') @include('shared.footer') @include('sweetalert::alert')
    <script src="https://use.fontawesome.com/e5013abe85.js"></script>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.0/dist/jquery.validate.min.js"></script>
    <!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script src="https://unpkg.com/gijgo@1.9.11/js/gijgo.min.js" type="text/javascript"></script>
    <script src="{{ asset('js/osg-public.js') }}"></script>
    <!-- <script src="{{ asset('js/app.min.js') }}"></script> -->
    <script>
    $('form input').click(function(){$("label[for='" + $(this).attr('id') + "']").addClass('labelfocus');})
    $(".navbar-toggler").click(function() {
        var classList = $(this).attr('class').split(/\s+/);
        $.each(classList, function(index, item) {
            if (item === 'change') {
              $(".navbar-toggler").removeClass('change');
              $(".navbar-collapse.mobile").attr('style', 'display: none;');
            } else {
              $(".navbar-toggler").addClass('change');
              $(".navbar-collapse.mobile").attr('style', 'display: block;');
            }
        });
    });
    </script>
    @yield('scripts')
  </body>
</html>