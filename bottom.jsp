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
				
					<!-- <div class="gb" id="sliderUD" style="display: none;height: 6%">
						<div class="row">
							<div class="col-md-2" style="border-right: solid 1px white;text-align: center;">
								<h5>Home</h5>
							</div>
							<div class="col-md-8" style="border-right: solid 1px white">
								<h5>User's Space</h5>
							</div>
							<div class="col-md-2">
								<div class="row">
									<div class="col-md-6">
										<button class="btn btn-primary" type="button" >Language<span class="caret"></span></button>
										<div class="" id="btn-lang" style="text-align: center;display: none">
								
										</div>
									</div>
									<div class="col-md-6" style="text-align: center;">
										<button class="btn btn-primary" type="button"  onclick="Logout()">Logout<span class="caret"></span></button>
									</div>
								</div>
							</div>
						</div>
					</div> -->
		</div>
	</div>
</body>
</html>