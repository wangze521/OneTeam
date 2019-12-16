/*gotoTop*/
(function($){
	var isIE6=($.browser.msie && ($.browser.version<7))?true:false;
	var $goTop=jQuery("#gotoTop");
	var $artRight= jQuery("#art_right");
	var $artBox=jQuery(".bottominfo");
	var rollT=0;
	function getPosition(){
		var rightToolbox=jQuery(".rightToolbox");
		rightToolbox.addClass("rightToolbox_hold");
	}
	$goTop.click(function(){
		var _top=$(window).scrollTop();
		var gotoTimer=window.setTimeout(function(){
			_top-=100;
			$(window).scrollTop(_top);
			if(_top>10){
				window.setTimeout(arguments.callee,5);
			}else{
				$(window).scrollTop(0);
				window.clearTimeout(gotoTimer);
				gotoTimer=null;
			}
		},1);
	});
	$goTop.css("display","none");
	/*滚动页面*/
	$(window).bind("scroll",function(){
		rollT=$(window).scrollTop();
		if(rollT<10){
			$goTop.css({"display":"none"});
		}else{
			$goTop.css({"display":"block"});
		}
	});
	/*加载完成以后*/
	$(document).ready(function(e) {
		getPosition();
	});
	
	var flTimer=[];
	$(".rEwm").mouseover(function(){
		if(!$(this).hasClass("rEwm_h")){
			$(this).addClass("rEwm_h"); $(this).find(".rEwm_box").stop(true,true).fadeIn(150);
		}
			window.clearTimeout(flTimer[1],flTimer[11]);
	}).mouseleave(function(){
		if($(this).hasClass("rEwm_h")){
			var _this=this;
			flTimer[1]=window.setTimeout(function(){
				$(_this).find(".rEwm_box").stop(true,true).fadeOut(150);
			},0);
			flTimer[11]=window.setTimeout(function(){
				$(_this).removeClass("rEwm_h");
			},0);
			return false;
		}
	});

})(jQuery);

function goto(art1){
	var _top=0;
	if(typeof art1 =="string"){
		var art=jQuery("a[name="+name+"]");
		if(art.length>0)
			_top=art.offset().top;
	}else if(typeof art1 == "number"){
		_top=art1;
	}
	(function to(num,speed){
		var top =$(window).scrollTop();
		var deta =num-top;
		var v=(deta>0)?100:-100;
		var _timer = window.setTimeout(function(){
			if(Math.abs(deta)<100){
				$(window).scrollTop(num);
				window.clearTimeout(_timer);
				_timer=null;
			}else{
				top=parseInt(top+v);
				$(window).scrollTop(top);
				deta-=v;
				_timer=window.setTimeout(arguments.callee,5);
			}
		},1);
	})(_top,50);
}
$(function(){
	jQuery("#gotorelaRead").click(function(){
		goto(jQuery("[name=relaRead]").offset().top);
	});
});
