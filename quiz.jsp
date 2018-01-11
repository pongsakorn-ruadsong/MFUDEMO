<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login.jsp");
			}else{
				getQuestion();
			}
		    
		    $('#resetQuiz').click(function(){
		    	swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover your answered data",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, reset it!",
				  cancelButtonText: "No, cancel plx!",
				  closeOnConfirm: false,
				  closeOnCancel: false
				},
				function(isConfirm) {
				  if (isConfirm) {
				  	resetQuiz();
				    swal("Successful!", "The quiz has been reseted!.", "success");
				  } else {
				    swal("Cancelled", "The quiz are safe!", "error");
				  }
				});
		    });
		    $("#nextBtn").click(function(){
			    if (valid()) {
			    	nextQuestion();
			    }else{
			    	swal("Error!", "You have to put some data on the field!", "error")
			    }
			});
		});
	</script>
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'></script>
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'></script>
	<div class="bg row" id="quizImg">
		<div class="col-md-6" id="img">
			<img src="" class="quizImg" id="OptionImg">
		</div>
		<div class="col-md-6" id="question">
			<div class="qa">
				<div class="topic">
					<p id="topic"></p>
				</div>
				<div class="choice">
					<p id="choice"></p>
				</div>
				<div class="button-group">
					<button class="btn btn-danger" id="resetQuiz" type="button" style="margin-right: 20px;">Reset</button>
					<button class="btn btn-primary" id="nextBtn"  type="button">Next</button>

				</div>
			</div>
		</div>
	</div>
	<div class="wrapper" >
  <div class="container">

    <div class="slider-wrapper" >
      <div id="slider-range"  style="display: block;"></div>

      <div class="range-wrapper">
        <div class="range"></div>
        <div class="range-alert">+</div>

        <div class="gear-wrapper">
          <div class="gear-large gear-one">
            <div class="gear-tooth"></div>
            <div class="gear-tooth"></div>
            <div class="gear-tooth"></div>
            <div class="gear-tooth"></div>
          </div>
          <div class="gear-large gear-two">
            <div class="gear-tooth"></div>
            <div class="gear-tooth"></div>
            <div class="gear-tooth"></div>
            <div class="gear-tooth"></div>
          </div>
        </div>

      </div>

      <div class="marker marker-0"><sup>$</sup>10,000</div>
      <div class="marker marker-25"><sup>$</sup>35,000</div>
      <div class="marker marker-50"><sup>$</sup>60,000</div>
      <div class="marker marker-75"><sup>$</sup>85,000</div>
      <div class="marker marker-100"><sup>$</sup>110,000+</div>
    </div>

  </div>
</div>
<%@include file="bottom.jsp" %>