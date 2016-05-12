define(function(require, exports, module) {
    var preload = require("common/preload");
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    require("common/jquery-ui.custom.min");//引入ajax_data.js
    $(function() {
      //资金流水
      _ajax_data._seajs_handlebars_ajax_action({
          sendData: {
              "apiname": "kingdom.kfat.get_businesscode_capital_chg",//接口名称
              "version": "V2.0",
              "paramsMap": {
                  "businesscode":'049008',
                  "begindate":'20160101',
                  "enddate":'20161231',
                  "page":'1',
                  "pageSize":"10"
              }
          },
          selector: "#J_capital_cfg",//html中提供的id
          template: "kfat/usercenter/capital_cfg.handlebars"//模板
      });
      initDate();
    });

    //用第三方日期控件 以便兼容ie
    function initDate(){
      $.datepicker.regional['zh-CN'] = {  
          closeText: '关闭',  
          prevText: '<上月',  
          nextText: '下月>',  
          currentText: '今天',  
          monthNames: ['一月','二月','三月','四月','五月','六月',  
          '七月','八月','九月','十月','十一月','十二月'],  
          monthNamesShort: ['一','二','三','四','五','六',  
          '七','八','九','十','十一','十二'],  
          dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
          dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
          dayNamesMin: ['日','一','二','三','四','五','六'],  
          weekHeader: '周',  
          dateFormat: 'yy-mm-dd',  
          firstDay: 1,  
          isRTL: false,  
          showMonthAfterYear: true,  
          yearSuffix: '年'
      };  
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
        $("input[type='kddate']").datepicker({
          dateFormat: 'yy-mm-dd',
          changeMonth: true,
          changeYear: true,
          editabled: false,
          showButtonPanel: true,
          onClose: function(selectedDate) {
            // setrepayment(selectedDate);
          }
        });
    }
})