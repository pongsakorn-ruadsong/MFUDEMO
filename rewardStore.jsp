<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function(){
		getGoodList();
	$('#QRCode').click(function(){
		var code = $('#code').text();
			// buildQRcode(code);
		});	
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
				<!-- <div id="qrcode" style="width: 30%;"></div> -->
<script>
	// new QRCode(document.getElementById("qrcode"), "TestQR");

	// var  qrcode = new QRCode(document.getElementById("qrcode"),{
	// 	text : 'testCode',
	// 	width: 256,
	// 	height: 256,
	// 	colorDark: '#000',
	// 	colorLight: '#fff',
	// 	correctLevel : QRCode.correctLevel.H
	// });

	// 	function makeCode () {      
	// 	    var elText = document.getElementById("text");
		    
	// 	    if (!elText.value) {
	// 	        alert("Input a text");
	// 	        elText.focus();
	// 	        return;
	// 	    }
	// 	    qrcode.makeCode(elText.value);
	// 	}
	// 			qrcode.clear();

	// 				qrcode.makeCode('1111');
</script>
			</div>
		</div>
	</div>	

<div class="modal fadeIn" id="rewardDetail" role="dialog">
    <div class="modal-dialog" style="top: 10%">    
        <div class="modal-content" style="border-radius: 10px; width: 75%; height: 100%; background-color: white; left: 13%;">
        <div class="header couponTop" id="Image"></div>		
			<div class="container" id="imageIcon" style="border-radius: 10px background-image: url(); background-size: cover;">
				<div class="logo_preview col-md-12" style="z-index:1; position: absolute; top:32%;left: 5%;">
					<img src="" class="img-circle" id="disIcon">
				</div>
				<div class="couponId" id="goodsId"> </div>
				<div class="textCoupon" type="text" id="disTitle"> </div>	
				<div class="CodeExpire" id="expirePeriod"> </div>
				<div class="container">		      					
					<div class="couponDetail" type="text" id="disDetail"> </div>
				</div>
				<hr class="halfCricle">
				<div class="row">
					<div class="couponPoint" style="margin-left: 38%;" id="disPoint"> </div>
				</div>
				<button class="btn-lg btn-primary receiveReward buttonRedeem">Redeem</button>
			</div>
     	</div>
  	</div>
</div>
<input type="hidden" id="hid-couponId">
 <input type="hidden" id="hid-goodsType">



<!-- <input id="text" type="text" style="width:80%" /><br />
<div id="qrcode"></div> -->




<div class="modal fadeIn" id="checkOutGoods" role="dialog">
    
</div>
</div>
<!-- <input type="hidden" id="hid-couponId"> -->
<!-- <script>
	var  qrcode = new QRCode('qrcode',{
		text : 'testCode',
		width: 256,
		height: 256,
		colorDark: '#000',
		colorLight: '#fff',
		correctLevel : QRCode.correctLevel.H
	});

function makeCode () {      
    var elText = document.getElementById("text");
    
    if (!elText.value) {
        alert("Input a text");
        elText.focus();
        return;
    }
    
    qrcode.makeCode(elText.value);
}
qrcode.clear();
qrcode.makeCode('1111');
</script> -->




<%@include file="bottom.jsp" %>
