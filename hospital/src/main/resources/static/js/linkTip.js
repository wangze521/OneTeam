/*************************************** **/
/***    �з�����-����-2012-07-04        ***/
/***    ͨ��Ajaxʵ������<A>��ǩ�Զ���ʾ  ***/
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

            //��ȡ�ü�����Ӧ��֢״�������ʾ18���֣������ض�
            var symListsTemplate = ['<a href="{#Value#}" title="">{#Text#}</a> '].join(' ');

            //��ȡ�ü�������ؿ��ң���������������ӵ���Ӧ����ҳ��,�����ʾ20���֣������ض�
            var deptListTemplate = ['<a href="{#Value#}" title="">{#Text#}</a> '].join(' ');

            //����ģ��
            var template = [
                	    '<i></i>',
                        '<span class="related_main">',
                    	    '<span class="rel_tit">',
                        	    '<span><a href="{#Url#}" title="{#Name#}">{#Name#}</a></span><cite><a href="http://yyk.39.net/doctors/" class="zys">��ҽ��</a><a href="http://yyk.39.net/hospitals/" class="zyy">��ҽԺ</a></cite>',
                            '</span>',
                            '<span class="rel_name">������{#Alias#}</span>',
                            '<span class="rel_zz">',
                        	    '<span>֢״�� {#symListsTemplate#}</span><cite><a href="{#SignUrl#}">����>></a></cite>',
                            '</span>',
                            '<span class="rel_list">',
            //XXX��������TreatUrl
                        	    '<span><a href="{#TreatUrl#}" title="">{#Name#}��������</a></span>',
            //XXX��ʲô��FoodUrl
                                '<span><a href="{#FoodUrl#}" title="">{#Name#}��ʲô��</a></span>',
            //XXX����ô�����CauseUrl
                                '<span><a href="{#CauseUrl#}" title="">{#Name#}����ô�����</a></span>',
            //XXX��μ���DiffUrl
                                '<span><a href="{#DiffUrl#}" title="">{#Name#}��μ���</a></span>',
            //XXX��ʲôҩDrugUrl
                                '<span><a href="{#DrugUrl#}" title="">{#Name#}��ʲôҩ</a></span>',
            //XXX��λ���CareUrl
                                '<span><a href="{#CareUrl#}" title="">{#Name#}��λ���</a></span>',
                            '</span>',
                            '<span class="rel_ks">������ң�{#deptListTemplate#}</span>',
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

            //������ʾ��λ��
            function setPosition(parent) {
                //����Ĭ��ֵ
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

                //��ͷƫ����(54+30)pix
                left = parentOffset.left + parseInt(parentWidth / 2) - 28;
                //��ͷ�߶�10pix
                top = parentOffset.top + parseInt(parentHeight) + 0;
				

                //���ֻ��д���,��ʾ��������������������+10pix�ĵط�
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

            //������
            function bindData(json) {

                //��֢״,��ȡ�ü�����Ӧ��֢״�������ʾ18���֣������ض�
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

                //��ȡ�ü�������ؿ��ң���������������ӵ���Ӧ����ҳ��,�����ʾ20���֣������ض�
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

            //��ʼ���Ի���
            //initTipBox();

            function closeMessageBox() {
                $.message.current.css('display', 'none');
            };

            return this.each(function () {
                $(this).bind('mouseover', function () {

                    var linkA = $(this), command = linkA.attr(config.keycmd);

                    initTipBox(linkA.html());

                    //���������mouseover�¼�
                    if ($.message.current)
                        $.message.current.bind('mouseover', function () {
                            $.message.current.css('display', 'block');
                        }).bind('mouseout', function () {
                            //�޸�IE����ƶ���˸����
                            var timer = setTimeout(closeMessageBox, 100);
                            $('*', $.message.current).each(function () {
                                if (timer) $(this).bind('mouseover', function () { clearTimeout(timer); });
                            });
                        });

                    //ִ������
                    if (command!='null') {
                        eval(command + '("' + $(this).html() + '")');
                    }

                    //��ָ��ʾ��λ��
                    setPosition(this);
                    //��ʾ��ʾ��
                    $.message.current.css('display', 'block');
                }).bind('mouseout', function () {
                    $.message.current.css('display', 'none');
                });
            });
        }
    });
})(jQuery);
document.write("<script src='http://image.39.net/js/checkTips.js'><\/script>");