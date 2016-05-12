define(function(require, exports, module) {
    require("jquery/jquery_handlebars");
    require("common/handlebars_helper");
	require("base/base64.js");
	require("base/json2.js");
	require("base/md5.js");
    //require("/concatjs?/js/base/base64.js,/js/base/json2.js,/js/base/md5.js");
    var kfsp_kingt = kfsp_kingt || {};
    var datetime = new Date;
    //ajax 获取接口数据
    //kfsp_kingt._url = "kingt/kingt_indexadv!getIndexAdv.do";
    kfsp_kingt._ajax = function(url, sendData, callback, async) {
        var apiname = sendData.apiname;
        var version = sendData.version;
        var params = sendData.paramsMap || {};
        var param = $.kingdom.getAjaxParams(apiname, version, params);
        $.ajax({
            type: "post",
            url: url,
            dataType: 'json',
            data: param,
            async: (typeof(async) == "boolean") ? (async && true) : true
        }).done(function(data) {
            if (typeof data != "object") {
                data = eval("(" + data + ")")
            }
            var result = data.kdjson.items || data.kdjson;
            callback(result);
        });
    };
    //Handlebars 渲染数据
    kfsp_kingt._handlebars_ajax_action = function(options) {
        /*
		url:请求接口地址；
        apiType:接口类型api,api_cloud（默认api）;
		sendData:请求数据参数 格式：{xx:xx};
		domArray:handlebars指定加载区域dom选择器 格式：[selector,scriptID]
		count:返回请求数据条数（默认全展示）;
		async:是否异步，默认true异步
		callback:回调函数
		*/
        var settings = {
            url: "/api", //../kfsp/kingt/kingt_indexadv!getIndexAdv.do
            apiType:"api",
            sendData: {},
            domArray: [],
            count: 0,
            async: true,
            callback: function() {}
        };
        var options = options || {};
        $.extend(settings, options);
        var count = /^[1-9]\d*$/.test(settings.count) ? settings.count : 0; //判断受否为正整数
        var apiType = (settings.apiType == "api_cloud")?settings.apiType:"api";
        settings.url = "/"+apiType;
        this._ajax(settings.url, settings.sendData, function(obj) {

            var retData;
            if (count) {
                retData = $.grep(obj, function(n, i) {
                    return i < count
                });
            } else {
                retData = obj;
            };
            //指定handlebars脚本ID加载指定dom区域
            var a = settings.domArray[0],
                b = settings.domArray[1];
            $(a).handlebars($(b), retData);
            //数据加载成功后扩展方法
            settings.callback(retData);
        }, settings.async);
    };
    //Handlebars&seajs 模块化 渲染数据
    kfsp_kingt._seajs_handlebars_ajax_action = function(options) {
        /*
		url:请求接口地址；
        apiType:接口类型api,api_cloud（默认api）;
		sendData:请求数据参数 格式：{xx:xx};
		selector:handlebars指定加载区域dom选择器；(支持多个选择器加载)
		template:handlebars模板地址；kingt/js/template
		count:返回请求数据条数（默认全展示）;
		async:是否异步，默认true异步
		callback:回调函数
        method:数据插入方式html\append\before\after\prepend(默认html)
		*/
        var settings = {
            url: "/api",
            apiType:"api",
            sendData: {},
            selector: "",
            template: "",
            count: 0,
            async: true,
            method:"html",//append\before\after\prepend
            callback: function() {}
        };
        var options = options || {};
        $.extend(settings, options);
        var count = /^[1-9]\d*$/.test(settings.count) ? settings.count : 0; //判断受否为正整数
        var apiType = (settings.apiType == "api_cloud")?settings.apiType:"api";
        settings.url = "/"+apiType;
        this._ajax(settings.url, settings.sendData, function(obj) {

            var retData;
            if (count) {
                retData = $.grep(obj, function(n, i) {
                    return i < count
                });
            } else {
                retData = obj;
            };
            //指定handlebars脚本ID加载指定dom区域
            var selector = settings.selector.split(",");
            var template = settings.template.split(","); //
            var method = settings.method;
            $.each(selector, function(n, item) {
                var tpl = "/template/" + template[n];
                require.async(tpl, function(compiled) {
                    if(method == "html"){
                        $(item).html(compiled(retData));
                    };
                    if(method == "prepend"){
                        $(item).prepend(compiled(retData));
                    };
                    if(method == "append"){
                        $(item).append(compiled(retData));
                    };
                    if(method == "before"){
                        $(item).before(compiled(retData));
                    };
                    if(method == "after"){
                        $(item).after(compiled(retData));
                    };
                    //数据加载后扩展方法
                    settings.callback(retData);
                });
            });
        }, settings.async);
    };
    kfsp_kingt._getCustAuthorize = function(){
        var result =  false;
        $.kingdom.doKoauthAPISync("kingdom.kifp.get_cust_authorize", "v1.3", 
            {},function(data){
            if(data.kdjson.flag=="1"){
                result = data.kdjson;
            }else{
                //console.log(data.kdjson.msg)
                result = false;
            }
        });
        return result;
    }   
    module.exports = kfsp_kingt;
})