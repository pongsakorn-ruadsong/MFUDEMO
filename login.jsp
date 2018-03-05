<%@include file="top.jsp" %>
<script src="http://formvalidation.io/vendor/formvalidation/js/formValidation.min.js"></script>
<script src="http://formvalidation.io/vendor/formvalidation/js/framework/bootstrap.min.js"></script>
<script type="text/javascript">
		$(document).ready(function(){
			var otp = [];
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
			$('#signInClick').click(function (e) {
				e.preventDefault();
				if ($('#loginModal').hasClass('fadeOutUpBig')){
					e.preventDefault();
					$('#loginModal').removeClass('fadeOutUpBig').addClass('fadeInDownBig');
					setTimeout("$('#loginModal').modal('show')", 300);
				}else{
			        $('#loginModal').addClass('fadeInDownBig');
			        setTimeout("$('#loginModal').modal('show')", 300);
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
			$("#perform-otp").click(function(){
				var otp_code = otp.join("");
				var player_id = $(this).attr('p_id');
				performOTP(otp_code, player_id, 'regis', function(){

				});	
			});
			$('.telNumber-otp').click(function(e){
				var otp_num = $(this).text();
				console.log(otp.length)
				if (otp.length < 6) {
					otp.push(otp_num);
				}else{
					console.log('array full')
				}
				if (otp.length == 6) {
					$("#perform-otp").prop('disabled', false);
					$('.telNumber-otp').prop('disabled', true);
				}
				else{
					$('.telNumber-otp').prop('disabled', false);
					$("#perform-otp").prop('disabled', true);
				}
				var index = otp.length-1;
				var element = $('.input-otp-inFrame').children()[index]
				$(element).children().text($(this).text())
				console.log(otp.join(""))
				// full_num.push(phone_num);
				// var half_num = full_num.join("");
				// console.log(index)
				// console.log(otp)
				// var final_num = phoneFormat(half_num)
				// var final_num = $('#phone_input').val()+phone_num
				// $('#phone_input').val(final_num);
			});
			$('#del-phone-otp').click(function(){
			    if (otp.length > 0) {
					otp.pop();
				}else{
					console.log('array empty')
				}
				if (otp.length == 6) {
					$('.telNumber-otp').prop('disabled', true);
					$("#perform-otp").prop('disabled', false);
				}
				else{
					$('.telNumber-otp').prop('disabled', false);
					$("#perform-otp").prop('disabled', true);
				}
				var index = otp.length;
				var element = $('.input-otp-inFrame').children()[index]
				$(element).children().text('')
				console.log(index)
			});
			$('#reset-phone-otp').click(function(){
				otp = [];
				$("#perform-otp").prop('disabled', true);
				$('.telNumber-otp').prop('disabled', false);
				$('.input-otp-p').text('');
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
			$('#loginClose').click(function(e){
				e.preventDefault();
            		if ($('#loginModal').hasClass('fadeInDownBig')){
            			e.preventDefault();
            			$('#loginModal').removeClass('fadeInDownBig').addClass('fadeOutUpBig');
            			setTimeout("$('#loginModal').modal('hide')", 300);
            		}else{
		                $('#loginModal').addClass('fadeOutUpBig');
		                setTimeout("$('#loginModal').modal('hide')", 300);
	           		}
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
					registerUser(code,number, function(a,b,c){
						if (sessionStorage['regisStatus'] == 'true') {
							requestOtpSetup(a,b,c,null);
							$('#display_num').text(analyzePhonenum(b,c));
							$('#performOtp').addClass('fadeInDownBig');
							$('#perform-otp').attr('p_id',a);
							setTimeout("$('#performOtp').modal('show')", 300);
						}
						else{
							alert('Temporary alert: Phone number already exist');
						}
					});
				}
			});
			$('#loginBtn').click(function(){
				authPlayer();
				
			});
			$('#btnLoginOTP').click(function(){
				var otpCode = $('#OTPCode_login').val();
				var player_id = $('#login_otp_input').attr('p_id');
				performOTP(otpCode, player_id, 'login', function(result){
					if (result) {
						if($('#userType').prop('checked')) {
	                    	sessionStorage['isAdmin'] = 'true';
		                } else {
		                    sessionStorage['isAdmin'] = 'false';
		                }
		                location.reload();
					}else{
						alert('Temporary alert: fail log in');
					}
				});
			});	
			$("#PlayerID").keyup(function(event) {
			    if (event.keyCode === 13) {
			        $("#btnLogin").click();
			    }
			});
			$('#btnLogin').click(function(){
				var number = $('#PlayerID').val();
				if (number.length < 4) {
					alert("Temporary alert: not valid format !")
				}else{
					authPlayer(number, function(playerID, resultCode, message){
						if (resultCode == '2425') {
							swal({
							  title: "Temporary alert!",
							  text: "Account is not activated yet. Please activate your account.",
							  type: "warning",
							  showCancelButton: true,
							  confirmButtonClass: "btn-primary",
							  confirmButtonText: "Verify now!",
							  closeOnConfirm: true
							},function(){
								getUnverifyPlayer(playerID, function(phonenum){
									requestOtpSetup(playerID,null,null,phonenum);
									$('#perform-otp').attr('p_id',playerID);
								  	if ($('#performOtp').hasClass('fadeOutUpBig')){
						                $('#performOtp').removeClass('fadeOutUpBig').addClass('fadeInDownBig');
						                setTimeout("$('#performOtp').modal('show')", 300);
						            }else{
										$('#performOtp').addClass('fadeInDownBig');
										setTimeout("$('#performOtp').modal('show')", 300);
									}
								});
							}
							);
						}
						else if(resultCode == '0200'){
							alert('Temporary alert: '+message);
						}
						else if(resultCode == '0000'){
							requestOtp(playerID);
							$('#login_tel_input').addClass('fadeOutLeft');
							setTimeout(function(){
								$('#login_tel_input').css('display','none')
								$('#login_otp_input').addClass('fadeInRight');
								setTimeout(function(){
									$('#login_otp_input').attr('p_id',playerID);
									$('#login_otp_input').css('display','block')
								},300);
							},300);
						}
					});
				}
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
	      <button class="swiper-slide" id="signInClick" style="background-color: blue;">Sign in</button>
	      <button class="swiper-slide" id="signUpBtn" style="background-color: green;">Sign up</button>
	    </div>
  </div>
  </div>

	 <div class="modal animated fadeInDownBig" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
	 <div class="modal-dialog" style="width: 100% !important;margin-top: 0px;height: 100%;margin:0px;">
	    <div class="modal-content" style="height: 100%;">
	      <div class="modal-header" style="border-bottom:0px;background-image: url(img/LL.jpg);height: 50%;background-size: cover;">
	        <button type="button" class="loginClose close" id="loginClose"  style="font-size: 30px;padding-bottom: 0px;padding-right: 15px;">&times;</button>
	      </div>
	      <div class="modal-body" style="text-align: center;height: 50%;background-color: #e6e6e6;">
	      	<div class="animated" style="height: 100%;width: 100%;" id="login_tel_input">
	       	<div class="row" id="login_tel_input">
	       		<div class="col-md-12" style="text-align: left;">
	       			<input type="text" name="playerID" id="PlayerID" class="player_txt" placeholder="Phone Number">
	       		</div>
	       	</div>
	       	<br>
	       	<br>
	       	<div class="row">
	       		<button class="btn btnLogin" id="btnLogin">Submit</button>
	       	</div>
	       	</div>

	       	<div class="animated" style="height: 100%;width: 100%;display: none;" id="login_otp_input">
	       	<div class="row">
	       		<div class="col-md-12" style="text-align: left;">
	       			<input type="text" name="OTPCode_login" id="OTPCode_login" class="player_txt" placeholder="OTP Code">
	       		</div>
	       	</div>
	       	<br>
	       	<div class="row">
	       		<div class="col-md-12" style="text-align: left;padding-left: 20px;">
	       			<input type="checkbox" id="userType" name="userType" value="Admin"><span  style="font-size: 14px;"> Login as administrator</span><span data-toggle="tooltip" data-placement="bottom" title="If checked, no quiz sequences required." class="glyphicon glyphicon-info-sign"></span>
	       		</div>
	       	</div>
	       	<br>
	       	<br>
	       	<div class="row">
	       		<button class="btn btnLogin" id="btnLoginOTP">Login</button>
	       	</div>
	       	</div>
	      </div>
	    </div>
	  </div>
	</div>

	<!-- Modal mySignUp-->
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
	<!-- performOtp -->
	<div id="performOtp" class="modal animated" role="dialog">
	  <div class="modal-dialog" style="width: 100% !important;margin-top: 0px;height: 100%;margin:0px;">

	    <!-- Modal content-->
	    <div class="modal-content" style="height: 100%;">
	      <div class="modal-header" style="border-bottom:0px">
	        <button type="button" class="testClose close" id="testClose"  style="font-size: 30px;padding-bottom: 0px;padding-right: 15px;">&times;</button>
	      </div>
	      <div class="modal-body" style="text-align: center;margin-top: -25px;">
		      	<div style="width: 100%;margin-top: 10px;">
		      		<center>
			      	<div style="width: 100%;">
			      		<p style="font-size: 24px;">Enter OTP</p>
			      	</div>
			      	<div style="width: 80%;margin: 15px;">
			        	<p style="font-size: 14px;">We will send you a one time SMS message to verify your account:</p>
			        	<p style="font-size: 15px;font-weight: bold;" id="display_num"></p>
			        </div>
			        </center>
			        <style type="text/css">
			        	.input-otp-inFrame{
			        		border-radius: 40px;
			        		padding-left: 6%;
			        		padding-right: 6%;
			        		padding-top: 1%;
			        		padding-bottom: 1%;
			        		height: 100%;
			        		background-color: #0096882e;
			        	}
			        	.input-otp{
			        		padding-right: 5px;
			        		padding-left: 5px;
			        	}
			        	.input-otp-p{
			        		border-bottom: 1px solid gray;
							height: 80%;
							font-size: 24px;
			        	}
			        </style>
			        <div class="input-otp-OutFrame" style="width: 100%;padding-left: 10%;padding-right: 10%;height: 40px;">
			        	<div class="row input-otp-inFrame" style="">
			        		<div class="col-2 input-otp">
			        			<p class="input-otp-p"></p>
			        		</div>
			        		<div class="col-2 input-otp">
			        			<p class="input-otp-p"></p>
			        		</div>
			        		<div class="col-2 input-otp">
			        			<p class="input-otp-p"></p>
			        		</div>
			        		<div class="col-2 input-otp">
			        			<p class="input-otp-p"></p>
			        		</div>
			        		<div class="col-2 input-otp">
			        			<p class="input-otp-p"></p>
			        		</div>
			        		<div class="col-2 input-otp">
			        			<p class="input-otp-p"></p>
			        		</div>
			        	</div>
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
			        <center>
			        <div style="width: 70%;margin-top: 20px;">
			        	<button class="btn-send-otp" id="perform-otp" disabled >Confirm</button>
			        </div>
			        </center>
			        <div style="width: 100%;margin-top: 10px;padding-left: 2.5%;padding-right: 2.5%;">
			        	
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >1</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >2</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >3</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >4</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >5</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >6</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >7</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >8</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >9</button>
			        		</div>
			        	</div>
			        	<div class="row" style="">
			        		<div class="col-4 gest">
			        			<button class="reset-phone" id="reset-phone-otp">Reset</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="telNumber-otp" >0</button>
			        		</div>
			        		<div class="col-4 gest">
			        			<button class="del-phone" id="del-phone-otp">DEL</button>
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
