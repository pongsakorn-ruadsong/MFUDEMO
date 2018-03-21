<%@include file="top.jsp" %>
<script type="text/javascript">
	$(document).ready(function(){
		if (checkUser()) {
				window.location.replace("login");
		}else{
			translateContent();
	    	getQuizData();
	    	getUserInfo(function(){
	    		
	    	});
			sessionStorage.removeItem("save_result");
		}
		
	});
</script>
<link rel="stylesheet" href="css/swiper.min.css">
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
    	margin-top: 0px;
    	padding-top: 60px;
    	background-image: url('img/BG.jpg');
   		background-repeat: no-repeat;
   		background-attachment: scroll;
    	background-size: cover;
    	overflow: scroll;
		height: 130%;
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
    	position: fixed;
	    display: none;
	    top: 60px;
	    width: 100%;
	    min-height: 50px;
	    max-height: 100px;
	    background-color: #00ffff59;
	    text-align: center;
	    padding-top: 20px;
	    z-index: 2;
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
	.parallax {
	    height: 100vh;
	    overflow-x: hidden;
	    overflow-y: auto;
	    -webkit-perspective: 1px;
	    perspective: 1px;
	    margin-bottom: 10px;
	  }
	.parallax__layer {
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    height: 100%;
	  }
	.parallax__layer--base {
	  	-webkit-transform: translateZ(0);
    	transform: translateZ(0);
	}
	.parallax__layer--back {
	  	-webkit-transform: translateZ(-1px) scale(2);
    	transform: translateZ(-1px) scale(2);
	}
</style>
<div class="annouce">
	Annoucement
</div>
<!-- Swiper -->
<div class="parallax">
	<div class="parallax__layer parallax__layer--back" style="position: relative;">
		<div class="shelf"></div>
	</div>
<div class="parallax__layer parallax__layer--base" style="top: 35px;">
  <div class="swiper-container swiper1">
    <div class="swiper-wrapper" id="swip_hot">
      
    </div>
  </div>

  <!-- Swiper -->
  <div class="swiper-container swiper2">
    <div class="swiper-wrapper" id="swip_old">
      
    </div>
  </div>

  <!-- Swiper -->
   <div class="swiper-container swiper3" style="margin-bottom: 70px;">
    <div class="swiper-wrapper">
      <div class="swiper-slide default-slide">
      	<div class="swiper-slide default-slide" style="display: inline-block;margin: auto;">
      	<div style="position: relative;width: 100%;height: 50%;border-top-right-radius: 15px;border-top-left-radius: 15px;background-color: #0000004a">
      		<div style="width: 100%;">
      			<div style="left: 50%;position: absolute;height: 50px;width: 50px;">
	      			<div style="width: 20%;position: relative;left: -50%;top: -8px;background-color: darkkhaki;width: 100%;height: 100%;border-radius: 50%;border: 4px solid white;">
	      				Logo
	      			</div>
      			</div>
      		</div>
      		Picture
      		<div style="position: absolute;bottom: 0px;width: 100%;background-color: #00ffff5c">
      			Overlay
      		</div>
      	</div>
      	<div style="position: relative;width: 100%;height: 40%;background: aqua;">
      		<div>
      			Title
      		</div>
      		<div>
      			EXAMPLE LAYOUT
      		</div>
      	</div>
      	<div style="position: absolute;bottom: 0px;width: 100%;text-align: center;">
      		Footer
      	</div>
      </div>
      </div>
      <div class="swiper-slide default-slide">Slide 2</div>
      <div class="swiper-slide default-slide">Slide 3</div>
      <div class="swiper-slide default-slide">Slide 4</div>
      <div class="swiper-slide default-slide">Slide 5</div>
      <div class="swiper-slide default-slide">Slide 6</div>
      <div class="swiper-slide default-slide">Slide 7</div>
      <div class="swiper-slide default-slide">Slide 8</div>
      <div class="swiper-slide default-slide">Slide 9</div>
      <div class="swiper-slide default-slide">Slide 10</div>
    </div>
   
  </div>


 </div>
 </div>
 <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content" style="background-color: rgba(157, 157, 179, 0);border:none;">
        <CENTER>
        <div class="modal-body" style="position: fixed;top: 80px;left: 0px;">
          <div class="" style="">
          	<img src="gif/Newest_Lotus.gif" style="width: 100%;height: 100%;">
		  </div>
        </div>
        </CENTER>
      </div>

    </div>
  </div>
  <script src="js/swiper.min.js"></script>
  <script>
    
  </script>
<%@include file="bottom.jsp" %>