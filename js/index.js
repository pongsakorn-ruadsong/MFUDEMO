var Index01 = [];
var Index02 = [];
var Index03 = [];
var Index04 = [];
var Index05 = [];
var TempLink = sessionStorage['mainUrl']+'Player/'+sessionStorage['player']+'/data/all?api_key='+sessionStorage['api_key'];
var getQuizz = sessionStorage['mainUrl']+'Quiz/list?api_key='+sessionStorage['api_key'];
var previous = '';
var current = '';
var current_Index = '';
var rawData;
var cdata;
var quizMax;
var quizMin;
var contentLang = [];
var contentAbbrev = [];
addHighLight = '<span class="testLoader" animated="fadeIn"></span>'; //					by Dew
var mathRand = Math.floor(500 + Math.random() * 500);
function getUserInfo() {
	var data = new Object();
	data.token = sessionStorage['Token'];
	$.ajax({
        	type: "POST",
            url: 'https://api.pbapp.net/Player/'+sessionStorage['player']+'/data/all',
            dataType: "json",
            data: data,
	    	success: function(data){
	    		Index05 = data;
	    		console.log(data);
	    		buildPlayer(data.response.player);
	    // 		jQuery.each(data.response, function() {
					// contentLang[this.language] = this.language;
					// contentAbbrev[this.language] = this.abbreviation;
	    //         });
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getLang() @ index.js");
            }
        });
}
function buildPlayer(a) {
	// $('#playerPanel > div').remove();
	var img = a.image;
	var img_for_check = /[^/]*$/.exec(img)[0];
	console.log(img_for_check)
	if (img_for_check == 'default_profile.jpg') {
		img = 'img/default_user.png'
	}
	var Fname = a.first_name;
	var Lname = a.last_name;
	var exp = a.exp;
	var point = ''; //In points
	var lv = a.level;
	var badge = ''; //many in array
	var gender = a.gender; // 1 or 2
	var lv_percent = a.percent_of_level-15;
	var regis_date = a.registered;
	var username = a.username;
	var phone_number = ''; //null
	if (a.phone_number == null) {
		phone_number = 'null';
	}else{
		phone_number = a.phone_number;
	}
	var email = a.email;
	var birthDate = ''; //null
	if (a.birth_date == null) {
		birthDate = 'null';
	}else{
		birthDate = a.birth_date;
	}
	for(var i = 0; i<a.points.length;i++){
		if (a.points[i].reward_name == "point") {
			point = a.points[i].value;
		}
	}
	$('#user_pic').attr("src",img);
	$('#user_name').text(username);
	$('#user_level').text(lv);
	$('#user_exp').text(exp);
	$('#user_point').text(point);
	console.log(lv_percent)
	document.getElementById("level_progress").style.width = lv_percent+'%';
}
function buildRewardList() {
	$('#table_reward > tr').remove();
	console.log("Enter build reward list")
	var badges = Index05.response.player.badges;
	var length = badges.length;
	var k =1;
	console.log("badges: "+badges+" | length: "+length);
	var text = '<tr><td>#</td><td>Image</td><td>Name</td><td>Amount</td><td>Action</td></tr>';
	for (var i = 0; i < length; i++) {
		if (badges[i].amount == 0) {
			continue;
		}
		text += '<tr>'+
		'<td>'+k+'</td>'+
		'<td><img src='+badges[i].image+' style="width:50px;height:50px;"></td>'+
		'<td>'+badges[i].name+'</td>'+
		'<td>'+badges[i].amount+'</td>'+
		'<td>'+
			'<button type="button" rId="'+badges[i].badge_id+'" class="btn btn-redeem btn-primary" style="padding:none !important;font-size:15px;" disabled>Not now</button>'+
		'</td>'+
		'</tr>'
		k++;
	}
	$('#table_reward').append(text);
}
function initialData(){

}
function changeLang(callback){
	getContent();
	callback();
}
function getLang() {
	$.ajax({
        	type: "GET",
            url: sessionStorage['mainUrl']+'Language?api_key='+sessionStorage['api_key'],
            dataType: "json",
	    	success: function(data){
	    		console.log(data);
	    		buildLangButton(data.response);
	    // 		jQuery.each(data.response, function() {
					// contentLang[this.language] = this.language;
					// contentAbbrev[this.language] = this.abbreviation;
	    //         });
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getLang() @ index.js");
            }
        });
}
function buildLangButton(a) {
	$('#langList > div').remove();
	var text = '<div class="row"><div class="input-group">';
	var abbreviation = '';
	// var element = document.getElementById('sliderUD'),
 //    style = window.getComputedStyle(element),
 //    top = style.getPropertyValue('top');
 //    var cc = top.match(/\d+/g).map(Number);
 //    var sa = parseInt(cc);
 //    var bba = sa;
 //    sessionStorage['top'] = bba;
 //    console.log(sa);
    text += '<button class="form-control chgLang" abbrev="us" lang="English"><img src="css/blank.gif" class="flag flag-us alt="English"/>EN</button>'
	for(var i=0;i<a.length;i++){
		if (a[i].abbreviation == 'en') {
			abbreviation = 'us';
		}else{
			abbreviation = a[i].abbreviation;
		}
		text+='<button class="form-control chgLang" abbrev="'+abbreviation+'" lang="'+a[i].language+'")">'+
		'<img src="css/blank.gif" class="flag flag-'+abbreviation+'" alt="'+a[i].language+'" />'+abbreviation.toUpperCase()+'</button>'
		if ((i+1)%4 == 0) {
			text+='</div></div> <div class="row" style="margin-top:10px;"><div class="input-group">'
			// console.log("(i+1)%5 = "+(i+1)%5);
			// bba = sa+=35;
			// sessionStorage['top'] = bba;
			// console.log("(i+1)%5 = "+(i+1)%5);
			// document.getElementById('sliderUD').style.top = "-"+bba+"px";
			}
		}
		$('#langList').append(text);
		$('.chgLang').click(function(){
			// $('#myModal').modal({backdrop: 'static', keyboard: false});
		 //    changeLang(this.getAttribute("lang"), function(){
		 //    	$('#myModal').modal('hide');
		 //    });
			sessionStorage['lang'] = this.getAttribute("lang");
			$('.chgLang').css('background-color','white');
			$(this).css('background-color','red');
		});
	}
function getToastrOption(){
	var toastrOp = toastr.options = {
		  "closeButton": true,
		  "newestOnTop": false,
		  "progressBar": true,
		  "positionClass": "toast-bottom-right",
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "3000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		};
		return toastrOp;
}
function getToken() {
	var data = new Object();
        data.api_key = sessionStorage['api_key'];
        data.api_secret = sessionStorage['api_sec'];
        tokenUrl = sessionStorage['mainUrl']+"Auth"
	$.ajax({
		type: "POST",
		async: false,
		url: tokenUrl,
		content: "application/json; charset=utf-8",
		dataType: "json",
		data: data,
		success: function(d) {
			Index02 = d;
			sessionStorage['Token'] = Index02.response.token;
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getToken() @ index.js");
            }
        });
}
function getApi() {
	getToastrOption()
	toastr["info"]("Api_Key: "+sessionStorage['api_key'], "Successful")
 }
function getPlayer() {
	getToastrOption()
	toastr["info"]("Player: "+sessionStorage['player'], "Successful")
}
function Logout() {
	sessionStorage.clear();
	window.location = 'login.jsp';
}
function previousSlide(a){
	console.log(a);
}
function getQuizData() {
        $.ajax({
        	type: "GET",
            url: getQuizz,
            dataType: "json",
	    	success: function(data){
	        	Index01 = data;
	        	$('#myModal').modal({backdrop: 'static', keyboard: false});
				getStatus(function(){
					console.log('Finnished get status')
					// console.log(sessionStorage[''])
					sortOrder();
					setTimeout(function(){
						buildQuizList(function(){
						console.log('Finnished get buildQuizList')
						buildProgBar(data);
						$('#myModal').modal('hide');
					});
					},2000);
					// buildLangButton(data.response);
				});
	       //  	getStatus(Index01.response.result);
	       //  	$('#myModal').modal({backdrop: 'static', keyboard: false});
		    		// setTimeout(function(){
		    		// 	$('#myModal').modal('hide');
		    		// 	buildQuizList();
		    		// 	buildProgBar(data);
		    		// }, 1000);


	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getQuizData() @ index.js");
            }
        });
}
function buildProgBar(a){
	var text = '';
	var length = a.response.result.length;
	for (var i = 1;i <= length;i++) {
		text += '<div class="form-control progNodeLock weight'+i+'" id="progNode_'+a.response.result[i-1].quiz_id+'">'+
					'<label> '+a.response.result[i-1].name+' </label>'+
					'</div>'
		for(var c = i;c<i+1;c++){
			if (c == length) {
				break;
			}else{
				text += '<div class="form-control progBar weightBar'+i+'" id="progBar_'+a.response.result[i-1].quiz_id+'">'+
		'<div class="progress"></div>'+
		'</div>'
			}
		}
	}
	// fillColor();
	$('.prog-bar').append(text);
}
function sortOrder(){
	rawData = sessionStorage['quizStatus'];
	cdata = JSON.parse(rawData);
	fillColor(cdata);
	for(var i=0;i<cdata.length;i++){
		console.log("Quiz: "+cdata[i].id+" | Status: "+cdata[i].isFinnish);
		if (cdata[0].isFinnish == false) {
			previous = 'unassigned';
			current = cdata[0].id;
			current_Index = cdata[0].Order;
		}else{
			if (cdata[i].isFinnish) {
				previous = cdata[i].id;
				if ((i+1)<cdata.length) {
					current = cdata[(i+1)].id;
					current_Index = cdata[(i+1)].Order;
				}
			}
		}
	}
}
 function isFinnished(){
	console.log(" ")
	// console.log("Enter isFinnish checking. . .")
 	rawData = sessionStorage['quizStatus'];
 	cdata = JSON.parse(rawData);
 	var lockQuiz = '<div class="lock-container">'+
						'<div class="lock">'+
						'<div style="background-color: white; border-radius: 5px; top: 6px; left: 10px; width: 4px; height: 7px; position: absolute;">'+
						'</div>'+
						'</div>'+
						'</div>'; //					by Dew
	var loadingDot = '<div class="load-3 loading-text">'+
			                '<div class="line" style="background-color: #4285F4"></div>'+
			                '<div class="line" style="background-color: #FBBC05;"></div>'+
			                '<div class="line" style="background-color: #EA4335"></div>'+
			            '</div>'; //					by Dew
 	for(var i=0;i<cdata.length;i++){
 		// console.log("Enter For Loop. . . As: I = "+i+" | length = "+cdata.length+" | cdata"+i+" = "+cdata[i].id+" & "+cdata[i].isFinnish)
 		console.log("Enter Else if in for loop as data id: "+cdata[i].id+' | sdasd: '+lockQuiz);
		if (cdata[i].isFinnish == true) {
			// console.log("Enter if in for loop as data id: "+cdata[i].id);
			$('#overlay_lo_'+cdata[i].id).css('display',"none");
			$('#overlay_fi_'+cdata[i].id).css('display',"block");
			$('#btn_'+cdata[i].id+' > div').addClass('ggez');
			$('#progNode_'+cdata[i].id).prepend(lockQuiz); //					by Dew
		}else if (cdata[i].isFinnish == false) {
			// console.log("Enter Else if in for loop as data id: "+cdata[i].id);
			if (cdata[i].id != current) {
				$('#overlay_lo_'+cdata[i].id).css('display',"block");
				$('#overlay_fi_'+cdata[i].id).css('display',"none");
				$('#btn_'+cdata[i].id+' > div').addClass('ggez');
				$('#progNode_'+cdata[i].id).css('background-color',"#d9d9d9"); //					by Dew
				$('#progNode_'+cdata[i].id).prepend(lockQuiz); //					by Dew
			}
			else{
				$('#btn_'+cdata[i].id+' > div').removeClass('ggez');
				$('#progNode_'+cdata[i].id).prepend(addHighLight); //					by Dew
			}
 		}
 	}
 }

function setPrevious(a){
	// $("#btn_"+a).prop("disabled", true);
	$("#btn_"+a).prop("disabled",true);
	// $("#btn_"+a).css("display","none");
	$("#btn_"+a).css("background-color", "gray");
	$("#progNode_"+a).css("background-color", "red");
}
function setCurrent(a){
	$("#btn_"+a).prop("disabled",false);
	// $("#btn_"+a).prop("disabled", false);
	$("#btn_"+a).css("display", "block");
}
function setVisableAll_P(a){
	$("#btn_"+a).prop("disabled",false);
}
function setVisableAll_C(a){
	$("#btn_"+a).prop("disabled",false);
	// $("#btn_"+a).prop("disabled", false);
	$("#btn_"+a).css("display", "block");
}
function buildQuizList(callback){
	var length = Index01.response.result.length;
	var qData = '';
	var text = '<div><center>';
	// rawData = sessionStorage['quizStatus'];
	// cdata = JSON.parse(rawData);
	var disable = '';
	for(var i = 0;i<length;i++) {
	    var quiz_id = Index01.response.result[i].quiz_id;
	    var quiz_name = Index01.response.result[i].name;
	    var img = Index01.response.result[i].image;
	    var btn_order = Index01.response.result[i].weight;
	    console.log(btn_order)
	    var weight = Index01.response.result[i].weight;
	    var values = contentSummary[quiz_id];
	    if (sessionStorage["isAdmin"] == 'false') {
	    	disable = 'disabled';
	    }
	    text += '<div class="centered">'+
	    '<center>'+
	    '<button class="quizlist" style="display:none" qId="'+quiz_id+'" '+disable+' id="btn_'+quiz_id+'" order="'+btn_order+'">'+
					'<div class="btn_qList">'+
					    '<div class="img-place">'+
					        '<img src="'+img+'" style="display:block;width: 100%;height: 80%;">'+
					        	'<div class="overlay">'+
							    	'<div class="text" style="display:none" id="overlay_lo_'+quiz_id+'">Locked</div>'+
							    	'<div class="text" style="display:none" id="overlay_fi_'+quiz_id+'">Finnished</div>'+
							  	'</div>'+
					    '</div>'+
						'<p style="position: relative;color: white;font-size: 26px;top: 15px;margin-bottom: 25px;">'+values+'</p>'+
					'</div>'+
		'</button>'+
		'</center>'+
	    '</div>'
	    qData += quiz_id+" ";
	    }
	    initialBtnOrder();
		console.log(" ");
		console.log("previous: "+previous+" | current: "+current)
		// console.log("Type of previous: "+typeof(previous)+" | Type of current: "+typeof(current))
		console.log(" ");
	    text += '</center></div>';
	    console.log(qData);
	    $('#qlist').append(text);
	    $('.quizlist').click(function(){
		    sessionStorage['qId'] = this.getAttribute("qId");
			window.location = 'quiz.jsp?qId='+sessionStorage['qId']+'&player='+sessionStorage['player'];
		});
		if (sessionStorage["isAdmin"] == 'true') {
			setVisableAll_P(previous);
			setVisableAll_C(current);
		}else {
			setPrevious(previous);
			setCurrent(current);
			isFinnished();
		}
		callback();
}
function initialBtnOrder(){
	rawData = sessionStorage['quizStatus'];
		cdata = JSON.parse(rawData);
		console.log(cdata);
		quizMax = cdata.length;
		quizMin = cdata[0].Order;
		var currentIndex = current_Index;
		var preQuiz = (current_Index-1);
		var nextQuiz = (current_Index+1);
		if (preQuiz<quizMin) {
			preQuiz = quizMax;
		}
		if (nextQuiz>quizMax) {
			nextQuiz = quizMin;
		}
	    $("#btn-pre").attr("prev",preQuiz);
	    $("#btn-next").attr("next",nextQuiz);
	    console.log("Pre: "+preQuiz+" | Current: "+currentIndex+" | Next: "+nextQuiz+" | Min: "+quizMin+" | Max: "+quizMax);
}
function updateBtnOrder(code,position){
	console.log(position);
	var length = Index01.response.result.length;
	$('.quizlist').removeClass('animated fadeInLeft fadeOutLeft fadeInRight fadeOutRight')

	var quiz_id = [];

	if (code == 'prev') {
		var b = parseInt(position);
		b = b+1;
		if (b>quizMax) {
			b = quizMin;
		}
		var p = b-1;
		if (p<quizMin) {
			p = quizMax;
		}
		var n = b+1;
		if (n>quizMax) {
			n = quizMin;
		}
		console.log(" ")
		console.log("%cprevious: "+p+" | current: "+b+" | next: "+n+"","color:red")
		console.log(" ")
		for(var i=0;i<length;i++){
			// console.log(preQuiz);
	    	var quiz_id = Index01.response.result[i].quiz_id;
	    	var pre_id = Index01.response.result[(p-1)].quiz_id;
	    	if($('#btn_'+quiz_id).attr('order') == b){
	    		$('#btn_'+quiz_id).addClass('animated fadeOutRight');
	    		$('#progNode_'+quiz_id+' > span').remove();//					by Dew
	    		$("#btn_"+quiz_id).hide("slow");
	    		setTimeout(function(){
	    			console.log("")
	    			setTimeout(function(){
						$("#btn_"+pre_id).css("display", "block");
						$('#progNode_'+pre_id).prepend(addHighLight);//					by Dew
						$('#btn_'+pre_id).addClass('animated fadeInLeft');
		    		}, 300);
	    		}, 350);

	    	}
// $("#id").css("display", "none");
// $("#id").css("display", "block");
	    }
	    p = p-1;
	    b = p+1;
	    if (p<quizMin) {
			p = quizMax;
		}
	    n = n-1;
	    if (n<quizMin) {
			n = quizMax;
		}
		if (b>quizMax) {
			b = quizMin;
		}
		console.log("code: "+code+" | Previous: "+p+" | Current: "+b+" | Next: "+n);
		$("#btn-pre").attr("prev",p);
	    $("#btn-next").attr("next",n);
	    return true;


	}else if(code == 'next'){
		var b = parseInt(position);
		b = b-1;
		if (b<quizMin) {
			b = quizMax;
		}
		var n = b+1;
		if (n>quizMax) {
			n = quizMin;
		}
		var p = b-1;
		if (p<quizMin) {
			p = quizMax;
		}
		console.log(" ")
		console.log("%cprevious: "+p+" | current: "+b+" | next: "+n+"","color:red")
		console.log(" ")
		for(var i=0;i<length;i++){
			// console.log(preQuiz);
	    	var quiz_id = Index01.response.result[i].quiz_id;
	    	var next_id = Index01.response.result[(n-1)].quiz_id;
	    	if($('#btn_'+quiz_id).attr('order') == b){
	    		$('#btn_'+quiz_id).addClass('animated fadeOutLeft');
	    		$('#progNode_'+quiz_id+' > span').remove(); //					by Dew
	    		$("#btn_"+quiz_id).hide("slow");
	    		setTimeout(function(){
	    			setTimeout(function(){
						$("#btn_"+next_id).css("display", "block");
						$('#progNode_'+next_id).prepend(addHighLight); //					by Dew
						$('#btn_'+next_id).addClass('animated fadeInRight');
		    		}, 300);
	    		}, 350);

	    	}
// $("#id").css("display", "none");
// $("#id").css("display", "block");
	    }
	    n = n+1;
	    b = n-1;
	    p = b-1;
	    if (n>quizMax) {
	    	n = quizMin;
	    }
	    if (p<quizMin) {
	    	p = quizMax;
	    }
		console.log("code: "+code+" | Previous: "+p+" | Current: "+b+" | Next: "+n);
		$("#btn-pre").attr("prev",p);
	    $("#btn-next").attr("next",n);
	    return true;
	}

}
function getBtnName(a){
	var abz = data.response.result.length;
	var ab = data.response.result;
	var ans = '';
	for(var c = 0;c<abz;c++) {
		if (a == data.response.result[c].node_id) {
			ans = data.response.result[c].title;
		}
	}
	return ans;
}
function resetAllQ(){
	var data = new Object();
        data.token = sessionStorage['Token'];
        data.player_id = sessionStorage['player'];
        Url = sessionStorage['mainUrl']+"Quiz/reset"
	$.ajax({
		type: "POST",
		url: Url,
		content: "application/json; charset=utf-8",
		dataType: "json",
		data: data,
		success: function(d) {
			getToastrOption();
	    	toastr["info"]("Please wait for 1-2 sec.", "Successful");
	    	setTimeout(function(){ location.reload(); }, 1500);
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : resetAllQ() @ index.js");
            }
	});
}
