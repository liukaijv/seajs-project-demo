define(function(require, exports, module) {
	require("common/jquery.init_cfg");
	require("common/jquery.kingdom");
	require("common/kd.ui.plugin");
	require("css/kd.ui.plugin.css");
	var preData = {};
	var login_name;
	$(function() {
		if($("body").is(":hidden")){
			$("body").show();
		}
		//判断用户登录
		$.kingdom.getLoginName(function(data) {
			if (data.kdjson.flag == "1") {
				var items = data.kdjson.items;
				//$("#J_sliderbox").removeClass("hidden");
				if (items && items.length > 0) {
					var item = items[0];
					$(".site-nav").find('.entrance').find('a').eq(0).html(item.login_name).attr("href","/usercenter/financial_asset.html").attr("id","J_loginname");
					$(".site-nav").find('.entrance').find('a').eq(1).html("退出").attr({"href":"javascript:;","id":"logout"});
					return login_name = item.login_name;
				}
			}else{
			}
		});

		// 初始化顶部导航选中效果
		var htmlHref = window.location.href;
		var controlOnce = true; // 用于控制只初始化一次
		$("#J_navigation a").each(function(n, item) {
			var temp = $(item).data("type");
			if (htmlHref.indexOf(temp) >= 0 && controlOnce) {
				$("#J_navigation a").removeClass("active");
				$(item).addClass("active");
			}
		});
		// 公共顶部导航悬浮状态动画
		$("#J_navigation a:not(.active)").hover(function() {
            $(this).addClass("active");
        }, function() {
            $(this).removeClass("active");
        });
		//公共顶部下拉效果
		$('.dropdown-box').hover(function() {
		    if(!$(this).hasClass('active'))
		      $(this).addClass('active');
		    else
		      $(this).removeClass('active');
		});
		// 账户中心左侧栏选中效果
		if (htmlHref.indexOf("kasp") >=0) {
			var ctlo = true;
			$(".sidebar-menu li a").each(function(n, item) {
				var temp = $(item).attr("href").split(".")[0];
				if (htmlHref.indexOf(temp) >= 0 && ctlo) {
					$(".sidebar-menu li a").removeClass("active");
					$(item).addClass("active");
					ctlo=false
				}
			});
		};
		// 登录跳转
		$("body").on("click", "#login", function() {
			window.location.href = "ssologin.html?deal_action=login&pageto="+encodeURIComponent(window.location.href);
		})
		//退出
		$("body").on("click", "#logout", function() {alert();
			$.kd.kdConfirm("确定退出？", function() {
				$.kingdom.logout(function(data) {
					if (data.kdjson.flag == "1") {
						document.location = "/index.html";
					}
				});
			});
			return false;
		});
		//关闭弹窗
		$("body").on("click","button[data-dismiss=modal]",function(){
			$(this).parents("#alertWindow").remove();
		})
		//个人中心
		$("body").on("click","#pagetoCenter",function(){
			window.location.href = "ssologin.html?deal_action=accout_center&pageto=" + $.init_cfg.kasp_url + "account_asset.html"
		})
		
		// 点击页顶处的手机版
		$("body").on("click",".mobile-app",function(e){
			e.preventDefault();
			kdalert("提示"," APP 即将上线，敬请期待！");
		})
	});


	function AddFavorite(sURL, sTitle) {
		try {
			window.external.addFavorite(sURL, sTitle);
		} catch (e) {
			try {
				window.sidebar.addPanel(sTitle, sURL, "");
			} catch (e) {

				kdalert("加入收藏失败，请使用Ctrl+D进行添加");
			}
		}
	};

	function changeBorder(obj) {
		$(".bank-type-content").css("border", "1px solid #fff")
		$(obj).parent().next().css("border", "1px solid #f22f5e");
	};

	// 把form表单转成json对象 var json = $(“#form”).serializeObject ();
	$.fn.serializeObject = function()  
	{  
	   var o = {};  
	   var a = this.serializeArray();  
	   $.each(a, function() {  
		   if (o[this.name]) {  
			   if (!o[this.name].push) {  
				   o[this.name] = [o[this.name]];  
			   }  
			   o[this.name].push(this.value || '');  
		   } else {  
			   o[this.name] = this.value || '';  
		   }  
	   });  
	   return o;  
	};

	
	// 对Date的扩展，将 Date 转化为指定格式的String 
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	Date.prototype.Format = function(fmt) 
	{ //author: meizz 
	  var o = { 
		"M+" : this.getMonth()+1,                 //月份 
		"d+" : this.getDate(),                    //日 
		"h+" : this.getHours(),                   //小时 
		"m+" : this.getMinutes(),                 //分 
		"s+" : this.getSeconds(),                 //秒 
		"q+" : Math.floor((this.getMonth()+3)/3), //季度 
		"S"  : this.getMilliseconds()             //毫秒 
	  }; 
	  if(/(y+)/.test(fmt)) 
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	  for(var k in o) 
		if(new RegExp("("+ k +")").test(fmt)) 
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	  return fmt; 
	}
	preData.login_name = login_name;
	module.exports = preData;

	
})