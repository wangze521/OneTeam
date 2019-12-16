var recommend=function(path){
    this.path = path;
}

recommend.prototype.calculateDoctorWorkTime=function(docId,year){
	var now =(new Date()).getFullYear();
	var num = now - year;
	$("#worktime_" + docId).html(num + "年");
}

recommend.prototype.getDoctorLikes=function(docId){
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
					var html = "<li><span class='color-green'>" + result.objCount + "次" + "</span>被赞</li>";
					$(container).html(html);
				}
			}else{
				$(container).hide();
			}
		}
	});
}

recommend.prototype.getDoctorExperiences=function(docId){
	var url = "/getDoctor/"+docId+"_Experience.json";
	var tempPath = this.path;
	var container = $("#experiences_" + docId);
	$.ajaxSettings.async = true;
	$.getJSON(url,function(data){
		if(data>0){
			var html = "<li><span class='color-blue'>" + data + "条" + "</span>患者就医经历</li>";
			$(container).html(html);
		} else {
			$(container).hide();
		}
	});
}