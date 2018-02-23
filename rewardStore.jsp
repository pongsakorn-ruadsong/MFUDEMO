<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function(){
		getGoodList();
	});	
</script>
<style type="text/css">
	.swiper-container {
      width: 100%;
      padding: 8px;
      height: 70vw;
      margin: 20px 0;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      /*-webkit-align-items: center;
      align-items: center;*/
    }
    .shelf{
    	/*background: url('img/shelf.jpg') no-repeat center center fixed; */
		  -webkit-background-size: cover;
		  -moz-background-size: cover;
		  -o-background-size: cover;
		  background-size: cover;
		  height: 100%;
    }
    .card-preview{
    	width: 100%;
    	background-color: slategrey;
    }
    .preview-logo{
    	position: fixed;
    	z-index: 50px;
    	border-radius: 50%;
    	background-color: darksalmon;
	    padding: 8px;
	    width: 60px;
	    height: 60px;
	    border:4px solid white;
	    position: fixed;
		  top: 50%;
		  left: 50%;
		  margin-top: -50px;
		  margin-left: -100px;
    }
    .logo_preview{
	    position: relative;
	    width: 55px;
	    height: 55px;
	    border-radius: 50%;
	    background-color: grey;
	    padding: 8px;
	    margin-top: 0%;
    	border: 4px solid white;
    	overflow: hidden;
	}
    .preview-name{

    }
    .pre-box{
    	padding: 0px;
    	overflow: hidden !important;
    	border-radius: 5px;
    }
    .annouce{
    	width: 100%;
    	height: 1%;
    	min-height: 50px;
    	max-height: 100px;
    	margin-top: 75px;
    	background-color: aqua;
    	margin-bottom: -20px;
    	text-align: center;
    	padding-top: 20px;
    	padding-bottom: 20px;
    }
    .img-container {
    display: inline-block;
    position: relative;
	}
	.positioning{
	    position: absolute;
	    right: 15px;
	    bottom: 22px;
	    background-color: red;
	    color: white;
	    padding: 4px;
	    font-size: 17px;
	    line-height: 18px;
	}
</style>
<br>
<br>
<br>
<div class="goodsStore"></div>
	<div class="shelf" style="background-color: white;">
		<div class="swiper-container">
			<div class="swiper-wrapper col-md-12" id="display">

				<!-- <img src="img/KFC.png" style="width: 100%; height: 100%;" onclick="ddsad()" data-toggle="modal"> -->

				<!-- <button class="couponCard" type="button" style="background-image: url('');" data-toggle="modal" goodsTypeId="'+goodsType+'" goodsId="'+goodsId+'" detailId="'+detail+'" imgId="'+image+'" pointId="'+point+'" titleId="'+title+'" iconId="'+icon+'" stockId="" type="button">
					<div class="boxInsideCoupon">
						<div class="textInCoupon">BUY ONE GET ONE</div>
							<div class="showPoint">30 Points</div>
						
					</div>
				</button>	 -->

			</div>
		</div>
	</div>	
<!-- <div class="modal fadeIn" id="rewardDetail" role="dialog">
    <div class="modal-dialog" style="top: 15%">    
        <div class="modal-content" style="height: auto; width: auto; border-radius: 10px;">		
			<div class="container" style="padding: 15px 0px; border-radius: 10px; background-color: white; width: auto; height: 100%;">			      					
				<div class="row col-sm-12">
					<div class="couponPoint col-ms-2" id="disPoint" style="margin-left: 11px; color: black;"></div>
						<div class="couponStock" id="disStock" style=" color: blue; padding-bottom: 5%;"></div>
				</div>
					<div class="row col-sm-12" style="margin-top: 5%;">
						<img src=" " class="img-circle col-sm-3" id="disIcon" style="width: 75px; height: 45px;">
							<div class="couponTitel col-sm-7" id="disTitle" style="font-size: 18px;"><b> </b></div>	
								<hr>
					</div>
						<div class="col-sm-12">
							<hr>
						</div>	
							<div class="row col-sm-12" style="margin-left: 10px;">				
								<img src=" " class="col-sm-5" id="disImgContent" style="width: 190px; height: 150px;">
									<div class="couponDes col-sm-6" id="disDetail" style="font-size: 13px; text-align: center;"> </div>
							</div>
							<hr>
								<div class="row col-sm-12" style="margin-top: 10%;">
									<div class="col-sm-12">
										<div class="couponPoint col-ms-2" id="disPoint" style="margin-left: 11px; color: #ffa31a; font-size: 25px;"> </div>
										<button type="button" class="btn btn-primary receiveReward" style="box-shadow: 0 2px 8px rgba(0,0,0,0.3);">Redeem</button>
									</div>
								</div>
			</div>
     	</div>
  	</div>
</div> -->


<div class="modal fadeIn" id="rewardDetail" role="dialog">
    <div class="modal-dialog" style="top: 15%">    
        <div class="modal-content" style="height: auto; width: auto; border-radius: 10px; background-color: white;">
        <div class="header couponTop">Coupon</div>		
			<div class="container modalCoupon" style="width: 100%; height: 100%;">
				<img src="" class="img-circle" id="disIcon" style="width: 75px; height: 45px; margin-bottom: 10px">
				<div class="textInCoupon" type="text" id="disTitle"></div>			      					
				<hr>
				<div class="couponDes" type="text" id="disDetail"></div>
				<hr>
				<div style="color: orange; text-align: center;">Use</div><div class="couponPoint" id="disPoint"></div>
				<button class="btn-lg btn-primary receiveReward" style=" margin-left: 21%; top: 80%; padding-left: 50px; padding-right: 50px;">Redeem</button>
			</div>
     	</div>
  	</div>
</div>
 <input type="hidden" id="hid-goodsId">
 <input type="hidden" id="hid-goodsType">
<%@include file="bottom.jsp" %>
