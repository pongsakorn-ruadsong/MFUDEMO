var quizId = sessionStorage['qId'];
var player = sessionStorage['player'];
var token = sessionStorage['Token'];
var api_key = sessionStorage['api_key'];
var getQuestUrl = sessionStorage['mainUrl']+"Quiz/"+quizId+"/question?api_key="+api_key+"&player_id="+player;
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
var select;
var select2,test, test2;
var answer, answer2,index,total;
var value, a,b,c,d,e;
var z,data,aa;
var choices = []; 
var unit = '';
var ph = '';
function getStatus(a){
	$.ajax({
			type: "GET",
	        url: sessionStorage['mainUrl']+"Quiz/"+a+"/question?api_key="+api_key+"&player_id="+player,
	        dataType: "json",
		    success: function(data){
		    	Quiz02 = data;
		    	if (Quiz02.response.result == null) { //no question. need reset
		    		z = true;
		    		document.getElementById(a).style.backgroundColor = "#6A6569";
		    		document.getElementById(a).disabled = true;
		    		document.getElementById("progNode_"+a).style.backgroundColor = "red";
		    		document.getElementById("progNode_"+a).disabled = true;
		    	}else{
			    	if (Quiz02.response.result.total == Quiz02.response.result.index) { //last question. alert to user.
			    		z = true;
			    		document.getElementById(a).style.backgroundColor = "#FBDDF3";
			    	}else{
			    		z = false;
			    		document.getElementById(a).disabled = false;
			    	}
		    	}
		    },
	    error: function (xhr, textStatus, errorThrown){
//          window.location.reload(true)
            console.log(errorThrown);
            alert("Failed : getStatus(a) @ quiz.js ");
        }	
	});
}
function getContent(){
	$.ajax({
		type: "GET",
        url: 'https://api.pbapp.net/Content?api_key='+sessionStorage['api_key']+'&player_id='+sessionStorage['player']+'&language='+sessionStorage['lang'],
        dataType: "json",
	    success: function(d){
	    	data = d;
	    	console.log(data);
	    },
	    error: function (xhr, textStatus, errorThrown){
//          window.location.reload(true)
            console.log(errorThrown);
            alert("Failed : getContent() @ quiz.js");
        }	
	});
}
function getTopic(a){
	var n = data.response.result.length;
	var qname = a.response.result.question;
	console.log(qname);
	for(var i=0;i<n;i++){
		// console.log(qname+" == "+data.response.result[i].node_id+" ?");
	    		if (qname == data.response.result[i].node_id) {
	    			topic = data.response.result[i].summary;
	    			title = data.response.result[i].title;
	    			// console.log('Enter if');
	    			// console.log(type+" == \'SQ\' ?");
	    			if (type == 'SQ' || type == 'YN') {
	    				// console.log('Enter if2');
		    			for(var k=0;k<n;k++){
		    				if (qname+"_" == (data.response.result[k].node_id).substring(0,5)) {
		    					choices.push(data.response.result[k].title);
		    				}
		    			}
	    			}else if (type == 'TXT') {
	    				for(var k=0;k<n;k++){
		    				if (qname+"_" == (data.response.result[k].node_id).substring(0,5)) {
		    					ph = data.response.result[k].title;
		    				}
		    			}
	    			}
	    			else if (type == 'SLI') {
	    				if (title.indexOf('How') > -1 && title.indexOf('old') > -1) {
	    					for(var k=0;k<n;k++){
		    				if (data.response.result[k].node_id == 'YEAR_OLD') {
		    						$('#unit').text(data.response.result[k].title);
			    				}
			    			}
	    				}else if (title.indexOf('have') > -1 && title.indexOf('kids') > -1) {
	    					var kid = "kid";
	    					if ($('.range-slider__range').val() == 0) {
	    						$('#unit').text(" "+kid+"s");
	    					}else{
	    						$('#unit').text(" "+kid);
	    					}
	    				}
	    				if (Quiz01.response.result.options.length > 3) {

	    				}
	    			}
	    			else if (true) {
	    				
	    			}
	    		}
	    		else{
	    			// console.log('Out if')
	    		}
	    	}
}
function getQuestion(){
	$.ajax({
		type: "GET",
        url: getQuestUrl,
        dataType: "json",
	    success: function(data){
	    Quiz01 = data;
	    sessionStorage.setItem("cur_Quest", JSON.stringify(Quiz01));
	    var cur_Quest = sessionStorage.getItem("cur_Quest");
	    type = Quiz01.response.result.question_type;
	    console.log(data);
	    test = JSON.parse(cur_Quest);
	    if (Quiz01.response.result == null) {
	    	swal({
			  title: "What's going on?",
			  text: "You have answered all quiz questions. Do you want to reset it?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonClass: "btn-danger",
			  confirmButtonText: "Yes, reset it",
			  cancelButtonText: "No, go back",
			  closeOnConfirm: false,
			  closeOnCancel: false
			},
			function(isConfirm) {
			  if (isConfirm) {
			  	resetQuiz();
			    swal("Reseted!", "The quiz has been reseted!.", "success");
			    setTimeout(function(){ location.reload(); }, 1500);
			  } else {
			    window.location.replace("index.jsp");
			  }
			});
	    }else{
	    		$('#myModal').modal({backdrop: 'static', keyboard: false})  
	    		setTimeout(function(){ 
	    			$('#myModal').modal('hide');
	    			getTopic(data); 
	    			buildQuiz();
	    		}, 1500);
	    		
	    	}
	    },
	    error: function (xhr, textStatus, errorThrown){
         window.location.reload(true)
            console.log(errorThrown);
            alert("Failed : getQuestion() @ quiz.js");
        }	
	});
}
function buildQuiz(){
		var text = '';
	    var option = Quiz01.response.result.options;
	    var QuestImg = Quiz01.response.result.question_image;
	    questId = Quiz01.response.result.question_id;
	    var rMin = Quiz01.response.result.options[0].range_min;
	    var rMax = Quiz01.response.result.options[0].range_max;
	    var interval = Quiz01.response.result.options[0].range_interval;
	     index = Quiz01.response.result.index;
	     total = Quiz01.response.result.total;
	    chkIndex();
	    a = parseInt(rMin);
	    b = parseInt(rMax);
	    c = parseInt(interval);
	    	document.getElementById("quizImg").style.backgroundImage = 'url('+QuestImg+')';
	    	$('#topic').text(topic);
	    	if (type == 'SQ') {
		    	for (var i=0;i<option.length;i++) {
		    		text+='<input class="inputTXT" type="radio" name="'+topic+'" typeZ="SQ" value="'+option[i].option_id+'"><p>'+choices[i]+'</p><br>'
		    	}
	    	}else if(type == 'YN'){
	    		for (var i=0;i<option.length;i++) {
	    			text+='<input class="inputTXT" type="radio" name="'+topic+'" typeZ="YN" value="'+option[i].option_id+'"><p>'+choices[i]+'</p><br>'
	    			}
	    	}
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
	    		document.getElementById("realDeal").style.display = "block";
	    		select = Quiz01.response.result.options[1].option_id;
	    		select2 = Quiz01.response.result.options[2].option_id;
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
	    		document.getElementById("4Play").style.display = "block";
	    		select = Quiz01.response.result.options[1].option_id;
	    		select2 = Quiz01.response.result.options[2].option_id;
	    		
	    	}
	    	else if(type == 'TXT'){
	    		text+='<textarea class="form-control inputTXT" rows="8" placeholder="'+ph+'" typeZ="TXT"></textarea>'
	    		select = Quiz01.response.result.options[0].option_id;
	    		
	    	}
	    	else if(type == 'MULTI'){
	    		text+=''
	    	}
	    	else if(type == 'SLI'){
	    		$("#slider-panel").addClass("inputTXT");
	    		document.getElementById("slider-panel").style.display = "block";
	    		document.getElementById("realDeal").style.display = "block";
	    		document.getElementById("slider-bar").setAttribute("value", (b/2).toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("min", a.toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("max", b.toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("step", c.toLocaleString());
	    		$('#disValueSli').text(b/2);
	    		$('#minslider').text(rMin);
	    		$('#maxslider').text(rMax);
	    		select = Quiz01.response.result.options[0].option_id;
	    	}
	    	else if(type == 'SLI_S'){
	    		$("#slider-panel").addClass("inputTXT");
	    		document.getElementById("slider-panel").style.display = "block";
	    		document.getElementById("slider-bar").setAttribute("value", (b/2).toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("min", a.toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("max", b.toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("step", c.toLocaleString());
	    		$('#disValueSli').text(b/2);
	    		$('#minslider').text(rMin);
	    		$('#maxslider').text(rMax);
	    		select = Quiz01.response.result.options[0].option_id;
	    	}
	    	$('#choice').append(text);
}
function chkIndex(){
	if (index == total) {
	    	sessionStorage['isLast'] = "true";
	    	swal({
			  title: "Hoorayy!",
			  text: "Finally! This question is the last! ("+index+"/"+total+")",
			  imageUrl: 'img/thumbs-up.png'
			});
	    }
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
	    	toastr["info"]("Please wait for 1-2 sec.", "Successful");
	    	setTimeout(function(){ location.reload(); }, 1500);
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                alert("Failed : resetQuiz() @ quiz.js");
            }
	});
}
function savePrevious(){
	sessionStorage['past_Quest'] = sessionStorage['cur_Quest'];
	var past_Quest = sessionStorage['past_Quest'];
	console.log(past_Quest);
	test2 = JSON.parse(past_Quest);
}
function valid(){

	if ($('.inputTXT').attr('typeZ') == 'TXT') {
		inputType = 'TXT';
		if (isEmptyTXT()) {
			getToastrOption();
	    	toastr["warning"]("Please put something in the box.", "Hint!");
	    	return false;
		}else if(isTooShortTXT()){
			getToastrOption();
	    	toastr["warning"]("The text is too short.", "Hint!");
	    	return false;
		}else{
			answer = $('.inputTXT').val();
			return true;
		}
	}else if($('.inputTXT').attr('typeZ') == 'SLI' || $('.inputTXT').attr('typeZ') == 'SLI_S'){
		inputType = 'SLI';
		if (!validSLI()) {
			getToastrOption();
	    	toastr["warning"]("undefined", "Hint!");
	    	return false;
		}else{
			answer = $('#hidSLIval').val();
			return true;
		}
	}else if(type == 'RANGE' || type == 'RANGE_S'){
		if (!validRANGE()) {
			getToastrOption();
	    	toastr["warning"]("The gap between min and max must not more than 10% ("+percentage(b,10).toLocaleString()+").", "Hint!");
	    	return false;
		}else{
			answer = getSelectValue()[0];
			answer2 = getSelectValue()[1];
			return true;
		}
	}else if($('.inputTXT').attr('typeZ') == 'YN'){
		inputType = 'YN';
		if (!validYN()) {
			getToastrOption();
	    	toastr["warning"]("Please select one of choices.", "Hint!");
	    	return false;
		}else{
			return true;
		}
	}else if($('.inputTXT').attr('typeZ') == 'SQ'){
		inputType = 'SQ';
		if (!validSQ()) {
			getToastrOption();
	    	toastr["warning"]("Please select one of choices.", "Hint!");
	    	return false;
		}else{
			return true;
		}
		
	}else if($('.inputTXT').attr('typeZ') == 'MULTI'){
		inputType = 'MULTI';
		validMU();
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
	if ($('.inputTXT').val().length <= 6) {
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
	        select = radios[i].value; 
	    }
	}
	if (select != undefined) {
		return true;
	}else{
		return false;
	}
}
function validEmail(){

}
function nextQuestion(){
	var data = new Object();
        data.token = sessionStorage['Token'];
        data.player_id = sessionStorage['player'];
        data.question_id = questId;
        if (answer != undefined) {
        	data.answer = answer;
        	if (answer2 != undefined) {
       		data.answer = answer+","+answer2;
       		}
       		if (select2 != undefined) {
       		data.option_id = select+","+select2;
       		}
       	}
       	data.option_id = select;
        tokenUrl = sessionStorage['mainUrl']+"Quiz/"+sessionStorage['qId']+"/answer"
	$.ajax({
		type: "POST",
		url: tokenUrl,
		content: "application/json; charset=utf-8",
		dataType: "json",
		data: data,
		success: function(d) {
			Gtemp_02 = d;
			sessionStorage['isLast'] = Gtemp_02.response.result.is_last_question;
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                alert("Failed : nextQuestion() @ quiz.js");
            }
        });
	
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









