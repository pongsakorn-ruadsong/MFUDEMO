<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login.jsp");
			}else{
				translateContent();
		    	getCusData();
				getLang();
			}
		    $('#getToken').click(function(){
			    getToken();
			});
			$('#vApi').click(function(){
			    getApi();
			});
			$('#vPlayer').click(function(){
			    getPlayer();
			});
			$('#lgout').click(function(){
			    Logout();
			});
			$('#resetAllQ').click(function(){
			    resetAllQ();
			});
			$('#SsSp').click(function(){
			    alert("UnderConstruction")
			});
			$('#btn-pre').click(function(){
				var _to = $(this).attr('prev');
				$("#btn-pre").prop('disabled', true);
				// console.log(_to);
				if (updateBtnOrder('prev',_to)) {
					setTimeout(function(){ 
					console.log("Test")
					$("#btn-pre").prop('disabled', false);
					}, 1000);
				}
				
				
			});
			$('#btn-next').click(function(){
				var _to = $(this).attr('next');
				// console.log(_to);
				updateBtnOrder('next',_to);
				// $('#btn_5a55bd7ae92a2e785e8b456e').addClass('animated fadeOutLeft');
				// setTimeout(function(){ 
	   //  			document.getElementById('btn_5a55bd7ae92a2e785e8b456e').style.display = 'none';
	   //  			setTimeout(function(){ 
				// 		document.getElementById('btn_5a69a5062f131c1f298b4569').style.display = 'block';
				// 		$('#btn_5a69a5062f131c1f298b4569').addClass('animated fadeInRight');
		  //   		}, 10);
	   //  		}, 350);
			});
		});
	</script>
	<div class="container" style="margin-top: 50px;">
		<div class="row">
			<div class="col-md-6">
				<h3>Welcome</h3>
				<h5>Quiz list</h5>
			</div>
			<div class="col-md-6">
				<div class="dropdown">
					<button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="float: right;">Debugger<span class="caret"></span></button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenu1">
						<!-- <p class="dropdown-item" id="getToken">Get Token</p>
					    <p class="dropdown-item" id="vApi">View Api_Key</p>
					    <p class="dropdown-item" id="vPlayer">View Player</p>
					    <p class="dropdown-item" id="SsSp">Session Storage Panel</p> -->
					    <p class="dropdown-item" id="resetAllQ">Reset All Quiz</p>
					    <p class="dropdown-item" id="lgout">Logout</p>
				    </div>
				</div>
			</div>
		</div>
		<div class="row node" >
			<div class="col-md-12" >
				<div class="prog-bar">
					
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-10 offset-md-1">
				<div class="" id="qlist">
					<button class="btn-slide" id="btn-pre"  style="float: left;display: none">Previous</button>
					<button class="btn-slide" id="btn-next" disabled="true" style="float: right;display: none">Next</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog" style="margin-top: 200px;">
    
      <!-- Modal content-->
      <div class="modal-content" style="background-color: rgba(157, 157, 179, 0);border:none;">
        <CENTER>
        <div class="modal-body" style="padding: 100px;">
          <div class="loader"></div>
        </div>
        </CENTER>
      </div>
      
    </div>
  </div>
<%@include file="bottom.jsp" %>
