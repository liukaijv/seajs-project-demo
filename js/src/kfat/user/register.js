define(function(require, exports, module) {
    var self = require("common/ajax_data");//引入ajax_data.js
    require("common/preload");//预加载 
	require('common/kd.tools.validate');//验证框架
	require('common/kd.ui.plugin');
	require('base/kjax.des');//加密js
	$form = $("#registerform").kdValidform();
	var username = '';
	var orialpassword = '';
	var registerUtil = require('kfat/user/registerUtil');//注册工具方法js
	var registFlag = true;
	var register = function(){
		//表单验证
		if (!($form.check() && $("input.kdValidform_error").size() == 0)||!registFlag) {
	      return;
	    }
	    username = $("#username").val();	
	  	orialpassword = $("#password__").val();
	  	if(username==orialpassword){
	  		$.kd.kdMsg("注册用户名和密码不能一致，请检查");return;
	  	}
	    var invitorname = $("#invitorname").val();
	    var mobiletel = $("#mobiletel").val();
	    var txt_validatecode = $("#txt_validatecode").val();
	    $.kd.showLoading($("#register"));
	    $("#password").val($.des.getDes($("#password__").val(), 'kingdom'));
		$("#password__").val('');
	    $("input[type=button]").attr("disabled", true);
	    $("#registerform input").addClass("readonly").attr("readonly", true);
		
	    var openid = $("#openid").val();
	    if (!openid) {
	      openid = '';
	    }	
	    var password = $("#password").val();
	    //注册参数
	    var param = {};
	    param.loginname = username;
	    param.password = password;
	    param.mobile = mobiletel;
	    param.msgcode = txt_validatecode;
	    param.referrername = invitorname;
	    param.branchcode = '1002';
	    param.acceptmethod = 'PC';
        $.kingdom.doKoauthAPI('kingdom.kfat.set_cust_register','V2.0',param,regesterCallback);
	}
	//注册回调
	var regesterCallback = function(data){
		data = data.kdjson;
		$.kd.closeLoading();
        $("input[type=button]").attr("disabled", false);
        $("#registerform input").removeClass("readonly").attr("readonly", false);
        if (data.flag == 1) {
        	//注册成功后登陆
        	login();
        } else {
          var errormsg = data.msg;
          $.kd.kdAlert( errormsg);
		  $.kd.closeLoading();
        }
	}
	//登陆
	var login = function(){
		var param = {loginname:username,password:$.des.getDes(orialpassword, 'kingdom')};
    	$.kingdom.doKoauthAPI('kingdom.kfat.get_cust_login','v2.0',param,loginCallback);
	}
	//登陆回调
	var loginCallback = function(data){
        var items = data.kdjson;
        if (items.flag == "1") {
            $.kingdom.getRedirect(function(directUrl) {
            	window.location.href = "bindbank.html";
            })
        } else {
            alert(items.msg)
        }
	}
	//入会协议
	var windowUp = function() {
		$.kd.kdAlertXY( $('#khxy').html(), function() {})
		$("#kd-ui-dialog-box").css({
	        marginTop: '-252px',
	        marginLeft: '-405px'
	    });
	}
	$('#register').on('click',register);
	$('#J_agree').on('click',windowUp);
	//获取验证码方法
	$('#J_getmobileCode').on('click',function(){
		registerUtil.getMobileCode();
	});
	
})