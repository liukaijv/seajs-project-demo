define(function(require, exports, module) {
    var self = require("common/ajax_data");//引入ajax_data.js
    require("common/preload");//预加载 
	require('common/kd.tools.validate');//验证框架
    require('base/kjax.des');//加密js
	require('common/kd.ui.plugin');
    require('common/validform.min');
    require("css/kd.ui.plugin.css");
    var transferValid = '';
    var baseUtil = require('kfat/public/baseUtil/baseUtil');//基本工具js
    var appsheetserialno = $.kingdom.getUrlParameter('appsheetserialno');//获取参数id
    var detailserialno = $.kingdom.getUrlParameter('detailserialno');//获取参数id
    //加载登陆客户的资金账户信息
    baseUtil._get_cust_deposit_account();
	//加载转让详情
    var gettransferInfo = function(page,pageSize){
        self._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_order_base_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "appsheetserialno":appsheetserialno,
                    "page":page||"1",
                    "pageSize":pageSize||"10"
                }
            },
            callback:function(data){
                var custAccountInfo = baseUtil.custAccountInfo;
                for(var i = 0;i < custAccountInfo.length;i++){
                    $('#J_repaycapitalaccount').append($('<option></option>').val(custAccountInfo[i].bankaccount).text(custAccountInfo[i].depositaccount).attr('depositaccount',custAccountInfo[i].depositaccount).attr('capitalaccount',custAccountInfo[i].capitalaccount));
                }
                transferValid = $("#J_addTransferForm").kdValidform();
                //绑定转让按钮事件
                $('#J_doTransfer').on('click',doTransfer);
            },
            selector: "#J_transfer_detail",//html中提供的id
            template: "kfat/usercenter/transfer_detail.handlebars"//模板
        });
    }();
    //执行转让
	var doTransfer = function(data){
        //表单验证
        if (!(transferValid.check())) {
          return;
        }
        var applicationvol = $('#J_applicationvol').val();//转让份额
        var repaycapitalaccount = $('#J_repaycapitalaccount').find('option:selected').attr('capitalaccount');//回款资金账户
        var depositaccount = $("#J_repaycapitalaccount").find("option:selected").attr('depositaccount');//回款支付账户
        var tradepassword = $.des.getDes($('#J_tradepassword').val(), 'kingdom');//回款支付账户
        var param = {};
        param.detailserialno = detailserialno;
        param.applicationvol = applicationvol;
        param.repaycapitalaccount = repaycapitalaccount;
        param.depositaccount = depositaccount;
        param.tradepassword = tradepassword;
        param.applicationamount = applicationvol;
        $.kingdom.doKoauthAPI('kingdom.kfat.set_trans_sale','V2.0',param,doTransferCallback);
    }
    //转让回掉
    var doTransferCallback = function(data){
        var data = data.kdjson;
        if(data.flag == '1'){
            $.kd.kdAlert(data.msg, function() {
                $.kingdom.getRedirect(function(directUrl) {
                    document.location = "/usercenter/financial_asset.html";
                })
            },'提示');
        }else{
            $.kd.kdAlert(data.msg, function() {},'提示');
        }
    }
})