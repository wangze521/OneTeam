//type: 1-医生   2-医院   value：URL要填充的值

$(document).ready(function(){
	//选择地区，省份按钮点击事件
	$("#provinceBtn").click(function(){
		getAreaById(0);
	});
	//输入页码后检测按回车事件
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
			alert("页码超出总页数!");
		}else{
			var jumpUrl = buildBtnPageUrl(pagenum);
			window.location.href = jumpUrl;
		}
	}else{
		alert("请输入正确的数字!");
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
	//判断当前页面的URL是否包含地区，如果有就替换，没有就加入
	if (tempURL[1] == "doctors" || tempURL[1] =="hospitals"){
		if (value != "whole"){
			i = 0;
			tempURL[0] = value;
			index = 1;
		}
	}else {
		//如果选择全国，把url的城市去掉
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
		//小标签的条件不加入新的URL
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
				var cityHtml = "<li><a target='_self' href='javascript:void(0);' onclick=\"toIndexArea('"+ wholeUrl +"');\" title='全国'>全国</a></li>";
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

//就医3.1版本搜索页面疾病或者科室的链接生成方法
function buildDiseaseOrLabUrl(value){
	var url = location.pathname;
	var tempURL = url.split("/");
	var params = location.search;
	var toUrl = "";
	var i;
	for(i = 1; i < tempURL.length; i++){
		if (tempURL[i] == "doctors" || tempURL[i] == "hospitals"){
			toUrl = toUrl + "/" + tempURL[i];
			//判断URL的doctors或者hospitals后面是否还有条件
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
//根据疾病或科室关键词获取疾病库友疗社区贴子相关信息
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
//就医3.1版本搜索页面疾病或者科室的链接生成方法
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
//获取科室下常见疾病
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
				defaultDiseasesHtml = defaultDiseasesHtml + "<div class='cap'>"+labTypeName+" &nbsp;<b>常见疾病</b></div>";
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
//获取科室下常用药品
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
	var hotLabsName = ["妇科","皮肤科","内科","儿科","男科","骨科","妇产科","耳鼻喉科","口腔科","神经内科","眼科","肿瘤科","整形外科"];
	html += "<ul>"
	for (var i = 0; i < hotLabs.length; i ++){
		var url = buildDefaultDiseaseOrLabUrl(hotLabs[i]);
		html += "<li><a target='_self' href='" + url + "'>" + hotLabsName[i] + "</a></li>";
	}
	html += "</ul>"
	html += "<p><strong>妇科</strong><span>妇科，是一门研究女性在非孕期生殖系统(例如子宫、卵巢、输卵管或阴道等)的生理病理改变，并对其进行诊断，处理的临床医学学科，常见的疾病有妇科学基础病、女性生殖器炎症、女性生殖器肿瘤、生殖内分泌疾病等。</span></p>";
	html += "<p><strong>皮肤科</strong><span>皮肤科属于外科，主要治疗各种皮肤病，常见皮肤病有牛皮癣、疱疹、酒渣鼻、脓疱疮、妇科疾病、化脓菌感染、疤痕、癣、鱼鳞病、腋臭、青春痘、毛囊炎、斑秃脱发、男科炎症、婴儿尿布疹、鸡眼、雀斑、汗疱疹、螨虫性皮炎、白癜风、湿疹、灰指甲、硬皮病、皮肤瘙痒、前列腺炎、口腔部护理、脱毛、黄褐斑等。</span></p>";
	html += "<p><strong>内科</strong><span>内科是临床医学的一个专科，几乎是所有其他临床医学的基础，亦有医学之母之称。包含了依不同器官系统而分类的次专科：心脏内科、呼吸科、肝胆肠胃科、肾脏科(泌尿内科)、血液科、肿瘤科、内分泌科、传染病科、免疫科、风湿科、神经科、儿科、神经内科等，但各地甚至各医院对次专科的分类可能有所不同。</span></p>";
	html += "<p><strong>儿科</strong><span>儿科是全面研究小儿时期身心发育、保健以及疾病防治的一门临床科学，它与许多临床及基础学科有着广泛联系。临床儿科学又包括儿童保健、新生儿、血液、心血管、呼吸、消化、肾脏、神经和传染等三级学科。</span></p>";
	html += "<p><strong>男科</strong><span>男科是针对现代男性生活压力大，生殖泌尿系统疾病就诊数量猛增，而出现的专门服务男性的特殊科室。常见的男性病有：泌尿外科疾病、性疾病、男性不育、性功能障碍、阳痿、早泄、非淋菌性尿道炎、遗精等。</span></p>";
	html += "<p><strong>骨科</strong><span>骨科是各大医院最常见的科室之一，主要研究骨骼肌肉系统的解剖、生理与病理，运用药物、手术及物理方法保持和发展这一系统的正常形态与功能。</span></p>";
	html += "<p><strong>妇产科</strong><span>妇产科是临床医学四大主要学科之一，主要研究女性生殖器官疾病的病因、病理、诊断及防治，妊娠、分娩的生理和病理变化，高危妊娠及难产的预防和诊治，女性生殖内分分泌，计划生育及妇女保健等。</span></p>";
	html += "<p><strong>耳鼻喉科</strong><span>耳鼻喉科主要针对以耳部、鼻部、咽喉部等疾病的诊断和治疗，常见疾病主要有，耳部疾病(中耳炎、耳鸣)，鼻部疾病(急性鼻炎、慢性鼻炎)，咽喉疾病(喉炎、慢性咽炎)。</span></p>";
	html += "<p><strong>口腔科</strong><span>口腔科，医学学科分类之一，大分类主要从口腔疾病、牙齿、牙病变来归类，从这三个大类又可以分为口腔美容、种植牙、牙齿正畸、口腔溃疡、口腔炎症等等。主要口腔科疾病包括：口腔颌面部皮样、表皮颌下间隙感染、下颌后缩、四环素牙、舌白斑等疾病。</span></p>";
	html += "<p><strong>神经内科</strong><span>神经内科是独立的二级学科，不属于内科概念.神经系统由脑、脊髓及周围神经组成。主要诊治脑血管疾病(脑梗塞、脑出血)、偏头痛、脑部炎症性疾病(脑炎、脑膜炎)、脊髓炎、癫痫、痴呆、神经系统变性病、代谢病和遗传病、三叉神经痛、坐骨神经病、周围神经病(四肢麻木、无力)及重症肌无力等，同时与心理科交叉进行神经衰弱、失眠等功能性疾患的诊治。</span></p>";
	html += "<p><strong>眼科</strong><span>整形外科(plastic surgery)是外科的一个分支，又称整复外科或成形外科，治疗范围主要是皮肤、肌肉及骨骼等创伤、疾病，先天性或后天性组织或器官的缺陷与畸形。治疗包括修复与再造两个内容。以手术方法进行自体的各种组织移植为主要手段。</span></p>";
	html += "<p><strong>肿瘤科</strong><span>肿瘤科分为肿瘤内科和肿瘤外科，肿瘤内科主要从事各种良、恶性肿瘤的内科治疗；肿瘤外科提供以手术为主的综合治疗。专门的肿瘤医院的相关科室会根据不同部位再行细分，例如乳腺外科、头颈外科、胸外科、肿瘤妇科、腹部外科、肿瘤内科等。</span></p>";
	html += "<p><strong>整形外科</strong><span>肿瘤科分为肿瘤内科和肿瘤外科，肿瘤内科主要从事各种良、恶性肿瘤的内科治疗；肿瘤外科提供以手术为主的综合治疗。专门的肿瘤医院的相关科室会根据不同部位再行细分，例如乳腺外科、头颈外科、胸外科、肿瘤妇科、腹部外科、肿瘤内科等。</span></p>";
	$("#hot_lab").html(html);
	
}

function getHotDiseases(){
	$("#disease_hot").html("");
	var hotDiseases = ["xueguanliu","tangniaobing","pifubing","gaoxueya","feijiehe","ruxianai","danjieshi","guomin","shenjieshi","baopiguozhang","jingzhuibing","biyan","buyunbuyu","jiakang","zigongjiliu","yuejingbudiao","baidianfeng","xingbing","ganbing","yzjptc"];
	var hotDiseasesName = ["血管瘤","糖尿病","皮肤病","高血压","肺结核","乳腺癌","胆结石","过敏","肾结石","包皮过长","颈椎病","鼻炎","不孕不育","甲亢","子宫肌瘤","月经不调","白癜风","性病","肝病","腰椎间盘突出"];
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


