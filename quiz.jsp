<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login.jsp");
			}else{
				translateContent();
				getLang();
				getQuestion();
				sessionStorage['ans_no'] = null;
				sessionStorage['type'] = null;
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
		    	if (sessionStorage['type'] == 'RANGE_S' && sessionStorage['ans_no'] == "null") {
		    		getToastrOption();
					toastr["info"]("Please answer the question.", "Hint!");
		    	}
		    	else if(sessionStorage['type'] == 'SLI_S' && sessionStorage['ans_no'] == "null"){
		    		getToastrOption();
					toastr["info"]("Please answer the question.", "Hint!");
		    	}
		    	else if (sessionStorage['ans_no'] == "no") {
		    		if (valid()) {
			    		nextQuestion();
			    		if (isLastQuestion()) {
					    		getToastrOption();
						    	toastr["info"]("This is the last question. we're bringing you to index", "Successful");
						    	setTimeout(function(){ window.location.replace("index.jsp"); }, mathRand);
							}else{
								savePrevious();
								getToastrOption();
						    	toastr["info"]("Please wait for 1-2 sec. You're going to next question", "Successful");
						    	setTimeout(function(){ location.reload(); }, mathRand);
							}
						}
		    	}else{
			    if (valid()) {
				    	nextQuestion();
						getToastrOption();
				    }
				}
			});
		    $('.range-slider__range').change(function(){
		    	$('.range-slider__value').text(($('.range-slider__range').val())+" "+$('#unit').text());
		    	$('#hidSLIval').val(($('.range-slider__range').val()));
		    });
		    $('.dropdown-menu > .dropdown-item').click(function(){
		    	$('#showCurren').remove();
		    	$('#chgCurren').text($(this).attr('value'));
		    });
		    $('#yesi').click(function(){
		    	$('#realDeal').slideDown();
		    	sessionStorage['ans_no'] = "yes";
		    });
		    $('#noi').click(function(){
			   $('#realDeal').slideUp(); 
			   sessionStorage['ans_no'] = "no";
		    });
		});
		
	</script>
	<style type="text/css">
		
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
				<div id="choice">
					<div id="4Play" style="display: none;">
						<input type="button" id="yesi" value="Yes"><br>
						<input type="button" id="noi" value="No"><br>
					</div>
					<div id="realDeal" style="display: none;">
						<div id="range-panel" typeZ="RANGE" style="display: none;margin-bottom: 50px;margin-top: 70px;">
							<div class="row">
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
							<center>
								<div class="row" style="padding-left: 4px;margin-top: 50px;">
									<div class="col-md-12">
										<div class="input-group " style="width: 70%">
											<input type="text" class="form-control showMoney" id="showMin" readonly="true">
												<span style="padding-top: 10px;">&nbsp&nbsp&nbsp&nbspTo&nbsp&nbsp&nbsp&nbsp</span>
											<input type="text" class="form-control showMoney" id="showMax" readonly="true"> 
										   <span class="input-group-btn" style="margin-left: 10px;">
										       <div class="dropdown">
													<button class="btn btn-default dropdown-toggle" type="button" id="chgCurren" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="float: right;width: 100px;"><img id="showCurren" style="margin-right: 0px;" src="img/currency.png"></button>
													<div class="dropdown-menu" aria-labelledby="dropdownMenu1">
														<p class="dropdown-item" id="CurrenTH" value="Baht"><img src="img/en.png"/>THB</p>
													    <p class="dropdown-item" id="CurrenEN" value="Dollar"><img src="img/th.png"/>USD</p>
												    </div>
												</div>
										   </span>
										</div>
									</div>
								</div>
							</center>
						</div>
						<div class="row" id="slider-panel" typeZ="SLI" style="display: none;text-align: center;">
							<div class="range-slider">
								<div class="row" style="width: 100%;text-align: center;margin-left: 0px;margin-right: 0px;">
									<div class="col-md-2"><span id="minslider"></span></div>
							 		<div class="col-md-8"><input class="range-slider__range" id="slider-bar" type="range"  value="" min="" max="" step="" ></div>
							 		<div class="col-md-2"><span id="maxslider"></span></div>
							 	</div>
							  <div style="text-align: center;margin-top: 30px;">
							  	<span id="disValueSli" style="padding: 15px;" class="range-slider__value" style="width: 20%">
									
								</span>
								<span id="unit" style="margin-left: 10px;display: none;"></span>
								<input type="hidden" id="hidSLIval" value="">
							  </div>
							</div>
						</div>
					</div>
				</div>
				<div class="button-group">
					<button class="btn btn-danger" id="resetQuiz" type="button" style="margin-right: 20px;">Reset</button>
					<button class="btn btn-primary" id="nextBtn"  type="button">Next</button>

				</div>
			</div>
		</div>
	</div>
	<div id="back" style="position: absolute;bottom: 100px;left: 100px;"><img src="img/go-back_temp.png" style="display: none"></div>
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
  <div id="modal_score">
  	
  </div>
<%@include file="bottom.jsp" %>