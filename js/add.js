define(["jquery","jquery-cookie"],function($){
	function sc_msg(){
				$(".cart-product").empty();
				//在cookie中存储着加入购物车的商品  id,num
				$.ajax({
					url: "../data/phone.json",
					success: function(arr){
						//arr 全部商品的数据
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

							//拿到加载cookie中完整的商品数据以后，直接在页面上加载数据
								var sum =0;
							for(var i = 0; i < goodsArr.length; i++){
								var price = goodsArr[i].price * goodsArr[i].num;
								 sum += price;
								var node = $(`<tr class="cart-product">
							<td class="cart-col-select">
								<a href="" class="cart-product-link">
									<img src="${goodsArr[i].img}" alt="">
								</a>
								<a href="" class="cart-product-info">
									<p class="cart-product-name">${goodsArr[i].title}</p>
									<p class="cart-product-desc">${goodsArr[i].msg}</p>
								</a>
							</td>
							<td class="cart-col-price">
								<p><span class="cart-product-price">${goodsArr[i].price}</span></p>
							</td>
							<td class="cart-col-number">
								<div class="cart-product-number-adder">
									<div class="adder" id="${goodsArr[i].id}">
										<button class="adder-subtract " id="adder-b">-</button>
										<div class="adder-num">
											<input type="text" class="adder-input" value="${goodsArr[i].num}">
										</div>
										<button class="adder-add" id="adder-b">+</button>
									</div>
								</div>
							</td>
							<td class="cart-col-total">
								<span class="cart-product-priced">${price}</span>
							</td>
							<td class="cart-col-ctrl">
								<div class="cart-product-remove" id="${goodsArr[i].id}">删除</div>
							</td>
						</tr>`);

								node.appendTo(".cart-merchant-body");
								
							}
							$(".cart-footer-total").html(sum);

						}
					},
					error: function(msg){
						console.log(msg);
					}
				})
			}


			$(".cart-footer-num").html(sc_num());
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


			function removed(){
				$("#cart-remove").click(function(){
				$.cookie("goods",null,{ path: '/'});
				$(".cart-footer-num").html(sc_num());
				sc_msg();
				})

				$(".cart-merchant-body").on("click", ".cart-product-remove", function(){
				//商品的id
				var id = this.id;
				
				/*
					删除该商品分两步走
					1、删除cookie中该商品
					2、删除页面上的商品节点
				*/
				var cookieArr = JSON.parse($.cookie("goods"));

				for(var i = 0; i < cookieArr.length; i++){
					if(cookieArr[i].id == id){
						cookieArr.splice(i, 1);
						break;
					}
				}
				//判断删除完毕以后数组是否为空
				if(!cookieArr.length){
					$.cookie("goods", null,{path:"/"});
				}else{
					$.cookie("goods", JSON.stringify(cookieArr),{path:"/"});
				}


				//2、删除当前节点
				$(this).closest('.cart-product').remove();

				//3、重新计算数量
				$(".cart-footer-num").html(sc_num());
				var numb = Number($(".cart-footer-total").html());
				var priced = Number($(this).closest(".cart-product").find(".cart-product-priced").html());
				var sumq = numb-priced;
				$(".cart-footer-total").html(sumq);
				return false;
				})


			//通过事件委托，给+和-按钮添加点击事件
			
			$(".cart-merchant-body").on("click", "#adder-b", function(){
				var id = this.parentNode.id;
				var univalence = Number($(this).closest(".cart-product").find(".cart-product-price").html());
				var prices = Number($(this).closest(".cart-product").find(".cart-product-priced").html());
				var numr = Number($(".cart-footer-total").html());
				//1、取出要操作的cookie中的数据
				var cookieArr = JSON.parse($.cookie("goods"));
				for(var i = 0; i < cookieArr.length; i++){
					if(id == cookieArr[i].id){
						if(this.innerHTML == "+"){
							cookieArr[i].num++;
							prices+= univalence;
							numr+=univalence;
							//改变页面的数量
							$(this).closest(".cart-product").find(".adder-input").val(cookieArr[i].num);
							$(this).closest(".cart-product").find(".cart-product-priced").html(prices);
							$(".cart-footer-total").html(numr);
						}else{
							if(cookieArr[i].num == 1){
								$(".adder-subtract").css("cursor","no-drop");
							}else{
								cookieArr[i].num--;
								prices-= univalence;
								numr-=univalence;
								$(this).closest(".cart-product").find(".adder-input").val(cookieArr[i].num);
								$(this).closest(".cart-product").find(".cart-product-priced").html(prices);
								$(".cart-footer-total").html(numr);
							}

						}

						break;
					}
				}

				//重新存储到cookie中
				$.cookie("goods", JSON.stringify(cookieArr), {
					expires: 7,
					path:"/"
				})

				//更新商品数量
				$(".cart-footer-num").html(sc_num());
				
			})

	}
			return{
				sc_msg:sc_msg,
				sc_num:sc_num,
				removed:removed
			}

})