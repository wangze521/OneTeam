/*��ʼ��һ����ͼ
 @param container ��ʾmap������
 @param point map���������� 
 @param level map�ĵ�ͼ���� 
 */
 function initMap( container ) {
	 	// ������ͼʵ��  
	 	var areaId = $("#areaId").val();
	 	var area = $(".yyk-header-14 .location strong").text();
	 	var point = null; 
	 	var map = new BMap.Map( container );
	 	
	 	if (areaId == ""){
	 		level = 5;
	 		/* ���ĵ�λ��:֣�� */
	 		xloc = 113.625127;
	 		yloc = 34.840533;
	 		point = new BMap.Point(xloc, yloc);  // ����������
	 		map.centerAndZoom(point, level);//���õ�ͼ���������λ��
	 		
	 	}else if (areaId.length == 2 && areaId != "11" && areaId != "12" && areaId != "31" && areaId != "50"){
	 		level = 8;
	 		map.centerAndZoom(area, level);
	 		
	 	}else {
	 		level = 13;
	 		map.centerAndZoom(area, level);
	 	}
	   	map.enableScrollWheelZoom();   //���ù��ַŴ���С��Ĭ�Ͻ���
		map.enableContinuousZoom();    //���õ�ͼ������ק��Ĭ�Ͻ���  				 
		markAllHospitals( map, hospitals );//Ϊhospitals��ӱ�ע
	 }
 
 
/*
 * ��עҪ��ʾ��ҽԺ
 *@param hospitals ����Ҫ��ע������ҽԺ����������ƵĶ�ά���� */ 				 
function markAllHospitals ( map, hospitals )
	 {
 		var hospital = null;
 		var hospitalName = "";
	    var label = null;
	 	
		for( var index=0; index<hospitals.length; index++ )
		{
			
			hospital = new BMap.Point(hospitals[index][0], hospitals[index][1] );/* ҽԺ�ľ�γ�� */
			/* ��ÿ���tԺ���Ә��] */
			var marker = new BMap.Marker(hospital);
			map.addOverlay(marker);
			
			hospitalName =hospitals[index][2];/* �tԺ�����Q */
			/* ��ÿ���tԺ����ı����] */
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
                //���ذٶȵ�ͼAPI
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
	
	
	/* �첽���ص�ͼ */
    function loadScript( container ) {
   	 var script = document.createElement("script");
   	 script.src = "http://api.map.baidu.com/api?v=2.0&ak=kONZgwvSLDGnjoiDuGY01xn2&callback=initMap("
   			 + container 
   			 +")";
   	 document.body.appendChild(script);
   	 }