$.extend({
    kingdom: {
        doKoauthAPI: function(api_name, api_version, api_params, cbfunc) {
                var param = $.kingdom.getAjaxParams(api_name, api_version, api_params);
                $.post("/api", param, function(data) {
                    if (cbfunc) {
                        cbfunc(data);
                    }
                }, "json");
            } //doKoauthAPI  :可以当做简单封装之后的ajax请求（在不需要使用handlebar发请求时使用）
            ,
		doKoauthCode: function(params, cbfunc) {

                var param = $.kingdom.getCodeAjaxParams(params, cbfunc);
                $.post("/code", param, function(data) {
                    if (cbfunc) {
                        cbfunc(data);
                    }
                }, "json");
            }
            ,
        doKoauthAPISync: function(api_name, api_version, api_params, cbfunc) {
                var param = $.kingdom.getAjaxParams(api_name, api_version, api_params);
                $.ajax({
                    type: "post",
                    url: "/api",
                    dataType: 'json',
                    data: param,
                    async: false
                }).done(function(data) {
                    if (typeof data != "object") {
                        data = eval("(" + data + ")")
                    }
                    if (cbfunc) {
                        cbfunc(data);
                    }
                });
            } //doKoauthAPI
            ,
        doCloudKoauthAPI: function(api_name, api_version, api_params, cbfunc) {
                var param = $.kingdom.getAjaxParams(api_name, api_version, api_params);
                $.post("/api_cloud", param, function(data) {
                    if (cbfunc) {
                        cbfunc(data);
                    }
                }, "json");
            } //doCloudKoauthAPI(用于调用接入的各金融机构的接口)
            ,
        doCloudKoauthAPISync: function(api_name, api_version, api_params, cbfunc) {
                var param = $.kingdom.getAjaxParams(api_name, api_version, api_params);
                $.ajax({
                    type: "post",
                    url: "/api_cloud",
                    dataType: 'json',
                    data: param,
                    async: false
                }).done(function(data) {
                    if (typeof data != "object") {
                        data = eval("(" + data + ")")
                    }
                    if (cbfunc) {
                        cbfunc(data);
                    }
                });
            } //doCloudKoauthAPISync(用于调用接入的各金融机构的接口)
            ,
        doCloudPrivateKoauthAPI: function(api_params, cbfunc) {
                //var param = $.kingdom.getAjaxParams(api_name, api_version, api_params);
                var api_params = api_params;
                api_params.api_name = "cloud_add_cust_register_plat";
                api_params.api_version = "v1.3";
                $.post("/cloud_third_valid", api_params, function(data) {
                    if (cbfunc) {
                        cbfunc(data);
                    }
                }, "json");
            } //doCloudPrivateKoauthAPI(用于获取接入的各金融机构的授权接口)
            ,
        getLoginName: function(cbfunc) {
                $.post("/login_name", {}, function(data) {
                    if (cbfunc) {
                        cbfunc(data);
                    }
                }, "json");
            } //getLoginName
            ,
        getRedirect: function(cbfunc) { //登录跳转            
            $.ajax({
                type: "post",
                url: "/redirect",
                dataType: 'json',
                async: true
            }).done(function(data) {
                var result = "";
                if (data.kdjson.flag == "1") {
                    result = data.kdjson.items[0].redirect;
                }
                if (cbfunc) {
                    cbfunc(result)
                }
            });
            //return result;
        },
        logout: function(cbfunc) {
                $.post("/logout", {}, function(data) {
                    if (cbfunc) {
                        cbfunc(data);
                    }
                }, "json");
            } //logout
            ,
        getAjaxParams: function(a, v, p) {
                var random = Math.floor(Math.random() * 10) % 3;
                if (random == 0) {
                    return $.kingdom.get16(a, v, p);
                } else if (random == 1) {
                    return $.kingdom.getK(a, v, p);
                } else {
                    return $.kingdom.getL(a, v, p);
                }
            } //getAjaxParams
            ,
        getCodeAjaxParams: function(params) {
                var pp = {};
                var random = "kingdom"+new Date().getTime()+"" ;
                pp[random] = $.base64.encode(encodeURIComponent(JSON.stringify(params)));

                return pp ;
            } 
            ,
        get16: function(a, v, p) {
                var pp = {};
                var _t = new Date().getTime() + "";
                var _p = JSON.stringify(p);
                pp._0x0111 = $.base64.encode(_t);
                pp._0x1011 = $.base64.encode(a);
                pp._0x1100 = $.base64.encode(v);
                pp._0x1110 = $.base64.encode(encodeURIComponent(_p));
                pp._0x1001 = $.md5(pp._0x0111 + pp._0x1011 + pp._0x1100 + pp._0x1110).toUpperCase()
                pp._0x1101 = $.base64.encode(document.location.hostname);
                return pp;
            } //get16
            ,
        getK: function(a, v, p) { //_params.._version .. _timestamp .. _api_name
                var pp = {};
                var _t = new Date().getTime() + "";
                var _p = JSON.stringify(p);
                pp.KInGDOM = $.base64.encode(_t);
                pp.KINGdOM = $.base64.encode(a);
                pp.KINGDoM = $.base64.encode(v);
                pp.KiNGDOM = $.base64.encode(encodeURIComponent(_p));
                pp.kINGDOM = $.md5(pp.KiNGDOM + pp.KINGDoM + pp.KInGDOM + pp.KINGdOM).toUpperCase()
                pp.KINgDOM = $.base64.encode(document.location.hostname);
                pp.KINGDOm = $.base64.encode(document.location.protocol);
                return pp;
            } //getK
            ,
        getL: function(a, v, p) {
                var pp = {};
                var _t = new Date().getTime() + "";
                var _p = JSON.stringify(p);
                pp.css = $.base64.encode(_t);
                pp.android = $.base64.encode(a);
                pp.html = $.base64.encode(v);
                pp.ios = $.base64.encode(encodeURIComponent(_p));
                pp.js = $.md5(pp.ios + pp.android + pp.css + pp.html).toUpperCase()
                pp.wp = $.base64.encode(document.location.hostname);
                return pp;
            } //getL
            ,
        upload: function(form_id, cbfunc) { //上传
                var options = {
                    url: "/upload",
                    type: "POST",
                    dataType: "json",
                    success: function(data) {
                        var jsondata = {};
                        if (typeof(data) == "string") {
                            jsondata = eval('(' + data + ')');
                        }
                        if (cbfunc) {
                            cbfunc(jsondata);
                        }
                    },
                    error: function(e) {
                        var jsondata = {};
                        if (typeof(e.responseText) == "string") {
                            jsondata = eval('(' + e.responseText + ')');
                        }
                        if (cbfunc) {
                            cbfunc(jsondata);
                        }
                    }
                };
                $("#" + form_id).ajaxSubmit(options);
            } //upload
            ,
            cutimage: function(form_id, cbfunc) { //裁剪
                var options = {
                    url: "/cutimage",
                    type: "POST",
                    dataType: "json",
                    success: function(data) {
                        var jsondata = {};
                        if (typeof(data) == "string") {
                            jsondata = eval('(' + data + ')');
                        } else {
							jsondata = data ;
                        }
                        if (cbfunc) {
                            cbfunc(jsondata);
                        }
                    },
                    error: function(e) {
                        var jsondata = {};
                        if (typeof(e.responseText) == "string") {
                            jsondata = eval('(' + e.responseText + ')');
                        } else {
							jsondata = data ;
                        }
                        if (cbfunc) {
                            cbfunc(jsondata);
                        }
                    }
                };
                $("#" + form_id).ajaxSubmit(options);
            } //cutimage
            ,
        getUrlParameter: function(name) { //获取url参数
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        },
		getCookieParameter: function(name) { //获取cookie参数
            var reg = new RegExp( name + '=([^;]*)(;|$)', 'i');
            var r = document.cookie.match(reg);
            if (r != null) {
                return $.base64.decode(decodeURI(r[1]));
            }
            return null;
        },
        fixMoney: function(s, n) { //格式化金额如：1,100,000.00
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            t = "";
            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        },
        replaceString: function(s, n, r) {
            //s:字符串;n:保留字符串前后n位数不被替换;r:默认替换“*”
            var r = r ? r : "*";
            var l = s.length;
            j = "";
            for (var i = l - n; i > 0; i--) {
                j = r.concat(j);
            };
            return s = s.replace(s.substr(n, l - n), j);
        },
        uniqueArray: function(arry) {//数组去重
            var n = {},
                r = []; //n为hash表，r为临时数组
            for (var i = 0; i < arry.length; i++) //遍历当前数组
            {
                if (!n[arry[i]]) //如果hash表中没有当前项
                {
                    n[arry[i]] = true; //存入hash表
                    r.push(arry[i]); //把当前数组的当前项push到临时数组里面
                }
            }
            return r;
        }
    }
});