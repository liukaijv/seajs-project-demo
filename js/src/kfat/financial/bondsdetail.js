define(function(require, exports, module) {
    var self = require("common/ajax_data");//引入ajax_data.js
    require("common/preload");//预加载 
    var _loadData = require("kfat/financial/bondsdetail_loadInfo");//加载数据 
    var fundcode = $.kingdom.getUrlParameter('id');//获取参数id
    //由于get_funddetail_info加载了两个handlebar，所以在第二次时，不再调用按钮绑定事件
    var flag = false;
	var getProductList = function(page,pageSize){
        self._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_funddetail_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "fundcode":fundcode,
                    "page":page,
                    "pageSize":pageSize||"10"
                }
            },
            callback: function(data){
                if(!flag){
                    //tab控制
                    $('.tab-hd li').on('click', function() {
                    var that = $(this),
                      index = that.index();
                    toggleCon = that.parents('.tab-hd').siblings('.tab-bd');
                    that.addClass('active').siblings('li').removeClass('active');
                    toggleCon.children('.tab-item').eq(index).show().siblings('.tab-item').hide();
                    return false;
                    });
                    if(!isNaN(data[0].mintendtenderedsum)){
                        $('#J_amount').val(data[0].mintendtenderedsum);
                    }
                    //未登录显示登陆提示，登陆则显示投资金额输入框
                    $.kingdom.getLoginName(function(data) {
                        var data = data.kdjson;
                        if(data.flag == '1'){
                            $('#J_login').addClass('hide');
                            $('#J_invest').removeClass('hide');
                        }
                        //绑定投资方法
                        $('#J_dosubmit').on('click',doSubmit);
                    });
                    _loadData._load(fundcode);
                    flag = true;
                }
            },
            selector: "#J_bondsdetail,#J_baseInfo",//html中提供的id
            template: "kfat/financial/bondsdetail.handlebars,kfat/financial/bondsdetail_baseInfo.handlebars"//模板
        });
    };
    //立即投资方法
    var doSubmit = function(){
        var applicationamount = $('#J_amount').val();
        if(applicationamount.length == 0){
            $.kd.kdMsg("请输入投资金额");
            return;
        }
        if(isNaN(applicationamount) && parseFloat(applicationamount) < 0){
            $.kd.kdMsg("请输入正确的投资金额");
            return;
        }
        var param = {fundcode:fundcode,applicationamount:applicationamount};
        $.kingdom.doKoauthAPI('kingdom.kfat.set_create_apply_order','V2.0',param,investCallback);
    }
    var investCallback = function(data){
        var data = data.kdjson;
        if(data.flag == '1'){
            $.kd.kdAlert('新增订单成功', function() {
                window.location.href = '/usercenter/myFinancial.html';
            },'提示');
        }else{
            $.kd.kdAlert(data.msg, function() {},'提示');
        }
    }
    $(function() {
      getProductList();
    });
	
})