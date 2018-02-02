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
					<div class="gb" id="sliderUD" style="display: none">
						<div class="row">
							<div class="col-md-2">
								
							</div>
							<div class="col-md-6">
								
							</div>
							<div class="col-md-4">
								<div class="row">
									<div class="col-md-6">
										<div class="" id="btn-lang">
								
										</div>
									</div>
									<div class="col-md-6">
										<button class="btn btn-primary" type="button" style="float: right;margin-right: 30px;" onclick="Logout()">Logout<span class="caret"></span></button>
									</div>
								</div>
							</div>
						</div>
					</div>
		</div>
	</div>
</body>
</html>