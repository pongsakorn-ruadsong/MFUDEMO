var Index01 = [];
var Index02 = [];
var Index03 = [];
var Index04 = [];
var Index05 = [];
var TempLink = sessionStorage['mainUrl']+'Player/'+sessionStorage['player']+'/data/all?api_key='+sessionStorage['api_key'];
var getQuizz = sessionStorage['mainUrl']+'Quiz/list?api_key='+sessionStorage['api_key'];
function chkStatus() {

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
			Index02 = d;
			sessionStorage['Token'] = Index02.response.token;
			getToastrOption();
			toastr["success"]("Token has been added", "Successful")
		},
		error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                alert("Failed 1");
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
	        	Index01 = data;
	        	var qData = '';
	        	var text = '<div class="row">';
	        	for(var i = 0;i<Index01.response.result.length;i++) {
	        		var quiz_id = Index01.response.result[i].quiz_id;
	        		var quiz_name = Index01.response.result[i].name;
	        		getStatus(quiz_id);
	      			text +='<div class="col-md-4 centered">'+
	      			'<button class="btn btn-primary quizlist" qId="'+quiz_id+'" id="'+quiz_id+'">'+quiz_name+
	      			'</button>'+
	      			'</div>'
	      			qData += quiz_id+" ";
	        	}
	        	text += '</div>';
	        	console.log(qData);
	        	$('#qlist').append(text);
	        	$('.quizlist').click(function(){
	        		sessionStorage['qId'] = this.getAttribute("qId");
		    		window.location = 'quiz.jsp?qId='+sessionStorage['qId']+'&player='+sessionStorage['player'];
		    	});
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                alert("Failed 2");
            }
        });
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
                alert("Failed 3");
            }
	});
}



