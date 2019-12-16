//type: 1-ҽ��   2-ҽԺ   value��URLҪ����ֵ

$(document).ready(function(){
	//ѡ�������ʡ�ݰ�ť����¼�
	$("#provinceBtn").click(function(){
		getAreaById(0);
	});
	//����ҳ����ⰴ�س��¼�
	$("#btn_toinputpage").click(function(){
		checkAndOpen();
	});
	getHotDiseases();
	buildHotLabsHtml();
	orderFocus();
});

function checkKeyPress(){
	var keycode;
	if(navigator.appName == "Microsoft Internet Explorer"){
      	keycode = event.keyCode;  
    }else{
      	keycode =  checkKeyPress.caller.arguments[0].which;
    }
	if (keycode==13){
		checkAndOpen();
	}
}

function checkAndOpen(){
	var pagenum = $("#input_pagenum").val();
	var maxnum = $("#input_pagenum").attr("maxnum");
	if (isInt(pagenum)){
		if (pagenum -0 > maxnum -0){
			alert("ҳ�볬����ҳ��!");
		}else{
			var jumpUrl = buildBtnPageUrl(pagenum);
			window.location.href = jumpUrl;
		}
	}else{
		alert("��������ȷ������!");
	}
}


function isInt(pagenum){
	var result=pagenum.match(/^[1-9]\d*$/); 
	if(result==null) return false; 
	return true; 
}

function buildBtnPageUrl(pagenum){
	var url = location.pathname;
	url = url.replace(".html","");
	if (url.substring(url.length-1,url.length) == "/"){
		url = url.substring(0,url.length-1);
	}
	var endStr = buildEndStr();
	var tempURL = url.split("/");
	var params = location.search;
	var toUrl = "";
	if (tempURL[tempURL.length-1].substring(0,2) != "c_"){
		toUrl = url + "/c_p" + pagenum;
	}else{
		for(var i = 1; i < tempURL.length -1; i++){
			toUrl = toUrl + "/" + tempURL[i];
		}
		var conditions = tempURL[tempURL.length -1].split("_");
		toUrl = toUrl + "/c";
		var flag = false;
		for (var j = 1; j < conditions.length; j++){
			if (conditions[j].substring(0,1) != "p"){
				toUrl = toUrl + "_" + conditions[j];
			}else {
				flag = true;
				toUrl = toUrl + "_p" + pagenum;
			}
		}
		if (!flag){
			toUrl = toUrl + "_p" + pagenum;
		}
	}
	return toUrl + endStr + params;
}

//type 1--areaIdΪ���д���  2--areaIdΪʡ�ݴ���
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
            		cityHtml = cityHtml + "<li class='now'><a href='" + buildAreaURL(data.provinceSEO) + "' target='_self' name='" + data.provinceName + "' title='����'>����</a></li>";
            	}else{
            		cityHtml = cityHtml + "<li><a href='" + buildAreaURL(data.provinceSEO) + "' target='_self' name='" + data.provinceName + "' title='����'>����</a></li>";
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

function buildAreaURL(value){
	var url = location.pathname;
	url = url.replace(".html","");
	if (url.substring(url.length-1,url.length) == "/"){
		url = url.substring(0,url.length-1);
	}
	var tempURL = url.split("/");
	var params = location.search;
	var toUrl = "";
	var i;
	var index = 0;
	var endStr = buildEndStr();
	//�жϵ�ǰҳ���URL�Ƿ��������������о��滻��û�оͼ���
	if (tempURL[1] == "doctors" || tempURL[1] =="hospitals"){
		if (value != "whole"){
			i = 0;
			tempURL[0] = value;
			index = 1;
		}
	}else {
		//���ѡ��ȫ������url�ĳ���ȥ��
		if (value == "whole"){
			i = 2;
		}else {
			i = 1;
			tempURL[1] = value;
			index = 2;
		}
	}
	for(; i < tempURL.length; i++){
		if (i == index){
			if (tempURL[index] == "doctors"){
				var flag = $("#filter_hospitals").val();
				if (flag == "true"){
					toUrl = toUrl + "/" + tempURL[i];
					i ++;
					continue;
				}
			}
		}
		//С��ǩ�������������µ�URL
		if (tempURL[i].substring(0,2) != "c_"){
			toUrl = toUrl + "/" + tempURL[i];
		}
	}
	return toUrl + endStr;
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
				var wholeUrl = buildAreaURL("whole");
				var cityHtml = "<li><a target='_self' href='javascript:void(0);' onclick=\"toIndexArea('"+ wholeUrl +"');\" title='ȫ��'>ȫ��</a></li>";
			}else {
				var cityHtml = "<li class='now'><a target='_self' href='" + buildAreaURL("whole") +"' title='ȫ��'>ȫ��</a></li>";
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

//��ҽ3.1�汾����ҳ�漲�����߿��ҵ��������ɷ���
function buildDiseaseOrLabUrl(value){
	var url = location.pathname;
	var tempURL = url.split("/");
	var params = location.search;
	var toUrl = "";
	var i;
	for(i = 1; i < tempURL.length; i++){
		if (tempURL[i] == "doctors" || tempURL[i] == "hospitals"){
			toUrl = toUrl + "/" + tempURL[i];
			//�ж�URL��doctors����hospitals�����Ƿ�������
			if (i == tempURL.length -1){
				toUrl = toUrl + "/" + value;
			}else{
				if (tempURL[i+1].substring(0,2) == "c_"){
					toUrl = toUrl + "/" + value;
				}else {
					tempURL[i+1] = value;
				}
			}
		} else if (tempURL[i].substring(0,2) != "c_") {
			toUrl = toUrl + "/" + tempURL[i];
		}
	}
	return toUrl;
}

function getDiseaseByLetter(letter){
	$("#disease_"+letter).html("");
	$.ajax({
		url:'/search/diseaseByKey.json?',
		data:'key='+letter,
		error:function(errResult){
			console.log(errResult);
		},
		success:function(result){
			var i;
			var diseaseHtml = "<ul>";
			for(i = 0; i < result.disease.length; i++){
				diseaseHtml = diseaseHtml + "<li><a target='_self' href='" + buildDefaultDiseaseOrLabUrl(result.disease[i].pinyin) + "' title='" + result.disease[i].name + "'>" + result.disease[i].name + "</a></li>";
			}
			diseaseHtml = diseaseHtml + "</ul>";
			$("#disease_"+letter).html(diseaseHtml);
		}
	});
}

function getLabsByLetter(letter){
	$("#lab_"+letter).html("");
	$.ajax({
		url:"/search/labTypeByKey.json",
		data:"key=" + letter,
		error:function(error){
			console.log(error);
		},
		success:function(result){
			var i;
			var labHtml = "<ul>";
			for (i =0; i < result.length; i++){
				
				labHtml = labHtml + "<li><a target='_self' href='" + buildDefaultDiseaseOrLabUrl(result[i].SEO_SPELLING) + "' title=''>" + result[i].LAB_TYPE_NAME + "</a></li>";
			}
			labHtml = labHtml + "</ul>";
			
			for (i =0; i < result.length; i++){
				labHtml = labHtml + "<p>";
				labHtml = labHtml + "<strong>" + result[i].LAB_TYPE_NAME + "</strong>";
				if (result[i].INTRO){
					labHtml = labHtml + "<span>" + result[i].INTRO + "</span>";
				}
				labHtml = labHtml + "</p>";
			}
			
			$("#lab_"+letter).html(labHtml);
		}
	});
}

function generateConditionURL(selectData,url,values,valuesName){
	url = url.replace(".html","");
	if (url.substring(url.length-1,url.length) == "/"){
		url = url.substring(0,url.length-1);
	}
	var tempURL = url.split("/");
	var toUrl = "";
	if (tempURL[tempURL.length -1].substring(0,2) != "c_"){
		toUrl = url + "/c";
	} else {
		for(var i = 1; i < tempURL.length -1; i++){
			toUrl = toUrl + "/" + tempURL[i];
		}
		var conditions = tempURL[tempURL.length -1].split("_");
		toUrl = toUrl + "/c" 
		for (var j = 1; j < conditions.length; j++){
			if (conditions[j].substring(0,1) != "p"){
				if (values.indexOf(conditions[j]) == "-1"){
					toUrl = toUrl + "_" + conditions[j];
				}else{
					$("#" + selectData + "_css").addClass("xs-yygh");
					$("#" + selectData).html(valuesName[values.indexOf(conditions[j])]);
				}
			}
		}
	}
	return toUrl;
}

function generateFirstCondition(selectData,url,values,valuesName){
	url = url.replace(".html","");
	if (url.substring(url.length-1,url.length) == "/"){
		url = url.substring(0,url.length-1);
	}
	var tempURL = url.split("/");
	var toUrl = "";
	if (tempURL[tempURL.length -1].substring(0,2) != "c_"){
		toUrl = url + "/c";
	}else {
		for(var i = 1; i < tempURL.length -1; i++){
			toUrl = toUrl + "/" + tempURL[i];
		}
		var conditionStr = tempURL[tempURL.length -1].split("_p");
		var conditions = conditionStr[0].split("_");
		if (conditions.length == 1){
			toUrl = toUrl + "/c";
		}else {
			toUrl = toUrl + "/c";
			for (var j = 1; j < conditions.length; j++){
				if (j == 1){
					if (values.indexOf(conditions[j]) == "-1"){
						toUrl = toUrl + "__1";
						toUrl = toUrl + "_" + conditions[j];
					}else {
						toUrl = toUrl + "__1";
						$("#" + selectData + "_css").addClass("xs-yygh");
						$("#" + selectData).html(valuesName[values.indexOf(conditions[j])]);
					}
				}else {
					toUrl = toUrl + "_" + conditions[j];
				}
				
			}
		}
	}
	return toUrl;
}

function generateSecondCondition(selectData,url,values,valuesName){
	var registerTypeStr = "yuyue_jiahao";
	var registerType = registerTypeStr.split("_");
	url = url.replace(".html","");
	if (url.substring(url.length-1,url.length) == "/"){
		url = url.substring(0,url.length-1);
	}
	var tempURL = url.split("/");
	var toUrl = "";
	if (tempURL[tempURL.length -1].substring(0,2) != "c_"){
		toUrl = url + "/c";
	}else {
		for(var i = 1; i < tempURL.length -1; i++){
			toUrl = toUrl + "/" + tempURL[i];
		}
		var conditionStr = tempURL[tempURL.length -1].split("_p");
		var conditions = conditionStr[0].split("_");
		if (conditions.length == 1){
			toUrl = toUrl + "/c";
		}else {
			toUrl = toUrl + "/c";
			var find = false;
			for (var j = 1; j < conditions.length; j++){
				if (j == 1){
					if (registerType.indexOf(conditions[j]) == "-1"){
						find = true;
						toUrl = toUrl + "__2";
						if (values.indexOf(conditions[j]) == "-1"){
							toUrl = toUrl + "_" + conditions[j];
						}else{
							$("#" + selectData + "_css").addClass("xs-yygh");
							$("#" + selectData).html(valuesName[values.indexOf(conditions[j])]);
						}
					}else {
						toUrl = toUrl + "_" + conditions[j];
						toUrl = toUrl + "__2";
					}
				}else{
					if (values.indexOf(conditions[j]) == "-1"){
						toUrl = toUrl + "_" + conditions[j];
					}else{
						$("#" + selectData + "_css").addClass("xs-yygh");
						$("#" + selectData).html(valuesName[values.indexOf(conditions[j])]);
					}
				}
				
			}
		}
	}
	return toUrl;
}

function orderFocus(){
	var params = location.search;
	if (params != ""){
		if (params.indexOf("order=") > -1){
			var order = params.split("order=");
			$(".serach-left-pai").find("ul li").removeClass("now");
			$("#od-" + order[1]).addClass("now");
		}
	}
}


function getRefDisease(id){
	if(id != "") {
		var url = "/disease/memo.json?diseaseId=" + id;
		$.getJSON(url,function(json){
			if(json && json.status == 0 && json.diseaseMemo != ""){
				$("#diseaseMemo").html(json.diseaseMemo);
				$("#diseaseMemo").show();
			}else{
				$("#diseaseMemo").hide();
			}
		});
    }
}
function getDiseaseDaoyi(id){
	if(id != "") {
		var url = "/disease/daoyi.json?diseaseId=" + id;
		$.getJSON(url,function(json){
			if(json && json.status == 0 && json.diseaseDaoyi != ""){
				$("#diseaseDaoyi").html(json.diseaseDaoyi);
				$("#diseaseDaoyi").show();
			}else{
				$("#diseaseDaoyi").hide();
			}
		});
	}
}
//���ݼ�������ҹؼ��ʻ�ȡ�����������������������Ϣ
function getDiseaseShare(keyword){
	if(keyword != "") {
		var url = "/jbk/youliao.json?keyword=" + keyword;
		$.getJSON(url,function(json){
			if(json && json.status == 0 && json.diseaseShareHtml != ""){
				$("#diseaseShare").html(json.diseaseShareHtml);
				$("#diseaseShare").show();
			}else{
				$("#diseaseShare").hide();
			}
		});
	}
}
//��ҽ3.1�汾����ҳ�漲�����߿��ҵ��������ɷ���
function buildDefaultDiseaseOrLabUrl(value){
	var endStr = buildEndStr();
	var url = location.pathname;
	var tempURL = url.split("/");
	var params = location.search;
	var toUrl = "";
	var i;
	for(i = 1; i < tempURL.length; i++){
		if (tempURL[i] == "doctors" || tempURL[i] == "hospitals"){
			toUrl = toUrl + "/" + tempURL[i];
			if (tempURL[i] == "hospitals"){
				toUrl = toUrl + "/" + value;
				return toUrl + endStr;
			}else{
				var flag = $("#filter_hospitals").val();
				if (flag == "true"){
					toUrl = toUrl + "/" + tempURL[i + 1];
					toUrl = toUrl + "/" + value;
				}else {
					toUrl = toUrl + "/" + value;
				}
				return toUrl + endStr;
			}
			
		}else if (tempURL[i].substring(0,2) != "c_") {
			toUrl = toUrl + "/" + tempURL[i];
		}
	}
	return toUrl + endStr;
}
//��ȡ�����³�������
function getLabRefDisease(id){
	if(id != "") {
		$("#labDiseaseMemo").html("");
		$.ajax({
			url: '/lab/disease.json',
			type : 'post',
			data:'labTypeId=' + id,
			success:function(result){
				var labTypeName = result.labTypeName;
				var diseaseList = result.diseaseList; 
				$("#labDiseaseMemo").html("");
				var defaultDiseases = new Array();;
				var defaultDiseasesName = new Array();
				var defaultDiseasesHtml = "<div class='hos-rbox'>";
				defaultDiseasesHtml = defaultDiseasesHtml + "<div class='cap'>"+labTypeName+" &nbsp;<b>��������</b></div>";
				defaultDiseasesHtml = defaultDiseasesHtml + "<div class='hos-rbox-tag'>";
				defaultDiseasesHtml = defaultDiseasesHtml + "<ul class='clearfix'>";
				
				if (diseaseList.length > 0){
					for (i = 0; i < diseaseList.length; i++){
						defaultDiseases[i] = diseaseList[i].SEO_SPELLING;
						defaultDiseasesName[i] = diseaseList[i].NAME_CN;
					}
					var num = defaultDiseases.length;
					for (var i = 0; i < num; i++){
						defaultDiseasesHtml = defaultDiseasesHtml + "<li><a href='" + buildDefaultDiseaseOrLabUrl(defaultDiseases[i]) + "' title=''>" + defaultDiseasesName[i] + "</a></li>";
					}
					defaultDiseasesHtml = defaultDiseasesHtml + "</ul>";
					defaultDiseasesHtml = defaultDiseasesHtml + "</div></div>";
					$("#labDiseaseMemo").html(defaultDiseasesHtml);			
					$("#labDiseaseMemo").show();
				}else{
					$("#labDiseaseMemo").hide();
				}
				
			}
		});
    }
}
//��ȡ�����³���ҩƷ
function getLabDaoyi(spelling, labTypeName){
	if(spelling != "") {
		var url = "/jbk/labType.json?labTypeSpelling=" + spelling + "&labTypeName="+labTypeName;
		$.getJSON(url,function(json){
			if(json && json.status == 0 && json.labDaoyiMemo != ""){
				$("#labDaoyi").html(json.labDaoyiMemo);
				$("#labDaoyi").show();
			}else{
				$("#labDaoyi").hide();
			}
		});
	}
}
function buildHotLabsHtml(){
	var html = "";
	var hotLabsStr = "fuke_pifuke_neike_erke_nanke_guke_fuchanke_erbihouke_kouqiangke_shenjingneike_yanke_zhongliuke_zhengxingwaike";
	var hotLabs = hotLabsStr.split("_");
	var hotLabsName = ["����","Ƥ����","�ڿ�","����","�п�","�ǿ�","������","���Ǻ��","��ǻ��","���ڿ�","�ۿ�","������","�������"];
	html += "<ul>"
	for (var i = 0; i < hotLabs.length; i ++){
		var url = buildDefaultDiseaseOrLabUrl(hotLabs[i]);
		html += "<li><a target='_self' href='" + url + "'>" + hotLabsName[i] + "</a></li>";
	}
	html += "</ul>"
	html += "<p><strong>����</strong><span>���ƣ���һ���о�Ů���ڷ�������ֳϵͳ(�����ӹ����ѳ������ѹܻ�������)��������ı䣬�����������ϣ�������ٴ�ҽѧѧ�ƣ������ļ����и���ѧ��������Ů����ֳ����֢��Ů����ֳ����������ֳ�ڷ��ڼ����ȡ�</span></p>";
	html += "<p><strong>Ƥ����</strong><span>Ƥ����������ƣ���Ҫ���Ƹ���Ƥ����������Ƥ������ţƤѢ����������ǡ�ŧ�崯�����Ƽ�������ŧ����Ⱦ���̺ۡ�Ѣ�����۲���Ҹ�����ഺ����ë���ס���ͺ�ѷ����п���֢��Ӥ��������ۡ�ȸ�ߡ������������Ƥ�ס����硢ʪ���ָ�ס�ӲƤ����Ƥ��������ǰ�����ס���ǻ��������ë���ƺְߵȡ�</span></p>";
	html += "<p><strong>�ڿ�</strong><span>�ڿ����ٴ�ҽѧ��һ��ר�ƣ����������������ٴ�ҽѧ�Ļ���������ҽѧ֮ĸ֮�ơ�����������ͬ����ϵͳ������Ĵ�ר�ƣ������ڿơ������ơ��ε���θ�ơ������(�����ڿ�)��ѪҺ�ơ������ơ��ڷ��ڿơ���Ⱦ���ơ����߿ơ���ʪ�ơ��񾭿ơ����ơ����ڿƵȣ�������������ҽԺ�Դ�ר�Ƶķ������������ͬ��</span></p>";
	html += "<p><strong>����</strong><span>������ȫ���о�С��ʱ�����ķ����������Լ��������ε�һ���ٴ���ѧ����������ٴ�������ѧ�����Ź㷺��ϵ���ٴ�����ѧ�ְ�����ͯ��������������ѪҺ����Ѫ�ܡ����������������ࡢ�񾭺ʹ�Ⱦ������ѧ�ơ�</span></p>";
	html += "<p><strong>�п�</strong><span>�п�������ִ���������ѹ������ֳ����ϵͳ�����������������������ֵ�ר�ŷ������Ե�������ҡ����������Բ��У�������Ƽ������Լ��������Բ������Թ����ϰ�����������й�����ܾ�������ס��ž��ȡ�</span></p>";
	html += "<p><strong>�ǿ�</strong><span>�ǿ��Ǹ���ҽԺ����Ŀ���֮һ����Ҫ�о���������ϵͳ�Ľ��ʡ������벡������ҩ����������������ֺͷ�չ��һϵͳ��������̬�빦�ܡ�</span></p>";
	html += "<p><strong>������</strong><span>���������ٴ�ҽѧ�Ĵ���Ҫѧ��֮һ����Ҫ�о�Ů����ֳ���ټ����Ĳ��򡢲�����ϼ����Σ�������������Ͳ���仯����Σ���Ｐ�Ѳ���Ԥ�������Σ�Ů����ֳ�ڷַ��ڣ��ƻ���������Ů�����ȡ�</span></p>";
	html += "<p><strong>���Ǻ��</strong><span>���Ǻ����Ҫ����Զ������ǲ����ʺ��ȼ�������Ϻ����ƣ�����������Ҫ�У���������(�ж��ס�����)���ǲ�����(���Ա��ס����Ա���)���ʺ���(���ס���������)��</span></p>";
	html += "<p><strong>��ǻ��</strong><span>��ǻ�ƣ�ҽѧѧ�Ʒ���֮һ���������Ҫ�ӿ�ǻ���������ݡ������������࣬�������������ֿ��Է�Ϊ��ǻ���ݡ���ֲ����������������ǻ���񡢿�ǻ��֢�ȵȡ���Ҫ��ǻ�Ƽ�����������ǻ��沿Ƥ������Ƥ��¼�϶��Ⱦ�����������Ļ���������װߵȼ�����</span></p>";
	html += "<p><strong>���ڿ�</strong><span>���ڿ��Ƕ����Ķ���ѧ�ƣ��������ڿƸ���.��ϵͳ���ԡ����輰��Χ����ɡ���Ҫ������Ѫ�ܼ���(�Թ������Գ�Ѫ)��ƫͷʹ���Բ���֢�Լ���(���ס���Ĥ��)�������ס����մ�����ϵͳ���Բ�����л�����Ŵ�����������ʹ�������񾭲�����Χ�񾭲�(��֫��ľ������)����֢�������ȣ�ͬʱ������ƽ��������˥����ʧ�ߵȹ����Լ��������Ρ�</span></p>";
	html += "<p><strong>�ۿ�</strong><span>�������(plastic surgery)����Ƶ�һ����֧���ֳ�������ƻ������ƣ����Ʒ�Χ��Ҫ��Ƥ�������⼰�����ȴ��ˡ������������Ի��������֯�����ٵ�ȱ������Ρ����ư����޸��������������ݡ�������������������ĸ�����֯��ֲΪ��Ҫ�ֶΡ�</span></p>";
	html += "<p><strong>������</strong><span>�����Ʒ�Ϊ�����ڿƺ�������ƣ������ڿ���Ҫ���¸������������������ڿ����ƣ���������ṩ������Ϊ�����ۺ����ơ�ר�ŵ�����ҽԺ����ؿ��һ���ݲ�ͬ��λ����ϸ�֣�����������ơ�ͷ����ơ�����ơ��������ơ�������ơ������ڿƵȡ�</span></p>";
	html += "<p><strong>�������</strong><span>�����Ʒ�Ϊ�����ڿƺ�������ƣ������ڿ���Ҫ���¸������������������ڿ����ƣ���������ṩ������Ϊ�����ۺ����ơ�ר�ŵ�����ҽԺ����ؿ��һ���ݲ�ͬ��λ����ϸ�֣�����������ơ�ͷ����ơ�����ơ��������ơ�������ơ������ڿƵȡ�</span></p>";
	$("#hot_lab").html(html);
	
}

function getHotDiseases(){
	$("#disease_hot").html("");
	var hotDiseases = ["xueguanliu","tangniaobing","pifubing","gaoxueya","feijiehe","ruxianai","danjieshi","guomin","shenjieshi","baopiguozhang","jingzhuibing","biyan","buyunbuyu","jiakang","zigongjiliu","yuejingbudiao","baidianfeng","xingbing","ganbing","yzjptc"];
	var hotDiseasesName = ["Ѫ����","����","Ƥ����","��Ѫѹ","�ν��","���ٰ�","����ʯ","����","����ʯ","��Ƥ����","��׵��","����","���в���","�׿�","�ӹ�����","�¾�����","����","�Բ�","�β�","��׵����ͻ��"];
	var hotDiseasesHtml = "<ul>";
	for (var i = 0; i < hotDiseases.length; i++){
		hotDiseasesHtml = hotDiseasesHtml + "<li><a href='" + buildDefaultDiseaseOrLabUrl(hotDiseases[i]) +  "' target='_self' title=''>" + hotDiseasesName[i] +"</a></li>";
	}
	hotDiseasesHtml = hotDiseasesHtml + "</ul>";
	$("#disease_hot").html(hotDiseasesHtml);
}

function toIndexArea(url){
	$.cookies.set("_webyyk_areaId","0",{domain: 'yyk.39.net'});
	$.cookies.set("_webyyk_areaSpelling","0",{domain: 'yyk.39.net'});
	window.location.href = url;
}


