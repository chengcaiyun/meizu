console.log('加载完成');

require.config({
	paths: {
		jquery: "jquery-1.11.3",
		"jquery-cookie":"jquery-cookie",
		add:"add"
		
	},
	//设置一下，引入js文件的依赖关系
	shim: {
		"jquery-cookie": ['jquery']	
	}
})


require(["add"],function(add){
	add.sc_msg();
	add.sc_num();
	add.removed();
})