function loadArrange(docid) {
    var url = '/getDoctor/' + docid + '_arrange.json';
    //var url = 'data.json';
    var tip = [
        '��Сʱ����һ�κ�Դ���������⡣',
        '���ڼ����Ű���Ϣ��...',
        '��δ��ͨԤԼ�Һ�',
        '��ǰû���Ű���Ϣ��',
        'ϵͳ����<a href="javascript:void(0);" target="_self" id="arrange-reload">������¼���</a>��',
        '��ҽ���Ѿ���Լ��'
    ];
    var box = $('#arrange');
    var dom = {
        //tip: box.find('.th-right'),
        con: box.find('.con'),
        tab: box.find('.th-tab'),
        box: box.find('.td-box')
    };
    var arrange = {
        has_arrange: 0,
        has_worktime: 0,
        is_flag: 0,
        get: function() {
            $.ajax({
                url: url,
                dataType: 'json',
                success: function(json) {
                    if (json.DOCTORARRANGE && json.DOCTORARRANGE.length) {
                        var html = {
                            tab: [],
                            table: [],
                            output: ''
                        }
                        $.each(json.DOCTORARRANGE, function(i, v) {
                            arrange.has_arrange += v.ARRANGE ? v.ARRANGE.length : 0;
                            arrange.has_worktime += v.WORKTIME ? (v.WORKTIME.DEFAULT ? v.WORKTIME.DEFAULT.length : 0) : 0;
                            var today = new Date();
                            var date = {
                                year: today.getFullYear(),
                                month: today.getMonth() + 1,
                                date: today.getDate(),
                                day: today.getDay(),
                                span: 0,
                                week: 2,
                                flag: [v.REGISTER_GUAHAO_FLAG, v.REGISTER_JIAHAO_FLAG, v.REGISTER_LVSE_FLAG].join('').indexOf('Y')
                            };
                            date.time = +new Date([date.year, date.month, date.date].join('/'));
                            var data = [];
                            if (v.ARRANGE) {
                                $.each(v.ARRANGE, function(i2, v2) {
                                	var register_date =""+v2.REGISTER_DATE;
                                    var k = (+new Date(register_date.replace(/-/g, '/') + ' 00:00:00') - date.time) / 864e5;
                                    if (k >= 0) {
                                        if (!data[k]) {
                                            data[k] = [];
                                        };
                                        data[k][v2.TIME_ID] = {
                                            r_f: v2.REGISTER_FLAG,
                                            r_d: v2.REGISTER_DATE,
                                            r_pln: v2.PARTNER_LAB_NAME,
                                            r_dt: v2.DOOR_TYPE,
                                            r_p: v2.PRICE / 100
                                        };
                                        date.span = Math.max(k, date.span);
                                    };
                                });
                            }
                            date.week = Math.max(Math.floor(date.span / 7) + 1, date.week);
                            var arr_wt = [];
                            if (v.WORKTIME && arrange.has_worktime > 0) {
                            	if(v.LABIDS!=undefined){
	                                if (v.LABIDS.length) {
	                                    $.each(v.LABIDS, function(i2, v2) {
	                                        if (v.WORKTIME[v2]) {
	                                            arr_wt = arr_wt.concat(v.WORKTIME[v2]);
	                                        }
	
	                                    });
	                                }
                            	}
                            }
                            if (!arr_wt.length) {
                                if (v.WORKTIME && arrange.has_worktime > 0)
                                    arr_wt = arr_wt.concat(v.WORKTIME.DEFAULT);
                            };
                            $.each(arr_wt, function(i2, v2) {
                            	if(v2!=undefined){
                            		 var k = ((v2.DAY % 7) + 7 - date.day) % 7;
                                     while (k < date.week * 7) {
                                         var ts = v2.TIMESPAN;
                                         if (!data[k]) {
                                             data[k] = [];
                                         };
                                         if (!data[k][ts]) {
                                             data[k][ts] = {};
                                         };
                                         data[k][ts].w_p = v2.PRICE;
                                         data[k][ts].w_d = v2.DAY;
                                         data[k][ts].w_op = v2.OUT_PLACE;
                                         data[k][ts].w_dt = v2.DOOR_TYPE;
                                         k += 7;
                                     };
                            	}                             
                            });
                            //���
                            html.table[i] = [];
                            var arr_day = ['����', '����', '����'];
                            var arr_week = ['����', '��һ', '�ܶ�', '����', '����', '����', '����'];
                            var arr_dt = ['', '��ͨ����', 'ר������', '��������', 'ר������', '��������', 'ҹ������', '����', 'ͣ��', '���'];
                            var html_table = '<div class="td-box clearfix"' + (i ? ' style="display: none;"' : '') + '><div class="td-box-left"><a href="javascript:void(0);" target="_self" class="dis"></a></div><div class="td-box-mid">';
                            for (var w = 0; w < date.week; w++) {
                                html.table[i][w] = ['', '', '', ''];
                                html_table += '<div class="item"' + (w ? ' style="display: none;"' : '') + '>';
                                for (var d = 0; d < 7; d++) {
                                    var ii = w * 7 + d;
                                    var new_day = new Date(date.time + ii * 864e5);
                                    html.table[i][w][0] += '<li><b>' + (new_day.getMonth() + 1) + '/' + new_day.getDate() + '</b><b>' + (ii < 3 ? arr_day[ii] : arr_week[new_day.getDay()]) + '</b></li>';
                                    for (var s = 1; s < 4; s++) {
                                        if (data[ii] && data[ii][s]) {
                                            if (data[ii][s].r_f) {
                                                if (data[ii][s].r_f == 'Y') {
                                                    html.table[i][w][s] += '<li class="td-order"><span class="alink"  onclick="registerButtonClickEvent(' + (+new Date(data[ii][s].r_d.replace(/-/g, '/') + ' 00:00:00')) + ',' + s + ',' + docid + ');" target="_self" >ԤԼ</span></li>';
                                                        arrange.is_flag++;
                                                } else {
                                                    if (date.flag >= 0) {
                                                        html.table[i][w][s] += '<li class="td-stop"><b>ԤԼ����</b><span><strong>��ʱ�ιҺ�����<br>��ѡ������ʱ�λ�����ҽԺ</strong><i>����㣺' + (data[ii][s].w_op == null ? '-' : data[ii][s].w_op) + '</i><i>�Һŷѣ�' + (data[ii][s].r_p == 0 ? '-' : (data[ii][s].r_p + 'Ԫ')) + '</i><i>�������ͣ�' + arr_dt[data[ii][s].r_dt] + '</i><em></em></span></li>';
                                                    } else {
                                                        html.table[i][w][s] += '<li class="td-stop"><b>����ԤԼ</b><span><strong>��ʱ��Ŀǰ����ԤԼ�����ܵ�ԭ���У�<br>�ѹ���ֹԤԼʱ�䡢��δ�źš���ʱͣ��</strong><i>����㣺' + (data[ii][s].r_pln == null ? '-' : data[ii][s].r_pln) + '</i><i>�Һŷѣ�' + (data[ii][s].r_p == 0 ? '-' : (data[ii][s].r_p + 'Ԫ')) + '</i><i>�������ͣ�' + arr_dt[data[ii][s].r_dt] + '</i><em></em></span></li>';
                                                    };
                                                };
                                            } else {
                                                html.table[i][w][s] += '<li class="td-stop"><b>����</b><span><strong>�ó���ʱ����δ�ṩԤԼ�Һŷ���</strong><i>����㣺' + ((data[ii][s].w_op == null || data[ii][s].w_op == '') ? '-' : data[ii][s].w_op) + '</i><i>�Һŷѣ�' + (data[ii][s].w_p == 0 ? '-' : (data[ii][s].w_p + 'Ԫ')) + '</i><i>�������ͣ�' + arr_dt[data[ii][s].w_dt] + '</i><em></em></span></li>';
                                            };
                                        } else {
                                            html.table[i][w][s] += '<li> </li>';
                                        };
                                    };
                                };
                                html_table += '<ul class="td td-cap clearfix">' + html.table[i][w][0] + '</ul>';
                                html_table += '<ul class="td td-line clearfix">' + html.table[i][w][1] + '</ul>';
                                html_table += '<ul class="td td-line clearfix">' + html.table[i][w][2] + '</ul>';
                                html_table += '<ul class="td td-line td-line-last clearfix">' + html.table[i][w][3] + '</ul>';
                                html_table += '</div>';
                            };
                            html_table += '</div><div class="td-box-right"><a href="javascript:void(0);" target="_self" class=""></a></div></div>';
                            html.output += html_table;
                            html.tab.push('<span title="' + v.NAME + '"' + (i ? '' : ' class="now"') + '>' + v.NAME + '</span>');
                            var _flag;
                            if (v.REGISTER_FLAG == 'Y') {
                                _flag = 0;
                            } else {
                                if (date.flag >= 0) {
                                    _flag = 5;
                                } else {
                                    _flag = 2;
                                };
                            };
                            //dom.tip[i ? 'append' : 'html']('<span' + (i ? ' style="display:none;"' : '') + '>' + tip[_flag] + '</span>');
                        });
                        dom.con.find('.td-box').remove();
                        dom.con.append(html.output);
                        dom.tab.addClass('th-tab' + Math.min(html.tab.length, 4)).html(html.tab.join(''));
                        box.find('.td-box').each(function(index, element) {
                            var now = 0;
                            var _ = $(this);
                            var size = _.find('.item').size();
                            if (size > 1) {
                                _.find('.td-box-right a').removeClass('dis');
                                _.find('.td-box-left a, .td-box-right a').click(function() {
                                    if ($(this).is('.dis')) {
                                        return false;
                                    };
                                    now = now + ($(this).parent().is('.td-box-left') ? -1 : 1);
                                    _.find('.item').hide().eq(now).show();
                                    _.find('.td-box-left a, .td-box-right a').removeClass('dis');
                                    if (now == 0) {
                                        _.find('.td-box-left a').addClass('dis');
                                    };
                                    if (now == size - 1) {
                                        _.find('.td-box-right a').addClass('dis');
                                    };
                                });
                            };
                        });
                    } else {
                        //dom.tip.html(tip[2]);
                    };
                },
                beforeSend: function() {
                    //dom.tip.html(tip[1]);
                },
                error: function(xml, err, e) {
                    //dom.tip.html(tip[4]);
                    //debug
                    console.info(xml);
                    console.info(err);
                    console.info(e);
                }
            });
        }
    };
    arrange.get();
    box.on('click', '#arrange-reload', function() {
        arrange.get();
    });
};

/**
 * @param o
 */
function registerButtonClickEvent(date, timeId, doctorId) {
    var pid = getCookie("pid");
    if (pid == undefined) {
        loginBox.Show();
    } else {
        $.ajax({
            type: 'post',
            url: '/user/GetUserExpandJson.json',
            async: false,
            data: {
                'pid': pid
            },
            dataType: 'json',
            success: function(result) {
                if (result) {
                    window.location.href = "/register/input.html?rd=" + date + "&ti=" + timeId + "&di=" + doctorId + "&uid=" + pid;
                } else {
                    var lb_tel_check = new LightBox("lb_tel_check");
                    lb_tel_check.Show();
                    document.getElementById('newbot').style.display = 'none';
                }
            }
        });
    }
}