/**
 * Created by Limbo on 2014/11/6.
 */
$(function() {

    // fixedBar
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
    if($('#keshi_menu_holder').length>0){
        new fixedBar('#keshi_menu_holder','keshi-menu-fixed');
    }

    // form
    $("form .tit").focus(function(){
        if($(this).val() == this.defaultValue){$(this).val("").css("color","#333");}
    }).blur(function(){
        if($(this).val() == ""){$(this).val(this.defaultValue).css("color","#999");}
    });

    // home_focus
    if($("#keshi_focus").length > 0) {
        (function(d,D,v){d.fn.responsiveSlides=function(h){var b=d.extend({auto:!0,speed:1E3,timeout:7E3,pager:!1,nav:!1,random:!1,pause:!1,pauseControls:!1,prevText:"Previous",nextText:"Next",maxwidth:"",controls:"",namespace:"rslides",before:function(){},after:function(){}},h);return this.each(function(){v++;var e=d(this),n,p,i,k,l,m=0,f=e.children(),w=f.size(),q=parseFloat(b.speed),x=parseFloat(b.timeout),r=parseFloat(b.maxwidth),c=b.namespace,g=c+v,y=c+"_nav "+g+"_nav",s=c+"_here",j=g+"_on",z=g+"_s",o=d("<ul class='"+c+"_tabs "+g+"_tabs' />"),A={},E={},t=function(a){b.before();f.stop().fadeOut(q,function(){d(this).removeClass(j).css(E)}).eq(a).fadeIn(q,function(){d(this).addClass(j).css(A);b.after();m=a})};b.random&&(f.sort(function(){return Math.round(Math.random())-0.5}),e.empty().append(f));f.each(function(a){this.id=z+a});e.addClass(c+" "+g);h&&h.maxwidth&&e.css("max-width",r);f.hide().eq(0).addClass(j).css(A).show();if(1<f.size()){if(x<q+100)return;if(b.pager){var u=[];f.each(function(a){a=a+1;u=u+("<li><a href='#' class='"+z+a+"'>"+a+"</a></li>")});o.append(u);l=o.find("a");h.controls?d(b.controls).append(o):e.after(o);n=function(a){l.closest("li").removeClass(s).eq(a).addClass(s)}}b.auto&&(p=function(){k=setInterval(function(){var a=m+1<w?m+1:0;b.pager&&n(a);t(a)},x)},p());i=function(){if(b.auto){clearInterval(k);p()}};b.pause&&e.hover(function(){clearInterval(k)},function(){i()});b.pager&&(l.bind("click",function(a){a.preventDefault();b.pauseControls||i();a=l.index(this);if(!(m===a||d("."+j+":animated").length)){n(a);t(a)}}).eq(0).closest("li").addClass(s),b.pauseControls&&l.hover(function(){clearInterval(k)},function(){i()}));if(b.nav){c="<a href='#' class='"+y+" prev'>"+b.prevText+"</a><a href='#' class='"+y+" next'>"+b.nextText+"</a>";h.controls?d(b.controls).append(c):e.after(c);var c=d("."+g+"_nav"),B=d("."+g+"_nav.prev");c.bind("click",function(a){a.preventDefault();if(!d("."+j+":animated").length){var c=f.index(d("."+j)),a=c-1,c=c+1<w?m+1:0;t(d(this)[0]===B[0]?a:c);b.pager&&n(d(this)[0]===B[0]?a:c);b.pauseControls||i()}});b.pauseControls&&c.hover(function(){clearInterval(k)},function(){i()})}}if("undefined"===typeof document.body.style.maxWidth&&h.maxwidth){var C=function(){e.css("width","100%");e.width()>r&&e.css("width",r)};C();d(D).bind("resize",function(){C()})}})}})(jQuery,this,0);
        $("#keshi_focus").responsiveSlides({
            auto: true,
            pager: true,
            speed: 800
        });
    }

    // news_prolist
    if($("#news_prolist").length > 0) {
        var page = 1;
        var i = 4;
        var len = $("#news_prolist .news-prolist-area ul li").length;
        var page_count = Math.ceil(len / i);
        var none_unit_width = 656;
        var $parent = $("#news_prolist .news-prolist-area ul");
        if(len > 4) {
            $("#news_prolist").append('<a href="javascript:void(0)" target="_self" class="gos go-left" id="news_prolist_left"></a><a href="javascript:void(0)" target="_self" class="gos go-right" id="news_prolist_right"></a>');
            $("#news_prolist_right").click(function(){
                if( !$parent.is(":animated") ){
                    if( page == page_count ){
                        $parent.animate({ left : 0}, 500);
                        page = 1;
                    }else{
                        $parent.animate({ left : '-='+none_unit_width}, 500);
                        page++;
                    }
                }
            });
            $("#news_prolist_left").click(function(){
                if( !$parent.is(":animated") ){
                    if( page == 1 ){
                        $parent.animate({ left : '-='+none_unit_width*(page_count-1)}, 500);
                        page = page_count;
                    }else{
                        $parent.animate({ left : '+='+none_unit_width }, 500);
                        page--;
                    }
                }
            });
        }else{
            $("#news_prolist .news-prolist-area").css({"left":"0","width":"100%"});
            $("#news_prolist .news-prolist-area ul li").css("margin-right","43px");
        }
    }

    // environment_prolist
    if($("#environment_prolist").length > 0) {
        var page = 1;
        var i = 1;
        var len = $("#environment_prolist .environment-prolist-area ul li").length;
        var page_count = Math.ceil(len / i);
        var none_unit_width = 690;
        var $parent = $("#environment_prolist .environment-prolist-area ul");
        if(len > 1) {
            $("#environment_prolist").append('<a href="javascript:void(0)" target="_self" class="gos go-left" id="environment_prolist_left"></a><a href="javascript:void(0)" target="_self" class="gos go-right" id="environment_prolist_right"></a>');
            $("#environment_prolist_right").click(function(){
                if( !$parent.is(":animated") ){
                    if( page == page_count ){
                        $parent.animate({ left : 0}, 300);
                        page = 1;
                    }else{
                        $parent.animate({ left : '-='+none_unit_width}, 300);
                        page++;
                    }
                }
            });
            $("#environment_prolist_left").click(function(){
                if( !$parent.is(":animated") ){
                    if( page == 1 ){
                        $parent.animate({ left : '-='+none_unit_width*(page_count-1)}, 300);
                        page = page_count;
                    }else{
                        $parent.animate({ left : '+='+none_unit_width }, 300);
                        page--;
                    }
                }
            });
        }else{
            $("#news_prolist .news-prolist-area").css({"left":"0","width":"100%"});
            $("#news_prolist .news-prolist-area ul li").css("margin-right","43px");
        }
    }

    // keshi_left_pai
    if($("#keshi_left_pai").length > 0) {
        var $pai_span = $("#keshi_left_pai .pai-td ul li").find("span:eq(4)");
        if($pai_span.length > 0) {
            var pai_i = 0;
            $("#keshi_left_pai .pai-td ul li").find("span:gt(3)").hide();
            $("#keshi_left_pai").append('<div class="pai-more"><a href="javascript:void(0)" target="_self" title="展开">展开</a></div>');
            $(".pai-more").find("a").click(function() {
                if(pai_i == 0) {
                    $("#keshi_left_pai .pai-td ul li").find("span:gt(3)").show();
                    $(this).prop("title","收起").text("收起");
                    pai_i = 1;
                }else{
                    $("#keshi_left_pai .pai-td ul li").find("span:gt(3)").hide();
                    $(this).prop("title","展开").text("展开");
                    pai_i = 0;
                }
            });
        }
    }

    // keshi_left_summary
    if($("#keshi_left_summary").length > 0) {
        var sum_text_height = $("#keshi_left_summary .sum-text").height();
        if(sum_text_height > 150) {
            var sumkey = 1;
            $("#keshi_left_summary .sum-text").css("height","146px").after('<div class="sum-text-show"><span>...</span><a href="javascript:void(0);" target="_self" title="展开">展开</a></div>');
            $("#keshi_left_summary .sum-text-show").find("a").click(function() {
                if(sumkey == 1) {
                    $("#keshi_left_summary .sum-text").css("height","auto");
                    $(this).text("收起").prop("title","收起").siblings("span").hide();
                    sumkey = 0;
                }else{
                    $("#keshi_left_summary .sum-text").css("height","146px");
                    $(this).text("展开").prop("title","展开").siblings("span").show();
                    sumkey = 1;
                }
            });
        }
    }

    // keshi_left_summary
    if($("#trend_if_no_img").length > 0) {
        $("#trend_if_no_img li").find("img").parents("li").addClass("has_img");
        $("#trend_if_no_img li img[src='']").parents("li").removeClass("has_img");
    }
	
	
	//hos
	$('.hos-ask-tab a').click(function(){
		$(this).addClass('now').siblings().removeClass('now');
		$('.hos-ask-list ul').hide().eq($(this).index()).show();
	});
	$('.hos-rbox-fdpage').each(function(index, element) {
		var now = 0;
		var len = $(this).find('i').size();
		$(this).find('b').click(function(){
			now = (now + ($(this).is('.prev') ? -1 : 1) + len) % len;
			$(this).parents('.hos-rbox-fdpage').siblings('.hos-rbox-fdlist').find('li').hide().eq(now).show();
			$(this).parents('.hos-rbox-fdpage').find('i[data-index]').removeClass('now').eq(now).addClass('now');
		});
		$(this).find('i').click(function(){
			now = Number($(this).data('index'));
			$(this).parents('.hos-rbox-fdpage').siblings('.hos-rbox-fdlist').find('li').hide().eq(now).show();
			$(this).parents('.hos-rbox-fdpage').find('i[data-index]').removeClass('now').eq(now).addClass('now');
		});
	});
	
	//order
	$('body').on('click', '.order-box-time li span, .order-box-securing li span', function(){
		if($(this).is('.selected, .disabled')){
			return false;
		}else if($(this).is('.add')){
			orderAddBox.Show();
			return false;
		};
		$(this).addClass('selected').parent().siblings().find('span').removeClass('selected');
	}).on('mouseover', '.order-box-time li span, .order-box-securing li span', function(){
		$(this).find('a').show();
	}).on('mouseleave', '.order-box-time li span, .order-box-securing li span', function(){
		$(this).find('a').hide();
	}).on('click', '.order-pay-way .btn a', function(){
		$('.order-pay-way .btn a').toggle();
		$('.order-pay-way ul').toggleClass('show');
	});


	// $('.order-box-time li span, .order-box-securing li span').click(function(){
	// 	if($(this).is('.selected, .disabled')){
	// 		return false;
	// 	}else if($(this).is('.add')){
	// 		orderAddBox.Show();
	// 		return false;
	// 	};
	// 	$(this).addClass('selected').parent().siblings().find('span').removeClass('selected');
	// }).mouseover(function(){
	// 	$(this).find('a').show();
	// }).mouseleave(function(){
	// 	$(this).find('a').hide();
	// });
	// $('.order-pay-way .btn a').click(function(){
	// 	$('.order-pay-way .btn a').toggle();
	// 	$('.order-pay-way ul').toggleClass('show');
	// });
	
	//doc
	$('.search-type').mouseleave(function(){
		$('.search-type').removeClass('show').find('dd').stop().slideUp(150);
	}).find('dt').click(function(event){
		$('.search-type').addClass('show').find('dd').stop().slideDown(150);
	}).siblings('dd').find('a').click(function(event){
		$('.search-type').removeClass('show').find('dd').stop().slideUp(150);
		$('.search-type dt b').html($(this).text());
		event.stopPropagation();
	});
	$('.doc-cm-filter .tag ul').each(function(i, v) {
		if($(this).height() <= 35){
			$(this).parents('.doc-cm-filter').find('.btn').hide();
		}else{
			$(this).parents('.doc-cm-filter').find('.btn a').click(function(){
				$(this).siblings().andSelf().toggle();
				$(this).parents('.doc-cm-filter').find('.tag').toggleClass('tag-hide');
			});
		};
	});
	$('#doc-rbox-ass-type .tag li').click(function(){
		$('#ass-inp').val($(this).text());
	});
	$('#ass-check').change(function(){
		$('#ass-inp').attr('disabled', $(this).is(':checked'));
	});
	$('.doc-rbox-ass .item .star').each(function(i, v) {
		var data = $(this).data('star');
		var star = $(this).find('li');
		var box = $(this).siblings('.ass');
		star.mouseover(function(e) {
			var k = $(this).index();
			star.removeClass('select').filter(':lt(' + (k + 1) + ')').addClass('select');
			star.eq(k).addClass('select-last');
		}).mouseleave(function(e) {
			star.removeClass('select select-last').filter(':lt(' + data + ')').addClass('select');
			console.log(data)
		}).click(function(e) {
			var k = $(this).index();
			data = k + 1;
			star.removeClass('select').filter(':lt(' + (k + 1) + ')').addClass('select');
			box.html($(this).find('em').text());
		});
	});
	$('.doc-intro-table').on('mouseover', '.td-line li', function(){
		$(this).addClass('td-stop-hover');
	}).on('mouseleave', '.td-line li', function(){
		$(this).removeClass('td-stop-hover');
	}).on('mouseover', '.th-tab span', function(){
		if($(this).is('.now')){
			return false;
		};
		$(this).addClass('now').siblings().removeClass('now');
		$('.doc-intro-table .td-box').hide().eq($(this).index()).show();
        $('.doc-intro-table .th-right span').hide().eq($(this).index()).show();
	});

	$('.doc-intro-table .td-box').each(function(index, element) {
		var now = 0;
		var _ = $(this);
		var size = _.find('.item').size();
		if(size > 1){
			_.find('.td-box-right a').removeClass('dis');
			_.find('.td-box-left a, .td-box-right a').click(function(){
				if($(this).is('.dis')){
					return false;
				};
				now = now + ($(this).parent().is('.td-box-left') ? -1 : 1);
				_.find('.item').hide().eq(now).show();
				_.find('.td-box-left a, .td-box-right a').removeClass('dis');
				if(now == 0){
					_.find('.td-box-left a').addClass('dis');
				};
				if(now == size - 1){
					_.find('.td-box-right a').addClass('dis');
				};
			});
		};
	});
	
	//hide/show
	$('.doc-intro-box').each(function() {
		/*
		@!important all css line-height: 2
		*/
		var outHeight = $(this).parents('.doc-intro').height();
		var lineHeight = parseInt($(this).css('font-size')) * 2;
		var line = outHeight / lineHeight;
		var characters = Math.floor(($(this).width() - 40) / parseInt($(this).css('font-size')));
		if($(this).height() > outHeight){
			$(this).find('p:last').append('[<a class="doc-intro-toggle" href="javascript:void(0);" target="_self">µã»÷ÊÕÆð</a>]');
			var now = 0;
			var height = 0;
			var intro = ['', $(this).html()];
			$(this).find('p').each(function() {
				var pre = height / lineHeight;
				height += $(this).height();
				if(height > outHeight - lineHeight){
					intro[0] += '<p>' + $(this).text().substr(0, (line - pre) * characters - 8) + '...[<a class="doc-intro-toggle" href="javascript:void(0);" target="_self">²é¿´ÍêÕû</a>]</p>';
					return false;
				}else{
					intro[0] += $(this).prop('outerHTML');
				};
			});
			$(this).html(intro[0]);
			$(this).on('click', '.doc-intro-toggle', function(){
				++now;
				$(this).parents('.doc-intro').css((now % 2) ? {'position': 'relative', 'z-index': '2', 'overflow': 'visible'} : {'position': 'static', 'overflow': 'hidden'});
				$(this).parents('.doc-intro-box').toggleClass('doc-intro-box-show').html(intro[now % 2]);
			});
		};
	}).mouseleave(function(){
		if($(this).is('.doc-intro-box-show')){
			$(this).find('.doc-intro-toggle').click();
		}
	});
	
	//user
	$('.doc-top .login-wrap .user').mouseover(function(){
		$(this).addClass('user-show');
	}).mouseleave(function(){
		$(this).removeClass('user-show');
	});

	// app_in
	if($("#app_in").size() > 0) {
		$("#app_in").find(".close").click(function () {
			$("#app_in").fadeOut(500, function () {
				$(this).parent("dd").remove();
			});
		});
	}
	
	//refund
	$('.refund').click(function(){
		$('.order-failed-box2, .order-failed-btn').toggle();
	});
	
	//keshi exp
	/*$('.keshi-exp-tab b').click(function(){
		$('.keshi-exp-tabcon').hide().eq($(this).index()).show();
		$(this).addClass('now').siblings().removeClass('now');
	});*/
	
	//des-box
	$('.des-box').each(function(){
		if($(this).height() > 60){
			$(this).hide().after('<div>' + $(this).text().substr(0, 90) + '...' + '</div><span><i>²é¿´È«²¿</i><i style="display:none;">µã»÷ÊÕÆð</i></span>');
			$(this).siblings('span').click(function(){
				$(this).find('i').toggle();
				$(this).siblings('div').toggle();
				$(this).parents('.des').toggleClass('des-show');
			});
		};
	});
	
	//.hos-intro .tab span
	$('.hos-intro .tab span').click(function(){
		$(this).addClass('now').siblings().removeClass('now');
		$('.hos-intro .con').hide().eq($(this).index()).show();
	});
	//$('.hos-intro-news li:last').css({'border': 'none', 'padding-bottom': 0});
	
	//.hos-rbox-ancbtn
	$('.hos-rbox-anc').each(function(){
		var size = $(this).find('ul').size();
		if(size > 1){
			var page = 0;
			$('.hos-rbox-ancbtn i').click(function(){
				page = (page + ($(this).is('.next') ? 1 : -1) + size) % size;
				$('.hos-rbox-anc ul').hide().eq(page).show();
			});
		}else{
			$('.hos-rbox-ancbtn').hide();
		};
	});
	
	//.hos-guide-box
	$('.hos-guide-box').each(function(i, v){
		if($(v).height() > 140){
			$(v).parents('.hos-guide-wrap').addClass('hos-guide-hide').after('<div class="hos-guide-btn"><span>展开</span><span class="up">收起</span></div>');
		};
	});
	$('body').on('click', '.hos-guide-btn span', function(){
		$(this).hide().siblings().show();
		$(this).parent().siblings('.hos-guide-wrap').toggleClass('hos-guide-show');
	});
	$('.hos-guide .con:last').css({'border': 'none', 'padding-bottom': 0});
	$('.hos-guide .tab span').click(function(){
		$(this).addClass('now').siblings().removeClass('now');
		$('html, body').animate({scrollTop: $('.hos-guide .con').eq($(this).index()).offset().top - 68}, 'fast')
		//$('.hos-guide .con').hide().eq($(this).index()).show();
	});
	
	$('.keshi-exp-tag a').click(function(){
		$(this).parent().addClass('select').siblings().removeClass('select');
		var i = $(this).parent().index();
		var p = $(this).parents('.keshi-exp-filter');
		if(p.next().is('.keshi-exp-tagbox')){
			var n = p.next();
			n.show().find('ul').hide().eq(i).show();
		};
	});

    
    $("#cardNum").find(".tit").find("span").live("click", function() {
            
        $(this).addClass("active").parent().siblings(".tit").find("span").removeClass("active");

    });
});

// »Ø¸´µãÆÀ
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
$(function(){
	
	$('body').on('mouseleave', '.keshi-exp-date .open', function(){
		$(this).removeClass('open').addClass('shut');
	});
	$('.tab-box .tab-tit span').mouseover(function(event) {
        $(this).addClass('now').siblings().removeClass('now');
        $(this).parents('.tab-box').find('.tab-con').hide().eq($(this).index()).show();
    });
	
})
