<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	 <!--  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'></script>
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'></script>
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="js/index.js"></script>
	<script src="js/quiz.js"></script>
	<script src="js/bootstrap.bundle.js"></script>
	<script src="js/toastr.min.js"></script>
	<script src="js/login.js"></script>
	<script src="js/gearSlide.js"></script>
	<script src="js/slider.js"></script>
	<script src="js/sweetalert.js"></script>
	<script src="js/account.js"></script>
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
			getUserInfo();
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
			buildRewardList();
		});
		$('#reward').click(function(){
			
		});
	});

</script>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" id="myNav">
				  <div class="container-fluid">
				    <div class="navbar-header">
				      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>                        
				      </button>
				      <a class="navbar-brand" href="#">Playbasis</a>
				    </div>
				    <div class="collapse navbar-collapse" id="myNavbar">
				      <ul class="nav navbar-nav">
				        <li class="active" id="barHome"><a href="index.jsp">Home</a></li>
				         <li class="dropdown" id="showUser">
				          <a class="dropdown-toggle" data-toggle="modal" data-target="#userInfo" href="#">User </a>
				        </li>
				      </ul>
				      <ul class="nav navbar-nav navbar-right">
				        <li id="showLang"><a href="#" data-toggle="modal" data-target="#langPanel"><span class="glyphicon glyphicon-globe"></span> Language </a></li>
				        <li id="logOut"><a href="#" ><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
				      </ul>
				    </div>
				  </div>
	</nav>
	<div class="container-fluid">
		<input type="hidden" id="pageName" name="pageName" value="<%=pageName%>">

		<!-- Modal -->
		<div class="modal  fade" id="userInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
		  <div class="modal-dialog" role="document" style="margin-top: 5%;">
		    <div class="modal-content mCustom">
		      <div class="modal-header">
		        <h3>User's Infomation</h3> 
		      </div>
		      <div class="modal-body" style="text-align: center;">
		       	<div id="playerPanel">
		       		<div class="row">
		       			<div class="col-md-4">
		       				<img src="" id="user_pic" style="max-width: 100px;max-height: 100px;">
		       			</div>
		       			<div class="col-md-8">
		       				<div class="row myRow">
		       					<div class="col-md-4 left">
		       						Username:
		       					</div>
		       					<div class="col-md-8 center">
		       						<span id="user_name"></span>
		       					</div>
		       				</div>
		       				<div class="row myRow">
		       					<div class="col-md-4 left">
		       						Level:
		       					</div>
		       					<div class="col-md-8 center">
		       						<span id="user_level"></span>
		       					</div>
		       				</div>
		       				<div class="row myRow">
		       					<div class="col-md-4 left">
		       						EXP:
		       					</div>
		       					<div class="col-md-8 center">
		       						<div class="level_bar"><div class="level_progress" id="level_progress"></div><span id="user_exp" style="position: relative;z-index: 0;"></span></div>
		       					</div>
		       				</div>
		       				<div class="row myRow">
		       					<div class="col-md-4 left">
		       						Point:
		       					</div>
		       					<div class="col-md-8 center">
		       						<span id="user_point"></span>
		       					</div>
		       				</div>
		       			</div>
		       		</div>
		       		<br>
		       		<div class="row">
		       			<div class="col-md-12">
		       				<div>
		       					<ul class="nav nav-tabs">
								    <li class="myTab active" id="info"><a data-toggle="tab" href="#home">Info</a></li>
								    <li class="myTab" id="reward"><a data-toggle="tab" href="#menu1">Reward</a></li>
								</ul>

								  <div class="tab-content">
								    <div id="home" class="tab-pane fade in active">
								      <h3>HOME</h3>
								      <p>Under Construction</p>
								    </div>
								    <div id="menu1" class="tab-pane fade" style="padding: 20px 10px 10px 10px;">
								      <div class="panel panel-default">
										  <!-- Default panel contents -->
										  <div class="panel-heading">
										  	<!-- Table -->
										  	<table class="table" id="table_reward">
										  		
										    </table>
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
		      <div class="modal-body" style="text-align: center;padding: 25px 70px 25px 70px;">
		       	<div id="langList">
		       		
		       	</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn custom btn-primary" data-dismiss="modal" id="submitLang">Select</button>
		      </div>
		    </div>
		  </div>
		</div>

		 
		
	

