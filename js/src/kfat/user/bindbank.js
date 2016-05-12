define(function(require, exports, module) {
    var self = require("common/ajax_data");//引入ajax_data.js
    require("common/preload");//预加载 
	require('common/kd.tools.validate');//验证框架
	require('common/kd.ui.plugin');//验证框架
	require('base/kjax.des');//加密js
	$form = $("#J_bindbankForm").kdValidform();
	var _bindBank = function(){
		//表单验证
		if (!($form.check() && $("input.kdValidform_error").size() == 0)) {
	      return;
	    }
	    $("input[type=button]").attr("disabled", true);
	    $("#J_bindbankForm input").addClass("readonly").attr("readonly", true);
		
	    var certificatetype = $("#J_certificatetype").val();	
	    var certificateno = $("#J_certificateno").val();	
	    var certificatename = $("#J_certificatename").val();	
	    var bankaccount = $("#J_bankaccount").val();	
	  	var channelno = $("#J_channelno").val();
	  	var msgcode = $("#J_msgcode").val();
	    $("#J_tradepwd").val($.des.getDes($("#J_tradepwd").val(), 'kingdom'));
	    $.kd.showLoading($("#J_bindbankBtn"));
	    var password = $("#J_tradepwd").val();
	    //注册参数
	    var param = {};
	    param.certificatetype = certificatetype;
	    param.certificateno = certificateno;
	    param.certificatename = certificatename;
	    param.bankaccount = bankaccount;
	    param.channelno = channelno;
	    param.msgcode = msgcode;
	    param.password = password;
        $.kingdom.doKoauthAPI('kingdom.kfat.set_custaccountopen','V2.0',param,_bindBankCallback);
	}
	//绑卡回调
	var _bindBankCallback = function(data){
		data = data.kdjson;
		$.kd.closeLoading();
        $("input[type=button]").attr("disabled", false);
        $("#J_bindbankForm input").removeClass("readonly").attr("readonly", false);
        if (data.flag == 1) {
          window.location.href = "/user/fxcp.html";
        } else {
          var errormsg = data.msg;
          $.kd.kdAlert( errormsg);
		  $.kd.closeLoading();
        }
	}
	var getMobileCode = function() {
		var param = {};
		// if ($("#mobiletel").val().length == 0) {
		// 	$.kd.kdMsg("请输入手机号码");
		// 	return;
		// }
		param.mobile = '18349303455';
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
				timeCounter(wait, $("#J_msgcode"));
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
	$('#J_bindbankBtn').on('click',_bindBank);
	$('#J_msgcode').on('click',getMobileCode);
})