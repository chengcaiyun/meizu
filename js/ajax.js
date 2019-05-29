			function ajax({method = "get", url, data, success, error}){
				//1、声明ajax对象
				var xhr = null;
				try{
					xhr = new XMLHttpRequest();
				}catch(error){
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}


				//2、open
				if(method == "get" && data){
					url += "?" + data + "&" + new Date().getTime();
				}

				xhr.open(method, url, true);


				//3、send
				if(method == "post"){
					xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
					xhr.send(data);
				}else{
					xhr.send();
				}

				xhr.onreadystatechange = function(){
					/*
						具体下载完数据以后，我们要如何处理数据是不确定
						处理数据代码不能写死

						把这段代码，当做参数传入。
						把一个形参声明函数，把函数传入。
					*/
					if(xhr.readyState == 4){
						//对网络状态的判断
						if(xhr.status == 200){
							if(success){
								success(xhr.responseText);
							}
						}else{
							if(error){
								error("下载错误：" + xhr.status);
							}
						}
					}
				}

			}