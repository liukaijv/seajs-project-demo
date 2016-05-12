define(function(require, exports, module) {
    var preload = require("common/preload");
    var _ajax_data = require("common/ajax_data");//引入ajax_data.js
    require('base/kjax.des');//加密js
    require("common/layer.min");
    require("common/kd.ui.plugin");
    require("css/kd.ui.plugin.css");
    var omobile = '';//旧手机号码
    var omsgcode = '';//旧手机号码验证码
    var nmobile = '';//新手机号码
    var nmsgcode = '';//新手机号码验证码
    var certificatetype = '';//证件类型
    var certificateno = '';//证件号码
    var certificatename = '';//客户姓名
    $(function() {
        //刷新验证码
        $('.imgauthcode').on('click',loadvalidateimg);
        //参数
        var param = {};
        //加载客户基本信息
        $.kingdom.doKoauthAPI('kingdom.kfat.get_cif_full_info','V2.0',param,getCifInfoCallback)
    });
    //获取验证码
    var loadvalidateimg = function() {
        $.kingdom.doKoauthAPI('kingdom.kfat.get_base64_image_validcode','V2.0',{},function(data) {
            if(data.kdjson.flag == '1'){
                $('.imgauthcode').attr("src", data.kdjson.items[0].validcode);
                uniqueID = data.kdjson.items[0].uniqueID;
            }else{
                alert(data.kdjson.msg);
            }
        })
    }
    loadvalidateimg();
    var getCifInfoCallback = function(data){
      data = data.kdjson;
      if(data.items){
        data = data.items;
        if(data.fphoneno != '0'){
          omobile = data[0].phoneno;
          certificatetype = data[0].certificatetype;
          certificateno = data[0].certificateno;
          certificatename = data[0].chinesename;
          if(omobile.length > 0){
            //登陆手机
            $('#J_mobile_certificate').before(data[0].phoneno);
            $('#old_mobile_text').val(data[0].phoneno);
            return;
          }
        }
      }
      //未认证
      $('#J_mobile_certificate').before('未认证手机');
      $('#J_mobile_certificate').remove();
    };
    var capitalLayer;
    //弹出修改资金密码窗口
    function show_modify_capitalpwd(){ 
      capitalLayer=$.layer({type : 1,title : "交易密码修改",border : false,area : ['auto','auto'],bgcolor: '#fff',page : {dom : '#J_modify_capitalpwd'}});   
    }
    //弹出修改交易密码窗口
    var pwdLayer;
    function modify_pwd() {
      pwdLayer = $.layer({
        type : 1,
        title : "登录密码修改",
        border : false,
        area : ['auto','auto'],
        bgcolor: '#fff',
        page : {dom : '#modify_pwd'}
      });
    }
    /*
    * 找回密码
    */
    var capitalBackLayer;
    function show_modify_capitalpwdBack(){
       capitalBackLayer=$.layer({type : 1,title : "交易密码找回",border : false,area : ['auto','auto'],
       bgcolor: '#fff',page : {dom : '#back_capitalpwd'}});
    }
    /*
     * 弹出手机认证框
     */
    var mobileLayer;
    var mobileTitle;
    function mobile_certificate() {
      mobileLayer = $.layer({
            type : 1,
            title : mobileTitle,
            border : false,
            area : ['auto','auto'],
            bgcolor: '#fff',
            page : {dom : '#mobile_certificate'}
          });
    }
    //修改认证手机
    function confrim_mobileOp(){
      var param = {};
      nmobile = $('#mobile').val();//新手机号码
      nmsgcode = $('#verifycode').val();//新手机验证码
      param.omobile = omobile;
      param.omsgcode = omsgcode;
      param.nmobile = nmobile;
      param.nmsgcode = nmsgcode;
      $.kingdom.doKoauthAPI('kingdom.kfat.set_phone_modify','V2.0',param,updPhoneCallback);
    }
    function updPhoneCallback(data){
      $.layer({
        shade: [0.5, '#000'],
        area: ['auto', 'auto'],
        title: '修改认证手机',
        dialog: {
          msg: data.kdjson.msg,
          btns: 1,
          type: -1,
          btn: ['确定'],
          yes: function(data){
            window.location.href = '/usercenter/account_safe.html';
          }
        }
      });
    }
    //获取原手机验证码
    function getOldMobileVerifyCode(callback){
      var param = {};
      if ($("#old_mobile_text").val().length == 0) {
        $.kd.kdAlert("请输入手机号码");
        return;
      }
      param.mobile = $("#old_mobile_text").val();
      $.kingdom.doKoauthAPI('kingdom.kfat.get_msg_code_byPhone', 'V2.0', param, callback);
    }
    //获取新手机验证码
    function getModifyMobileVerifyCode(callback){
      var param = {};
      if ($("#mobile").val().length == 0) {
        $.kd.kdAlert("请输入手机号码");
        return;
      }
      param.mobile = $("#mobile").val();
      $.kingdom.doKoauthAPI('kingdom.kfat.get_msg_code_byPhone', 'V2.0', param, callback);
    }
    //获取找回密码验证码方法
    function getFindPass(callback){
      var param = {};
      if(omobile.length == 0){
        $.kd.kdAlert("未认证手机，不能通过手机找回密码");
        return;
      }
      param.mobile = omobile;
      $.kingdom.doKoauthAPI('kingdom.kfat.get_msg_code_byPhone', 'V2.0', param, callback);
    }
    var timeControl;
    //倒计时方法
    window.djs = function() {
      timeControl = setTimeout('djs()', 1000);
      $('#timecount').html('剩余有效时间：' + allsecondes + '秒');
      if (allsecondes*1 <= 0) {
        $('#timecount').html('&nbsp;');
        $('#verify_btn').prop("disabled", false);
        $('#old_verify_btn').prop("disabled", false);   
        clearTimeout(t);
      }
      allsecondes--;
    }
    // 设置按钮不可用
    function setButtonDisabled() {
      $("#verify_btn").removeAttr("disabled");
      $("#backverify_btn").removeAttr("disabled");
    }
    //倒计时时间
    var allsecondes = 0;
    var getOldMobileVerifyCodeCallback = function(data) {
      data = data.kdjson;
      if (data.flag == '1') {
        var result = data.items;
        if (result.length > 0) {
          $.kd.kdAlert('验证码已经发送至原有手机，请注意查收!');
          allsecondes = 60;
          var vsecondes = allsecondes * 1000;
          $('#old_verify_btn').prop("disabled", "disabled");
          djs();
          setTimeout("setButtonDisabled()", vsecondes + 1000);
        } else {
          $.kd.kdAlert("获得手机验证码失败!");
          return false;
        }
      } else {
        $.kd.kdAlert("获得手机验证码失败!");
        return false;
      }
    }
    var getModifyMobileVerifyCodeCallback = function(data) {
      data = data.kdjson;
      if (data.flag == '1') {
        var result = data.items;
        if (result.length > 0) {
          $.kd.kdAlert('验证码已经发送至新手机，请注意查收!');
          allsecondes = 60;
          var vsecondes = allsecondes * 1000;
          $('#old_verify_btn').prop("disabled", "disabled");
          djs();
          setTimeout("setButtonDisabled()", vsecondes + 1000);
        } else {
          $.kd.kdAlert("获得手机验证码失败!");
          return false;
        }
      } else {
        $.kd.kdAlert("获得手机验证码失败!");
        return false;
      }
    }
    var getFindPassCallback = function(data) {
      data = data.kdjson;
      if (data.flag == '1') {
        var result = data.items;
        if (result.length > 0) {
          $.kd.kdAlert('验证码已经发送至手机，请注意查收!');
          allsecondes = 60;
          var vsecondes = allsecondes * 1000;
          $('#backverify_btn').prop("disabled", "disabled");
          djs();
          setTimeout("setButtonDisabled()", vsecondes + 1000);
        } else {
          $.kd.kdAlert("获得手机验证码失败!");
          return false;
        }
      } else {
        $.kd.kdAlert("获得手机验证码失败!");
        return false;
      }
    }
    //弹出新手机输入modal
    function showNewMobile(){
      //旧手机验证码
      omsgcode = $('#verifycode').val();
      $("#mobile").val("");
      $("#mobiletext").html("新手机号");          
      $("#verifycode").val("");
      $("#oldmobileDis").hide();
      $("#newmobileDis").show();
      $("#J_confrim_mobile").hide();
      $("#J_confrim_mobile_new").show();
      $(".authcodeC").hide();         
      clearTimeout(timeControl);
      $('#timecount').html('&nbsp;');
    }
    //修改登陆密码
    function modifyLoginpwd(){
      $.kd.kdAlert('暂无接口!');
    }
    var modifyLoginpwdCallback = function(data) {
      data = data.kdjson;
      if (data.flag == '1') {
      } else {
        $.kd.kdAlert(data.msg);
      }
    }
    //修改交易密码
    function modifyCapitalpwd(){
      var param = {};
      param.opassword = $.des.getDes($("#old_capitalpwd").val(), 'kingdom');
      param.npassword = $.des.getDes($("#new_capitalpwd").val(), 'kingdom');
      $.kingdom.doKoauthAPI('kingdom.kfat.set_bex_capitalpsw_up', 'V2.0', param, modifyCapitalpwdCallback);
    }
    var modifyCapitalpwdCallback = function(data) {
      data = data.kdjson;
      if (data.flag == '1') { 
        $.kd.kdAlert('交易密码修改成功!');
        layer.close(capitalLayer);
      } else {
        $.kd.kdAlert(data.msg);
      }
    }
    //找回密码
    function findcapitalpwd(){
      var param = {};
      param.certificatetype = certificatetype;//个人证件类型 0-身份证 机构证件类型 D-组织机构代码证
      param.certificateno = certificateno;//证件号码
      param.certificatename = certificatename;//客户姓名
      param.password = $.des.getDes($("#new_capitalpwdback").val(), 'kingdom');
      param.msgcode = $('#verifycodeback').val();
      $.kingdom.doKoauthAPI('kingdom.kfat.set_capitalpsw_findback', 'V2.0', param, findcapitalpwdCallback);
    }
    var findcapitalpwdCallback = function(data) {
      data = data.kdjson;
      if (data.flag == '1') { 
        $.kd.kdAlert('密码找回成功!');
        layer.close(capitalBackLayer);
      } else {
        $.kd.kdAlert(data.msg);
      }
    }
    //弹出修改资金密码窗口
    $('#J_modifyPass').on('click',show_modify_capitalpwd);
    //弹出修改交易密码窗口
    $('#J_modify_pwd').on('click',modify_pwd);
    //弹出找回密码
    $('#J_findPass').on('click',show_modify_capitalpwdBack);
    //弹出认证手机
    $('#J_mobile_certificate').on('click',mobile_certificate);
    //下一步弹出认证新手机输入modal
    $('#J_confrim_mobile').on('click',showNewMobile);
    //修改认证手机
    $('#J_confrim_mobile_new').on('click',confrim_mobileOp);
    //获取旧手机验证码方法
    $('#old_verify_btn').on('click',function(){
      getOldMobileVerifyCode(getOldMobileVerifyCodeCallback);
    });
    //获取新手机验证码方法
    $('#verify_btn').on('click',function(){
      getModifyMobileVerifyCode(getModifyMobileVerifyCodeCallback);
    });
    //获取找回密码验证码方法
    $('#backverify_btn').on('click',function(){
      getFindPass(getFindPassCallback);
    });
    //修改登陆密码
    $('#confrim_btn').on('click',modifyLoginpwd);
    //修改交易密码
    $('#confrim_capitalpwdbtn').on('click',modifyCapitalpwd);
    //修改交易密码
    $('#confrim_capitalpwdbackbtn').on('click',findcapitalpwd);
})