define(function(require, exports, module) {
    var self = require("common/ajax_data");//引入ajax_data.js
    require("common/preload");//预加载 
	var getProductList = function(page,pageSize){
        self._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_fundbase_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "page":page,
                    "pageSize":'100'||"10"
                }
            },
            callback:function(data){
                console.info(data)
            },
            selector: "#J_bonds_list",//html中提供的id
            template: "kfat/financial/bonds_list.handlebars"//模板
        });
    }();

	
})