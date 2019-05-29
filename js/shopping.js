console.log("加载完成");

require.config({
	paths: {
		jquery: "jquery-1.11.3",
		"jquery-cookie":"jquery-cookie",
		glass:"glass"
	},
	//设置一下，引入js文件的依赖关系
	shim: {
		"jquery-cookie": ['jquery']	
	}
})

require(["details","glass","join"],function(details,glass,join){
	details.details();
	glass.glass();
	details.gain();
	details.cookie();
	details.sc_num();
	details.sc_msg();
	join.join();
})