define(function(require, exports, module) {
    var preload = require("common/preload");
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    require("common/kd.ui.plugin");
    require("css/kd.ui.plugin.css");
    //银行卡信息
    var bankaccount;
    var _getBindBankinfo = function(){
        _ajax_data._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_cust_bindbankcards",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "page":"1",
                    "pageSize":"3"
                }
            },
            callback:function(data){
                //为全局变量银行卡信息赋值
                if(data.length > 0 && data[0].bankaccount){
                    bankaccount = data[0].bankaccount;
                    //绑定解绑银行卡事件
                    $('#J_unbindBtn').on('click',unbind);
                }else{
                    var errormsg = data.msg;
                    $.kd.kdAlert( errormsg);
                }
            },
            selector: "#J_bindBank",//html中提供的id
            template: "kfat/usercenter/bankmanage.handlebars"//模板
        });
    }();
    function unbind(data){
        window.location.href = '/usercenter/unbindBank.html?bankaccount='+bankaccount;
    }
})