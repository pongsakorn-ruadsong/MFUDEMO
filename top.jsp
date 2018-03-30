<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
	 <!--  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<!-- <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'></script> -->
	<!-- <script src='http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'></script>  -->
	<script src="js/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/bootstrap.js"></script>
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script> -->
	<!-- <link rel='stylesheet prefetch' href='http://www.justinaguilar.com/animations/css/animations.css'> -->
	<script src="js/index.js"></script>
	<script src="js/quiz.js"></script>
	<script src="js/bootstrap.bundle.js"></script>
	<script src="js/toastr.min.js"></script>
	<script src="js/login.js"></script>
	<script src="js/gearSlide.js"></script>
	<script src="js/slider.js"></script>
	<script src="js/sweetalert.js"></script>
	<script src="js/account.js"></script>
	<script src="js/rewardStore.js"></script>
	<script src="js/quizlist.js"></script>
	<script src="js/testType.js"></script>
	<!-- <script src="js/intlTelInput.min.js"></script> -->
	<script src="js/intlTelInput.js"></script>
	<script src="js/utils.js"></script>
	<script src="js/PB_utilities.js"></script>
	<script src="js/Leader.js"></script>
	<script src="js/untitled.js"></script>
	<script src="js/qrcode.min.js"></script>
	<script src="js/Playbasis.min.js"></script>
	<script src="js/velocity.min.js"></script>
	<script src="js/velocity.ui.min.js"></script>
	<script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
	<link rel="import" href="playbasis/pb-spinwheel-component.v.html">
	<!-- <script src="js/jquery-1.3.2.min.js"></script>     -->
	<script src="js/jquery-barcode.min.js"></script>
	<script src="js/chartist.js"></script>
	<link rel="stylesheet" href="css/aos.css" />
	<link rel="stylesheet" href="css/intlTelInput.css" />
	<link href="css/bootstrap-glyphicons.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/gearSlide.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/bootstrap.css"> -->
	<link rel="stylesheet" type="text/css" href="css/toastr.min.css">
	<link rel="stylesheet" type="text/css" href="css/Whole.css">
	<link rel="stylesheet" type="text/css" href="css/user.css">
	<link rel="stylesheet" type="text/css" href="css/sweetalert.css">
	<link rel="stylesheet" type="text/css" href="css/chartist.css">
	<link rel="stylesheet" type="text/css" href="css/flags.min.css">
	<link rel="stylesheet" type="text/css" href="css/animate.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<!-- <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
	<link rel="import" href="playbasis/pb-spinwheel-component.html"> -->
	<script src="js/swiper.min.js"></script>
	<%
		String uri = request.getRequestURI();
		String pageName = uri.substring(uri.lastIndexOf("/")+1);
	%>
	<title>Demo v0.1</title>
</head>
<script type="text/javascript">
	function c(m){
		console.log(m);
	}
	Playbasis.builder
	    .setApiKey(sessionStorage['api_key'])
	    .setApiSecret(sessionStorage['api_sec'])
	    .build();
	var guestImage = new Array("img/batman.png","img/flash.png","img/robin.png","img/superman.png","img/spiderman.png","img/punisher.png","img/wonderwoman.png","img/ironman.png")
	$( function() {
    $( "#draggable" ).draggable();
  	} );
  	document.addEventListener("pb-spinwheel-success-event", function(e) {
	   console.log("You got reward: ", e.detail);

	 });
  	document.addEventListener("pb-spinwheel-error-event", function(e) {
   		console.log("Error code " + e.detail.code + " with detail: '", e.detail, "'");

 });
	$(document).ready(function(){
		$("#wheels").click(function(){
        var showSpinWheel = $('#wrapper').css('opacity');
        buildWater();
          if(showSpinWheel == 0){
          	$('.swiper-container.gameSwip').css('z-index','3')
          	$('body').append('<div class="wheel-tran" style="width:100%;height:100%;position: absolute;z-index: 2;top: 0px;left: 0px;background-color: #0000006e;"></div>')
            $('#wrapper').animate({
                  'top' : '-=80vw',
                  'opacity' : 1
              },1000);
            $('#arrowNext').animate({
              'right' : '5vw',
                  'opacity' : 1
            },1000);
            $('#arrowPrev').animate({
              'left' : '5vw',
                  'opacity' : 1
            },1000);
            $(".pb-spinwheel-button").animate({
              'top' : '+=55vw',
                  'opacity' : 1
            },1000);
            // $(".blur").addClass('blur-filter');
          } else if(showSpinWheel == 1 ){
          	$('body > .wheel-tran').remove();
          	// $('.swiper-slide-active').removeClass('swiper-slide-active');
          	// $('.swiper-slide-prev').removeClass('swiper-slide-prev');
          	// $('.swiper-slide-next').removeClass('swiper-slide-next');
          	// var first = $('.swiper-wrapper.style-scope').children()[0];
          	// var second = $('.swiper-wrapper.style-scope').children()[1];
          	// $(first).addClass('swiper-slide-active')
          	// $(second).addClass('swiper-slide-next')
            $('#wrapper').animate({
                'top' : '+=80vw',
                'opacity' : 0
            },1000);
            $('#arrowNext').animate({
              'right' : '-5vw',
                  'opacity' : 0
            },500);
            $('#arrowPrev').animate({
              'left' : '-5vw',
                  'opacity' : 0
            },500);
            $(".pb-spinwheel-button").animate({
              'top' : '-=55vw',
                  'opacity' : 0
            },1000);
            setTimeout(function(){
            	$('.swiper-container.gameSwip').css('z-index','-1')
            },500);

          }
        });
		$('pb-spinwheel').attr('player-id',sessionStorage['player'])
		$('.middle-menu').click(function(){
	    	if (!$('#test').hasClass('rotate-hide') && !$('#test').hasClass('rotate-show')) {
	    		console.log('no have class hide and show')
	    		$('#test').addClass('rotate-show')
	    	}
	    	else if($('#test').hasClass('rotate-show')){
	    		$('#test').removeClass('rotate-show').addClass('rotate-hide')
	    	}
	    	else if($('#test').hasClass('rotate-hide')){
				$('#test').removeClass('rotate-hide').addClass('rotate-show')
			}
		});
		sessionStorage['pageName'] = $('#pageName').val();
		console.log(sessionStorage['pageName']);
		if (sessionStorage['pageName'] != 'login') {
			c('In');
			$('#myNav').css('display','flex');
			$('.footer').css('display','block');
			$('.otherMenu').css('display','block');
		}
		else{
			c('Out');
			$('#myNav').hide();
			$('.footer').css('display','none');
		}
		if (sessionStorage['pageName'] != 'index.jsp') {
			$('#barHome').removeClass('active');
		}
		else{
			$('#barHome').addClass('active');
		}
		$('#showLang').click(function(){
			getLang();
		});
		$('.showUser').click(function(){
			getUserInfo(function(){
				$('#userInfo').modal();
			});
		});
		// $('#closeUser').click(function(){
		// 	$('#userInfo').modal("hide");
		// });
		$('#submitLang').click(function(){
			changeLang(function(){
				location.reload();
			});
		});
		$('#logOut').click(function(){
			Logout();
		});
		$('#info').click(function(){
			$('.myTab').removeClass('active');
			$('#info').addClass('active');
			$('.tab-content').css('height','100');
		});
		$('#reward').click(function(){
			$('.myTab').removeClass('active');
			$('#reward').addClass('active');
			$('.tab-content').css('height','250');
			getUserReward();
		});
		$('#badge').click(function(){
			$('.myTab').removeClass('active');
			$('#badge').addClass('active');
			$('.tab-content').css('height','250');
			buildRewardList();
		});
		$('#anime').click(function(){

		});
		window.onresize = function(event) {
			   changeUI($(window).width());
			   console.log($(window).width())
		};
		getUserInfo(function(player){
			sessionStorage.setItem("playerMainData", JSON.stringify(player.response.player));
		});
		$('#Setting').click(function(){
			console.log('Clicking')
			if ($('.otherMenu').hasClass('menu-hide')) {
				$('.otherMenu').css('display','block');
				setTimeout(function(){
					$('.otherMenu').removeClass('menu-hide').addClass('menu-show');
					$('.otherMenu').css('bottom','10%');
				},100);
			}
			else if($('.otherMenu').hasClass('menu-show')){
				$('.otherMenu').removeClass('menu-show').addClass('menu-hide');
				var h = $('.otherMenu').height();
				$('.otherMenu').css('bottom', -h);
				setTimeout(function(){
					$('.otherMenu').css('display','none');
				},500);
			}
		});
		$('.middle-menu').click(function(){
			$('#wheels').addClass('spinning')
			setTimeout(function(){
				$('#wheels').removeClass('spinning')
			},1000);
			if (!$('#wheels-menu').hasClass('rotate') || $('#wheels-menu').hasClass('rotate-hid')) {
				$('#wheels-menu').removeClass('rotate-hid');
				$('#wheels-menu').addClass('rotate');
			}
			else{
				$('#wheels-menu').removeClass('rotate').addClass('rotate-hid');
			}
		});
		var swiper = new Swiper('.gameSwip', {
	      slidesPerView: 1,
	      centeredSlides: true
		});
		});
	// $(document).mouseup(function(e)
	// 	{
	// 	    var container = $('.otherMenu');
	// 	    // if the target of the click isn't the container nor a descendant of the container
	// 	    if (!container.is(e.target) && container.has(e.target).length === 0)
	// 	    {
	// 	        container.hide();
	// 	        container.removeClass('menu-show').addClass('menu-hide');
	// 	    }
	// });
		function changeUI(a){
			console.log($(window).width())
			if (a == 1024) {
				console.log("reload")
			   location.reload();
			}
		}
</script>
<link rel="stylesheet" href="css/swiper.min.css">
<style type="text/css">
	.spinning{
		-webkit-animation: spinaa 1s cubic-bezier(0, 0.93, 1, 1);
	    animation: spinaa 1s cubic-bezier(0, 0.93, 1, 1);
	    animation-fill-mode: forwards;
	}
	#wheels{
		margin-right: 0px;
	    width: 60%;
	    margin-top: 10px;
	    height: auto;
	    align-self: center;
	}
	@-webkit-keyframes spinaa {
	  from {
	    -webkit-transform: rotate(0deg);
	            transform: rotate(0deg);
	  }
	  to {
	    -webkit-transform: rotate(360deg);
	            transform: rotate(360deg);
	  }
	}

	@keyframes spinaa {
	  from {
	    -webkit-transform: rotate(0deg);
	            transform: rotate(0deg);
	  }
	  to {
	    -webkit-transform: rotate(360deg);
	            transform: rotate(360deg);

	  }
	}
	.container-fluid > .navbar-collapse {
	    margin-right: 0px;
	     margin-left: 0px;
	}
	.navbar-inverse{
		/*background-color: rgba(255,255,255,0);*/
		border-color: rgba(255,255,255,0);
		background-color:white;
		/*border-color: aqua;*/
		color: black;
	}
	.navbar-nav > li > a {

	}
	.swiper-container-horizontal>.swiper-pagination-bullets{
		bottom: -2px !important;
	}
	.modal-dialog {
		width: 85%;
		margin: 1.75rem auto;
	}
	@media (min-width: 576px){
		.modal-dialog {
		    max-width: 400px;
		    margin: 1.75rem auto;
		}
	}
	@media (max-width: 320px){
		.modal-body {
		    padding: 1rem !important;
		}
		.modal-dialog {
		    width: 95% !important;
		}
	}
	.progress {
		font-size: 1rem;
	}
	tr.spaceUnder>td {
	  padding-bottom: 1em;
	  text-align: center;
	}
	tr.tr-head>td{
		font-size: 16px !important;
		font-weight: bold;
		text-align: center;
	}
	/*.col-2{
		width: 16%;
		display: inline-block;
	}*/
	.nonPadding{
		padding: 0px !important;
		width: 15%;
		display: inline-block;
	}
	.otherMenu{
		transition: all 0.5s;
	}
	#test{

		background:
		linear-gradient(-45deg, lightblue 50%, yellow 0%),
		linear-gradient(45deg, tomato 50%, red 0%);

		background-size: 50% 100%;

		background-position:

		0 100%,
		100% 100%;

		background-repeat: no-repeat;
	}
	.pie{
		position: absolute;
	    transform: rotate(180deg);
	    width: 50px;
	    height: 50px;
	    border-radius: 50px;
	    background-color: white;
	}
	.ani {
  background: #9e978e;
}

.top,
.bottom {
    height: 130px;
    width: 260px;
}

.top {
  border-top-left-radius: 90px;
  border-top-right-radius: 90px;
}

.bottom {
  border-bottom-left-radius: 130px;
  border-bottom-right-radius: 130px;
}
.rotate-show {
  -webkit-animation: 0.5s linear rotate-s;
          animation: 0.5s linear rotate-s;
  position: relative;
  animation-fill-mode: forwards;
  top: 0px;
  -webkit-transform-origin: 50% 0%;
          transform-origin: 50% 0%;
}

@-webkit-keyframes rotate-s {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
  }
}

@keyframes rotate-s {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg);

  }
}

.rotate-hide {
  -webkit-animation: 0.5s linear rotate-h;
          animation: 0.5s linear rotate-h;
  position: relative;
  animation-fill-mode: forwards;
  top: 0px;
  -webkit-transform-origin: 50% 0%;
          transform-origin: 50% 0%;
}

@-webkit-keyframes rotate-h {
  from {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
  }
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes rotate-h {
  from {
    -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
  }
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);

  }
}
#wheel-arrow.pb-spinwheel{
  left: 93vw;
    top: 1vw;
}
#wrapper.pb-spinwheel{
    width: 200vw;
    overflow: hidden;
    position: absolute;
    padding-top: 10vw;
    bottom: -40%;
    margin: unset;
    z-index: 10;
    top: 80%;
    left: -48.5%;
    opacity: 0;
}
#wrapper.pb-spinwheel:before{
  	width: 201vw;
    height: 200vw;
    left: -0.5vw;
    top: 10vw;
    margin-left: 0;
}
#wheel.pb-spinwheel{
  width: 200vw;
  height: 200vw;
}
#wheel.pb-spinwheel:before{
  width: 195vw;
    height: 195vw;
    top: 0vw;
    left: 0vw;
}
#spin.pb-spinwheel{
  width: 70vw;
  height: 70vw;
  top: 74vw;
  left: 70vw;
}
#inner-spin.pb-spinwheel{
	width: 60%;
    height: 60%;
    top: 29%;
    left: 29%;
    background-size: contain;
   	box-shadow: rgba(255,255,255,1) 0px 0px 0px inset, rgba(255,255,255,1) 0px 0px 0px inset, rgba(0,0,0,0.4) 2px 7px 10px;
    background-repeat: no-repeat;
    background-image: url(img/playbasis_coin_single_500px.png);
}

button.pb-spinwheel {
  width: 40vw;
  height: 40vw;
  position: absolute;
  background: white;
  color: gray;
  left: 28vw;
  top: -46vw;
  padding-top: 16vw;
  opacity: 0;
  border-radius: 50%;
  border: 1px solid #b3ccff;
  overflow: hidden;
  box-shadow: 0px 1px 20px #b3ccff;
  margin: 10px;
  z-index: 1099;
}
button.pb-spinwheel:disabled{
  width: 40vw;
  height: 40vw;
  position: absolute;
  background: lightgray;
  opacity: 0.5;
  color: gray;
  left: 28vw;
  top: -46vw;
  padding-top: 16vw;
  border-radius: 50%;
  border: 1px solid #b3ccff;
  overflow: hidden;
  box-shadow: 0px 1px 20px #b3ccff;
  margin: 10px;
  z-index: 1099;
}
html, body, .container-fluid{
  overflow: hidden;
}
.blur-filter {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
}
.profile {
  width: 40vw;
  height: 40vw;
  position: relative;
  /*opacity: 0;*/
  /*background-image: url(img/wonderwoman.png);*/
  /*background-size: cover;*/
  border-radius: 50%;
  border: 1px solid #b3ccff;
  overflow: hidden;
  box-shadow: 0px 1px 20px #b3ccff;
  margin: 10px;
}
#water{
  width: 60vw;
  height: 100%;
  background: #4A90E2;
  position: relative;
  top: -4.5vw;
}
@keyframes a0_t {
  0% { transform: translate(-420.5px,15px); }
  100% { transform: translate(-140px,15px); }
}
@keyframes a1_t {
  0% { transform: translate(0px,15px); }
  100% { transform: translate(-280.5px,15px); }
}

.water-fill {
  fill:#4A90E2;
}

.water-fill.full {
  opacity:0.45;
}

.water-block{
  top: -3vw;
  position: relative;
  transition: all 1s;
}
#wheel.pb-spinwheel div.sec.pb-spinwheel .fa.pb-spinwheel{
  margin-top: -280px;
}
#wheel.pb-spinwheel div.sec.sec-8.pb-spinwheel{
    border-width: 150vw 63vw 0;
    transform-origin: 63.2vw 150vw;
    left: 17%;
    top: -27%;
}
.swiper-button-next, .swiper-button-prev{
	background-size: 17px 44px;
}
@media (max-width: 320px) and (max-height: 480px) {
			#wheel-arrow.pb-spinwheel{
				left: 70vw;
				top: 1vw;
			}
			#wrapper.pb-spinwheel{
			   	width: 200vw;
			    overflow: hidden;
			    position: absolute;
			    padding-top: 10vw;
			    bottom: -40%;
			    margin: unset;
			    z-index: 10;
			    top: 80%;
					margin-top: 22%;
			    left: -26.5%;
			    opacity: 0;
			}
			#wrapper.pb-spinwheel:before{
			  	width: 151vw;
    			height: 150vw;
			    left: -0.5vw;
			    top: 10vw;
			    margin-left: 0;
			}
			#wheel.pb-spinwheel{
			    width: 150vw;
    			height: 150vw;
			}
			#wheel.pb-spinwheel:before{
			    width: 145vw;
    			height: 145vw;
			    top: 0vw;
			    left: 0vw;
			}
			#spin.pb-spinwheel{
			  	width: 60vw;
			    height: 60vw;
			    top: 55vw;
			    left: 55vw;
			}
			#inner-spin.pb-spinwheel{
				width: 75px;
			    height: 75px;
			    top: 42%;
			    left: 42%;
			    background-size: contain;
			    box-shadow: rgba(255,255,255,1) 0px 0px 0px inset, rgba(255,255,255,1) 0px 0px 0px inset, rgba(0,0,0,0.4) 0px 3px 5px;
			    background-repeat: no-repeat;
			    background-image: url(img/playbasis_coin_single_500px.png);
			}
			#wheel.pb-spinwheel div.sec.pb-spinwheel .fa.pb-spinwheel{
			  margin-top: -200px;
			}
			#wheel.pb-spinwheel div.sec.sec-8.pb-spinwheel{
			    border-width: 150vw 63vw 0;
			    transform-origin: 63.2vw 150vw;
			    left: 7%;
    			top: -53%;
			}
			.swiper-button-next, .swiper-button-prev{
				background-size: 17px 44px;
			}
		}
</style>
<body>
<div id="sipnWheel" style="width: 100%;z-index: 1099;">
    <div class="swiper-button-next" id="arrowNext" style="float: right;opacity: 0;position: absolute;top: 31vw;right: -10vw"></div>
      <div class="swiper-button-prev" id="arrowPrev" style="float: right;opacity: 0;position: absolute;top: 31vw;left: -10vw"></div>
        <pb-spinwheel
          env-point-reward-levels='{ "level2": 10, "level3": 30, "level4": 60 }'
          env-target-action="click"
          env-target-tag="spin-wheel-01"
          env-custom-param-url-values='["spin"]'
          player-id=""
          show-debug-log
          class="spinwheel"
        >Loading...</pb-spinwheel>
</div>
	<div class="otherMenu menu-hide" onblur="myFunction()" style="position: fixed;bottom: -118px;right: 0px;width: 22%;z-index: 1020;background-color: aqua;display: none;">
		<div class=" center" style="padding: 10px">
			<a href="#"><span class="glyphicon glyphicon-globe" id="showLang"></span></a>
			<p style="font-size: 8px;text-align: center;">Language</p>
		</div>
		<div class=" center" style="padding: 10px">
			<a href="#"><span class="glyphicon glyphicon-off" id="logOut"></span></a>
			<p style="font-size: 8px;text-align: center;">Logout</p>
		</div>
	</div>
	<nav class="navbar navbar-inverse navbar-fixed-bottom" id="myNav" style="height: 10%;display: none;">
		<div style="position: absolute;z-index: 0;width: 100%;height: 100%;background-color: white;"></div>
		<div class="" style="width: 37%;float: left;align-self: center;margin-right: 26%;z-index: 1;margin-top: -10px;">
			<a href="Leader.jsp">
		   		<div class="center" style="display: inline-block;width: 48.5%;margin-top: 10px;">
		   			<img src="img/news1.png" style="margin-right: 0px;width: 55%;">
		   			<!-- <p style="font-size: 8px;text-align: center;color: black;">News</p> -->
		   		</div>
	   		</a>
	   		<a href="playlist.jsp">
		   		<div class="center" style="display: inline-block;width: 48.5%;margin-top: 10px;">
		   			<img src="img/playlistsicon.png" style="margin-right: 0px;width: 55%;">
		   			<!-- <p style="font-size: 8px;text-align: center;color: black;">Offers</p> -->
		   		</div>
	   		</a>
	   	</div>

	   	<div class="center" style="position: absolute;left: 50%;position: absolute;left: 50%;width: 24%;height: 100%;display: flex;justify-content: center;">
		   		<div  style="position: relative;left: -28%;height: 100%;display: flex;margin-top: -5px;" > <!-- onclick="location.href='index'" -->
		   			<img class="middle-menu" id="wheels" src="img/tar.png">
		   			<img class="middle-menu" src="img/pin.png" style="margin-right: 0px;width: 15%;position: relative;margin-top: 0px;height: auto;align-self: center;left: -37%;top: -16px;">
		   			<!-- <p style="font-size: 8px;text-align: center;color: black;">Playlists</p> -->
	   			</div>
   		</div>

	   	<div style="width: 37%;float: right;margin-right: -10px;align-self: center;z-index: 1;margin-top: -10px;">
	   		<a href="rewardStore.jsp">
		   		<div class=" center" style="display: inline-block;width: 48.5%;margin-top: 10px;">
					<img src="img/offers_untrim.png" style="margin-right: 0px;width: 55%;">
					<!-- <p style="font-size: 8px;text-align: center;color: black;">Wallet</p> -->
				</div>
			</a>
			<a href="#">
				<div class=" center" id="Setting" style="display: inline-block;width: 48.5%;margin-top: 10px;">
					<img src="img/wallet2.png" style="margin-right: 0px;width: 55%;">
					<!-- <p style="font-size: 8px;text-align: center;color: black;">Settings</p> -->
				</div>
			</a>
		</div>
		<div style="clear: both;"></div>
	</nav>

	<div class="container-fluid">
		<input type="hidden" id="pageName" name="pageName" value="<%=pageName%>">
		<!-- <div id="draggable" class="ui-widget-content" style="position: absolute;top: 100px;z-index: 9999;">
		  <p>Drag me around</p>
		</div> -->

		<!-- Modal -->

		<!-- <div class="modal  fade" id="menuPanel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
		  <div class="modal-dialog" role="document" style="margin-top: 15%;">
		    <div class="modal-content mCustom">
		      <div class="modal-body" style="text-align: center;padding: 1rem !important;">
		       	<div class="row">
		       		<div class="col-4 right">
		       			<a href="#"><span class="glyphicon glyphicon-user showUser" id="showUser"></span></a>
		       		</div>
		       		<div class="col-4">
		       			<a href="Leader.jsp" style="font-size: 25px"><span class="glyphicon glyphicon-list-alt"></span></a>
		       		</div>
		       		<div class="col-4 left">
		       			<a href="rewardStore"><span class="glyphicon glyphicon-gift"></span></a>
		       		</div>
		       	</div>
		       	<div class="row">
		       		<div class="col-4">

		       		</div>
		       		<div class="col-4">
		       			<a href="index"><span class="glyphicon glyphicon-home"></span></a>
		       		</div>
		       		<div class="col-4">

		       		</div>
		       	</div>
		       	<div class="row">
		       		<div class="col-4 right">
		       			<a href="#"><span class="glyphicon glyphicon-globe" id="showLang"></span></a>
		       		</div>
		       		<div class="col-4">

		       		</div>
		       		<div class="col-4 left" id="logOut">
		       			<a href="#"><span class="glyphicon glyphicon-off"></span></a>
		       		</div>
		       	</div>
		      </div>
		    </div>
		  </div>
		</div> -->

		<!-- Modal -->

		<div class="modal  fade" id="userInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
		  <div class="modal-dialog" role="document" style="margin-top: 5%;">
		    <div class="modal-content mCustom">
		      <div class="modal-body" style="text-align: center;">
		      	<p id="userName" class="p-header"></p>
		       	<div id="playerPanel">
		       		<div class="row">
		       			<div class="col-md-4 col-sm-4 col-4 ">
		       				<img src="" id="user_pic" style="max-width: 100px;max-height: 100px;">
		       			</div>
		       			<div class="col-md-8 col-sm-8 col-8">
		       				<div class="row myRow">
		       					<div class="col-md-4 col-sm-4 col-4 left">
		       						Level:
		       					</div>
		       					<div class="col-md-8 col-sm-8 col-8  center">
		       						<span id="user_level"></span>
		       					</div>
		       				</div>
		       				<div class="row myRow">
		       					<div class="col-md-4 col-sm-4 col-4 left">
		       						Point:
		       					</div>
		       					<div class="col-md-8 col-sm-8 col-8 center">
		       						<span id="user_point"></span>
		       					</div>
		       				</div>
		       			</div>
		       		</div>
		       		<dir class="row" style="padding-left: 0px;">
		       			<dir class="col-12">
				       		<div class="progress">
							    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" id="exp_progress">

							    </div>
							</div>
						</dir>
					 </dir>
		       		<div class="row">
		       			<div class="col-md-12 col-sm-12 col-12" style="padding: 0px;">
		       				<div>
		       					<ul class="nav nav-tabs">
								    <li class="myTab active" id="info"><a data-toggle="tab" href="#home">Info</a></li>
								    <li class="myTab" id="reward"><a data-toggle="tab" href="#menu1">Reward</a></li>
								    <li class="myTab" id="badge"><a data-toggle="tab" href="#menu2">Badge</a></li>
								</ul>

								  <div class="tab-content" style="overflow-y: auto;">
								    <div id="home" class="tab-pane fade in active" style="padding: 20px 10px 10px 10px;">

								    </div>
								    <div id="menu1" class="tab-pane fade" style="padding: 20px 10px 10px 10px;">
								      	<div class="panel panel-default">
										  <!-- Default panel contents -->
										  <div class="panel-heading" style="padding: 20px 10px 15px 10px;">
										  	<table id="table_goods">

										  	</table>
										  </div>
										</div>
								    </div>
								    <div id="menu2" class="tab-pane fade" style="padding: 20px 10px 10px 10px;">
								    	<div class="panel panel-default">
										  <!-- Default panel contents -->
										  <div class="panel-heading" style="padding: 20px 10px 15px 10px;">
										  	<center>
											  	<table id="table_reward">

											  	</table>
										  	</center>
										  </div>
										</div>
								    </div>
								  </div>
		       				</div>
		       			</div>
		       		</div>
		       	</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn custom btn-primary" data-dismiss="modal" id="closeUser" modal>Close</button>
		      </div>
		    </div>
		  </div>
		</div>

		<!-- Modal -->

		<div class="modal  fade" id="langPanel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
		  <div class="modal-dialog" role="document" style="margin-top: 15%;">
		    <div class="modal-content mCustom">
		      <div class="modal-header">
		         <h3>Language Selection</h3>
		      </div>
		      <div class="modal-body" style="text-align: center;padding: 25px 40px 25px 40px !important;">
		       	<div id="langList">

		       	</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn custom btn-primary" data-dismiss="modal" id="submitLang">Select</button>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal animated bounceInDown" id="checkOutGoods" role="dialog">

</div>
		<!-- Modal -->

		<!-- <div class="modal  fade" id="animation-panel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
		  <div class="modal-dialog" role="document" style="margin-top: 15%;">
		    <div class="modal-content mCustom">
		      <div class="modal-header">
		         <h3>Language Selection</h3>
		      </div>
		      <div class="modal-body" style="text-align: center;padding: 25px 70px 25px 70px;">

		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn custom btn-primary" data-dismiss="modal" id="submitLang">Select</button>
		      </div>
		    </div>
		  </div>
		</div> -->
