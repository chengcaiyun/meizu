function blurFunc(){
			var oUsername = $("#username");
			var oUsername_alert = $("#alert");
			var oValue = oUsername.val();
			if(oValue.length > 18 || oValue.length < 6 ){
				oUsername_alert.html("长度应为6~18个字符");
				oUsername.val("");

			}else if(/^[0-9_]/.test(oValue)){
				oUsername_alert.html("用户名必须以英文字母开头");
				oUsername.val("");
			}else if(/\W/.test(oValue)){
				oUsername_alert.html("用户名必须是使用字母、数字、下划线组成");
				oUsername.val("");
			}else{
				oUsername_span.html("√用户名合法");
			}
}

function blurFuncm(){
			var ouserpaw = $("#password");
			var oUserpaw_alert = $("#alert");
			var oValue2 = ouserpaw.val();
			if(oValue2.length < 6 || oValue2.length > 18){
				oUserpaw_alert.html("请输入6~18位字符");
				ouserpaw.val("");
			}else{
				ouserpaw.keydown(function(){
					if(/^([0-9]+|[a-z]+|[A-Z]+)$/.test(oValue2)){
			 		oUserpaw_alert.html("密码强度为弱");
				}else if(/[0-9]+/.test(oValue2)&& /[a-z]+/.test(oValue2)&&/[A-Z]+/.test(oValue2) ){
					oUserpaw_alert.html("密码强度为强");
				}else{
					oUserpaw_alert.html("密码强度为中");
				}
				
			})
		}
}