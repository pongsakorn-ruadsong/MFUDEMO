var quizId = sessionStorage['qId'];
var player = sessionStorage['player'];
var token = sessionStorage['Token'];
var api_key = sessionStorage['api_key'];
sessionStorage['quizStatus'];
var getQuestUrl = sessionStorage['mainUrl']+"Quiz/"+quizId+"/question?api_key="+api_key+"&player_id="+player; //+'&random=1'
var inputType = '';
var Quiz01 = [];
var Quiz02;
var Gtemp_02;
var quesionId = null;
var topic;
var title;
var option;
var QuestImg;
var questId;
var type;
var select1;
var select2,test, test2, test3;
var answer, answer2,index,total;
var value, a,b,c,d,e;
var aa;
var choices = [];
var placeHolder = [];
var contentSummary=[];
var contentTitle =[];
var unit = [];
var ph = '';
var ttess = [];
var qStatus = [];
var result = [];
var quizStatus = [];
var quizImg = [];
var choicesTitle = [];
var TTarray = [];
var quizType = [];
var feedQueue = [];
sessionStorage['active'] = 'false';
function loadAnimation(a){
	// var img = a.question_image;
	// var text = '<div><img src="'+img+'" style="width:460px;height:460px;"></div>'
	// $('#animation-locate').append(text);
}
function getStatus(callback){
	console.log("Getting quiz status . . .");
		$.ajax({
			type: "GET",
	        url: sessionStorage['mainUrl']+"Quiz/list?player_id="+sessionStorage['player']+"&get_status=true&api_key="+sessionStorage['api_key'],
	        dataType: "json",
		    success: function(data){
		    	Quiz02 = data;
			    jQuery.each(data.response.result, function() {
					quizStatus[this.quiz_id] = this.completed;
					quizImg[this.quiz_id] = this.description_image;
					quizType[this.quiz_id] = this.type;
		        }
		        );
		        for (var i = 0; i < data.response.result.length; i++) {
		        	qStatus.push({'id':data.response.result[i].quiz_id,'isFinnish':data.response.result[i].completed,'Order':data.response.result[i].weight,'Image':data.response.result[i].description_image,'Type':data.response.result[i].type});
		        }
			    sessionStorage.setItem('quizStatus', JSON.stringify(qStatus));
			    callback();
		    },
		    error: function (xhr, textStatus, errorThrown){
	//          window.location.reload(true)
	            console.log(errorThrown);
	            console.log("Failed : getStatus(a) @ quiz.js ");
	        }
		});

	// }
}
function fillColor(a){
	console.log("Enter fillColor");
	for(var i = 0;i<a.length;i++){
		if (a[i].isFinnish) {
			// myLoop();
		}
	}
	// function myLoop () {
	// 	   setTimeout(function () {
	// 	   		console.log("Fill : "+ttess[i].node+" i = "+i)
	// 	      	document.getElementById(ttess[i].node).style.backgroundPosition = "left";
	// 		      	setTimeout(function () {
	// 		   		console.log("Fill : "+ttess[i].bar+" i = "+i)
	// 				document.getElementById(ttess[i].bar).children[0].style.width = "100%";
	// 				i++;
	// 			      if (i < ttess.length) {
	// 			         myLoop();
	// 			      }
	// 			   }, 480)
	// 		   }, 480)
	// 	}

	}
function genReward(a, b, callback){
	console.log(a+' | '+b)
	var data = new Object();
	data.token = sessionStorage['Token'];
	data.action = 'answer';
	data.player_id = sessionStorage['player'];
	data.reward = a;
	data.reward_custom_quantity = b;
	console.log(data)
	$.ajax({
		type: "POST",
		url: sessionStorage['mainUrl']+'Engine/rule',
		content: "application/json; charset=utf-8",
		data: data,
		dataType: "json",
		success: function(d) {
			console.log(d)
			if (d.success) {
				console.log('Get reward Successful')
				getFeed(function(data){
					if (data != undefined || data != null) {
						buildFeed(data);
					}
				});
				callback(d.response.events);
			}else{
				console.log('Get reward Failed')
				callback(d.message);
			}
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : resetQuiz() @ quiz.js");
            }
	});
}
function autoNext(){
 	console.log("Auto Next")
    if (valid()) {
		nextQuestion(function(data){
			console.log(data)
			var full_reward = data.response.result.explanation;
			var rewards = [];
			var reward = [];
			var key = [];
			var val = [];
			console.log(full_reward)
			if (full_reward.indexOf(',') > -1) {
				var k = 0;
				var show_interval;
				rewards = full_reward.split(',');
				for (var i = 0; i < rewards.length; i++) {
					// console.log('GG')
					if (rewards[i].indexOf(':') > -1) {
						reward.push(rewards[i].split(':'));
					}else{
						reward.push(rewards[i]);
					}
				}
				show_interval = setInterval(function(){
					if (k<reward.length) {
						console.log(typeof(reward[k]));
						if (typeof(reward[k]) == 'object') {
							genReward(reward[k][0],reward[k][1], function(data){
								updateRewardFeed(data,function(){
									if ($('#feed-reward-img').hasClass('fadeOutDown')) {
										$('#feed-reward-img').removeClass('fadeOutDown').addClass('fadeInDown')
									}
								});
							});
						}else if (typeof(reward[k]) == 'string') {
							genReward(reward[k], 1, function(data){
								updateRewardFeed(data,function(){
									if ($('#feed-reward-img').hasClass('fadeOutDown')) {
										$('#feed-reward-img').removeClass('fadeOutDown').addClass('fadeInDown')
									}
								});
							});
						}
						k++;
					}else{
						clearInterval(show_interval);
					}
					if ($('#feed-reward-img').hasClass('fadeInDown')) {
						$('#feed-reward-img').removeClass('fadeInDown').addClass('fadeOutDown')
					}
				},2000);
			}else{
				if (full_reward.indexOf(':') > -1) {
					reward = full_reward.split(':');
					genReward(reward[0], reward[1], function(data){
						$('#feed-reward-img').removeClass('fadeInDown').addClass('fadeOutDown')
								updateRewardFeed(data,function(){
									$('#feed-reward-img').removeClass('fadeOutDown').addClass('fadeInDown')
								});
					});
				}else{
					genReward(full_reward, 1, function(data){
						$('#feed-reward-img').removeClass('fadeInDown').addClass('fadeOutDown')
								updateRewardFeed(data,function(){
									$('#feed-reward-img').removeClass('fadeOutDown').addClass('fadeInDown')
								});
					});
				}
			}
			console.log(rewards)
			console.log(reward)
			if ($('#quizPanel').hasClass('zoomIn') || $('#quizPanel').hasClass('fadeInRight')) {
				console.log('Has class zoomIn')
				$('#quizPanel').removeClass('zoomIn').addClass('fadeOutLeft');
			}
			if (quizType[sessionStorage['qId']] == 'quiz'){
				if ($('#in-scored').hasClass('flipInX')) {
					console.log('Has class flipInX')
					$('#in-scored').removeClass('flipInX').addClass('flipOutX');
				}
			}
			clearInterval(timeOut);
			unit = [];
			topic = '';
			title = '';
			choices = [];
			ph = '';
			if ($('.btn-choices').hasClass('last')) {
				$('.btn-choices').removeClass('last');
			}
			$("#quizPanel").css('height', '55%');
			$('#spece-for-S').css('display','none');
			$('.inputTXT_TXT').remove();
			$('div#choice > div.btn-group-vertical').remove();
			$('div#btn_NR > button').remove();
			getQuestion(data, function(){
				console.log('Successful')
			});
		});
    }
}
function updateRewardFeed(data, callback){
	console.log(data)
	console.log(data[0].reward_type)
	for (var i = 0; i < data.length; i++) {
		if(data[i].event_type != 'REWARD_RECEIVED'){
			continue;
		}
		else{

			if (data[i].reward_type == 'badge') {
				$('#feed-reward-img').attr('src',data[i].reward_data.image)
			}
			else if (data[i].reward_type == 'point') {
				$('#feed-reward-img').attr('src','img/coin_22.png')
			}
			else if (data[i].reward_type == 'exp') {
				$('#feed-reward-img').attr('src','img/EXP.png')
			}
			// else if (data[i].reward_type == 'goods') {
			// 	$('#feed-reward-img').attr('src',data[i].reward_data.image)
			// }
			else{
				$('#feed-reward-img').attr('src','')
			}
		}
	}
	callback();
}
function getTopic(a){
	var content = JSON.parse(sessionStorage["contentData"]);
	var n = content.response.result.length;
	var qname = a.response.result.question;
	var _qname = a.response.result;
	var nn = a.response.result.options.length;
//	var isTextOp = a.response.result
	console.log("Question: "+qname+" | Content: "+n+" | Type: "+type+" | Language: "+sessionStorage['lang']);

    topic = contentSummary[qname];
	title = contentTitle[qname];

	// console.log('Enter if');
	// console.log(type+" == \'SQ\' ?");
	if (type == 'SQ' || type == 'YN' || type == 'SQ_S' || type == 'SQ_S_MULTI' || type == 'MULTI' || type == 'MULTI_S') {
		console.log('Enter if2');
		for(var k=0;k<nn;k++){
			console.log('Enter asdasdasd');
			if (contentSummary[_qname.options[k].description] == undefined) {
				continue;
			}
			// console.log(_qname.options[k].description+'_PH');
			placeHolder.push(contentSummary[_qname.options[k].description+'_PH'])
			choices.push(contentSummary[_qname.options[k].description]);
			choicesTitle.push(contentTitle[_qname.options[k].description]);
			console.log(choices);
			// console.log(placeHolder);
		}

	}else if (type == 'TXT') {
		console.log("TXT");
		if (qname+"_PH" in contentTitle){
			ph = contentTitle[qname+"_PH"];
		}


	}
	else if (type == 'SLI' || type == 'SLI_S') {
		for(var k=0;k<nn;k++){
			console.log('Enter zzzzzzzzzz '+k);
			console.log(contentSummary[_qname.options[k].description]);
			console.log(_qname.options[k].description);
			if (contentSummary[_qname.options[k].description] == undefined) {
				continue;
			}
			console.log('Enter pushhhhh');
			unit.push(contentSummary[_qname.options[k].description]);
			console.log(unit);
			sessionStorage['unit'] = unit;
		}
	}
}
function getPlayCount(){
	console.log('Enter play count');
	$.ajax({
		type: "GET",
        url: sessionStorage['mainUrl']+'/Quiz/'+sessionStorage['qId']+'/completed?api_key='+sessionStorage['api_key'],
        dataType: "json",
	    success: function(data){
	    	console.log(data);
	    	var played = data.response.result
	    	$('#played').text(nFormatter(played,1));
	    },
	    error: function (xhr, textStatus, errorThrown){
         window.location.reload(true)
            console.log(errorThrown);
            console.log("Failed : getQuestion() @ quiz.js");
        }
	});
}
function buildUNIQuiz(data, callback){
	var text = '';
	if (type == 'IMG_RANK') {
		for (var i = 0; i < data.response.result.options.length; i++) {
			// Things[i]
		}
	}
}
function getQuestion(result, callback){
	$('#quiz_label_dis').text(sessionStorage['qName'])
	$.ajax({
		type: "GET",
        url: getQuestUrl,
        dataType: "json",
	    success: function(data){
	    Quiz01 = data;
	    if (Quiz01.response == null || Quiz01.response.result == null) {
	    	sessionStorage.removeItem("save_result");
	    	swal({
			  title: "Oops!",
			  text: "You has finnished all question. Do you need to reset it?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonClass: "btn-primary",
			  confirmButtonText: "Yes, reset!",
			  cancelButtonText: "No, go back!",
			  closeOnConfirm: false,
			  closeOnCancel: false
			},
			function(isConfirm) {
			  if (isConfirm) {
			    swal("Reseted!", "The quiz has been reseted", "success");
			    setTimeout(function(){
					resetQuiz();
					location.reload();
			    },800);
			  }
			  else {
			    swal("Going back!", "We're bringing you to home page!", "success");
			    setTimeout(function(){
			    	window.location.replace("index.jsp");
			    },800);
			  }
			});
	    }else{
	    var time_limit = Quiz01.response.result.timelimit;
	    console.log('Time limited: '+time_limit.length)
	    if (time_limit.length == 0) {
	    	$('#time_remain').text('Unlimited time');
	    }else{
	    	$('#time_remain').text(time_limit);
	    }
	    sessionStorage.setItem("cur_Quest", JSON.stringify(Quiz01));
	    var cur_Quest = sessionStorage.getItem("cur_Quest");
	    type = Quiz01.response.result.question_type;
	    sessionStorage['type'] = type;
	    console.log(data);
	    test = JSON.parse(cur_Quest);
			getTopic(data);
				getStatus(function(){
					var c = sessionStorage['qCode']
					if (c.indexOf('UNIQ') > -1) {
						buildUNIQuiz(result, function(){
							callback();
							if ($('#quizPanel').hasClass('fadeOutLeft')) {
								console.log('Has class fadeOutLeft')
								$('#quizPanel').removeClass('fadeOutLeft').addClass('fadeInRight');
							}
								$('#myModal').modal('hide');
						});
					}else{
						buildQuiz(result, function() {
							callback();
							if ($('#quizPanel').hasClass('fadeOutLeft')) {
								console.log('Has class fadeOutLeft')
								$('#quizPanel').removeClass('fadeOutLeft').addClass('fadeInRight');
							}
								$('#myModal').modal('hide');
						});
					}
				});
		    }
		    // $('div#choice > div.btn-group-vertical').remove();
		},
	    error: function (xhr, textStatus, errorThrown){
         window.location.reload(true)
            console.log(errorThrown);
            console.log("Failed : getQuestion() @ quiz.js");
        }
	});
}
function getFeed(callback){
	$.ajax({
		type: "GET",
		url: sessionStorage['mainUrl']+'Service/recentActivities?offset=0&limit=2&mode=all&event_type=redeem%2Clevel%2Creward&api_key=141073538',
		content: "application/json; charset=utf-8",
		dataType: "json",
		success: function(d) {
			// console.log(d)
			if (d.success) {
				console.log('Get feed Successful')
				callback(d.response.activities);
			}else{
				console.log('Get feed Failed')
				callback();
			}
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : resetQuiz() @ quiz.js");
            }
	});
}
var TempFeed = [];
// function getTime(JSONtime){
// 	var ISOTime = new Date(JSONtime);
// 	var dd = ISOTime.getDate();
// 	var mm = ISOTime.getMonth()+1; //January is 0!
// 	var yyyy = ISOTime.getFullYear();
// 	var hh = ISOTime.getHours();
// 	var min = ISOTime.getMinutes();
// 	var sec = ISOTime.getSeconds();
// 	// if(dd<10){
// 	//     dd='0'+dd;
// 	// } 
// 	// if(mm<10){
// 	//     mm='0'+mm;
// 	// } 
// 	console.log(dd+' | '+mm+' | '+yyyy+' | '+hh+' | '+min+' | '+sec)
// 		getTimePass(dd, mm, yyyy, hh, min, sec, function(){

// 		});
// 	}
function get_time_diff( datetime )
{
    var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";

    var datetime = new Date( datetime ).getTime();
    var now = new Date().getTime();

    if( isNaN(datetime) )
    {
        return "";
    }
    // console.log( datetime + " " + now);
    if (datetime < now) {
        var milisec_diff = now - datetime;
    }else{
        var milisec_diff = datetime - now;
    }
	// console.log( milisec_diff);
    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
    var msec = milisec_diff;
	var hh = Math.floor(msec / 1000 / 60 / 60);
	msec -= hh * 1000 * 60 * 60;
	var mm = Math.floor(msec / 1000 / 60);
	msec -= mm * 1000 * 60;
	var ss = Math.floor(msec / 1000);
	msec -= ss * 1000;
    var date_diff = new Date( milisec_diff );
    // alert(hh + ":" + mm + ":" + ss);
    // console.log(days+" days "+date_diff.getHours()+" Hours "+ date_diff.getMinutes()+" Minute "+date_diff.getSeconds()+" Second")
    if (days >= 1) {
    	if (days == 1) {
    		return days + " day ago"
    	}else{
    		return days + " days ago"
    	}
    }
    else if (days < 1 && hh >= 1) {
    	if (date_diff.getHours() == 1) {
    		return "about "+ hh + " hour ago"
    	}else{
    		return "about "+ hh + " hours ago"
    	}
    }
    else if (days < 1 && hh < 1 && mm >= 1) {
    	if (date_diff.getMinutes() == 1) {
    		return "about "+ mm + " minute ago"
    	}else{
    		return "about "+ mm + " minutes ago"
    	}
    }else{
    	if (ss < 1) {
			return "less than a second";
    	}
    	else if (ss == 1) {
    		return " about " + ss + " second ago";
    	}else{
    		return " about " + ss + " seconds ago";
    	}
	}
}
function buildFeed(data){
    var text = '';
	TempFeed = data;
    console.log(data)
    $('table#feed-content > tr').remove();
    for (var i = 0; i < data.length; i++) {
    	var img = '';
    	var item_img = '';
    	var items = '';
    	var message = '';
    	var img_for_check = /[^/]*$/.exec(data[i].player.image)[0];
		// console.log(img_for_check)
		if (img_for_check == 'default_profile.jpg') {
			img = 'img/default_user.png'
		}
    	var time = get_time_diff(data[i].date_added);
    	// console.log(time)
    	if (data[i].event_type == 'REWARD') {
	    	if (data[i].reward_name == "badge") {
	    		item_img = data[i].badge.image;
	    		items = '<img style="width: 23px;height: 23px;" src="'+item_img+'">';
	    	}
	    	else if(data[i].reward_name == "point"){
	    		item_img = 'img/coin_22.png';
	    		items = '<img style="width: 23px;height: 23px;" src="'+item_img+'">';
	    	}
	    	else if(data[i].reward_name == "exp"){
	    		item_img = 'img/EXP.png';
	    		items = '<img style="width: 23px;height: 23px;" src="'+item_img+'">';
	    	}
	    	else if (data[i].reward_name == "Dollar(USD)") {
	    		item_img = 'img/EXP.png';
	    		items = '<p style="font-size: 20px;margin-bottom: 0px;text-align: center; margin-right: 20px;">&#x0024</p>';
	    	}
	    	else if (data[i].reward_name == "Baht(THB)") {
	    		item_img = '<p style="font-size: 20px;margin-bottom: 0px;text-align: center; margin-right: 20px;">&#x0E3F</p>';
	    	}
	    	message = data[i].message;
    	}
    	else if(data[i].event_type == 'REDEEM'){
    		message = 'got a coupon!!!'
    	}
    	text +='<tr class="tr-feed"><td class="feedRow activities-user-img"><img src="'+img+'"></td>'+
    	'<td class="feedRow activities-info">'+
    		'<table>'+
	    	'<tr style="font-size: 10px;"><span class="feed-user-name-hilight">'+data[i].player.first_name+'</span> '+message+'</tr>'+
	    	'<tr>'+
	    		// '<td><span class="feed-user-time-hilight">'+time+'</span></td>'+
	    	'</tr>'+
	    	'</table>'+
	    '</td>'+
	    '<td class="feedRow activities-badge">'+items+'</td>'+
	    '</tr>'
    }
    $('#feed-content').append(text);
    $(".tr-feed").each(function(i) {
    	$(".tr-feed").delay(100* i ).fadeIn(500);
	});
    // $('#feed-content').addClass('animated fadeInUp');
    // $('#feed-content').addClass('animated fadeOutUp');
}
var quiz_type = '';
function getQuizType(){
	var rawData = JSON.parse(sessionStorage['quizStatus']);
	for (var i = 0; i < rawData.length; i++) {
		if (rawData[i] == sessionStorage['qId']) {
			quiz_type = rawData
		}
	}
}
function buildQuiz(result, callback){
		// var rawData = JSON.parse(sessionStorage['quizStatus']);
		// console.log(rawData);
		var text = '';
		var image = '<center>';
		var btn_text = '';
	    var option = Quiz01.response.result.options;
	    var QuestImg = Quiz01.response.result.question_image;
	    questId = Quiz01.response.result.question_id;
	    var rMin = Quiz01.response.result.options[0].range_min;
	    var rMax = Quiz01.response.result.options[0].range_max;
	    var interval = Quiz01.response.result.options[0].range_interval;
	     index = Quiz01.response.result.index;
	     total = Quiz01.response.result.total;
	    chkIndex();
	    console.log(result)
	    console.log(quizType[sessionStorage['qId']])
	    var cur_score = '';
	    if (quizType[sessionStorage['qId']] == 'poll') {
	    	// $('#in-scored').html('&#x0E3F;');
	    }else if (quizType[sessionStorage['qId']] == 'quiz'){
		    if (result != undefined) {
		    	$('#in-scored').css('display','block');
		    	var ans_result = result.response.result.explanation;
		    	var get_score = result.response.result.grade.score;
		    	var max_this_score = result.response.result.grade.score;
		    	cur_score = result.response.result.grade.total_score;
		    	var max_score = result.response.result.grade.total_max_score;
		    	console.log("")
		    	console.log("Your answer is : "+result.response.result.explanation)
		    	console.log("Get :"+get_score+" score of "+max_this_score)
		    	console.log("Total score: "+cur_score+" score of "+max_score)
		    	console.log("")
		    }
		    else if(sessionStorage['save_result'] != undefined){
		    	var a = JSON.parse(sessionStorage['save_result']);
		    	cur_score = a.total_score;
		    }
		    else{
		    	cur_score = 0;
		    }

			setTimeout(function(){
				// $('#in-scored').text(cur_score);
				if ($('#in-scored').hasClass('flipOutX')) {
						console.log('Has class flipOutX')
						$('#in-scored').removeClass('flipOutX').addClass('flipInX');
					}
				},500);
	    }
	    a = parseInt(rMin);
	    b = parseInt(rMax);
	    c = parseInt(interval);
	    // console.log(rMax+" "+b)
	    // for (var i = 0; i < rawData.length; i++) {
	    // 	if (rawData[i].id == sessionStorage["qId"]) {
	    // 		QuestImg = rawData[i].Image;
	    // 	}
	    // }
	    for (var i = 0; i < option.length; i++) {
	    	var op_img = option[i].option_image;
	    	var img_for_check = /[^/]*$/.exec(op_img)[0];
	    	console.log(img_for_check)
	    	if (img_for_check == 'no_image.jpg') {
	    		
	    	}
		    image += '<img src="'+op_img+'" class="quizImg" id="img_'+option[i].option_id+'" style="display:none;">'
		}
	    	// document.getElementById("quizImg").style.backgroundImage = 'url('+QuestImg+')';
	    	// topic += type;
	    	$('#topic').text(topic);
	    	$('.topic').prepend('<span class="glyphicon glyphicon-ok" style="font-size:10px;margin-top:3px;margin-right:10px;"></span>');
	    	btn_text += '<button class="btn btn-warning pause-btn" id="stopCount" type="button"  style="float:left;width:40%;display:none;" onclick="myStopFunction()">Pause</button>'+
	    			'<button class="btn btn-danger" id="resetQuiz" type="button"  style="float:left;width:40%;display:none;">'+contentSummary['BTN_RESET']+
	    			'</button>'+
					'<button class="btn normal-form-next" id="nextBtn" style="float:right;width:40%;display:none;border: 1px solid rgb(221, 221, 221);color:white;padding-top: 8px;"  type="button"><span id="timer">Ready!</span>'+
					'</button>'+
					'<div style="clear: both;"></div>'
					$('#btn_NR').append(btn_text);


			// SQ

	    	if (type == 'SQ') {
	    		console.log('Type = SQ')
	    		document.getElementById("4Play").style.display = "none";
	    		document.getElementById("realDeal").style.display = "none";
	    		text += '<div class="btn-group-vertical" style="width:100%;">'
	    		// $("#nextBtn").prop('disabled', true);
	    		var LR = 'left';
	    		// if ((i+1)%2 != 0) {
	    			// LR = 'right';
	    		// }
		    	for (var i=0;i<option.length;i++) {
		    		text += '<label class="btn btn-choices" style="font-size: 0px;border: 1px solid #ddd;border-radius: 30px;text-align:left;">'+
		    			'<label class="btn choice-overlay " style="position: absolute;height: 100%;top: 0px;left: 0px;border-radius: 30px;text-align:left;background-color: #dcd1d100;display: none;"></label>'+
			          '<input class="inputTXT_SQ " name="'+topic+'" typeZ="SQ"  valueZ="'+choices[i]+'" value="'+option[i].option_id+'" type="radio" style="visibility:hidden;"><span id="'+choices[i]+'">'+choices[i]+'</span>'+
			          
			        '</label>'
			        // if ((i+1)%2==0) {
			        // 	text += '</div></div><div class="row"><div class="btn-group btn-group-vertical" data-toggle="buttons" style="width:100%;">'
			        // }
		    		console.log(choices[i]);
		    	}
		    	text += '</div>';
	    	}

	    	// MULIPLE 

	    	else if(type == 'MULTI'){
	    		document.getElementById("4Play").style.display = "none";
	    		document.getElementById("realDeal").style.display = "none";
	    		text += '<div class="btn-group-vertical" style="width:100%;">'
	    		// $("#nextBtn").prop('disabled', true);
	    		for (var i=0;i<option.length;i++) {
		    		if (option[i].is_text_option) {
		    			select1 = option[i].option_id;
		    			continue;
	    			}
	    			text += '<label class="btn btn-choices" style="font-size: 0px;border: 1px solid #ddd;border-radius: 30px;text-align:left;overflow: auto;">'+
			          '<input class="inputTXT_MULTI Input_checkbook" name="'+topic+'" typeZ="MULTI"  valueZ="'+choices[i]+'" id="'+option[i].option_id+'" value="'+option[i].option_id+'" type="checkbox" style="visibility:hidden;"><span id="'+choices[i]+'">'+choices[i]+'</span>'+
			        '</label>'
		    		console.log(choices[i]);
		    	}
		    	text += '';
	    	}

	    	else if(type == 'MULTI_S'){
	    		document.getElementById("slider-panel_S").style.display = "none";
	    		document.getElementById("4Play").style.display = "block";
	    		document.getElementById("realDeal").style.display = "none";
	    		$('#nextBtn').css('display','block')
	    		$('#nextBtn').text('Next')
	    		$('#nextBtn').removeClass('normal-form-next').addClass('btn-primary')
	    		$('#resetQuiz').css('display','block')
	    		text += '<div class="btn-group-vertical" style="width:100%;">'
	    		// $("#nextBtn").prop('disabled', true);
	    		for (var i=0;i<option.length;i++) {
		    		if (option[i].is_text_option) {
		    			select1 = option[i].option_id;
		    			continue;
	    			}
	    			text += '<div style="width:100%;margin: 0px 0px 0px 8px;display: flex;"><span class="glyphicon glyphicon-plus" style="float: left;margin-right: 10px;margin-left: 10px;font-size: 13px;margin-top: 7px;"></span>'+
	    			'<label class="btn btn-choices" style="font-size: 0px;width: 70%;border: 1px solid #ddd;border-radius: 30px;text-align:left;overflow: auto;padding-right: 15px;">'+
			          		'<input class="inputTXT Input_checkbook" name="'+topic+'" typeZ="MULTI_S"  valueZ="'+choices[i]+'" id="'+option[i].option_id+'" value="'+option[i].option_id+'" type="checkbox" style="visibility:hidden;">'+
			          			'<span id="'+choices[i]+'">'+choices[i]+'</span>'+
			          
			        '</label></div>'
		    		console.log(choices[i]);
		    	}
		    	text += '';
	    	}

	    	else if (type == 'SQ_S') {
	    		document.getElementById("4Play").style.display = "none";
	    		document.getElementById("realDeal").style.display = "none";
	    		text += '<div class="btn-group-vertical" style="width:100%;">'
	    		// $("#nextBtn").prop('disabled', true);
		    	for (var i=0;i<option.length;i++) {
		    		if (option[i].is_text_option) {
		    			text+= '<input type="text" class="form-control inputTXT_S" id="other_input" idZ="'+option[i].option_id+'" style="display:none;width: 100%;font-size: 16px;margin-left:50px;">'
		    			continue;
	    			}
		    		text += '<label class="btn btn-choices" style="font-size: 0px;border: 1px solid #ddd;border-radius: 30px;text-align:left;">'+
		    		'<label class="btn choice-overlay" style="position: absolute;height: 100%;top: 0px;left: 0px;border-radius: 30px;text-align:left;background-color: #dcd1d100;display: none;"></label>'+
			          '<input class="inputTXT_SQ_S" name="'+topic+'" typeZ="SQ_S"  valueZ="'+choices[i]+'" value="'+option[i].option_id+'" type="radio" style="visibility:hidden;"><span id="'+choices[i]+'">'+choices[i]+'</span>'+
			        '</label>'

		    		console.log(choices[i]);
		    	}
		    	text += '</div>';
	    	}
	    	else if (type == 'SQ_S_MULTI') {
	    		document.getElementById("4Play").style.display = "none";
	    		document.getElementById("realDeal").style.display = "none";
	    		text += '<div class="btn-group-vertical" style="width:100%;">'
	    		// $("#nextBtn").prop('disabled', true);
		    	for (var i=0;i<option.length;i++) {
		    		if (option[i].is_text_option) {
		    			select1 = option[i].option_id;
		    			continue;
	    			}
		    		text += '<label class="btn btn-choices" style="font-size: 0px;border: 1px solid #ddd;border-radius: 30px;text-align:left;">'+
		    		'<label class="btn choice-overlay" style="position: absolute;height: 100%;top: 0px;left: 0px;border-radius: 30px;text-align:left;background-color: #dcd1d100;display: none;"></label>'+
			          '<input class="inputTXT_SQ_S_MULTI" name="'+topic+'" typeZ="SQ_S_MULTI" valueZ="'+choicesTitle[i]+'" value="'+option[i].option_id+'" style="visibility:hidden;" type="radio"><span id="'+choices[i]+'">'+choices[i]+'</span>'+
			        '</label>'+
			        '<div class="inputSQ_S_MULTI" idZ="'+option[i].option_id+'" style="display:none;"><span class="glyphicon glyphicon-plus" style="float: left;margin-right: 10px;margin-left: 10px;font-size: 13px;margin-top: 7px;"></span><input type="text" class="form-control inputTXT_S" idX="'+option[i].option_id+'" style="border: 1px solid #ddd;border-radius: 30px;text-align:center;width: 80%;font-size: 16px;margin-bottom: 5px;" placeholder="'+placeHolder[i]+'"></div>'
		    		console.log(choices[i]);
		    	}
		    	text += '</div>';
	    	}
	    	//else if(type == 'YN'){
	    	//	document.getElementById("4Play").style.display = "none";
	    	//	text += '<div class="btn-group btn-group-vertical" data-toggle="buttons">'
	    	//	for (var i=0;i<option.length;i++) {
	    	//		text += '<label class="btn">'+
			 //         '<input class="inputTXT" name="'+topic+'" typeZ="SQ" valueZ="'+choices[i]+'" value="'+option[i].option_id+'" type="radio"><i class="fa fa-circle-o fa-2x"></i><i class="fa fa-dot-circle-o fa-2x"></i><span id="'+choices[i]+'">'+choices[i]+'</span>'+
			 //       '</label>'
	    	//		}
	    	//		text += '</div>';
	    	//}
	    	else if(type == 'RANGE'){
	    		$('#slider-range').slider({
				    range: true,
				    min: a,
				    max: b,
				    step: c,
				    values: [percentage(b,20), percentage(b,80)]
				  });
	    		$('#minsli').text(a.toLocaleString());
	    		$('#maxsli').text(b.toLocaleString());
	    		$("#range-panel").addClass("inputTXT");
	    		document.getElementById("range-panel").style.display = "block";
	    		document.getElementById("4Play").style.display = "none";
	    		document.getElementById("realDeal").style.display = "block";
	    	}
	    	else if(type == 'RANGE_S'){
	    		$('#slider-range').slider({
				    range: true,
				    min: a,
				    max: b,
				    step: c,
				    values: [percentage(b,20), percentage(b,80)]
				  });
	    		$('#minsli').text(a.toLocaleString());
	    		$('#maxsli').text(b.toLocaleString());
	    		$("#range-panel").addClass("inputTXT");
	    		document.getElementById("range-panel").style.display = "block";
	    		document.getElementById("4Play").style.display = "block";

	    	}
	    	else if(type == 'TXT'){
	    		text+='<textarea class="form-control inputTXT_TXT" rows="4" placeholder="'+ph+'" typeZ="TXT"></textarea>'
	    		select1 = Quiz01.response.result.options[0].option_id;

	    	}
	    	else if(type == 'SLI'){
	    		// $("#quizPanel").css('height', '60%');
	    		console.log("Enter SLI")
	    		console.log(a+' '+b+' '+c+' ')
	    		$('#nextBtn').css('display','block')
	    		$('#nextBtn').text('Next')
	    		$('#nextBtn').removeClass('normal-form-next').addClass('btn-primary')
	    		$('#resetQuiz').css('display','block')
	    		$("#slider-panel").addClass("inputTXT");
	    		document.getElementById("slider-panel").style.display = "block";
	    		document.getElementById("realDeal").style.display = "block";
	    		document.getElementById("slider-bar").setAttribute("value", (b/2));
	    		document.getElementById("slider-bar").setAttribute("min", a);
	    		document.getElementById("slider-bar").setAttribute("max", b);
	    		document.getElementById("slider-bar").setAttribute("step", c);
	    		$('#disValueSli').html((b/2).toLocaleString()+" "+unit);
	    		$('#hidSLIval').val(b/2);
	    		$('#minslider').html(nFormatter(a, 1));
	    		$('#maxslider').html(nFormatter(b, 1));
	    		// select1 = Quiz01.response.result.options[0].option_id;
	    	}
	    	else if(type == 'SLI_S'){
	    		// $("#quizPanel").css('height', '60%');
	    		document.getElementById("realDeal").style.display = "none";
	    		console.log(a+' '+b+' '+c+' ')
	    		$('#nextBtn').css('display','block')
	    		$('#nextBtn').text('Next')
	    		$('#nextBtn').removeClass('normal-form-next').addClass('btn-primary')
	    		$('#resetQuiz').css('display','block')
	    		$("#slider-panel_S").addClass("inputTXT");
	    		document.getElementById("slider-panel_S").style.display = "block";
	    		document.getElementById("4Play").style.display = "block";
	    		document.getElementById("slider-bar_S").setAttribute("value", (b/2));
	    		document.getElementById("slider-bar_S").setAttribute("min", a);
	    		document.getElementById("slider-bar_S").setAttribute("max", b);
	    		document.getElementById("slider-bar_S").setAttribute("step", c);
	    		$('#disValueSli_S').html((b/2).toLocaleString()+" "+unit);
	    		$('#hidSLIval_S').val(b/2);
	    		$('#minslider_S').html(nFormatter(a, 1));
	    		$('#maxslider_S').html(nFormatter(b, 1));
	    		// select1 = Quiz01.response.result.options[2].option_id;
	    	}
	    	if (type == 'MULTI_S') {
	    		$('#spece-for-S').append(text);
	    	}else{
	    		$('#choice').append(text);
	    	}
	    	image += '</center>';
	    	$('#img').append(image);
	    	$('#stopCount').click(function(){
	    		sessionStorage['pause_num'] = $('#timer').text();
	    		$("#nextBtn").prop('disabled', false);
	    		$('.choice-overlay').css('display','none');
	    		$('.btn-choices').addClass('last');
	    	 	if (!$(this).hasClass('animated')) {
	    	 		$(this).addClass("animated");
	    	 	}
	    	 	if ($(this).hasClass('zoomIn')) {
	    	 		$(this).removeClass('zoomIn').addClass("zoomOut");
	    	 		$('#resetQuiz').removeClass('zoomOut').addClass("zoomIn");
	    	 		$(this).css('display','none')
	    	 		$('#resetQuiz').css('display','block')
	    	 	}
	    	 	else if ($(this).hasClass('zoomOut')){
	    	 		$(this).removeClass('zoomOut').addClass("zoomIn");
	    	 		$('#resetQuiz').removeClass('zoomIn').addClass("zoomOut");
	    	 		$(this).css('display','block')
	    	 		$('#resetQuiz').css('display','none')
	    	 	}else{
	    	 		$('#stopCount').removeClass("bounceInLeft").addClass("zoomOut");
	    	 		$('#stopCount').css("display","none");
	    	 	}
	    		$('#resetQuiz').css("display","block");
	    	 	$('#resetQuiz').addClass("animated zoomIn");
	    	 	$('#timer').text("");
			    $('#timer').addClass("glyphicon glyphicon-play");
	    	 	$('#nextBtn').addClass("stop");
	    	});
	    	$('#nextBtn').click(function() {
		    	console.log("ENTER")
		    	if (type == 'SLI' || type == 'SLI_S' || type == 'MULTI_S' || type == 'MULTI') {
		    		autoNext();
		    	}else{
		    	var remain = parseInt(sessionStorage['pause_num']);
		    	if ($(this).hasClass('countDown-btn')) {
		    		console.log("Has class countDown-btn")
		    		if ($(this).hasClass('stop')) {
		    			console.log("Has class stop")
		    			// $('#resetQuiz').css("display","none");
	    	 		// 	$('#resetQuiz').removeClass("zoomIn").addClass("zoomOut");
	    	 		// 	$('#stopCount').css("display","block");
	    	 		// 	$('#stopCount').removeClass("zoomOut").addClass("zoomIn");
		    			// $('#timer').removeClass("glyphicon glyphicon-play");
		    			// $('#nextBtn').removeClass("stop");
		    			autoNext();
			    		// $('#timer').text(sessionStorage['pause_num']);
			    		
		    		}
		    		else{
		    			autoNext();
		    		}
		    	}
		    }
			    // $(this).removeClass("glyphicon glyphicon-play");
			    // $('#timer').text(sessionStorage['pause_num']);
			  }
			);
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
	    	 $('.Input_checkbook').click(function(){
	    	 	var Idd = $(this).val();
	    	 	TTarray = new Array();
		    	 console.log($(this).val())
		    	 $("input:checkbox[name='"+topic+"']:checked").each(function(){
		    		 TTarray.push($(this).val());
		    	 });
		    	 if ($('#'+Idd).parent().hasClass('highligt-choice')) {
		    	 	console.log("Remove")
		    	 	$('#'+Idd).parent().removeClass('highligt-choice');
		    	 }else{
		    	 	console.log("Add")
		    	 	$('#'+Idd).parent().addClass('highligt-choice');
		    	 }
		    	 if(TTarray.length == 0){
					// $("#nextBtn").prop('disabled', true);
				} else {
					$("#nextBtn").prop('disabled', false);
				}
	    	  });
	    	 $('.btn-choices').click(function(){
	    	 	console.log("ADADAD")
	   //  	 	if ($('.live-box-content').height() > 50) {
				// 	// console.log($('.live-box-content').height())
				// 	$('.live-box-content').css('height', 0);
				// 	$('.live-box').css('margin-top', 225);
				// }
				$("#quizPanel").css('height', '60%');
				$("#nextBtn").prop('disabled', true);
	    	 	$('.choice-overlay').css('display','block');
	    	 	// $('.choice-overlay').addClass('animated fadeInDown');
	    	 });
	    	 $('.inputTXT_SQ').click(function(){
	    	 	showButtons()
	    	 	$("#nextBtn").prop('disabled', true);
	    	 	var remain = parseInt(sessionStorage['pause_num']);
	    	 	$('.btn-choices').css("background-color","white")
	    	 	$('.btn-choices').css("color","black")
	    	 	$(this).parent().css("background-color","mediumslateblue");
	    	 	$(this).parent().css("color","white");
	    	 	if ($('.btn-choices').hasClass('last')) {
	    	 		console.log("Has class LAST asdasdasdasdasdasdasdasdasdasdwqdqwdqwwqeqwdqwdqwdqwdqdsadawdawdqwdq")
	    	 		$('#stopCount').css("display","none");
	    	 		$('#resetQuiz').css("display","block");
	    			$('#timer').removeClass("glyphicon glyphicon-play");
	    			$('#nextBtn').removeClass("stop");
		    		$('#timer').text(sessionStorage['pause_num']);
		    		timerasdsd(0);
	    	 	}else{
	    	 		console.log("No have class last")
	    	 		setTimeout(function(){
						timerasdsd(3);
						$('#nextBtn').addClass("countDown-btn");
					},600);
	    	 	}
	    	 });
	    	 $('.inputTXT_SQ_S').click(function(){
	    	 	showButtons()
	    	 	$("#nextBtn").prop('disabled', true);
	    	 	var remain = parseInt(sessionStorage['pause_num']);
	    	 	$('.btn-choices').css("background-color","white")
	    	 	$('.btn-choices').css("color","black")
	    	 	$(this).parent().css("background-color","mediumslateblue");
	    	 	$(this).parent().css("color","white");
	    	 	if ($('.btn-choices').hasClass('last')) {
	    	 		console.log("Has class LAST")
	    	 		$('#stopCount').css("display","none");
	    	 		$('#resetQuiz').css("display","block");
	    			$('#timer').removeClass("glyphicon glyphicon-play");
	    			$('#nextBtn').removeClass("stop");
		    		$('#timer').text(sessionStorage['pause_num']);
		    		timerasdsd(0);
	    	 	}else{
	    	 		console.log("No have class last")
	    	 		setTimeout(function(){
						timerasdsd(3);
						$('#nextBtn').addClass("countDown-btn");
					},600);
	    	 	}
	    	 });
	    	 $('.inputTXT_SQ_S_MULTI').click(function(){
	    	 	showButtons()
	    	 	$("#nextBtn").prop('disabled', true);
	    	 	var remain = parseInt(sessionStorage['pause_num']);
	    	 	$('.btn-choices').css("background-color","white")
	    	 	$('.btn-choices').css("color","black")
	    	 	$(this).parent().css("background-color","mediumslateblue");
	    	 	$(this).parent().css("color","white");
	    	 	if ($('.btn-choices').hasClass('last')) {
	    	 		console.log("Has class LAST")
	    	 		$('#stopCount').css("display","none");
	    	 		$('#resetQuiz').css("display","block");
	    			$('#timer').removeClass("glyphicon glyphicon-play");
	    			$('#nextBtn').removeClass("stop");
		    		$('#timer').text(sessionStorage['pause_num']);
		    		timerasdsd(0);
	    	 	}else{
	    	 		console.log("No have class last")
	    	 		setTimeout(function(){
						timerasdsd(6);
						$('#nextBtn').addClass("countDown-btn");
					},600);
	    	 	}
	    	 });
	    	 $('.inputTXT_MULTI').click(function(){
	    	 	showButtons()
	    	 	$("#nextBtn").prop('disabled', true);
	    	 	$('#stopCount').css('display','none')
	    	 	$('#nextBtn').css('display','block')
	    		$('#nextBtn').text('Next')
	    		$('#nextBtn').removeClass('normal-form-next').addClass('btn-primary')
	    		$('#resetQuiz').addClass('animated bounceInLeft')
	    		$('#resetQuiz').css('display','block')
		   //  	 setTimeout(function(){
					// 	timerasdsd(3);
					// 	$('#nextBtn').addClass("countDown-btn");
					// },600);
	    	 });
	    	 $('.inputTXT_MULTI_S').click(function(){
	    	 	showButtons()
	    	 	$("#nextBtn").prop('disabled', true);
	    	 	$('#stopCount').css('display','none')
	    	 	$('#nextBtn').css('display','block')
	    		$('#nextBtn').text('Next')
	    		$('#nextBtn').removeClass('normal-form-next').addClass('btn-primary')
	    		$('#resetQuiz').css('display','block')
		   //  	 setTimeout(function(){
					// 	timerasdsd(3);
					// 	$('#nextBtn').addClass("countDown-btn");
					// },600);
	    	 });
	    	 $('.inputTXT_TXT').focus(function(){
	    	 	showButtons()
	    	 	$("#nextBtn").prop('disabled', true);
	    	 	var remain = parseInt(sessionStorage['pause_num']);
		    	if ($('#nextBtn').hasClass('countDown-btn')) {
		    		console.log("Has class countDown-btn")
		    		if ($('#nextBtn').hasClass('stop')) {
		    			console.log("Has class stop")
		    			$('#resetQuiz').css("display","none");
	    	 			$('#resetQuiz').removeClass("zoomIn").addClass("zoomOut");
	    	 			$('#stopCount').css("display","block");
	    	 			$('#stopCount').removeClass("zoomOut").addClass("zoomIn");
		    			$('#timer').removeClass("glyphicon glyphicon-play");
		    			$('#nextBtn').removeClass("stop");
			    		$('#timer').text(sessionStorage['pause_num']);
			    		timerasdsd(remain);
		    		}
		    	}else{
		    		setTimeout(function(){
						timerasdsd(10);
						$('#nextBtn').addClass("countDown-btn");
					},1000);
		    	}
		    	 
	    	 });
	    	 $('input:radio[name="'+topic+'"]').change(
			    function(){
			    	console.log('Test')
			    	$("#nextBtn").prop('disabled', false);
			    	// if ($(this).is(':checked')) {
			    	// 	$('.quizImg').css('display','none');
			    	// 	$('.quizImg_temp').css('display','none');
			    	// 	$('#img_'+$(this).attr('value')).css('display','block');
			    	// 	console.log($(this).attr('value'))
			    	// }
			    	if (type == 'SQ_S_MULTI') {
			    		// console.log("Click!")
			    		// console.log($(this).attr('value'))
			    		// console.log($('.inputSQ_S_MULTI').val())
			    		if ($(this).is(':checked')) {
			    			var val = $(this).attr('value');
			    			// console.log(val)
			    			$('.inputTXT_S').val('');
			    			$('.inputSQ_S_MULTI').slideUp();
				            $("[idZ="+val+"]").slideDown();
				             console.log($("[idZ="+val+"]").val())
				            console.log($(this).text())
				            $('#aPrefix').val($(this).attr('valuez'))
				            $('#aAnswer').val($(this).attr('value'))
				            // $('#yourAns').text("Your answer = "+$(this).attr('valuez')+" : "+$("[idZ="+val+"]").val()+" select1: "+select1);
				        }
			    	}
			        if ($(this).is(':checked') && $(this).attr('valueZ') == 'Other') {
			        	console.log('Test')
			            $('#other_input').slideDown();
			            select1 = $('#other_input').attr('idZ');
			        }
			        else{
			        	 $('#other_input').slideUp();
			        }
			    });
					callback();
}
function showButtons(){
	$('#nextBtn').css("display","block");
	$('#nextBtn').addClass("animated bounceInRight");
	$('#resetQuiz').css("display","none");
	$('#stopCount').css("display","block");
	$('#stopCount').addClass("animated bounceInLeft");
}
var timeOut;
function timerasdsd(a){
	 var timeleft = a;
	 document.getElementById("timer").textContent = timeleft;

	 // justquick();
	 console.log(timeleft)
		   timeOut = setInterval(function(){
		   	 --timeleft;
		   		console.log(timeleft)
				   if (timeleft<=0) {
			           document.getElementById("timer").textContent = "Next";
			           	console.log("Called ")
			           	clearInterval(timeOut);
			           	setTimeout(function(){
			           		$("#resetQuiz").prop('disabled', true);
    	 					$("#stopCount").prop('disabled', true);
    	 					$("#nextBtn").prop('disabled', true);
			           		autoNext();
			           	},600);
			       }else{
				   document.getElementById("timer").textContent = timeleft;
				  
				  //  	if (timeleft>=0) {
				 	// 	justquick();
				 	// }
				}
				console.log(timeleft)
				},1000);
		
	}
function myStopFunction() {
    clearInterval(timeOut);
}
function chkIndex(){
	console.log(index+" / "+total);
	if (index == total) {
	    	sessionStorage['isLast'] = "true";
	    }
	    console.log("Last Question: "+sessionStorage['isLast'])
}
function resetQuiz(){
	var data = new Object();
        data.token = sessionStorage['Token'];
        data.player_id = sessionStorage['player'];
        data.quiz_id = sessionStorage['qId'];
        Url = sessionStorage['mainUrl']+"Quiz/reset"
	$.ajax({
		type: "POST",
		url: Url,
		content: "application/json; charset=utf-8",
		dataType: "json",
		data: data,
		success: function(d) {
			sessionStorage.removeItem('save_result')
	    	// toastr["info"]("Please wait for 1-2 sec.", "Successful");
	    	setTimeout(function(){ location.reload(); }, 1500);
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : resetQuiz() @ quiz.js");
            }
	});
}
function savePrevious(){
	sessionStorage['past_Quest'] = sessionStorage['cur_Quest'];
	var past_Quest = sessionStorage['past_Quest'];
	test2 = JSON.parse(past_Quest);
}
function saveResult(){
	var temp_result = sessionStorage['save_result'];
	var result = JSON.parse(temp_result);
	return result;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function valid(){
	if (type == 'TXT') {
		// if (isEmptyTXT()) {
			
	 //    	toastr["warning"]("Please put something in the box.", "Hint!");
	 //    	return false;
		// }else if(isTooShortTXT()){
	 //  //   	toastr["warning"]("The text is too short.", "Hint!");
	 //  //   	$('#nextBtn').prop('disabled',false)
	 //  //   	$('#resetQuiz').prop('disabled',false)
	 //  //   	$('#stopCount').prop('disabled',false)
	 //  //   	setTimeout(function(){
		// 	// 	timerasdsd(10);
		// 	// 	$('#nextBtn').addClass("countDown-btn");
		// 	// },600);
	 //    	return true;
		// }else{
			answer = $('.inputTXT_TXT').val();
			return true;
		// }
	}
	else if(type == 'MULTI_S'){
		var b = sessionStorage['ans_no'];
		if (b == 'null') {
			console.log("Wrong Input")
			return false;
		}else if(b == 'Yes'){
			select1 = TTarray.join();
			return true;
		}
		else if(b == 'No'){
			for(var i=0;i<Quiz01.response.result.options.length;i++){
					if (Quiz01.response.result.options[i].is_text_option) {
						select1 = Quiz01.response.result.options[i].option_id;
						answer = sessionStorage['ans_no'];
					}
				}
				return true;
		}
	}
	else if(type == 'SLI' || type == 'SLI_S'){
			var b = sessionStorage['ans_no'];
			capitalizeFirstLetter(b);
			var c = $('#hidSLIval').val();
			var d = b+", "+c+" "+unit;
			var e = c+" "+unit;
			console.log(d);
			console.log(e);
				for(var i=0;i<Quiz01.response.result.options.length;i++){
					if (Quiz01.response.result.options[i].is_text_option) {
						console.log("Select"+i+" : "+i+" | C : "+c+" = "+Quiz01.response.result.options[i].option_id);
							select1 = Quiz01.response.result.options[i].option_id;
							console.log("Select1: "+select1);
					}
				}
				if (type == 'SLI_S') {
					if (b == 'Yes') {
						answer = d;
						console.log("d : "+d);
					}else if(b == 'No'){
						answer = b;
						console.log("b : "+b);
					}
				}
				if (type == 'SLI') {
					answer = e;
					console.log("e : "+e);
				}
				return true;

	}else if(type == 'RANGE' || type == 'RANGE_S'){
		if (sessionStorage['ans_no'] == 'yes' || sessionStorage['ans_no'] == 'null') {
			if (!validRANGE()) {
				
		    	toastr["warning"]("The gap between min and max must not more than 10% ("+percentage(b,10).toLocaleString()+").", "Hint!");
		    	return false;
			}else{
				answer = getSelectValue()[0];
				answer2 = getSelectValue()[1];
				if (type == 'RANGE_S') {
					var b = sessionStorage['ans_no'];
					capitalizeFirstLetter(b);
					answer = b+" : "+answer;
				}
				for(var i=0;i<Quiz01.response.result.options.length;i++){
					if (Quiz01.response.result.options[i].is_text_option) {
						var c = "select"+i;
						console.log("Select"+i+" : "+i+" | C : "+c+" = "+Quiz01.response.result.options[i].option_id);
						if (c == "select1") {
							select1 = Quiz01.response.result.options[i].option_id;
							console.log("Select1: "+select1);
						}else if(c == "select2"){
							select2 = Quiz01.response.result.options[i].option_id;
							console.log("Select1: "+select2);
						}
					}
				}
				return true;
			}
		}else{
			for(var i=0;i<Quiz01.response.result.options.length;i++){
				if (Quiz01.response.result.options[i].option != "") {
					select1 = Quiz01.response.result.options[i].option_id;
					console.log("select1: "+select1);
					return true;
				}
			}
		}
	}else if(type == 'YN'){
		inputType = 'YN';
		if (!validYN()) {
			
	    	toastr["warning"]("Please select one of choices.", "Hint!");
	    	return false;
		}else{
			return true;
		}
	}else if(type == 'SQ'){
		if (!validSQ()) {
			
	    	toastr["warning"]("Please select one of choices.", "Hint!");
	    	return false;
		}else{
			return true;
		}

	}else if(type == 'SQ_S'){
		console.log("Enter SQ_S")
		if (validSQ_S()) {
			
	    	toastr["warning"]("Invaild input data.", "Hint!");
	    	return false;
		}else{
			answer = $('.inputTXT_S').val();
			return true;
		}

	}
	else if(type == 'SQ_S_MULTI'){
		console.log("Enter SQ_S_MULTI")
		if (!validSQ_S_MULTI()) {
	    	toastr["warning"]("Invaild input data.", "Hint!");
	    	return false;
		}else{
			var a = $('#aPrefix').val();
			var b = $('#aAnswer').val();
			$('#aAnswer').val()
			answer = $('#aPrefix').val()+' : '+$("[idX="+b+"]").val();
			return true;
		}

	}
	else if(type == 'MULTI'){
		console.log(TTarray)
		select1 = TTarray.join();
		return true;
	}

}
function validSQ_S_MULTI(){
	var b = $('#aAnswer').val();
	if ($("[idX="+b+"]").val() == "") {
		return false;
	}else{
		return true;
	}
}
function validSQ_S() {
	var radios = document.getElementsByTagName('input');
	for (var i = 0; i < radios.length; i++) {
		console.log("Enter for")
	    if (radios[i].type === 'radio' && radios[i].checked) {
	    	console.log("Enter If 1")
	        if (radios[i].getAttribute('valueZ') == 'Other') {
	        	console.log("Enter If 2")
	        	if ($('.inputTXT_S').val() == '' || $('.inputTXT_S').val().length < 2) {
	        		console.log("Enter If 3")
					return true;
				}else{
					return false;
				}
			}
			else{
				console.log("Enter Else")
				select1 = radios[i].value;
				return false;
			}
	    }
	}
}
function isEmptyTXT(){
	if ($('.inputTXT').val() == '') {
		return true;
	}else{
		return false;
	}
}
function isTooShortTXT(){
	if ($('.inputTXT_TXT').val().length < 2) {
		return true;
	}else{
		return false;
	}
}
function validSLI(){
	return true;
}
function validRANGE(){
	if (getSelectValue() == undefined) {
		return false;
	}else{
		if ((getSelectValue()[1]-getSelectValue()[0]) > percentage(b,10)) {
			return false;
		}else{
			return true;
		}
	}
}
function validYN(){
	return validSQ();
}
function validSQ(){
	var radios = document.getElementsByTagName('input');
	for (var i = 0; i < radios.length; i++) {
	    if (radios[i].type === 'radio' && radios[i].checked) {
	        // get value, set checked flag or do whatever you need to
	        select1 = radios[i].value;
	        console.log("Selected: "+radios[i].value)
	    }
	}
	if (select1 != undefined) {
		return true;
	}else{
		return false;
	}
}
function nextQuestion(callback){
	var data = new Object();
        data.token = sessionStorage['Token'];
        data.player_id = sessionStorage['player'];
        data.question_id = questId;
        var b = sessionStorage['ans_no'];
        var a = capitalizeFirstLetter(b);
        if (a == "no" && type == "RANGE_S") {
        	data.answer = Quiz01.response.result.options[3].option;
        	console.log("Enter  a == null type = RANGE_S AS a = "+a);
        }
        else if(a == "no" && type == "SLI_S"){
        	data.answer = Quiz01.response.result.options[1].option;
        	console.log("Enter a == null type = SLI_S AS a = "+a+" Answer = "+Quiz01.response.result.options[1].option);
        }
        else{
        	data.answer = answer;
	        data.option_id = select1;
	        if (answer != undefined) {
	        	console.log("Enter answer != undefined AS a = "+a+" answer = "+answer);
	        	if (answer2 != undefined) {
	        		console.log("Enter answer2 != undefined AS a = "+a+" answer = "+answer+" answer2 = "+answer2);
	       			data.answer = answer+","+answer2;
	       		}
	       		if (select2 != undefined) {
	       			console.log("Enter select2 != undefined AS a = "+a+" select1 = "+select1+" select2 = "+select2);
	       			data.option_id = select1+","+select2;
	       		}
	       	}
	       	console.log("Final Report: Answer: "+answer+" & Answer2: "+answer2+" & Selected: "+select1+" & Selected2: "+select2);
	       	console.log(data);
       	}
        tokenUrl = sessionStorage['mainUrl']+"Quiz/"+sessionStorage['qId']+"/answer"
	$.ajax({
		type: "POST",
		url: tokenUrl,
		content: "application/json; charset=utf-8",
		dataType: "json",
		data: data,
		success: function(d) {
			Gtemp_02 = d;
			sessionStorage.setItem("save_result", JSON.stringify(d.response.result.grade));
			sessionStorage['isLast'] = d.response.result.is_last_question;
			// sessionStorage.setItem("graded", JSON.stringify(Gtemp_02.response.result.grade))
			// savePrevious();
			if (d.response.result.is_last_question) {
					sessionStorage.setItem("reward", JSON.stringify(d.response.result.rewards))
					// scorePop(Gtemp_02.response.result.grade, Gtemp_02.response.result.rewards);
					rewardPop(d.response.result.grade, d.response.result.rewards);
					console.log("Hey! it is the last now! check the console about reward!")
					getFeed(function(data){
					if (data != undefined || data != null) {
						// updateFeedPositionI(function(){
						// 	updateFeedPositionI(function(){
						// 		$('.feedRow').css('top','0px');
						// 		setTimeout(function(){
									buildFeed(data);
						// 		},1000);
						// 	});
						// });
					}
				});
					// $('#myModal').modal("hide");
				
			}else{
				// toastr["info"]("Please wait for 1-2 sec. You're going to next question", "Successful");
				callback(d);
			}
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : nextQuestion() @ quiz.js");
            }
        });
}
function updateFeedPositionI(callback){
	$('.feedRow').css('top','-45px');
	callback();
}
function updateFeedPositionII(callback){
	$('#feed-content').children()[0].remove()
	callback();
}
function getRandomPosition(element) {
	var x = document.getElementById("animation-locate").offsetHeight; //-60
	var y = document.getElementById("animation-locate").offsetWidth-100;
	console.log("")
	// console.log('X: '+x)
	// console.log('Y: '+y)
	console.log('X(height): '+x)
	console.log('Y(width): '+y)
	console.log('offsetHeight: '+document.getElementById("animation-locate").offsetHeight+' - clientHeight: '+element.clientHeight+' = '+x)
	console.log('offsetWidth: '+document.getElementById("animation-locate").offsetWidth+' - clientWidth: '+element.clientWidth+' = '+y)
	console.log("")
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y);
	console.log(randomX)
	console.log(randomY)
	return [randomX,randomY];
}

// Point 
function generatePoint(src, src2){
	var img = document.createElement('img');
	var img_blur = document.createElement('img');
	var text = document.createElement('span');
	// text.setAttribute("style", "position:absolute;");
	img.setAttribute("style", "position:absolute;");
	img.setAttribute("src", src);
	img.setAttribute("class", "shine");
	// img.setAttribute("class", "animated flip");
	img_blur.setAttribute("style", "position:absolute;");
	img_blur.setAttribute("src", src2);
	img_blur.setAttribute("class", "shine animated flip");
	
	document.getElementById("animation-locate").appendChild(img);
	document.getElementById("animation-locate").appendChild(img_blur);

	var xy = getRandomPosition(img);
	img.style.width = '20%';
	img.style.zIndex = '2000';
	img.style.height = '20%';
	img.style.top = xy[0] + 'px';
	img.style.left = xy[1] + 'px';
	img.style.display = 'none';

	img_blur.style.width = '20%';
	img_blur.style.zIndex = '2000';
	img_blur.style.height = '20%';
	img_blur.style.top = xy[0] + 'px';
	img_blur.style.left = xy[1] + 'px';
	img_blur.style.display = 'block';
}
// Exp
function generateExp(src){
	var img = document.createElement('img');
	var text = document.createElement('span');
	// text.setAttribute("style", "position:absolute;");
	img.setAttribute("style", "position:absolute;");
	img.setAttribute("src", src);
	img.setAttribute("class", "shine animated zoomInUp");
	document.getElementById("animation-locate").appendChild(img);
	var xy = getRandomPosition(img);
	img.style.width = '20%';
	img.style.zIndex = '2000';
	img.style.height = '20%';
	img.style.top = xy[0] + 'px';
	img.style.left = xy[1] + 'px';
	// text.style.width = '20%';
	// text.style.zIndex = '2000';
	// text.style.height = '20%';
	// text.style.top = (xy[0]+50) + 'px';
	// text.style.left = xy[1] + 'px';
}

// Badge
function generateBadge(data){
    console.log(data)
    var img = document.createElement('img');
	img.setAttribute("style", "position:absolute;");
	img.setAttribute("src", data);
	img.setAttribute("class", "shine animated bounceIn");
	document.getElementById("animation-locate").appendChild(img);
	var xy = getRandomPosition(img);
	img.style.width = '20%';
	img.style.zIndex = '2000';
	img.style.height = '20%';
	img.style.top = xy[0] + 'px';
	img.style.left = xy[1] + 'px';
}

function rewardPop(grades, rewards){
	console.log(rewards.length)
	var text = '';
	var src = '';
	var src2 = '';
	var i = 0;
	$('#animation-locate').css('display','block')
		
		var interval_up = setInterval(function(){
			console.log('I: '+i)
			console.log('Reward length: '+rewards.length)
			if (i<rewards.length) {
				if (rewards[i].event_type == 'REWARD_RECEIVED' && rewards[i].reward_type != 'badge' && rewards[i].value > 0) {
					if (rewards[i].reward_type == 'exp') {
						src = 'img/EXP.png'
						generateExp(src);
					}
					else if (rewards[i].reward_type == 'point') {
						src = 'img/coin_22.png'
						src2 = 'img/coin_010.png'
						generatePoint(src,src2);
					}
				}
				else if(rewards[i].event_type == 'REWARD_RECEIVED' && rewards[i].reward_type == 'badge' && rewards[i].value > 0){
					console.log("BADGE")
					src = rewards[i].reward_data.image;
					// console.log(rewards[i].reward_data.image)
					generateBadge(src);
				}
				i++;
			}else{
				clearInterval(interval_up);
				var k = 0;
				setTimeout(function(){
					var interval_down = setInterval(function(){
						console.log('K: '+k+' | '+(rewards.length-2))
						var element = document.getElementById("animation-locate");
						if (k<element.childElementCount) {
							if ($('.shine').hasClass('zoomInUp')) {
								element.children[k].classList.remove("zoomInUp");
								element.children[k].classList.add("zoomOutUp");
							}
							else if($('.shine').hasClass('flip')){
								element.children[k].classList.remove("flip");
								element.children[k].classList.add("animated");
								element.children[k].classList.add("fadeOutUp");
							}
							else if($('.shine').hasClass('bounceIn')){
								element.children[k].classList.remove("bounceIn");
								element.children[k].classList.add("animated");
								element.children[k].classList.add("fadeOutUp");
							}
							// element.children[k].classList.remove("flip");
							// element.children[k].classList.add("animated");
							
							++k;
						}else{
							console.log('K: '+k)
							console.log('Clear')
							element.style.display = 'none';
							clearInterval(interval_down);
							setTimeout(function(){
								window.location.replace("index");
							},500);
						}
						console.log('K Outside')
						// $('#animation-locate').addClass('');
						// $('#animation-locate').css('display','none')
					},300);
				},600);
			}
			setTimeout(function(){
				$( "img[src='img/coin_010.png']" ).css('display','none')
				$( "img[src='img/coin_22.png']" ).css('display','block')
			},600);
		},200);
}
// function scorePop(a,b){
// 	// var get_grade = JSON.parse(sessionStorage['graded']);
// 	console.log("Enter scorePop");
// 	var total_score = a.total_score;
// 	var max_score = a.total_max_score;
// 	var gr_rank = a.rank;
// 	var gr_rank_img = a.rank_image;
// 	var gr_grade = a.grade;
// 	var img = '';
// 	console.log("Rank: "+gr_rank+" | Max score: "+max_score)
// 	if (gr_rank == "" && max_score == 0) {
// 		swal({
// 		  title: "Completed",
// 		  text: "Thank you for your time!, we're bringing you to main menu!",
// 		  type: "success",
// 		  confirmButtonClass: "btn-primary",
// 		  confirmButtonText: "Ok!",
// 		  closeOnConfirm: false
// 		},
// 		function(){
// 			setTimeout(function(){
// 				window.location.replace("index.jsp");
// 			},500)
// 		});
// 	}
// 	else if(gr_rank == "" && max_score != 0){
// 		swalReward(b);
// 	}
// 	else if (max_score == 0 && gr_rank != "") {
// 		swalRank(a,b);
// 	}
// 	else if (max_score != 0 && gr_rank != "") {
// 		swalRankWithScore(a,b);
// 	}
// }

// function swalRank(a,b){
// 	var total_score = a.total_score;
// 	var max_score = a.total_max_score;
// 	var gr_rank = a.rank;
// 	var gr_rank_img = a.rank_image;
// 	var gr_grade = a.grade;
// 	swal({
// 		title: "",
// 		imageUrl: gr_rank_img,
// 		confirmButtonText: "Ok!",
//   		closeOnConfirm: true
//   		},
//   		function(){
//   			if (b != []) {
//   				swalReward(b)
// 			}
//   		});
// }
// function swalRankWithScore(a,b){
// 	var total_score = a.total_score;
// 	var max_score = a.total_max_score;
// 	var gr_rank = a.rank;
// 	var gr_rank_img = a.rank_image;
// 	var gr_grade = a.grade;
// 	swal({
// 		title: total_score+" / "+max_score,
// 		imageUrl: gr_rank_img,
// 		confirmButtonText: "Ok!",
//   		closeOnConfirm: true
//   		},
//   		function(){
//   			if (b != []) {
//   				swalReward(b)
// 			}
//   		});
// }
// function swalReward(b){
// 			var i = 0;
// 			initialProp();
// 				function initialProp(){
// 					console.log(i);
// 					if (b[i].value >= 1) {
// 						console.log(" ")
// 						console.log("Enter if in for loop b["+i+"].value >= 1 | "+b[i].value)
// 						console.log(" ")
// 						var re_id = b[i].reward_id;
// 						var re_type = b[i].reward_type;
// 						var re_value = b[i].value;
// 						var re_event = b[i].event_type;
// 						console.log(" ")
// 						console.log("re_id: "+re_id+" | re_type: "+re_type+" | re_value: "+re_value+" | re_event: "+re_event)
// 						console.log(" ")
// 						if (re_type == "badge") {
// 							var badge_img = b[i].reward_data.image;
// 							var badge_name = b[i].reward_data.name;
// 							buildModal(re_type,re_value,badge_img,badge_name);
// 							console.log(" ")
// 							console.log("Enter re_type:"+re_type+" == badge | sent to: buildModal("+re_type+","+re_value+","+badge_img+","+badge_name+")")
// 							console.log(" ")
// 						}else if (re_type == "exp"){
// 							buildModal(re_type,re_value,null,null);
// 							console.log(" ")
// 							console.log("Enter re_type:"+re_type+" == exp | sent to: buildModal("+re_type+","+re_value+","+badge_img+","+badge_name+")")
// 							console.log(" ")
// 					  	}
// 					  	else if (re_type == "point"){
// 							buildModal(re_type,re_value,null,null);
// 							console.log(" ")
// 							console.log("Enter re_type:"+re_type+" == point | sent to: buildModal("+re_type+","+re_value+","+badge_img+","+badge_name+")")
// 							console.log(" ")
// 					  	}
// 					  	else if(re_event == "LEVEL_UP"){
// 					  		buildModal(re_event,re_value,null,null);
// 							console.log(" ")
// 							console.log("Enter re_type:"+re_type+" == point | sent to: buildModal("+re_type+","+re_value+","+badge_img+","+badge_name+")")
// 							console.log(" ")
// 					  	}
// 					  	$("#myScore").modal({backdrop: "static"});
// 					}else{
// 						if ((i+1) < b.length) {
// 					  		i+=1;
// 					  		initialProp();
// 					  	}
// 					  	else{
// 						  	setTimeout(function(){
// 						  		swal({
// 								  title: "Completed",
// 								  text: "That's all you got, we're bringing you to main menu!",
// 								  type: "success",
// 								  confirmButtonClass: "btn-primary",
// 								  confirmButtonText: "Ok!",
// 								  closeOnConfirm: false
// 								},
// 								function(){
// 									setTimeout(function(){
// 										window.location.replace("index.jsp");
// 									},500)
// 								});
// 							},500)
// 				  		}
// 					}
// 					// $("#myScore").modal({backdrop: "static"});
// 			}
// 			function buildModal(typer,valuer,imgr,badgeN,callback){
// 				var imgss = '';
// 				var text = '';
// 				var got = 'You got <span class="highlight">'+valuer+'</span> '+typer;
// 				var imgee = '<img src="img/con1.png">'
// 				if (typer == 'exp') {
// 					imgss = 'img/EXP.png';
// 				}else if (typer == 'point') {
// 					imgss = 'img/Mission_1.png';
// 				}else if (typer == 'LEVEL_UP'){
// 					imgss = 'img/Levelup.png';
// 				}
// 				else{
// 					got = 'You got <span class="highlight">'+valuer+' '+badgeN+'</span> '+typer;
// 					imgss = imgr;
// 				}
// 				text += '<div class="modal fade" id="myScore" role="dialog">'+
//                 '<div class="modal-dialog">'+
//                   '<!-- Modal content-->'+
//                   '<div class="modal-content" style="background-color: #ffffffc7;border:0px;">'+
//                     '<div class="modal-header">'+
//                         '<h3>'+imgee+'</h3>'+
//                         '<h4>'+got+'</h4>'+
//                     '</div>'+
//                     '<div class="modal-body" style="text-align: center;">'+
//                           '<img src="'+imgss+'">'+
//                     '</div>'+
//                     '<div class="modal-footer">'+
//                       '<button type="submit" class="btn btn-primary closeM">Ok!'+
//                     '</div>'+
//                   '</div>'+
//                 '</div>'+
//               '</div>'
// 			  $('#modal_score').append(text);
// 			  $('.closeM').click(function(){
// 			  	$("#myScore").modal("hide");
// 			  	$("#modal_score > div").remove();
// 			  	$(".modal-backdrop").remove();
// 			  	if ((i+1) < b.length) {
// 			  		console.log(i+" < "+b.length);
// 			  		i+=1;
// 			  		initialProp();
// 			  	}
// 			  	else{
// 			  		swal({
// 					  title: "Completed",
// 					  text: "That's all you got, we're bringing you to main menu!",
// 					  type: "success",
// 					  confirmButtonClass: "btn-primary",
// 					  confirmButtonText: "Ok!",
// 					  closeOnConfirm: false
// 					},
// 					function(){
// 						setTimeout(function(){
// 							window.location.replace("index.jsp");
// 						},500)
// 					});
// 			  	}
// 			  });
// 			}
// 			// $("#myScore").modal("toggle");
// 			// console.log(" ")
// 			// console.log("Out of loop. . .")
// 			// console.log(" ")
// }
function translateResult(a){
	var data = JSON.parse(a);
	return data;
}

function isLastQuestion(){
	if (sessionStorage['isLast'] == "true") { //true == out *Default = false
		return true;
	}else{							// false == next
		return false;
	}
}

function percentage(num, per)
{
  return (num/100)*per;
}