var gobal = []; // All Goods list storage
var contentValue = [];
sessionStorage['player'];
sessionStorage['Token'];

function getGoodList() {
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
			var goodsType = data[i].is_group;
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
'       						<button class="animated fadeInLeft btn-sm btn-default col-sm-5 btnListReward" data-toggle="modal" style="border-radius: 15px; overflow: hidden;" goodsTypeId="'+goodsType+'" goodsId="'+goodsId+'" detailId="'+detail+'" imgId="'+image+'" pointId="'+point+'" titleId="'+title+'" iconId="'+icon+'" stockId="'+Stock+'" type="button">'+
'									<div class="ribbon-container"><div class="ribbon" style="color: #3B3738; font-size: 14px"><b>'+point+'</b></div></div>'+
'										<label type="text" class="" style="text-align: center;"><h4>'+title+'</h4></label>'+
'										<hr>'+
'										<img class="col-sm-4" src="'+image+'">'+
'											<div class="col-sm-6" style="width: 300px; text-align: left; font-size: 12px;">'+detail+'</div>'+
'								</button>'+
'							<div>'
			}
	}
result = result+'</div>';
	$("#display").append(result);
	$(".btnListReward").click(function(){
		var a = $(this).attr('imgId');
		var b = $(this).attr('iconId');
		// console.log(a)
		$('#disPoint').text($(this).attr('pointId'));
		// console.log($(this).attr('pointId'))
		// console.log($(this).attr('stockId'))
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
		$('#hid-goodsId').text($(this).attr('goodsId'));
		$('#hid-goodsType').text($(this).attr('goodsTypeId'));
		// console.log($(this).attr('goodsTypeId'))
		$('#rewardDetail').modal();
	});
	$(".receiveReward").click(function() {
			swal({
			  title: "Confirm?",
			  text: "Are you sure to recieve this reward?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonClass: "btn-primary",
			  confirmButtonText: "Yes",
			  closeOnConfirm: false
			},
	 	function(){
	 		if($('#hid-goodsType').text()=="false"){
	 			receiveGoods($('#hid-goodsId').text());
	 	}else{
	 		receiveGoodsGroup($('#disTitle').text());
	 }  										
			});	
		});
}

function receiveGoods(getGoodsId){
	var data = new Object();
        data.token = sessionStorage['Token'];
        data.player_id = sessionStorage['player'];
        data.goods_id = getGoodsId;
        console.log(getGoodsId)
        console.log("")
        console.log(data)
	$.ajax({
		type: "POST",
		url: 'https://api.pbapp.net/Redeem/goods',
		content: "application/json; charset=utf-8",
		dataType: "json",
		data: data,
		    	success: function(data){
			       console.log(data);
			       if(data.success==false){
						swal("Error!", "Failed to recieve reward.", "error");
			       }else{
			       	swal("Confirmed!", "Your reward have confirmed.", "success");
			       }
		    },
		    	error: function (xhr, textStatus, errorThrown){
	//                window.location.reload(true)
	                console.log(errorThrown);
	                console.log("Failed : getLang() @ index.js");
	            }
	        });
 }

function receiveGoodsGroup(getGoodsName){
	var data = new Object();
        data.token = sessionStorage['Token'];
        data.player_id = sessionStorage['player'];
        data.getGoodsName = getGoodsName;
        console.log(getGoodsName)
        console.log("")
        console.log(data)
	$.ajax({
		type: "POST",
		url: 'https://api.pbapp.net/Redeem/goodsGroup',
		content: "application/json; charset=utf-8",
		dataType: "json",
		data: data,
		    	success: function(data){
		    		// buildUserReward();
			       console.log(data);
			       if(data.success==false){
						swal("Error!", "Failed to recieve reward.", "error");
			       }else{
			       	swal("Confirmed!", "Your reward have confirmed.", "success");
			       }
		    	},
		    	error: function (xhr, textStatus, errorThrown){
	//                window.location.reload(true)
	                console.log(errorThrown);
	                console.log("Failed : getLang() @ index.js");
	            }
	        });
 }