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
		$("#display>div").remove();
		for(let i=0;i<length;i++){ 
			var goodsId = data[i].goods_id;
			var title = data[i].name;
			var description = data[i].description;
			var image = data[i].image;
			var goodsType = data[i].is_group;
			var Stock = data[i].quantity;
			var expire = data[i].date_expire;
			var start = data[i].date_start;	
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
'				<button class="couponCard btnListReward" type="button" style="background-image: url('+image+');" data-toggle="modal" goodsTypeId="'+goodsType+'" goodsId="'+goodsId+'" detailId="'+detail+'" imgId="'+image+'" pointId="'+point+'" titleId="'+title+'" iconId="'+icon+'" stockId="" type="button">'+
'					<div class="boxInsideCoupon">'+
'						<div class="textInCoupon">'+title+'</div>'+
'							<div class="showPoint">'+point+'</div>'+
'					</div>'+
'				</button>'	
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

 function ddsad(){
		$('#111').modal();
	}