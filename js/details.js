define(["jquery","jquery-cookie"],function($){
	function details(){
		$(".header-cart em").html(sc_num());
		$.ajax({
			url:"../data/details.json",
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
					var node = $(`<img src="${arr[i].img}" alt="" id="${arr[i].id}">`);
					node.appendTo(".box-img .img");
					var node1 = $(`<a href="#${arr[i].id}"><img src="${arr[i].img}"></a>`);
					node1.appendTo(".small-img li");
					
				};
			},
			error:function(msg){
				console.log(msg);
			}
		})
	}


	function gain(){
		var search = (location.search).split("?");
		var str = search[1];
		var id = str.split("=")[1];
		$.ajax({
			url:"../data/phone.json",
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
					if(id == arr[i].id){
						var node2 = $(`<img class="tu" src="${arr[i].img}" alt="">`);
						node2.prependTo(".box-img .img");
					}
				}
			},
			error:function(msg){
				console.log(msg);
			}
		})
	}

	function reveal(){
		$("#header-cart").mouseenter(function(){
			$(".mini-car-list").show();
		});
		$("#header-cart").mouseleave(function(){
			$(".mini-car-list").hide();
		});
		$(".mini-car-list").mouseenter(function(){
			$(".mini-car-list").show();
		});
		$(".mini-car-list").mouseleave(function(){
			$(".mini-car-list").hide();
		});
	}

	function cookie(){
		$(".property-buy-action").on("click",".car",function(){
			var search = (location.search).split("?");
			var str = search[1];
			var id = str.split("=")[1];
				var first = $.cookie("goods") == null ? true:false;
				if(first){
					$.cookie("goods",`[{"id":${id},"num":1}]`,{
						expires:7,path:"/"
					});
				}else{
					var same = false;
					var cookieStr = $.cookie("goods");
						// alert($.cookie("goods"));
					var cookieArr = JSON.parse(cookieStr);
					// alert(cookieArr);
					for(var i = 0; i < cookieArr.length; i++){
						if(cookieArr[i].id == id){
							same = true;
							cookieArr[i].num++;
							cookieArr[i].price*cookieArr[i].num;
							break;
						}
					}

					if(!same){
						var obj = {id:id,num:1};
						cookieArr.push(obj);
					}

					$.cookie("goods", JSON.stringify(cookieArr), {
						expires: 7,
						path:"/"
					})
				}
				$(".header-cart em").html(sc_num());
				sc_msg();
				alert("加入购物车成功");
			})
	}
	function sc_num(){
				var cookieStr = $.cookie("goods");
				if(cookieStr){
					var cookieArr = JSON.parse(cookieStr);
					var sum = 0;
					for(var i = 0; i < cookieArr.length; i++){
						sum += cookieArr[i].num;
					}

					return sum;
				}else{
					return 0;
				}
			}
	function sc_msg(){
				$(".goods").empty();
				$.ajax({
					url:"../data/phone.json",
					success:function(arr){
						var cookieStr = $.cookie("goods");
						if(cookieStr){
							var cookieArr = JSON.parse(cookieStr);
							var goodsArr = [];
							//将存储在cookie中的数据单独拿出来
							for(var i = 0; i < arr.length; i++){
								for(var j = 0; j < cookieArr.length; j++){
									if(arr[i].id == cookieArr[j].id){
										arr[i].num = cookieArr[j].num;
										goodsArr.push(arr[i]);
										
									}
								}
							}
							for(var i = 0; i < goodsArr.length; i++){

								var node = $(`<a href="">
									<img src="${goodsArr[i].img}" alt="">
									<div class="msg">
										<p>${goodsArr[i].title}</p>
										<span>${goodsArr[i].price}</span>
									</div>
								</a>`);

								node.appendTo(".goods");
							}
						}
					},
					error:function(msg){
						console.log(msg);
					}
				})
			}

	return{
		details:details,
		gain:gain,
		reveal:reveal,
		cookie:cookie,
		sc_num:sc_num,
		sc_msg:sc_msg
	}
})