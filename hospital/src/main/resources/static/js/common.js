/**
 * ѡ�в˵�
 * ˵����menuNum�˵���
 * @return
 */
function selectMenu(menuNum){
	var currentUri = location.pathname;
	for(var i=1;i<=menuNum;i++){
    	if($("#menu"+i).attr("href") == currentUri){
    		$("#menu"+i).parent().parent().attr("id","now"); 
    		break;
        }
	}
}

$(document).ready(function () {
	var bt = $('#gotoTop');
	var sw = $(document.body)[0].clientWidth;
	var limitsw = (sw - 1060) / 2 - 40;
	if (limitsw > 0){
		limitsw = parseInt(limitsw);
		bt.css("right",limitsw);
	}
	$(window).scroll(function() {
		var st = $(window).scrollTop();
		if(st > 30){
			bt.show();
		}else{
			bt.hide();
		}
	});
});

// 39��������
function getNavigatorType(){
	if(navigator.appName == "Microsoft Internet Explorer")
		return 1;  
	else if(navigator.appName == "Netscape")
		return 2;	
	else 
		return 0;
}

function getObject(objectId){ 
	// checkW3C DOM, then MSIE 4, then NN 4.
	if(document.getElementById && document.getElementById(objectId)){ 
		return document.getElementById(objectId);
	}else if (document.all && document.all(objectId)){ 
		return document.all(objectId); // IE4,5.0
	}else if (document.layers && document.layers[objectId]){ 
		return document.layers[objectId];  // Netscape 4.x
	}else{ 
		return false; 
	} 
}

function wValChg(idx,sts){
	var s = "http://so.39.net/";
	if(idx == "showlist") getObject("wn_"+ sts +"").innerHTML = "�ۺ�";
	if(idx == "yyk") getObject("wn_"+ sts +"").innerHTML = "ҽԺ";
	if(idx == "ksk") getObject("wn_"+ sts +"").innerHTML = "����";
	if(idx == "ysk") getObject("wn_"+ sts +"").innerHTML = "ҽ��";
	if(idx == "jbk") getObject("wn_"+ sts +"").innerHTML = "����";
	if(idx == "zzk") getObject("wn_"+ sts +"").innerHTML = "֢״";
	if(idx == "jck") getObject("wn_"+ sts +"").innerHTML = "���";
	if(idx == "ypk") getObject("wn_"+ sts +"").innerHTML = "ҩƷ";
	if(idx == "yqk") getObject("wn_"+ sts +"").innerHTML = "ҩ��";
	if(idx == "article") getObject("wn_"+ sts +"").innerHTML = "����";
	if(idx == "ask") getObject("wn_"+ sts +"").innerHTML = "��ҽ��";
	if(idx == "bbs") getObject("wn_"+ sts +"").innerHTML = "��̳";
	if(idx == "blog") getObject("wn_"+ sts +"").innerHTML = "����";
	if(idx == "hzpk") getObject("wn_"+ sts +"").innerHTML = "��ױƷ";
	if(idx == "zxk") getObject("wn_"+ sts +"").innerHTML = "���ο�";
	if(sts == "h"){
	    document.search.action = s + idx +".aspx";
	}
	getObject("sbArea_"+ sts +"").style.display = "none";
}

function wValDisp(sts,idx){
	if(getObject("sbArea_"+ sts +"").style.display == "none"){
		getObject("sbArea_"+ sts +"").style.display = "";
	}else{
		getObject("sbArea_"+ sts +"").style.display = "none";
	}
}

function setSelBox(event){
	var _event;
	switch (getNavigatorType()) {
		case 1 : // IE
			_event = window.event;
			node = _event.srcElement;
			nodeName = _event.srcElement.className;
			break;
		case 2 : // Netscape
			_event = event;
			node = _event.target;
			nodeName = _event.target.className;
			break;
		default :
			nodeName = "None"; 
			break;
	}
	if(nodeName == "dselObj"){
		
	}else{
		try{
			document.getElementById("sbArea_h").style.display = "none";
		}catch(e){}
	}
}
document.onmousedown = setSelBox;

// ��ʾ�������б�
function showList(id,num){
	if(num == 1){
		document.getElementById(id).style.display = "block";
	}
	else{
		document.getElementById(id).style.display = "none";
	}
}

// flash �����Ҫ�ű�
function insertFlash(elm, url, w, h, id) {
 if (!document.getElementById(elm)) return;
 var str = '';
 str += '<embed width="'+ w +'" height="'+ h +'" src="'+ url +'" quality="autohigh" wmode="opaque" type="application/x-shockwave-flash" plugspace="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" id='+id+'></embed>';
 document.getElementById(elm).innerHTML = str;
}

function insertFlash1(elm, url, w, h, id) {
 if (!document.getElementById(elm)) return;
 var str = '';
 str += '<embed width="'+ w +'" height="'+ h +'" src="'+ url +'" quality="autohigh" wmode="transparent" type="application/x-shockwave-flash" plugspace="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" id='+id+'></embed>';
 document.getElementById(elm).innerHTML = str;
}

function openShutManagerById(liId,oSourceObj,oTargetObj,shutAble,oOpenTip,oShutTip){
	var sourceObj = typeof oSourceObj == "string" ? document.getElementById(oSourceObj) : oSourceObj;
	var targetObj = typeof oTargetObj == "string" ? document.getElementById(oTargetObj) : oTargetObj;
	var openTip = oOpenTip || "";
	var shutTip = oShutTip || "";

	if(targetObj.className!="shut"){
		if(shutAble) return;
		targetObj.className="shut";
        $('[id='+liId+']').fadeOut(300);
		if(openTip && shutTip){
			sourceObj.innerHTML = shutTip;
		}
	} 
	else {
		targetObj.className="open";
        $('[id='+liId+']').fadeIn(300);
		if(openTip && shutTip){
			sourceObj.innerHTML = openTip;
		}
	}
}

function openShutManager(oSourceObj, oTargetObj, shutAble, oOpenTip, oShutTip) {
	var sourceObj = typeof oSourceObj == "string" ? document
			.getElementById(oSourceObj) : oSourceObj;
	var targetObj = typeof oTargetObj == "string" ? document
			.getElementById(oTargetObj) : oTargetObj;
	var openTip = oOpenTip || "";
	var shutTip = oShutTip || "";
	if (targetObj.className != "shut") {
		if (shutAble)
			return;
		targetObj.className = "shut";
		if (openTip && shutTip) {
			sourceObj.innerHTML = shutTip;
		}
	} else {
		targetObj.className = "open";
		if (openTip && shutTip) {
			sourceObj.innerHTML = openTip;
		}
	}
}

$(document).ready(function(){
	var searchForArr = $('a[name=searchFor]');
	var oTopSearchForm = $('#topSearchForm'); 
	$.each(searchForArr, function(i, n) {
		var _this = $(n);
		if (_this.hasClass('now')) {
			oTopSearchForm.attr('action', '/search/' + _this.attr('id'));
		}
		
		_this.click(function(){
			if (!_this.hasClass('now'))
				_this.addClass('now');
				$.each(searchForArr, function(ni, nn) {
					if (i == ni)
						oTopSearchForm.attr('action', '/search/' + _this.attr('id'));
					else
						$(this).removeClass('now');
			});
		});
	});
	
	oTopSearchForm.submit(function() {
		var oName = $('input[name=name]')[0];
		var sEmptyCss = 'rgb(187, 187, 187)';
		var sEmptyValue = '���뼲�����ƣ������ҵ���ҽԺ����ר��';
		if(oName.style.color === sEmptyCss && oName.value === sEmptyValue)
			return false;
		return true;
	});
});

//��Ϊ��ҳ&�����ղ�
var isIE=(document.all&&document.getElementById&&!window.opera)?true:false; 
var isMozilla=(!document.all&&document.getElementById&&!window.opera)?true:false; 
var isOpera=(window.opera)?true:false;
var seturl='url(#default#homepage)';
var weburl=window.location.href;
var webname=document.title;

function myhomepage()	{
	if(isMozilla){
		try {netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");} 
		catch (e){alert("�˲�����������ܾ���\n�����������ַ�����롰about:config�����س�\nȻ��[signed.applets.codebase_principal_support]����Ϊ'true'");}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage',weburl);
	}
	if(isIE){
		this.homepage.style.behavior=seturl;this.homepage.sethomepage(weburl); 
	}
}

function addfavorite()
{

	if(isMozilla){
		if (document.all){ window.external.addFavorite(weburl,webname);}
		else if (window.sidebar){ window.sidebar.addPanel(webname, weburl,"");}
	}
	if(isIE){window.external.AddFavorite(weburl, webname);}	
}
/**
 * ����ֵ��������(����2λС��)���ʽ���ɽ����ʽ
 *
 * @param num ��ֵ(Number����String)
 * @return ����ʽ���ַ���,��'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}
var BASE64={
    /**
     * �˱���Ϊ�����key��ÿ���ַ����±����Ӧ����������ı��롣
     */
    enKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    /**
     * �˱���Ϊ�����key����һ�����飬BASE64���ַ���ASCIIֵ���±꣬����Ӧ�ľ��Ǹ��ַ�������ı���ֵ��
     */
    deKey: new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
    ),
    /**
     * ����
     */
    encode: function(src){
        //��һ����������ű������ַ���Ч�ʱ����ַ�����Ӹߺܶࡣ
        var str=new Array();
        var ch1, ch2, ch3;
        var pos=0;
       //ÿ�����ַ����б��롣
        while(pos+3<=src.length){
            ch1=src.charCodeAt(pos++);
            ch2=src.charCodeAt(pos++);
            ch3=src.charCodeAt(pos++);
            str.push(this.enKey.charAt(ch1>>2), this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
            str.push(this.enKey.charAt(((ch2<<2)+(ch3>>6))&0x3f), this.enKey.charAt(ch3&0x3f));
        }
        //��ʣ�µ��ַ����б��롣
        if(pos<src.length){
            ch1=src.charCodeAt(pos++);
            str.push(this.enKey.charAt(ch1>>2));
            if(pos<src.length){
                ch2=src.charCodeAt(pos);
                str.push(this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
                str.push(this.enKey.charAt(ch2<<2&0x3f), '=');
            }else{
                str.push(this.enKey.charAt(ch1<<4&0x3f), '==');
            }
        }
       //��ϸ��������ַ�������һ���ַ�����
        return str.join('');
    },
    /**
     * ���롣
     */
    decode: function(src){
        //��һ����������Ž������ַ���
        var str=new Array();
        var ch1, ch2, ch3, ch4;
        var pos=0;
       //���˷Ƿ��ַ�����ȥ��'='��
        src=src.replace(/[^A-Za-z0-9\+\/]/g, '');
        //decode the source string in partition of per four characters.
        while(pos+4<=src.length){
            ch1=this.deKey[src.charCodeAt(pos++)];
            ch2=this.deKey[src.charCodeAt(pos++)];
            ch3=this.deKey[src.charCodeAt(pos++)];
            ch4=this.deKey[src.charCodeAt(pos++)];
            str.push(String.fromCharCode(
                (ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2), (ch3<<6&0xff)+ch4));
        }
        //��ʣ�µ��ַ����н��롣
        if(pos+1<src.length){
            ch1=this.deKey[src.charCodeAt(pos++)];
            ch2=this.deKey[src.charCodeAt(pos++)];
            if(pos<src.length){
                ch3=this.deKey[src.charCodeAt(pos)];
                str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2)));
            }else{
                str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4)));
            }
        }
       //��ϸ��������ַ�������һ���ַ�����
        return str.join('');
    }
};

function div(number1, number2){
    var num1 = Math.round(number1);
    var num2 = Math.round(number2);
    var result = num1/num2;
    if(result >=0){
        result = Math.floor(result);
    }else{
        result = Math.ceil(result);
    }
    return result;
 }