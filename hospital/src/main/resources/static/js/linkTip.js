/*************************************** **/
/***    研发二部-刘慧-2012-07-04        ***/
/***    通过Ajax实现连接<A>便签自动提示  ***/
/*****************************************/
(function ($) {
    $.fn.extend({
        art_ContentEvent: function (options) {

            var config = $.extend({
                server: 'http://service.db.39.net',
                keycmd: 'keycmd',
                left: '0px',
                top: '0px'
            }, options);

            //读取该疾病对应的症状，最多显示18个字，超出截断
            var symListsTemplate = ['<a href="{#Value#}" title="">{#Text#}</a> '].join(' ');

            //读取该疾病的相关科室，点击科室名，链接到对应科室页面,最多显示20个字，超出截断
            var deptListTemplate = ['<a href="{#Value#}" title="">{#Text#}</a> '].join(' ');

            //弹框模板
            var template = [
                	    '<i></i>',
                        '<span class="related_main">',
                    	    '<span class="rel_tit">',
                        	    '<span><a href="{#Url#}" title="{#Name#}">{#Name#}</a></span><cite><a href="http://yyk.39.net/doctors/" class="zys">找医生</a><a href="http://yyk.39.net/hospitals/" class="zyy">找医院</a></cite>',
                            '</span>',
                            '<span class="rel_name">别名：{#Alias#}</span>',
                            '<span class="rel_zz">',
                        	    '<span>症状： {#symListsTemplate#}</span><cite><a href="{#SignUrl#}">更多>></a></cite>',
                            '</span>',
                            '<span class="rel_list">',
            //XXX怎样治疗TreatUrl
                        	    '<span><a href="{#TreatUrl#}" title="">{#Name#}怎样治疗</a></span>',
            //XXX吃什么好FoodUrl
                                '<span><a href="{#FoodUrl#}" title="">{#Name#}吃什么好</a></span>',
            //XXX是怎么引起的CauseUrl
                                '<span><a href="{#CauseUrl#}" title="">{#Name#}是怎么引起的</a></span>',
            //XXX如何鉴别DiffUrl
                                '<span><a href="{#DiffUrl#}" title="">{#Name#}如何鉴别</a></span>',
            //XXX用什么药DrugUrl
                                '<span><a href="{#DrugUrl#}" title="">{#Name#}用什么药</a></span>',
            //XXX如何护理CareUrl
                                '<span><a href="{#CareUrl#}" title="">{#Name#}如何护理</a></span>',
                            '</span>',
                            '<span class="rel_ks">就诊科室：{#deptListTemplate#}</span>',
                        '</span>'
                    ].join(' ');

            var html = '';

            function initTipBox(name) {

                $.message = $.message || {};

                if (!$.message[name]) {
                    $.message[name] = $('<span class="related_box" id="related_box1"></span>').attr('name', name);
                    $('.art_con')[0] != undefined ?
                        $('.art_con')[0].appendChild($.message[name][0])
                                            : document.body.appendChild($.message[name][0]);
                }

                $.message.current = $.message[name];
            }

            //设置提示框位置
            function setPosition(parent) {
                //设置默认值
                var left = config.left, top = config.top;
                //reSize(config.width, config.height);
                var $parent = $(parent),
                        parentOffset = $parent.offset(),
                        parentWidth = $parent.width(),
                        parentHeight = $parent.height(),
                        boxWidth = $.message.current.width(),
                        boxHeight = $.message.current.height(),
                        winWidth = $(window).width(),
                        winHeight = $(window).height(),
                        scrollLeft = $(window).scrollLeft(),
                        scrollTop = $(window).scrollTop(),
                        arcConWidth = $('#contentText').width(),
                        arcConOffset = $('#contentText').offset();

                //箭头偏移量(54+30)pix
                left = parentOffset.left + parseInt(parentWidth / 2) - 28;
                //箭头高度10pix
                top = parentOffset.top + parseInt(parentHeight) + 0;
				

                //文字换行处理,提示框出现在文字内容最左侧+10pix的地方
                if (parentHeight > 20 ) {
                    left = arcConOffset.left;
					//alert(parentHeight);
                }
				
                $.message.current.css({ left: left, top: top });
            };

            //keycmd="bindJbkUi"
            function bindJbkUi() {
                var url = config.server + '/coredata.ashx?t=disease&n=' + arguments[0] + '&jsoncallback=?';
                if(!$.message.current.html()) {
                    $.getJSON(url, null, function (data) {
                        bindData(data);
                        $.message.current.html(html);
                    });    
                }
            };

            //绑定数据
            function bindData(json) {

                //绑定症状,读取该疾病对应的症状，最多显示18个字，超出截断
                var symLists = '', counter = 0;
                for (var i = 0; i < json.SymList.length; i++) {
                    counter += json.SymList[i].Text.length;
                    var sym = symListsTemplate
                            .replace(/{#Text#}/gi, json.SymList[i].Text)
                            .replace(/{#Value#}/gi, json.SymList[i].Value);

                    symLists += sym;
                    if (counter > 18) {
                        symLists = symLists.substring(0, symLists.length - sym.length);
                        break;
                    }
                }

                //读取该疾病的相关科室，点击科室名，链接到对应科室页面,最多显示20个字，超出截断
                var deptList = '';
                counter = 0;
                for (var j = 0; j < json.DeptList.length; j++) {
                    counter += json.DeptList[j].Text.length;
                    var dept = deptListTemplate
                            .replace(/{#Text#}/gi, json.DeptList[j].Text)
                            .replace(/{#Value#}/gi, json.DeptList[j].Value);

                    deptList += dept;
                    if (counter > 20) {
                        deptList = deptList.substring(0, deptList.length - dept.length);
                        break;
                    }
                }

                html = template.replace(/{#symListsTemplate#}/gi, symLists);
                html = html.replace(/{#deptListTemplate#}/gi, deptList);
                html = html.replace(/{#Name#}/gi, json.Name);
                html = html.replace(/{#Url#}/gi, json.Url);
                html = html.replace(/{#HosUrl#}/gi, json.HosUrl);
                html = html.replace(/{#DocUrl#}/gi, json.DocUrl);
                html = html.replace(/{#Alias#}/gi, json.Alias);
                html = html.replace(/{#SignUrl#}/gi, json.SignUrl);
                html = html.replace(/{#TreatUrl#}/gi, json.TreatUrl);
                html = html.replace(/{#FoodUrl#}/gi, json.FoodUrl);
                html = html.replace(/{#CauseUrl#}/gi, json.CauseUrl);
                html = html.replace(/{#DiffUrl#}/gi, json.DiffUrl);
                html = html.replace(/{#DrugUrl#}/gi, json.DrugUrl);
                html = html.replace(/{#CareUrl#}/gi, json.CareUrl);
            };

            //初始化对话框
            //initTipBox();

            function closeMessageBox() {
                $.message.current.css('display', 'none');
            };

            return this.each(function () {
                $(this).bind('mouseover', function () {

                    var linkA = $(this), command = linkA.attr(config.keycmd);

                    initTipBox(linkA.html());

                    //给弹出层加mouseover事件
                    if ($.message.current)
                        $.message.current.bind('mouseover', function () {
                            $.message.current.css('display', 'block');
                        }).bind('mouseout', function () {
                            //修复IE鼠标移动闪烁问题
                            var timer = setTimeout(closeMessageBox, 100);
                            $('*', $.message.current).each(function () {
                                if (timer) $(this).bind('mouseover', function () { clearTimeout(timer); });
                            });
                        });

                    //执行命令
                    if (command!='null') {
                        eval(command + '("' + $(this).html() + '")');
                    }

                    //是指提示框位置
                    setPosition(this);
                    //显示提示框
                    $.message.current.css('display', 'block');
                }).bind('mouseout', function () {
                    $.message.current.css('display', 'none');
                });
            });
        }
    });
})(jQuery);
document.write("<script src='http://image.39.net/js/checkTips.js'><\/script>");