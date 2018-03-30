<%@include file="top.jsp" %>

	<script type="text/javascript">
		$(document).ready(function () {
			AOS.init({
				durations: 1500,
				delay: 300,
			});
			buildDate();
			buildProvince();
			// set_country();
			// set_city_state();
			// print_city_state();


			// getUserdate();
			// graph();
			var scrollPos = 10;
			$('.wrapper-timeline').scroll(function () {
				var scrollDown = $(this).scrollTop();
				if (scrollDown > scrollPos) {
					// alert($(".wrapper-timeline").scrollTop() + " px");
					$(".wrapper-timeline").each(function (i) {
						// $(".post-inner").delay(100 * i).addClass("animated1");
						// $('.post').delay(100 * i).addClass("animated1");
					});
				} else {
					// alert('up')
					$(".post-inner").removeClass("animated1");
				}
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
				animation: cannon-explosion 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) both;
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
			@keyframes rotate-r {
				0% {
					transform: rotate(0turn);
				}
				50% {
					transform: rotate(-2turn);
				}
				100% {
					transform: rotate(-2.05turn);
				}
			}
			.confetti1 {
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
				}
				50% {
					transform: rotate(2turn) scaleY(1.5);
				}
				100% {
					transform: rotate(2.05turn) scaleY(1);
				}
			}
			.color-1 {
				background-color: #feb535;
				/*yellow*/
			}
			.color-2 {
				background-color: #bea4ff;
				/*purple*/
			}
			.color-3 {
				background-color: #ff6e83;
				/*red*/
			}
			.color-4 {
				background-color: #58cafe;
				/*cyan*/
			}
			.color-5 {
				background-color: #492684;
				/*violet*/
			}
			.cannon {
				position: absolute;
			}
			.ribbon {
				height: 1em;
				width: 0.5em;
				border-radius: 0.1em;
			}
			.flake {
				height: 0.5em;
				width: 0.5em;
				border-radius: 50%;
			}
			.deg0 {
				height: 100%;
				transform: rotate(0deg);
			}
			.deg25 {
				height: 90%;
				transform: rotate(17deg);
			}
			.deg-25 {
				height: 90%;
				transform: rotate(-17deg);
			}
			.deg11 {
				height: 95%;
				transform: rotate(8deg);
			}
			.deg-11 {
				height: 95%;
				transform: rotate(-8deg);
			}

			.goodsBox {
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

			.header {
				width: 100%;
				font-size: 15px;
				font-weight: bold;
				margin: 3px;
				border-bottom: 1px solid gray;
			}
			.body {
				width: 100%;
				height: 40%;
				background-color: yellow;
			}
			.footer {
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
				animation-duration: 0.8s;
				animation-name: opacity;
				border-radius: 100%;
				background: #FFF;
				position: absolute;
				box-shadow: 0 0 0 5px rgba(20,92,95,0.15), 0 0 0 3px #0682FF;
			}

			@keyframes opacity {
				0% {
					transform: scale(0);
				}
				50% {
					transform: scale(1.3);
				}
				100% {
					transform: scale(1);
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
				animation-duration: 1.5s;
				box-shadow: 1px 1px 3px rgba(0,0,0,0.35);
			}

			.animated1 {
				animation-duration: 1.5s;
				animation-name: fadeIn;
			}

			@keyframes fadeIn {
				0% {
					opacity: 0;
					transform: translateX(20px);
				}
				100% {
					opacity: 1;
					transform: translateX(0);
				}
			}

			.ct-line {
				stroke-width: 2px;
				stroke-linecap: round;
				stroke-dasharray: 400;
				stroke-dashoffset: 1000;
				animation: dash 6s linear forwards;
			}
			@keyframes dash {
				to {
					stroke-dashoffset: 0;
				}
			}
			.date-select {
			  height: 28px;
			  width: 75px;
				border-radius: 5px;
			  background: #f2f2f2;
			}
		</style>

<div class="container">
	<form class="form-inline">
		<div class="form-group">
			<select class="days date-select"></select>/
		</div>
		<div class="form-group">
			<select class="months date-select"></select>/
		</div>
		<div class="form-group">
			<select class="years date-select"></select>
		</div>
	</form>
</div>







<div class="container">
  <form>
    <select class="date-select" onchange="set_country(this,country,city_state)" id="region">
      <option value="" selected="selected">Select Region</option>
    </select>
    <select class="date-select" name="country" disabled="disabled" onchange="set_city_state(this,city_state)"></select>
    <select class="date-select" name="city_state" disabled="disabled" onchange="print_city_state(country,this)"></select>
  </form>
</div>










<div style="width: 100%; height:100%;">
	<div class="wrapper-timeline" id="timelimePost">
		<div class="post-inner" data-aos="fade-left" data-aos-anchor-placement="top-center"></div>
		<div class="post">
			<div class="postDate"></div>
			<div class="post-inner" data-aos="fade-left">
				<div class="footer" id="">Jan 14</div>
			</div>
		</div>
		<div class="post-inner" data-aos="fade-left"></div>
		<div class="post">
			<div class="postDate"></div>
			<div class="post-inner" data-aos="fade-left">
				<div class="footer" id="">Jan 15</div>
			</div>
		</div>
		<div class="post-inner" data-aos="fade-left" data-aos-anchor-placement="center-bottom" data-aos-once="true"></div>
		<div class="post">
			<div class="postDate"></div>
			<div class="post-inner">
				<div class="footer" id="">Jan 16</div>
			</div>
		</div>
	</div>
</div>
		<!-- <canvas id="confeti" class="active" width="100%" height="100vh"></canvas> <div style="transform: rotate(40deg);position:absolute;top:43%;left:39%;"> <div class="cannon"> <div class="path deg0"> <div class="flake cannon__confetti confetti1
		color-3"></div> <div class="ribbon cannon__confetti nth-child color-1"></div> <div class="ribbon cannon__confetti nth-child color-2"></div> <div class="flake cannon__confetti confetti1 color-1"></div> </div> <div class="path deg25"> <div
		class="ribbon cannon__confetti nth-child color-2"></div> <div class="flake cannon__confetti confetti1 color-2"></div> <div class="flake cannon__confetti confetti1 color-3"></div> <div class="ribbon cannon__confetti nth-child color-1"></div> <div
		class="flake cannon__confetti confetti1 color-4"></div> </div> <div class="path deg-25"> <div class="ribbon cannon__confetti nth-child color-1"></div> <div class="ribbon cannon__confetti nth-child color-4"></div> <div class="ribbon cannon__confetti
		nth-child color-2"></div> <div class="flake cannon__confetti confetti1 color-3"></div> </div> <div class="path deg11"> <div class="flake cannon__confetti confetti1 color-3"></div> <div class="ribbon cannon__confetti nth-child color-1"></div> <div
		class="ribbon cannon__confetti nth-child color-4"></div> <div class="flake cannon__confetti confetti1 color-3"></div> <div class="ribbon cannon__confetti nth-child color-2"></div> </div> <div class="path deg-11"> <div class="ribbon cannon__confetti
		nth-child color-2"></div> <div class="flake cannon__confetti confetti1 color-3"></div> <div class="flake cannon__confetti confetti1 color-4"></div> <div class="ribbon cannon__confetti nth-child color-1"></div> </div> </div> </div> <div
		style="transform: rotate(-43deg);position:absolute;top:55%;left:58%;"> <div class="cannon"> <div class="path deg0"> <div class="flake cannon__confetti confetti1 color-3"></div> <div class="ribbon cannon__confetti nth-child color-1"></div> <div
		class="ribbon cannon__confetti nth-child color-2"></div> <div class="flake cannon__confetti confetti1 color-1"></div> </div> <div class="path deg25"> <div class="ribbon cannon__confetti nth-child color-2"></div> <div class="flake cannon__confetti
		confetti1 color-2"></div> <div class="flake cannon__confetti confetti1 color-3"></div> <div class="ribbon cannon__confetti nth-child color-1"></div> <div class="flake cannon__confetti confetti1 color-4"></div> </div> <div class="path deg-25"> <div
		class="ribbon cannon__confetti nth-child color-1"></div> <div class="ribbon cannon__confetti nth-child color-4"></div> <div class="ribbon cannon__confetti nth-child color-2"></div> <div class="flake cannon__confetti confetti1 color-3"></div> </div>
		<div class="path deg11"> <div class="flake cannon__confetti confetti1 color-3"></div> <div class="ribbon cannon__confetti nth-child color-1"></div> <div class="ribbon cannon__confetti nth-child color-4"></div> <div class="flake cannon__confetti
		confetti1 color-3"></div> <div class="ribbon cannon__confetti nth-child color-2"></div> </div> <div class="path deg-11"> <div class="ribbon cannon__confetti nth-child color-2"></div> <div class="flake cannon__confetti confetti1 color-3"></div> <div
		class="flake cannon__confetti confetti1 color-4"></div> <div class="ribbon cannon__confetti nth-child color-1"></div> </div> </div> </div> -->

		<script src="js/aos.js"></script>
		<script src="js/swiper.min.js"></script>
		<%@include file="bottom.jsp" %>
