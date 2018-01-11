sessionStorage['player'] = 'tester123';
sessionStorage['api_key'] = 3245210633;
function getIdentifyKey(){
	swal({
	  title: "Identifier Key",
	  text: "Please input an api_key",
	  type: "input",
	  showCancelButton: true,
	  closeOnConfirm: false,
	  inputPlaceholder: "Api_Key"
	}, function (inputValue) {
	  if (inputValue === false) return false;
	  if (inputValue === "") {
	    swal.showInputError("Please put your api_key!");
	    return false
	  }else if (inputValue === '3245210633') {
	    swal("Successfully!", "Welcome");
	  	sessionStorage['api_key'] = inputValue;
	  	window.location = 'index.jsp?api_key='+sessionStorage['api_key']+'&player='+sessionStorage['player'];
	  }else{
	  	swal.showInputError("No user in database. Please contact admin");
	    return false
	  }
	});
}