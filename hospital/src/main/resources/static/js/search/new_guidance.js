var guidance=function(path){
    this.path = path;
}

/**
 * 取医生成功预约总数.
 *
 * @param id
 */
guidance.prototype.getDoctorData=function(id){
    var url = this.path + "/doctor/data/"+id+".json";
    var container = $("#doctorRegNum"+id);
    $.getJSON(url,function(json){
          if(json.result==0){
              var data = json.data;
              if(data){
                  var num = data.REGISTER_NUM;
                  $(container).html(num);
                  $(container).parent('.success').show();
              }
          }
    });
}

guidance.prototype.getAllLabs=function(){
	getLabsByLetter('A_B_C_D_E');
	getLabsByLetter('F_G_H_I');
	getLabsByLetter('J_K_L_M')
	getLabsByLetter('N_O_P_Q');
	getLabsByLetter('R_S_T');
	getLabsByLetter('U_V_W');
	getLabsByLetter('X_Y_Z');
}

guidance.prototype.getAllDiseases=function(){
	getDiseaseByLetter('A');
	getDiseaseByLetter('B');
	getDiseaseByLetter('C');
	getDiseaseByLetter('D');
	getDiseaseByLetter('E');
	getDiseaseByLetter('F');
	getDiseaseByLetter('G');
	getDiseaseByLetter('H');
	getDiseaseByLetter('I');
	getDiseaseByLetter('J');
	getDiseaseByLetter('K');
	getDiseaseByLetter('L');
	getDiseaseByLetter('M');
	getDiseaseByLetter('N');
	getDiseaseByLetter('O');
	getDiseaseByLetter('P');
	getDiseaseByLetter('Q');
	getDiseaseByLetter('R');
	getDiseaseByLetter('S');
	getDiseaseByLetter('T');
	getDiseaseByLetter('U');
	getDiseaseByLetter('V');
	getDiseaseByLetter('W');
	getDiseaseByLetter('X');
	getDiseaseByLetter('Y');
	getDiseaseByLetter('Z');
}

guidance.prototype.getDoctorSuccessData=function(id){
	var url = this.path + "/doctor/data/"+id+".json";
	var container = $("#doctorRegNum_"+id);
	$.getJSON(url,function(json){
        if(json.result==0){
            var data = json.data;
            if(data){
                var num = data.REGISTER_NUM;
                if (num == 0){
                	$(container).hide();
                }else{
                	var html = "<i class='i2'>" + num + "人" +"</i>成功预约<br>";
            		$(container).html(html);
                }
            }
        }
  });
}

guidance.prototype.getDoctorLikes=function(docId){
	var container = $("#likes_"+docId);
	$.ajax({
		url:'/getDoctorOrHospitalLikes.json',
		data:'docId='+docId,
		error:function(errResult){
			console.log(errResult);
			$(container).hide();
		},
		success:function(result){
			//console.log('result',result);
			if(result.status==100){
				if (result.objCount == 0){
					$(container).hide();
				}else{
					var html = "<i class='i4'>" + result.objCount + "次" + "</i>被赞";
					$(container).html(html);
				}
			}else{
				$(container).hide();
			}
		}
	});
}

guidance.prototype.getHospitalLikes=function(hosHexId){
	var container = $("#likes_"+hosHexId);
	$.ajax({
		url:'/getDoctorOrHospitalLikes.json',
		data:'hosHexId='+hosHexId,
		error:function(errResult){
			console.log(errResult);
			$(container).hide();
		},
		success:function(result){
			if(result.status==100){
				if (result.objCount == 0){
					$(container).hide();
				}else{
					var html = "<i class='i4'>" + result.objCount + "次" + "</i>被赞";
					$(container).html(html);
				}
			}else{
				$(container).hide();
			}
		}
	});
}

guidance.prototype.getHospitalRegNum=function(hospitalId){
	var container = $("#hosRegNum_"+hospitalId);
	$.ajax({
		url:"/get/hospitalRegNum.json",
		data:"hospitalId=" + hospitalId,
		error:function(errResult){
			console.log(errResult);
			$(container).hide();
		},
		success:function(data){
			if (data == 0){
				$(container).hide();
			}else{
				var html = "<i class='i2'>" + data + "人" + "</i>成功预约<br>";
				$(container).html(html);
			}
		}
	});
}

guidance.prototype.getDoctorExperiences=function(docId){
	var url = "/getDoctor/"+docId+"_Experience.json";
	var tempPath = this.path;
	var container = $("#experiences_" + docId);
	$.getJSON(url,function(data){
		if(data>0){
			var html = "<a href='" + tempPath + "/doctor/" + docId + "_comments.html' title='查看患者就医经历'><i class='i3'>" + data +  "条</i>患者就医经历</a><br />";
			$(container).html(html);
		} else {
			$(container).hide();
		}
	});
}

guidance.prototype.calculateDoctorWorkTime=function(docId,year){
	var now =(new Date()).getFullYear();
	var num = now - year;
	$("#worktime_" + docId).html(num + "年");
}

guidance.prototype.getAdvertiseList=function(areaId,diseaseId,hospitalId,labTypeId,contentType,pageType){
	$.ajax({
		type : "get",
		url:'/get/advertiselist.json',
		data:'areaId=' + areaId + '&diseaseId=' + diseaseId + '&hospitalId=' + hospitalId + '&labTypeId=' 
		+ labTypeId+ '&contentType=' + contentType+ '&pageType=' + pageType,
		success:function(result){
			$("#advertise_right").html("");
			$("#advertise_bottom").html("");
			var rightHtml = "";
			var rightOutputHtml = "";
			var bottomHtml = "";
			var isOutput = 0;
			if (result.status = 0 && result.advertisePushContents.length > 0){
				for (var i = 0; i < result.advertisePushContents.length; i++){
					if(result.advertisePushContents[i].location==1){
						if(result.advertisePushContents[i].outputRelation==1){
							if(result.advertisePushContents[i].advertisePushHospitalList!=null){
								for(var t=0;isOutput<3&&t<result.advertisePushContents[i].advertisePushHospitalList.length;t++){
									isOutput ++;
									var itemHospital = result.advertisePushContents[i].advertisePushHospitalList[t];
									var hosUrl = "/"+itemHospital.ABBREVIATION.AREA_ABBREVIATION+"/"+itemHospital.ABBREVIATION.NATURE_ABBREVIATION+"/"+itemHospital.HEX_ID+".html";
									if(rightOutputHtml.length==0){
										rightOutputHtml = "<div class='serach-right-box serach-right-box2'><div class='serach-right-titles'><h3>品牌医院推荐</h3></div><div class='serach-right-cons'><div class='serach-right-reco'><ul class='clearfix'>";
									}
									rightOutputHtml += "<li><div class='reco_pic l'><a href='";
									rightOutputHtml += hosUrl;
									rightOutputHtml += ("'><img width='60' height='45' src='"+itemHospital.PIC);
									rightOutputHtml += ("'></a></div><div class='reco_text r'><h4><a href='"+hosUrl+"'>"+itemHospital.NAME+"</a></h4>");
									if(itemHospital.HOSPITAL_NATURE!=null && itemHospital.HOSPITAL_NATURE!=''){
										rightOutputHtml += "<i>"+itemHospital.HOSPITAL_NATURE+"</i>";
									}
									rightOutputHtml += ("</div><div class='clear'></div><div class='reco_btn clearfix'>");
									if(itemHospital.CONSULT_URL!=null && itemHospital.CONSULT_URL!=''){
										rightOutputHtml += ("<a class='l' href='"+itemHospital.CONSULT_URL+"'>咨询本院专家</a>");
									}
									rightOutputHtml += ("<a class='r' href='/hospital/"+itemHospital.HEX_ID+"_registers.html'>预约挂号</a></div></li>");
								}
							}
							
							if(result.advertisePushContents[i].advertisePushDoctorList!=null){
								for(var t=0;isOutput<3&&t<result.advertisePushContents[i].advertisePushDoctorList.length;t++){
									isOutput ++;
									if(rightOutputHtml=="") rightOutputHtml += '<div class="serach-right-box serach-right-box2"><div class="serach-right-titles"><h3>专科推荐医生</h3></div><div class="serach-right-cons"><div class="serach-right-reco serach-right-reco-doc"><ul class="clearfix">';
									var item = result.advertisePushContents[i].advertisePushDoctorList[t];
									var itemUrl = "/doctor/"+item.ID+".html";
									var hosUrl = "/"+item.HOSPITAL_INFO.ABBREVIATION.AREA_ABBREVIATION+"/"+item.HOSPITAL_INFO.ABBREVIATION.NATURE_ABBREVIATION+"/"+item.HOSPITAL_INFO.HEX_ID+".html";
									rightOutputHtml += '<li><div class="reco_pic l"><a href="'+itemUrl;
									rightOutputHtml += '"><img width="60" height="75" src="'+item.HEAD_PORTRAIT+'"></a></div><div class="reco_text r"><h4><a href="'+itemUrl;
									rightOutputHtml += '">'+item.NAME+'</a><em>';
									if(typeof item.TAG_CLINIC_POSITION_NAME != "undefined"){
										rightOutputHtml += item.TAG_CLINIC_POSITION_NAME;
									}
									rightOutputHtml += '</em></h4><p><a href="/hospital/'+item.LAB_INFO.ID
									rightOutputHtml += '_lab.html">'+item.LAB_INFO.NAME+'</a></p><p><a href="'+hosUrl
									rightOutputHtml += '">'+item.HOSPITAL_INFO.NAME+'</a></p></div><div class="clear"></div><div class="reco_btn clearfix">';
									if(item.HOSPITAL_INFO.CONSULT_URL!=null && item.HOSPITAL_INFO.CONSULT_URL!=''){
										rightOutputHtml += '<a class="l" href="'+item.HOSPITAL_INFO.CONSULT_URL+'">咨询专家</a>';
									}
									if(item.REGISTER_FLAG=='Y'){
										rightOutputHtml += '<a class="r" href="'+itemUrl+'">预约挂号</a>';
									}
									rightOutputHtml += '</div></li>';
								}
							}
						} else{
							rightHtml = rightHtml + result.advertisePushContents[i].content;
						}
					}else if(result.advertisePushContents[i].location==2){
						bottomHtml = bottomHtml + result.advertisePushContents[i].content;
					}
				}
				if(rightHtml.length>0) $("#advertise_right").append(rightHtml);
				if(rightOutputHtml.length>0) {
					rightOutputHtml += "</ul></div></div></div>";
					$("#advertise_right").append(rightOutputHtml);
				}
				if(bottomHtml.length>0) $("#advertise_bottom").html(bottomHtml);
			}
		}
	});
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

function getDiseaseListByLabId(labId){
	$("#default_diseases").html("");
	$.ajax({
		type : "get",
		url:'/get/diseaseByLabId.json',
		data:'labId=' + labId,
		success:function(result){
			$("#default_diseases").html("");
			var defaultDiseases = new Array();;
			var defaultDiseasesName = new Array();;
			var defaultDiseasesHtml = "<dt>按擅长疾病找：</dt>";
			if (result.length > 0){
				for (i = 0; i < result.length; i++){
					defaultDiseases[i] = result[i].SEO_SPELLING;
					defaultDiseasesName[i] = result[i].NAME_CN;
				}
				var num = defaultDiseases.length;
				for (var i = 0; i < num; i++){
					defaultDiseasesHtml = defaultDiseasesHtml + "<dd><a href='" + buildDefaultDiseaseOrLabUrl(defaultDiseases[i]) + "' target='_self' title=''>" + defaultDiseasesName[i] + "</a></dd>";
				}
			}
			$("#default_diseases").html(defaultDiseasesHtml);			
		}
	});
}

function buildEndStr(){
	var endStr = "/";
	return endStr;
}

function orderBy(order){
	var url = location.pathname;
	var params = location.search;
	var conditions = url.split("/");
	var condition = conditions[conditions.length -2];
	if (condition.substring(0,3) == "c_p"){
		url = url.substring(0,url.indexOf("c_p"));
	}else {
		if (condition.substring(0,2) == "c_"){
			var pageIndex = condition.indexOf("_p");
			if (pageIndex > -1){
				var relaceStr = condition.substring(pageIndex,condition.length);
				url = url.replace(relaceStr, "");
			}
		}
	}
	if (params == ""){
		if (order != ""){
			params = "?order=" + order;
		}
	}else {
		if (params.indexOf("order=") == -1){
			if (order != ""){
				params = params + "&order=" + order;
			}
		}else {
			params = params.substring(0, params.indexOf("order="));
			if (order != ""){
				params = params + "order=" + order;
			}
		}
	}
	if (params == "?"){
		params = "";
	}
	window.location.href = url + params;
}
