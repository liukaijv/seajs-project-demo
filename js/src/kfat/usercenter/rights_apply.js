define(function(require, exports, module) {
    var preload = require("common/preload");
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    require("common/jquery-ui.custom.min");//引入ajax_data.js
    //查询产品列表
    var qry = function(page,pageSize){
      _ajax_data._seajs_handlebars_ajax_action({
          sendData: {
              "apiname": "kingdom.kfat.get_fundbase_info",//接口名称
              "version": "V2.0",
              "paramsMap": {
                  "pageNumber":page||'1',
                  "pageSize":pageSize||"5"
              }
          },
          callback:function(data){
            $('.J_applyRigths').on('click',applyRights);
          },
          selector: "#J_fundlists",//html中提供的id
          template: "kfat/usercenter/rights_apply.handlebars"//模板
      });
    }
    $(function() {
      qry();
    });
    //发起申请
    function applyRights(){
      var fundcode = $(this).attr('fundcode');
      var catid = $(this).attr('catid');
      $.kd.kdConfirm('确定申请此商品信息查看权限?',function(){
          var param = {};
          param.fundcode = fundcode;
          param.catid = catid;
          $.kingdom.doKoauthAPI('kingdom.kfat.set_bex_AppFundColumPermissionIns','V2.0',param,applyRightsCallback);
      });
    }
    function applyRightsCallback(data){
        var data = data.kdjson;
        if(data.flag == '1'){
            $.kd.kdAlert(data.msg, function() {
                window.location.reload();
            },'提示');
        }else{
            $.kd.kdAlert(data.msg, function() {},'提示');
        }
    }
})