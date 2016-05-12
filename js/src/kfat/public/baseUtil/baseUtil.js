define(function(require, exports, module) {
    var ajax_req = require("common/ajax_data");//引入ajax_data.js
   	var loadDate = {};
   	//获取省份信息
	loadDate._getProvince = function(){
		ajax_req._seajs_handlebars_ajax_action({
			sendData : getDictData("D00003"),
			selector : "#J_province",
			template : "kfat/basic/basic_province.handlebars",
			callback:function(){
				var ref_key = $("#J_province").data("value");
				//$("#cs").hide();
				if(ref_key){
					provinceValue = $("#sf option[value="+ ref_key + "]").attr("selected","selected").text();
					showContent._getCsList(ref_key.toString());
				}
			}
		})
	};
   	//获取客户签约渠道信息
	loadDate._get_cust_deposit_account = function(){
		$.kingdom.doKoauthAPI('kingdom.kfat.get_cust_deposit_account','V2.0',{},getDepostiAccountCallback);
	};
	//获取客户签约渠道信息回调
	var getDepostiAccountCallback = function(data){
		loadDate.custAccountInfo = data.kdjson.items;
	}
	var getDictData = function(dict_id) {
        var data = {
            "apiname": "kingdom.kfat.get_dict",
            "version": "V2.0",
            "paramsMap": {
                "dict_id": dict_id // "D00006"
            }
        }
        return data;
    };
    module.exports = loadDate;
})