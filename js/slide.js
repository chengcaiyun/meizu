define(["jquery"], function($){
	function slide(){
		$(function(){
			$.ajax({
				url:"../data/banner.json",
				success:function(arr){
					for(var i = 0; i < arr.length;i++){
						if(arr[i].id == 0){
							var node = $(`<li class = "active">${arr[i].id + 1}</li>`);
						}else{
							var node = $(`<li>${arr[i].id + 1}</li>
							`);
						}
						node.appendTo(".banner ol");

						var node1 = $(`<li>
						<a href="html/list.html"><img src="${arr[i].img}
						" alt=""></a>
					</li>`);	
						node1.appendTo(".banner .img");
						};//循环数组的。
						var aBtns = $(".banner").find("ol").find("li");
						var oUl = $(".banner").find(".img");
						var aLis = oUl.find("li");
						var iNow = 0; //设置当前显示的图片的下标
						var timer = null;

				//给按钮添加点击事件
					aBtns.click(function(){
						iNow = $(this).index();
						tab();
					})


				//启动定时器，每隔两秒钟滚动一次
					timer = setInterval(function(){
						iNow++;
					tab();
					}, 4000);



				function tab(){
					aBtns.attr("class", "").eq(iNow).attr("class", "active");
					if(iNow == aLis.size()){
						aBtns.eq(0).attr("class", "active");
					}
					
					
					oUl.stop().animate({
						left: -1261 * iNow
					}, 500, function(){
						//动画结束时候，如果是最后一张图片
						if(iNow == aLis.size()){
							oUl.css("left", 0);
							iNow = 0;
						}
					})
				}


				//给整个banner图，添加移入移出
				$(".banner").mouseenter(function(){
					clearInterval(timer);
				})

				$(".banner").mouseleave(function(){
					timer = setInterval(function(){
						iNow++;

						tab();
					}, 4000);
				})

					
				},
				error:function(msg){
					console.log(msg);
				}
			})
		})
	}

	return{
		slide:slide
	}
})