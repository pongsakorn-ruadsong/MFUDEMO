<%@include file="top.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			sessionStorage['lang'] = 'English'
			if (checkUser()) {
				getToken();
				getIdentifyKey();
				getContent();
			}else{
				window.location.replace("index.jsp");

			}
		});
	</script>
<%@include file="bottom.jsp" %>
