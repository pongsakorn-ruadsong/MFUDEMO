var userData = [];
function getUserData(){
	var data = new Object();
	data.token = sessionStorage['Token'];
	$.ajax({
		type: "POST",
		async: false,
        url: 'https://api.pbapp.net/Player/'+sessionStorage['player']+'/data/all?iodocs=true',
        dataType: "json",
        data: data,
	    success: function(d){
	    	userData = d;
	    		console.log(userData);
	    		// if (data.response == null) {
	    		// 	alert("Cannot get content!");
	    		// }else{
	    		// sessionStorage.setItem("contentData", JSON.stringify(data));
	    			// }
	    },
	    error: function (xhr, textStatus, errorThrown){
//          window.location.reload(true)
            console.log(errorThrown);
            console.log("Failed : getContent() @ quiz.js");
        }	
	});
}