/*//显示与隐藏元素
function showItem(id,isTrue){
	if(isTrue == true){
		document.getElementById(id).style.display = "";
	}
	else{
		document.getElementById(id).style.display = "none";
	}
}

function replace(keyword, name) {
	keyword = keyword.replace(name, '<i>' + name + '</i>');
	return keyword;
}

function getLength(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}

function sub(str){
	if (this.getLength(str) > 45) {
		return str.substr(0, 45)+"...";
	}
	else return str;
}

function setDrop(result,path) {
		
		if ((typeof(result.diseaseInfoDownList) != "undefined" && typeof(result.hospitalInfoDownList) != "undefined" && typeof(result.doctorInfoDownList) != "undefined" ) && (result.diseaseInfoDownList.length > 0 || result.hospitalInfoDownList.length > 0 || result.doctorInfoDownList.length > 0)) {
				var content = "";
				if (result.diseaseInfoDownList.length > 0) {
					var oDt = '<dt><a href="/search/record.html?name=' + result.name + '&type=0" target="_self">根据“<i>' + result.name + '</i>”相关的疾病找医院(医生) &gt;&gt;</a></dt>';
					for (var i=0; i<result.diseaseInfoDownList.length; i++) {
						var oDd = '<dd><a href="/search/record.html?name=' + result.name + '&spelling=' + result.diseaseInfoDownList[i].SEO_SPELLING + '&type=0" target="_self">' + replace(result.diseaseInfoDownList[i].NAME_CN, result.name) + '</a></dd>';
						oDt += oDd;
					}
					content += '<dl>' + oDt + '</dl>';
				}
				if (result.hospitalInfoDownList.length > 0) {
					var oDt = '<dt><a href="/search/record.html?name=' + result.name + '&type=1" target="_self">搜索“<i>' + result.name + '</i>”相关的医院 &gt;&gt;</a></dt>';
					for (var i=0; i<result.hospitalInfoDownList.length; i++) {
						var oDd = '<dd><a href="/search/record.html?name=' + result.name + '&hex_id=' + result.hospitalInfoDownList[i].HEX_ID + '&type=1" target="_self">' + replace(result.hospitalInfoDownList[i].NAME_CN, result.name) + result.hospitalInfoDownList[i].degree + '</a></dd>';
						oDt += oDd;
					}
					content += '<dl>' + oDt + '</dl>';
				}
				if (result.doctorInfoDownList.length > 0) {
					var oDt = '<dt><a href="/search/record.html?name=' + result.name + '&type=2" target="_self">搜索“<i>' + result.name + '</i>”相关的医生 &gt;&gt;</a></dt>';
					for (var i=0; i<result.doctorInfoDownList.length; i++) {
						var oDd = '<dd><a href="/search/record.html?name=' + result.name + '&doctorId=' + result.doctorInfoDownList[i].ID + '&type=2" target="_self">' + replace(result.doctorInfoDownList[i].NAME_CN, result.name) + sub(result.doctorInfoDownList[i].TAG_INFOs + result.doctorInfoDownList[i].HOSPITAL + result.doctorInfoDownList[i].LAB_INFOs) + '</a></dd>';
						oDt += oDd;
					}
					content += '<dl>' + oDt + '</dl>';
				}
				$("#search_drop").append(content);
				showItem('search_drop',true);
				$("#name").removeAttr("class");
				$(".search_drop dd").mouseover(function(){
					$(this).addClass("over");
				});
				$(".search_drop dd").mouseout(function(){
					$(this).removeClass("over");
				});
		}
		else {
				document.getElementById('search_drop').style.display = "none";
				$("#name").removeAttr("class");
		}
}

var currentReq;
function onchange(name,path) {
	
	if (currentReq) {currentReq.abort();}
	$("#name").attr('class', 'loading');
	$.ajaxSetup({contentType: "application/x-www-form-urlencoded; charset=utf-8"});
	currentReq = $.ajax({
	   url: "/search/down.json",
	   data: "name=" + name,
	   type:'POST',
	   success: function(data){
		  $("#search_drop").empty();
		  var p = $("#name").val();   
		  if (p.length > 0) {
			   setDrop(data,path);
		  }
		  $("#name").removeAttr("class");
	   }
	});
}

var timeout;*/
$(document).ready(function(){
	var path = document.location;
	/*var bind_name = 'input';
	if (navigator.userAgent.indexOf("MSIE") != -1){
		bind_name = 'keyup';
	}*/
	/*$('#name').bind(bind_name, function(){
		var name = $("#name").val();
		if (name.length == 0) {
			$("#search_drop").empty();
			$("#search_drop").hide();
		}
		else {
			if (name.indexOf("'") < 0)
			{
				onchange(name,path);
			}
			else $("#search_drop").hide();
		}
	});*/
	/*$("body").bind("click",function(){
		showItem('search_drop',false);
	});*/
//	$.post("/user/login.json", function(result) {
//            if (result.status == 0) {
//                $("#loginArea").show();
//                $("#loginInfo").hide();
//            } else {
//                var username = result.username + "(" + result.nickname + ")";
//                $("#NavNickName").text(username);
//                $("#NavNickName").attr("title",username);
//                $("#loginInfo").show();
//                $("#loginArea").hide();
//            }
//		}, "json");
});
	
function exit() {
	$.ajax({
		url :"/user/logout.json?temp=" + new Date(),
		success : function() {
			if(location.pathname.indexOf("yuyue") > -1 ){
				self.location.href="http://yyk.39.net";
		 	}
			else if(location.pathname.indexOf("weihu") > -1){
				self.location.href="http://yyk.39.net"; 
		 	}
			else if(location.pathname.indexOf("pdata") > -1){
				self.location.href="http://yyk.39.net"; 
		 	}
			else if(location.pathname.indexOf("index") > -1){
				self.location.href="http://yyk.39.net"; 
		 	}
			else if(location.pathname.indexOf("changepwd") > -1) {
				self.location.href="http://yyk.39.net";
			}
			else if(location.pathname.indexOf("order") > -1) {
				self.location.href="http://yyk.39.net";
			}
			else if(location.pathname.indexOf("register/") > -1) {
				self.location.href="http://yyk.39.net";
			}
			else if(location.pathname.indexOf("partner/") > -1) {
				self.location.href="http://yyk.39.net";
			}
			else {
				location.reload();
			}
		}
	});

}

function goToMyReg(){
   var curUrl=window.location.href;
	curUrl=encodeURIComponent(curUrl);
	window.open('http://my.39.net/passport/Reg.aspx?regemail=2&appid=8&regtype=2&ref='+curUrl);
}
