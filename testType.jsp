<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function(){
		buildDate();

		$('#percent').on('change', function(){
			  var val = parseInt($(this).val());
			  var $circle = $('#svg #bar');
			  
			  if (isNaN(val)) {
			   val = 100; 
			  }
			  else{
			    var r = $circle.attr('r');
			    var c = Math.PI*(r*2);
			   
			    if (val < 0) { val = 0;}
			    if (val > 100) { val = 100;}
			    
			    var pct = ((100-val)/100)*c;
			    
			    $circle.css({ strokeDashoffset: pct});
			    
			    $('#cont').attr('data-pct',val);
			  }
});
	});	
</script>
<style type="text/css">

#svg circle {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
  stroke: #666;
  stroke-width: 1em;
}
#svg #bar {
  stroke: #FF9F1E;
}
#cont {
  display: block;
  height: 200px;
  width: 200px;
  margin: 2em auto;
  box-shadow: 0 0 1em black;
  border-radius: 100%;
  position: relative;
}
#cont:after {
  position: absolute;
  display: block;
  height: 160px;
  width: 160px;
  left: 50%;
  top: 50%;
  box-shadow: inset 0 0 1em black;
  content: attr(data-pct)"%";
  margin-top: -80px;
  margin-left: -80px;
  border-radius: 100%;
  line-height: 160px;
  font-size: 2em;
  text-shadow: 0 0 0.5em black;
}

input {
  color: #000;
}
</style>

<div class="container" style="margin-top: 10%;">

<!-- <div class="row">
	<label>Day</label> 
	<label>Month</label> 
	<label>Years</label>
</div>

<div class="row">
	<select class="days"></select> /
    <select class="months"></select> /
    <select class="years"></select>
</div>  -->   	
       

<br><br>

<div id="cont" data-pct="100">
<svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
  <circle id="bar" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
</svg>
</div>
<label for="percent">Type a percent!</label>
<input id="percent" name="percent">




</div>
<%@include file="bottom.jsp" %>


<!-- <input type="text" mozactionhint="next"> -->
