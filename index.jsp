<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login.jsp");
			}else{
				chkStatus();
				getToken();
		    	getCusData();
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
						<p class="dropdown-item" id="getToken">Get Token</p>
					    <p class="dropdown-item" id="vApi">View Api_Key</p>
					    <p class="dropdown-item" id="vPlayer">View Player</p>
					    <p class="dropdown-item" id="resetAllQ">Reset All Quiz</p>
					    <p class="dropdown-item" id="SsSp">Session Storage Panel</p>
					    <p class="dropdown-item" id="lgout">Logout</p>
				    </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-10 offset-md-1">
				<div class="" id="qlist">
					
				</div>
			</div>
		</div>
	</div>
<%@include file="bottom.jsp" %>
