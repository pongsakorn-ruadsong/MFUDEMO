<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();
			sessionStorage['lang'] = 'English';
			if (checkUser()) {
				getToken();
				getContent();
				// initialSwipeCard();
			}else{
				window.location.replace("index.jsp");
			}
			$('#loginBtn').click(function(){
				authPlayer();
				if (validLogin() && sessionStorage['auth'] == "true") {
					if($('#userType').prop('checked')) {
	                    sessionStorage['isAdmin'] = 'true';
	                } else {
	                    sessionStorage['isAdmin'] = 'false';
	                }
	                location.reload();
				}else{
					alert("fail log in")
				}
			});
			$('#signUpBtn').click(function (e) {
				e.preventDefault();
				if($('#mySignUp').hasClass('fadeOutUpBig'))
	                {   e.preventDefault();

	                $('#mySignUp').removeClass('fadeOutUpBig').addClass('fadeInDownBig');

	                setTimeout("$('#mySignUp').modal('show')", 550);}
	                else{
	                	$('#mySignUp').modal('show');
	                }
			});
			$('#testClose').click(function(e){
            	e.preventDefault();
	                if($('#mySignUp').hasClass('fadeInDownBig'))
	                {   e.preventDefault();
	                $('#mySignUp').removeClass('fadeInDownBig').addClass('fadeOutUpBig');
	                setTimeout("$('#mySignUp').modal('hide')", 550);}
	                else{
	                	$('#mySignUp').modal('hide');
	                }
	        });
			$('#loginModal').on('hidden.bs.modal', function () {
			  $("#userType").prop("checked", false);
			  $("#PlayerID").val('');
			  $("#passWord").val('');
			});
		});
	</script>
	<link rel="stylesheet" href="css/swiper.min.css">
	<style type="text/css">
		 .swiper-container {
		      width: 100%;
		      height: 100%;
		      max-height: 300px;
		      margin-bottom: 50px;
	    }
	    @media (max-width: 320px){
	    	.swiper-container {
		      max-height: 250px !important;
	   		}
	    }
	    .swiper-slide {
	      text-align: center;
	      font-size: 18px;
	      background: #fff;
	   
	      /* Center slide text vertically */
	      display: -webkit-box;
	      display: -ms-flexbox;
	      display: -webkit-flex;
	      display: flex;
	      -webkit-box-pack: center;
	      -ms-flex-pack: center;
	      -webkit-justify-content: center;
	      justify-content: center;
	      -webkit-box-align: center;
	      -ms-flex-align: center;
	      -webkit-align-items: center;
	      align-items: center;
	  }
	</style>
	<div class="card-box">
	<div class="swiper-container" id="wipp_con">
	    <div class="swiper-wrapper" id="wipp_userCard">
	    	<button class="swiper-slide cctest" id="guestClick" onclick="guestFunction()" style="background-color: red;">Guest</button>
	      <button class="swiper-slide" id="signInClick" style="background-color: blue;" onclick="loginModal()">Sign in</button>
	      <button class="swiper-slide" id="signUpBtn" style="background-color: green;">Sign up</button>
	    </div>
  </div>
  </div>
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
	  <div class="modal-dialog" role="document" style="margin-top: 10%;">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h1 class="modal-title" id="exampleModalLabel">Play's Log in</h1>
	      </div>
	      <div class="modal-body" style="text-align: center;">
	       	<div class="row">
	       		<div class="col-md-12" style="text-align: left;">
	       			<input type="text" name="playerID" id="PlayerID" class="player_txt" placeholder="Username">
	       		</div>
	       	</div>
	       	<br>
	       	<div class="row">
	       		<div class="col-md-12" style="text-align: left;">
	       			<input type="password" name="passWord" id="passWord" class="player_txt" placeholder="Password">
	       		</div>
	       	</div>
	       	<br>
	       	<div class="row">
	       		<div class="col-md-12" style="text-align: left;padding-left: 20px;">
	       			<input type="checkbox" id="userType" name="userType" value="Admin"><span  style="font-size: 14px;"> Login as administrator</span><span data-toggle="tooltip" data-placement="bottom" title="If checked, no quiz sequences required." class="glyphicon glyphicon-info-sign"></span>
	       		</div>
	       	</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn custom btn-primary" id="loginBtn">Login</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!-- Modal -->
	<div id="mySignUp" class="modal animated fadeInDownBig" role="dialog">
	  <div class="modal-dialog" style="width: 100% !important;margin-top: 0px;height: 100%;">

	    <!-- Modal content-->
	    <div class="modal-content" style="height: 100%;">
	      <div class="modal-header" style="border-bottom:0px">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	      </div>
	      <div class="modal-body" style="text-align: center;margin-top: -25px;">
	      	<center>
		      	<div style="width: 100%;">
			      	<div style="width: 100%;">
			      			<img src="img/otp_logo.png" style="width: 50%;margin-right: 0px;">
			      	</div>
			      	<div style="width: 80%;margin: 20px;">
			        	<p style="font-size: 17px;">Enter your phone number to receive the OTP code</p>
			        </div>
			        <div style="width: 80%;height: 40px;">
			        	<div class="input-group">
			        		<button>TH(+66)</button>
			        		<input type="text" class="form-control phone_input" id="phone_input" onkeypress="validate(event)">
			        	</div>
			        </div>
				</div>
			</center>
		  </div>
		    <div class="modal-footer">
		       <button type="button" class="btn btn-default" id="testClose">Close</button>
		    </div>
	    </div>
	  </div>
	</div>

	<script src="js/swiper.min.js"></script>
	<script>
		function validate(evt) {
		  var theEvent = evt || window.event;
		  var key = theEvent.keyCode || theEvent.which;
		  key = String.fromCharCode( key );
		  var regex = /[0-9]|\./;
		  if( !regex.test(key) ) {
		    theEvent.returnValue = false;
		    if(theEvent.preventDefault) theEvent.preventDefault();
		  }
		}
    var swiper = new Swiper('.swiper-container', {
	    centeredSlides: true,
    	slidesPerView: 3,
	    spaceBetween: 30,
	    freeMode: false,
	    breakpoints: {
	    // when window width is <= 320px
	   	325: {
	   		centeredSlides: true,
	      slidesPerView: 1,
	      width: 190,
	      spaceBetween: 15
	    },
	    400: {
	   		centeredSlides: true,
	      slidesPerView: 1,
	      width: 225,
	      spaceBetween: 15
	    },
	    770: {
	    	centeredSlides: true,
	      slidesPerView: 1,
	      width: 240,
	      spaceBetween: 20
	    }
		},
	    pagination: {
	      el: '.swiper-pagination',
	      clickable: true,
      },
    });
    swiper.slideTo(1, 500);
    console.log(swiper.activeIndex)
  </script>
<%@include file="bottom.jsp" %>
