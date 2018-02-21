var getQuizz = sessionStorage['mainUrl']+'Quiz/list?api_key='+sessionStorage['api_key'];
var previous = '';
var current = '';
var current_Index = '';
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
					// buildProgBar(data);
					setTimeout(function(){
					buildQuizList(function(){
						console.log('Finnished get buildQuizList')
						initialSwipes();
						$('#myModal').modal('hide');
					});
				},1000);
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
 	for(var i=0;i<cdata.length;i++){
 		// console.log("Enter For Loop. . . As: I = "+i+" | length = "+cdata.length+" | cdata"+i+" = "+cdata[i].id+" & "+cdata[i].isFinnish)
 		// console.log("Enter Else if in for loop as data id: "+cdata[i].id+' | sdasd: '+lockQuiz);
		if (cdata[i].isFinnish == true) {
			// console.log("Enter if in for loop as data id: "+cdata[i].id);
			$('#overlay_lo_'+cdata[i].id).css('display',"none");
			$('#overlay_fi_'+cdata[i].id).css('display',"block");
			$('#btn_'+cdata[i].id+' > div').addClass('ggez');
			$("#btn_"+cdata[i].id).prop("disabled",true);
		}else if (cdata[i].isFinnish == false) {
			// console.log("Enter Else if in for loop as data id: "+cdata[i].id);
			if (cdata[i].id != current) {
				$('#overlay_lo_'+cdata[i].id).css('display',"block");
				$('#overlay_fi_'+cdata[i].id).css('display',"none");
				$('#btn_'+cdata[i].id+' > div').addClass('ggez');
				$('#progNode_'+cdata[i].id).css('background-color',"#d9d9d9"); 
				$("#btn_"+cdata[i].id).prop("disabled",true);
			}
			else{
				$('#btn_'+cdata[i].id+' > div').removeClass('ggez');
				$("#btn_"+cdata[i].id).prop("disabled",false);
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
	var text = '';
	var text2 = '';
	// rawData = sessionStorage['quizStatus'];
	// cdata = JSON.parse(rawData);
	var disable = '';
	var rawData = JSON.parse(sessionStorage['quizStatus']);
	for(var i = 0;i<length;i++) {
	    var quiz_id = Index01.response.result[i].quiz_id;
	    var quiz_name = Index01.response.result[i].name;
	    var img = Index01.response.result[i].image;
	    var btn_order = Index01.response.result[i].weight;
	    var QuestImg = '';
	    for (var k = 0; k < rawData.length; k++) {
	    	if (rawData[k].id == quiz_id) {
	    		QuestImg = rawData[k].Image;
	    	}
	    }
	    var img_for_check = /[^/]*$/.exec(QuestImg)[0];
	    if (img_for_check == 'no_image.jpg') {
	    	QuestImg = 'img/Playbasis-logo.png';
	    }
	    // var img_for_check2 = /[^/]*$/.exec(img)[0];
	    // if (img_for_check2 == 'no_image.jpg') {
	    // 	img = 'img/Playbasis-logo.png';
	    // }
	    var weight = Index01.response.result[i].weight;
	    var values = contentSummary[quiz_id];
	    if (sessionStorage["isAdmin"] == 'false') {
	    	disable = 'disabled';
	    }
	  //   if ($(window).width() > 1024) {
	  //   	text += '<div class="centered">'+
		 //    '<center>'+
		 //    '<button class="quizlist" style="display:none" qId="'+quiz_id+'" '+disable+' id="btn_'+quiz_id+'" order="'+btn_order+'">'+
			// 			'<div class="btn_qList">'+
			// 			    '<div class="img-place">'+
			// 			        '<img src="'+img+'" style="display:block;width: 100%;height: 80%;">'+
			// 			        	'<div class="overlay">'+
			// 					    	'<div class="text" style="display:none" id="overlay_lo_'+quiz_id+'">Locked</div>'+
			// 					    	'<div class="text" style="display:none" id="overlay_fi_'+quiz_id+'">Finnished</div>'+
			// 					  	'</div>'+
			// 			    '</div>'+
			// 				'<p style="position: relative;color: white;font-size: 26px;top: 15px;margin-bottom: 25px;">'+values+'</p>'+
			// 			'</div>'+
			// '</button>'+
			// '</center>'+
			// '</div>'
	  //   }else{
	  	text += ' <div class="swiper-slide quizlist default-slide" style="display: inline-block;margin: auto;" order="'+btn_order+'" qId="'+quiz_id+'" id="btn_'+quiz_id+'">'+
      	'<div style="position: relative;width: 100%;height: 50%;overflow: hidden;border-top-right-radius: 15px;border-top-left-radius: 15px;background-color: #0000004a">'+
      		'<img src="'+img+'">'+
      		'<div style="position: absolute;bottom: 0px;width: 100%;background-color: #00ffff5c">Overlay'+
      		'</div>'+
      	'</div>'+
      	'<div style="position: relative;width: 100%;height: 36%;background: aqua;padding: 10px;">'+
      		'<div style="font-size:16px;font-weight:bolder;">'+values+'</div>'+
      		'<div style="font-size:11px;">Discription . . .</div>'+
      	'</div>'+
      	'<div style="position: absolute;bottom: 0px;width: 100%;text-align: center;"> Footer </div>'+
      '</div>'

	    text2 += '<button class="swiper-slide quizlist pre-box" order="'+btn_order+'" qId="'+quiz_id+'" id="btn_'+quiz_id+'">'+
      	'<div style="width: 100%;height: 100%;">'+
      	'<center>'+
      	'<div class="logo_preview" style="z-index:1">'+
      		'<img src="'+QuestImg+'">'+
      	'</div>'+
      	'<div style="margin-top: -30px;">'+
	      	'<img src="'+img+'" style="height: auto;border-top-left-radius: 5px;border-top-right-radius: 5px;">'+
	      	'<div class="overlay" style="height:100%;margin-top: 25px;border-radius: 5px;">'+
		    	'<div class="text" style="display:none" id="overlay_lo_'+quiz_id+'">Locked</div>'+
		    	'<div class="text" style="display:none" id="overlay_fi_'+quiz_id+'">Finished</div>'+
	  		'</div>'+
	    '</div>'+
	    '<div style="background-color: white;" >'+values+
	    '</div>'+
      	'</center>'+
      	'</div>'+
      '</button>'
	    // }
	    console.log($(window).width())
	    qData += quiz_id+" ";
	    }
	    // initialBtnOrder();
		console.log(" ");
		console.log("previous: "+previous+" | current: "+current)
		// console.log("Type of previous: "+typeof(previous)+" | Type of current: "+typeof(current))
		console.log(" ");
	    text += '';
	    console.log(qData);
	    // if ($(window).width() > 1024) {
	    // 	$('#quizlist').append(text);
	    // }else{
	    // 	$('#wipp_wrap').append(text);
	    // }
	    $('#swip_hot').append(text);
	    $('#swip_old').append(text2);
	    $('.swiper-slide').click(function(){
	    	var quizOrder = this.getAttribute("order");
	    	console.log(quizOrder)
	   //  	if(quizOrder == 3 && sessionStorage['loginType'] == 'guest'){
	   //  		$('#actionNeeded').modal({backdrop: 'static', keyboard: false});
	   //  	}else{
	   //  		sessionStorage['qId'] = this.getAttribute("qId");
				// window.location = 'quiz.jsp';
	   //  	}
	   			sessionStorage['qId'] = this.getAttribute("qId");
				window.location = 'quiz';
		});
		if (sessionStorage["isAdmin"] == 'true') {
			setVisableAll_P(previous);
			setVisableAll_C(current);
		}
		else if (sessionStorage['loginType'] == 'guest') {
			setPrevious(previous);
			setCurrent(current);
			isFinnished();
		}
		else {
			setPrevious(previous);
			setCurrent(current);
			isFinnished();
		}
		callback();
}
function initialSwipes(){
	var swiper1 = new Swiper('.swiper1', {
    	slidesPerView: 2,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination1',
        clickable: true,
      },
    });
    var swiper2 = new Swiper('.swiper2', {
    	slidesPerView: 2,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination2',
        clickable: true,
      },
    });
    var swiper3 = new Swiper('.swiper3', {
    	slidesPerView: 2,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination3',
        clickable: true,
      },
    });
}