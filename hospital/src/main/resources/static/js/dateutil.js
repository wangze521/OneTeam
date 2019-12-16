/**
 * @author wushubin@mail.39.net
 */
Date.prototype.pattern=function(fmt) {        
    var o = {        
	    "M+" : this.getMonth()+1, //月份        
	    "d+" : this.getDate(), //日        
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时        
	    "H+" : this.getHours(), //小时        
	    "m+" : this.getMinutes(), //分        
	    "s+" : this.getSeconds(), //秒        
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度        
	    "S" : this.getMilliseconds() //毫秒        
    };        
    var week = {        
	    "0" : "\u65e5",        
	    "1" : "\u4e00",        
	    "2" : "\u4e8c",        
	    "3" : "\u4e09",        
	    "4" : "\u56db",        
	    "5" : "\u4e94",        
	    "6" : "\u516d"       
    };        
    if(/(y+)/.test(fmt)){        
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));        
    }        
    if(/(E+)/.test(fmt)){        
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);        
    }        
    for(var k in o){        
        if(new RegExp("("+ k +")").test(fmt)){        
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));        
        }        
    }        
    return fmt;        
}
function DateUtil() {
	var formatNumber = function(data, format) {// 3
		format = format.length;
		data = data || 0;
		// return format == 1 ? data :
		// String(Math.pow(10,format)+data).substr(-format);//该死的IE6！！！
		return format == 1 ? data
				: (data = String(Math.pow(10, format) + data))
						.substr(data.length - format);
	}
	/**
	 * 日期格式化 example：formatDate('YYYY-MM-DD hh:mm:ss',new Date()) 结果：2011-01-21
	 * 15:24:43
	 * 参考链接：http://hi.baidu.com/jindw/blog/item/2346c158c912b384810a1813.html
	 */
	this.formatDate = function(pattern, date) {
		return pattern.replace(/([YMDhsm])\1*/g, function(format) {
			switch (format.charAt()) {
			case 'Y':
				return formatNumber(date.getFullYear(), format);
			case 'M':
				return formatNumber(date.getMonth() + 1, format);
			case 'D':
				return formatNumber(date.getDate(), format);
			case 'w':
				return date.getDay() + 1;
			case 'h':
				return formatNumber(date.getHours(), format);
			case 'm':
				return formatNumber(date.getMinutes(), format);
			case 's':
				return formatNumber(date.getSeconds(), format);
			}
		});
	}

	// 两个日期的差值(d1 - d2).
	this.dateDiff = function(d1, d2) {
		var day = 24 * 60 * 60 * 1000;
		try {
			var dateArr = d1.split("-");
			var checkDate = new Date();
			checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
			var checkTime = checkDate.getTime();

			var dateArr2 = d2.split("-");
			var checkDate2 = new Date();
			checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
			var checkTime2 = checkDate2.getTime();

			var cha = (checkTime - checkTime2) / day;
			return cha;
		} catch (e) {
			return false;
		}
	}// end fun

	/*
	 * 日期加上毫秒后的新日期. date 日期字符串 millisecond 正负毫秒数
	 */
	this.getStrDateAfterMs = function(millisecond, date) {
		date = date.replace(/-/g, "/");
		var nd = new Date(date);
		var n = nd.valueOf() + millisecond;
		return new Date(n);
	}

	/*
	 * 日期加上毫秒后的新日期. date 日期 millisecond 正负毫秒数
	 */
	this.getDateAfterMs = function(millisecond, date) {
		var n = date.valueOf() + millisecond;
		return new Date(n);
	}

	// 日期加上天数后的新日期.
	this.addDate = function(days, date) {
		var nd;
		if (date != "") {
			cdate = date.split("-");
			var cd = cdate[1] + "/" + cdate[2] + "/" + cdate[0];
			nd = new Date(cd);
		} else {
			nd = new Date();
		}
		nd = nd.valueOf();
		nd = nd + days * 24 * 60 * 60 * 1000;
		nd = new Date(nd);
		return this.formatDate('YYYY-MM-DD', nd);
	}

	// 获得当天的日期
	this.getCurrentDate = function() {
		return this.formatDate('YYYY-MM-DD', new Date());
	}

	// 获得当天的日期
	this.getCurrentTime = function(formatStr) {
		return this.formatDate(formatStr, new Date());
	}

	// 根据毫秒数获取时间
	this.getDate = function(formatStr, millisecond) {
		return this.formatDate(formatStr, new Date(millisecond));
	}
	this.chinaDate = function(yyyy, MM, dd, HH, mm, ss) {
		var second = 1000;
		var minutes = second * 60;
		var hours = minutes * 60;
		var days = hours * 24;
		var months = days * 30;
		var twomonths = days * 365;

		var myDate = new Date(yyyy, MM - 1, dd, HH, mm, ss);
		var nowtime = new Date();
		var longtime = nowtime.getTime() - myDate.getTime();
		var showtime = 0;
		if (longtime > months * 2) {
			return yyyy + "-" + MM + "-" + dd + " " + HH + ":" + mm + ":" + ss;
		} else if (longtime > months) {
			return "1个月前";
		} else if (longtime > days * 7) {
			return ("1周前");
		} else if (longtime > days) {
			return (Math.floor(longtime / days) + "天前");
		} else if (longtime > hours) {
			return (Math.floor(longtime / hours) + "小时前");
		} else if (longtime > minutes) {
			return (Math.floor(longtime / minutes) + "分钟前");
		} else if (longtime > second) {
			return(Math.floor(longtime/second)+"秒前");
		} else { 
			return(longtime+" error ");	 
		} 
	};
	
	this.getDateArray = function(date,weekCount,pattern ,startDay){
		if(typeof startDay === 'undefined') startDay = 0;
		var arrangeList = new Array();
		var time = date.getTime();
		var day = date.getDay();
		/*if ( day == 0 ){
			day = 7;
		}*/
		
		for(var x=startDay;x<weekCount*7;x++){
			var someDay = new Date(time + (x-day)*24*60*60*1000);
			if(pattern)
				arrangeList.push(this.formatDate(pattern, someDay));
			else
				arrangeList.push(someDay);	
		}
		return arrangeList;
	}
}
