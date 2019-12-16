    var loginBox = new LightBox("loginBox");//��¼����
	var topZcBox = new LightBox("topZcBox");//ע�ᵯ��
	var lb_tel_check = new LightBox("lb_tel_check"); //�ֻ�У�鵯��
	var topYzBox = new LightBox("topYzBox");
	function topRegExchange(){
		//���䡢�ֻ�ע���л�
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
	topRegExchange(); //ע���л�
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
				if("�ֻ��š����䡢�û���" == userName || password == "") {
					$("#top_login_mobile_tip").attr("class","yz_no");
					$("#top_login_password_tip_else").attr("class","yz_no");
					$("#top_login_password_tip").html("����ȷ�����û��������룡");
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
							$("#top_login_password_tip").html("����ȷ�����û��������룡");
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
                            //����δ�ɹ�
                            $('#myyyk').append('<div class="ass-cons1"><p>'+result.lastOrderInfo.partnerName+result.lastOrderInfo.cardName+'��δ����ɹ�������һ������ԤԼ�Һ�</p><a href="/register/payagain.html?pid='+result.memberId+'&pi='+result.lastOrderInfo.partnerId+'&ct='+result.lastOrderInfo.cardType+'&localOrderId='+result.lastOrderInfo.orderId+'&price='+result.lastOrderInfo.price+'" class="btnss btnss1" title="����֧��">����֧��</a></div><div class="ass-bot">�ѳɹ�ԤԼ��<i>'+result.registerInfoCount+'</i> ��&nbsp;&nbsp;&nbsp;&nbsp;�����Ա��<i>'+result.registerUserCount+'</i> ��</div>');
                            $('#hzzjyy3').hide();
                            $('#myyyk').show();
                        } else if (status == 2) {
                            //���ԤԼ
							var labName = '';
							if(result.lastRegisterInfo.PARTNER_LAB_NAME != null) {
								labName = result.lastRegisterInfo.PARTNER_LAB_NAME;
							}
                            $('#myyyk').append('<div class="ass-cons2"><p>���ԤԼ��'+result.lastRegisterInfo.PARTNER_HOSPITAL_NAME+' '+labName+' <a href="/doctor/'+result.lastRegisterInfo.DOCTOR_ID+'.html">'+result.lastRegisterInfo.PARTNER_DOCTOR_NAME+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/user/yuyue.html">�鿴����&gt;&gt;</a></p></div><div class="ass-bot">�ѳɹ�ԤԼ��<i>'+result.registerInfoCount+'</i> ��&nbsp;&nbsp;&nbsp;&nbsp;�����Ա��<i>'+result.registerUserCount+'</i> ��</div>');
                            $('#hzzjyy3').hide();
                            $('#myyyk').show();
                        } else if (status == 3) {
                            //��δԤԼ
                            $('#myyyk').append('<div class="ass-cons3"><p>����δԤԼ�Һ�</p><a href="/search/c_guahao" class="btnss btnss1" title="����ԤԼ">����ԤԼ</a></div>');
                            $('#hzzjyy3').hide();
                            $('#myyyk').show();
                        } else {
                            //����ʾ�ҵľ�ҽ����
                            $('#myyyk').hide();
                            $('#hzzjyy3').show();
                        }
                    }
                });
            }
            function bindExchange(){
	//���䡢�ֻ����л�
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
    	$("#top_zc_mobile_password_one_span").html("������6-16λ���룡");
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
    	$("#top_zc_mobile_password_two_span").html("�����������벻һ�£�");
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
    	$("#top_zc_Email_password_one_span").html("������6��16λ���룡");
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
    	$("#top_zc_Email_password_two_span").html("�����������벻һ�£�");
    }
}});
$("#top_login_mobile").bind({"click":function () {
	$("#top_login_password_tip").html("");
	var text = $("#top_login_mobile").val();
	if("�ֻ��š����䡢�û���" == text) {
		$("#top_login_mobile").css("color","#333");
		$("#top_login_mobile").val("");
	}
}, "blur":function () {
	var text = $("#top_login_mobile").val();
    if(text == "") {
    	$("#top_login_mobile").css("color","#999");
    	$("#top_login_mobile").val("�ֻ��š����䡢�û���");
    }else if(text != "�ֻ��š����䡢�û���"){
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
	if("�ֻ�����" == text) {
		$("#top_zc_phone").css("color","#333");
		$("#top_zc_phone").val("");
	}
}, "blur":function () {
	var text = $("#top_zc_phone").val();
    if(text == "") {
    	$("#top_zc_phone").css("color","#999");
    	$("#top_zc_phone").val("�ֻ�����");
    }else if(text != "�ֻ�����") {
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
	if("����" == text) {
		$("#top_zc_Email").css("color","#333");
		$("#top_zc_Email").val("");
	}
}, "blur":function () {
	var text = $("#top_zc_Email").val();
    if(text == "") {
    	$("#top_zc_Email").css("color","#999");
    	$("#top_zc_Email").val("����");
    }else if(text != "����") {
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
                    	$("#top_zc_Email_span").html("�������ѱ���֤����ֱ�ӵ�¼��");
                    	$("#top_zc_Email_tip").attr("class","yz_no");
                    }
                }
            });
        	
        }
    }
}});
$("#bd_phone").bind({"click":function () {
	var text = $("#bd_phone").val();
	if("�ֻ���" == text) {
		$("#bd_phone").val("");
	}
}, "blur":function () {
	var text = $("#bd_phone").val();
    if(text == "") {
    	$("#bd_phone").val("�ֻ���");
    }
}});
$("#bd_Email").bind({"click":function () {
	var text = $("#bd_Email").val();
	if("����" == text) {
		$("#bd_Email").val("");
	}
}, "blur":function () {
	var text = $("#bd_Email").val();
    if(text == "") {
    	$("#bd_Email").val("����");
    }
}});
$("#top_zc_token").bind({"click":function () {
	var text = $("#top_zc_token").val();
	if(text == "��֤��") {
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
		$("#top_zc_token").val("��֤��");
	}else if(token != "��֤��") {
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
					$("#top_zc_token_tip").html("��֤�����");
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
                	$("#top_zc_mobile_span").html("�ú����ѱ���֤����ֱ�ӵ�¼��");
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
                	$("#top_zc_mobile_span").html("��֤�뷢�ͳɹ���");
                	$("#top_zc_mobile_tip").attr("class","yz_yes");
                }else{
                	$("#top_zc_mobile_span").html("��֤�뷢��ʧ�ܣ�");
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
                    var strMsg = String(intWait) + "����ٷ���";
                    $("#top_zc_send").attr("value", strMsg);
                    intWait--;
                }else { 
                    intWait = 60; 
                    clearInterval(objInter);
                    $("#top_zc_send").attr("value","��ȡ��֤��");
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
                	$("#top_zc_mobile_password_two_span").html("ע��ʧ�ܣ�");
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
		$("#top_zc_mobile_password_two_span").html("����ע����Ϣ�Ƿ���ȷ��");
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
                	$("#top_zc_Email_password_two_span").html("ע��ʧ�ܣ�");
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
		$("#top_zc_Email_password_two_span").html("����ע����Ϣ�Ƿ���ȷ��");
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
    	$(".alert").html("<b>��������ȷ���ֻ�����</b>");
    	$("#getCode").attr("disabled",false);
    	return false;
    }else{
    	$(".alert").html("");
		$.post(
				"/user/CheckPhone.json",
				{phone:telNo,pid:pid},
				function(value){
					sendCode(telNo,pid,value.typeID);//������֤��
				});
		}
	}});
var timer;
var unbindPhone = 0;
/// ���ֻ��ŷ���һ����֤���ţ����Ǽ���֤��ȴ���֤
function sendCode(telNo,pid,typeId){
		$.post(
				"/user/SendPhoneAudit.json",
				{phone:telNo,pid:pid},
				function(value){
					if(value.success){
						if(typeId>0){
							unbindPhone = 1;
							$(".alert").html("<b>���ֻ��ѱ�ռ�ã�������������������˺�<b>");
						}else{
							unbindPhone = 0;
							$(".alert").html("<b>��֤���ѷ����������ֻ�<b>");
						}
						timer = setInterval("reSendCode();", 1000 );
					}else{
						$("#getCode").attr("disabled",false);
						$(".alert").html("<b>"+value.info.value+",<b>");
					}
				}
		);
};
var count=120;//��Ϊͨ��֤�Ǳ���Ҫ�����Ӻ���ܻ�ȡ��֤��
function reSendCode(){
	if(count<0){
		clearInterval(timer);
		$("#getCode").attr("class","check-btn");
		$("#getCode").val("��ȡ��֤��");
		$("#getCode").attr("disabled",false);
		count = 120;
	}else{
		$("#getCode").attr("class","check-btn check-btn-dis");
		$("#getCode").val("���»�ȡ"+count+"s");
		count--;
	}
}

$("#submitCode").bind({"click":function(){
	$("#submitCode").attr("disabled",true);
	var telNo = $("#telNo").val();
	var code = $(".sort").val();
	var reg = /^0?1[34578]\d{9}$/;
    if (!reg.test(telNo)) {
    	$(".alert").html("<b>��������ȷ���ֻ�����<b>");
    	$("#submitCode").attr("disabled",false);
    	return false;
    }else if(code == ""){
    	$(".alert").html("<b>��������֤��<b>");
    	$("#submitCode").attr("disabled",false);
		return false;
	}else{
		$.post(
			"/user/AuditPhoneToken.json",
			{pid:pid,token:code,unBindPhone:unbindPhone,phone:telNo},
			function(result){
				if(result.success&&(result.typeID==0)){
					$(".alert").html("ͨ����֤��������ת...");
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


function getCookie(objName){//��ȡָ�����Ƶ�cookie��ֵ
  	 var arrStr = document.cookie.split("; ");
  	 for(var i = 0;i < arrStr.length;i ++){
  	 var temp = arrStr[i].split("=");
  	 if(temp[0] == objName) return unescape(temp[1]);
  	}
  } 

//��ʼ��
Passport.SetOptions({
    AppId: 8,
    PlatformId: 1,
    LoginCallback: LoginCallback,
    PopSkip: false,
    CheckLoginCache: 1440,
    MyHost: "my.39.net"
});

// ����ص�����
function LoginCallback(cbtype, data) {
	if(data.Success){
		location.reload();
	}
}