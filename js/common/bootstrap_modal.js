/* ========================================================================
 * Bootstrap: modal.js v3.3.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.0'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: "static",//true
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .prependTo(this.$element)
        .on('click.dismiss.bs.modal', $.proxy(function (e) {
          if (e.target !== e.currentTarget) return
          this.options.backdrop == 'static'
            ? this.$element[0].focus.call(this.$element[0])
            : this.hide.call(this)
        }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    if (document.body.clientWidth >= window.innerWidth) return 0
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/*===========================================================================*/
// 用于每次使用弹框，使其id不一致
var windowCount = 0;
/* 往页面添加带有按钮的弹出框 */
var addPopUp = function(id,title,msg,choose,oktxt,canceltxt){
	if(choose){//显示确认和取消按钮
		$("body")
		.append('<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" style="z-index: 900000;"  aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">'
			+'<div class="modal-dialog" style="width: 400px;z-index: 900000;">'
				+'<div class="modal-content">'
					+'<div class="modal-header">'
						+'<button type="button" class="close" data-dismiss="modal">'
							+'<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>'
						+'</button>'
						+'<h4 class="modal-title" id="myModalLabel">'+title+'</h4>'
					+'</div>'
					+'<div class="modal-body" align="center">'
						+msg
					+'</div>'
					+'<div class="modal-footer">'
						+'<button type="button" class="btn btn-positive"   id="'+id+'_sure"  >'+(oktxt?oktxt:"确定")+'</button>'
						+'<button type="button" class="btn btn-negative"   id="'+id+'_cancel">'+(canceltxt?canceltxt:"取消")+'</button>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>');
	}else{//只显示确认按钮
		$("body")
		.append('<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">'
			+'<div class="modal-dialog" style="width: 400px;">'
				+'<div class="modal-content">'
					+'<div class="modal-header">'
						+'<button type="button" class="close" data-dismiss="modal">'
							+'<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>'
						+'</button>'
						+'<h4 class="modal-title" id="myModalLabel">'+title+'</h4>'
					+'</div>'
					+'<div class="modal-body" align="center" style="font-size: 16px">'
						+msg
					+'</div>'
					+'<div class="modal-footer">'
						+'<button type="button" class="btn btn-positive" id="'+id+'_sure">确定</button>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>');
	}
};


/* 扩展addPopUp，增加width和height参数 by wangaimin 2015年9月1日11:30:34 */
var addPopUp_extend = function(id,title,msg,choose,oktxt,canceltxt,width,height){
	w = width?width:400;
	h = width?width:300;
	if(choose){//显示确认和取消按钮
		$("body")
		.append('<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" style="z-index: 900000;"  aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">'
			+'<div class="modal-dialog" style="width: '+w+'px;z-index: 900000;">'
				+'<div class="modal-content">'
					+'<div class="modal-header">'
						+'<button type="button" class="close" data-dismiss="modal">'
							+'<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>'
						+'</button>'
						+'<h4 class="modal-title" id="myModalLabel">'+title+'</h4>'
					+'</div>'
					+'<div class="modal-body" align="center" style="font-size: 16px">'
						+msg
					+'</div>'
					+'<div class="modal-footer" style="text-align:center;">'
						+'<button type="button" class="btn btn-positive"   id="'+id+'_sure"  >'+(oktxt?oktxt:"确定")+'</button>'
						+'<button type="button" class="btn btn-negative"   id="'+id+'_cancel">'+(canceltxt?canceltxt:"取消")+'</button>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>');
	}else{//只显示确认按钮
		$("body")
		.append('<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">'
			+'<div class="modal-dialog" style="width: '+w+'px;z-index: 900000;">'
				+'<div class="modal-content">'
					+'<div class="modal-header">'
						+'<button type="button" class="close" data-dismiss="modal">'
							+'<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>'
						+'</button>'
						+'<h4 class="modal-title" id="myModalLabel">'+title+'</h4>'
					+'</div>'
					+'<div class="modal-body" align="center" style="font-size: 16px">'
						+msg
					+'</div>'
					+'<div class="modal-footer" style="text-align:center;">'
						+'<button type="button" class="btn btn-positive" id="'+id+'_sure">确定</button>'
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>');
	}
};


/**
 * 定义查看详细信息的方法
 */
var popDetail = function (content) {
    $("body")
        .append('<div class="modal fade" id="div_more_info" tabindex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">'
        +'<div class="modal-dialog" style="width: 600px;z-index: 900000;">'
          +'<div class="modal-content">'
            +'<div class="modal-header"><h4 class="modal-title" id="myModalLabel">详细信息</h4></div>'
            +'<div class="modal-body">'
              + content
            +'</div>'
            +'<div class="modal-footer">'
              +'<button type="button" class="btn btn-negative" id="div_more_info_sure">关闭</a>'
            +'</div>'
            +'</div>'
          +'</div>'
        +'</div>');
};

var kdDetail = function (content) {
  var id = 'detailWindow' + windowCount.toString();
  popDetail(content);
  windowCount++;
  // 显示弹出框
  $('#div_more_info').modal('show');
  // 绑定确定按钮事件
  $('#div_more_info_sure').click(function() {
    $('#div_more_info').modal('hide');
    $('#div_more_info').remove();
  });
};

/* 定义弹出框调用方法 */
/* 包含确认按钮和取消按钮 */
var kdconfirm = function(title,msg,func,funcs,oktxt,canceltxt){//标题，提示信息，点击确认执行的函数
	var id = 'confirmWindow' + windowCount.toString();
	if( typeof(func) == 'function'){
		// 往页面添加弹出框
		addPopUp(id,title,msg,true,oktxt,canceltxt);
		windowCount++;
		// 显示弹出框
		$('#'+id).modal('show');
		// 绑定确定按钮事件
		$('#'+id+'_sure').click(function(){
			func();
			$('#'+id).modal('hide');
			$('#'+id).remove();
		});
		// 绑定取消按钮事件
		if( typeof(funcs) == 'function' ){
			$('#'+id+'_cancel').click(function(){
				funcs();
				$('#'+id).modal('hide');
				$('#'+id).remove();
			});
		}else{
			$('#'+id+'_cancel').click(function(){
				if(typeof(funcs)=='function'){
					funcs();
				}
				$('#'+id).modal('hide');
				$('#'+id).remove();
			});
		}
	}else{
		// 往页面添加弹出框
		addPopUp(id,title,msg,true,oktxt,canceltxt);
		windowCount++;
		// 显示弹出框
		$('#'+id).modal('show');
		// 绑定确定按钮事件
		$('#'+id+'_sure','#'+id+'_cancel').click(function(){
			$('#'+id).modal('hide');
			$('#'+id).remove();
		});
	}
	$('#'+id+' .close').click(function(){
		$('#'+id).modal('hide');
		$('#'+id).remove();
	})
}
/* 定义弹出框调用方法  add width height show cancelbt modify by wangaimin*/
/* 包含确认按钮和取消按钮 */
var kdconfirm_extend = function(title,msg,showcancelbt,func,funcs,oktxt,canceltxt,width,height){//标题，提示信息，点击确认执行的函数
	var id = 'confirmWindow' + windowCount.toString();
	if( typeof(func) == 'function'){
		// 往页面添加弹出框
		addPopUp_extend(id,title,msg,showcancelbt,oktxt,canceltxt,width,height);
		windowCount++;
		// 显示弹出框
		$('#'+id).modal('show');
		// 绑定确定按钮事件
		$('#'+id+'_sure').click(function(){
			func();
			$('#'+id).modal('hide');
			$('#'+id).remove();
		});
		// 绑定取消按钮事件
		if( typeof(funcs) == 'function' ){
			$('#'+id+'_cancel').click(function(){
				funcs();
				$('#'+id).modal('hide');
				$('#'+id).remove();
			});
		}else{
			$('#'+id+'_cancel').click(function(){
				if(typeof(funcs)=='function'){
					funcs();
				}
				$('#'+id).modal('hide');
				$('#'+id).remove();
			});
		}
	}else{
		// 往页面添加弹出框
		addPopUp_extend(id,title,msg,showcancelbt,oktxt,canceltxt,width,height);
		windowCount++;
		// 显示弹出框
		$('#'+id).modal('show');
		// 绑定确定按钮事件
		$('#'+id+'_sure','#'+id+'_cancel').click(function(){
			$('#'+id).modal('hide');
			$('#'+id).remove();
		});
	}
	$('#'+id+' .close').click(function(){
		$('#'+id).modal('hide');
		$('#'+id).remove();
	})
}

/* 只含确认按钮的弹出框 */
var kdalert = function(title,msg,func){
	var id = 'alertWindow' + windowCount.toString();
	
	if( typeof(func) == 'function'){
		// 往页面添加弹出框
		addPopUp(id,title,msg,false);
		windowCount++;
		// 显示弹出框
		$('#'+id).modal('show');
		// 绑定确定按钮事件
		$('#'+id+'_sure').click(function(){
			func();
			$('#'+id).modal('hide');
			$('#'+id).remove();
		});
	}else{
		// 往页面添加弹出框
		addPopUp(id,title,msg,false);
		windowCount++;
		// 显示弹出框
		$('#'+id).modal('show');
		// 绑定确定按钮事件
		$('#'+id+'_sure').click(function(){
			$('#'+id).modal('hide');
			$('#'+id).remove();
		});
	}
	$('#'+id+' .close').click(function(){
		$('#'+id).modal('hide');
		$('#'+id).remove();
	})
}
// 刷新页面
var refreshFunction = function(id){
	// id用以定位锚点
	if( id == undefined ){
		if( window.location.hash.length > 1){
			id = window.location.hash;
		}else{
			id = "";
		}
	}else{
		id = "#" + id;
	}
	var path = window.location.protocol + "//" + window.location.host + window.location.pathname + "?";
	var search = window.location.search.substr(1);
	if( search.length == 0){
		window.location.href = path +"_=" + Math.random() + id;
	}else {
		var reg = new RegExp("_=([^&]*)", "i");
		var r = search.substr(1).match(reg);
		if (r != null){// url已存在 _=******* 的字段
			var newUrl = window.location.href.replace(r[0],"_="+Math.random());
			window.location.href = path + search.replace(r[0],"_="+Math.random()) + id;
		}else{
			window.location.href = path + search + "&_=" + Math.random() + id;
		}
	}
}
// 无操作函数
var emptyFunction = function(){
	return false;
}