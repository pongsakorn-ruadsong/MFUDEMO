<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
	  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"> -->
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	 <!--  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'></script>
	<!-- <script src='http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'></script>  -->
	<script src="js/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/bootstrap.js"></script>
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script> -->
	<link rel='stylesheet prefetch' href='http://www.justinaguilar.com/animations/css/animations.css'>
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
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/gearSlide.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/bootstrap.css"> -->
	<link rel="stylesheet" type="text/css" href="css/toastr.min.css">
	<link rel="stylesheet" type="text/css" href="css/Whole.css">
	<link rel="stylesheet" type="text/css" href="css/user.css">
	<link rel="stylesheet" type="text/css" href="css/sweetalert.css">
	<link rel="stylesheet" type="text/css" href="css/flags.min.css">
	<link rel="stylesheet" type="text/css" href="css/animate.css">


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
		if (sessionStorage['pageName'] == 'login.jsp') {
			$('#myNav').hide();
		}
		else{
			$('#myNav').show();
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
		$('#showUser').click(function(){
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
			$('.tab-content').css('height','100');
			buildRewardList();
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
		background-color: rgba(146, 145, 145,0.4);
		border-color: rgba(241, 239, 239, 0.4);
		color: white;
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
</style>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" id="myNav">
		<ul class="nav navbar-nav navbar-left" style="margin: 0px;float: left;margin-left: 15px;">
			<div class="row">
				<div class="col-6" style="padding: 0px;">
					<a class="navbar-brand userPhoto" href="#" style="padding: 5px 5px;"><img src="img/default_user.png" id="userPro" style="width: 100%;height: 100%"></a>
				</div>
				<div class="col-6" style="padding: 15px 15px;">
				</div>
			</div>
		</ul>
		<ul class="nav navbar-nav navbar-right" style="margin: 0px;float: right;">
				<a class="navbar-brand userPhoto" href="#" data-toggle="modal" data-target="#menuPanel" style="padding: 10px 10px;"><img src="img/icons.png" style="width: 100%;height: 100%"></a>
		</ul>
	</nav>
	<div class="container-fluid">
		<input type="hidden" id="pageName" name="pageName" value="<%=pageName%>">
		<!-- <div id="draggable" class="ui-widget-content" style="position: absolute;top: 100px;z-index: 9999;">
		  <p>Drag me around</p>
		</div> -->

		<!-- Modal -->

		<div class="modal  fade" id="menuPanel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
		  <div class="modal-dialog" role="document" style="margin-top: 15%;">
		    <div class="modal-content mCustom">
		      <div class="modal-body" style="text-align: center;padding: 25px 25px 25px 25px;">
		       	<div class="row">
		       		<div class="col-4 right">
		       			<a href="#"><span class="glyphicon glyphicon-user" id="showUser"></span></a>
		       		</div>
		       		<div class="col-4">

		       		</div>
		       		<div class="col-4 left">
		       			<a href="rewardStore.jsp"><span class="glyphicon glyphicon-gift"></span></a>
		       		</div>
		       	</div>
		       	<div class="row">
		       		<div class="col-4">

		       		</div>
		       		<div class="col-4">
		       			<a href="index.jsp"><span class="glyphicon glyphicon-home"></span></a>
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
		</div>

		<!-- Modal -->

		<div class="modal  fade" id="userInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
		  <div class="modal-dialog" role="document" style="margin-top: 10%;">
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
								      	
								    </div>
								    <div id="menu2" class="tab-pane fade" style="padding: 20px 10px 10px 10px;">
								    	<div class="panel panel-default">
										  <!-- Default panel contents -->
										  <div class="panel-heading" id="table_reward" style="padding: 20px 10px 15px 10px;">
										  	
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

		
