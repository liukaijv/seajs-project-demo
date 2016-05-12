define(function(require, exports, module) {
  var _ajax_data = require("common/ajax_data");
  var showContent = {};
  showContent._load = function(obj) {
    //获取账户信息
    this._getAccountInfo();
    //加载银行卡信息
    this._getBankInfo();
  };
  //获取账户信息
  showContent._getAccountInfo = function() {
    _ajax_data._seajs_handlebars_ajax_action({
        sendData: {
            "apiname": "kingdom.kfat.get_query_kfat_bal_fund",//接口名称
            "version": "V2.0",
            "paramsMap": {}
        },
        callback: function(data){
          //获取用户名放入页面
          $.kingdom.getLoginName(function(data) {
            if (data.kdjson.flag == "1") {
              var items = data.kdjson.items;
              if(items.length > 0){
                $("#J_username").html(items[0].login_name);
              }
            }
          });
          //填充页面资金情况
          if(data.length > 0){
            //预期收益（元）
            $('#J_totalinterest').text($.kingdom.fixMoney(data[0].totalinterest, 2));
            //我的理财金额（元）
            $('#J_totalprincipal').text($.kingdom.fixMoney(data[0].totalprincipal, 2));
            //账户余额
            $('#J_realmount').text($.kingdom.fixMoney(data[0].realmount, 2));
          }
        },
        selector: "#J_account_figure",//html中提供的id
        template: "kfat/usercenter/account_figure.handlebars"//模板
    });
  };
  //加载银行卡信息
  showContent._getBankInfo = function() {
    //参数
    var param = {};
    $.kingdom.doKoauthAPI('kingdom.kfat.get_cust_bindbankcards','V2.0',param,_getBankInfoCallback);
  };
  //加载银行卡信息回调
  var _getBankInfoCallback = function(data){
    data = data.kdjson;
    if (data.flag == 1) {
      $('#J_bind_amount').text(data.len)
    }
  }
  module.exports = showContent;
})
