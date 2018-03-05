<%@include file="top.jsp" %>
<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				window.location.replace("login.jsp");
			}else{
				translateContent();
				getLang();
				getUserData();
				sessionStorage.removeItem("save_result");
			}
			
		});
</script>
<div class="container">
	<div class="user-img">
		
	</div>
	<div class="user-exp">
		
	</div>
	<div class="user-info">
		
	</div>
</div>

<%@include file="bottom.jsp" %>