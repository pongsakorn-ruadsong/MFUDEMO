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
	<div id="animation-locate">
		
	</div>
</body>
</html>
