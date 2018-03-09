<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login");
			}else{
				translateContent();
				getPlayCount();
				getQuestion();
				getFeed(function(data){
					if (data != undefined || data != null) {
						buildFeed(data);
					}
				});
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
		    $('#feed-refresh').click(function(){
		    	getFeed(function(data){
					if (data != undefined || data != null) {
						buildFeed(data);
					}
				});
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
			$('#click-hide-feed').click(function(){
				console.log($('.live-box-content').height())
				if ($('.live-box-content').height() > 50) {
					// console.log($('.live-box-content').height())
					$('.live-box-content').css('height', 0);
					$('.live-box').css('margin-top', 225);
				}else if($('.live-box-content').height() == 0){
					// console.log($('.live-box-content').height())
					$('.live-box-content').css('height', 72);
					$('.live-box').css('margin-top', 0);
				}
			});
		});

	</script>
	<!-- <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet"> -->
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
	<style type="text/css">
		@media (max-width: 374px){
			.bg{
				padding: 1px 20px 20px 20px;
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
		input[type=range]::-webkit-slider-thumb {
		  -webkit-appearance: none;
		  height: 36px;
		  width: 36px;
		  border-radius: 50%;
		  cursor: pointer;
		}
		/* All the same stuff for Firefox */
		/*input[type=range]::-moz-range-thumb {
		  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		  border: 1px solid #000000;
		  height: 36px;
		  width: 16px;
		  border-radius: 3px;
		  background: #ffffff;
		  cursor: pointer;
		}
*/
		/* All the same stuff for IE */
		/*input[type=range]::-ms-thumb {
		  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		  border: 1px solid #000000;
		  height: 36px;
		  width: 16px;
		  border-radius: 3px;
		  background: #ffffff;
		  cursor: pointer;
		}*/
		.utilities-tab{
			width: 100%;
		    height: 50%;
		    display: inline-block;
		    z-index: 1041;
		}
		.playCount,.quiz_label{
			float: left;
		    width: 50%;
		    height: 100%;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    color: black;
		}
		.quiz_label{
			font-size: 16px;
			width: 60%;
		    color: black;
		    justify-content: left;
		    padding: 5px 10px 5px 10px;
		}
		#scored{
			float: right;
		    width: 40%;
		}
		.scored,.timeleap_Count{
    		height: 100%;
    		display: flex;
    		justify-content:center;
    		align-items:center;
    		width: 100%;
		}
		.timeleap_Count{
			 width: 50%;
			 display: unset;
			background-color: unset;
		}
		#quizPanel{
			transition: height 1s;
		}
		.next-bg{
			display: none;
		}
		.rw-event{
			color: white;
		    width: 60%;
		    font-size: 10px;
		    text-align: center;
		    background-color: #ff002fa1;
		}
		.in-scored{
			color: white;
		    width: 65%;
		    height: 100%;
		    font-size: 13px;
		    text-align: center;
		    background-color: #ff002fa1;
		   /* margin-top: 90px;*/
		}
		.reward-feed-img{
			color: white;
		    width: 35%;
		    height: 100%;
		    font-size: 10px;
		    text-align: center;
		    background-color: burlywood;
		}
		.playCount-in{
		    width: 80%;
		    font-size: 11px;
		    text-align: left;
		     display: inherit;
		}
		div.cur-bg.zoomIn{
			animation-duration: 0.4s;
		}
		div.in-scored.flipInX{
			animation-duration: 1.5s;
			animation-timing-function: cubic-bezier(0, 0.3, 0.2, 1);
		}
		.display-quiz-name{
			width: 100%;
		    height: 50%;
		    z-index: 1041;
		}
		.sams{
			height: 15%;
		}
	</style>
	<!-- .in-scored = reward label -->
	<div class="sams" id="" style="margin-top: 0px;"> <!-- padding: 0px 20px 0px 20px; -->
		<div id="utilities_tab" class="utilities-tab" style="position: relative;">
			<div id="" class="quiz_label" style="position: relative;">
				<span class="glyphicon glyphicon-play" style="margin-right: 5px;font-size: 10px;"></span>
					<span id="played" style="font-size: 14px;"></span>
				<div class="" id="quiz_label_dis" style="padding-left: 8px;">
					Quiz's name
				</div>
				<!-- <div style="position: absolute;right: 0px;height: 100%;width: 20%;background-color: darkolivegreen;border: 1px solid white;/* top: 40px; */">
					ICON
				</div> -->
			</div>
			<!-- <div style="position: absolute;left: 50%;height: 100%;width: 15%;padding: 2px 0px 2px 0px;">
				<div style="position: relative;left: -50%;border-radius: 50%;border:1px solid white;height: 100%;background-color:cadetblue;">Test</div>
			</div> -->
			<div id="scored" class="scored">
				<div id="covered-rw-feed" class="scored" style="/*display: none;*/">
					<div class="reward-feed-img" id="reward-feed-img">
						<img id="feed-reward-img" src="img/EXP.png" class="animated fadeInDown" style="
    margin-right: 0px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
">
					</div>
					<div class="in-scored animated flipInX" id="in-scored">
						<div>3</div>
						<div>2,500,000</div>
					</div>
				</div>
			</div>
		</div>

		<div class="display-quiz-name" id="disQuizName">
			<div id="playCount" class="playCount">
				<div class="playCount-in animated" id="playCount-in">
					
				</div>
			</div>
			<div id="" class="timeleap_Count">
				<div class="" id="time_remain" style="
				    height: 100%;
				    text-align: right;
				">time</div>
			</div>	
		</div>
	</div>
	<div class="bg cur-bg animated zoomIn" id="quizPanel" style="flex: 0 1 auto;height: 80%;">
		<div id="quizPanel" style="display: table;width: 100%;">
		<!-- <div style="width: 100%;height: 100%;position: absolute;padding-right: 40px;"></div> -->
		<div class="topic" style="display: flex;">
			<p id="topic" style="align-self: center;margin-bottom: 0px;"></p>
		</div>
		<div class="row" style="z-index: 1042;position: relative;">
		<div class="col-md-6 qa" id="img" style="display: none;">
			<center style="height: 0px;overflow: hidden;">
				<img src="img/Playbasis-logo.png" class="quizImg quizImg_temp" id="" style="display:block;">
			</center>
		</div>
		<div class="col-md-6" id="question" style="padding-right: 0px;padding-left: 0px;">
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
</div>
<div class="bg next-bg animated" style="flex: 0 1 auto;">
	
</div>
<style type="text/css">
	.liveFeed{
		    width: 100%;
		    height: 20%;
		    /*position: fixed;
		    bottom: 0px;
		    display: flex;*/
		    justify-content: center;
		    text-align: center;
		    flex: 1 1 auto;
		    min-height: 72px;
	}
	.live-box{
		width: 85%;
	    margin-left: auto;
	    margin-right: auto;
	    /*transition: margin-top 1s;*/
	}
	.live-box-header{
	    background-color: #d0bebe;
	    text-align: left;
	    padding: 5px 20px 1px 20px;
	    border-top-left-radius: 6px;
	    border-top-right-radius: 6px;
	}
	.live-box-content{
		overflow-y: auto;
		overflow-x: hidden;
		max-height: 250px;
		transition: height 1s;
	}
	.activities-user-img{
		width: 15%;
	}
	.activities-info{
		width: 90%;
	}
	.activities-badge{
		width: 20%;
	}
	.feedRow{
		padding: 5px 0px 5px 10px;
		position: relative;
		top: 0px;
		transition: top 1s;
	}
	.tr-feed{
		opacity: 0;
		animation: fadeIn 0.9s 1;
		animation-fill-mode: forwards;
		border-bottom: 1.5px solid white;
	}
	.tr-feed:nth-child(5n+1){
		animation-delay: 0.5s
	}
	.feed-user-name-hilight{
		font-weight: 900;
    	font-size: 12px;
	}
	.feed-user-time-hilight{
		font-weight: bold;
	    color: #8c8888d9;
	    font-size: 8px;
	}
</style>
<div class="liveFeed" id="liveFeed">
	<div class="live-box blink blinkAlert">
		<!-- <div class="live-box-header">
			<h4 style="float: left;" id="click-hide-feed">
				<i class="glyphicon glyphicon-comment"></i>
				<span class="break"></span>
				Live Feed
			</h4>
			<h4 style="float: right;" id="feed-refresh">
				<i class="glyphicon glyphicon-refresh"></i>
			</h4>
			<div style="clear: both;"></div>
		</div> -->
		<div class="live-box-content">
			<table id="feed-content" style="text-align: left;overflow-wrap: break-word;table-layout:fixed;width: 100%;background-color: #ffffff29;">
				
			</table>
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
