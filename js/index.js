var Gtemp_01 = [];
var Gtemp_02 = [];
var TempLink = 'https://api.pbapp.net/Player/tester123/data/all?api_key='+sessionStorage['api_key'];
var getQuizz = 'https://api.pbapp.net/Quiz/list?api_key='+sessionStorage['api_key'];
function alertCall() {

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
		url: tokenUrl,
		content: "application/json; charset=utf-8",
		dataType: "json",
		data: data,
		success: function(d) {
			Gtemp_02 = d;
			sessionStorage['Token'] = Gtemp_02.response.token;
			getToastrOption();
			toastr["success"]("Token has been added", "Successful")
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                alert("Failed");
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
function getCusData() {
        $.ajax({
        	type: "GET",
            url: getQuizz,
            dataType: "json",
	    	success: function(data){
	        	Gtemp_01 = data;
	        	var text = '<div class="row">';
	        	for(var i = 0;i<Gtemp_01.response.result.length;i++) {
	        		var quiz_id = Gtemp_01.response.result[i].quiz_id;
	        		var quiz_name = Gtemp_01.response.result[i].name;
	      			text +='<div class="col-md-4 centered">'+
	      			'<button class="btn btn-primary quizlist" qId="'+quiz_id+'">'+quiz_name+
	      			'</button>'+
	      			'</div>'
	        	}
	        	text += '</div>';
	        	$('#qlist').append(text);
	        	$('.quizlist').click(function(){
	        		sessionStorage['qId'] = this.getAttribute("qId");
		    		window.location = 'quiz.jsp?qId='+sessionStorage['qId']+'&player='+sessionStorage['player'];
		    	});
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                alert("Failed");
            }
        });

}


