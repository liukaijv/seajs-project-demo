define(function(require, exports, module) {
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    var showContent = {}; 
    require('base/kjax.des');//加密js
    require('common/layer.min');//加密js
    showContent._load = function() {
        getMyFinancial();//直接调用业务方法
        getMyOrder();//直接调用业务方法
        getMyTransfer();//直接调用业务方法
    };
    //我的理财
    var getMyFinancial = function(page,pageSize){
        _ajax_data._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_query_kfat_bal_detail",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "pageNumber":page||'1',
                    "pageSize":pageSize||"5"
                }
            },
            callback:function(data){
                //绑定事件
                $('.J_redeem').on('click',redeem);
            },
            selector: "#J_myFinancial",//html中提供的id
            template: "kfat/usercenter/myFinancial.handlebars"//模板
        });
    }
    //我的订单
    var getMyOrder = function(page,pageSize){
        _ajax_data._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_order_base_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    // "businesscode":'049024',
                    "direction":'0',
                    "pageNumber":page||1,
                    "pageSize":pageSize||5
                }
            },
            callback:function(data){
                //绑定事件
                $('.J_payBtn').on('click',payOrder);
                $('.J_cancel').on('click',cancelOrder);
            },
            selector: "#J_myOrder",//html中提供的id
            template: "kfat/usercenter/myOrder.handlebars"//模板
        });
    }
    //我的转让
    var getMyTransfer = function(page,pageSize){
        _ajax_data._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_order_base_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "businesscode":'049003',
                    "pageNumber":page||'1',
                    "pageSize":pageSize||"5"
                }
            },
            callback:function(data){
                //绑定事件
                $('.J_cancelTransfer').on('click',cancelTransfer);
            },
            selector: "#J_myTransfer",//html中提供的id
            template: "kfat/usercenter/myTransfer.handlebars"//模板
        });
    }
    //订单支付
    function payOrder(){
        //跳转页面到订单支付
        window.location.href = '/usercenter/create_order.html?appsheetserialno='+$(this).attr('appsheetserialno');
    }
    //订单取消
    function cancelOrder(){
        //转让购买的businesscode为049002，直接认购的不为这个值，以此判断是直接购买的还是转让购买的
        var businesscode = $(this).attr('businesscode');
        var param = {};
        param.appsheetserialno = $(this).attr('appsheetserialno');
        param.detailserialno = $(this).attr('detailserialno');
        if(businesscode == '049002'){
            $.kd.kdConfirm('确定取消转让认购订单吗?',function(){
                $.kingdom.doKoauthAPI('kingdom.kfat.set_cancel_trans_apply_order','V2.0',param,cancelOrderCallback);
            });
        }else{
            $.kd.kdConfirm('确定取消直接认购订单吗?',function(){
                $.kingdom.doKoauthAPI('kingdom.kfat.set_cancel_apply_order','V2.0',param,cancelOrderCallback);
            });
        }
        
    }
    //转让取消
    function cancelTransfer(){
        var param = {};
        param.appsheetserialno = $(this).attr('appsheetserialno');
        param.reason = '';
        $.kd.kdConfirm('确定撤销转让吗?',function(){
            $.kingdom.doKoauthAPI('kingdom.kfat.set_cancel_trans_publish','V2.0',param,cancelOrderCallback);
        });
    }
    //赎回
    function redeem(){
        var param = {};
        param.detailserialno = $(this).attr('appsheetserialno');
        param.fundcode = $(this).attr('fundcode');
        param.applicationamount = $(this).attr('applicationamount');
        param.customerno = '467';
        param.transactionaccountid = '0000046701';
        // param.password = $.des.getDes('111111', 'kingdom');
        param.password = '111111';
        $.kd.kdConfirm('确定赎回该理财产品吗?',function(){
            $.kingdom.doKoauthAPI('kingdom.kfat.set_add_redeem_apply','V2.0',param,cancelOrderCallback);
        });
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
    //弹出赎回输入框
    var redeemModal;
    function showRedeemModal(fundname){
        var fundname = $(this).attr('fundname');
        showRedeemModal(fundname);
        $('#J_redeemFundname').val(fundname);
        redeemModal=$.layer({type : 1,title : "赎回信息",border : false,area : ['auto','auto'],
        bgcolor: '#fff',page : {dom : '#J_redeemModal'}});
    }
    //绑定赎回
    $('#J_confirmRedeem').on('click',redeem);
    module.exports = showContent;
})