$(document).ready(function(){
	buildRegisterURL();
	buildDoctorTitleURL();
	buildWeekDayURL();
	loadHospitalList();
//	$("#filter_hospitals").focus(function(){
//		$("#filter_result_hospitals").fadeIn(300);
//	});
	$("#filter_hospitals_key").click(function(){
		$("#filter_result_hospitals").fadeIn(300);
	});
	$("#filter_hospitals_key").keyup(function(){
		key = $("#filter_hospitals_key").val();
		findHospitalList(key);
	});
})



function buildRegisterURL(){
	$("#filter_register").html("");
	var registerTypeStr = "yuyue_jiahao";
	var registerType = registerTypeStr.split("_");
	var registerTypeName = ["预约挂号","专家转诊"];
	var url = location.pathname;
	var params = location.search;
	var toUrl = "";
	var endStr = buildEndStr();
	toUrl = generateFirstCondition("select_register",url,registerType,registerTypeName);
	var toUrlLength = toUrl.length;
	var html = "";
	var noneCondition = false;
	var tempToUrl = "";
	if (toUrl.lastIndexOf("/c") == toUrlLength -2){
		noneCondition = true;
		html = html + "<li><a href='" + toUrl.substring(0, toUrlLength - 2) + endStr + params +"' target='_self' title='不限'>不限</a></li>";
	}else{
		tempToUrl = toUrl.replace("__1", "");
		if (toUrl.lastIndexOf("/c__1") == toUrlLength -5){
			html = html + "<li><a href='" + toUrl.replace("/c__1", "") + endStr + params +"' target='_self' title='不限'>不限</a></li>";
		}else {
			html = html + "<li><a href='" + tempToUrl + endStr + params +"' target='_self' title='不限'>不限</a></li>";
		}
	}
	for (var i = 0; i < registerType.length; i ++){
//		toUrl = generateConditionURL("select_register",url,registerType,registerTypeName,1,registerType[i]);
		if (noneCondition){
			tempToUrl = toUrl + "_" + registerType[i];
		}else{
			tempToUrl = toUrl.replace("__1","_" + registerType[i]);
		}
		html = html + "<li><a href='" + tempToUrl + endStr + params + "' target='_self' title='" + registerTypeName[i] +"'>" + registerTypeName[i] + "</a></li>";
	}
	$("#filter_register").html(html);
}

function buildDoctorTitleURL(){
	$("#filter_doctortitle").html("");
	var doctorTitleStr = "zhuren_fuzhuren_zhuzhi";
	var doctorTitle = doctorTitleStr.split("_");
	var doctorTitleName = ["主任医师","副主任医师","主治医师"];
	var url = location.pathname;
	var params = location.search;
	var toUrl = "";
	var endStr = buildEndStr();
	toUrl = generateSecondCondition("select_doctortitle",url,doctorTitle,doctorTitleName);
	var toUrlLength = toUrl.length;
	var html = "";
	var tempToUrl = "";
	var noneCondition = false;
	if (toUrl.lastIndexOf("/c") == toUrlLength -2){
		noneCondition = true;
		html = html + "<li><a href='" + toUrl.substring(0, toUrlLength - 2) + endStr + params + "' target='_self' title='不限'>不限</a></li>";
	}else{
		tempToUrl = toUrl.replace("__2", "");
		if (toUrl.lastIndexOf("/c__2") == toUrlLength -5){
			html = html + "<li><a href='" + toUrl.replace("/c__2", "") + endStr + params + "' target='_self' title='不限'>不限</a></li>";
		}else {
			html = html + "<li><a href='" + tempToUrl + endStr + params + "' target='_self' title='不限'>不限</a></li>";
		}
		
	}
	
	for (var i = 0; i < 3; i ++){
		if (noneCondition){
			tempToUrl = toUrl + "_" + doctorTitle[i];
		}else {
			tempToUrl = toUrl.replace("__2",  "_" + doctorTitle[i]);
		}
		html = html + "<li><a href='" + tempToUrl + endStr + params + "' target='_self' title='" + doctorTitleName[i] +"'>" + doctorTitleName[i] + "</a></li>";
	}
	$("#filter_doctortitle").html(html);
}

function buildWeekDayURL(){
	$("#filter_weekday").html("");
	var weekDayStr = "t1_t2_t3_t4_t5_t6_t7";
	var weekDay = weekDayStr.split("_");
	var weekDayName = ["周一","周二","周三","周四","周五","周六","周日"];
	var url = location.pathname;
	var params = location.search;
	var toUrl = "";
	var endStr = buildEndStr();
	toUrl = generateConditionURL("select_weekday",url,weekDay,weekDayName);
	var toUrlLength = toUrl.length;
	var html = "";
	if (toUrl.lastIndexOf("/c") == toUrlLength -2){
		html = html + "<li><a href='" + toUrl.substring(0, toUrlLength - 2) + endStr + params + "' target='_self' title='不限'>不限</a></li>";
	}else{
		html = html + "<li><a href='" + toUrl + endStr + params +"' target='_self' title='不限'>不限</a></li>";
	}
	for (var i = 0; i < weekDay.length; i ++){
		html = html + "<li><a href='" + toUrl + "_" + weekDay[i] + endStr + params + "' target='_self' title='" + weekDayName[i] +"'>" + weekDayName[i] + "</a></li>";
	}
	$("#filter_weekday").html(html);
}

var hospitalArr = new Array();

function loadHospitalList(){
	var flag = $("#filter_hospitals").val();
	var areaId = $("#areaId").val();
	var keyword = $("#keyName").val();
	var diseaseId = $("#diseaseId").val();
	var labTypeId = $("#labTypeId").val();
	var condition = $("#condition").val();
	if(areaId == "") {
		areaId = 0;
	}
	$.getJSON("/search/get/hospitalList.json", {areaId:areaId,keyword:keyword,diseaseId:diseaseId,labTypeId:labTypeId,condition:condition}, function(list){
		if(list){
			$('#filter_result_hospitals').empty();
			hospitalArr.splice(0,hospitalArr.length-1);
			for(var idx = 0;  idx < list.length; idx++){
				var area = areaId == 0?list[idx].SEO_SPELLING:"";
				$('#filter_result_hospitals').append("<li><a href='" + buildHospitalUrl(list[idx].HEX_ID,flag) +"' title='" +list[idx].NAME+"' target='_self'>"+list[idx].NAME+"</a></li>");
				hospitalArr.push(list[idx]);
			}
		}
	});
}

function findHospitalList(key) {
	searchKeyByhospital(key,hospitalArr);
}

function searchKeyByhospital(key,arr) {
	var dd = '';
	var flag = $("#filter_hospitals").val();
	var areaId = $('#areaId').val();
	if(areaId == '') {
		areaId = 0;
	}
	for (var i=0; i<arr.length; i++) {
		var str = arr[i].NAME;
		var area = areaId == 0?arr[i].SEO_SPELLING:"";
		var patt = new RegExp(key,"gi");
		var ret_test = patt.test(str);
		if (ret_test) {
			var li = "<li><a href='" + buildHospitalUrl(arr[i].HEX_ID,flag) +"' target='_self' title='"+str+"' >" + str + "</a></li>";
			dd += li;
		}
	}
	if (dd == "") {
		var li = '<li class="notFound">暂时没有您要找的医院，请重新输入！</li>';
		dd += li;
	}
	$('#filter_result_hospitals').empty();
	$('#filter_result_hospitals').append(dd);
}

function buildHospitalUrl(hexId,flag){
	var url = location.pathname;
	var endStr = buildEndStr();
	if (url.substring(url.length-1,url.length) == "/"){
		url = url.substring(0,url.length-1);
	}else {
		url = url.replace(".html","");
	}
	var tempURL = url.split("/");
	var params = location.search;
	var toUrl = "";
	var i = 1;
	if (tempURL[1] != "doctors"){
		i = 2;
	}
	for (; i < tempURL.length; i++){
		if (tempURL[i] != "doctors"){
			toUrl = toUrl + "/" + tempURL[i];
		}else {
			if (flag == "true"){
				toUrl = toUrl + "/" + tempURL[i];
				toUrl = toUrl + "/" + hexId;
				i ++;
			}else{
				toUrl = toUrl + "/" + tempURL[i];
				toUrl = toUrl + "/" + hexId;
			}
		}
	}
	if (tempURL[tempURL.length-1].substring(0,2) == "c_"){
		var conditions = tempURL[tempURL.length-1].split("_");
		if (conditions[1].substring(0,1) == "p"){
			var num = toUrl.indexOf("/c_p")
			toUrl = toUrl.substring(0,num);
		}else {
			var lastStr = conditions[conditions.length-1];
			if (lastStr.substring(0,1) == "p"){
				toUrl = toUrl.replace("_" + lastStr, "");
			}
		}
	}
	return toUrl + endStr + params;
}



