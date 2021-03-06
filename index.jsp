<%@include file="top.jsp" %>
<script type="text/javascript">
	$(document).ready(function(){
		if (checkUser()) {
				window.location.replace("login");
		}else{
			translateContent();
	    	getUserInfo(function(){
	    		
	    	});
			sessionStorage.removeItem("save_result");
		}
		$('pb-spinwheel').attr('player-id',sessionStorage['player'])
		var swiper = new Swiper('.swiper99', {
	      slidesPerView: 1,
	      spaceBetween: 0,
	      centeredSlides: true,
	    });
	    $('.pip-hilight').click(function(){
	    	$('#myCoin').click();
	    });
	    $('#myCoin').click(function(){
	    	// $('#coin-frame').css('width','35px').css('height','35px');
	    	$('#coin-overlay').css('display','block');
	    	$('.pip-hilight').css('display','none');
	    	var z;
	    	var a = $('#coinNumber').text()
	    	var x = $('#coin-frame').position();
	    	var b = parseFloat(a.replace(/,/g, ''))
	    	var j = 1 + Math.random() * (20 - 1).toFixed(2);
	    	var l = parseFloat(j);
	    	var top = x.top+10;
	    	var left = x.left+10;
	    	console.log(x.top+' '+x.left)
	    	$('.coin-container').css('display','block');
	 		setTimeout(function(){
	 			$('.coin-container').css('top','0px');
	 		},100);
	 		setTimeout(function(){
	 			$(".coin").animate({
	 				top: top, 
	 				left: left, 
	 				width: 20, 
	 				height: 20
	 			},300 ,function(){
	 				c('finished')
	 				var o = b+l;
	 				var r = o.toFixed(2)
	 				var p = l.toFixed(2)
	 				var total = r.split('.');
	 				c(r+' | typeof:'+typeof(r))
	 				c(total)
	 				var n = numberWithCommas(total[0])
	 				$('#coinNumber').text(n)
	 				$('#coinNumber').append('<span style="font-size: 18px;font-weight: 100;align-self: flex-end;margin-bottom: 3.5px;">.'+total[1]+'</span>')
	 				$('.coin-container').css('display','none');
	 				$('.coin-container').css('top','-140px');
	 				$('#coin-overlay').css('display','none');
	 				$(".coin").removeAttr('style');
	 				var text = '<span class="animated bounceIn display-coin-plus" style="position: absolute;font-size: 12px;top: -2px;right: 28px;align-self: flex-start;">+'+p+'</span>'
	 				$('#amount-frame').append(text)
	 				setTimeout(function(){
	 					$(".display-coin-plus").removeClass('animated bounceIn')
	 					$(".display-coin-plus").animate({
	 					top: -20,
	 					opacity: 0
	 				},500,function(){
	 					$(".display-coin-plus").remove();
	 				});
	 				},500);
	 			});
	 			setTimeout(function(){
	 				$('#coin-frame').css('width','50px').css('height','50px');
	 				$('.coin-icon').css('width','60px').css('height','60px');
	 				setTimeout(function(){
	 					$('#coin-frame').css('width','40px').css('height','40px');
	 					$('.coin-icon').css('width','50px').css('height','50px');
	 				},100);
	 			},200);
	 		},1500);
	    });
	    $('#myCoin').mousedown(function(e) {
			c('Down')
		   $('#coin-frame').css('width','35px').css('height','35px');
		   setTimeout(function(){
		   		$('#coin-frame').css('width','40px').css('height','40px');
		   },100);
		}); 
	});
	const numberWithCommas = (x) => {
	  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
</script>
<style type="text/css">
	.swiper-container {
      width: 100%;
      height: 100%;
    }
	.main_bg{
		background: #c0c0aa;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #66C4C0, #34A2BF);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #66C4C0, #34A2BF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		position: relative;
		width: 100%;
		height: calc(100% - 10%);
	}
	.coin-icon{
		color: white;
	    height: 50px;
	    width: 50px;
	    font-size: 10px;
	    text-align: center;
	    display: flex;
	    justify-content: center;
	    margin-right: 10%;
	}
	.coin-amount{
		color: white;
	    height: 100%;
	    width: 190px;
	    font-size: 8vw;
	    text-align: center;
	    background-color: #ff002f00;
	    display: flex;
	    margin-right: -25px;
	}
	.pb-coin-amount{
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: 20%;
	}
	.pb-coin-amount-2{
		width: 100%;
		height: 20%;
		padding: 40px 25px 20px 25px;
		padding-top: 15%;
	}
	.good-display-details{
	    background-color: white;
    	border-top-left-radius: 30px;
    	border-top-right-radius: 30px;
    	height: 80%;
    	display: flex;
    	flex-flow: column;
    }
    .good-header{
    	width: 100%;
    	flex: 0 1 auto;
    }
    .good-img{
    	width: 50%;
    	float: left;
    	padding: 10px;
    }
    .good-own-name{
    	width: 50%;
    	float: right;
    	padding: 20px 10px 10px 0px;
    }
    .good-named{
    	font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    	font-size: 22px;
    	font-weight: bold;
    }
    .good-body{
    	width: 100%;
    	padding: 0px 20px 0px 20px;
    	flex: 0 1 40%;
    	overflow-y: scroll;
    }
    .good-tag{
    	top: -20px;
	    z-index: 99;
	    width: 32%;
	    position: absolute;
	    right: 20px;
    }
    .good-footer{
    	width: 100%;
	    display: inline-flex;
	    flex: 1 1 auto;
	    margin-bottom: 10px;
	    margin-top: 10px;
    }
    .pip-hilight{
    	animation-duration: 1000ms;
	    animation-name: blinking;
	    animation-iteration-count: infinite;
	    -webkit-animation:blinking 1000ms infinite;
    }
    @keyframes blinking {
    from {
        color:white;
    }
    to {
        color:red;
    }
	}
	@-webkit-keyframes blinking {
	    from {
	        color:white;
	    }
	    to {
	        color:red;
	    }
	}
	#coin-frame{
		align-self: center;
		width: 40px;
		height: 40px;
		position: relative;
		z-index: 2;
		transition: all 0.1s;
	}
	#myCoin{
		align-self: center;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
	}
}
@-webkit-keyframes blinking {
    from {
        color:white;
    }
    to {
        color:red;
    }
}
</style>

<div class="main_bg">
	<div class="pb-coin-amount">
		<div class="coin-icon" >
			<div id="coin-frame">
				<img id="myCoin" src="img/playbasis_coin_single_500px.png">
				<div id="coin-overlay" style="align-self: center;width: 100%;height: 100%;z-index: 1040;position: absolute;background-color: #d2691e00;display: none;background-color: #ff000000;top: 0px;left: 0px;"></div>
			</div>
			<!-- <span class="pip-hilight" style="position: absolute;top: 40px;left: 38px;z-index: 1040;">Click here!</span> -->
		</div>
		<div class="coin-amount">
			<div id="amount-frame" style="align-self: center;display: flex;align-items: center;justify-content: flex-end;position: relative;width: 100%;height: 12vw;">
				<span id="coinNumber" style="position: absolute;top: 0px;left: 0px;align-self: center;">3,996,240<span style="font-size: 18px;font-weight: 100;align-self: flex-end;margin-bottom: 3.5px;">.84</span></span> 
			</div>
		</div>
	</div>
	<!-- <div class="pb-coin-amount-2">
		<div class="coin-icon-2" style="float: left;">
			<img src="img/coin_22.png" style="width: 60px;">
		</div>
		<div class="coin-amount-2" style="float: right;padding-top: 8px;">
			<span style="font-size: 28px;color: white;">3,996,240</span> 
		</div>
		<div style="clear: both;"></div>
	</div> -->
	<div class="swiper-container swiper99" style="overflow: visible;">
	    <div class="swiper-wrapper" style="height: 100%;">
			<style type="text/css">
				.padding-left-right-20{
					padding-left: 20px;
					padding-right: 20px;
				}
				.cols-33{
					width: 33.33%
				}
				.row100{
					display: -webkit-box;
					width: 100%;
				}
				.icons{
					font-size: 11.5px;
				}
			</style>
			<div class="swiper-slide good-display-details" style="padding: 40px 20px 0px 20px;text-align: center;overflow-y: scroll;">
				<div class="row100">
					<div class="cols-33 padding-left-right-20">
						<img src="img/bank.png"> <!-- Digital.png -->
						<!-- <span class="icons">Digital Dollars</span> -->
						<span class="icons">Bank</span>
					</div>
					<div class="cols-33 padding-left-right-20">
						<img src="img/fashion.png"> <!-- Vochers7.png -->
						<!-- <span class="icons">Virtual Vouchers</span> -->
						<span class="icons">Fashion</span>
					</div>
					<div class="cols-33 padding-left-right-20">
						<img src="img/game.png"> <!-- Coupons6.png -->
						<!-- <span class="icons">Crypto Coupons</span> -->
						<span class="icons">Game</span>
					</div>
				</div>
				<div class="row100">
					<div class="cols-33 padding-left-right-20">
						<img src="img/gym.png"> <!-- Loans4.png -->
						<!-- <span class="icons">Linked Loans</span> -->
						<span class="icons">Gym</span>
					</div>
					<div class="cols-33 padding-left-right-20">
						<img src="img/insurance.png"> <!-- Bonds5.png -->
						<!-- <span class="icons">Byte Bound</span> -->
						<span class="icons">Insurance</span>
					</div>
					<div class="cols-33 padding-left-right-20">
						<img src="img/magazing.png"> <!-- stocks4.png -->
						<!-- <span class="icons">Synthetic Stocks</span> -->
						<span class="icons">Magazing</span>
					</div>
				</div>
				<div class="row100" style="margin-bottom: 50px;">
					<div class="cols-33 padding-left-right-20">
						<img src="img/pizza.png"> <!-- Coverage.png -->
						<!-- <span class="icons">Cyber Coverage</span> -->
						<span class="icons">Pizza</span>
					</div>
					<div class="cols-33 padding-left-right-20">
						<img src="img/shop.png"> <!-- Mortgage2.png -->
						<!-- <span class="icons">Mobile Mortgage</span> -->
						<span class="icons">Shop</span>
					</div>
					<div class="cols-33 padding-left-right-20">
						<img src="img/tour.png"> 
						<span class="icons">Tour</span>
					</div>
				</div>
				<!-- <div class="demo-wrapper">
				<div class="csspie" data-start="0" data-value="14"></div>
				<div class="csspie big" data-start="14" data-value="86"></div>
				</div> -->
			</div>
			<div class="swiper-slide good-display-details">
				<div class="good-tag">
					<img src="img/tag_bestSeller.png">
				</div>
				<div class="good-header">
					<div class="good-img">
						<img src="img/travelsim49.png" style="margin-right: 0px;">
					</div>
					<div class="good-own-name">
						<img src="img/AIS_Logo.png" style="width: 50%;margin-bottom: 10px;">
						<label class="good-named">AIS Prepaid Sim Card for Travellers</label>
					</div>
					<div style="clear: both;"></div>
				</div>
				<p style="text-align: center;">WHAT YOU WILL GET</p>
				<div class="good-body">
					description from setting in dashboard (getting from API)
				<div class="good-footer">
					<div class="real-currency">
						<div class="cur-flag">
							<img src="img/th_flag.png" style="padding: 1px;">
						</div>
						<div class="cur-text">
							THB 599
						</div>
					</div>
					<div class="pb-currency">
						<div class="cur-flag">
							<img src="img/playbasis_coin_single_500px.png">
						</div>
						<div class="cur-text">
							PBC 720
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="coin-container">
  <div class="coin">
    <div class="front">
    </div>
    <div class="back">
    </div>
  </div>
</div>
<style type="text/css">
.cur-flag{
	border-radius: 50%;
	overflow: hidden;
	    margin-right: 5px;
	    width: 25%;
    display: flex;
    align-items: center;
}
.cur-text{
	background-color: wheat;
	border-radius: 15px;
	width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: bold;
    font-size: 16px;
}
.real-currency{
	width: 50%;
    text-align: -webkit-center;
    align-self: center;
    min-height: 40px;
    height: 50px;
    display: inline-flex;
        padding: 8px;
}
.pb-currency{
	width: 50%;
    text-align: -webkit-center;
    align-self: center;
    min-height: 40px;
    height: 50px;
    display: inline-flex;
        padding: 8px;
}
.coin-container{
    perspective: 1100px;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 0px; 
    transition: all 1.1s;
    display: none;
    transition-timing-function: cubic-bezier(0.11, 1.66, 0.57, 0.97);
    top: -140px;
    left: 0px;
}
.coin{
      font-family: arial;
    text-transform: uppercase;
    color: black;
    position: absolute;
    text-align: center;
    line-height: 200px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    left: 45%;
    top: 100px;
   
}
.coin{
  animation-name: spin;
  animation-duration: 0.4s;
  animation-iteration-count: 3;
}
@keyframes spin{
  0% {transform: rotateY(180deg);}
  25% {transform: rotateY(360deg);}
  50% {transform: rotateY(540deg);}
  75% {transform: rotateY(720deg);}
  100% {transform: rotateY(900deg);}
}
.front, .back{
    border-radius: 50%;
    background-image: url(img/playbasis_coin_single_500px.png);
    background-size: contain;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;}
.back{
    transform: rotateY(180deg);
}
h1{
  margin: 0px;
}


</style>
<script type="text/javascript">
	
</script>
<%@include file="bottom.jsp" %>