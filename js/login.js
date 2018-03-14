var Glob_Login;
var contentData;
sessionStorage['api_key'] = '141073538';
sessionStorage['api_sec'] = '21e3386d7b6cc594784209af889063d2';
sessionStorage['subUrl'] = 'http://10.49.67.156/api/';
sessionStorage['mainUrl'] = 'https://api.pbapp.net/';
sessionStorage['isLast'] = "false";
sessionStorage['auth'] = 'false';
function analyzePhonenum(code,numbers){
	var number = numbers;
	var n = number.indexOf("0");
	console.log(number+' | '+n)
	if (n == 0) {
		var tempNum = number.substr(1);
		number = code+tempNum;
		console.log(tempNum+' | '+number)
	}else{
		console.log('N != 0 by n = '+n)
		number = code+tempNum;
		console.log(tempNum+' | '+number)
	}
	console.log('Out of if: return. . .')
	return number;
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
	console.log(position);
	console.log("Latitude: " + position.coords.latitude);
	console.log("Longitude: " + position.coords.longitude);
	getWeather(position.coords.latitude, position.coords.longitude,function(data){
		// $('.card-box').css('display','block');
		// $('.card-box').addClass('fadeInDown');
	});
}
function getWeather(a,b,callback){
	console.log(a+' | '+b)
	var openWeatherMap = 'https://api.openweathermap.org/data/2.5/weather'
	    $.getJSON(openWeatherMap, {
	        lat: a,
	        lon: b,
	        units: 'metric',
	        APPID: 'bb2ab1ec0121db5d9a8bffeca8257694'
	    }).done(function(weather) {
	    	sessionStorage.setItem("weather", JSON.stringify(weather));
	        console.log(weather)
	        callback(weather);
	    })
}
function showError(error) {
	console.log(error);
    switch(error.code) {
        case error.PERMISSION_DENIED:
        	console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
        	console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
        	console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
        	console.log("An unknown error occurred.")
            break;
    }
}
function requestOtp(player_id){
	var data = new Object();
	data.token = sessionStorage['Token'];
	data.id = player_id;
	console.log(data)
	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/auth/'+player_id+'/requestOTPCode',
        data:data,
        dataType: "json",
        async: false,
	    success: function(d){
	    	if (d.success == false) {
	    		// sessionStorage['auth'] = "false";
	    		console.log("d")
	    		// sessionStorage['player'] = null;
	    	}else{
	    		// sessionStorage['setupOtp_phonenum'] = phone_num;
	    		// sessionStorage['auth'] = "true";
	    		// sessionStorage['username'] = number;
	    		// sessionStorage['player'] = player_id;
	    		console.log("e")
	    	}
	    	console.log(d);
	    },
	    error: function (xhr, textStatus, errorThrown){
         	window.location.reload(true)
			sessionStorage['auth'] = false;
            console.log(errorThrown);
            console.log("Failed : requestOtp() @ login.js");
        }	
	});
}
function requestOtpSetup(id,code,number,fullnum){
	console.log("Entering . . .")
	var player_id = id;
	var tel_code = code;
	var phone_num = '';
	// console.log(player_id+' | '+tel_code)
	// console.log(typeof(player_id)+' | '+typeof(tel_code))
	if (code != null && number != null && fullnum == null) {
		phone_num = analyzePhonenum(code,number);
	}
	else if(code == null && number == null && fullnum != null){
		phone_num = fullnum;
	}
	else{
		console.log('Error at login.js function: requestOtpSetup() by: phone_num = '+phone_num+" | "+code+' | '+number+' | '+id);
	}
	var data = new Object();
	data.token = sessionStorage['Token'];
	data.id = id;
	data.phone_number = phone_num;
	console.log(data)
	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/auth/'+id+'/setupPhone',
        data:data,
        dataType: "json",
        async: false,
	    success: function(d){
	    	if (d.success == false) {
	    		// sessionStorage['auth'] = "false";
	    		console.log("d")
	    	}else{
	    		// sessionStorage['setupOtp_phonenum'] = phone_num;
	    		// sessionStorage['auth'] = "true";
	    		// sessionStorage['username'] = number;
	    		console.log("e")
	    	}
	    	console.log(d);
	    },
	    error: function (xhr, textStatus, errorThrown){
         	window.location.reload(true)
			sessionStorage['auth'] = false;
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
}
function getUnverifyPlayer(id,callback){
	var data = new Object();
	data.id = id;
	data.token = sessionStorage['Token'];
	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/'+id,
        data:data,
        dataType: "json",
        async: false,
	    success: function(d){
	    	if (d.success == false) {
	    		console.log("d")
	    	}else{
	    		console.log("e")
	    	}
	    	console.log(d);
	    	callback(d.response.player.phone_number);
	    },
	    error: function (xhr, textStatus, errorThrown){
         	window.location.reload(true)
			sessionStorage['auth'] = false;
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
}
function registerUser(code,number,callback){
	var data = new Object();
	var user_id = makeid(40);
	data.token = sessionStorage['Token'];
	data.id = user_id;
	data.username = number;
	data.email = 'qa1+'+number+'@playbasis.com';
	data.phone_number = analyzePhonenum(code,number);
	data.password = 'playbasis';
	data.approve_status = 'pending';
	console.log(data)
	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/'+user_id+'/register',
        data:data,
        dataType: "json",
        async: false,
	    success: function(d){
			Glob_regis = d;
	    	if (d.success == false) {
	    		sessionStorage['regisStatus'] = "false";
	    		console.log("d")
	    	}else{
	    		sessionStorage['regisStatus'] = "true";
	    		// sessionStorage['username'] = number;
	    		console.log("e")
	    	}
	    	console.log(d);
	    	sessionStorage['regisUsername'] = number;
	    	sessionStorage['regisID'] = user_id;
	    	callback(user_id,code,number);
	    },
	    error: function (xhr, textStatus, errorThrown){
         	window.location.reload(true)
			sessionStorage['auth'] = false;
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
	// callback();
}
function performOTP(code, player_id, from, callback){
	var data = new Object();
	data.token = sessionStorage['Token'];
	data.id = player_id;
	data.code = code;
	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/auth/'+player_id+'/verifyOTPCode',
        data:data,
        dataType: "json",
        async: false,
	    success: function(d){
			// Glob_regis = d;
			var result = false;
	    	if (d.success == false) {
	    		console.log("d")
	    		sessionStorage['player'] = undefined;
	    	}else{
	    		if (from == 'login') {
	    			sessionStorage['player'] = player_id;
	    			result = true;
	    		}else if(from == 'regis'){
	    			result = true;
	    			updateUser(player_id);
	    		}
	    		// sessionStorage['auth'] = "true";
	    		// sessionStorage['username'] = number;
	    		console.log("e")
	    	}
	    	console.log(d);
	    	// sessionStorage['regisID'] = user_id;
	    	callback(result);
	    },
	    error: function (xhr, textStatus, errorThrown){
         	window.location.reload(true)
			sessionStorage['auth'] = false;
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
}
function updateUser(a){
	var data = new Object();
	data.token = sessionStorage['Token'];
	data.id = a;
	data.approve_status = 'approved';
	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/'+a+'/update',
        data:data,
        dataType: "json",
        async: false,
	    success: function(d){
			// Glob_regis = d;
	    	if (d.success == false) {
	    		console.log("d")
	    	}else{
	    		sessionStorage['player'] = a;
	    		sessionStorage['username'] = sessionStorage['regisUsername'];
	    		window.location.replace("index");
	    		// sessionStorage['auth'] = "true";
	    		// sessionStorage['username'] = number;
	    		console.log("e")
	    	}
	    	console.log(d);
	    	// sessionStorage['regisID'] = user_id;
	    	// callback(user_id,code,number);
	    },
	    error: function (xhr, textStatus, errorThrown){
         	window.location.reload(true)
			sessionStorage['auth'] = false;
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
}
function authPlayer(username, callback){
	var data = new Object();
	data.token = sessionStorage['Token'];
	data.username = username;
	data.password = 'playbasis';
	console.log(data)
	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/auth',
        data:data,
        dataType: "json",
        async: false,
	    success: function(d){
			// Glob_Login = d;
			var player_id = '';
	    	if (d.success == false) {
	    		sessionStorage['auth'] = "false";
	    		console.log(d.message);
	    		if (d.error_code == '2425') {
	    			player_id = d.response.cl_player_id;
	    		}
	    	}else{
	    		player_id = d.response.cl_player_id;
	    		// sessionStorage['player'] = playerId;
	    		sessionStorage['session_id'] = d.response.session_id;
	    		sessionStorage['username'] = username;
	    		sessionStorage['loginType'] = 'user';
	    		sessionStorage['auth'] = "true";
	    		// window.location.replace("index.jsp");
	    	}
	    	console.log(d)
	    	callback(player_id, d.error_code, d.message);
	    },
	    error: function (xhr, textStatus, errorThrown){
//          window.location.reload(true)
			sessionStorage['auth'] = false;
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
}
function validLogin() {
	if ($('#PlayerID').val() == '' || $('#passWord').val() == '') {
		console.log('Return false')
		return false;

	}else {
		return true;

	}
}
function guestFunction(){
	var guestID = makeid(40);
	console.log(guestID)
	var data = new Object();
	data.token = sessionStorage['Token'];
	data.id = guestID;
	data.username = guestID;
	data.email = 'qa1+'+guestID+'@playbasis.com';
	$.ajax({
		type: "POST",
		async: false,
        url: 'https://api.pbapp.net/Player/'+guestID+'/register',
        data:data,
        dataType: "json",
	    success: function(d){
			Glob_Login = d;
	    	console.log(d.success)
	    	if (d.success == false) {
	    		guestFunction();
	    	}else{
	    		sessionStorage['player'] = guestID;
	    		sessionStorage['loginType'] = 'guest';
	    		window.location.replace("index");
	    	}
	    },
	    error: function (xhr, textStatus, errorThrown){
//          window.location.reload(true)
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
}
function getIdentifyKey(a){
	  if (a === "") {
	  	getToastrOption();
	    toastr["warning"]("You need to write something!", "Error");
		return false;
	  }else  {
	  	var data = new Object();
	  	console.log('https://api.pbapp.net/Player/'+a+'/register'+" | token = "+sessionStorage['Token']+" | email = qa1+"+a+"@playbasis.com")
	  	data.token = sessionStorage['Token'];
	  	data.id = a;
	  	data.username = a;
	  	data.email = "qa1+"+a+"@playbasis.com";
	  	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/'+a+'/register',
        data: data,
        dataType: "json",
	    success: function(d){
	    	in_data = d;
	    	console.log(in_data);
	    	if (in_data.success == false) {
	    		console.log(in_data.message)
	    		sessionStorage['player'] = a;
	    		location.reload();
	    	}else{
	    		console.log(in_data.message)
	    		sessionStorage['player'] = a;
	    		location.reload();
	    	}
	    },
	    error: function (xhr, textStatus, errorThrown){
//          window.location.reload(true)
            console.log(errorThrown);
            console.log("Failed : getIdentifyKey() @ login.js");
        }	
	});
	}
}
	    
// 	  }
// 	  // else{
// 	  // 	getToastrOption();
// 	  //   toastr["warning"]("No user in database. Please contact admin", "Error");
// 	  //   return false
// 	  // }
	  
// 	});
// function initialSwipeBox(){
// 	var swiper = new Swiper('#wipp_con', {
//       effect: 'cube',
//       grabCursor: true,
//       loop: true,
//       cubeEffect: {
//         shadow: true,
//         slideShadows: true,
//         shadowOffset: 20,
//         shadowScale: 0.94,
//       },
//       pagination: {
//         el: '.swiper-pagination',
//       },
//     });
// }
function phoneFormat(text){
	text = text.replace(/(\d\d)(\d\d\d)(\d\d\d\d)/, "$1-$2-$3");
        return text;
}
function initialSwipeCard(){
	var swiper = new Swiper('#wipp_con', {
      width:300,
      spaceBetween: 50,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
}
function checkUser(){
	if (sessionStorage['player'] == "undefined" || sessionStorage['player'] == undefined) {
		return true;
	}else{
		return false;
	}
}
function chkPage(){
	
}
function getContent(callback){
	$.ajax({
		type: "GET",
		async: false,
        url: 'https://api.pbapp.net/Content?api_key='+sessionStorage['api_key']+'&language='+sessionStorage['lang'],
        dataType: "json",
	    success: function(d){
	    	var data = d;
	    		console.log(data);
	    		if (data.response == null) {
	    			alert("Cannot get content!");
	    		}else{
	    		sessionStorage.setItem("contentData", JSON.stringify(data));
	    		callback();
	    	}
	    	
	    },
	    error: function (xhr, textStatus, errorThrown){
//          window.location.reload(true)
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
}
function translateContent(){
	var data = JSON.parse(sessionStorage["contentData"]);
	contentData = data;
	jQuery.each(data.response.result, function() {
			contentSummary[this.node_id] = this.summary;
			contentTitle[this.node_id] = this.title;	
        }	
    );
}
