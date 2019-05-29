console.log("加载完成");


require.config({
	paths: {
		jquery: "jquery-1.11.3",
		"jquery-cookie":"jquery-cookie",
		join:"join"
		
	},
	//设置一下，引入js文件的依赖关系
	shim: {
		"jquery-cookie": ['jquery']	
	}
})

require(["commodity","join"],function(commodity,join){
	commodity.commodity();
	commodity.phone();
	join.join();
	commodity.sc_num();
})