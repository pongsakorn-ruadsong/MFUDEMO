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
      height: 50vw;
      max-height: 350px;
      margin: 20px 0;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      max-width: 300px;
      max-height: 300px;
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
      -webkit-align-items: center;
      align-items: center;
    }
    .shelf{
    	background: url('img/shelf.jpg') no-repeat center center fixed; 
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
    	margin-top: 66px;
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
<div class="annouce">
	Annoucement
</div>
<!-- Swiper -->
<div class="shelf">
  <div class="swiper-container swiper1">
    <div class="swiper-wrapper" id="swip_hot">
      
    </div>
    <!-- Add Pagination -->
    <br><br><br>
    <div class="swiper-pagination swiper-pagination1"></div>
  </div>

  <!-- Swiper -->
  <div class="swiper-container swiper2">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>
      <div class="swiper-slide">Slide 7</div>
      <div class="swiper-slide">Slide 8</div>
      <div class="swiper-slide">Slide 9</div>
      <div class="swiper-slide">Slide 10</div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination swiper-pagination2"></div>
  </div>

  <!-- Swiper -->
  <div class="swiper-container swiper3">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>
      <div class="swiper-slide">Slide 7</div>
      <div class="swiper-slide">Slide 8</div>
      <div class="swiper-slide">Slide 9</div>
      <div class="swiper-slide">Slide 10</div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination swiper-pagination3"></div>
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