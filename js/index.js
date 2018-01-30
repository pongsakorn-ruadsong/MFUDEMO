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
var mathRand = Math.floor(1000 + Math.random() * 1000)
function changeLang(a){
	sessionStorage['lang'] = a;
	location.reload();
}
function getLang() {
	$.ajax({
        	type: "GET",
            url: sessionStorage['mainUrl']+'Language?api_key='+sessionStorage['api_key'],
            dataType: "json",
	    	success: function(data){
	    		console.log(data.response);
	    		buildLangButton(data.response);
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getLang() @ index.js");
            }
        });
}
function buildLangButton(a) {
	var text = '<div class="row"><div class="input-group">';
	var abbreviation = '';
	var element = document.getElementById('sliderUD'),
    style = window.getComputedStyle(element),
    top = style.getPropertyValue('top');
    var cc = top.match(/\d+/g).map(Number);
    var sa = parseInt(cc);
    var bba;
    text += '<button class="form-control chgLang" abbrev="us" lang="English"><img src="css/blank.gif" class="flag flag-us alt="English"/>EN</button>'
	for(var i=0;i<a.length;i++){
		if (a[i].abbreviation == 'en') {
			abbreviation = 'us';
		}else{
			abbreviation = a[i].abbreviation;
		}
		text+='<button class="form-control chgLang" abbrev="'+abbreviation+'" lang="'+a[i].language+'")">'+
		'<img src="css/blank.gif" class="flag flag-'+abbreviation+'" alt="'+a[i].language+'" />'+abbreviation.toUpperCase()+'</button>'
		if ((i+1)%5 == 0) {
			text+='</div></div> <div class="row" style="margin-top:10px;"><div class="input-group">'
			// console.log(as);
			bba = sa+=35;
			sessionStorage['top'] = bba;
			document.getElementById('sliderUD').style.top = "-"+bba+"px";
			}
		}
		$('#btn-lang').append(text);
		$('.chgLang').click(function(){
		    changeLang(this.getAttribute("lang"));
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
function getCusData() {
        $.ajax({
        	type: "GET",
            url: getQuizz,
            dataType: "json",
	    	success: function(data){
	        	Index01 = data;
	        	getStatus(Index01.response.result);
	        	$('#myModal').modal({backdrop: 'static', keyboard: false});
	        	
		    		setTimeout(function(){ 
		    			$('#myModal').modal('hide');
		    			buildQuizList();
		    			buildProgBar(data);
		    		}, 3000);
	    		
	    		
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getCusData() @ index.js");
            }
        });
}
function buildProgBar(a){
	var text = '';
	var length = a.response.result.length;
	for (var i = 1;i <= length;i++) {
		text += '<div class="form-control progNode weight'+i+'" id="progNode_'+a.response.result[i-1].quiz_id+'">'+i+
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
	rawData = sessionStorage['quizStatus'];
	cdata = JSON.parse(rawData);
	for(var i=0;i<cdata.length;i++){
		if (cdata[i].isFinnish == 'true') {
			$('#btn_'+cdata.id).addClass('ggez');
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
function buildQuizList(){
	var length = Index01.response.result.length;
	var qData = '';
	var text = '<div><center>';
	for(var i = 0;i<length;i++) {
	    var quiz_id = Index01.response.result[i].quiz_id;
	    var quiz_name = Index01.response.result[i].name;
	    var img = Index01.response.result[i].image;
	    var btn_order = '';
	    if (cdata[i] == undefined) {
	    	location.reload();
	    }else{
		    if (quiz_id == cdata[i].id) {
		    	btn_order = cdata[i].Order;
		    }
		}
	    var weight = Index01.response.result[i].weight;
	    var values = getBtnName(quiz_id);
	    text += '<div class="centered">'+
	    '<center>'+
	    '<button class="quizlist" style="display:none" qId="'+quiz_id+'" disabled id="btn_'+quiz_id+'" order="'+btn_order+'">'+
					'<div class="" style="cursor:pointer;width: 250px;height:350px;background-color: #c38d8d;padding: 5px;">'+
					    '<div style="position:relative;width:100%;height:75%;background-color: #00adff;">'+
					        '<img src="'+img+'" style="display:block">'+
					        	'<div class="overlay">'+
							    	'<div class="text">Finnished</div>'+
							  	'</div>'+
					    '</div>'+
						'<span style="position: relative;color: white;font-size: 22px;top: 20px;">'+values+'</span>'+
					'</div>'+
		'</button>'+
		'</center>'+    
	    '</div>'
	    qData += quiz_id+" ";
	    }
	    initialBtnOrder();
		console.log(" ");
		console.log("previous: "+previous+" | current: "+current)
		console.log("Type of previous: "+typeof(previous)+" | Type of current: "+typeof(current))
		console.log(" ");
	    text += '</center></div>';
	    console.log(qData);
	    $('#qlist').append(text);
	    $('.quizlist').click(function(){
		    sessionStorage['qId'] = this.getAttribute("qId");
			window.location = 'quiz.jsp?qId='+sessionStorage['qId']+'&player='+sessionStorage['player'];
		});
		setPrevious(previous);
		setCurrent(current);
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
	var length = Index01.response.result.length;
	$('.quizlist').removeClass('animated fadeInLeft fadeOutLeft fadeInRight fadeOutRight')
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
	var quiz_id = [];
	console.log(" ")
	console.log("%cprevious: "+p+" | current: "+b+" | next: "+n+"","color:red")
	console.log(" ")
	if (code == 'prev') {
		for(var i=0;i<length;i++){
			// console.log(preQuiz);
	    	var quiz_id = Index01.response.result[i].quiz_id;
	    	var pre_id = Index01.response.result[(p-1)].quiz_id;
	    	if($('#btn_'+quiz_id).attr('order') == b){
	    		$('#btn_'+quiz_id).addClass('animated fadeOutLeft');
	    		$("#btn_"+quiz_id).hide("slow");
	    		setTimeout(function(){ 
	    			console.log("")
	    			setTimeout(function(){ 
						$("#btn_"+pre_id).css("display", "block");
						$('#btn_'+pre_id).addClass('animated fadeInRight');
		    		}, 300);
	    		}, 350);

	    	}
// $("#id").css("display", "none");
// $("#id").css("display", "block");
	    }
	    p = p-1;
	    if (p<quizMin) {
		p = quizMax;
	}
	    n = n-1;
	    if (n<quizMin) {
		n = quizMax;
	}
		console.log("code: "+code+" | Previous: "+p+" | Next: "+n);
		$("#btn-pre").attr("prev",p);
	    $("#btn-next").attr("next",n);
	    return true;
	    

	}else if(code == 'next'){
		for(var i=0;i<length;i++){
			// console.log(preQuiz);
	    	var quiz_id = Index01.response.result[i].quiz_id;
	    	var next_id = Index01.response.result[(n-1)].quiz_id;
	    	if($('#btn_'+quiz_id).attr('order') == b){
	    		$('#btn_'+quiz_id).removeClass('animated fadeInLeft').addClass('animated fadeOutRight');
	    		$("#btn_"+quiz_id).hide("slow");
	    		setTimeout(function(){ 
	    			setTimeout(function(){ 
						$("#btn_"+next_id).css("display", "block");
						$('#btn_'+next_id).removeClass('animated fadeOutRight').addClass('animated fadeInLeft');
		    		}, 300);
	    		}, 350);

	    	}
// $("#id").css("display", "none");
// $("#id").css("display", "block");
	    }
	    p = p+1;
	    if (p>quizMax) {
		p = quizMin;
	}
	    n = n+1;
	    if (n>quizMax) {
		n = quizMin;
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



