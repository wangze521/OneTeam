/**
 * Created by Limbo on 2014/12/15.
 */
$(function() {
    
    // form
    $("form .tit").focus(function(){
        if($(this).val() == this.defaultValue){$(this).val("").css("color","#333");}
    }).blur(function(){
        if($(this).val() == ""){$(this).val(this.defaultValue).css("color","#999");}
    });
    
    // yyk_header_location
    if($("#yyk_header_location").length > 0) {
        $("#yyk_header_location").find(".xuan").click(function () {
            $("#yyk_header_location").find(".city").fadeIn(300);
        })
        $(document).bind("click",function(e){
            var target  = $(e.target);
            /*.closest()沿 DOM 树向上遍历，直到找到已应用选择器的一个匹配为止，返回包含零个或一个元素的 jQuery 对象。*/
            if(target.closest(".city,#yyk_header_location").length == 0){
                $(".city").hide();
            };
            e.stopPropagation();
        })
    }

    // yyk_header_location
    
    if($("#yyk_header_serach").length > 0) {
        $("#yyk_header_serach .serach-tab").find("a").click(function () {
            $(this).addClass("now").siblings("a").removeClass("now");
        })
       /* $("#yyk_header_serach").find(".tit").focus(function () {
            $("#yyk_header_serach").find(".serach-tips1").fadeIn(300);
        }).blur(function () {
            $("#yyk_header_serach").find(".serach-tips1").fadeOut(300);
        })*/
    }

    // yyk_serach_result
    if($("#yyk_serach_result").length > 0) {
        $("#yyk_serach_result_ks").find(".qb-ks-show").click(function () {
			 var isRight = $(this).offset().left < $(window).width() * 0.5 ? 1 : 0;
            $("#yyk_serach_result_ks").addClass("qb-hight-index").find(".qb-ks").toggleClass('qb-ks-right', isRight ? !0 : !1).fadeIn(300);
            ks_box_li_hover();
            $(document).bind("click",function(e){
                var target  = $(e.target);
                if(target.closest(".qb-ks,#yyk_serach_result_ks").length == 0){
                    $(".qb-ks").hide();
                    $("#yyk_serach_result_ks").removeClass("qb-hight-index");
                };
                e.stopPropagation();
            })
        })

        $("#yyk_serach_result_ks .qb-ks-box div > p").hide();
        var $ks_li = $("#yyk_serach_result_ks .qb-ks-tab li");
        $ks_li.click(function(){
            $(this).addClass("now").siblings().removeClass("now");
            var ks_li_index =  $ks_li.index(this);
            $("#yyk_serach_result_ks .qb-ks-box > div").eq(ks_li_index).show().siblings("div").hide();
            $("#yyk_serach_result_ks .qb-ks-box div > p").hide();
            $("#yyk_serach_result_ks .qb-ks-tips").show();
        })

        function ks_box_li_hover() {
            var $ks_box_li = $("#yyk_serach_result_ks .qb-ks-box div ul").find("li");
            $ks_box_li.hover(function(){
                $("#yyk_serach_result_ks").find(".qb-ks-tips").hide();
                var ks_box_li_index =  $ks_box_li.index(this);
                $("#yyk_serach_result_ks .qb-ks-box div > p").eq(ks_box_li_index).show().siblings("p").hide();
            })
            $("#yyk_serach_result_ks .qb-ks-box div").mouseleave(function () {
                $("#yyk_serach_result_ks .qb-ks-box div > p").hide();
                $("#yyk_serach_result_ks .qb-ks-tips").show();
            })
        }

        $("#yyk_serach_result_jb").find(".qb-jb-show").click(function () {
			 var isRight = $(this).offset().left < $(window).width() * 0.5 ? 1 : 0;
            $("#yyk_serach_result_jb").addClass("qb-hight-index").find(".qb-jb").toggleClass('qb-jb-right', isRight ? !0 : !1).fadeIn(300);
            $(document).bind("click",function(e){
                var target  = $(e.target);
                if(target.closest(".qb-jb,#yyk_serach_result_jb").length == 0){
                    $(".qb-jb").hide();
                    $("#yyk_serach_result_jb").removeClass("qb-hight-index");
                };
                e.stopPropagation();
            })
        })

        var $jb_li = $("#yyk_serach_result_jb .qb-jb-tab li");
        $jb_li.click(function(){
            $(this).addClass("now").siblings().removeClass("now");
            var jb_li_index =  $jb_li.index(this);
            $("#yyk_serach_result_jb .qb-jb-box > div").eq(jb_li_index).show().siblings("div").hide();
        })
    }

    // yyk_serach_left_xuan
    if($("#yyk_serach_left_xuan").length > 0) {
        $("#yyk_serach_left_xuan .xs").find(".xs-a").click(function () {
            $(this).siblings(".xs-ul").fadeIn(300);
        })
        $("#yyk_serach_left_xuan .xs").mouseleave(function () {
            $(this).find(".xs-ul").fadeOut(300);
        })
        $("#yyk_serach_left_xuan .xs-ul").find("li").click(function () {
            var xs_li_text = $(this).find("a").text();
            $(this).parent(".xs-ul").siblings(".xs-a").find("i").text(xs_li_text);
        })
    }

    // yyk_serach_map
    if($("#yyk_serach_map").length > 0) {
        var map_i = 1;
        $("#yyk_serach_map .serach-right-box .serach-right-titles").find(".more").click(function () {
            if(map_i == 1) {
                $(this).prop("title","收起大图").text("收起大图");
                $("#yyk_serach_map").addClass("serach-right-box-map-big");
                $(".serach-left").addClass("serach-left-map-show");
                map_i = 2;
            }else{
                $(this).prop("title","查看大图").text("查看大图");
                $("#yyk_serach_map").removeClass("serach-right-box-map-big");
                $(".serach-left").removeClass("serach-left-map-show");
                map_i = 1;
            }
        })
    }

	setTimeout(function(){
		$('.searchlist-tip').fadeOut('slow');
	}, 3000);
});

$(function(){
    
    $('.tab-box .tab-tit span').mouseover(function(event) {
        $(this).addClass('now').siblings().removeClass('now');
        $(this).parents('.tab-box').find('.tab-con').hide().eq($(this).index()).show();
    });
    
})