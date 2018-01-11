var quizId = sessionStorage['qId'];
var player = sessionStorage['player'];
var token = sessionStorage['Token'];
var api_key = sessionStorage['api_key'];
var Gtemp_01 = [];
var quesionId = null;
var getQuestUrl = sessionStorage['mainUrl']+"Quiz/"+quizId+"/question?api_key="+api_key+"&player_id="+player;
var inputType = '';
function getQuestion(){
	$.ajax({
		type: "GET",
        url: getQuestUrl,
        dataType: "json",
	    success: function(data){
	    Gtemp_01 = data;
	    var text = '';
	    var topic = Gtemp_01.response.result.question;
	    var option = Gtemp_01.response.result.options;
	    var QuestImg = Gtemp_01.response.result.question_image;
	    var type = Gtemp_01.response.result.question_type;
	    	document.getElementById("quizImg").style.backgroundImage = 'url('+QuestImg+')';
	    	$('#topic').text(topic);
	    	if (type == 'SQ') {
		    	for (var i=0;i<option.length;i++) {
		    		text+='<p>'+option[i].option+'</p>'
		    	}
	    	}else if(type == 'YN'){
	    		text+='<textarea class="form-control input" rows="8" placeholder="Put your address..."></textarea>'
	    	}
	    	else if(type == 'SCROL'){
	    		var script1 = document.createElement('script');
			    script1.type = 'text/javascript';
			    script1.src = 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js';
			    document.body.appendChild(script1);
			    var script2 = document.createElement('script');
			    script2.type = 'text/javascript';
			    script2.src = 'http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js';
			    document.body.appendChild(script2);
	    		text+='<div class="slider-wrapper">'+
'				      <div id="slider-range"></div>'+
'				      <div class="range-wrapper">'+
'				        <div class="range"></div>'+
'				        <div class="range-alert">+</div>'+
'				        <div class="gear-wrapper">'+
'				          <div class="gear-large gear-one">'+
'				            <div class="gear-tooth"></div>'+
'				            <div class="gear-tooth"></div>'+
'				            <div class="gear-tooth"></div>'+
'				            <div class="gear-tooth"></div>'+
'				          </div>'+
'				          <div class="gear-large gear-two">'+
'				            <div class="gear-tooth"></div>'+
'				            <div class="gear-tooth"></div>'+
'				            <div class="gear-tooth"></div>'+
'				            <div class="gear-tooth"></div>'+
'				          </div>'+
'				        </div>'+
'				      </div>'+
'	      <div class="marker marker-0"><sup>$</sup>10,000</div>'+
'	      <div class="marker marker-25"><sup>$</sup>35,000</div>'+
'	      <div class="marker marker-50"><sup>$</sup>60,000</div>'+
			'      <div class="marker marker-75"><sup>$</sup>85,000</div>'+
			'	      <div class="marker marker-100"><sup>$</sup>110,000+</div>'+
			'	    </div>'
	    	}
	    	else if(type == 'TXT'){
	    		text+='<textarea class="form-control input" rows="8" placeholder="Put your address..." type="TXT"></textarea>'
	    	}
	    	$('#choice').append(text);
	    },
	    error: function (xhr, textStatus, errorThrown){
//          window.location.reload(true)
            console.log(errorThrown);
            alert("Failed");
        }	
	});
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
			getToastrOption();
	    	toastr["info"]("Please wait for 3 sec.", "Successful");
	    	setTimeout(function(){ window.location.replace("index.jsp"); }, 3000);
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                alert("Failed");
            }
	});
}
function valid(){
	if ($('.input').attr('type') == 'TXT') {
		inputType = 'TXT';
		isEmptyTXT()
		isTooShortTXT()
	}else if($('.input').attr('type') == 'SCROL'){
		inputType = 'SCROL';
		validSCROL();
	}else if($('.input').attr('type') == 'YN'){
		inputType = 'YN';
		validYN();
	}else if($('.input').attr('type') == 'SQ'){
		inputType = 'SQ';
		validSQ();
	}
}
function isEmptyTXT(){
	if ($('.input').val() == '') {
		return true;
	}else{
		return false;
	}
}
function isTooShortTXT(){
	if ($('.input').val().length <= 6) {
		return true;
	}else{
		return false;
	}
}
function validSCROL(){
	
}
function validYN(){
	
}
function validSQ(){
	
}
function validEmail(){

}









