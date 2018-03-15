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
	<script src="js/Leader.js"></script>
	<script src="js/qrcode.min.js"></script>
	<!-- <script src="js/jquery-1.3.2.min.js"></script>     -->
	<script src="js/jquery-barcode.min.js"></script>  
	<link rel="stylesheet" href="css/intlTelInput.css" />
	<link href="css/bootstrap-glyphicons.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/gearSlide.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/bootstrap.css"> -->
	<link rel="stylesheet" type="text/css" href="css/toastr.min.css">
	<link rel="stylesheet" type="text/css" href="css/Whole.css">
	<link rel="stylesheet" type="text/css" href="css/user.css">
	<link rel="stylesheet" type="text/css" href="css/sweetalert.css">
	<link rel="stylesheet" type="text/css" href="css/flags.min.css">
	<link rel="stylesheet" type="text/css" href="css/animate.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

	<%
		String uri = request.getRequestURI();
		String pageName = uri.substring(uri.lastIndexOf("/")+1);
	%>
	<title>Demo v0.1</title>
</head>
<script type="text/javascript">
	var guestImage = new Array("img/batman.png","img/flash.png","img/robin.png","img/superman.png","img/spiderman.png","img/punisher.png","img/wonderwoman.png","img/ironman.png")
	$( function() {
    $( "#draggable" ).draggable();
  	} );
	$(document).ready(function(){
		sessionStorage['pageName'] = $('#pageName').val();
		console.log(sessionStorage['pageName']);
		if (sessionStorage['pageName'] == 'login' || sessionStorage['pageName'] == 'login.jsp') {
			$('#myNav').hide();
			$('.footer').css('display','none');
			
		}
		else{
			$('#myNav').show();
			$('.footer').css('display','block');
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
			$('.tab-content').css('height','400');
			getUserReward();
		});
		$('#badge').click(function(){
			$('.myTab').removeClass('active');
			$('#badge').addClass('active');
			$('.tab-content').css('height','400');
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
				$('.otherMenu').removeClass('menu-hide').addClass('menu-show');
				$('.otherMenu').css('bottom','10%');
			}
			else if($('.otherMenu').hasClass('menu-show')){
				$('.otherMenu').removeClass('menu-show').addClass('menu-hide');
				var h = $('.otherMenu').height();
				$('.otherMenu').css('bottom', -h);
			}
		});
	});
		function changeUI(a){
			console.log($(window).width())
			if (a == 1024) {
				console.log("reload")
			   location.reload();
			}
		}
</script>
<style type="text/css">
	.container-fluid > .navbar-collapse {
	    margin-right: 0px;
	     margin-left: 0px; 
	}
	.navbar-inverse{
		/*background-color: rgba(255,255,255,0);*/
		border-color: rgba(255,255,255,0);
		background-color:white;
		border-color: aqua;
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
		transition: all 1s;
	}
</style>
<body>
	<div class="otherMenu menu-hide" style="position: fixed;bottom: -100px;right: 0px;width: 22%;z-index: 1020;background-color: aqua;">
		<div class=" center" style="padding: 10px">
			<a href="#"><span class="glyphicon glyphicon-globe" id="showLang"></span></a>
			<p style="font-size: 8px;text-align: center;">Language</p>
		</div>
		<div class=" center" style="padding: 10px">
			<a href="#"><span class="glyphicon glyphicon-off" id="logOut"></span></a>
			<p style="font-size: 8px;text-align: center;">Logout</p>
		</div>
	</div>
	<nav class="navbar navbar-inverse navbar-fixed-bottom" id="myNav" style="height: 10%;">
		<ul class="nav navbar-nav navbar-left" style="margin: 0px;float: left;margin-left: 15px;">
			<div class="row">

			</div>
		</ul>
		<ul class="nav navbar-nav navbar-right" style="margin: 0px;float: right;padding: 5px 5px;">
				<!-- <a class="navbar-brand userPhoto" href="#" style="padding: 0px;border: 3px solid green;border-radius: 50%;"><img src="img/default_user.png" id="userPro" style="width: 100%;height: 100%"></a> -->
				<a class="navbar-brand userPhoto" href="#" data-toggle="modal" data-target="#menuPanel" style="padding: 0px;float: right;">
					
				</a>
		</ul>

		<div class="" style="width: 35%;float: left;">
	   		<div class="center" style="display: inline-block;width: 48.5%;margin-top: 10px;">
	   			<a href="Leader.jsp"><span class="glyphicon glyphicon-list-alt"></span></a>
	   			<p style="font-size: 8px;text-align: center;">News</p>
	   		</div>
	   		<div class="center" style="display: inline-block;width: 48.5%;margin-top: 10px;">
	   			<a href="rewardStore"><span class="glyphicon glyphicon-gift"></span></a>
	   			<p style="font-size: 8px;text-align: center;">Offers</p>
	   		</div>
	   	</div>

	   	<div class="center" style="position: absolute;left: 50%;">
	   		<div style="position: relative;left: -50%;">
	   			<a href="index"><img src="img/iconplaylist.png" style="margin-right: 0px;width: 25%;"></a>
	   			<p style="font-size: 8px;text-align: center;">Playlists</p>
   			</div>
   		</div>

	   	<div style="width: 35%;float: right;">
	   		<div class=" center" style="display: inline-block;width: 48.5%;margin-top: 10px;">
				<a href="#"><span class="glyphicon glyphicon-credit-card" id="Wallet"></span></a>
				<p style="font-size: 8px;text-align: center;">Wallet</p>
			</div>
			<div class=" center" id="Setting" style="display: inline-block;width: 48.5%;margin-top: 10px;">
				<a href="#"><span class="glyphicon glyphicon-cog"></span></a>
				<p style="font-size: 8px;text-align: center;">Settings</p>
			</div>
		</div>
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

								  <div class="tab-content">
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

		
