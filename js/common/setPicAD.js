$(function() {
    //设置第一次登录cookie
    var isFirstLogin = getCookie("isFirstLogin");
    //alert(isFirstLogin)
    var top = 125;//($(window).height()-500)/2;
    var coverStyle = "filter:alpha(opacity=50);opacity:.5;position:fixed;top:0;right:0;bottom:0;left:0;background-color:#000;z-index:61";
    var frontStyle = "position:fixed;top:0;right:0;bottom:0;left:0;padding-top:"+top+"px;text-align:center;z-index:62";
    var emStyle = "position:absolute;margin-left:300px;top:"+top+"px;left:50%;"
    var closeStyle = "position:absolute;margin-left:260px;top:"+top+"px;left:50%;font-size:30px;color:#fff;"
    //var bbwhtml = "<div class='bbw_cover' style='" + coverStyle + "'></div><div class='bbw_front' style='" + frontStyle + "'><img src='/images/bbw_znq.jpg' width='900' height='500'/><em style='" + emStyle + "'><i>8</i>s后自动关闭</em><a href='javascript:;' class='i i-cross-circle bbw_close' style='" + closeStyle + "'></a></div>"
    var yrthtml='<div class="banner-bottom-fixed wow slideInUp"><button class="btn-close" type="button" title="关闭">关闭</button></div>';
    
    if (isFirstLogin == null && duringTheTime("2015/10/21 00:00:00","2025/10/30 23:59:59")) {
        $("body").append(yrthtml);
        //timeOutClose("8","em i")
        setCookie("isFirstLogin", "false", "d7");
    }
    $("body").on("click", ".btn-close", function() {
        closeAD();
    });
});
//设置cookie
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return (arr[2]);
    else return null;
}

function getsec(str) {
    //alert(str);
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

function closeAD() {
    $(".wow").fadeOut();
}

function timeOutClose(time, item) {//倒计时
    var n = time,
        temp = setInterval(function() {
            if (n == 0) {
                clearInterval(temp);
                closeAD();
            }
            if (n > 0) $(item).text(n--);
        }, 1000);
}
function duringTheTime(stime,etime){
	var StartTime = new Date(stime)
	var EndTime= new Date(etime); //截止时间 前端路上 http://www.51xuediannao.com/qd63/
    var NowTime = new Date();
    var t =(StartTime.getTime() <= NowTime.getTime() && NowTime.getTime() <=EndTime.getTime());
    return t;
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//setCookie("name","hayden","s20");