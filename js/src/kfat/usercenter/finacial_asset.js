define(function(require, exports, module) {
    var preload = require("common/preload");
    //加载账户信息
    var account_figure = require("kfat/usercenter/account_figure");
    $(function() {
        account_figure._load(); //加载页面数据
		//管理
		// $("body").on("click","#accountcards",function(){
		// 	document.location.href="account_cards.html";
		// });
		// //充值
		// $("body").on("click","#recharge",function(){
		// 	document.location.href="recharge.html";
		// });
		// //提现
		// $("body").on("click","#withdraw",function(){
		// 	document.location.href="withdraw.html";
		// });
  //       //分页数据加载
  //       $("#hotproduct_pager").on("click","a",function(){
  //           var $this = $(this);
  //           var $span = $this.siblings("span");
  //           var isPrev = $this.hasClass("prev"),
  //               isNext = $this.hasClass("next"),
  //               pn = parseInt($span.data("page").page),
  //               tp = parseInt($span.data("page").totalPage);
  //           if(isPrev){//上一页
  //               if(pn===1)return false;
  //               showContent._hotProducts(pn-1);
  //           };
  //           if(isNext){//下一页
  //               if (pn===tp)return false;
  //               showContent._hotProducts(pn+1);
  //           }
  //       });
       
    });
})