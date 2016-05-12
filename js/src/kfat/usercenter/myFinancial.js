define(function(require, exports, module) {
    var preload = require("common/preload");
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    var _myFinancialShow = require("kfat/usercenter/myFinancialShow");
    $(function() {
        //参数
        var param = {};
        //加载账户信息
        $.kingdom.doKoauthAPI('kingdom.kfat.get_query_kfat_bal_fund','V2.0',param,captitalCallback);
        _myFinancialShow._load();//加载理财数据
      //tab控制
      $('.tab-hd li').on('click', function() {
        var that = $(this),
          index = that.index();
        toggleCon = that.parents('.tab-hd').siblings('.tab-bd');
        that.addClass('active').siblings('li').removeClass('active');
        toggleCon.children('.tab-item').eq(index).show().siblings('.tab-item').hide();
        return false;
      });
    });
    var captitalCallback = function(data){
      data = data.kdjson;
      if(data.items){
        data = data.items;
        //预期收益（元）
        $('#J_totalinterest').text($.kingdom.fixMoney(data[0].totalinterest, 2));
        //我的理财金额（元）
        $('#J_totalprincipal').text($.kingdom.fixMoney(data[0].totalprincipal, 2));
      }
    }
})