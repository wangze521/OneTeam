$(document).ready(function(){
	buildRegisterURL();
	getAllHospitalType();
	buildHospitalLevelURL();
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
		html = html + "<li><a href='" + toUrl.substring(0, toUrlLength - 2) + endStr + params +"' target='_self' title='不限方式'>不限方式</a></li>";
	}else{
		tempToUrl = toUrl.replace("__1", "");
		if (toUrl.lastIndexOf("/c__1") == toUrlLength -5){
			html = html + "<li><a href='" + toUrl.replace("/c__1", "") +endStr + params + "' target='_self' title='不限方式'>不限方式</a></li>";
		}else {
			html = html + "<li><a href='" + tempToUrl +endStr + params + "' target='_self' title='不限方式'>不限方式</a></li>";
		}
		
	}
	for (var i = 0; i < registerType.length; i ++){
		if (noneCondition){
			tempToUrl = toUrl + "_" + registerType[i];
		}else{
			tempToUrl = toUrl.replace("__1","_" + registerType[i]);
		}
		html = html + "<li><a href='" + tempToUrl + endStr + params + "' target='_self' title='" + registerTypeName[i] +"'>" + registerTypeName[i] + "</a></li>";
	}
	$("#filter_register").html(html);
}

function buildHospitalLevelURL(){
	$("#filter_hospitalLevel").html("");
	var hospitalLevelStr = "hg_sanji_erji_hgqita";
	var hospitalLevel = hospitalLevelStr.split("_");
	var hospitalLevelName = ["三级甲等","三级","二级","其他"];
	var url = location.pathname;
	var params = location.search;
	var toUrl = "";
	var endStr = buildEndStr();
	toUrl = generateSecondCondition("select_hospitalLevel",url,hospitalLevel,hospitalLevelName);
	var toUrlLength = toUrl.length;
	var html = "";
	var tempToUrl = "";
	var noneCondition = false;
	if (toUrl.lastIndexOf("/c") == toUrlLength -2){
		noneCondition = true;
		html = html + "<li><a href='" + toUrl.substring(0, toUrlLength - 2) + endStr + params +"' target='_self' title='不限等级'>不限等级</a></li>";
	}else{
		tempToUrl = toUrl.replace("__2", "");
		if (toUrl.lastIndexOf("/c__2") == toUrlLength -5){
			html = html + "<li><a href='" + toUrl.replace("/c__2", "") +endStr + params + "' target='_self' title='不限等级'>不限等级</a></li>";
		}else {
			html = html + "<li><a href='" + tempToUrl +endStr + params + "' target='_self' title='不限等级'>不限等级</a></li>";
		}
		
	}
	for (var i = 0; i < hospitalLevel.length; i ++){
		if (noneCondition){
			tempToUrl = toUrl + "_" + hospitalLevel[i];
		}else {
			tempToUrl = toUrl.replace("__2",  "_" + hospitalLevel[i]);
		}
		html = html + "<li><a href='" + tempToUrl + endStr + params + "' target='_self' title='" + hospitalLevelName[i] +"'>" + hospitalLevelName[i] + "</a></li>";
	}
	$("#filter_hospitalLevel").html(html);
}

function getAllHospitalType(){
	$("#filter_hospitaltype").html("");
	var url = location.pathname;
	var params = location.search;
	var toUrl = "";
	var endStr = buildEndStr();
	var hospitalTypeHtml = "";
	$.get("/get/allHospitalType.json",function(result){
		var i;
		var hospitalType=new Array();
		var hospitalTypeName=new Array();
		for (i = 0; i < result.length; i++){
			hospitalType[i] = "ht" + result[i].hospitalTypeId;
			hospitalTypeName[i] = result[i].hospitalTypeName;
		}
		toUrl = generateConditionURL("select_hospitaltype",url,hospitalType,hospitalTypeName);
		var toUrlLength = toUrl.length;
		if (toUrl.lastIndexOf("/c") == toUrlLength -2){
			hospitalTypeHtml = hospitalTypeHtml + "<li><a href='" + toUrl.substring(0, toUrlLength - 2) + endStr + params +"' target='_self' title='不限类型'>不限类型</a></li>";
		}else{
			hospitalTypeHtml = hospitalTypeHtml + "<li><a href='" + toUrl +endStr + params +"' target='_self' title='不限类型'>不限类型</a></li>";
		}
		for (i = 0; i < result.length; i++){
			hospitalTypeHtml = hospitalTypeHtml + "<li><a href='" + toUrl + "_" + "ht" + result[i].hospitalTypeId + endStr + params +"' target='_self' title='" + result[i].hospitalTypeName + "'>" + result[i].hospitalTypeName + "</a></li>";
		}
		$("#filter_hospitaltype").html(hospitalTypeHtml);
	});
}



