sessionStorage['player'];
sessionStorage['api_key'] = '141073538';
sessionStorage['api_sec'] = '21e3386d7b6cc594784209af889063d2';
sessionStorage['Token'];
sessionStorage['isLast'] = "false";
sessionStorage['subUrl'] = 'http://10.49.67.156/api/';
sessionStorage['mainUrl'] = 'https://api.pbapp.net/';
var contentData;
function getIdentifyKey(){
	swal({
	  title: "Who are you?",
	  text: "Please input your Player ID",
	  type: "input",
	  closeOnConfirm: false,
	  inputPlaceholder: "Player ID"
	}, function (inputValue) {
	  if (inputValue === false) return false;
	  if (inputValue === "") {
	  	getToastrOption();
	    toastr["warning"]("You need to write something!", "Error");
		return false;
	  }else  {
	  	var data = new Object();
	  	console.log('https://api.pbapp.net/Player/'+inputValue+'/register'+" | token = "+sessionStorage['Token']+" | email = qa1+"+inputValue+"@playbasis.com")
	  	data.token = sessionStorage['Token'];
	  	data.id = inputValue;
	  	data.username = inputValue;
	  	data.email = "qa1+"+inputValue+"@playbasis.com";
	  	$.ajax({
		type: "POST",
        url: 'https://api.pbapp.net/Player/'+inputValue+'/register',
        data: data,
        dataType: "json",
	    success: function(d){
	    	in_data = d;
	    	console.log(in_data);
	    	if (in_data.success == false) {
	    		console.log(in_data.message)
	    		sessionStorage['player'] = inputValue;
	    		location.reload();
	    	}else{
	    		console.log(in_data.message)
	    		sessionStorage['player'] = inputValue;
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
	  // else{
	  // 	getToastrOption();
	  //   toastr["warning"]("No user in database. Please contact admin", "Error");
	  //   return false
	  // }
	  
	});
}
function checkUser(){
	if (sessionStorage['player'] == undefined) {
		return true;
	}else{
		return false;
	}
}
function chkPage(){
	
}
function getContent(){
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