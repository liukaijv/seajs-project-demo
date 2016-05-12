define(function(require, exports, module) {
    require("common/preload");//预加载 
    require("jquery/jquery.superSlide");//图片轮播js
    var showContent = require("kfat/homeShow");//引入homeShow.js 
    $(function(){
        showContent._load();//加载数据
    });
	  //首页形象广告轮播
	  $('#J_slider').slide({
	    mainCell: ".slider-bd ul",
	    titCell: ".slider-hd li",
	    titOnClassName: 'active',
	    effect: "leftLoop",
	    autoPlay: true,
	    easing: "easeInQuint"
	  });
	  //公告图片轮播
	  $('#J_slider2').slide({
	    mainCell: ".slider2-bd ul",
	    titCell: ".slider2-hd li",
	    titOnClassName: 'active',
	    effect: "leftLoop",
	    autoPlay: true,
	    easing: "easeInQuint"
	  });
})

