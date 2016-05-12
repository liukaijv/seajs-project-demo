define(function(require, exports, module) {
    var preload = require("common/preload");
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    require("common/kd.ui.plugin");
    require("css/kd.ui.plugin.css");
    require("css/kd.tools.validate.css");
    require('common/kd.tools.validate');//验证框架
    require('base/kjax.des');//加密js
    var confimValid;
    var applicationamount;
    //获取url参数
    var appsheetserialno = $.kingdom.getUrlParameter('appsheetserialno');
    var _getOrderinfo = function(){
        //获取用户基本信息
        _ajax_data._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_order_base_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    appsheetserialno:appsheetserialno,
                    "page":"1",
                    "pageSize":"3"
                }
            },
            callback:function(data){
                if(data.length>0){
                    applicationamount = data[0].applicationamount;
                    //查询支付账户
                    $.kingdom.doKoauthAPI('kingdom.kfat.get_cust_deposit_account','V2.0',{},function(data) {
                        if(data.kdjson.flag == '1'){
                            data = data.kdjson.items;
                            if(data.length>0){
                                for(var i = 0;i < data.length;i++){
                                    $('#J_channelno').append($('<option></option>').val(data[i].depositaccount).text(data[i].bankaccount))
                                }
                            }else{
                                $.kd.kdAlert('暂无绑定的支付方式', function() {},'提示');
                            }
                        }else{
                            $.kd.kdAlert(data.kdjson.msg, function() {},'提示');
                        }
                    })
                }
                $('#J_confirm').on('click',createPay);
            },
            selector: "#J_orderDetail",//html中提供的id
            template: "kfat/usercenter/create_order.handlebars"//模板
        });
    }();
    //支付方法
    function createPay(){
        var param = {};
        var password = $('#J_transpwd').val();
        param.appsheetserialno = appsheetserialno;
        param.applicationamount = applicationamount;
        var depositaccount = $('#J_channelno').find('option:selected').val();
        param.paychannels = [];
        var paychannel = {};
        paychannel[depositaccount] = applicationamount;
        param.paychannels.push(paychannel);
        param.transpwd = $.des.getDes(password, 'kingdom')
        $.kingdom.doKoauthAPI('kingdom.kfat.set_app_pay','V2.0',param,function(data) {
            if(data.kdjson.flag == '1'){
                $.kd.kdAlert(data.kdjson.msg, function() {
                    window.location.href = '/usercenter/myFinancial.html';
                },'提示');
            }else{
                $.kd.kdAlert(data.kdjson.msg, function() {},'提示');
            }
        })
    }
})