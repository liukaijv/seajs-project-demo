define(function(require, exports, module) {
    var self = require("common/ajax_data");//引入ajax_data.js
    require("common/preload");//预加载 
	require('common/kd.tools.validate');//验证框架
	require('common/kd.ui.plugin');
	$form = $("#J_fxcpform").kdValidform();
	//加载风险评测问题
    var getFxcp = function(){
        self._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_question_naires",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "questiontype":"psl"
                }
            },
            callback:function(data){
				$('#J_doEstimate').on('click',dofxcp);
				$('#J_fxs').on('click',windowUp);
            },
            selector: "#J_fxcpform",//html中提供的id
            template: "kfat/user/fxcp.handlebars"//模板
        });
    }();
	var dofxcp = function(){
		//表单验证
		if (!($form.check() && $("input.kdValidform_error").size() == 0)) {
	      return;
	    }
	    //参数
	    var param = {};
	    //循环选中的radio封装风险测评参数
	    $('input[type=radio]:checked').each(function(e){
	    	var questionnaire = $(this).attr('name');
	    	var ans = $(this).attr('ans');
	    	param[questionnaire] = ans;
	    });
        $.kingdom.doKoauthAPI('kingdom.kfat.set_questionnaires_test','V2.0',{RISKAPPRAISALQS:JSON.stringify(param)},fxcpCallback);
	}
	var fxcpCallback = function(data){
		data = data.kdjson;
		$.kd.closeLoading();
        $("input[type=button]").attr("disabled", false);
        $("#registerform input").removeClass("readonly").attr("readonly", false);
        if (data.flag == 1) {
        	$.kd.kdAlert(data.msg, function() {
				window.location.href = "/usercenter/financial_asset.html";
 			},'提示');
          
        } else {
          var errormsg = data.msg;
          $.kd.kdAlert( errormsg);
		  $.kd.closeLoading();
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
	
})