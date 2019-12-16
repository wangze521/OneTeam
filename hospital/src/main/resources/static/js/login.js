    var loginBox = new LightBox("loginBox");//登录弹窗
	var topZcBox = new LightBox("topZcBox");//注册弹窗
	var lb_tel_check = new LightBox("lb_tel_check"); //手机校验弹窗
	var topYzBox = new LightBox("topYzBox");
	function topRegExchange(){
		//邮箱、手机注册切换
		$("#zc_mobile").bind("click",function(){
			var mobileHeight=$("#zc_mobile_box").height()+40;
			if(!$(this).hasClass("on")){
				$(this).addClass("on");
				$(this).siblings("i").stop().animate({left:'0%'});
				$("#zc_conbox").stop().animate({marginLeft:"0px", height:mobileHeight},"300");
				$("#zc_email").removeClass("on");
			}
		});
		$("#zc_email").bind("click",function(){
			var emailHeight=$("#zc_mobile_box").height()+40;
			if(!$(this).hasClass("on")){
				$(this).addClass("on");
				$(this).siblings("i").stop().animate({left:'50%'});
				$("#zc_conbox").stop().animate({marginLeft:"-532px", height:emailHeight},"300");
				$("#zc_mobile").removeClass("on");
			}
		});
	};
	topRegExchange(); //注册切换
    $('#myyyk').hide();
	(function() {
		jQuery.post("/user/login.json", function(result) {
    				if (result.status == 0) {
                        $("#newLoginBox").show();
                        $("#loginInfo").hide();
        			} else {
                        //var username = result.username + "(" + result.nickname + ")";
                        var username = result.username;
                        var nickname = result.nickname;
                        if(""!=nickname&&nickname!=null){
                        	username=nickname;
                        }
                        $("#NavNickName").text(username);
                        $("#NavNickName").attr("title",username);
                        $("#loginInfo").show();
                        $("#newLoginBox").hide();
                        var userinfoWidth=$(".n_userinfo em a").width();
                        if(userinfoWidth - 100 > 0){
                            $(".n_userinfo em a").css("width","100px");
                        }
        			}
    			}, "json");
                myYYK();
	})();
        	$("#top_loginButton").bind({"click":function () {
				var userName = $("#top_login_mobile").val();
				var password = $("#top_login_password").val();
				if("手机号、邮箱、用户名" == userName || password == "") {
					$("#top_login_mobile_tip").attr("class","yz_no");
					$("#top_login_password_tip_else").attr("class","yz_no");
					$("#top_login_password_tip").html("请正确输入用户名和密码！");
				}else {
					$.ajax({
					type : 'post',
					url : '/user/posted.json',
					data : {'userName' : userName, 'password' : password},
					dataType : 'json',
					success : function(result) {
						if (result.success == 0) {
							location.reload();
						} else {
							$("#top_login_mobile_tip").attr("class","yz_no");
							$("#top_login_password_tip_else").attr("class","yz_no");
							$("#top_login_password_tip").html("请正确输入用户名和密码！");
						}
					}
				});
			}
		}});
            function exit() {
                jQuery.ajax({
                    url :"/user/logout.json?temp=" + new Date(),
                    success : function() {
                        if (location.pathname.indexOf("yuyue") > -1) {
                            self.location.href = "http://yyk.39.net";
                        }
                        else if (location.pathname.indexOf("weihu") > -1) {
                            self.location.href = "http://yyk.39.net";
                        }
                        else if (location.pathname.indexOf("pdata") > -1) {
                            self.location.href = "http://yyk.39.net";
                        }
                        else if (location.pathname.indexOf("index") > -1) {
                            self.location.href = "http://yyk.39.net";
                        }
                        else if (location.pathname.indexOf("changepwd") > -1) {
                            self.location.href = "http://yyk.39.net";
                        }
                        else {
                            location.reload();
                        }
                    }
                });
            }
            function myYYK() {
                jQuery.ajax({
                    url:"/getMyYYK.jsonp",
                    dataType:'json',
                    success:function (result) {
                        var status = result.myYYKStatus;
                        if (status == 1) {
                            //购卡未成功
                            $('#myyyk').append('<div class="ass-cons1"><p>'+result.lastOrderInfo.partnerName+result.lastOrderInfo.cardName+'尚未购买成功，还差一步即可预约挂号</p><a href="/register/payagain.html?pid='+result.memberId+'&pi='+result.lastOrderInfo.partnerId+'&ct='+result.lastOrderInfo.cardType+'&localOrderId='+result.lastOrderInfo.orderId+'&price='+result.lastOrderInfo.price+'" class="btnss btnss1" title="立即支付">立即支付</a></div><div class="ass-bot">已成功预约：<i>'+result.registerInfoCount+'</i> 次&nbsp;&nbsp;&nbsp;&nbsp;就诊成员：<i>'+result.registerUserCount+'</i> 人</div>');
                            $('#hzzjyy3').hide();
                            $('#myyyk').show();
                        } else if (status == 2) {
                            //最近预约
							var labName = '';
							if(result.lastRegisterInfo.PARTNER_LAB_NAME != null) {
								labName = result.lastRegisterInfo.PARTNER_LAB_NAME;
							}
                            $('#myyyk').append('<div class="ass-cons2"><p>最近预约：'+result.lastRegisterInfo.PARTNER_HOSPITAL_NAME+' '+labName+' <a href="/doctor/'+result.lastRegisterInfo.DOCTOR_ID+'.html">'+result.lastRegisterInfo.PARTNER_DOCTOR_NAME+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/user/yuyue.html">查看详情&gt;&gt;</a></p></div><div class="ass-bot">已成功预约：<i>'+result.registerInfoCount+'</i> 次&nbsp;&nbsp;&nbsp;&nbsp;就诊成员：<i>'+result.registerUserCount+'</i> 人</div>');
                            $('#hzzjyy3').hide();
                            $('#myyyk').show();
                        } else if (status == 3) {
                            //尚未预约
                            $('#myyyk').append('<div class="ass-cons3"><p>您尚未预约挂号</p><a href="/search/c_guahao" class="btnss btnss1" title="马上预约">马上预约</a></div>');
                            $('#hzzjyy3').hide();
                            $('#myyyk').show();
                        } else {
                            //不显示我的就医助手
                            $('#myyyk').hide();
                            $('#hzzjyy3').show();
                        }
                    }
                });
            }
            function bindExchange(){
	//邮箱、手机绑定切换
	$("#bd_mobile").on("click",function(){
		var mobileHeight=$("#bd_mobile_box").height()+40;
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			$(this).siblings("i").stop().animate({left:'0%'});
			$("#bd_conbox").stop().animate({marginLeft:"0px", height:mobileHeight},"300");
			$("#bd_email").removeClass("on");
		}
	});
	$("#bd_email").on("click",function(){
		var emailHeight=$("#bd_email_box").height()+40;
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			$(this).siblings("i").stop().animate({left:'50%'});
			$("#bd_conbox").stop().animate({marginLeft:"-532px", height:emailHeight},"300");
			$("#bd_mobile").removeClass("on");
		}
	});
};

$("#top_zc_mobile_password_one").bind({"click":function () {
	var text = $("#top_zc_mobile_password_one").val();
	if(text =="") {
		$("#top_mobile_mima").hide();
	}
	$("#top_zc_mobile_password_one_span").html("");
	$("#top_zc_mobile_password_two_span").html("");
	$("#top_zc_mobile_password_one_tip").attr("class","");
}, "blur":function () {
	var text = $("#top_zc_mobile_password_one").val();
    if(text != "" && text.length >=6 && text.length <=16) {
    	$("#top_zc_mobile_password_one_tip").attr("class","yz_yes");
    }else if(text == ""){
    	$("#top_mobile_mima").show();
    }else {
    	$("#top_zc_mobile_password_one_tip").attr("class","yz_no");
    	$("#top_zc_mobile_password_one_span").html("请输入6-16位密码！");
    }
}});
$("#top_zc_mobile_password_two").bind({"click":function () {
	var text = $("#top_zc_mobile_password_two").val();
	if(text =="") {
		$("#top_mobile_mima_two").hide();
	}
	$("#top_zc_mobile_password_one_span").html("");
	$("#top_zc_mobile_password_two_span").html("");
	$("#top_zc_mobile_password_two_tip").attr("class","");
}, "blur":function () {
	var text1 = $("#top_zc_mobile_password_two").val();
	var text2 = $("#top_zc_mobile_password_one").val();
    if(text1 != "" && text1 == text2) {
    	$("#top_zc_mobile_password_two_tip").attr("class","yz_yes");
    	$("#top_zc_mobile_password_two_span").html("");
    }else if( text1 == ""){
    	$("#top_mobile_mima_two").show();
    }else {
    	$("#top_zc_mobile_password_two_tip").attr("class","yz_no");
    	$("#top_zc_mobile_password_two_span").html("两次输入密码不一致！");
    }
}});
$("#top_zc_Email_password_one").bind({"click":function () {
	var text = $("#top_zc_Email_password_one").val();
	if(text == "") {
		$("#top_email_mima").hide();
	}
	$("#top_zc_Email_password_one_span").html("");
	$("#top_zc_Email_password_two_span").html("");
	$("#top_zc_Email_password_one_tip").attr("class","");
}, "blur":function () {
	var text = $("#top_zc_Email_password_one").val();
    if(text != "" && text.length >=6 && text.length <=16) {
    	$("#top_zc_Email_password_one_tip").attr("class","yz_yes");
    }else if(text == ""){
    	$("#top_email_mima").show();
    }else {
    	$("#top_zc_Email_password_one_tip").attr("class","yz_no");
    	$("#top_zc_Email_password_one_span").html("请输入6—16位密码！");
    }
}});
$("#top_zc_Email_password_two").bind({"click":function () {
	var text = $("#top_zc_Email_password_two").val();
	if(text == "") {
		$("#top_email_mima_two").hide();
	}
	$("#top_zc_Email_password_one_span").html("");
	$("#top_zc_Email_password_two_span").html("");
	$("#top_zc_Email_password_two_tip").attr("class","");
}, "blur":function () {
	var text1 = $("#top_zc_Email_password_two").val();
	var text2 = $("#top_zc_Email_password_one").val();
    if(text1 != "" && text1 == text2) {
    	$("#top_zc_Email_password_two_tip").attr("class","yz_yes");
    	$("#top_zc_Email_password_two_span").html("");
    }else if(text1 == ""){
    	$("#top_email_mima_two").show();
    }else {
    	$("#top_zc_Email_password_two_tip").attr("class","yz_no");
    	$("#top_zc_Email_password_two_span").html("两次输入密码不一致！");
    }
}});
$("#top_login_mobile").bind({"click":function () {
	$("#top_login_password_tip").html("");
	var text = $("#top_login_mobile").val();
	if("手机号、邮箱、用户名" == text) {
		$("#top_login_mobile").css("color","#333");
		$("#top_login_mobile").val("");
	}
}, "blur":function () {
	var text = $("#top_login_mobile").val();
    if(text == "") {
    	$("#top_login_mobile").css("color","#999");
    	$("#top_login_mobile").val("手机号、邮箱、用户名");
    }else if(text != "手机号、邮箱、用户名"){
    	$("#top_login_mobile_tip").attr("class","yz_yes");
    }
}});
$("#top_login_password").bind({"click":function () {
	$("#top_login_password").css("color","#333");
	$("#top_login_password_tip").html("");
}, "blur":function () {
	var text = $("#top_login_password").val();
    if(text == "") {
    	$("#top_login_password_tip_else").attr("class","yz_no");
    }else {
    	$("#top_login_password_tip_else").attr("class","yz_yes");
    }
}});
$("#top_zc_phone").bind({"click":function () {
	$("#top_zc_mobile_tip").attr("class","");
	$("#top_zc_mobile_span").html("");
	var text = $("#top_zc_phone").val();
	if("手机号码" == text) {
		$("#top_zc_phone").css("color","#333");
		$("#top_zc_phone").val("");
	}
}, "blur":function () {
	var text = $("#top_zc_phone").val();
    if(text == "") {
    	$("#top_zc_phone").css("color","#999");
    	$("#top_zc_phone").val("手机号码");
    }else if(text != "手机号码") {
    	var reg = /^0?1[358]\d{9}$/;
        if (!reg.test(text)) {
        	$("#top_zc_mobile_tip").attr("class","yz_no");
        	$("#topMobileChkSum").val(false);
        } else {
        	$("#top_zc_mobile_tip").attr("class","yz_yes");
        	$("#topMobileChkSum").val(true);
        }
    }
}});
$("#top_zc_Email").bind({"click":function () {
	$("#top_zc_Email_tip").attr("class","");
	$("#top_zc_Email_span").html("");
	var text = $("#top_zc_Email").val();
	if("邮箱" == text) {
		$("#top_zc_Email").css("color","#333");
		$("#top_zc_Email").val("");
	}
}, "blur":function () {
	var text = $("#top_zc_Email").val();
    if(text == "") {
    	$("#top_zc_Email").css("color","#999");
    	$("#top_zc_Email").val("邮箱");
    }else if(text != "邮箱") {
    	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!reg.test(text)) {
        	$("#top_zc_Email_tip").attr("class","yz_no");
        	$("#topEmailChkSum").val(false);
        } else {
        	$.ajax({
    			url:"/user/verifyEmail.json",
                async:false,
                data:"email=" + text,
                success:function (result) {
                    if(result.isSuccess == true){
                    	$("#top_zc_Email_tip").attr("class","yz_yes");
                    	$("#topEmailChkSum").val(true);
                    }else{
                    	$("#top_zc_Email_span").html("该邮箱已被验证，请直接登录！");
                    	$("#top_zc_Email_tip").attr("class","yz_no");
                    }
                }
            });
        	
        }
    }
}});
$("#bd_phone").bind({"click":function () {
	var text = $("#bd_phone").val();
	if("手机号" == text) {
		$("#bd_phone").val("");
	}
}, "blur":function () {
	var text = $("#bd_phone").val();
    if(text == "") {
    	$("#bd_phone").val("手机号");
    }
}});
$("#bd_Email").bind({"click":function () {
	var text = $("#bd_Email").val();
	if("邮箱" == text) {
		$("#bd_Email").val("");
	}
}, "blur":function () {
	var text = $("#bd_Email").val();
    if(text == "") {
    	$("#bd_Email").val("邮箱");
    }
}});
$("#top_zc_token").bind({"click":function () {
	var text = $("#top_zc_token").val();
	if(text == "验证码") {
		$("#top_zc_token").css("color","#333");
		$("#top_zc_token").val("");
	}
	$("#top_zc_token_tip").attr("class","");
	$("#top_zc_token_tip").html("");
}, "blur":function () {
	var mobile = $("#top_zc_phone").val();
	var token = $("#top_zc_token").val();
	if(token == "" ) {
		$("#top_zc_token").css("color","#999");
		$("#top_zc_token").val("验证码");
	}else if(token != "验证码") {
		$.ajax({
			type : 'post',
			url : '/user/action/verifyToken.json',
			data : {'mobile' : mobile, 'token' : token},
			dataType : 'json',
			success : function(result) {
				$("#topSecurityCodeChkSum").val(result.chksum);
				if(result.isSuccess == true){
					$("#top_zc_token_tip").attr("class","yz_yes");
					$("#topTokenChkSum").val(true);
				} else {
					$("#top_zc_token_tip").attr("class","yz_no");
					$("#top_zc_token_tip").html("验证码错误！");
					$("#topTokenChkSum").val(false);
				}
			}
		});
	}
}});
function topSendSecurity(mobileId) {
	var mobile = $('#'+mobileId).val();
	var reg = /^0?1[358]\d{9}$/;
	var flag = false; 
    if (reg.test(mobile)) {
    	flag = true;
    } 
	if (flag == true ) {
		$.ajax({
			url:"/user/verifyPhone.json",
            async:false,
            data:"phone=" + mobile,
            success:function (result) {
                if(result.isSuccess == true){
                	flag = true;
                }else{
                	$("#top_zc_mobile_span").html("该号码已被验证，请直接登录！");
                	$("#top_zc_mobile_tip").attr("class","yz_no");
                    flag = false;
                }
            }
        });
	}
	if (flag == true) {
		$.ajax({
            url:"/user/action/sendToken.json",
            async:false,
            data:"mobile=" + mobile,
            success:function (result) {
            	$("#topTokenChkSum").val(result.chksum);
                if(result.isSuccess == true){
                	$("#top_zc_mobile_span").html("验证码发送成功！");
                	$("#top_zc_mobile_tip").attr("class","yz_yes");
                }else{
                	$("#top_zc_mobile_span").html("验证码发送失败！");
                	$("#top_zc_mobile_tip").attr("class","yz_no");
                }
            }
        });
		var tokenStatus = $("#topTokenChkSum").val().trim();
		if (tokenStatus != 'null') {
			var  intWait = 60;
            var objInter; 
            function CountTimeToReSend() {
                if (intWait > 0) { 
                    var strMsg = String(intWait) + "秒后再发送";
                    $("#top_zc_send").attr("value", strMsg);
                    intWait--;
                }else { 
                    intWait = 60; 
                    clearInterval(objInter);
                    $("#top_zc_send").attr("value","获取验证码");
                    $('#top_zc_send').attr('onclick',"topSendSecurity('top_zc_phone')");
                }
            }
            if (true){
            	$('#top_zc_send').attr('onclick','');
            	objInter = setInterval(function () { CountTimeToReSend(); }, 1000);
            }
            else{
               clearInterval(objInter);
            }
            
		}
	}
}
function topMobileZc() {
	var mobile = $("#top_zc_phone").val();
	var topMobileChkSum = $("#topMobileChkSum").val();
	var topTokenChkSum = $("#topTokenChkSum").val();
	var pwd1 = $("#top_zc_mobile_password_one").val();
	var pwd2 = $("#top_zc_mobile_password_two").val();
	if((topMobileChkSum == 'true') && (topTokenChkSum == 'true') && (pwd1 != "") && (pwd1 == pwd2)) {
		$.ajax({
            url:"/user/action/newRegister.json",
            async:false,
            data:{"mobile" : mobile,"email":"","pwd":pwd1},
            success:function (result) {
                if(result.isSuccess == true){
                	location.reload();
                }else{
                	$("#top_zc_mobile_password_two_span").html("注册失败！");
                }
            }
        });
	}else {
		if(topMobileChkSum != 'true') {
			$("#top_zc_mobile_tip").attr("class","yz_no");
		}if(topTokenChkSum != 'true') {
			$("#top_zc_token_tip").attr("class","yz_no");
		}if(pwd1 == "") {
			$("#top_zc_mobile_password_one_tip").attr("class","yz_no");
		}if(pwd1 != pwd2) {
			$("#top_zc_mobile_password_two_tip").attr("class","yz_no");
		}if(pwd2 == "") {
			$("#top_zc_mobile_password_two_tip").attr("class","yz_no");
		}
		$("#top_zc_mobile_password_two_span").html("请检查注册信息是否正确！");
	}
};
function topEmailZc() {
	var email = $("#top_zc_Email").val();
	var topEmailChkSum = $("#topEmailChkSum").val();
	var pwd1 = $("#top_zc_Email_password_one").val();
	var pwd2 = $("#top_zc_Email_password_two").val();
	
	if((topEmailChkSum == 'true') && (pwd1 != "") && (pwd1 == pwd2)) {
		$.ajax({
            url:"/user/action/newRegister.json",
            async:false,
            data:{"mobile" : "","email":email,"pwd":pwd1},
            success:function (result) {
                if(result.isSuccess == true){
                	var s = email.split("@");
					var emailUrl = "http://mail." + s[1];
					$("#yz_email").html(email);
					$("#top_yz_email_url").attr("href",emailUrl);
                	topZcBox.Close();
                	topYzBox.Show();
                }else{
                	$("#top_zc_Email_password_two_span").html("注册失败！");
                }
            }
        });
	}else {
		if(topEmailChkSum != 'true') {
			$("#top_zc_Email_tip").attr("class","yz_no");
		}if(pwd1 == "") {
			$("#top_zc_Email_password_one_tip").attr("class","yz_no");
		}if(pwd1 != pwd2) {
			$("#top_zc_Email_password_two_tip").attr("class","yz_no");
		}if(pwd2 == "") {
			$("#top_zc_Email_password_two_tip").attr("class","yz_no");
		}
		$("#top_zc_Email_password_two_span").html("请检查注册信息是否正确！");
	}
};
$("#top_yz_email_url").bind({"click":function () {
	location.reload();
}});
$("#jizhu").bind({"click":function () {
	var c = $("#jizhuC").val();
	if(c == "0") {
		$("#jizhuC").val(1);
		$("#jizhu").attr("class","yyk_checkbox checked");
	}else {
		$("#jizhuC").val(0);
		$("#jizhu").attr("class","yyk_checkbox");
	}
}});
$("#xiaci").bind({"click":function () {
	var c = $("#xiaciC").val();
	if(c == "0") {
		$("#xiaciC").val(1);
		$("#xiaci").attr("class","yyk_checkbox checked");
	}else {
		$("#xiaciC").val(0);
		$("#xiaci").attr("class","yyk_checkbox");
	}
}});


$("#telLogin").bind({"click":function(){
	lb_tel_check.Close();
	loginBox.Show();
}});
var pid = getCookie("pid");
var timer;
$("#getCode").bind({"click":function(){
	$("#getCode").attr("disabled","disabled");
	var telNo = $("#telNo").val();
	var reg = /^0?1[34578]\d{9}$/;
    if (!reg.test(telNo)) {
    	$(".alert").html("<b>请输入正确的手机号码</b>");
    	$("#getCode").attr("disabled",false);
    	return false;
    }else{
    	$(".alert").html("");
		$.post(
				"/user/CheckPhone.json",
				{phone:telNo,pid:pid},
				function(value){
					sendCode(telNo,pid,value.typeID);//发送验证码
				});
		}
	}});
var timer;
var unbindPhone = 0;
/// 给手机号发送一条验证短信，并登记验证码等待验证
function sendCode(telNo,pid,typeId){
		$.post(
				"/user/SendPhoneAudit.json",
				{phone:telNo,pid:pid},
				function(value){
					if(value.success){
						if(typeId>0){
							unbindPhone = 1;
							$(".alert").html("<b>该手机已被占用，继续操作将解绑其它账号<b>");
						}else{
							unbindPhone = 0;
							$(".alert").html("<b>验证码已发送至您的手机<b>");
						}
						timer = setInterval("reSendCode();", 1000 );
					}else{
						$("#getCode").attr("disabled",false);
						$(".alert").html("<b>"+value.info.value+",<b>");
					}
				}
		);
};
var count=120;//因为通行证那边需要两分钟后才能获取验证码
function reSendCode(){
	if(count<0){
		clearInterval(timer);
		$("#getCode").attr("class","check-btn");
		$("#getCode").val("获取验证码");
		$("#getCode").attr("disabled",false);
		count = 120;
	}else{
		$("#getCode").attr("class","check-btn check-btn-dis");
		$("#getCode").val("重新获取"+count+"s");
		count--;
	}
}

$("#submitCode").bind({"click":function(){
	$("#submitCode").attr("disabled",true);
	var telNo = $("#telNo").val();
	var code = $(".sort").val();
	var reg = /^0?1[34578]\d{9}$/;
    if (!reg.test(telNo)) {
    	$(".alert").html("<b>请输入正确的手机号码<b>");
    	$("#submitCode").attr("disabled",false);
    	return false;
    }else if(code == ""){
    	$(".alert").html("<b>请输入验证码<b>");
    	$("#submitCode").attr("disabled",false);
		return false;
	}else{
		$.post(
			"/user/AuditPhoneToken.json",
			{pid:pid,token:code,unBindPhone:unbindPhone,phone:telNo},
			function(result){
				if(result.success&&(result.typeID==0)){
					$(".alert").html("通过验证，正在跳转...");
					setInterval("window.location.reload();", 2000 );
				}else{
					$("#submitCode").attr("disabled",false);
					$(".alert").html("<b>"+result.info.value+"<b>");
					return false;
				}
			}
		);
	}
}});


function getCookie(objName){//获取指定名称的cookie的值
  	 var arrStr = document.cookie.split("; ");
  	 for(var i = 0;i < arrStr.length;i ++){
  	 var temp = arrStr[i].split("=");
  	 if(temp[0] == objName) return unescape(temp[1]);
  	}
  } 

//初始化
Passport.SetOptions({
    AppId: 8,
    PlatformId: 1,
    LoginCallback: LoginCallback,
    PopSkip: false,
    CheckLoginCache: 1440,
    MyHost: "my.39.net"
});

// 定义回调方法
function LoginCallback(cbtype, data) {
	if(data.Success){
		location.reload();
	}
}