//registerHelper
var fileserver = "/fileserver/"; //$.init_cfg.file_server;
var kasp = "/kasp/";
Handlebars.registerHelper("fileserverhost", function() {
    return fileserver;
});
Handlebars.registerHelper("kasphost", function() {
    return kasp;
});
Handlebars.registerHelper("division", function(number1, number2) { // 除法
    if (parseFloat(number2) === 0) {
        return "除数不可为0";
    }
    return parseFloat(number1) / parseFloat(number2);
})
//金额保留两位小数并且三位一逗 add by fxh
Handlebars.registerHelper("toLocalString", function(number1) {
    var f_x = parseFloat(number1);
    if (isNaN(f_x)) {
        console.info('function:changeTwoDecimal->parameter error');
        return number1;
    }
    var f_x = Math.round(number1 * 100) / 100;
    var s_x = f_x.toLocaleString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
})
//字符串转换为日期格式 add by fxh
Handlebars.registerHelper("toDate", function(number1) {
    var f_x = parseFloat(number1);
    if (isNaN(f_x)) {
        console.info('function:changeTwoDecimal->parameter error');
        return number1;
    }
    var f_x = Math.round(number1 * 100) / 100;
    var s_x = f_x.toLocaleString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
})
Handlebars.registerHelper("divisionWithPercent", function(number1, number2) { // 除法
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    if (number2 === 0) {
        return "除数不可为0";
    }
    return (number1 * 100.0 / number2).toFixed(2);
})
Handlebars.registerHelper("divisionWithPercent2", function(number1, number2) { // 除法
    number1 = parseFloat(number2)-parseFloat(number1);
    number2 = parseFloat(number2);
    if (number2 === 0) {
        return "除数不可为0";
    }
    return (number1 * 100.0 / number2).toFixed(2);
})
Handlebars.registerHelper("plus", function(number1, number2) { // 加法
        var data = parseFloat(number1, 10) + parseFloat(number2, 10);
        if (parseInt(data) == data) {
            return parseInt(data);
        } else {
            return data.toFixed(2);
        }
    })
Handlebars.registerHelper("minus", function(number1, number2) { // 减法
        var data = parseFloat(number1, 10) - parseFloat(number2, 10);
        if (parseInt(data) == data) {
            return parseInt(data);
        } else {
            return data.toFixed(2);
        }
    })
    // 获取子字符串
Handlebars.registerHelper("getSubstring", function(str, start, end) {
    if(end){
        return str.substring( parseInt(start), parseInt(end) );
    }else{
        return str.substring( parseInt(start),str.lenght );
    }
})
    // 控制长度
Handlebars.registerHelper("getShortString", function(str, len, defaultDescription) {
	if( !str && defaultDescription ){
		return defaultDescription;
	}
    if (str.length > parseInt(len)) {
        return str.substring(0, parseInt(len)) + "...";
    } else {
        return str;
    }
})
Handlebars.registerHelper("parseNumber", function(item) { //转为“万”为单位，保留小数点后两位
    if (item >= 10000) {
        var temp = parseFloat(item) / 10000.00;
        if (parseInt(temp) == temp) {
            return parseInt(temp) + "万";
        } else {
            return temp.toFixed(2) + "万";
        }
    } else {
        if (parseInt(item) == item) {
            return parseInt(item);
        } else {
            return parseInt(item).toFixed(2);
        }
    }
});
Handlebars.registerHelper("parseNumberWithoutUnit", function(item) { //转为“万”为单位，保留小数点后两位
    if (item >= 10000) {
        var temp = parseFloat(item) / 10000.00;
        if (parseInt(temp) == temp) {
            return parseInt(temp);
        } else {
            return temp.toFixed(2);
        }
    } else {
        if (parseInt(item) == item) {
            return parseInt(item);
        } else {
            return parseInt(item).toFixed(2);
        }
    }
});
Handlebars.registerHelper("parseTenThousand", function(item) { //强制转化成万为单位
    var temp = parseFloat(item) / 10000.00;
    if (parseInt(temp) == temp) {
        return parseInt(temp);
    } else {
        return temp;
    }
});
Handlebars.registerHelper("parseFloat", function(item) { //保留小数点后两位
    return item ? parseFloat(item).toFixed(2) : "0.00";
});
Handlebars.registerHelper("getCreditstatus", function(item) {
    if (item == "1") return "有";
    else return "无";
});
Handlebars.registerHelper("checkIsNull", function(item) { //判断返回值是否为空
    return item ? item : "数据错误，为空";
});
Handlebars.registerHelper("isNull", function(item, options) { //判断是否相等
    if ( item ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper("checkIsZero", function(item) { //
    return item ? item : "0";
});
Handlebars.registerHelper("nullThenTips", function(item, tips) { //如果item为空，则返回tips
    return item ? item : tips;
});
Handlebars.registerHelper("stockStatus", function(item) { //众筹状态
    var result = "";
    switch (item) {
        case "1":
            result = "众筹中";
            break;
        case "2":
            result = "预热中";
            break;
        case "3":
            result = "已成功";
            break;
        default:
            result = "无状态";
    }
    return result;
});
Handlebars.registerHelper("replaceName", function(item) { //替换字符
    var len = item.length;
    if (len == 2) {
        return item.replace(item.substr(1), "**")
    } else if (len > 2) {
        return item.replace(item.substring(1, len - 1), "**")
    } else {
        return "***"
    }
});
Handlebars.registerHelper("equal", function(v1, v2, options) { //判断是否相等
    if (v1 == v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

//截取银行卡号（用于充值）
Handlebars.registerHelper("interceptCard",function(cardNum){
    var len = cardNum.length;
    return cardNum.substring(len-4,len);
})

Handlebars.registerHelper("equalMany", function(v1, v2, options) { //判断是否相等  v2用,分割
    var str = v2.split(",");
    for (var i = 0; i < str.length; i++) {
        if (v1 == str[i]) {
            return options.fn(this);
        }
    }
    return options.inverse(this);
});
Handlebars.registerHelper("greaterThan", function(v1, v2, options) { //比较大小
    if (parseFloat(v1) > parseFloat(v2)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
//排序，从1开始 rownumber
Handlebars.registerHelper("rownumber", function(item) {
    return item + 1;
});
// 去除html标签，只保留纯文字（入参：要处理的对象，字数限制，对象为空时返回的默认描述）
Handlebars.registerHelper("getWord", function(item, limit, defaultDescription) {
	item = item.replace(/<(\S*?)[^>]*>/g,"").replace(/(\&\w*\;|\s)/g,"");
	limit = limit ? parseInt(limit) : 0;
	if( limit && item.length > limit){
		item = item.substring(0, limit) + "...";
	}else if( !item && defaultDescription){
		item = defaultDescription;
	}
    return item;
});
/** =================================== 用于股权 =================================== */
// 获取股权产品状态
Handlebars.registerHelper("getStockStatusSpecial", function(status) {
    if ("1" == status) {
        return new Handlebars.SafeString('<span class="label-rest">筹资中</span>');
    } else if ("2" == status) {
        return new Handlebars.SafeString('<span class="label-rest">预热中</span>');
    } else if ("3" == status) {
        return new Handlebars.SafeString('<span class="label-success">已成功</span>');
    } else if ("77" == status) {
        return new Handlebars.SafeString('><span class="label-over">募集完成</span>');
    } else if ("99" == status) {
        return new Handlebars.SafeString('<span class="label-rest">初始发起项目</span>');
    } else if ("0" == status) {
        return new Handlebars.SafeString('<span class="label-rest">已通过材料审核</span>');
    }
});
// 获取股权项目所处阶段，用于详情页面
Handlebars.registerHelper("getProjectPhase",function(projectPhase){
    if(projectPhase == "1"){
        return '产品开发中';
    }else if(projectPhase == "2"){
        return '产品已上市或上线';
    }else if(projectPhase == "3"){
        return '已经有收入';
    }else if(projectPhase == "4"){
        return '已经盈利';
    }else{
        return '企业未填写';
    }
});
/** =================================== 用于股权 end =================================== */
/** =================================== 用于产品众筹 =================================== */
//用于限制产品列表项目简介字数
Handlebars.registerHelper("checkIntro_short",function(intro_short){
    if(intro_short.length > 53){
        intro_short = intro_short.substring(0,53) + "....."
        return intro_short;
    }else{
        return intro_short;
    }
})
//用于限制入驻机构列表机构简介字数
Handlebars.registerHelper("checkIntro_short2",function(intro_short){
    if(intro_short.length > 55){
        intro_short = intro_short.substring(0,55) + "....."
        return intro_short;
    }else{
        return intro_short;
    }
})
/** =================================== 用于产品众筹 end =================================== */
/** =================================== 用于债权 =================================== */
var getDeadlineUnit = Handlebars.registerHelper("getDeadlineUnit", function(unit) { // 获取期限单位
    if ("Y" == unit) {
        return "年";
    } else if ("D" == unit) {
        return "日";
    } else {
        return "个月";
    }
});
// 去除年化收益率的百分号
Handlebars.registerHelper("getAnnualrate", function(annualrate) {
        if (annualrate.substring(annualrate.length - 1, annualrate.length) == "%") {
            return annualrate.substring(0, annualrate.length - 1);
        } else {
            return annualrate;
        }
    })
    // 分割img，返回img列表
Handlebars.registerHelper("splitImg", function(img) {
        if (img) {
            var path = img.split("?");
            if (path.length > 1) {
                var result = "";
                for (var i = 0; i < path.length; i++) {
                    result = result + '<li><img src="' + $.init_cfg.file_server + path[i] + '" /></li>'
                }
                return new Handlebars.SafeString(result);
            } else {
                return new Handlebars.SafeString('<li><img src="' + $.init_cfg.file_server + path[0] + '" /></li>');
            }
        } else {
            return new Handlebars.SafeString('<li><img src="/images/news01.jpg" /></li>');
        }
    })
    // 获取简短的还款方式（去掉按*付息）
Handlebars.registerHelper("getShortPayment", function(paymentmode) {
        if (paymentmode.substring(0, 1) == "按" && paymentmode.substring(2, 4) == "计息") {
            return paymentmode.substring(5, paymentmode.length);
        } else {
            return paymentmode;
        }
    })
    // 隐藏名字
Handlebars.registerHelper("hideName", function(item) {
    var len = item.length;
    if (len == 2) {
        return item.replace(item.substr(1), "**")
    } else if (len > 2) {
        return item.replace(item.substring(1, len - 1), "**")
    } else {
        return "***"
    }
});
// 隐藏资金账号
Handlebars.registerHelper("hideAccount", function(item) {
    var len = item.length;
	var result = "";
	for(var i = 0; i < item.length - 4; i++){
		result += "*";
	}
	return result + item.substr(item.length - 4, item.length);
});
// 检查是否三方支付
Handlebars.registerHelper("checkSfzf", function(channelno, options) {
    var code = channelno.substring(channelno.length - 2, channelno.length);
    if (code == "01") { // 三方支付以01结尾，三方存管以06结尾
        return options.fn(this);
    } else if (code == "06") {
        return options.inverse(this);
    }
});
// 根据产品状态，返回按钮（用于首页）
Handlebars.registerHelper("getLicaiButton", function(status, allowtime, leftamount, djs, id) {
    if (status == "4") {
        if (parseFloat(leftamount) > 0) {
            return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/bondDetail.html?id=' + id + '\'">已结束·查看详情</button>');
        } else {
            return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/bondDetail.html?id=' + id + '\'">已投满·查看详情</button>');
        }
    } else if (status == '3' || status == '5') {
        if (parseFloat(leftamount) <= 0 && (allowtime == "3" || allowtime == "4")) {
            return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/bondDetail.html?id=' + id + '\'">已投满·查看详情</button>');
        } else if (allowtime == "1") {
            return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/bondDetail.html?id=' + id + '\'">敬请期待·查看详情</button>');
        } else if (allowtime == "2") {
            return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/bondDetail.html?id=' + id + '\'">即将开始·查看详情</button>');
        } else {
            return new Handlebars.SafeString('<button class="btn-invest" onclick="document.location=\'kisp/bondDetail.html?id=' + id + '\'">立即投资</button>');
        }
    }
});
// 根据产品状态，返回按钮（用于产品列表页面）
Handlebars.registerHelper("getLicaiButton1", function(status, allowtime, leftamount, djs, id) {
    if (status == "4") {
        if (parseFloat(leftamount) > 0) {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled">已结束</a>');
        } else {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled">已投满</a>');
        }
    } else if (status == '3' || status == '5') {
        if (allowtime == "3" || allowtime == "4") {
            if (parseFloat(leftamount) < 0) {
                return new Handlebars.SafeString('<a class="btn-lg btn-disabled">已结束</a>');
            } else if (parseFloat(leftamount) == 0) {
                return new Handlebars.SafeString('<a class="btn-lg btn-disabled">已投满</a>');
            } else {
                return new Handlebars.SafeString('<a class="btn-lg btn-orange" href="bondDetail.html?id=' + id + '">投资</a>');
            }
        } else if (allowtime == "1" || allowtime == "2") {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled">敬请期待</a>');
        }
    } else {
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">敬请期待</a>');
    }
});
// 根据产品状态，返回按钮（用于产品详情页面）
Handlebars.registerHelper("getLicaiButton2", function(status, allowtime, leftamount, id) {
    if (status == "4") {
		if (parseFloat(leftamount) > 0) {
             return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">认购结束</button>');
        } else {
             return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">投满结束</button>');
        }
    } else if (status == '3' || status == '5') {
        if (parseFloat(leftamount) <= 0 && (allowtime == "3" || allowtime == "4")) {

			if (parseFloat(leftamount) < 0) {
                return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">认购结束</button>');
            } else if (parseFloat(leftamount) == 0) {
                return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">投满结束</button>');
            } else {
                return new Handlebars.SafeString('<a class="btn-lg btn-orange" href="auth/bondConfirm.html?id=' + id + '">投资</a>');
            }
        } else if (allowtime == "1") {
            return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">敬请期待</button>');
        } else if (allowtime == "2") {
            return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">即将开始</button>');
        } else {
            return new Handlebars.SafeString('<button class="btn-lg btn-orange" onclick="document.location=\'auth/bondConfirm.html?id=' + id + '\';return false;">立即投资</button>');
        }
    }
});
// 根据产品状态，返回按钮（用于壹融通理财页面 by 2015年7月31日10:34:00）
Handlebars.registerHelper("getLicai3Button", function(status, allowtime, leftamount, djs, id) {
    if (status == "4") {
        if (parseFloat(leftamount) > 0) {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">已结束</a>');
        } else {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr" >已投满</a>');
        }
    } else if (status == '3' || status == '5') {
        if (parseFloat(leftamount) <= 0 && (allowtime == "3" || allowtime == "4")) {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr" >已投满</a>');
        } else if (allowtime == "1") {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">查看详情</a>');
        } else if (allowtime == "2") {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">即将开始</a>');
        } else {
            return new Handlebars.SafeString('<a class="btn-lg btn-orange fr" href="bondDetail.html?id=' + id + '">立即投资</a>');
        }
    }
});

// 根据产品状态，返回按钮（用于壹融通首页新手专享 by 2015年12月24日）
Handlebars.registerHelper("getNewBieButtonIndex", function(status, allowtime, leftamount, djs, id) {
    if (status == "4") {
        if (parseFloat(leftamount) > 0) {
            return new Handlebars.SafeString('<a class="btn btn-orange btn-md-newbie" href="javascript:;">已结束</a>');
        } else {
            return new Handlebars.SafeString('<a class="btn btn-orange btn-md-newbie" href="javascript:;">已投满</a>');
        }
    } else if (status == '3' || status == '5') {
        if (parseFloat(leftamount) <= 0 && (allowtime == "3" || allowtime == "4")) {
            return new Handlebars.SafeString('<a class="btn btn-orange btn-md-newbie" href="javascript:;">已投满</a>');
        } else if (allowtime == "1") {
            return new Handlebars.SafeString('<a class="btn btn-orange btn-md-newbie" href="kisp/bondDetail.html?id=' + id + '">查看详情</a>');
        } else if (allowtime == "2") {
            return new Handlebars.SafeString('<span class="btn btn-grey btn-md-newbie">即将开始</span>');
        } else {
            return new Handlebars.SafeString('<a class="btn btn-orange btn-md-newbie" href="kisp/bondDetail.html?id=' + id + '">立即投资</a>');
        }
    }
});

// 根据产品状态，返回按钮（用于首页热卖产品）
Handlebars.registerHelper("getHotProductButtonIndex", function(status, allowtime, leftamount, djs, id) {
    if (status == "4") {
        if (parseFloat(leftamount) > 0) {
            return new Handlebars.SafeString('<a class="btn-lg-invest" href="kisp/bondDetail.html?id=' + id + '">已结束</a>');
        } else {
            return new Handlebars.SafeString('<a class="btn-lg-invest" href="kisp/bondDetail.html?id=' + id + '">已投满</a>');
        }
    } else if (status == '3' || status == '5') {
        if (allowtime == "3" || allowtime == "4") {
            if (parseFloat(leftamount) < 0) {
                return new Handlebars.SafeString('<a class="btn-lg-invest" href="kisp/bondDetail.html?id=' + id + '">已结束</a>');
            } else if (parseFloat(leftamount) == 0) {
                return new Handlebars.SafeString('<a class="btn-lg-invest" href="kisp/bondDetail.html?id=' + id + '">已投满</a>');
            } else {
                return new Handlebars.SafeString('<a class="btn-lg-invest" href="kisp/bondDetail.html?id=' + id + '">马上投资</a>');
            }
        } else if (allowtime == "1" || allowtime == "2") {
            return new Handlebars.SafeString('<span class="btn-lg-invest">敬请期待</span>');
        }
    } else {
        return new Handlebars.SafeString('<span class="btn-lg-invest">敬请期待</span>');
    }
});

// 根据产品状态，返回按钮（用于壹融通快速提现首页 by 2015年7月31日10:34:00）
Handlebars.registerHelper("getRapidWithdrawalButtonIndex", function(status, allowtime, leftamount, djs, id) {
    if (status == "4") {
        if (parseFloat(leftamount) > 0) {
            return new Handlebars.SafeString('<a class="btn btn-sm btn-orange" href="kisp/bondDetail.html?id=' + id + '">已结束</a>');
        } else {
            return new Handlebars.SafeString('<a class="btn btn-sm btn-orange" href="kisp/bondDetail.html?id=' + id + '" >已投满</a>');
        }
    } else if (status == '3' || status == '5') {
        if (parseFloat(leftamount) <= 0 && (allowtime == "3" || allowtime == "4")) {
            return new Handlebars.SafeString('<a class="btn btn-sm btn-orange" href="kisp/bondDetail.html?id=' + id + '">已投满</a>');
        } else if (allowtime == "1") {
            return new Handlebars.SafeString('<a class="btn btn-sm btn-orange" href="kisp/bondDetail.html?id=' + id + '">查看详情</a>');
        } else if (allowtime == "2") {
            return new Handlebars.SafeString('<span class="btn btn-sm btn-orange">即将开始</span>');
        } else {
            return new Handlebars.SafeString('<a class="btn btn-sm btn-orange" href="kisp/bondDetail.html?id=' + id + '">立即投资</a>');
        }
    }
});

// 根据产品状态，返回按钮（用于壹融通产品众筹 by 2015年7月31日10:34:00）
Handlebars.registerHelper("getCrowdFundButton1", function(status, allowtime, leftamount, id) {
    if (status == "3") {
        if (parseFloat(leftamount) > 0) {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled rc-lg-bt">已结束</a>');
        } else {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled rc-lg-bt" >已投满</a>');
        }
    } else if (status == '1' || status == '2') {
        if (parseFloat(leftamount) <= 0 && (allowtime == "3" || allowtime == "4")) {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled rc-lg-bt" >已投满</a>');
        } else if (allowtime == "1") {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled rc-lg-bt">查看详情</a>');
        } else if (allowtime == "2") {
            return new Handlebars.SafeString('<a class="btn-lg btn-disabled rc-lg-bt">即将开始</a>');
        } else {
            return new Handlebars.SafeString('<a class="btn-lg btn-blue rc-lg-bt" href="auth/bondConfirm.html?id=' + id + '">我要支持</a>');
        }
    }
});


Handlebars.registerHelper("remaininginvest", function(number1, number2) { // 减法
        var item = parseFloat(number1, 10) - parseFloat(number2, 10);
        if (item >= 10000) {
            var temp = parseFloat(item) / 10000.00;
            if (parseInt(temp) == temp) {
                return parseInt(temp)+"万";
            } else {
                return temp.toFixed(2) +"万" ;
            }
        } else {
            if (parseInt(item) == item) {
                return parseInt(item);
            } else {
                return parseInt(item).toFixed(2);
            }
        }
    });
Handlebars.registerHelper("fixMoneyremaininginvest", function(number1, number2) { // 减法
    var s = parseFloat(number1, 10) - parseFloat(number2, 10);
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
});

// 返回产品状态（用于产品详情页-融资方的所有融资产品列表）
Handlebars.registerHelper("getLicaiStatus", function(checkstatus, status, hasinvestamount, borrowamount) {
    if ("0" == checkstatus) {
        return "项目审核中";
    } else if ("2" == checkstatus) {
        return "未通过审核";
    }
    if ("5" == status ) {
		if( parseInt(hasinvestamount) < parseInt(borrowamount) ){
			return "正在募集";
		}else {
			return "募集结束";
		}
    } else if ("4" == status) {
		if( parseInt(hasinvestamount) < parseInt(borrowamount) ){
			return "募集结束";
		}else {
			return "已投满";
		}
    } else if ("3" == status) {
        return "正在募集";
    } else if ("2" == status) {
        return "发起募集";
    } else if ("99" == status) {
        return "申请审核";
    } else if ("77" == status) {
        return "已下架";
    }
});
// 返回文件列表（用于产品详情页面）
Handlebars.registerHelper("getLicaiFile", function(ext, addr, name) {
    if (!(ext == "jpg" || ext == "jpeg" || ext == "gif" || ext == "png" || ext == "bmp")) {
        return new Handlebars.SafeString('<li>' + '<i class="iconfont">&#xe616;</i>' + '<a target="_blank" href="' + $.init_cfg.file_server + addr + '" title="' + name + '">' + name + '</a>' + '</li>');
    }
});
// 转让状态，返回按钮（用于首页）
Handlebars.registerHelper("getTransferButton", function(debtstatus, borrowid, appsheetserialno, id) {
    if (debtstatus == "8") { // 立即投资
        return new Handlebars.SafeString('<button class="btn-invest" onclick="document.location=\'kisp/auth/transferConfirm.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\'">立即投资</button>');
    } else if (debtstatus == '1') { // 审核中
        return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\'">审核中·查看详情</button>');
    } else if (debtstatus == '2') { // 竞拍中
        return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\'">竞拍中·查看详情</button>');
    } else if (debtstatus == '3') { // 已转让
        return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\'">已转让·查看详情</button>');
    } else if (debtstatus == '4') { // 竞拍失败
        return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\'">竞拍失败·查看详情</button>');
    } else if (debtstatus == '5') { // 撤销
        return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\'">撤销·查看详情</button>');
    } else if (debtstatus == '6') { // 审核失败
        return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\'">审核失败·查看详情</button>');
    } else if (debtstatus == '10') { // 转让冻结
        return new Handlebars.SafeString('<button class="btn-invest btn-disabled" onclick="document.location=\'kisp/transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\'">转让冻结·查看详情</button>');
    }
});
// 转让状态，返回按钮（用于转让列表页面）
Handlebars.registerHelper("getTransferButton2", function(debtstatus, borrowid, appsheetserialno, id) {
    if (debtstatus == "8") { // 立即投资
        return new Handlebars.SafeString('<a class="btn-lg btn-orange" href="transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '">投资</a>');
    } else if (debtstatus == '1') { // 审核中
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">审核中</a>');
    } else if (debtstatus == '2') { // 竞拍中
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">竞拍中</a>');
    } else if (debtstatus == '3') { // 已转让
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">已转让</a>');
    } else if (debtstatus == '4') { // 竞拍失败
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">竞拍失败</a>');
    } else if (debtstatus == '5') { // 撤销
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">撤销</a>');
    } else if (debtstatus == '6') { // 审核失败
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">审核失败</a>');
    } else if (debtstatus == '10') { // 转让冻结
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">转让冻结</a>');
    }else{
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">已过期</a>');
    }
});

// 根据产品状态，返回按钮（用于产品详情页面）
Handlebars.registerHelper("getTransferButton3", function(debtstatus, borrowid, appsheetserialno, id) {
	if (debtstatus == "8") { // 立即投资
        return new Handlebars.SafeString('<button class="btn-lg btn-orange" onclick="document.location=\'auth/transferConfirm.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '\';return false;">投资</a>');
    } else if (debtstatus == '1') { // 审核中
        return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">审核中</button>');
    } else if (debtstatus == '2') { // 竞拍中
        return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">竞拍中</button>');
    } else if (debtstatus == '3') { // 已转让
        return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">已转让</button>');
    } else if (debtstatus == '4') { // 竞拍失败
        return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">竞拍失败</button>');
    } else if (debtstatus == '5') { // 撤销
        return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">撤销</button>');
    } else if (debtstatus == '6') { // 审核失败
        return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">审核失败</button>');
    } else if (debtstatus == '10') { // 转让冻结
        return new Handlebars.SafeString('<button class="btn-lg btn-disabled" disabled="disabled">转让冻结</button>');
    }
});

// 转让状态，返回按钮（用于壹融通首页产品列表页面）
Handlebars.registerHelper("getTransferButton4", function(debtstatus, borrowid, appsheetserialno, id) {
    if (debtstatus == "8") { // 立即投资
        return new Handlebars.SafeString('<a class="btn-lg btn-orange fr" href="auth/transferConfirm.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '">投资</a>');
    } else if (debtstatus == '1') { // 审核中
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">审核中</a>');
    } else if (debtstatus == '2') { // 竞拍中
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">竞拍中</a>');
    } else if (debtstatus == '3') { // 已转让
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">已转让</a>');
    } else if (debtstatus == '4') { // 竞拍失败
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">竞拍失败</a>');
    } else if (debtstatus == '5') { // 撤销
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">撤销</a>');
    } else if (debtstatus == '6') { // 审核失败
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">审核失败</a>');
    } else if (debtstatus == '10') { // 转让冻结
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled fr">转让冻结</a>');
    }
});

// 转让状态，返回按钮（用于首页聚财页面）
Handlebars.registerHelper("getTransferButton_jucai", function(debtstatus, borrowid, appsheetserialno, id) {
    if (debtstatus == "8") { // 立即投资
        return new Handlebars.SafeString('<a class="btn-sm btn-orange" target="_blank" href="/kisp/transferDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '">投资</a>');
    } else if (debtstatus == '1') { // 审核中
        return new Handlebars.SafeString('<a class="btn-sm btn-disabled">审核中</a>');
    } else if (debtstatus == '2') { // 竞拍中
        return new Handlebars.SafeString('<a class="btn-sm btn-disabled">竞拍中</a>');
    } else if (debtstatus == '3') { // 已转让
        return new Handlebars.SafeString('<a class="btn-sm btn-disabled">已转让</a>');
    } else if (debtstatus == '4') { // 竞拍失败
        return new Handlebars.SafeString('<a class="btn-sm btn-disabled">竞拍失败</a>');
    } else if (debtstatus == '5') { // 撤销
        return new Handlebars.SafeString('<a class="btn-sm btn-disabled">撤销</a>');
    } else if (debtstatus == '6') { // 审核失败
        return new Handlebars.SafeString('<a class="btn-sm btn-disabled">审核失败</a>');
    } else if (debtstatus == '10') { // 转让冻结
        return new Handlebars.SafeString('<a class="btn-sm btn-disabled">转让冻结</a>');
    }
});

// 返回图片文件列表（用于产品详情页面）
Handlebars.registerHelper("getLicaiImgFile", function(ext, addr, name) {
    if (ext == "jpg" || ext == "jpeg" || ext == "gif" || ext == "png" || ext == "bmp") {
        return new Handlebars.SafeString('<div class="image-set">' + '<a class="example-image-link" href="' + $.init_cfg.file_server + addr + '" data-lightbox="example-set" data-title="图片标题">' + '<img class="example-image" src="' + $.init_cfg.file_server + addr + '" alt="">' + '</a>' + '</div>');
    }
});
//根据债权项目状态，返回
Handlebars.registerHelper("projectStatus", function(checkstatus, status) {
    if ("0" == checkstatus) {
        return new Handlebars.SafeString('<span>产品上线审核中</span>');
    } else if ("2" == checkstatus) {
        return new Handlebars.SafeString('<span>未通过审核</span>');
    }else if ("5" == status || "4" == status) {
        return new Handlebars.SafeString('<span>完成</span>');
    } else if ("3" == status) {
        return new Handlebars.SafeString('<span>融资中</span>');
    } else if ("2" == status) {
        return new Handlebars.SafeString('<a class="btn-md btn-indigo btn-adjust btn_beginflow"  target="_blank"  kifp-action="bpm">发起募集</a>');
    } else if ("99" == status) {
        return new Handlebars.SafeString('<span>待上线审核</span>');
    } else if ("77" == status) {
        return new Handlebars.SafeString('<span>已下架</span>');
    }
});
//根据债权项目还款状态，返回操作1(用于还款中页面)
Handlebars.registerHelper("repayStatus1", function(checkstatus, status, hasfrozenstatus, repaystatus, proid, proname, advanced_repaydate, paymentmode) {
    if ((checkstatus != "") && (checkstatus == "0") && (status != "") && (status == "0")) {
        return new Handlebars.SafeString('<span>提前还款审核中</span>');
    } else if ((checkstatus != "") && (checkstatus == "1") && (status != "") && (status == "1") && (hasfrozenstatus != "") && (hasfrozenstatus == "2") && (repaystatus != "") && (repaystatus == "1")) {
        return new Handlebars.SafeString('<span>提前还款资金冻结</span>');
    } else if((checkstatus != "") && (checkstatus == "1") && (status != "") && (status == "1") && (hasfrozenstatus != "") && (hasfrozenstatus == "3") && (repaystatus != "") && (repaystatus == "1")){
        return new Handlebars.SafeString('<span>提前还款中</span>');
    }else if ((checkstatus != "") && (checkstatus == "1") && (status != "") && (status == "1")) {
        return new Handlebars.SafeString('<a class="plan_advance btn-md btn-indigo btn-adjust" href="../../kasp/auth/account_financing_product_repay_plan_advance.html?type=advance&proid=' + proid + '&proname=' + proname + '&advanced_repaydate=' + advanced_repaydate + '">提前还款</a>');
    } else {
        return new Handlebars.SafeString('<a class="btn-md btn-indigo btn-adjust" href="../../kasp/auth/account_financing_product_repay_plan_apply.html?type=apply&proid=' + proid + '&proname=' + proname+'">申请提前还款</a>');
    }
});
//根据债权项目还款状态，返回操作2(用于还款中页面)
Handlebars.registerHelper("repayStatus2", function(checkstatus, status, proid, startdate1, enddate1) {
    if ((checkstatus != "") && (checkstatus == "1") && (status != "") && (status == "1")) {
        return new Handlebars.SafeString('<a disabled="disabled">已申请提前还款</a>');
    } else {
        return new Handlebars.SafeString('<a class="btn-md btn-indigo btn-adjust" href="../../kasp/auth/account_financing_product_repay_plan.html?type=repayplandetail&proid=' + proid + '">正常还款</a>');
    }
});
//根据债权项目还款状态，返回(用于正常还款页面)
Handlebars.registerHelper("normalPay", function(repaystatus, hasfrozenstatus, repaystatusflag, repayamount, borrowid, repaydate) {
    if (repaystatus != "" && repaystatus == "2") {
        return new Handlebars.SafeString('<span>已还款</span>');
    } else {
        if (hasfrozenstatus != "" && hasfrozenstatus == "2") {
            return new Handlebars.SafeString('<span">资金冻结</span>');
        } else if (hasfrozenstatus != "" && hasfrozenstatus == "1") {
            return new Handlebars.SafeString('<span>资金未冻结</span>');
        } else {
            if (repaystatusflag != "") {
                return new Handlebars.SafeString('<a class="btn-md btn-indigo btn-adjust" repay="repay" frozenmoney="' + repayamount + '" borrowid="' + borrowid + '" repaydate="' + repaydate + '">还款</a>');
            } else {
                return new Handlebars.SafeString('<span>待还款</span>');
            }
        }
    }
});
//根据融资申请需求状态，显示是否有模板提供下载(用于融资申请页面)
Handlebars.registerHelper("orDownload",function(cat_id,options){
	if(cat_id == "J008" || cat_id == "J010"){
         return options.fn(this);
    } else {
		return options.inverse(this);
    }
})
//根据融资申请状态,返回结果
Handlebars.registerHelper("financingApplyStatus",function(status){
    if(status == "0"){
        return new Handlebars.SafeString('<span>审核中</span>');
    }else if(status == "1"){
        return new Handlebars.SafeString('<span>审核通过</span>');
    }else if(status == "2"){
        return new Handlebars.SafeString('<span>审核未通过</span>');
    }//else if(status == "99"){
      //  return new Handlebars.SafeString('<a name="apply_financing" class="btn-md btn-indigo btn-adjust btn_beginflow"  kifp-action="bpm">申请审核</a>');
    //}
})
// 获取银行图片路径（用于提交转让订单页面）
Handlebars.registerHelper("getBankPath", function(bankPath) {
    var path = bankPath.split("/");
    return path[path.length - 1];
});
// 日期时间20151011120712转成2015-10-11 12:07:12(用户融资列表查询)
Handlebars.registerHelper("changeDate",function(apply_date){
    if(apply_date.length < 13){
        return apply_date;
    }
    var date = apply_date.substring(0, 4) + "-" + apply_date.substring(4, 6) + "-" + apply_date.substring(6, 8);
    var time = apply_date.substring(8,10) + ":" + apply_date.substring(10,12) + ":" + apply_date.substring(12,14);
    return new Handlebars.SafeString(date + '</br>' + time);
});
// 日期20150716转成2015-07-16（用于订单支付页面）
Handlebars.registerHelper("toDate", function(date) {
    return date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
});
// 截取日期2015-07-16 21:32:19 的年月日 2015-07-16
Handlebars.registerHelper("toDateYMD", function(date) {
    return date.substring(0, 10);
});
// 日期20150716转成2015年07月16日（壹融通页面）
Handlebars.registerHelper("toDate2", function(date) {
	if(!date){
		return  "----年" + "--月" + "--日";
	}
    if(date.length == 8){
        return date.substring(0, 4) + "年" + date.substring(4, 6) + "月" + date.substring(6, 8)+"日";
    }else if(date.length == 6){
        return date.substring(0, 4) + "年" + date.substring(4, 6) + "月";
    }
});
// 时间213219转成21:32:19（用于订单支付页面）
Handlebars.registerHelper("toTime", function(time) {
    return time.substring(0, 2) + ":" + time.substring(2, 4) + ":" + time.substring(4, 6);
});
// 获取上传表单唯一ID(用于申请成为发起人资料审核)
Handlebars.registerHelper("getFormId", function() {
        return new Date().getTime() + "" + Math.floor(Math.random() * 100000);
    })
    /** =================================== 用于债权 end =================================== */
    /** =================================== 用于账户中心 start =================================== */
    //我的理财页面已持有列表状态列
Handlebars.registerHelper("borrowStatus", function(checktag, transferlimit) {
    if ("1" == checktag) {
        return new Handlebars.SafeString('募集中');
    } else if ("2" == checktag) {
        return new Handlebars.SafeString('禁止转让');
    } else if ("3" == checktag) {
        return new Handlebars.SafeString('待成交确认');
    } else if ("4" == checktag) {
        return new Handlebars.SafeString('转让中');
    } else if ("5" == checktag) {
        return new Handlebars.SafeString('T+' + transferlimit + '转让');
    } else if ("6" == checktag) {
        return new Handlebars.SafeString('锁定中');
    } else if ("7" == checktag) {
        return new Handlebars.SafeString('可转让');
    } else if ("8" == checktag) {
        return new Handlebars.SafeString('已发布');
    } else if ("9" == checktag) {
        return new Handlebars.SafeString('一口价转让');
    } else if ("10" == checktag) {
        return new Handlebars.SafeString('转让冻结');
    } else if ("11" == checktag) {
        return new Handlebars.SafeString('竞拍已发布');
    } else if ("12" == checktag) {
        return new Handlebars.SafeString('竞拍已转让');
    }
});
//我的理财页面已持有列表操作列
Handlebars.registerHelper("holdenBorrowOperation", function(checktag, israise, newcheck, transferlimit) {
    if (checktag == "1") {
        return new Handlebars.SafeString('<span>募集中</span>');
    } else if (checktag == "2") {
        return new Handlebars.SafeString('<span>禁止转让</span>');
    } else if (checktag == "3") {
        return new Handlebars.SafeString('<span">待成交确认</span>');
    } else if (checktag == "4") {
        return new Handlebars.SafeString('<span>转让确认中</span>');
    } else if (checktag == "5") {
        return new Handlebars.SafeString('<span">t+' + transferlimit + '转让</span>');
    } else if (checktag == "6" && israise == "1" && newcheck == "1") {
        return new Handlebars.SafeString('<span">锁定期</span>');
    } else if (checktag == "7") {
        return new Handlebars.SafeString('<button  id="judgebutton" class="btn-sm btn-indigo btn-adjust">转让</button>');
    } else if (checktag == "8") {
        return new Handlebars.SafeString('<button  id="cancelbutton" class="btn-sm btn-indigo btn-adjust">撤单</button>');
    } else if (checktag == "9") {
        return new Handlebars.SafeString('<span>已转让</span>');
    } else if (checktag == "10") {
        return new Handlebars.SafeString('<span>转让冻结</span>');
    } else if (checktag == "11") {
        return new Handlebars.SafeString('<span>竞拍已发布</span>');
    } else if (checktag == "12"){
        return new Handlebars.SafeString('<span>竞拍已转让</span>');
    }
});
//我的理财页面我的订单列表操作列
Handlebars.registerHelper("myOrderOperation", function(paymethod, dealtype, sbbh, loseefficacy, ajs) {
    if (paymethod == "0") {
        if (dealtype == "10002") {
            return new Handlebars.SafeString('<td><span>未支付</span></td><td><a class="btn-md btn-indigo btn-adjust J_paybutton" id="order_10002_' + sbbh + '" target="_blank" kd-value="' + '" href="/kisp/auth/orderPay.html?orderno=' + sbbh + '" title="订单到' + loseefficacy + '将失效,自动取消订单">支付</a><a class="btn-md btn-grey btn-adjust" href="javascript:void(0);" id="J_cancelbutton1" class="linkButton lasttime" surplusTime="' + ajs + '" b-value="' + sbbh + '" >取消</a></td>');
        } else if(dealtype=="10003"){
            return new Handlebars.SafeString('<td><span>未支付</span></td><td><a class="btn-md btn-indigo btn-adjust J_paybutton" id="order_10003_' + sbbh + '" kd-value="' + order.sbbh + '" href="/kisp/auth/orderPay.html?orderno=' + sbbh + '">支付</a><a class="btn-md btn-grey btn-adjust" id="J_cancelbutton2" class="linkButton losetime" surplusTime="' + ajs + '" t-value="' + sbbh + '" >取消</a></td>');
        }
    } else if (paymethod == "2") {
        return new Handlebars.SafeString('<td><span>已支付<span></td><td><span>完成</span></td>');
    } else if (paymethod == "3"){
        return new Handlebars.SafeString('<td>未支付</td><td><span>已取消</span></td>');
    }
});
/** =================================== 用于账户中心 end =================================== */
//判断input radio 状态
Handlebars.registerHelper("isChecked", function(value, n) {
    if (value === n) {
        return "checked";
    } else {
        return "";
    }
});
//判断selecte 状态
Handlebars.registerHelper("isSelected", function(value, n) {
    if (value === n) {
        return "selected";
    } else {
        return "";
    }
});
//字节转换为Mbit
Handlebars.registerHelper("bTokb", function(item) {
    return (item / 1024).toFixed(1) + "kb";
});
//万元转换成元
Handlebars.registerHelper("conversionRMB", function(type, item) {
    var result = item;
    if (item) {
        if(!isNaN(item)){
            switch (type) {
                case "w-y": //万换元
                    result = (parseFloat(item) * 10000).toLocaleString();
                    break
                case "y-w":
                    result = (parseFloat(item) / 10000).toLocaleString();
                    break
            }
        }
    }
    return result
});
//upload list
Handlebars.registerHelper("filelist", function(items) {
    var items = items.split("?");
    var out = "";
    for (var i = 0, l = items.length; i < l; i++) {
        out = out + "<li><a href='" + fileserver + items[i] + "' target='blank'>" + items[i] + "</a><a style='margin-left:50px' href='javascript:;' class='del'>X</a></li>";
    };
    return new Handlebars.SafeString(out)
});
//格式化金额
Handlebars.registerHelper("fixMoney", function(s) {
        if (s == "" || s == null) {
            return ""
        } else {
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            t = "";
            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        }
    })
    //格式化金额
Handlebars.registerHelper("fixMoneyInt", function(s) {
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if (r == '00') {
            return t.split("").reverse().join("");
        } else {
            return t.split("").reverse().join("") + "." + r;
        }
    });
    /**=====kasp=====**/
    //账户类型
Handlebars.registerHelper("countType", function(items) {
    var typeName = "游客";
    if (items == "1") {
        typeName = "机构用户";
    } else if (items == "0") {
        typeName = "个人账户";
    }
    return typeName;
});
//用户认证
Handlebars.registerHelper("isIdentity", function(items) {
    var status = ""
    if (items == "0" || items == "1") {
        status = "_active";
    };
    return status;
});
Handlebars.registerHelper("ifIdentity", function(items, options) {
    if (items == "0" || items == "1") {
        return options.fn(this)
    } else {
        return options.inverse(this);
    }
});
//安全问题认证
Handlebars.registerHelper("isSecurity", function(items) {
    var status = ""
    if (items == "1") {
        status = "_active";
    };
    return status;
});
//判断账户是三方存管or三方支付
Handlebars.registerHelper("payEqual", function(v1, v2, options) { //判断是否相等
    var v1 = v1.substring(4);
    if (v1 == v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
//银行账号处理（用于银行账户管理页面）
Handlebars.registerHelper("bankAccountHandle", function(items) { //判断是否相等
    var len = items.length;
    if (len > 10) {
        return items.replace(items.substring(3, len - 4), "*** ****** ***");
    } else {
        return items;
    }
});
//隐藏字段处理
Handlebars.registerHelper("replaceString",function(s,n){
    if(s==null||s==""||s==undefined){
        return s="";
    }else{
        var l = s.length;
        var r="*",j="";
        for (var i = l-2*n; i > 0; i--) {
            j = r.concat(j);
        };
        return s= s.replace(s.substr(n,l-2*n),j);
    }
})
//银行图片路径处理
Handlebars.registerHelper("bankLogoRoute", function(items) { //判断是否相等
    var banklogo = items.replace("statics/common/images/bank", "images/banks");
    return banklogo;
});
//关于我们图片路径处理
Handlebars.registerHelper("replaceFileserver",function(items){
    if(items){
        var newFileserver = items.replace(/http-kifp-fileserver/g,"/fileserver");
        return newFileserver;
    }else{
        return "<p>暂无内容</p>";
    }
})
//风险测评
Handlebars.registerHelper("riskRank", function(item) {
    var result = "";
    switch (item) {
        case "01":
            result = "保守型";
            break;
        case "02":
            result = "稳健型";
            break;
        case "03":
            result = "积极成长型";
            break;
        case "04":
            result = "激进型";
    }
    return result;
});
//选择账户类型
Handlebars.registerHelper("getIndividualorinstitution", function(items) { //判断是否相等
   if("1" == items){
        return new Handlebars.SafeString('<a class="organized" href="addCard_tp_organ.html">机构账户</a>');
   }else if("0" == items){
        return new Handlebars.SafeString('<a class="personal" href="addCard_tp_personal.html">个人账户</a>');
   }else{
        return new Handlebars.SafeString('<a class="personal" href="addCard_tp_personal.html">个人账户</a><a class="organized" href="addCard_tp_organ.html">机构账户</a>');
   }
});
//交易状态判断
Handlebars.registerHelper("btnStatus",function(items){
    if (items == "1") {
        return "status-success"
    }else if (items== "4") {
        return "status-remind"
    }else{
        return ""
    }
})
//订单详情页面订单支付金额
Handlebars.registerHelper("needpay",function(smrjg,paymoney){
    var result = "";
    if(smrjg == "" || smrjg == null){
        result = "0.00";
    }else{
        if(paymoney == "" || paymoney == null){
            result = smrjg;
        }else{
            result = smrjg -paymoney;
        }
    }
    return result;
});
/**=====kasp end=====**/
/**=====kfsp start=====**/
Handlebars.registerHelper("isTimes", function(v1, v2, options) { //判断v1是否是v2的整数倍
    v1 = parseInt(v1) + 1;
    v2 = parseInt(v2);
    if (v1 % v2 == 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
/**=====kfsp end=====**/

//壹融通转让详情页面转让状态
Handlebars.registerHelper("getstatusvalue", function(item) {
    var result = "";
	item = item.toString();
    switch (item) {
        case "1":
            result = "审核中";
            break;
        case "2":
            result = "竞拍中";
            break;
        case "3":
            result = "已转让";
            break;
        case "4":
            result = "竞拍失败";
            break;
        case "5":
            result = "撤销";
            break;
        case "6":
            result = "审核失败";
            break;
        case "7":
            result = "提前还款";
            break;
        case "8":
            result = "转让中";
            break;
        case "9":
            result = "已过期";
            break;
        case "10":
            result = "转让冻结";
            break;
    }
    return result;
});

/**临时help方式，演示专用，正式环境可删除**/
Handlebars.registerHelper("getAcutionButton2", function(debtstatus, borrowid, appsheetserialno, id) {
    if (debtstatus == "8") { // 立即投资
        return new Handlebars.SafeString('<a class="btn-lg btn-orange" href="auctionDetail.html?borrowid=' + borrowid + '&appsheetserialno=' + appsheetserialno + '&id=' + id + '">资产受让</a>');
    } else if (debtstatus == '1' ||debtstatus == '2') { // 审核中
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">受让登记中</a>');
    } else if (debtstatus == '3') { // 已转让
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">成交</a>');
    } else if (debtstatus == '6') { // 审核失败
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">审核失败</a>');
    } else if (debtstatus == '10') { // 转让冻结
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">冻结</a>');
    }else{
        return new Handlebars.SafeString('<a class="btn-lg btn-disabled">出让失败</a>');
    }
});
//截取银行卡号（用于充值）
Handlebars.registerHelper("interceptCard",function(cardNum){
    var len = cardNum.length;
    return cardNum.substring(len-4,len);
});

/**end**/
