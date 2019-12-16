var Template = new function() {
	var defaultTemplate = 1;

	this.setPartnerTemplate = function() {
		if (self == top) {
			return;
		}

		// 公共属性
		$(".bottominfo").attr("style", "display: none"); // 尾部
		$("a").attr("target", "_self"); // 默认超链接
		$("a[name='newWin']").attr("target", "_blank"); // 新窗口

		// 购卡和预约
		$("a[id^='buy_card_login']").attr("target", "_blank"); // 购卡
		$("#register_acc").attr("target", "_blank"); // 注册用户
		$("#find_pwd").attr("target", "_blank"); // 忘记密码
		$("#glance_over").attr("target", "_blank"); // 购卡

		// 搜索功能
		$("form[name='queryForm']").attr("target", "_self"); // 搜索form

		// 医院图集
		$("#formComment1 a").attr("target", "_blank");
		$(".l_bigimg a").attr("target", "_blank");
		$(".r_smallimg a").attr("target", "_blank");
		$("#viewOrig").attr("target", "_blank");
		$(".nph_icon_comment").attr("target", "_blank");
		
		// 首页  点疾病在原窗口中打开content.vm中处理
		// 医生评论回复  在医生首页和评论页处理，医生回复时新开窗口
		
        $("#menu7").attr("target", "_self");
        $("#menu8").attr("target", "_self");
	}

	this.setPartnerHeader = function() {
		if (self == top) {
			return;
		}
		$(".dy_topbar").attr("style", "display: none"); //头部
		$(".jy_topbar").attr("style", "display: none"); //头部，新样式
		$(".tonglan").attr("style", "display: none"); //广告位
	}
}
var topLinkLength = $("#topLink").length;
if (topLinkLength > 0){
	//var topLinkHtml = "";
	//topLinkHtml += "<span class='home'><a href='http://www.39.net/' title='39健康网首页' target='_blank'>39健康网首页</a></span>";
	//topLinkHtml +="<span><a href='http://ask.39.net/' title='39问医生' target='_blank'>39问医生</a></span>";
	//topLinkHtml +="<span><a href='http://myzx.39.net/' title='名医在线' target='_blank'>名医在线</a></span>";
	//topLinkHtml +="<span><a href='http://yyk.39.net/' title='就医助手' target='_blank'>就医助手</a></span>";
	//topLinkHtml +="<span><a href='http://ypk.39.net/' title='药品通' target='_blank'>药品通</a></span>";
	//topLinkHtml +="<span><a href='http://jbk.39.net/' title='疾病百科' target='_blank'>疾病百科</a></span>";
	//topLinkHtml +="<span><a href='http://news.39.net/' title='新闻' target='_blank'>新闻</a></span>";
	//topLinkHtml +="<span><a href='http://zl.39.net/' title='诊疗' target='_blank'>诊疗</a></span>";
	//topLinkHtml +="<span><a href='http://drug.39.net/' title='药品' target='_blank'>药品</a></span>";
	//topLinkHtml +="<span><a href='http://yyk.39.net/hospitals/c_guahao/' title='预约挂号' target='_blank'>预约挂号</a></span>";
	//$("#topLink").html(topLinkHtml);
	$("#topLink").append("<span class='home'><a href='http://www.39.net/' title='39健康网首页' target='_blank'>39健康网首页</a></span>");
	$("#topLink").append("<span><a href='http://ask.39.net/' title='39问医生' target='_blank'>39问医生</a></span>");
	$("#topLink").append("<span><a href='http://myzx.39.net/' title='名医在线' target='_blank'>名医在线</a></span>");
	$("#topLink").append("<span><a href='http://yyk.39.net/' title='就医助手' target='_blank'>就医助手</a></span>");
	$("#topLink").append("<span><a href='http://ypk.39.net/' title='药品通' target='_blank'>药品通</a></span>");
	$("#topLink").append("<span><a href='http://jbk.39.net/' title='疾病百科' target='_blank'>疾病百科</a></span>");
	$("#topLink").append("<span><a href='http://news.39.net/' title='资讯' target='_blank'>资讯</a></span>");
	$("#topLink").append("<span><a href='http://zl.39.net/' title='诊疗' target='_blank'>诊疗</a></span>");
	$("#topLink").append("<span><a href='http://drug.39.net/' title='药品' target='_blank'>药品</a></span>");
	$("#topLink").append("<span><a href='http://yyk.39.net/hospitals/c_guahao/' title='预约挂号' target='_blank'>预约挂号</a></span>");
	$("#topLink").append("<span><a href='http://yyk.39.net/yydq/' title='医院大全' target='_blank'>医院大全</a></span>");
	/*$("#topLink").append("<span class='top-qcode'><a href='http://m.39.net/jyzs/' target='_blank' title='手机挂号'>手机挂号</a><em><img src='http://image.39.net/daoyi/images/doc/ask_qcode2.gif'><i>APP挂号更快<br>79%的人下载APP</i></em></span>");
	$("#topLink").append("<script>$('.top-qcode').mouseover(function(){$(this).find('em').show();}).mouseleave(function(){$(this).find('em').hide();});;</script>");*/
}
if (!window.jQuery)
    document.write("<script language='javascript' src='http://hits.39.net/Scripts/jquery-1.4.1.min.js'><\/script>");

(function($) {  //控制下拉效果的JS
    var navTimer=[];
    $(".art_navmore").mouseover(function(){
        if(!$(this).hasClass("hover")){
            $(this).addClass("hover"); $(this).find("#drop_nav").stop(true,true).slideDown(230);
        }
        window.clearTimeout(navTimer[0],navTimer[00]);
    }).mouseleave(function(){
                if($(this).hasClass("hover")){
                    var _this=this;
                    navTimer[0]=window.setTimeout(function(){
                        $(_this).find("#drop_nav").stop(true,true).slideUp(150);
                    },300);
                    navTimer[00]=window.setTimeout(function(){
                        $(_this).removeClass("hover");
                    },450);
                    return false;
                }
            });
    $("#userinfo_box").find("em,.UIbox").mouseover(function(){
        if(!$("#userinfo_box").hasClass("h")){
            $("#userinfo_box").addClass("h"); $("#userinfo_box").find(".UIbox").stop(true,true).slideDown(230);
        }
        window.clearTimeout(navTimer[2], navTimer[22]);
    });
    $("#userinfo_box").mouseleave(function(){
        if($(this).hasClass("h")){
            var _this=this;
            navTimer[2]=window.setTimeout(function(){
                $(_this).find(".UIbox").stop(true,true).slideUp(150);
            },300);
            navTimer[22]=window.setTimeout(function(){
                $(_this).removeClass("h");
            },450);
            return false;
        }
    });

    var userinfoWidth=$(".n_userinfo em a").width();
    if(userinfoWidth - 100 > 0){
        $(".n_userinfo em a").css("width","100px");
    }
    //top tool end
})(jQuery);

$(document).ready(function() {
	Template.setPartnerTemplate();
	$("#fc_ewem .close").click(function(){
		$("#fc_ewem").hide();
	});
})