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
		    	var val = parseInt($('.range-slider__range').val());
		    	var vaule = val.toLocaleString()
			    $('.range-slider__value').html(vaule+" 	&#3647");
			    $('#hidSLIval').val($('.range-slider__range').val());
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
		   // $('#Other').click(function(){ console.log("Success")});
		});

	</script>






<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
	<style type="text/css">
		.modal-backdrop.fade, .modal-backdrop.show  {
		    opacity: 0.5;
		}
	</style>
	<div class="bg row" id="quizImg" style="margin-top: 50px;">
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
							 		<div class="col-md-7"><input class="range-slider__range" id="slider-bar" type="range"  value=0 min=0 max=1000000 step=1000 ></div>
							 		<div class="col-md-3"><span id="maxslider"></span></div>
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
				<div class="button-group" id="btn_NR">


				</div>
			</div>
		</div>
	</div>

  <div id="modal_score">

  </div>
	<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content" style="background-color: rgba(157, 157, 179, 0);border:none;">
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
