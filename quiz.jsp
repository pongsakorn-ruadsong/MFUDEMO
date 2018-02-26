<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login.jsp");
			}else{
				translateContent();
				getQuestion();
				sessionStorage['ans_no'] = null;
				sessionStorage['type'] = null;
			}
		    $('.range-slider__range').on('input', function(){
		    	// $("#nextBtn").prop('disabled', false);
		    	if (type == 'SLI') {
		    		var val = parseInt($('#slider-bar').val());
		    		var vaule = val.toLocaleString()
		    		console.log(vaule)
		    		$('.range-slider__value').html(vaule+" "+sessionStorage['unit']);
			    	$('#hidSLIval').val($('#slider-bar').val());
		    	}else if(type == 'SLI_S'){
		    		var val = parseInt($('#slider-bar_S').val());
		    		var vaule = val.toLocaleString()
		    		console.log(vaule)
		    		$('.range-slider__value').html(vaule+" "+sessionStorage['unit']);
			    	$('#hidSLIval_S').val($('#slider-bar_S').val());
		    	}
			});
		    $('.dropdown-menu > .dropdown-item').click(function(){
		    	$('#showCurren').remove();
		    	$('#chgCurren').text($(this).attr('value'));
		    });
		    $('#yesi').click(function(){
		    	$("#nextBtn").prop('disabled', true);
		    	$('.yesi').css("background-color","mediumslateblue");
		    	$('.noi').css("background-color","white");
		    	$('.yesi').css("color","white");
		    	$('.noi').css("color","black");
		    	$('#spece-for-S').slideDown();
		    	sessionStorage['ans_no'] = "Yes";
		    });
		    $('#noi').click(function(){
		    	// $("#nextBtn").prop('disabled', false);
		    	$('.yesi').css("background-color","white");
		    	$('.noi').css("background-color","mediumslateblue");
		    	$('.yesi').css("color","black");
		    	$('.noi').css("color","white");
			   $('#spece-for-S').slideUp();
			   sessionStorage['ans_no'] = "No";
		    });
		    
		   // $('#Other').click(function(){ console.log("Success")});
		 //   $('#0085').bind('click', function(){
			//   $(this).toggleClass('active');
			//   if ($('#CHK_0085').prop( "checked" )) {
			//   	$('#CHK_0085').prop("checked",true);
			//   }else{
			//   	$('#CHK_0085').prop("checked",false);
			//   }
			// });
		});

	</script>
	<!-- <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet"> -->
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
	<style type="text/css">
		@media (max-width: 374px){
			.bg{
				padding: 20px;
			}
		}
		.modal-header {
		    padding: 5px;
		}
		.modal-body {
		    position: relative;
		    padding: 40px;
		}
		.modal-footer {
		    padding: 15px;
		    text-align: center;
		}

		.modal-backdrop.fade, .modal-backdrop.show  {
		    opacity: 0.5;
		}
		.wrap{
		  margin: 0 auto;
		  width: 160px;
		}
		.highligt-choice{
			background-color: mediumslateblue;
			color: white;
		}
		#resetQuiz{
			animation-duration: 0.5s;
  			/*-vendor-animation-delay: 2s;*/
		}
		.bounceInLeft{
			animation-duration: 1.5s;
		}
		#stopCount{
			animation-duration: 0.5s;
		}
		.choice-overlay{
			animation-duration: 0.5s;
		}
		.animated.flip{
			animation-duration: 0.15s !important;
			animation-iteration-count: 4;
			animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}
		.fadeOutUp{
			animation-duration: 0.4s;
		}
		.animated.zoomOutUp{
			animation-duration: 0.4s;
		}
		.normal-form-next{
			background: linear-gradient(to right, #007bff 50%, gray 50%);
		    background-size: 200% 100%;
		    background-position:right bottom;
		    animation-timing-function: linear;
		    transition:all 4.5s ease;
			animation-duration: 0.6s;
		}
		.countDown-btn{
			background-position:left bottom !important;
		}
		#coin {
		  transition: -webkit-transform 1s ease-in;
		  -webkit-transform-style: preserve-3d;
		}
		#coin div {
		  position: absolute;
		  -webkit-backface-visibility: hidden;
		}
		.side-a {
		  z-index: 100;
		}
		.side-b {
		  -webkit-transform: rotateY(-180deg);
		}
		#coin.heads {
		  -webkit-animation: flipHeads 3s ease-out forwards;
		  -moz-animation: flipHeads 3s ease-out forwards;
		    -o-animation: flipHeads 3s ease-out forwards;
		       animation: flipHeads 3s ease-out forwards;
		}
		#coin.tails {
		  -webkit-animation: flipTails 3s ease-out forwards;
		  -moz-animation: flipTails 3s ease-out forwards;
		    -o-animation: flipTails 3s ease-out forwards;
		       animation: flipTails 3s ease-out forwards;
		}

		@-webkit-keyframes flipHeads {
		  from { -webkit-transform: rotateY(0); -moz-transform: rotateY(0); transform: rotateY(0); }
		  to { -webkit-transform: rotateY(1800deg); -moz-transform: rotateY(1800deg); transform: rotateY(1800deg); }
		}
		@-webkit-keyframes flipTails {
		  from { -webkit-transform: rotateY(0); -moz-transform: rotateY(0); transform: rotateY(0); }
		  to { -webkit-transform: rotateY(1980deg); -moz-transform: rotateY(1980deg); transform: rotateY(1980deg); }
		}
	</style>

	<div class="bg" id="quizImg">
		<div class="topic" style="position: fixed;top: 15%;z-index: 1040;">
			<p id="topic"></p>
		</div>
		<div class="row" style="margin-top: 20%;margin-bottom: 30%;">
		<div class="col-md-6 qa" id="img" style="display: none;">
			<center style="height: 0px;overflow: hidden;">
				<img src="img/Playbasis-logo.png" class="quizImg quizImg_temp" id="" style="display:block;">
			</center>
		</div>
		<div class="col-md-6" id="question" style="margin-top: 80px;padding-right: 0px;padding-left: 0px;">
				<div id="choice">
					<div id="4Play" style="display: none;">
						<div class="btn-group-vertical" style="width:100%;">
							<label class="btn btn-choices yesi" style="border: 1px solid #ddd;border-radius: 30px;text-align:left;overflow: auto;">
								<input id="yesi" style="visibility:hidden;" type="radio" value="Yes">Yes<br>
							</label>
						</div>
						<div id="spece-for-S" style="display: none;">
											
											<div class="row" id="slider-panel_S" typeZ="SLI" style="display: none;text-align: center;margin-bottom: 20px;">
												<div class="range-slider">
													<div class="row" style="width: 100%;text-align: center;margin-left: 0px;margin-right: 0px;">
														<div class="col-2" style="padding: 0px;"><span id="minslider_S"></span></div>
												 		<div class="col-8" style="padding: 0px;"><input class="range-slider__range" id="slider-bar_S" type="range" style="width: 80%"  ></div>
												 		<div class="col-2" style="padding: 0px;"><span id="maxslider_S"></span></div>
												 	</div>
												  <div style="text-align: center;margin-top: 30px;">
												  	<span id="disValueSli_S" style="padding: 15px;" class="range-slider__value" style="width: 20%">

													</span>
													<span id="unit_S" style="margin-left: 10px;display: none;"></span>
													<input type="hidden" id="hidSLIval_S" value="">
												  </div>
												</div>
											</div>

						</div>
						<div class="btn-group-vertical" style="width:100%;">
							<label class="btn btn-choices noi" style="border: 1px solid #ddd;border-radius: 30px;text-align:left;overflow: auto;">
								<input id="noi" style="visibility:hidden;" type="radio" value="No">No<br>
							</label>
						</div>
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
									<div class="col-2" style="padding: 0px;"><span id="minslider"></span></div>
							 		<div class="col-8" style="padding: 0px;"><input class="range-slider__range" id="slider-bar" type="range" style="width: 80%"></div>
							 		<div class="col-2" style="padding: 0px;"><span id="maxslider"></span></div>
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
				<input type="hidden" id="aPrefix">
				<input type="hidden" id="aAnswer">
			<div class="button-group" id="btn_NR">


				</div>
		</div>
	</div>
</div>
<!-- <div class="wrap">
  <div class="btnB" id="0085"><i class="glyphicon glyphicon-ok"><input id="CHK_0085" type="checkbox" value="1"></i></div>
  <div class="btnB"><i class="icon-ok"><input type="checkbox" value="2">2</i></div>
  <div class="btnB"><i class="icon-ok"><input type="checkbox" value="3">3</i></div>
</div> -->
  <div id="modal_score">

  </div>
	<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content" style="background-color: #fff0;border:0px;">
        <CENTER>
        <div class="modal-body" style="position: fixed;top: 80px;left: 0px;">
          <div class="" style="">
          	<img src="gif/Newest_Lotus2.gif" style="width: 100%;height: 100%;">
		  </div>
        </div>
        </CENTER>
      </div>

    </div>
  </div>
<%@include file="bottom.jsp" %>
