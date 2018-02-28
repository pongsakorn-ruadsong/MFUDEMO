<%@include file="top.jsp" %>
<script src="http://formvalidation.io/vendor/formvalidation/js/formValidation.min.js"></script>
<script src="http://formvalidation.io/vendor/formvalidation/js/framework/bootstrap.min.js"></script>
<script type="text/javascript">
		$(document).ready(function(){
			var full_num = [];
			$('[data-toggle="tooltip"]').tooltip();
			sessionStorage['lang'] = 'English';
			if (checkUser()) {
				getToken();
				getContent();
				// initialSwipeCard();
			}else{
				window.location.replace("index");
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
				if ($('#performOtp').hasClass('fadeOutUpBig')) {
					{   e.preventDefault();

	                $('#performOtp').removeClass('fadeOutUpBig').addClass('fadeInDownBig');

	                setTimeout("$('#performOtp').modal('show')", 300);}
				}else{
				if($('#mySignUp').hasClass('fadeOutUpBig'))
	                {   e.preventDefault();

	                $('#mySignUp').removeClass('fadeOutUpBig').addClass('fadeInDownBig');

	                setTimeout("$('#mySignUp').modal('show')", 300);}
	                else{
	                	$('#mySignUp').modal('show');
	                }
	            }
			});
			$('#loginModal').on('hidden.bs.modal', function () {
			  $("#userType").prop("checked", false);
			  $("#PlayerID").val('');
			  $("#passWord").val('');
			});
			$('.telNumber').click(function(e){
				var phone_num = $(this).text();
				// full_num.push(phone_num);
				// var half_num = full_num.join("");
				// console.log(phone_num)
				// console.log(full_num)
				// var final_num = phoneFormat(half_num)
				var final_num = $('#phone_input').val()+phone_num
				$('#phone_input').val(final_num);
			});
			$('#del-phone').click(function(){
			    var str = $('#phone_input').val()
				var len = str.length
				var final_num = str.substring(0, len-1);
				$('#phone_input').val(final_num);
			});
			$('#reset-phone').click(function(){
				full_num = [];
				var half_num = full_num.join("");
				var final_num = phoneFormat(half_num)
				$('#phone_input').val(half_num);
			});
			$('.testClose').click(function(e){
				$('#phone_input').val('');
            	e.preventDefault();
            		if ($('#performOtp').hasClass('fadeInDownBig')){
            			e.preventDefault();
            			$('#mySignUp').removeClass('fadeInDownBig')
            			$('#mySignUp').modal('hide');
            			$('#performOtp').removeClass('fadeInDownBig').addClass('fadeOutUpBig');
            			setTimeout("$('#performOtp').modal('hide')", 300);
            		}else{
		                if($('#mySignUp').hasClass('fadeInDownBig')){   
		                	e.preventDefault();
		                	$('#mySignUp').removeClass('fadeInDownBig').addClass('fadeOutUpBig');
		                	setTimeout("$('#mySignUp').modal('hide')", 300);
		                }else{
		                	$('#mySignUp').modal('hide');
		                }
	           		}
	        });
			$('#sendOtp').click(function(){
				var number = $('#phone_input').val();
				var pre_code = $('.selected-flag').attr('title');
				var code = pre_code.substr(pre_code.indexOf("+"))
				var placeHolder = $('#phone_input').attr('placeholder');
				var format = placeHolder.match(/\d/g);
				format = format.join(""); 
				console.log("")
				console.log(pre_code+' | '+code+' | '+number+' | '+format)
				console.log(number.length+' | '+format.length)
				console.log(number.length == format.length)
				console.log("")
				if (number.length != format.length) {
					alert("Temporary alert: not valid format !")
				}
				else{
					registerUser(code,number, function(){
						if (sessionStorage['auth'] == 'true') {
							requestOtpSetup();
							$('#performOtp').addClass('fadeInDownBig');
							setTimeout("$('#performOtp').modal('show')", 300);
						}
						else{
							alert('Temporary alert: Phone number already exist');
						}
					});
				}
			});
			$('.country_number').click(function(){

			});
			$('#contactForm')
	        .find('[name="phoneNumber"]')
	            .intlTelInput({
	                utilsScript: 'js/utils.js',
	                autoPlaceholder: true,
	                preferredCountries: ['th', 'us', 'gb','fr','kr','jp']
	            });
	        $('.intl-tel-input').append('<label style="position: absolute;width: 80%;height: 100%;background-color: #00ffff00;top: 0px;left: 50px;"></label>')
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
	  <div class="modal-dialog" style="width: 100% !important;margin-top: 0px;height: 100%;margin:0px;">

	    <!-- Modal content-->
	    <div class="modal-content" style="height: 100%;">
	      <div class="modal-header" style="border-bottom:0px">
	        <button type="button" class="testClose close" id="testClose"  style="font-size: 30px;padding-bottom: 0px;padding-right: 15px;">&times;</button>
	      </div>
	      <div class="modal-body" style="text-align: center;margin-top: -25px;">
		      	<div style="width: 100%;">
		      		<center>
			      	<div style="width: 100%;">
			      			<img src="img/otp_logo.png" style="width: 40%;margin-right: 0px;">
			      	</div>
			      	<div style="width: 80%;margin: 15px;">
			        	<p style="font-size: 17px;">Enter your phone number to receive the OTP code</p>
			        </div>
			        <div style="width: 80%;height: 40px;">
			        	
			        		<form id="contactForm" class="form-horizontal">
							    <div class="form-group">
							        <div class="col-xs-5">
							             <input type="text" class="form-control phone_input" id="phone_input" name="phoneNumber"  onkeypress="validate(event)">
							        </div>
							    </div>
							</form>
			        	
			        </div>
			        <style type="text/css">
			        	.gest{
			        		font-size: 22px;
    						padding: 10px;
			        	}
			        	.btn-send-otp{
			        		background-color: #45a1bc;
						    border-radius: 20px;
						    width: 100%;
						    height: 100%;
						    font-size: 20px;
						    color: white;
						    padding: 5px;
						    font-weight: lighter;
			        	}
			        </style>
			        <div style="width: 70%;margin-top: 20px;">
			        	<button class="btn-send-otp" id="sendOtp">Send</button>
			        </div>
			        </center>
			        <div style="width: 100%;margin-top: 10px;padding-left: 2.5%;padding-right: 2.5%;">
			        	
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber" >1</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >2</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >3</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber" >4</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >5</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >6</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber" >7</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >8</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >9</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="reset-phone" id="reset-phone">Reset</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >0</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="del-phone" id="del-phone">DEL</button>
			        		</div>
			        	</div>
			        </div>
				</div>
		  </div>
	    </div>
	  </div>
	</div>

	<div id="performOtp" class="modal animated" role="dialog">
	  <div class="modal-dialog" style="width: 100% !important;margin-top: 0px;height: 100%;margin:0px;">

	    <!-- Modal content-->
	    <div class="modal-content" style="height: 100%;">
	      <div class="modal-header" style="border-bottom:0px">
	        <button type="button" class="testClose close" id="testClose"  style="font-size: 30px;padding-bottom: 0px;padding-right: 15px;">&times;</button>
	      </div>
	      <div class="modal-body" style="text-align: center;margin-top: -25px;">
		      	<div style="width: 100%;">
		      		<center>
			      	<div style="width: 100%;">
			      			<img src="img/otp_logo.png" style="width: 40%;margin-right: 0px;">
			      	</div>
			      	<div style="width: 80%;margin: 15px;">
			        	<p style="font-size: 17px;">Enter your phone number to receive the OTP code</p>
			        </div>
			        <div style="width: 80%;height: 40px;">
			        	
			        		<!-- <form id="contactForm" class="form-horizontal">
							    <div class="form-group">
							        <div class="col-xs-5">
							             <input type="text" class="form-control phone_input" id="phone_input" name="phoneNumber"  onkeypress="validate(event)">
							        </div>
							    </div>
							</form> -->
			        	
			        </div>
			        <style type="text/css">
			        	.gest{
			        		font-size: 22px;
    						padding: 10px;
			        	}
			        	.btn-send-otp{
			        		background-color: #45a1bc;
						    border-radius: 20px;
						    width: 100%;
						    height: 100%;
						    font-size: 20px;
						    color: white;
						    padding: 5px;
						    font-weight: lighter;
			        	}
			        </style>
			        <div style="width: 70%;margin-top: 20px;">
			        	<button class="btn-send-otp" id="sendOtp">Send</button>
			        </div>
			        </center>
			        <div style="width: 100%;margin-top: 10px;padding-left: 2.5%;padding-right: 2.5%;">
			        	
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber" >1</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >2</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >3</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber" >4</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >5</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >6</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber" >7</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >8</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >9</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="reset-phone" id="reset-phone">Reset</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber" >0</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="del-phone" id="del-phone">DEL</button>
			        		</div>
			        	</div>
			        </div>
				</div>
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
