/*
	VERSION : autoScroll jQuery Plugin 0.1 (03-25-2011)
	REQUIRES : jQuery v1.3.2 or later
	SYNTAX : $(selector).autoScroll(options);  // let elements contains "<ul><li>...</li><li>...</li>...</ul>" scroll
	For example :	$("#demo").autoScroll();
					$("#demo").autoScroll({type:"H",timer:3000});

	OPTIONS :
		type : "H" or "V" (String default "V")
			"H" : Let Elements Scroll Horizontally;
			"V" : Let Elements Scroll Vertically;
		timer : (int default 5000)
	Licensed under the GPL : http : //gplv3.fsf.org
	Copyright 2011 xiaosong (sahala_2007@126.com,http://xiaosong.org/)
*/
;(function($) {
	$.fn.extend({
		autoScroll : function (options) {
			var auto = null;
			var obj = $(this);
			var settings = {type:"V", timer:5000};
			options = options || {};
			$.extend(settings, options);
			auto = setInterval(scrollAuto, settings.timer);
			obj.hover(function(){clearInterval(auto)}, function(){auto = setInterval(scrollAuto, settings.timer)});
			function scrollAuto() {
				var firstUl = obj.find("ul:first");
				var firstLi = firstUl.find("li:first");
				if (settings.type == "H") {
					var width = -(firstLi.outerWidth(true)) + "px";
					firstUl.animate({marginLeft:width}, 800, function() {
						$(this).css({marginLeft:"0px"}).find("li:first").appendTo(this);
					});
				} else {
					var height = -(firstLi.outerHeight(true))+"px";
					firstUl.animate({marginTop:height}, 800, function() {
						$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
					});
				}
			}
		}
	});
})(jQuery);