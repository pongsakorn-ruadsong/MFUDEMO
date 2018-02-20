				<script type="text/javascript">
					$(document).ready(function(){
						$("#sliderUD").hover(function(){
						    	$('#up').fadeOut();
						    	$('#down').fadeIn();
						    	$('#sliderUD').css("top","0px");
						    }, function(){
						    	$('#up').fadeIn();
						    	$('#down').fadeOut();
						    	var bba = "-"+sessionStorage['top']+"px";
						    	console.log(bba);
						    	$('#sliderUD').css("top",bba);
							});
						$("#back").click(function(){
							window.location.replace("index.jsp");
						});
						$("#animation").click(function(){
							$("#animation").removeClass('animation');
						});
					});
				</script>
		</div>
	</div>
	<!-- <div style="width: 80px;height: 120px;background-color: red;position: absolute;bottom: 50px;right: 50px;">
		<p>BIN</p>
	</div> -->
	<div class="footer" style="text-align: center;margin-top: -20px;padding-top: 10px;padding-bottom: 10px;background-color: aqua;position: fixed;bottom: 0px;width: 100%;z-index: 99;background-color: #21252942;border-color: rgba(241, 239, 239, 0);color: white;height: 10%;">
		<div class="row" style="position: fixed;bottom: 10px;">
			<div class="col-3 center">
				<!-- <a href="#"><span class="glyphicon glyphicon-user" id="showUser"></span></a> -->
				<a href="index">News feed</a> 
			</div>
			<div class="col-3 center">
				<a href="#">Leaderboard</a> 
			</div>
			<div class="col-3 center">
				<a href="#"><span class="showUser"> My profile</a> 
			</div>
			<div class="col-3 center">
				<a href="rewardStore">My coupons</a> 
			</div>
		</div>
	</div>
	<div id="animation-locate">
		
	</div>
</body>
</html>
