define(function(require, exports, module) {
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    var showContent = {}; 
    showContent._load = function(fundcode) {
        getOutInfo(fundcode);//直接调用业务方法
        getFileInfo(fundcode);//直接调用业务方法
    };
    //扩展信息
    var getOutInfo = function(fundcode,page){
        _ajax_data._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_fundext_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "fundcode":fundcode,
                    "page":page||'1',
                    "pageSize":"10"
                }
            },
            selector: "#J_outInfo",//html中提供的id
            template: "kfat/financial/bondsdetail_outInfo.handlebars"//模板
        });
    }
    //相关文件
    var getFileInfo = function(fundcode,page){
        _ajax_data._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_fundfile_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "fundcode":fundcode,
                    "page":page||'1',
                    "pageSize":"10"
                }
            },
            selector: "#J_fileInfo",//html中提供的id
            template: "kfat/financial/bondsdetail_fileInfo.handlebars"//模板
        });
    }
    //订单支付
    function payOrder(){
        //跳转页面到订单支付
        window.location.href = '/usercenter/create_order.html?appsheetserialno='+$(this).attr('appsheetserialno');
    }
    //订单取消
    function cancelOrder(){
        var param = {};
        param.appsheetserialno = $(this).attr('appsheetserialno');
        $.kingdom.doKoauthAPI('kingdom.kfat.set_cancel_apply_order','V2.0',param,cancelOrderCallback);
    }
    function cancelOrderCallback(data){
        var data = data.kdjson;
        if(data.flag == '1'){
            $.kd.kdAlert(data.msg, function() {
                window.location.reload();
            },'提示');
        }else{
            $.kd.kdAlert(data.msg, function() {},'提示');
        }
    }
    module.exports = showContent;
})