<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login.jsp");
			}else{
				translateContent();
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
					$('.live-box-content').css('height', 250);
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
		.utilities-tab{
			width: 100%;
			height: 45px;
			display: inline-block;
			position: fixed;
		    top: 73px;
		    z-index: 1041;
		    padding-right: 40px;
		}
		.playCount,.quiz_label{
			float: left;
		    width: 40%;
    		height: 100%;
    		display: flex;
    		justify-content:center;
    		align-items:center;
    		background-color: #808a69;
    		color: white;
		}
		.quiz_label{
			width: 60%;
		    color: black;
		    justify-content: left;
		    padding: 5px 10px 5px 10px;
		    background-color: unset;
		}
		#scored{
			float: right;
		    width: 60%;
		}
		.scored,.timeleap_Count{
    		height: 100%;
    		display: flex;
    		justify-content:center;
    		align-items:center;
    		padding: 10px;
    		background-color: #89b2dc;
    		    width: 100%;
		}
		.timeleap_Count{
			 width: 40%;
			background-color: unset;
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
		    width: 50%;
		    font-size: 21px;
		    text-align: center;
		    background-color: #ff002fa1;
		   /* margin-top: 90px;*/
		}
		.reward-feed-img{
			color: white;
		    width: 40%;
		    font-size: 10px;
		    text-align: center;
		    /*background-color: #ff002fa1;*/
		}
		.playCount-in{
			color: white;
		    width: 80%;
		    font-size: 21px;
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
			height: 40px;
			position: fixed;
			top: 113px;
			z-index: 1041;
			padding-right: 40px;
		}
	</style>
	<!-- .in-scored = reward label -->
	<div class="" id="" style="margin-top: 0px;padding: 0px 20px 0px 20px;">
		<div id="utilities_tab" class="utilities-tab">
			<div id="playCount" class="playCount">
				<div class="playCount-in animated" id="playCount-in">
					<span class="glyphicon glyphicon-play" style="margin-right: 5px;"></span>5,555
				</div>
			</div>
			<div id="scored" class="scored">
				<div id="covered-rw-feed" class="scored" style="/*display: none;*/">
					<div class="reward-feed-img animated flipInX" id="reward-feed-img">
						reward's img
					</div>
					<div class="in-scored animated flipInX" id="in-scored">
						0
					</div>
				</div>
			</div>
		</div>

		<div class="display-quiz-name" id="disQuizName">
			<div id="" class="quiz_label">
				<div class="" id="quiz_label_dis">
					Quiz's name
				</div>
			</div>
			<div id="" class="timeleap_Count">
				<div class="" id="time_remain">
					time
				</div>
			</div>	
		</div>
	</div>
	<div class="bg cur-bg animated zoomIn" id="quizPanel" style="flex: 0 1 auto;">
		<div class="topic" style="position: fixed;z-index: 1040;display: flex;padding-right: 20px;">
			<p id="topic" style="align-self: center;margin-bottom: 0px;"></p>
		</div>
		<div class="row" style="margin-top: 100px;z-index: 1042;position: relative;">
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
<div class="bg next-bg animated" style="flex: 0 1 auto;">
	
</div>
<style type="text/css">
	.liveFeed{
		    width: 100%;
		    /*height: 125px;
		    position: fixed;
		    bottom: 0px;
		    display: flex;*/
		    justify-content: center;
		    text-align: center;
		    flex: 1 1 auto;
		    min-height: 150px;
		    margin-bottom: 145px;
	}
	.live-box{
		width: 90%;
	    margin-left: auto;
	    margin-right: auto;
	    margin-top: 0px;
	    transition: margin-top 1s;
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
		height: 250px;
		transition: height 1s;
	}
	.activities-user-img{
		width: 20%;
	}
	.activities-info{
		width: 60%;
	}
	.activities-badge{
		width: 20%;
	}
	.feedRow{
		padding: 8px 0px 6px 10px;
	}
	.tr-feed{
		border-bottom: 1.5px solid white;
	}
	.feed-user-name-hilight{
		font-weight: 900;
    	font-size: 15px;
	}
	.feed-user-time-hilight{
		font-weight: bold;
	    color: #8c8888d9;
	    font-size: 11px;
	}
</style>
<div class="liveFeed" id="liveFeed">
	<div class="live-box">
		<div class="live-box-header">
			<h3 style="float: left;" id="click-hide-feed">
				<i class="glyphicon glyphicon-comment"></i>
				<span class="break"></span>
				Live Feed
			</h3>
			<h3 style="float: right;" id="feed-refresh">
				<i class="glyphicon glyphicon-refresh"></i>
			</h3>
			<div style="clear: both;"></div>
		</div>
		<div class="live-box-content">
			<table id="feed-content" style="text-align: left;overflow-wrap: break-word;table-layout:fixed;width: 100%;background-color: #d6d6e091;">
				
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
