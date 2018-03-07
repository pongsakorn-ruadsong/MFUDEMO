var userExp = [];
var userPoints = [];

function getUserExp() {
        $.ajax({
        	type: "GET",
            url: 'https://api.pbapp.net/Player/rank/exp/3?api_key='+sessionStorage['api_key'],
            dataType: "json",
	    	success: function(data){
	        	userExp = data;
	        	buildLeaderExp();
	        	initialSwipes_leader();
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getLang() @ index.js");
            }
        });
}

function getUserPoints() {
        $.ajax({
        	type: "GET",
            url: 'https://api.pbapp.net/Player/rank/point/3?api_key='+sessionStorage['api_key'],
            dataType: "json",
	    	success: function(data){
	        	userPoints = data;
	        	buildLeaderPoints();
	        	initialSwipes_leader();
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getLang() @ index.js");
            }
        });
}

function buildLeaderExp(){
	var length = userExp.response.length;
	var data = userExp.response;
	if(length>0){
		$("#display>div").remove();
		for(let i=0;i<length;i++){ 
			var playerFirstnameExp = data[i].first_name;
			var playerLastNameExp = data[i].last_name;
			var imageExp = data[i].image;
			var playerIdExp = data[i].player_id;
			var exp = data[i].exp;
		result +=								
'					<div class="swiper-slide boxLeader animated fadeInRight" style="width:25%;height:150px;">'+
'						<div class="logo_preview col-md-12" style="z-index:1; position: absolute;top:-10px;left:17px;background-color: #cccccc;">'+
'						<img src="'+imageExp+'" style="background-size: cover;">'+
'						</div>'+
'						<label>1</label>'+
'						<div style="margin-top: 70%;">'+
'							<div id="playerID">'+playerIdExp+'</div>'+
'							<div id="fullName">'+playerFirstnameExp+' '+playerLastNameExp+'</div>'+
'							<div id="userExp">'+exp+' exp</div>'+
'						</div>'+
'					</div>'+
'					</div>'
			}
	}
	result = result+'</div>';

	$("#expLeaderList").append(result);
}

function buildLeaderPoints(){
	var length = userPoints.response.length;
	var data = userPoints.response;
	if(length>0){
		$("#display>div").remove();
		for(let i=0;i<length;i++){ 
			var playerFirstnamePoints = data[i].first_name;
			var playerLastNamePoints = data[i].last_name;
			var imgPoints = data[i].image;
			var playerIdPoints = data[i].player_id;
			var points = data[i].point;
		result +=								
'					<div class="swiper-slide boxLeader animated fadeInRight" style="width:25%;height:150px;">'+
'						<div class="logo_preview col-md-12" style="z-index:1; position: absolute;top:-10px;left:17px;background-color: #cccccc;">'+
'						<img src="'+imgPoints+'" style="background-size: cover;">'+
'						</div>'+
'						<div style="margin-top: 70%;">'+
'							<div id="playerID">'+playerIdPoints+'</div>'+
'							<div id="fullName">'+playerFirstnamePoints+' '+playerLastNamePoints+'</div>'+
'							<div id="userExp">'+points+' points</div>'+
'						</div>'+
'					</div>'+
'					</div>'
			}
	}
	result = result+'</div>';
	$("#pointsLeaderList").append(result);
	
}
function initialSwipes_leader(){
	var dew_swiper1 = new Swiper('.swiperLog1', {
    	slidesPerView: 3,
      spaceBetween: 8,
    });
    var dew_swiper1 = new Swiper('.swiperLog2', {
    	slidesPerView: 3,
      spaceBetween: 8,
    });
}