<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function(){
		getGoodList();
	});	
</script>
<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"> -->
<br>
<br>
<br>
<div class="container">
	<label class="col-sm-12" style="margin-bottom: 30px; margin-top: 30px; font-size: 30px"><center>Goods store</center></label>			
		<div id="display"></div>
</div>
<div class="modal fadeIn" id="rewardDetail" role="dialog">
    <div class="modal-dialog" style="top: 15%">    
        <div class="modal-content" style="height: auto; width: auto; border-radius: 10px;">		
			<div class="container" style="padding: 15px 0px; border-radius: 10px; background-color: white; width: auto; height: 100%;">			      					
				<div class="row col-sm-12">
					<div class="couponPoint col-ms-2" id="disPoint" style="margin-left: 11px; color: black;"></div>
						<div class="couponStock col-sm-3" id="disStock" style=" color: blue; padding-bottom: 5%;"> </div>
				</div>
					<div class="row col-sm-12" style="margin-top: 5%;">
						<img src=" " class="img-circle col-sm-4" id="disIcon" style="width: 75px; height: 75px;">
							<div class="couponTitel col-sm-7" id="disTitle" style="font-size: 18px;"><b> </b></div>	
								<hr>
					</div>
						<div class="col-sm-12">
							<hr>
						</div>	
							<div class="row col-sm-12" style="margin-left: 10px;">				
								<img src=" " class="col-sm-5" id="disImgContent" style="width: 190px; height: 150px;">
									<div class="couponDes col-sm-6" id="disDetail" style="rfont-size: 13px;"> </div>
							</div>
								<div class="row col-sm-12" style="margin-top: 10%;">
									<div class="col-sm-offset-8">
										<button type="button" class="btn btn-primary receiveReward" style="box-shadow: 0 2px 8px rgba(0,0,0,0.3);">Redeem</button>
									</div>
								</div>
			</div>
     	</div>
  	</div>
</div>
 <input type="hidden" id="hid-goodsId">
 <input type="hidden" id="hid-goodsType">
<%@include file="bottom.jsp" %>
