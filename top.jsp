<!DOCTYPE html>
<html>
<head>
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'></script>
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'></script>
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/index.js"></script>
	<script src="js/quiz.js"></script>
	<script src="js/bootstrap.bundle.js"></script>
	<script src="js/toastr.min.js"></script>
	<script src="js/login.js"></script>
	<script src="js/gearSlide.js"></script>
	<script src="js/slider.js"></script>
	<script src="js/sweetalert.js"></script>
	<link rel="stylesheet" type="text/css" href="css/gearSlide.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/toastr.min.css">
	<link rel="stylesheet" type="text/css" href="css/Whole.css">
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
	});
</script>
<body>
	<div class="container-fluid">
		<input type="hidden" id="pageName" name="pageName" value="<%=pageName%>">
		
		
	

