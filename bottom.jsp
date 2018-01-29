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
					});
				</script>
				<div class="gb" id="sliderUD">
					<div class="" id="btn-lang">
						
					</div>
					    <br>
					    <img id="up" src="img/test.png" style="position: absolute;bottom: 10%;left: 46%;">
					    <img id="down" src="img/test2.png" style="position: absolute;bottom: 10%;left: 46%;display: none">
				</div>
		</div>
	</div>
</body>
</html>