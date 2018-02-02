<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			sessionStorage['lang'] = 'English';
			if (checkUser()) {
				getToken();
				loginModal();
				getContent();
			}else{
				window.location.replace("index.jsp");

			}
			$('#loginBtn').click(function(){
				var username = $('#PlayerID').val();
				if($('#userType').prop('checked')) {
				    sessionStorage['isAdmin'] = 'true'
				    getIdentifyKey(username);
				} else {
				    sessionStorage['isAdmin'] = 'false'
				    getIdentifyKey(username);
				}
			});
		});
	</script>
	<!-- Modal -->
	<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
	  <div class="modal-dialog" role="document" style="margin-top: 10%;">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h2 class="modal-title" id="exampleModalLabel">Who are you?</h2>
	        </button>
	      </div>
	      <div class="modal-body" style="text-align: center;">
	       	<div class="row">
	       		<div class="col-md-12" style="text-align: left;">
	       			<input type="text" name="playerID" id="PlayerID" class="player_txt" placeholder="Player ID">
	       		</div>
	       	</div>
	       	<br>
	       	<div class="row">
	       		<div class="col-md-12" style="text-align: left;padding-left: 20px;">
	       			<input type="checkbox" id="userType" name="userType" value="Admin"><span style="font-size: 14px;"> Login as administrator</span>
	       		</div>
	       	</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" id="loginBtn">Login</button>
	      </div>
	    </div>
	  </div>
	</div>
<%@include file="bottom.jsp" %>
