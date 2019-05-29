console.log("加载完成");


require.config({
	paths: {
		jquery: "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		index: "index",
		slide: "slide",
		join:"join"
	},
	//设置一下，引入js文件的依赖关系
	shim: {
		"jquery-cookie": ['jquery']	
	}
})

require(["slide","index","join"], function(slide,index,join){
	slide.slide(); //banner图
	index.index();
	index.title();
	index.phone();
	index.subnav();
	index.sc_num();
	index.sc_msg();
	join.join();
	
})