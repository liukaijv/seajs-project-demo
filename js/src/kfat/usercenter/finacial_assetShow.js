define(function(require, exports, module) {
  require("common/jquery.init_cfg");
  var kasp_jintou_index = require("common/ajax_data");
  var showContent = {};
  showContent._load = function(obj) {
    var self = kasp_jintou_index;
    //get_cust_info,v1.3 获取安全状态、账户类型
    //get_current_day_interest,v1.0 当日预期收益
    //get_sale_flow,v1.1 融资记录
    //get_capitalinfo_v2,v1.1 交易记录
    //get_accountinfo_new,v1.1 查询账户信息
    //get_cust_fms_info,v1.3 资金账户信息
    //get_cust_cap_info,v1.3 客户签约银行信息
    //get_cust_capacct_info,v1.0
    /* kingdom.kifp.get_current_day_interest 当日预期收益*/
    /* kingdom.kifp.get_cust_info 获取安全状态、账户类型*/
    //获取菜单
    // self._seajs_handlebars_ajax_action({
    //   sendData: {
    //     "apiname": "kingdom.kifp.get_cust_info",
    //     "version": "v1.3",
    //     "paramsMap": {
    //       "themeid": $.init_cfg.themeid
    //     }
    //   },
    //   count: "1",
    //   selector: "#J_account_asidenav",
    //   template: "kfat/usercenter/account_asidenav.handlebars",
    //   callback: function() {}
    // });
    //获取账户信息
    this._getAccountInfo();
    //产品推荐
    // this._hotProducts();
  };
  showContent._getAccountInfo = function() {
    /* kingdom.kifp.get_cust_fms_info,v1.0 资金账户信息*/
    var sendData = {
      "apiname": "kingdom.kfat.get_query_kfat_bal_fund",
      "version": "V2.0",
      "paramsMap": {}
    };
    kasp_jintou_index._ajax("/api", sendData, function(data) {
      var amount = 0.00; //余额
      var capCount = []; //资金账户
      var sfzf = true,
        sfcg = true;
      if (data.flag) {
        return false;
      }
      if(data[0].ismain != "" && data[0].ismain != undefined){
        $.each(data, function(n, item) {
          capCount[n] = item.capitalaccount;
          if (item.channelno == "200101" && sfzf) {
            amount = amount + parseFloat(item.enablebalance);
            sfzf = false;
          } else if (item.channelno.substring(4, 6) == "06" && sfcg) {
            amount = amount + parseFloat(item.enablebalance);
            sfcg = false;
          }
        });
      }
      //账户余额
      $("#J_bind_residuals").html($.kingdom.fixMoney(amount, 2));
      var accountNum = $.kingdom.uniqueArray(capCount).length;
      $("#J_bind_amount").html((accountNum == "" ? 0 : accountNum) + "个"); //资金账户
    });
  };

  module.exports = showContent;
})
