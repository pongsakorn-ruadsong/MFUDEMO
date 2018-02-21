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
		    	$("#nextBtn").prop('disabled', false);
		    	var val = parseInt($('.range-slider__range').val());
		    	var vaule = val.toLocaleString()
			    $('.range-slider__value').html(vaule+" "+sessionStorage['unit']);
			    $('#hidSLIval').val($('.range-slider__range').val());
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
		    	$("#nextBtn").prop('disabled', false);
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
		.btnB{
		  position: relative;
		  float: left;
		  margin-left: 30px;
		  width: 50px;
		  height: 50px;
		  border-radius: 50%;
		  background: rgb(151,202,218);
		  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzk3Y2FkYSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2OGI2ZDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
		  box-shadow: inset 0 5px 5px -2px #E1EFF4, 0 0 3px 2px #5A8491, inset 0 -3px 5px -2px #478BA0;
		  color: #fff;
		  color: transparent;
		  text-align: center;
		  font-size: 30px;
		  line-height: 50px;
		  cursor: pointer;
		}

		.btnB:after{
		  position:absolute;
		  top: -6px;
		  left: -6px;
		  z-index: -1;
		  width: 62px;
		  height: 62px;
		  border-radius: 50%;
		  background: #F9FDFD;
		  box-shadow: 0 0 3px 0 #ABB0B2, 0 2px 5px -1px #787E80;
		  content: "";
		}
		.highligt-choice{
			background-color: mediumslateblue;
			color: white;
		}
		.btnB.active{
		  background: rgb(84,143,163);
		  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzU0OGZhMyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM3NDlkYWEiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
		  box-shadow: inset 0 4px 6px 2px #3B6B7A;
		  color: #fff;
		  text-shadow: 0 -1px 0 #757878;
		}

		.btnB.active:after{
		  background: rgb(172,172,172);
		  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2FjYWNhYyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjcxJSIgc3RvcC1jb2xvcj0iI2Q2ZDZkNiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
		  box-shadow: none;
		}
	</style>

	<div class="bg" id="quizImg">
		<div class="topic" style="position: fixed;top: 15%;z-index: 1040;">
			<p id="topic"></p>
		</div>
		<div class="row" style="margin-top: 20%;margin-bottom: 20%;">
		<div class="col-md-6 qa" id="img" style="display: none;">
			<center style="height: 0px;overflow: hidden;">
				<img src="img/Playbasis-logo.png" class="quizImg quizImg_temp" id="" style="display:block;">
			</center>
		</div>
		<div class="col-md-6" id="question" style="margin-top: 80px;padding-right: 0px;padding-left: 0px;">
				<div id="choice">
					<div id="4Play" style="display: none;">
						<div class="btn-group-vertical" style="width:100%;">
							<label class="btn btn-choices-multi yesi" style="border: 1px solid #ddd;border-radius: 30px;text-align:left;overflow: auto;">
								<input id="yesi" style="visibility:hidden;" type="radio" value="Yes">Yes<br>
							</label>
						</div>
						<div id="spece-for-S" style="display: none;">
											
											<div class="row" id="slider-panel_S" typeZ="SLI" style="display: block;text-align: center;margin-bottom: 20px;">
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
							<label class="btn btn-choices-multi noi" style="border: 1px solid #ddd;border-radius: 30px;text-align:left;overflow: auto;">
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
							 		<div class="col-8" style="padding: 0px;"><input class="range-slider__range" id="slider-bar" type="range" style="width: 80%"  value=0 min=0 max=1000000 step=1000 ></div>
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
