var Template = new function() {
	var defaultTemplate = 1;

	this.setPartnerTemplate = function() {
		if (self == top) {
			return;
		}

		// ��������
		$(".bottominfo").attr("style", "display: none"); // β��
		$("a").attr("target", "_self"); // Ĭ�ϳ�����
		$("a[name='newWin']").attr("target", "_blank"); // �´���

		// ������ԤԼ
		$("a[id^='buy_card_login']").attr("target", "_blank"); // ����
		$("#register_acc").attr("target", "_blank"); // ע���û�
		$("#find_pwd").attr("target", "_blank"); // ��������
		$("#glance_over").attr("target", "_blank"); // ����

		// ��������
		$("form[name='queryForm']").attr("target", "_self"); // ����form

		// ҽԺͼ��
		$("#formComment1 a").attr("target", "_blank");
		$(".l_bigimg a").attr("target", "_blank");
		$(".r_smallimg a").attr("target", "_blank");
		$("#viewOrig").attr("target", "_blank");
		$(".nph_icon_comment").attr("target", "_blank");
		
		// ��ҳ  �㼲����ԭ�����д�content.vm�д���
		// ҽ�����ۻظ�  ��ҽ����ҳ������ҳ����ҽ���ظ�ʱ�¿�����
		
        $("#menu7").attr("target", "_self");
        $("#menu8").attr("target", "_self");
	}

	this.setPartnerHeader = function() {
		if (self == top) {
			return;
		}
		$(".dy_topbar").attr("style", "display: none"); //ͷ��
		$(".jy_topbar").attr("style", "display: none"); //ͷ��������ʽ
		$(".tonglan").attr("style", "display: none"); //���λ
	}
}
var topLinkLength = $("#topLink").length;
if (topLinkLength > 0){
	//var topLinkHtml = "";
	//topLinkHtml += "<span class='home'><a href='http://www.39.net/' title='39��������ҳ' target='_blank'>39��������ҳ</a></span>";
	//topLinkHtml +="<span><a href='http://ask.39.net/' title='39��ҽ��' target='_blank'>39��ҽ��</a></span>";
	//topLinkHtml +="<span><a href='http://myzx.39.net/' title='��ҽ����' target='_blank'>��ҽ����</a></span>";
	//topLinkHtml +="<span><a href='http://yyk.39.net/' title='��ҽ����' target='_blank'>��ҽ����</a></span>";
	//topLinkHtml +="<span><a href='http://ypk.39.net/' title='ҩƷͨ' target='_blank'>ҩƷͨ</a></span>";
	//topLinkHtml +="<span><a href='http://jbk.39.net/' title='�����ٿ�' target='_blank'>�����ٿ�</a></span>";
	//topLinkHtml +="<span><a href='http://news.39.net/' title='����' target='_blank'>����</a></span>";
	//topLinkHtml +="<span><a href='http://zl.39.net/' title='����' target='_blank'>����</a></span>";
	//topLinkHtml +="<span><a href='http://drug.39.net/' title='ҩƷ' target='_blank'>ҩƷ</a></span>";
	//topLinkHtml +="<span><a href='http://yyk.39.net/hospitals/c_guahao/' title='ԤԼ�Һ�' target='_blank'>ԤԼ�Һ�</a></span>";
	//$("#topLink").html(topLinkHtml);
	$("#topLink").append("<span class='home'><a href='http://www.39.net/' title='39��������ҳ' target='_blank'>39��������ҳ</a></span>");
	$("#topLink").append("<span><a href='http://ask.39.net/' title='39��ҽ��' target='_blank'>39��ҽ��</a></span>");
	$("#topLink").append("<span><a href='http://myzx.39.net/' title='��ҽ����' target='_blank'>��ҽ����</a></span>");
	$("#topLink").append("<span><a href='http://yyk.39.net/' title='��ҽ����' target='_blank'>��ҽ����</a></span>");
	$("#topLink").append("<span><a href='http://ypk.39.net/' title='ҩƷͨ' target='_blank'>ҩƷͨ</a></span>");
	$("#topLink").append("<span><a href='http://jbk.39.net/' title='�����ٿ�' target='_blank'>�����ٿ�</a></span>");
	$("#topLink").append("<span><a href='http://news.39.net/' title='��Ѷ' target='_blank'>��Ѷ</a></span>");
	$("#topLink").append("<span><a href='http://zl.39.net/' title='����' target='_blank'>����</a></span>");
	$("#topLink").append("<span><a href='http://drug.39.net/' title='ҩƷ' target='_blank'>ҩƷ</a></span>");
	$("#topLink").append("<span><a href='http://yyk.39.net/hospitals/c_guahao/' title='ԤԼ�Һ�' target='_blank'>ԤԼ�Һ�</a></span>");
	$("#topLink").append("<span><a href='http://yyk.39.net/yydq/' title='ҽԺ��ȫ' target='_blank'>ҽԺ��ȫ</a></span>");
	/*$("#topLink").append("<span class='top-qcode'><a href='http://m.39.net/jyzs/' target='_blank' title='�ֻ��Һ�'>�ֻ��Һ�</a><em><img src='http://image.39.net/daoyi/images/doc/ask_qcode2.gif'><i>APP�ҺŸ���<br>79%��������APP</i></em></span>");
	$("#topLink").append("<script>$('.top-qcode').mouseover(function(){$(this).find('em').show();}).mouseleave(function(){$(this).find('em').hide();});;</script>");*/
}
if (!window.jQuery)
    document.write("<script language='javascript' src='http://hits.39.net/Scripts/jquery-1.4.1.min.js'><\/script>");

(function($) {  //��������Ч����JS
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