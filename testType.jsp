<%@include file="top.jsp" %>

<script type="text/javascript">
	$(document).ready(function() {
		getUserdate();
		graph();
		// eventShow();
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

.header{
	width: 100%;
    font-size: 15px;
    font-weight: bold;
    margin: 3px;
    border-bottom: 1px solid gray;
}
.body{
	width: 100%;
	height: 40%;
	background-color: yellow;
}
.footer{
	width: 100%;
	text-align: right;
	font-size: 10px;
	margin: 3px;
	border-top: 1px solid gray;
}

.wrapper-timeline {
    width: 100%;
    height: 35%;
    padding: 0 20px;
    overflow: scroll;
}

.post {
  width: 100%;
  border-left: 5px solid #0682FF;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  position: relative;
}

.postDate {
  width: 10px;
  height: 10px;
  top: 36px;
  left: -8px;
  border-radius: 100%;
  background: #FFF;
  position: absolute;
  box-shadow: 0 0 0 5px rgba(20,92,95,0.15), 0 0 0 3px #0682FF;
}

@keyframes tt { 
  0% { 
  	opacity: 0; 
  } 
  100% { 
  	opacity: 1; 
  } 
}

.post:after {
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 12px solid #0682FF;
  top: 30px;
  left: 8px;
}

.post-inner {
  border: 1px solid #0682FF;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.35);
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
	height: 100%;
	background: #4A90E2;
	position: relative;
	top: -7px;
}
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
    }

.ct-line{
	stroke-width: 2px;
	stroke-linecap: round;
	stroke-dasharray: 400;
    stroke-dashoffset: 150000;
  	animation: dash 600s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
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
		<div class="swiper-button-next" style="left: 10%; height: 12%;"></div>
    	<div class="swiper-button-prev" style="left: 1%; height: 12%;"></div>
	</div>


	<div class="wrapper-timeline" id="timelimePost">
		<div class="post">
		  	<div class="postDate"></div>
			<div class="post-inner">
				<div class="header" id="">14 Jan 2539</div>
			      		The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.
			</div>
  		</div>
  		<div class="post">
		  	<div class="postDate"></div>
			<div class="post-inner">
			      		The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak.
			    <div class="footer" id="">Jan 14</div>	
			</div>
  		</div>
  		<div class="post">
		  	<div class="postDate">
		  	</div>
			<div class="post-inner">
			      		The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men.
			</div>
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
</div> -->


<script src="js/swiper.min.js"></script>
<%@include file="bottom.jsp" %>


<!-- <input type="text" mozactionhint="next"> -->
