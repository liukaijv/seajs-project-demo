(function($) {

  $.organicTabs = function(el, options) {

    var base = this;
    // 最外层div
    base.$el = $(el);
    // 标签容器
    base.$nav = base.$el.children(".nav");

    base.init = function() {

      base.options = $.extend({}, $.organicTabs.defaultOptions, options);

      // Accessible hiding fix
      $(".hide").css({
        "position": "relative",
        "top": 0,
        "left": 0,
        "display": "none"
      });

      base.$nav.delegate("li > a", "click", function() {

        // 获取列表当前内容的id
        var curList = base.$el.find("a.current").attr("href").substring(1),
            
            
            
            
            // 点击的a标签
            $newList = $(this),
            
            
            
            
            // 获取点击的id
            listID = $newList.attr("href").substring(1),
            
            
            
            
            // 列表容器
            $allListWrap = base.$el.children(".list-wrap");
        //curListHeight = $allListWrap.height();
        //$allListWrap.height(curListHeight);
        if ((listID != curList) && (base.$el.find(":animated").length == 0)) {

          // Fade out current list
          base.$el.find("#" + curList).fadeOut(base.options.speed, function() {

            // Fade in new list on callback
            base.$el.find("#" + listID).fadeIn(base.options.speed);

            // Adjust outer wrapper to fit new list snuggly
            var newHeight = base.$el.find("#" + listID).height();
/*$allListWrap.animate({
                            height: newHeight
                        });*/

            // Remove highlighting - Add to just-clicked tab
            base.$el.children(".nav").children().children().removeClass("current");
            $newList.addClass("current");

            //回调函数
            if(base.options.cbfunc){
                base.options.cbfunc();
            }

          });

        }

        // Don't behave like a regular link
        // Stop propegation and bubbling
        return false;
      });

    };
    base.init();
  };

  $.organicTabs.defaultOptions = {
    "speed": 300
  };

  $.fn.organicTabs = function(options) {
    return this.each(function() {
      (new $.organicTabs(this, options));
    });
  };

})(jQuery);