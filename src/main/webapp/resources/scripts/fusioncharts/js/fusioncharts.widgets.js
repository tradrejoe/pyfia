/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.7.0
*/
FusionCharts.register("module", ["private", "modules.renderer.js-messagelogger", function() {
    var Y = this.hcLib,
        cb = Y.Raphael,
        Ua, Za = Y.isIE,
        Ga = Y.graphics.HEXtoRGB,
        y = Y.graphics.convertColor,
        Aa, L, $a, oa, q, D, h, ea, ta, K, T, X, ca, Oa, Ha = this.window,
        ma = Ha.document,
        tb = 8 === ma.documentMode,
        V = !0,
        W = !1,
        F = Y.pluck,
        pa = Y.pluckNumber,
        ub = Y.FC_CONFIG_STRING,
        Ba = {
            display: "block",
            paddingLeft: "10px",
            paddingRight: "10px",
            "font-family": "Arial",
            "font-size": "11px"
        },
        w = function(h, q) {
            var u = this,
                D;
            q || (q = "");
            for (D = u.indexOf(h); - 1 !== D;) u = u.replace(h,
                q), D = u.indexOf(h);
            return u
        };
    Oa = function(w, F, u) {
        var L = w.hcJSON,
            T = L && L[ub],
            K = F && F.chartWidth,
            O = F && F.chartHeight,
            L = oa / 100 * K,
            ca = q / 100 * O,
            da = (K - L) / 2,
            pa = (O - ca) / 2,
            ma = L - 18 - 22,
            ha = ca - 18 - 22,
            Ba = ea,
            ta = ea;
        w = u.html("div", {
            fill: "transparent",
            width: K,
            height: O
        }, {
            fontSize: "10px",
            lineHeight: "15px",
            fontFamily: (T && T.inCanvasStyle || w.inCanvasStyle).fontFamily
        }, F && F.container);
        w.veil = u.html("div", {
            id: "veil",
            fill: "000000",
            width: K,
            height: O,
            opacity: .1
        }, void 0, w).on("click", function() {
            X && Y.messageLogger.close()
        });
        h && D && (w.title =
            u.html("p", {
                id: "Title",
                innerHTML: h,
                x: 5,
                y: 5
            }, {
                "font-weight": "bold"
            }, w));
        w.dialog = u.html("div", {
            id: "dialog",
            x: da,
            y: pa,
            fill: "ffffff",
            strokeWidth: 1,
            stroke: Ba,
            width: L,
            height: ca
        }, {
            borderRadius: "5px",
            boxShadow: "1px 1px 3px #000000",
            "-webkit-border-radius": "5px",
            "-webkit-box-shadow": "1px 1px 3px #000000",
            filter: 'progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color="#000000")'
        }, w);
        w.logBackground = u.html("div", {
            id: "dialogBackground",
            x: 0,
            y: 0,
            fill: ta,
            width: L,
            height: ca
        }, void 0, w.dialog);
        X &&
            (w.closeBtnContainer = u.html("div", {
                id: "closeBtnContainer",
                width: 18,
                height: 18,
                x: da + L - 21,
                y: pa + 3
            }, {}, w), F = new cb("closeBtnContainer", 18, 18), K = F.group("closeGroup"), w.closeButton = F.symbol("closeIcon", 0, 0, 6, K).attr({
                transform: "t9,9",
                "stroke-width": 2,
                stroke: y("999999"),
                ishot: !0,
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            }).css({
                cursor: "pointer",
                _cursor: "hand"
            }).click(function() {
                Y.messageLogger.close()
            }));
        w.logWrapper = u.html("div", {
                id: "logWrapper",
                x: (L - ma) / 2,
                y: (ca - ha) / 2,
                width: ma,
                height: ha
            }, {
                overflow: "auto"
            },
            w.dialog).on("scroll", function() {
            var h = this && this.scrollTop,
                q = this && this.scrollHeight,
                u = this && this.offsetHeight;
            W ? W = !1 : V = q - h === u ? !0 : !1
        });
        w.log = u.html("div", {
            id: "log",
            x: 0,
            y: 0
        }, {}, w.logWrapper);
        w.hide();
        return w
    };
    Ua = function(h, q, u, w) {
        if (Y.messageLogger) return Y.messageLogger;
        this.chart = h;
        this.instanceAPI = q;
        this.renderer = u;
        this.paper = w;
        this.menuCreated = !1;
        this.log = (h = this.ui = Oa(q, u, w)) && h.log;
        h && this.updateStatus("INITIALIZED")
    };
    Ua.prototype = {
        STATUS: "",
        updateStatus: function(h) {
            var q = this.renderer,
                q =
                q && q.menu instanceof Array && q.menu[0];
            this.status = h;
            switch (q && this.status.toLowerCase()) {
                case "initialized":
                    Aa ? q.hideItem(4) : q.hideItem(1);
                    break;
                case "closed":
                    Aa ? q.showItem(3) : q.showItem(0);
                    Aa ? q.hideItem(4) : q.hideItem(1);
                    break;
                case "active":
                    Aa ? q.showItem(4) : q.showItem(1), Aa ? q.hideItem(3) : q.hideItem(0)
            }
        },
        appendMessage: function(h) {
            var q = this.status,
                u = F(h.msgid, ""),
                D = F(h.msgtitle, ""),
                y = F(h.msgtext, ""),
                L = h && F(h.msgtype, "literal"),
                O = h && !!pa(h.clearlog, 0),
                ca = h && !!pa(h.hidelog, 0),
                da = h && !!pa(h.showlog, 0),
                oa = h && !!pa(h.msggoestolog, $a),
                Y = h && !!pa(h.msggoestojs, ta);
            oa && "INITIALIZED" === q && this.updateStatus("CLOSED");
            ca && this.close();
            O && this.clear();
            da && this.open();
            oa && "ACTIVE" !== this.status && this.show();
            if (("" !== D && void 0 !== D || "" !== y && void 0 !== y) && this.log && oa) {
                var q = this.log,
                    O = h && h.msgtitle,
                    ca = h && h.msgtext,
                    da = h && F(h.msgtype, "literal"),
                    ha, X;
                h = "";
                var ea, Da, ka;
                q && q.element && (ea = q.element);
                ea && (Da = ea.parentElement);
                O && (O += " : ");
                switch (da.toLowerCase()) {
                    case "info":
                        O && (ha = '<span style="color: #005900">$titleVal$</span>');
                        ca && (X = "<span>$msgVal$</span>");
                        break;
                    case "literal":
                        O && (ha = '<span style="color: #005900">$titleVal$</span>');
                        ca && (X = "<span>$msgVal$</span>");
                        break;
                    case "error":
                        O && (ha = '<span style="color: #CC0000">$titleVal$</span>');
                        ca && (X = '<span style="color: #CC0000">$msgVal$</span>');
                        break;
                    case "link":
                        O && (ha = '<span style="color: #005900">$titleVal$</span>');
                        ca && (X = '<a href="$msgVal$">$msgVal$</a>');
                        break;
                    default:
                        O && (ha = '<span style="color: #005900">$titleVal$</span>'), ca && (X = "<span>$msgVal$</span>")
                }
                ha && (ha =
                    ha.replace("$titleVal$", O), h += ha);
                X && (X = w.call(X, "$msgVal$", ca), h += X);
                if (ea && h) {
                    ha = ma.createElement("span");
                    for (ka in Ba) ha.style[ka] = Ba[ka];
                    ha.innerHTML = h;
                    ea.appendChild && ea.appendChild(ha);
                    Za && tb && (ka = ea.innerHTML, ea.innerHTML = ka);
                    V && (W = !0, ea = Da.scrollHeight, Da.scrollTop = ea)
                }
                Za || (this.ui.element.scrollHeight += 30, this.ui.element.scrollTop = this.ui.element.scrollHeight)
            }
            Y && K && (Y = Ha[K], "function" === typeof Y && (T ? Y(u, D, y, L) : Y(y)))
        },
        hide: function() {
            "ACTIVE" === this.status && (this.ui.hide(), this.updateStatus("BEFORE CLOSE"))
        },
        close: function() {
            "ACTIVE" === this.status && (this.ui.hide(), this.updateStatus("CLOSED"))
        },
        open: function() {
            "ACTIVE" !== this.status && (this.ui.show(), this.updateStatus("ACTIVE"))
        },
        show: function() {
            "ACTIVE" !== this.status && "CLOSED" !== this.status && (this.ui.show(), this.updateStatus("ACTIVE"))
        },
        clear: function() {
            var h = this.log;
            if (h = h && h.element)
                for (; h.hasChildNodes();) h.removeChild(h.lastChild)
        },
        destroy: function() {
            this.hide();
            this.updateStatus("DESTROYED");
            Y.messageLogger = null;
            delete Y.messageLogger;
            return null
        }
    };
    Ua.prototype.constructor = Ua;
    this.core.addEventListener(["rendered", "dataupdated", "resized"], function(w) {
        var F = w && w.sender;
        w = w && w.eventType;
        var u = F && F.jsVars,
            y = u && u.hcObj,
            W = y && y.options,
            V = u && u.instanceAPI,
            O = V && V.renderer,
            y = O && O.paper,
            W = W && W.chart,
            ma = F && F.options,
            ma = ma && ma.renderer,
            da = Y && Y.messageLogger,
            Ba = da && da.status,
            Oa = u && u._reflowData,
            ha = Oa && Oa._messageLogger || {},
            u = ha && ha.appendedMessages,
            Ha;
        if (!ma || "javascript" === ma.toLowerCase())
            if (L = W && W.useMessageLog) {
                W && (Aa = W.showRTMenuItem, $a = W.messageGoesToLog,
                    ta = W.messageGoesToJS, K = W.messageJSHandler, T = W.messagePassAllToJS, oa = W.messageLogWPercent, q = W.messageLogHPercent, D = W.messageLogShowTitle, h = W.messageLogTitle, X = W.messageLogIsCancelable, ea = W.messageLogColor, ea = ea.replace(/^#?([a-f0-9]+)/ig, "$1"), Ga(ea), ca = W.alwaysShowMessageLogMenu);
                da && (da = Y.messageLogger = da.destroy());
                Ha = (da = Y.messageLogger = new Ua(F, V, O, y)) && da.ui && da.ui.log && da.ui.log.element;
                if ("resized" === w) switch (u && (Ha.innerHTML = u), Ba.toLowerCase()) {
                    case "active":
                        da.ui.show();
                        da.updateStatus(Ba);
                        break;
                    case "closed":
                        da.updateStatus(Ba)
                }
                ca && (da.menuCreated = !0);
                F.addEventListener("RealTimeUpdateComplete", function(h, q) {
                    var u = q && q.updateObject,
                        w = u && u.msgtitle,
                        D = u && u.msgtext,
                        y = u && pa(u.showlog, 0),
                        W = u && pa(u.hidelog, 0),
                        T = u && pa(u.clearlog, 0);
                    if (w || D || y || W || T) !L || Aa || !$a || ca || da.menuCreated || (V.drawMLMenuButtons.call(O, F), da.menuCreated = !0), da.appendMessage(u), ha.appendedMessages = Ha && Ha.innerHTML, Oa._messageLogger = ha
                });
                F.addEventListener("beforeDispose", function() {
                    da && da.destroy()
                })
            }
    })
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-realtime", function() {
    var Y = this,
        cb = Y.window,
        Ua = Math,
        Za = Ua.random,
        Ga = Ua.max,
        y = Y.hcLib.pluckNumber,
        Aa = function(y, q, D) {
            clearTimeout(D);
            return setTimeout(y, q)
        },
        L, $a;
    L = function(y) {
        var q = y.sender,
            D = q.jsVars;
        y = q.__state;
        var h = D.instanceAPI,
            L = h.hcJSON,
            ta = h.numberFormatter,
            K = L && L.alerts && L.alerts.alert || [],
            D = D._rtLastUpdatedData && D._rtLastUpdatedData.values,
            T = K.length,
            X;
        if (D && D.length) {
            h = function(h) {
                var D, y = ta.getCleanValue(h),
                    L, X = function(h) {
                        return function() {
                            eval(h.param)
                        }
                    };
                for (L = 0; L < T; L += 1)
                    if (h = K[L], D = h.action && h.action.toLowerCase(), h.minvalue < y && h.maxvalue > y) {
                        if ("1" !== h.occuronce || !h.hasOccurred) {
                            h.hasOccurred = !0;
                            h.state = "1";
                            switch (D) {
                                case "calljs":
                                    setTimeout(X(h), 0);
                                    break;
                                case "showannotation":
                                    q.showAnnotation && q.showAnnotation(h.param)
                            }
                            Y.raiseEvent("AlertComplete", null, h)
                        }
                    } else "showannotation" === D && "1" === h.state && q.hideAnnotation && q.hideAnnotation(h.param), h.state = "2"
            };
            L = Ga(D.length, 0);
            for (X = 0; X < L; X += 1) y.lastSetValues && D[X] === y.lastSetValues[X] || h(D[X]);
            y.lastSetValues =
                D
        }
    };
    $a = function(oa) {
        var q = oa.sender,
            D = q.__state,
            h, ea, ta, K, T, X, ca, Oa, Ha, ma, Ga, V;
        D.dataSetDuringConstruction && !D.rtStateChanged && void 0 === D.rtPreInit && (q.dataReady() ? (D.rtStateChanged = !0, D.rtPreInit = !0) : D.rtPreInit = !1);
        D.rtStateChanged && (D.rtStateChanged = !1, h = q.jsVars, ea = h.hcObj) && (ta = ea.logic, T = (K = ea.options) && K.chart || {}, X = 1E3 * y(T.updateInterval, T.refreshInterval), ca = 1E3 * y(T.clearInterval, 0), Oa = T.dataStreamURL, Ha = T.dataStamp, T = Boolean(ta && ta.realtimeEnabled && 0 < X && void 0 !== Oa && T), K = K && K.plotOptions &&
            K.plotOptions.series.animation && K.plotOptions.series.animation.duration || 0, ma = D._rtAjaxObj, Ga = function() {
                q.clearChart && q.clearChart();
                ca && (D._toClearChart = setTimeout(Ga, ca))
            }, V = function() {
                var h = Oa,
                    h = h + ((-1 === Oa.indexOf("?") ? "?num=" : "&num=") + Za());
                Ha && (h += "&dataStamp=" + Ha);
                ma.open && ma.abort();
                ma.get(h);
                D._rtAjaxLatencyStart = new Date
            }, 0 >= X ? (D._toRealtime = clearTimeout(D._toRealtime), ma && ma.abort()) : 10 > X && (X = 10), D._toClearChart = clearTimeout(D._toClearChart), 0 < ca && (10 > ca ? ca = 10 : D._toClearChart = setTimeout(Ga,
                ca)), D._rtStaticRefreshMS = X, T && (void 0 === D._rtPaused && (D._rtPaused = !1), D._rtDataUrl = Oa, D.lastSetValues = null, ma = D._rtAjaxObj || (D._rtAjaxObj = new Y.ajax), ma.onSuccess = function(y, F, L, T) {
                if (!q.disposed) {
                    var K = h.hcObj && h.hcObj.logic;
                    L = K.linearDataParser && K.linearDataParser(y, K.multisetRealtime);
                    D._rtAjaxLatencyStart && (D._rtAjaxLatency = new Date - D._rtAjaxLatencyStart);
                    if (q.isActive() && L && ea && (ea.realtimeUpdate || K.realtimeUpdate)) {
                        Ha = L.dataStamp ? L.dataStamp : null;
                        L.interval = 1E3 > X ? X : 1E3;
                        F = q.getDataJSON();
                        ea.realtimeUpdate ?
                            ea.realtimeUpdate(L) : K.realtimeUpdate(L);
                        h._rtLastUpdatedData = K.multisetRealtime ? L : q.getDataJSON();
                        K = (K.realtimeDrawingLatency || 0) + (D._rtAjaxLatency || 0);
                        Y.raiseEvent("realtimeUpdateComplete", {
                            data: y,
                            updateObject: L,
                            prevData: F.values,
                            source: "XmlHttpRequest",
                            url: T,
                            networkLatency: D._rtAjaxLatency,
                            latency: K
                        }, oa.sender);
                        try {
                            cb.FC_ChartUpdated && cb.FC_ChartUpdated(oa.sender.id)
                        } catch (w) {
                            setTimeout(function() {
                                throw w;
                            }, 1)
                        }
                        D._rtPaused || (K >= D._rtStaticRefreshMS && (K = D._rtStaticRefreshMS - 1), D._toRealtime = setTimeout(V,
                            D._rtStaticRefreshMS - K))
                    } else D._toRealtime = clearTimeout(D._toRealtime)
                }
            }, ma.onError = function(h, F, y, L) {
                D._rtAjaxLatencyStart && (D._rtAjaxLatency = new Date - D._rtAjaxLatencyStart);
                Y.raiseEvent("realtimeUpdateError", {
                    source: "XmlHttpRequest",
                    url: L,
                    xmlHttpRequestObject: F.xhr,
                    error: h,
                    httpStatus: F.xhr && F.xhr.status ? F.xhr.status : -1,
                    networkLatency: D._rtAjaxLatency
                }, oa.sender);
                D._toRealtime = q.isActive() ? setTimeout(V, X) : clearTimeout(D._toRealtime)
            }, D._rtPaused || (D._toRealtime = Aa(V, K > X ? K : X, D._toRealtime))), q.removeEventListener("realtimeUpdateComplete",
                L), ta.dataObj && ta.dataObj.alerts && ta.dataObj.alerts && ta.dataObj.alerts.alert && ta.dataObj.alerts.alert.length && q.addEventListener("realtimeUpdateComplete", L))
    };
    Y.addEventListener(["beforeDataUpdate", "beforeRender"], function(y) {
        y = y.sender;
        var q = y.__state;
        y.jsVars && (y.jsVars._rtLastUpdatedData = null);
        q._toRealtime && (q._toRealtime = clearTimeout(q._toRealtime));
        q._toClearChart && (q._toClearChart = clearTimeout(q._toClearChart));
        q._rtAjaxLatencyStart = null;
        q._rtAjaxLatency = null
    });
    Y.addEventListener(["renderComplete",
        "dataUpdated"
    ], function(y) {
        var q = y.sender.__state;
        q && (void 0 === q.rtPreInit && (q.rtPreInit = !1), q._rtPaused && delete q._rtPaused, q.rtStateChanged || (q.rtStateChanged = !0, $a.apply(this, arguments)))
    });
    Y.core.addEventListener("beforeDispose", function(y) {
        y = y.sender.__state;
        y._toRealtime && (y._toRealtime = clearTimeout(y._toRealtime));
        y._toClearChart && (y._toClearChart = clearTimeout(y._toClearChart))
    });
    Y.core.addEventListener("drawComplete", $a)
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-widgets", function() {
        function Y() {}

        function cb(a, e, c, d) {
            e = h(e, d);
            a = h(a, c);
            return e && a ? a / c == e / d ? c / a : Math.min(c / a, d / e) : 1
        }

        function Ua(a, e) {
            var c = a.labels,
                d = c._textY,
                b = c._righttX,
                c = c._leftX,
                f, m, g = e.length;
            for (f = 0; f < g; f += 1)
                if (m = e[f] && e[f].label) m.y = d, m.x = m.align === bb ? b : c
        }

        function Za(a, e, c, d) {
            var b, f, m, g, n, p;
            c instanceof Array || (c = this.colorManager.getPlotColor(0));
            if (a && 0 < a.length) {
                for (f = m = a.length - 1; 0 <= f; --f)
                    if (b = a[f]) b.minvalue = d.numberFormatter.getCleanValue(b.minvalue),
                        b.maxvalue = d.numberFormatter.getCleanValue(b.maxvalue), null === b.minvalue && (null !== b.maxvalue ? b.minvalue = b.maxvalue : f !== m && a.splice(f, 1)), void 0 !== b.label && (b.label = O(b.label)), void 0 !== b.name && (b.name = O(b.name)), null !== b.maxvalue && b.minvalue > b.maxvalue && (g = b.minvalue, b.minvalue = b.maxvalue, b.maxvalue = g);
                a.sort(Hb);
                a[0].code || (a[0].code = c[0]);
                void 0 === D(a[0].alpha) && (a[0].alpha = Fa);
                f = 0;
                for (m = a.length - 1; f < m; f += 1)
                    if (g = f + 1, b = a[f], d = a[g], d.code || (d.code = c[g]), void 0 === D(d.alpha) && (d.alpha = Fa), null === b.maxvalue &&
                        (b.maxvalue = d.minvalue), b.maxvalue > d.minvalue) {
                        if (b.maxvalue > d.maxvalue) {
                            g = T(b);
                            g.maxvalue = b.maxvalue;
                            p = g.minvalue = d.maxvalue;
                            for (n = f + 2; n < m && a[n].minvalue < p; n += 1);
                            a.splice(n, 0, g);
                            m += 1
                        }
                        b.maxvalue = d.minvalue
                    }
                b = a[f];
                null === b.maxvalue && (b.maxvalue = b.minvalue)
            }
            a && 0 < a.length || (e || (e = {
                code: "CCCCCC",
                alpha: "100",
                bordercolor: "000000",
                borderalpha: "100"
            }), a = [e], this.defaultAsigned = !0);
            this.colorArr = a
        }
        var Ga = this,
            y = Ga.hcLib,
            Aa = y.Raphael,
            L = y.BLANKSTRING,
            $a = y.createTrendLine,
            oa = y.createContextMenu,
            q = y.pluck,
            D = y.getValidValue,
            h = y.pluckNumber,
            ea = y.getFirstDefinedValue,
            ta = y.getColorCodeString,
            K = y.FC_CONFIG_STRING,
            T = y.extend2,
            X = y.getDashStyle,
            ca = y.hashify,
            Oa = y.hasSVG,
            Ha = y.falseFN,
            ma = y.getFirstValue,
            tb = y.getFirstColor,
            V = y.graphics.getDarkColor,
            W = y.graphics.getLightColor,
            F = y.graphics.convertColor,
            pa = y.graphics.parseColor,
            ub = y.graphics.parseAlpha,
            Ba = y.COLOR_TRANSPARENT,
            w = y.chartAPI,
            ab = y.parseTooltext,
            Ob = w.singleseries,
            u = y.COMMASTRING,
            db = y.ZEROSTRING,
            Eb = y.ONESTRING,
            Pb = /\\,/ig,
            O = y.parseUnsafeString,
            Qb = y.HCstub,
            da = Ga.window,
            Ra =
            /msie/i.test(da.navigator.userAgent) && !da.opera,
            ob = y.regex.hexcode,
            ha = "rgba(192,192,192," + (Ra ? .002 : 1E-6) + ")",
            Rb = parseFloat,
            Sb = parseInt,
            Da = Math,
            ka = Da.round,
            Fb = Da.ceil,
            va = Da.max,
            Ja = Da.min,
            vb = Da.abs,
            Gb = Da.atan2,
            ga = Da.pow,
            kb = Da.sqrt,
            eb = Da.PI / 180,
            fb = y.regex.dropHash,
            wb = y.toPrecision,
            Tb = y.isArray,
            hb = y.HASHSTRING,
            S = y.toRaphaelColor,
            Da = y.TOUCH_THRESHOLD_PIXELS,
            Ub = y.CLICK_THRESHOLD_PIXELS,
            xb = void 0 !== da.document.documentElement.ontouchstart,
            yb = xb ? Da : Ub,
            Vb = y.getPosition,
            qa = y.plotEventHandler,
            Hb, zb, Ab, Bb, Va,
            Ib, Jb, Kb, Wb = {
                left: "start",
                right: "end",
                center: "middle"
            },
            pb = {
                "true": void 0,
                "false": "crisp"
            },
            Cb = function(a, e, c) {
                var d = 0,
                    b = a.length;
                if (c)
                    for (; d < b; d++) {
                        if (!1 === e.call(c, a[d], d, a)) return d
                    } else
                        for (; d < b; d++)
                            if (!1 === e.call(a[d], a[d], d, a)) return d
            },
            xa = function(a, e) {
                var c;
                a || (a = {});
                for (c in e) a[c] = e[c];
                return a
            },
            lb = function(a) {
                return "object" === typeof a
            },
            Ea = function(a) {
                return "string" === typeof a
            },
            $ = function(a) {
                return void 0 !== a && null !== a
            },
            qb = Ra && !Oa ? "visible" : "",
            rb = y.regex.startsRGBA,
            Ka = y.setLineHeight,
            Lb = y.pluckFontSize,
            La = y.POSITION_MIDDLE,
            Wa = y.POSITION_TOP,
            mb = y.POSITION_BOTTOM,
            bb = y.POSITION_RIGHT,
            Ia = y.POSITION_LEFT,
            ya = y.POSITION_MIDDLE,
            Fa = y.HUNDREDSTRING,
            jb = y.PXSTRING,
            Mb = y.COMMASPACE,
            sa = {
                right: "end",
                left: "start",
                middle: "middle",
                start: "start",
                end: "end",
                center: "middle",
                undefined: "",
                "": ""
            },
            Xb = function() {
                return function(a, e, c) {
                    var d, b = this,
                        f = this._Attr,
                        m = Aa.vml ? -1.5 : 0,
                        g = Aa.vml ? -1.5 : 0,
                        n;
                    f || (f = b._Attr = {});
                    Ea(a) && $(e) && (d = a, a = {}, a[d] = e);
                    if (Ea(a) || void 0 === a) b = "angle" == a ? b._Attr[a] : b._attr(a);
                    else
                        for (d in a) e = a[d], "angle" ===
                            d ? (f[d] = e, n = e * eb, f.tooltipPos[0] = f.cx + f.toolTipRadius * Math.cos(n), f.tooltipPos[1] = f.cy + f.toolTipRadius * Math.sin(n), f.prevValue = e, c && c.duration ? b.animate({
                                transform: "R" + e + "," + m + "," + g
                            }, c.duration, "easeIn") : b.attr({
                                transform: "R" + e + "," + m + "," + g
                            })) : b._attr(d, e);
                    return b
                }
            },
            nb = function(a) {
                var e = [],
                    c;
                (function(a) {
                    (c = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a)) ? e = [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10), parseFloat(c[4])]: (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) &&
                        (e = [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16), 1])
                })(a);
                return {
                    get: function(c) {
                        return e && !isNaN(e[0]) ? "rgb" === c ? "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")" : "hex" === c ? "#" + ("000000" + (e[0] << 16 | e[1] << 8 | e[2]).toString(16)).slice(-6) : "a" === c ? e[3] : "rgba(" + e.join(",") + ")" : a
                    },
                    brighten: function(a) {
                        if (!isNaN(a) && 0 !== a) {
                            var b;
                            for (b = 0; 3 > b; b++) e[b] += parseInt(255 * a, 10), 0 > e[b] && (e[b] = 0), 255 < e[b] && (e[b] = 255)
                        }
                        return this
                    },
                    setOpacity: function(a) {
                        e[3] = a;
                        return this
                    }
                }
            },
            Ra = T({}, y.defaultGaugePaletteOptions);
        Y.prototype = {
            numDecimals: function(a) {
                a = wb(a, 10);
                a = Math.abs(a);
                a = wb(a - Math.floor(a), 10);
                a = String(a).length - 2;
                return 0 > a ? 0 : a
            },
            toRadians: function(a) {
                return a / 180 * Math.PI
            },
            toDegrees: function(a) {
                return a / Math.PI * 180
            },
            flashToStandardAngle: function(a) {
                return -1 * a
            },
            standardToFlashAngle: function(a) {
                return -1 * a
            },
            flash180ToStandardAngle: function(a) {
                var e = 360 - (0 > (a %= 360) ? a + 360 : a);
                return 360 == e ? 0 : e
            },
            getAngularPoint: function(a, e, c, d) {
                d *= Math.PI / 180;
                a += c * Math.cos(d);
                e -= c * Math.sin(d);
                return {
                    x: a,
                    y: e
                }
            },
            remainderOf: function(a, e) {
                var c =
                    a % e,
                    d = void 0,
                    d = ga(10, void 0 === d ? 2 : d),
                    c = ka(Number(String(c * d)));
                return c /= d
            },
            boundAngle: function(a) {
                return 0 <= a ? Y.prototype.remainderOf(a, 360) : 360 - Y.prototype.remainderOf(Math.abs(a), 360)
            },
            toNearestTwip: function(a) {
                var e = 0 > a ? -1 : 1;
                a = Math.abs(a);
                a = ka(100 * a);
                var c = Math.floor(a / 5);
                return (2 < Number(String(a - 5 * c)) ? 5 * c + 5 : 5 * c) / 100 * e
            },
            roundUp: function(a, e) {
                var c = ga(10, void 0 === e ? 2 : e);
                a = ka(Number(String(a * c)));
                return a /= c
            }
        };
        Y.prototype.constructor = Y;
        y.MathExt = Y;
        zb = function(a, e, c, d, b, f, m, g) {
            var n = a[K].smartLabel,
                p = e.chart,
                k = a.chart,
                l, s, r = 0;
            e = a.title;
            m = a.subtitle;
            var v = e.text,
                t = m.text;
            b = h(p.captionpadding, b, 2);
            var H = 0,
                G = 0,
                r = 0,
                z = h(p.captiononright, 0),
                q = D(p.captionposition, "top").toLowerCase(),
                p = 0,
                A = {
                    left: 0,
                    right: 0
                };
            g = g.snapLiterals || (g.snapLiterals = {});
            var x = 0,
                C = 0;
            v !== L && (l = e.style, H = h(parseInt(l.fontHeight, 10), parseInt(l.lineHeight, 10), 12), h(parseInt(l.fontSize, 10), 10));
            t !== L && (s = m.style, G = h(parseInt(s.fontHeight, 10), parseInt(s.lineHeight, 10), 12), r = h(parseInt(s.fontSize, 10), 10));
            if (0 < H || 0 < G) {
                n.setStyle(l);
                l = n.getSmartText(e.text, c, d);
                0 < l.width && (l.width += 2, p = l.height);
                n.setStyle(s);
                s = n.getSmartText(m.text, c, d - p);
                0 < s.width && (s.width += 2);
                n = l.height + 0 + r / 2;
                switch (q) {
                    case "middle":
                        e.y = d / 2 - l.height;
                        m.y = e.y + n;
                        break;
                    case "bottom":
                        m.y = d - k.marginBottom - k.marginTop - s.height;
                        e.y = m.y - (0 < l.height ? n : 0);
                        break;
                    default:
                        e.y = 0, m.y = n
                }
                r = Math.max(l.width, s.width);
                a.title.text = l.text;
                l.tooltext && (a.title.originalText = l.tooltext);
                a.subtitle.text = s.text;
                s.tooltext && (a.subtitle.originalText = s.tooltext);
                0 < r && (r += b);
                a = Math.min(r,
                    c);
                z ? (e.align = m.align = sa.start, A.right = a, e.x = f - r + b, m.x = f - r + b) : (e.align = m.align = sa.end, A.left = a, e.x = r - b, m.x = r - b, x = a, C = s.width);
                e._captionWidth = l.width;
                m._subCaptionWidth = s.width;
                g.captionstartx = e.x - x;
                g.captionstarty = e.y;
                g.captionwidth = l.width;
                g.captionheight = p || 0;
                g.captionendx = g.captionstartx + g.captionwidth;
                g.captionendy = g.captionstarty + g.captionheight;
                g.subcaptionstartx = m.x - C;
                g.subcaptionstarty = m.y;
                g.subcaptionwidth = 0 < s.width ? s.width : 0;
                g.subcaptionheight = 0 < s.height ? s.height : 0;
                g.subcaptionendx = g.subcaptionstartx +
                    g.subcaptionwidth;
                g.subcaptionendy = g.subcaptionstarty + g.subcaptionheight
            }
            return A
        };
        Ab = function(a, e, c, d, b, f) {
            var m = a.chart,
                g = e.chart;
            e = a.title;
            var n = h(g.captionpadding, 2),
                g = h(g.captiononright, 0);
            a = a.subtitle;
            f = f.snapLiterals;
            var p = 0,
                k = 0;
            m.spacingRight = m.spacingLeft = 0;
            $(d) || (d = 0);
            $(b) || (b = 0);
            g ? (c -= m.marginRight, a.align = e.align = sa.start, e.x = a.x = c + n + b + 2) : (a.align = e.align = sa.end, e.x = a.x = m.marginLeft - m.spacingLeft - n - d - 2, p = e._captionWidth, k = a._subCaptionWidth);
            f.captionstartx = e.x - p;
            f.subcaptionstartx = a.x -
                k;
            f.captionendx = f.captionstartx + f.captionwidth;
            f.subcaptionendx = f.subcaptionstartx + f.subcaptionwidth
        };
        Bb = function(a, e, c, d, b) {
            this.userMin = a;
            this.userMax = e;
            this.numMajorTM = h(d.majorTMNumber, -1);
            this.numMinorTM = h(d.minorTMNumber, 5);
            this.adjustTM = d.adjustTM;
            this.tickValueStep = h(d.tickValueStep, 1);
            this.showLimits = h(d.showLimits, 1);
            this.showTickValues = h(d.showTickValues, 1);
            this.nf = b;
            this.stopMaxAtZero = c;
            this.setMinAsZero = !d.setAdaptiveMin;
            this.upperLimitDisplay = d.upperLimitDisplay;
            this.lowerLimitDisplay =
                d.lowerLimitDisplay;
            this.userMaxGiven = null === this.userMax || void 0 === this.userMax || "" === this.userMax ? !1 : !0;
            this.userMinGiven = null === this.userMin || void 0 === this.userMin || "" === this.userMin ? !1 : !0;
            this.majorTM = [];
            this.minorTM = [];
            this.MathExt = new Y
        };
        Bb.prototype = {
            setAxisCoords: function(a, e) {
                this.startAxisPos = a;
                this.endAxisPos = e
            },
            calculateLimits: function(a, e) {
                var c = !0,
                    d = !0,
                    b = Number(this.userMax),
                    f = Number(this.userMin),
                    m, g;
                if (this.userMaxGiven && this.userMinGiven) a = b, e = f;
                else if (isNaN(a) && (a = .9, d = !1), isNaN(e) &&
                    (e = 0, c = !1), a === e && 0 === a && (isNaN(b) || (a = b), isNaN(b) || 0 === b)) a = .9;
                f = Math.floor(Math.log(Math.abs(a)) / Math.LN10);
                m = Math.floor(Math.log(Math.abs(e)) / Math.LN10);
                m = Math.max(m, f);
                f = ga(10, m);
                2 > Math.abs(a) / f && 2 > Math.abs(e) / f && (m--, f = ga(10, m));
                m = Math.floor(Math.log(a - e) / Math.LN10);
                m = ga(10, m);
                0 < a - e && 10 <= f / m && (f = m);
                m = (Math.floor(a / f) + 1) * f;
                0 > e ? g = -1 * (Math.floor(Math.abs(e / f)) + 1) * f : this.setMinAsZero ? g = 0 : (g = Math.floor(Math.abs(e / f) - 1) * f, g = 0 > g ? 0 : g);
                this.stopMaxAtZero && 0 >= a && (m = 0);
                this.max = !1 === this.userMaxGiven ||
                    !0 === this.userMaxGiven && b < a && d ? m : b;
                this.min = !1 === this.userMinGiven || !0 === this.userMinGiven && Number(this.userMin) > e && c ? g : Number(this.userMin);
                this.min > this.max ? this.min == Number(this.userMin) && this.max == b ? (c = this.min, this.min = this.max, this.max = c) : this.min == Number(this.userMin) ? this.max = this.min + 1 : this.max == b && (this.min = this.max - 1) : this.min == this.max && (this.max = this.min + 1);
                this.range = Math.abs(this.max - this.min);
                this.interval = f;
                this.calcTickInterval()
            },
            calcTickInterval: function() {
                var a, e, c = 0; - 1 != this.numMajorTM &&
                    2 > this.numMajorTM && (this.numMajorTM = 2);
                !1 === this.userMinGiven && !1 === this.userMaxGiven && -1 !== this.numMajorTM ? (this.numMajorTM = -1 == this.numMajorTM ? 5 : this.numMajorTM, a = this.getDivisibleRange(this.min, this.max, this.numMajorTM, this.interval, !0), e = a - this.range, this.range = a, 0 < this.max ? this.max += e : this.min -= e) : (this.numMajorTM = -1 == this.numMajorTM ? 5 : this.numMajorTM, !0 === this.adjustTM && (a = function(a, b) {
                    for (var c = 0, e = 1, g;;) {
                        g = b.numMajorTM + c * e;
                        g = 0 === g ? 1 : g;
                        if (b.isRangeDivisible(a, g, b.interval)) break;
                        c = -1 == e ||
                            c > b.numMajorTM ? ++c : c;
                        if (25 < c) {
                            g = b.numMajorTM;
                            break
                        }
                        e = c <= b.numMajorTM ? -1 * e : 1
                    }
                    b.numMajorTM = 1 < g ? g : b.numMajorTM
                }, e = this.numMajorTM, a(this.range, this), 2 === this.numMajorTM && (this.numMajorTM = e, a(this.range + 1, this), c = 1)));
                this.majorTickInt = (this.max - this.min + c) / (this.numMajorTM - 1)
            },
            isRangeDivisible: function(a, e, c) {
                return this.MathExt.numDecimals(a / (e - 1)) > this.MathExt.numDecimals(c) ? !1 : !0
            },
            getDivisibleRange: function(a, e, c, d, b) {
                if (3 > c) return this.range;
                a = Math.abs(e - a);
                e = a / (c - 1);
                this.isRangeDivisible(a, c, d) ||
                    (b && Number(e) / Number(d) < (1 < d ? 2 : .5) && (d /= 10), e = (Math.floor(e / d) + 1) * d, a = e * (c - 1));
                return a
            },
            calculateTicks: function() {
                this.majorTM = [];
                this.minorTM = [];
                for (var a = 0, e, c, d = this.numMajorTM, b = this.numMinorTM, f = this.nf, m = this.tickValueStep, g = O(this.lowerLimitDisplay), n = O(this.upperLimitDisplay), p = this.majorTickInt, k = this.min, l = this.showTickValues, s = !1, r = h(this.showLimits, l); a < d; a += 1) e = a < d - 1 ? wb(Number(k + p * a), 10) : this.max, c = f.scale(e), s = !1, 0 !== a % m && a !== d - 1 ? c = L : 0 === a || a === d - 1 ? r ? 0 === a && g ? (c = g, s = !0) : a == d - 1 && n &&
                    (c = n, s = !0) : c = L : l || (c = L), this.majorTM.push({
                        displayValue: c,
                        isString: s,
                        value: e
                    });
                c = p / (b + 1);
                for (a = 0; a < d - 1; a += 1)
                    for (e = 1; e <= b; e += 1) this.minorTM.push(this.majorTM[a].value + c * e)
            },
            returnDataAsTick: function(a, e) {
                var c = {};
                c.value = a;
                c.displayValue = this.nf.dataLabels(a);
                c.showValue = e;
                return c
            },
            getMax: function() {
                return this.max
            },
            getMin: function() {
                return this.min
            },
            getMajorTM: function() {
                return this.majorTM
            },
            getMinorTM: function() {
                return this.minorTM
            },
            getAxisPosition: function(a) {
                if (void 0 === this.startAxisPos || void 0 ===
                    this.endAxisPos) throw Error("Cannot calculate position, as axis co-ordinates have not been defined. Please use setAxisCoords() method to define the same.");
                return this.startAxisPos + (this.endAxisPos - this.startAxisPos) / (this.max - this.min) * (a - this.min)
            },
            getValueFromPosition: function(a) {
                if (void 0 === this.startAxisPos || void 0 === this.endAxisPos) throw Error("Cannot calculate value, as axis co-ordinates have not been defined. Please use setAxisCoords() method to define the same.");
                var e, c;
                e = this.max - this.min;
                c = a - this.startAxisPos;
                return c / (c + (this.endAxisPos - a)) * e + this.min
            }
        };
        w("gaugebase", {
            creditLabel: !1,
            defaultPaletteOptions: Ra,
            multiValueGauge: !1,
            decimals: 2,
            formatnumberscale: 0,
            drawAnnotations: !0,
            useScaleRecursively: !0,
            includeColorRangeInLimits: !1,
            init: function(a, e, c) {
                var d = c.jsVars;
                this.rtLatestSeriesData = d && d._rtLastUpdatedData ? d._rtLastUpdatedData : null;
                return w.base.init.apply(this, arguments)
            },
            chart: function(a, e) {
                var c = this.name,
                    d = this.dataObj || {},
                    b = d.chart || {},
                    f = this.defaultSeriesType,
                    m = this.realtimeEnabled,
                    g = this.colorManager,
                    n, p = d.alerts,
                    k, l, s, r, v, t, H, G, z, Q, A, x, C;
                l = Qb(d, a, e, this);
                v = l.chart;
                k = l[K];
                l.labels.smartLabel = k.smartLabel = this.smartLabel;
                this.width = a;
                this.height = e;
                k.width = a;
                k.height = e;
                r = l.plotOptions;
                v.useRoundEdges = 1 == b.useroundedges;
                k.tooltext = b.plottooltext;
                k.targettooltext = b.targettooltext;
                n = (v.is3D = s = k.is3d = /3d$/.test(f)) ? y.chartPaletteStr.chart3D : y.chartPaletteStr.chart2D;
                v.defaultSeriesType = f;
                t = 0 < b.palette && 6 > b.palette ? b.palette : h(this.paletteIndex, 1);
                --t;
                v.paletteIndex = t;
                f = T({}, d.colorrange);
                this.colorRangeGetter = new Za(f.color, void 0, this.defaultPaletteOptions.paletteColors[t], this);
                v.events.click = l.plotOptions.series.point.events.click = this.linkClickFN;
                void 0 !== q(b.clickurl) && (v.link = b.clickurl, v.style.cursor = "pointer", l.plotOptions.series.point.events.click = function() {
                    v.events.click.call({
                        link: b.clickurl
                    })
                });
                H = q(b.basefont, "Verdana,sans");
                G = Lb(b.basefontsize, 10);
                z = q(b.basefontcolor, g.getColor("baseFontColor"));
                f = q(b.outcnvbasefont, H);
                A = Lb(b.outcnvbasefontsize, G);
                t = A + jb;
                Q = q(b.outcnvbasefontcolor,
                    z).replace(/^#?([a-f0-9]+)/ig, "#$1");
                G += jb;
                z = z.replace(/^#?([a-f0-9]+)/ig, "#$1");
                this.trendStyle = this.outCanvasStyle = {
                    fontFamily: f,
                    color: Q,
                    fontSize: t
                };
                x = Ka(this.trendStyle);
                this.inCanvasStyle = {
                    fontFamily: H,
                    fontSize: G,
                    color: z
                };
                C = Ka(this.inCanvasStyle);
                k.trendStyle = k.outCanvasStyle = {
                    fontFamily: f,
                    color: Q,
                    fontSize: t
                };
                T(l.legend, {
                    title: {
                        style: {
                            fontFamily: q(b.legendcaptionfont, f),
                            fontSize: h(b.legendcaptionfontsize, A) + "px",
                            color: ca(q(b.legendcaptionfontcolor, Q)),
                            fontWeight: h(b.legendcaptionfontbold, 1) ? "bold" : "normal"
                        },
                        align: Wb[q(b.legendcaptionalignment)]
                    },
                    itemStyle: {
                        fontFamily: q(b.legenditemfont, f),
                        fontSize: h(b.legenditemfontsize, A) + "px",
                        color: ca(q(b.legenditemfontcolor, Q)),
                        fontWeight: h(b.legenditemfontbold) ? "bold" : "normal"
                    },
                    itemHiddenStyle: {
                        fontFamily: f,
                        fontSize: A + "px",
                        color: ca(q(b.legenditemhiddencolor, Q))
                    },
                    itemHoverStyle: {
                        color: ca(q(b.legenditemhoverfontcolor, b.legenditemfontcolor, Q))
                    }
                });
                l.legend.title.style.lineHeight = Ka(l.legend.title.style);
                l.legend.itemStyle.lineHeight = Ka(l.legend.itemStyle);
                l.legend.itemHiddenStyle.lineHeight = Ka(l.legend.itemHiddenStyle);
                k = (k = ma(b.valuebordercolor, L)) ? F(k, h(b.valueborderalpha, b.valuealpha, 100)) : L;
                k = r.series.dataLabels.style = {
                    fontFamily: q(b.valuefont, H),
                    fontSize: q(b.valuefontsize, parseInt(G, 10)) + jb,
                    color: F(q(b.valuefontcolor, z), h(b.valuefontalpha, b.valuealpha, 100)),
                    fontWeight: h(b.valuefontbold) ? "bold" : "normal",
                    fontStyle: h(b.valuefontitalic) ? "italic" : "normal",
                    border: k || b.valuebgcolor ? h(b.valueborderthickness, 1) + "px solid" : void 0,
                    borderColor: k,
                    borderThickness: h(b.valueborderthickness,
                        1),
                    borderPadding: h(b.valueborderpadding, 2),
                    borderRadius: h(b.valueborderradius, 0),
                    backgroundColor: b.valuebgcolor ? F(b.valuebgcolor, h(b.valuebgalpha, b.valuealpha, 100)) : L,
                    borderDash: h(b.valueborderdashed, 0) ? X(h(b.valueborderdashlen, 4), h(b.valueborderdashgap, 2), h(b.valueborderthickness, 1)) : "none"
                };
                Ka(k);
                r.series.dataLabels.color = k.color;
                this.isDataLabelBold && (k.fontWeight = "bold", delete k.lineHeight, Ka(k));
                l.tooltip.style = {
                    fontFamily: H,
                    fontSize: G,
                    lineHeight: C,
                    color: z
                };
                l.title.style = {
                    fontFamily: q(b.captionfont,
                        f),
                    color: q(b.captionfontcolor, Q).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                    fontSize: h(b.captionfontsize, A + 3) + jb,
                    fontWeight: 0 === h(b.captionfontbold) ? "normal" : "bold"
                };
                l.title.align = q(b.captionalignment, La);
                l.title.isOnTop = h(b.captionontop, 1);
                l.title.alignWithCanvas = h(b.aligncaptionwithcanvas, this.alignCaptionWithCanvas, 1);
                l.title.horizontalPadding = h(b.captionhorizontalpadding, l.title.alignWithCanvas ? 0 : 15);
                Ka(l.title.style);
                l.subtitle.style = {
                    fontFamily: q(b.subcaptionfont, b.captionfont, f),
                    color: q(b.subcaptionfontcolor,
                        b.captionfontcolor, Q).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                    fontSize: h(b.subcaptionfontsize, h(va(h(b.captionfontsize) - 3, -1), A) + h(this.subTitleFontSizeExtender, 1)) + jb,
                    fontWeight: 0 === h(b.subcaptionfontbold, this.subTitleFontWeight, b.captionfontbold) ? "normal" : "bold"
                };
                l.subtitle.align = l.title.align;
                l.subtitle.isOnTop = l.title.isOnTop;
                l.subtitle.alignWithCanvas = l.title.alignWithCanvas;
                l.subtitle.horizontalPadding = l.title.horizontalPadding;
                Ka(l.subtitle.style);
                l.chart.trendPointStyle = {
                    style: this.trendStyle
                };
                l.orphanStyles = {
                    defaultStyle: {
                        style: T({}, this.inCanvasStyle)
                    }
                };
                l.chart.colorRangeStyle = {
                    style: {
                        fontFamily: H,
                        fontSize: G,
                        lineHeight: C,
                        color: z
                    }
                };
                Ka(l.chart.colorRangeStyle);
                k = h(b.scaleonresize, 1);
                v.origW = r = h(b.origw, k ? this.origRenderWidth : a);
                v.origH = k = h(b.origh, k ? this.origRenderHeight : e);
                r = (v.autoScale = H = h(b.autoscale, 1)) ? cb(r, k, a, e) : 1;
                this.scaleFactor = v.scaleFactor = r;
                this.createGaugeAxis && this.createGaugeAxis(d, l, {
                    fontFamily: f,
                    fontSize: t,
                    lineHeight: x,
                    color: Q
                });
                this.parseStyles(l);
                delete l.xAxis.labels.style.backgroundColor;
                delete l.xAxis.labels.style.borderColor;
                delete l.yAxis[0].labels.style.backgroundColor;
                delete l.yAxis[0].labels.style.borderColor;
                delete l.yAxis[1].labels.style.backgroundColor;
                delete l.yAxis[1].labels.style.borderColor;
                this.showTooltip = h(b.showtooltip, this.showTooltip, 1);
                this.tooltipSepChar = q(b.tooltipsepchar, Mb);
                this.showValues = h(b.showvalues, b.showvalue, this.showValues, 1);
                this.seriesNameInToolTip = h(b.seriesnameintooltip, 1);
                this.showTooltip || (l.tooltip.enabled = !1);
                l.plotOptions.series.connectNullData =
                    h(b.connectnulldata, 0);
                v.backgroundColor = {
                    FCcolor: {
                        color: q(b.bgcolor, g.getColor(n.bgColor)),
                        alpha: q(b.bgalpha, g.getColor(n.bgAlpha)),
                        angle: q(b.bgangle, g.getColor(n.bgAngle)),
                        ratio: q(b.bgratio, g.getColor(n.bgRatio))
                    }
                };
                n = h(b.showborder, s ? 0 : 1);
                v.borderWidth = n ? h(b.borderthickness, 1) : 0;
                v.borderRadius = h(b.borderradius, 0);
                v.borderDashStyle = h(b.borderdashed, 0) ? X(h(b.borderdashlen, 4), h(b.borderdashgap, 2), v.borderWidth) : void 0;
                v.borderColor = F(q(b.bordercolor, s ? "#666666" : g.getColor("borderColor")), q(b.borderalpha,
                    s ? "100" : g.getColor("borderAlpha")));
                v.plotBackgroundColor = v.plotBorderColor = Ba;
                v.plotBorderWidth = 0;
                v.plotShadow = 0;
                v.bgSWF = q(b.bgimage, b.bgswf);
                v.bgSWFAlpha = h(b.bgimagealpha, b.bgswfalpha, 100);
                s = q(b.bgimagedisplaymode, "none").toLowerCase();
                n = D(b.bgimagevalign, L).toLowerCase();
                f = D(b.bgimagehalign, L).toLowerCase();
                "tile" == s || "fill" == s || "fit" == s ? (n != Wa && n != ya && n != mb && (n = ya), "left" != f && f != ya && "right" != f && (f = ya)) : (n != Wa && n != ya && n != mb && (n = Wa), "left" != f && f != ya && "right" != f && (f = "left"));
                v.bgImageDisplayMode =
                    s;
                v.bgImageVAlign = n;
                v.bgImageHAlign = f;
                v.bgImageScale = h(b.bgimagescale, 100);
                v.logoURL = D(b.logourl);
                v.logoPosition = q(b.logoposition, "tl").toLowerCase();
                v.logoAlpha = h(b.logoalpha, 100);
                v.logoLink = D(b.logolink);
                v.logoScale = h(b.logoscale, 100);
                v.logoLeftMargin = h(b.logoleftmargin, 0);
                v.logoTopMargin = h(b.logotopmargin, 0);
                v.annRenderDelay = D(b.annrenderdelay);
                s = l.tooltip.style;
                s.backgroundColor = F(q(s.backgroundColor, b.tooltipbgcolor, b.hovercapbgcolor, b.hovercapbg, g.getColor("toolTipBgColor")), q(b.tooltipbgalpha,
                    100));
                s.borderColor = F(q(s.borderColor, b.tooltipbordercolor, b.hovercapbordercolor, b.hovercapborder, g.getColor("toolTipBorderColor")), q(b.tooltipborderalpha, 100));
                l.tooltip.constrain = h(b.constraintooltip, 1);
                l.tooltip.shadow = h(b.showtooltipshadow, b.showshadow, 1) ? {
                    enabled: !0,
                    opacity: va(h(b.tooltipbgalpha, 100), h(b.tooltipborderalpha, 100)) / 100
                } : !1;
                s.borderWidth = h(b.tooltipborderthickness, 1) + "px";
                b.tooltipborderradius && (s.borderRadius = h(b.tooltipborderradius, 1) + "px");
                l.tooltip.style.padding = h(b.tooltippadding,
                    this.tooltippadding, 3) + "px";
                b.tooltipcolor && (s.color = tb(b.tooltipcolor));
                v.rotateValues = h(b.rotatevalues, 0);
                v.placeValuesInside = h(b.placevaluesinside, 0);
                v.valuePosition = b.valueposition;
                v.valuePadding = h(b.valuepadding, 4);
                l.plotOptions.series.shadow = h(b.showshadow, b.showcolumnshadow, this.defaultPlotShadow, this.colorManager.getColor("showShadow"));
                v.useRoundEdges && (l.plotOptions.series.shadow = h(b.showshadow, b.showcolumnshadow, 1), l.plotOptions.series.borderRadius = 1, l.tooltip.borderRadius = 2);
                l.title.text =
                    O(b.caption);
                l.subtitle.text = O(b.subcaption);
                b.showtooltip == db && (l.tooltip.enabled = !1);
                g = h(b.plotspacepercent, 20);
                if (80 < g || 0 > g) g = 20;
                this.plotSpacePercent = l.plotOptions.series.groupPadding = g / 200;
                this.parseExportOptions(l);
                v.dataStreamURL = q(b.datastreamurl, "");
                v.refreshInterval = h(b.refreshinterval, 1);
                v.dataStamp = b.datastamp;
                v.useMessageLog = h(b.usemessagelog, 0);
                v.messageLogWPercent = Ja(h(b.messagelogwpercent, 80), 100);
                v.messageLogHPercent = Ja(h(b.messageloghpercent, 70), 100);
                v.messageLogShowTitle = h(b.messagelogshowtitle,
                    1);
                v.messageLogTitle = q(b.messagelogtitle, "Message Log");
                v.messageLogColor = q(b.messagelogcolor, "#fbfbfb");
                v.messageGoesToJS = h(b.messagegoestojs, 0);
                v.messageGoesToLog = h(b.messagegoestolog, 1);
                v.messageJSHandler = q(b.messagejshandler, "");
                v.messagePassAllToJS = h(b.messagepassalltojs, 0);
                v.messageLogIsCancelable = h(b.messagelogiscancelable, 1);
                v.alwaysShowMessageLogMenu = h(b.alwaysshowmessagelogmenu, v.useMessageLog);
                v.showRTMenuItem = h(b.showrtmenuitem, 0);
                g = h(b.showgaugeborder, 1);
                v.gaugeBorderColor = q(b.gaugebordercolor,
                    this.gaugeBorderColor, "333333");
                v.gaugeBorderThickness = g ? h(b.gaugeborderthickness, this.gaugeBorderThickness, 2) : 0;
                v.gaugeBorderAlpha = q(b.gaugeborderalpha, Fa);
                v.gaugeFillColor = q(b.gaugefillcolor, b.ledbgcolor, "000000");
                v.useSameFillColor = h(b.usesamefillcolor, 0);
                v.useSameFillBgColor = h(b.usesamefillbgcolor, v.useSameFillColor);
                v.colorRangeFillMix = ea(b.colorrangefillmix, b.gaugefillmix, this.colorRangeFillMix, "{light-10},{dark-10},{light-10},{dark-10}");
                v.colorRangeFillRatio = ea(b.colorrangefillratio, b.gaugefillratio,
                    this.colorRangeFillRatio, b.gaugefillratio, "0,10,80,10");
                v.showColorRangeBorder = h(b.showcolorrangeborder, b.showgaugeborder, this.showColorRangeBorder, 0);
                v.colorRangeBorderColor = q(b.colorrangebordercolor, b.gaugebordercolor, "{dark-20}");
                v.colorRangeBorderThickness = g ? h(b.colorrangeborderthickness, b.gaugeborderthickness, 1) : 0;
                v.colorRangeBorderAlpha = h(b.colorrangeborderalpha, b.gaugeborderalpha, 100);
                v.roundRadius = h(b.roundradius, b.gaugeroundradius, 0);
                v.showShadow = h(b.showshadow, 1);
                v.gaugeType = h(b.gaugetype,
                    this.gaugeType, 1);
                this.preSeriesAddition && this.preSeriesAddition(l, d, a, e);
                this.series(d, l, c, a, e);
                this.postSeriesAddition && this.postSeriesAddition(l, d, a, e);
                this.configureAxis && this.configureAxis(l, d);
                this.spaceManager && this.spaceManager(l, d, a, e);
                this.postSpaceManager && this.postSpaceManager();
                this.updateSnapPoints && this.updateSnapPoints(l);
                this.latestDataUpdater && this.latestDataUpdater(l, d, a, e);
                c = v.toolbar = {
                    button: {}
                };
                g = c.button;
                g.scale = h(b.toolbarbuttonscale, 1.15);
                g.width = h(b.toolbarbuttonwidth, 15);
                g.height = h(b.toolbarbuttonheight, 15);
                g.radius = h(b.toolbarbuttonradius, 2);
                g.spacing = h(b.toolbarbuttonspacing, 5);
                g.fill = F(q(b.toolbarbuttoncolor, "ffffff"));
                g.labelFill = F(q(b.toolbarlabelcolor, "cccccc"));
                g.symbolFill = F(q(b.toolbarsymbolcolor, "ffffff"));
                g.hoverFill = F(q(b.toolbarbuttonhovercolor, "ffffff"));
                g.stroke = F(q(b.toolbarbuttonbordercolor, "bbbbbb"));
                g.symbolStroke = F(q(b.toolbarsymbolbordercolor, "9a9a9a"));
                g.strokeWidth = h(b.toolbarbuttonborderthickness, 1);
                g.symbolStrokeWidth = h(b.toolbarsymbolborderthickness,
                    1);
                d = g.symbolPadding = h(b.toolbarsymbolpadding, 5);
                g.symbolHPadding = h(b.toolbarsymbolhpadding, d);
                g.symbolVPadding = h(b.toolbarsymbolvpadding, d);
                g = c.position = q(b.toolbarposition, "tr").toLowerCase();
                switch (g) {
                    case "tr":
                    case "tl":
                    case "br":
                    case "bl":
                        break;
                    default:
                        g = "tr"
                }
                d = c.hAlign = "left" === (L + b.toolbarhalign).toLowerCase() ? "l" : g.charAt(1);
                g = c.vAlign = "bottom" === (L + b.toolbarvalign).toLowerCase() ? "b" : g.charAt(0);
                c.hDirection = h(b.toolbarhdirection, "r" === d ? -1 : 1);
                c.vDirection = h(b.toolbarvdirection, "b" === g ? -1 :
                    1);
                c.vMargin = h(b.toolbarvmargin, 6);
                c.hMargin = h(b.toolbarhmargin, 10);
                c.x = h(b.toolbarx, "l" === d ? 0 : a);
                c.y = h(b.toolbary, "t" === g ? 0 : e);
                da.console && da.console.log && da.FC_DEV_ENVIRONMENT && console.log(l);
                h(b.showrtmenuitem, 0) ? (l.callbacks || (l.callbacks = [])).push(this.drawRTMenuButtons) : v.useMessageLog && v.alwaysShowMessageLogMenu && v.messageGoesToLog && (l.callbacks || (l.callbacks = [])).push(this.drawMLMenuButtons);
                m && p && (this.hcJSON.alerts = this.parseAlertObj(p));
                return l
            },
            parseAlertObj: function() {
                return Va.parseAlertObj.apply(this,
                    arguments)
            },
            drawMLMenuButtons: function() {
                var a = this.options,
                    e = a.chart,
                    c = this.menu || (this.menu = []),
                    d = this.toolbar,
                    a = a[K],
                    b;
                c.push(b = oa({
                    chart: this,
                    basicStyle: a && a.outCanvasStyle || this.outCanvasStyle || {},
                    items: [{
                        text: "Show Log",
                        visibility: "hidden",
                        onclick: function() {
                            y && y.messageLogger && y.messageLogger.open();
                            b.showItem(4);
                            b.hideItem(3)
                        }
                    }, {
                        text: "Hide Log",
                        visibility: "hidden",
                        onclick: function() {
                            y && y.messageLogger && y.messageLogger.close();
                            b.showItem(3);
                            b.hideItem(4)
                        }
                    }],
                    position: {
                        x: e.spacingLeft,
                        y: this.chartHeight -
                            e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15)
                    }
                }));
                b.hideItem(1);
                this.elements.configureButton = d.add("loggerIcon", function(a, c) {
                    return function() {
                        b.visible ? b.hide() : b.show({
                            x: a,
                            y: c + 1
                        })
                    }
                }(), {
                    x: e.spacingLeft,
                    y: this.chartHeight - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15),
                    tooltip: "Show & Hide Message"
                })
            },
            drawRTMenuButtons: function() {
                var a = this.logic,
                    e = a.chartInstance,
                    c = this.options,
                    d = c.chart,
                    b = d && d.alwaysShowMessageLogMenu,
                    f = this.menu || (this.menu = []),
                    m = this.toolbar,
                    c = (c = c[K]) &&
                    c.outCanvasStyle || this.outCanvasStyle || {},
                    g, a = (a = e.isUpdateActive || a.eiMethods.isUpdateActive) && a.call(e);
                f.push(g = oa({
                    chart: this,
                    basicStyle: c,
                    items: [{
                        text: "Stop Update",
                        visibility: a ? qb : "hidden",
                        onclick: function() {
                            g.hideItem(0);
                            g.showItem(1);
                            e.stopUpdate()
                        }
                    }, {
                        text: "Start Update",
                        visibility: a ? "hidden" : qb,
                        onclick: function() {
                            g.hideItem(1);
                            g.showItem(0);
                            e.restartUpdate()
                        }
                    }, {
                        text: "Clear Chart",
                        onclick: function() {
                            e.clearChart()
                        }
                    }, {
                        text: "Show Log",
                        visibility: "hidden",
                        onclick: function() {
                            y && y.messageLogger &&
                                y.messageLogger.open();
                            g.showItem(4);
                            g.hideItem(3)
                        }
                    }, {
                        text: "Hide Log",
                        visibility: "hidden",
                        onclick: function() {
                            y && y.messageLogger && y.messageLogger.close();
                            g.showItem(3);
                            g.hideItem(4)
                        }
                    }],
                    position: {
                        x: d.spacingLeft,
                        y: this.chartHeight - d.spacingBottom + (d.showFormBtn || d.showRestoreBtn ? 10 : -15)
                    }
                }));
                g.hideItem(2);
                g.hideItem(0);
                g.hideItem(1);
                g.showItem(a ? 0 : 1);
                !b && g.hideItem(3);
                g.hideItem(4);
                this.elements.configureButton = m.add("configureIcon", function(a, b) {
                    return function() {
                        g.visible ? g.hide() : g.show({
                            x: a,
                            y: b +
                                1
                        })
                    }
                }(), {
                    x: d.spacingLeft,
                    y: this.chartHeight - d.spacingBottom + (d.showFormBtn || d.showRestoreBtn ? 10 : -15),
                    tooltip: "Manage RealTime Update"
                })
            },
            latestDataUpdater: function(a) {
                var e = this.chartInstance;
                a = (a = a.series && a.series) && a[0] && a[0].data;
                var c, d, b;
                if ((e = e && e.jsVars && e.jsVars._rtLastUpdatedData) && a)
                    for (c = 0, d = e.values && e.values.length; c < d; c += 1)
                        if (b = a[c]) b.y = e.values[c], b.displayValue = e.labels[c], b.toolText = e.toolTexts[c]
            },
            styleApplicationDefinition_font: function(a, e, c) {
                var d, b = !1,
                    f, m, g, n = this.styleMapForFont;
                switch (e) {
                    case "caption":
                        a = a.title;
                        break;
                    case "datalabels":
                        a = a.plotOptions.series.dataLabels;
                        break;
                    case "value":
                        a = a.plotOptions.series.dataLabels;
                        break;
                    case "datavalues":
                        a = a.plotOptions.series.dataLabels;
                        b = !0;
                        break;
                    case "subcaption":
                        a = a.subtitle;
                        break;
                    case "tooltip":
                        a = a.tooltip;
                        break;
                    case "trendvalues":
                        a = a.chart.trendPointStyle;
                        break;
                    case "xaxisname":
                        a = a.xAxis.title;
                        break;
                    case "vlinelabels":
                        a = {
                            style: a[K].divlineStyle
                        };
                        break;
                    case "gaugelabels":
                        a = a.chart.colorRangeStyle;
                        break;
                    case "tickvalues":
                        a = a.scale.tickValues;
                        break;
                    case "limitvalues":
                        a = a.scale.limitValues;
                        break;
                    case "openvalue":
                        a = a.chart.openValue;
                        break;
                    case "closevalue":
                        a = a.chart.closeValue;
                        break;
                    case "highlowvalue":
                        a = a.chart.highLowValue;
                        break;
                    case "legend":
                        a = {
                            style: a.legend.itemStyle
                        };
                        break;
                    default:
                        a.orphanStyles[e] = a = {
                            text: "",
                            style: {}
                        }
                }
                if ("object" === typeof a)
                    if (a instanceof Array)
                        for (f = 0, m = a.length; f < m; f += 1) {
                            g = a[f];
                            for (d in c)
                                if (e = d.toLowerCase(), "function" === typeof n[e]) n[e](c[d], g, b);
                            Ka(g.style)
                        } else {
                            for (d in c)
                                if (e = d.toLowerCase(), "function" ===
                                    typeof n[e]) n[e](c[d], a, b);
                            Ka(a.style)
                        }
            },
            createGaugeAxis: function(a, e, c) {
                a = a.chart;
                var d = this.colorManager,
                    b = this.numberFormatter,
                    f = this.isHorizontal ? h(a.ticksbelowgauge, a.ticksbelowgraph, this.ticksbelowgauge, 1) ? 3 : 1 : h(a.ticksonright, this.ticksOnRight, 1) ? 2 : 4,
                    d = q(a.majortmcolor, d.getColor("tickColor")),
                    m = h(a.majortmalpha, 100),
                    g = h(h(a.majortmheight) * this.scaleFactor, this.majorTMHeight, 6),
                    n = h(a.tickvaluestep, a.tickvaluesstep, 1),
                    p = h(a.showtickmarks, 1),
                    k = p ? h(a.connecttickmarks, this.connectTickMarks, 1) :
                    0,
                    l = h(a.showtickvalues, p),
                    s = h(a.majortmthickness, 1),
                    r = h(b.getCleanValue(a.upperlimit)),
                    b = h(b.getCleanValue(a.lowerlimit)),
                    v = 1 == h(a.reversescale, 0);
                this.isHorizontal || (v = !v);
                n = 1 > n ? 1 : n;
                e.scale = {
                    min: null,
                    max: null,
                    axisPosition: f,
                    showTickMarks: p,
                    showTickValues: l,
                    showLimits: h(a.showlimits, l),
                    adjustTM: Boolean(h(a.adjusttm, 1)),
                    majorTMNumber: h(a.majortmnumber, -1),
                    majorTMColor: F(d, m),
                    majorTMHeight: p ? g : 0,
                    majorTMThickness: s,
                    minorTMNumber: h(a.minortmnumber, this.minorTMNumber, 4),
                    minorTMColor: F(q(a.minortmcolor,
                        d), h(a.minortmalpha, m)),
                    minorTMHeight: p ? h(h(a.minortmheight, a.minortmwidth) * this.scaleFactor, ka(g / 2)) : 0,
                    minorTMThickness: h(a.minortmthickness, 1),
                    tickMarkDistance: h(h(a.tickmarkdistance, a.tickmarkgap) * this.scaleFactor, this.tickMarkDistance, 3),
                    tickValueDistance: h(h(a.tickvaluedistance, a.displayvaluedistance) * this.scaleFactor, 2) + 2,
                    placeTicksInside: h(a.placeticksinside, 0),
                    placeValuesInside: h(a.placevaluesinside, 0),
                    tickValueStep: n,
                    setAdaptiveMin: h(a.setadaptivemin, 0),
                    upperLimit: r,
                    lowerLimit: b,
                    upperLimitDisplay: D(a.upperlimitdisplay),
                    lowerLimitDisplay: D(a.lowerlimitdisplay),
                    reverseScale: v,
                    connectorColor: F(q(a.connectorcolor, d), h(a.connectoralpha, m)),
                    connectorThickness: k ? h(a.connectorthickness, s) : 0,
                    majorTM: [],
                    minorTM: [],
                    trendPoint: [],
                    labels: {
                        style: T({}, c)
                    },
                    tickValues: {
                        style: T({}, c)
                    },
                    limitValues: {
                        style: T({}, c)
                    }
                }
            },
            configureAxis: function(a, e) {
                var c = e.chart,
                    d, b, f, m, g = this.colorManager,
                    n, p, k, l, s, r = this.colorRangeGetter,
                    v = (r = r && r.colorArr) && r.length;
                b = r && r[0];
                d = r && r[v - 1];
                m = this.minDataValue;
                p = this.maxDataValue;
                r = a.scale;
                k = r.lowerLimit;
                l = r.upperLimit;
                var v = this.numberFormatter,
                    t;
                if (a.series[0] && ($(m) && $(p) ? (k = k <= m ? k : b && b.minvalue, l = l >= p ? l : d && d.maxvalue) : (k = h(k, b && b.minvalue), l = h(l, d && d.maxvalue)), d = new Bb(k, l, !1, r, this.numberFormatter), d.calculateLimits(this.maxDataValue, this.minDataValue), d.calculateTicks(), r.majorTM = d.getMajorTM(), r.minorTM = d.getMinorTM(), b = r.min = d.min, d = r.max = d.max, e.trendpoints && (f = e.trendpoints.point) && 0 < (n = f.length))) {
                    r.trendPoint = [];
                    for (p = 0; p < n; p += 1) m = f[p], s = h(m.dashed, 0) ? X(q(Math.max(m.dashlen, m.thickness),
                        4), h(m.dashgap, 3), h(m.thickness, 1)) : void 0, k = h(m.startvalue, m.value), l = h(m.endvalue, k), t = k !== l, k <= d && k >= b && l <= d && l >= b && (r.trendPoint.push({
                        style: T(T(a.chart.trendPointStyle.style), {}),
                        startValue: k,
                        endValue: l,
                        tooltext: D(O(m.markertooltext)),
                        displayValue: D(O(m.displayvalue), t ? L : v.scale(k)),
                        showOnTop: h(m.showontop, c.ticksbelowgauge, c.ticksbelowgraph, 1),
                        color: q(m.color, g.getColor("trendLightColor")),
                        alpha: h(m.alpha, 99),
                        thickness: h(m.thickness, 1),
                        dashStyle: s,
                        useMarker: h(m.usemarker, 0),
                        markerColor: F(q(m.markercolor,
                            m.color, g.getColor("trendLightColor")), 100),
                        markerBorderColor: F(q(m.markerbordercolor, m.bordercolor, g.getColor("trendDarkColor")), 100),
                        markerRadius: h(h(m.markerradius) * this.scaleFactor, 5),
                        markerToolText: ma(m.markertooltext),
                        trendValueDistance: h(h(m.trendvaluedistance, c.trendvaluedistance) * this.scaleFactor, r.tickValueDistance),
                        isZone: t,
                        valueInside: h(m.valueinside, c.placevaluesinside, 0),
                        showBorder: h(m.showborder, 1),
                        borderColor: F(q(m.bordercolor, m.color, g.getColor("trendDarkColor")), h(m.borderalpha,
                            m.alpha, 100)),
                        radius: h(h(m.radius) * this.scaleFactor),
                        innerRadius: h(h(m.innerradius) * this.scaleFactor)
                    }), pa(q(m.bordercolor, m.color, g.getColor("trendDarkColor"))));
                    "lineargauge" === this.defaultSeriesType && y.stableSort && y.stableSort(r.trendPoint, function(a, b) {
                        return a.startValue - b.startValue
                    })
                }
            },
            placeTickMark: function(a, e, c) {
                var d = this.smartLabel,
                    b = a.chart,
                    f = this.width - (b.marginRight + b.marginLeft),
                    m = this.height - (b.marginTop + b.marginBottom);
                a = a.scale;
                var g = a.min,
                    n = a.max,
                    p = a.axisPosition,
                    k = a.showLimits,
                    l = a.showTickValues,
                    s = a.tickMarkDistance,
                    r = a.tickValueDistance,
                    v = Math.max(a.majorTMHeight, a.minorTMHeight),
                    t = a.placeTicksInside,
                    H = a.placeValuesInside,
                    G = a.reverseScale,
                    z = 0,
                    q = 0,
                    A = 1,
                    x, C = a.majorTM.length - 1,
                    J = 2 === p || 4 === p ? !1 : !0,
                    B = 6;
                e = J ? m - c : f - e;
                c = 0;
                var la = a.tickValues.style,
                    ba = a.limitValues.style;
                a.majorTM[0] && a.majorTM[1] && (x = a.majorTM[1].value - a.majorTM[0].value);
                t || (z += s + v);
                if (l || k)
                    for (d.setStyle(ba), k = h(parseInt(ba.fontSize, 10), 10), l = h(parseInt(ba.lineHeight, 10), 12), l /= 2, H || (z += r), 3 === p && (q = k), J ? (m =
                            e - z, f = f / (n - g) * x / 2 + 6) : (f = e - z, m = m / (n - g) * x + l), a.majorTM[0] && (x = a.majorTM[0], x.isString ? x.displayValue && (g = d.getSmartText(x.displayValue, f, m), x.displayValue = g.text, x._oriText = g.oriText, g.tooltext && (x.originalText = g.tooltext), J ? (c = Math.max(c, g.height), x.labelY = 1 === p && !H || 3 === p && H ? k - g.height : q, B = Math.min(6, g.width / 2)) : (c = Math.max(c, g.width), x.labelY = k - (G ? g.height - l : l), x.labelX = 0)) : A = 0, J && (G ? (x.labelX = B, x.align = bb) : (x.labelX = -B, x.align = Ia))), a.majorTM[C] && (x = a.majorTM[C], x.isString ? x.displayValue && (g = d.getSmartText(x.displayValue,
                            f, m), x.displayValue = g.text, x._oriText = g.oriText, g.tooltext && (x.originalText = g.tooltext), J ? (c = Math.max(c, g.height), x.labelY = 1 === p && !H || 3 === p && H ? k - g.height : q, B = Math.min(6, g.width / 2)) : (c = Math.max(c, g.width), x.labelY = k - (G ? l : g.height - l), x.labelX = 0)) : (B = 6, C += 1), J && (G ? (x.labelX = -B, x.align = Ia) : (x.labelX = B, x.align = bb))); A < C; A++) 0 === A || A === C - 1 ? (d.setStyle(ba), k = h(parseInt(ba.fontSize, 10), 10), l = h(parseInt(ba.lineHeight, 10), 12)) : (d.setStyle(la), k = h(parseInt(la.fontSize, 10), 10), l = h(parseInt(la.lineHeight, 10),
                        12)), J && (q = 1 === p && H || 3 === p && !H ? k : 0), x = a.majorTM[A], x.displayValue && (x.labelX = h(x.labelX, 0), J ? (c = Math.max(c, l), x.labelY = q) : (g = d.getOriSize(x.displayValue), c = Math.max(c, g.width), x.labelY = k - g.height / 2));
                d = z;
                H || (z += c);
                z = Math.min(e, z);
                a._labelUsedSpace = H ? c : z - d;
                switch (p) {
                    case 1:
                        b.marginTop += z;
                        break;
                    case 2:
                        b.marginRight += z;
                        break;
                    case 3:
                        b.marginBottom += z;
                        break;
                    case 4:
                        b.marginLeft += z
                }
                return z
            },
            eiMethods: {
                feedData: function(a) {
                    var e = this.jsVars,
                        c = e.hcObj,
                        d = c.logic,
                        b = c.options && c.options.series && c.options.series[0],
                        f, m;
                    if (this.isActive() && d && d.linearDataParser && (m = d.linearDataParser(a, d.multisetRealtime))) {
                        f = this.getDataJSON();
                        c.realtimeUpdate ? c.realtimeUpdate(m) : c.logic.realtimeUpdate ? c.logic.realtimeUpdate(m) : b && b.realtimeUpdate && b.realtimeUpdate(m);
                        e._rtLastUpdatedData = d.multisetRealtime ? m : this.getDataJSON();
                        Ga.raiseEvent("realtimeUpdateComplete", {
                            data: a,
                            updateObject: m,
                            prevData: f.values,
                            source: "feedData",
                            url: null
                        }, e.fcObj);
                        try {
                            da.FC_ChartUpdated && da.FC_ChartUpdated(e.fcObj.id)
                        } catch (g) {
                            setTimeout(function() {
                                throw g;
                            }, 0)
                        }
                        return !0
                    }
                    return !1
                },
                getData: function() {
                    var a, e = (a = this.jsVars) && (a = a.hcObj) && (a = a.options) && (a = a.series) && (a = a[0]) && a.data;
                    return (a = e && e[0]) ? h(a.value, a.y) : null
                },
                setData: function(a, e) {
                    var c = "";
                    if (a && a.toString || "" === a || 0 === a) c = "value=" + a.toString();
                    if (e && e.toString || "" === e) c = c + "&label=" + e.toString();
                    c && this.feedData(c)
                },
                stopUpdate: function(a) {
                    var e = this.__state;
                    clearTimeout(e._toRealtime);
                    e._rtAjaxObj && e._rtAjaxObj.abort();
                    e._rtPaused = !0;
                    Ga.raiseEvent("realimeUpdateStopped", {
                        source: a
                    }, this)
                },
                restartUpdate: function() {
                    var a = this.__state;
                    a._rtDataUrl && a._rtPaused && (a._rtPaused = !1, a._rtAjaxObj.get(a._rtDataUrl))
                },
                isUpdateActive: function() {
                    return !this.__state._rtPaused
                },
                clearChart: function(a) {
                    var e = this.jsVars,
                        c;
                    a = a && a.toString && a.toString();
                    (c = e.hcObj) && (c = c.options) && (c = c.scale) && (e = c.min, isNaN(e) || (this.jsVars.hcObj.fusionCharts.feedData("&showLabel=0&value=" + e), y.raiseEvent("chartCleared", {
                        source: a
                    }, this, [this.id, a])))
                },
                getDataJSON: function() {
                    var a = 0,
                        e, c, d = [],
                        b = [],
                        f = [],
                        m = (e = this.jsVars) &&
                        (e = e.hcObj) && (e = e.options) && (e = e.series) && (e = e[0]) && e.data;
                    for (e = m && m.length ? m.length : 0; a < e; a += 1) c = m[a], d.push(h(c.value, c.y)), b.push(c.displayValue || ""), f.push(c.toolText || "");
                    return {
                        values: d,
                        labels: b,
                        toolTexts: f
                    }
                },
                showLog: function() {
                    return this.feedData("showLog=1")
                },
                hideLog: function() {
                    return this.feedData("hideLog=1")
                },
                clearLog: function() {
                    return this.feedData("clearLog=1")
                }
            },
            linearDataParser: function(a, e) {
                var c = {
                        values: u,
                        colors: u,
                        toolTexts: u,
                        links: function(a) {
                            var b = [],
                                c;
                            a = a.replace(Pb, "_fc_escaped_comma_");
                            b = a.split(",");
                            a = 0;
                            for (c = b.length; a < c; a += 1) b[a] = b[a].replace(/_fc_escaped_comma_/ig, ",");
                            return b
                        },
                        valueVisibility: u
                    },
                    d = this.chartInstance,
                    b, f, m, g, n, p = {},
                    k = 0;
                a = a && a.toString && a.toString() || "";
                b = a.split("&");
                g = 0;
                for (n = b.length; g < n; g += 1)
                    if (f = b[g].split("="), m = f[1], f = f[0], f !== L && void 0 !== f && void 0 !== m && (m !== L || e)) switch (f = f.toLowerCase(), f) {
                        case "label":
                            p.labels = m.split(",");
                            break;
                        case "vline":
                            p.vlines = m.split(",");
                            break;
                        case "vlinelabel":
                            p.vlineLabels = m.split(",");
                            break;
                        case "vlinecolor":
                            p.vlineColors =
                                m.split(",");
                            break;
                        case "vlinethickness":
                            p.vlineThickness = m.split(",");
                            break;
                        case "vlinedashed":
                            p.vlineDashed = m.split(",");
                            break;
                        case "value":
                            p.values = m.split("|");
                            k = 1;
                            break;
                        case "showlabel":
                            p.showLabels = m.split(",");
                            break;
                        case "showvalue":
                            p.valueVisibility = m.split("|");
                            break;
                        case "tooltext":
                            p.toolTexts = m.split("|");
                            break;
                        case "link":
                            p.links = m.split("|");
                            break;
                        case "color":
                            p.colors = m.split("|");
                            break;
                        case "datastamp":
                            p.dataStamp = m;
                            break;
                        case "stopupdate":
                            p.pause = "1" == m;
                            break;
                        case "clear":
                            p.clear =
                                "1" == m;
                            break;
                        default:
                            p[f] = m
                    }
                    if (e)
                        for (p.values || (p.values = []), g = p.values.length; g--;) {
                            for (f in c) p[f] ? "function" === typeof c[f] ? p[f][g] && (p[f][g] = c[f].call(this, p[f][g])) : p[f][g] && (p[f][g] = p[f][g].split(c[f])) : p[f] = [];
                            k = va(p.values[g].length, k)
                        }
                    p.labels && (k = va(k, p.labels.length));
                p.dimension = k;
                p.pause && d.stopUpdate && d.stopUpdate("datastream");
                return p
            },
            series: function() {
                var a = this.dataObj,
                    e = this.hcJSON,
                    c = a.pointers && a.pointers.pointer || a.value,
                    d = a.chart,
                    b = this.colorRangeGetter,
                    f = (b = b && b.colorArr) &&
                    b.length,
                    m = {},
                    g = m.data = [],
                    n, p;
                e.legend.enabled = !1;
                Tb(c) || (c = "object" !== typeof c ? [{
                    value: c
                }] : [c]);
                n = 0;
                for (p = this.multiValueGauge ? c.length : 1; n < p; n++) g.push(this.getPointStub(c[n], n, e, a));
                e.series[0] = m;
                f && this.pointValueWatcher && h(d.includecolorrangeinlimits, this.includeColorRangeInLimits) && (a = h(b[0].minvalue), $(a) && this.pointValueWatcher(a), a = h(b[f - 1].maxvalue), $(a) && this.pointValueWatcher(a))
            },
            pointValueWatcher: function(a) {
                null !== a && (this.maxDataValue = this.maxDataValue > a ? this.maxDataValue : a, this.minDataValue =
                    this.minDataValue < a ? this.minDataValue : a)
            },
            updateSnapPoints: function(a) {
                var e = a.chart,
                    c = this.width,
                    d = this.height,
                    b = e.marginBottom;
                a = e.marginLeft;
                var f = e.marginRight,
                    e = e.marginTop,
                    c = xa(this.snapLiterals || (this.snapLiterals = {}), {
                        chartstartx: 0,
                        chartstarty: 0,
                        chartwidth: c,
                        chartheight: d,
                        chartendx: c,
                        chartendy: d,
                        chartcenterx: c / 2,
                        chartcentery: d / 2,
                        chartbottommargin: b,
                        chartleftmargin: a,
                        chartrightmargin: f,
                        charttopmargin: e,
                        canvasstartx: a,
                        canvasstarty: e,
                        canvaswidth: c - a - f,
                        canvasheight: d - e - b,
                        canvasendx: c - f,
                        canvasendy: d -
                            b
                    });
                c.gaugestartx = c.canvasstartx;
                c.gaugestarty = c.canvasstarty;
                c.gaugeendx = c.canvasendx;
                c.gaugeendy = c.canvasendy;
                c.gaugecenterx = c.canvascenterx = a + c.canvaswidth / 2;
                c.gaugecentery = c.canvascentery = e + c.canvasheight / 2
            }
        }, w.base);
        w("linearscalegauge", {
            spaceManager: function(a, e, c, d) {
                var b = a.chart,
                    f = c - (b.marginRight + b.marginLeft),
                    m = d - (b.marginTop + b.marginBottom),
                    g = b.marginRight,
                    n = b.marginLeft,
                    p = b.marginTop,
                    k = b.marginBottom,
                    l = Ja(va(.3 * f, 5), f),
                    h = Ja(va(.3 * m, 5), m),
                    r, v, t = 0,
                    H;
                5 > l && 10 < c && (l = f = 5, H = g + n, g = b.marginRight =
                    (c - f) * g / H, n = b.marginLeft = (c - f) * n / H);
                5 > h && 10 < d && (h = m = 5, H = p + k, p = b.marginRight = (d - m) * p / H, k = b.marginLeft = (d - m) * k / H);
                this.manageTitleSpace && a.title.alignCaptionWithCanvas && (v = this.manageTitleSpace(a, e, l, h));
                this.placeTickMark && (r = this.placeTickMark(a, l, h));
                this.manageTitleSpace && !a.title.alignCaptionWithCanvas && (v = this.manageTitleSpace(a, e, l, h));
                this.placeDataLabels && (t = this.placeDataLabels(a, l, h, p, g, k, n, r));
                this.postDataLabelsPlacement && this.postDataLabelsPlacement(a, l, h);
                this.fixCaptionAlignment && this.fixCaptionAlignment(v,
                    a, e, c, 0, t)
            },
            manageTitleSpace: function(a, e, c, d) {
                c = a.chart;
                return this.titleSpaceManager(a, e, this.width - (c.marginRight + c.marginLeft), this.height - (c.marginTop + c.marginBottom) - d)
            },
            placeDataLabels: function(a, e, c, d, b, f) {
                var m = this.smartLabel;
                e = a.chart;
                var g = this.width - (e.marginRight + e.marginLeft),
                    n = this.height - (e.marginTop + e.marginBottom);
                d = e.marginBottom;
                b = a.plotOptions.series.dataLabels;
                var p = b.style,
                    k = h(parseInt(p.lineHeight, 10), 12);
                c = n - c;
                var n = e.valuePadding,
                    l = 0;
                (a = a.series[0].data[0]) && a.displayValue !==
                    L && (m.setStyle(p), a.isLabelString ? (m = m.getSmartText(a.displayValue, g, c - n), a.displayValue = m.text, m.tooltext && (a.originalText = m.tooltext)) : m = m.getOriSize(a.displayValue), " " === a.displayValue && (m = {
                        height: k
                    }), 0 < m.height && (l = m.height + n), l > c && (a = l - c, n = a < n ? n - a : 0, l = c), e.marginBottom += l, b.align = La, e.valuePadding = d - f + n);
                return l
            },
            postDataLabelsPlacement: function(a) {
                var e = this.smartLabel,
                    c = a.chart,
                    d = this.width - (c.marginRight + c.marginLeft),
                    b = this.height - (c.marginTop + c.marginBottom);
                a = a.scale;
                var f = a.min,
                    m = a.max,
                    g = a.axisPosition,
                    n = a.limitValues.style,
                    c = a.reverseScale,
                    p, k = a.majorTM.length - 1,
                    g = 2 === g || 4 === g ? !1 : !0,
                    l = h(parseInt(n.fontSize, 10), 10),
                    s = h(parseInt(n.lineHeight, 10), 12) / 2;
                a.majorTM[0] && a.majorTM[1] && (p = a.majorTM[1].value - a.majorTM[0].value);
                g ? (b = a._labelUsedSpace, d = d / (m - f) * p / 2 + 6) : (d = a._labelUsedSpace, b = b / (m - f) * p + s);
                e.setStyle(n);
                a.majorTM[0] && a.majorTM[0].isString && (p = a.majorTM[0], p.displayValue && (f = e.getSmartText(p._oriText, d, b), p.displayValue = f.text, f.tooltext && (p.originalText = f.tooltext), g ? (f = Math.min(6,
                    f.width / 2), p.labelX = c ? f : -f) : p.labelY = l - (c ? f.height - s : s)));
                a.majorTM[k] && a.majorTM[k].isString && (p = a.majorTM[k], p.displayValue && (f = e.getSmartText(p._oriText, d, b), p.displayValue = f.text, f.tooltext && (p.originalText = f.tooltext), g ? (f = Math.min(6, f.width / 2), p.labelX = c ? -f : f) : p.labelY = l - (c ? s : f.height - s)))
            },
            getPointStub: function(a, e, c, d, b) {
                var f = c[K];
                e = this.colorManager;
                var m = this.numberFormatter;
                c = m.getCleanValue(a.value);
                var g = D(a.link),
                    n = D(O(q(a.tooltext, f.tooltext))),
                    f = D(O(a.displayvalue)),
                    p = m.dataLabels(c),
                    k, m = d.chart;
                d = h(m.showhovereffect);
                var l, s, r;
                this.showTooltip ? void 0 !== n ? (b = ab(n, [1, 2], {
                    formattedValue: p
                }, a, m), r = !0) : b = null === p ? !1 : void 0 !== b ? b + this.tooltipSepChar + p : p : b = !1;
                a = h(a.showvalue, this.showValues) ? void 0 !== f ? f : D(p, " ") : L;
                this.pointValueWatcher && this.pointValueWatcher(c);
                this.getPointColorObj && (k = this.getPointColorObj(m, c));
                0 !== d && (d || m.gaugefillhovercolor || m.plotfillhovercolor || m.gaugefillhoveralpha || m.plotfillhoveralpha || 0 === m.gaugefillhoveralpha) && (d = !0, f = q(m.gaugefillhovercolor, m.plotfillhovercolor,
                    "{dark-10}"), m = h(m.gaugefillhoveralpha, m.plotfillhoveralpha), l = {}, s = {}, s.fluidColor = k.code, s.fluidAlpha = k.alpha, f = (n = /\{/.test(f)) ? e.parseColorMix(D(k.code, L), f)[0] : f, l.fluidColor = f, l.fluidAlpha = h(m, k.alpha));
                return {
                    y: c,
                    displayValue: a,
                    toolText: b,
                    isLabelString: r,
                    color: F(k.code, k.alpha),
                    link: g,
                    colorRange: k,
                    doNotSlice: !0,
                    rolloverProperties: {
                        enabled: d,
                        hoverAttr: l,
                        outAttr: s
                    }
                }
            },
            getPointColorObj: function(a, e) {
                return this.colorRangeGetter.getColorObj(e)
            }
        }, w.gaugebase);
        w("led", {
            singleValued: !0,
            isDataLabelBold: !0,
            preSeriesAddition: function(a, e) {
                var c = e.chart,
                    d = a.chart;
                d.ledGap = h(c.ledgap, 2);
                d.ledSize = h(c.ledsize, 2);
                d.plotHoverEffect = h(c.showhovereffect, 0)
            }
        }, w.linearscalegauge);
        w("vled", {
            friendlyName: "Vertical LED Gauge",
            defaultSeriesType: "led",
            defaultPlotShadow: 1,
            standaloneInit: !0,
            realtimeEnabled: !0,
            chartleftmargin: 15,
            chartrightmargin: 15,
            charttopmargin: 10,
            chartbottommargin: 10,
            showTooltip: 0,
            connectTickMarks: 0,
            rendererId: "led",
            creditLabel: !1
        }, w.led);
        w("hled", {
            friendlyName: "Horizontal LED Gauge",
            defaultPlotShadow: 1,
            standaloneInit: !0,
            creditLabel: !1,
            isHorizontal: !0,
            rendererId: "led",
            connectTickMarks: 1,
            realtimeEnabled: !0
        }, w.vled);
        w("bullet", {
            creditLabel: !1,
            defaultSeriesType: "bullet",
            defaultPlotShadow: 1,
            drawAnnotations: !0,
            realtimeEnabled: !1,
            subTitleFontSizeExtender: 0,
            subTitleFontWeight: 0,
            connectTickMarks: 0,
            minorTMNumber: 0,
            majorTMHeight: 4,
            chartleftmargin: 10,
            chartrightmargin: 15,
            charttopmargin: 5,
            chartbottommargin: 5,
            isDataLabelBold: !0,
            defaultPaletteOptions: xa(T({}, Ra), {
                paletteColors: [
                    ["A6A6A6", "CCCCCC", "E1E1E1", "F0F0F0"],
                    ["A7AA95", "C4C6B7", "DEDFD7", "F2F2EE"],
                    ["04C2E3", "66E7FD", "9CEFFE", "CEF8FF"],
                    ["FA9101", "FEB654", "FED7A0", "FFEDD5"],
                    ["FF2B60", "FF6C92", "FFB9CB", "FFE8EE"]
                ],
                bgColor: ["FFFFFF", "CFD4BE,F3F5DD", "C5DADD,EDFBFE", "A86402,FDC16D", "FF7CA0,FFD1DD"],
                bgAngle: [270, 270, 270, 270, 270],
                bgRatio: ["0,100", "0,100", "0,100", "0,100", "0,100"],
                bgAlpha: ["100", "60,50", "40,20", "20,10", "30,30"],
                toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
                toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
                baseFontColor: ["333333",
                    "60634E", "025B6A", "A15E01", "68001B"
                ],
                tickColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
                trendColor: ["545454", "60634E", "415D6F", "845001", "68001B"],
                plotFillColor: ["545454", "60634E", "415D6F", "845001", "68001B"],
                borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
                borderAlpha: [50, 50, 50, 50, 50]
            }),
            preSeriesAddition: function() {
                var a = this.dataObj.chart;
                this.hcJSON.chart.colorRangeBorderThickness = h(a.showgaugeborder, a.showcolorrangeborder, 0) ? h(a.colorrangeborderthickness, a.gaugeborderthickness, this.gaugeBorderThickness,
                    2) : 0
            },
            postSeriesAddition: function(a) {
                var e = this.dataObj,
                    c = this.colorManager,
                    d = a.series[0],
                    b = e.chart,
                    f = h(b.showhovereffect),
                    m = {
                        value: e.target
                    },
                    g = h(b.targetthickness, 3),
                    n = q(b.targetcolor, c.getColor("plotFillColor")),
                    p = D(b.targetalpha, 100),
                    k = F(n, p),
                    l = h(b.targetfillpercent, 60),
                    s, r, v, t;
                0 !== f && (f || b.targethovercolor || b.targethoveralpha || 0 === b.targethoveralpha || b.targethoverthickness || 0 === b.targethoverthickness) && (f = !0, v = {}, t = {}, r = h(b.targethoverthickness, g + 2), g !== r && (v["stroke-width"] = r, t["stroke-width"] =
                    g), s = q(b.targethovercolor, "{dark-10}"), p = h(b.targethoveralpha, p), r && (t.stroke = k, r = /\{/.test(s), v.stroke = F(r ? c.parseColorMix(n, s)[0] : s, p)), s = !!h(b.showhoveranimation, 1));
                a = this.getPointStub(m, 1, a, e);
                delete a.rolloverProperties;
                d.data.push(T(a, {
                    borderColor: k,
                    borderWidth: g,
                    targetThickness: g,
                    targetFillPercent: l,
                    rolloverProperties: {
                        enabled: f,
                        hoverAttr: v,
                        outAttr: t,
                        showHoverAnimation: s
                    }
                }))
            },
            getPointStub: function(a, e, c, d, b) {
                var f = this.numberFormatter,
                    m = this.colorManager,
                    g = c[K];
                c = f.getCleanValue(a.value);
                var n = D(a.link),
                    p = D(O(e ? g.targettooltext : g.tooltext)),
                    k = D(O(a.displayvalue)),
                    l = f.dataLabels(c),
                    g = this.colorRangeGetter.getColorObj(c),
                    s = d.chart,
                    r = e ? f.dataLabels(f.getCleanValue(d.value)) : l,
                    v = e ? c : f.getCleanValue(d.target),
                    t = e ? l : f.dataLabels(v),
                    H = q(s.plotfillcolor, m.getColor("plotFillColor"));
                e = h(s.plotasdot, 0);
                var f = h(s.showhovereffect),
                    G = h(s.showplotborder, 0),
                    z = G ? h(s.plotborderthickness, 1) : 0,
                    Q = h(s.plotfillpercent, e ? 25 : 40),
                    A, x, C, J;
                d = this.showTooltip ? void 0 !== p ? ab(p, [1, 2, 26, 27], {
                    formattedValue: r,
                    targetValue: v,
                    targetDataValue: t
                }, d, s) : null === l ? !1 : void 0 !== b ? b + this.tooltipSepChar + l : l : L;
                a = h(a.showvalue, this.showValues) ? void 0 !== k ? k : D(l, " ") : L;
                this.pointValueWatcher && this.pointValueWatcher(c);
                /\{/.test(b = q(s.plotbordercolor, "{dark-20}")) && (x = !0, b = m.parseColorMix(H, b).join());
                r = h(s.plotfillalpha, 100);
                k = F(H, r);
                p = h(s.plotborderalpha, 100);
                l = F(b, p);
                0 !== f && (f || s.plotfillhovercolor || s.plotfillhoveralpha || 0 === s.plotfillhoveralpha || s.showplotborderonhover || 0 === s.showplotborderonhover || s.plotborderhovercolor || s.plotborderhoverthickness ||
                    0 === s.plotborderhoverthickness || s.plotborderhoveralpha || 0 === s.plotborderhoveralpha) && (f = !0, C = {}, J = {}, A = q(s.plotfillhovercolor, "{dark-10}"), r = h(s.plotfillhoveralpha, r), A = /\{/.test(A) ? m.parseColorMix(H, A)[0] : A, C.fill = F(A, r), J.fill = k, H = h(s.showplotborderonhover), void 0 === H && (H = s.plotborderhoverthickness || s.plotborderhovercolor || s.plotborderhoveralpha ? 1 : G), H = H ? h(s.plotborderhoverthickness, z || 1) : 0, z !== H && (C["stroke-width"] = H, J["stroke-width"] = z), G = q(s.plotborderhovercolor, "{dark-10}"), p = h(s.plotborderhoveralpha,
                    p), H && (J.stroke = l, H = /\{/.test(G), C.stroke = F(H ? m.parseColorMix(x ? A : b, G)[0] : G, p)), A = !!h(s.showhoveranimation, 1));
                return {
                    y: c,
                    displayValue: a,
                    toolText: d,
                    plotAsDot: e,
                    plotFillPercent: Q,
                    color: k,
                    borderColor: l,
                    borderWidth: z,
                    link: n,
                    colorRange: g,
                    doNotSlice: !0,
                    rolloverProperties: {
                        enabled: f,
                        hoverAttr: C,
                        outAttr: J,
                        showHoverAnimation: A
                    }
                }
            }
        }, w.linearscalegauge);
        w("vbullet", {
                friendlyName: "Vertical Bullet Gauge",
                creditLabel: !1,
                defaultSeriesType: "bullet",
                gaugeType: 4,
                ticksOnRight: 0,
                rendererId: "bullet",
                standaloneInit: !0
            },
            w.bullet);
        w("hbullet", {
            friendlyName: "Horizontal Bullet Gauge",
            creditLabel: !1,
            defaultSeriesType: "hbullet",
            gaugeType: 1,
            standaloneInit: !0,
            isHorizontal: !0,
            defaultCaptionPadding: 5,
            rendererId: "hbullet",
            placeDataLabels: function(a, e) {
                var c = this.smartLabel,
                    d = a.chart,
                    b = this.width - (d.marginRight + d.marginLeft),
                    f = this.height - (d.marginTop + d.marginBottom),
                    m = a.plotOptions.series.dataLabels,
                    g = m.style,
                    n = h(parseInt(g.fontSize, 10), 10),
                    b = b - e,
                    p = d.valuePadding,
                    k = 0,
                    l = a.series[0].data[0];
                l && l.displayValue !== L && (c.setStyle(g),
                    l.isLabelString ? (c = c.getSmartText(l.displayValue, b - p, f), l.displayValue = c.text, c.tooltext && (l.originalText = c.tooltext)) : c = c.getOriSize(l.displayValue), 0 < c.height && (k = c.width + p), k > b && (k = b), d.marginRight += k, m.align = Ia, m.x = 0, m.y = n - c.height / 2);
                return k
            },
            manageTitleSpace: function(a, e, c) {
                var d = a.chart,
                    b = e.chart,
                    f = this.width - (d.marginRight + d.marginLeft),
                    d = this.height - (d.marginTop + d.marginBottom),
                    m = h(b.captionpadding, 2),
                    b = h(h(b.captiononright, 0) ? b.canvasrightmargin : b.canvasleftmargin);
                $(b) && (b -= m);
                c = h(b, f -
                    c);
                return zb(a, e, c, d, this.defaultCaptionPadding, this.width, this.height, this)
            },
            fixCaptionAlignment: function(a, e, c, d, b, f) {
                d = e.chart;
                var m = c.chart,
                    g = h(m.canvasleftmargin),
                    m = h(m.canvasrightmargin);
                d.marginRight += a.right;
                d.marginLeft += a.left;
                $(g) && (d.spacingLeft = d.marginLeft = g, d.spacingLeft -= a.left + 0 - 1);
                $(m) && (d.spacingRight = d.marginRight = m, d.spacingRight -= a.right + 0 - 1);
                Ab(e, c, this.width, b, f, this)
            }
        }, w.bullet);
        w("lineargauge", {
            creditLabel: !1,
            defaultSeriesType: "lineargauge",
            multiValueGauge: !0,
            realtimeEnabled: !0,
            gaugeType: 1,
            chartleftmargin: 15,
            chartrightmargin: 15,
            charttopmargin: 10,
            chartbottommargin: 10,
            colorRangeFillMix: "{light-10},{dark-20},{light-50},{light-85}",
            colorRangeFillRatio: "0,8,84,8",
            isDataLabelBold: !0,
            eiMethods: T(T({}, w.gaugebase.eiMethods), {
                getData: function(a) {
                    var e, c = (e = this.jsVars) && (e = e.hcObj) && (e = e.options) && (e = e.series) && (e = e[0]) && e.data;
                    e = c && c.length ? c.length : 0;
                    return void 0 !== a && 0 < a && a <= e ? (a = c[a - 1], h(a.value, a.y)) : null
                },
                getDataForId: function(a) {
                    var e, c = (e = this.jsVars) && (e = e.hcObj) && e.dataById;
                    return c[a] && c[a].point ? (a = c[a].point, h(a.value, a.y)) : null
                },
                setData: function(a, e, c) {
                    var d = "",
                        b, f = (b = this.jsVars) && (b = b.hcObj) && (b = b.options) && (b = b.series) && (b = b[0]) && b.data;
                    b = f && f.length || 0;
                    f = 0;
                    if (0 < a && a <= b && (e && e.toString() || "" === e || 0 === e)) {
                        for (f = a; --f;) d += "|";
                        a = "value=" + (d + e);
                        if (c && c.toString || "" === c) a += "&label=" + d + c.toString();
                        this.feedData(a)
                    }
                },
                setDataForId: function(a, e, c) {
                    var d, b = (d = this.jsVars) && (d = d.hcObj) && d.dataById;
                    b[a] && void 0 !== b[a].index && this.setData(b[a].index + 1, e, c)
                }
            }),
            placeDataLabels: function(a,
                e, c, d, b, f, m, g) {
                d = a.scale;
                b = this.smartLabel;
                f = a.chart;
                m = this.width - (f.marginRight + f.marginLeft);
                var n = this.height - (f.marginTop + f.marginBottom),
                    p, k = a.plotOptions.series.dataLabels;
                p = k.style;
                var l = a.scale && a.scale.labels && a.scale.labels.style,
                    s = h(parseInt(p.lineHeight, 10), 12);
                c = n - c;
                e = m - e;
                var r = f.valuePadding,
                    v, t = 0,
                    H = 0,
                    q = 0,
                    z = 0,
                    Q = 0,
                    A = 0,
                    x = a.series && a.series[0] && a.series[0].data || [];
                a = a.scale && a.scale.trendPoint || [];
                var C = 0,
                    J = x.length,
                    B;
                for (b.setStyle(p); C < J; C += 1)(B = x[C]) && B.displayValue !== L && (v = r + B.radius *
                    (3 >= B.sides ? .5 : B.sides % 2 ? 1.1 - 1 / B.sides : 1), f.valuePadding = Math.max(f.valuePadding, v), this.isHorizontal ? (B.isLabelString ? (p = b.getSmartText(B.displayValue, m, c - r), B.displayValue = p.text, p.tooltext && (B.originalText = p.tooltext)) : p = b.getOriSize(B.displayValue), " " === B.displayValue && (p = {
                        height: s
                    }), 0 < p.height && (t = p.height + v), t > c && (t = c), f.pointerOnOpp ? (3 === d.axisPosition && (z = Math.max(g, z), t = Math.max(g, t)), H = Math.max(H, t)) : (1 === d.axisPosition && (Q = Math.max(g, Q), t = Math.max(g, t)), q = Math.max(t, q))) : (B.isLabelString ?
                        (p = b.getSmartText(B.displayValue, e - r, n), B.displayValue = p.text, p.tooltext && (B.originalText = p.tooltext)) : p = b.getOriSize(B.displayValue), 0 < p.width && (A = p.width + v), A > e && (A = e), f.pointerOnOpp ? 2 === d.axisPosition ? (f.marginRight -= g, f.marginRight += Math.max(g, A)) : f.marginRight += A : 4 === d.axisPosition ? (f.marginLeft -= g, f.marginLeft += Math.max(g, A)) : f.marginLeft += A), k.align = La);
                b.setStyle(l);
                C = 0;
                for (J = a.length; C < J; C += 1)(B = a[C]) && B.displayValue !== L && (v = r + .5 * B.markerRadius, f.valuePadding = Math.max(v, f.valuePadding), this.isHorizontal &&
                    (p = b.getOriSize(B.displayValue), 0 < p.height && (t = p.height + v), t > c && (t = c), B.showOnTop ? (1 === d.axisPosition && (Q = Math.max(g, Q), t = Math.max(g, t)), q = Math.max(q, t)) : (3 === d.axisPosition && (z = Math.max(g, z), t = Math.max(g, t)), H = Math.max(t, H)), k.align = La));
                this.isHorizontal && (f.marginBottom += H - z, f.marginTop += q - Q, t = q + H - z - Q);
                return t
            },
            preSeriesAddition: function(a, e) {
                var c = a.chart,
                    d = e.chart,
                    b = this.colorManager,
                    f = a.scale;
                c.pointerRadius = h(d.pointerradius, 10);
                c.pointerBgColor = q(d.pointerbgcolor, d.pointercolor, b.getColor("pointerBgColor"));
                c.pointerBgAlpha = h(d.pointerbgalpha, 100);
                c.pointerBorderColor = q(d.pointerbordercolor, b.getColor("pointerBorderColor"));
                c.pointerBorderThickness = h(d.pointerborderthickness, 1);
                c.pointerBorderAlpha = h(d.pointerborderalpha, 100);
                c.pointerSides = h(d.pointersides, 3);
                c.showGaugeLabels = h(d.showgaugelabels, 1);
                c.showPointerShadow = h(d.showpointershadow, d.showshadow, 1);
                c.valuePadding = h(d.valuepadding, 2);
                this.isHorizontal ? (c.pointerOnOpp = h(d.pointerontop, 1 == f.axisPosition ? 0 : 1) ? 0 : 1, c.gaugeType = f.reverseScale ? 2 : 1,
                    c.valueAbovePointer = h(d.valueabovepointer, c.pointerOnOpp ? 0 : 1, 1), c.valueInsideGauge = c.valueAbovePointer === c.pointerOnOpp ? 1 : 0) : (c.pointerOnOpp = h(d.pointeronright, 2 == f.axisPosition ? 0 : 1), c.gaugeType = f.reverseScale ? 4 : 3)
            },
            getPointStub: function(a, e, c, d, b) {
                var f = this.numberFormatter,
                    m = this.colorManager,
                    g = c.chart,
                    n = c[K];
                c = f.getCleanValue(a.value);
                var p = D(a.link),
                    k = D(O(q(a.tooltext, n.tooltext))),
                    l = D(O(a.displayvalue)),
                    s = f.dataLabels(c),
                    f = this.colorRangeGetter.getColorObj(c);
                d = d.chart;
                var n = h(a.alpha, a.bgalpha,
                        g.pointerBgAlpha),
                    r = q(a.color, a.bgcolor, g.pointerBgColor),
                    v = F(r, n),
                    t = h(a.showborder, d.showplotborder, 1),
                    H = h(a.borderalpha, g.pointerBorderAlpha),
                    G = q(a.bordercolor, g.pointerBorderColor),
                    z = F(G, H),
                    Q = t ? h(a.borderthickness, g.pointerBorderThickness) : 0,
                    A = h(a.radius, g.pointerRadius),
                    x = h(a.showhovereffect, d.showhovereffect),
                    C, J, B, la, ba, I, M, E = !1,
                    Ma = !1,
                    u, w, N;
                this.showTooltip ? void 0 !== k ? (b = ab(k, [1, 2], {
                    formattedValue: s
                }, a, d), Ma = !0) : b = null === s ? !1 : void 0 !== b ? b + this.tooltipSepChar + s : s : b = L;
                h(a.showvalue, this.showValues) ?
                    void 0 !== l ? E = !0 : l = D(s, " ") : l = L;
                k = h(a.sides, g.pointerSides);
                3 > k && (k = 3);
                this.pointValueWatcher && this.pointValueWatcher(c);
                0 !== x && (x || a.bghovercolor || d.pointerbghovercolor || d.plotfillhovercolor || a.bghoveralpha || d.pointerbghoveralpha || d.plotfillhoveralpha || 0 === a.bghoveralpha || 0 === d.pointerbghoveralpha || a.showborderonhover || d.showborderonhover || 0 === a.showborderonhover || 0 === d.showborderonhover || a.borderhoverthickness || d.pointerborderhoverthickness || 0 === a.borderhoverthickness || 0 === d.pointerborderhoverthickness ||
                    a.borderhovercolor || d.pointerborderhovercolor || a.borderhoveralpha || d.pointerborderhoveralpha || 0 === a.borderhoveralpha || 0 === d.pointerborderhoveralpha || a.hoverradius || d.pointerhoverradius || 0 === a.hoverradius || 0 === d.pointerhoverradius) && (x = !0, s = q(a.bghovercolor, d.pointerbghovercolor, d.plotfillhovercolor, "{dark-10}"), B = h(a.bghoveralpha, d.pointerbghoveralpha, d.plotfillhoveralpha), C = h(a.showborderonhover, d.showborderonhover), void 0 === C && (C = a.borderhoverthickness || 0 === a.borderhoverthickness || a.borderhovercolor ||
                    a.borderhoveralpha || 0 === a.borderhoveralpha ? 1 : t), t = q(a.borderhovercolor, d.pointerborderhovercolor, "{dark-10}"), ba = h(a.borderhoveralpha, d.pointerborderhoveralpha), la = C ? h(a.borderhoverthickness, d.pointerborderhoverthickness, Q || 1) : 0, J = h(a.hoverradius, d.pointerhoverradius, A + 2), I = !!h(a.showhoveranimation, d.showhoveranimation, 1), C = {}, w = {}, Q !== la && (C["stroke-width"] = la, w["stroke-width"] = Q), w.fill = v, s = (M = /\{/.test(s)) ? m.parseColorMix(r, s)[0] : s, C.fill = F(s, h(B, n)), la && (w.stroke = z, r = /\{/.test(t), C.stroke = F(r ?
                    m.parseColorMix(G, t)[0] : t, h(ba, H))), J && (I ? (u = {
                    r: J
                }, N = {
                    r: A
                }) : (C.r = J, w.r = A)));
                return {
                    y: c,
                    displayValue: l,
                    id: q(a.id, "pointer_" + e),
                    editMode: h(a.editmode, d.editmode),
                    isLabelString: E,
                    isTooltextString: Ma,
                    toolText: b,
                    _tooltext: a.tooltext,
                    plotFillPercent: q(d.plotfillpercent, 40),
                    bgalpha: n,
                    color: v,
                    borderAlpha: h(d.showplotborder, 1) ? g.pointerBorderAlpha : 0,
                    borderColor: z,
                    borderWidth: Q,
                    radius: A,
                    sides: k,
                    link: p,
                    colorRange: f,
                    doNotSlice: !0,
                    tooltipConstraint: this.tooltipConstraint,
                    rolloverProperties: {
                        enabled: x,
                        hoverAttr: C,
                        hoverAnimAttr: u,
                        outAttr: w,
                        outAnimAttr: N
                    }
                }
            }
        }, w.linearscalegauge);
        w("hlineargauge", {
            friendlyName: "Horizontal Linear Gauge",
            creditLabel: !1,
            defaultSeriesType: "lineargauge",
            rendererId: "hlinear",
            standaloneInit: !0,
            isHorizontal: !0
        }, w.lineargauge);
        w("vlineargauge", {
            friendlyName: "Vertical Linear Gauge",
            creditLabel: !1,
            defaultSeriesType: "lineargauge",
            connectTickMarks: 0,
            standaloneInit: !0
        }, w.lineargauge);
        w("thermometer", {
            friendlyName: "Thermometer Gauge",
            creditLabel: !1,
            defaultSeriesType: "thermometer",
            rendererId: "thermometer",
            connectTickMarks: 0,
            tickMarkDistance: 0,
            standaloneInit: !0,
            realtimeEnabled: !0,
            isDataLabelBold: !0,
            defaultPlotShadow: 0,
            alignCaptionWithCanvas: 0,
            defaultPaletteOptions: xa(T({}, Ra), {
                thmBorderColor: ["545454", "60634E", "415D6F", "845001", "68001B"],
                thmFillColor: ["999999", "ADB68F", "A2C4C8", "FDB548", "FF7CA0"]
            }),
            preSeriesAddition: function(a, e) {
                var c = a.chart,
                    d = e.chart,
                    b = this.colorManager,
                    f;
                f = this.numberFormatter;
                var m = h(d.showhovereffect);
                c.thmOriginX = h(d.thmoriginx, d.gaugeoriginx);
                c.thmOriginY = h(d.thmoriginy, d.gaugeoriginy);
                c.thmBulbRadius = h(f.getCleanValue(d.thmbulbradius, !0));
                c.thmHeight = h(f.getCleanValue(h(d.thmheight, d.gaugeheight), !0));
                c.gaugeFillColor = q(d.gaugefillcolor, d.thmfillcolor, b.getColor("thmFillColor"));
                c.gaugeFillAlpha = h(d.gaugefillalpha, d.thmfillalpha, Fa);
                0 !== m && (m || d.thmfillhovercolor || d.plotfillhovercolor || d.thmfillhoveralpha || d.plotfillhoveralpha || 0 === d.thmfillhoveralpha) && (c.plotHoverEffects = {}, c.plotHoverEffects.enabled = !0, f = q(d.thmfillhovercolor, d.plotfillhovercolor, "{dark-10}"), c.plotHoverEffects.thmFillHoverColor =
                    /\{/.test(f) ? b.parseColorMix(c.gaugeFillColor, f)[0] : f, c.plotHoverEffects.thmFillHoverAlpha = q(d.thmfillhoveralpha, d.plotfillhoveralpha, c.gaugeFillAlpha));
                f = h(d.gaugeborderalpha, h(d.showgaugeborder, 1) ? 40 : 0);
                c.gaugeBorderColor = F(q(d.gaugebordercolor, b.getColor("thmBorderColor")), f);
                c.gaugeBorderThickness = h(d.gaugeborderthickness, 1);
                c.thmGlassColor = q(d.thmglasscolor, W(c.gaugeFillColor, 30));
                c.use3DLighting = !h(d.use3dlighting, 1)
            },
            getPointColorObj: function(a) {
                return {
                    code: q(a.gaugefillcolor, a.thmfillcolor,
                        this.colorManager.getColor("thmFillColor")),
                    alpha: h(a.gaugefillalpha, a.thmfillalpha, 100)
                }
            },
            getPointStub: w.linearscalegauge,
            placeDataLabels: w.linearscalegauge,
            manageTitleSpace: w.linearscalegauge,
            spaceManager: function(a, e, c, d) {
                var b = a.chart,
                    f = c - (b.marginRight + b.marginLeft),
                    m = d - (b.marginTop + b.marginBottom),
                    g = b.marginRight,
                    n = b.marginLeft,
                    p = b.marginTop,
                    k = b.marginBottom;
                d = .3 * f;
                var l = .3 * m,
                    s = b.thmOriginX,
                    r = b.thmOriginY,
                    v = b.thmBulbRadius,
                    t = b.thmHeight,
                    H = $(s),
                    q = $(r),
                    z = $(v),
                    Q = $(t),
                    A = 4 === a.scale.axisPosition,
                    x = 0,
                    C = 0,
                    J, B, la = 0;
                a.title.alignWithCanvas || (m -= la = this.manageTitleSpace(a, e, 0, m / 2));
                this.placeTickMark && (f -= x = this.placeTickMark(a, 2 * h(v, 4), l));
                z || (b.thmBulbRadius = v = Math.min(f / 2, .13 * h(t, m)), z = !0);
                z && (B = .643 * v, d = J = 2 * B, z = (2 * v - J) / 2, H ? b.marginLeft = A ? b.marginLeft + (C = s - B - x) : b.marginLeft + (C = s - B) : A ? (b.marginLeft += (c - n - g - z - J) / 2 - x / 2, b.marginRight -= (c - n - g - z - J) / 2 - x / 2, b.marginRight += C = Math.min(v, f / 2) - B) : (b.marginLeft += (c - n - g - z - J) / 2 - x / 2, b.marginRight -= (c - n - g - z - J) / 2 - x / 2, b.marginLeft += C = Math.min(v, f / 2) - B), f -= C);
                b.marginRight += f - J;
                a.title.alignWithCanvas && (m -= la = this.manageTitleSpace(a, e, 0, m / 2));
                q && (l = r - la + v);
                this.placeDataLabels && (m -= this.placeDataLabels(a, d, l, p, g, k, n));
                Q || (b.thmHeight = q ? t = Math.max(r - la + v - B, 3 * v) : t = Math.max(m - B, 3 * v));
                b.marginTop = q ? b.marginTop + (r - la + v - t) : b.marginTop + (m - t);
                e = 1.766 * v;
                b.marginBottom += e;
                b.valuePadding += e;
                b.thmHeight = b.plotHeight = t - e;
                this.postDataLabelsPlacement && this.postDataLabelsPlacement(a, d, l)
            }
        }, w.gaugebase);
        w("cylinder", {
            friendlyName: "Cylinder Gauge",
            creditLabel: !1,
            defaultSeriesType: "cylinder",
            connectTickMarks: 0,
            rendererId: "cylinder",
            tickMarkDistance: 2,
            standaloneInit: !0,
            charttopmargin: 10,
            chartbottommargin: 10,
            chartrightmargin: 10,
            chartleftmargin: 10,
            isDataLabelBold: !0,
            realtimeEnabled: !0,
            alignCaptionWithCanvas: 0,
            defaultPaletteOptions: xa(T({}, Ra), {
                cylFillColor: ["CCCCCC", "ADB68F", "E1F5FF", "FDB548", "FF7CA0"],
                periodColor: ["EEEEEE", "ECEEE6", "E6ECF0", "FFF4E6", "FFF2F5"]
            }),
            preSeriesAddition: function(a, e) {
                var c = a.chart,
                    d = e.chart,
                    b = this.colorManager,
                    f = h(d.showhovereffect);
                c.cylFillColor = q(d.gaugefillcolor,
                    d.cylfillcolor, b.getColor("cylFillColor"));
                c.cylFillAlpha = q(d.gaugefillalpha, d.cylfillalpha, 100);
                0 !== f && (f || d.cylfillhovercolor || d.plotfillhovercolor || d.cylfillhoveralpha || d.plotfillhoveralpha || 0 === d.cylfillhoveralpha) && (c.plotHoverEffects = {}, c.plotHoverEffects.enabled = !0, f = q(d.cylfillhovercolor, d.plotfillhovercolor, "{dark-10}"), c.plotHoverEffects.cylFillHoverColor = /\{/.test(f) ? b.parseColorMix(c.cylFillColor, f)[0] : f, c.plotHoverEffects.cylFillHoverAlpha = q(d.cylfillhoveralpha, d.plotfillhoveralpha, c.cylFillAlpha));
                c.cylGlassColor = q(d.cylglasscolor, "FFFFFF");
                c.cyl3DLighting = h(d.use3dlighting, "1")
            },
            getPointColorObj: function(a) {
                return {
                    code: q(a.gaugefillcolor, a.thmfillcolor, this.colorManager.getColor("cylFillColor")),
                    alpha: h(a.gaugefillalpha, a.thmfillalpha, 100)
                }
            },
            getPointStub: w.linearscalegauge,
            placeDataLabels: w.linearscalegauge,
            manageTitleSpace: w.linearscalegauge,
            spaceManager: function(a, e, c, d) {
                var b = a.chart,
                    f = e.chart,
                    m = c - (b.marginRight + b.marginLeft),
                    g = d - (b.marginTop + b.marginBottom),
                    n = b.marginRight,
                    p = b.marginLeft,
                    k = b.marginTop,
                    l = b.marginBottom,
                    s = .2 * m,
                    r = .3 * g,
                    v = h(f.cylyscale, 30),
                    t = this.scaleFactor,
                    H = this.numberFormatter;
                a.title.alignWithCanvas || (g -= this.manageTitleSpace(a, e, m / 2, g / 2));
                this.placeTickMark && (m -= this.placeTickMark(a, s, r));
                this.placeDataLabels && (g -= this.placeDataLabels(a, s, r, k, n, l, p) + 8, b.valuePadding += 8);
                this.postDataLabelsPlacement && this.postDataLabelsPlacement(a, s, r);
                b.cylHeight = D(f.cylheight);
                if (50 < v || 0 > v) v = 30;
                b.cylYScale = v /= 100;
                n = Math.max(Ja(m, 1.2 * g) / 2, 5);
                n = h(D(H.getCleanValue(f.cylradius, !0)) *
                    t, n);
                b.marginLeft = h(D(f.cyloriginx) * t, b.marginLeft);
                b.marginLeft += m / 2 - n;
                b.marginRight = c - (b.marginLeft + 2 * n);
                a.title.alignWithCanvas && (g -= this.manageTitleSpace(a, e, m / 2, g / 2));
                a = g - n * v * 2;
                H = h(D(H.getCleanValue(f.cylheight, !0)) * t, a);
                v = b.yScaleRadius = n * v;
                a = b.cylinderTotalHeight = 2 * v + H;
                g = g - a + b.marginTop;
                b.marginTop = h(D(f.cyloriginy) * t - H, v + g);
                b.marginBottom = d - (b.marginTop + H);
                b.cylRadius = n;
                b.cylHeight = H;
                b.yScaleRadius = v
            }
        }, w.gaugebase);
        w("angulargauge", {
            friendlyName: "Angular Gauge",
            standaloneInit: !0,
            drawAnnotations: !0,
            defaultSeriesType: "angulargauge",
            creditLabel: !1,
            rendererId: "angular",
            isAngular: !0,
            eiMethods: w.lineargauge.eiMethods,
            multiValueGauge: !0,
            realtimeEnabled: !0,
            defaultPaletteOptions: xa(T({}, Ra), {
                dialColor: ["999999,ffffff,999999", "ADB68F,F3F5DD,ADB68F", "A2C4C8,EDFBFE,A2C4C8", "FDB548,FFF5E8,FDB548", "FF7CA0,FFD1DD,FF7CA0"],
                dialBorderColor: ["999999", "ADB68F", "A2C4C8", "FDB548", "FF7CA0"],
                pivotColor: ["999999,ffffff,999999", "ADB68F,F3F5DD,ADB68F", "A2C4C8,EDFBFE,A2C4C8", "FDB548,FFF5E8,FDB548", "FF7CA0,FFD1DD,FF7CA0"],
                pivotBorderColor: ["999999", "ADB68F", "A2C4C8", "FDB548", "FF7CA0"]
            }),
            subTitleFontSizeExtender: 0,
            charttopmargin: 5,
            chartrightmargin: 5,
            chartbottommargin: 5,
            chartleftmargin: 5,
            defaultPlotShadow: 1,
            gaugeBorderColor: "{dark-20}",
            gaugeBorderThickness: 1,
            updateSnapPoints: function(a) {
                w.gaugebase.updateSnapPoints.apply(this, arguments);
                var e = a.series[0],
                    c = this.snapLiterals;
                c.gaugestartangle = a.chart.gaugeStartAngle / eb;
                c.gaugeendangle = a.chart.gaugeEndAngle / eb;
                c.chartcenterx = a.chart.origW / 2;
                c.chartcentery = a.chart.origH /
                    2;
                c.gaugecenterx = e.gaugeOriginX;
                c.gaugecentery = e.gaugeOriginY;
                c.gaugeinnerradius = e.gaugeInnerRadius;
                c.gaugeouterradius = e.gaugeOuterRadius;
                c.dial = function(c) {
                    var b = a.series[0],
                        f = c[1] || c[0],
                        e = (c = b.data[Number(c[0]) || 0]) && c.graphic;
                    if (e) {
                        e = e.matrix;
                        switch (f) {
                            case "startx":
                                b = b.gaugeOriginX + e.x(-c.rearExtension, 0);
                                break;
                            case "starty":
                                b = b.gaugeOriginY + e.y(-c.rearExtension, 0);
                                break;
                            case "endx":
                                b = b.gaugeOriginX + e.x(c.radius, 0);
                                break;
                            case "endy":
                                b = b.gaugeOriginY + e.y(c.radius, 0);
                                break;
                            default:
                                b = 0
                        }
                        return b
                    }
                    return 0
                }
            },
            preSeriesAddition: function(a, e) {
                var c = e.chart,
                    d = h(c.gaugescaleangle, 180),
                    b = h(c.gaugestartangle),
                    c = h(c.gaugeendangle),
                    f = $(b),
                    m = Oa ? .001 : .01,
                    g = $(c);
                if (360 < d || -360 > d) d = 0 < d ? 360 : -360;
                if (360 < c || -360 > c) c %= 360;
                if (360 < b || -360 > b) b %= 360;
                if (f && g) {
                    if (d = b - c, 360 < d || -360 > d) d %= 360, c = b - d
                } else if (f) {
                    if (c = b - d, 360 < c || -360 > c) c %= 360, b += 0 < c ? -360 : 360
                } else if (g) {
                    if (b = c + d, 360 < b || -360 > b) b %= 360, c += 0 < b ? -360 : 360
                } else 360 === d ? (b = 180, c = -180) : -360 === d ? c = b = -180 : (b = 90 + d / 2, c = b - d);
                360 === Math.abs(d) && (d += 0 < d ? -m : m, c = b - d);
                c = 360 - c;
                b = 360 - b;
                if (360 < b || 360 < c) b -= 360, c -= 360;
                a.chart.gaugeStartAngle = b * eb;
                a.chart.gaugeEndAngle = c * eb;
                a.chart.gaugeScaleAngle = -d * eb
            },
            series: function(a, e) {
                var c = {
                        data: [],
                        colorByPoint: !0
                    },
                    d = a.chart,
                    b = this.colorRangeGetter,
                    f = (b = b && b.colorArr) && b.length,
                    m = e[K],
                    g = this.numberFormatter,
                    n = this.colorManager,
                    p, k, l, s = c.showValue = h(d.showvalue, d.showrealtimevalue, 0),
                    r = this.scaleFactor,
                    v = 0,
                    t = a.dials && a.dials.dial,
                    H, G, z = h(d.showhovereffect),
                    Q, A, x, C, J, B, la, ba, I, M, E, Ma, u, w, N = h(d.editmode, 0),
                    U, R, y, P, ja, Z, ra, sb, Db, aa, ua;
                U = v = h(D(d.pivotradius) *
                    r, 5);
                c.pivotRadius = U;
                R = 0;
                y = t && t.length;
                aa = 0;
                y || (R = -1, y = 0, t = []);
                for (0 !== z && (z || d.dialborderhovercolor || d.dialborderhoveralpha || 0 === d.dialborderhoveralpha || d.dialborderhoverthickness || 0 === d.dialborderhoverthickness || d.dialbghovercolor || d.plotfillhovercolor || d.dialbghoveralpha || d.plotfillhoveralpha || 0 === d.dialbghoveralpha) && (z = 1); R < y; R += 1) {
                    P = t[R] || {};
                    p = g.getCleanValue(P.value);
                    this.pointValueWatcher && this.pointValueWatcher(p);
                    ja = h(P.rearextension, 0);
                    v = Math.max(v, ja * r);
                    l = g.dataLabels(p);
                    Z = D(l, L);
                    sb = h(P.showvalue,
                        s);
                    Db = h(D(P.valuey) * r);
                    ra = q(P.tooltext, P.hovertext) ? !0 : !1;
                    sb && !$(Db) && (aa += 1);
                    k = (k = D(O(q(P.tooltext, P.hovertext, m.tooltext)))) ? ab(k, [1, 2], {
                        formattedValue: l
                    }, P, d) : Z;
                    u = q(P.color, P.bgcolor, n.getColor("dialColor"));
                    J = h(P.alpha, P.bgalpha, 100);
                    w = S({
                        FCcolor: {
                            color: u,
                            alpha: J,
                            angle: 90
                        }
                    });
                    H = q(P.bordercolor, n.getColor("dialBorderColor"));
                    ua = h(P.borderalpha, 100);
                    l = F(H, ua);
                    G = h(P.borderthickness, 1);
                    ba = h(P.radius);
                    I = h(P.basewidth);
                    E = h(P.topwidth, 0);
                    M = h(P.baseradius, 0);
                    Q = h(P.showhovereffect, z);
                    if (0 !== Q && (Q || P.borderhovercolor ||
                            P.borderhoveralpha || 0 === P.borderhoveralpha || P.borderhoverthickness || 0 === P.borderhoverthickness || P.bghovercolor || P.bghoveralpha || 0 === P.bghoveralpha)) {
                        Q = !0;
                        Ma = {};
                        la = {};
                        A = q(P.borderhovercolor, d.dialborderhovercolor, "{dark-10}");
                        C = h(P.borderhoveralpha, d.dialborderhoveralpha, ua);
                        if (x = h(P.borderhoverthickness, d.dialborderhoverthickness, G)) Ma.stroke = l, B = /\{/.test(A), la.stroke = F(B ? n.parseColorMix(H, A)[0] : A, C);
                        x !== G && (la["stroke-width"] = x, Ma["stroke-width"] = G);
                        H = q(P.bghovercolor, d.dialbghovercolor, d.plotfillhovercolor,
                            "{dark-10}");
                        J = h(P.bghoveralpha, d.dialbghoveralpha, d.plotfillhoveralpha, J);
                        Ma.fill = w;
                        H = (A = /\{/.test(H)) ? n.parseColorMix(u, H).join() : H;
                        A = {
                            FCcolor: {
                                color: H,
                                alpha: J,
                                angle: 90
                            }
                        };
                        la.fill = S(A)
                    }
                    c.data.push({
                        rolloverProperties: {
                            enabled: Q,
                            hasHoverSizeChange: void 0,
                            hoverRadius: h(NaN * r),
                            baseHoverWidth: h(NaN * r, 1.6 * U),
                            topHoverWidth: h(NaN * r),
                            rearHoverExtension: h(NaN * r),
                            hoverFill: A,
                            hoverAttr: la,
                            outAttr: Ma
                        },
                        _tooltext: q(P.tooltext, P.hovertext),
                        y: p,
                        id: q(P.id, R),
                        color: w,
                        showValue: sb,
                        editMode: h(P.editmode, N),
                        borderColor: l,
                        shadowAlpha: ua,
                        borderThickness: G,
                        baseWidth: h(I * r, 1.6 * U),
                        topWidth: h(E * r),
                        baseRadius: h(M * r),
                        rearExtension: ja * r,
                        valueX: h(D(P.valuex) * r),
                        valueY: Db,
                        radius: h(ba * r),
                        link: q(P.link, L),
                        isLabelString: ra,
                        toolText: k,
                        displayValue: sb ? q(Z, " ") : L,
                        doNotSlice: !0
                    })
                }
                c.displayValueCount = aa;
                c.compositPivotRadius = v;
                e.series[0] = c;
                f && this.pointValueWatcher && h(d.includecolorrangeinlimits, this.includeColorRangeInLimits) && (c = h(b[0].minvalue), $(c) && this.pointValueWatcher(c), c = h(b[f - 1].maxvalue), $(c) && this.pointValueWatcher(c))
            },
            postSeriesAddition: function(a, e) {
                var c = e.chart,
                    d = a.series[0],
                    b = this.colorManager,
                    f;
                d.valueBelowPivot = h(c.valuebelowpivot, 0);
                d.gaugeFillMix = c.gaugefillmix;
                d.gaugeFillRatio = c.gaugefillratio;
                void 0 === d.gaugeFillMix && (d.gaugeFillMix = "{light-10},{light-70},{dark-10}");
                void 0 === d.gaugeFillRatio ? d.gaugeFillRatio = ",6" : "" !== d.gaugeFillRatio && (d.gaugeFillRatio = "," + d.gaugeFillRatio);
                f = b.parseColorMix(q(c.pivotfillcolor, c.pivotcolor, c.pivotbgcolor, b.getColor("pivotColor")), q(c.pivotfillmix, "{light-10},{light-30},{dark-20}"));
                d.pivotFillAlpha = b.parseAlphaList(q(c.pivotfillalpha, Fa), f.length);
                d.pivotFillRatio = b.parseRatioList(q(c.pivotfillratio, db), f.length);
                d.pivotFillColor = f.join();
                d.pivotFillAngle = h(c.pivotfillangle, 0);
                d.isRadialGradient = "radial" == q(c.pivotfilltype, "radial").toLowerCase();
                d.showPivotBorder = h(c.showpivotborder, 0);
                d.pivotBorderThickness = h(c.pivotborderthickness, 1);
                d.pivotBorderColor = F(q(c.pivotbordercolor, b.getColor("pivotBorderColor")), 1 == d.showPivotBorder ? q(c.pivotborderalpha, Fa) : db);
                this.parseColorMix =
                    b.parseColorMix;
                this.parseAlphaList = b.parseAlphaList;
                this.parseRatioList = b.parseRatioList
            },
            spaceManager: function(a, e, c, d) {
                var b = a.chart,
                    f = e.chart,
                    m = a.scale,
                    g = a.series[0],
                    n = g.displayValueCount,
                    p = m.tickValues.style,
                    k = h(parseInt(p.lineHeight, 10), 12),
                    l = h(parseInt(p.fontSize, 10), 10),
                    s = .8 * l,
                    r = .1 * k,
                    v = Oa ? 0 : .1 * k,
                    t = h(parseInt(a.plotOptions.series.dataLabels.style.lineHeight, 10), 12),
                    H = c - (b.marginRight + b.marginLeft),
                    q = d - (b.marginTop + b.marginBottom),
                    z = this.scaleFactor,
                    Q = g.compositPivotRadius,
                    A, x, C = b.gaugeStartAngle,
                    J = b.gaugeEndAngle,
                    B, la = n * t + 2 + g.pivotRadius,
                    ba = 0,
                    I = g.valueBelowPivot,
                    M, E, Ma, u, w, N, y, R, F, P, L, Z, ra, S, K, aa, ua, fa, na, ia, T, W, O, Y, ha, da, X, wa, V, ca, qa, ea, ga, ma, ka, pa, sa;
                B = /^\d+\%$/.test(f.gaugeinnerradius) ? parseInt(f.gaugeinnerradius, 10) / 100 : .7;
                q -= this.titleSpaceManager(a, e, H, q / 2);
                I || (ba = la, la = 0);
                g.gaugeOuterRadius = h(Math.abs(D(f.gaugeouterradius) * z));
                g.gaugeInnerRadius = h(Math.abs(D(f.gaugeinnerradius) * z), g.gaugeOuterRadius * B);
                var va = b.gaugeStartAngle,
                    ta = b.gaugeEndAngle,
                    Pa = q,
                    Ga = g.gaugeOuterRadius,
                    Xa = h(D(f.gaugeoriginx) *
                        z - b.marginLeft),
                    Ca = h(D(f.gaugeoriginy) * z - b.marginTop),
                    oa = Math.max(Q, l),
                    Aa = la,
                    Da = ba,
                    Ha = $(Ga),
                    Ja = $(Xa),
                    Ka = $(Ca),
                    Ba = 2 * Math.PI,
                    xa = Math.PI,
                    ya = Math.PI / 2,
                    Fa = xa + ya,
                    Na, Ua = Xa,
                    ab = Ca,
                    Ra, gb, Sa, Ea, Ya, Wa = !1,
                    Za, $a, db, fb, Va, Ta, cb, za, Qa, hb, ib = va % Ba;
                0 > ib && (ib += Ba);
                (oa = oa || 0) && oa < H / 2 && oa < Pa / 2 && (Wa = !0);
                Aa > Pa / 2 && (Aa = Pa / 2);
                Da > Pa / 2 && (Da = Pa / 2);
                Za = Math.cos(va);
                $a = Math.sin(va);
                db = Math.cos(ta);
                fb = Math.sin(ta);
                gb = Math.min(Za, db, 0);
                Ea = Math.max(Za, db, 0);
                Sa = Math.min($a, fb, 0);
                Ya = Math.max($a, fb, 0);
                if (!Ha || !Ja || !Ka) {
                    hb = ta - va;
                    Ta = ib +
                        hb;
                    if (Ta > Ba || 0 > Ta) Ea = 1;
                    if (0 < hb) {
                        if (ib < ya && Ta > ya || Ta > Ba + ya) Ya = 1;
                        if (ib < xa && Ta > xa || Ta > Ba + xa) gb = -1;
                        if (ib < Fa && Ta > Fa || Ta > Ba + Fa) Sa = -1
                    } else {
                        if (ib > ya && Ta < ya || Ta < -Fa) Ya = 1;
                        if (ib > xa && Ta < xa || Ta < -xa) gb = -1;
                        if (ib > Fa && Ta < Fa || Ta < -ya) Sa = -1
                    }
                    Ja ? Ha || (za = H - Xa, Qa = -Xa, Na = gb ? Math.min(za / Ea, Qa / gb) : za / Ea) : (cb = Ea - gb, Va = H / cb, Xa = -Va * gb, Na = Va, Wa && (H - Xa < oa ? (Xa = H - oa, za = H - Xa, Qa = -Xa, Na = gb ? Math.min(za / Ea, Qa / gb) : za / Ea) : Xa < oa && (Xa = oa, za = H - Xa, Qa = -Xa, Na = gb ? Math.min(za / Ea, Qa / gb) : za / Ea)), Ua = Xa);
                    Ka ? Ha || (za = Pa - Ca, Qa = -Ca, Na = Math.min(Na, Sa ? Math.min(za /
                        Ya, Qa / Sa) : za / Ya)) : (cb = Ya - Sa, Va = Pa / cb, Ca = -Va * Sa, Wa && (Pa - Ca < oa ? (Ca = Pa - oa, za = Pa - Ca, Qa = -Ca, Na = Math.min(Na, Sa ? Math.min(za / Ya, Qa / Sa) : za / Ya)) : Ca < oa && (Ca = oa, za = Pa - Ca, Qa = -Ca, Na = Math.min(Na, Sa ? Math.min(za / Ya, Qa / Sa) : za / Ya))), Pa - Ca < Aa ? (Ca = Pa - Aa, za = Pa - Ca, Qa = -Ca, Na = Math.min(Na, Sa ? Math.min(za / Ya, Qa / Sa) : za / Ya)) : Ca < Da && (Ca = Da, za = Pa - Ca, Qa = -Ca, Na = Math.min(Na, Sa ? Math.min(za / Ya, Qa / Sa) : za / Ya)), Na = Math.min(Na, Va), ab = Ca);
                    Ra = Na;
                    0 >= Ra && (Ra = Math.min(H / 2, Pa / 2))
                }
                A = g.gaugeOriginX = Ua;
                x = g.gaugeOriginY = ab;
                M = m.majorTM;
                E = 0;
                Ma = M.length;
                w = a.labels.smartLabel;
                L = m.min;
                Z = m.max - m.min;
                ua = H - A;
                fa = q - x;
                na = m.placeValuesInside;
                ia = Math.cos(89.98 * eb);
                T = -ia;
                W = $(g.gaugeOuterRadius);
                O = m.tickValueDistance;
                Y = m.showTickValues;
                ha = m.showLimits;
                da = h(g.gaugeOuterRadius, Ra);
                X = h(g.gaugeInnerRadius, da * B);
                wa = da;
                V = .2 * da;
                ka = 1.5 * k;
                sa = (J - C) / Z;
                if (Y || ha)
                    for (na ? X > O + k ? ca = X - O : (ca = X, O = 0) : (wa += O, W || (V += O)), w.setStyle(p); E < Ma; E += 1)
                        if (P = M[E], pa = C + (P.value - L) * sa, ra = Math.cos(pa), S = Math.sin(pa), u = P.displayValue, N = w.getOriSize(u), y = N.width, R = N.height, F = R / 2, 0 < y && 0 < R)
                            if (P.x =
                                0, na) P.align = ra > ia ? bb : ra < T ? Ia : La, P.isString && (K = ca * ra, qa = Math.abs(K), qa < y && (N = w.getSmartText(u, Math.max(qa, k), ka), P.displayValue = N.text, N.tooltext && (P.originalText = N.tooltext), R = N.height, F = R / 2)), ra > ia || ra < T ? (P.y = l - F + v, P.y -= .4 * R * S) : P.y = s - (0 > S ? 0 : R - r);
                            else if (P.align = ra > ia ? Ia : ra < T ? bb : La, K = wa * ra, aa = wa * S, W || (0 < aa ? (ma = F + F * S, fa < aa + ma && (aa = fa - ma, wa = Math.max(aa / S, V))) : 0 > aa && (ma = F - F * S, x < -aa + ma && (aa = ma - x, wa = Math.max(aa / S, V)))), ra > ia) K + y > ua && (W ? P.isString && (N = w.getSmartText(u, ua - K, ka), P.displayValue = N.text, N.tooltext &&
                    (P.originalText = N.tooltext), R = N.height, F = R / 2) : (K = ua - y, wa = Math.max(K / ra, V), K = wa * ra, P.isString && K + y > ua && (N = w.getSmartText(u, ua - K, ka), P.displayValue = N.text, N.tooltext && (P.originalText = N.tooltext), R = N.height, F = R / 2, y = N.width, K = ua - y, wa = Math.max(K / ra, V)))), P.y = l - F + v + .4 * R * S;
                else if (ra < T) y - K > A && (W ? P.isString && (N = w.getSmartText(u, A + K, ka), P.displayValue = N.text, N.tooltext && (P.originalText = N.tooltext), R = N.height, F = R / 2) : (K = y - A, wa = Math.max(K / ra, V), K = wa * ra, P.isString && y - K > A && (N = w.getSmartText(u, A + K, ka), P.displayValue =
                    N.text, N.tooltext && (P.originalText = N.tooltext), y = N.width, R = N.height, F = R / 2, K = y - A, wa = Math.max(K / ra, V)))), P.y = l - F + v + .4 * R * S;
                else {
                    0 < S ? (ea = fa, ga = R + aa) : (ea = x, ga = R - aa);
                    if (!W) {
                        if (ga > ea && (wa = Math.max(ea - R, V), ga = R + wa), P.isString && ga > ea || y > H) N = w.getSmartText(u, H, Math.max(ea - V, k)), P.displayValue = N.text, N.tooltext && (P.originalText = N.tooltext), R = N.height, wa = Math.max(ea - R, V)
                    } else if (P.isString && ga > ea || y > H) N = w.getSmartText(u, H, Math.max(R - ga + ea, k)), P.displayValue = N.text, N.tooltext && (P.originalText = N.tooltext), R = N.height;
                    P.y = s - (0 < S ? 0 : R - r)
                }
                W || (g.gaugeOuterRadius = na ? wa : wa - O, 0 >= g.gaugeOuterRadius && (g.gaugeOuterRadius = Math.abs(V)));
                g.gaugeInnerRadius = h(g.gaugeInnerRadius, g.gaugeOuterRadius * B)
            }
        }, w.gaugebase);
        w("bulb", {
            friendlyName: "Bulb Gauge",
            defaultSeriesType: "bulb",
            defaultPlotShadow: 1,
            standaloneInit: !0,
            drawAnnotations: !0,
            charttopmargin: 10,
            chartrightmargin: 10,
            chartbottommargin: 10,
            chartleftmargin: 10,
            realtimeEnabled: !0,
            isDataLabelBold: !0,
            rendererId: "bulb",
            preSeriesAddition: function(a) {
                a = a.chart;
                a.colorRangeGetter = this.colorRangeGetter;
                a.defaultColors = this.colorManager.getPlotColor(0);
                a.defaultColLen = a.defaultColors.length
            },
            getPointColor: function(a, e, c) {
                return c ? {
                    FCcolor: {
                        cx: .4,
                        cy: .4,
                        r: "80%",
                        color: W(a, 65) + u + W(a, 75) + u + V(a, 65),
                        alpha: e + u + e + u + e,
                        ratio: "0,30,70",
                        radialGradient: !0
                    }
                } : F(a, e)
            },
            getPointStub: function(a, e, c, d, b) {
                var f = c.chart,
                    m = c[K];
                e = d.chart;
                c = this.numberFormatter;
                d = c.getCleanValue(a.value);
                var g = c.dataLabels(d);
                c = D(a.link);
                var n = D(O(q(a.tooltext, m.tooltext))),
                    p = D(O(a.displayvalue)),
                    m = this.colorRangeGetter.getColorObj(d),
                    k =
                    f.useColorNameAsValue = h(e.usecolornameasvalue, 0),
                    l = m.colorObj || m.prevObj || m.nextObj || {},
                    s = this.colorManager,
                    r = O(q(l.label, l.name)),
                    v = q(e.gaugefillalpha, l.alpha, Fa),
                    t = q(l.bordercolor, e.gaugebordercolor, V(l.code, 70)),
                    H = h(l.borderalpha, e.gaugeborderalpha, "90") * v / 100,
                    G = h(e.showgaugeborder, 0),
                    z = G ? h(e.gaugeborderthickness, 1) : 0,
                    Q = f.is3D = h(e.is3d, 1),
                    A = this.getPointColor(l.code, v, Q),
                    x = h(e.showhovereffect),
                    C, J, B, la, ba, I, M, E, u;
                m.isOnMeetPoint && (l = m.nextObj);
                f.gaugeFillAlpha = v;
                t = (E = /\{/.test(t)) ? s.parseColorMix(q(l.bordercolor,
                    l.code), t)[0] : t;
                f = F(t, H);
                0 !== x && (x || e.gaugefillhovercolor || e.plotfillhovercolor || e.gaugefillhoveralpha || e.plotfillhoveralpha || 0 === e.gaugefillhoveralpha || e.is3donhover || 0 === e.is3donhover || e.showgaugeborderonhover || 0 === e.showgaugeborderonhover || e.gaugeborderhovercolor || e.gaugeborderhoveralpha || 0 === e.gaugeborderhoveralpha || e.gaugeborderhoverthickness || 0 === e.gaugeborderhoverthickness) && (x = !0, C = q(e.gaugefillhovercolor, e.plotfillhovercolor, "{dark-10}"), J = h(e.gaugefillhoveralpha, e.plotfillhoveralpha), B =
                    h(e.showgaugeborderonhover), void 0 === B && (B = e.gaugeborderhovercolor || e.gaugeborderhoveralpha || 0 === e.gaugeborderhoveralpha || e.gaugeborderhoverthickness || 0 === e.gaugeborderhoverthickness ? 1 : G), G = q(e.gaugeborderhovercolor, "{dark-10}"), ba = h(e.gaugeborderhoveralpha), la = B ? h(e.gaugeborderhoverthickness, z || 1) : 0, Q = !!h(e.is3donhover, Q), h(e.showhoveranimation, 1), B = {}, u = {}, z !== la && (B["stroke-width"] = la, u["stroke-width"] = z), u.fill = S(A), C = (M = /\{/.test(C)) ? s.parseColorMix(l.code, C)[0] : q(C, l.code), B.fill = S(this.getPointColor(C,
                        h(J, v), Q)), la && (u.stroke = f, l = /\{/.test(G), B.stroke = F(l ? s.parseColorMix(E ? C : t, G)[0] : G, h(ba, H))));
                this.showTooltip ? void 0 !== n ? (a = ab(n, [1, 2], {
                    formattedValue: g
                }, a, e), I = !0) : a = k ? r : null === g ? !1 : void 0 !== b ? b + this.tooltipSepChar + g : g : a = !1;
                b = void 0 !== p ? p : k ? r : g;
                this.pointValueWatcher && this.pointValueWatcher(d);
                return {
                    y: d,
                    displayValue: b,
                    toolText: a,
                    isLabelString: I,
                    colorName: r,
                    color: A,
                    borderWidth: z,
                    borderColor: f,
                    colorRange: m,
                    link: c,
                    doNotSlice: !0,
                    rolloverProperties: {
                        enabled: x,
                        hoverAttr: B,
                        hoverAnimAttr: void 0,
                        outAttr: u
                    }
                }
            },
            spaceManager: function(a, e, c, d) {
                var b = this.smartLabel,
                    f = a.series[0],
                    m = f && f.data[0],
                    f = a.chart,
                    g = e.chart,
                    n = f.scaleFactor = this.scaleFactor;
                c -= f.marginRight + f.marginLeft;
                d -= f.marginTop + f.marginBottom;
                var p = f.marginLeft,
                    k = f.marginTop,
                    l = h(g.valuepadding, 4),
                    s = f.useColorNameAsValue,
                    r, v = 0,
                    t;
                this.showValues ? (m.y = D(m.y, a.scale.min), m.displayValue = D(m.displayValue, this.numberFormatter.dataLabels(a.scale.min))) : m.displayValue = L;
                t = m.displayValue;
                f.gaugeOriginX = h(g.gaugeoriginx, g.bulboriginx, -1);
                f.gaugeOriginY = h(g.gaugeoriginy,
                    g.bulboriginy, -1);
                f.gaugeRadius = h(g.gaugeradius, g.bulbradius, -1);
                g = -1 !== f.gaugeRadius;
                d -= e = this.titleSpaceManager(a, e, c, .3 * d);
                k += e;
                f.dataLabels = {
                    style: a.plotOptions.series.dataLabels.style
                };
                e = f.dataLabels.style;
                b.setStyle(e);
                1 == f.placeValuesInside ? (a = g ? f.gaugeRadius * n : Math.min(c, d) / 2, r = Math.sqrt(ga(2 * a, 2) / 2), b = b.getSmartText(t, r, r)) : (r = (g ? d - 2 * f.gaugeRadius * n : .7 * d) - l, b = b.getSmartText(t, c, r), v = b.height + l, a = Math.min(c, d - v) / 2);
                s && (m.displayValue = b.text, b.tooltext && (m.originalText = b.tooltext));
                f.valuePadding =
                    l;
                f.valueTextHeight = b.height;
                f.labelLineHeight = parseInt(e.lineHeight, 10);
                a = g ? f.gaugeRadius * n : a;
                b = -1 === f.gaugeOriginX ? p + c / 2 : f.gaugeOriginX * n;
                n = -1 === f.gaugeOriginY ? k + (d - v) / 2 : f.gaugeOriginY * n;
                f.marginTop = f.marginLeft = 0;
                f.gaugeRadius = a;
                f.gaugeOriginX = b;
                f.gaugeOriginY = n
            },
            updateSnapPoints: function(a) {
                w.gaugebase.updateSnapPoints.apply(this, arguments);
                this.snapLiterals.gaugeradius = a.chart.gaugeRadius
            }
        }, w.gaugebase);
        w("drawingpad", {
            friendlyName: "DrawingPad Component",
            standaloneInit: !0,
            defaultSeriesType: "drawingpad",
            rendererId: "drawingpad",
            defaultPlotShadow: 1,
            drawAnnotations: !0,
            chartleftmargin: 0,
            charttopmargin: 0,
            chartrightmargin: 0,
            chartbottommargin: 0,
            chart: function() {
                T(this.dataObj.chart, {
                    bgcolor: this.dataObj.chart.bgcolor || "#ffffff",
                    bgalpha: this.dataObj.chart.bgalpha || "100"
                });
                return this.base.chart.apply(this, arguments)
            },
            series: function() {
                T(this.hcJSON, {
                    legend: {
                        enabled: !1
                    },
                    chart: {
                        plotBackgroundColor: Ba,
                        plotBorderColor: Ba
                    },
                    series: [{
                        data: []
                    }]
                })
            },
            spaceManager: function() {},
            creditLabel: !1
        }, w.bulb);
        w("funnel", {
            friendlyName: "Funnel Chart",
            standaloneInit: !0,
            defaultSeriesType: "funnel",
            sliceOnLegendClick: !0,
            defaultPlotShadow: 1,
            subTitleFontSizeExtender: 0,
            tooltippadding: 3,
            drawAnnotations: !0,
            isDataLabelBold: !1,
            formatnumberscale: 1,
            rendererId: "funnel",
            alignCaptionWithCanvas: 0,
            defaultPaletteOptions: xa(T({}, Ra), {
                paletteColors: y.defaultPaletteOptions.paletteColors
            }),
            preSeriesAddition: function(a, e) {
                var c = e.chart,
                    d = this.colorManager,
                    b = a.plotOptions.series.dataLabels;
                b.connectorWidth = h(c.smartlinethickness, 1);
                b.connectorColor = F(q(c.smartlinecolor,
                    d.getColor("baseFontColor")), h(c.smartlinealpha, 100));
                h(c.showlegend, 0) ? (a.legend.enabled = !0, a.legend.reversed = !Boolean(h(c.reverselegend, 0))) : a.legend.enabled = !1;
                a.plotOptions.series.point.events.legendItemClick = c.interactivelegend === db ? Ha : function() {
                    this.slice()
                }
            },
            series: function(a, e, c) {
                a.data && 0 < a.data.length && (a = this.point(c, {
                    data: [],
                    colorByPoint: !0,
                    showInLegend: !0
                }, a.data, a.chart, e)) && e.series.push(a)
            },
            pointHoverOptions: function(a, e, c) {
                var d = h(a.showhovereffect, e.showhovereffect),
                    b = {
                        enabled: d
                    },
                    f = {};
                void 0 === d && (d = b.enabled = void 0 !== q(a.hovercolor, e.plotfillhovercolor, a.hoveralpha, e.plotfillhoveralpha, a.borderhovercolor, e.plotborderhovercolor, a.borderhoverthickness, e.plotborderhoverthickness, a.borderhoveralpha, e.plotborderhoveralpha));
                if (d) {
                    b.highlight = h(a.highlightonhover, e.highlightonhover);
                    b.color = q(a.hovercolor, e.plotfillhovercolor);
                    b.alpha = q(a.hoveralpha, e.plotfillhoveralpha, c.alpha);
                    b.borderColor = q(a.borderhovercolor, e.plotborderhovercolor, c.borderColor);
                    b.borderThickness = h(a.borderhoverthickness,
                        e.plotborderhoverthickness, c.borderWidth);
                    b.borderAlpha = q(a.borderhoveralpha, e.plotborderhoveralpha, c.borderAlpha);
                    0 !== b.highlight && void 0 === b.color && (b.highlight = 1);
                    b.color = q(b.color, c.color).replace(/,+?$/, L);
                    if (1 === b.highlight) {
                        a = b.color.split(/\s{0,},\s{0,}/);
                        e = a.length;
                        for (c = 0; c < e; c += 1) a[c] = W(a[c], 70);
                        b.color = a.join(",")
                    }
                    f = {
                        color: b.color,
                        alpha: b.alpha,
                        borderColor: F(b.borderColor, b.borderAlpha),
                        borderWidth: b.borderThickness
                    }
                }
                return {
                    enabled: d,
                    options: b,
                    rolloverOptions: f
                }
            },
            point: function(a, e, c,
                d, b) {
                a = b[K];
                var f = 0,
                    m = L,
                    g = [],
                    n = q(d.plotborderthickness, Eb),
                    p = !0,
                    k = !1,
                    l = L,
                    s = b.chart,
                    r = this.isPyramid,
                    v = h(d.showpercentintooltip, 1),
                    t = h(d.showlabels, 1),
                    H = h(d.showvalues, 1),
                    G = h(d.showpercentvalues, d.showpercentagevalues, 0),
                    z = q(d.tooltipsepchar, d.hovercapsepchar, Mb),
                    Q = q(d.labelsepchar, z),
                    A = q(d.plotbordercolor, d.piebordercolor),
                    x = this.smartLabel,
                    C = this.numberFormatter,
                    J = c.length,
                    B, la = this.colorManager,
                    s = s.issliced = h(d.issliced, 0),
                    ba = 0,
                    I = h(d.showvalueinlegend, 0),
                    M = h(d.showlabelinlegend, 1),
                    E = h(d.valuebeforelabelinlegend,
                        0),
                    Ma = h(d.showvalueaspercentinlegend, 1),
                    w = q(d.legendsepchar, ", "),
                    Nb = b.plotOptions.series.dataLabels.style,
                    N = {
                        apply: d.showshadow == Eb,
                        opacity: 1
                    },
                    U, R, S, P, ja, Z, ra, T, $, aa, ua, fa, na, ia, V;
                e.isPyramid = r;
                na = e.streamlinedData = h(d.streamlineddata, 1);
                e.is2d = h(d.is2d, 0);
                e.isHollow = h(d.ishollow, na ? 1 : 0);
                ua = h(d.percentofprevious, 0);
                aa = h(this.isPyramid ? d.pyramidyscale : d.funnelyscale);
                e.labelDistance = Math.abs(h(d.labeldistance, d.nametbdistance, 50));
                e.showLabelsAtCenter = h(d.showlabelsatcenter, 0);
                e.yScale = 0 <= aa && 40 >=
                    aa ? aa / 200 : .2;
                t || H || (b.plotOptions.series.dataLabels.enabled = !1, !1 === b.tooltip.enabled && (p = !1));
                e.useSameSlantAngle = h(d.usesameslantangle, na ? 0 : 1);
                for (b = 0; b < J; b += 1) U = c[b], c[b].vline || (U.cleanValue = aa = C.getCleanValue(U.value, !0), null !== aa && (k = !0, V = V || aa, g.push(U), f += aa, V = Math.max(V, aa)));
                if (k) {
                    e.valueSum = f;
                    c = C.dataLabels(f);
                    J = g.length;
                    !r && na && g.sort(function(a, b) {
                        return b.cleanValue - a.cleanValue
                    });
                    r || na || e.data.push({
                        showInLegend: !1,
                        y: f,
                        name: "",
                        shadow: N,
                        smartTextObj: B,
                        color: R,
                        alpha: S,
                        borderColor: F(P,
                            ja),
                        borderWidth: n,
                        link: D(U.link),
                        style: y.parsexAxisStyles(U, {}, d, Nb, R),
                        displayValue: L,
                        doNotSlice: 0 === h(d.enableslicing, 1)
                    });
                    for (b = 0; b < g.length; b += 1) {
                        U = g[b];
                        k = U.cleanValue;
                        fa = b ? g[b - 1].value : k;
                        J = O(q(U.label, U.name, L));
                        B = x.getOriSize(J);
                        R = b && !r && na ? b - 1 : b;
                        R = q(U.color, la.getPlotColor(R));
                        S = q(U.alpha, d.plotfillalpha, Fa);
                        P = q(U.bordercolor, A, W(R, 25)).split(u)[0];
                        ja = 1 != d.showplotborder ? db : q(U.borderalpha, d.plotborderalpha, d.pieborderalpha, "80");
                        N.opacity = Math.max(S, ja) / 100;
                        if (aa = h(U.issliced, s)) ba += 1, a.preSliced =
                            aa;
                        ia = r || !na ? f : ua ? fa : V;
                        p && (ra = C.percentValue(k / ia * 100), T = C.dataLabels(k) || L, Z = 1 === t ? J : L, m = 1 === h(U.showvalue, H) ? 1 === G ? ra : T : L, m = ($ = D(O(U.displayvalue))) ? $ : m !== L && Z !== L ? Z + Q + m : q(Z, m) || L, na && (l = ua ? ra : C.percentValue(k / fa * 100)), Z = D(O(q(U.tooltext, a.tooltext))), void 0 !== Z ? Z = ab(Z, [1, 2, 3, 7, 14, 24, 25, 37], {
                            formattedValue: T,
                            label: J,
                            percentValue: ua ? C.percentValue(k / V * 100) : ra,
                            sum: c,
                            unformattedSum: f,
                            percentOfPrevValue: l
                        }, U, d) : (Z = 1 === v ? ra : T, Z = J !== L ? J + z + Z : Z));
                        fa = M ? J : L;
                        I && (ia = Ma ? C.legendPercentValue(k / ia * 100) : C.legendValue(k),
                            fa = E ? ia + (fa && w + fa) : (fa && fa + w) + ia);
                        ia = this.pointHoverOptions(U, d, {
                            color: R,
                            alpha: S,
                            borderColor: P,
                            borderAlpha: ja,
                            borderWidth: n
                        });
                        B = {
                            displayValue: m,
                            style: y.parsexAxisStyles(U, {}, d, Nb, R),
                            categoryLabel: J,
                            toolText: Z,
                            showInLegend: fa !== L,
                            y: k,
                            name: fa,
                            shadow: N,
                            smartTextObj: B,
                            color: R,
                            alpha: S,
                            borderColor: F(P, ja),
                            borderWidth: n,
                            link: D(U.link),
                            isSliced: aa,
                            doNotSlice: 0 === h(d.enableslicing, 1),
                            tooltipConstraint: this.tooltipConstraint,
                            hoverEffects: ia.enabled && ia.options,
                            rolloverProperties: ia.enabled && ia.rolloverOptions
                        };
                        b || r || !na || (B.showInLegend = !1);
                        e.data.push(B)
                    }
                    f || (e.data = []);
                    e.labelMaxWidth = 0;
                    e.noOFSlicedElement = ba;
                    return e
                }
                return null
            },
            spaceManager: function(a, e, c, d) {
                var b = this.smartLabel,
                    f = e.chart,
                    m = a.chart,
                    g = q(f.legendposition, mb).toLowerCase(),
                    n = c - (m.marginRight + m.marginLeft);
                d -= m.marginTop + m.marginBottom;
                var p = this.isPyramid,
                    k = 0,
                    l = 0,
                    s, r = a.series[0],
                    v, t, H, G, z, Q, A, x, C, J, B, la, ba, I, M, E, u, w, y, N, F;
                if (r) {
                    v = this._tempSnap = {
                        top3DSpace: 0,
                        bottom3DSpace: 0,
                        topLabelSpace: 0,
                        rightLabelSpace: 0
                    };
                    a.legend.enabled && (g === bb ?
                        n -= this.placeLegendBlockRight(a, e, n / 2, d, !0) : d -= this.placeLegendBlockBottom(a, e, n, d / 2, !0));
                    g = .1 * d;
                    s = h(f.slicingdistance, g);
                    g = s > 2 * g ? 0 : s;
                    f = Math.min(2 * (d - g), n);
                    m.marginTop += g / 2;
                    m.marginBottom += g / 2;
                    r.SlicingDistance = s;
                    l = r.data;
                    A = l.length;
                    x = p ? 0 : 1;
                    g = r.labelDistance + 3;
                    s = r.showLabelsAtCenter;
                    la = Math.min(f, .3 * n);
                    G = n - la;
                    ba = n - la - g;
                    M = 0;
                    E = (t = l[0]) && l[0].y ? l[0].y : 1;
                    u = r.valueSum ? r.valueSum : 1;
                    w = p ? 0 : 1;
                    y = .8 / E;
                    N = 1 == r.useSameSlantAngle;
                    B = (F = !p && !r.streamlinedData) ? l[0].y - l[1].y : 0;
                    !p && t && l[0].displayValue && (C = l[0], t = a.plotOptions.series.dataLabels.style,
                        I = h(Fb(parseFloat(t.lineHeight) + t.borderPadding + t.borderThickness), 10), b.setStyle(t), H = b.getSmartText(C.displayValue, n, I), C.displayValue = H.text, H.tooltext && (C.originalText = H.tooltext), C.labelWidht = b.getOriSize(H.text).width, m.marginTop += v.topLabelSpace = I + 4);
                    for (; x < A; x += 1) C = l[x], t = C.style, I = h(Fb(parseFloat(t.lineHeight) + t.borderPadding + t.borderThickness), 10), b.setStyle(t), s ? b.getSmartText(C.displayValue, n, I) : (Q = p ? (t = B + C.y / 2) ? t / u : 1 : F ? .2 + y * B : C.y ? N ? C.y / E : Math.sqrt(C.y / E) : 1, t = la * Q, J = ba + (la - t) / 2, H = b.getSmartText(C.displayValue,
                        J, I), C.displayValue = H.text, H.tooltext && (C.originalText = H.tooltext), M = Math.max(M, H.width), 0 < G && (H = 0 < H.width ? J - H.width : J + g, t = 1 / (Q + 1) * (t + 2 * H + la), G = Math.min(G, t - la)), B += F ? -(l[x + 1] && l[x + 1].y || 0) : C.y);
                    C && (z = p ? 1 : F ? .2 : C.y ? N ? C.y / E : Math.sqrt(C.y / E) : 1);
                    G = la + G;
                    G > f && (G = f);
                    B = F ? l[0].y - l[1].y : 0;
                    if (!s)
                        for (x = p ? 0 : 1, A = l.length; x < A; x += 1) C = l[x], Q = p ? (t = B + C.y / 2) ? t / u : 1 : F ? .2 + y * B : C.y ? N ? C.y / E : kb(C.y / E) : 1, t = G * Q, J = ba + (la - t) / 2, H = b.getSmartText(C.displayValue, J, I), k = va(k, .5 * t + H.width + g), B += F ? -(l[x + 1] && l[x + 1].y || 0) : C.y;
                    0 < M ? (v.rightLabelSpace =
                        n - G, l = k - (.5 * c - m.marginRight), 0 < l && (m.marginRight += l, m.marginLeft -= l), m.marginRight += .5 * v.rightLabelSpace, m.marginLeft += .5 * v.rightLabelSpace, n -= a.title.alignWithCanvas ? v.rightLabelSpace : 0) : g = 0;
                    r.labelDistance = r.connectorWidth = g;
                    this.titleSpaceManager(a, e, n, d / 2);
                    (s || !M) && f < n && (m.marginLeft += .5 * (n - f - g), m.marginRight += .5 * (n - f - g));
                    r.is2d || (m.marginTop += v.top3DSpace = G * r.yScale * w / 2, m.marginBottom += v.bottom3DSpace = G * r.yScale * z / 2)
                }
            },
            updateSnapPoints: function() {
                w.gaugebase.updateSnapPoints.apply(this, arguments);
                var a = this.snapLiterals,
                    e = this._tempSnap || {};
                a.plotwidth = a.canvaswidth;
                a.plotsemiwidth = a.canvaswidth / 2;
                a.plotheight = a.canvasheight + e.top3DSpace + e.bottom3DSpace;
                a.plotstartx = a.canvasstartx;
                a.plotstarty = a.canvasstarty - e.top3DSpace;
                a.plotendx = a.canvasendx;
                a.plotendy = a.canvasendy + e.bottom3DSpace;
                a.canvaswidth += e.rightLabelSpace;
                a.canvasheight = a.plotheight + e.topLabelSpace;
                a.canvasstarty = a.plotstarty - e.topLabelSpace;
                a.canvasendy = a.plotendy;
                a.canvasendx += e.rightLabelSpace
            },
            eiMethods: {
                sliceDataItem: function(a) {
                    var e =
                        this.jsVars.hcObj,
                        c;
                    if (e && e.series && (c = e.series[0]) && c.data && c.data[a] && c.data[a].slice) return c.data[c.xIncrement - 1 - a].slice()
                }
            },
            useSortedData: !0,
            creditLabel: !1
        }, w.gaugebase);
        w("pyramid", {
            friendlyName: "Pyramid Chart",
            subTitleFontSizeExtender: 0,
            drawAnnotations: !0,
            standaloneInit: !0,
            defaultSeriesType: "pyramid",
            defaultPlotShadow: 1,
            useSortedData: !1,
            isPyramid: 1,
            creditLabel: !1,
            rendererId: "pyramid"
        }, w.funnel);
        w("sparkbase", {
            defaultPlotShadow: 0,
            useSortedData: !1,
            subTitleFontSizeExtender: 0,
            subTitleFontWeight: 0,
            drawAnnotations: !0,
            showYAxisValues: 0,
            numdivlines: 0,
            chartrightmargin: 3,
            chartleftmargin: 3,
            charttopmargin: 3,
            chartbottommargin: 3,
            decimals: 2,
            showTrendlineLabel: 0,
            zeroplanethickness: 0,
            tooltippadding: 1,
            useScaleRecursively: !0,
            showTrendlineLabels: 0,
            showAxisLimitGridLines: 0,
            styleApplicationDefinition_font: w.gaugebase.styleApplicationDefinition_font,
            defaultPaletteOptions: xa(T({}, Ra), {
                paletteColors: [
                    ["555555", "A6A6A6", "CCCCCC", "E1E1E1", "F0F0F0"],
                    ["A7AA95", "C4C6B7", "DEDFD7", "F2F2EE"],
                    ["04C2E3", "66E7FD", "9CEFFE",
                        "CEF8FF"
                    ],
                    ["FA9101", "FEB654", "FED7A0", "FFEDD5"],
                    ["FF2B60", "FF6C92", "FFB9CB", "FFE8EE"]
                ],
                bgColor: ["FFFFFF", "CFD4BE,F3F5DD", "C5DADD,EDFBFE", "A86402,FDC16D", "FF7CA0,FFD1DD"],
                bgAngle: [270, 270, 270, 270, 270],
                bgRatio: ["0,100", "0,100", "0,100", "0,100", "0,100"],
                bgAlpha: ["100", "60,50", "40,20", "20,10", "30,30"],
                canvasBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
                canvasBgAngle: [0, 0, 0, 0, 0],
                canvasBgAlpha: ["100", "100", "100", "100", "100"],
                canvasBgRatio: ["", "", "", "", ""],
                canvasBorderColor: ["BCBCBC", "BEC5A7", "93ADBF",
                    "C97901", "FF97B1"
                ],
                toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
                toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
                baseFontColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
                trendColor: ["666666", "60634E", "415D6F", "845001", "68001B"],
                plotFillColor: ["666666", "A5AE84", "93ADBF", "C97901", "FF97B1"],
                borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
                borderAlpha: [50, 50, 50, 50, 50],
                periodColor: ["EEEEEE", "ECEEE6", "E6ECF0", "FFF4E6", "FFF2F5"],
                winColor: ["666666", "60634E",
                    "025B6A", "A15E01", "FF97B1"
                ],
                lossColor: ["CC0000", "CC0000", "CC0000", "CC0000", "CC0000"],
                drawColor: ["666666", "A5AE84", "93ADBF", "C97901", "FF97B1"],
                scorelessColor: ["FF0000", "FF0000", "FF0000", "FF0000", "FF0000"]
            }),
            preSeriesAddition: function(a, e) {
                var c = a.plotOptions.series.dataLabels.style,
                    d = a.chart,
                    b = e.chart,
                    c = {
                        fontFamily: c.fontFamily,
                        fontSize: c.fontSize,
                        lineHeight: c.lineHeight,
                        fontWeight: c.fontWeight,
                        fontStyle: c.fontStyle
                    },
                    f, m, g, n;
                if ("sparkwinloss" == this.name && (f = e.data || e.dataset && e.dataset[0] && e.dataset[0].data,
                        m = {
                            w: 1,
                            l: -1,
                            d: .1
                        }, 0 < (g = f && f.length)))
                    for (; g;) --g, n = f[g], n.value = m[n.value.toLowerCase()];
                d.borderWidth = h(b.showborder, this.showBorder, 0) ? h(b.borderthickness, 1) : 0;
                d.plotBorderWidth = h(b.canvasborderthickness, 1);
                f = d.openColor = pa(q(b.opencolor, "0099FF"));
                m = d.closeColor = pa(q(b.closecolor, "0099FF"));
                d.highColor = pa(q(b.highcolor, "00CC00"));
                d.lowColor = pa(q(b.lowcolor, "CC0000"));
                d.openHoverColor = F(pa(q(b.openhovercolor, b.anchorhovercolor, b.plotfillhovercolor, W(f, 70))), h(b.openhoveralpha, b.anchorhoveralpha,
                    b.plotfillhoveralpha, 100));
                d.closeHoverColor = F(pa(q(b.closehovercolor, b.anchorhovercolor, b.plotfillhovercolor, W(m, 70))), h(b.closehoveralpha, b.anchorhoveralpha, b.plotfillhoveralpha, 100));
                d.highHoverColor = F(pa(q(b.highhovercolor, b.anchorhovercolor, b.plotfillhovercolor, W(d.highColor, 70))), h(b.highhoveralpha, b.anchorhoveralpha, b.plotfillhoveralpha, 100));
                d.lowHoverColor = F(pa(q(b.lowhovercolor, b.anchorhovercolor, b.plotfillhovercolor, W(d.lowColor, 70))), h(b.lowhoveralpha, b.anchorhoveralpha, b.plotfillhoveralpha,
                    100));
                this.forceHoverEnable = q(b.openhovercolor, b.closehovercolor, b.highhovercolor, b.lowhovercolor, b.openhoveralpha, b.closehoveralpha, b.highhoveralpha, b.lowhoveralpha, b.winhovercolor, b.losshovercolor, b.drawhovercolor, b.scorelesshovercolor);
                a.chart.openValue = {
                    style: T({}, c)
                };
                Ka(a.chart.openValue.style);
                a.chart.openValue.style.color = f;
                a.chart.closeValue = {
                    style: T({}, c)
                };
                Ka(a.chart.openValue.style);
                a.chart.closeValue.style.color = m;
                a.chart.highLowValue = {
                    style: T({}, c)
                };
                this.parseStyles(a);
                0 === this.showCanvas &&
                    (d.plotBackgroundColor = Ba);
                this.showCanvasBorder || (d.plotBorderWidth = 0);
                d.useRoundEdges || (d.plotShadow = 0);
                b.zeroplanethickness = q(b.zeroplanethickness, this.zeroplanethickness);
                delete b.yaxisname;
                delete b.xaxisname;
                b.showlabels = q(b.showlabels, db)
            },
            spaceManager: function(a, e, c, d) {
                var b = a[K],
                    f = this.smartLabel || b.smartLabel,
                    m = e.chart,
                    g = a.series[0],
                    n = a.chart,
                    p = c - (n.marginRight + n.marginLeft),
                    k = h(m.canvasleftmargin),
                    l = h(m.canvasrightmargin),
                    s = a.valuePadding = h(m.valuepadding, 2),
                    r = a.plotOptions.series.dataLabels.style,
                    v = parseInt(r.lineHeight, 10),
                    t = p,
                    H = b = 0,
                    G, z;
                if (g) {
                    d = zb(a, e, .7 * p, d, void 0, c, d, this);
                    t -= d.left + d.right;
                    p = c - (n.marginRight + n.marginLeft);
                    z = G = g = 0;
                    f.setStyle(r);
                    $(n.openValue.label) && (f.setStyle(n.openValue.style), v = h(parseInt(n.openValue.style.lineHeight, 10), 10), r = f.getSmartText(n.openValue.label, t, 1.5 * v), 0 < r.width && (b = g = r.width + s, t -= g));
                    $(n.closeValue.label) && (f.setStyle(n.closeValue.style), v = h(parseInt(n.closeValue.style.lineHeight, 10), 10), r = f.getSmartText(n.closeValue.label, t, 1.5 * v), 0 < r.width && (H = G =
                        r.width + s, t -= G));
                    $(n.highLowValue.label) && (f.setStyle(n.highLowValue.style), v = h(parseInt(n.highLowValue.style.lineHeight, 10), 10), f = f.getSmartText(n.highLowValue.label, t, 1.5 * v), 0 < f.width && (H += z = f.width + s));
                    n.marginRight += z + G;
                    n.marginLeft += g;
                    $(k) ? (n.spacingLeft = n.marginLeft = k, n.spacingLeft -= d.left + g) : n.marginLeft += d.left;
                    $(l) ? (n.spacingRight = n.marginRight = l, n.spacingRight -= d.right + z + G) : n.marginRight += d.right;
                    this.xAxisMinMaxSetter(a, e, p);
                    n = a.xAxis;
                    l = n.min;
                    p = n.max;
                    k = h(m.periodlength, 0);
                    m = F(q(m.periodcolor,
                        this.colorManager.getColor("periodColor")), h(m.periodalpha, 100));
                    s = 1;
                    if (0 < k)
                        for (; l <= p; l += k) s ? (n.plotBands.push({
                            color: m,
                            from: l,
                            to: Math.min(p, l + k),
                            zIndex: 1
                        }), s = 0) : s = 1;
                    Ab(a, e, c, b, H, this)
                }
            }
        }, Ob);
        w("sparkline", {
            friendlyName: "Spark Line Chart",
            standaloneInit: !0,
            defaultSeriesType: "line",
            rendererId: "sparkline",
            creditLabel: !1,
            showtooltip: 0,
            showCanvas: 0,
            point: w.linebase.point,
            lineThickness: 1,
            anchorRadius: 2,
            anchorBorderThickness: 0,
            postSeriesAddition: function(a, e) {
                var c = a.chart,
                    d = e.chart,
                    b = this.colorManager,
                    f = a.series && a.series[0],
                    m = f && a.series[0].data,
                    g, n, p, k = this.highValue,
                    l = this.lowValue,
                    s = this.numberFormatter,
                    r = c.openColor,
                    v = c.closeColor,
                    t = c.highColor,
                    H = c.lowColor,
                    G = c.openHoverColor,
                    z = c.closeHoverColor,
                    Q = c.highHoverColor,
                    A = c.lowHoverColor,
                    x;
                x = pa(q(d.anchorcolor, b.getColor("plotFillColor")));
                var C = h(d.showopenanchor, d.drawanchors, d.showanchors, 1),
                    J = h(d.showcloseanchor, d.drawanchors, d.showanchors, 1),
                    B = h(d.showhighanchor, d.drawanchors, d.showanchors, 1),
                    u = h(d.showlowanchor, d.drawanchors, d.showanchors,
                        1),
                    ba = h(d.anchoralpha, 100),
                    I, M = h(d.drawanchors, d.showanchors, 0),
                    E = M ? h(d.anchoralpha, 100) : 0,
                    Ma, w, y = 0,
                    N = q(d.linecolor, b.getColor("plotFillColor")),
                    D = h(d.linealpha, 100),
                    R, K;
                if (0 < (b = g = m && m.length)) {
                    n = e.data || e.dataset && e.dataset[0] && e.dataset[0].data;
                    f.color = F(N, D);
                    R = m[0] && m[0].y || L;
                    for (K = m[b - 1] && m[b - 1].y || L; g;) --g, f = m[g], p = n[g], x = void 0, I = h(f.anchorbgalpha, ba), f.color = F(q(p.color, N), h(p.alpha, D)), f.marker.fillColor = F(q(f.anchorbgcolor, x), h(f.anchorbgalpha, E)), x = F(pa(q(d.anchorhovercolor, d.plotfillhovercolor,
                        W(N, 70))), h(d.lowhoveralpha, d.anchorhoveralpha, d.plotfillhoveralpha, 100)), h(d.anchorhoverradius, f.marker.radius), f.marker.enabled = !!M, f.y == l && (x = q(f.anchorbgcolor, H), f.marker.fillColor = F(x, I), x = A, f.marker.enabled = !!u, w = s.dataLabels(f.y)), f.y == k && (x = q(f.anchorbgcolor, t), f.marker.fillColor = F(x, I), x = Q, f.marker.enabled = !!B, Ma = s.dataLabels(f.y)), void 0 !== f.toolText && (f.toolText = ab(f.toolText, [54, 55, 56, 57, 58, 59, 60, 61], {
                        openDataValue: s.dataLabels(R),
                        closeDataValue: s.dataLabels(K),
                        highDataValue: s.dataLabels(k),
                        lowDataValue: s.dataLabels(l),
                        openValue: R,
                        closeValue: K,
                        highValue: k,
                        lowValue: l
                    }, {}, d)), h(p.showvalue, d.showvalue, d.showvalues, 0) || (f.displayValue = L), $(f.y) && (y = 1), p = f.hoverEffects, f.marker.enabled && p && (p.anchorColor = x, p = f.rolloverProperties, p.radius = h(d.anchorhoverradius, f.marker.radius), p.lineWidth = 0, p.lineColor = p.fillColor = x);
                    f = m[0];
                    f.marker.fillColor = F(q(f.anchorbgcolor, r), I);
                    f.marker.enabled = !!C;
                    p = f.hoverEffects;
                    f.marker.enabled && p && (p.anchorColor = G, p = f.rolloverProperties, p.radius = h(d.anchorhoverradius,
                        f.marker.radius), p.lineWidth = 0, p.lineColor = p.fillColor = G);
                    r = s.dataLabels(f.y);
                    f.y == l && u && (f.marker.fillColor = F(q(f.anchorbgcolor, H), I), f.marker.enabled = !!u);
                    f.y == k && B && (f.marker.fillColor = F(q(f.anchorbgcolor, t), I), f.marker.enabled = !!B);
                    f = m[b - 1];
                    f.marker.fillColor = F(q(f.anchorbgcolor, v), I);
                    f.marker.enabled = !!J;
                    p = f.hoverEffects;
                    f.marker.enabled && p && (p.anchorColor = z, p = f.rolloverProperties, p.radius = h(d.anchorhoverradius, f.marker.radius), p.lineWidth = 0, p.lineColor = p.fillColor = z);
                    m = s.dataLabels(f.y);
                    f.y ==
                        l && u && (f.marker.fillColor = F(q(f.anchorbgcolor, H), I), f.marker.enabled = !!u);
                    f.y == k && B && (f.marker.fillColor = F(q(f.anchorbgcolor, t), I), f.marker.enabled = !!B);
                    c.openValue.label = c.closeValue.label = c.highLowValue.label = c.highLowValue.highLabel = void 0;
                    y && (c.openValue.label = h(d.showopenvalue, 1) ? r : L, c.closeValue.label = h(d.showclosevalue, 1) ? m : L, h(d.showhighlowvalue, 1) && (c.highLowValue.label = "[" + Ma + " | " + w + "]", c.highLowValue.highLabel = Ma, c.highLowValue.lowLabel = w))
                }
            }
        }, w.sparkbase);
        w("sparkcolumn", {
            friendlyName: "Spark Column Chart",
            standaloneInit: !0,
            rendererId: "cartesian",
            defaultSeriesType: "column",
            creditLabel: !1,
            showCanvasBorder: !0,
            point: w.column2dbase.point,
            useFlatColor: !0,
            postSeriesAddition: function(a, e) {
                var c = e.chart,
                    d = this.colorManager,
                    b = a.series && a.series[0] && a.series[0].data,
                    f, m, g, n, p = this.highValue,
                    k = this.lowValue,
                    l = this.numberFormatter,
                    s = q(c.plotfillalpha, Fa),
                    r = q(c.plotfillcolor, d.getColor("plotFillColor")),
                    v = q(c.plotborderalpha, Fa),
                    t = q(c.plotbordercolor),
                    H, G = q(c.highcolor, "000000"),
                    z = q(c.lowcolor, "000000"),
                    Q = q(c.highbordercolor,
                        t),
                    A = q(c.lowbordercolor, t),
                    x = h(c.showplotborder, 0) ? h(c.plotborderthickness, 1) : 0,
                    C, J, B, u, ba, I;
                if (0 < (d = b && b.length))
                    for (m = e.data || e.dataset && e.dataset[0] && e.dataset[0].data; d;) --d, f = b[d], g = m[d], C = q(g.color, r), J = q(g.alpha, s), B = q(g.bordercolor, t), u = q(g.borderalpha, v), ba = q(g.ratio, c.plotfillratio), I = q(360 - c.plotfillangle, 90), f.y == p && (C = q(g.color, G), B = q(g.bordercolor, Q), n = f.hoverEffects) && (n.color = q(g.hovercolor, c.highhovercolor, c.plotfillhovercolor, W(C, 70)), n.borderColor = q(g.borderhovercolor, c.highborderhovercolor,
                        c.plotborderhovercolor, B), n.colorArr = n = this.getColumnColor(g, n.color, q(g.hoveralpha, c.highhoveralpha, c.plotfillhoveralpha, J), n.borderColor, u, ba, I, a.chart.useRoundEdges), H = f.rolloverProperties, H.color = n[0], H.borderColor = n[1]), f.y == k && (C = q(g.color, z), B = q(g.bordercolor, A), n = f.hoverEffects) && (n.color = q(g.hovercolor, c.lowhovercolor, c.plotfillhovercolor, W(C, 70)), n.borderColor = q(g.borderhovercolor, c.lowborderhovercolor, c.plotborderhovercolor, B), n.colorArr = n = this.getColumnColor(g, f.hoverEffects.color, q(g.hoveralpha,
                        c.lowhoveralpha, c.plotfillhoveralpha, J), f.hoverEffects.borderColor, u, ba, I, a.chart.useRoundEdges), H = f.rolloverProperties, H.color = n[0], H.borderColor = n[1]), void 0 !== f.toolText && (f.toolText = ab(f.toolText, [56, 57, 60, 61], {
                        highValue: p,
                        lowValue: k,
                        highDataValue: l.dataLabels(p),
                        lowDataValue: l.dataLabels(k)
                    }, {}, c)), n = this.getColumnColor(g, C, J, B, u, ba, I, a.chart.useRoundEdges), f.color = n[0], f.borderColor = n[1], f.borderWidth = x, h(g.showvalue, c.showvalue, c.showvalues, 0) || (f.displayValue = L)
            },
            getColumnColor: function(a,
                e, c, d, b, f, m, g, n, p) {
                var k;
                d = q(d, V(e, 60));
                k = e.split(u);
                a = c.split(u);
                d = d.split(u);
                b = b.split(u);
                p ? n = {
                    FCcolor: {
                        color: k[0],
                        alpha: a[0]
                    }
                } : g ? (e = k[0], c = a[0], n = {
                    FCcolor: {
                        color: V(e, 75) + u + W(e, 25) + u + V(e, 80) + u + W(e, 65) + u + V(e, 80),
                        alpha: c + u + c + u + c + u + c + u + c,
                        ratio: "0,10,13,57,20",
                        angle: n ? "-180" : "0"
                    }
                }, d = [V(e, 70)]) : (c = ub(c, k.length), n = {
                    FCcolor: {
                        color: e,
                        alpha: c,
                        ratio: f,
                        angle: n ? 180 - m : m
                    }
                });
                return [n, {
                    FCcolor: {
                        color: d[0],
                        alpha: b[0]
                    }
                }]
            }
        }, w.sparkbase);
        w("sparkwinloss", {
            friendlyName: "Spark Win-Loss Chart",
            standaloneInit: !0,
            defaultSeriesType: "column",
            rendererId: "sparkwinloss",
            creditLabel: !1,
            showCanvasBorder: !1,
            showCanvas: 0,
            showtooltip: 0,
            postSeriesAddition: function(a, e) {
                var c = a.chart,
                    d = e.chart,
                    b = this.colorManager,
                    f = a.series && a.series[0] && a.series[0].data,
                    m = q(d.plotfillalpha, Fa),
                    g = q(d.plotfillcolor, b.getColor("plotFillColor")),
                    n = q(d.plotborderalpha, Fa),
                    p = q(d.plotbordercolor),
                    k = h(d.showplotborder, 0) ? h(d.plotborderthickness, 1) : 0,
                    l = q(d.wincolor, b.getColor("winColor")),
                    s = q(d.losscolor, b.getColor("lossColor")),
                    r = q(d.drawcolor, b.getColor("drawColor")),
                    b = q(d.scorelesscolor, b.getColor("scorelessColor")),
                    v = d.winhovercolor,
                    t = d.losshovercolor,
                    H = d.drawhovercolor,
                    G = d.scorelesshovercolor,
                    z = L,
                    Q, A, x, C, J, B, u = 0,
                    ba = 0,
                    I = 0;
                A = a.yAxis[0];
                var M, E, w, y, F, N;
                a.tooltip.enabled = !1;
                A.min = -1.1;
                A.max = 1.1;
                if (0 < (y = f && f.length)) {
                    for (F = e.data || e.dataset && e.dataset[0] && e.dataset[0].data; y;) {
                        --y;
                        M = f[y];
                        N = F[y];
                        switch (N.value) {
                            case 1:
                                z = q(N.color, l, g);
                                Q = q(N.hovercolor, v, z);
                                u += 1;
                                break;
                            case -1:
                                z = q(N.color, s, g);
                                Q = q(N.hovercolor, t, z);
                                ba += 1;
                                break;
                            case .1:
                                z = q(N.color, r, g), Q = q(N.hovercolor,
                                    H, z), I += 1
                        }
                        1 == N.scoreless && (z = q(N.color, b, g), Q = q(N.hovercolor, G, N.color, b, Q));
                        A = q(N.alpha, m);
                        x = q(N.bordercolor, p);
                        C = q(N.borderalpha, n);
                        J = q(N.ratio, d.plotfillratio);
                        B = q(360 - d.plotfillangle, 90);
                        w = this.getColumnColor(N, z, A, x, C, J, B, a.chart.useRoundEdges);
                        M.color = w[0];
                        M.borderColor = w[1];
                        M.borderWidth = k;
                        h(N.showvalue, 0) || (M.displayValue = L);
                        if (E = M.hoverEffects) M = M.rolloverProperties, E.color = W(Q, 70), w = E.colorArr = this.getColumnColor(N, E.color, A, x, C, J, B, a.chart.useRoundEdges), M.color = w[0], M.borderColor = w[1],
                            E.borderThickness = k, M.borderWidth = k
                    }
                    1 == h(d.showvalue, 1) && (c.closeValue.style = T({}, a.plotOptions.series.dataLabels.style), c.closeValue.label = u + "-" + ba + (0 < I ? "-" + I : L))
                }
            }
        }, w.sparkcolumn);
        Va = {
            realtimeEnabled: !0,
            canvasPaddingModifiers: null,
            linearDataParser: w.gaugebase.linearDataParser,
            eiMethods: xa({}, w.gaugebase.eiMethods),
            decimals: 2,
            prepareRealtimeValueText: function() {
                var a = this.hcJSON,
                    e = this.hcJSON[K],
                    c = e.rtLabel,
                    d = a.chart.realtimeValueSeparator,
                    b = new RegExp(d + "$", "g");
                c && c.label && (e = e.realtimeValues.join(d).replace(b,
                    L), c.label.text = e, a.xAxis.plotLines && (a.xAxis.plotLines[0] = c))
            },
            chart: function() {
                var a = this.dataObj.chart,
                    e = this.numberFormatter,
                    c, d, b, f = h(a.showrealtimevalue, 1),
                    m = h(a.realtimevaluepadding),
                    g, n, a = this.dataObj.chart;
                a.adjustdiv = "0";
                f && (a.xaxisname = a.xaxisname ? "<br/>" + a.xaxisname : "<br/>");
                c = w.msareabase.chart.apply(this, arguments);
                b = c.chart;
                d = c[K];
                g = c.series;
                d.isDual ? (d._userPMin = h(a.pyaxisminvalue), d._userPMax = h(a.pyaxismaxvalue), d._userSMin = h(a.syaxisminvalue), d._userSMax = h(a.syaxismaxvalue)) : (d._userMin =
                    h(a.yaxisminvalue), d._userMax = h(a.yaxismaxvalue));
                b.dataStreamURL = q(a.datastreamurl, "");
                b.refreshInterval = h(a.refreshinterval, 1);
                b.updateInterval = h(a.updateinterval, b.refreshInterval);
                b.clearInterval = h(a.clearchartinterval, 0);
                b.dataStamp = a.datastamp;
                b.useMessageLog = h(a.usemessagelog, 0);
                b.messageLogWPercent = Ja(h(a.messagelogwpercent, 80), 100);
                b.messageLogHPercent = Ja(h(a.messageloghpercent, 70), 100);
                b.messageLogShowTitle = h(a.messagelogshowtitle, 1);
                b.messageLogTitle = q(a.messagelogtitle, "Message Log");
                b.messageLogColor = q(a.messagelogcolor, "#fbfbfb");
                b.messageGoesToJS = h(a.messagegoestojs, 0);
                b.messageGoesToLog = h(a.messagegoestolog, 1);
                b.messageJSHandler = q(a.messagejshandler, "");
                b.messagePassAllToJS = h(a.messagepassalltojs, 0);
                b.messageLogIsCancelable = h(a.messagelogiscancelable, 1);
                b.alwaysShowMessageLogMenu = h(a.alwaysshowmessagelogmenu, b.useMessageLog);
                b.showRTMenuItem = h(a.showrtmenuitem, 0);
                b.showRealtimeValue = f;
                b.realtimeValueSeparator = q(a.realtimevaluesep, ", ");
                b.realtimeValuePadding = m;
                b.realtimeValueFont =
                    q(a.realtimevaluefont, "");
                b.realtimeValueFontBold = q(a.realtimevaluefontbold, 0);
                b.realtimeValueFontColor = q(a.realtimevaluefontcolor, "");
                b.realtimeValueFontSize = h(a.realtimevaluefontsize, "");
                if (f) {
                    if (!d.realtimeValues)
                        for (d.realtimeValues = [], f = 0, m = g.length; f < m; f++) a = g[f], n = (n = a.data) && n.length && n[n.length - 1] && n[n.length - 1].y, d.realtimeValues[f] = e.dataLabels(n, a.yAxis);
                    d.rtLabel || (e = T({}, d.outCanvasStyle), e.fontWeight = b.realtimeValueFontBold ? "bold" : "normal", b.realtimeValueFontColor && (e.color = b.realtimeValueFontColor.replace(fb,
                        hb)), b.realtimeValueFontSize && (e.fontSize = b.realtimeValueFontSize + jb), b.realtimeValueFont && (e.fontFamily = b.realtimeValueFont), g = h(parseInt(e.fontSize, 10), 10), d.rtLabel = {
                        color: ha,
                        alwaysVisible: !0,
                        isTrend: !0,
                        value: (d.x.catCount - 1) / 2,
                        width: .01,
                        label: {
                            align: La,
                            textAlign: La,
                            rotation: 0,
                            textVAlign: Wa,
                            text: " ",
                            x: 0,
                            y: .8 * g + (c.xAxis.title.margin | 0),
                            style: e
                        }
                    }, c.xAxis.plotLines.splice(0, 0, d.rtLabel))
                }
                b.showRTMenuItem ? (c.callbacks || (c.callbacks = [])).push(this.drawRTMenuButtons) : b.useMessageLog && b.alwaysShowMessageLogMenu &&
                    b.messageGoesToLog && (c.callbacks || (c.callbacks = [])).push(this.drawMLMenuButtons);
                this.dataObj.alerts && (this.hcJSON.alerts = this.parseAlertObj(this.dataObj.alerts));
                return c
            },
            parseAlertObj: function(a) {
                var e = this.numberFormatter,
                    c = a && a.alert,
                    d = c.length,
                    b = {
                        alert: []
                    },
                    f, m, g, n, p;
                for (a = 0; a < d; a += 1) n = c[a], f = e.getCleanValue(n.minvalue), m = e.getCleanValue(n.maxvalue), g = q(n.action, ""), n = q(n.param, ""), null !== f && null !== m && "" !== g && (f > m && (p = m, m = f, f = p), b.alert.push({
                    minvalue: f,
                    maxvalue: m,
                    param: n,
                    action: g
                }));
                return b
            },
            drawMLMenuButtons: function() {
                var a = this.options,
                    e = a.chart,
                    c = this.menu || (this.menu = []),
                    d = this.toolbar,
                    a = a[K],
                    b;
                c.push(b = oa({
                    chart: this,
                    basicStyle: a && a.outCanvasStyle || this.outCanvasStyle || {},
                    items: [{
                        text: "Show Log",
                        visibility: "hidden",
                        onclick: function() {
                            y && y.messageLogger && y.messageLogger.open();
                            b.showItem(4);
                            b.hideItem(3)
                        }
                    }, {
                        text: "Hide Log",
                        visibility: "hidden",
                        onclick: function() {
                            y && y.messageLogger && y.messageLogger.close();
                            b.showItem(3);
                            b.hideItem(4)
                        }
                    }],
                    position: {
                        x: e.spacingLeft,
                        y: this.chartHeight -
                            e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15)
                    }
                }));
                b.hideItem(1);
                this.elements.configureButton = d.add("loggerIcon", function(a, c) {
                    return function() {
                        b.visible ? b.hide() : b.show({
                            x: a,
                            y: c + 1
                        })
                    }
                }(), {
                    x: e.spacingLeft,
                    y: this.chartHeight - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15),
                    tooltip: "Show & Hide Message"
                })
            },
            drawRTMenuButtons: function() {
                var a = this.logic,
                    e = a.chartInstance,
                    c = this.options,
                    d = c.chart,
                    b = d && d.alwaysShowMessageLogMenu,
                    f = this.menu || (this.menu = []),
                    m = this.toolbar,
                    c = (c = c[K]) &&
                    c.outCanvasStyle || this.outCanvasStyle || {},
                    g, n = e.isUpdateActive || a.eiMethods.isUpdateActive,
                    n = n && n.call(e);
                f.push(g = oa({
                    chart: this,
                    basicStyle: c,
                    items: [{
                        text: "Stop Update",
                        visibility: n ? qb : "hidden",
                        onclick: function() {
                            g.hideItem(0);
                            g.showItem(1);
                            e.stopUpdate()
                        }
                    }, {
                        text: "Start Update",
                        visibility: n ? "hidden" : qb,
                        onclick: function() {
                            g.hideItem(1);
                            g.showItem(0);
                            e.restartUpdate()
                        }
                    }, {
                        text: "Clear Chart",
                        onclick: function() {
                            e.clearChart()
                        }
                    }, {
                        text: "Show Log",
                        visibility: "hidden",
                        onclick: function() {
                            y && y.messageLogger &&
                                y.messageLogger.open();
                            g.showItem(4);
                            g.hideItem(3)
                        }
                    }, {
                        text: "Hide Log",
                        visibility: "hidden",
                        onclick: function() {
                            y && y.messageLogger && y.messageLogger.close();
                            g.showItem(3);
                            g.hideItem(4)
                        }
                    }],
                    position: {
                        x: d.spacingLeft,
                        y: this.chartHeight - d.spacingBottom + (d.showFormBtn || d.showRestoreBtn ? 10 : -15)
                    }
                }));
                h(a.dataObj.chart.allowclear, 1) || g.hideItem(2);
                g.hideItem(0);
                g.hideItem(1);
                !b && g.hideItem(3);
                g.hideItem(4);
                g.showItem(n ? 0 : 1);
                this.elements.configureButton = m.add("configureIcon", function(a, b) {
                    return function() {
                        g.visible ?
                            g.hide() : g.show({
                                x: a,
                                y: b + 1
                            })
                    }
                }(), {
                    x: d.spacingLeft,
                    y: this.chartHeight - d.spacingBottom + (d.showFormBtn || d.showRestoreBtn ? 10 : -15),
                    tooltip: "Manage RealTime Update"
                })
            },
            shiftPlotLines: function(a, e, c, d) {
                var b, f, m = [],
                    g = d[0],
                    n = g && g.RTValueArr,
                    p = n && n.length || 0,
                    k = (d = d[1]) && d.RTValueArr,
                    l = k && k.length || 0,
                    s = a && a.length || 0,
                    r;
                c = h(c, -.5);
                for (r = 0; r < s; r += 1)
                    if (b = a[r], b.isGrid || b.isVline)
                        if (f = b.value += e, f < c || f === c && b.isVline) a.splice(r, 1), b.isGrid && m.push(b), --r, --s;
                if (g && n && p)
                    for (n.splice(0, -e), p = n.length, delete g.min,
                        delete g.max, r = 0; r < p; r += 1)(a = n[r]) && void 0 !== a.min && (!1 === g.min < a.min && (g.min = a.min), !1 === g.max > a.max && (g.max = a.max));
                if (d && k && l)
                    for (k.splice(0, -e), l = k.length, delete d.min, delete d.max, r = 0; r < l; r += 1)(a = k[r]) && void 0 !== a.min && (!1 === d.min < a.min && (d.min = a.min), !1 === d.max > a.max && (d.max = a.max));
                return m
            },
            configureAxis: function(a) {
                var e = a[K],
                    c = a.xAxis,
                    d = e.x,
                    b = e.axisGridManager,
                    f = d.catCount,
                    m = e.oriCatTmp,
                    g = e[0],
                    n = g && g.RTValueArr,
                    p = e[1],
                    k = p && p.RTValueArr,
                    l = this.dataObj,
                    s = l.chart || (l.chart = {}),
                    l = a.series,
                    r =
                    l[0].data.length,
                    s = this.numDisplaySets = h(s.numdisplaysets, va(r, 15)),
                    v = c.plotLines,
                    t = v && v.length || 0,
                    H = [],
                    q = this.chartInstance.jsVars._reflowData,
                    z;
                q.hcJSON && (z = q.hcJSON[K]) && (g.min = z[0] && z[0].min, g.max = z[0] && z[0].max, p.min = z[1] && z[1].min, p.max = z[1] && z[1].max);
                p = ((this.dataObj.categories || (this.dataObj.categories = [{
                    category: []
                }]))[0] || (this.dataObj.categories[0] = {
                    category: []
                })).category || (this.dataObj.categories[0].category = []);
                0 === f && (this.chartInstance.jsVars._forceReflow = !0);
                g = s - r;
                if (0 < g) {
                    for (; t--;) v[t].value +=
                        g;
                    for (c.plotLines = []; g--;) H[g] = {
                        y: null
                    }, b.addXaxisCat(c, g, g, " ", {}, {}, {}), n && n.unshift(null), k && k.unshift(null), m.unshift(null), p.unshift({
                        label: " "
                    });
                    c.plotLines = c.plotLines.reverse().concat(v)
                } else g && (this.shiftPlotLines(c.plotLines, g, -.5, e), m.splice(0, -g));
                for (g = l.length; g--;) c = l[g], e = c.data, c.data = H.concat(e.slice(-s));
                this.needsRedraw = 0 === f;
                d.catCount = s;
                return w.msareabase.configureAxis && w.msareabase.configureAxis.apply(this, arguments)
            },
            postSeriesAddition: function(a, e, c, d, b) {
                e = a[K];
                c = e.isBar;
                d = a.chart.rotateValues && !c ? 270 : 0;
                var f = e[0],
                    m = f.RTValueArr,
                    g = f && f.stacking100Percent,
                    n, p, k, l, h, r, v, t, H;
                if (this.isStacked && m && (e.showStackTotal || g))
                    for (b = b || 0, r = a.series, v = T({}, a.plotOptions.series.dataLabels.style), t = parseFloat(v.fontSize), H = !f.stacking100Percent, v.color = a.plotOptions.series.dataLabels.color, f = m.length; b < f; b += 1)
                        if (p = m[b])
                            if (h = (p.n || 0) + (p.p || 0), e.showStackTotal && (n = b, p = 0 > h ? p.n : p.p, a.xAxis.plotLines.push({
                                    value: n,
                                    width: 0,
                                    isVline: H,
                                    isTrend: !H,
                                    zIndex: 4,
                                    _isStackSum: 1,
                                    _catPosition: b,
                                    label: {
                                        align: La,
                                        textAlign: 270 === d ? 0 > h ? bb : Ia : La,
                                        offsetScale: H ? p : void 0,
                                        offsetScaleIndex: 0,
                                        rotation: d,
                                        style: v,
                                        verticalAlign: Wa,
                                        y: c ? 0 : 0 > h ? 270 === d ? 4 : t : -4,
                                        x: 0,
                                        text: e.numberFormatter.yAxis(h)
                                    }
                                })), g)
                                for (p = 0, n = r.length; p < n; p += 1)
                                    if (r[p].data) {
                                        k = r[p].data[b];
                                        if (k.y || 0 === k.y) l = k.y / h * 100, k.y = l, k.showPercentValues && (k.displayValue = this.numberFormatter.percentValue(l)), k.showPercentInToolTip && (k.toolText = k.toolText + parseInt(100 * l, 10) / 100 + "%");
                                        if (k.previousY || 0 === k.previousY) k.previousY = k.previousY / h * 100
                                    }
            },
            pointValueWatcher: function(a,
                e, c, d, b) {
                if (null !== e) {
                    var f = a[K];
                    a = f[c || (c = 0)];
                    var m;
                    a || (a = f[c] = {});
                    c = a.RTValueArr;
                    c || (c = a.RTValueArr = []);
                    (f = c[b]) || (f = c[b] = {});
                    d && (0 <= e ? f.p ? (m = f.p, e = f.p += e) : f.p = e : f.n ? (m = f.n, e = f.n += e) : f.n = e);
                    !1 === f.max > e && (f.max = e, !1 === a.max > e && (a.max = e));
                    !1 === f.min < e && (f.min = e, !1 === a.min < e && (a.min = e));
                    return m
                }
            },
            realtimeUpdate: function(a, e) {
                var c = this.hcJSON,
                    d = this.dataObj,
                    b = d.chart,
                    f = "0" === b.allowclear ? 0 : 1,
                    m = c[K],
                    g = this.numberFormatter,
                    n = m.x,
                    p = n._labelY,
                    k = n._labelX,
                    l = n._yShipment,
                    s = n._isStagger,
                    r = n._rotation,
                    v =
                    n._textAlign,
                    t = n._adjustedPx,
                    H = n._staggerLines,
                    q = n._labelHeight,
                    z, Q = m.axisGridManager,
                    A = n.catCount,
                    x = this.renderer,
                    C = this.chartInstance.jsVars,
                    J = a.values,
                    B = a.labels || [],
                    u = a.showLabels || [],
                    ba = a.colors,
                    I = a.toolTexts,
                    M = a.links,
                    E = c.xAxis,
                    w = "0" === d.chart.showlabels,
                    y = c.chart.showRealtimeValue,
                    F = d.categories,
                    N = C._reflowData,
                    U = [],
                    R = h(m._startIndex, 0),
                    S = n.stepValue,
                    n = a.dimension > A ? A : a.dimension,
                    P = A - n,
                    U = [],
                    ja = a.vlines,
                    Z, ra, W, V, aa, ua, fa, na, ia, $, Y = new Date,
                    da, ha, X, ea, ca, wa;
                a.clear && f && this.realtimeUpdate({
                    dimension: this.numDisplaySets,
                    values: [],
                    labels: []
                }, 0 < a.dimension);
                if (a.dimension) {
                    c.plotOptions.series.animation = !1;
                    ja ? (Z = a.vlineColors || [], ra = a.vlineLabels || [], W = a.vlineThickness || [], V = a.vlineDashed || []) : ja = [];
                    F || (F = d.categories = []);
                    F[0] ? F[0].category || (F[0].category = []) : F[0] = {
                        category: []
                    };
                    F = F[0].category;
                    U = this.shiftPlotLines(E.plotLines, -n, -.5, m);
                    for (f = U.length; f--;)($ = U[f]).label && (aa = $.label, aa.text = "0" === u[f] || w ? "" : O(B[f] || L), z = P + f, $.value = z, ua = A + f + R, (z = 0 === ua % S) ? (aa.style = E.labels.style, aa.y = s ? p + ua / S % H * q : l, aa.x = k + (r ? t :
                        0), aa.rotation = r, aa.textAlign = v) : aa.style = E.steppedLabels.style, E.plotLines.push(T({}, $)), F.shift(), F.push({
                        label: aa.text
                    })), "1" === ja[f] && Q.addVline(E, {
                        color: Z[f] && decodeURIComponent(Z[f]),
                        label: ra[f] && decodeURIComponent(ra[f]),
                        thickness: W[f] && decodeURIComponent(W[f]),
                        dashed: V[f] && decodeURIComponent(V[f])
                    }, P + f, c);
                    U = [];
                    m._startIndex = (n + R) % (s ? S * H : S);
                    R = c.series && c.series.length;
                    n && m.oriCatTmp.splice(0, n);
                    m._skipValueWatcher = !1;
                    for (f = 0; f < R; f += 1) {
                        Z = c.series[f];
                        W = J && J[f] || [];
                        V = ba && ba[f] || [];
                        S = M && M[f] || [];
                        P = I && I[f] || [];
                        u = Z.yAxis || 0;
                        m._rtCounter || (m._rtCounter = 1);
                        !U[f] && (U[f] = []);
                        Q = U[f];
                        ra = Z.data;
                        fa = ra.length;
                        w = fa - n;
                        for (F = 0; w < fa; w += 1, F += 1) ja = decodeURIComponent(D(W[F], null)), ia = g.getCleanValue(ja), aa = decodeURIComponent(B[F] || ""), m.oriCatTmp[w] = aa, ra.shift(), ja = Z._dataParser({
                            value: ja,
                            label: aa,
                            color: V && V[F] && decodeURIComponent(V[F]),
                            link: S && S[F] && decodeURIComponent(S[F]),
                            tooltext: P && P[F] && decodeURIComponent(P[F])
                        }, w, ia), ja.y = ia, ra.push(ja), Q.push(ja), ja.previousY = this.pointValueWatcher(c, ia, u, this.isStacked,
                            w);
                        y && (m.realtimeValues[f] = g.dataLabels(ia, Z.yAxis))
                    }
                    m._rtCounter += n;
                    this.postSeriesAddition(c, void 0, void 0, void 0, fa - n);
                    y && this.prepareRealtimeValueText();
                    g = c.yAxis[0];
                    J = m[0];
                    I = h(this.isStacked ? 0 : this.setAdaptiveYMin, b.setadaptiveymin, 0);
                    ba = B = !I;
                    M = (g.max - g.min) / 4;
                    if (m.isDual) {
                        if (J.max > g.max || J.min < g.min || (!ba || 0 !== g.min) && g.min !== m._userPMin && J.min - g.min > M || (!B || 0 !== g.max) && g.max !== m._userPMax && g.max - J.max > M) C._forceReflow = !0, m._skipValueWatcher = !0;
                        g = c.yAxis[1];
                        J = m[1];
                        ba = B = !h(b.setadaptivesymin,
                            I);
                        M = (g.max - g.min) / 4;
                        if (J.max > g.max || J.min < g.min || (!ba || 0 !== g.min) && g.min !== m._userSMin && J.min - g.min > M || (!B || 0 !== g.max) && g.max !== m._userSMax && g.max - J.max > M) C._forceReflow = !0, m._skipValueWatcher = !0
                    } else if (J.max > g.max || J.min < g.min || (!ba || 0 !== g.min) && g.min !== m._userMin && J.min - g.min > M || (!B || 0 !== g.max) && g.max !== m._userMax && g.max - J.max > M) C._forceReflow = !0, m._skipValueWatcher = !0;
                    da = m[0] && m[0].RTValueArr;
                    ha = m[1] && m[1].RTValueArr;
                    C._forceReflow && (g = c.yAxis[0], J = m[0], X = m[0] && m[0].min, ea = m[0] && m[0].max, ca =
                        m[1] && m[1].min, wa = m[1] && m[1].max, F = g.min, R = g.max, M = h(m.numdivlines, b.numdivlines, this.numdivlines, 4), y = b.adjustdiv !== db, fa = h(m._userMax, m._userPMax), ia = h(m._userMin, m._userPMin), f = h(b.showyaxisvalues, b.showyaxisvalue, 1), Q = h(b.showlimits, f), u = h(b.showdivlinevalue, b.showdivlinevalues, f), w = h(parseInt(b.yaxisvaluesstep, 10), parseInt(b.yaxisvaluestep, 10), 1), w = 1 > w ? 1 : w, this.axisMinMaxSetter(g, J, fa, ia, B, ba, M, y), g.plotLines = [], g.plotBands = [], g.labels.enabled = g.labels._enabled, g.gridLineWidth = g._gridLineWidth,
                        g.alternateGridColor = g._alternateGridColor, this.configurePlotLines(b, c, g, J, Q, u, w, m.numberFormatter, !1), F === g.min && R === g.max && (na = !0), m.isDual ? (fa = m._userSMax, ia = m._userSMin, I = h(b.setadaptivesymin, I), ba = B = !I, Q = h(b.showsecondarylimits, Q), u = h(b.showdivlinesecondaryvalue, f), g = c.yAxis[1], J = m[1], F = g.min, R = g.max, this.axisMinMaxSetter(g, J, fa, ia, B, ba, M, y), g.plotLines = [], g.plotBands = [], g.labels.enabled = g.labels._enabled, g.gridLineWidth = g._gridLineWidth, g.alternateGridColor = g._alternateGridColor, this.configurePlotLines(b,
                            c, g, J, Q, u, w, m.numberFormatter, !0), F === g.min && R === g.max && na && (C._forceReflow = !1)) : na && (C._forceReflow = !1), d.trendlines && $a(d.trendlines, c.yAxis, m, m.isDual, this.isBar));
                    N.hcJSON && (b = N.hcJSON[K], delete N.hcJSON[K], T(c.series, N.hcJSON.series, !0), N.hcJSON[K] = b, b = null);
                    T(N, {
                        preReflowAdjustments: function() {
                            this.dataObj.categories = d.categories
                        },
                        postReflowAdjustments: function() {
                            var a, b = c.series,
                                d = b && b.length;
                            this.hcJSON.xAxis.plotLines = E.plotLines;
                            this.hcJSON._FCconf[0].RTValueArr = da;
                            this.hcJSON._FCconf[1].RTValueArr =
                                ha;
                            if (b)
                                for (a = 0; a < d; a += 1) this.hcJSON.series[a].data = b[a].data
                        },
                        postHCJSONCreation: function(a) {
                            T(a, {
                                _FCconf: {
                                    0: {
                                        min: X,
                                        max: ea
                                    },
                                    1: {
                                        min: ca,
                                        max: wa
                                    },
                                    _skipValueWatcher: !0,
                                    realtimeValues: m.realtimeValues,
                                    rtvHTMLWrapper: m.rtvHTMLWrapper
                                }
                            }, !0)
                        },
                        hcJSON: {
                            _FCconf: {
                                _userMax: m._userMax,
                                _userMin: m._userMin,
                                _userPMax: m._userPMax,
                                _userSMax: m._userSMax,
                                _userPMin: m._userPMin,
                                _userSMin: m._userSMin,
                                _chartState: m._chartState,
                                _rtCounter: m._rtCounter,
                                _startIndex: m._startIndex,
                                oriCatTmp: m.oriCatTmp,
                                x: {
                                    catCount: A,
                                    _labelY: p,
                                    _labelX: k,
                                    _yShipment: l,
                                    _isStagger: s,
                                    _rotation: r,
                                    _textAlign: v,
                                    _adjustedPx: t,
                                    _staggerLines: H,
                                    _labelHeight: q
                                },
                                0: {
                                    min: h(X, m[0] && m[0].min),
                                    max: h(ea, m[0] && m[0].max)
                                },
                                1: {
                                    min: h(ca, m[1] && m[1].min),
                                    max: h(wa, m[1] && m[1].max)
                                }
                            }
                        }
                    }, !0);
                    if (!e) {
                        C._forceReflow && (C._forceReflow = !1, g = c.yAxis[0], p = g.plotBands.concat(g.plotLines), Ua(g, p), x.yAxis[0].realtimeUpdateY(g.min, g.max), m.isDual && (g = c.yAxis[1], p = g.plotBands.concat(g.plotLines), Ua(g, p), x.yAxis[1].realtimeUpdateY(g.min, g.max)), this.containerElement.resizeTo());
                        x.xAxis[0].realtimeUpdateX(n);
                        f = 0;
                        for (w = U.length; f < w; f += 1) x.plots[f] && x.plots[f].realtimeUpdate && x.plots[f].realtimeUpdate(n, C._forceReflow);
                        this.realtimeDrawingLatency = new Date - Y
                    }
                }
            },
            extractTrendLines: function(a) {
                var e = a.plotLines;
                a = a.plotBands;
                for (var c, d = e.length, b = [], f = []; d;) c = d - 1, c = e[c], c.isTrend && f.push(c), --d;
                for (d = a.length; d;) c = d - 1, e = a[c], e.isTrend && b.push(e), --d;
                return {
                    trendLines: f,
                    trendBands: b
                }
            }
        };
        xa(Va.eiMethods, {
            clearChart: function(a) {
                a = a && a.toString && a.toString();
                this.feedData("clear=1");
                y.raiseEvent("ChartCleared", {
                    source: a
                }, this, [this.id, a])
            },
            getDataJSON: function() {
                return this.jsVars._rtLastUpdatedData || {
                    values: []
                }
            },
            getData: function() {
                var a = this.jsVars.hcObj.options,
                    e = a[K].oriCatTmp,
                    c, d = [],
                    b, f, m, g;
                if (!a || !a.series) return d;
                a = a.series;
                b = [];
                for (m = a.length; m--;)
                    for (c = a[m], b[c.index] = c.name, f = c.data, g = e.length; g--;) c = d[g] || (d[g] = [e[g]]), c[m + 1] = f[g].y;
                b.unshift(null);
                d.unshift(b);
                return d
            }
        });
        w("realtimearea", xa({
            friendlyName: "Realtime Data Streaming Area Chart",
            standaloneInit: !0,
            multisetRealtime: !0,
            defaultPlotShadow: 1,
            creditLabel: !1,
            rendererId: "realtimecartesian"
        }, Va), w.msareabase);
        w("realtimecolumn", xa({
            friendlyName: "Realtime Data Streaming Column Chart",
            standaloneInit: !0,
            multisetRealtime: !0,
            creditLabel: !1,
            rendererId: "realtimecartesian"
        }, Va), w.mscolumn2dbase);
        w("realtimeline", xa({
            friendlyName: "Realtime Data Streaming Line Chart",
            standaloneInit: !0,
            multisetRealtime: !0,
            creditLabel: !1,
            rendererId: "realtimecartesian"
        }, Va), w.mslinebase);
        w("realtimelinedy", xa({
            friendlyName: "Realtime Data Streaming Dual Y-Axis Line Chart",
            standaloneInit: !0,
            multisetRealtime: !0,
            isDual: !0,
            creditLabel: !1,
            series: w.mscombibase,
            rendererId: "realtimecartesian"
        }, Va), w.mslinebase);
        w("realtimestackedarea", {
            friendlyName: "Realtime Data Streaming Stacked Area Chart",
            isStacked: !0,
            showSum: 0,
            areaAlpha: 100,
            creditLabel: !1
        }, w.realtimearea);
        w("realtimestackedcolumn", {
            friendlyName: "Realtime Data Streaming Column Chart",
            isStacked: !0,
            creditLabel: !1
        }, w.realtimecolumn);
        Hb = function(a, e) {
            return a.minvalue - e.minvalue
        };
        Za.prototype = {
            getColorObj: function(a) {
                for (var e =
                        this.colorArr, c = 0, d = e.length, b, f, m = {}; c < d; c += 1) {
                    m.index = c;
                    b = e[c];
                    f = e[c + 1];
                    if (a < b.minvalue) return m.nextObj = b, m;
                    if (a >= b.minvalue && a <= b.maxvalue) return m.colorObj = b, f && a == f.minvalue && (m.nextObj = f, m.isOnMeetPoint = !0), m;
                    m.prevObj = b
                }
                m.index = c - 1;
                return m
            },
            getColorRangeArr: function(a, e) {
                var c, d = this.colorArr,
                    b, f, m = [],
                    g, n;
                if (!this.defaultAsigned && (a > e && (c = a, a = e, e = c), a < e && (b = this.getColorObj(a), f = this.getColorObj(e), b && f))) {
                    c = a;
                    b = b.index;
                    for (f = f.index; b <= f; b += 1) g = T({}, d[b]), g.minvalue !== c && (g.minvalue = c),
                        m.push(g), n = g, c = g.maxvalue;
                    n.maxvalue = e
                }
                return m
            }
        };
        Za.prototype.constructor = Za;
        Ib = function() {
            var a = {
                    fluidHRatio: !0,
                    fluidColor: !0,
                    fluidAlpha: !0,
                    fluidFill: !0
                },
                e = [],
                c = 0,
                d = function(a) {
                    c = Boolean(a) ? a.duration : 0
                },
                b = function(b, d) {
                    var f, p, k = this,
                        l, s, r = !1,
                        v = !1,
                        t = this._3dAttr;
                    Ea(b) && $(d) && (f = b, b = {}, b[f] = d);
                    if (Ea(b)) k = a[b] ? k._3dAttr[b] : k._attr(b);
                    else
                        for (f in b) p = b[f], a[f] ? ("fluidFill" === f ? (p && p.linearGradient && p.stops && p.stops[0] && (p = p.stops[0][1]), rb.test(p) ? (s = new nb(p), l = s.get("hex"), s = 100 * s.get("a")) :
                                p && p.FCcolor ? (l = p.FCcolor.color.split(u)[0], s = p.FCcolor.alpha.split(u)[0]) : ob.test(p) && (l = p.replace(fb, hb)), t.fluidColor = q(l, t.fluidColor, "000000"), t.fluidAlpha = h(s, t.fluidAlpha, 100), r = !0) : "fluidColor" === f ? (t.fluidColor = q(p, t.fluidColor, "000000"), r = !0) : "fluidAlpha" === f ? (t.fluidAlpha = h(p, t.fluidAlpha, 100), r = !0) : 0 <= p && 1 >= p && (t.fluidHRatio = p, v = !0), r && (p = V(t.fluidColor, t.is2D ? 80 : 70), k.fluid.attr({
                                    fill: F(p, t.fluidAlpha)
                                }), k.fluidTop.attr({
                                    fill: F(p, t.fluidAlpha)
                                }), k.topLight.attr({
                                    stroke: F(p, .4 * t.fluidAlpha)
                                }),
                                k.topLightBorder.attr({
                                    fill: S({
                                        FCcolor: {
                                            color: p + u + p,
                                            alpha: "40,0",
                                            ratio: "0,80",
                                            radialGradient: !0,
                                            cx: .5,
                                            cy: 1,
                                            r: "70%"
                                        }
                                    })
                                })), v && (p = t.scaleY + t.h * (1 - t.fluidHRatio), c ? (k.fluid.animate({
                                path: t.fluidPath.concat(["L", t.lx2, p, t.lx1, p, "Z"])
                            }, c, "easeIn"), k.fluidTop.animate({
                                path: e.concat(["M", t.lx1, p, "A", t.lCylWidthHalf, 1, 0, 1, 0, t.lx2, p, "Z"])
                            }, c, "easeIn")) : (k.fluid.attr({
                                path: t.fluidPath.concat(["L", t.lx2, p, t.lx1, p, "Z"])
                            }), k.fluidTop.attr({
                                path: e.concat(["M", t.lx1, p, "A", t.lCylWidthHalf, 1, 0, 1, 0, t.lx2, p, "Z"])
                            })))) :
                            this._attr(f, p);
                    return k
                },
                f = function(a, b, c) {
                    this.border.shadow(a, b, c)
                };
            return function(a, c, n, p, k, l, s, r, v, t, H, G, z) {
                var Q, A, x, C, J, B, w, ba, I, M, E, y, D, L, N, U;
                lb(a) && (c = a.y, n = a.r, p = a.h, l = a.renderer, s = a.fluidHRatio, r = a.conColor, v = a.conBorderColor, t = a.conBorderThickness, H = a.fluidColor, G = a.fluidAlpha, z = a.is2D, a = a.x);
                0 <= s && 1 >= s || (s = 0);
                r = q(r, "FFFFFF");
                v = q(v, "#000000");
                t = h(t, 1);
                H = q(H, "000000");
                G = h(G, 100);
                U = {
                    x: a,
                    y: c,
                    r: n,
                    h: p,
                    renderer: l,
                    fluidHRatio: s,
                    conColor: r,
                    conBorderColor: v,
                    conBorderThickness: t,
                    fluidStroke: 3,
                    fluidColor: H,
                    is2D: z,
                    fluidAlpha: G
                };
                k._attr = k.attr;
                k.attr = b;
                k._setAnimate = d;
                k.shadow = f;
                k._3dAttr = U;
                Q = V(r, 80);
                H = V(H, z ? 80 : 70);
                r = W(r, 80);
                A = .643 * n;
                x = .33 * A;
                C = A - x;
                J = a - A;
                B = a + A;
                w = a - C;
                C = a + C;
                ba = c + A;
                I = ba + p;
                M = I + .766 * n;
                E = c + x;
                p = ba + p * (1 - s);
                s = .9 * A;
                y = n + s - A;
                D = a - s;
                L = a + s;
                M -= Math.abs(Math.sqrt(y * y - s * s));
                N = parseInt(a - .6 * A, 10);
                A = a + A / 2;
                U.fluidPath = ["M", D, M, "A", y, y, 0, 1, 0, L, M];
                U.scaleY = ba;
                U.lx1 = D;
                U.lx2 = L;
                U.lCylWidthHalf = s;
                k.topLight = l.path(["M", D, ba, "L", L, ba], k).attr({
                    "stroke-width": 1,
                    stroke: F(H, 40)
                });
                k.topLightBorder = l.path(["M",
                    D, ba, "L", L, ba, L, E, D, E, "Z"
                ], k).attr({
                    "stroke-width": 0,
                    fill: S({
                        FCcolor: {
                            color: H + u + H,
                            alpha: z ? "0,0" : "40,0",
                            ratio: "0,80",
                            radialGradient: !0,
                            cx: .5,
                            cy: 1,
                            r: "70%"
                        }
                    })
                });
                k.fluid = l.path(U.fluidPath.concat(["L", L, p, D, p, "Z"]), k).attr({
                    "stroke-width": 0,
                    fill: F(H, G)
                });
                k.fluidTop = l.path(e.concat(["M", D, p, "A", s, 1, 0, 1, 0, L, p, "Z"]), k).attr({
                    "stroke-width": 0,
                    fill: F(H, G)
                });
                k.border = l.path(e.concat(["M", w, c, "A", x, x, 0, 0, 0, J, E], ["L", J, I], ["A", n, n, 0, 1, 0, B, I], ["L", B, E], ["A", x, x, 0, 0, 0, C, c, "Z"]), k).attr({
                    "stroke-width": t,
                    stroke: v
                });
                z || (k.bulbBorderLight = l.path(e.concat(["M", J, I, "A", n, n, 0, 0, 1, B, I], ["M", B, I, "A", n, n, 0, 0, 0, J, I], ["M", J, I, "A", n, n, 0, 1, 0, B, I, "Z"]), k).attr({
                        "stroke-width": 0,
                        stroke: "#00FF00",
                        fill: S({
                            FCcolor: {
                                cx: .5,
                                cy: .5,
                                r: "50%",
                                color: Q + u + r,
                                alpha: "0,50",
                                ratio: "78,30",
                                radialGradient: !0
                            }
                        })
                    }), k.bulbTopLight = l.path(e.concat(["M", J, I, "A", n, n, 0, 0, 1, B, I], ["A", n, n, 0, 0, 0, J, I], ["A", n, n, 0, 1, 0, B, I, "Z"]), k).attr({
                        "stroke-width": 0,
                        fill: S({
                            FCcolor: {
                                cx: .3,
                                cy: .1,
                                r: "100%",
                                color: r + u + Q,
                                alpha: "60,0",
                                ratio: "0,30",
                                radialGradient: !0
                            }
                        })
                    }), k.bulbCenterLight =
                    l.path(e.concat(["M", J, I, "A", n, n, 0, 1, 0, B, I], ["A", n, n, 0, 0, 0, J, I], ["A", n, n, 0, 0, 1, B, I, "Z"]), k).attr({
                        "stroke-width": 0,
                        fill: S({
                            FCcolor: {
                                cx: .25,
                                cy: .7,
                                r: "100%",
                                color: r + u + Q,
                                alpha: "80,0",
                                ratio: "0,70",
                                radialGradient: !0
                            }
                        })
                    }), k.cylLeftLight = l.path(e.concat(["M", a, c, "L", w, c], ["A", x, x, 0, 0, 0, J, E], ["L", J, I, a, I, "Z"]), k).attr({
                        "stroke-width": 0,
                        fill: S({
                            FCcolor: {
                                color: r + u + Q,
                                alpha: "50,0",
                                ratio: "0,80",
                                angle: 0
                            }
                        })
                    }), k.cylRightLight = l.path(e.concat(["M", J, c, "L", C, c], ["A", x, x, 0, 0, 1, B, E], ["L", B, I, J, I, "Z"]), k).attr({
                        "stroke-width": 0,
                        fill: S({
                            FCcolor: {
                                color: r + u + Q + u + Q,
                                alpha: "50,0,0",
                                ratio: "0,40,60",
                                angle: 180
                            }
                        })
                    }), k.cylLeftLight1 = l.path(["M", N, E, "L", J, E, J, I, N, I, "Z"], k).attr({
                        "stroke-width": 0,
                        fill: S({
                            FCcolor: {
                                color: r + u + Q,
                                alpha: "60,0",
                                ratio: "0,100",
                                angle: 180
                            }
                        })
                    }), k.cylRightLight1 = l.path(["M", N - .01, E, "L", A, E, A, I, N - .01, I, "Z"], k).attr({
                        "stroke-width": 0,
                        fill: S({
                            FCcolor: {
                                color: r + u + Q,
                                alpha: "60,0",
                                ratio: "0,100",
                                angle: 0
                            }
                        })
                    }));
                return k
            }
        }();
        Jb = function() {
            var a = {
                    fluidHRatio: !0,
                    color: !0,
                    alpha: !0,
                    fill: !0
                },
                e = [],
                c = 0,
                d = function(a) {
                    c = Boolean(a) ? a.duration :
                        0
                },
                b = function(b, d) {
                    var f, p, k = this,
                        l, s, r = !1,
                        v = !1,
                        t = this._3dAttr,
                        H, G, z, Q, A, x, C, J;
                    Ea(b) && $(d) && (f = b, b = {}, b[f] = d);
                    if (Ea(b)) k = a[b] ? k._3dAttr[b] : k._attr(b);
                    else
                        for (f in b) p = b[f], a[f] ? ("fill" === f ? (p && p.linearGradient && p.stops && p.stops[0] && (p = p.stops[0][1]), rb.test(p) ? (s = new nb(p), l = s.get("hex"), s = 100 * s.get("a")) : p && p.FCcolor ? (l = p.FCcolor.color.split(u)[0], s = p.FCcolor.alpha.split(u)[0]) : ob.test(p) && (l = p.replace(fb, hb)), t.fluidColor = q(l, t.fluidColor, "000000"), t.fluidAlpha = h(s, t.fluidAlpha, 100), r = !0) : "color" ===
                            f ? (t.fluidColor = q(p, t.fluidColor, "000000"), r = !0) : "alpha" === f ? (t.fluidAlpha = h(p, t.fluidAlpha, 100), r = !0) : 0 <= p && 1 >= p && (t.fluidHRatio = p, v = !0), r && (p = V(t.fluidColor, 70), H = W(t.fluidColor, 70), z = V(t.conColor, 80), G = W(t.conColor, 80), s = t.fluidAlpha, Q = s + u + s, k.fluid.attr({
                                    "stroke-width": 0,
                                    fill: S({
                                        FCcolor: {
                                            cx: .5,
                                            cy: 0,
                                            r: "100%",
                                            color: H + u + p,
                                            alpha: Q,
                                            ratio: "0,100",
                                            radialGradient: !0
                                        }
                                    })
                                }), k.fluidTop.attr({
                                    "stroke-width": 3,
                                    stroke: F(H, s),
                                    fill: S({
                                        FCcolor: {
                                            cx: .5,
                                            cy: .7,
                                            r: "100%",
                                            color: H + u + p,
                                            alpha: Q,
                                            ratio: "0,100",
                                            radialGradient: !0
                                        }
                                    })
                                }),
                                k.btnBorderLight.attr({
                                    fill: S({
                                        FCcolor: {
                                            color: G + u + z + u + G + u + G + u + z + u + p + u + z + u + G,
                                            alpha: "50,50,50,50,50," + .7 * s + ",50,50",
                                            ratio: "0,15,0,12,0,15,43,15",
                                            angle: 0
                                        }
                                    })
                                })), v && (z = t.x, p = t.r, H = t.fluidStroke, G = H / 2, A = t.h * t.fluidHRatio, H = z - p, z += p, Q = H + G, x = z - G, C = t.y + t.h, A = C - A, J = p * t.r3dFactor, G = p - G, c ? (k.fluid.animate({
                                path: e.concat(["M", H, C], ["A", p, va(J, 1), 0, 0, 0, z, C], ["L", z, A], ["A", p, va(J, 1), 0, 0, 0, H, A, "Z"])
                            }, c, "easeIn"), k.fluidTop.animate({
                                    path: e.concat(["M", Q, A], ["A", G, J, 0, 0, 0, x, A], ["L", x, A], ["A", G, J, 0, 0, 0, Q, A, "Z"])
                                }, c,
                                "easeIn")) : (k.fluid.attr({
                                path: e.concat(["M", H, C], ["A", p, J, 0, 0, 0, z, C], ["L", z, A], ["A", p, J, 0, 0, 1, H, A, "Z"])
                            }), k.fluidTop.attr({
                                path: e.concat(["M", Q, A], ["A", G, J, 0, 0, 0, x, A], ["L", x, A], ["A", G, J, 0, 0, 0, Q, A, "Z"])
                            })))) : this._attr(f, p);
                    return k
                },
                f = function() {};
            return function(a, c, n, p, k, l, s, r, v, t, H, G, z) {
                var Q, A, x, C, J, B, w, ba, I, M, E, y, D, L, N, U, R, K;
                lb(a) && (c = a.y, n = a.r, p = a.h, k = a.r3dFactor, l = a.parentGroup, s = a.renderer, r = a.fluidHRatio, v = a.conColor, t = a.conAlpha, H = a.fluidColor, G = a.fluidAlpha, a = a.x);
                k = h(k, .15);
                Aa.vml && (k =
                    k || .001);
                0 <= r && 1 >= r || (r = 0);
                v = q(v, "FFFFFF");
                t = h(t, 30);
                H = q(H, "000000");
                G = h(G, 100);
                t = {
                    x: a,
                    y: c,
                    r: n,
                    h: p,
                    r3dFactor: k,
                    renderer: s,
                    fluidHRatio: r,
                    conColor: v,
                    conAlpha: t,
                    fluidStroke: 3,
                    fluidColor: H,
                    fluidAlpha: G
                };
                l = s.group("graphic", l);
                l._attr = l.attr;
                l.attr = b;
                l._setAnimate = d;
                l.shadow = f;
                l._3dAttr = t;
                k *= n;
                t = n - 1.5;
                Q = c + p;
                p = Q - p * r;
                r = a - n;
                A = a + n;
                x = r + 1.5;
                C = A - 1.5;
                J = r - 2;
                B = A + 2;
                w = n + 2;
                ba = k + 2;
                I = Q + 4;
                M = I + .001;
                E = V(v, 80);
                y = V(v, 90);
                v = W(v, 80);
                D = V(H, 70);
                H = W(H, 70);
                L = V(D, 90);
                N = .85 * n;
                U = a - N;
                a += N;
                R = Math.sqrt((1 - N * N / (n * n)) * k * k);
                N = c + R;
                R = Q + R;
                K = c - 1;
                l.btnBorder = s.path(e.concat(["M", J, I], ["A", w, ba, 0, 0, 0, B, I], ["L", B, M], ["A", w, ba, 0, 0, 0, J, M, "Z"]), l).attr({
                    "stroke-width": 4,
                    stroke: F(E, 80)
                });
                l.btnBorder1 = s.path(e.concat(["M", r, I], ["A", n, k, 0, 0, 0, A, I], ["L", A, M], ["A", n, k, 0, 0, 0, r, M, "Z"]), l).attr({
                    "stroke-width": 4,
                    stroke: F(E, 50)
                });
                l.btnBorderLight = s.path(e.concat(["M", r, Q], ["A", n, k, 0, 0, 0, A, Q], ["A", n, k, 0, 0, 0, r, Q, "Z"]), l).attr({
                    "stroke-width": 0,
                    fill: S({
                        FCcolor: {
                            color: v + u + E + u + v + u + v + u + E + u + D + u + E + u + v,
                            alpha: "50,50,50,50,50,70,50,50",
                            ratio: "0,15,0,12,0,15,43,15",
                            angle: 0
                        }
                    })
                });
                J = z ? v + u + E + u + v + u + E + u + y + u + y + u + E + u + v : v + u + E + u + E + u + E + u + E + u + E + u + E + u + v;
                l.back = s.path(e.concat(["M", r, Q], ["A", n, k, 0, 0, 0, A, Q], ["L", A, c], ["A", n, k, 0, 0, 0, r, c, "Z"]), l).attr({
                    "stroke-width": 1,
                    stroke: F(E, 50),
                    fill: S({
                        FCcolor: {
                            color: J,
                            alpha: "30,30,30,30,30,30,30,30",
                            ratio: "0,15,43,15,0,12,0,15",
                            angle: 0
                        }
                    })
                });
                J = z ? H + u + D : D + u + D;
                l.fluid = s.path(e.concat(["M", r, Q], ["A", n, va(k, 1), 0, 0, 0, A, Q], ["L", A, p], ["A", n, va(k, 1), 0, 0, 0, r, p, "Z"]), l).attr({
                    "stroke-width": 0,
                    fill: S({
                        FCcolor: {
                            cx: .5,
                            cy: 0,
                            r: "100%",
                            color: J,
                            alpha: G +
                                u + G,
                            ratio: "0,100",
                            radialGradient: !0
                        }
                    })
                });
                J = z ? H + u + D : D + u + D;
                l.fluidTop = s.path(e.concat(["M", x, p], ["A", t, k, 0, 0, 0, C, p], ["L", C, p], ["A", t, k, 0, 0, 0, x, p, "Z"]), l).attr({
                    "stroke-width": 2,
                    stroke: z ? F(H, G) : F(L),
                    fill: S({
                        FCcolor: {
                            cx: .5,
                            cy: .7,
                            r: "100%",
                            color: J,
                            alpha: G + u + G,
                            ratio: "0,100",
                            radialGradient: !0
                        }
                    })
                });
                J = z ? v + u + E + u + v + u + v + u + E + u + v + u + E + u + v : E + u + E + u + E + u + E + u + E + u + E + u + E + u + E;
                l.front = s.path(e.concat(["M", r, Q], ["A", n, k, 0, 0, 0, A, Q], ["L", A, c], ["A", n, k, 0, 0, 1, r, c, "Z"]), l).attr({
                    "stroke-width": 1,
                    stroke: F(E, 50),
                    fill: S({
                        FCcolor: {
                            color: J,
                            alpha: "30,30,30,30,30,30,30,30",
                            ratio: "0,15,0,12,0,15,43,15",
                            angle: 0
                        }
                    })
                });
                z && (l.frontLight = s.path(e.concat(["M", r, Q], ["A", n, k, 1, 0, 0, U, R], ["L", U, N], ["A", n, k, 0, 0, 1, r, c, "Z"]), l).attr({
                    "stroke-width": 0,
                    stroke: "#" + E,
                    fill: S({
                        FCcolor: {
                            color: J,
                            alpha: "40,0",
                            ratio: "0,100",
                            angle: 0
                        }
                    })
                }));
                z && (l.frontLight1 = s.path(e.concat(["M", a, R], ["A", n, k, 0, 0, 0, A, Q], ["L", A, c], ["A", n, k, 1, 0, 0, a, N, "Z"]), l).attr({
                    "stroke-width": 0,
                    stroke: "#" + E,
                    fill: S({
                        FCcolor: {
                            color: J,
                            alpha: "40,0",
                            ratio: "0,100",
                            angle: 180
                        }
                    })
                }));
                l.cylinterTop = s.path(e.concat(["M",
                    r, K
                ], ["A", n, k, 0, 0, 0, A, K], ["L", A, K], ["A", n, k, 0, 0, 0, r, K, "Z"]), l).attr({
                    "stroke-width": 2,
                    stroke: F(E, 40)
                });
                return l
            }
        }();
        Kb = function() {
            var a = {
                    value: !0
                },
                e = 0,
                c = function(a) {
                    e = Boolean(a) ? a.duration : 0
                },
                d = function(b, c) {
                    var d, n, p = this,
                        k = this._3dAttr,
                        l, h, r, v, t, H, q;
                    Ea(b) && $(c) && (d = b, b = {}, b[d] = c);
                    if (Ea(b)) p = a[b] ? p._3dAttr[b] : p._attr(b);
                    else
                        for (d in b)
                            if (n = b[d], a[d]) {
                                if (n >= k.minValue && n <= k.maxValue) {
                                    k[d] = n;
                                    l = (n - k.minValue) / k.perLEDValueLength;
                                    n = ka(l) * k.sizeGapSum - k.ledGap;
                                    if (k.LEDCase) {
                                        h = p.colorArr;
                                        v = h.length;
                                        for (r =
                                            0; r < v; r += 1) t = h[r], t.maxLEDNoFrac <= l ? q = k.LEDLowerFN : H ? q = k.LEDUpperFN : (q = void 0, H = t), q && (t[q](), "show" === q && t.attr(t.oriShapeArg));
                                        H || (H = t);
                                        H.show();
                                        H.attr(H.hoverShapeArg)
                                    }
                                    p.darkShade && (l = {}, k.isXChange ? (l.width = Math.ceil(k.w - n), k.isIncrement && (l.x = k.x + n)) : (l.height = Math.ceil(k.h - n), k.isIncrement && (l.y = k.y + n)), e ? p.darkShade.animate(l, e, "easeIn") : p.darkShade.attr(l))
                                }
                            } else this._attr(d, n); return p
                },
                b = function() {};
            return function(a, e, g, n, p, k, l, s, r, v, t, H, G, z, Q, A, x, C, J, B, u) {
                var ba = function(a) {
                        var b = 0,
                            c, d;
                        return function() {
                            b = 0;
                            for (c = a.colorArr.length; b < c; b += 1) d = a.colorArr[b], d.attr(d.data("rollover"))
                        }
                    },
                    I = function(a) {
                        var b = 0,
                            c, d;
                        return function() {
                            b = 0;
                            for (c = a.colorArr.length; b < c; b += 1) d = a.colorArr[b], d.attr(d.data("rollout"))
                        }
                    },
                    w, E, y, D, L, N, U, R, K, P, ja, Z, T, O, X, aa, ua, fa, na, ia, da, Y, ea, ca;
                lb(a) && (e = a.y, g = a.w, n = a.h, p = a.wGroup, k = a.renderer, l = a.value, s = a.gaugeFillColor, r = a.gaugeBorderColor, v = a.gaugeBorderAlpha, t = a.gaugeBorderThickness, H = a.colorRangeManager, G = a.minValue, z = a.maxValue, Q = a.useSameFillColor,
                    A = a.useSameFillBgColor, x = a.ledSize, C = a.ledGap, J = a.type, a = a.x);
                l >= G && l <= z || (l = G);
                s = q(s, "FFFFFF");
                r = q(r, "000000").replace(fb, hb);
                v = h(v, 1);
                t = h(t, 2);
                ca = {
                    x: a,
                    y: e,
                    w: g,
                    h: n,
                    wGroup: p,
                    renderer: k,
                    value: l,
                    gaugeFillColor: s,
                    gaugeBorderColor: r,
                    gaugeBorderAlpha: v,
                    gaugeBorderThickness: t,
                    colorRangeManager: H,
                    minValue: G,
                    maxValue: z,
                    ledGap: C,
                    ledSize: x,
                    type: J,
                    useSameFillColor: Q,
                    useSameFillBgColor: A
                };
                p = k.group("graphic", p);
                p._attr = p.attr;
                p.attr = d;
                p._setAnimate = c;
                p.shadow = b;
                p._3dAttr = ca;
                H = H.getColorRangeArr(G, z);
                w = a;
                E = e;
                D = y = !0;
                L = 2 === J || 4 === J ? n : g;
                N = C + x;
                U = C / 2;
                R = U / 2;
                K = L - x;
                P = z - G;
                z = 0;
                ja = H.length;
                O = T = 0;
                X = !1;
                ua = aa = "show";
                fa = a;
                na = e;
                ia = t / 2;
                da = a - ia;
                Y = e - ia;
                ea = a + g + ia;
                ia = e + n + ia;
                Q && (O += 1, aa = "hide");
                A && (O += 2, ua = "hide");
                0 > K ? (Q = 1, x = L) : (Q = parseInt(K / N, 10) + 1, x += K % N / Q, N = x + C);
                A = P / Q;
                p.colorArr = [];
                L = [];
                1 === J ? fa += N - C / 2 : 2 === J ? (D = !1, na += N - C / 2) : 3 === J ? (w = a + g, y = !1, fa += N - C / 2) : (E = e + n, D = y = !1, na += N - C / 2);
                ca.ledGap = C;
                ca.ledSize = x;
                ca.sizeGapSum = N;
                ca.perLEDValueLength = A;
                ca.isIncrement = y;
                ca.isXChange = D;
                ca.LEDLowerFN = aa;
                ca.LEDUpperFN = ua;
                (ca.LEDCase = O) &&
                (3 === O ? Z = {
                    x: a,
                    y: e,
                    width: g,
                    height: n
                } : X = !0);
                for (p.border = k.path(["M", da, Y, "L", ea, Y, ea, ia, da, ia, "Z"], p).attr({
                        stroke: F(r, v),
                        "stroke-width": t
                    }).shadow({
                        apply: B
                    }); z < ja; z += 1)
                    if ((r = H[z]) && $(r.maxvalue) && (v = ka((r.maxvalue - G) / A), x = v - T, T = v, 0 < x)) {
                        t = {
                            r: 0
                        };
                        X && (Z = {});
                        x *= N;
                        if (D)
                            if (t.y = E, t.width = x - C, t.height = n, y ? (t.x = w, w += x) : (t.x = w - t.width, w -= x), X && (Z.width = t.x - a, y && 1 === O || !y && 2 === O ? (Z.x = a, Z.width += t.width) : Z.width = g - Z.width), 0 === z || z === ja - 1) {
                                if (t.width += R, y && z === ja - 1 || !y && 0 === z) t.x -= R, t.width = Math.ceil(t.width)
                            } else t.width +=
                                U, t.x -= R;
                        else if (t.x = w, t.width = g, t.height = x - C, y ? (t.y = E, E += x) : (t.y = E - t.height, E -= x), X && (Z.height = t.y - e, y && 1 === O || !y && 2 === O ? (Z.y = e, Z.height += t.height) : Z.height = n - Z.height), 0 === z || z === ja - 1) {
                            if (t.height += R, y && z === ja - 1 || !y && 0 === z) t.y -= R, t.height = Math.ceil(t.height)
                        } else t.height += U, t.y -= R;
                        x = k.rect(t.x, t.y, t.width, t.height, p).attr({
                            "stroke-width": 0,
                            fill: S({
                                FCcolor: {
                                    color: q(r.code, "000000"),
                                    alpha: h(r.alpha, 100)
                                }
                            })
                        });
                        x.oriShapeArg = t;
                        x.hoverShapeArg = Z;
                        x.maxLEDNo = v;
                        x.maxLEDNoFrac = (r.maxvalue - G) / A;
                        u && (x.data("rollover", {
                            "stroke-width": 0,
                            fill: S({
                                FCcolor: {
                                    color: V(q(r.code, "000000"), 80) + "," + W(q(r.code, "000000"), 80),
                                    alpha: h(r.alpha, 100),
                                    angle: J % 2 ? 90 : 0
                                }
                            })
                        }), x.data("rollout", {
                            "stroke-width": 0,
                            fill: S({
                                FCcolor: {
                                    color: q(r.code, "000000"),
                                    alpha: h(r.alpha, 100)
                                }
                            })
                        }));
                        p.colorArr.push(x)
                    }
                p.darkShade = k.rect(a, e, g, n, 0, p).attr({
                    "stroke-width": 0,
                    fill: F(s, 50)
                });
                for (z = 1; z < Q; z += 1) D ? (L.push("M", fa, na, "L", fa, na + n), fa += N) : (L.push("M", fa, na, "L", fa + g, na), na += N);
                p.LEDGap = k.path(L, p).attr({
                    stroke: F(s, 100),
                    "stroke-width": C
                });
                p.tracker = k.rect(a,
                    e, g, n, 0, p).attr({
                    fill: ha
                });
                u && p.tracker.hover(ba(p), I(p));
                p.attr({
                    value: l
                });
                return p
            }
        }();
        w("renderer.drawingpad", {
            deleteme: function(a) {
                this.container.innerHTML = "called from drawingpad: " + a
            }
        }, w["renderer.root"]);
        w("renderer.widgetbase", {
            drawLegend: function() {},
            drawGraph: function() {
                var a = this.elements,
                    e = this.paper,
                    c = this.layers,
                    d = this.options,
                    b = c.dataset;
                d.nativeMessage || (c.dataset || (b = a.widgetGroup = c.dataset = e.group("dataset"), c.tracker = e.group("hot"), c.tracker.insertAfter(c.dataset)), c.datalabels ||
                    (c.datalabels = e.group("datalabels").insertAfter(b)), b.translate(this.canvasLeft, this.canvasTop), c.datalabels.translate(this.canvasLeft, this.canvasTop), d.tooltip && !1 !== d.tooltip.enabled && e.tooltip(d.tooltip.style, d.tooltip.shadow, d.tooltip.constrain), this.drawWidget(), this.drawScale(), this.drawValue())
            },
            drawWidgetValue: function() {},
            drawValue: function(a, e) {
                var c = this.options,
                    d = e || c.plotOptions.series.animation,
                    c = c.series && c.series[0] && c.series[0].data || [],
                    b;
                if (c.length) {
                    if (a && (b = a.length))
                        for (; b--;) c[b] &&
                            (c[b] = a[b]);
                    this.drawWidgetValue(c, d);
                    this.drawWidgetLabel(c, d)
                }
            },
            drawWidgetLabel: function(a) {
                var e = this.paper,
                    c = this.options,
                    d = c.chart,
                    b = this.elements,
                    f = this.layers;
                a = a[0];
                var f = f.datalabels || (f.datalabels = e.group("datalabels").insertAfter(f.dataset)),
                    m = this.canvasWidth,
                    g = this.canvasHeight,
                    n = d.valuePadding,
                    p = a.displayValue,
                    k = h(d.yScaleRadius, 0),
                    c = c.plotOptions.series.dataLabels.style,
                    l = {
                        fontFamily: c.fontFamily,
                        fontSize: c.fontSize,
                        lineHeight: c.lineHeight,
                        fontWeight: c.fontWeight,
                        fontStyle: c.fontStyle
                    },
                    g = g + n + k;
                null !== a.y && !isNaN(a.y) && $(p) && p !== L && (b.dataLabel ? b.dataLabel.attr({
                    text: p
                }) : b.dataLabel = e.text(f).attr({
                    "vertical-align": "top",
                    text: p,
                    x: m / 2,
                    y: g,
                    "text-anchor": sa[ya],
                    fill: c.color,
                    direction: d.textDirection,
                    title: a.originalText || "",
                    "text-bound": [c.backgroundColor, c.borderColor, c.borderThickness, c.borderPadding, c.borderRadius, c.borderDash]
                }).css(l), e = b.dataLabel.getBBox(), 0 > e.x + d.spacingLeft && (e = e.width - d.spacingLeft, d.origW < e && (e = d.origW - d.spacingLeft), b.dataLabel.attr({
                    x: e / 2
                })))
            },
            drawScale: function() {
                var a =
                    this.paper,
                    e = this.elements,
                    c = this.layers.dataset,
                    d = this.options,
                    b = this.canvasWidth,
                    f = this.canvasHeight,
                    m = d.scale,
                    g = m.minorTM,
                    d = d.chart.textDirection,
                    n = m.min,
                    p = m.max,
                    k = m.majorTM,
                    l = m.axisPosition,
                    h = m.minorTMHeight,
                    r = m.majorTMHeight,
                    v = m.connectorColor,
                    t = m.connectorThickness,
                    q = m.minorTMColor,
                    G = m.minorTMThickness,
                    z = m.majorTMColor,
                    Q = m.majorTMThickness,
                    A = m.tickMarkDistance,
                    x = m.tickValueDistance,
                    C = m.placeTicksInside,
                    J = m.placeValuesInside,
                    B = Math.max(r, h),
                    c = e.scaleGroup || (e.scaleGroup = a.group("scale", c)),
                    u =
                    La,
                    w = ya,
                    I = m.reverseScale,
                    y = n,
                    E = G / 2,
                    F = Q / 2,
                    n = p - n,
                    D = 0,
                    K = 0,
                    N = 0,
                    U = 0,
                    R = 0,
                    S = 0,
                    P = 0,
                    T = 0,
                    Z = 0,
                    O = 0,
                    W = 0,
                    V = 0,
                    aa = 0,
                    ua = 0,
                    fa = 0,
                    na = 0;
                C ? (A = -A, r = -r, h = -h, J ? (B = -B, x = -x) : B = -A) : J && (B = -A, x = -x);
                I && (n = -n, y = p);
                switch (l) {
                    case 1:
                        D = b / n;
                        U = -A;
                        S = U - F;
                        T = U - E;
                        O = U - r;
                        V = U - h;
                        ua = U - B - x;
                        u = La;
                        w = J ? Wa : mb;
                        break;
                    case 2:
                        K = f / n;
                        N = A;
                        R = N + F;
                        P = N + E;
                        Z = N + r;
                        W = N + h;
                        aa = N + B + x;
                        fa = b;
                        u = J ? bb : Ia;
                        w = ya;
                        break;
                    case 3:
                        D = b / n;
                        U = A;
                        S = U + F;
                        T = U + E;
                        O = U + r;
                        V = U + h;
                        ua = U + B + x;
                        na = f;
                        u = La;
                        w = J ? mb : Wa;
                        break;
                    case 4:
                        K = f / n, N = -A, R = N - F, P = N - E, Z = N - r, W = N - h, aa = N - B - x, u = J ? Ia : bb, w = ya
                }
                e.minorTM || (e.minorTM = []);
                e.majorTM || (e.majorTM = []);
                this.tmLabel || (e.tmLabel = []);
                if (h)
                    for (f = 0, p = g.length; f < p; f += 1) l = g[f] - y, b = l * D, l *= K, e.minorTM[f] = a.path(["M", b + P, l + T, "L", b + W, l + V], c).attr({
                        "shape-rendering": pb[1 > G],
                        stroke: q,
                        "stroke-linecap": "round",
                        "stroke-width": G
                    });
                f = 0;
                for (p = k.length; f < p; f += 1) g = k[f], l = g.value - y, q = g.displayValue, b = l * D, l *= K, h && (e.majorTM[f] = a.path(["M", b + R, l + S, "L", b + Z, l + O], c).attr({
                    "shape-rendering": pb[1 > Q],
                    stroke: z,
                    "stroke-linecap": "round",
                    "stroke-width": Q
                })), q !== L && (P = 0 === f || f === p - 1 ? m.limitValues.style :
                    m.tickValues.style, G = g.labelX || 0, e.tmLabel[f] = a.text(b + aa + G, l + ua, q, c).attr({
                        "text-anchor": sa[g.align || u],
                        direction: d,
                        "vertical-align": w,
                        title: g.originalText || ""
                    }).css(P));
                t && (e.tmConnector = a.path(["M", N, U, "L", n * D + N, n * K + U], c).attr({
                    "shape-rendering": pb[1 > t],
                    stroke: v,
                    "stroke-linecap": "round",
                    "stroke-width": t
                }));
                c.translate(fa, na);
                return c
            },
            realtimeUpdate: function(a) {
                if (a === this.lastUpdatedObj) return !1;
                var e = this.options,
                    c = e.series,
                    d = this.logic,
                    c = c && c[0] && c[0].data,
                    b = a.values || [],
                    f = a.labels || [],
                    m = a.toolTexts || [],
                    g = a.showLabels || [],
                    n = c && c.length || 0,
                    h = [],
                    k;
                if (n) {
                    for (; n--;) k = {}, void 0 !== b[n] && "" !== b[n] ? (k.value = b[n], k.hasNewData = !0) : k.value = c[n].y, f[n] && (k.displayvalue = f[n], k.hasNewData = !0), m[n] && (k.tooltext = m[n], k.hasNewData = !0), k.hasNewData && (h[n] = d.getPointStub(k, n, e, this.definition)), "0" != g[n] && c[n].displayValue || (h[n].displayValue = L);
                    h.length && (this.lastUpdatedObj = a) && this.drawValue(h);
                    return Boolean(h.length)
                }
            }
        }, w["renderer.root"]);
        w("renderer.bulb", {
            drawWidget: function() {
                var a = this.options,
                    e = a.chart,
                    c = this.paper,
                    d = this.elements,
                    b = e.gaugeRadius,
                    a = a.series[0] && a.series[0].data && a.series[0].data[0] || {},
                    f = a.rolloverProperties || {},
                    m = {
                        cx: e.gaugeOriginX,
                        cy: e.gaugeOriginY,
                        stroke: a.borderColor,
                        "stroke-linecap": "round",
                        "stroke-width": a.borderWidth,
                        r: e.animation ? .001 : b
                    },
                    g = {
                        r: b
                    },
                    n;
                null === a.y || isNaN(a.y) || (n = d.bulb = (n = d.bulb) ? n.attr(m) : c.circle(m, this.layers.dataset), e.animation && n.animate(g, e.animation.duration, "easeIn"), f.enabled && n.mouseover(function() {
                    n.attr(f.hoverAttr);
                    f.hoverAnimAttr && n.animate(f.hoverAnimAttr,
                        100, "easeIn")
                }).data("hoverAttr", f.hoverAttr).mouseout(function() {
                    n.attr(f.outAttr);
                    f.hoverAnimAttr ? n.animate(g, 100, "easeIn") : n.attr(g)
                }).data("outAttr", f.outAttr))
            },
            drawWidgetValue: function(a) {
                var e = this,
                    c = e.elements;
                a = a[0];
                var d = a.rolloverProperties || {},
                    b = d.hoverAttr,
                    f = d.outAttr,
                    m = {
                        fill: S(a.color),
                        ishot: !0
                    },
                    c = c.bulb,
                    g = c.data("hoverAttr"),
                    n = c.data("outAttr");
                d.enabled && (b && b.stroke && (g.stroke = b.stroke, n.stroke = f.stroke), b && b.fill && (g.fill = b.fill, n.fill = f.fill));
                c || e.drawWidget();
                d = {
                    value: a.y,
                    displayValue: a.displayValue,
                    toolText: a.toolText
                };
                null === a.y || isNaN(a.y) || c.attr(m).click(function(a) {
                    qa.call(this, e, a)
                }).hover(function(a) {
                    qa.call(this, e, a, "DataPlotRollOver")
                }, function(a) {
                    qa.call(this, e, a, "DataPlotRollOut")
                }).tooltip(a.toolText).data("eventArgs", d)
            },
            drawScale: function() {},
            drawWidgetLabel: function(a) {
                var e = this.options.chart,
                    c = this.paper,
                    d = this.elements,
                    b = this.layers,
                    f = e.gaugeRadius,
                    m = e.gaugeOriginX,
                    g = e.gaugeOriginY;
                a = a[0];
                var n = d.dataLabel,
                    h = e.dataLabels.style,
                    k = {
                        fontFamily: h.fontFamily,
                        fontSize: h.fontSize,
                        lineHeight: h.lineHeight,
                        fontWeight: h.fontWeight,
                        fontStyle: h.fontStyle
                    };
                b.datalabels || (b.datalabels = c.group("datalabels").insertAfter(b.dataset));
                e.placeValuesInside ? (b = g, f = ya) : (b = g + f + e.valuePadding, f = Wa);
                null === a.y || isNaN(a.y) || a.displayValue === L || (n || (d.dataLabel = n = c.text(this.layers.dataset)), n.attr({
                    text: a.displayValue,
                    "text-anchor": "middle",
                    x: m,
                    y: b,
                    title: a.originalText || "",
                    "vertical-align": f,
                    fill: h.color,
                    direction: e.textDirection,
                    "text-bound": [h.backgroundColor, h.borderColor, h.borderThickness,
                        h.borderPadding, h.borderRadius, h.borderDash
                    ]
                }).css(k))
            }
        }, w["renderer.widgetbase"]);
        w("renderer.thermometer", {
            drawWidget: function() {
                var a = this.options,
                    e = a.chart,
                    c = this.paper,
                    d = a.series[0].data[0],
                    b = e.plotHoverEffects || {},
                    f = e.thmBulbRadius,
                    m = .643 * f,
                    g = new nb(d.color),
                    n = g.get("hex").replace(fb, L),
                    g = 100 * g.get("a"),
                    h;
                d.minValue = a.scale.min;
                d.maxValue = a.scale.max;
                h = this.elements.thermometer = Ib(0 + m, 0 - m, f, e.thmHeight, this.layers.dataset, c, 0, e.thmGlassColor, e.gaugeBorderColor, e.gaugeBorderThickness, n, g, e.use3DLighting);
                b.enabled && h.data("hoverInAttrs", {
                    fluidColor: b.thmFillHoverColor,
                    fluidAlpha: b.thmFillHoverAlpha
                }).data("hoverOutAttrs", {
                    fluidColor: n,
                    fluidAlpha: g
                }).hover(function() {
                    h.attr(h.data("hoverInAttrs"))
                }, function() {
                    h.attr(h.data("hoverOutAttrs"))
                })
            },
            drawWidgetValue: function(a, e) {
                var c = this,
                    d = c.elements,
                    b = c.options.scale,
                    f = b.max,
                    m = b.min,
                    b = a[0],
                    f = (h(b.y, m) - m) / (f - m),
                    g;
                d.thermometer || c.drawWidget();
                b.fluidHRatio = f;
                m = {
                    value: b.y,
                    displayValue: b.displayValue,
                    toolText: b.toolText
                };
                e && d.thermometer._setAnimate(e);
                d.thermometer.attr({
                    fluidHRatio: f,
                    ishot: !0
                }).click(function(a) {
                    qa.call(this, c, a)
                }).hover(function(a) {
                    qa.call(this, c, a, "DataPlotRollOver")
                }, function(a) {
                    qa.call(this, c, a, "DataPlotRollOut")
                }).data("eventArgs", m);
                if (b.toolText && (g = d.thermometer.bottom)) {
                    do g.tooltip(b.toolText); while (g = g.next)
                }
            }
        }, w["renderer.widgetbase"]);
        w("renderer.cylinder", {
            drawWidget: function() {
                var a = this.options,
                    e = a.chart,
                    c = e.plotHoverEffects || {},
                    d = this.paper,
                    b = this.elements,
                    f = this.layers.dataset,
                    m = a.scale,
                    g = m.max,
                    a = a.series[0].data[0],
                    h, p;
                a.minValue = m.min;
                a.maxValue = g;
                b.cylinder = Jb(e.cylRadius, 0, e.cylRadius, e.cylHeight, e.cylYScale, f, d, 0, e.cylGlassColor, "100", e.cylFillColor, e.cylFillAlpha, e.cyl3DLighting);
                c.enabled && (h = {
                    color: c.cylFillHoverColor,
                    alpha: c.cylFillHoverAlpha
                }, p = {
                    color: e.cylFillColor,
                    alpha: e.cylFillAlpha
                }, b.cylinder.hover(function() {
                    b.cylinder.attr(h)
                }, function() {
                    b.cylinder.attr(p)
                }))
            },
            drawWidgetValue: function(a, e) {
                var c = this,
                    d = c.elements,
                    b = c.options.scale,
                    f = b.max,
                    m = b.min,
                    b = a[0],
                    f = (h(b.y, m) - m) / (f - m),
                    g;
                d.cylinder || c.drawWidget();
                m = {
                    value: b.y,
                    displayValue: b.displayValue,
                    toolText: b.toolText
                };
                b.fluidHRatio = f;
                e && d.cylinder._setAnimate(e);
                d.cylinder.attr({
                    fluidHRatio: f,
                    ishot: !0
                }).click(function(a) {
                    qa.call(this, c, a)
                }).hover(function(a) {
                    qa.call(this, c, a, "DataPlotRollOver")
                }, function(a) {
                    qa.call(this, c, a, "DataPlotRollOut")
                }).data("eventArgs", m);
                if (b.toolText && (g = d.cylinder.bottom)) {
                    do g.tooltip(b.toolText); while (g = g.next)
                }
            }
        }, w["renderer.widgetbase"]);
        w("renderer.led", {
            drawWidget: function() {
                var a = this.options,
                    e = this.paper,
                    c = this.logic,
                    d = a.chart,
                    b = this.elements,
                    f = a.scale,
                    m = f.max,
                    g = f.min,
                    a = a.series[0].data[0],
                    h = this.layers.dataset;
                a.minValue = g;
                a.maxValue = m;
                b.led = Kb(0, 0, this.canvasWidth, this.canvasHeight, h, e, 0, d.gaugeFillColor, d.gaugeBorderColor, d.gaugeBorderAlpha, d.gaugeBorderThickness, c.colorRangeGetter, g, m, d.useSameFillColor, d.useSameFillBgColor, d.ledSize, d.ledGap, c.isHorizontal ? f.reverseScale ? 3 : 1 : f.reverseScale ? 4 : 2, d.showShadow, d.plotHoverEffect)
            },
            drawWidgetValue: function(a, e) {
                var c = this.elements,
                    d = a[0].y;
                c.led || this.drawWidget();
                e && c.led._setAnimate(e);
                c.led.attr({
                    value: d
                })
            }
        }, w["renderer.widgetbase"]);
        w("renderer.bullet", {
            drawWidget: function() {
                var a = this.options,
                    e = this.paper,
                    c = this.logic,
                    d = a.chart,
                    b = a.scale,
                    a = this.elements,
                    f = this.layers.dataset,
                    m = this.canvasWidth,
                    g = this.canvasHeight,
                    n = b.min,
                    p = b.max,
                    k = b && b.trendPoint || [],
                    l = d.colorRangeFillMix,
                    s = d.colorRangeFillRatio,
                    r = d.colorRangeBorderColor,
                    v = d.colorRangeBorderAlpha,
                    t = d.colorRangeBorderThickness,
                    q = c.colorRangeGetter.getColorRangeArr(n, p),
                    d = d.showShadow,
                    G, z, Q, A, x, C = c.colorManager,
                    J, B, w;
                a.linear || (a.linear = G = e.group("colorrange", f), a.outerRect = e.rect(G));
                a.outerRect.attr({
                    x: 0,
                    y: 0,
                    width: m,
                    height: g,
                    stroke: "none",
                    r: 0
                });
                c = c.isHorizontal ? b.reverseScale ? 3 : 1 : b.reverseScale ? 4 : 2;
                1 === c ? (f = function(a, b) {
                    return {
                        x: a * m / (p - n),
                        y: 0,
                        width: (b - a) * m / (p - n),
                        height: g
                    }
                }, z = 270) : 2 === c ? (f = function(a, b) {
                    return {
                        x: 0,
                        y: a * g / (p - n),
                        width: m,
                        height: (b - a) * g / (p - n)
                    }
                }, z = 180) : 3 === c ? (f = function(a, b) {
                    return {
                        x: m - b * m / (p - n),
                        y: 0,
                        width: (b - a) * m / (p - n),
                        height: g
                    }
                }, z = 270) : (f = function(a, b) {
                    return {
                        x: 0,
                        y: g - b * g / (p - n),
                        width: m,
                        height: (b -
                            a) * g / (p - n)
                    }
                }, z = 180);
                a.colorRangeElems || (a.colorRangeElems = []);
                c = 0;
                for (b = q.length; c < b; c += 1) A = q[c], x = f(A.minvalue - n, A.maxvalue - n), A.x = x.x, A.y = x.y, A.width = x.width, A.height = x.height, Q = A.code, Q = F(ta(Q, r), v), d && Math.max(A.alpha, v), J = C.parseColorMix(A.code, l), B = C.parseAlphaList(A.alpha, J.length), w = h(A.borderAlpha, v), A = B.split(u), A = va.apply(Math, A), A = va(t && w || 0, A), a.colorRangeElems[c] || (a.colorRangeElems[c] = e.rect(G)), a.colorRangeElems[c].attr({
                    x: x.x,
                    y: x.y,
                    width: x.width,
                    height: x.height,
                    r: 0,
                    "stroke-width": t,
                    stroke: Q,
                    fill: S({
                        FCcolor: {
                            color: J.toString(),
                            ratio: s,
                            alpha: B,
                            angle: z
                        }
                    })
                }).shadow({
                    apply: d,
                    opacity: A / 100
                });
                for (; a.colorRangeElems[c];) a.colorRangeElems[c].remove(), a.colorRangeElems.splice(c, 1);
                a.trendObjElems || (a.trendObjElems = []);
                c = 0;
                for (b = k.length; c < b; c += 1) l = k[c], x = f(l.startValue - n, l.endValue - n), l.isZone ? (a.trendObjElems[c] || (a.trendObjElems[c] = e.rect(G)), a.trendObjElems[c].attr({
                        x: x.x,
                        y: x.y,
                        width: 0 < x.width ? x.width : 0,
                        height: 0 < x.height ? x.height : 0,
                        r: 0,
                        fill: S({
                            FCcolor: {
                                color: l.color,
                                alpha: l.alpha
                            }
                        })
                    })) :
                    a.trendObjElems[c] = this.path(["M", x.x, x.y, "L", x.x, x.y + x.height], G).attr({
                        stroke: F(l.color, l.alpha),
                        "stroke-width": l.thickness,
                        "stroke-dasharray": l.dashStyle
                    });
                for (; a.trendObjElems[c];) a.trendObjElems[c].remove(), a.trendObjElems.splice(c, 1)
            },
            drawWidgetValue: function(a) {
                var e = this,
                    c = e.paper,
                    d = e.layers.dataset,
                    b = e.canvasWidth,
                    f = e.canvasHeight,
                    m = e.options.scale,
                    g = m.max,
                    n = m.min,
                    p = g - n,
                    k = a[0],
                    l = a[1],
                    s = m && m.trendPoint || [],
                    r, v, t = l.borderWidth,
                    q = e.logic.isHorizontal,
                    G;
                v = a.length;
                var z = 0,
                    Q = 0,
                    A = 0,
                    x = 0,
                    C = n,
                    J, B,
                    u, w, I, y;
                q ? (z = b / p, x = f / 2) : (Q = f / p, A = b / 2);
                m.reverseScale && (z = -z, Q = -Q, C = g);
                for (; v--;) G = a[v], m = h(G.y, C) - C, G.plotX = G.origX = m * z + A, G.plotY = G.origY = m * Q + x;
                for (v = s.length; v--;) G = s[v], m = G.startValue - n, G.plotX = G.origX = m * z + A, G.plotY = G.origY = m * Q + x;
                m = function(a) {
                    a = h(a, C) - C;
                    return {
                        x: a * z + A,
                        y: a * Q + x
                    }
                }(Math.min(Math.max(n, 0), g));
                $(k.y) && (k.plotAsDot ? (s = v = k.plotFillPercent / 100 * (q ? f : b), a = k.plotX - v / 2, g = k.plotY - s / 2, q ? (k.animInitAttr = {
                    x: m.x
                }, k.animAttr = {
                    x: a
                }) : (k.animInitAttr = {
                    y: m.y
                }, k.animAttr = {
                    y: g
                })) : (a = Math.min(k.plotX, m.x),
                    g = Math.min(k.plotY, m.y), s = Math.abs(k.plotY - m.y), v = Math.abs(k.plotX - m.x), q ? (k.animInitAttr = {
                        x: m.x,
                        width: 0
                    }, k.animAttr = {
                        x: a,
                        width: v
                    }, s = k.plotFillPercent / 100 * f, g -= s / 2) : (k.animInitAttr = {
                        y: m.y,
                        height: 0
                    }, k.animAttr = {
                        y: g,
                        height: s
                    }, v = k.plotFillPercent / 100 * b, a -= v / 2)), n = {
                    link: G.link,
                    value: k.y,
                    displayValue: k.displayValue,
                    toolText: G.toolText
                }, G.shapeType = "rect", G.shapeArgs = {
                    x: a,
                    y: g,
                    height: s,
                    width: v,
                    endY: r,
                    r: 0
                }, u = k.rolloverProperties || {}, u.enabled && void 0 !== u.plotFillHoverPercent && (u.showHoverAnimation ? (J = {},
                    B = {}) : (J = u.hoverAttr, B = u.outAttr), k.plotAsDot ? (J.width = J.height = u.plotFillHoverPercent / 100 * (q ? f : b), J.x = k.plotX - J.width / 2, J.y = k.plotY - J.width / 2, B.width = B.height = v, B.x = a, B.y = g) : q ? (J.height = u.plotFillHoverPercent / 100 * f, J.y = Math.min(k.plotY, m.y) - J.height / 2, B.height = s, B.y = g) : (J.width = u.plotFillHoverPercent / 100 * b, J.x = Math.min(k.plotX, m.x) - J.width / 2, B.width = v, B.x = a)), G.graphic = c.rect(a, g, v, s, 0, d).attr({
                    fill: G.color,
                    stroke: G.borderColor,
                    ishot: !0,
                    "stroke-width": G.borderWidth
                }).click(function(a) {
                    qa.call(this,
                        e, a)
                }).hover(function(a) {
                    qa.call(this, e, a, "DataPlotRollOver");
                    u.enabled && (this.attr(u.hoverAttr), u.showHoverAnimation && this.animate(J, 100, "easeOut"))
                }, function(a) {
                    qa.call(this, e, a, "DataPlotRollOut");
                    u.enabled && (this.attr(u.outAttr), u.showHoverAnimation && this.animate(B, 100, "easeOut"))
                }).tooltip(G.toolText).data("eventArgs", n));
                $(l.y) && (q ? (v = f * l.targetFillPercent / 100, s = v / 2, k = a = l.plotX, n = g = l.plotY - s, r = l.plotY + s, s = v, v = t, G = a - t / 2, m = [a + t, l.plotY]) : (v = b * l.targetFillPercent / 100, s = v / 2, G = a = l.plotX - s, g = r = l.plotY,
                    k = l.plotX + s, s = t, n = g - t / 2, m = [l.plotX, g + t + 10]), l.shapeType = "rect", l.tooltipPos = m, l.trackerArgs = {
                    x: G,
                    y: n,
                    height: s,
                    width: v,
                    r: 0
                }, l.shapeArgs = ["M", a, g, "L", k, r], l.animInitAttr = {
                    d: ["M", l.plotX, l.plotY, "L", l.plotX, l.plotY]
                }, l.animAttr = {
                    d: l.shapeArgs
                }, n = {
                    link: l.link,
                    value: l.y,
                    displayValue: l.displayValue,
                    toolText: l.toolText
                }, w = l.rolloverProperties || {}, w.enabled && void 0 !== w.plotFillHoverPercent && (w.showHoverAnimation ? (y = {}, I = {
                    d: l.shapeArgs
                }) : (y = w.hoverAttr, w.outAttr.d = l.shapeArgs), q ? (v = f * l.plotFillHoverPercent /
                    100, s = v / 2, y.d = ["M", a, l.plotY - s, "L", k, l.plotY + s]) : (v = b * l.plotFillHoverPercent / 100, s = v / 2, y.d = ["M", l.plotX - s, g, "L", l.plotX + s, r])), l.graphic = c.path(l.shapeArgs, d).attr({
                    stroke: l.borderColor,
                    "stroke-width": t,
                    "stroke-linecap": "round",
                    ishot: !0,
                    "shape-rendering": pb[1 > t]
                }).click(function(a) {
                    qa.call(this, e, a)
                }).hover(function(a) {
                    qa.call(this, e, a, "DataPlotRollOver");
                    w.enabled && (this.attr(w.hoverAttr), w.showHoverAnimation && this.animate(y, 100, "easeOut"))
                }, function(a) {
                    qa.call(this, e, a, "DataPlotRollOut");
                    w.enabled &&
                        (this.attr(w.outAttr), w.showHoverAnimation && this.animate(I, 100, "easeOut"))
                }).tooltip(l.toolText).data("eventArgs", n))
            }
        }, w["renderer.widgetbase"]);
        w("renderer.hbullet", {
            drawWidgetLabel: function(a) {
                var e = this.options,
                    c = e.chart,
                    d = this.layers,
                    b = this.paper,
                    f = d.datalabels;
                a = a[0];
                var m = this.canvasWidth,
                    g = this.canvasHeight,
                    h = c.valuePadding,
                    e = e.plotOptions.series.dataLabels.style,
                    p = {
                        fontFamily: e.fontFamily,
                        fontSize: e.fontSize,
                        lineHeight: e.lineHeight,
                        fontWeight: e.fontWeight,
                        fontStyle: e.fontStyle
                    };
                f || (f = d.datalabels =
                    b.group("datalabels").insertAfter(d.dataset));
                d = m + h;
                void 0 === a.y || isNaN(a.y) || a.displayValue === L || (a.dataLabel = b.text(d, g / 2, a.displayValue, f).attr({
                    "text-anchor": sa[Ia],
                    title: a.originalText || "",
                    fill: e.color,
                    direction: c.textDirection,
                    "text-bound": [e.backgroundColor, e.borderColor, e.borderThickness, e.borderPadding, e.borderRadius, e.borderDash]
                }).css(p))
            }
        }, w["renderer.bullet"]);
        w("renderer.hlinear", {
            drawWidget: function() {
                var a = this.options,
                    e = this.paper,
                    c = this.logic,
                    d = a.chart,
                    b = a.scale,
                    a = this.elements,
                    f = this.layers.dataset,
                    m = this.canvasWidth,
                    g = this.canvasHeight,
                    n = b.min,
                    p = b.max,
                    b = b && b.trendPoint || [],
                    k = d.colorRangeFillMix,
                    l = d.colorRangeFillRatio,
                    s = d.colorRangeBorderColor,
                    r = d.colorRangeBorderAlpha,
                    v = d.colorRangeBorderThickness,
                    t = c.colorRangeGetter.getColorRangeArr(n, p),
                    H = d.showShadow,
                    G, z, Q, A, x, C, J = this.pointOrientation = {
                        top: 1,
                        bottom: 3
                    },
                    B = c.colorManager,
                    w, y, I;
                a.linear || (a.linear = z = e.group("colorrange", f), a.outerRect = e.rect(z));
                a.outerRect.attr({
                    x: 0,
                    y: 0,
                    width: m,
                    height: g,
                    stroke: "none",
                    r: 0
                });
                Q = function(a,
                    b) {
                    return {
                        x: a * m / (p - n),
                        y: 0,
                        width: (b - a) * m / (p - n),
                        height: g
                    }
                };
                a.colorRangeElems || (a.colorRangeElems = []);
                c = 0;
                for (G = t.length; c < G; c += 1) x = t[c], C = Q(x.minvalue - n, x.maxvalue - n), x.x = C.x, x.y = C.y, x.width = C.width, x.height = C.height, A = x.code, A = F(ta(q(x.bordercolor, A), s), h(x.borderalpha, r)), H && Math.max(x.alpha, r), w = B.parseColorMix(x.code, k), y = B.parseAlphaList(x.alpha, w.length), x = h(x.borderAlpha, r), I = y.split(u), I = va.apply(Math, I), I = va(v && x || 0, I), a.colorRangeElems[c] || (a.colorRangeElems[c] = e.rect(z)), a.colorRangeElems[c].attr({
                    x: C.x,
                    y: C.y,
                    width: C.width,
                    height: C.height,
                    r: 0,
                    "stroke-width": v,
                    stroke: A,
                    fill: S({
                        FCcolor: {
                            color: w.toString(),
                            ratio: l,
                            alpha: y,
                            angle: 270
                        }
                    })
                }).shadow({
                    apply: H,
                    opacity: I / 100
                });
                for (; a.colorRangeElems[c];) a.colorRangeElems[c].remove(), a.colorRangeElems.splice(c, 1);
                a.trendObjElems || (a.trendObjElems = []);
                c = 0;
                for (G = b.length; c < G; c += 1) k = b[c], C = Q(k.startValue - n, k.endValue - n), k.isZone ? (a.trendObjElems[c] || (a.trendObjElems[c] = e.rect(z)), a.trendObjElems[c].attr({
                    x: C.x,
                    y: C.y,
                    width: 0 < C.width ? C.width : 0,
                    height: 0 < C.height ? C.height : 0,
                    r: 0,
                    "stroke-width": 0,
                    fill: S({
                        FCcolor: {
                            color: k.color,
                            alpha: k.alpha
                        }
                    })
                }).tooltip(k.tooltext)) : a.trendObjElems[c] = e.path(["M", C.x, C.y, "L", C.x, C.y + C.height], z).attr({
                    stroke: F(k.color, k.alpha),
                    "stroke-width": k.thickness,
                    "stroke-dasharray": k.dashStyle
                }).tooltip(k.tooltext), k.useMarker && (k.showOnTop ? (s = "bottom", l = 0) : (s = "top", l = g), s = 90 * J[s], k.graphic = e.polypath(3, C.x, l, k.markerRadius, s, 0, f).attr({
                    fill: k.markerColor,
                    stroke: k.markerBorderColor,
                    "stroke-width": 1
                }).shadow({
                    apply: d.showShadow
                }).tooltip(k.tooltext));
                for (; a.trendObjElems[c];) a.trendObjElems[c].remove(), a.trendObjElems.splice(c, 1)
            },
            drawWidgetValue: function(a, e) {
                var c = a && a.length || 0,
                    d = this.options.chart,
                    b = this.pointOrientation,
                    f = {
                        point: [],
                        showPointerShadow: d.showPointerShadow
                    },
                    d = d.pointerOnOpp ? "top" : "bottom";
                for (this.dataById = {}; c--;) f.point[c] = {
                    startAngle: 90 * b[d]
                };
                this.drawPointerValues(null, e, f)
            },
            drawPointerValues: function(a, e, c) {
                var d = this;
                a = d.layers.dataset;
                var b = d.options,
                    f = d.elements,
                    m = d.paper,
                    g = b.scale,
                    n = b.series && b.series[0] && b.series[0].data || [],
                    p = d.canvasWidth,
                    k = d.canvasHeight,
                    k = b.chart.pointerOnOpp ? k : 0,
                    l = b.chart.showPointerShadow,
                    b = !1 !== b.tooltip.enabled,
                    s = (g.max - g.min) / p,
                    r = g.min,
                    v = g.max,
                    t = n.length,
                    q, G, z, u, A = {
                        pageX: 0,
                        pageY: 0
                    },
                    x = function(a) {
                        G = d.fusionCharts.getDataJSON();
                        this.dragStartX = a
                    },
                    C = function() {
                        var a, b = d.fusionCharts;
                        (a = b && b.jsVars) && (a._rtLastUpdatedData = b.getDataJSON());
                        Ga.raiseEvent("RealTimeUpdateComplete", {
                                data: "&value=" + this.updatedValStr,
                                updateObject: {
                                    values: [this.updatedValStr]
                                },
                                prevData: G.values,
                                source: "editMode",
                                url: null
                            },
                            b);
                        try {
                            da.FC_ChartUpdated && da.FC_ChartUpdated(b.id)
                        } catch (c) {
                            setTimeout(function() {
                                throw c;
                            }, 1)
                        }
                        this.graphic.tooltip(this.toolText)
                    },
                    w = function(a, b, c, e, f) {
                        a = xb && (xb && f.sourceEvent && f.sourceEvent.touches && f.sourceEvent.touches[0] || f) || A;
                        b = h(this.y, g.min);
                        e = b - (this.dragStartX - c) * s;
                        var m = 0,
                            k = [];
                        e < g.min ? e = g.min : e > g.max && (e = g.max);
                        for (; m < this.index; m += 1) k.push("");
                        k.push(e);
                        b !== e && d.realtimeUpdate({
                            values: k
                        }, {
                            duration: 0
                        }) && (this.updatedValStr = k.join("|"), this.dragStartX = c || f.pageX || a.pageX)
                    },
                    B, y, F, I, M,
                    E;
                I = function(a) {
                    qa.call(this, d, a)
                };
                M = function(a) {
                    var b = this.data("rolloverProperties");
                    b.enabled && (this.attr(b.hoverAttr), b.hoverAnimAttr && this.animate(b.hoverAnimAttr, 100, "easeIn"));
                    qa.call(this, d, a, "DataPlotRollOver")
                };
                for (E = function(a) {
                        var b = this.data("rolloverProperties");
                        b.enabled && (this.attr(b.outAttr), b.outAnimAttr && this.animate(b.outAnimAttr, 100, "easeIn"));
                        qa.call(this, d, a, "DataPlotRollOut")
                    }; t--;) q = n[t], y = q.rolloverProperties || {}, u = c && c.point[t] && c.point[t].startAngle || q._startAngle, u += .2,
                    f.pointers || (f.pointers = []), f.pointers[t] || (void 0 !== q.id && (d.dataById[q.id] = {
                            index: t,
                            point: q
                        }), z = l ? {
                            opacity: Math.max(q.bgalpha, q.borderalpha) / 100
                        } : !1, B = q.editMode ? void 0 : q.link, F = {
                            link: B,
                            value: q.y,
                            displayValue: q.displayValue,
                            toolText: q.toolText
                        }, q.graphic = f.pointers[t] = m.polypath(q.sides, 0, k || 0, q.radius, u, 0, a).attr({
                            fill: q.color,
                            stroke: q.borderColor,
                            ishot: !0,
                            r: q.radius,
                            "stroke-width": q.borderWidth
                        }).shadow(!!z, z && z.opacity).click(I).hover(M, E).data("eventArgs", F).data("rolloverProperties", y), B &&
                        q.graphic.css({
                            cursor: "pointer",
                            _cursor: "hand"
                        }), q._startAngle = u, q.editMode && (q.index = t, q.graphic.css({
                            cursor: "pointer",
                            _cursor: "hand"
                        }).attr({
                            ishot: !0
                        }), q.graphic.drag(w, x, C, q, q, q))), q.graphic = f.pointers[t], b && q.graphic.tooltip(q.toolText), e && e.duration ? q.graphic.animate({
                        polypath: [q.sides, p * (h(q.y, r) - r) / (v - r), k || 0, q.radius, u, 0]
                    }, e.duration, "easeIn") : q.graphic.attr({
                        polypath: [q.sides, p * (h(q.y, r) - r) / (v - r), k || 0, q.radius, u, 0]
                    })
            },
            drawWidgetLabel: function(a, e) {
                var c = this.options,
                    d = c.scale,
                    b = this.layers,
                    f = this.paper,
                    m = c.chart,
                    g = this.logic,
                    b = b.datalabels || (b.datalabels = f.group("datalabels").insertAfter(b.dataset)),
                    n = d.min,
                    p = d.max,
                    k = m.textDirection,
                    l = g.colorRangeGetter.getColorRangeArr(n, p),
                    g = g.numberFormatter,
                    s = m.colorRangeStyle.style || {},
                    r, v = this.canvasWidth,
                    t = this.canvasHeight,
                    d = d && d.trendPoint || [],
                    H = m.pointerOnOpp,
                    G = m.valueInsideGauge;
                r = m.showGaugeLabels;
                var z = c.plotOptions.series.dataLabels.style,
                    u, A, x, C, w, B, y, F, I;
                F = !1;
                var c = this.smartLabel,
                    M, E, D;
                D = h(parseInt(z.fontHeight, 10), parseInt(z.lineHeight,
                    10), 12);
                var K = m.valuePadding + .5 * D,
                    m = m.valuePadding,
                    S = K,
                    z = {
                        fontFamily: z.fontFamily,
                        fontSize: z.fontSize,
                        lineHeight: z.lineHeight,
                        fontWeight: z.fontWeight,
                        fontStyle: z.fontStyle
                    },
                    K = G === H ? K - D / 4 : K + D / 4;
                c.setStyle(z);
                E = c.getOriSize("W...").width;
                C = this.getPointerLabelXY = function(a, b, c, d) {
                    return {
                        x: (a - n) * v / (p - n),
                        y: c ? b ? t - d - K : t + K : b ? K : -(K + d),
                        align: "middle"
                    }
                };
                w = function(a, b) {
                    return {
                        x: (a - n + (b - a) / 2) * v / (p - n),
                        y: t / 2,
                        width: (b - a) * v / (p - n),
                        height: t
                    }
                };
                if (a && a.length)
                    for (z = a.length; z--;)
                        if (x = a[z], 0 !== x.showvalue && x.displayValue !==
                            L && (M = c.getOriSize(x.displayValue), x.setWidth && (M = c.getSmartText(x.displayValue, x.setWidth, M.height, !0)), B = this.getPointerLabelXY(x.y, G, H, M.height / 2), x.isLabelString)) {
                            F = !1;
                            for (I = 1; !F;) {
                                y = a[z + I];
                                if (!y) break;
                                y.isLabelString ? F = !0 : I += 1
                            }
                            y && (F = c.getOriSize(y.displayValue), u = C(y.y, G, H, F.height / 2), I = u.x - F.width / 2 - (B.x + M.width / 2), u = u.x - B.x, 0 > I && (A = M.width + I, A > u && (x.setWidth = A = u), A > E ? (B = x.setWidth && x.setWidth <= A ? c.getSmartText(x.displayValue, x.setWidth, M.height, !0) : c.getSmartText(x.displayValue, A, M.height, !0), x.displayValue = B.text, B.tooltext && (x.originalText = B.tooltext)) : (B = c.getSmartText(x.displayValue, E, M.height, !0), x.displayValue = B.text, B.tooltext && (x.originalText = B.tooltext), I = 2 * I + E - 4), x.setWidth = null, A = F.width + I - 4, y.setWidth = A > u ? u : A > E ? A : E));
                            x.setWidth && (B = c.getSmartText(x.displayValue, x.setWidth, M.height, !0), x.displayValue = B.text, B.tooltext && (x.originalText = B.tooltext), x.setWidth = null)
                        }
                this.drawPointerLabels(null, e);
                s = s || {};
                c.setStyle(s);
                if (l && r)
                    for (z = 0, H = l.length; z < H; z += 1) r = l[z], G = q(r.label,
                        r.name), $(G) && G !== L && (B = w(r.minvalue, r.maxvalue), M = B.width - 4 > E && B.height - 4 > D ? c.getSmartText(G, B.width - 4, B.height - 4) : c.getSmartText(G, B.width, B.height), f.text(b).attr({
                        "text-anchor": ya,
                        title: M.tooltext || "",
                        "vertical-align": ya,
                        text: M.text,
                        x: B.x,
                        y: B.y,
                        direction: k,
                        fill: s.color
                    }).css(s));
                if (d)
                    for (z = 0, H = d.length; z < H; z += 1) {
                        l = d[z];
                        l.displayValue = q(l.displayValue, g.dataLabels(l.startValue));
                        c.setStyle(l.style);
                        D = c.getOriSize("Wg").height;
                        M = c.getOriSize(l.displayValue);
                        B = C(l.startValue, 0, !l.showOnTop);
                        l.setWidth &&
                            (M = c.getSmartText(l.displayValue, l.setWidth, M.height, !0));
                        F = !1;
                        for (I = 1; !F;) {
                            y = d[z + I];
                            if (!y) break;
                            y.showOnTop === l.showOnTop ? F = !0 : I += 1
                        }
                        y && (F = c.getOriSize(y.displayValue), u = C(y.startValue, 0, !y.showOnTop), I = u.x - F.width / 2 - (B.x + M.width / 2), 0 > I && (u = u.x - B.x, A = M.width + I, A > u && (l.setWidth = A = u), A > E ? (M = l.setWidth && l.setWidth <= A ? c.getSmartText(l.displayValue, l.setWidth, M.height, !0) : c.getSmartText(l.displayValue, M.width + I - 4, M.height, !0), l.displayValue = M.text, M.tooltext && (l.originalText = M.tooltext)) : (M = c.getSmartText(l.displayValue,
                            E, M.height, !0), l.displayValue = M.text, M.tooltext && (l.originalText = M.tooltext), I = 2 * I + E - 4), l.setWidth = null, A = F.width + I - 4, y.setWidth = A > u ? u : A > E ? A : E));
                        l.setWidth && (M = c.getSmartText(l.displayValue, l.setWidth, M.height, !0), l.displayValue = M.text, M.tooltext && (l.originalText = M.tooltext), l.setWidth = null);
                        D = l.showOnTop ? -(m + M.height / 2) : t + S;
                        s = l.isZone ? w(l.startValue, l.endValue).x : B.x;
                        l.dataLabel = f.text(0, D, l.displayValue, b).attr({
                            "text-anchor": sa[B.align],
                            direction: k,
                            title: l.originalText || ""
                        }).css(l.style);
                        l.dataLabel.attr({
                            x: s
                        })
                    }
            },
            drawPointerLabels: function(a, e) {
                for (var c = this.layers.datalabels, d = this.paper, b = this.options, f = b.chart, m = f.pointerOnOpp, g = f.valueInsideGauge, f = f.textDirection, h = this.smartLabel, p = b.series && b.series[0] && b.series[0].data || [], b = b.plotOptions.series.dataLabels.style, k = p.length, l = {
                        fontFamily: b.fontFamily,
                        fontSize: b.fontSize,
                        lineHeight: b.lineHeight,
                        fontWeight: b.fontWeight,
                        fontStyle: b.fontStyle
                    }, s, r, q; k--;) r = p[k], s = r.displayValue, 0 !== r.showvalue && s !== L && (q = h.getOriSize(s), q = this.getPointerLabelXY(r.y, g,
                    m, q.height / 2), r.dataLabel ? r.dataLabel.attr({
                    text: s,
                    title: r.originalText || ""
                }) : r.dataLabel = d.text(c).attr({
                    "text-anchor": sa[q.align],
                    title: r.originalText || "",
                    text: s,
                    x: 0,
                    y: q.y,
                    fill: b.color,
                    direction: f,
                    "text-bound": [b.backgroundColor, b.borderColor, b.borderThickness, b.borderPadding, b.borderRadius, b.borderDash]
                }).css(l), e && e.duration ? r.dataLabel.animate({
                    x: q.x
                }, e.duration, "easeIn") : r.dataLabel.attr({
                    x: q.x
                }))
            },
            realtimeUpdate: function(a, e) {
                if (a === this.lastUpdatedObj) return !1;
                var c = this.options,
                    d = c[K],
                    b =
                    c.series,
                    f = this.numberFormatter,
                    b = b && b[0] && b[0].data,
                    m = a.values || [],
                    g = a.labels || [],
                    h = a.toolTexts || [],
                    p = a.showLabels || [],
                    k = b && b.length || 0,
                    l, s, r = null,
                    v = [],
                    t;
                e = e || c.plotOptions.series.animation;
                if (k) {
                    for (; k--;) c = {}, t = {}, l = b[k], void 0 !== m[k] && "" !== m[k] ? (c.value = t.value = m[k], r = t.displayvalue = t.tooltext = f.dataLabels(t.value), t.hasNewData = !0) : t.value = l.y, g[k] && (t.displayvalue = g[k], t.hasNewData = !0), "0" == p[k] && (t.displayvalue = L, t.hasNewData = !0), s = D(O(q(l._tooltext, d.tooltext))), h[k] && (s = D(O(h[k])), t.hasNewData = !0), t.hasNewData && (v[k] = t, T(l, {
                        y: t.value,
                        displayValue: l.displayValue || "1" == p[k] ? t.displayvalue : L,
                        toolText: void 0 !== s ? ab(s, [1, 2], {
                            formattedValue: r
                        }, c) : r
                    }));
                    v.length && (this.lastUpdatedObj = a, this.drawPointerValues(b, e), this.drawPointerLabels(b, e));
                    return Boolean(v.length)
                }
            }
        }, w["renderer.widgetbase"]);
        w("renderer.angular", {
            drawWidget: function() {
                var a = this.options,
                    e = a.chart,
                    c = a.scale,
                    d = a.series[0],
                    a = this.paper,
                    b = this.elements,
                    f = this.layers.dataset,
                    m = d.gaugeOuterRadius,
                    g = d.gaugeInnerRadius,
                    n = d.gaugeFillRatio,
                    p = e.gaugeBorderColor,
                    k = e.gaugeBorderThickness,
                    l = e.gaugeBorderAlpha,
                    s = d.gaugeFillMix,
                    r = d.gaugeOriginX,
                    v = d.gaugeOriginY,
                    t = e.gaugeStartAngle,
                    H = e.gaugeEndAngle,
                    G = e.showShadow,
                    e = e.textDirection,
                    z = c.min,
                    w = c.max,
                    A = this.logic,
                    x = A.colorRangeGetter.getColorRangeArr(z, w),
                    C = 0,
                    J = x.length,
                    B = w - z,
                    H = H - t,
                    y, D, I = t,
                    M = Math.cos(t),
                    E = Math.sin(t),
                    K = r + m * M;
                D = v + m * E;
                var M = r + g * M,
                    E = v + g * E,
                    T, c = c.trendPoint,
                    O;
                b.trendPointGroup || (b.trendPointGroup = a.group("trendpoint", f));
                for (; C < J; C += 1) y = x[C], D = t + (Math.min(y.maxvalue, w) - z) / B * H, M = A.parseColorMix(y.code,
                    s), E = A.parseAlphaList(y.alpha, M.length), K = A.parseRatioList(g / m * 100 + n, M.length), O = y.bordercolor, T = h(y.borderAlpha, l), O = O && -1 == O.indexOf("{") ? F(O, T) : A.parseColorMix(y.code, q(O, p))[0], O = F(O, T), y = E.split(u), y = va.apply(Math, y), y = G ? va(k && T || 0, y) : 0, T = D, I > D && (I += D, D = I - D, I -= D), a.ringpath(r, v, m, g, I, D, f).attr({
                    fill: S({
                        FCcolor: {
                            cx: r,
                            cy: v,
                            r: m,
                            gradientUnits: "userSpaceOnUse",
                            color: M.join(),
                            alpha: E,
                            ratio: K,
                            radialGradient: !0
                        }
                    }),
                    "stroke-width": k,
                    stroke: O
                }).shadow({
                    apply: G,
                    opacity: y / 100
                }), I = T;
                b.tickMarkGroup || (b.tickMarkGroup =
                    a.group("tickmark", f));
                b.trendMarkerGroup || (b.trendMarkerGroup = a.group("trendmarker", f));
                b.pointGroup || (b.pointGroup = a.group("pointers", f).translate(r, v));
                b.pivot || (b.pivot = a.circle(f));
                b.pivot.attr({
                    cx: r,
                    cy: v,
                    r: d.pivotRadius,
                    fill: S({
                        FCcolor: d.isRadialGradient ? {
                            color: d.pivotFillColor,
                            alpha: d.pivotFillAlpha,
                            ratio: d.pivotFillRatio,
                            radialGradient: !0,
                            angle: d.pivotFillAngle,
                            cx: .5,
                            cy: .5,
                            r: "50%"
                        } : {
                            color: d.pivotFillColor,
                            alpha: d.pivotFillAlpha,
                            ratio: d.pivotFillRatio,
                            radialGradient: !1,
                            angle: d.pivotFillAngle
                        }
                    }),
                    "stroke-width": d.pivotBorderThickness,
                    stroke: d.pivotBorderColor
                }).shadow({
                    apply: G
                });
                f = Math.cos(89.99 * eb);
                n = -f;
                C = 0;
                for (J = c.length; C < J; C += 1) d = c[C], G = d.isZone, s = t + (d.startValue - z) / B * H, p = h(d.radius, m), k = h(d.innerRadius, G ? Math.max(g - 15, 0) : g), l = h(d.trendValueDistance, 0), M = Math.cos(s), E = Math.sin(s), K = r + p * M, D = v + p * E, M = r + k * M, E = v + k * E, G ? (E = t + (d.endValue - z) / B * H, s > E && (s += E, E = s - E, s -= E), d.graphic = a.ringpath(r, v, p, k, s, E, b.trendPointGroup).attr({
                    fill: F(d.color, d.alpha),
                    "stroke-width": d.showBorder ? d.thickness : 0,
                    stroke: d.borderColor,
                    "stroke-dasharray": d.dashStyle
                })) : d.graphic = a.path(["M", K, D, "L", M, E], b.tickMarkGroup).attr({
                    "stroke-width": d.showBorder ? d.thickness : 0,
                    stroke: d.borderColor,
                    "stroke-linecap": "round",
                    "stroke-dasharray": d.dashStyle
                }), d.useMarker && (d.markerElement = a.polypath("3", K, D, d.markerRadius, (-s + Math.PI) / eb, 0, b.trendMarkerGroup).attr({
                    fill: d.markerColor,
                    "stroke-width": 1,
                    stroke: d.markerBorderColor
                }), "" !== d.markerToolText && d.markerElement.tooltip(d.markerToolText)), d.displayValue !== L && (D = (d.endValue + d.startValue) /
                    2, E = t + (D - z) / B * H, M = Math.cos(E), E = Math.sin(E), d.valueInside ? (D = k - 2 - l, p = M > f ? bb : M < n ? Ia : La) : (D = p + 2 + l, p = M > f ? Ia : M < n ? bb : La), K = r + D * M, D = v + D * E, k = d.style, d.textElement = a.text(b.trendMarkerGroup).attr({
                        x: K,
                        y: D,
                        text: d.displayValue,
                        title: d.originalText || "",
                        direction: e,
                        "text-anchor": sa[d.align || p],
                        "vertical-align": Wa
                    }).css(k), K = d.textElement.getBBox(), K = K.height, D = M > f || M < n ? D + (-(K / 2) + .4 * K * E * (d.valueInside ? -1 : 1)) : d.valueInside ? D + -(0 > E ? 0 : K) : D + -(0 < E ? 0 : K), d.textElement.attr({
                        y: D
                    }))
            },
            drawWidgetValue: function(a, e) {
                var c =
                    this,
                    d = c.options,
                    b = d.chart,
                    f = d.scale,
                    m = d.series[0],
                    g = c.paper,
                    n = c.elements,
                    p = Number(m.gaugeOriginX),
                    k = Number(m.gaugeOriginY),
                    l = b.gaugeStartAngle,
                    s = b.gaugeEndAngle,
                    b = b.showShadow,
                    d = !1 !== d.tooltip.enabled,
                    r = f.min,
                    q = f.max,
                    t = n.pointGroup,
                    H = q - r,
                    G = s - l,
                    z = H / G,
                    u = 0,
                    A, x, C, w, B, y, D, I = a && a.length,
                    F, E = Xb(l, s),
                    L = Vb(c.container),
                    K = function(a, b) {
                        var d;
                        d = [p, k];
                        d = Gb(d[1] - b + L.top, d[0] - a + L.left);
                        c.rotationStartAngle = d;
                        F = c.fusionCharts.getDataJSON()
                    },
                    S = function() {
                        var a = c.fusionCharts,
                            b;
                        (b = a && a.jsVars) && (b._rtLastUpdatedData =
                            a.getDataJSON());
                        Ga.raiseEvent("RealTimeUpdateComplete", {
                            data: "&value=" + this.updatedValStr,
                            updateObject: {
                                values: [this.updatedValStr]
                            },
                            prevData: F.values,
                            source: "editMode",
                            url: null
                        }, a);
                        try {
                            da.FC_ChartUpdated && da.FC_ChartUpdated(a.id)
                        } catch (d) {
                            setTimeout(function() {
                                throw d;
                            }, 1)
                        }
                    },
                    N = function(a, b, d, e) {
                        a = [p, k];
                        d = Gb(a[1] - e + L.top, a[0] - d + L.left);
                        e = c.rotationStartAngle;
                        var g;
                        e = 0 > d && 0 < e ? vb(d) - c.rotationStartAngle : 0 < d && 0 > e ? vb(c.rotationStartAngle) - d : c.rotationStartAngle - d;
                        e = this.y - e * z;
                        a = [];
                        b = 0;
                        g = this.index;
                        e <
                            f.min ? e = f.min : e > f.max && (e = f.max);
                        for (; b < g; b += 1) a.push("");
                        a.push(e);
                        e !== this.value && c.realtimeUpdate({
                            values: a
                        }, {
                            duration: 0
                        }) && (this.updatedValStr = a.join("|"), c.rotationStartAngle = d)
                    },
                    U, R, T, P, O, Z, W, V, X, aa;
                void 0 === c.dataById && (c.dataById = {});
                n.pointers || (n.pointers = []);
                V = function(a) {
                    qa.call(this, c, a)
                };
                X = function(a) {
                    var b = this.data("rolloverProperties");
                    qa.call(this, c, a, "DataPlotRollOver");
                    b.enabled && (a = this.attr("transform"), this.attr("transform", ""), this.attr(b.hoverAttr), this.attr("transform", a))
                };
                for (aa = function(a) {
                        var b = this.data("rolloverProperties");
                        qa.call(this, c, a, "DataPlotRollOut");
                        b.enabled && (a = this.attr("transform"), this.attr("transform", ""), this.attr(b.outAttr), this.attr("transform", a))
                    }; u < I; u += 1) s = a[u], R = s.rolloverProperties || {}, $(s.y) || (s.y = r, $(s.toolText) || (s.toolText = r), " " === s.displayValue && (s.displayValue = r)), void 0 !== s.id && (c.dataById[s.id] = {
                        index: u,
                        point: s
                    }), s.index = u, A = h(s.radius, (Number(m.gaugeOuterRadius) + Number(m.gaugeInnerRadius)) / 2), x = s.baseWidth, y = x / 2, C = s.topWidth,
                    D = C / 2, B = s.rearExtension, w = s.baseRadius, s.tooltipPos = [p, k], n.pointers[u] ? w = n.pointers[u] : (U = s.editMode ? void 0 : s.link, T = ["M", A, -D, "L", A, D, -B, y, -B, -y, "Z"], R.hasHoverSizeChange && (R.outAttr.path = T, P = h(R.hoverRadius, A), O = R.baseHoverWidth, O /= 2, Z = R.topHoverWidth, Z /= 2, W = R.rearHoverExtension, R.hoverAttr.path = ["M", P, -Z, "L", P, Z, -W, O, -W, -O, "Z"]), U = {
                        link: U,
                        value: s.y,
                        displayValue: s.displayValue,
                        toolText: s.toolText
                    }, n.pointers[u] = C ? g.path(T, t) : g.trianglepath(A, D, -B, y, -B, -y, 0, w, w, t), s.graphic = w = n.pointers[u], s.graphic.attr({
                        fill: s.color,
                        stroke: s.borderColor,
                        ishot: !0,
                        "stroke-width": s.borderThickness
                    }).click(V).hover(X, aa).data("eventArgs", U).data("rolloverProperties", R), (x || C || s.borderThickness) && s.graphic.shadow({
                        apply: b
                    }), w._attr = w.attr, w.attr = E, w._Attr = {
                        tooltipPos: s.tooltipPos,
                        cx: p,
                        cy: k,
                        toolTipRadius: A - B,
                        color: s.color
                    }, A = l / eb, w.attr({
                        angle: A
                    }), s.editMode && (s.index = u, s.graphic.css({
                        cursor: "pointer",
                        _cursor: "hand"
                    }).attr({
                        ishot: !0
                    }), s.graphic.drag(N, K, S, s, s, s))), s.y >= r && s.y <= q && (A = (s.y - r) / H * G, A = (l + A) / eb, w.attr({
                            angle: A
                        }, null, e),
                        d && w.tooltip(s.toolText))
            },
            drawWidgetLabel: function(a) {
                var e = this.paper,
                    c = this.layers,
                    d = c.datalabels,
                    b = this.options,
                    f = b.series[0],
                    m = b.plotOptions.series.dataLabels.style,
                    g = f.pivotRadius,
                    n = h(parseInt(m.lineHeight, 10), 12),
                    p = f.valueBelowPivot,
                    k = f.gaugeOriginX,
                    l = b.chart.textDirection,
                    s = {
                        fontFamily: m.fontFamily,
                        fontSize: m.fontSize,
                        lineHeight: m.lineHeight,
                        fontWeight: m.fontWeight,
                        fontStyle: m.fontStyle
                    },
                    r, q, t, u = f.gaugeOriginY + (p ? n / 2 + g + 2 : -(n / 2) - g - 2);
                d || (d = c.datalabels = e.group("datalabels").insertAfter(c.dataset));
                Cb(a, function(a, b) {
                    r = a.displayValue;
                    t = a.valueY;
                    q = h(a.valueX, k);
                    $(t) || (t = p ? u + n * b : u - n * b);
                    $(r) && r !== L && (a.dataLabel ? a.dataLabel.attr({
                        text: r,
                        title: a.originalText || ""
                    }) : a.dataLabel = e.text(d).attr({
                        x: q,
                        y: t,
                        text: r,
                        "text-anchor": sa[La],
                        direction: l,
                        title: a.originalText || "",
                        fill: m.color,
                        "text-bound": [m.backgroundColor, m.borderColor, m.borderThickness, m.borderPadding, m.borderRadius, m.borderDash]
                    }).css(s))
                })
            },
            drawScale: function() {
                var a = this.options,
                    e = a.chart,
                    c = a.scale,
                    d = this.paper,
                    b = this.elements,
                    f = a.series[0],
                    a = Number(f.gaugeOriginX),
                    m = Number(f.gaugeOriginY),
                    g = e.gaugeStartAngle,
                    n = c.min,
                    p = e.textDirection,
                    k = Number(f.gaugeInnerRadius),
                    l = Number(f.gaugeOuterRadius),
                    f = c.max - n,
                    e = e.gaugeEndAngle - g,
                    s = 0,
                    r = c.majorTM,
                    q = c.minorTM,
                    t = b.tickMarkGroup,
                    u, G, z, w, A, x, C = Math.cos,
                    y = Math.sin,
                    B = Number(c.minorTMHeight),
                    D = Number(c.majorTMHeight),
                    L = c.placeTicksInside,
                    s = c.placeValuesInside;
                A = c.tickValueDistance;
                var I, M, E = c.limitValues.style,
                    K = c.tickValues.style,
                    S = .75 * h(parseInt(E.lineHeight, 10), 12),
                    O = .75 * h(parseInt(K.lineHeight, 10),
                        12);
                L ? (L = k, B = L + B, D = L + D) : (L = l, B = L - B, D = L - D);
                I = s ? k - A : l + A;
                b.majorTM || (b.majorTM = []);
                b.tmLabel || (b.tmLabel = []);
                s = 0;
                for (k = r.length; s < k; s += 1) l = r[s], u = l.value, A = l.displayValue, x = (u - n) * e / f + g, M = C(x), x = y(x), u = a + L * M, G = m + L * x, z = a + D * M, w = m + D * x, b.majorTM[s] = d.path(["M", u, G, "L", z, w], t).attr({
                    stroke: F(c.majorTMColor, c.majorTMAlpha),
                    "stroke-width": c.majorTMThickness,
                    "stroke-linecap": "round"
                }), "" !== A && (0 === s || s === k - 1 ? (z = E, G = m + I * x + (l.y || 0) - S) : (z = K, G = m + I * x + (l.y || 0) - O), u = a + I * M + (l.x || 0), b.tmLabel[s] = d.text(u, G, A, t).attr({
                    "text-anchor": sa[l.align ||
                        La],
                    title: l.originalText || "",
                    direction: p,
                    "vertical-align": Wa
                }).css(z));
                b.minorTM || (b.minorTM = []);
                s = 0;
                for (k = q.length; s < k; s += 1) u = q[s], x = (u - n) * e / f + g, u = a + L * C(x), G = m + L * y(x), z = a + B * C(x), w = m + B * y(x), b.minorTM[s] = d.path(["M", u, G, "L", z, w], t).attr({
                    stroke: F(c.minorTMColor, c.minorTMAlpha),
                    "stroke-width": c.minorTMThickness,
                    "stroke-linecap": "round"
                })
            },
            realtimeUpdate: function(a, e) {
                if (a === this.lastUpdatedObj) return !1;
                var c = this.options,
                    d = c[K],
                    b = c.series,
                    f = this.numberFormatter,
                    b = b && b[0] && b[0].data,
                    m = a.values || [],
                    g =
                    a.labels || [],
                    h = a.toolTexts || [],
                    p = a.showLabels || [],
                    k = b && b.length || 0,
                    l, s, r = null,
                    v = [],
                    t, u;
                e = e || c.plotOptions.series.animation;
                if (k) {
                    for (; k--;) t = {}, c = {}, u = !1, l = b[k], s = l.id && (l.id.toLowerCase && l.id.toLowerCase() || l.id), void 0 !== m[k] && "" !== m[k] && (u = !0) || s && a[s] ? (c.value = t.value = u ? m[k] : a[s], r = t.displayvalue = t.tooltext = f.dataLabels(t.value), t.hasNewData = !0) : t.value = l.y, g[k] && (t.displayvalue = g[k], t.hasNewData = !0), "0" == p[k] && (t.displayvalue = L, t.hasNewData = !0), s = D(O(q(l._tooltext, d.tooltext))), h[k] && (s = D(O(h[k])),
                        t.hasNewData = !0), t.hasNewData && (v[k] = t, T(l, {
                        y: t.value,
                        displayValue: l.displayValue || "1" === p[k] ? t.displayvalue : L,
                        toolText: void 0 !== s ? ab(s, [1, 2], {
                            formattedValue: r
                        }, c) : r
                    }));
                    v.length && (this.lastUpdatedObj = a, this.drawWidgetValue(b, e), this.drawWidgetLabel(b, e));
                    return Boolean(v.length)
                }
            }
        }, w["renderer.widgetbase"]);
        w("renderer.funnel", {
            type: "funnel",
            pyramidFunnelShape: function() {
                var a = {
                        y: !0,
                        R1: !0,
                        R2: !0,
                        h: !0,
                        r3dFactor: !0,
                        color: !0,
                        opacity: !0,
                        fill: !0,
                        stroke: !0,
                        strokeColor: !0,
                        strokeAlpha: !0,
                        "stroke-width": !0
                    },
                    e = function(a, c, d, e, h, p, k, l, s, r) {
                        lb(a) && (c = a.y, d = a.R1, e = a.R2, h = a.h, p = a.r3dFactor, k = a.is2D, r = a.isHollow, s = a.isFunnel, a = a.x);
                        l = a - d;
                        var q = a + d,
                            t = a - e,
                            u = a + e,
                            G = c + h,
                            z, w;
                        if (k) z = {
                            silhuette: ["M", l, c, "L", q, c, u, G, t, G, "Z"]
                        }, s || (z.lighterHalf = ["M", l, c, "L", a, c, a, G, t, G, "Z"], z.darkerHalf = ["M", a, c, "L", q, c, u, G, a, G, "Z"]);
                        else if (s) {
                            t = a;
                            u = c;
                            c = d || .01;
                            q = e || .01;
                            a = r;
                            l = c * p;
                            p *= q;
                            h = u + h;
                            G = ga(q, 2) - ga(c, 2);
                            d = -2 * (ga(q, 2) * u - ga(c, 2) * h);
                            e = ga(c * p, 2) + ga(q * u, 2) - ga(q * l, 2) - ga(c * h, 2);
                            r = kb(ga(d, 2) - 4 * G * e);
                            e = (-d + r) / (2 * G);
                            G = (-d - r) / (2 * G);
                            e < h &&
                                e > u ? w = G : G < h && G > u && (w = e);
                            e = kb((ga(w - u, 2) - ga(l, 2)) / ga(c, 2));
                            d = -e;
                            G = {
                                x: ka(ga(c, 2) * e / (w - u) * 100) / 100,
                                y: ka(100 * (ga(l, 2) / (w - u) + u)) / 100
                            };
                            e = {
                                x: ka(ga(q, 2) * e / (w - h) * 100) / 100,
                                y: ka(100 * (ga(p, 2) / (w - h) + h)) / 100
                            };
                            r = {
                                x: ka(ga(c, 2) * d / (w - u) * 100) / 100,
                                y: ka(100 * (ga(l, 2) / (w - u) + u)) / 100
                            };
                            w = {
                                x: ka(ga(q, 2) * d / (w - h) * 100) / 100,
                                y: ka(100 * (ga(p, 2) / (w - h) + h)) / 100
                            };
                            G = {
                                topLeft: r,
                                bottomLeft: w,
                                topRight: G,
                                bottomRight: e
                            };
                            for (z in G)
                                if (isNaN(G[z].x) || isNaN(G[z].y)) G[z].x = "topLeft" === z || "bottomLeft" === z ? -c : c, G[z].y = "bottomRight" === z || "bottomLeft" ===
                                    z ? h : u;
                            h = G.topLeft;
                            d = G.bottomLeft;
                            z = t + h.x;
                            w = t + G.topRight.x;
                            u = t + d.x;
                            t += G.bottomRight.x;
                            h = h.y;
                            d = d.y;
                            G = ["A", c, l, 0, 0, 0, w, h];
                            e = ["A", c, l, 0, 1, 1, w, h];
                            r = ["A", q, p, 0, 0, 1, u, d];
                            q = ["A", q, p, 0, 1, 0, u, d];
                            q = {
                                front: ["M", z, h].concat(G, ["L", t, d], r, ["Z"]),
                                back: ["M", z, h].concat(e, ["L", t, d], q, ["Z"]),
                                silhuette: ["M", z, h].concat(e, ["L", t, d], r, ["Z"])
                            };
                            a || (q.top = ["M", z, h].concat(G, ["L", w, h], ["A", c, l, 0, 1, 0, z, h], ["Z"]));
                            z = q
                        } else z = d * p, w = e * p, h = Ja(5, d), d = Ja(2, 2 * z), e = Ja(2, d), p = e / p, z = {
                            top: ["M", l, c, "L", a, c + z, q, c, a, c - z, "Z"],
                            front: ["M",
                                l, c, "L", a, c + z, q, c, u, G, a, G + w, t, G, "Z"
                            ],
                            topLight: ["M", l, c + .5, "L", a, c + z + .5, a, c + z - d, l + p, c, "Z"],
                            topLight1: ["M", q, c + .5, "L", a, c + z + .5, a, c + z - e, q - p, c, "Z"],
                            silhuette: ["M", l, c, "L", a, c - z, q, c, u, G, a, G + w, t, G, "Z"],
                            centerLight: ["M", a, c + z, "L", a, G + w, a - 5, G + w, a - h, c + z, "Z"],
                            centerLight1: ["M", a, c + z, "L", a, G + w, a + 5, G + w, a + h, c + z, "Z"]
                        };
                        return z
                    },
                    c = function(b, c) {
                        var d, g, n = this,
                            p, k, l = !1,
                            s = !1,
                            r = this._3dAttr,
                            q;
                        Ea(b) && $(c) && (d = b, b = {}, b[d] = c);
                        if (Ea(b)) n = a[b] ? this._3dAttr[b] : this._attr(b);
                        else {
                            for (d in b) g = b[d], a[d] ? (r[d] = g, "fill" === d ?
                                (g && g.linearGradient && g.stops && g.stops[0] && (g = g.stops[0][1]), rb.test(g) ? (k = new nb(g), p = k.get("hex"), k = 100 * k.get("a")) : g && g.FCcolor ? (p = g.FCcolor.color.split(u)[0], k = g.FCcolor.opacity.split(u)[0]) : ob.test(g) && (p = g.replace(fb, hb), k = h(r.opacity, 100)), r.color = p, r.opacity = k, s = !0) : "color" === d || "opacity" === d ? (r.fill = S(F(r.color, h(r.opacity, 100))), s = !0) : "stroke" === d || "strokeColor" === d || "strokeAlpha" === d ? r.is2D && ("stroke" === d ? (g && g.linearGradient && g.stops && g.stops[0] && (g = g.stops[0][1]), rb.test(g) ? (k = new nb(g),
                                    p = k.get("hex"), k = 100 * k.get("a")) : g && g.FCcolor ? (p = g.FCcolor.color.split(u)[0], k = g.FCcolor.opacity.split(u)[0]) : ob.test(g) && (p = g.replace(fb, hb), k = h(r.opacity, 100)), r.strokeColor = p, r.strokeAlpha = k) : r.stroke = F(r.strokeColor, h(r.strokeAlpha, 100)), r.isFunnel ? this.funnel2D.attr("stroke", r.stroke) : this.borderElement.attr("stroke", r.stroke)) : "stroke-width" === d ? r.is2D && (r.isFunnel ? this.funnel2D.attr(d, g) : this.borderElement.attr(d, g)) : l = !0) : this._attr(d, g);
                            r.is2D ? (l && (p = e(r.x, r.y, r.R1, r.R2, r.h, r.r3dFactor, r.is2D),
                                n.shadowElement.attr({
                                    path: p.silhuette
                                }), r.isFunnel ? n.funnel2D.attr({
                                    path: p.silhuette
                                }) : (n.lighterHalf.attr({
                                    path: p.lighterHalf
                                }), n.darkerHalf.attr({
                                    path: p.darkerHalf
                                }), n.borderElement.attr({
                                    path: p.silhuette
                                }))), s && (r.isFunnel ? n.funnel2D.attr("fill", S(F(r.color, h(r.opacity, 100)))) : (p = V(r.color, 80), k = W(r.color, 80), n.lighterHalf.attr("fill", S(F(k, h(r.opacity, 100)))), n.darkerHalf.attr("fill", S(F(p, h(r.opacity, 100))))))) : (l && (p = e(r.x, r.y, r.R1, r.R2, r.h, r.r3dFactor, r.is2D), n.shadowElement.attr("path", p.silhuette),
                                r.isFunnel ? (n.front.attr("path", p.front), n.back.attr("path", p.back), n.toptop && p.top && n.toptop.attr("path", p.top)) : (n.front.attr("path", p.front), n.toptop.attr("path", p.top), n.topLight.attr("path", p.topLight), n.topLight1.attr("path", p.topLight1), n.centerLight.attr("path", p.centerLight), n.centerLight1.attr("path", p.centerLight1))), s && (p = r.color, k = r.opacity, r.isFunnel ? (s = W(p, 60), l = V(p, 60), n.back.attr("fill", S({
                                FCcolor: {
                                    color: l + u + s + u + p,
                                    alpha: k + u + k + u + k,
                                    ratio: "0,60,40",
                                    angle: 0
                                }
                            })), n.front.attr("fill", S({
                                FCcolor: {
                                    color: p +
                                        u + s + u + l,
                                    alpha: k + u + k + u + k,
                                    ratio: "0,40,60",
                                    angle: 0
                                }
                            })), n.toptop && n.toptop.attr("fill", S({
                                FCcolor: {
                                    color: s + u + l,
                                    alpha: k + u + k,
                                    ratio: "0,100",
                                    angle: -65
                                }
                            }))) : (s = W(p, 80), d = W(p, 70), l = V(p, 80), g = "0," + k, q = p + u + d, r = 5 / (r.R1 * r.r3dFactor) * 100, n.centerLight.attr("fill", S({
                                FCcolor: {
                                    color: q,
                                    alpha: g,
                                    ratio: "0,100",
                                    angle: 0
                                }
                            })), n.centerLight1.attr("fill", S({
                                FCcolor: {
                                    color: q,
                                    alpha: g,
                                    ratio: "0,100",
                                    angle: 180
                                }
                            })), n.topLight.attr("fill", S({
                                FCcolor: {
                                    color: d + u + d + u + p + u + p,
                                    alpha: k + u + k + u + 0 + u + 0,
                                    ratio: "0,50," + r + u + (50 - r),
                                    angle: -45
                                }
                            })), n.topLight1.attr("fill",
                                S({
                                    FCcolor: {
                                        color: d + u + p + u + l,
                                        alpha: k + u + k + u + k,
                                        ratio: "0,50,50",
                                        angle: 0
                                    }
                                })), n.front.attr("fill", S({
                                FCcolor: {
                                    color: p + u + p + u + l + u + l,
                                    alpha: k + u + k + u + k + u + k,
                                    ratio: "0,50,0,50",
                                    angle: 0
                                }
                            })), n.toptop.attr("fill", S({
                                FCcolor: {
                                    color: s + u + p + u + l + u + l,
                                    alpha: k + u + k + u + k + u + k,
                                    ratio: "0,25,30,45",
                                    angle: -45
                                }
                            })))))
                        }
                        return n
                    },
                    d = function() {
                        var a = this.shadowElement;
                        d && a.shadow.apply(a, arguments)
                    };
                return function(a, f, m, g, n, p, k, l, s, q, v) {
                    var t = this.layers.dataset;
                    lb(a) && (f = a.y, m = a.R1, g = a.R2, n = a.h, p = a.r3dFactor, k = a.gStr, l = a.is2D, s = a.renderer,
                        v = a.isHollow, q = a.isFunnel, a = a.x);
                    p = h(p, .15);
                    a = {
                        x: a,
                        y: f,
                        R1: m,
                        R2: g,
                        h: n,
                        r3dFactor: p,
                        is2D: l,
                        isHollow: v,
                        isFunnel: q,
                        renderer: s
                    };
                    f = e(a);
                    k = s.group(k, t);
                    k.Shapeargs = f;
                    k.shadowElement = s.path(f.silhuette, k).attr({
                        fill: ha,
                        stroke: "none"
                    });
                    k._attr = k.attr;
                    k.attr = c;
                    k.shadow = d;
                    k._3dAttr = a;
                    q ? l ? k.funnel2D = s.path(f.silhuette, k) : (k.back = s.path(f.back, k).attr({
                            "stroke-width": 0,
                            stroke: "none"
                        }), k.front = s.path(f.front, k).attr({
                            "stroke-width": 0,
                            stroke: "none"
                        }), f.top && (k.toptop = s.path(f.top, k).attr({
                            "stroke-width": 0,
                            stroke: "none"
                        }))) :
                        l ? (k.lighterHalf = s.path(f.lighterHalf, k).attr({
                            "stroke-width": 0
                        }), k.darkerHalf = s.path(f.darkerHalf, k).attr({
                            "stroke-width": 0
                        }), k.borderElement = s.path(f.silhuette, k).attr({
                            fill: ha,
                            stroke: "none"
                        })) : (k.front = s.path(f.front, k).attr({
                            "stroke-width": 0
                        }), k.centerLight = s.path(f.centerLight, k).attr({
                            "stroke-width": 0
                        }), k.centerLight1 = s.path(f.centerLight1, k).attr({
                            "stroke-width": 0
                        }), k.toptop = s.path(f.top, k).attr({
                            "stroke-width": 0
                        }), k.topLight = s.path(f.topLight, k).attr({
                            "stroke-width": 0
                        }), k.topLight1 = s.path(f.topLight1,
                            k).attr({
                            "stroke-width": 0
                        }));
                    return k
                }
            }(),
            getPlotData: function(a) {
                var e = this.datasets[0],
                    c = e.data[a],
                    d = e.userData || (e.userData = []),
                    e = "y name color alpha borderColor borderWidth link displayValue toolText".split(" "),
                    b;
                if (d[a]) a = d[a];
                else {
                    a = d[a] = {};
                    for (d = 0; d < e.length; d++) a[b = e[d]] = c[b];
                    a.value = a.y;
                    a.label = a.name;
                    delete a.y;
                    delete a.name
                }
                return a
            },
            translate: function() {
                var a = this.datasets[0],
                    e = a.data,
                    c = this.canvasWidth / 2,
                    d = this.canvasHeight,
                    b = e.length - 1,
                    f = e[0],
                    m = f && e[b].y,
                    g = f && e[0].y,
                    n, p, k, l, s = this.canvasTop,
                    q = a.yScale,
                    v = a.isHollow,
                    t = a.is2d,
                    u = 0,
                    w = this.paper,
                    z = {},
                    y = a.streamlinedData,
                    A = a.labelDistance,
                    x = .8 / d,
                    C, J = 0,
                    B = c + this.canvasLeft,
                    D = a.showLabelsAtCenter,
                    F = .3 * h(parseInt(this.options.plotOptions.series.dataLabels.style.fontSize, 10), 10);
                n = y ? d / (g - m) : g ? d / g : d;
                p = c;
                Cb(e, function(d, f) {
                    (d.x = f) ? (d.isSliced && (C = d.x, 1 < C && !z[C] && (z[C] = !0, J += 1), C < b && (z[C + 1] = !0, J += 1)), y ? (k = 1 == a.useSameSlantAngle ? g ? c * d.y / g : c : g ? c * kb(d.y / g) : c, l = n * (e[f - 1].y - d.y) || 1) : (u += l = n * e[f].y, k = c * (1 - u * x)), d.shapeArgs = {
                        x: B,
                        y: s,
                        R1: p,
                        R2: k,
                        h: l || 1,
                        r3dFactor: q,
                        isHollow: v,
                        gStr: "point",
                        is2D: t,
                        renderer: w,
                        isFunnel: !0
                    }, D ? (d.labelAline = "middle", d.labelX = B, d.labelY = (t ? s : s + q * p) + l / 2 + F) : (d.labelAline = "start", d.labelX = B + A + k + 3, d.labelY = s + F + l), s += l, p = k) : (k = 1 == a.useSameSlantAngle ? g ? c * e[0].y / g : c : g ? c * kb(e[0].y / g) : c, d.labelWidht > 2 * k ? (d.labelAline = "start", d.labelX = 0) : (d.labelAline = "middle", d.labelX = B), d.labelY = (t ? s : s - q * p) - F - 3);
                    d.plotX = B;
                    d.plotY = s
                });
                a._temp = {
                    slicingGapPosition: z,
                    noOfGap: J
                }
            },
            drawPlotFunnel: function(a, e) {
                this.translate();
                var c = this,
                    d = a.items,
                    b = a.data,
                    f = c.options,
                    h = f.plotOptions,
                    g = c.elements.plots[0],
                    n = h.series.dataLabels,
                    p = c.paper,
                    k = f.tooltip || {},
                    k = k && !1 !== k.enabled,
                    l, h = h.series.animation.duration || 0,
                    q = c.layers,
                    r = q.tracker,
                    q = q.datalabels || (q.datalabels = p.group("datalabels").insertAfter(q.dataset)),
                    v = g.showLabelsAtCenter,
                    t = e._temp || {},
                    u = t.slicingGapPosition,
                    t = t.noOfGap,
                    w = e.SlicingDistance,
                    z, y = w / 2,
                    A = 0,
                    x = f.chart.issliced,
                    f = f.chart.textDirection,
                    C = n.style,
                    C = {
                        fontFamily: C.fontFamily,
                        fontSize: C.fontSize,
                        lineHeight: C.lineHeight,
                        fontWeight: C.fontWeight,
                        fontStyle: C.fontStyle
                    },
                    J = function(a, b) {
                        return function(d) {
                            a.graphic.attr(b);
                            qa.call(this, c, d, "DataPlotRollOver")
                        }
                    },
                    B = function(a, b) {
                        return function(d) {
                            a.graphic.attr(b);
                            qa.call(this, c, d, "DataPlotRollOut")
                        }
                    },
                    D, F, I, M, E, L, K, S;
                if (!(I = c.datasets[0].streamlinedData && 2 > b.length)) {
                    t && (z = Ja(1.5 * y, w / t), A = y);
                    w = function(a) {
                        return function() {
                            c.legendClick(a, !0, !1)
                        }
                    };
                    y = function(a) {
                        return function() {
                            return c.getEventArgs(a)
                        }
                    };
                    S = function(a) {
                        return function() {
                            a.attr({
                                visibility: "visible"
                            })
                        }
                    };
                    b && b.length || (b = []);
                    g.singletonCase = I && 2 == b.length ||
                        1 == b.length;
                    e.data || (e.data = []);
                    for (K = b.length; K--;) M = b[K], D = M.y, F = M.displayValue, l = M.toolText, L = !!M.link, E = x ? 0 : M.isSliced, null !== D && void 0 !== D && M.shapeArgs ? ((I = d[K]) || (e.data[K].plot = I = d[K] = {
                        value: D,
                        displayValue: F,
                        sliced: !!E,
                        chart: c,
                        plotItems: d,
                        seriesData: g,
                        cursor: L ? "pointer" : "",
                        x: M.x,
                        index: K,
                        graphic: c.pyramidFunnelShape(M.shapeArgs).attr({
                            fill: M.color,
                            opacity: 0,
                            "stroke-width": M.borderWidth,
                            stroke: M.borderColor
                        }),
                        dataLabel: p.text(q).attr({
                            text: F,
                            title: M.originalText || "",
                            ishot: !0,
                            cursor: L ? "pointer" : "",
                            direction: f,
                            x: 0,
                            y: 0
                        }).css(C),
                        trackerObj: p.path(r)
                    }, e.data[K].legendClick = w(I), e.data[K].getEventArgs = y(I), D = F = {}, M.hoverEffects && (D = {
                        color: M.color,
                        opacity: M.alpha,
                        "stroke-width": M.borderWidth,
                        stroke: M.borderColor
                    }, F = M.rolloverProperties, F = {
                        color: F.color,
                        opacity: F.alpha,
                        "stroke-width": F.borderWidth,
                        stroke: F.borderColor
                    }), !M.doNotSlice && I.trackerObj.click(c.slice, I), I.trackerObj.mouseup(c.plotMouseUp, I), I.trackerObj.hover(J(I, F), B(I, D)), I.dataLabel.hover(J(I, F), B(I, D)), k && I.trackerObj.tooltip(l), !M.doNotSlice && I.dataLabel.click(c.slice, I), I.dataLabel.mouseup(c.plotMouseUp, I), v && 0 === K && "funnel" == c.type && g.streamlinedData || (I.connector = p.path(q).attr({
                        "stroke-width": n.connectorWidth,
                        stroke: n.connectorColor,
                        ishot: !0,
                        cursor: L ? "pointer" : ""
                    }).click(c.slice, I).mouseup(c.plotMouseUp, I).hover(J(I, F), B(I, D))), I.dy = 0, t && (A && (I._startTranslateY = l = "t0," + A, I.dy = I.DistanceAvailed = A, I.graphic.attr({
                        transform: l
                    }), I.dataLabel.attr({
                        transform: l
                    }), I.connector.attr({
                        transform: l
                    })), u[M.x] && (A -= z))), h ? (q.attr({
                            visibility: "hidden"
                        }),
                        I.graphic.animate({
                            opacity: M.alpha
                        }, h, "easeIn", K === b.length - 1 && S(q))) : I.graphic.attr({
                        opacity: M.alpha
                    })) : e.data[K].plot = d[K] = {
                        dataLabel: p.text(q).attr({
                            text: F,
                            title: M.originalText || "",
                            direction: f,
                            x: 0,
                            y: 0
                        }).css(C)
                    };
                    c.drawDataLabels();
                    c.drawTracker(a, e)
                }
            },
            slice: function(a, e, c, d) {
                var b = this.chart;
                a = b.datasets[0].SlicingDistance / 2;
                c = e = 0;
                var f = this.plotItems,
                    h = f.length,
                    g, n, p, k, l, q, r, v;
                q = {
                    hcJSON: {
                        chart: {
                            issliced: !1
                        },
                        series: []
                    }
                };
                q.hcJSON.series[0] = {
                    data: p = []
                };
                d = this.sliced = $(d) ? d : !this.sliced;
                r = -a;
                v = function(a,
                    c) {
                    return function() {
                        Ga.raiseEvent("SlicingEnd", {
                            slicedState: a,
                            data: b.getPlotData(c)
                        }, b.logic.chartInstance)
                    }
                };
                for (e = 0; e < h; e += 1) n = f[e], n !== this ? (n.sliced = !1, p[e] = {
                    isSliced: !1
                }, k = !1) : (p[e] = {
                    isSliced: d
                }, k = !0, l = e), n.graphic && (g = n.dy, g = -g, d && (n.x < this.x ? (g += r, c += 1) : n.x == this.x ? c ? e == h - 1 && (g += .5 * a) : g += .5 * -a : g += a), n.graphic.attr({
                    transform: "t0," + n.dy
                }), n.dy += g, g = {
                    transform: "...t0," + g
                }, k && Ga.raiseEvent("SlicingStart", {
                    slicedState: !d,
                    data: b.getPlotData(l)
                }, b.logic.chartInstance), n.graphic.animate(g, 300, "easeIn",
                    k && v(d, l)), n.dataLabel && n.dataLabel.animate(g, 300, "easeIn"), n.connector && n.connector.animate(g, 300, "easeIn"), n.trackerObj && n.trackerObj.animate(g, 300, "easeIn"), 1 == e && !f[0].graphic && f[0].dataLabel && f[0].dataLabel.animate(g, 300, "easeIn"));
                T(b.logic.chartInstance.jsVars._reflowData, q, !0)
            },
            drawDataLabels: function() {
                var a = this.datasets[0],
                    e = a.data,
                    c = this.options.plotOptions.series.dataLabels,
                    d = this.elements.plots[0].items,
                    b, f, m, g, n = a.showLabelsAtCenter,
                    p = Number(c.style.lineHeight.split(/px/)[0]),
                    k = h(parseInt(c.style.fontSize,
                        10), 10),
                    l = .3 * k,
                    q = .3 * p,
                    r, v, t, u, w, z = a.labelDistance,
                    y, A;
                for (w = e.length - 1; 0 <= w; --w) g = e[w], A = g.displayValue, c = d[w], f = g.labelY, b = g.labelX, m = g.labelAline, y = g.style, k = h(parseInt(y.fontSize, 10), 10), l = .3 * k, k = {
                    fontFamily: y.fontFamily,
                    fontSize: y.fontSize,
                    lineHeight: y.lineHeight,
                    fontWeight: y.fontWeight,
                    fontStyle: y.fontStyle
                }, n ? f = 0 === w && "funnel" == this.type && a.streamlinedData ? f - q + (d[1].DistanceAvailed || 0) : f - q + (c.DistanceAvailed || 0) : (u = t = f - l, void 0 !== r && void 0 !== v && v - t < p && (u = v - p, f = u + l), r = g.plotY, v = u, "undefined" ===
                    typeof A || A === L || 0 === w && "funnel" == this.type && a.streamlinedData || (g = b - 3, l = g - z, g = ["M", l, t, "L", g, u], c.connector.attr({
                        path: g,
                        "shape-rendering": t === u && 1 > u ? "crisp" : ""
                    })), f = 0 === w && "funnel" == this.type && a.streamlinedData ? f + (d[1].DistanceAvailed || 0) : u + (c.DistanceAvailed || 0)), A !== L && c.dataLabel.attr({
                    transform: "t" + b + "," + f,
                    "text-anchor": sa[m],
                    text: A,
                    fill: y.color,
                    "font-size": y.fontSize,
                    "text-bound": [y.backgroundColor, y.borderColor, y.borderThickness, y.borderPadding, y.borderRadius, y.borderDash]
                }).css(k)
            },
            drawTracker: function(a) {
                var e =
                    this.paper,
                    c = a.items;
                a = a.data;
                for (var d, b, f = +new Date, h = a.length - 1, g, n = this.layers.tracker, p; 0 <= h; --h) g = c[h], p = a[h], b = g.trackerObj, g.graphic && (d = g.graphic.Shapeargs.silhuette, p = {
                    link: p.link,
                    value: p.y,
                    displayValue: p.displayValue,
                    categoryLabel: p.categoryLabel,
                    toolText: p.toolText
                }, b ? b.attr({
                    path: d,
                    isTracker: f,
                    fill: ha,
                    stroke: "none",
                    transform: "t0," + (g._startTranslateY || 0),
                    ishot: !0,
                    cursor: g.cursor
                }) : g.trackerObj = e.path(d, n).attr({
                    isTracker: f,
                    fill: ha,
                    stroke: "none",
                    transform: "t0," + (g._startTranslateY || 0),
                    ishot: !0,
                    cursor: g.cursor
                }), b.data("eventArgs", p))
            },
            getEventArgs: function(a) {
                return a.chart.getPlotData(a.index)
            },
            legendClick: function(a) {
                var e = a.chart;
                e.slice.call(e.plots[0].items[a.index])
            },
            plotMouseUp: function(a) {
                qa.call(this.trackerObj, this.chart, a)
            }
        }, w["renderer.piebase"]);
        w("renderer.pyramid", {
            type: "pyramid",
            translate: function() {
                var a = this.datasets[0],
                    e = a.data,
                    c = this.canvasWidth / 2,
                    d = this.canvasHeight,
                    b = e.length - 1,
                    f, m, g = this.canvasTop,
                    n = a.yScale,
                    p = a.is2d,
                    k = this.paper,
                    l = a.valueSum ? a.valueSum :
                    1,
                    q = 0,
                    r, v = {},
                    t = 0,
                    u = a.labelDistance,
                    w = a.showLabelsAtCenter,
                    z = .3 * h(parseInt(this.options.plotOptions.series.dataLabels.style.fontSize, 10), 10),
                    y = this.canvasLeft + c,
                    A = d / l,
                    x = 0;
                Cb(e, function(a, d) {
                    a.x = d;
                    a.isSliced && ((r = a.x) && !v[r] && (v[r] = !0, t += 1), r < b && (v[r + 1] = !0, t += 1));
                    q += a.y;
                    f = c * q / l;
                    m = A * a.y;
                    a.shapeArgs = {
                        x: y,
                        y: g,
                        R1: x,
                        R2: f,
                        h: m,
                        r3dFactor: n,
                        gStr: "point",
                        is2D: p,
                        renderer: k
                    };
                    w ? (a.labelAline = "middle", a.labelX = y, a.labelY = (p ? g : g + n * x) + m / 2 + z) : (a.labelAline = "start", a.labelX = y + u + (x + f) / 2 + 3, a.labelY = g + z + m / 2);
                    g += m;
                    a.plotX =
                        y;
                    a.plotY = g - m / 2;
                    x = f
                });
                a._temp = {
                    slicingGapPosition: v,
                    noOfGap: t
                }
            },
            drawPlotPyramid: function(a, e) {
                this.translate();
                var c = this,
                    d = a.items,
                    b = a.data,
                    f = c.options,
                    h = f.plotOptions,
                    g = c.elements.plots[0],
                    n = c.datasets[0],
                    p = h.series.dataLabels,
                    k = g.showLabelsAtCenter,
                    h = h.series.animation.duration || 0,
                    l = c.paper,
                    q = f.tooltip || {},
                    q = q && !1 !== q.enabled,
                    r, v = c.layers,
                    t = v.tracker,
                    v = v.datalabels || (v.datalabels = l.group("datalabels").insertAfter(v.dataset)),
                    u = n._temp || {},
                    w = u.slicingGapPosition,
                    u = u.noOfGap,
                    z = n.SlicingDistance,
                    y, A = z / 2,
                    n = 0,
                    x = f.chart.issliced,
                    f = f.chart.textDirection,
                    C = p.style,
                    C = {
                        fontFamily: C.fontFamily,
                        fontSize: C.fontSize,
                        lineHeight: C.lineHeight,
                        fontWeight: C.fontWeight,
                        fontStyle: C.fontStyle
                    },
                    D = function(a, b) {
                        return function(d) {
                            a.graphic.attr(b);
                            qa.call(this, c, d, "DataPlotRollOver")
                        }
                    },
                    B = function(a, b) {
                        return function(d) {
                            a.graphic.attr(b);
                            qa.call(this, c, d, "DataPlotRollOut")
                        }
                    },
                    F, L, I, M, E, K, S, O;
                K = function(a) {
                    return function() {
                        c.legendClick(a, !0, !1)
                    }
                };
                S = function(a) {
                    return function() {
                        return c.getEventArgs(a)
                    }
                };
                O = function(a) {
                    return function() {
                        a.attr({
                            visibility: "visible"
                        })
                    }
                };
                u && (y = Ja(1.5 * A, z / u), n = A);
                b && b.length || (b = []);
                g.singletonCase = 1 == b.length;
                for (E = b.length; E--;) A = b[E], F = A.y, L = A.displayValue, r = A.toolText, I = !!A.link, M = x ? 0 : A.isSliced, null !== F && void 0 !== F && A.shapeArgs ? ((z = d[E]) || (e.data[E].plot = z = d[E] = {
                            value: F,
                            sliced: !!M,
                            cursor: I ? "pointer" : "",
                            chart: c,
                            plotItems: d,
                            seriesData: g,
                            x: A.x,
                            index: E,
                            graphic: c.pyramidFunnelShape(A.shapeArgs).attr({
                                fill: A.color,
                                opacity: h ? 0 : A.alpha,
                                "stroke-width": A.borderWidth,
                                stroke: A.borderColor
                            }),
                            dataLabel: l.text(v).attr({
                                text: L,
                                title: A.originalText ||
                                    "",
                                direction: f,
                                ishot: !0,
                                cursor: I ? "pointer" : "",
                                x: 0,
                                y: 0
                            }).css(C),
                            trackerObj: l.path(t)
                        }, F = L = {}, A.hoverEffects && (F = {
                            color: A.color,
                            opacity: A.alpha,
                            "stroke-width": A.borderWidth,
                            stroke: A.borderColor
                        }, L = A.rolloverProperties, L = {
                            color: L.color,
                            opacity: L.alpha,
                            "stroke-width": L.borderWidth,
                            stroke: L.borderColor
                        }), e.data[E].legendClick = K(z), e.data[E].getEventArgs = S(z), !A.doNotSlice && z.trackerObj.click(c.slice, z), z.trackerObj.mouseup(c.plotMouseUp, z).hover(D(z, L), B(z, F)), q && z.trackerObj.tooltip(r), !A.doNotSlice &&
                        z.dataLabel.click(c.slice, z), z.dataLabel.mouseup(c.plotMouseUp, z).hover(D(z, L), B(z, F)), k && 0 === E && "funnel" == c.type && g.streamlinedData || (z.connector = l.path(v).attr({
                            "stroke-width": p.connectorWidth,
                            stroke: p.connectorColor,
                            ishot: !0,
                            cursor: I ? "pointer" : ""
                        }).click(c.slice, z).mouseup(c.plotMouseUp, z).hover(D(z, L), B(z, F))), z.dy = 0, u && (n && (z._startTranslateY = r = "t,0," + n, z.dy = z.DistanceAvailed = n, z.graphic.attr({
                            transform: r
                        }), z.dataLabel.attr({
                            transform: r
                        }), z.connector.attr({
                            transform: r
                        })), w[A.x] && (n -= y))), h &&
                    (v.attr("visibility", "hidden"), z.graphic.animate({
                        opacity: A.alpha
                    }, h, "easeIn", E === b.length - 1 && O(v)))) : e.data[E].plot = d[E] = {
                    dataLabel: l.text(v).attr({
                        text: L,
                        title: A.originalText || "",
                        direction: f,
                        x: 0,
                        y: 0
                    }).css(C)
                };
                c.drawDataLabels();
                c.drawTracker(a, e)
            }
        }, w["renderer.funnel"]);
        w("renderer.sparkline", {
            callbacks: [function() {
                if (!this.options.nativeMessage) {
                    var a = this.options,
                        e = this.layers,
                        c = this.paper,
                        d = a.series[0] && a.series[0].data && a.series[0].data[0],
                        b = e.limitlabels,
                        f = this.smartLabel,
                        a = a.chart,
                        h = a.highLowValue.highLabel,
                        g = a.highLowValue.lowLabel,
                        n = a.valuePadding,
                        p = this.canvasHeight / 2,
                        k;
                    d && (b || (b = e.limitlabels = c.group("limitlabels").insertAfter(e.dataset)), b.translate(this.canvasLeft, this.canvasTop), $(a.openValue.label) && (d.openValue = c.text(-n, p, a.openValue.label, b).attr({
                        direction: a.textDirection,
                        "text-anchor": sa[bb]
                    }).css(a.openValue.style)), e = a.closeValue.label, k = this.canvasWidth + n, $(e) && (d.closeValue = c.text(this.canvasWidth + n, p, e, b).attr({
                            direction: a.textDirection,
                            "text-anchor": sa[Ia]
                        }).css(a.closeValue.style),
                        f.setStyle(a.closeValue.style), k += f.getOriSize(e).width + n), $(h) && (c.text(k, p, "[", b).attr({
                        direction: a.textDirection,
                        "text-anchor": sa[Ia]
                    }).css(a.highLowValue.style), f.setStyle(a.highLowValue.style), k += f.getOriSize("[").width + 1, d.highLabel = c.text(k, p, h, b).attr({
                        direction: a.textDirection,
                        "text-anchor": sa[Ia]
                    }).css(a.highLowValue.style).css({
                        color: a.highColor
                    }), k += f.getOriSize(h).width + 1), $(g) && (c.text(k, p, "|", b).attr({
                            direction: a.textDirection,
                            "text-anchor": sa[Ia]
                        }).css(a.highLowValue.style), k += f.getOriSize("|").width +
                        1, d.dataLabel = c.text(k, p, g, b).attr({
                            direction: a.textDirection,
                            "text-anchor": sa[Ia]
                        }).css(a.highLowValue.style).css({
                            color: a.lowColor
                        }), k += f.getOriSize(g).width + 1, c.text(k, p, "]", b).attr({
                            direction: a.textDirection,
                            "text-anchor": sa[Ia]
                        }).css(a.highLowValue.style)))
                }
            }]
        }, w["renderer.cartesian"]);
        w("renderer.sparkwinloss", {
            callbacks: [function() {
                if (!this.options.nativeMessage) {
                    var a = this.options,
                        e = this.layers,
                        c = this.paper,
                        d = a.series[0] && a.series[0].data && a.series[0].data[0],
                        b = e.limitlabels,
                        f = a.plotOptions.series.dataLabels &&
                        a.plotOptions.series.dataLabels.style || {},
                        a = a.chart,
                        h = a.closeValue.label,
                        g = {
                            fontFamily: f.fontFamily,
                            fontSize: f.fontSize,
                            lineHeight: f.lineHeight,
                            fontWeight: f.fontWeight,
                            fontStyle: f.fontStyle
                        };
                    d && (b || (b = e.limitlabels = c.group("limitlabels").insertAfter(e.dataset)), b.translate(this.canvasLeft, this.canvasTop), $(h) && h !== L && (d.dataLabel = c.text(this.canvasWidth + a.valuePadding, this.canvasHeight / 2, h, b).attr({
                        "text-anchor": sa[Ia],
                        fill: f.color,
                        direction: a.textDirection,
                        "text-bound": [f.backgroundColor, f.borderColor,
                            f.borderThickness, f.borderPadding, f.borderRadius, f.borderDash
                        ]
                    }).css(g)))
                }
            }]
        }, w["renderer.cartesian"]);
        w("renderer.realtimecartesian", {
            updatePlotColumn: function(a, e, c) {
                var d = this,
                    b = a.data,
                    f = b.length,
                    m = a.items,
                    g = a.graphics || (a.graphics = []),
                    n = d.paper,
                    p = d.layers,
                    k = d.options,
                    l = k.chart,
                    q = !1 !== (k.tooltip || {}).enabled,
                    r = d.definition.chart,
                    k = k.plotOptions.series,
                    v = d.xAxis[e.xAxis || 0],
                    t = d.yAxis[e.yAxis || 0],
                    u = d.logic.isStacked,
                    w = e.numColumns || 1,
                    z = e.columnPosition || 0,
                    y = l.canvasBorderOpacity = Aa.color(l.plotBorderColor).opacity,
                    A = d.canvasBorderWidth,
                    y = l.isCanvasBorder || (l.isCanvasBorder = 0 !== y && 0 < A),
                    x, A = !1 === e.visible ? "hidden" : "visible",
                    C = l.overlapColumns,
                    D = v.getAxisPosition(0),
                    D = v.getAxisPosition(1) - D,
                    B = r && r.plotspacepercent,
                    F = k.groupPadding,
                    K = k.maxColWidth,
                    r = h(r && r.plotpaddingpercent),
                    B = (1 - .01 * B) * D || Ja(D * (1 - 2 * F), K * w),
                    D = B / 2,
                    B = B / w,
                    C = Ja(B - 1, 1 < w ? C || void 0 !== r ? 0 < r ? B * r / 100 : 0 : 4 : 0),
                    w = B - C,
                    z = z * B - D + C / 2,
                    D = t.max,
                    B = t.min,
                    C = 0 < D && 0 <= B,
                    r = 0 >= D && 0 > B,
                    D = 0 > D && 0 > B ? D : 0 < D && 0 < B ? B : 0,
                    l = h(l.useRoundEdges, 0),
                    I = p.dataset = p.dataset || n.group("dataset-orphan"),
                    p = p.tracker,
                    B = d.canvasTop,
                    F = d.canvasLeft,
                    K = d.canvasBottom,
                    M = d.canvasRight,
                    E, O, T, W, N, U, R, V, P, ja, Z, X, da, Y, aa;
                da = function(a, b) {
                    return function(c) {
                        a.attr(b);
                        qa.call(this, d, c, "dataplotrollover")
                    }
                };
                Y = function(a, b) {
                    return function(c) {
                        a.attr(b);
                        qa.call(this, d, c, "dataplotrollout")
                    }
                };
                aa = function(a) {
                    qa.call(this, d, a)
                };
                u && (Z = I.shadows || (I.shadows = n.group("shadows", I).toBack()));
                I = I.column = I.column || n.group("columns", I);
                if (X = c.numUpdate || 0)
                    for (c = 0; c < X; c += 1)(E = m.shift()) && delete E._state, m.push(E);
                for (c = 0; c < f; c +=
                    1)
                    if (P = c + X, O = b[c], U = O.y, E = h(O.x, c), V = v.getAxisPosition(E) + z, E = m[c], N = O.toolText, T = O.link, W = O.displayValue || L, x = Rb(O.borderWidth) || 0, R = {
                            index: c,
                            link: T,
                            value: U,
                            displayValue: O.displayValue,
                            categoryLabel: O.categoryLabel,
                            toolText: N,
                            id: a.userID,
                            datasetIndex: a.index,
                            datasetName: a.name,
                            visible: a.visible
                        }, P >= f && (E || (E = m[c] = {
                            index: c,
                            value: U,
                            width: w,
                            graphic: null,
                            dataLabel: null,
                            tracker: null
                        }), E && (E.valueBelowPlot = 0 > U), P = ja = {}, O.hoverEffects && (P = {
                                fill: S(O.color),
                                stroke: S(O.borderColor),
                                "stroke-width": x,
                                "stroke-dasharray": O.dashStyle
                            },
                            ja = O.rolloverProperties, ja = {
                                fill: S(ja.color),
                                stroke: S(ja.borderColor),
                                "stroke-width": ja.borderWidth,
                                "stroke-dasharray": ja.dashStyle
                            }), E.graphic || (E.graphic = n.rect(I).attr({
                            visibility: A
                        }), g.push(E.graphic), E.graphic.shadow(k.shadow && O.shadow, Z)), E.graphic.attr({
                            r: l,
                            fill: S(O.color || ""),
                            stroke: S(O.borderColor || ""),
                            "stroke-width": x,
                            "stroke-dasharray": O.dashStyle,
                            "stroke-linejoin": "miter"
                        }), E.tracker || (E.tracker = n.rect(p).attr({
                            stroke: ha,
                            fill: ha,
                            visibility: A
                        }), g.push(E.tracker)), E._attrHoverInFn && E.tracker.unhover(E._attrHoverInFn,
                            E._attrHoverOutFn), E._attrClickFn && E.tracker.unclick(E._attrClickFn), E.tracker.attr({
                            height: 0,
                            width: 0,
                            r: l,
                            "stroke-width": x,
                            stroke: ha,
                            cursor: T ? "pointer" : "",
                            ishot: !0
                        }).data("eventArgs", R).click(E._attrClickFn = aa).hover(E._attrHoverInFn = da(E.graphic, ja), E._attrHoverOutFn = Y(E.graphic, P)).tooltip(N)), E && (E.index = c), null === U) E && (E.graphic && E.graphic.attr({
                        height: 0,
                        "stroke-width": 0
                    }), E.tracker && E.tracker.attr({
                        height: 0,
                        "stroke-width": 0
                    }), E.dataLabel && E.dataLabel.attr({
                        text: ""
                    }));
                    else if (R = O.previousY, P =
                    t.getAxisPosition(R || D), O = t.getAxisPosition(U + (R || 0)), N = vb(O - P), 0 > U && (O = P), Sb(O) <= B && (N -= B - O - +y, O = B - +y), ka(O + N) >= K && (N -= ka(O + N) - K + +!!x + +y), 1 >= x && (ka(V) <= F && (w += V, V = F - x / 2 + +!!x - +y, w -= V), ka(V + w) >= M && (w = M - V + x / 2 - +!!x + +y)), P = Aa.crispBound(V, O, w, N, x), V = P.x, O = P.y, w = P.width, N = P.height, y && !$(R) && (r ? (x = O - (B - x / 2), N += x, O -= x) : C && (N = K - O + x / 2)), 1 >= N && (N = 1, O += 0 > U ? 0 : -N), E && E.graphic && (E.graphic.attr({
                        x: V,
                        y: O,
                        width: w,
                        height: N
                    }).data("BBox", P), E.dataLabel && E.dataLabel.attrs.text !== W && E.dataLabel.attr({
                        text: W
                    }), d.drawPlotColumnLabel(a,
                        e, c, V, O), T || q)) !u && N < yb && (O -= (yb - N) / 2, N = yb), E.tracker && E.tracker.attr({
                    x: V,
                    y: O,
                    width: w,
                    height: N
                });
                return a
            },
            updatePlotLine: function(a, e, c) {
                var d = this,
                    b = d.paper,
                    f = d.options,
                    m = f.chart,
                    g = f.plotOptions.series,
                    n = a.items,
                    p = a.graphics || (a.graphics = []),
                    k, l = d.xAxis[e.xAxis || 0],
                    q = d.yAxis[e.yAxis || 0],
                    r = !1 !== (f.tooltip || {}).enabled,
                    f = a.data,
                    v = !1 === e.visible ? "hidden" : "visible",
                    t = f.length,
                    w = g.connectNullData,
                    y, z, D, A, x, C, F, B = null,
                    K, O = e.lineWidth,
                    I = e.color,
                    M, E, T, V, W, N, U, R, X, P, ja = d.layers,
                    Z = ja.dataset = ja.dataset ||
                    b.group("dataset-orphan"),
                    ja = ja.tracker,
                    $, Y, ca, aa, ea, fa, na, ia, ga, ma, ka, oa, pa, sa;
                ma = function(a) {
                    qa.call(this, d, a)
                };
                ka = function(a) {
                    return function(b) {
                        d.hoverPlotAnchor(this, b, "DataPlotRollOver", a, d)
                    }
                };
                oa = function(a) {
                    return function(b) {
                        d.hoverPlotAnchor(this, b, "DataPlotRollOut", a, d)
                    }
                };
                sa = function(b, c, f, g, h, k, l, m, n) {
                    return function() {
                        var k = f.imageUrl,
                            q = f.imageScale,
                            s = f.imageAlpha,
                            t = l.imageHoverAlpha,
                            u = l.imageHoverScale,
                            w = this.width * q * .01,
                            x = this.width * u * .01;
                        X = {
                            x: b - this.width * q * .005,
                            y: c - this.height * q * .005,
                            width: w,
                            height: this.height * q * .01,
                            alpha: s
                        };
                        P = {
                            x: b - this.width * u * .005,
                            y: c - this.height * u * .005,
                            width: x,
                            height: this.height * u * .01,
                            alpha: t
                        };
                        t = x > w ? P : X;
                        g.graphic && g.graphic.attr(X).attr("src", k).css({
                            opacity: .01 * s
                        }).data("alwaysInvisible", 0 === q).data("setRolloverProperties", l).data("setRolloverAttr", P).data("setRolloutAttr", X).data("anchorRadius", q).data("anchorHoverRadius", u);
                        if (n || r || l) g.tracker.attr(t).attr({
                            cursor: n ? "pointer" : "",
                            stroke: ha,
                            "stroke-width": f.lineWidth,
                            fill: ha,
                            ishot: !0,
                            visibility: v
                        }).data("eventArgs",
                            h), d.drawTracker && d.drawTracker.call(d, a, e, m);
                        ($ = g.dataLabel = d.drawPlotLineLabel(a, e, m, b, c)) && p.push($)
                    }
                };
                pa = function(b, c, f, g, h, k, l, m) {
                    return function() {
                        ($ = g.dataLabel = d.drawPlotLineLabel(a, e, m, b, c)) && p.push($)
                    }
                };
                Y = Z.line || (Z.line = b.group("line-connector", Z));
                ca = a.lineShadowLayer || (a.lineShadowLayer = b.group("connector-shadow", Y));
                aa = a.anchorShadowLayer || (a.anchorShadowLayer = b.group("anchor-shadow", Y));
                Z = a.lineLayer || (a.lineLayer = b.group("connector", Y));
                Y = a.anchorLayer || (a.anchorLayer = b.group("anchors",
                    Y));
                if (na = c.numUpdate || 0)
                    for (c = 0; c < na; c += 1)(k = n.shift()) && delete k._state, n.push(k);
                for (c = 0; c < t; c += 1)
                    if (fa = c + na, y = f[c], C = y.y, x = h(y.x, c), x = l.getAxisPosition(x), A = y.toolText, z = y.link, D = y.displayValue || L, E = y.marker || {}, T = V = E.radius || 0, ea = E.shadow, W = E.lineWidth || 0, N = E.fillColor || "", U = E.lineColor || "", k = E.imageUrl, ga = !!k, k = n[c], k._state || (k._state = {}), fa >= t && (k || (k = n[c] = {
                            index: c,
                            value: C,
                            graphic: null,
                            connector: null,
                            dataLabel: null,
                            tracker: null
                        }), k.graphic && "image" === k.graphic.type && !ga && (k.graphic && k.graphic.remove(),
                            k.tracker && k.tracker.remove(), k.graphic = k.tracker = null), k.graphic || (k.graphic = (ga ? b.image(Y) : b.polypath(Y)).attr({
                            visibility: v
                        }), p.push(k.graphic)), ga || k.graphic.attr({
                            fill: S(N),
                            "stroke-width": W,
                            stroke: S(U)
                        }), k.connector || (k.connector = b.path(Z).attr({
                            visibility: v
                        }), k.connector.shadow(g.shadow && y.shadow, ca), p.push(k.connector)), k.connector.attr({
                            "stroke-dasharray": M,
                            stroke: S(K || I),
                            "stroke-width": O,
                            "stroke-linecap": "round",
                            "stroke-linejoin": 2 < O ? "round" : "miter"
                        }), k.tracker || (k.tracker = (ga ? b.rect(ja) :
                            b.circle(ja)).attr({
                            stroke: ha,
                            fill: ha,
                            visibility: v
                        }), p.push(k.tracker)), V = va(V, R && R.radius || 0, m.anchorTrackingRadius), ia = {
                            index: c,
                            link: z,
                            value: y.y,
                            displayValue: y.displayValue,
                            categoryLabel: y.categoryLabel,
                            toolText: y.toolText,
                            id: a.userID,
                            datasetIndex: a.index,
                            datasetName: a.name,
                            visible: a.visible
                        }, k._attrClickFn && k.tracker.unclick(k._attrClickFn), k._attrHoverInFn && k.tracker.unhover(k._attrHoverInFn, k._attrHoverOutFn), k.tracker.attr({
                            r: V,
                            "stroke-width": W,
                            stroke: ha,
                            cursor: z ? "pointer" : "",
                            ishot: !0
                        }).data("eventArgs",
                            ia).click(k._attrClickFn = ma).hover(k._attrHoverInFn = ka(k), k._attrHoverOutFn = oa(k)).tooltip(A)), k && (k.index = c), null === C) k && (k.graphic && k.graphic.attr({
                        polypath: [2, 0, 0, 0, 0, 0],
                        "stroke-width": 0
                    }), k.dataLabel && k.dataLabel.attr({
                        text: ""
                    }), k.connector && k.connector.attr({
                        path: "M-9999,-9999Lh-1",
                        "stroke-width": 0
                    }), k.tracker && k.tracker.attr({
                        r: 0,
                        "stroke-width": 0
                    })), 0 === w && (B = null);
                    else {
                        K = q.getAxisPosition(C);
                        if (E && E.enabled)
                            if (M = E.symbol.split("_"), C = k.graphic, X = P = {}, R = y.rolloverProperties, ga) fa >= t ? (M = new da.Image,
                                M.onload = sa(x, K, E, k, ia, A, R, c, z), M.onerror = pa(x, K, E, k, ia, A, R, c), M.src = E.imageUrl) : (P = C.data("setRolloverAttr"), X = C.data("setRolloutAttr"), P && (P.x = x - .5 * P.width, P.y = K - .5 * P.height, C && C.stop(), k.dataLabel && k.dataLabel.stop(), X.x = x - .5 * X.width, X.y = K - .5 * X.height, C.attr(X), k.tracker && k.tracker.attr({
                                x: X.x,
                                y: X.y,
                                fill: ha
                            })));
                            else {
                                if (R = y.rolloverProperties) X = {
                                    polypath: [M[1] || 2, x, K, T, E.startAngle, 0],
                                    fill: S(E.fillColor),
                                    "stroke-width": E.lineWidth,
                                    stroke: S(E.lineColor)
                                }, R = y.rolloverProperties, P = {
                                    polypath: [R.sides ||
                                        2, x, K, R.radius, R.startAngle, R.dip
                                    ],
                                    fill: S(R.fillColor),
                                    "stroke-width": R.lineWidth,
                                    stroke: S(R.lineColor)
                                };
                                C && C.attr({
                                    polypath: [M[1] || 2, x, K, T, E.startAngle, 0],
                                    visibility: 0 === T ? "hidden" : v
                                }).data("isRealtime", !0).data("alwaysInvisible", 0 === T).data("setRolloverProperties", R).data("setRolloverAttr", P).data("setRolloutAttr", X).data("anchorRadius", T).data("anchorHoverRadius", R && R.radius).shadow(ea || !1, aa);
                                (z || r) && k.tracker && k.tracker.attr({
                                    cx: x,
                                    cy: K
                                })
                            }
                        k.dataLabel && k.dataLabel.attrs.text != D && k.dataLabel.attr({
                            text: D
                        });
                        $ = d.drawPlotLineLabel(a, e, c, x, K);
                        null !== B ? (F = ["M", F, u, B], F.push("L", x, u, K), (B = k.connector) && B.attr({
                            path: F,
                            "stroke-width": O
                        })) : k.connector && k.connector.attr({
                            path: "M-9999,-9999Lh-1",
                            "stroke-width": 0
                        });
                        F = x;
                        B = K;
                        K = y.color;
                        M = y.dashStyle || e.dashStyle
                    }
                return a
            },
            updatePlotArea: function(a, e, c) {
                var d = this,
                    b = d.paper,
                    f = d.options,
                    m = f.chart,
                    g = d.logic,
                    n = f.plotOptions.series,
                    p = a.items,
                    k = a.graphics || (a.graphics = []),
                    l, q = d.xAxis[e.xAxis || 0],
                    r = d.yAxis[e.yAxis || 0],
                    v = r.axisData.reversed,
                    t = g.isStacked,
                    w = !1 !== (f.tooltip || {}).enabled,
                    f = "0" === d.definition.chart.drawfullareaborder,
                    g = a.data,
                    y = !1 === e.visible ? "hidden" : "visible",
                    z = g.length,
                    D = n.connectNullData,
                    A, x, C, F, B, K, O, I = r.max,
                    M = r.min,
                    v = r.getAxisPosition(0 < I && 0 < M ? v ? I : M : 0 > I && 0 > M ? v ? M : I : v ? I : 0),
                    I = null,
                    E, M = e.lineWidth,
                    T = e.dashStyle,
                    V = S(e.lineColor),
                    W = 0,
                    N, U, R, X, P, Y, Z, $ = [],
                    ca = [],
                    ea = [],
                    aa = d.layers,
                    ga = aa.dataset = aa.dataset || b.group("dataset-orphan"),
                    aa = aa.tracker,
                    fa, na, ia, ma, ka, oa, pa, sa, ta, xa, wa, ya, Aa, Ba;
                r.yBasePos = v;
                xa = function(a) {
                    qa.call(this, d, a)
                };
                wa = function(a) {
                    return function(b) {
                        d.hoverPlotAnchor(this,
                            b, "DataPlotRollOver", a, d)
                    }
                };
                ya = function(a) {
                    return function(b) {
                        d.hoverPlotAnchor(this, b, "DataPlotRollOut", a, d)
                    }
                };
                Aa = function(b, c, f, g, h, l, m, n, p) {
                    return function() {
                        var l = f.imageUrl,
                            q = f.imageScale,
                            r = f.imageAlpha,
                            s = m.imageHoverAlpha,
                            t = m.imageHoverScale,
                            u = this.width * q * .01,
                            v = this.width * t * .01;
                        Y = {
                            x: b - this.width * q * .005,
                            y: c - this.height * q * .005,
                            width: u,
                            height: this.height * q * .01,
                            alpha: r
                        };
                        Z = {
                            x: b - this.width * t * .005,
                            y: c - this.height * t * .005,
                            width: v,
                            height: this.height * t * .01,
                            alpha: s
                        };
                        s = v > u ? Z : Y;
                        g.graphic && g.graphic.attr(Y).attr("src",
                            l).css({
                            opacity: .01 * r
                        }).data("alwaysInvisible", 0 === q).data("setRolloverProperties", m).data("setRolloverAttr", Z).data("setRolloutAttr", Y).data("anchorRadius", q).data("anchorHoverRadius", t);
                        if (p || w || m) g.tracker.attr(s).attr({
                            cursor: p ? "pointer" : "",
                            stroke: ha,
                            "stroke-width": f.lineWidth,
                            fill: ha,
                            ishot: !0,
                            visibility: y
                        }).data("eventArgs", h), d.drawTracker && d.drawTracker.call(d, a, e, n);
                        (ma = g.dataLabel = d.drawPlotLineLabel(a, e, n, b, c)) && k.push(ma)
                    }
                };
                Ba = function(b, c, f, g, h, l, m, n) {
                    return function() {
                        (ma = g.dataLabel =
                            d.drawPlotLineLabel(a, e, n, b, c)) && k.push(ma)
                    }
                };
                t && (ia = ga.shadows || (ga.shadows = b.group("shadows", ga).toBack()));
                fa = ga.line || (ga.line = b.group("line-connector", ga));
                a.lineShadowLayer || (a.lineShadowLayer = b.group("connector-shadow", fa));
                ga = a.anchorShadowLayer || (a.anchorShadowLayer = b.group("anchor-shadow", fa));
                t = a.lineLayer || (a.lineLayer = b.group("connector", fa));
                fa = a.anchorLayer || (a.anchorLayer = b.group("anchors", fa));
                if (oa = c.numUpdate || 0)
                    for (c = 0; c < oa; c += 1)(l = p.shift()) && delete l._state, p.push(l);
                for (c = 0; c <
                    z; c += 1) ka = c + oa, A = g[c], B = A.y, l = h(A.x, c), E = q.getAxisPosition(l), F = A.toolText, x = A.link, C = A.displayValue || L, N = A.marker || {}, U = O = N.radius || 0, na = N.shadow, K = N.lineWidth || 0, R = N.fillColor || "", X = N.lineColor || "", sa = N.imageUrl, ta = !!sa, l = p[c], ka >= z && (l || (l = p[c] = {
                        index: c,
                        graphic: null,
                        connector: null,
                        dataLabel: null,
                        tracker: null
                    }), l.graphic && "image" === l.graphic.type && !ta && (l.graphic && l.graphic.remove(), l.tracker && l.tracker.remove(), l.graphic = l.tracker = null), l.graphic || (l.graphic = (ta ? b.image(fa) : b.polypath(fa)).attr({
                            visibility: y
                        }),
                        k.push(l.graphic)), ta || l.graphic.attr({
                        fill: S(R),
                        "stroke-width": K,
                        stroke: S(X)
                    }), l.tracker || (l.tracker = (ta ? b.rect(aa) : b.circle(aa)).attr({
                        stroke: ha,
                        fill: ha,
                        visibility: y
                    }), k.push(l.tracker)), O = va(O, P && P.radius || 0, m.anchorTrackingRadius), pa = {
                        index: c,
                        link: x,
                        value: A.y,
                        displayValue: A.displayValue,
                        categoryLabel: A.categoryLabel,
                        toolText: A.toolText,
                        id: a.userID,
                        datasetIndex: a.index,
                        datasetName: a.name,
                        visible: a.visible
                    }, l._attrHoverInFn && l.tracker.unhover(l._attrHoverInFn, l._attrHoverOutFn), l._attrClickFn &&
                    l.tracker.unclick(l._attrClickFn), l.tracker.attr({
                        r: O,
                        "stroke-width": K,
                        cursor: x ? "pointer" : "",
                        ishot: !0
                    }).data("eventArgs", pa).click(l._attrClickFn = xa).hover(l._attrHoverInFn = wa(l), l._attrHoverOutFn = ya(l)).tooltip(F)), l && (l.index = c), null === B ? (l && (l.graphic && l.graphic.attr({
                    polypath: [2, 0, 0, 0, 0, 0],
                    "stroke-width": 0
                }), l.dataLabel && l.dataLabel.attr({
                    text: ""
                }), l.tracker && l.tracker.attr({
                    r: 0,
                    "stroke-width": 0
                })), 0 === D && (I = null, 0 < W && (1 === W ? $.splice(-8, 8) : ($ = $.concat(ca), $.push("Z")), ca = []))) : (x = A.link, K = A.previousY,
                    O = (O = r.getAxisPosition(K) || null) || v, B = r.getAxisPosition(B + (K || 0)), N && N.enabled && (K = N.symbol.split("_"), R = l.graphic, Y = Z = {}, P = A.rolloverProperties, ta && R ? ka >= z ? (ka = new da.Image, ka.onload = Aa(E, B, N, l, pa, F, P, c, x), ka.onerror = Ba(E, B, N, l, pa, F, P, c), ka.src = sa) : (Z = R.data("setRolloverAttr"), Y = R.data("setRolloutAttr"), R && R.stop(), l.dataLabel && l.dataLabel.stop(), Z && (Z.x = E - .5 * Z.width, Z.y = B - .5 * Z.height, Y.x = E - .5 * Y.width, Y.y = B - .5 * Y.height, R.attr(Y), l.tracker && l.tracker.attr({
                        x: Y.x,
                        y: Y.y,
                        fill: ha
                    }))) : (P && (Y = {
                        polypath: [K[1] ||
                            2, E, B, U, N.startAngle, 0
                        ],
                        fill: S(N.fillColor),
                        "stroke-width": N.lineWidth,
                        stroke: S(N.lineColor)
                    }, P = A.rolloverProperties, Z = {
                        polypath: [P.sides || 2, E, B, P.radius, P.startAngle, P.dip],
                        fill: S(P.fillColor),
                        "stroke-width": P.lineWidth,
                        stroke: S(P.lineColor)
                    }), R && R.attr({
                        polypath: [K[1] || 2, E, B, U, N.startAngle, 0],
                        visibility: 0 === U ? "hidden" : y
                    }).data("isRealtime", !0).data("alwaysInvisible", 0 === U).data("setRolloverProperties", P).data("setRolloverAttr", Z).data("setRolloutAttr", Y).data("anchorRadius", U).data("anchorHoverRadius",
                        P && P.radius).shadow(na || !1, ga), (x || w) && l.tracker && l.tracker.attr({
                        cx: E,
                        cy: B
                    }))), l.dataLabel && l.dataLabel.attrs.text !== C && l.dataLabel.attr({
                        text: C
                    }), ma = d.drawPlotLineLabel(a, e, c, E, B), null === I ? (ea.push("M", E, u, B), $.push("M", E, u, O), W = 0) : ea.push("L", E, u, B), $.push("L", E, u, B), ca.unshift("L", E, u, O), W++, I = B);
                0 < W && (1 === W ? $.splice(-8, 8) : ($ = $.concat(ca), $.push("Z")));
                a.graphic || (a.graphic = b.path(void 0).attr({
                    "stroke-dasharray": T,
                    "stroke-width": f ? 0 : M,
                    stroke: V,
                    "stroke-linecap": "round",
                    "stroke-linejoin": 2 < M ? "round" : "miter"
                }).shadow(n.shadow && A.shadow, ia), k.push(a.graphic));
                a.graphic.attr({
                    path: $
                });
                f && (a.connector || (a.connector = b.path(t).attr({
                    "stroke-dasharray": T,
                    "stroke-width": M,
                    stroke: V,
                    "stroke-linecap": "round",
                    "stroke-linejoin": 2 < M ? "round" : "miter"
                }), k.push(a.connector)), a.connector.attr({
                    path: ea
                }));
                return a
            }
        }, w["renderer.cartesian"])
    },
    [3, 2, 0, "sr2"]
]);