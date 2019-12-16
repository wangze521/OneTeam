	var showSearchDown = $("#showSearchDown").val();
	//alert(showSearchDown);
	function searchKeyPress(){
		var keycode;
		if(navigator.appName == "Microsoft Internet Explorer"){
	      	keycode = event.keyCode; 
    	}else{
    		keycode =  searchKeyPress.caller.arguments[0].which;
	    }
		if (keycode==13){
			redirectSearchUrl();
		}
	}
	
	function redirectSearchUrl(){
		var key = $("#searchKey").val().trim();
		if(!(key == "" || key == "输入疾病名、科室或医生名" || key == "输入疾病名、科室或医院名")) {
			var areaSpelling = $("#areaSpelling").val();
			var type = $("#type").val();
			var jumpUrl = "/search/redirect/?type=" + type + "&searchKey=" + key + "&areaSpelling=" + areaSpelling;
			window.location.href = jumpUrl;
		}
	}
	

	$("#searchButton").click( function() {
		redirectSearchUrl();
	 });
	
	$("#searchType").click( function() {
		//$("#lianxiangDiv").attr("style","display:none;");
		//$("#moreDiv").attr("style","display:none;");
		changeTab("hospitals");
	 });
	
	$("#searchType2").click( function() {
		//$("#lianxiangDiv").attr("style","display:none;");
		//$("#moreDiv").attr("style","display:none;");
		changeTab("doctors");
	 });
	
	$("#doctorMore").click( function() {
		var key = $("#searchKey").val().trim();
		if(!(key == "" || key == "输入疾病名、科室或医生名")) {
			redirectSearchUrl();
		}
	 });
	
	$("#moreClose").click( function() {
		$("#lianxiangDiv").show();
		$("#moreDiv").attr("style","display:none;");
		return false;
	 });
	
	$("#labMore").click( function() {
		var key = $("#searchKey").val().trim();
		$.post("/search/more/labType.jsonp",{name:key},function(data){
			var i = $("#type").val();
			var arrLabTypeList = data.labTypeList;
			var labLi = "";
			if(i == "0") {
				if($.isArray(arrLabTypeList)) {
					$.each(arrLabTypeList, function(idx, element) {
						if(element.SEO_SPELLING != null && element.SEO_SPELLING != "null" && element.SEO_SPELLING != "") {
							labLi += '<li>';
							labLi+='<a href="http://yyk.39.net/doctors/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
						}
						
					});
				}
			}else {
				if($.isArray(arrLabTypeList)) {
					$.each(arrLabTypeList, function(idx, element) {
						if(element.SEO_SPELLING != null && element.SEO_SPELLING != "null" && element.SEO_SPELLING != "") {
							labLi += '<li>';
							labLi+='<a href="http://yyk.39.net/hospitals/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
						}
						
					});
				}
			}
			$("#lianxiangDiv").attr("style","display:none;");
			$("#moreCon").html(labLi);
			$("#moreTitle").html("按“"+ key + "”相关的科室找");
			$("#moreDiv").show();
		}, 'json');
		
	 });
	
	$("#diseaseMore").click( function() {
		var key = $("#searchKey").val().trim();
		$.post("/search/more/diseaseInfo.jsonp",{name:key},function(data){
			var i = $("#type").val();
			var arrDiseaseList = data.diseaseInfoList;
			var diseaseLi = "";
			if(i == "0") {
				if($.isArray(arrDiseaseList)) {
					$.each(arrDiseaseList, function(idx, element) {
						if(element.SEO_SPELLING != null && element.SEO_SPELLING != "null" && element.SEO_SPELLING != "") {
							diseaseLi += '<li>';
							diseaseLi+='<a href="http://yyk.39.net/doctors/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
						}
						
					});
				}
			}else {
				if($.isArray(arrDiseaseList)) {
					$.each(arrDiseaseList, function(idx, element) {
						if(element.SEO_SPELLING != null && element.SEO_SPELLING != "null" && element.SEO_SPELLING != "") {
							diseaseLi += '<li>';
							diseaseLi+='<a href="http://yyk.39.net/hospitals/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
						}
						
					});
				}
			}
			$("#lianxiangDiv").attr("style","display:none;");
			$("#moreCon").html(diseaseLi);
			$("#moreTitle").html("按“"+ key + "”相关的疾病找");
			$("#moreDiv").show();
		}, 'json');
		
	 });
	
	$("#hospitalMore").click( function() {
		var key = $("#searchKey").val().trim();
		var i = $("#type").val();
		if (i == "0"){
			$.post("/search/hospitalByName.jsonp",{name:key},function(data){
				
				var arrHospitalList = data.hospitalInfoList;
				var hosLi = "";
				if($.isArray(arrHospitalList)) {
					$.each(arrHospitalList, function(idx, element) {
							hosLi += '<li>';
							hosLi+='<a href="http://yyk.39.net/doctors/' + element.HEX_ID + '/" title="' + element.NAME + '" target="_self">' + element.NAME + '</a></li>';
						
					});
				}
				$("#lianxiangDiv").attr("style","display:none;");
				$("#moreCon").html(hosLi);
				$("#moreTitle").html("按“"+ key + "”相关的指定医院内找");
				$("#moreDiv").show();
				
			}, 'json');
		}else {
			if(!(key == "" || key == "输入疾病名、科室或医生名")) {
				redirectSearchUrl();
			}
		}
		
		
	 });
	
	$("#searchKey").click(function() {
		return showDiv();
	 });
	
	$("#searchKey").focus(function() {
		return showDiv();
	 });
	
	function showDiv() {
		if (showSearchDown == 0){
			return false;
		}
		var key = $("#searchKey").val().trim();
		var type = $("#type").val();
		if(type == "1") {
			$("#sDoctor").attr("style","display:none;");
			$("#moreDiv").attr("style","display:none;");
			if(!(key == "" || key == "输入疾病名、科室或医院名")) {
				if (type == tempType){
					$("#lianxiangDiv").show();
				}else{
					a(key);
				}
			}else {
				$("#sHospital").show();
			}
			
		}else{
			$("#sHospital").attr("style","display:none;");
			$("#moreDiv").attr("style","display:none;");
			if(!(key == "" || key == "输入疾病名、科室或医生名")) {
				if (type == tempType){
					$("#lianxiangDiv").show();
				}else{
					a(key);
				}
			}else {
				$("#sDoctor").show();
			}
			
		}
		return false;
	 }
	$("#searchKey").blur( function() {
		//$("#lianxiangDiv").attr("style","display:none;");
		$("#moreDiv").attr("style","display:none;");
		$("#sDoctor").attr("style","display:none;");
		$("#sHospital").attr("style","display:none;");
	 });
	
	$("#lianxiangDiv a").click(function(e) {
		e.stopPropagation();
	});
	
	$(document).click(function(e) {
		$("#lianxiangDiv").attr("style","display:none;");
	});
	
	function changeTab(type){
		var areaSpelling = $("#areaSpelling").val();
		var labTypeSpelling = $("#labTypeSpelling").val();
		var diseaseSpelling = $("#diseaseSpelling").val();
		var url = "";
		if (areaSpelling == ""){
			url = url + "/" + type + "/";
		}else {
			url = url + "/" + areaSpelling + "/" + type + "/";
		}
		if (labTypeSpelling != ""){
			url = url + labTypeSpelling + "/";
		}
		if (diseaseSpelling != ""){
			url = url + diseaseSpelling + "/";
		}
		window.location.href = url;
	}
	
	var tempKeyWord = $("#searchKey").val();
	var tempType = document.getElementById("type").value;
	var timer=null;
	var searchInput = document.getElementById("searchKey");
	searchInput.onkeydown = function(){
		clearTimeout(timer);
	}
	searchInput.onkeyup= function(){
		if (showSearchDown == 0){
			return false;
		}
		$(".loading").show();
		$("#lianxiangDiv").hide();
		$("#sDoctor").hide();
		$("#sHospital").hide();
		var key = $("#searchKey").val().trim();
		timer = setTimeout(function(){
			var currentKey = $("#searchKey").val().trim();
			if (tempKeyWord != key && key != "输入疾病名、科室或医生名" && key != "输入疾病名、科室或医院名"){
				tempKeyWord = key;
				if (key == currentKey){
					a(key);
				}
			}else {
				$(".loading").hide();
			}
		},800);
	}
	 function a(key){
			var searchType = $("#searchType").attr("class");
			var i = $("#type").val();
			if(key == "") {
				$(".loading").hide();
				$("#lianxiangDiv").attr("style","display:none;");
				if(i == "0") {
					$("#sDoctor").show();
				}else {
					$("#sHospital").show();
				}
			}else {
				//$(".loading").show();
				//$("#lianxiangDiv").hide();
				//$("#sDoctor").hide();
				//$("#sHospital").hide();
				tempType = i;
				$.post('/search/keyDown.jsonp',{keyword : key},
						function(data) {
					$("#lianxiangDiv").show();
					var areaSpelling = $("#areaSpelling").val();
							
							
							if(i == "0") {
								$("#sDoctor").attr("style","display:none;");
								$("#labTip").html("按“"+ key + "”相关的科室找");
								$("#diseaseTip").html("按“"+ key + "”相关的疾病找");
								$("#doctorTip").html("按“"+ key + "”相关的医生");
								$("#hospitalTip").html("按“"+ key + "”相关的指定医院内找");
								$("#doctorCon").show();
								var arrLabTypeList = data.labTypeList;
								var arrDiseaseList = data.diseaseInfoList;
								var arrHospitalList = data.hospitalInfoList;
								var arrDoctorList = data.doctorInfoList;
								if (!($.isArray(arrLabTypeList)) && !($.isArray(arrHospitalList)) && !($.isArray(arrDiseaseList)) && !($.isArray(arrDoctorList))){
									$("#lianxiangDiv").attr("style","display:none;");
									return;
								}
								if($.isArray(arrLabTypeList)) {
									var labLi = "";
									$.each(arrLabTypeList, function(idx, element) {
										if(element.SEO_SPELLING != null && element.SEO_SPELLING != "null" && element.SEO_SPELLING != "") {
											if (areaSpelling == ""){
												labLi+='<li><a href="http://yyk.39.net/doctors/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
											}else {
												labLi+='<li><a href="http://yyk.39.net/' + areaSpelling + '/doctors/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
											}
											
										}
										
									});
									if(labLi == "") {
										$("#labCon").attr("style","display:none;");
									}else {
										$("#labCon").show();
										$("#labSpan").html(labLi);
									}
									if(arrLabTypeList.length >= 4) {
										$("#labMore").show();
									}else {
										$("#labMore").attr("style","display:none;");
									}
								}
								
								if($.isArray(arrDiseaseList)) {
									var diseaseLi = "";
									$.each(arrDiseaseList, function(idx, element) {
										if (areaSpelling == ""){
											diseaseLi+='<li><a href="http://yyk.39.net/doctors/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
										}else {
											diseaseLi+='<li><a href="http://yyk.39.net/' + areaSpelling + '/doctors/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
										}
										
									});
									if(diseaseLi == "") {
										$("#diseaseCon").attr("style","display:none;");
									}else {
										$("#diseaseCon").show();
										$("#diseaseSpan").html(diseaseLi);
									}
									if(arrDiseaseList.length >= 4) {
										$("#diseaseMore").show();
									}else {
										$("#diseaseMore").attr("style","display:none;");
									}
								}
								
								if($.isArray(arrHospitalList)) {
									var hosLi = "";
									$.each(arrHospitalList, function(idx, element) {
										hosLi += '<li>';
										hosLi+='<a href="http://yyk.39.net/doctors/' + element.HEX_ID + '/" title="' + element.NAME + '" target="_self">' + element.NAME + '</a></li>';
									});
									if(hosLi == "") {
										$("#hospitalCon").attr("style","display:none;");
									}else {
										$("#hospitalCon").show();
										$("#hospitalSpan").html(hosLi);
									}
									if(arrHospitalList.length >= 4) {
										$("#hospitalMore").show();
									}else {
										$("#hospitalMore").attr("style","display:none;");
									}
									
								}
								
								if($.isArray(arrDoctorList)) {
									var docLi = "";
									$.each(arrDoctorList, function(idx, element) {
										docLi += '<li>';
										docLi+='<a href="http://yyk.39.net/doctor/' + element.ID + '.html" title="' + element.NAME + '">' + element.NAME + '(' + element.HOSPITAL_NAME + ')</a></li>';
									});
									if(docLi == "") {
										$("#doctorCon").attr("style","display:none;");
									}else {
										$("#doctorCon").show();
										$("#doctorSpan").html(docLi);
									}
									if(arrDoctorList.length >= 4) {
										$("#doctorMore").show();
									}else {
										$("#doctorMore").attr("style","display:none;");
									}
								}
							}else {
								$("#sHospital").attr("style","display:none;");
								var arrHospitalList = data.hospitalInfoList;
								$("#doctorCon").attr("style","display:none;");
								$("#labTip").html("按“"+ key + "”相关的科室找");
								$("#diseaseTip").html("按“"+ key + "”相关的疾病找");
								$("#hospitalTip").html("按“"+ key + "”相关的医院");
								var arrLabTypeList = data.labTypeList;
								var arrDiseaseList = data.diseaseInfoList;
								if (!($.isArray(arrLabTypeList)) && !($.isArray(arrHospitalList)) && !($.isArray(arrDiseaseList))){
									$("#lianxiangDiv").attr("style","display:none;");
									return;
								}
								if($.isArray(arrLabTypeList)) {
									var labLi = "";
									$.each(arrLabTypeList, function(idx, element) {
										if(element.SEO_SPELLING != null && element.SEO_SPELLING != "null" && element.SEO_SPELLING != "") {
											if (areaSpelling == ""){
												labLi+='<li><a href="http://yyk.39.net/hospitals/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
											}else {
												labLi+='<li><a href="http://yyk.39.net/' + areaSpelling + '/hospitals/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
											}
											
										}
										
									});
									if(labLi == "") {
										$("#labCon").attr("style","display:none;");
									}else {
										$("#labCon").show();
										$("#labSpan").html(labLi);
									}
									if(arrLabTypeList.length >= 4) {
										$("#labMore").show();
									}else {
										$("#labMore").attr("style","display:none;");
									}
								}
								
								if($.isArray(arrDiseaseList)) {
									var diseaseLi = "";
									$.each(arrDiseaseList, function(idx, element) {
										if (areaSpelling == ""){
											diseaseLi+='<li><a href="http://yyk.39.net/hospitals/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
										}else {
											diseaseLi+='<li><a href="http://yyk.39.net/' + areaSpelling + '/hospitals/' + element.SEO_SPELLING + '/" title="' + element.NAME_CN + '" target="_self">' + element.NAME_CN + '</a></li>';
										}
										
									});
									if(diseaseLi == "") {
										$("#diseaseCon").attr("style","display:none;");
									}else {
										$("#diseaseCon").show();
										$("#diseaseSpan").html(diseaseLi);
									}
									if(arrDiseaseList.length >= 4) {
										$("#diseaseMore").show();
									}else {
										$("#diseaseMore").attr("style","display:none;");
									}
								}
								if($.isArray(arrHospitalList)) {
									var hosLi = "";
									$.each(arrHospitalList, function(idx, element) {
										hosLi += '<li>';
										hosLi+='<a href="http://yyk.39.net/' + element.ABBREVIATION.AREA_ABBREVIATION +"/"+element.ABBREVIATION.NATURE_ABBREVIATION +"/"+ element.HEX_ID+'.html" title="' + element.NAME + '">' + element.NAME + '</a></li>';
									});
									if(hosLi == "") {
										$("#hospitalCon").attr("style","display:none;");
									}else {
										$("#hospitalCon").show();
										$("#hospitalSpan").html(hosLi);
									}
									if(arrHospitalList.length >= 4) {
										$("#hospitalMore").show();
									}else {
										$("#hospitalMore").attr("style","display:none;");
									}
								}
							}
							$(".loading").hide();
							
						}, 'json');
			}
	 }