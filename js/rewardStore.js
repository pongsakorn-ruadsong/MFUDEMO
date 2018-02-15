var gobal = []; // All Goods list storage
var contentValue = [];
function getGood() {
	var data = new Object();
	$.ajax({
        	type: "GET",
            url: 'https://api.pbapp.net/Goods?active_filter=false&offset=0&api_key='+sessionStorage['api_key'],
            dataType: "json",
	    	success: function(data){
	    		gobal = data;
	    		jQuery.each(gobal.response.goods_list, function() {
					contentValue[this.goods_id] = this.custom_param;
		        }
		        );
		        buildGoodsList();
	    	},
	    	error: function (xhr, textStatus, errorThrown){
//                window.location.reload(true)
                console.log(errorThrown);
                console.log("Failed : getLang() @ index.js");
            }
        });
}


function buildGoodsList(){
	var length = gobal.response.goods_list.length;
	var data = gobal.response.goods_list;
	
	if(length>0){
		// $("#display>div").remove();
		for(let i=0;i<length;i++){ 
			var goodsId = data[i].goods_id;
			var title = data[i].name;
			var description = data[i].description;
			var image = data[i].image;
			var Stock = data[i].quantity;	
			var icon = '';
			var detail = '';
			var point = '';
			var custom_lenght = contentValue[goodsId].length;
			for (var k = 0; k < custom_lenght; k++) {
				if (contentValue[goodsId][k].key == 'Detail') {
					detail = contentValue[goodsId][k].value;
				}
				if (contentValue[goodsId][k].key == 'Icon') {
					icon = contentValue[goodsId][k].value;
				}
				if (contentValue[goodsId][k].key == 'Points') {
					point = contentValue[goodsId][k].value;
				}
				}
			
		result +=		
'							<div class="">'+							
'       						<button class="animated fadeInLeft btn-sm btn-default col-sm-5 btnListReward" data-toggle="modal" style="border-radius: 15px; " goodsId="'+goodsId+'" detailId="'+detail+'" imgId="'+image+'" pointId="'+point+'" titleId="'+title+'" iconId="'+icon+'" stockId="'+Stock+'" type="button">'+
'									<div class="ribbon-container"><div class="ribbon"></div><p style="color: #f2f2f2; padding-top: 3px;"><b>'+point+'</b></p></div>'+
'										<label type="text" class="" style="text-align: center;"><h4>'+title+'</h4></label>'+
'										<hr>'+
'										<img class="col-sm-5" src="'+image+'" style="width: 100%; position: relative;">'+
'											<div class="col-sm-6" style="  text-align: left;">'+detail+'</div>'+
'								</button>'+
'							<div>'
			}

	}

result = result+'</div>';

	$("#display").append(result);

	$(".btnListReward").click(function(){
		var a = $(this).attr('imgId');
		var b = $(this).attr('iconId')
		// console.log(a)
		$('#disPoint').text($(this).attr('pointId'));
		// console.log($(this).attr('pointId'))
		console.log($(this).attr('stockId'))
		if($(this).attr('stockId') == 'null'){
			$('#disStock').css('display','none');
		}else{
			$('#disStock').css('display','block');
			$('#disStock').text($(this).attr('stockId'));
		}
		$('#disIcon').attr("src", b);
		// console.log($(this).attr('iconId'))
		$('#disTitle').text($(this).attr('titleId'));
		// console.log($(this).attr('titleId'))
		$('#disImgContent').attr("src", a);
		// console.log($(this).attr('imgId'))
		$('#disDetail').text($(this).attr('detailId'));
		// console.log($(this).attr('detailId'))
		$('#btnId').text($(this).attr('goodsId'));
		// console.log($(this).attr('goodsId'))
		$('#rewardDetail').modal();
	});
}



function receivePoint(){
 	alert('comeing soon');


 }