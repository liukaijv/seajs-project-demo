define(function(require, exports, module) {
    var self = require("common/ajax_data");
    require("common/preload");
    var gettransferInfo = function(){
        self._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_cif_full_info",
                "version": "V2.0",
                "paramsMap": {
                }
            },
            callback:function(data){
                
            },
            selector: "#J_account_detail",
            template: "kfat/usercenter/account_detail.handlebars"
        });
    }();
    
})