var userExp = [];
var userPoints = [];
var userLevel= [];

function getUserExp() {
        $.ajax({
        	type: "GET",
            url: 'https://api.pbapp.net/Player/rank/exp/4?api_key='+sessionStorage['api_key'],
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
            url: 'https://api.pbapp.net/Player/rank/point/4?api_key='+sessionStorage['api_key'],
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

function getUserLevel() {
        $.ajax({
        	type: "GET",
            url: 'https://api.pbapp.net/Player/rank/level/4?api_key='+sessionStorage['api_key'],
            dataType: "json",
	    	success: function(data){
	        	userLevel = data;
	        	buildLeaderLevel();
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
	var text = '';
	if(length>0){
		$("#display>div").remove();
		for(let i=0;i<length;i++){ 
			var number= i+1;
			var playerFirstnameExp = data[i].first_name;
			var playerLastNameExp = data[i].last_name;
			var imageExp = data[i].image;
			var playerIdExp = data[i].player_id;
			var exp = data[i].exp;
		text +=								
'					<div class="swiper-slide boxLeader animated fadeInRight" style="width:25%;height:150px;">'+
'						<div class="logo_preview col-md-12" style="z-index:1; position: absolute;top:2px;left:18px;background-color: #cccccc;">'+
'						<img src="'+imageExp+'" style="background-size: cover;">'+
'						</div>'+
'						<div style="">'+number+'<span class=""></span></div>'+
'						<div style="margin-top:70%; text-overflow:ellipsis; overflow:hidden;">'+
'							<div id="" >'+playerFirstnameExp+' '+playerLastNameExp+'</div>'+
'							<div id="">'+exp+' exp</div>'+
'						</div>'+
'					</div>'+
'					</div>'
			}
	}
	text = text+'</div>';

	$("#expLeaderList").append(text);
}

function buildLeaderPoints(){
	var length = userPoints.response.length;
	var data = userPoints.response;
	var text1 = '';
	if(length>0){
		$("#display>div").remove();
		for(let i=0;i<length;i++){ 
			var number= i+1;
			var playerFirstnamePoints = data[i].first_name;
			var playerLastNamePoints = data[i].last_name;
			var imgPoints = data[i].image;
			var playerIdPoints = data[i].player_id;
			var points = data[i].point;
		text1 +=								
'					<div class="swiper-slide boxLeader animated fadeInRight" style="width:32%;height:155px;">'+
'						<div class="logo_preview col-md-12" style="z-index:1; position: absolute;top:2px;left:18px;background-color: #cccccc;">'+
'						<img src="'+imgPoints+'" style="background-size: cover;">'+
'						</div>'+
'						<label>'+number+'<span class=""></span></label>'+
'						<div style="margin-top:70%; text-overflow:ellipsis; overflow:hidden;">'+
'							<div id="">'+playerFirstnamePoints+' '+playerLastNamePoints+'</div>'+
'							<div id="">'+points+' points</div>'+
'						</div>'+
'					</div>'+
'					</div>'
			}
	}
	text1 = text1+'</div>';
	$("#pointsLeaderList").append(text1);
	
}

function buildLeaderLevel(){
	var length = userLevel.response.length;
	var data = userLevel.response;
	var text2 = '';
	if(length>0){
		$("#display>div").remove();
		for(let i=0;i<length;i++){ 
			var number= i+1;
			var playerFirstnameLevel = data[i].first_name;
			var playerLastNameLevel = data[i].last_name;
			var imageLevel = data[i].image;
			var playerIdLevel = data[i].player_id;
			var level = data[i].level;
		text2 +=								
'					<div class="swiper-slide boxLeader animated fadeInRight" style="width:25%;height:150px;">'+
'						<div class="logo_preview col-md-12" style="z-index:1; position: absolute;top:2px;left:18px;background-color: #cccccc;">'+
'						<img src="'+imageLevel+'" style="background-size: cover;">'+
'						</div>'+
'						<div style="">'+number+'<span class=""></span></div>'+
'						<div style="margin-top:70%; text-overflow:ellipsis; overflow:hidden;">'+
'							<div id="">'+playerFirstnameLevel+' '+playerLastNameLevel+'</div>'+
'							<div id="">Level '+level+'</div>'+
'						</div>'+
'					</div>'+
'					</div>'
			}
	}
	text2 = text2+'</div>';
	$("#levelLeaderList").append(text2);
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