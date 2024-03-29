/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.7.0
*/
FusionCharts.register("module", ["private", "modules.renderer.js-charts", function() {
        function wa(a) {
            var m = {
                left: a.offsetLeft,
                top: a.offsetTop
            };
            for (a = a.offsetParent; a;) m.left += a.offsetLeft, m.top += a.offsetTop, a !== Ia.body && a !== Ia.documentElement && (m.left -= a.scrollLeft, m.top -= a.scrollTop), a = a.offsetParent;
            return m
        }

        function na(a, m) {
            for (var c = [], d = 0, n = a.length; d < n; d++) c[d] = m.call(a[d], a[d], d, a);
            return c
        }

        function da(a, m) {
            var c = m ? 360 : S;
            a = (a || 0) % c;
            return 0 > a ? c + a : a
        }

        function Ja(a, m) {
            return a <= y ? a : m <= y ? m : m > a ? 0 : m
        }

        function Oa(a, m, c, d, n) {
            return la((m - c[1] - d.top) / n, a - c[0] - d.left)
        }

        function Ka(a, m, c, d, n, b, r, ca, e, q) {
            "object" === typeof a && (m = a.y, c = a.r, d = a.innerR, n = a.radiusYFactor, b = a.depth, r = a.seriesGroup, ca = a.renderer, a = a.x);
            if (0 > n || 1 <= n) n = .6;
            a = a || 0;
            m = m || 0;
            c = c || 1;
            d = d || 0;
            b = b || 0;
            this.renderer = ca;
            this.hasOnePoint = e;
            this.use3DLighting = q;
            this.cx = a;
            this.cy = m;
            this.rx = c;
            this.ry = c * n;
            this.radiusYFactor = n;
            this.isDoughnut = 0 < d;
            this.innerRx = d;
            this.innerRy = d * n;
            this.depth = b;
            this.leftX = a - c;
            this.rightX = a + c;
            this.leftInnerX = a - d;
            this.rightInnerX =
                a + d;
            this.depthY = m + b;
            this.topY = m - this.ry;
            this.bottomY = this.depthY + this.ry;
            this.bottomBorderGroup = ca.group("bottom-border", r).attr({
                transform: "t0," + b
            });
            this.outerBackGroup = ca.group("outer-back-Side", r);
            this.slicingWallsBackGroup = ca.group("slicingWalls-back-Side", r);
            this.innerBackGroup = ca.group("inner-back-Side", r);
            this.innerFrontGroup = ca.group("inner-front-Side", r);
            this.slicingWallsFrontGroup = ca.group("slicingWalls-front-Side", r);
            this.topGroup = ca.group("top-Side", r);
            this.moveCmdArr = ["M"];
            this.lineCmdArr = ["L"];
            this.closeCmdArr = ["Z"];
            this.centerPoint = [a, m];
            this.leftPoint = [this.leftX, m];
            this.topPoint = [a, this.topY];
            this.rightPoint = [this.rightX, m];
            this.bottomPoint = [a, m + this.ry];
            this.leftDepthPoint = [this.leftX, this.depthY];
            this.rightDepthPoint = [this.rightX, this.depthY];
            this.leftInnerPoint = [this.leftInnerX, m];
            this.rightInnerPoint = [this.rightInnerX, m];
            this.leftInnerDepthPoint = [this.leftInnerX, this.depthY];
            this.rightInnerDepthPoint = [this.rightInnerX, this.depthY];
            this.pointElemStore = [];
            this.slicingWallsArr = [];
            a = ["A", this.rx, this.ry, 0, 0, 1, this.rightX, m];
            c = ["A", this.rx, this.ry, 0, 0, 1, this.leftX, m];
            d = ["A", this.rx, this.ry, 0, 0, 0, this.rightX, this.depthY];
            n = ["A", this.rx, this.ry, 0, 0, 0, this.leftX, this.depthY];
            b = ["A", this.innerRx, this.innerRy, 0, 0, 0, this.rightInnerX, m];
            m = ["A", this.innerRx, this.innerRy, 0, 0, 0, this.leftInnerX, m];
            r = ["A", this.innerRx, this.innerRy, 0, 0, 1, this.rightInnerX, this.depthY];
            ca = ["A", this.innerRx, this.innerRy, 0, 0, 1, this.leftInnerX, this.depthY];
            this.isDoughnut ? (this.topBorderPath = this.moveCmdArr.concat(this.leftPoint,
                a, c, this.moveCmdArr, this.leftInnerPoint, b, m), this.topPath = this.moveCmdArr.concat(this.leftPoint, a, c, this.lineCmdArr, this.leftInnerPoint, b, m, this.closeCmdArr), this.innerFrontPath = this.moveCmdArr.concat(this.leftInnerPoint, b, this.lineCmdArr, this.rightInnerDepthPoint, ca, this.closeCmdArr), this.innerBackPath = this.moveCmdArr.concat(this.rightInnerPoint, m, this.lineCmdArr, this.leftInnerDepthPoint, r, this.closeCmdArr)) : this.topBorderPath = this.topPath = this.moveCmdArr.concat(this.leftPoint, a, c, this.closeCmdArr);
            this.outerBackPath = this.moveCmdArr.concat(this.leftPoint, a, this.lineCmdArr, this.rightDepthPoint, n, this.closeCmdArr);
            this.outerFrontPath = this.moveCmdArr.concat(this.rightPoint, c, this.lineCmdArr, this.leftDepthPoint, d, this.closeCmdArr);
            this.clipPathforOuter = ["M", this.leftX, this.topY, "L", this.rightX, this.topY, this.rightX, this.bottomY, this.leftX, this.bottomY, "Z"];
            this.clipPathforInner = ["M", this.leftInnerX, this.topY, "L", this.rightInnerX, this.topY, this.rightInnerX, this.bottomY, this.leftInnerX, this.bottomY,
                "Z"
            ];
            this.clipPathforNoClip = ["M", this.leftInnerX, this.topY, "L", this.leftInnerX, this.bottomY, "Z"];
            this.colorObjs = []
        }
        var ja = this,
            E = ja.hcLib,
            ia = E.Raphael,
            x = ja.window,
            Ia = x.document,
            Y = E.BLANKSTRING,
            Va = E.createTrendLine,
            g = E.pluck,
            va = E.getValidValue,
            Ba = E.parseTooltext,
            f = E.pluckNumber,
            Ha = E.getFirstValue,
            Sa = E.getDefinedColor,
            oa = E.parseUnsafeString,
            sa = E.FC_CONFIG_STRING,
            ta = E.extend2,
            za = E.getDashStyle,
            T = E.toRaphaelColor,
            La = E.toPrecision,
            Ma = E.stubFN,
            aa = E.hasSVG,
            xa = E.each,
            Aa = E.TOUCH_THRESHOLD_PIXELS,
            Pa = E.CLICK_THRESHOLD_PIXELS,
            ua = E.plotEventHandler,
            b = E.hasTouch ? Aa : Pa,
            e = "rgba(192,192,192," + (E.isIE ? .002 : 1E-6) + ")",
            h = 8 === x.document.documentMode ? "visible" : "",
            P = Math,
            u = P.sin,
            w = P.cos,
            la = P.atan2,
            p = P.round,
            s = P.min,
            t = P.max,
            qa = P.abs,
            ba = P.PI,
            D = P.ceil,
            G = P.floor,
            H = P.sqrt,
            M = ba / 180,
            L = 180 / ba,
            y = Math.PI,
            Wa = y / 2,
            S = 2 * y,
            Xa = y + Wa,
            Ga = E.graphics.getColumnColor,
            ka = E.getFirstColor,
            ga = E.setLineHeight,
            Ta = E.pluckFontSize,
            Ea = E.getFirstAlpha,
            ha = E.graphics.getDarkColor,
            ea = E.graphics.getLightColor,
            ma = E.graphics.convertColor,
            Qa = E.COLOR_TRANSPARENT,
            Ua = E.POSITION_CENTER,
            $a = E.POSITION_TOP,
            Ya = E.POSITION_BOTTOM,
            ab = E.POSITION_RIGHT,
            bb = E.POSITION_LEFT,
            cb = E.parsexAxisStyles,
            Za = E.hashify,
            l = E.chartAPI,
            Fa = E.graphics.mapSymbolName,
            x = l.singleseries,
            X = E.COMMASTRING,
            ra = E.ZEROSTRING,
            Ca = E.ONESTRING,
            ya = E.HUNDREDSTRING,
            Ra = E.PXSTRING,
            db = E.COMMASPACE;
        l("column2d", {
            standaloneInit: !0,
            friendlyName: "Column Chart",
            creditLabel: !1,
            rendererId: "cartesian"
        }, l.column2dbase);
        l("column3d", {
            friendlyName: "3D Column Chart",
            defaultSeriesType: "column3d",
            defaultPlotShadow: 1,
            is3D: !0,
            fireGroupEvent: !0,
            defaultZeroPlaneHighlighted: !1
        }, l.column2d);
        l("bar2d", {
            friendlyName: "Bar Chart",
            isBar: !0,
            defaultSeriesType: "bar",
            spaceManager: l.barbase
        }, l.column2d);
        l("bar3d", {
            friendlyName: "3D Bar Chart",
            defaultSeriesType: "bar3d",
            defaultPlotShadow: 1,
            fireGroupEvent: !0,
            is3D: !0,
            defaultZeroPlaneHighlighted: !1
        }, l.bar2d);
        l("line", {
            friendlyName: "Line Chart",
            standaloneInit: !0,
            creditLabel: !1,
            rendererId: "cartesian"
        }, l.linebase);
        l("area2d", {
                friendlyName: "Area Chart",
                standaloneInit: !0,
                creditLabel: !1,
                rendererId: "cartesian"
            },
            l.area2dbase);
        l("pie2d", {
            friendlyName: "Pie Chart",
            standaloneInit: !0,
            defaultSeriesType: "pie",
            defaultPlotShadow: 1,
            reverseLegend: 1,
            alignCaptionWithCanvas: 0,
            sliceOnLegendClick: !0,
            rendererId: "pie",
            point: function(a, m, c, d, n) {
                a = n[sa];
                var b = this.colorManager,
                    r = a.is3d,
                    ca = f(d.plotborderthickness),
                    e = f(ca, r ? .1 : 1),
                    q = f(d.enablemultislicing, 1),
                    J = f(d.use3dlighting, 1),
                    k = J ? f(d.radius3d, d["3dradius"], 90) : 100,
                    F = f(d.showzeropies, 1),
                    h = f(d.showpercentintooltip, 1),
                    P = f(d.showlabels, 1),
                    z = f(d.showvalues, 1),
                    l = f(d.showpercentvalues,
                        d.showpercentagevalues, 0),
                    A = g(d.tooltipsepchar, d.hovercapsepchar, db),
                    eb = g(d.labelsepchar, A),
                    fa = g(d.plotbordercolor, d.piebordercolor),
                    B = n[sa].numberFormatter,
                    w = c.length,
                    u = f(d.plotborderdashed, 0),
                    N = f(d.plotborderdashlen, 5),
                    C = f(d.plotborderdashgap, 4),
                    I = f(d.showvalueinlegend, 0),
                    O = f(d.showlabelinlegend, 1),
                    p = f(d.valuebeforelabelinlegend, 0),
                    Da = f(d.showvalueaspercentinlegend, 1),
                    K = f(d.reverseplotorder, 0),
                    U = g(d.legendsepchar, ", "),
                    W = n.plotOptions.series.dataLabels.style,
                    V = 0,
                    y = [],
                    Q, v, R, Z, t, $, D, s, Na, L, la, x, G,
                    M, S, E, H, qa, T, ba = -1;
                H = m.centerLabelConfig = {
                    label: oa(g(d.defaultcenterlabel, "")),
                    font: g(d.centerlabelfont, W.fontFamily),
                    fontSize: f(d.centerlabelfontsize, parseInt(W.fontSize, 10)),
                    color: ka(g(d.centerlabelcolor, d.valuefontcolor, a.inCanvasStyle.color, "555555")),
                    alpha: f(d.centerlabelalpha, 100),
                    bold: f(d.centerlabelbold, W.fontWeight),
                    italic: f(d.centerlabelitalic, W.style),
                    bgColor: g(d.centerlabelbgcolor, ""),
                    bgAlpha: f(d.centerlabelbgalpha, 100),
                    borderColor: g(d.centerlabelbordercolor, W.borderColor),
                    borderAlpha: f(d.centerlabelborderalpha,
                        100),
                    borderThickness: f(d.centerlabelborderthickness, W.borderThickness),
                    borderRadius: f(d.centerlabelborderradius, W.borderRadius),
                    textPadding: f(d.centerlabeltextpadding, W.borderPadding),
                    padding: f(d.centerlabelpadding, 2),
                    bgOval: f(d.centerlabelbgoval, 0),
                    shadow: f(d.showcenterlabelshadow, 0),
                    hoverColor: d.centerlabelhovercolor && ka(g(d.centerlabelhovercolor)),
                    hoverAlpha: f(d.centerlabelhoveralpha),
                    toolText: oa(g(d.centerlabeltooltext, ""))
                };
                100 < k && (k = 100);
                0 > k && (k = 0);
                f(d.showlegend, 0) && (n.legend.enabled = !0, n.legend.reversed = !Boolean(f(d.reverselegend, 0)), m.showInLegend = !0);
                for (v = 0; v < w; v += 1) Z = c[v], R = B.getCleanValue(Z.value, !0), null === R || !F && 0 === R || (y.push(Z), V += R);
                0 === V && (y = []);
                m.enableRotation = 1 < y.length ? f(d.enablerotation, 1) : 0;
                m.alphaAnimation = f(d.alphaanimation, 1);
                m.is3D = r;
                m.placeLabelsInside = d.placevaluesinside;
                m.use3DLighting = J;
                m.pieYScale = f(d.pieyscale, 40);
                1 > m.pieYScale && (m.pieYScale = 1);
                100 <= m.pieYScale && (m.pieYScale = 80);
                m.pieYScale /= 100;
                m.pieSliceDepth = f(d.pieslicedepth, 15);
                1 > m.pieSliceDepth && (m.pieSliceDepth =
                    1);
                m.managedPieSliceDepth = m.pieSliceDepth;
                m.enableMultiSlicing = !!q;
                r && d.showplotborder != Ca && !ca && (m.showBorderEffect = 1);
                for (v = y.length - 1; 0 <= v; --v) {
                    Z = y[v];
                    R = B.getCleanValue(Z.value, !0);
                    Q = oa(g(Z.label, Z.name, Y));
                    w = g(Z.color, b.getPlotColor(v));
                    $ = g(Z.alpha, d.plotfillalpha);
                    D = g(Z.bordercolor, fa);
                    s = g(Z.borderalpha, d.plotborderalpha, d.pieborderalpha);
                    r && (D || void 0 !== s) && (m.showBorderEffect = 0);
                    D = g(D, ea(w, r ? 90 : 25)).split(X)[0];
                    s = d.showplotborder == ra ? ra : g(s, $, "80");
                    $ = g($, ya);
                    F = {
                        opacity: Math.max($, s) / 100
                    };
                    if (c =
                        Boolean(f(Z.issliced, d.issliced, 0))) q || (-1 !== ba && (m.data[y.length - ba - 1].sliced = !1), ba = v), a.preSliced = c;
                    ca = (S = f(Z.dashed, u)) ? za(g(Z.dashlen, N), g(Z.dashgap, C), e) : void 0;
                    t = va(oa(g(Z.tooltext, a.tooltext)));
                    la = B.percentValue(R / V * 100);
                    x = B.dataLabels(R) || Y;
                    L = 1 === f(Z.showlabel, P) ? Q : Y;
                    Na = 1 === (G = f(Z.showvalue, z)) ? 1 === l ? la : x : Y;
                    M = va(oa(Z.displayvalue));
                    Na = void 0 !== M && G ? M : Na !== Y && L !== Y ? L + eb + Na : g(L, Na);
                    void 0 !== t ? t = Ba(t, [1, 2, 3, 5, 6, 7, 14, 24, 25], {
                        formattedValue: x,
                        label: Q,
                        yaxisName: oa(d.yaxisname),
                        xaxisName: oa(d.xaxisname),
                        percentValue: la,
                        sum: B.dataLabels(V),
                        unformattedSum: V
                    }, Z, d) : (t = Q, G = h ? la : x, t = t != Y ? t + A + G : G);
                    G = O ? Q : Y;
                    I && (E = Da ? B.legendPercentValue(R / V * 100) : B.legendValue(R), G = p ? E + (G && U + G) : (G && G + U) + E);
                    S = this.pointHoverOptions(Z, m, {
                        plotType: "pie",
                        use3DLighting: J,
                        color: w,
                        alpha: $,
                        borderWidth: e,
                        borderColor: D,
                        borderAlpha: s,
                        borderDashed: S,
                        borderDashGap: g(Z.dashgap, C),
                        borderDashLen: f(Z.dashlen, N),
                        radius3D: k,
                        shadow: F
                    });
                    Q = {
                        label: g((qa = Z.centerlabel || d.centerlabel) && this.replaceMacros(qa, ["\\$value", "\\$percentValue", "\\$displayValue",
                            "\\$label"
                        ], [x, la, void 0 === M ? "" : M, Q]), ""),
                        font: H.font,
                        fontSize: f(Z.centerlabelfontsize, H.fontSize),
                        color: ka(g(Z.centerlabelcolor, H.color)),
                        alpha: f(Z.centerlabelalpha, H.alpha),
                        bold: f(Z.centerlabelbold, H.bold),
                        italic: f(Z.centerlabelitalic, H.italic),
                        bgColor: g(Z.centerlabelbgcolor, H.bgColor),
                        bgAlpha: f(Z.centerlabelbgalpha, H.bgAlpha),
                        borderColor: g(Z.centerlabelbordercolor, H.borderColor),
                        borderAlpha: f(Z.centerlabelborderalpha, H.borderAlpha),
                        borderThickness: H.borderThickness,
                        borderRadius: H.borderRadius,
                        textPadding: H.textPadding,
                        padding: H.padding,
                        bgOval: H.bgOval,
                        shadow: H.shadow,
                        hoverColor: (T = g(Z.centerlabelhovercolor, H.hoverColor)) && ka(T),
                        hoverAlpha: f(Z.centerlabelhoveralpha, H.hoverAlpha),
                        toolText: g(Z.centerlabeltooltext, "")
                    };
                    m.data.push({
                        displayValue: Na,
                        style: cb(Z, {}, d, W, w),
                        categoryLabel: L,
                        showInLegend: G !== Y,
                        y: R,
                        name: G,
                        shadow: F,
                        toolText: t,
                        color: this.getPointColor(w, $, k),
                        _3dAlpha: $,
                        borderColor: ma(D, s),
                        borderWidth: e,
                        link: va(Z.link),
                        sliced: c,
                        dashStyle: ca,
                        doNotSlice: g(d.enableslicing, Ca) != Ca,
                        hoverEffects: S.enabled &&
                            S.options,
                        rolloverProperties: S.enabled && S.rolloverOptions,
                        centerLabelConfig: Q
                    })
                }
                K && (m.reversePlotOrder = !0, m.data && m.data.reverse());
                m.valueTotal = V;
                n.legend.enabled = d.showlegend === Ca ? !0 : !1;
                m.startAngle = f(d.startingangle, 0);
                n.chart.startingAngle = g(1 < y.length ? d.startingangle : 0, 0);
                return m
            },
            replaceMacros: function(a, m, c) {
                for (var d = m.length || 0, n; d--;) n = new RegExp(m[d], "gi"), a = a.replace(n, c[d]);
                return a
            },
            containsMacro: function(a, m) {
                for (var c = m.length || 0, d; c--;)
                    if (d = new RegExp(m[c], "gi"), d = a.match(d)) return !0;
                return !1
            },
            getPointColor: function(a, m, c) {
                var d, n;
                a = ka(a);
                m = Ea(m);
                100 > c && aa ? (d = Math.floor(85 * (100 - .35 * c)) / 100, d = ha(a, d), n = Math.floor(50 * (100 + c)) / 100, a = ea(a, n), m = {
                    FCcolor: {
                        color: a + X + d,
                        alpha: m + X + m,
                        ratio: c + "," + (100 - c),
                        radialGradient: !0,
                        gradientUnits: "userSpaceOnUse"
                    }
                }) : m = {
                    FCcolor: {
                        color: a + X + a,
                        alpha: m + X + m,
                        ratio: "0,100"
                    }
                };
                return m
            },
            configureAxis: function(a, m) {
                var c = 0,
                    d = a[sa],
                    n = m.chart,
                    b = a.xAxis.labels.style,
                    r, ca;
                r = (r = Ha(n.valuebordercolor, Y)) ? ma(r, f(n.valueborderalpha, n.valuealpha, 100)) : Y;
                b = {
                    fontFamily: g(n.valuefont,
                        b.fontFamily),
                    fontSize: g(n.valuefontsize, parseInt(b.fontSize, 10)) + Ra,
                    lineHeight: b.lineHeight,
                    color: ma(g(n.valuefontcolor, b.color), f(n.valuefontalpha, n.valuealpha, 100)),
                    fontWeight: f(n.valuefontbold) ? "bold" : "normal",
                    fontStyle: f(n.valuefontitalic) ? "italic" : "normal",
                    border: r || n.valuebgcolor ? f(n.valueborderthickness, 1) + "px solid" : void 0,
                    borderColor: r,
                    borderThickness: f(n.valueborderthickness, 1),
                    borderPadding: f(n.valueborderpadding, 2),
                    borderRadius: f(n.valueborderradius, 0),
                    backgroundColor: n.valuebgcolor ?
                        ma(n.valuebgcolor, f(n.valuebgalpha, n.valuealpha, 100)) : Y,
                    borderDash: f(n.valueborderdashed, 0) ? za(f(n.valueborderdashlen, 4), f(n.valueborderdashgap, 2), f(n.valueborderthickness, 1)) : "none"
                };
                a.plotOptions.series.dataLabels.style = b;
                delete d.x;
                delete d[0];
                delete d[1];
                a.chart.plotBorderColor = a.chart.plotBackgroundColor = Qa;
                d = d.pieDATALabels = [];
                if (1 === a.series.length && (ca = a.series[0].data) && 0 < (c = a.series[0].data.length) && a.plotOptions.series.dataLabels.enabled)
                    for (; c--;) ca[c] && void 0 !== va(ca[c].displayValue) &&
                        d.push({
                            text: ca[c].displayValue,
                            style: ca[c].style
                        })
            },
            spaceManager: function(a, m, c, d) {
                var n = a[sa],
                    b = n.is3d,
                    r = this.name,
                    ca = this.colorManager,
                    e = this.smartLabel || n.smartLabel,
                    q = f(n.pieDATALabels && n.pieDATALabels.length, 0),
                    J = 0,
                    k = m.chart,
                    F = f(k.managelabeloverflow, 0),
                    h = f(k.slicingdistance),
                    P = n.preSliced || k.enableslicing !== ra || k.showlegend === Ca && k.interactivelegend !== ra ? qa(f(h, 20)) : 0,
                    z = f(k.pieradius, 0),
                    l = f(k.enablesmartlabels, k.enablesmartlabel, 1),
                    A = l ? f(k.skipoverlaplabels, k.skipoverlaplabel, 1) : 0,
                    w = f(k.issmartlineslanted,
                        1),
                    fa = q ? f(k.labeldistance, k.nametbdistance, 5) : P,
                    B = f(k.smartlabelclearance, 5);
                c -= a.chart.marginRight + a.chart.marginLeft;
                var u = d - (a.chart.marginTop + a.chart.marginBottom);
                d = s(u, c);
                var p = g(k.smartlinecolor, ca.getColor("plotFillColor")),
                    N = f(k.smartlinealpha, 100),
                    C = f(k.smartlinethickness, .7),
                    I = a.plotOptions.series.dataLabels,
                    ca = I.style,
                    O = q ? f(parseInt(ca.lineHeight, 10), 12) : 0,
                    ca = a.series[0] || {},
                    y = ca.pieYScale,
                    Da = ca.pieSliceDepth;
                d = 0 === z ? .15 * d : z;
                var K = 0,
                    K = 2 * d,
                    U = f("doughnut2d" === r ? 0 : k.placevaluesinside);
                I.connectorWidth =
                    C;
                I.connectorPadding = f(k.connectorpadding, 5);
                I.connectorColor = ma(p, N);
                q && (l && (fa = B), fa += P);
                B = K + 2 * (O + fa);
                u -= this.titleSpaceManager(a, m, c, t(B < u ? u - B : u / 2, parseFloat(a.title.style.lineHeight, 10)));
                k.showlegend === Ca && (g(k.legendposition, Ya).toLowerCase() !== ab ? u -= this.placeLegendBlockBottom(a, m, c, u / 2, !0) : c -= this.placeLegendBlockRight(a, m, c / 3, u, !0));
                if (1 !== q)
                    for (; q--;) e.setStyle(n.pieDATALabels[q].style), m = e.getOriSize(n.pieDATALabels[q].text), J = t(J, m.width);
                0 === z && (b ? (u -= Da, K = s(c / 2 - J - P, (u / 2 - O) / y) - fa) : K =
                    s(c / 2 - J - P, u / 2 - O) - fa, K >= d ? d = K : h || (P = fa = t(s(fa - (d - K), P), 10)));
                b && (q = u - 2 * (d * y + O), Da > q && (ca.managedPieSliceDepth = Da - q));
                a.plotOptions.pie3d.slicedOffset = a.plotOptions.pie.slicedOffset = P;
                a.plotOptions.pie3d.size = a.plotOptions.pie.size = 2 * d;
                a.plotOptions.series.dataLabels.distance = fa;
                a.plotOptions.series.dataLabels.isSmartLineSlanted = w;
                a.plotOptions.series.dataLabels.enableSmartLabels = l;
                a.plotOptions.series.dataLabels.skipOverlapLabels = A;
                a.plotOptions.series.dataLabels.manageLabelOverflow = F;
                a.plotOptions.series.dataLabels.placeLabelsInside =
                    U;
                if ("doughnut2d" === r || "doughnut3d" === r)
                    if (r = f(k.doughnutradius, 0), q = (q = f(k.use3dlighting, 1)) ? f(k.radius3d, k["3dradius"], 50) : 100, 100 < q && (q = 100), 0 > q && (q = 0), k = 0 === r || r >= d ? d / 2 : r, a.plotOptions.pie3d.innerSize = a.plotOptions.pie.innerSize = 2 * k, 0 < q && aa && (k = parseInt(k / d * 100, 10), r = (100 - k) / 2, q = parseInt(r * q / 100, 10), k = k + X + q + X + 2 * (r - q) + X + q, a.series[0] && a.series[0].data))
                        for (F = a.series[0].data, a = 0, q = F.length; a < q; a += 1) r = F[a], r.color.FCcolor && (r.color.FCcolor.ratio = k, r.rolloverProperties.color && (r.rolloverProperties.color.FCcolor.ratio =
                            k))
            },
            creditLabel: !1,
            eiMethods: {
                isPlotItemSliced: function(a) {
                    var m = this.jsVars.hcObj,
                        c, d, n;
                    return m && m.datasets && m.datasets[0] && (c = m.datasets[0].data) && (n = c.length) && c[a = n - a - 1] && (d = c[a].plot) && d.sliced
                },
                slicePlotItem: function(a, m) {
                    var c = this.jsVars.hcObj,
                        d, n, b, r;
                    return c && c.datasets && (d = c.datasets[0]) && (n = d.data) && (r = n.length) && n[a = d.reversePlotOrder ? a : r - a - 1] && (b = n[a].plot) && ((!!m !== b.sliced || void 0 === m) && c.plotGraphicClick.call(b) || b.sliced)
                },
                centerLabel: function(a, m) {
                    var c = this.jsVars.hcObj,
                        d = c.options,
                        n = d.series[0],
                        d = d.plotOptions.pie.innerSize,
                        b = c.canvasLeft + .5 * c.canvasWidth,
                        r = c.canvasTop + .5 * c.canvasHeight,
                        ca = n.centerLabelConfig,
                        e;
                    if ("object" !== typeof m) m = ca;
                    else
                        for (e in ca) void 0 === m[e] && (m[e] = ca[e]);
                    m.label = a;
                    n.centerLabelConfig = m;
                    d && c.drawDoughnutCenterLabel(a || "", b, r, d, d, m, !0)
                },
                startingAngle: function(a, m) {
                    var c = this.jsVars.hcObj,
                        d = c.datasets[0].plot,
                        n = "pie" === c.options.chart.defaultSeriesType,
                        b, r = (b = c.datasets[0].startAngle) * (n ? -L : 1) + (0 > (n ? -1 : 1) * b ? 360 : 0);
                    if (!isNaN(a)) {
                        if (d.singletonCase ||
                            d.isRotating) return;
                        a += m ? r : 0;
                        n ? ((n = c.options.series[0]).startAngle = -a * M, c.rotate(d, n)) : c.rotate(a);
                        r = a
                    }
                    return p(100 * ((r %= 360) + (0 > r ? 360 : 0))) / 100
                }
            }
        }, x);
        l.pie2d.eiMethods.togglePieSlice = l.pie2d.eiMethods.sliceDataItem = l.pie2d.eiMethods.slicePlotItem;
        l.pie2d.eiMethods.enableSlicingMovement = l.pie2d.eiMethods.enablelink = function() {
            ja.raiseWarning(this, "1301081430", "run", "JSRenderer~enablelink()", "Method deprecated.")
        };
        l("pie3d", {
            friendlyName: "3D Pie Chart",
            defaultSeriesType: "pie3d",
            rendererId: "pie3d",
            creditLabel: !1,
            fireGroupEvent: !0,
            getPointColor: function(a) {
                return a
            },
            defaultPlotShadow: 0
        }, l.pie2d);
        l("doughnut2d", {
            friendlyName: "Doughnut Chart",
            getPointColor: function(a, m, c) {
                var d;
                a = ka(a);
                m = Ea(m);
                100 > c && aa ? (d = ha(a, G(100 * (85 - .2 * (100 - c))) / 100), a = ea(a, G(100 * (100 - .5 * c)) / 100), m = {
                    FCcolor: {
                        color: d + "," + a + "," + a + "," + d,
                        alpha: m + "," + m + "," + m + "," + m,
                        radialGradient: !0,
                        gradientUnits: "userSpaceOnUse",
                        r: c
                    }
                }) : m = {
                    FCcolor: {
                        color: a + "," + a,
                        alpha: m + "," + m,
                        ratio: "0,100"
                    }
                };
                return m
            }
        }, l.pie2d);
        l("doughnut3d", {
            friendlyName: "3D Doughnut Chart",
            defaultSeriesType: "pie3d",
            rendererId: "pie3d",
            fireGroupEvent: !0,
            getPointColor: l.pie3d,
            defaultPlotShadow: 0
        }, l.doughnut2d);
        l("pareto2d", {
            standaloneInit: !0,
            friendlyName: "Pareto Chart",
            point: function(a, m, c, d, n) {
                a = c.length;
                var b = 0,
                    r = 0,
                    e = {},
                    h = this.colorManager,
                    q = /3d$/.test(n.chart.defaultSeriesType),
                    J = this.isBar,
                    k = g(360 - d.plotfillangle, 90),
                    F = g(d.showplotborder, q ? ra : Ca) === Ca ? q ? 1 : f(d.plotborderthickness, 1) : 0,
                    P = n.chart.useRoundEdges,
                    l = g(d.tooltipsepchar, ", "),
                    z = g(d.plotbordercolor, h.getColor("plotBorderColor")).split(X)[0],
                    u = d.showplotborder == ra ? ra : g(d.plotborderalpha, d.plotfillalpha, ya),
                    A = n.xAxis,
                    w = f(d.showcumulativeline, 1),
                    fa = n[sa],
                    B = fa.axisGridManager,
                    p = fa.x,
                    y = d.showtooltip != ra,
                    N = [],
                    C = f(d.use3dlighting, 1),
                    I = n[sa].numberFormatter,
                    O = f(d.showlinevalues, d.showvalues),
                    t = f(d.plotborderdashed, 0),
                    Da, K = f(d.plotborderdashlen, 5),
                    U = f(d.plotborderdashgap, 4),
                    W = oa(d.xaxisname),
                    V = oa(d.yaxisname),
                    D = fa.numberFormatter,
                    Q = m,
                    v, R, Z, s, $, G, H, L, la, x, M, S, E, qa, ba, T, ha, ga, ma, pa, ea, da, ia, aa, u = q ? d.showplotborder ? u : ra : u,
                    z = q ? g(d.plotbordercolor,
                        "#FFFFFF") : z;
                Z = f(d.useplotgradientcolor, 1) ? Sa(d.plotgradientcolor, h.getColor("plotGradientColor")) : Y;
                for (ba = R = 0; R < a; R += 1) pa = c[R], c[R].vline ? B.addVline(A, pa, ba, n) : (v = I.getCleanValue(pa.value, !0), null !== v && (r += pa.value = v, N.push(pa), ba += 1));
                a = N.length;
                N.sort(function(a, c) {
                    return c.value - a.value
                });
                w && 0 < r ? (x = f(d.linedashed, 0), ea = ka(g(d.linecolor, h.getColor("plotBorderColor"))), e = g(d.linealpha, 100), M = f(d.linedashlen, 5), s = f(d.linedashgap, 4), R = f(d.linethickness, 2), E = {
                        opacity: e / 100
                    }, ma = g(d.valueposition, "auto"),
                    qa = f(d.drawanchors, d.showanchors), void 0 === qa && (qa = e != ra), ha = f(d.anchorborderthickness, 1), ga = f(d.anchorsides, 0), Da = f(d.anchorradius, 3), T = ka(g(d.anchorbordercolor, ea)), v = ka(g(d.anchorbgcolor, h.getColor("anchorBgColor"))), ba = Ea(g(d.anchoralpha, ya)), c = Ea(g(d.anchorbgalpha, ba)) * ba / 100, x = x ? za(M, s, R) : void 0, s = Boolean(f(pa.anchorshadow, d.anchorshadow, 0)), M = this.pointHoverOptions(pa, m, {
                        plotType: "anchor",
                        anchorBgColor: v,
                        anchorAlpha: ba,
                        anchorBgAlpha: c,
                        anchorAngle: g(d.anchorstartangle, 90),
                        anchorBorderThickness: ha,
                        anchorBorderColor: T,
                        anchorBorderAlpha: ba,
                        anchorSides: ga,
                        anchorRadius: Da,
                        shadow: S
                    }), e = {
                        yAxis: 1,
                        data: [],
                        type: "line",
                        color: {
                            FCcolor: {
                                color: ea,
                                alpha: e
                            }
                        },
                        lineWidth: R,
                        marker: {
                            enabled: qa,
                            shadow: s && 1 <= Da ? {
                                opacity: ba / 100
                            } : !1,
                            fillColor: {
                                FCcolor: {
                                    color: v,
                                    alpha: c
                                }
                            },
                            lineColor: {
                                FCcolor: {
                                    color: T,
                                    alpha: ba
                                }
                            },
                            lineWidth: ha,
                            radius: Da,
                            symbol: Fa(ga),
                            startAngle: g(d.anchorstartangle, 90)
                        }
                    }, Q = [Q, e], fa[1] || (fa[1] = {}), fa[1].stacking100Percent = !0) : ("1" !== d.showsecondarylimits && (d.showsecondarylimits = "0"), "1" !== d.showdivlinesecondaryvalue &&
                    (d.showdivlinesecondaryvalue = "0"));
                fa[1] || (fa[1] = {});
                fa[1].stacking100Percent = !0;
                for (R = 0; R < a; R += 1) pa = N[R], S = f(pa.showlabel, d.showlabels, 1), c = oa(S ? Ha(pa.label, pa.name) : Y), H = g(pa.color, h.getPlotColor()), B.addXaxisCat(A, R, R, c, pa, {}, d, H), b += v = pa.value, s = f(pa.dashed, t), $ = g(pa.dashgap, U), G = g(pa.dashlen, K), L = g(pa.alpha, d.plotfillalpha, ya), la = g(pa.ratio, d.plotfillratio), S = {
                        opacity: L / 100
                    }, da = g(pa.alpha, u) + Y, ea = Ga(H + X + Z.replace(/,+?$/, ""), L, la, k, P, z + Y, da + Y, J, q), Da = s ? za(G, $, F) : "none", ba = b / r * 100, ha = I.percentValue(ba),
                    T = null === v ? v : D.dataLabels(v), ga = va(oa(pa.displayvalue)), ga = f(pa.showvalue, fa.showValues) ? void 0 !== ga ? ga : T : Y, fa.showTooltip ? void 0 !== (qa = va(oa(g(pa.tooltext, fa.tooltext)))) ? (ia = {
                        formattedValue: T,
                        label: c,
                        yaxisName: V,
                        xaxisName: W,
                        cumulativeValue: b,
                        cumulativeDataValue: D.dataLabels(b),
                        cumulativePercentValue: ha,
                        sum: D.dataLabels(r),
                        unformattedSum: r
                    }, aa = [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25], qa = Ba(qa, aa, ia, pa, d)) : qa = null === T ? !1 : c !== Y ? c + fa.tooltipSepChar + T : T : qa = Y, $ = this.pointHoverOptions(pa, m, {
                        plotType: "column",
                        is3d: q,
                        isBar: J,
                        use3DLighting: C,
                        isRoundEdged: P,
                        color: H,
                        gradientColor: Z,
                        alpha: L,
                        ratio: la,
                        angle: k,
                        borderWidth: F,
                        borderColor: z,
                        borderAlpha: da,
                        borderDashed: s,
                        borderDashGap: $,
                        borderDashLen: G,
                        shadow: S
                    }), s = g(pa.link), m.data.push({
                        link: s,
                        toolText: qa,
                        displayValue: ga,
                        categoryLabel: c,
                        y: v,
                        shadow: S,
                        color: ea[0],
                        borderColor: ea[1],
                        borderWidth: F,
                        use3DLighting: C,
                        dashStyle: Da,
                        tooltipConstraint: this.tooltipConstraint,
                        hoverEffects: $.enabled && $.options,
                        rolloverProperties: $.enabled && $.rolloverOptions
                    }), this.pointValueWatcher(n,
                        v), w && (v = va(oa(g(pa.cumulativeplottooltext, d.cumulativeplottooltext))), S = 1 == O ? ha : 0 === O || ga === Y ? Y : ha, qa = y ? void 0 !== v ? Ba(v, aa || [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25], ia || {
                        formattedValue: T,
                        label: c,
                        yaxisName: V,
                        xaxisName: W,
                        cumulativeValue: b,
                        cumulativeDataValue: D.dataLabels(b),
                        cumulativePercentValue: ha,
                        sum: D.dataLabels(r),
                        unformattedSum: r
                    }, pa, d) : (c !== Y ? c + l : Y) + ha : Y, e.data.push({
                        shadow: E,
                        color: e.color,
                        marker: e.marker,
                        y: ba,
                        toolText: qa,
                        displayValue: S,
                        valuePosition: ma,
                        categoryLabel: c,
                        link: s,
                        dashStyle: x,
                        hoverEffects: M.enabled &&
                            M.options,
                        rolloverProperties: M.enabled && M.rolloverOptions
                    }));
                p.catCount = a;
                return Q
            },
            defaultSeriesType: "column",
            isDual: !0,
            creditLabel: !1,
            rendererId: "cartesian"
        }, x);
        l("pareto3d", {
            friendlyName: "3D Pareto Chart",
            defaultSeriesType: "column3d",
            fireGroupEvent: !0,
            defaultPlotShadow: 1,
            is3D: !0
        }, l.pareto2d);
        l("mscolumn2d", {
            standaloneInit: !0,
            friendlyName: "Multi-series Column Chart",
            creditLabel: !1,
            rendererId: "cartesian"
        }, l.mscolumn2dbase);
        l("mscolumn3d", {
            defaultSeriesType: "column3d",
            friendlyName: "Multi-series 3D Column Chart",
            defaultPlotShadow: 1,
            fireGroupEvent: !0,
            is3D: !0,
            defaultZeroPlaneHighlighted: !1
        }, l.mscolumn2d);
        l("msbar2d", {
            friendlyName: "Multi-series Bar Chart",
            isBar: !0,
            defaultSeriesType: "bar",
            spaceManager: l.barbase
        }, l.mscolumn2d);
        l("msbar3d", {
            defaultSeriesType: "bar3d",
            friendlyName: "Multi-series 3D Bar Chart",
            fireGroupEvent: !0,
            defaultPlotShadow: 1,
            is3D: !0,
            defaultZeroPlaneHighlighted: !1
        }, l.msbar2d);
        l("msline", {
            standaloneInit: !0,
            friendlyName: "Multi-series Line Chart",
            creditLabel: !1,
            rendererId: "cartesian"
        }, l.mslinebase);
        l("msarea", {
            standaloneInit: !0,
            friendlyName: "Multi-series Area Chart",
            creditLabel: !1,
            rendererId: "cartesian"
        }, l.msareabase);
        l("stackedcolumn2d", {
            friendlyName: "Stacked Column Chart",
            isStacked: !0
        }, l.mscolumn2d);
        l("stackedcolumn3d", {
            friendlyName: "3D Stacked Column Chart",
            isStacked: !0
        }, l.mscolumn3d);
        l("stackedbar2d", {
            friendlyName: "Stacked Bar Chart",
            isStacked: !0
        }, l.msbar2d);
        l("stackedbar3d", {
            friendlyName: "3D Stacked Bar Chart",
            isStacked: !0
        }, l.msbar3d);
        l("stackedarea2d", {
            friendlyName: "Stacked Area Chart",
            isStacked: !0,
            areaAlpha: 100,
            showSum: 0
        }, l.msarea);
        l("marimekko", {
            friendlyName: "Marimekko Chart",
            isValueAbs: !0,
            distributedColumns: !0,
            isStacked: !0,
            xAxisMinMaxSetter: Ma,
            postSeriesAddition: function(a, m) {
                var c = a[sa],
                    d = 0,
                    b = a.xAxis,
                    e = 100 / c.marimekkoTotal,
                    r = [],
                    ca = a.series,
                    h = 0,
                    q = ta({}, a.plotOptions.series.dataLabels.style),
                    J = parseInt(q.fontSize, 10),
                    k = f(m.chart.plotborderthickness, 1),
                    F = a.chart.rotateValues,
                    P = f(m.chart.rotatexaxispercentvalues, 0),
                    l = -.5 * k - (k % 2 + (P ? 1 : 0) + !a.chart.plotBorderWidth),
                    z = P ? J / 2 * 1.2 : 0,
                    u =
                    F ? 270 : 0,
                    A = c[0],
                    w = A.stacking100Percent,
                    fa = !w,
                    B = c.inCanvasStyle,
                    g = this.numberFormatter,
                    y = m.categories && m.categories[0] && m.categories[0].category || [],
                    N = 0,
                    C = [],
                    I, O, s, t, K, U, W, V, H, Q, k = [];
                c.isXYPlot = !0;
                c.distributedColumns = !0;
                b.min = 0;
                b.max = 100;
                b.labels.enabled = !1;
                b.gridLineWidth = 0;
                b.alternateGridColor = Qa;
                I = A.stack;
                m.chart.interactivelegend = "0";
                A = 0;
                for (O = a.xAxis.plotLines.length; A < O; A += 1) s = b.plotLines[A], s.isGrid && (s.isCat = !0, r[s.value] = s, s._hideLabel = !0);
                for (A = O = 0; A < y.length; A += 1) y[A].vline || (N += C[O] = g.getCleanValue(y[A].widthpercent ||
                    0), O += 1);
                s = I.floatedcolumn && I.floatedcolumn[0] || [];
                if (100 === N && (s && s.length) !== O)
                    for (; O--;) s[O] || (s[O] = {
                        p: null
                    });
                N = p(N);
                if (s)
                    for (K = 0, O = s.length; K < O;) {
                        Q = s[K];
                        d += t = Q && Q.p || 0;
                        W = 100 === N ? C[K] : t * e;
                        U = h + W / 2;
                        V = h + W;
                        k.push(V);
                        for (A = 0; A < ca.length; A += 1)
                            if (a.series[A].visible = !0, y = a.series[A].data[K], y._FCX = h, y._FCW = W, H = g.percentValue(y.y / t * 100), y.toolText = Ba(y.toolText, [14, 24, 25, 111, 112], {
                                    xAxisPercentValue: g.percentValue(W),
                                    percentValue: H,
                                    sum: g.dataLabels(t),
                                    unformattedSum: t
                                }), w) {
                                if (y.y || 0 === y.y) I = y.y / t * 100, y.y =
                                    I, y.showPercentValues && (y.displayValue = H);
                                if (y.previousY || 0 === y.previousY) y.previousY = y.previousY / t * 100
                            }
                        c.showStackTotal && a.xAxis.plotLines.push({
                            value: U,
                            width: 0,
                            isVline: fa,
                            isTrend: !fa,
                            _isStackSum: 1,
                            zIndex: 4,
                            label: {
                                align: Ua,
                                textAlign: Ua,
                                rotation: u,
                                style: q,
                                verticalAlign: $a,
                                offsetScale: fa ? 0 > t ? Q.n : Q.p : void 0,
                                offsetScaleIndex: 0,
                                y: 0 > t ? 270 === F ? 4 : J : -4,
                                x: 0,
                                text: g.yAxis(La(t, 10))
                            }
                        });
                        r[K] && (r[K].value = U, r[K]._weight = W, r[K]._hideLabel = !1);
                        K += 1;
                        c.showXAxisPercentValues && K < O && a.xAxis.plotLines.push({
                            value: V,
                            width: 0,
                            isVine: !0,
                            label: {
                                align: Ua,
                                textAlign: P ? bb : Ua,
                                rotation: P ? 270 : 0,
                                backgroundColor: "#ffffff",
                                backgroundOpacity: 1,
                                borderWidth: "1px",
                                borderType: "solid",
                                borderColor: B.color,
                                style: {
                                    color: B.color,
                                    fontSize: B.fontSize,
                                    fontFamily: B.fontFamily,
                                    lineHeight: B.lineHeight
                                },
                                verticalAlign: Ya,
                                y: l,
                                x: z,
                                text: this.numberFormatter.percentValue(V)
                            },
                            zIndex: 5
                        });
                        h = V
                    }
                K = 0;
                for (O = r.length; K < O; K += 1) r[K] && r[K]._hideLabel && (r[K].value = null);
                A = 0;
                for (O = a.xAxis.plotLines.length; A < O; A += 1)
                    if (s = b.plotLines[A], s.isVline && !s._isStackSum && (c = s.value)) c -=
                        .5, d = k[G(c)], e = k[D(c)], s.value = d + (e - d) * (c - G(c))
            },
            defaultSeriesType: "floatedcolumn"
        }, l.stackedcolumn2d);
        l("msstackedcolumn2d", {
            friendlyName: "Multi-series Stacked Column Chart",
            series: function(a, m, c) {
                var d, b, e, r, ca = m[sa],
                    h = 0,
                    q, J;
                q = [];
                var k;
                m.legend.enabled = Boolean(f(a.chart.showlegend, 1));
                if (a.dataset && 0 < a.dataset.length) {
                    this.categoryAdder(a, m);
                    d = 0;
                    for (b = a.dataset.length; d < b; d += 1)
                        if (k = a.dataset[d].dataset)
                            for (e = 0, r = k.length; e < r; e += 1, h += 1) q = {
                                hoverEffects: this.parseSeriesHoverOptions(a, m, k[e], c),
                                visible: !f(k[e].initiallyhidden,
                                    0),
                                data: [],
                                numColumns: b,
                                columnPosition: d
                            }, J = Math.min(ca.oriCatTmp.length, k[e].data && k[e].data.length), q = this.point(c, q, k[e], a.chart, m, J, h, d), m.series.push(q);
                    if (this.isDual && a.lineset && 0 < a.lineset.length)
                        for (e = 0, r = a.lineset.length; e < r; e += 1, h += 1) d = a.lineset[e], q = {
                            hoverEffects: this.parseSeriesHoverOptions(a, m, d, c),
                            visible: !f(d.initiallyhidden, 0),
                            data: [],
                            yAxis: 1,
                            type: "line"
                        }, J = Math.min(ca.oriCatTmp.length, d.data && d.data.length), m.series.push(l.msline.point.call(this, "msline", q, d, a.chart, m, J, h));
                    this.configureAxis(m,
                        a);
                    a.trendlines && Va(a.trendlines, m.yAxis, m[sa], this.isDual, this.isBar)
                }
            },
            postSpaceManager: function(a, m, c) {
                var d = a[sa],
                    b, e, r;
                l.base.postSpaceManager.call(this);
                if (this.isStacked && d.showStackTotal && (b = a.chart, a = (m = a.xAxis) && m.plotLines, b = c - b.marginLeft - b.marginRight, c = d.plotSpacePercent, d = d[0].stack, d = d.column && d.column.length, e = (1 - 2 * c) / d, m = b / (m.max - m.min), 50 < m * e && .1 == c))
                    for (m = 50 / m, c = a && a.length, d = -((d - 1) / 2) * m, r = 0; r < c; r += 1) e = a[r], e._isStackSum && (b = e._catPosition + (d + m * e._stackIndex), e.value = b)
            }
        }, l.stackedcolumn2d);
        l("mscombi2d", {
            friendlyName: "Multi-series Combination Chart",
            standaloneInit: !0,
            creditLabel: !1,
            rendererId: "cartesian"
        }, l.mscombibase);
        l("mscombi3d", {
            friendlyName: "Multi-series 3D Combination Chart",
            series: l.mscombi2d.series,
            eiMethods: function(a) {
                var m = {};
                xa(a.split(","), function(a) {
                    m[a] = function() {
                        ja.raiseWarning(this, "1301081430", "run", "JSRenderer~" + a + "()", "Method not applicable.")
                    }
                });
                return m
            }("view2D,view3D,resetView,rotateView,getViewAngles,fitToStage")
        }, l.mscolumn3d);
        l("mscolumnline3d", {
                friendlyName: "Multi-series Column and Line Chart"
            },
            l.mscombi3d);
        l("stackedcolumn2dline", {
            friendlyName: "Stacked Column and Line Chart",
            isStacked: !0,
            stack100percent: 0
        }, l.mscombi2d);
        l("stackedcolumn3dline", {
            friendlyName: "Stacked 3D Column and Line Chart",
            isStacked: !0,
            stack100percent: 0
        }, l.mscombi3d);
        l("mscombidy2d", {
            friendlyName: "Multi-series Dual Y-Axis Combination Chart",
            isDual: !0,
            secondarySeriesType: void 0
        }, l.mscombi2d);
        l("mscolumn3dlinedy", {
            friendlyName: "Multi-series 3D Column and Line Chart",
            isDual: !0,
            secondarySeriesType: "line"
        }, l.mscolumnline3d);
        l("stackedcolumn3dlinedy", {
            friendlyName: "Stacked 3D Column and Line Chart",
            isDual: !0,
            secondarySeriesType: "line"
        }, l.stackedcolumn3dline);
        l("msstackedcolumn2dlinedy", {
            friendlyName: "Multi-series Dual Y-Axis Stacked Column and Line Chart",
            isDual: !0,
            stack100percent: 0,
            secondarySeriesType: "line"
        }, l.msstackedcolumn2d);
        l("scrollcolumn2d", {
                friendlyName: "Scrollable Multi-series Column Chart",
                postSeriesAddition: l.scrollbase.postSeriesAddition,
                tooltipConstraint: "plot",
                canvasborderthickness: 1,
                avgScrollPointWidth: 40
            },
            l.mscolumn2d);
        l("scrollline2d", {
            friendlyName: "Scrollable Multi-series Line Chart",
            postSeriesAddition: l.scrollbase.postSeriesAddition,
            tooltipConstraint: "plot",
            canvasborderthickness: 1,
            avgScrollPointWidth: 75
        }, l.msline);
        l("scrollarea2d", {
            friendlyName: "Scrollable Multi-series Area Chart",
            postSeriesAddition: l.scrollbase.postSeriesAddition,
            tooltipConstraint: "plot",
            canvasborderthickness: 1,
            avgScrollPointWidth: 75
        }, l.msarea);
        l("scrollstackedcolumn2d", {
            friendlyName: "Scrollable Stacked Column Chart",
            postSeriesAddition: function(a,
                m, c, d) {
                l.base.postSeriesAddition.call(this, a, m, c, d);
                l.scrollbase.postSeriesAddition.call(this, a, m, c, d)
            },
            canvasborderthickness: 1,
            tooltipConstraint: "plot",
            avgScrollPointWidth: 75
        }, l.stackedcolumn2d);
        l("scrollcombi2d", {
            friendlyName: "Scrollable Combination Chart",
            postSeriesAddition: l.scrollbase.postSeriesAddition,
            tooltipConstraint: "plot",
            canvasborderthickness: 1,
            avgScrollPointWidth: 40
        }, l.mscombi2d);
        l("scrollcombidy2d", {
            friendlyName: "Scrollable Dual Y-Axis Combination Chart",
            postSeriesAddition: l.scrollbase.postSeriesAddition,
            tooltipConstraint: "plot",
            canvasborderthickness: 1,
            avgScrollPointWidth: 40
        }, l.mscombidy2d);
        l("scatter", {
            friendlyName: "Scatter Chart",
            isXY: !0,
            standaloneInit: !0,
            defaultSeriesType: "scatter",
            defaultZeroPlaneHighlighted: !1,
            creditLabel: !1
        }, l.scatterbase);
        l("bubble", {
            friendlyName: "Bubble Chart",
            standaloneInit: !0,
            standaloneInut: !0,
            defaultSeriesType: "bubble",
            rendererId: "bubble",
            point: function(a, m, c, d, b) {
                a = f(d.ignoreemptydatasets, 0);
                var e = !1,
                    r = this.colorManager,
                    ca, h, q, J, k, F, P, l, z, u, A, w, fa, B, y, s, N = f(c.showvalues,
                        b[sa].showValues);
                ca = f(d.bubblescale, 1);
                var C = g(d.negativecolor, "FF0000"),
                    I = b.plotOptions.bubble,
                    O = this.numberFormatter,
                    p = m._showRegression = f(c.showregressionline, d.showregressionline, 0),
                    t, K, U, W;
                m.name = va(c.seriesname);
                q = Boolean(f(c.drawanchors, c.showanchors, d.drawanchors, 1));
                l = g(c.plotfillalpha, c.bubblefillalpha, d.plotfillalpha, ya);
                z = f(c.showplotborder, d.showplotborder, 1);
                u = ka(g(c.plotbordercolor, d.plotbordercolor, "666666"));
                A = g(c.plotborderthickness, d.plotborderthickness, 1);
                w = g(c.plotborderalpha,
                    d.plotborderalpha, "95");
                z = 1 === z ? A : 0;
                r = g(c.color, c.plotfillcolor, d.plotfillcolor, r.getPlotColor());
                m.marker = {
                    enabled: q,
                    fillColor: this.getPointColor(r, ya),
                    lineColor: ma(u, z ? w : 0),
                    lineWidth: z,
                    symbol: "circle"
                };
                if (A = c.data) {
                    s = A.length;
                    I.bubbleScale = ca;
                    if (0 === f(c.includeinlegend) || void 0 === m.name) m.showInLegend = !1;
                    p && (m.events = {
                        hide: this.hideRLine,
                        show: this.showRLine
                    }, t = {
                        sumX: 0,
                        sumY: 0,
                        sumXY: 0,
                        sumXsqure: 0,
                        sumYsqure: 0,
                        xValues: [],
                        yValues: []
                    }, K = f(c.showyonx, d.showyonx, 1), U = ka(g(c.regressionlinecolor, d.regressionlinecolor,
                        r)), W = f(c.regressionlinethickness, d.regressionlinethickness, 1), ca = Ea(f(c.regressionlinealpha, d.regressionlinealpha, 100)), U = ma(U, ca));
                    for (h = 0; h < s; h += 1)(J = A[h]) ? (ca = O.getCleanValue(J.y), fa = O.getCleanValue(J.x), B = O.getCleanValue(J.z, !0), null === ca ? m.data.push({
                        y: null,
                        x: fa
                    }) : (e = !0, P = 0 !== f(d.use3dlighting, J.is3d, c.is3d, d.is3d), k = ka(g(J.color, 0 > J.z ? C : r)), F = g(J.alpha, l), y = this.getPointStub(J, ca, fa, b, c, N), k = P ? this.getPointColor(k, F) : {
                        FCcolor: {
                            color: k,
                            alpha: F
                        }
                    }, null !== B && (I.zMax = I.zMax > B ? I.zMax : B, I.zMin = I.zMin <
                        B ? I.zMin : B), J = this.pointHoverOptions(J, m, {
                        plotType: "bubble",
                        is3d: P,
                        seriesAnchorSymbol: "circle",
                        color: k,
                        negativeColor: C,
                        alpha: F,
                        borderWidth: z,
                        borderColor: u,
                        borderAlpha: w,
                        shadow: !1
                    }), m.data.push({
                        y: ca,
                        x: fa,
                        z: B,
                        displayValue: y.displayValue,
                        toolText: y.toolText,
                        link: y.link,
                        hoverEffects: J.enabled && J.options,
                        rolloverProperties: J.enabled && J.rolloverOptions,
                        marker: {
                            enabled: q,
                            fillColor: k,
                            lineColor: {
                                FCcolor: {
                                    color: u,
                                    alpha: w
                                }
                            },
                            lineWidth: z,
                            symbol: "circle"
                        }
                    }), this.pointValueWatcher(b, ca, fa, p && t))) : m.data.push({
                        y: null
                    });
                    p && (c = {
                        type: "line",
                        color: U,
                        showInLegend: !1,
                        lineWidth: W,
                        enableMouseTracking: !1,
                        marker: {
                            enabled: !1
                        },
                        data: this.getRegressionLineSeries(t, K, s),
                        zIndex: 0
                    }, m = [m, c])
                }
                a && !e && (m.showInLegend = !1);
                return m
            },
            getPointStub: function(a, m, c, d, b, e) {
                var r = this.dataObj.chart;
                d = d[sa];
                m = null === m ? m : d.numberFormatter.dataLabels(m);
                var ca, h = d.tooltipSepChar,
                    q = va(oa(g(a.tooltext, b.plottooltext, d.tooltext)));
                d.showTooltip ? void 0 !== q ? b = Ba(q, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 118], {
                    yDataValue: m,
                    xDataValue: d.numberFormatter.xAxis(c),
                    yaxisName: oa(r.yaxisname),
                    xaxisName: oa(r.xaxisname),
                    zDataValue: d.numberFormatter.dataLabels(a.z)
                }, a, r, b) : null === m ? b = !1 : (d.seriesNameInToolTip && (ca = g(b && b.seriesname)), b = ca ? ca + h : Y, b += c ? d.numberFormatter.xAxis(c) + h : Y, b = b + m + (a.z ? h + d.numberFormatter.dataLabels(a.z) : Y)) : b = Y;
                c = f(a.showvalue, e, d.showValues) ? void 0 !== g(a.displayvalue, a.name, a.label) ? oa(g(a.displayvalue, a.name, a.label)) : m : Y;
                a = va(a.link);
                return {
                    displayValue: c,
                    toolText: b,
                    link: a
                }
            }
        }, l.scatter);
        l("ssgrid", {
            friendlyName: "Grid Component",
            standaloneInit: !0,
            defaultSeriesType: "ssgrid",
            rendererId: "ssgrid",
            chart: function(a, b) {
                var c = this.containerElement,
                    d = ta({}, this.dataObj),
                    n = d.chart || (d.chart = d.graph || {}),
                    e = this.chartInstance,
                    r = 0,
                    ca = [],
                    h = d.data,
                    q = h && h.length,
                    J = this.smartLabel,
                    k = this.numberFormatter,
                    F = c.offsetHeight,
                    P = c.offsetWidth,
                    u = this.colorManager,
                    z, w, A, y, fa, B, s, p, N, C, I, O, t, D, K, U, W, V, H, Q, v, R, Z, G, $, S = 0;
                w = 0;
                var c = {
                        _FCconf: {
                            0: {
                                stack: {}
                            },
                            1: {
                                stack: {}
                            },
                            x: {
                                stack: {}
                            },
                            noWrap: !1,
                            marginLeftExtraSpace: 0,
                            marginRightExtraSpace: 0,
                            marginBottomExtraSpace: 0,
                            marginTopExtraSpace: 0,
                            marimekkoTotal: 0
                        },
                        chart: {
                            ignoreHiddenSeries: !1,
                            events: {},
                            spacingTop: 0,
                            spacingRight: 0,
                            spacingBottom: 0,
                            spacingLeft: 0,
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            marginLeft: 0,
                            borderRadius: 0,
                            borderColor: "#000000",
                            borderWidth: 1,
                            defaultSeriesType: "ssgrid",
                            textDirection: "1" === n.hasrtltext ? "rtl" : "",
                            style: {
                                fontFamily: g(n.basefont, "Verdana,sans"),
                                fontSize: Ta(n.basefontsize, 20) + Ra,
                                color: g(n.basefontcolor, u.getColor("baseFontColor")).replace(/^#?([a-f0-9]+)/ig, "#$1")
                            },
                            plotBackgroundColor: Qa
                        },
                        labels: {
                            smartLabel: J
                        },
                        colors: "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "),
                        credits: {
                            href: E.CREDIT_HREF,
                            text: E.CREDIT_STRING,
                            enabled: !1
                        },
                        legend: {
                            enabled: !1
                        },
                        series: [],
                        subtitle: {
                            text: Y
                        },
                        title: {
                            text: Y
                        },
                        tooltip: {
                            enabled: !1
                        },
                        exporting: {
                            buttons: {
                                exportButton: {},
                                printButton: {
                                    enabled: !1
                                }
                            }
                        }
                    },
                    M = c[sa],
                    L = z = w = S = 0,
                    x = r = D = 0;
                $ = e.jsVars.cfgStore;
                e = c.chart;
                fa = e.toolbar = {
                    button: {}
                };
                B = fa.button;
                delete d.graph;
                ga(c.chart.style);
                e.events.click = this.linkClickFN;
                B.scale = f(n.toolbarbuttonscale, 1.15);
                B.width = f(n.toolbarbuttonwidth, 15);
                B.height = f(n.toolbarbuttonheight, 15);
                B.radius = f(n.toolbarbuttonradius,
                    2);
                B.spacing = f(n.toolbarbuttonspacing, 5);
                B.fill = ma(g(n.toolbarbuttoncolor, "ffffff"));
                B.labelFill = ma(g(n.toolbarlabelcolor, "cccccc"));
                B.symbolFill = ma(g(n.toolbarsymbolcolor, "ffffff"));
                B.hoverFill = ma(g(n.toolbarbuttonhovercolor, "ffffff"));
                B.stroke = ma(g(n.toolbarbuttonbordercolor, "bbbbbb"));
                B.symbolStroke = ma(g(n.toolbarsymbolbordercolor, "9a9a9a"));
                B.strokeWidth = f(n.toolbarbuttonborderthickness, 1);
                B.symbolStrokeWidth = f(n.toolbarsymbolborderthickness, 1);
                d = B.symbolPadding = f(n.toolbarsymbolpadding, 5);
                B.symbolHPadding =
                    f(n.toolbarsymbolhpadding, d);
                B.symbolVPadding = f(n.toolbarsymbolvpadding, d);
                B = fa.position = g(n.toolbarposition, "tr").toLowerCase();
                switch (B) {
                    case "tr":
                    case "tl":
                    case "br":
                    case "bl":
                        break;
                    default:
                        B = "tr"
                }
                d = fa.hAlign = "left" === (Y + n.toolbarhalign).toLowerCase() ? "l" : B.charAt(1);
                B = fa.vAlign = "bottom" === (Y + n.toolbarvalign).toLowerCase() ? "b" : B.charAt(0);
                fa.hDirection = f(n.toolbarhdirection, "r" === d ? -1 : 1);
                fa.vDirection = f(n.toolbarvdirection, "b" === B ? -1 : 1);
                fa.vMargin = f(n.toolbarvmargin, 6);
                fa.hMargin = f(n.toolbarhmargin,
                    10);
                fa.x = f(n.toolbarx, "l" === d ? 0 : a);
                fa.y = f(n.toolbary, "t" === B ? 0 : b);
                void 0 !== g(n.clickurl) && (e.link = n.clickurl, e.style.cursor = "pointer");
                z = f($.showpercentvalues, n.showpercentvalues, 0);
                w = g($.numberitemsperpage, n.numberitemsperpage);
                f($.showshadow, n.showshadow, 0);
                r = g($.basefont, n.basefont, "Verdana,sans");
                A = Ta($.basefontsize, n.basefontsize, 10);
                A += Ra;
                y = ka(g($.basefontcolor, n.basefontcolor, u.getColor("baseFontColor")));
                d = ka(g($.alternaterowbgcolor, n.alternaterowbgcolor, u.getColor("altHGridColor")));
                fa = g($.alternaterowbgalpha,
                    n.alternaterowbgalpha, u.getColor("altHGridAlpha")) + Y;
                B = f($.listrowdividerthickness, n.listrowdividerthickness, 1);
                s = ka(g($.listrowdividercolor, n.listrowdividercolor, u.getColor("borderColor")));
                p = f($.listrowdivideralpha, n.listrowdivideralpha, u.getColor("altHGridAlpha")) + 15 + Y;
                N = f($.colorboxwidth, n.colorboxwidth, 8);
                C = f($.colorboxheight, n.colorboxheight, 8);
                I = f($.navbuttonradius, n.navbuttonradius, 7);
                O = ka(g($.navbuttoncolor, n.navbuttoncolor, u.getColor("canvasBorderColor")));
                t = ka(g($.navbuttonhovercolor, n.navbuttonhovercolor,
                    u.getColor("altHGridColor")));
                D = f($.textverticalpadding, n.textverticalpadding, 3);
                K = f($.navbuttonpadding, n.navbuttonpadding, 5);
                U = f($.colorboxpadding, n.colorboxpadding, 10);
                W = f($.valuecolumnpadding, n.valuecolumnpadding, 10);
                V = f($.namecolumnpadding, n.namecolumnpadding, 5);
                H = f($.borderthickness, n.borderthickness, 1);
                Q = ka(g($.bordercolor, n.bordercolor, u.getColor("borderColor")));
                v = g($.borderalpha, n.borderalpha, u.getColor("borderAlpha")) + Y;
                R = g($.bgcolor, n.bgcolor, "FFFFFF");
                Z = g($.bgalpha, n.bgalpha, ya);
                G = g($.bgratio,
                    n.bgratio, ya);
                $ = g($.bgangle, n.bgangle, ra);
                e.borderRadius = H / 16;
                e.borderWidth = H;
                e.borderColor = T({
                    FCcolor: {
                        color: Q,
                        alpha: v
                    }
                });
                e.backgroundColor = {
                    FCcolor: {
                        color: R,
                        alpha: Z,
                        ratio: G,
                        angle: $
                    }
                };
                e.borderRadius = f(n.borderradius, 0);
                $ = {
                    fontFamily: r,
                    fontSize: A,
                    color: y
                };
                ga($);
                J.setStyle($);
                for (r = 0; r < q; r += 1)
                    if (A = h[r], H = k.getCleanValue(A.value), Q = oa(Ha(A.label, A.name)), y = ka(g(A.color, u.getPlotColor())), g(A.alpha, n.plotfillalpha, ya), Q != Y || null != H) ca.push({
                        value: H,
                        label: Q,
                        color: y
                    }), S += H, x += 1;
                for (r = 0; r < x; r += 1) A = ca[r],
                    H = A.value, A.dataLabel = A.label, A.displayValue = z ? k.percentValue(H / S * 100) : k.dataLabels(H), h = J.getOriSize(A.displayValue), L = Math.max(L, h.width + W);
                w ? w >= x ? (z = F / x, w = x) : (k = F - 2 * (K + I), z = k / w) : (S = parseInt($.lineHeight, 10), S = Math.max(S + 2 * D, C), w = F / S, w >= x ? (z = F / x, w = x) : (k = F - 2 * (K + I), w = Math.floor(k / S), z = k / w));
                D = P - U - N - V - L - W;
                r = U + N + V;
                k = g(n.basefont, "Verdana,sans");
                L = Ta(n.basefontsize, 10);
                u = g(n.basefontcolor, u.getColor("baseFontColor"));
                h = g(n.outcnvbasefont, k);
                A = Ta(n.outcnvbasefontsize, L);
                q = A + Ra;
                n = g(n.outcnvbasefontcolor,
                    u).replace(/^#?([a-f0-9]+)/ig, "#$1");
                L += Ra;
                u = u.replace(/^#?([a-f0-9]+)/ig, "#$1");
                M.trendStyle = M.outCanvasStyle = {
                    fontFamily: h,
                    color: n,
                    fontSize: q
                };
                ga(M.trendStyle);
                M.inCanvasStyle = {
                    fontFamily: k,
                    fontSize: L,
                    color: u
                };
                c.tooltip.style = {
                    fontFamily: k,
                    fontSize: L,
                    lineHeight: void 0,
                    color: u
                };
                c.tooltip.shadow = !1;
                e.height = F;
                e.width = P;
                e.rowHeight = z;
                e.labelX = r;
                e.colorBoxWidth = N;
                e.colorBoxHeight = C;
                e.colorBoxX = U;
                e.valueX = U + N + V + D + W;
                e.valueColumnPadding = W;
                e.textStyle = $;
                e.listRowDividerAttr = {
                    "stroke-width": B,
                    stroke: {
                        FCcolor: {
                            color: s,
                            alpha: p
                        }
                    }
                };
                e.alternateRowColor = {
                    FCcolor: {
                        color: d,
                        alpha: fa
                    }
                };
                e.navButtonRadius = I;
                e.navButtonPadding = K;
                e.navButtonColor = O;
                e.navButtonHoverColor = t;
                e.lineHeight = parseInt($.lineHeight, 10);
                F = [];
                n = 0;
                M = !0;
                for (r = 0; r < x & 0 !== w; r += 1) 0 === r % w && (F.push({
                    data: [],
                    visible: M
                }), M = !1, n += 1), A = ca[r], P = J.getSmartText(A.dataLabel, D, z), F[n - 1].data.push({
                    label: P.text,
                    originalText: P.tooltext,
                    displayValue: A.displayValue,
                    y: A.value,
                    color: A.color
                });
                c.series = F;
                l.base.parseExportOptions.call(this, c);
                c.tooltip.enabled = !!c.exporting.enabled;
                return c
            },
            creditLabel: !1
        }, l.base);
        l("renderer.bubble", {
            drawPlotBubble: function(a, m) {
                var c = this,
                    d = c.options,
                    n = d.chart,
                    h = d.plotOptions.series,
                    r = h.dataLabels && h.dataLabels.style || {},
                    ca = {
                        fontFamily: r.fontFamily,
                        fontSize: r.fontSize,
                        lineHeight: r.lineHeight,
                        fontWeight: r.fontWeight,
                        fontStyle: r.fontStyle
                    },
                    r = c.paper,
                    P = c.elements,
                    q = a.items,
                    J = a.graphics = a.graphics || [],
                    k = c.xAxis[m.xAxis || 0],
                    F = c.yAxis[m.yAxis || 0],
                    u = a.data,
                    w = !1 !== (d.tooltip || {}).enabled,
                    z, l, h = isNaN(+h.animation) && h.animation.duration || 1E3 * h.animation,
                    A = !1 === m.visible ? "hidden" : "visible",
                    d = d.plotOptions.bubble,
                    y = d.zMax,
                    d = d.bubbleScale,
                    fa = s(c.canvasHeight, c.canvasWidth) / 8,
                    y = H(y),
                    B, g, t, N, C, I, O, D, S, K, U;
                B = c.layers;
                g = B.dataset = B.dataset || r.group("dataset-orphan");
                var W = B.tracker,
                    V, x, Q = function(a) {
                        ua.call(this, c, a)
                    },
                    v = function(a, d, b) {
                        return function(m) {
                            a.attr(d);
                            ua.call(this, c, m, b)
                        }
                    };
                c.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", ca);
                B.datalabels ? B.datalabels.attr("class", "fusioncharts-datalabels") : B.datalabels = r.group({
                        "class": "fusioncharts-datalabels"
                    },
                    "datalables").insertAfter(g);
                ca = g.bubble = g.bubble || r.group("bubble", g);
                n.clipBubbles && !ca.attrs["clip-rect"] && ca.attr({
                    "clip-rect": P["clip-canvas"]
                });
                B = 0;
                for (g = u.length; B < g; B += 1) {
                    t = u[B];
                    K = U = x = null;
                    S = t.marker;
                    if (null !== t.y && S && S.enabled) {
                        N = t.link;
                        n = t.toolText;
                        C = f(t.x, B);
                        I = t.y;
                        P = {
                            index: B,
                            link: N,
                            value: I,
                            y: I,
                            x: C,
                            z: t.z,
                            displayValue: t.displayValue,
                            toolText: t.toolText,
                            id: a.userID,
                            datasetIndex: a.index,
                            datasetName: a.name,
                            visible: a.visible
                        };
                        D = F.getAxisPosition(I);
                        O = k.getAxisPosition(C);
                        l = H(t.z);
                        V = p(l * fa / y) *
                            d || 0;
                        l = z = {};
                        t.hoverEffects && (l = {
                            fill: T(S.fillColor),
                            "stroke-width": S.lineWidth,
                            stroke: T(S.lineColor),
                            r: V
                        }, z = t.rolloverProperties, z = {
                            fill: T(z.fillColor),
                            "stroke-width": z.lineWidth,
                            stroke: T(z.lineColor),
                            r: V * z.scale
                        });
                        K = r.circle(O, D, 0, ca).attr({
                            fill: T(S.fillColor),
                            "stroke-width": S.lineWidth,
                            stroke: T(S.lineColor),
                            visibility: A
                        }).animate({
                            r: V || 0
                        }, h, "easeOut", c.getAnimationCompleteFn());
                        if (N || w) V < b && (V = b), U = r.circle(O, D, V, W).attr({
                            cursor: N ? "pointer" : "",
                            stroke: e,
                            "stroke-width": S.lineWidth,
                            fill: e,
                            ishot: !!N,
                            visibility: A
                        });
                        (U || K).data("eventArgs", P).click(Q).hover(v(K, z, "DataPlotRollOver"), v(K, l, "DataPlotRollOut")).tooltip(n);
                        q[B] = {
                            index: B,
                            x: C,
                            y: I,
                            z: t.z,
                            value: I,
                            graphic: K,
                            dataLabel: x,
                            tracker: U
                        };
                        x = c.drawPlotLineLabel(a, m, B, O, D)
                    } else q[B] = {
                        index: B,
                        x: C,
                        y: I
                    };
                    x && J.push(x);
                    K && J.push(K);
                    U && J.push(U)
                }
                a.visible = !1 !== m.visible;
                return a
            }
        }, l["renderer.cartesian"]);
        l("renderer.ssgrid", {
            drawGraph: function() {
                var a = this.options.series,
                    b = this.elements,
                    c = b.plots,
                    d = a.length,
                    n;
                c || (c = this.plots = this.plots || [], b.plots = c);
                this.drawSSGridNavButton();
                for (n = 0; n < d; n++)(b = c[n]) || c.push(b = {
                    items: [],
                    data: a[n].data
                }), a[n].data && a[n].data.length && this.drawPlot(b, a[n]);
                1 < d && this.nenagitePage(0)
            },
            drawPlot: function(a) {
                var b = a.data,
                    c = this.paper,
                    d = this.options.chart,
                    n = d.colorBoxHeight,
                    e = d.colorBoxWidth,
                    r = d.colorBoxX,
                    h = d.labelX,
                    f = d.valueX,
                    q = d.rowHeight,
                    J = d.width,
                    k = d.listRowDividerAttr,
                    F = k["stroke-width"],
                    k = T(k.stroke),
                    P = F % 2 / 2,
                    u = d.textStyle,
                    z = this.layers,
                    z = z.dataset = z.dataset || c.group("dataset-orphan"),
                    w = T(d.alternateRowColor);
                a = a.items;
                var A = 0,
                    l, y, B, g;
                b &&
                    b.length || (b = []);
                k = {
                    stroke: k,
                    "stroke-width": F
                };
                g = 0;
                for (F = b.length; g < F; g += 1) B = b[g], y = B.y, l = a[g] = {
                    index: g,
                    value: y,
                    graphic: null,
                    dataLabel: null,
                    dataValue: null,
                    alternateRow: null,
                    listRowDivider: null,
                    hot: null
                }, null !== y && void 0 !== y && (0 === g % 2 && (l.alternateRow = c.rect(0, A, J, q, 0, z).attr({
                    fill: w,
                    "stroke-width": 0
                })), y = p(A) + P, l.listRowDivider = c.path(["M", 0, y, "L", J, y], z).attr(k), l.graphic = c.rect(r, A + q / 2 - n / 2, e, n, 0, z).attr({
                    fill: B.color,
                    "stroke-width": 0,
                    stroke: "#000000"
                }), y = l.dataLabel = c.text().attr({
                    text: B.label,
                    title: B.originalText || "",
                    x: h,
                    y: A + q / 2,
                    fill: u.color,
                    direction: d.textDirection,
                    "text-anchor": "start"
                }).css(u), z.appendChild(y), l = l.dataValue = c.text().attr({
                    text: B.displayValue,
                    title: B.originalText || "",
                    x: f,
                    y: A + q / 2,
                    fill: u.color,
                    direction: d.textDirection,
                    "text-anchor": "start"
                }).css(u), z.appendChild(l), A += q);
                y = p(A) + P;
                c.path(["M", 0, y, "L", J, y], z).attr(k)
            },
            drawSSGridNavButton: function() {
                var a = this,
                    b = a.paper,
                    c = a.options,
                    d = c.chart,
                    n = c.series,
                    e = d.navButtonColor,
                    r = d.navButtonHoverColor,
                    c = d.navButtonRadius,
                    h = .67 *
                    c,
                    f = d.navButtonPadding + h + (n && n[0].data && n[0].data.length * d.rowHeight) + .5 * c,
                    d = d.width - 20,
                    q, J, k, F;
                1 < n.length && (F = a.naviigator = b.group("navigation"), a.navElePrv = n = b.group(F), q = b.path(["M", 20, f, "L", 20 + c + h, f - h, 20 + c, f, 20 + c + h, f + h, "Z"]).attr({
                        fill: e,
                        "stroke-width": 0,
                        cursor: "pointer"
                    }), n.appendChild(q), k = b.circle(20 + c, f, c).attr({
                        fill: Qa,
                        "stroke-width": 0,
                        cursor: "pointer"
                    }).mouseover(function() {
                        q.attr({
                            fill: r,
                            cursor: "pointer"
                        })
                    }).mouseout(function() {
                        q.attr({
                            fill: e
                        })
                    }).click(function() {
                        a.nenagitePage(-1)
                    }), n.appendChild(k),
                    a.navEleNxt = n = b.group(F), J = b.path(["M", d, f, "L", d - c - h, f - h, d - c, f, d - c - h, f + h, "Z"]).attr({
                        fill: e,
                        "stroke-width": 0,
                        cursor: "pointer"
                    }), n.appendChild(J), b = b.circle(d - c, f, c).attr({
                        fill: Qa,
                        "stroke-width": 0,
                        cursor: "pointer"
                    }).mouseover(function() {
                        J.attr({
                            fill: r
                        })
                    }).mouseout(function() {
                        J.attr({
                            fill: e
                        })
                    }).click(function() {
                        a.nenagitePage(1)
                    }), n.appendChild(b))
            },
            nenagitePage: function(a) {
                var b = this.plots,
                    c = b.length;
                a = (this.currentSeriesIndex || 0) + (a || 0);
                var d, n = function(a) {
                    a.graphic && a.graphic.hide();
                    a.dataLabel &&
                        a.dataLabel.hide();
                    a.dataValue && a.dataValue.hide();
                    a.alternateRow && a.alternateRow.hide();
                    a.listRowDivider && a.listRowDivider.hide()
                };
                if (b[a]) {
                    for (d = c; d--;) xa(b[d].items, n);
                    xa(b[a].items, function(a) {
                        a.graphic && a.graphic.show();
                        a.dataLabel && a.dataLabel.show();
                        a.dataValue && a.dataValue.show();
                        a.alternateRow && a.alternateRow.show();
                        a.listRowDivider && a.listRowDivider.show()
                    });
                    this.currentSeriesIndex = a;
                    ja.raiseEvent("pageNavigated", {
                        pageId: a,
                        data: this.options.series[a].data
                    }, this.logic.chartInstance);
                    0 ===
                        a ? this.navElePrv.hide() : this.navElePrv.show();
                    a === c - 1 ? this.navEleNxt.hide() : this.navEleNxt.show()
                }
            }
        }, l["renderer.root"]);
        Ka.prototype = {
            getArcPath: function(a, b, c, d, n, e, r, h, f, q) {
                return c == n && d == e ? [] : ["A", r, h, 0, q, f, n, e]
            },
            parseColor: function(a, b) {
                var c, d, n, e, r, h, f, q, J, k, F = b / 2,
                    P, u, z, l, A;
                A = 3;
                this.use3DLighting ? (c = ha(a, 80), d = ha(a, 75), h = ea(a, 85), f = ea(a, 70), q = ea(a, 40), J = ea(a, 50), ea(a, 30), k = ea(a, 65), ha(a, 85), n = ha(a, 69), e = ha(a, 75), r = ha(a, 95)) : (A = 10, c = ha(a, 90), d = ha(a, 87), h = ea(a, 93), f = ea(a, 87), q = ea(a, 80), k = J =
                    ea(a, 85), ea(a, 80), r = ha(a, 85), n = ha(a, 75), e = ha(a, 80));
                P = d + X + h + X + f + X + h + X + d;
                z = b + X + b + X + b + X + b + X + b;
                u = d + X + a + X + h + X + a + X + d;
                l = F + X + F + X + F + X + F + X + F;
                q = d + X + a + X + q + X + a + X + d;
                n = e + X + h + X + J + X + h + X + n;
                e = "FFFFFF" + X + "FFFFFF" + X + "FFFFFF" + X + "FFFFFF" + X + "FFFFFF";
                A = 0 + X + F / A + X + b / A + X + F / A + X + 0;
                return {
                    frontOuter: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftX,
                            y1: 0,
                            x2: this.rightX,
                            y2: 0,
                            color: n,
                            alpha: z,
                            angle: 0,
                            ratio: "0,20,15,15,50"
                        }
                    },
                    backOuter: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftX,
                            y1: 0,
                            x2: this.rightX,
                            y2: 0,
                            color: q,
                            alpha: l,
                            angle: 0,
                            ratio: "0,62,8,8,22"
                        }
                    },
                    frontInner: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftInnerX,
                            y1: 0,
                            x2: this.rightInnerX,
                            y2: 0,
                            color: u,
                            alpha: l,
                            angle: 0,
                            ratio: "0,25,5,5,65"
                        }
                    },
                    backInner: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftInnerX,
                            y1: 0,
                            x2: this.rightInnerX,
                            y2: 0,
                            color: P,
                            alpha: z,
                            angle: 0,
                            ratio: "0,62,8,8,22"
                        }
                    },
                    topBorder: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftX,
                            y1: 0,
                            x2: this.rightX,
                            y2: 0,
                            color: e,
                            alpha: A,
                            angle: 0,
                            ratio: "0,20,15,15,50"
                        }
                    },
                    topInnerBorder: {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            x1: this.leftInnerX,
                            y1: 0,
                            x2: this.rightInnerX,
                            y2: 0,
                            color: e,
                            alpha: A,
                            angle: 0,
                            ratio: "0,50,15,15,20"
                        }
                    },
                    top: aa ? {
                        FCcolor: {
                            gradientUnits: "userSpaceOnUse",
                            radialGradient: !0,
                            cx: this.cx,
                            cy: this.cy,
                            r: this.rx,
                            fx: this.cx - .3 * this.rx,
                            fy: this.cy + 1.2 * this.ry,
                            color: k + X + r,
                            alpha: b + X + b,
                            ratio: "0,100"
                        }
                    } : {
                        FCcolor: {
                            gradientUnits: "objectBoundingBox",
                            color: f + X + f + X + h + X + d,
                            alpha: b + X + b + X + b + X + b,
                            angle: -72,
                            ratio: "0,8,15,77"
                        }
                    },
                    bottom: T(ma(a, F)),
                    startSlice: T(ma(c, b)),
                    endSlice: T(ma(c, b))
                }
            },
            rotate: function(a) {
                if (!this.hasOnePoint) {
                    for (var b =
                            this.pointElemStore, c = 0, d = b.length, e; c < d; c += 1) e = b[c], e = e._confObject, e.start += a, e.end += a, this.updateSliceConf(e);
                    this.refreshDrawing()
                }
            },
            refreshDrawing: function() {
                return function() {
                    var a = this.slicingWallsArr,
                        b = 0,
                        c, d = a.length,
                        e, h, r, f, P = this.slicingWallsFrontGroup,
                        q = this.slicingWallsBackGroup;
                    a: {
                        var J = a[0] && a[0]._conf.index,
                            k, F;
                        f = J <= y;
                        e = 1;
                        for (c = a.length; e < c; e += 1)
                            if (F = a[e]._conf.index, k = F <= y, k != f || F < J) break a;
                        e = 0
                    }
                    for (; b < d; b += 1, e += 1) e === d && (e = 0), c = a[e], f = c._conf.index, f < Wa ? P.appendChild(c) : f <= y ? (h ? c.insertBefore(h) :
                        P.appendChild(c), h = c) : f < Xa ? (r ? c.insertBefore(r) : q.appendChild(c), r = c) : q.appendChild(c)
                }
            }(),
            updateSliceConf: function(a, b) {
                var c = this.getArcPath,
                    d = a.start,
                    e = a.end,
                    h = da(d),
                    r = da(e),
                    f, P, q, J, k, F, l, g, z, t, A, s, p, B, D, H, N = this.cx,
                    C = this.cy,
                    I = this.rx,
                    O = this.ry,
                    x = I + (aa ? -1 : 2),
                    L = O + (aa ? -1 : 2),
                    K = this.innerRx,
                    U = this.innerRy,
                    W = this.depth,
                    V = this.depthY,
                    G = a.elements,
                    Q, v, R, Z, M, $, la;
                f = w(h);
                P = u(h);
                q = w(r);
                J = u(r);
                k = N + I * f;
                F = C + O * P;
                l = N + x * f;
                g = C + L * P;
                Q = F + W;
                v = N + I * q;
                R = C + O * J;
                z = N + x * q;
                t = C + L * J;
                Z = R + W;
                this.isDoughnut ? (A = N + K * f, s = C + U * P, D =
                    s + W, p = N + K * q, B = C + U * J, H = B + W, a.startSlice = ["M", k, F, "L", k, Q, A, D, A, s, "Z"], a.endSlice = ["M", v, R, "L", v, Z, p, H, p, B, "Z"]) : (a.startSlice = ["M", k, F, "L", k, Q, N, V, N, C, "Z"], a.endSlice = ["M", v, R, "L", v, Z, N, V, N, C, "Z"]);
                aa ? (c = (h > r ? S : 0) + r - h, a.clipTopPath = this.isDoughnut ? ["M", k, F, "A", I, O, 0, c > y ? 1 : 0, 1, v, R, "L", p, B, "A", K, U, 0, c > y ? 1 : 0, 0, A, s, "Z"] : ["M", k, F, "A", I, O, 0, c > y ? 1 : 0, 1, v, R, "L", this.cx, this.cy, "Z"], a.clipOuterFrontPath1 = this.clipPathforNoClip, a.clipTopBorderPath = ["M", l, g, "A", x, L, 0, c > y ? 1 : 0, 1, z, t, "L", v, R, v, R + 1, "A", I, O, 0, c > y ?
                    1 : 0, 0, k, F + 1, "L", k, F, "Z"
                ], d != e ? h > r ? h < y ? (a.clipOuterFrontPath = ["M", this.rightX, C, "A", I, O, 0, 0, 1, v, R, "v", W, "A", I, O, 0, 0, 0, this.rightX, C + W, "Z"], a.clipOuterFrontPath1 = ["M", this.leftX, C, "A", I, O, 0, 0, 0, k, F, "v", W, "A", I, O, 0, 0, 1, this.leftX, C + W, "Z"], a.clipOuterBackPath = ["M", this.rightX, C, "A", I, O, 0, 1, 0, this.leftX, C, "v", W, "A", I, O, 0, 1, 1, this.rightX, C + W, "Z"], this.isDoughnut && (a.clipInnerBackPath = ["M", this.rightInnerX, C, "A", K, U, 0, 1, 0, this.leftInnerX, C, "v", W, "A", K, U, 0, 1, 1, this.rightInnerX, C + W, "Z"], a.clipInnerFrontPath = ["M", this.rightInnerX, C, "A", K, U, 0, 0, 1, p, B, "v", W, "A", K, U, 0, 0, 0, this.rightInnerX, C + W, "Z", "M", this.leftInnerX, C, "A", K, U, 0, 0, 0, A, s, "v", W, "A", K, U, 0, 0, 1, this.leftInnerX, C + W, "Z"])) : r > y ? (a.clipOuterFrontPath = ["M", this.rightX, C, "A", I, O, 0, 1, 1, this.leftX, C, "v", W, "A", I, O, 0, 1, 0, this.rightX, C + W, "Z"], a.clipOuterBackPath = ["M", this.leftX, C, "A", I, O, 0, 0, 1, v, R, "v", W, "A", I, O, 0, 0, 0, this.leftX, C + W, "Z", "M", this.rightX, C, "A", I, O, 0, 0, 0, k, F, "v", W, "A", I, O, 0, 0, 1, this.rightX, C + W, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M",
                    this.rightInnerX, C, "A", K, U, 0, 1, 1, this.leftInnerX, C, "v", W, "A", K, U, 0, 1, 0, this.rightInnerX, C + W, "Z"
                ], a.clipInnerBackPath = ["M", this.leftInnerX, C, "A", K, U, 0, 0, 1, p, B, "v", W, "A", K, U, 0, 0, 0, this.leftInnerX, C + W, "Z", "M", this.rightInnerX, C, "A", K, U, 0, 0, 0, A, s, "v", W, "A", K, U, 0, 0, 1, this.rightInnerX, C + W, "Z"])) : (a.clipOuterFrontPath = ["M", this.rightX, C, "A", I, O, 0, 0, 1, v, R, "v", W, "A", I, O, 0, 0, 0, this.rightX, C + W, "Z"], a.clipOuterBackPath = ["M", k, F, "A", I, O, 0, 0, 1, this.rightX, C, "v", W, "A", I, O, 0, 0, 0, k, Q, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M", this.rightInnerX, C, "A", K, U, 0, 0, 1, p, B, "v", W, "A", K, U, 0, 0, 0, this.rightInnerX, C + W, "Z"], a.clipInnerBackPath = ["M", A, s, "A", K, U, 0, 0, 1, this.rightInnerX, C, "v", W, "A", K, U, 0, 0, 0, A, D, "Z"])) : h < y ? r > y ? (a.clipOuterFrontPath = ["M", k, F, "A", I, O, 0, 0, 1, this.leftX, C, "v", W, "A", I, O, 0, 0, 0, k, Q, "Z"], a.clipOuterBackPath = ["M", this.leftX, C, "A", I, O, 0, 0, 1, v, R, "v", W, "A", I, O, 0, 0, 0, this.leftX, C + W, "Z"], this.isDoughnut && (a.clipInnerFrontPath = ["M", A, s, "A", K, U, 0, 0, 1, this.leftInnerX, C, "v", W, "A", K, U, 0, 0, 0, A, D, "Z"], a.clipInnerBackPath = ["M", this.leftInnerX, C, "A", K, U, 0, 0, 1, p, B, "v", W, "A", K, U, 0, 0, 0, this.leftInnerX, C + W, "Z"])) : (a.clipOuterFrontPath = ["M", k, F, "A", I, O, 0, 0, 1, v, R, "v", W, "A", I, O, 0, 0, 0, k, Q, "Z"], a.clipOuterBackPath = this.clipPathforNoClip, this.isDoughnut && (a.clipInnerFrontPath = ["M", A, s, "A", K, U, 0, 0, 1, p, B, "v", W, "A", K, U, 0, 0, 0, A, D, "Z"], a.clipInnerBackPath = this.clipPathforNoClip)) : (a.clipOuterFrontPath = this.clipPathforNoClip, a.clipOuterBackPath = ["M", k, F, "A", I, O, 0, 0, 1, v, R, "v", W, "A", I, O, 0, 0, 0, k, Q, "Z"], this.isDoughnut && (a.clipInnerFrontPath =
                    this.clipPathforNoClip, a.clipInnerBackPath = ["M", A, s, "A", K, U, 0, 0, 1, p, B, "v", W, "A", K, U, 0, 0, 0, A, D, "Z"])) : a.clipOuterFrontPath = a.clipOuterBackPath = a.clipInnerBackPath = a.clipInnerFrontPath = this.clipPathforNoClip, b || (a.elements.startSlice._conf.index = h, a.elements.endSlice._conf.index = r, a.elements.frontOuter._conf.index = Ja(r, h), a.elements.frontOuter1 && (a.elements.frontOuter1._conf.index = h, a.elements.frontOuter1.attr("litepath", [a.clipOuterFrontPath1])), a.thisElement.attr("litepath", [a.clipTopPath]), a.elements.bottom.attr("litepath", [a.clipTopPath]), a.elements.bottomBorder.attr("litepath", [a.clipTopPath]), a.elements.topBorder && a.elements.topBorder.attr("litepath", [a.clipTopBorderPath]), a.elements.frontOuter.attr("litepath", [a.clipOuterFrontPath]), a.elements.backOuter.attr("litepath", [a.clipOuterBackPath]), this.isDoughnut && (a.elements.backInner.attr("litepath", [a.clipInnerBackPath]), a.elements.frontInner.attr("litepath", [a.clipInnerFrontPath]), a.elements.backInner._conf.index = Ja(r, h)), this.hasOnePoint ? (a.elements.startSlice.hide(),
                    a.elements.endSlice.hide()) : (a.elements.startSlice.attr("litepath", [a.startSlice]).show(), a.elements.endSlice.attr("litepath", [a.endSlice]).show()))) : (l = this.moveCmdArr, g = this.lineCmdArr, z = this.closeCmdArr, M = this.centerPoint, t = this.leftPoint, x = this.topPoint, L = this.rightPoint, W = this.bottomPoint, $ = this.leftDepthPoint, la = this.rightDepthPoint, f = this.leftInnerPoint, P = this.rightInnerPoint, q = this.leftInnerDepthPoint, J = this.rightInnerDepthPoint, a.clipOuterFrontPath1 = [], d != e ? (h > r ? h < y ? (d = c(N, C, k, F, this.leftX,
                    C, I, O, 1, 0), e = c(N, C, this.leftX, C, this.rightX, C, I, O, 1, 0), R = c(N, C, this.rightX, C, v, R, I, O, 1, 0), a.clipOuterBackPath = l.concat(t, e, g, la, c(N, V, this.rightX, V, this.leftX, V, I, O, 0, 0), z), a.clipOuterFrontPath1 = l.concat([k, F], d, g, $, c(N, V, this.leftX, V, k, Q, I, O, 0, 0), z), a.clipOuterFrontPath = l.concat(L, R, g, [v, Z], c(N, V, v, Z, this.rightX, V, I, O, 0, 0), z), a.clipTopBorderPath = l.concat([k, F], d, e, R), this.isDoughnut ? (k = c(N, C, p, B, this.rightInnerX, C, K, U, 0, 0), F = c(N, C, this.rightInnerX, C, this.leftInnerX, C, K, U, 0, 0), s = c(N, C, this.leftInnerX,
                    C, A, s, K, U, 0, 0), a.clipInnerBackPath = l.concat(P, F, g, q, c(N, V, this.leftInnerX, V, this.rightInnerX, V, K, U, 1, 0), z), a.clipInnerFrontPath = l.concat(f, s, g, [A, D], c(N, V, A, D, this.leftInnerX, V, K, U, 1, 0), z, l, [p, B], k, g, J, c(N, V, this.rightInnerX, V, p, H, K, U, 1, 0), z), a.clipTopPath = a.clipTopBorderPath.concat(g, [p, B], k, F, s, z), a.clipTopBorderPath = a.clipTopBorderPath.concat(l, [p, B], k, F, s)) : a.clipTopPath = a.clipTopBorderPath.concat(g, M, z)) : r > y ? (d = c(N, C, k, F, this.rightX, C, I, O, 1, 0), e = c(N, C, this.rightX, C, this.leftX, C, I, O, 1, 0), R = c(N,
                    C, this.leftX, C, v, R, I, O, 1, 0), a.clipOuterFrontPath = l.concat(L, e, g, $, c(N, V, this.leftX, V, this.rightX, V, I, O, 0, 0), z), a.clipOuterBackPath = l.concat([k, F], d, g, la, c(N, V, this.rightX, V, k, Q, I, O, 0, 0), z, l, t, R, g, [v, Z], c(N, V, v, Z, this.leftX, V, I, O, 0, 0), z), a.clipTopBorderPath = l.concat([k, F], d, e, R), this.isDoughnut ? (k = c(N, C, p, B, this.leftInnerX, C, K, U, 0, 0), F = c(N, C, this.leftInnerX, C, this.rightInnerX, C, K, U, 0, 0), s = c(N, C, this.rightInnerX, C, A, s, K, U, 0, 0), a.clipInnerFrontPath = l.concat(f, F, g, J, c(N, V, this.rightInnerX, V, this.leftInnerX,
                    V, K, U, 1, 0), z), a.clipInnerBackPath = l.concat(P, s, g, [A, D], c(N, V, A, D, this.rightInnerX, V, K, U, 1, 0), z, l, [p, B], k, g, q, c(N, V, this.leftInnerX, V, p, H, K, U, 1, 0), z), a.clipTopPath = a.clipTopBorderPath.concat(g, [p, B], k, F, s, z), a.clipTopBorderPath = a.clipTopBorderPath.concat(l, [p, B], k, F, s)) : a.clipTopPath = a.clipTopBorderPath.concat(g, M, z)) : (d = c(N, C, k, F, this.rightX, C, I, O, 1, 0), e = c(N, C, this.rightX, C, v, R, I, O, 1, 0), a.clipOuterFrontPath = l.concat(L, e, g, [v, Z], c(N, V, v, Z, this.rightX, V, I, O, 0, 0), z), a.clipOuterBackPath = l.concat([k, F],
                    d, g, la, c(N, V, this.rightX, V, k, Q, I, O, 0, 0), z), a.clipTopBorderPath = l.concat([k, F], d, e), this.isDoughnut ? (k = c(N, C, p, B, this.rightInnerX, C, K, U, 0, 0), F = c(N, C, this.rightInnerX, C, A, s, K, U, 0, 0), a.clipInnerFrontPath = l.concat([p, B], k, g, J, c(N, V, this.rightInnerX, V, p, H, K, U, 1, 0), z), a.clipInnerBackPath = l.concat(P, F, g, [A, D], c(N, V, A, D, this.rightInnerX, V, K, U, 1, 0), z), a.clipTopPath = a.clipTopBorderPath.concat(g, [p, B], k, F, z), a.clipTopBorderPath = a.clipTopBorderPath.concat(l, [p, B], k, F)) : a.clipTopPath = a.clipTopBorderPath.concat(g,
                    M, z)) : h < y ? r > y ? (d = c(N, C, k, F, this.leftX, C, I, O, 1, 0), e = c(N, C, this.leftX, C, v, R, I, O, 1, 0), a.clipOuterBackPath = l.concat(t, e, g, [v, Z], c(N, V, v, Z, this.leftX, V, I, O, 0, 0), z), a.clipOuterFrontPath = l.concat([k, F], d, g, $, c(N, V, this.leftX, V, k, Q, I, O, 0, 0), z), a.clipTopBorderPath = l.concat([k, F], d, e), this.isDoughnut ? (k = c(N, C, p, B, this.leftInnerX, C, K, U, 0, 0), F = c(N, C, this.leftInnerX, C, A, s, K, U, 0, 0), a.clipInnerBackPath = l.concat([p, B], k, g, q, c(N, V, this.leftInnerX, V, p, H, K, U, 1, 0), z), a.clipInnerFrontPath = l.concat(f, F, g, [A, D], c(N, V, A,
                    D, this.leftInnerX, V, K, U, 1, 0), z), a.clipTopPath = a.clipTopBorderPath.concat(g, [p, B], k, F, z), a.clipTopBorderPath = a.clipTopBorderPath.concat(l, [p, B], k, F)) : a.clipTopPath = a.clipTopBorderPath.concat(g, M, z)) : (d = c(N, C, k, F, v, R, I, O, 1, 0), a.clipOuterBackPath = l.concat([k, F]), a.clipTopBorderPath = a.clipOuterBackPath.concat(d), a.clipOuterFrontPath = a.clipTopBorderPath.concat(g, [v, Z], c(N, V, v, Z, k, Q, I, O, 0, 0), z), this.isDoughnut ? (k = c(N, C, p, B, A, s, K, U, 0, 0), a.clipInnerBackPath = l.concat([p, B]), a.clipTopPath = a.clipTopBorderPath.concat(g, [p, B], k, z), a.clipTopBorderPath = a.clipTopBorderPath.concat(l, [p, B], k), a.clipInnerFrontPath = a.clipInnerBackPath.concat(k, g, [A, D], c(N, V, A, D, p, H, K, U, 1, 0), z)) : a.clipTopPath = a.clipTopBorderPath.concat(g, M, z)) : (d = c(N, C, k, F, v, R, I, O, 1, 0), a.clipOuterFrontPath = l.concat([k, F]), a.clipTopBorderPath = a.clipOuterFrontPath.concat(d), a.clipOuterBackPath = a.clipTopBorderPath.concat(g, [v, Z], c(N, V, v, Z, k, Q, I, O, 0, 0), z), this.isDoughnut ? (k = c(N, C, p, B, A, s, K, U, 0, 0), a.clipInnerFrontPath = l.concat([p, B]), a.clipTopPath = a.clipTopBorderPath.concat(g, [p, B], k, z), a.clipTopBorderPath = a.clipTopBorderPath.concat(a.clipInnerFrontPath, k), a.clipInnerBackPath = a.clipInnerFrontPath.concat(k, g, [A, D], c(N, V, A, D, p, H, K, U, 1, 0), z)) : a.clipTopPath = a.clipTopBorderPath.concat(g, M, z)), d = l.concat(t, g, L), k = l.concat(x, g, W), a.clipTopPath = a.clipTopPath.concat(d, k), a.clipOuterFrontPath = a.clipOuterFrontPath.concat(d), a.clipOuterFrontPath1 = a.clipOuterFrontPath1.concat(d), a.clipOuterBackPath = a.clipOuterBackPath.concat(d), this.isDoughnut && (k = l.concat(f, g, P), a.clipInnerFrontPath =
                    a.clipInnerFrontPath.concat(k), a.clipInnerBackPath = a.clipInnerBackPath.concat(k))) : (a.clipTopPath = a.clipOuterFrontPath = a.clipOuterBackPath = [], this.isDoughnut && (a.clipInnerFrontPath = a.clipInnerBackPath = [])), b || (a.elements.startSlice._conf.index = h, a.elements.endSlice._conf.index = r, a.elements.frontOuter._conf.index = Ja(r, h), a.elements.frontOuter1 && (a.elements.frontOuter1._conf.index = h, G.frontOuter1.attr({
                        path: a.clipOuterFrontPath1
                    })), a.thisElement.attr({
                        path: a.clipTopPath
                    }), G.topBorder.attr({
                        path: a.clipTopBorderPath
                    }),
                    G.bottom.attr({
                        path: a.clipTopPath
                    }), G.bottomBorder.attr({
                        path: a.clipTopBorderPath
                    }), G.frontOuter.attr({
                        path: a.clipOuterFrontPath
                    }), G.backOuter.attr({
                        path: a.clipOuterBackPath
                    }), this.isDoughnut && (G.frontInner.attr({
                        path: a.clipInnerFrontPath
                    }), G.backInner.attr({
                        path: a.clipInnerBackPath
                    })), this.hasOnePoint ? (a.elements.startSlice.hide(), a.elements.endSlice.hide()) : (a.elements.startSlice.attr({
                        path: a.startSlice
                    }).show(), a.elements.endSlice.attr({
                        path: a.endSlice
                    }).show())))
            },
            onPlotHover: function(a, b) {
                var c =
                    this.pointElemStore[a]._confObject,
                    d = c.thisElement,
                    e = c.elements,
                    h = this.colorObjs[a],
                    r = h.hoverProps,
                    f = b ? r.hoverColorObj : h.color,
                    l = h.showBorderEffect,
                    q = b ? r.borderColor : h.borderColor,
                    h = b ? r.borderWidth : h.borderWidth;
                aa ? (r = {
                    fill: T(f.top),
                    "stroke-width": 0
                }, 1 !== l && (r.stroke = q, r["stroke-width"] = h), d._attr(r), l && e.topBorder.attr({
                    fill: T(f.topBorder),
                    "stroke-width": 0
                })) : (d._attr({
                    fill: T(f.top),
                    "stroke-width": 0
                }), e.topBorder.attr({
                    stroke: q,
                    "stroke-width": h
                }));
                e.bottom.attr({
                    fill: T(f.bottom),
                    "stroke-width": 0
                });
                e.bottomBorder.attr({
                    stroke: q,
                    "stroke-width": h
                });
                e.frontOuter.attr({
                    fill: T(f.frontOuter),
                    "stroke-width": 0
                });
                e.backOuter.attr({
                    fill: T(f.backOuter),
                    "stroke-width": 0
                });
                e.startSlice.attr({
                    fill: T(f.startSlice),
                    stroke: q,
                    "stroke-width": h
                });
                e.endSlice.attr({
                    fill: T(f.endSlice),
                    stroke: q,
                    "stroke-width": h
                });
                d = da(c.start);
                c = da(c.end);
                (d > c ? S : 0) + c - d > y && e.frontOuter1.attr({
                    fill: T(f.frontOuter),
                    "stroke-width": 0
                });
                this.isDoughnut && (e.frontInner.attr({
                    fill: T(f.frontInner),
                    "stroke-width": 0
                }), e.backInner.attr({
                    fill: T(f.backInner),
                    "stroke-width": 0
                }))
            },
            createSlice: function() {
                var a = {
                        stroke: !0,
                        strokeWidth: !0,
                        "stroke-width": !0,
                        dashstyle: !0,
                        "stroke-dasharray": !0,
                        translateX: !0,
                        translateY: !0,
                        "stroke-opacity": !0,
                        transform: !0,
                        fill: !0,
                        opacity: !0,
                        ishot: !0,
                        start: !0,
                        end: !0,
                        cursor: !0
                    },
                    b = function(b, c) {
                        var d, e, m = this,
                            h = m._confObject,
                            n, f = h.elements,
                            l, P, g = h.Pie3DManager;
                        "string" === typeof b && void 0 !== c && null !== c && (d = b, b = {}, b[d] = c);
                        if (b && "string" !== typeof b) {
                            void 0 !== b.cx && (b.start = b.cx);
                            void 0 !== b.cy && (b.end = b.cy);
                            for (d in b)
                                if (e = b[d], a[d])
                                    if (h[d] =
                                        e, "ishot" === d || "cursor" === d) {
                                        n = {};
                                        n[d] = e;
                                        for (l in f) f[l].attr(n);
                                        m._attr(n)
                                    } else if ("transform" === d) {
                                for (l in f) f[l].attr({
                                    transform: b[d]
                                });
                                m._attr({
                                    transform: b[d]
                                })
                            } else "stroke" === d || "strokeWidth" === d || "stroke-width" === d || "dashstyle" === d || "stroke-dasharray" === d ? (n = {}, n[d] = e, f.topBorder && f.topBorder.attr(n), f.startSlice.attr(n), f.endSlice.attr(n), f.bottomBorder.attr(n)) : "fill" === d || "start" !== d && "end" !== d || (P = !0);
                            else m._attr(d, e);
                            P && (g.updateSliceConf(h), g.refreshDrawing())
                        } else m = m._attr(b);
                        return m
                    },
                    c = function(a, b, d, c) {
                        var e = this._confObject.elements,
                            m;
                        for (m in e)
                            if (d) e[m].drag(b, d, c);
                            else e[m].on(a, b);
                        return d ? this.drag(b, d, c) : this._on(a, b)
                    },
                    d = function() {
                        var a = this._confObject.elements,
                            b;
                        for (b in a) a[b].hide();
                        return this._hide()
                    },
                    e = function() {
                        var a = this._confObject.elements,
                            b;
                        for (b in a) a[b].show();
                        return this._show()
                    },
                    h = function() {
                        var a = this._confObject,
                            b = a.elements,
                            d;
                        for (d in b) b[d].destroy();
                        aa && (a.clipTop.destroy(), a.clipOuterFront.destroy(), a.clipOuterBack.destroy(), a.clipOuterFront1 &&
                            a.clipOuterFront1.destroy(), a.clipInnerFront && a.clipInnerFront.destroy(), a.clipInnerBack && a.clipInnerBack.destroy());
                        return this._destroy()
                    };
                return function(a, f, l, q, P, k, g, u, p, z) {
                    var w = this.renderer;
                    l = this.parseColor(l, q);
                    a = {
                        start: a,
                        end: f,
                        elements: {},
                        Pie3DManager: this
                    };
                    f = this.slicingWallsArr;
                    q = a.elements;
                    var A, s = aa ? "litepath" : "path";
                    z && (this.colorObjs[g] = {
                        color: l,
                        borderColor: P,
                        borderWidth: k,
                        showBorderEffect: !1
                    }, z.hoverColorObj = this.parseColor(z.color, z.alpha), this.colorObjs[g].hoverProps = z);
                    this.updateSliceConf(a, !0);
                    aa ? (z = {
                        fill: T(l.top),
                        "stroke-width": 0
                    }, 1 !== p && (z.stroke = P, z["stroke-width"] = k), z = w[s](a.clipTopPath, this.topGroup).attr(z), p && (q.topBorder = w[s](a.clipTopBorderPath, this.topGroup).attr({
                        fill: T(l.topBorder),
                        "stroke-width": 0
                    }))) : (z = w[s](a.clipTopPath, this.topGroup).attr({
                        fill: T(l.top),
                        "stroke-width": 0
                    }), q.topBorder = w[s](a.clipTopBorderPath, this.topGroup).attr({
                        stroke: P,
                        "stroke-width": k
                    }));
                    q.bottom = w[s](a.clipTopPath, this.bottomBorderGroup).attr({
                        fill: T(l.bottom),
                        "stroke-width": 0
                    });
                    q.bottomBorder =
                        w[s](aa ? a.clipTopPath : a.clipTopBorderPath, this.bottomBorderGroup).attr({
                            stroke: P,
                            "stroke-width": k
                        });
                    q.frontOuter = w[s](a.clipOuterFrontPath, this.slicingWallsFrontGroup).attr({
                        fill: T(l.frontOuter),
                        "stroke-width": 0
                    });
                    q.backOuter = w[s](a.clipOuterBackPath, this.outerBackGroup).attr({
                        fill: T(l.backOuter),
                        "stroke-width": 0
                    });
                    q.startSlice = w[s](a.startSlice, this.slicingWallsFrontGroup).attr({
                        fill: T(l.startSlice),
                        stroke: P,
                        "stroke-width": k
                    });
                    q.endSlice = w[s](a.endSlice, this.slicingWallsFrontGroup).attr({
                        fill: T(l.endSlice),
                        stroke: P,
                        "stroke-width": k
                    });
                    P = da(a.start);
                    k = da(a.end);
                    p = (P > k ? S : 0) + k - P;
                    p > y && (q.frontOuter1 = w[s](a.clipOuterFrontPath1, this.slicingWallsFrontGroup).attr({
                        fill: T(l.frontOuter),
                        "stroke-width": 0
                    }), q.frontOuter1._conf = {
                        index: P,
                        isStart: .5,
                        pIndex: g
                    }, aa && (a.clipOuterFront1 = a.clipOuterFrontPath1));
                    q.frontOuter._conf = {
                        index: Ja(k, P),
                        isStart: .5,
                        pIndex: g
                    };
                    q.startSlice._conf = {
                        index: P,
                        isStart: 0,
                        pIndex: g
                    };
                    q.endSlice._conf = {
                        index: k,
                        isStart: 1,
                        pIndex: g
                    };
                    this.hasOnePoint && (q.startSlice.hide(), q.endSlice.hide());
                    this.isDoughnut ?
                        (q.frontInner = w[s](a.clipInnerFrontPath, this.innerFrontGroup).attr({
                            fill: T(l.frontInner),
                            "stroke-width": 0
                        }), q.backInner = w[s](a.clipInnerBackPath, this.innerBackGroup).attr({
                            fill: T(l.backInner),
                            "stroke-width": 0
                        }), q.backInner._conf = {
                            index: Ja(k, P),
                            isStart: .5,
                            pIndex: g
                        }, p > y ? aa ? f.push(q.startSlice, q.frontOuter1, q.frontOuter, q.backInner, q.endSlice) : f.push(q.startSlice, q.frontOuter1, q.frontOuter, q.endSlice) : aa ? f.push(q.startSlice, q.frontOuter, q.backInner, q.endSlice) : f.push(q.startSlice, q.frontOuter, q.endSlice)) :
                        p > y ? f.push(q.startSlice, q.frontOuter1, q.frontOuter, q.endSlice) : f.push(q.startSlice, q.frontOuter, q.endSlice);
                    if (void 0 !== u) {
                        for (A in q) q[A].tooltip(u);
                        z.tooltip(u)
                    }
                    aa && (a.clipTop = a.clipTopPath, a.clipOuterFront = a.clipOuterFrontPath, a.clipOuterBack = a.clipOuterBackPath, this.isDoughnut && (a.clipInnerFront = a.clipInnerFrontPath, a.clipInnerBack = a.clipInnerBackPath));
                    z._confObject = a;
                    a.thisElement = z;
                    z._destroy = z.destroy;
                    z.destroy = h;
                    z._show = z.show;
                    z.show = e;
                    z._hide = z.hide;
                    z.hide = d;
                    z._on = z.on;
                    z.on = c;
                    z._attr = z.attr;
                    z.attr = b;
                    this.pointElemStore.push(z);
                    return z
                }
            }()
        };
        Ka.prototype.constructor = Ka;
        l("renderer.pie3d", {
            type: "pie3d",
            isHovered: !1,
            translate: function() {
                var a = 0,
                    b = this.options,
                    c = b.series[0],
                    d = b.plotOptions.series.dataLabels,
                    e = b.plotOptions.pie3d,
                    h = g(c.startAngle, 0) % 360,
                    r = c.managedPieSliceDepth,
                    l = c.slicedOffset = e.slicedOffset,
                    y = this.canvasWidth,
                    q = this.canvasHeight,
                    J = [this.canvasLeft + .5 * y, this.canvasTop + .5 * q - .5 * r],
                    k, F, t, D, z, b = c.data,
                    H, A = s(y, q),
                    x, L, B, la = d.distance,
                    ba = c.pieYScale,
                    N = c.pieSliceDepth,
                    C = c.slicedOffsetY =
                    l * ba;
                J.push(e.size, e.innerSize || 0);
                J = na(J, function(a, b) {
                    return (x = /%$/.test(a)) ? [y, q - r, A, A][b] * parseInt(a, 10) / 100 : a
                });
                J[2] /= 2;
                J[3] /= 2;
                J.push(J[2] * ba);
                J.push((J[2] + J[3]) / 2);
                J.push(J[5] * ba);
                c.getX = function(a, b) {
                    t = P.asin((a - J[1]) / (J[2] + la));
                    return J[0] + (b ? -1 : 1) * w(t) * (J[2] + la)
                };
                c.center = J;
                xa(b, function(b) {
                    a += b.y
                });
                c.labelsRadius = J[2] + la;
                c.labelsRadiusY = c.labelsRadius * ba;
                c.quadrantHeight = (q - r) / 2;
                c.quadrantWidth = y / 2;
                D = -h * M;
                D = p(1E3 * D) / 1E3;
                z = D + S;
                e = f(parseInt(d.style.fontSize, 10), 10) + 4;
                c.maxLabels = G(c.quadrantHeight /
                    e);
                c.labelFontSize = e;
                c.connectorPadding = f(d.connectorPadding, 5);
                c.isSmartLineSlanted = g(d.isSmartLineSlanted, !0);
                c.connectorWidth = f(d.connectorWidth, 1);
                c.enableSmartLabels = d.enableSmartLabels;
                c.Pie3DManager || (c.Pie3DManager = new Ka(J[0], J[1], J[2], J[3], ba, N, this.layers.dataset, this.paper, 1 === c.data.length, c.use3DLighting));
                xa(b, function(b) {
                    k = D;
                    H = a ? b.y / a : 0;
                    D = p(1E3 * (D + H * S)) / 1E3;
                    D > z && (D = z);
                    F = D;
                    b.shapeArgs = {
                        start: p(1E3 * k) / 1E3,
                        end: p(1E3 * F) / 1E3
                    };
                    b.centerAngle = t = (F + k) / 2 % S;
                    b.slicedTranslation = [p(w(t) * l), p(u(t) *
                        C)];
                    L = w(t) * J[2];
                    c.radiusY = B = u(t) * J[4];
                    b.tooltipPos = [J[0] + .7 * L, J[1] + B];
                    b.percentage = 100 * H;
                    b.total = a
                })
            },
            drawPlotPie3d: function(a, b) {
                this.translate();
                var c = this,
                    d = a.items,
                    e = a.data,
                    h = c.options,
                    r = h.plotOptions,
                    l = r.series,
                    P = c.layers,
                    q = c.elements.plots[0],
                    g = c.datasets[0],
                    r = r.series.dataLabels,
                    k = l.dataLabels.style,
                    l = f(a.moveDuration, l.animation.duration),
                    s = c.paper,
                    p = h.tooltip || {},
                    p = p && !1 !== p.enabled,
                    y = g.slicedOffset,
                    z = g.slicedOffsetY,
                    t = c.plotDragMove,
                    A = c.plotDragStart,
                    D = c.plotDragEnd,
                    H = c.plotRollOver,
                    B = c.plotRollOut,
                    x = !!c.datasets[0].enableRotation,
                    L = b.showBorderEffect,
                    N = e.length,
                    C = h.chart,
                    h = C.usePerPointLabelColor,
                    C = C.textDirection,
                    I = {
                        fontFamily: k.fontFamily,
                        fontSize: k.fontSize,
                        lineHeight: k.lineHeight,
                        fontWeight: k.fontWeight,
                        fontStyle: k.fontStyle
                    },
                    O = function(a) {
                        return function() {
                            c.legendClick(a, !0, !1)
                        }
                    },
                    S = function(a) {
                        return function() {
                            return c.getEventArgs(a)
                        }
                    },
                    G = function(a) {
                        return function(b, d, c, e, m) {
                            t.call(a, b, d, c, e, m)
                        }
                    },
                    K = function(a) {
                        return function(b, d, c) {
                            A.call(a, b, d, c)
                        }
                    },
                    U = function(a) {
                        return function(b) {
                            D.call(a,
                                b)
                        }
                    },
                    W = function(a) {
                        return function(b) {
                            B.call(a, b)
                        }
                    },
                    V = function(a) {
                        return function(b) {
                            H.call(a, b)
                        }
                    },
                    M, Q, v, R, Z, la, $, ba, qa, E;
                e && N || (e = []);
                q.singletonCase = 1 === N;
                q.chartPosition = wa(c.container);
                q.pieCenter = g.center;
                q.timerThreshold = 30;
                for (E = -1; ++E < N;) v = e[E], k = v.y, R = v.displayValue, I = v.sliced, ba = v.shapeArgs, M = v.centerAngle, qa = v.toolText, la = (Z = !!v.link) || x || !v.doNotSlice, null === k || void 0 === k || (Q = d[E]) || (b.data[E].plot = Q = d[E] = {
                    chart: c,
                    index: E,
                    seriesData: q,
                    value: k,
                    angle: M,
                    link: v.link,
                    shapeArgs: ba,
                    slicedX: I &&
                        !q.singletonCase ? w(M) * y : 0,
                    slicedY: I && !q.singletonCase ? u(M) * z : 0,
                    sliced: I,
                    labelText: R,
                    name: v.name,
                    label: v.name,
                    percentage: v.percentage,
                    toolText: qa,
                    originalIndex: N - E - 1,
                    style: v.style,
                    graphic: g.Pie3DManager.createSlice(ba.start, ba.end, v.color, v._3dAlpha, v.borderColor, v.borderWidth, E, p ? qa : "", L, v.rolloverProperties)
                }, b.data[E].legendClick = O(Q), b.data[E].getEventArgs = S(Q), Q.graphic.plotItem = Q, Q.graphic.data("plotItem", Q), Q.transX = w(M) * y, Q.transY = u(M) * z, Q.slicedTranslation = "t" + Q.transX + "," + Q.transY, M = {
                    index: b.reversePlotOrder ?
                        E : N - 1 - E,
                    link: v.link,
                    value: v.y,
                    displayValue: v.displayValue,
                    categoryLabel: v.categoryLabel,
                    isSliced: v.sliced,
                    toolText: v.toolText
                }, Q.graphic.attr({
                    transform: "t" + Q.slicedX + "," + Q.slicedY,
                    ishot: la,
                    cursor: Z ? "pointer" : ""
                }).drag(G(Q), K(Q), U(Q)).data("groupId", E).data("eventArgs", M).mouseover(V(Q)).mouseout(W(Q)), void 0 !== R && (k = v.style, I = {
                    fontFamily: k.fontFamily,
                    fontSize: k.fontSize,
                    lineHeight: k.lineHeight,
                    fontWeight: k.fontWeight,
                    fontStyle: k.fontStyle
                }, Q.dataLabel = s.text(P.dataset).css(I).attr({
                    text: R,
                    title: v.originalText ||
                        "",
                    fill: (h ? T(v.color) : k.color) || "#000000",
                    "text-bound": [k.backgroundColor, k.borderColor, k.borderThickness, k.borderPadding, k.borderRadius, k.borderDash],
                    visibility: "hidden",
                    direction: C,
                    ishot: la,
                    cursor: Z ? "pointer" : ""
                }).data("eventArgs", M).hover(V(Q), W(Q)).drag(G(Q), K(Q), U(Q)).data("plotItem", Q), 0 < r.distance && ($ = r.connectorWidth) && r.enableSmartLabels && (Q.connector = s.path("M 0 0 l 0 0", P.dataset).attr({
                    "stroke-width": $,
                    stroke: r.connectorColor || "#606060",
                    visibility: "hidden",
                    ishot: la,
                    cursor: Z ? "pointer" : ""
                }).data("eventArgs", M).hover(V(Q), W(Q)).drag(G(Q), K(Q), U(Q)).data("plotItem", Q))));
                g.Pie3DManager.refreshDrawing();
                0 < l ? c.animate(d, l) : c.placeDataLabels(!1, d)
            },
            rotate: function(a) {
                var b = this.datasets[0],
                    c = this.elements.plots[0].items,
                    d = b.slicedOffset,
                    e = b.slicedOffsetY,
                    h = b.startAngle,
                    r;
                a = isNaN(a) ? -b._lastAngle : a;
                r = (a - h) % 360;
                b.startAngle = f(a, b.startAngle) % 360;
                r = -(r * ba) / 180;
                b.Pie3DManager && b.Pie3DManager.rotate(r);
                xa(c, function(a) {
                    var b = a.graphic,
                        c = a.shapeArgs,
                        m = c.start += r,
                        c = c.end += r,
                        h = a.angle = da((m +
                            c) / 2),
                        m = a.sliced,
                        c = w(h),
                        h = u(h);
                    a.slicedTranslation = [p(c * d), p(h * e)];
                    a.transX = a.slicedTranslation[0];
                    a.transY = a.slicedTranslation[1];
                    a.slicedX = m ? w(r) * d : 0;
                    a.slicedY = m ? u(r) * e : 0;
                    b && m && a.graphic.attr({
                        transform: "t" + a.slicedTranslation[0] + "," + a.slicedTranslation[1]
                    })
                });
                this.placeDataLabels(!0, c)
            },
            plotRollOver: function(a) {
                var b = this.chart,
                    c = b.datasets[0].Pie3DManager;
                this.seriesData.isRotating || (ua.call(this.graphic, b, a, "DataPlotRollOver"), c.colorObjs[this.index] && c.onPlotHover(this.index, !0));
                b.isHovered = !0
            },
            plotRollOut: function(a) {
                var b = this.chart,
                    c = b.datasets[0].Pie3DManager;
                this.seriesData.isRotating || (ua.call(this.graphic, b, a, "DataPlotRollOut"), c.colorObjs[this.index] && c.onPlotHover(this.index, !1));
                b.isHovered = !1
            },
            plotDragStart: function(a, b, c) {
                var d = this.seriesData,
                    e = this.chart.datasets[0];
                d.isRotating = !1;
                e.enableRotation && (a = Oa.call(c, a, b, d.pieCenter, d.chartPosition, e.pieYScale), e.dragStartAngle = a, e._lastAngle = -e.startAngle, e.startingAngleOnDragStart = e.startAngle)
            },
            plotDragEnd: function(a) {
                var b =
                    this.chart,
                    c = b.datasets[0],
                    d = c.Pie3DManager,
                    e = c.startAngle,
                    h = this.seriesData,
                    f = {
                        hcJSON: {
                            series: [{
                                startAngle: e
                            }]
                        }
                    };
                b.disposed || ta(b.logic.chartInstance.jsVars._reflowData, f, !0);
                !h.isRotating && b.plotGraphicClick.call(this, a);
                h.isRotating && (setTimeout(function() {
                    h.isRotating = !1
                }, 0), ja.raiseEvent("rotationEnd", {
                    startingAngle: da(e, !0),
                    changeInAngle: e - c.startingAngleOnDragStart
                }, b.logic.chartInstance), !b.isHovered && d.colorObjs[this.index] && d.onPlotHover(this.index, !1))
            },
            plotDragMove: function(a, b, c, d, e) {
                var h =
                    this.chart;
                a = h.datasets[0];
                b = this.seriesData;
                h.options.series[0].enableRotation && !b.singletonCase && (c = Oa.call(e, c, d, b.pieCenter, b.chartPosition, a.pieYScale), b.isRotating || (a.dragStartAngle !== c && (b.isRotating = !0), ja.raiseEvent("rotationStart", {
                    startingAngle: da(a.startAngle, !0)
                }, h.logic.chartInstance)), d = c - a.dragStartAngle, a.dragStartAngle = c, b.moveDuration = 0, a._lastAngle += 180 * d / ba, c = (new Date).getTime(), !a._lastTime || a._lastTime + b.timerThreshold < c) && (a._lastTime || h.rotate(), b.timerId = setTimeout(function() {
                    h.disposed &&
                        h.disposing || h.rotate()
                }, b.timerThreshold), a._lastTime = c)
            },
            animate: function(a, b) {
                var c, d, e, h = a.length,
                    f, l, P, q = this,
                    g, k = function() {
                        q.disposed || q.disposing || q.placeDataLabels(!1, a)
                    };
                if (q.datasets[0].alphaAnimation) q.layers.dataset.attr({
                    opacity: 0
                }), q.layers.dataset.animate({
                    opacity: 1
                }, b, "ease-in", function() {
                    q.disposed || q.disposing || q.placeDataLabels(!1, a)
                });
                else
                    for (c = 0; c < h; c++) f = a[c], l = f.graphic, P = f.shapeArgs, f = 2 * ba, l && (l.attr({
                        start: f,
                        end: f
                    }), g = P.start, P = P.end, d ? l.animateWith(d, e, {
                            cx: g - f,
                            cy: P - f
                        },
                        b, "ease-in") : (e = ia.animation({
                        cx: g - f,
                        cy: P - f
                    }, b, "ease-in", k), d = l.animate(e)))
            },
            placeDataLabels: function() {
                var a = function(a, b) {
                        return a.point.value - b.point.value
                    },
                    b = function(a, b) {
                        return a.angle - b.angle
                    },
                    c = ["start", "start", "end", "end"],
                    d = [-1, 1, 1, -1],
                    e = [1, 1, -1, -1];
                return function(l, r) {
                    var g = this.datasets[0],
                        H = this.smartLabel,
                        q = this.options.plotOptions.series.dataLabels,
                        J = q.style,
                        k = f(D(parseFloat(J.lineHeight)), 12),
                        F = Ha(q.placeInside, !1),
                        M = q.skipOverlapLabels,
                        x = q.manageLabelOverflow,
                        z = q.connectorPadding,
                        L = q.connectorWidth,
                        A, G, la = 0 < q.distance,
                        B = g.center,
                        ba = B[1],
                        E = B[0],
                        N = B[2],
                        C = B[4],
                        I = [
                            [],
                            [],
                            [],
                            []
                        ],
                        O, T, X, K = this.canvasLeft,
                        U = this.canvasTop,
                        W = this.canvasWidth,
                        V, Y, Q, v, R, Z, ha, $, ga, ka, ea, ma = g.labelsRadius,
                        da = p(100 * g.labelsRadiusY) / 100,
                        ia = g.labelFontSize,
                        aa = ia,
                        Ga = aa / 2,
                        z = [z, z, -z, -z],
                        Ea = g.maxLabels,
                        oa = g.isSmartLineSlanted,
                        ra = g.enableSmartLabels,
                        ja, g = g.pieSliceDepth / 2;
                    l || H.setStyle(J);
                    if (1 == r.length) v = r[0], ja = v.dataLabel, v.slicedTranslation = [K, U], ja && (ja.attr({
                        visibility: h,
                        "text-anchor": "middle",
                        x: E,
                        y: ba + Ga -
                            2
                    }), ja.x = E);
                    else if (F) xa(r, function(a) {
                        if (ja = a.dataLabel) {
                            ea = a.angle;
                            ka = ba + B[6] * u(ea) + Ga - 2;
                            ha = E + B[5] * w(ea);
                            ja.x = ha;
                            ja._x = ha;
                            ja.y = ka;
                            if (a.sliced) {
                                a = a.slicedTranslation;
                                var b = a[1] - U;
                                ha += a[0] - K;
                                ka += b
                            }
                            ja.attr({
                                visibility: h,
                                align: "middle",
                                x: ha,
                                y: ka
                            })
                        }
                    });
                    else {
                        xa(r, function(a) {
                            if (ja = a.dataLabel) ea = a.angle, 0 > ea && (ea = S + ea), O = 0 <= ea && ea < Wa ? 1 : ea < y ? 2 : ea < Xa ? 3 : 0, I[O].push({
                                point: a,
                                angle: ea
                            })
                        });
                        for (X = F = 4; X--;) {
                            if (M && (v = I[X].length - Ea, 0 < v))
                                for (I[X].sort(a), T = I[X].splice(0, v), Y = 0, Q = T.length; Y < Q; Y += 1) v = T[Y].point, v.dataLabel.attr({
                                        visibility: "hidden"
                                    }),
                                    v.connector && v.connector.attr({
                                        visibility: "hidden"
                                    });
                            I[X].sort(b)
                        }
                        X = t(I[0].length, I[1].length, I[2].length, I[3].length);
                        da = t(s(X, Ea) * aa, da + aa);
                        I[1].reverse();
                        I[3].reverse();
                        for (H.setStyle(J); F--;) {
                            Y = I[F];
                            Q = Y.length;
                            M || (aa = Q > Ea ? da / Q : ia, Ga = aa / 2);
                            v = Q * aa;
                            J = da;
                            for (X = 0; X < Q; X += 1, v -= aa) G = qa(da * u(Y[X].angle)), J < G ? G = J : G < v && (G = v), J = (Y[X].oriY = G) - aa;
                            T = c[F];
                            Q = da - (Q - 1) * aa;
                            J = 0;
                            for (X = Y.length - 1; 0 <= X; --X, Q += aa) v = Y[X].point, ea = Y[X].angle, R = v.sliced, ja = v.dataLabel, G = qa(da * u(ea)), G < J ? G = J : G > Q && (G = Q), J = G + aa, $ = (G + Y[X].oriY) /
                                2, G = E + e[F] * ma * w(P.asin($ / da)), $ *= d[F], $ += ba, ga = ba + C * u(ea), Z = E + N * w(ea), (2 > F && G < Z || 1 < F && G > Z) && (G = Z), ha = G + z[F], ka = $ + Ga - 2, A = ha + z[F], ja.x = A, ja._x = A, x && (V = 1 < F ? A - this.canvasLeft : this.canvasLeft + W - A, H.setStyle(v.style), k = f(D(parseFloat(v.style.lineHeight)), 12) + 2 * D(parseFloat(v.style.border), 12), k = H.getSmartText(v.labelText, V, k), ja.attr({
                                    text: k.text,
                                    title: k.tooltext || ""
                                })), ea < y && ($ += g, ga += g, ka += g), ja.y = ka, R && (k = v.transX, R = v.transY, ha += k, G += k, Z += k, ga += R, A += k), ja.attr({
                                    visibility: h,
                                    "text-anchor": T,
                                    x: A,
                                    y: $
                                }),
                                la && L && ra && (A = v.connector, v.connectorPath = G = ["M", Z, ga, "L", oa ? G : Z, $, ha, $], A ? (A.attr({
                                    path: G
                                }), A.attr("visibility", h)) : v.connector = A = this.paper.path(G).attr({
                                    "stroke-width": L,
                                    stroke: q.connectorColor || "#606060",
                                    visibility: h
                                }))
                        }
                    }
                }
            }()
        }, l["renderer.piebase"]);
        l("renderer.pie", {
            drawDoughnutCenterLabel: function(a, b, c, d, e, f, l) {
                var P = this.options.series[0];
                f = f || P.lastCenterLabelConfig;
                var g = this.paper,
                    q = this.smartLabel,
                    u = this.layers.dataset,
                    k = this.elements,
                    p = f.padding,
                    s = 2 * f.textPadding,
                    w = {
                        fontFamily: f.font,
                        fontSize: f.fontSize + "px",
                        lineHeight: 1.2 * f.fontSize + "px",
                        fontWeight: f.bold ? "bold" : "",
                        fontStyle: f.italic ? "italic" : ""
                    },
                    z = 1.414 * (.5 * d - p) - s;
                e = 1.414 * (.5 * e - p) - s;
                var y;
                q.setStyle(w);
                q = q.getSmartText(a, z, e);
                (e = k.doughnutCenterLabel) ? (e.attr("text") !== a && this.centerLabelChange(a), y = k.centerLabelOvalBg) : (f.bgOval && (k.centerLabelOvalBg = y = g.circle(b, c, .5 * d - p, u)), e = k.doughnutCenterLabel = g.text(u).hover(this.centerLabelRollover, this.centerLabelRollout).click(this.centerLabelClick), e.chart = this);
                a ? (e.css(w).attr({
                    x: b,
                    y: c,
                    text: q.text,
                    visibility: h,
                    direction: this.options.chart.textDirection,
                    title: f.toolText ? "" : q.tooltext || "",
                    fill: T({
                        FCcolor: {
                            color: f.color,
                            alpha: f.alpha
                        }
                    }),
                    "text-bound": f.bgOval ? "none" : [T({
                        FCcolor: {
                            color: f.bgColor,
                            alpha: f.bgAlpha
                        }
                    }), T({
                        FCcolor: {
                            color: f.borderColor,
                            alpha: f.borderAlpha
                        }
                    }), f.borderThickness, f.textPadding, f.borderRadius]
                }).tooltip(f.toolText), f.bgOval && y && y.attr({
                    visibility: h,
                    fill: Za(f.bgColor),
                    "fill-opacity": f.bgAlpha / 100,
                    stroke: Za(f.borderColor),
                    "stroke-width": f.borderThickness,
                    "stroke-opacity": f.borderAlpha /
                        100
                })) : (e.attr("visibility", "hidden"), y && y.attr("visibility", "hidden"));
                l && (P.lastCenterLabelConfig = f)
            },
            centerLabelRollover: function() {
                var a = this.chart,
                    b = a.fusionCharts,
                    c = a.options.series[0].lastCenterLabelConfig,
                    b = {
                        height: b.args.height,
                        width: b.args.width,
                        pixelHeight: b.ref.offsetHeight,
                        pixelWidth: b.ref.offsetWidth,
                        id: b.args.id,
                        renderer: b.args.renderer,
                        container: b.options.containerElement,
                        centerLabelText: c && c.label
                    };
                this.attr("text") && ja.raiseEvent("centerLabelRollover", b, a.logic.chartInstance, this,
                    a.hoverOnCenterLabel)
            },
            centerLabelRollout: function() {
                var a = this.chart,
                    b = a.fusionCharts,
                    c = a.options.series[0].lastCenterLabelConfig,
                    b = {
                        height: b.args.height,
                        width: b.args.width,
                        pixelHeight: b.ref.offsetHeight,
                        pixelWidth: b.ref.offsetWidth,
                        id: b.args.id,
                        renderer: b.args.renderer,
                        container: b.options.containerElement,
                        centerLabelText: c && c.label
                    };
                this.attr("text") && ja.raiseEvent("centerLabelRollout", b, a.logic.chartInstance, this, a.hoverOffCenterLabel)
            },
            centerLabelClick: function() {
                var a = this.chart,
                    b = a.fusionCharts,
                    c = a.options.series[0].lastCenterLabelConfig,
                    b = {
                        height: b.args.height,
                        width: b.args.width,
                        pixelHeight: b.ref.offsetHeight,
                        pixelWidth: b.ref.offsetWidth,
                        id: b.args.id,
                        renderer: b.args.renderer,
                        container: b.options.containerElement,
                        centerLabelText: c && c.label
                    };
                this.attr("text") && ja.raiseEvent("centerLabelClick", b, a.logic.chartInstance)
            },
            centerLabelChange: function(a) {
                var b = this.fusionCharts;
                ja.raiseEvent("centerLabelChanged", {
                    height: b.args.height,
                    width: b.args.width,
                    pixelHeight: b.ref.offsetHeight,
                    pixelWidth: b.ref.offsetWidth,
                    id: b.args.id,
                    renderer: b.args.renderer,
                    container: b.options.containerElement,
                    centerLabelText: a
                }, this.logic.chartInstance)
            },
            hoverOnCenterLabel: function() {
                var a = this.chart.options.series[0].lastCenterLabelConfig;
                (a.hoverColor || a.hoverAlpha) && this.attr({
                    fill: T({
                        FCcolor: {
                            color: a.hoverColor || a.color,
                            alpha: a.hoverAlpha || a.alpha
                        }
                    })
                })
            },
            hoverOffCenterLabel: function() {
                var a = this.chart.options.series[0].lastCenterLabelConfig;
                (a.hoverColor || a.hoverAlpha) && this.attr({
                    fill: T({
                        FCcolor: {
                            color: a.color,
                            alpha: a.alpha
                        }
                    })
                })
            },
            drawPlotPie: function(a, b) {
                var c = this,
                    d = a.items,
                    e = a.data,
                    l = c.options,
                    P = l.series[0],
                    g = l.plotOptions,
                    p = g.pie,
                    q = g.series,
                    s = c.layers,
                    k = s.dataset,
                    F = c.elements.plots[0],
                    g = g.series.dataLabels,
                    t = q.dataLabels.style,
                    D = q.shadow,
                    q = f(a.moveDuration, q.animation.duration),
                    z = c.paper,
                    G = l.tooltip || {},
                    G = G && !1 !== G.enabled,
                    A = ((b.startAngle *= -y / 180) || 0) % S,
                    H = p.slicedOffset,
                    M = b.valueTotal,
                    B = S / M,
                    x = c.canvasLeft + .5 * c.canvasWidth,
                    L = c.canvasTop + .5 * c.canvasHeight,
                    N = .5 * p.size,
                    p = .5 * (p.innerSize || 0),
                    C = c.plotDragMove,
                    I = c.plotDragStart,
                    O = c.plotDragEnd,
                    la = c.plotRollOver,
                    ba = c.plotRollOut,
                    K = !!c.datasets[0].enableRotation,
                    U = e.length,
                    W = l.chart,
                    l = W.usePerPointLabelColor,
                    W = W.textDirection,
                    V = P.centerLabelConfig,
                    E = V.label,
                    Q = {
                        fontFamily: t.fontFamily,
                        fontSize: t.fontSize,
                        lineHeight: t.lineHeight,
                        fontWeight: t.fontWeight,
                        fontStyle: t.fontStyle
                    },
                    v, R, Z, X, $, qa, Y, ha, ea, ka, ga = a.shadowGroup,
                    aa, da, ja, ma, Ga, Ea = function(a) {
                        return function() {
                            c.legendClick(a, !0, !1)
                        }
                    },
                    oa = function(a) {
                        return function() {
                            return c.getEventArgs(a)
                        }
                    },
                    ra = function() {
                        c.disposed || c.disposing ||
                            c.paper.ca.redrawDataLabels || (c.placeDataLabels(!1, d, a), c.paper.ca.redrawDataLabels = c.redrawDataLabels)
                    };
                e && U || (e = []);
                ga || (ga = a.shadowGroup = z.group(k).toBack());
                F.singletonCase = 1 === U;
                F.chartPosition || (F.chartPosition = wa(c.container));
                F.pieCenter = [x, L];
                F.timerThreshold = 30;
                ea = ha = A;
                for (aa = U; aa--;) R = e[aa], Q = R.y, Z = R.displayValue, $ = R.sliced, t = R.toolText, qa = (X = !!R.link) || K || !R.doNotSlice, null !== Q && void 0 !== Q && (v = R.color.FCcolor, v.r = N, v.cx = x, v.cy = L, R.rolloverProperties && (v = R.rolloverProperties.color.FCcolor,
                    v.r = N, v.cx = x, v.cy = L), ea = ha, ha -= F.singletonCase ? S : Q * B, Y = .5 * (ha + ea), q ? ma = Ga = A : (ma = ha, Ga = ea), (v = d[aa]) || (b.data[aa].plot = v = d[aa] = {
                    chart: c,
                    index: aa,
                    seriesData: F,
                    value: Q,
                    angle: Y,
                    slicedX: w(Y) * H,
                    slicedY: u(Y) * H,
                    sliced: $,
                    labelText: Z,
                    toolText: t,
                    label: R.name,
                    link: R.link,
                    percentage: M ? Q * M / 100 : 0,
                    originalIndex: U - aa - 1,
                    style: R.style,
                    color: R.color,
                    borderColor: R.borderColor,
                    borderWidth: R.borderWidth,
                    rolloverProperties: R.rolloverProperties,
                    center: [x, L],
                    innerDiameter: 2 * p,
                    centerLabelConfig: R.centerLabelConfig,
                    graphic: z.ringpath(x,
                        L, N, p, ma, Ga, s.dataset).attr({
                        "stroke-width": R.borderWidth,
                        "stroke-linejoin": "round",
                        stroke: R.borderColor,
                        fill: T(R.color),
                        "stroke-dasharray": R.dashStyle,
                        redrawDataLabels: A,
                        ishot: qa,
                        cursor: X ? "pointer" : ""
                    }).shadow(D && R.shadow, ga).drag(C, I, O).hover(la, ba)
                }, G && v.graphic.tooltip(t), b.data[aa].legendClick = Ea(v), b.data[aa].getEventArgs = oa(v), v.graphic.data("plotItem", v), X = {
                    index: b.reversePlotOrder ? aa : U - 1 - aa,
                    link: R.link,
                    value: R.y,
                    displayValue: R.displayValue,
                    categoryLabel: R.categoryLabel,
                    isSliced: R.sliced,
                    toolText: R.toolText
                }, v.graphic.data("eventArgs", X), void 0 !== Z && (t = R.style, Q = {
                    fontFamily: t.fontFamily,
                    fontSize: t.fontSize,
                    lineHeight: t.lineHeight,
                    fontWeight: t.fontWeight,
                    fontStyle: t.fontStyle
                }, v.dataLabel = z.text(k).css(Q).attr({
                    text: Z,
                    fill: (l ? T(R.color) : t.color) || "#000000",
                    "text-bound": [t.backgroundColor, t.borderColor, t.borderThickness, t.borderPadding, t.borderRadius, t.borderDash],
                    ishot: qa,
                    direction: W,
                    visibility: "hidden"
                }).drag(C, I, O).hover(la, ba).data("eventArgs", X).hide(), v.dataLabel.data("plotItem",
                    v), 0 < g.distance && (ka = g.connectorWidth) && g.enableSmartLabels && (v.connector = z.path("M 0 0 l 0 0", k).attr({
                    "stroke-width": ka,
                    stroke: g.connectorColor || "#606060",
                    visibility: h,
                    ishot: !0
                }).data("eventArgs", X).drag(C, I, O).hover(la, ba), v.connector.data("plotItem", v)))), v.angle = Y, v.transX = w(Y) * H, v.transY = u(Y) * H, v.slicedTranslation = "t" + w(Y) * H + "," + u(Y) * H, q ? da ? v.graphic.animateWith(da, ja, {
                    ringpath: [x, L, N, p, ha, ea],
                    transform: v.sliced ? v.slicedTranslation : ""
                }, q, "easeIn") : (ja = ia.animation({
                    ringpath: [x, L, N, p, ha, ea],
                    redrawDataLabels: c,
                    transform: v.sliced ? v.slicedTranslation : ""
                }, q, "easeIn", ra), da = v.graphic.animate(ja)) : v.graphic.attr({
                    transform: v.sliced ? v.slicedTranslation : ""
                }));
                E && p && c.drawDoughnutCenterLabel(E, x, L, 2 * p, 2 * p, V, !0);
                P.lastCenterLabelConfig = V;
                q ? P.doughnutCenterLabel && P.doughnutCenterLabel.attr({
                    "fill-opacity": 0
                }).animate(ia.animation({
                    "fill-opacity": 100
                }, 100).delay(100 < q ? q - 100 : 0)) : c.placeDataLabels(!1, d, a)
            },
            rotate: function(a, b) {
                var c = a.items,
                    d = a.data,
                    e = this.options.plotOptions.pie,
                    h = e.slicedOffset,
                    f = S / b.valueTotal,
                    l = this.canvasLeft + .5 * this.canvasWidth,
                    P = this.canvasTop + .5 * this.canvasHeight,
                    g = .5 * e.size,
                    e = .5 * (e.innerSize || 0),
                    p, k, s, t, y;
                s = (b.startAngle || 0) % S;
                for (y = d.length; y--;) p = d[y], k = p.y, null !== k && void 0 !== k && (p = c[y], t = s, s -= p.seriesData.singletonCase ? S : k * f, k = .5 * (s + t), p.angle = k, p.transX = w(k) * h, p.transY = u(k) * h, p.slicedTranslation = "t" + w(k) * h + "," + u(k) * h, p.graphic.attr({
                    ringpath: [l, P, g, e, s, t],
                    transform: p.sliced ? p.slicedTranslation : ""
                }));
                this.placeDataLabels(!0, c, a)
            }
        }, l["renderer.piebase"])
    },
    [3, 2,
        2, "sr4"
    ]
]);
FusionCharts.register("module", ["private", "modules.renderer.js-zoomline", function() {
    var wa = this,
        na = wa.hcLib,
        da = wa.window,
        Ja = /msie/i.test(da.navigator.userAgent) && !da.opera,
        Oa = na.chartAPI,
        Ka = na.chartAPI,
        ja = na.extend2,
        E = na.raiseEvent,
        ia = na.pluck,
        x = na.pluckNumber,
        Ia = na.getFirstColor,
        Y = na.graphics.convertColor,
        Va = na.bindSelectionEvent,
        g = na.createTrendLine,
        va = na.parseUnsafeString,
        Ba = na.regescape,
        f = na.Raphael,
        Ha = na.hasTouch,
        Sa = na.getMouseCoordinate,
        oa = na.FC_CONFIG_STRING,
        sa = "rgba(192,192,192," + (Ja ? .002 :
            1E-6) + ")",
        ta = da.Math,
        za = ta.ceil,
        T = ta.floor,
        La = ta.max,
        Ma = ta.min,
        aa = ta.cos,
        xa = ta.sin,
        Aa = da.parseFloat,
        Pa = da.parseInt,
        ua;
    ja(na.eventList, {
        zoomed: "FC_Zoomed",
        pinned: "FC_Pinned",
        resetzoomchart: "FC_ResetZoomChart"
    });
    Oa("zoomline", {
        friendlyName: "Zoomable and Panable Multi-series Line Chart",
        rendererId: "zoomline",
        standaloneInit: !0,
        hasVDivLine: !0,
        defaultSeriesType: "stepzoom",
        canvasborderthickness: 1,
        defaultPlotShadow: 1,
        chart: function() {
            for (var b = this.base.chart.apply(this, arguments), e = b[oa], h = this.dataObj.chart,
                    f = this.colorManager.getColor("canvasBorderColor"), g = b.chart, w = 0, la = b.series, p = la && la.length || 0, s; p--;) s = la[p], w = La(w, s && s.showAnchors && s.attrs && s.attrs.anchors && (s.attrs.anchors.r || 0) + (s.attrs.anchors["stroke-width"] || 0) || 0);
            ja(g, {
                animation: !1,
                zoomType: "x",
                canvasPadding: La(w, x(h.canvaspadding, 0)),
                overFlowingMarkerWidth: w,
                scrollColor: Ia(ia(h.scrollcolor, this.colorManager.getColor("altHGridColor"))),
                scrollShowButtons: !!x(h.scrollshowbuttons, 1),
                scrollHeight: x(h.scrollheight, 16) || 16,
                scrollBarFlat: e.flatScrollBars,
                allowPinMode: x(h.allowpinmode, 1),
                skipOverlapPoints: x(h.skipoverlappoints, 1),
                showToolBarButtonTooltext: x(h.showtoolbarbuttontooltext, 1),
                btnResetChartTooltext: ia(h.btnresetcharttooltext, "Reset Chart"),
                btnZoomOutTooltext: ia(h.btnzoomouttooltext, "Zoom out one level"),
                btnSwitchToZoomModeTooltext: ia(h.btnswitchtozoommodetooltext, "<strong>Switch to Zoom Mode</strong><br/>Select a subset of data to zoom into it for detailed view"),
                btnSwitchToPinModeTooltext: ia(h.btnswitchtopinmodetooltext, "<strong>Switch to Pin Mode</strong><br/>Select a subset of data and compare with the rest of the view"),
                pinPaneFill: Y(ia(h.pinpanebgcolor, f), x(h.pinpanebgalpha, 15)),
                zoomPaneFill: Y(ia(h.zoompanebgcolor, "#b9d5f1"), x(h.zoompanebgalpha, 30)),
                zoomPaneStroke: Y(ia(h.zoompanebordercolor, "#3399ff"), x(h.zoompaneborderalpha, 80)),
                showPeakData: x(h.showpeakdata, 0),
                maxPeakDataLimit: x(h.maxpeakdatalimit, h.maxpeaklimit, null),
                minPeakDataLimit: x(h.minpeakdatalimit, h.minpeaklimit, null),
                crossline: {
                    enabled: x(h.showcrossline, 1),
                    line: {
                        "stroke-width": x(h.crosslinethickness, 1),
                        stroke: Ia(ia(h.crosslinecolor, "#000000")),
                        "stroke-opacity": x(h.crosslinealpha,
                            20) / 100
                    },
                    labelEnabled: x(h.showcrosslinelabel, h.showcrossline, 1),
                    labelstyle: {
                        fontSize: Aa(h.crosslinelabelsize) ? Aa(h.crosslinelabelsize) + "px" : e.outCanvasStyle.fontSize,
                        fontFamily: ia(h.crosslinelabelfont, e.outCanvasStyle.fontFamily)
                    },
                    valueEnabled: x(h.showcrosslinevalues, h.showcrossline, 1),
                    valuestyle: {
                        fontSize: Aa(h.crosslinevaluesize) ? Aa(h.crosslinevaluesize) + "px" : e.inCanvasStyle.fontSize,
                        fontFamily: ia(h.crosslinevaluefont, e.inCanvasStyle.fontFamily)
                    }
                },
                useCrossline: x(h.usecrossline, 1),
                tooltipSepChar: ia(h.tooltipsepchar,
                    ", ")
            });
            return b
        },
        preSeriesAddition: function() {
            var b = this.dataObj,
                e = b.chart,
                h = this.hcJSON,
                f = h[oa],
                g = this.smartLabel,
                w = x(e.compactdatamode, 0),
                la = ia(e.dataseparator, "|"),
                p = x(e.showlabels, 1),
                s = e.labeldisplay && e.labeldisplay.toLowerCase(),
                t = p && x(e.labelheight),
                E = "rotate" === s ? 270 : x(e.rotatelabels, 1) ? 270 : 0,
                ba = h.xAxis.labels.style,
                D = Aa(ba.lineHeight),
                G = h.chart.labelPadding = x(e.labelpadding, .2 * D) + h.chart.plotBorderWidth,
                H, M, L, y = 0,
                T = -1,
                S, Y, aa;
            0 > t && (t = void 0);
            0 > G && (G = (h.chart.plotBorderWidth || 0) + 2);
            H = (H = b.categories) &&
                H[0] || {};
            b = H.category;
            delete H.category;
            h.categories = s = ja({
                data: M = w && b && b.split && b.split(la) || b || [],
                rotate: E,
                wrap: "none" !== s
            }, H);
            void 0 !== b && (H.category = b);
            H = M.length || 0;
            if (S = !w && p && 0 !== t && H || 0) {
                for (; S--;) M[S] = M[S] && (L = M[S].label || "") && ((Y = L.length) > y && (y = Y, T = S, L) || L) || "";
                y && (L = M[T])
            } else if (w && H && !t)
                if (E) {
                    w = da.document.createElement("div");
                    t = da.document.createElement("span");
                    w.setAttribute("class", "fusioncharts-zoomline-localsmartlabel");
                    w.style.cssText = "display:block;width:1px;position:absolute;";
                    for (aa in ba) w.style[aa] = ba[aa];
                    t.innerHTML = b.replace(/\s*/g, "").replace(/\{br\}/ig, "<br />").replace(new RegExp(Ba(la), "g"), " ");
                    w.appendChild(t);
                    da.document.body.appendChild(w);
                    t = t.offsetWidth || void 0;
                    w.parentNode.removeChild(w)
                } else L = M[H - 1] || M[0];
            void 0 !== t && 0 !== t || !p || (L ? (g.setStyle(ba), L = g.getSmartText(L), t = E ? L.width : L.height) : t = D * (E && 3 || 1));
            t > .3 * f.height && (t = .3 * f.height);
            s.labelHeight = t && t + 6 || 0;
            s.show = t && p || 0;
            s.css = ja({}, ba);
            E ? (s.css.rotation = E, s.css["text-anchor"] = "end") : s.css["vertical-align"] =
                "top";
            h.xAxis.min = 0;
            h.xAxis.max = H && H - 1 || 0;
            t += x(e.scrollheight, 16) || 16;
            h.chart.marginBottom += G;
            f.marginBottomExtraSpace += t;
            ia(e.caption, e.subcaption) || (f.marginTopExtraSpace += 16)
        },
        series: function() {
            var b = this.dataObj,
                e = b.chart,
                h = b.dataset,
                f = this.hcJSON,
                u = f[oa],
                w = u[0],
                E = f.series,
                p = x(e.yaxismaxvalue),
                s = x(e.yaxisminvalue),
                t = x(e.forceyaxislimits, 0),
                T = x(e.compactdatamode, 0),
                ba = ia(e.dataseparator, "|"),
                D = Ba(e.indecimalseparator),
                G = Ba(e.inthousandseparator),
                H = x(e.drawanchors, e.showanchors, 1),
                M = !!x(e.showlegend,
                    1),
                L, y, Y, S, aa, da = Infinity,
                ka = -Infinity,
                ga;
            aa = f.categories.data.length;
            if (h && h.length && aa) {
                D && (D = new RegExp(D, "g"));
                G && (G = new RegExp(G, "g"));
                !G && !D && T && t && void 0 !== p && void 0 !== s ? (t = !0, ka = La(p, s), da = Ma(s, p)) : t = !1;
                p = 0;
                for (s = h.length; p < s; p++) {
                    L = h[p];
                    Y = L.data;
                    delete L.data;
                    T ? (S = Y || "", G && (S = S.replace(G, "")), D && (S = S.replace(D, ".")), S = S.split(ba)) : S = Y || [];
                    S.length > aa && (S.length = aa);
                    ga = S.length;
                    if (T) {
                        if (!t)
                            for (; ga--;) y = Aa(S[ga]), isNaN(y) && (y = void 0), y > ka && (ka = y), y <= da && (da = y), S[ga] = y
                    } else
                        for (; ga--;) y = S[ga] &&
                            S[ga].value || "", G && (y = y.replace(G, "")), D && (y = y.replace(D, ".")), y = Aa(y), isNaN(y) && (y = void 0), y > ka && (ka = y), y <= da && (da = y), S[ga] = y;
                    E.push(y = {
                        index: p,
                        type: "zoomline",
                        data: S,
                        name: L.seriesname || "",
                        showInLegend: L.seriesname && x(L.includeinlegend, 1) && M || !1,
                        showAnchors: x(L.drawanchors, L.showanchors, H),
                        visible: !x(L.initiallyhidden, 0),
                        lineWidth: 2
                    });
                    S.length = aa;
                    void 0 !== Y && (L.data = Y);
                    y.attrs = this.seriesGraphicsAttrs(L);
                    L = y.attrs.anchors;
                    y.color = y.attrs.graphics.stroke;
                    y.ancorRadius = L.r + L["stroke-width"] / 2;
                    y.marker = {
                        fillColor: L.fill,
                        lineColor: L.stroke,
                        lineWidth: 1,
                        symbol: "circle"
                    }
                } - Infinity !== ka && Infinity !== da || (ka = da = void 0);
                t = Pa(x(e.displaystartindex, 1), 10) - 1;
                ba = Pa(x(e.displayendindex, aa || 2), 10) - 1;
                1 > (h = x(e.pixelsperpoint, 15)) && (h = 1);
                (E = x(e.pixelsperlabel, e.xaxisminlabelwidth, f.categories.rotate ? 20 : 60)) < h && (E = h);
                (0 > t || t >= (aa - 1 || 1)) && (t = 0);
                (ba <= t || ba > (aa - 1 || 1)) && (ba = aa - 1 || 1);
                f.stepZoom = {
                    cnd: x(e.connectnulldata, 0),
                    amrd: x(e.anchorminrenderdistance, 20),
                    nvl: x(e.numvisiblelabels, 0),
                    cdm: T,
                    oppp: h,
                    oppl: E,
                    dsi: t,
                    dei: ba,
                    vdl: ba - t,
                    dmax: w.max = ka,
                    dmin: w.min = da,
                    clen: aa,
                    offset: 0,
                    step: 1,
                    llen: 0,
                    alen: 0,
                    ddsi: t,
                    ddei: ba,
                    ppc: 0
                };
                this.configureAxis(f, b);
                b.trendlines && g(b.trendlines, f.yAxis, u, !1, this.isBar)
            }
        },
        seriesGraphicsAttrs: function(b) {
            var e = this.dataObj.chart,
                h = "0" != (b.dashed || e.linedashed || "0"),
                g, u, h = {
                    "stroke-width": x(b.linethickness, e.linethickness, 2),
                    stroke: Ia(ia(b.color, e.linecolor, this.colorManager.getPlotColor())),
                    "stroke-opacity": x(b.alpha, e.linealpha, 100) / 100,
                    "stroke-dasharray": h ? [x(b.linedashlen, e.linedashlen, 5),
                        x(b.linedashgap, e.linedashgap, 4)
                    ] : "none",
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round"
                };
            g = ja({}, h);
            u = h["stroke-width"] + x(e.pinlinethicknessdelta, 1);
            g["stroke-width"] = 0 < u && u || 0;
            g["stroke-dasharray"] = [3, 2];
            return {
                graphics: h,
                pin: g,
                shadow: {
                    opacity: h["stroke-opacity"],
                    apply: x(e.showshadow, +!f.vml)
                },
                anchors: {
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round",
                    r: x(b.anchorradius, e.anchorradius, h["stroke-width"] + 2),
                    stroke: Ia(ia(b.anchorbordercolor, e.anchorbordercolor, h.stroke)),
                    "stroke-opacity": x(b.anchorborderalpha,
                        e.anchorborderalpha, 100) / 100,
                    "stroke-width": x(b.anchorborderthickness, e.anchorborderthickness, h["stroke-width"]),
                    fill: Ia(ia(b.anchorbgcolor, e.anchorbgcolor, "#ffffff")),
                    "fill-opacity": x(b.anchorbgalpha, e.anchorbgalpha, 100) / 100,
                    opacity: x(b.anchoralpha, e.anchoralpha, 100) / 100
                },
                anchorShadow: x(e.anchorshadow, e.showshadow, +!f.vml) && {
                    apply: !0,
                    opacity: x(b.anchoralpha, e.anchoralpha, 100) / 100
                }
            }
        },
        eiMethods: {
            zoomOut: function() {
                var b = this.jsVars,
                    e;
                if (b && (e = b.hcObj)) return e.zoomOut && b.hcObj.zoomOut()
            },
            zoomTo: function(b,
                e) {
                var h = this.jsVars,
                    f;
                if (h && (f = h.hcObj)) return f.zoomRange && h.hcObj.zoomRange(b, e)
            },
            resetChart: function() {
                var b = this.jsVars,
                    e;
                b && (e = b.hcObj) && (e.pinRangePixels && b.hcObj.pinRangePixels(), e.resetZoom && b.hcObj.resetZoom())
            },
            setZoomMode: function(b) {
                var e = this.jsVars,
                    h;
                e && (h = e.hcObj) && h.activatePin && h.activatePin(!b)
            },
            getViewStartIndex: function() {
                var b = this.jsVars,
                    e;
                if (b && b.hcObj && (e = b.hcObj._zoominfo)) return e.ddsi
            },
            getViewEndIndex: function() {
                var b = this.jsVars,
                    e;
                if (b && b.hcObj && (e = b.hcObj._zoominfo)) return b =
                    e.ddei - 1, (b >= e.clen ? e.clen : b) - 1
            }
        }
    }, Oa.msline);
    Ka("renderer.zoomline", {
        resetZoom: function() {
            var b = this._zoomhistory,
                e = this.options.stepZoom;
            if (!b.length) return !1;
            b.length = 0;
            this.zoomTo(e.dsi, e.dei) && E("zoomReset", this._zoomargs, this.fusionCharts, [this.fusionCharts.id]);
            return !0
        },
        zoomOut: function() {
            var b = this._zoomhistory.pop(),
                e = this.options.stepZoom,
                h, f, g;
            b ? (h = b.dsi, f = b.dei) : this._prezoomed && (h = 0, f = e.clen - 1);
            (g = this.zoomTo(h, f)) && wa.raiseEvent("zoomedout", g, this.fusionCharts);
            return !0
        },
        zoomRangePixels: function(b,
            e) {
            var h = this._zoomhistory,
                f = this._zoominfo,
                g = f.ppp,
                f = f.ddsi,
                w;
            h.push(this._zoominfo);
            (w = this.zoomTo(f + T(b / g), f + T(e / g))) ? wa.raiseEvent("zoomedin", w, this.fusionCharts): h.pop()
        },
        zoomRange: function(b, e) {
            var f = this._zoomhistory,
                g;
            f.push(this._zoominfo);
            (g = this.zoomTo(+b, +e)) ? wa.raiseEvent("zoomedin", g, this.fusionCharts): f.pop()
        },
        zoomTo: function(b, e) {
            var f = this.xlabels.data,
                g = this._zoominfo,
                u = this._zoomhistory,
                w = g.clen;
            0 > b && (b = 0);
            b >= w - 1 && (b = w - 1);
            e <= b && (e = b + 1);
            e > w - 1 && (e = w - 1);
            if (b === e || b === g.dsi && e === g.dei) return !1;
            this.pinRangePixels();
            g = ja({}, g);
            g.dsi = b;
            g.dei = e;
            g = this._zoominfo = g;
            this.updatePlotZoomline();
            this.zoomOutButton[g.vdl === g.clen - 1 ? "hide" : "show"]();
            this.resetButton[u.length ? "show" : "hide"]();
            this.elements.zoomscroller.attr({
                "scroll-ratio": g.vdl / (w - !!w),
                "scroll-position": [g.dsi / (w - g.vdl - 1), !0]
            });
            f = {
                level: u.length + 1,
                startIndex: b,
                startLabel: f[b],
                endIndex: e,
                endLabel: f[e]
            };
            E("zoomed", f, this.fusionCharts, [this.fusionCharts.id, b, e, f.startLabel, f.endLabel, f.level]);
            return f
        },
        activatePin: function(b) {
            var e =
                this._zoominfo,
                f = this.options.chart,
                g = this.pinButton;
            if (g && e.pinned ^ (b = !!b)) return b || this.pinRangePixels(), E("zoomModeChanged", {
                pinModeActive: b
            }, this.fusionCharts, []), f.showToolBarButtonTooltext && g.tooltip(f[b && "btnSwitchToZoomModeTooltext" || "btnSwitchToPinModeTooltext"] || ""), g.attr("button-active", b), e.pinned = b
        },
        pinRangePixels: function(b, e) {
            var f = this.paper,
                g = this.elements,
                u = this.xlabels.data,
                w = this._zoominfo,
                x = this.layers.zoompin,
                p = g.pinrect,
                s = g["clip-pinrect"],
                t = this._pingrouptransform,
                T = this.plots,
                ba = e - b,
                D, G;
            if (w && x && p) {
                if (b === e) return x.hide(), g.pintracker.hide(), this.pinButton.attr("button-active", !1), w.pinned = !1;
                for (G = T.length; G--;) p = T[G], D = p.pinline, D || (D = p.pinline = f.path(void 0, x).attr(p.attrPin)), D.attr("path", p.graphic.attrs.path);
                s[0] = b + this.canvasLeft;
                s[2] = ba;
                x.attr({
                    "clip-rect": s,
                    transform: t
                }).show();
                g.pintracker.__pindragdelta = 0;
                g.pintracker.show().attr({
                    transform: t,
                    x: b,
                    width: ba
                });
                b = this.getValuePixel(b);
                e = this.getValuePixel(e);
                E("pinned", {
                    startIndex: b,
                    endIndex: e,
                    startLabel: u[b],
                    endLabel: u[e]
                }, this.fusionCharts, [this.fusionCharts.id, b, e, u[b], u[e]]);
                return w.pinned = !0
            }
        },
        getValuePixel: function(b) {
            var e = this._zoominfo;
            return e.ddsi + T(b / e.ppp)
        },
        getParsedLabel: function(b) {
            var e = this.xlabels;
            return e.parsed[b] || (e.parsed[b] = va(e.data[b] || ""))
        },
        drawGraph: function() {
            var b = this,
                e = b.paper,
                h = b.canvasLeft,
                g = b.canvasTop,
                u = b.canvasWidth,
                w = b.canvasHeight,
                x = b.options,
                p = x.chart,
                s = p.plotBorderWidth,
                t = p.useRoundEdges,
                E = p.showToolBarButtonTooltext,
                ba = p.crossline,
                D = b.layers,
                G = b.toolbar,
                H = b.elements,
                M = p.allowPinMode,
                L = x.categories,
                y = !1,
                T, S, Y, aa, da, ga, ia;
            ga = b._zoominfo = ja({}, x.stepZoom);
            b._zoomhistory = [];
            ga.clen && (y = b._prezoomed = ga.dei - ga.dsi < ga.clen - 1, da = b._visw = b.canvasWidth - 2 * p.canvasPadding, aa = b._visx = b.canvasLeft + p.canvasPadding, b._visout = -(b.chartHeight + b.canvasHeight + 1E3), b.base.drawGraph.apply(b, arguments), b._ypvr = b.yAxis[0] && b.yAxis[0].pixelValueRatio || 0, ia = b._ymin || (b._ymin = b.yAxis[0].endY), b._yminValue = b.yAxis[0].min, x = D.dataset.attr("clip-rect", [b._visx - p.overFlowingMarkerWidth, b.canvasTop,
                    b._visw + 2 * p.overFlowingMarkerWidth, b.canvasHeight
                ]), Y = D.scroll || (D.scroll = e.group("scroll").insertAfter(D.layerAboveDataset)), b.xlabels = [], b.xlabels.show = L.show, b.xlabels.height = L.labelHeight, b.xlabels.wrap = L.wrap, b.xlabels.rotate = L.rotate, b.xlabels.data = L.data || [], b.xlabels.parsed = [], b.xlabels.css = L.css, b.xlabels.group = e.group("zoomline-plot-xlabels", D.datalabels), D.datalabels.transform(["T", aa, g + w + p.scrollHeight + p.labelPadding]), b._lcmd = L.rotate ? "y" : "x", M && (M = f.crispBound(0, g - ia, 0, w, s), T = H["clip-pinrect"] = [M.x, g, M.width, M.height], S = D.zoompin = e.group("zoompin").insertBefore(x).transform(b._pingrouptransform = ["T", aa, ia]).hide(), H.pinrect = e.rect(0, g - ia, b._visw, w, D.zoompin).attr({
                        "stroke-width": 0,
                        stroke: "none",
                        fill: p.pinPaneFill,
                        "shape-rendering": "crisp",
                        ishot: !0
                    }), H.pintracker = e.rect(D.tracker).attr({
                        transform: S.transform(),
                        x: 0,
                        y: g - ia,
                        width: 0,
                        height: w,
                        stroke: "none",
                        fill: sa,
                        ishot: !0,
                        cursor: f.svg && "ew-resize" || "e-resize"
                    }).drag(function(b) {
                        var e = aa + b + this.__pindragdelta,
                            h = this.__pinboundleft,
                            g = this.__pinboundright,
                            p = this.data("cliprect").slice(0);
                        e < h ? e = h : e > g && (e = g);
                        S.transform(["T", e, ia]);
                        H.pintracker.transform(S.transform());
                        f.svg || (p[0] = p[0] + e - aa - this.__pindragdelta, S.attr("clip-rect", p));
                        this.__pindragoffset = b
                    }, function() {
                        this.__pinboundleft = 0 - T[0] + aa + h;
                        this.__pinboundright = this.__pinboundleft + da - T[2];
                        this.data("cliprect", S.attr("clip-rect"));
                        S._.clipispath = !0
                    }, function() {
                        S._.clipispath = !1;
                        this.__pindragdelta = this.__pindragoffset;
                        delete this.__pindragoffset;
                        delete this.__pinboundleft;
                        delete this.__pinboundright
                    }),
                    b.pinButton = G.add("pinModeIcon", function() {
                        b.activatePin(!b._zoominfo.pinned)
                    }, {
                        tooltip: E && p.btnSwitchToPinModeTooltext || ""
                    })), s++, M = f.crispBound(h - s, g + w + s, u + s + s, p.scrollHeight, s), s--, H.zoomscroller = e.scroller(M.x + (t && -1 || s % 2), M.y - (t && 4 || 2), M.width - (!t && 2 || 0), M.height, !0, {
                    showButtons: p.scrollShowButtons,
                    scrollRatio: ga.vdl / (ga.clen - !!ga.clen),
                    scrollPosition: [ga.dsi / (ga.clen - ga.vdl - 1), !1],
                    displayStyleFlat: p.scrollBarFlat
                }, Y).attr({
                    fill: p.scrollColor,
                    r: t && 2 || 0
                }).scroll(b.updatePlotZoomline, b), t && H.zoomscroller.shadow(!0),
                function() {
                    var e;
                    f.eve.on("raphael.scroll.start." + H.zoomscroller.id, function(f) {
                        e = f;
                        b.crossline && b.crossline.disable(!0);
                        wa.raiseEvent("scrollstart", {
                            scrollPosition: f
                        }, b.logic.chartInstance)
                    });
                    f.eve.on("raphael.scroll.end." + H.zoomscroller.id, function(f) {
                        b.crossline && b.crossline.disable(!1);
                        wa.raiseEvent("scrollend", {
                            prevScrollPosition: e,
                            scrollPosition: f
                        }, b.logic.chartInstance)
                    })
                }(), Va(b, {
                    attr: {
                        stroke: p.zoomPaneStroke,
                        fill: p.zoomPaneFill,
                        strokeWidth: 0
                    },
                    selectionStart: function() {},
                    selectionEnd: function(e) {
                        var f =
                            e.selectionLeft - h;
                        e = f + e.selectionWidth;
                        b.crossline && b.crossline.hide();
                        b[b._zoominfo.pinned ? "pinRangePixels" : "zoomRangePixels"](f, e)
                    }
                }), b.zoomOutButton = G.add("zoomOutIcon", function() {
                    b.zoomOut()
                }, {
                    tooltip: E && p.btnZoomOutTooltext || ""
                })[y && "show" || "hide"](), b.resetButton = G.add("resetIcon", function() {
                    b.resetZoom()
                }, {
                    tooltip: E && p.btnResetChartTooltext || ""
                }).hide(), M = b.resetButton.attr("fill"), M[2] = "rgba(255,255,255,0)", b.resetButton.attr("fill", [M[0], M[1], M[2], M[3]]), ba && 0 !== ba.enabled && 1 === p.useCrossline &&
                (b.crossline = new ua(b, ba)), b.updatePlotZoomline())
        },
        drawPlotZoomline: function(b, e) {
            var f = this.paper,
                g = e.attrs,
                u = e.visible,
                w = u ? "show" : "hide",
                x = this.layers.dataset,
                p = b.group || (b.group = f.group("plot-zoomline-dataset", x)),
                x = b.anchorGroup || (b.anchorGroup = f.group("plot-zoomline-anchors", x)),
                f = b.graphic || (b.graphic = f.path(void 0, p)),
                s = ["T", this._visx, this._ymin || (this._ymin = this.yAxis[0].endY)];
            p.transform(s)[w]();
            x.transform(s)[w]();
            b.graphic = f.attr(g.graphics).shadow(g.shadow);
            b.attrPin = g.pin;
            b.visible =
                u;
            b.anchors = [];
            b.anchors.show = e.showAnchors;
            b.anchors.attrs = g.anchors;
            b.anchors.attrsShadow = g.anchorShadow;
            b.anchors.left = -(g.anchors.r + .5 * g.anchors["stroke-width"]);
            b.anchors.right = this._visw - b.anchors.right
        },
        updatePlotZoomline: function(b, e) {
            var f = this.paper,
                g = this._ypvr,
                u = this._visw,
                w = this.xlabels,
                x = w.css,
                p = w.group,
                s = this.plots,
                t = this.options.chart.textDirection,
                E, ba, D, G, H, M, L, y;
            !e && (e = this._zoominfo);
            D = e.oppp;
            G = e.vdl = e.dei - e.dsi;
            H = e.ppl = e.nvl ? u / e.nvl : e.oppl;
            u = e.step = (M = e.ppp = u / G) < D ? za(D / M) : 1;
            D =
                e.lskip = za(La(H, Aa(x.lineHeight)) / M / u);
            void 0 !== b ? (H = (e.clen - G - 1) * b, e.offset = (H - (H = Pa(H))) * M, G = H + G) : (H = e.dsi, G = e.dei, e.offset = 0);
            L = e.norm = H % u;
            e.ddsi = H -= L;
            e.ddei = G = G + 2 * u - L;
            e.pvr = g;
            e._ymin = this._ymin;
            e._yminValue = this._yminValue;
            g = w.show ? za((G - H) / u / D) : 0;
            L = e.llen - 1;
            e.llen = g;
            y = e.ppc = M * D * u;
            if (g > L)
                for (D = L, L = g; D < L; D++)(E = w[D]) && E.show() || (w[D] = f.text(0, 0, "", p).css(x).attr({
                    direction: t
                }));
            else
                for (D = g, L += 1; D < L; D++) w[D].hide();
            g = M * u < e.amrd ? 0 : za((G - H) / u);
            x = g - e.alen;
            e.alen = g;
            w.wrap && (w.rotate ? (w._width = w.height,
                w._height = y) : (w._width = y, w._height = w.height));
            for (E = s.length; E--;) {
                p = s[E];
                e.plotName = p.name || "";
                t = p.anchors;
                if (t.show && x) {
                    ba = t.attrs;
                    D = 0;
                    for (L = g; D < L; D++) t[D] = t[D] && t[D].show() || f.circle(ba, p.anchorGroup);
                    D = g;
                    for (L = t.length; D < L; D++) t[D] && t[D].hide()
                }
                this.drawPlotZoomlineGraphics(e, p.data, p.graphic, t, !E && w, ba, p.anchorGroup)
            }
            da.FC_DEV_ENVIRONMENT && da.jQuery && (FusionCharts["debugger"].enable() ? (this.debug = this.debug || (da.jQuery("#fc-zoominfo").length || da.jQuery("body").append('<pre id="fc-zoominfo">'),
                da.jQuery("#fc-zoominfo").css({
                    position: "absolute",
                    left: "10px",
                    top: "0",
                    "pointer-events": "none",
                    opacity: .7,
                    width: "250px",
                    zIndex: "999",
                    border: "1px solid #cccccc",
                    "box-shadow": "1px 1px 3px #cccccc",
                    background: "#ffffff"
                })), this.debug.text(JSON.stringify(e, 0, 2))) : (this.debug && da.jQuery("#fc-zoominfo").remove(), delete this.debug))
        },
        drawPlotZoomlineGraphics: function(b, e, f, g, u, w, x) {
            var p = this.smartLabel,
                s = this.paper,
                t = this.numberFormatter,
                E = this.options.chart,
                ba = E.useCrossline,
                D = E.showPeakData,
                G = E.maxPeakDataLimit,
                H = E.minPeakDataLimit,
                M = [],
                L = !b.cnd,
                y = b.ddei,
                T = b.clen,
                S = b.step,
                Y = b.lskip,
                aa = b.ppp,
                da = b.offset,
                ga = b.pvr,
                ja = this._visw,
                ia = this._visout,
                ha = this._lcmd,
                ea, ma = "M",
                oa, na, sa = u && u[0],
                ua, xa, va = g[0],
                ta = {},
                wa = {},
                l, Fa, X, ra = 0,
                Ca, ya, za, Aa = -b.norm,
                a = b.ddsi,
                m = 0,
                c, d, n = E.tooltipSepChar,
                Ba;
            sa && (u.group.transform(["T", -da, 0]), za = u.wrap, ua = u._height, xa = u._width, za && p.setStyle(u.css));
            u = function(a, b) {
                var d = a && a.length,
                    c = Math.max.apply(Math, a),
                    e = Math.min.apply(Math, a),
                    f = 0;
                if (c > G || e < H)
                    for (; f < d;) {
                        e = a[f];
                        if (e > G || e < H) c = b + f, Ba(e,
                            c, c, !0);
                        f += 1
                    }
            };
            for (Ba = function(a, f, h, q) {
                    var p = void 0,
                        k = void 0,
                        u = void 0;
                    ba || (d = c + n + t.yAxis(a), d = b.plotName && b.plotName + n + d || d);
                    Ca = ra / 3 + m;
                    Fa = h * aa;
                    ea = Fa - da;
                    if (void 0 === (oa = e[f])) {
                        if (L) ma = "M", l = ia, ea = Fa - da, X = ia;
                        else {
                            if (0 === Ca) {
                                for (p = f; 0 < p && (--p, k = e[p], void 0 === k););
                                k && (Fa = p * aa * -1, l = ia, M[ra++] = ma, M[ra++] = Fa, M[ra++] = X = (k - b._yminValue) * ga, ma = "L")
                            }
                            if (f === y) {
                                for (p = f; p < T && (p += 1, u = e[p], void 0 === u););
                                u && (Fa = p * aa, l = ia, M[ra++] = ma, M[ra++] = Fa, M[ra++] = X = (u - b._yminValue) * ga, ma = "L")
                            }
                        }
                        m++
                    } else M[ra++] = ma, M[ra++] = l = ea =
                        Fa - da, M[ra++] = X = (oa - b._yminValue) * ga, ma = "L";
                    va && (va = va.attr((ta.cx = l, ta.cy = X, ta)).next);
                    q && g.push(s.circle(w, x))
                }; a <= y; a += S, Aa += S) c = this.getParsedLabel(a), Ba(e[a], a, Aa), !sa || Ca % Y || (ya = sa.attrs, na = c, ea = 0 > ea || ea > ja ? ia : Fa, sa._prevtext === na ? delete wa.text : wa.text = sa._prevtext = na, ya[ha] === ea ? delete wa[ha] : wa[ha] = ea, za && na && (wa.text = p.getSmartText(na, xa, ua).text), sa = sa.attr(wa).next), D && 1 < S && (na = Ma(a + 1, y), ya = Ma(na + S, y), ya = ya === y ? e.slice(na) : e.slice(na, ya), u(ya, na));
            y >= T && va && va.attr((ta.cx = ia, ta.cy = ia,
                ta));
            f.attr("path", M);
            ba || function(a, b, c) {
                var e = c.plotName;
                f.tooltipListenerAttached || (f.tooltipListenerAttached = !0, f.mousemove(function(c) {
                    var g = a._zoominfo,
                        l = a._visx,
                        m = g.step,
                        n = g.ppp * m;
                    c = Sa(a.container, c).chartX - l;
                    var p, l = E.tooltipSepChar;
                    c = (c += n / 2 + g.offset) - c % n;
                    p = (p = a.getValuePixel(c)) + p % m;
                    d = a.getParsedLabel(p) + l + t.yAxis(b[p]);
                    d = e && e + l + d || d;
                    f.tooltip(d)
                }))
            }(this, e, b)
        },
        legendClick: function(b) {
            var e = !b.visible,
                f = e ? "show" : "hide";
            b.group[f]();
            b.anchorGroup[f]();
            this.base.legendClick.apply(this, arguments);
            return b.visible = e
        },
        dispose: function() {
            var b;
            this.crossline && (this.crossline.dispose(), delete this.crossline);
            (b = this.elements.pintracker) && (b.undrag(), delete this.elements.pintracker);
            delete this.zoomOutButton;
            delete this.resetButton;
            delete this.pinButton;
            this.xlabels && (this.xlabels.length = 0);
            delete this.xlabels;
            this.base.dispose.apply(this)
        }
    }, Ka["renderer.cartesian"]);
    ua = function(b, e) {
        var f = b.paper,
            g = b.options.chart,
            u = this.left = b._visx,
            w = this.width = b._visw,
            x = this.top = b.canvasTop,
            p = this.height = b.canvasHeight,
            s = this._visout = b._visout,
            t = this.plots = b.plots,
            E = b.layers.dataset,
            ba, D = e.labelstyle,
            G = e.valuestyle;
        ba = this.group = f.group("crossline-labels", E).attr({
            transform: ["T", u, b._ymin]
        });
        this.tracker = f.rect(u, x, w, p, E).attr({
            stroke: "none",
            "stroke-width": 0,
            fill: sa
        }).toFront().mousedown(this.onMouseDown, this).mouseup(this.onMouseUp, this, !0).mouseout(this.onMouseOut, this).mousemove(this.onMouseMove, this);
        Ha && this.tracker.touchstart(this.onMouseMove, this);
        this.container = b.container;
        this.line = f.path(void 0, E).attr(ja({
            path: ["M",
                u, x, "l", 0, p
            ]
        }, e.line)).toBack();
        u = this.labels = e.valueEnabled && f.set();
        e.labelEnabled && (this.positionLabel = f.text(s, x + p + (g.scrollHeight || 0) + 2.5, "").insertAfter(b.xlabels.group.parent).css(D).attr({
            "vertical-align": "top",
            direction: g.textDirection,
            "text-bound": ["rgba(255,255,255,1)", "rgba(0,0,0,1)", 1, 2.5]
        }));
        this.hide();
        this.pixelRatio = b._ypvr;
        this.yminValue = b._yminValue;
        this.positionLabels = b.xlabels || {
            data: [],
            parsed: []
        };
        this.getZoomInfo = function() {
            return b._zoominfo
        };
        this.getDataIndexFromPixel = function(e) {
            return b.getValuePixel(e)
        };
        this.getPositionLabel = function(e) {
            return b.getParsedLabel(e)
        };
        if (e.valueEnabled) {
            x = 0;
            for (p = t.length; x < p; x++) D = t[x], D = D.graphic.attrs.stroke, u.push(f.text(0, s, "", ba).css(G).attr({
                fill: D,
                direction: g.textDirection,
                "text-bound": ["rgba(255,255,255,0.8)", "rgba(0,0,0,0.2)", 1, 2.5]
            }));
            this.numberFormatter = b.numberFormatter
        }
    };
    ua.prototype.disable = function(b) {
        void 0 !== b && (this.disabled = !!b) && this.visible && this.hide();
        return this.disabled
    };
    ua.prototype.onMouseOut = function() {
        this.hide()
    };
    ua.prototype.onMouseDown =
        function() {
            !Ha && this.hide();
            this._mouseIsDown = !0
        };
    ua.prototype.onMouseUp = function() {
        !Ha && this.hide();
        delete this._mouseIsDown
    };
    ua.prototype.onMouseMove = function(b) {
        if (!(this.disabled || this._mouseIsDown && !Ha)) {
            var e = this.getZoomInfo(),
                f = this.line,
                g = this.left,
                u = e.step,
                w = e.ppp * u;
            b = Sa(this.container, b).chartX - g;
            var x;
            b = (b += w / 2 + e.offset) - b % w;
            x = (x = this.getDataIndexFromPixel(za(b))) + x % u;
            b -= e.offset;
            f.transform(["T", T(b), 0]);
            this.hidden && this.show();
            if (x !== this.position || this.hidden) this.position = x, this.lineX =
                b, this.updateLabels()
        }
    };
    ua.prototype.updateLabels = function() {
        var b = this,
            e = b.labels,
            f = b.plots,
            g = b.width,
            u = b.position,
            w = b.lineX,
            x = T(w),
            p = b.pixelRatio,
            s = b.yminValue,
            t = b._visout,
            E = b.numberFormatter;
        e && e.forEach(function(e, D) {
            var G = f[D],
                H = G.data[u],
                M, L;
            e.attr({
                text: E.xAxis(H)
            });
            M = e.getBBox();
            L = .5 * M.width + 10;
            M = M.height;
            G = void 0 !== H && G.visible ? (H - s) * p : t;
            G < -1 * (b.height - M) ? G += M : G > s * p - M && (G -= M);
            e.attr({
                x: La(0, Ma(x, g)),
                y: G,
                "text-anchor": w <= L && "start" || w + L >= g && "end" || "middle"
            })
        });
        b.positionLabel && b.positionLabel.attr({
            x: w +
                b.left,
            text: b.getPositionLabel(u)
        })
    };
    ua.prototype.show = function() {
        this.disabled || (this.hidden = !1, this.group.attr("visibility", "visible"), this.line.attr("visibility", "visible"), this.positionLabel && this.positionLabel.attr("visibility", "visible"))
    };
    ua.prototype.hide = function() {
        this.hidden = !0;
        this.group.attr("visibility", "hidden");
        this.line.attr("visibility", "hidden");
        this.positionLabel && this.positionLabel.attr("visibility", "hidden")
    };
    ua.prototype.dispose = function() {
        for (var b in this) this.hasOwnProperty(b) &&
            delete this[b]
    };
    f.addSymbol({
        pinModeIcon: function(b, e, f) {
            var g = .5 * f,
                u = b - f,
                w = b + f,
                x = b - g,
                p = b + g,
                s = b + .5,
                t = s + 1,
                E = s + 1.5,
                T = e - f,
                D = e + g,
                G = e - g,
                g = e + (f - g);
            return ["M", u, T, "L", x, G, x, g, u, D, b - .5, D, b, e + f + .5, s, D, w, D, p, g, p, G, w, T, E, T, E, G, E, g, t, g, t, G, E, G, E, T, "Z"]
        },
        zoomOutIcon: function(b, e, g) {
            b -= .2 * g;
            e -= .2 * g;
            var x = .8 * g,
                u = f.rad(43),
                w = f.rad(48),
                E = b + x * aa(u),
                u = e + x * xa(u),
                p = b + x * aa(w),
                w = e + x * xa(w),
                s = f.rad(45),
                t = E + g * aa(s),
                T = u + g * xa(s),
                Y = p + g * aa(s);
            g = w + g * xa(s);
            return ["M", E, u, "A", x, x, 0, 1, 0, p, w, "Z", "M", E + 1, u + 1, "L", t, T, Y, g, p + 1, w + 1, "Z",
                "M", b - 2, e, "L", b + 2, e, "Z"
            ]
        },
        resetIcon: function(b, e, f) {
            var g = b - f,
                u = (ta.PI / 2 + ta.PI) / 2;
            b += f * aa(u);
            var u = e + f * xa(u),
                w = 2 * f / 3;
            return ["M", g, e, "A", f, f, 0, 1, 1, b, u, "L", b + w, u - 1, b + 2, u + w - .5, b, u]
        }
    })
}]);