define(function(require, exports, module) {
	var self = require("common/ajax_data"); //引入ajax_data.js
    require("common/kd.ui.plugin");
    require("css/kd.ui.plugin.css");
	var registerUtil = {};
	//获取手机验证码
	registerUtil.getMobileCode = function() {
		var param = {};
		if ($("#mobiletel").val().length == 0) {
			$.kd.kdMsg("请输入手机号码");
			return;
		}
		param.mobile = $("#mobiletel").val();
		$.kingdom.doKoauthAPI('kingdom.kfat.get_msg_code_byPhone', 'V2.0', param, getMobileCodeCallback);
	}
	var codetimer;

	function timeCounter(wait, $btn) {
		if (wait == 0) {
			$btn.attr("disabled", false).val("重新获取验证码");
			wait = 60;
		} else {
			$btn.attr("disabled", "disabled").val("重新发送(" + wait + ")");
			wait--;
			codetimer = setTimeout(function() {
					timeCounter(wait, $btn)
				},
				1000)
		}
	}
	var getMobileCodeCallback = function(data) {
		data = data.kdjson;
		if (data.flag == '1') {
			var result = data.items;
			if (result.length > 0) {
				countdown = 60;
				$.kd.kdMsg('验证码已发送!');
				if (countdown) {
					wait = countdown;
				}
				$("#kdValidform_checktip_validatcode").hide();
				timeCounter(wait, $("#J_getmobileCode"));
				$("#kdValidform_checktip_authcode").removeClass("kdValidform_checktip kdValidform_wrong");
				$("#kdValidform_checktip_authcode").addClass("kdValidform_checktip kdValidform_right");
				$("#kdValidform_checktip_authcode").html("通过信息验证");
			} else {
				$.kd.kdMsg("获得手机验证码失败!");
				return false;
			}
		} else {
			var propmt = data.msg;
			if (propmt) {
				$.kd.kdMsg(propmt);
			} else {
				$.kd.kdMsg("获得手机验证码失败!");
			}
			return false;
		}
	}
	module.exports = registerUtil;
})