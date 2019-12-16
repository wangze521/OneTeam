var ad39icon = {
    list: [
        'iframe[id*=ac]', //iframe广告
        'img[id*=ac]', //图片广告
        'iframe[id*=cproIframe]', //js广告
    ],
    timer: setInterval(function(){
        ad39icon.init()
    }, 1000),
    init: function(){
		var domain = RegExp(window.location.hostname);
		var noicon = ""; //不显示广告标识的域名 以空格隔开
		if(domain.test(noicon)) {
			return
			}
			else {
				var obj = jQuery(this.list.join(',')).filter(':not(.ad39icon-ready)');
				if(!obj.size()){
					clearInterval(this.timer);
				};
				obj.each(function(){
					var wrap = jQuery(this).parent();
					//过滤
					if(wrap.is('.art_topkey')){
						jQuery(this).addClass('ad39icon-ready');
						return true;
					}
					//过滤end
					var top = wrap.css('padding-top');
					var right = wrap.css('padding-right');
								if(wrap.find("a").length||wrap.find("iframe").length||wrap.find("embed").length)
					{var html = '<small style="top:' + top + ';right:' + right + ';width:24px;height:12px;position:absolute;background:rgb(201,201,201);color:#fff;text-align:center; line-height:12px; font-size:8px; display:block; opacity:0.5;">广告</small>';
					wrap.css('position', wrap.css('position') == 'static' ? 'relative' : wrap.css('position')).css('display','block').append(html);
								jQuery(this).addClass('ad39icon-ready');
								}
								else 
								return
				});
			};
    }
}