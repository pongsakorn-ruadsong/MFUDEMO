<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function(){
		getGoodList();
	});	
</script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
<br>
<br>
<br>
<div class="container">
	<label class="col-sm-12" style="padding-bottom: 30px;"><center><h2>List reward</h2></center></label>

												
       						<!-- <button class="btn-sm btn-default col-sm-5 btnListReward" data-toggle="modal" data-target="#rewardDetail" style="border-radius: 15px; " type="button" id="btn_'+goodsId+'">
								<div class="ribbon-container"><div class="ribbon"><p style="color: black;"><b>300 pts.</b></p></div></div>
								<label type="text" class="" style="text-align: center;"><h4>CINNABON 1 Get Free coupon</h4></label>
								<hr style="width: 340px">
								<img class="col-sm-5" src="img/pp.png" style="width: 100%; position: relative;">
								<div class="col-sm-6" style="  text-align: left;">Warm dough, legendary Makara® Cinnamon, topped with rich cream cheese frosting.</div>
							</button> -->


									<!-- <div class="col-sm-5">'+point+' '+Stock+'</div>
								      <div class="modal-body">
								        	<div class="comtainer">
								        		<img src="'+icon+'" class="col-sm-2">
								         		<div class="col-sm-6" style="width=100%">'+title+'</div>
								       		</div>
								        	<div class="comtainer">
								        		<div>'+description+'</div>
								        	</div>
								        </div>
								        <button type="button" class="btn btn-primary" style="box-shadow: 0 2px 8px rgba(0,0,0,0.3);">Reedeem</button> -->
					<!-- <div class="couponDetail" style="border: 5px solid #404040; width: 80%; border-radius: 15px; margin: 0 auto; max-width: 525px; box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">			        
						<div class="container" style="padding: 1px 15px; border-radius: 15px; background-color: #f1f1f1; width: auto;">			      					
							<div class="row col-sm-12">
								<div class="couponPoint col-ms-offset2" id="disPoint" style="font-size: 17px;"><b>300 points</b></div>
									<div class="couponStock col-sm-3" id="disStock" style=" color: blue; padding-bottom: 5%;"> 99 Stock</div>
							</div>
								<div class="row col-sm-12">
								<img src="img/159.png" class="img-circle col-sm-3" style="width: 105px; height: 75px;">
									<div class="couponTitel col-sm-6" id="disTitle" style="font-size: 18px;">Offer Title Gose Here: Buy one get free one.</div>	
									<hr>
								</div>	
										<div class="row col-sm-12" style="margin-left: 25px;">				
											<img src="img/pp.png" class="col-sm-5" style="width: 190px; height: 190px;">
										<div class="couponDes col-sm-6" id="disDetail" style="margin-left: 5px; font-size: 13px;"> We work directly with farmers around the world to source the most delicious and sustainable coffees we can find. Then, we roast them to our exacting flavor standards, and serve them to you at peak deliciousness, hopefully alongside a good conversation and some friendly advice.</div>
										</div>
							<div class="row col-sm-12" style="margin-top: 7%; margin-bottom: 3%;">
								<div class="col-sm-offset-10">
									<button type="button" class="btn btn-primary" onclick="receivePoint();" style="box-shadow: 0 2px 8px rgba(0,0,0,0.3);">Reedeem</button>
								</div>
							</div>
						</div>
					</div>		
 -->
		<div id="display"></div>
</div>
<div class="modal fadeIn" id="rewardDetail" role="dialog">
    <div class="modal-dialog" style="top: 15%">    
        <div class="modal-content" style="height: auto; width: auto;">		
			<div class="container" style="padding: 15px 0px; border-radius: 5px; background-color: white; width: auto; height: 100%;">			      					
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
									<div class="col-sm-offset-10">
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

