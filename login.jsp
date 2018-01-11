<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				getIdentifyKey();
				getToastrOption()
				toastr["info"]("141073538", "Successful")
			}else{
				window.location.replace("index.jsp");
			}
			
		});
	</script>
<%@include file="bottom.jsp" %>
