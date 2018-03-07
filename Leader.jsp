<%@include file="top.jsp" %>
<script type="text/javascript">
	$(document).ready(function(){
		getUserExp();
		getUserPoints();
	});	
</script>
<link rel="stylesheet" href="css/swiper.min.css">
<style type="text/css">
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
</style>
<div class="container" style="margin-top: 10%;">

<hr style="">

		<div class="swiper-container swiperLog1">
			<div class="swiper-wrapper" id="expLeaderList">
				<div class="boxLeader" style="background-color: red; text-align: center;">Exp</div>	
			</div>
		</div>
<hr style="">
		 <div class="swiper-container swiperLog2">
		    <div class="swiper-wrapper" id="pointsLeaderList">
		      <div class="boxLeader" style="background-color: blue; color: white;">Points</div>
		    </div>
		  </div>
<hr style="">

</div>
<script src="js/swiper.min.js"></script>
<%@include file="bottom.jsp" %>
