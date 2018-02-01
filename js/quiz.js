var quizId = sessionStorage['qId'];
var player = sessionStorage['player'];
var token = sessionStorage['Token'];
var api_key = sessionStorage['api_key'];
sessionStorage['quizStatus'];
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
var select1;
var select2,test, test2, test3;
var answer, answer2,index,total;
var value, a,b,c,d,e;
var aa;
var choices = [];
var contentSummary=[];
var contentTitle =[]; 
var unit = '';
var ph = '';
var ttess = [];
var qStatus = [];
var result = [];
function getStatus(a, callback){
	console.log("Getting quiz status . . .");
	var length = a.length;
	var Ids = [];
	var k = 0;
	for(var i=0;i<length;i++){
		Ids.push(a[i].quiz_id);
		console.log("PUSH: "+i);
	}
	myLoop();
	function myLoop () {  
			    setTimeout(function () {    
				   	assignStatus(Ids[k],(k+1));
				   	// console.log("Time: "+k+" | Ids.length: "+Ids.length+" | Ids: %c"+Ids[k]+"","color:blue"," | Result: ?")              
					k++;                     
				if ((k-1) < Ids.length) {
					console.log("Call: "+(k));               
				    myLoop(); 
				    // console.log("In range: k = "+k+" of length = "+Ids.length+" //call my loop again")
				}else{
					console.log("Finnished");
					sessionStorage.setItem('quizStatus', JSON.stringify(qStatus));
					// console.log("Out of range: k = "+(k-1)+" of length = "+Ids.length)
					sortOrder();
					callback();
				}	
			}, 300); 
		}
		
	}
function assignStatus(a,b){
	console.log("Entered assign function as parameter: a = %c"+a+"","color:blue");
		$.ajax({
			type: "GET",
	        url: sessionStorage['mainUrl']+"Quiz/"+a+"/question?api_key="+api_key+"&player_id="+player,
	        dataType: "json",
		    success: function(data){
		    	Quiz02 = data;
		    	if (Quiz02.response != null) {
			    	if (Quiz02.response.result == null) { 
			    		// console.log("Quiz : %c"+a+""+" is "+"%cfinished","color:blue","color:green");
			    		qStatus.push({'id':a,'isFinnish':true,'Order':b});
			    		console.log(" ");
			    	}else{
			    		// console.log("Quiz : %c"+a+""+" is "+"%cunfinish yet","color:blue","color:red");
			    		qStatus.push({'id':a,'isFinnish':false,'Order':b});
			    		console.log(" ");
			    	}
			    }
		    },
		    error: function (xhr, textStatus, errorThrown){
	//          window.location.reload(true)
	            console.log(errorThrown);
	            console.log("Failed : getStatus(a) @ quiz.js ");
	        }	
		});
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

function getTopic(a){
	var content = JSON.parse(sessionStorage["contentData"]);
	var n = content.response.result.length;
	var qname = a.response.result.question;
	var _qname = a.response.result;
	var nn = a.response.result.options.length;
	console.log("Question: "+qname+" | Content: "+n+" | Type: "+type+" | Language: "+sessionStorage['lang']);

    topic = contentSummary[qname];
	title = contentTitle[qname];
	    			
	// console.log('Enter if');
	// console.log(type+" == \'SQ\' ?");
	if (type == 'SQ' || type == 'YN') {
		// console.log('Enter if2');
		for(var k=0;k<nn;k++){
			choices.push(contentSummary[_qname.options[k].description]);
			console.log(choices);		
		}
		
	}else if (type == 'TXT') {
		console.log("TXT");
		if (qname+"_PH" in contentTitle){
			ph = contentTitle[qname+"_PH"];
		}
			
		
	}
	else if (type == 'SLI' || type == 'SLI_S') {
		// console.log("TYPE:SLI||SLI_S");
		if (title.indexOf('How') > -1 && title.indexOf('old') > -1) {
			
			$('#unit').text(contentSummary['YEAR_OLD']);
				
		}else if (title.indexOf('have') > -1 && title.indexOf('kids') > -1) {
			
			if ($('.range-slider__range').val() > 0 && sessionStorage['lang'] == 'English') {
				$('#unit').text(contentSummary['KID']+"s")
			}else{
				$('#unit').text(contentSummary['KID']);
			}
		}
		if (type == 'SLI_S') {
			console.log("FIND NO");
			for(var k=0;k<nn;k++){
				choices.push(contentTitle[_qname.options[k].description]+contentSummary[_qname.options[k].description]);		
			}
			
		}
	}
	else if (true) {
		
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
	    sessionStorage['type'] = type;
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
	    		
	    			getTopic(data); 
	    			buildQuiz();
	    		
	    		
	    	}
	    },
	    error: function (xhr, textStatus, errorThrown){
         window.location.reload(true)
            console.log(errorThrown);
            console.log("Failed : getQuestion() @ quiz.js");
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
	    if (sessionStorage['save_result'] != undefined) {
	    	var a = JSON.parse(sessionStorage['save_result']);
	    	var ans_result = a.response.result.explanation;
	    	var get_score = a.response.result.grade.score;
	    	var max_this_score = a.response.result.grade.score;
	    	var cur_score = a.response.result.grade.total_score;
	    	var max_score = a.response.result.grade.total_max_score;
	    	console.log("")
	    	console.log("Your answer is : "+a.response.result.explanation)
	    	console.log("Get :"+get_score+" score of "+max_this_score)
	    	console.log("Total score: "+cur_score+" score of "+max_score)
	    	console.log("")
	    }
	    a = parseInt(rMin);
	    b = parseInt(rMax);
	    c = parseInt(interval);
	    	document.getElementById("quizImg").style.backgroundImage = 'url('+QuestImg+')';
	    	$('#topic').text(topic);
	    	if (type == 'SQ') {
	    		document.getElementById("4Play").style.display = "none";
		    	for (var i=0;i<option.length;i++) {
		    		text+='<input class="inputTXT" type="radio" name="'+topic+'" typeZ="SQ" value="'+option[i].option_id+'"><p>'+choices[i]+'</p><br>'
		    		console.log(choices[i]);
		    	}
	    	}else if(type == 'YN'){
	    		document.getElementById("4Play").style.display = "none";
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
	    		text+='<textarea class="form-control inputTXT" rows="8" placeholder="'+ph+'" typeZ="TXT"></textarea>'
	    		select1 = Quiz01.response.result.options[0].option_id;
	    		
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
	    		$('#hidSLIval').val(b/2);
	    		$('#minslider').text(rMin);
	    		$('#maxslider').text(rMax);
	    		select1 = Quiz01.response.result.options[0].option_id;
	    	}
	    	else if(type == 'SLI_S'){
	    		$("#slider-panel").addClass("inputTXT");
	    		document.getElementById("slider-panel").style.display = "block";
	    		document.getElementById("4Play").style.display = "block";
	    		document.getElementById("slider-bar").setAttribute("value", (b/2).toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("min", a.toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("max", b.toLocaleString());
	    		document.getElementById("slider-bar").setAttribute("step", c.toLocaleString());
	    		$('#disValueSli').text(b/2);
	    		$('#hidSLIval').val(b/2);
	    		$('#minslider').text(rMin);
	    		$('#maxslider').text(rMax);
	    		select1 = Quiz01.response.result.options[2].option_id;
	    	}
	    	$('#choice').append(text);
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
			getToastrOption();
	    	toastr["info"]("Please wait for 1-2 sec.", "Successful");
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
	}else if(type == 'SLI' || type == 'SLI_S'){
			var b = sessionStorage['ans_no'];
			var u = $('#unit').text();
			capitalizeFirstLetter(b);
			var c = $('#hidSLIval').val();
			var d = b+", "+c+" "+u;
			var e = c+" "+u;
			console.log(d);
			console.log(e);
		if (sessionStorage['ans_no'] == 'yes' || sessionStorage['ans_no'] == 'null') {
			if (!validSLI()) {
				getToastrOption();
		    	toastr["warning"]("undefined", "Hint!");
		    	return false;
			}else{
				for(var i=0;i<Quiz01.response.result.options.length;i++){
					if (Quiz01.response.result.options[i].is_text_option) {
						console.log("Select"+i+" : "+i+" | C : "+c+" = "+Quiz01.response.result.options[i].option_id);
						
							select1 = Quiz01.response.result.options[i].option_id;
							console.log("Select1: "+select1);
						
					}
				}
				if (type == 'SLI_S') {
					answer = d;
					console.log("d : "+d);
				}
				if (type == 'SLI') {
					answer = e;
					console.log("e : "+e);
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
	}else if(type == 'RANGE' || type == 'RANGE_S'){
		if (sessionStorage['ans_no'] == 'yes' || sessionStorage['ans_no'] == 'null') {
			if (!validRANGE()) {
				getToastrOption();
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
			getToastrOption();
	    	toastr["warning"]("Please select one of choices.", "Hint!");
	    	return false;
		}else{
			return true;
		}
	}else if(type == 'SQ'){
		inputType = 'SQ';
		if (!validSQ()) {
			getToastrOption();
	    	toastr["warning"]("Please select one of choices.", "Hint!");
	    	return false;
		}else{
			return true;
		}
		
	}else if(type == 'MULTI'){
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
function validEmail(){

}
function nextQuestion(){
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
			sessionStorage.setItem("save_result", JSON.stringify(Gtemp_02));
			sessionStorage['isLast'] = Gtemp_02.response.result.is_last_question;
			sessionStorage.setItem("graded", JSON.stringify(Gtemp_02.response.result.grade))
			savePrevious();
			if (Gtemp_02.response.result.is_last_question) {
				sessionStorage.setItem("reward", JSON.stringify(Gtemp_02.response.result.rewards))
				scorePop(Gtemp_02.response.result.grade, Gtemp_02.response.result.rewards);
				console.log("Hey! it is the last now! check the console about reward!")
			}else{
				toastr["info"]("Please wait for 1-2 sec. You're going to next question", "Successful");
				setTimeout(function(){ location.reload(); }, mathRand);
			}
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : nextQuestion() @ quiz.js");
            }
        });
}
function scorePop(a,b){
	// var get_grade = JSON.parse(sessionStorage['graded']);
	var total_score = a.total_score;
	var max_score = a.total_max_score;
	var gr_rank = a.rank;
	var gr_rank_img = a.rank_image;
	var gr_grade = a.grade;
	var img = '';
	swal({
		title: total_score+" / "+max_score,
		imageUrl: gr_rank_img,
		confirmButtonText: "Ok!",
  		closeOnConfirm: true
  		},
		function(){
			var i = 0;
			initialProp();
				function initialProp(){
					if (b[i].value >= 1) {
						console.log(" ")
						console.log("Enter if in for loop b["+i+"].value >= 1 | "+b[i].value)
						console.log(" ")
						var re_id = b[i].reward_id;
						var re_type = b[i].reward_type;
						var re_value = b[i].value;
						var re_event = b[i].event_type;
						console.log(" ")
						console.log("re_id: "+re_id+" | re_type: "+re_type+" | re_value: "+re_value+" | re_event: "+re_event)
						console.log(" ")
						if (re_type == "badge") {
							var badge_img = b[i].reward_data.image;
							var badge_name = b[i].reward_data.name;
							buildModal(re_type,re_value,badge_img,badge_name);
							console.log(" ")
							console.log("Enter re_type:"+re_type+" == badge | sent to: buildModal("+re_type+","+re_value+","+badge_img+","+badge_name+")")
							console.log(" ")
						}else if (re_type == "exp"){
							buildModal(re_type,re_value,null,null);
							console.log(" ")
							console.log("Enter re_type:"+re_type+" == exp | sent to: buildModal("+re_type+","+re_value+","+badge_img+","+badge_name+")")
							console.log(" ")
					  	}
					  	else if (re_type == "point"){
							buildModal(re_type,re_value,null,null);
							console.log(" ")
							console.log("Enter re_type:"+re_type+" == point | sent to: buildModal("+re_type+","+re_value+","+badge_img+","+badge_name+")")
							console.log(" ")
					  	}
					  	else if(re_event == "LEVEL_UP"){
					  		buildModal(re_type,re_value,null,null);
							console.log(" ")
							console.log("Enter re_type:"+re_type+" == point | sent to: buildModal("+re_type+","+re_value+","+badge_img+","+badge_name+")")
							console.log(" ")
					  	}
					}else{
						if ((i+1) < b.length) {
					  		console.log(i+" < "+b.length);
					  		i+=1;
					  		initialProp();
					  	}
					}
					$("#myScore").modal({backdrop: "static"});
			}
			function buildModal(typer,valuer,imgr,badgeN,callback){
				var imgss = '';
				var text = '';
				var got = 'You got <span class="highlight">'+valuer+'</span> '+typer;
				var imgee = '<img src="img/con1.png">'
				if (typer == 'exp') {
					imgss = 'img/EXP.png';
				}else if (typer == 'point') {
					imgss = 'img/Mission_1.png';
				}
				else{
					got = 'You got <span class="highlight">'+valuer+' '+badgeN+'</span> '+typer;
					imgss = imgr;
				}
				text += '<div class="modal fade" id="myScore" role="dialog">'+
			    '<div class="modal-dialog">'+
			      '<!-- Modal content-->'+
			      '<div class="modal-content">'+
			        '<div class="modal-header">'+
					    '<h3>'+imgee+'</h3>'+
					    '<h4>'+got+'</h4>'+
					'</div>'+
			        '<div class="modal-body">'+
			          	'<img src="'+imgss+'">'+
			        '</div>'+
			        '<div class="modal-footer">'+
			          ' <button type="submit" class="btn btn-primary closeM">Ok!'+
			        '</div>'+
			      '</div>'+
			    '</div>'+
			  '</div> '
			  $('#modal_score').append(text);
			  $('.closeM').click(function(){
			  	$("#myScore").modal("hide");
			  	$("#modal_score > div").remove();
			  	$(".modal-backdrop").remove();
			  	if ((i+1) < b.length) {
			  		console.log(i+" < "+b.length);
			  		i+=1;
			  		initialProp();
			  	}
			  	else{
			  		swal({
					  title: "Completed",
					  text: "That's all you got, we're bringing you to main menu!",
					  type: "success",
					  confirmButtonClass: "btn-primary",
					  confirmButtonText: "Ok!",
					  closeOnConfirm: false
					},
					function(){
						setTimeout(function(){
							window.location.replace("index.jsp");
						},500)
					});
			  	}
			  });
			}
			// $("#myScore").modal("toggle");
			// console.log(" ")
			// console.log("Out of loop. . .")
			// console.log(" ")
		});
	
}

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









