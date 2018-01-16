sessionStorage['player'];
sessionStorage['api_key'];
sessionStorage['api_sec'];
sessionStorage['Token'];
sessionStorage['isLast'] = "false";
sessionStorage['subUrl'] = 'http://10.49.67.156/api/';
sessionStorage['mainUrl'] = 'https://api.pbapp.net/';
function getIdentifyKey(){
	swal({
	  title: "Identifier Key",
	  text: "Please input an api_key",
	  type: "input",
	  showCancelButton: true,
	  closeOnConfirm: false,
	  inputPlaceholder: "141073538"
	}, function (inputValue) {
	  if (inputValue === false) return false;
	  if (inputValue === "") {
	  	getToastrOption();
	    toastr["warning"]("You need to write something!", "Error");
	    return false
	  }else if (inputValue === '3245210633') {
	    swal("Successfully!", "Welcome Playbasis's tester");
	  	sessionStorage['api_key'] = inputValue;
	  	sessionStorage['player'] = 'test';
	  	sessionStorage['api_sec'] = "d440e6d9a2e08d5d35add801f5aed4a2";
	  	window.location = 'index.jsp?api_key='+sessionStorage['api_key']+'&player='+sessionStorage['player'];
	  }else if (inputValue === '141073538') {
	    swal("Successfully!", "Welcome MFU's tester");
	  	sessionStorage['api_key'] = inputValue;
	    sessionStorage['player'] = 'boomDemo';
	    sessionStorage['api_sec'] = "21e3386d7b6cc594784209af889063d2";
	  	window.location = 'index.jsp?api_key='+sessionStorage['api_key']+'&player='+sessionStorage['player'];
	  }else if (inputValue === 'balm') {
	    swal("Successfully!", "Welcome MFU's tester");
	  	sessionStorage['api_key'] = inputValue;
	    sessionStorage['player'] = 'balm1';
	    sessionStorage['api_sec'] = "balm";
	  	window.location = 'index.jsp?api_key='+sessionStorage['api_key']+'&player='+sessionStorage['player'];
	  }else{
	  	getToastrOption();
	    toastr["warning"]("No user in database. Please contact admin", "Error");
	    return false
	  }
	  
	});
}
function checkUser(){
	if (sessionStorage['api_key'] == undefined) {
		return true;
	}else{
		return false;
	}
}