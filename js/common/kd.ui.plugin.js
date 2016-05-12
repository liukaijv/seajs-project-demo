$.extend({

	kd: {
		kdTimeout: null,
		kdInterval: null,
		kdLoadImage: function($obj, src, defaultImg, onLoaded) {
		    var self = this;
		    this.src = src;
		    this.width = 0;
		    this.height = 0;
		    this.onLoaded = onLoaded;
		    this.loaded = false;
		    this.image = null;
		    
		    this.load = function() {
		        if(this.loaded) return;
		        this.image = new Image();
		        this.image.src = this.src;
		        function loadImage(){
		            if($.browser.msie && (self.width != 28 && self.height != 30 && self.width != 0 && self.height != 0) || !$.browser.msie && self.width != 0 && self.height != 0) {
		                clearTimeout(timeout);
		                clearInterval(interval);
		                self.loaded = true;
		                $obj.attr("src", src);
		                if(typeof self.onLoaded == "function") self.onLoaded(src);
		            }
		            self.width = self.image.width;
		            self.height = self.image.height;
		        }
		        var interval = setInterval(loadImage, 100);
		        var timeout = setTimeout(function() {
	            	clearInterval(interval);
	            	$obj.attr("src", defaultImg);
					if(typeof self.onLoaded == "function") self.onLoaded(defaultImg);
				}, 5000);
		    }
		},
		
		kdValidateNull: function(id, msg) {
			if(id) {
				var $obj = $("#" + id);
				
				if($obj.size() > 0 && $obj.eq(0).val().replace(/^ +| +$/g,'') == '') {
					$.kd.kdMsg(msg, "error");
					return true;
				}
			}
		},
		
		kdEllipsis: function($obj) {
			$obj.each(function (i) {
				var reg = /(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/;
	            var $p = $("p", $(this)).eq(0), text = $p.text(), divH = $(this).height();
	            
	            var replaceTxt = function(t) {
	            	var txt = t.substr(0, parseInt(t.length / 2));
	                $p.text(txt.replace(reg, "..."));
	            	if($p.outerHeight() > divH) {
	            		replaceTxt(txt)
	            	} else {
	            		$p.text(t);
			            while ($p.outerHeight() > divH) $p.text($p.text().replace(reg, "..."));
	            	}
	            }
	            
	            replaceTxt(text);
	        });
		},
		
		kdPager: {
			pager: 'page_area', // container id
			currentPage: 1, // 当前页码
			totalPage: 1, // 总页码
			totalRecords: 0, // 总数据条数
			isGoPage: true, // 是否显示页码跳转输入框
			isShowTotalPage: true, // 是否显示总页数
			isShowTotalRecords: true, // 是否显示总记录数
			prefix: '', // 链接前部
			suffix: '', // 链接尾部
			tagurl:'',
			getLink: function(n) {
				var former = "", latter = "";
				if(typeof this.prefix == 'function') {
					former = this.prefix(n);
				} else {
					former = this.prefix;
				}
				
				if(typeof this.suffix == 'function') {
					latter = this.suffix(n);
				} else {
					latter = this.suffix;
				}
				
				return former + (latter ? "?" + latter : "");
			},
			
			inpage: function(vobj) { // 跳转框得到输入焦点时
			    //alert(vobj);
				$('#btn_go_input').attr('hideFocus', true);
				$('#go_page_wrap').css('border-color', '#F50');
				//$('#btn_go').css('left', 0).show().animate({left: '+=34'}, 100);
			},
	
			outpage: function() { // 跳转框失去输入焦点时
				/*setTimeout(function() {
					$('#btn_go').animate({left: '-=34'}, 100, function() {
						$('#btn_go').css('left', 0).hide();
						$('#go_page_wrap').css('border-color', '#DFDFDF');
					});
				}, 400);
				*/
			},
			
			gopage: function(vobj,vtotalpage,vtagurl) {
				var str_page=vobj.parentNode.children.btn_go_input.value;
				//var str_page = $("#btn_go_input").val();
				if (isNaN(str_page)) {
					//$("#btn_go_input").val(this.next);
					vobj.parentNode.children.btn_go_input.value="1";
					return;
				}
				var n = parseInt(str_page);
				if (n < 1 || n > vtotalpage) {
					//$("#btn_go_input").val(this.next);
					vobj.parentNode.children.btn_go_input.value="1";
					return;
				}
			    if (isNaN(vtagurl)){window.location.href =vtagurl+n;}else{
					window.location.href =this.getLink(n);
					
				}
			},
	
			init: function(config) {
				this.currentPage = isNaN(config.currentPage) ? 1 : parseInt(config.currentPage);
				this.totalPage = isNaN(config.totalPage) ? 1 : parseInt(config.totalPage);
				this.totalRecords = isNaN(config.totalRecords) ? 0 : parseInt(config.totalRecords);

				if (config.pager) this.pager = config.pager;
				if (config.isShowTotalPage) this.isShowTotalPage = config.isShowTotalPage;
				if (config.isShowTotalRecords) this.isShowTotalRecords = config.isShowTotalRecords;
				if (config.isGoPage) this.isGoPage = config.isGoPage;
				
				this.prefix = config.prefix || '';
				this.suffix = config.suffix || '';
				this.tagurl = config.tagurl || '';			
				if (this.currentPage < 1) this.currentPage = 1;
				this.totalPage = (this.totalPage <= 1) ? 1 : this.totalPage;
				if (this.currentPage > this.totalPage) this.currentPage = this.totalPage;
				this.prv = (this.currentPage <= 2) ? 1 : (this.currentPage - 1);
				this.next = (this.currentPage >= this.totalPage - 1) ? this.totalPage: (this.currentPage + 1);
				this.hasPrv = (this.currentPage > 1);
				this.hasNext = (this.currentPage < this.totalPage);
				this.inited = true;
				
				$.kd.kdPager.generPageHtml();
				return this;
			},
			
			checkKey: function(e) {
				if(e.keyCode == 13) {
					$.kd.kdPager.gopage();
					return true;
				} else if(e.keyCode < 48 || e.keyCode > 57) {
					return false;
				}
			},
	
			generPageHtml: function() {
				if (!this.inited) return;
				
				var str_prv = [], str_next = [];
				if (this.hasPrv) {
					str_prv.push("<li class='first'><a class='first' target='_self' href='", this.getLink(1), "'>首页</a></li>");
					str_prv.push("<li class='pre'><a class='prev' target='_self' href='", this.getLink(this.prv), "'>上一页</a></li>");
				} else {
					str_prv.push("<li class='disabled'><a class='first'>首页</a></li>");
					str_prv.push("<li class='pre disabled'><a class='disabled prev'>上一页</a></li>");
				}
	
				if (this.hasNext) {
					str_next.push("<li class='next'><a class='next' target='_self' href='", this.getLink(this.next), "'>下一页</a></li>");
					str_next.push("<li class='last'><a class='last' target='_self' href='", this.getLink(this.totalPage), "'>末页</a></li>");
				} else {
					str_next.push("<li class='next disabled'><a class='disabled next'>下一页</a></li>");
					str_next.push("<li class='last disabled'><a class='last' target='_self'>末页</a></li>");
				}
	
				var str = [], total_info = [];
				if (this.isShowTotalPage || this.isShowTotalRecords) {
					total_info.push("<li class='disabled'><a class='normalsize'>共");
					if (this.isShowTotalPage) {
						total_info.push(this.totalPage, "页");
					}
	
					total_info.push("</a></li>");
				}
	
				var gopage_info = [];
				//if (this.isGoPage) {
				//	gopage_info.push(
				//		"<span class='normalsize'>转到</span>",
				//		"<span id='go_page_wrap' class='goto'>",
				//			"<input id='btn_go' type='button' class='gotobutton' style='left:34px;display:block' onclick='$.kd.kdPager.gopage(this,\"",this.totalPage,"\",\"",this.tagurl,"\");' value='确定' />",
				//			"<input id='btn_go_input' type='text' class='gotoinput' onfocus='$.kd.kdPager.inpage(this)' onkeypress='$.kd.kdPager.checkKey(event)' onblur='$.kd.kdPager.outpage()' value='", this.next, "' />",
				//		"</span>",
				//		"<span class='normalsize'>页</span>"
				//	);
				//}
	
				if (this.totalPage <= 8) {
					for (var i = 1; i <= this.totalPage; i++) {
						if (this.currentPage == i) {
							str.push("<li class='page active' pnum='"+i+"'><a page='"+i+"'>", i,"</a><li>");
						} else {
							str.push("<li class='page' pnum='"+i+"'><a target='_self' page='"+i+"' href='", this.getLink(i), "'>", i, "</a></li>");
						}
					}
				} else {
					if (this.currentPage <= 5) {
						for (var i = 1; i <= 7; i++) {
							if (this.currentPage == i) {
							str.push("<li class='page active' pnum='"+i+"'><a page='"+i+"'>", i,"</a><li>");
							} else {
								str.push("<li class='page' pnum='"+i+"'><a target='_self' page='"+i+"' href='", this.getLink(i), "'>", i, "</a></li>");
							}
						}
						//str.push("<li class='disabled'><a>共", this.totalPage, "页</a></li>");
					} else {
						//str.push("<li class='page' pnum='1'><a page='1' href='", this.getLink(1), "''>1</a></li>");
	
						var begin = this.currentPage - 2;
						var end = this.currentPage + 2;
						if (end > this.totalPage) {
							end = this.totalPage;
							begin = end - 4;
							if (this.currentPage - begin < 2) begin = begin - 1;
						} else if (end + 1 == this.totalPage) {
							end = this.totalPage;
						}
						for (var i = begin; i <= end; i++) {
							if (this.currentPage == i) {
								str.push("<li class='page active' pnum='"+i+"'><a class='curr' page='"+i+"'>", i, "</a>");
							} else {
								str.push("<li class='page' pnum='"+i+"'><a href='", this.getLink(i), "' page='"+i+"'>", i, "</a></li>");
							}
						}
						if (end != this.totalPage) {
							str.push("<li class='page' pnum='"+this.totalPage+"><a page='"+this.totalPage+"' href='", this.getLink(this.totalPage), "'>", this.totalPage, "</a></li>");
						}
					}
				}
				$("#" + this.pager).html("" + str_prv.join("") + str.join("") + str_next.join("") + total_info.join("") + gopage_info.join("") + "");
			}
		},
		
		kdMsg: function(content, type, backcall, delay) {
			clearTimeout($.kd.kdTimeout);
			$("#kd-ui-message").remove();
			
			if(delay == -1) return;
			$("body").append("<div id='kd-ui-message' style='position: fixed;_position: absolute;' class='" + (type ? type : "info") + "'>" + content + "</div>");
			$("#kd-ui-message").css({
				top: "50px", 
				left:"50%", 
				opacity: "0", 
				marginLeft: -((parseInt($("#kd-ui-message").width()) + 40) / 2) + "px",
				zIndex: "1000000"
			}).animate({opacity: "1", top: "90px"}, "slow");
			
			if(!delay || delay > 0) {
				$.kd.kdTimeout = setTimeout(function() {
					$("#kd-ui-message").animate({opacity: "0", top: "50px"}, "slow", function(){
						$(this).remove();
						if(typeof backcall == "function") backcall();
					});
				}, delay ? delay : 3000);
				
				$("#kd-ui-message").bind("mouseover", function() {
					clearTimeout($.kd.kdTimeout);
				}).bind("mouseout", function() {
					$.kd.kdTimeout = setTimeout(function() {
						$("#kd-ui-message").animate({opacity: "0", top: "50px"}, "slow", function(){
							$(this).remove();
							if(typeof backcall == "function") backcall();
						});
					}, delay ? delay : 3000);
				});
			}
			
		},
		
		showLoading: function($obj, txt) {
			$obj.after('<span id="kd-ui-loading" class="kdValidform_loading">' + (txt ? txt : '正在处理中') + '<span style="min-width: 15px"></span></span>');
			$.kd.kdInterval = setInterval(function() {
				if($("#kd-ui-loading>span").text().length < 4) {
					$("#kd-ui-loading>span").append(".")
				} else {
					$("#kd-ui-loading>span").text("");
				}
			}, 500);
		},
		
		closeLoading: function() {
			clearInterval($.kd.kdInterval);
			$("#kd-ui-loading").remove();
			$("#iframepage").contents().find("#kd-ui-loading").remove()
		},
	
		kdWin: function (width, height, title, contentInfo, backcallok, type, contentType, hidebg, undrag, backcallcancel, okTxt, cancelTxt, onload) {
			$.kd.kdWin.backcallok = backcallok;
			$.kd.kdWin.backcallcancel = backcallcancel;
			$("#kd-ui-dialog-box, #kd-ui-dialog-bg").remove();
			var width = width >= 950 ? this.width = 950 : this.width = width;
			var height = height >= 680 ? this.height = 527 : this.height = height;
			
			var winHTML = []			
			winHTML.push("<div id='kd-ui-dialog-bg' style='height: ", $(document).height(), "px;filter: alpha(opacity=0);opacity: 0;z-index: 100000000';", (hidebg ? "display: none" : ""), "></div>");
			winHTML.push("<div id='kd-ui-dialog-box'>");
			winHTML.push("<div id='kd-ui-dialog-title'><h2>", title, "</h2><span id='kd-ui-dialog-close'></span></div>");
			winHTML.push("<div id='kd-ui-dialog-content-border'><div id='kd-ui-dialog-content'></div></div>");
			winHTML.push("<div id='kd-ui-dialog-bottom'>", (type > 0 ? "<input id='kduiokbtn' type='button' class='kdmall-btn' value='" + (okTxt ? okTxt : "\u786E\u5B9A") +　"'>" : ""), (type == 2 ? "<input type='button' class='kdmall-btn cancel' id='kduicancelbtn' style='margin-left: 8px;'  value='" + (cancelTxt ? cancelTxt : "\u53D6\u6D88") +　"'>" : ""), "</div>");
			winHTML.push("</div>");
			
			$("body").append(winHTML.join(""));
			contentType = contentType ? contentType : "text";
			
			switch (contentType) {
			  	case "text":
					$("#kd-ui-dialog-content").html("<div class='" + (type == 1 ? "alert" : (type == 2 ? "confirm" : "")) + "'>" + contentInfo + "</div>");
					break;
			  	case "id":
					$("#kd-ui-dialog-content").html($("#" + contentInfo + "").html());
					$("#" + contentInfo + "").html("");
					break;
			  	case "img":
					$("#kd-ui-dialog-content").ajaxStart(function () {
						$(this).html("<img src='statics/common/images/loading.gif' class='loading'/>");
					});
					$.ajax({
						url: contentInfo,
						type: contentType,
						error: function() {
							$("#kd-ui-dialog-content").html("<p class='kd-ui-dialog-error'>\u52a0\u8f7d\u6570\u636e\u51fa\u9519...</p>");
						},
						success: function(html) {
							$("#kd-ui-dialog-content").html("<img src=" + contentInfo + " />");
						}
					});
				break;
			  	case "url":
					$("#kd-ui-dialog-content").ajaxStart(function () {
						$(this).html("<img src='statics/common/images/loading.gif' class='loading' />");
					});
					$.ajax({
						url: contentInfo,
						type: contentType,
						error:function () {
							$("#kd-ui-dialog-content").html("<p class='kd-ui-dialog-error'>\u52a0\u8f7d\u6570\u636e\u51fa\u9519...</p>");
						}, success:function (html) {
							$("#kd-ui-dialog-content").html(html);
						}
					});
					break;
			  	case "iframe":
					$("#kd-ui-dialog-content").ajaxStart(function () {
						$(this).html("<img src='statics/common/images/loading.gif' class='loading' />");
					});
					$.ajax({
						url: contentInfo,
						error:function () {
							//alert(e)
							$("#kd-ui-dialog-content").html("<p class='kd-ui-dialog-error'>\u52a0\u8f7d\u6570\u636e\u51fa\u9519...</p>");
						},
						success: function (html) {
							$("#kd-ui-dialog-content").html("<iframe src=\"" + contentInfo + "\" width=\"100%\" height=\"" + (parseInt(height) - 45) + "px" + "\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
						}
					});
			}
			
			$("#kd-ui-dialog-bg").css({opacity: "0.5",filter: "alpha(opacity=50)"});
			
			if (height >= 527) {
				$("#kd-ui-dialog-content").css("width", "auto");/*parseInt(width) + 10)*/;
			} else {
				$("#kd-ui-dialog-title").css("width", "auto");/*parseInt(width) + 10)*/;
				$("#kd-ui-dialog-content").css("width", width);
			}
			
			if(type == 0) $("#kd-ui-dialog-content").css("height", height - 65);
			
			var cw = document.documentElement.clientWidth;
			var ch = document.documentElement.clientHeight;
			var est = document.documentElement.scrollTop;

			if ($.browser.version == 6) {
				$("#kd-ui-dialog-box").css({
					left: "50%", 
					top: (parseInt((ch) / 2) + est) + "px", 
					marginTop: -((parseInt(height) + 53) / 2) + "px", 
					marginLeft: -((parseInt(width) + 25) / 2) + "px",
					zIndex: "100000001"
				});
			} else {
				$("#kd-ui-dialog-box").css({
					top: "50%", 
					left:"50%", 
					marginTop: -((parseInt(height) + 53) / 2) + "px",
					marginLeft: -((parseInt(width) + 25) / 2) + "px",
					zIndex: "100000001"
				}).animate({opacity: "1"}, "normal");
			}
			
			var Drag_ID = document.getElementById("kd-ui-dialog-box");
			var DragHead = document.getElementById("kd-ui-dialog-title");
			var moveX = 0, moveY = 0, moveable = false, moveLeft = 0, moveTop = $.browser.version == 6 ? est: 0;
			
			var sw = Drag_ID.scrollWidth;
			var sh = Drag_ID.scrollHeight;

			DragHead.onmouseover = function (e) {
				DragHead.style.cursor = undrag == "true" ? "default" : "move";
			};
			
			DragHead.onmousedown = function (e) {
				var ol = Drag_ID.offsetLeft;
				var ot = Drag_ID.offsetTop - moveTop;
				
				e = window.event ? window.event : e;
				moveable = undrag == "true" ? false : true
				moveX = e.clientX - ol;
				moveY = e.clientY - ot;
				document.onmousemove = function (e) {
					if (moveable) {
						e = window.event ? window.event : e;
						var x = e.clientX - moveX;
						var y = e.clientY - moveY;
						if (x > 0 && (x + sw < cw) && y > 0 && (y + sh < ch)) {
							Drag_ID.style.left = x + "px";
							Drag_ID.style.top = parseInt(y + moveTop) + "px";
							Drag_ID.style.margin = "auto";
						}
					}
				};
				document.onmouseup = function () {
					moveable = false;
				};
				Drag_ID.onselectstart = function (e) {
					return false;
				};
			};

			$("#kd-ui-dialog-close").click(function () {
				if(contentType == "id") $("#" + contentInfo + "").html($("#kd-ui-dialog-content").html());
				$("#kd-ui-dialog-box, #kd-ui-dialog-bg").remove();
			});
			$("#kduiokbtn").click(function () {
				$("#kd-ui-dialog-close").click();if(typeof $.kd.kdWin.backcallok == "function") $.kd.kdWin.backcallok();
			});
			$("#kduicancelbtn").click(function () {
				$("#kd-ui-dialog-close").click();if(typeof $.kd.kdWin.backcallcancel == "function") $.kd.kdWin.backcallcancel();
			});
			if(onload && typeof onload == "function") onload();
			
			$("#kduiokbtn").focus();
		}, 
		
		kdWindow: function(width, height, title, content, backcall, hidebg, undrag) {
			$.kd.kdWin(width, height, title, content, backcall, 0, "iframe", hidebg, undrag);
		},
		
		kdAlert: function(content, backcall, title) {
			$.kd.kdWin(400, 150, title ? title : "\u4fe1\u606f\u63d0\u793a", content, backcall, 1);
		},
		
		kdAlertXY: function(content, backcall, title) {
			$.kd.kdWin(800, 200, title ? title : "\u8B66\u544A", content, backcall, 1);
		},

		kdConfirm: function(content, backcallok, backcallcancle, title, okTxt, cancelTxt) {
			$.kd.kdWin(400, 150, title ? title : "\u6D88\u606F", content, backcallok, 2, "text", false, false, backcallcancle, okTxt, cancelTxt);
		},
		kdZhifu: function(content, backcall, title) {
			$.kd.kdWin(400, 150, title ? title : "\u8B66\u544A", content, backcall, 0);
		},
		kdhbZhifu: function(content, backcall, title, url) {
			$.kd.kdWin(400, 150, title ? title : "\u8B66\u544A", content, backcall, 0);
			
			$("#kd-ui-dialog-close").click(function () {
				if(url){
					window.location.href = url;
				}
			});
		}
	}
});
