<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function() {
		eventShow();
	// 	reset();
	// 	animateText();
	// 	animateBlobs();

	// 	$(function() {
	// 	  var numberOfStars = 20;
		  
	// 	  for (var i = 0; i < numberOfStars; i++) {
	// 	    $('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
	// 	  } 
	// 	  animateText();
	// 	  animateBlobs();
	// 	});

	// 	$('.congrats').click(function() {
	// 	  reset();
	// 	  animateText();
	// 	  animateBlobs();
	// 	});
	});
</script>
<style type="text/css">

/* Cannon */
	.cannon {
		height: 200px;
		width: 1px;
		position: relative;
		transform-origin: 50% 100%;
		animation:cannon-explosion 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) both;
		animation-iteration-count: infinite;
	}
	  @keyframes cannon-explosion {
		0% {
			transform: scale(0);
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}	
	/* Paths */
	.path {
		position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    transform-origin: 50% 100%;
	    padding-bottom: 30%;
	    display: flex;
	    flex-direction: column;
	    flex-wrap: nowrap;
	    justify-content: space-around;
	    align-items: center;
	}
	.nth-child {
		flex: 0 1 auto;
	    animation-duration: 1.2s;
	    animation-timing-function: ease-out;
	    animation-fill-mode: both;
	    animation-iteration-count: infinite;
      	animation-name: rotate-r;
 	}
      @keyframes rotate-r{
        0% {
          transform: rotate(0turn);
        } 50% {
          transform: rotate(-2turn);
        } 100% {
          transform: rotate(-2.05turn);
        }
    }
	.confetti1{
	    flex: 0 1 auto;
	    animation-duration: 1.2s;
	    animation-timing-function: ease-out;
	    animation-fill-mode: both;
	    animation-iteration-count: infinite;
	    animation-name: confetti-rotate;

  }
  @keyframes confetti-rotate {
        0% {
          transform: rotate(0turn) scaleY(1);
        } 50% {
          transform: rotate(2turn) scaleY(1.5);
        } 100% {
          transform: rotate(2.05turn) scaleY(1);
        }
  	}
		.color-1 {
			background-color: #feb535; /*yellow*/
		}
		.color-2 {
			background-color: #bea4ff; /*purple*/
		}
		.color-3 {
			background-color: #ff6e83; /*red*/
		}
		.color-4 {
			background-color: #58cafe; /*cyan*/
		}
		.color-5{
			background-color: #492684; /*violet*/
		}
.cannon {
	position: absolute;
}
.ribbon {
	height: 1em;
	width: .5em;
	border-radius: .1em;
}	
.flake {
	height: .5em;
	width: .5em;
	border-radius: 50%;
}
.deg0{
	height: 100%;
	transform: rotate(0deg);
}
.deg25{
	height: 90%;
	transform: rotate(17deg);
}
.deg-25{
	height: 90%;
	transform: rotate(-17deg);
}
.deg11{
	height: 95%;
	transform: rotate(8deg);
}
.deg-11{
	height: 95%;
	transform: rotate(-8deg);
}

.goodsBox{
	width: 100%;
	height: 75vh;
	border-radius: 10px;
	background-color: black;
	align-items: center; 
	/*position: absolute;*/
}
/*.readTerm:hover{
	animation-duration: 1.8s;
	animation-name: goodsflip;
}
@keyframes goodsflip {
	60%{
		transform: rotateY(210deg);
	}
  	100%{
  		transform: rotateY(180deg);
  }
}*/
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
.nameTag{ 
	width: 107%;
    height: 45px;
    top: -3%;
    left: -9%;
    text-align: center;
	margin-left: 15px;
	border-radius: 20px;
	background-color: lime;
    position: relative;
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
.dataCricle{
	width: 50px;
	height: 50px;
	margin: 15px;
	font-size: 17px;
	font-weight: bold;
	text-align: center;
	box-shadow: 0px 0px 7px #d9d9d9;
	background-color: #e60000;
	border-radius: 50%;
}
.header{
	width: 100%;
	height: 54%;
	background-color: red;
}
.body{
	width: 100%;
	height: 40%;
	background-color: yellow;
}
.footer{
	width: 100%;
	text-align: center;
	background-color: yellow;
	font-size: 15px;
}
.timeLine{
  position: relative;
  width: 100%;
  left: 52%;
  height: 100%;
  overflow: scroll;
  margin: 0 auto;
  margin-top: 20px;
  padding: 1em 0;
  list-style-type: none;
}
.timeLine:before{
	content: '';
	width: 6px;
	height: 130%;
	position: absolute;
	display: block;
	left: 3%;
    background-color: lime;
}
.message{
	position: relative;
    width: 50%;
    left: 30px;
    margin-top: 25px;
}
.message:after{
	content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    height: 0;
    width: 0;
    margin-top: -8px;
    border: solid transparent;
    border-right-color: rgb(248,248,248);
    border-width: 8px;
    pointer-events: none;
}
.wrappe-flag{
	position: relative;
    display: inline-block;
    text-align: center;
}
.flag{
	position: relative;
    display: inline;
    background: rgb(248,248,248);
    padding: 6px 10px;
    border-radius: 5px;
    font-weight: 600;
    text-align: left;
}
.flag:before{
	position: absolute;
    top: 60%;
    right: 86px;
    content: ' ';
    display: block;
    width: 15px;
    height: 15px;
    margin-top: -10px;
    background: #fff;
    border-radius: 10px;
    border: 4px solid rgb(255,80,80);
}
.flag:after{
	content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    height: 0;
    width: 0;
    margin-top: -8px;
    border: solid transparent;
    border-right-color: rgb(248,248,248);
    border-width: 8px;
    pointer-events: none;
}
.currencyBox{
	width: 50%;
	height: 86px;
	text-align: center;
	background-color: blue;
}
</style>

<div class="container" style="margin-top: 10%;">

<div class="goodsBox">
	<div class="header">
		<div class="nameTag">
			<label>Tester</label><br>
			<label>08x-xxx-xxxx</label>
			<div class="logo_preview col-md-12" style="z-index:1; position:absolute; top:-5px; left:-5px; background-color:#cccccc;">
				<img src=" " style="background-size: cover;">
			</div>
		</div>
		<div class="row">
		<img src=" " style="float:left; margin:5px; width:100px; height:50px; background-size:cover;">
		</div>
		<div class="row">
			<div class="dataCricle">
				<div style="margin-top: 12px;">10</div>
			</div>
			<div class="dataCricle">
				<div style="margin-top: 12px;">2.5</div>
			</div>
			<div class="dataCricle">
				<div style="margin-top: 12px;">WIFI</div>
			</div>
		</div>
		<div class="row">
			<label style="margin-left: 30px;">GB</label>
			<label style="margin-left: 62px;">MIN</label>
			<label style="margin-left: 57px;">FREE</label>
		</div>
	</div>
	<div class="body">
		<div class="row">
			<div class="currencyBox" style="border-right:1px solid; border-bottom: 1px solid;">
				<div style="margin-top: 35px;">1 THB</div>
			</div>
			<div class="currencyBox" style="border-left:1px solid; border-bottom: 1px solid; ">
				<div style="margin-top: 35px;">1 THB</div>
			</div>
		</div>
		<div class="row">
			<div class="currencyBox" style="border-right: 1px solid; border-top: 1px solid; ">
				<div style="margin-top: 35px;">1 THB</div>
			</div>
			<div class="currencyBox" style="border-left:1px solid; border-top: 1px solid; ">
				<div style="margin-top: 35px;">1 THB</div>
			</div>
		</div>
		<!-- <div class="timeLine">
				<li>
					<div class="message">
						<div class="wrappe-flag">
							<span class="flag">
								message.
							</span>
						</div>
					</div>
				</li>
				<li>
					<div class="message">
						<div class="wrappe-flag">
							<span class="flag">
								message.
							</span>
						</div>
					</div>
				</li>
				<li>
					<div class="message">
						<div class="wrappe-flag">
							<span class="flag">
								message.
							</span>
						</div>
					</div>
				</li>
		</div> -->
	</div>
	<div class="footer">
		<a href="#" class="readTerm">Term & Condition</a>
	</div>
</div>




<!-- <canvas id="confeti" class="active" width="100%" height="100vh"></canvas>

<div style="transform: rotate(40deg);position:absolute;top:43%;left:39%;">
	<div class="cannon">
		<div class="path deg0">
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="ribbon cannon__confetti nth-child color-1"></div>
			<div class="ribbon cannon__confetti nth-child color-2"></div>
			<div class="flake cannon__confetti confetti1 color-1"></div>
		</div>
		<div class="path deg25">
			<div class="ribbon cannon__confetti nth-child color-2"></div>
			<div class="flake cannon__confetti confetti1 color-2"></div>
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="ribbon cannon__confetti nth-child color-1"></div>
			<div class="flake cannon__confetti confetti1 color-4"></div>
		</div>
		<div class="path deg-25">
			<div class="ribbon cannon__confetti nth-child color-1"></div>
			<div class="ribbon cannon__confetti nth-child color-4"></div>
			<div class="ribbon cannon__confetti nth-child color-2"></div>
			<div class="flake cannon__confetti confetti1 color-3"></div>
		</div>
		<div class="path deg11">
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="ribbon cannon__confetti nth-child color-1"></div>
			<div class="ribbon cannon__confetti nth-child color-4"></div>
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="ribbon cannon__confetti nth-child color-2"></div>
		</div>
		<div class="path deg-11">
			<div class="ribbon cannon__confetti nth-child color-2"></div>
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="flake cannon__confetti confetti1 color-4"></div>
			<div class="ribbon cannon__confetti nth-child color-1"></div>
		</div>
	</div>
</div>
<div style="transform: rotate(-43deg);position:absolute;top:55%;left:58%;">
	<div class="cannon">
		<div class="path deg0">
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="ribbon cannon__confetti nth-child color-1"></div>
			<div class="ribbon cannon__confetti nth-child color-2"></div>
			<div class="flake cannon__confetti confetti1 color-1"></div>
		</div>
		<div class="path deg25">
			<div class="ribbon cannon__confetti nth-child color-2"></div>
			<div class="flake cannon__confetti confetti1 color-2"></div>
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="ribbon cannon__confetti nth-child color-1"></div>
			<div class="flake cannon__confetti confetti1 color-4"></div>
		</div>
		<div class="path deg-25">
			<div class="ribbon cannon__confetti nth-child color-1"></div>
			<div class="ribbon cannon__confetti nth-child color-4"></div>
			<div class="ribbon cannon__confetti nth-child color-2"></div>
			<div class="flake cannon__confetti confetti1 color-3"></div>
		</div>
		<div class="path deg11">
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="ribbon cannon__confetti nth-child color-1"></div>
			<div class="ribbon cannon__confetti nth-child color-4"></div>
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="ribbon cannon__confetti nth-child color-2"></div>
		</div>
		<div class="path deg-11">
			<div class="ribbon cannon__confetti nth-child color-2"></div>
			<div class="flake cannon__confetti confetti1 color-3"></div>
			<div class="flake cannon__confetti confetti1 color-4"></div>
			<div class="ribbon cannon__confetti nth-child color-1"></div>
		</div>
	</div>
</div>
 -->


</div>
<%@include file="bottom.jsp" %>


<!-- <input type="text" mozactionhint="next"> -->
