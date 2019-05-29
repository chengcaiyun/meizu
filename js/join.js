define(["jquery"],function($){
	function join(){
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

	return{
		join:join
	}
})