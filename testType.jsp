<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function() {
		getUserdate();
		graph();
		// eventShow();
	// 	});
		$('#js-flip-1').toggle(function() {
	        $('#js-flip-1 .card').addClass('flipped');
	    },
	    function() { $('#js-flip-1 .card').removeClass('flipped');
	    });
	});
</script>
<link rel="stylesheet" href="css/swiper.min.css">
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
<<<<<<< Updated upstream
=======


/*--------- card flip --------*/

.flip {
    -webkit-perspective: 800;
    width: 400px;
    height: 200px;
    position: relative;
    margin: 50px auto;
}
.flip .card.flipped {
    -webkit-transform: rotateY(-180deg);
}
.flip .card {
    width: 100%;
    height: 100%;
    -webkit-transform-style: preserve-3d;
    -webkit-transition: 1.5s;
}
.flip .card .face {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-backface-visibility: hidden;
    z-index: 2;
    font-family: Georgia;
    font-size: 3em;
    text-align: center;
    line-height: 200px;
}
.flip .card .front {
    position: absolute;
    z-index: 1;
    background: black;
    color: white;
    cursor: pointer;
}
.flip .card .back {
    -webkit-transform: rotateY(-180deg);
    background: blue;
    background: white;
    color: black;
    cursor: pointer;
}
.profile-wrapper{
	width: 185px;
	height: 185px;
	overflow: hidden;
	position: relative;
}
.profile {
  width: 150px;
  height: 150px;
  position: relative;
  /*background-image: url(img/wonderwoman.png);*/
  /*background-size: cover;*/
  border-radius: 50%;
  border: 1px solid #b3ccff;
  overflow: hidden;
  box-shadow: 0px 1px 20px #b3ccff;
  margin: 10px;
}
#water{
	width: 100%;
	height: 0%;
	font-size: 20px;
    text-align: right;
	background: #4A90E2;
	position: relative;
	top: -4px;
}
/*.percent{
	content: '%';
	position: absolute;
	animation: percent 4s;
	color: white;
}
@keyframes percent {
  0% {
  	left: 0;
    height: 0;
  }
  50%{
  	left: 100%
  }
  100% {
  	left: 0;
    height: 100%;
  }
}*/
.percent{
	left: 60%;
    top: 5%;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
}
.price{
	position: absolute;
	font-size: 20px;
	text-align: center;

	/*transform: rotateX(180deg);*/
	color: #4d4d4d;
    top: 40%;
    left: 10%;
}


.water-block {
  margin-top:20vh;

}
@keyframes a0_t { 
  0% { transform: translate(-420.5px,15px); } 
  100% { transform: translate(-140px,15px); } 
}
@keyframes a1_t { 
  0% { transform: translate(0px,15px); } 
  100% { transform: translate(-280.5px,15px); }
}

.water-fill {
  fill:#4A90E2;
}
.water-fill.full {
  opacity:0.45;
}
.water-block{
	transition: all 1s;
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
.ct-line{
	stroke-width: 3px;
	stroke-linecap: round;
	/*stroke-dasharray: 30px 5px;*/
	animation-duration: 1.2s;
	animation-iteration-count: 2;
}

</style>


	<div class="swiper-container swiperCircle1">
		<div class="swiper-wrapper" style="width: 100%; left: -180px;;">
			<div class="swiper-slide">
				<div class="profile">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 279 46" class="water-block" id="water-block">
					    <g class="water-fill" transform="translate(-70.75,30.5318) translate(-349.75,-15.5318)" style="animation: a0_t 1s cubic-bezier(.28,.57,.62,.34) infinite;">
					        <g transform="translate(279.5,0)">
					            <path d="M420,31C398.5,30.3801,381.2,27.1259,368.9,24.0267C355.5,20.6175,342.4,15.9686,341.6,15.6586C326,10.08,322,7.29062,311.5,4.19136C304.3,2.17684,293.6,-0.147612,280,0.00735136C280,0.00735136,280,10.3382,280,31L420,31ZM140,31C161.5,30.3801,178.8,27.1259,191.1,24.0267C204.5,20.6175,217.6,15.9686,218.4,15.6586C234,10.08,238,7.29062,248.5,4.19136C255.6,2.17684,266.4,-0.147612,280,0.00735136C280,0.00735136,280,0.00735136,280,0.00735136L280,31L140,31ZM140,31C118.5,30.3801,101.2,27.1259,88.9,24.0267C75.5,20.6175,62.4,15.9686,61.6,15.6586C46,10.08,42,7.29062,31.5,4.19136C24.3,2.17684,13.6,-0.147612,0,0.00735136C0,0.00735136,0,0.00735136,0,0.00735136L0,31L140,31Z"/>
					        </g>
					        <g transform="translate(-0.5,0.0635166)">
					            <path d="M420,31C398.5,30.3801,381.2,27.1259,368.9,24.0267C355.5,20.6175,342.4,15.9686,341.6,15.6586C326,10.08,322,7.29062,311.5,4.19136C304.3,2.17684,293.6,-0.147612,280,0.00735136C280,0.00735136,280,10.3382,280,31L420,31ZM140,31C161.5,30.3801,178.8,27.1259,191.1,24.0267C204.5,20.6175,217.6,15.9686,218.4,15.6586C234,10.08,238,7.29062,248.5,4.19136C255.6,2.17684,266.4,-0.147612,280,0.00735136C280,0.00735136,280,0.00735136,280,0.00735136L280,31L140,31ZM140,31C118.5,30.3801,101.2,27.1259,88.9,24.0267C75.5,20.6175,62.4,15.9686,61.6,15.6586C46,10.08,42,7.29062,31.5,4.19136C24.3,2.17684,13.6,-0.147612,0,0.00735136C0,0.00735136,0,0.00735136,0,0.00735136L0,31L140,31Z"/>
					        </g>
					    </g>
					    <g class="water-fill full" transform="translate(420,30.5) translate(-420,-15.5)" style="animation: a1_t 1s linear infinite;">
					        <g>
					            <path d="M420,31C398.5,30.3801,381.2,27.1259,368.9,24.0267C355.5,20.6175,342.4,15.9686,341.6,15.6586C326,10.08,322,7.29062,311.5,4.19136C304.3,2.17684,293.6,-0.147612,280,0.00735136C280,0.00735136,280,10.3382,280,31L420,31ZM140,31C161.5,30.3801,178.8,27.1259,191.1,24.0267C204.5,20.6175,217.6,15.9686,218.4,15.6586C234,10.08,238,7.29062,248.5,4.19136C255.6,2.17684,266.4,-0.147612,280,0.00735136C280,0.00735136,280,0.00735136,280,0.00735136L280,31L140,31ZM140,31C118.5,30.3801,101.2,27.1259,88.9,24.0267C75.5,20.6175,62.4,15.9686,61.6,15.6586C46,10.08,42,7.29062,31.5,4.19136C24.3,2.17684,13.6,-0.147612,0,0.00735136C0,0.00735136,0,0.00735136,0,0.00735136L0,31L140,31Z"/>
					        </g>
					        <g transform="translate(840,0) scale(-1,1)">
					            <path d="M420,31C398.5,30.3801,381.2,27.1259,368.9,24.0267C355.5,20.6175,342.4,15.9686,341.6,15.6586C326,10.08,322,7.29062,311.5,4.19136C304.3,2.17684,293.6,-0.147612,280,0.00735136C280,0.00735136,280,10.3382,280,31L420,31ZM140,31C161.5,30.3801,178.8,27.1259,191.1,24.0267C204.5,20.6175,217.6,15.9686,218.4,15.6586C234,10.08,238,7.29062,248.5,4.19136C255.6,2.17684,266.4,-0.147612,280,0.00735136C280,0.00735136,280,0.00735136,280,0.00735136L280,31L140,31ZM140,31C118.5,30.3801,101.2,27.1259,88.9,24.0267C75.5,20.6175,62.4,15.9686,61.6,15.6586C46,10.08,42,7.29062,31.5,4.19136C24.3,2.17684,13.6,-0.147612,0,0.00735136C0,0.00735136,0,0.00735136,0,0.00735136L0,31L140,31Z"/>
					        </g>
					    </g>
					</svg>
					<div id="water"></div>
					<div class="price" id="userPrice"></div>
				</div>
			</div>
			<div class="swiper-slide">
				<div class="profile" style="box-shadow: 0px 1px 20px #ff8080;border: 1px solid #ff8080;">
					<div class="ct-chart ct-perfect-fourth" style="left: -10%;top: 10%;"></div>
					<div class="price" id="userPrice1"></div>					
				</div>	
			</div>
			<div class="swiper-slide">
				<div class="profile" style="box-shadow: 0px 1px 20px #ffff00;border: 1px solid #ffff00;">
					<div class="ct-chart ct-perfect-fourth" style="left: -10%;top: 10%;"></div>
					<div class="price" id=""></div>					
				</div>	
			</div>
			<div class="swiper-slide">
				<div class="profile" style="box-shadow: 0px 1px 20px #77ff33;border: 1px solid #77ff33;">
					<div class="ct-chart ct-perfect-fourth" style="left: -10%;top: 10%;"></div>
					<div class="price" id=""></div>					
				</div>	
			</div>
		</div>
	</div>

<!-- <div class="goodsBox">
	<div id="js-flip-1" class="flip">
    	<div class="card">
        	<div class="face front">Front</div>
        	<div class="face back">Back</div>
	    </div>
	</div>
 -->
<!-- <div class="goodsBox">
	<div class="header">
		<div class="nameTag">
			<label>Tester</label><br>
			<label>08x-xxx-xxxx</label>
			<div class="logo_preview col-md-12" style="z-index:1; position:absolute; top:-5px; left:-5px; background-color:#cccccc;">
				<img src=" " style="background-size: cover;">
			</div>
		</div> -->
		<!-- <div class="row">
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
		<div class="timeLine">
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
		</div>
	</div>
	<div class="footer">
		<a href="#" class="readTerm">Term & Condition</a> -->
<!-- =======
>>>>>>> Stashed changes
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
		</div> -->
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
<!-- 	</div>
	<div class="footer">
		<a href="#" class="readTerm">Term & Condition</a>
	</div> -->






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

<script src="js/swiper.min.js"></script>
<%@include file="bottom.jsp" %>


<!-- <input type="text" mozactionhint="next"> -->
