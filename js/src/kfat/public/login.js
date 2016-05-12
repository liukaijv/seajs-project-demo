define(function(require, exports, module) {
    var self = require("common/ajax_data");//引入ajax_data.js
    require("common/preload");//预加载 
	require('base/kjax.des');//加密js
    require('common/validform.min');
    var uniqueID;
	var loginValid = $("#J_loginform").Validform({
	    tiptype: function(msg, o, cssctl) {
		var objtip = $("#errortip");
		cssctl(objtip, o.type);
		objtip.text(msg).parents('div').removeClass('hide');
    }});
	//登陆
	var login = function(){
		if(loginValid.check()){
            var validcode = $('#authcode').val();
            // var param = {loginname:$('#J_username').val(),password:$.des.getDes($('#J_passwordtxt').val(), 'kingdom')};
            // $.kingdom.doKoauthAPI('kingdom.kfat.get_cust_login','v2.0',param,regesterCallback);
			var param = {loginname:$('#J_username').val(),password:$.des.getDes($('#J_passwordtxt').val(), 'kingdom'),validcode:validcode,uniqueID:uniqueID};
        	$.kingdom.doKoauthAPI('kingdom.kfat.get_api_cust_login_cmb','V2.0',param,regesterCallback);
		}else{
			return false;
		}
		
	}
	//登陆回调
	var regesterCallback = function(data){
        var items = data.kdjson;
        if (items.flag == "1") {
            $.kingdom.getRedirect(function(directUrl) {
                if (directUrl == "") {
                    document.location = "/usercenter/financial_asset.html";
                } else {
                    document.location = directUrl;
                }
                // document.location = "/usercenter/financial_asset.html";
            })
        } else {
            alert(items.msg)
        }
	}
    //获取验证码
    var loadvalidateimg = function() {
        $.kingdom.doKoauthAPI('kingdom.kfat.get_base64_image_validcode','V2.0',{},function(data) {
            if(data.kdjson.flag == '1'){
                $('#imgauthcode').attr("src", data.kdjson.items[0].validcode);
                uniqueID = data.kdjson.items[0].uniqueID;
            }else{
                alert(data.kdjson.msg);
            }
        })
    }
    $(function(){
        loadvalidateimg();
        $('#J_login').on('click',login);
        //刷新验证码
        $('#imgauthcode').on('click',loadvalidateimg);
    })
	
})