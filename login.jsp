<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			if (checkUser()) {
				getContent();
				getToken();
				getIdentifyKey();
				sessionStorage['lang'] = 'English'
			}else{
				window.location.replace("index.jsp");

			}
		});
	</script>
<%@include file="bottom.jsp" %>
