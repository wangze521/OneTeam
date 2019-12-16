/*初始化一个地图
 @param container 显示map的容器
 @param point map的中心坐标 
 @param level map的地图级别 
 */
 function initMap( container ) {
	 	// 创建地图实例  
	 	var areaId = $("#areaId").val();
	 	var area = $(".yyk-header-14 .location strong").text();
	 	var point = null; 
	 	var map = new BMap.Map( container );
	 	
	 	if (areaId == ""){
	 		level = 5;
	 		/* 中心点位置:郑州 */
	 		xloc = 113.625127;
	 		yloc = 34.840533;
	 		point = new BMap.Point(xloc, yloc);  // 创建点坐标
	 		map.centerAndZoom(point, level);//设置地图级别和中心位置
	 		
	 	}else if (areaId.length == 2 && areaId != "11" && areaId != "12" && areaId != "31" && areaId != "50"){
	 		level = 8;
	 		map.centerAndZoom(area, level);
	 		
	 	}else {
	 		level = 13;
	 		map.centerAndZoom(area, level);
	 	}
	   	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
		map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用  				 
		markAllHospitals( map, hospitals );//为hospitals添加标注
	 }
 
 
/*
 * 标注要显示的医院
 *@param hospitals 包含要标注的所有医院的坐标和名称的二维数组 */ 				 
function markAllHospitals ( map, hospitals )
	 {
 		var hospital = null;
 		var hospitalName = "";
	    var label = null;
	 	
		for( var index=0; index<hospitals.length; index++ )
		{
			
			hospital = new BMap.Point(hospitals[index][0], hospitals[index][1] );/* 医院的经纬度 */
			/* 為每個醫院增加標註 */
			var marker = new BMap.Marker(hospital);
			map.addOverlay(marker);
			
			hospitalName =hospitals[index][2];/* 醫院的名稱 */
			/* 為每個醫院添加文本標註 */
			label = new BMap.Label( hospitalName, {offset:new BMap.Size(20, -10)} );
			marker.setLabel(label);
			marker.setTitle(hospitalName);
			label.setTitle(hospitalName);
 		}	
 	}

	
    	
    
	
	function showMap(){
        var container = "map";
        	$("#show_map").hide();
			$("#hide_map").show();
                $("#yyk_serach_map").addClass("serach-right-box-map-big");
                $(".serach-left").addClass("serach-left-map-show");
                $("#yyk_serach_map .serach-right-cons .maps img").hide();
                $("#yyk_serach_map .serach-right-cons .maps #map").show();
                //加载百度地图API
                if ( flag == 0 )
                	{
                		loadScript( container  );
                		flag = 1;
                	}
                else
                	initMap( container );
	}
	
	
	function hideMap(){
		$("#show_map").show();
		$("#hide_map").hide();
        $("#yyk_serach_map").removeClass("serach-right-box-map-big");
        $(".serach-left").removeClass("serach-left-map-show");
        $("#yyk_serach_map .serach-right-cons .maps #map").hide();
        $("#yyk_serach_map .serach-right-cons .maps img").show();
	}
	
	
	/* 异步加载地图 */
    function loadScript( container ) {
   	 var script = document.createElement("script");
   	 script.src = "http://api.map.baidu.com/api?v=2.0&ak=kONZgwvSLDGnjoiDuGY01xn2&callback=initMap("
   			 + container 
   			 +")";
   	 document.body.appendChild(script);
   	 }