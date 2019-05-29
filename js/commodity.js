define(["jquery","jquery-cookie"],function($){
	function commodity(){
		$(function(){
			$.ajax({
				url:"../data/title.json",
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						var node2 =$(`
							<div class="box-adv">
							<a href=""><img src="${arr[i].img}" alt=""></a>
						</div>`);
						node2.appendTo(".phone-title");
					};
				},
				error:function(msg){
					console.log(msg);
				}
			})
		})
	}

	function phone(){
		$(function(){
			$(".header-cart em").html(sc_num());
			sc_msg();
			$.ajax({
				url:"../data/phone.json",
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						if(arr[i].id == 0 || arr[i].id == 1){
							var node1 = $(`<li class="big">
							<div class="goods-box">
								<a href="details.html?id=${arr[i].id}" class="box-img">
									<img src="${arr[i].img}" alt="" class="goods-img">
									<span class="box-info">
										<span class="goods-name">${arr[i].title}</span>
										<span class="goods-desc">${arr[i].msg}</span>
										<span class="goods-price"><i>￥</i><em>${arr[i].price}</em></span>
									</span>
									<span class="product-sign red">${arr[i].red}</span>
								</a>
								<div class="car" id="${arr[i].id}">加入购物车</div>
							</div>
						</li>`);
						}else{
							var node1 = $(`<li class="phone">
							<div class="goods-box">
								<a href="details.html?id=${arr[i].id}" class="box-img">
									<img src="${arr[i].img}" alt="" class="goods-img">
									<span class="box-info">
										<span class="goods-name">${arr[i].title}</span>
										<span class="goods-desc">${arr[i].msg}</span>
										<span class="goods-price"><i>￥</i><em>${arr[i].price}</em></span>
									</span>
									<span class="product-sign red">${arr[i].red}</span>
								</a>
								<div class="car" id="${arr[i].id}">加入购物车</div>
							</div>

						</li>`);
						}
						node1.appendTo(".box-row .clearfix");
					}
				},
				error:function(msg){
					console.log(msg);
				}
			})
			$(".box-row .clearfix").on("click",".car",function(){
				var id = this.id;
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

								var node = $(`<a href="#">
									<img src="${goodsArr[i].img}" alt="">
									<div class="msg">
										<p>${goodsArr[i].title}</p>
										<span>${goodsArr[i].price}</span>
									</div>
								</a>`);

								node.appendTo(".goods");
							}
						}
					},error:function(msg){
						console.log(msg);
					}
				})
			}
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
			
	return{
		commodity:commodity,
		phone:phone,
		sc_num:sc_num
	}
})