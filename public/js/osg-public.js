var Controllers = {};

Controllers.floaLabel = function (element){
    $(element).focusout(function () {
        var text_val = $(this).val();
        $("label[for='" + this.id + "']").toggleClass('labelfocus', text_val !== "");
    }).focusout();

    $(element).focus(function () {
        $("label[for='" + this.id + "']").addClass("labelfocus");
    }).blur(function () {
        if (!$(this).val()) {
            $("label[for='" + this.id + "']").removeClass("labelfocus");
        } else {
            $("label[for='" + this.id + "']").addClass("labelfocus");
        }
    });
};

Controllers.addStickyMenu = function (){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            $('header nav').addClass("sticky");
            //nodes.contentWrapper.addClass("sticky");
        } else {
            $('header nav').removeClass("sticky");
            //nodes.contentWrapper.removeClass("sticky");
        }
    });
};

/*  */
Controllers.home = function () {
    var init = function () {
        new osg.Controllers.floaLabel('#get-started .form-control');
        new osg.Controllers.floaLabel('.sign-up-form-wrapper .form-control');
        new osg.Controllers.floaLabel('.login-content .login-form .form-control');
        new osg.Controllers.floaLabel('.reset-content .login-form .form-control');
        new osg.Controllers.addStickyMenu();
    };
    init();
};

Controllers.SignUp = function () {
    var path = '';

    var Continue = function (event) {
        event.preventDefault();
        if($("#step1-form").valid()) {
            switch ($("#role").val()) {
                case "0":
                    $("#personal-form").attr('style', 'display: block;');
                    $(".step_title").html("You have selected a <span>Personal Trainer</span> profile.");
                    $(".sign-up-benefits-wrapper").addClass('personal');
                    break;
                case "1":
                    $("#program-form").attr('style', 'display: block;');
                    $(".step_title").html("You have selected a <span>Program Designer</span> profile.");
                    $(".sign-up-benefits-wrapper").addClass('program');
                    break;
                case "2":
                    $("#strength-form").attr('style', 'display: block;');
                    $(".step_title").html("You have selected a <span>Strength Athlete</span> profile.");
                    $(".sign-up-benefits-wrapper").addClass('strength');
                    break;
            }
            $(".step_round").html('Step 2 of 2');
            $(".image-upload").attr('style', 'display: flex;');
            $("#step1-form").attr('style', 'display: none;');
        }
    };

    $("#question_muscle").on('click', function (e) {
        e.preventDefault();
        if ($(this).prop('popShown') == undefined) {
            $(this).prop('popShown', true).popover('show');
        }
    });

    $("#question_role").on('click', function (e) {
        e.preventDefault();
        if ($(this).prop('popShown') == undefined) {
            $(this).prop('popShown', true).popover('show');
        }
    });

    $('#avatarInput').on('change',function(){
        var formdata = new FormData();
        formdata.append('file', this.files[0]);
        
        $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'profile-photo',
          data: formdata,
          processData: false,
          contentType: false,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (e) {
            path = e;
            $(".icon-box").html("<img src='" + path + "'/>");
          }
        });
    });

    var Register = function (event) {
        event.preventDefault();
     
        switch ($("#role").val()) {
            case "0":
                if($("#personal-form").valid()) {
                    var form = document.getElementById('personal-form');
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'name');
                    hiddenInput.setAttribute('value', $("#first_name").val() + " " + $("#last_name").val());
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('phone');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('email');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('password');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('password_confirmation');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'role');
                    hiddenInput.setAttribute('value', '0');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'avatar');
                    hiddenInput.setAttribute('value', path);
                    form.appendChild(hiddenInput);
                    form.submit();
                }
                break;
            case "1":
                if($("#program-form").valid()) {
                    var form = document.getElementById('program-form');
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'name');
                    hiddenInput.setAttribute('value', $("#first_name").val() + " " + $("#last_name").val());
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('phone');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('email');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('password');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('password_confirmation');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'role');
                    hiddenInput.setAttribute('value', '1');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'avatar');
                    hiddenInput.setAttribute('value', path);
                    form.appendChild(hiddenInput);
                    form.submit();
                }
                break;
            case "2":
                if($("#strength-form").valid()) {
                    var form = document.getElementById('strength-form');
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'name');
                    hiddenInput.setAttribute('value', $("#first_name").val() + " " + $("#last_name").val());
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('phone');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('email');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('password');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.getElementById('password_confirmation');
                    hiddenInput.setAttribute('type', 'hidden');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'role');
                    hiddenInput.setAttribute('value', '2');
                    form.appendChild(hiddenInput);
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'avatar');
                    hiddenInput.setAttribute('value', path);
                    form.appendChild(hiddenInput);
                    form.submit();
                }
                break;
        }
    };

    var autoContinue = function() {
        if($("#step1-form").valid()) {
            switch ($("#role").val()) {
                case "0":
                    $("#personal-form").attr('style', 'display: block;');
                    $(".step_title").html("You have selected a <span>Personal Trainer</span> profile.");
                    $(".sign-up-benefits-wrapper").addClass('personal');
                    break;
                case "1":
                    $("#program-form").attr('style', 'display: block;');
                    $(".step_title").html("You have selected a <span>Program Designer</span> profile.");
                    $(".sign-up-benefits-wrapper").addClass('program');
                    break;
                case "2":
                    $("#strength-form").attr('style', 'display: block;');
                    $(".step_title").html("You have selected a <span>Strength Athlete</span> profile.");
                    $(".sign-up-benefits-wrapper").addClass('strength');
                    break;
            }
            $(".step_round").html('Step 2 of 2');
            $(".image-upload").attr('style', 'display: flex;');
            $("#step1-form").attr('style', 'display: none;');
        }
    };

    var init = function () {
        $("#submit-button").on('click', Continue);
        $(".register-button").on('click', Register);
        $perDatepicker = $("#per_birth").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            format: 'dd/mm/yyyy',
            changeMonth: true,
            changeYear: true,
            maxDate: function() {
              var date_str = moment().year()-15 + "-12-31";
              return moment(date_str).toDate();
            },
        });
        $proDatepicker = $("#pro_birth").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            format: 'dd/mm/yyyy',
            changeMonth: true,
            changeYear: true,
            maxDate: function() {
              var date_str = moment().year()-15 + "-12-31";
              return moment(date_str).toDate();
            }
        });
        $strDatepicker = $("#str_birth").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            format: 'dd/mm/yyyy',
            changeMonth: true,
            changeYear: true,
            maxDate: function() {
              var date_str = moment().year()-15 + "-12-31";
              return moment(date_str).toDate();
            }
        });
        
        var request_url = window.location.href;
        var length = request_url.split('/').length; 
        if (length > 4) {
            autoContinue();
        }
    };
    init();
};

Controllers.SignupStep = function() {
    var Continue = function(event) {
        event.preventDefault();
        if($("#signup-step1-form").valid()) {
            $("#signup-step1-form").on('submit');
        }
    };
    $('#agreement-checkbox').on('change', () => {
        var val = $('#agreement-checkbox').is(":checked");
        $('.signup-submit').prop('disabled', !val);
    });
    var init = function() {
        $(".signup-submit").on('click', Continue);
        $("#signup-step1-form").validate({
            errorClass: 'is-invalid',
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                error.insertAfter(element);
            }
          });
    };
    init();
};
var osg = {
    Controllers: Controllers
};