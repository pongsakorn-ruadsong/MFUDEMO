var getQuizz = sessionStorage['mainUrl']+'Quiz/list?api_key='+sessionStorage['api_key'];
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
					// sortOrder();
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
function buildQuizList(callback){
	var length = Index01.response.result.length;
	var qData = '';
	var text = '';
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
	    	text += '<button class="swiper-slide quizlist pre-box" order="'+btn_order+'" qId="'+quiz_id+'">'+
      	'<div style="width: 100%;height: 100%;">'+
      	'<center>'+
      	'<div class="logo_preview">'+
      		'<img src="'+QuestImg+'">'+
      	'</div>'+
      	'<div>'+
	      	'<img src="'+img+'" style="height: auto;margin-top: -30px;border-top-left-radius: 5px;border-top-right-radius: 5px;">'+
	    '</div>'+
	    '<div style="background-color: white;">'+values+
	    '</div>'+
      	'</center>'+
      	'</div>'+
      '</button>'
	    // }
	    console.log($(window).width())
	    qData += quiz_id+" ";
	    }
	    // initialBtnOrder();
		// console.log(" ");
		// console.log("previous: "+previous+" | current: "+current)
		// // console.log("Type of previous: "+typeof(previous)+" | Type of current: "+typeof(current))
		// console.log(" ");
	    text += '';
	    console.log(qData);
	    // if ($(window).width() > 1024) {
	    // 	$('#quizlist').append(text);
	    // }else{
	    // 	$('#wipp_wrap').append(text);
	    // }
	    $('#swip_hot').append(text);
	    $('.quizlist').click(function(){
	    	var quizOrder = this.getAttribute("order");
	    	console.log(quizOrder)
	   //  	if(quizOrder == 3 && sessionStorage['loginType'] == 'guest'){
	   //  		$('#actionNeeded').modal({backdrop: 'static', keyboard: false});
	   //  	}else{
	   //  		sessionStorage['qId'] = this.getAttribute("qId");
				// window.location = 'quiz.jsp';
	   //  	}
	   			sessionStorage['qId'] = this.getAttribute("qId");
				window.location = 'quiz.jsp';
		});
		// if (sessionStorage["isAdmin"] == 'true') {
		// 	setVisableAll_P(previous);
		// 	setVisableAll_C(current);
		// }else {
		// 	setPrevious(previous);
		// 	setCurrent(current);
		// 	isFinnished();
		// }
		callback();
}
function initialSwipes(){
	var swiper1 = new Swiper('.swiper1', {
    	loop: true,
    	centeredSlides: true,
    	slidesPerView: 3,
      spaceBetween: 8,
      loopAdditionalSlides: 10,
      pagination: {
        el: '.swiper-pagination1',
        clickable: true,
      },
    });
    var swiper2 = new Swiper('.swiper2', {
    	loop: true,
    	centeredSlides: true,
    	slidesPerView: 3,
      spaceBetween: 8,
      loopAdditionalSlides: 10,
      pagination: {
        el: '.swiper-pagination2',
        clickable: true,
      },
    });
    var swiper3 = new Swiper('.swiper3', {
    	loop: true,
    	centeredSlides: true,
    	slidesPerView: 3,
      spaceBetween: 8,
      loopAdditionalSlides: 10,
      pagination: {
        el: '.swiper-pagination3',
        clickable: true,
      },
    });
}