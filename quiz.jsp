<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login.jsp");
			}else{
				getQuestion();
				getContent();
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
				  	$('#myModal').modal('show');
				    swal("Successful!", "The quiz has been reseted!.", "success");
				  } else {
				    swal("Cancelled", "The quiz are safe!", "error");
				  }
				});
		    });
		    $("#nextBtn").click(function(){
			    if (valid()) {
			    	nextQuestion();
			    	if (isLastQuestion()) {
			    		getToastrOption();
				    	toastr["info"]("This is the last question. we're bringing you to index", "Successful");
				    	setTimeout(function(){ window.location.replace("index.jsp"); }, 1500);
					}else{
						savePrevious();
						getToastrOption();
				    	toastr["info"]("Please wait for 1-2 sec. You're going to next question", "Successful");
				    	setTimeout(function(){ location.reload(); }, 1500);
					}
			    }
			});
		    $('.range-slider__range').change(function(){
		    	$('.range-slider__value').text(($('.range-slider__range').val()));
		    });
		});
		
	</script>
	<style type="text/css">
		.loader {
		  border: 16px solid #f3f3f3;
		  border-radius: 50%;
		  border-top: 16px solid blue;
		  border-right: 16px solid green;
		  border-bottom: 16px solid red;
		  width: 120px;
		  height: 120px;
		  -webkit-animation: spin 2s linear infinite;
		  animation: spin 2s linear infinite;
		}

		@-webkit-keyframes spin {
		  0% { -webkit-transform: rotate(0deg); }
		  100% { -webkit-transform: rotate(360deg); }
		}

		@keyframes spin {
		  0% { transform: rotate(0deg); }
		  100% { transform: rotate(360deg); }
		}
	</style>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- font awesome -->
	
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
					<p id="choice">
						<div class="row" id="range-panel" typeZ="RANGE" style="display: none;">
							<div class="col-md-12">
								<div class="wrapper">
  								<div class="containerG">
								<div class="slider-wrapper">
							      <div id="slider-range"></div>

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

							      <div class="marker marker-0"><sup>$</sup><span id="minsli"></span></div>
							      <div class="marker marker-100"><sup>$</sup><span id="maxsli"></span></div>
							    </div>
							    </div>
								</div>
							</div>
						</div>

						<div class="row" id="slider-panel" typeZ="SLI" style="display: none;text-align: center;">
							<div class="range-slider">
								<div class="row" style="width: 100%;text-align: center;margin-left: 0px;margin-right: 0px;">
									<div class="col-md-2"><span id="minslider"></span></div>
							 		<div class="col-md-8"><input class="range-slider__range" id="slider-bar" type="range"  value="" min="" max="" step="" ></div>
							 		<div class="col-md-2"><span id="maxslider"></span></div>
							 	</div>
							  <div style="text-align: center;margin-top: 30px;"><span id="disValueSli" style="padding: 15px;" class="range-slider__value" style="width: 20%"></span></div>
							</div>

						</div>
					</p>
				</div>
				<div class="button-group">
					<button class="btn btn-danger" id="resetQuiz" type="button" style="margin-right: 20px;">Reset</button>
					<button class="btn btn-primary" id="nextBtn"  type="button">Next</button>

				</div>
			</div>
		</div>
	</div>
	<!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog" style="margin-top: 200px;">
    
      <!-- Modal content-->
      <div class="modal-content" style="background-color: rgba(157, 157, 179, 0);border:none;">
        <CENTER>
        <div class="modal-body" style="padding: 100px;">
          <div class="loader"></div>
        </div>
        </CENTER>
      </div>
      
    </div>
  </div>
	
<%@include file="bottom.jsp" %>