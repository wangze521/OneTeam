var Speed_h_b = 30; //�ٶ�(����)
var Space_h_b = 5; //ÿ���ƶ�(px)
var PageWidth_h_b = 80; //��ҳ���
var interval_h_b = 5000; //��ҳ���ʱ��
var fill_h_b = 0; //������λ
var MoveLock_h_b = false;
var MoveTimeObj_h_b;
var MoveWay_h_b="right";
var Comp_h_b = 0;
var AutoPlayObj_h_b=null;
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}
function AutoPlay_h_b(){clearInterval(AutoPlayObj_h_b);AutoPlayObj_h_b=setInterval('SHB_GoDown();SHB_StopDown();',interval_h_b)}
function SHB_GoUp(){if(MoveLock_h_b)return;clearInterval(AutoPlayObj_h_b);MoveLock_h_b=true;MoveWay_h_b="left";MoveTimeObj_h_b=setInterval('SHB_ScrUp_h_b();',Speed_h_b);}
function SHB_StopUp(){if(MoveWay_h_b == "right"){return};clearInterval(MoveTimeObj_h_b);if((GetObj('scroll_h_break').scrollLeft-fill_h_b)%PageWidth_h_b!=0){Comp_h_b=fill_h_b-(GetObj('scroll_h_break').scrollLeft%PageWidth_h_b);CompScr_h_b()}else{MoveLock_h_b=false}AutoPlay_h_b()}
function SHB_ScrUp_h_b(){if(GetObj('scroll_h_break').scrollLeft<=0){GetObj('scroll_h_break').scrollLeft=GetObj('scroll_h_break').scrollLeft+GetObj('scroll_h_break_begin').offsetWidth}GetObj('scroll_h_break').scrollLeft-=Space_h_b}
function SHB_GoDown(){clearInterval(MoveTimeObj_h_b);if(MoveLock_h_b)return;clearInterval(AutoPlayObj_h_b);MoveLock_h_b=true;MoveWay_h_b="right";SHB_ScrDown_h_b();MoveTimeObj_h_b=setInterval('SHB_ScrDown_h_b()',Speed_h_b)}
function SHB_StopDown(){if(MoveWay_h_b == "left"){return};clearInterval(MoveTimeObj_h_b);if(GetObj('scroll_h_break').scrollLeft%PageWidth_h_b-(fill_h_b>=0?fill_h_b:fill_h_b+1)!=0){Comp_h_b=PageWidth_h_b-GetObj('scroll_h_break').scrollLeft%PageWidth_h_b+fill_h_b;CompScr_h_b()}else{MoveLock_h_b=false}AutoPlay_h_b()}
function SHB_ScrDown_h_b(){if(GetObj('scroll_h_break').scrollLeft>=GetObj('scroll_h_break_begin').scrollWidth){GetObj('scroll_h_break').scrollLeft=GetObj('scroll_h_break').scrollLeft-GetObj('scroll_h_break_begin').scrollWidth}GetObj('scroll_h_break').scrollLeft+=Space_h_b}
function CompScr_h_b(){if(Comp_h_b==0){MoveLock_h_b=false;return}var num,TempSpeed=Speed_h_b,TempSpace=Space_h_b;if(Math.abs(Comp_h_b)<PageWidth_h_b/2){TempSpace=Math.round(Math.abs(Comp_h_b/Space_h_b));if(TempSpace<1){TempSpace=1}}if(Comp_h_b<0){if(Comp_h_b<-TempSpace){Comp_h_b+=TempSpace;num=TempSpace}else{num=-Comp_h_b;Comp_h_b=0}GetObj('scroll_h_break').scrollLeft-=num;setTimeout('CompScr_h_b()',TempSpeed)}else{if(Comp_h_b>TempSpace){Comp_h_b-=TempSpace;num=TempSpace}else{num=Comp_h_b;Comp_h_b=0}GetObj('scroll_h_break').scrollLeft+=num;setTimeout('CompScr_h_b()',TempSpeed)}}
function scroll_h_break(){GetObj("scroll_h_break_end").innerHTML=GetObj("scroll_h_break_begin").innerHTML;GetObj('scroll_h_break').scrollLeft=fill_h_b>=0?fill_h_b:GetObj('scroll_h_break_begin').scrollWidth-Math.abs(fill_h_b);GetObj("scroll_h_break").onmouseover=function(){clearInterval(AutoPlayObj_h_b)};GetObj("scroll_h_break").onmouseout=function(){AutoPlay_h_b()};AutoPlay_h_b();}

function showTab(n1,n2){
var h=document.getElementById("tab"+n1).getElementsByTagName("em");
var d=document.getElementById("tab"+n1).getElementsByTagName("div");
for(var i=0;i<h.length;i++){
if(n2-1==i){
h[i].className+=" over";
d[i].className+=" show";
}
else {
h[i].className=" ";
d[i].className=" ";
}}}

// �ظ�����
function openShutManager(oSourceObj,oTargetObj,shutAble,oOpenTip,oShutTip){
var sourceObj = typeof oSourceObj == "string" ? document.getElementById(oSourceObj) : oSourceObj;
var targetObj = typeof oTargetObj == "string" ? document.getElementById(oTargetObj) : oTargetObj;
var openTip = oOpenTip || "";
var shutTip = oShutTip || "";
if(targetObj.className!="shut"){
if(shutAble) return;
targetObj.className="shut";
if(openTip && shutTip){
sourceObj.innerHTML = shutTip;
}
} else {
targetObj.className="open";
if(openTip && shutTip){
sourceObj.innerHTML = openTip;
}
}
}

// ��������
$(function(){
	$("form .tit").focus(function(){
		if($(this).val() == this.defaultValue){
			$(this).val("").css("color","#333");
		}
	}).blur(function(){
		if($(this).val() == ""){
			$(this).val(this.defaultValue).css("color","#999");
		}
	});
	$("form .btn").hover(function(){
		$(this).addClass("btn_hover");
	},function(){
		$(this).removeClass("btn_hover");
	});
});


// -------------
$(function(){
	$(".askUl li").hover(function(){
	  $(this).toggleClass("liHover");
	});
	$(".nNav").parents(".wrap").addClass("warpShow");
	$("a.nBut1").hover(function(){
	  $(this).siblings("div.nBut1B").toggle();
	});
	$("a.nBut2").hover(function(){
	  $(this).siblings("div.nBut2B").toggle();
	});
	$("ul.docList li a").click(function(){
	  $("ul.docList li a").removeClass("current");
	  $(this).addClass("current")
	  return false;
	});
	$(".yy_tips .t_close").click(function(){
	  $(".yy_tips").hide();
	});
});

// �Ҳ��Ժչ��
$(function() {
	$("#yanjiu ul li:last").css("background","none");
	var folder1=new boxfold({id:"#yanjiu",etarget:"ul",minheight:"72px",tpl:"<i title='չ��ȫ��'></i>",openClass:"i_show"});
	var folder2=new boxfold({id:"#yishenggua",etarget:".art_gz",minheight:"142px",tpl:"<i title='չ��ȫ��'></i>",openClass:"i_show"});
});
function boxfold(config){
	if(!config || typeof config.id === "undefined")return;
	this.config =config;
	var objid=jQuery(config.id);
	var eobj=objid.find(config.etarget);
	if(eobj.length<=0)return;
	var minheight=Number(config.minheight.split("px")[0]);
	var maxheight=eobj.height();
	if(maxheight<=minheight)return;
	var btn;
	if(config.tpl){
		btn=jQuery(config.tpl);
		btn.toggle(function(){
			eobj.animate({height:maxheight},300);
			$(this).addClass(config.openClass).attr("title","���𲿷�");
		},function(){
			eobj.animate({height:minheight},300);
			$(this).removeClass(config.openClass).attr("title","չ��ȫ��");
		});
		objid.append(btn);
		eobj.height(minheight);
	}
}

// �ص�����
$(function () {
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

// rolltable
$(function() {
	$('#order_dc_table table tr:nth-child(3n)').css('height','51px'); //�б�ÿ��3������1px������
	//���hover
	var _w=$('#order_dc_table ul li').width(),
	_s=$('#order_dc_table ul li').size();
	_n=0;	
	
	$('#order_dc_info li').hover(function(){
		$(this).css('background-color','#F6F9FA');
		_i=$(this).index("#order_dc_info li");
		$('#order_dc_table table tr .time').css('visibility','hidden');
		$('#order_dc_table  table tr .time:eq('+(_i*3)+'),#order_dc_table  table tr .time:eq('+(_i*3+1)+'),#order_dc_table  table tr .time:eq('+(_i*3+2)+')').css('visibility','visible');
	}, function(){
		$(this).css('background-color','#FFF');	
		$('#order_dc_table table tr .time').css('visibility','hidden');
	});
	$('#order_dc_table table tr').hover(function(){_i=parseInt($(this).index()/3);$('#order_dc_info li:eq('+_i+')').mouseover();}
	, function(){_i=parseInt($(this).index()/3);$('#order_dc_info li:eq('+_i+')').mouseout();});
});

// rolltable 20130416
$(function() {
	$('#order_dc_table2 table tr:nth-child(3n)').css('height','51px'); //�б�ÿ��3������1px������
	//���hover
	var _w=$('#order_dc_table2 ul li').width(),
	_s=$('#order_dc_table2 ul li').size();
	_n=0;	
	
	$('#order_dc_info2 li').hover(function(){
		$(this).css('background-color','#F6F9FA');
		_i=$(this).index("#order_dc_info2 li");
		$('#order_dc_table2 table tr .time').css('visibility','hidden');
		$('#order_dc_table2  table tr .time:eq('+(_i*3)+'),#order_dc_table2  table tr .time:eq('+(_i*3+1)+'),#order_dc_table2  table tr .time:eq('+(_i*3+2)+')').css('visibility','visible');
	}, function(){
		$(this).css('background-color','#FFF');	
		$('#order_dc_table2 table tr .time').css('visibility','hidden');
	});
	$('#order_dc_table2 table tr').hover(function(){_i=parseInt($(this).index()/3);$('#order_dc_info2 li:eq('+_i+')').mouseover();}
	, function(){_i=parseInt($(this).index()/3);$('#order_dc_info2 li:eq('+_i+')').mouseout();});
});

function rolltable(config){
	this.config = config || {};
	var obj=jQuery(config.id) || null,
		page=0,
		rollobj=obj.find(config.roll) || obj.find("ul"),
		rollwidth=config.rollwidth || rollobj.find("li").width(),
		num=rollobj.find("li").length,
		ctrll=jQuery(config.ctrll),
		ctrlr=jQuery(config.ctrlr),
		speed=config.speed,
		timeli = config.timebox || null,
		lockweek=(typeof config.lockweek =="undefined")?true:config.lockweek,//����������ʼ�죻
		timestart=(config.timestart!=null)?new Date(config.timestart):new Date(),//������ʼ����
		daystart=config.daystart || 0,//��һ�ܵĵڼ��쿪ʼ��
		notover=config.notover || false;
	var dateli=[];
	var cnWeek = ["����","��һ","�ܶ�","����","����","����","����"];
		/*��ʼ������*/
	 roll(0);
	ctrll.bind("click",function(e) {
		page--;
		roll(page);
	});
	ctrlr.bind("click",function(e) {
			page++;
			roll(page);
	});
	(function initTime(){
		var firstday=new Date(),i,j,weekstr;
		if(lockweek){//�̶���ʼ����
			firstday= new Date(timestart.valueOf()+(-timestart.getDay()+daystart)*24*60*60*1000)
		}else{//���̶���ʼ����
			firstday=new Date(timestart.valueOf()+daystart*24*60*60*1000);
		}
		//console.log("firstday=%o,timestart=%o,daystart=%d",firstday,timestart,daystart)
		for(i=0;i<num;i++){
			weekstr="";
			var tab_week='';
			for(j=0;j<7;j++){
				weekstr+='<li>'+(firstday.getMonth()+1)+'/'+firstday.getDate()+'<br>'+cnWeek[firstday.getDay()]+'</li>';
				//20130814 �Ű���¼�ѡ� ��ȡ�Ű�����ʼʱ��/����ʱ�� @chenliexin
				if(j==0){
					tab_week+=(firstday.getMonth()+1)+'��'+firstday.getDate()+'��';
				}else if(j==6){
					tab_week+='<i>~</i>'+(firstday.getMonth()+1)+'��'+firstday.getDate()+'��';
				};
				firstday.setDate(firstday.getDate()+1);
			}
			dateli.push(weekstr);
			jQuery('#cztab').append('<span>'+tab_week+'</span>')
		}
		/*��ʼ��*/
		jQuery(timeli).html(dateli[0]);
	})();
	function roll(page){
		ctrll.show();
		ctrlr.show();
		if(page<=0){
			ctrll.hide();
		}
		if(page>=num-1){
			ctrlr.hide();
		}


		jQuery(timeli).html(dateli[page]);
		var left=-page*rollwidth;
		rollobj.stop().animate({marginLeft:left},speed);
		$('#cztab').find('span').eq(page).addClass('h').siblings().removeClass('h');
	}
	
	this.scrollx=roll;
	this.setPage=function(n){
		page=n;
	};

	if(!notover){over(obj.find("li"))}else{obj.find("li").addClass("over");}
	function over(obj){
		obj.hover(function(){
				$(this).addClass("over");
			},function(){
				$(this).removeClass("over");
			});
	}
	
	//other
	(function() {
		$('#order_dc_table table tr:nth-child(3n)').css('height','51px'); //�б�ÿ��3������1px������
		//���hover
		var _w=$('#order_dc_table ul li').width(),
		_s=$('#order_dc_table ul li').size();
		_n=0;	
		
		$('#order_dc_info li').hover(function(){
			$(this).css('background-color','#F6F9FA');
			_i=$(this).index("#order_dc_info li");
			$('#order_dc_table table tr .time').css('visibility','hidden');
			$('#order_dc_table  table tr .time:eq('+(_i*3)+'),#order_dc_table  table tr .time:eq('+(_i*3+1)+'),#order_dc_table  table tr .time:eq('+(_i*3+2)+')').css('visibility','visible');
		}, function(){
			$(this).css('background-color','#FFF');	
			$('#order_dc_table table tr .time').css('visibility','hidden');
		});
		$('#order_dc_table table tr').hover(function(){_i=parseInt($(this).index()/3);$('#order_dc_info li:eq('+_i+')').mouseover();}
		, function(){_i=parseInt($(this).index()/3);$('#order_dc_info li:eq('+_i+')').mouseout();});
	})();
}

// ��ർ��
$(function() {
	$(".lmenu li").mouseover(function(){
		$(this).addClass("hover");
	});
	$(".lmenu li").mouseout(function(){
		$(this).removeClass("hover");
	});
	$(".bigclass").mouseover(function(){
		$(this).addClass("showcons");
	});
	$(".bigclass").mouseout(function(){
		$(this).removeClass("showcons");
	});
});
/*�Һŵ���*/
$(document).ready(function(e) {
	var yyghtclist={};
	jQuery("#order_dc_table .order_dc_link,#cz_dc_table .order_dc_link").bind("click",function(){
		var id=$(this).attr("for");
		if(id!=null){
			if(!yyghtclist[id]){
				yyghtclist[id]=new yyghtc($(this));
			}
			yyghtclist[id].show();
		}
	});
});
function yyghtc(obj){
	var _this=this;
	var id=obj.attr("for");
	this.tc=jQuery("#"+id);
	this.hide=hidetc;
	this.show=showtc;
	var off;
	if(this.tc!=null){
		off=obj.offset();
		this.tc.css({"left":"50%","top":off.top+37,"margin-left":"-206px"})
		this.tc.find(".yygh-close-tc").click(function(){
			hidetc();
		});
	}
	function showtc(){
		_this.tc.show();
	}
	function hidetc(){
		_this.tc.hide();
	}
}

/*�����ѡ����
$(function(){
	var cClose1=$("#cPick1 cite i");
	var cClose1b=$("#closeAll");	
	    cClose1.click(function(){
			$(this).parent().remove();
		});
        cClose1b.click(function(){
			$("#cPick1 cite").remove();	
			});
		
});*/

/*ѡ�������ʾ����*/
	$(document).ready(function(){
		var hdv=$('#r13_c .list13_2 ol');
	  	var zkminheight=30;//�趨һ�и߶�
		
		(function(){
			var i,imax=hdv.length,nowheight;
			for(i=0;i<imax;i++){
				nowheight=hdv.eq(i).height();
				hdv.eq(i).attr("heightx",nowheight);
				if(nowheight<=zkminheight){
					hdv.eq(i).find(".more_c,.more2_c").remove();
				}
			}
			$('.more_c,.more2_c').click(function(){
				if($(this).hasClass("open")){
					$(this).removeClass("open");
					$(this).css("background","url(http://image.39.net/daoyi/images2013/bg2.png) no-repeat 25px -87px").text("����");
					closezk($(this).siblings("ol"));
				}else{
					$(this).addClass("open");
					$(this).css("background","url(http://image.39.net/daoyi/images2013/bg2.png) no-repeat 25px -114px") .text("����");
					openzk($(this).siblings("ol"))
				}
			});
			hdv.height(zkminheight);
		})();
		
		function openzk(obj){
			var maxheight=obj.attr("heightx");
			obj.animate({height:maxheight},300);
		}
		function closezk(obj){
			obj.animate({height:zkminheight},300);
		}
		
	  
	});
	
/*��꾭��*/	
$(function(){
	$(".lihover > li").hover(function(){
		
		$(this).addClass("li_hover");
	},function(){
		$(this).removeClass("li_hover");
	});
});	


/*�б����һ����ʽ*/

$(function(){
	$("ul > li").last().addClass("last_c");

});	

	/*ҽԺ�����б���ʾ����*/	
$(function(){
  var cHomhide=$("#cHos ul > li .box2:not(:first)");
      cHomhide.hide();
  var cHosmore=$("#cHos .bnt_more");
      cHosmore.click(function(){
		  var cLi=$(this).parent().parent().siblings(".box2");
		  var cLi2=$(this).parent().parent().siblings(".box2").find(".mr_div");
		  if(cLi.is(':hidden')){
			  cLi.show();
			  cLi2.show();
			  $(this).css("background","url(http://image.39.net/daoyi/images2013/bg3.gif) no-repeat 76px -131px").text("��������Ƽ�ҽ��");
		  }else{
            cLi.hide();
            cLi2.hide();
	          $(this).css("background","url(http://image.39.net/daoyi/images2013/bg3.gif) no-repeat 76px -100px").text("չ������Ƽ�ҽ��");
		  };
	 });
  $("#cHos .bnt_more:first").css("background","url(http://image.39.net/daoyi/images2013/bg3.gif) no-repeat 76px -131px").text("��������Ƽ�ҽ��") ;
});	


// ����JavaScript Document
function upMove(obj){
	var dom = $(obj).next();	
    dom.find("ul").width(dom.find("li").size()*218);
	dom.animate({
	 scrollLeft:-654+dom.scrollLeft()	
	},500)
	if(dom.scrollLeft()>0){
		dom.next().find("img").attr("src","http://image.39.net/daoyi/images2013/icon_r_c.gif");
	}
	if(dom.scrollLeft()<654){
		dom.prev().find("img").attr("src","http://image.39.net/daoyi/images2013/icon_loff_c.gif");	
	}
}
function downMove(obj){
	var dom = $(obj).prev();
	dom.find("ul").width(dom.find("li").size()*218);
	dom.animate({
	 scrollLeft:654+dom.scrollLeft()	
	},500)
	if(dom.scrollLeft()>-654){
	dom.prev().find("img").attr("src","http://image.39.net/daoyi/images2013/icon_l_c.gif");	
	}
	if(dom.scrollLeft()>=(dom.find("li").size()*218)-1308){
	dom.next().find("img").attr("src","http://image.39.net/daoyi/images2013/icon_roff_c.gif");
	}
}
//�ж��Ƿ���Ҫ����
$(function(){
  for(i=0; i<=$(".mrd_pic").size(); i++){
	  if($(".mrd_pic").eq(i).find("li").size()>4){
		  $(".mrd_pic").eq(i).next().find("img").attr("src","http://image.39.net/daoyi/images2013/icon_r_c.gif");
	  }
  }
})

 

// �����̶�
$(function() {
	if($('#menu_holder').length>0){
		new fixedBar('#menu_holder','fixed-bar');
	}
	if($('.yylist #order_dc_tit').length>0){
		new fixedBar('#order_dc_tit','fixed-yishenglist',-90);
	}else if($('#order_dc_tit').length>0){
		new fixedBar('#order_dc_tit','fixed-yishenglist1');
	}
});
/*ͷ���̶���*/
function fixedBar(obj,classname,deta){
	var objid=jQuery(obj);
	var _f;
	var _deta=deta || 0;
	if(objid.length<=0)return;
	_f=objid.position().top+_deta;
	jQuery(window).bind("scroll",function(){
		var _g=jQuery(document).scrollTop();
		if(_f>=_g){
			objid.removeClass(classname);
		}else{
			objid.addClass(classname);
		}
	});
}
//�Ű���췽��
function Createdoctorlist(json,dialogfun,config){
    var arrangeMap = new Map();
    var partnerMap = new Map();
    var doorTypeArray = ["", "��ͨ����", "ר������", "��������", "ר������", "��������", "ҹ������", "����" ];
    var timeTypeArray = ["", "����","����","����"];
    var doctorArray=[];
    var maxweek=0;
    var minweek=100;
    var Nowday={time:new Date(),week:new Date().getDay(),mm:new Date().getTime()};//����Ӧ��Ϊ������ʱ��
	var startDay = config.startDay || (Nowday.week+8)%7;
   /*���������ģ�������޸�*/
    var trtpl='<tbody><tr><td><span class="time">����</span></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><span class="time">����</span></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><span class="time">����</span></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody>';//<span class="order_dc_full"href="">�Һ�����</span>
    var litpl='<li><table cellspacing="0"cellpadding="0"><colgroup><col width="36px"class="frist"><col width="47px"><col width="48px"><col width="47px"><col width="48px"><col width="47px"><col width="48px"><col width="47px"><col width="36px"></colgroup></table></li>';
	var litpl2='<li><table cellspacing="0"cellpadding="0"><colgroup><col width="62px" class="frist"><col width="79px"><col width="80px"><col width="79px"><col width="80px"><col width="79px"><col width="81px"><col width="79px"><col width="59px"></colgroup></table></li>';
	var style=config.style || 0;
 	$.each(json,function(i,v){//��ҽ������
		$.each(v,function(n,m){
			doctorArray.push(initdoctor(m));//���������ֵ����ҽ����Ϣ���飬�����Ⱥ���ã�initdoctor(m)-��setArrange(v)

		});
	});
	console.log(doctorArray)
	creatdoctor();
	//console.log(doctorArray)
	//console.log("maxweek=%f",maxweek)
	/*paiban*/
	bindroll();
	
    /*����ҽ���Ű�*/

    function creatdoctor(){//���ܱ������ݻ��li����
        if(minweek==100)minweek=0;
        var i,jQli,is=(minweek>0)?parseInt(minweek):0;
        //console.log(minweek);
        startTime=7*is;
        for(i=is; i<=maxweek; i++){//�����ܵõ�li,ÿ�η���һ������
			if(style == 0){
            	jQli=jQuery(litpl);
			}else if(style == 1){
				jQli=jQuery(litpl2);
			}
            jQli.find("table").append(buildTable(i));//��������

            $(config.input).append(jQli);
			if(typeof dialogfun === "function"){
				$('a[id^=register_]').unbind("click").bind('click', function(){
					dialogfun(this);
				});
			}
        }
    }
    function buildTable(week){//��ҽ������ɸѡ��Ӧ�ܵ�ҽ���������tr��ϳ�һ��li
        var jQdoc,docs="";
        var i,imax=doctorArray.length,temp,xA;
        for(i=0; i<imax; i++){//����ҽ���õ�����table
            jQdoc = jQuery(trtpl);
            xA=doctorArray[i];
            for(var n in xA.work){//������֯�õ�ҽ�������е�i��ҽ�����Ű���Ϣ

                temp=(xA.work)[n];
               
                if(temp.Time<4){
					 jQdoc.find("tr").eq(temp.Time-1).find("td").eq((temp.Week+7-startDay)%7+1).html('<span class="info">'+temp.DoorType+'</span>');
                }else{
                    for(j=0;j<3;j++){ 
						jQdoc.find("tr").eq(temp.Time-1).find("td").eq((temp.Week+7-startDay)%7+1).html('<span class="info">'+temp.DoorType+'</span>');
                    }
                }
            }

            for(var n in xA.arrange){//������֯�õ�ҽ�������е�i��ҽ���ĳ�����Ϣ

                temp=(xA.arrange)[n];
                //console.log(i);
                //console.log(temp.doctorId+","+temp.xweek);
                if(temp.xweek>=week && temp.xweek<week+1){//����Ӧ�����µ��Ű�

                	var interval = Date.parse(temp.date) - Date.parse(new Date());
                	
                    if(temp.Flag=="Y" && interval>=-1){//���ɹҺŵİ�ť
                        var id = "register_"+temp.doctorId+"_" +temp.Week+'_'+temp.date.getTime()+'_'+temp.Time;
                        var h = '<a  class="order_dc_link" id="'+id+'" week="'+temp.Week+'" day="'+temp.date.getTime()+'" time="'+temp.Time+'" di="'+temp.doctorId+'" href="javascript:void(0);" target="_self" for="doct1">ԤԼ�Һ�</a>';
                        jQdoc.find("tr").eq(temp.Time-1).find("td").eq((temp.Week+7-startDay)%7+1).html(h);
                    }else{
                        jQdoc.find("tr").eq(temp.Time-1).find("td").eq((temp.Week+7-startDay)%7+1).html('<span class="order_dc_full"href="">�Һ�����</span>');
                    }
                }
            }


            docs+=jQdoc.html();
        }
        return docs;

    }
    /*-------------

     ��ȡ�Ű���Ϣ

     -----------*/
    /*����ʱ��*/

    function initdoctor(json){
        var doctorday={work:[],arrange:[]};
        var jsonwork=(json)?json.DOCTOR_WORKTIMEs:null;
        if(json){
            if(jsonwork && jsonwork.DEFAULT){
                $.each(json.DOCTOR_WORKTIMEs.DEFAULT,function(i,v){//�����Ű��
                    doctorday.work.push(setWork(v));
                });
            }
            if(json.ARRANGE){
                $.each(json.ARRANGE,function(i,v){//��������
                    doctorday.arrange.push(setArrange(json.ID,v));
                    var key = json.ID+"_"+v.WEEK_ID+"_"+new Date(v.REGISTER_DATE).getTime()+"_"+v.TIME_ID;

                    //arrangeTimeArrayʱ��������±�0������������������ϵĿ�ԤԼ״̬
                    var arrangeTimeArray = arrangeMap.get(key);
                    if(arrangeTimeArray != null){
                        if(v.REGISTER_FLAG == REGISTER_FLAG_YES)
                            arrangeTimeArray[0] = REGISTER_FLAG_YES;
                        arrangeTimeArray.push(v);
                    }
                    else{
                        arrangeMap.put(key,[v.REGISTER_FLAG , v]);
                    }


                    //arrangeMap.put(key,v);
                });

            }
        }

        return doctorday;
    }
    /*����ҽ���Ű���Ϣ*/
    function setArrange(id,json){//��֯ҽ��������Ϣ������������Ϣ����
        var info={
            Time:Number(json.TIME_ID),
            Week:Number(json.WEEK_ID),
            DoorType:doorTypeArray[Number(json.PARTNER_ID)],
            date:new Date(json.REGISTER_DATE),
            Flag:json.REGISTER_FLAG,
            ARRANGE_TIME:json.ARRANGE_TIME
        };
        info.xweek=relaWeek(info.date);
        info.doctorId=id;
        //console.log(new Date(json.REGISTER_DATE));
        return info;

    }

    function setWork(json){//��֯ҽ���Ű���Ϣ
        var info={
            Time:Number(json.TIMESPAN),
            Week:Number(json.DAY),
            DoorType:doorTypeArray[Number(json.DOOR_TYPE)],
            date:new Date(json.MODIFY_TIME)
        }
        //info.xweek=relaWeek(info.date);
        //console.log(info)
        return info;
    }



    function relaWeek(time){//�����������ҳ��
        var xday1=(time.getTime()-Nowday.time.valueOf()+Nowday.time.getMilliseconds())/1000;
        xday1=(xday1+Nowday.time.getSeconds())/60;
        xday1=(xday1+Nowday.time.getMinutes())/60;
        xday1=(xday1+Nowday.time.getHours())/24;
        xday=(xday1+Nowday.time.getDay()+1)/7;
		/*�����������������*/
        //console.log(xday);
        if(xday>maxweek){
            maxweek=xday;
        }
        if(xday<minweek){
            minweek=xday;
        }
        return xday;
    }
    /*-------------

     ��ȡ�Ű���Ϣ END

     -----------*/


}

$(function () {
    $(".yygh-green p").find("a").click(function () {
        $(this).siblings("span").toggle();
    });
});