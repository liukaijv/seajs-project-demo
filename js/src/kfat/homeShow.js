define(function(require, exports, module) {
    var self = require("common/ajax_data");//引入ajax_data.js
    var showContent = {}; 
    showContent._load = function() {
        gethotProduct();//直接调用业务方法
    };
    var gethotProduct = function(){
        self._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_fundbase_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "page":"1",
                    "pageSize":"3"
                }
            },
            selector: "#J_hotProduct",//html中提供的id
            template: "kfat/index_hotProduct.handlebars"//模板
        });
    }
    module.exports = showContent;
})