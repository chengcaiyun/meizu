define(["jquery","jquery-cookie"], function($){
	function index(){
		$(function(){
			
			$.ajax({
				url:"../data/adv.json",
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						var node = $(`<li><a href="html/list.html">
								<img src="${arr[i].img}" alt="">
								<em>${arr[i].title}</em>
								<p>${arr[i].msg}</p>
							</a></li>`);
						node.appendTo(".center-wrapper");
					}	
				},
				error:function(msg){
					console.log(msg);
				}
				
			})
		})
	};

	function title(){
		$(function(){
			$.ajax({
				url:"../data/title.json",
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						var node2 =$(`<div class="title">
							<h3>${arr[i].title}</h3>
							</div>
							<div class="box-adv">
							<a href="html/list.html"><img src="${arr[i].img}" alt=""></a>
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
			$.ajax({
				url:"../data/phone.json",
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						if(arr[i].id == 0 || arr[i].id == 1){
							var node1 = $(`<li class="big">
							<div class="goods-box">
								<a href="html/details.html?id=${arr[i].id}" class="box-img">
									<img src="${arr[i].img}" alt="" class="goods-img">
									<span class="box-info">
										<span class="goods-name">${arr[i].title}</span>
										<span class="goods-desc">${arr[i].msg}</span>
										<span class="goods-price"><i>￥</i><em>${arr[i].price}</em></span>
									</span>
									<span class="product-sign red">${arr[i].red}</span>
								</a>
							</div>
						</li>`);
						}else{
							var node1 = $(`<li class="phone">
							<div class="goods-box">
								<a href="html/details.html?id=${arr[i].id}" class="box-img">
									<img src="${arr[i].img}" alt="" class="goods-img">
									<span class="box-info">
										<span class="goods-name">${arr[i].title}</span>
										<span class="goods-desc">${arr[i].msg}</span>
										<span class="goods-price"><i>￥</i><em>${arr[i].price}</em></span>
									</span>
									<span class="product-sign red">${arr[i].red}</span>
								</a>
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
		})
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
$(".header-cart em").html(sc_num());

	function subnav(){
		$.ajax({
			url:"../data/sidebar.json",
			success:function(arr){

				for(var i = 0; i <arr.length; i++){
					var node3 = $(`<li><a href="">${arr[i].title}</a></li>`);
					node3.appendTo(".subnav");
				}


				$(".subnav").on("mouseenter","li",function(){
						$(".submsg").show();
						$(".submsg").find("li").empty();
						var index = $(this).index();
						for(var i = 0; i < arr.length;i++){
								for(var j = 0; j < arr[index].msg.length;j++){
									var node4 = $(`<a href="">
									<img src="${arr[index].msg[j].img}" alt="">
									<div class="msg">
										<p>${arr[index].msg[j].content}</p>
										<span>${arr[index].msg[j].price}</span>
									</div>
									</a>`);
									node4.appendTo(".submsg li")
									}
							}
						});

				$(".yi").on("mouseleave",function(){
					$(".submsg").hide();
				})
			},
			error:function(msg){
				console.log(msg);
			}
		})
	}

	
	return{
		index:index,
		title:title,
		phone:phone,
		subnav:subnav,
		sc_num:sc_num,
		sc_msg:sc_msg	
	}
})