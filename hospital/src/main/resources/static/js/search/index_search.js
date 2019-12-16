$(document).ready(function(){
	//选择地区，省份按钮点击事件
	$("#provinceBtn").click(function(){
		getAreaById(0);
	});
});

//type 1--areaId为城市代码  2--areaId为省份代码
function showCity(type,areaId){
	var provinceID = 0;
	if (type == 1){
		provinceID = areaId.substring(0,2);
	}else if (type == 2){
		provinceID = areaId;
	}
	$.post("/search/getArea.json", { areaId:provinceID},
            function (data) {
				var currentId = $("#areaId").val();
				//$('#provinceTab').removeClass("now");
				//$('#cityTab').addClass("now");
				$('.city-all').html("");
                var i;
                var cityHtml = "";
                if (provinceID == currentId){
            		cityHtml = cityHtml + "<li class='now'><a href='" + buildAreaURL(data.provinceSEO) + "' target='_self' name='" + data.provinceName + "' title='不限'>不限</a></li>";
            	}else{
            		cityHtml = cityHtml + "<li><a href='" + buildAreaURL(data.provinceSEO) + "' target='_self' name='" + data.provinceName + "' title='不限'>不限</a></li>";
            	}
                for (i = 0; i < data.cityList.length; i++) {
                	if (data.cityList[i].ID == currentId){
                		cityHtml = cityHtml + "<li class='now'><a href='" + buildAreaURL(data.cityList[i].SEO_SPELLING) + "' target='_self' name='" + data.cityList[i].SEO_SPELLING + "' title='" + data.cityList[i].NAME + "'>"+ data.cityList[i].NAME +"</a></li>";
                	}else{
                		cityHtml = cityHtml + "<li><a href='" + buildAreaURL(data.cityList[i].SEO_SPELLING) + "' target='_self' name='" + data.cityList[i].SEO_SPELLING + "' title='" + data.cityList[i].NAME + "'>"+ data.cityList[i].NAME +"</a></li>";
                	}
                }
                $('.city-all').html(cityHtml);
    		}
	);
}

function getAreaById(areaId){
	var temp = $("#areaId").val();
	$.post("/search/getArea.json",{areaId:areaId},
		function(data){
			//$('#provinceTab').addClass("now");
			//$('#cityTab').removeClass("now");
			$('.city-all').html("");
			var i;
			if (temp){
				var cityHtml = "<li><a target='_self' href='javascript:void(0);' onclick='toIndexArea();' title='全国'>全国</a></li>";
			}else {
				var cityHtml = "<li class='now'><a target='_self' href='" + buildAreaURL("whole") +"' title='全国'>全国</a></li>";
			}
			for (i = 0; i < data.length; i++){
				cityHtml = cityHtml + "<li><a href='javascript:void(0);' onclick='showCity(2," + data[i].ID + ")' target='_self' title='" + data[i].NAME + "'>"+ data[i].NAME +"</a></li>";
			}
			$('.city-all').html(cityHtml);
		}
	);
}

function changeArea(){
	var areaId = $("#areaId").val();
	if (areaId == ""){
		getAreaById(0);
	} else {
		showCity(1,areaId);
	}
	
}

function buildAreaURL(value){
	var endStr = "/";
	if (value == "whole"){
		return "/";
	}else {
		return "/" + value + endStr;
	}

}

function toIndexArea(){
	$.cookies.set("_webyyk_areaId","0",{domain: 'yyk.39.net'});
	$.cookies.set("_webyyk_areaSpelling","0",{domain: 'yyk.39.net'});
	window.location.href = "http://yyk.39.net/";
}