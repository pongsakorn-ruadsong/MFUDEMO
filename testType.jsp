<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function(){
		buildDate();
		buildProvince();
	});	
</script>
<div class="container" style="margin-top: 10%;">

<!--     <form>
    	Day
       <select class="days"></select>
      Month
      <select class="months"></select>
      Year
     <select class="years"></select>
  </form>
<br><br>

<select class="province" placeholder="Select your region"></select> -->

<!-- <form>
	<input type="checkbox"> Youth(18-23)
	<input type="checkbox"> Adult(24-35)
	<input type="checkbox"> Working age(36-45)
	<input type="checkbox"> Middle-Aged(46-56)
	<input type="checkbox"> Retirement(57-72)
	<div class="col-md-2">
		<span id="minslider"></span>
	</div>
	<div class="col-md-8">
		<input class="range-slider__range" id="slider-bar" type="range" value="20" min="18" max="23">
	</div>
	<div class="col-md-2">
		<span id="maxslider"></span>
	</div>
	<div style="text-align: center;margin-top: 30px;">
		<span id="disValueSli" style="padding: 15px;" class="range-slider__value"></span>
		<span id="unit" style="margin-left: 10px;display: none;"></span>
		<input type="hidden" id="hidSLIval" value="">
	</div>
</form> -->


  <input type="range" min="1" max="100" value="50" class="slider" id="myRange">


<div class="contianerCycle">
	<div class="cycle" style="border-radius: 50%">
		<div class="roll" style="border-radius: 50%">
				<span class="deg0"></span>
				<span class="deg35"></span>
				<span class="deg45"></span>
				<span class="deg90"></span>
				<span class="deg135"></span>
				<div class="holeInside" style="border-radius: 50%">
			</div>
				<div class="dot">
					<div class="rotateSelect" style="border-radius: 50%">
						<div class="rotateSelectSecond" style="border-radius: 50%"></div>
					</div>	
				</div>
		</div>
	</div>
</div>
<div class="container" style="margin-top: 5%;">
	<!-- <div class="selector"> -->
		
		<div class="selectOld">
			<button class="btn btn-default buttonAge" style="padding: 5px; background-color: #e6e6e6;"><span class="glyphicon glyphicon-triangle-bottom"></span></button>
			<div class="selectOldInside">
				<a class="btn btn-default buttonAge"></a>
				<a class="btn btn-default buttonAge"></a>
				<a class="btn btn-default buttonAge"></a>
				<a class="btn btn-default buttonAge"></a>
				<a class="btn btn-default buttonAge"></a>
			</div> 
		</div>
		<!-- </div> -->
</div>
</div>
<%@include file="bottom.jsp" %>


<!-- <input type="text" mozactionhint="next"> -->
