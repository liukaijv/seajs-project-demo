define(function(require, exports, module) {
    var preload = require("common/preload");
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    require("common/kd.ui.plugin");
    require("css/kd.ui.plugin.css");
    require("css/kd.tools.validate.css");
    require('common/kd.tools.validate');//验证框架
    require('base/kjax.des');//加密js
    var confimValid;
    //获取url银行卡号
    var bankaccount = $.kingdom.getUrlParameter('bankaccount');;
    var _getBindBankinfo = function(){
        //获取用户基本信息
        _ajax_data._seajs_handlebars_ajax_action({
            sendData: {
                "apiname": "kingdom.kfat.get_cif_full_info",//接口名称
                "version": "V2.0",
                "paramsMap": {
                    "page":"1",
                    "pageSize":"3"
                }
            },
            callback:function(data){
                confimValid = $('#J_confirm').kdValidform();;
                $('#J_bankaccount').val(bankaccount);
                //获取验证码方法
                $('#J_getmobileCode').on('click',function(){
                    getMobileCode();
                });
                $('#J_infoconfirm').on('click',doUnbind);
                loadvalidateimg();
                //刷新验证码
                $('#imgauthcode').on('click',loadvalidateimg);
            },
            selector: "#J_custInfo",//html中提供的id
            template: "kfat/usercenter/unbindBank.handlebars"//模板
        });
    }();
    //获取手机验证码
    var getMobileCode = function() {
        var param = {};
        if ($("#J_mobiletel").val().length == 0) {
            $.kd.kdMsg("未绑定手机号码不能解绑银行卡！");
            return;
        }
        param.mobile = $("#J_mobiletel").val();
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
                //$.kd.kdMsg(propmt);
                $("#kdValidform_checktip_authcode").removeClass("kdValidform_checktip kdValidform_right");
                $("#kdValidform_checktip_authcode").addClass("kdValidform_checktip kdValidform_wrong");
                $("#kdValidform_checktip_authcode").html(propmt);
            } else {
                $.kd.kdMsg("获得手机验证码失败!");
            }
            return false;
        }
    }
    //解绑方法
    function doUnbind(data){
        if(!confimValid.check()){
            return;
        }
        var param = {};
        param.certificatetype = $('#J_certificatetype').val();
        param.certificateno = $('#J_certificateno').val();
        param.channelno = $('#J_channelno').val();
        param.password = $.des.getDes($('#J_password').val(), 'kingdom');
        param.msgcode = $('#J_msgcode').val();
        param.bankaccount = $('#J_bankaccount').val();
        $.kingdom.doKoauthAPI('kingdom.kfat.set_bankaccount_unbind','V2.0',param,doUnbindCallback);
    }
    function doUnbindCallback(data){
        data = data.kdjson;
        if(data.flag == '1'){
            $.kd.kdAlert(data.msg, function() {
                window.location.href = '/usercenter/financial_asset.html';
            },'提示');
        }else{
            $.kd.kdAlert(data.msg);
        }
    }
    //获取验证码
    var loadvalidateimg = function() {
        $.kingdom.doKoauthAPI('kingdom.kfat.get_base64_image_validcode','V2.0',{},function(data) {
            $('#imgauthcode').attr("src", data.kdjson.items[0].validcode);
            uniqueID = data.kdjson.items[0].uniqueID;
        })
    }
})