define(["jquery"],function($){
	function glass(){
		$(function(){
			var oImg = $(".box-img .img");
			var oBig = $(".box-img .big-img");
			var oBigImg = $(".big-img").find(".move");
			var oShade = $(".img").find("#shade");

			oImg.mouseenter(function(){
				oShade.show();
				oBig.show();
			})
			oImg.mouseleave(function(){
				oShade.hide();
				oBig.hide();
			})
			$(".box-img").mousemove(function(ev){
				var l = ev.clientX - 100 - $(this).offset().left;
				var t = ev.clientY - 100 - $(this).offset().top;

				if(l <= 0){
					l=0;
				}
				if(l >= 360){
					l = 360;
				}
				if(t <= 0){
					t= 0;
				}
				if(t >= 360){
					t = 360;
				}

				oShade.css({
					left:l,
					top:t
				})
				oBigImg.css({
					left:2 * -l,
					top:2 * -t
				})
				
			})
		})
	}

	return{
		glass:glass
	}
})