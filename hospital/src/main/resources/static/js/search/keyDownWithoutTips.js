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
			var type = $("#type").val();
			var jumpUrl = "/search/redirect/?type=" + type + "&searchKey=" + key;
			window.location.href = jumpUrl;
		}
	}
	

	$("#searchButton").click( function() {
		redirectSearchUrl();
	 });
	
	$("#searchType").click( function() {
		$("#lianxiangDiv").attr("style","display:none;");
		$("#moreDiv").attr("style","display:none;");
		changeTab("hospitals");
	 });
	
	$("#searchType2").click( function() {
		$("#lianxiangDiv").attr("style","display:none;");
		$("#moreDiv").attr("style","display:none;");
		changeTab("doctors");
	 });
	
	
	function changeTab(type){
		var key = $.trim($("#searchKey").val());
		if (type == "hospitals"){
			$("#type").val("1");
			$("#searchType2").removeClass("now");
			$("#searchType").addClass("now");
			if (key == "输入疾病名、科室或医生名"){
				$("#searchKey").val("输入疾病名、科室或医院名")
			}
		}else {
			$("#type").val("0");
			$("#searchType").removeClass("now");
			$("#searchType2").addClass("now");
			if (key == "输入疾病名、科室或医院名"){
				$("#searchKey").val("输入疾病名、科室或医生名")
			}
		}
	}
	
