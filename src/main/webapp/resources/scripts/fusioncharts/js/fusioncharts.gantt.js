/*
 FusionCharts JavaScript Library - Gantt Chart
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.7.0
*/
FusionCharts.register("module", ["private", "modules.renderer.js-gantt", function() {
    var V = this,
        J = V.hcLib,
        Oa = V.window,
        ua = /msie/i.test(Oa.navigator.userAgent) && !Oa.opera,
        rb = J.chartAPI,
        Pa = J.chartAPI,
        eb = J.extend2,
        e = J.pluck,
        d = J.pluckNumber,
        pa = J.getFirstColor,
        Ja = J.graphics,
        ca = Ja.convertColor,
        fb = Ja.getDarkColor,
        hc = Ja.parseColor,
        Ca = J.parseUnsafeString,
        Ea = J.getFirstValue,
        Zb = J.getValidValue,
        ia = J.Raphael,
        ic = J.COMMASTRING,
        Ka = J.setLineHeight,
        Eb = J.getDashStyle,
        Fb = J.toRaphaelColor,
        Qa = J.each,
        jc = J.FC_CONFIG_STRING,
        La =
        "rgba(192,192,192," + (ua ? .002 : 1E-6) + ")",
        $b = Ja.mapSymbolName,
        ua = Math,
        Ma = ua.ceil,
        va = ua.round,
        fa = ua.max,
        Da = ua.min,
        ac = ua.abs,
        Ra = parseInt,
        Gb = parseFloat,
        kc = {
            pageX: 0,
            pageY: 0
        },
        Y = J.plotEventHandler,
        na, W, sb = J.hasTouch = void 0 !== Oa.document.documentElement.ontouchstart,
        lc = J.addEvent,
        mc = J.removeEvent,
        Sa = function(b) {
            return void 0 !== b && null !== b
        },
        Ta = {
            left: "start",
            right: "end",
            center: "middle"
        },
        gb = {
            left: 0,
            right: 1,
            center: .5,
            undefined: .5
        },
        tb = {
            top: 1,
            bottom: 0,
            middle: .5,
            undefined: .5
        },
        Ua = {
            left: 5,
            right: -5,
            center: 0,
            undefined: 0
        },
        Fa = function(b, a) {
            this.min = b.min;
            this.max = d(b.visibleMax, b.max);
            this.pixelValueRatio = a / (this.max - this.min);
            this.startPixel = b.chart.marginLeft + b.chart.ganttStartX
        };
    Fa.prototype = {
        getPixel: function(b) {
            return this.startPixel + (b - this.min) * this.pixelValueRatio
        }
    };
    Fa.prototype.constructor = Fa;
    rb("gantt", {
        friendlyName: "Gantt Chart",
        rendererId: "gantt",
        standaloneInit: !0,
        defaultSeriesType: "gantt",
        canvasborderthickness: 1,
        defaultPlotShadow: 1,
        creditLabel: !1,
        fireGroupEvent: !0,
        defaultPaletteOptions: function() {
            var b =
                arguments;
            return J.extend2(J.extend2(J.extend2(J.extend2({}, b[0]), b[1]), b[2]), b[3])
        }(eb({}, J.defaultGaugePaletteOptions), {
            paletteColors: ["AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "),
                "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" ")
            ],
            bgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            bgAngle: [270, 270, 270, 270, 270],
            bgRatio: ["100", "100", "100", "100", "100"],
            bgAlpha: ["100", "100", "100",
                "100", "100"
            ],
            canvasBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            canvasBgAngle: [0, 0, 0, 0, 0],
            canvasBgAlpha: ["100", "100", "100", "100", "100"],
            canvasBgRatio: ["", "", "", "", ""],
            canvasBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
            canvasBorderAlpha: [100, 100, 100, 90, 100],
            gridColor: ["DDDDDD", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
            gridResizeBarColor: ["999999", "545454", "415D6F", "845001", "D55979"],
            categoryBgColor: ["F1F1F1", "EEF0E6", "F2F8F9", "F7F0E6", "FFF4F8"],
            dataTableBgColor: ["F1F1F1", "EEF0E6",
                "F2F8F9", "F7F0E6", "FFF4F8"
            ],
            toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
            baseFontColor: ["555555", "60634E", "025B6A", "A15E01", "68001B"],
            borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
            borderAlpha: [50, 50, 50, 50, 50],
            legendBgColor: ["ffffff", "ffffff", "ffffff", "ffffff", "ffffff"],
            legendBorderColor: ["666666", "545454", "415D6F", "845001", "D55979"],
            plotBorderColor: ["999999", "8A8A8A", "6BA9B6", "C1934D", "FC819F"],
            plotFillColor: ["EEEEEE",
                "D8DCC5", "BCD8DE", "E9D8BE", "FEDAE3"
            ],
            scrollBarColor: ["EEEEEE", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"]
        }),
        charttopmargin: 10,
        chartbottommargin: 20,
        series: function() {
            var b = this.dataObj,
                a = b.chart,
                H = (H = b.categories) || [],
                c = H.length,
                q = this.hcJSON,
                k = q.chart,
                m = q[jc],
                y = this.smartLabel,
                f = this.colorManager,
                g = q.categories = {},
                v = [],
                p = this.inCanvasStyle,
                s = this.numberFormatter,
                C = Infinity,
                l = -Infinity,
                t = k.origW - k.marginLeft - k.marginRight,
                D = k.origH - k.marginTop - k.marginBottom,
                n = b.processes || {},
                h = n && n.process,
                x = h && h.length,
                w = Ra(p.fontSize, 10),
                O = b.datatable,
                T = O && O.datacolumn,
                F = T && T.length,
                ea = b.connectors,
                L = ea && ea.length,
                M = q.connectors = [],
                N = b.milestones && b.milestones.milestone,
                B = N && N.length,
                Z = q.milestone = [],
                G = b.tasks,
                $ = G && G.task,
                K = $ && $.length,
                u = 0,
                r = 0,
                bc = d(a.forceganttwidthpercent, 0),
                aa = 0,
                Y = 0,
                W = !1,
                ia = {
                    top: "top",
                    bottom: "bottom"
                },
                A = {
                    top: "top",
                    bottom: "bottom",
                    undefined: "middle"
                },
                R = {
                    right: "right",
                    left: "left"
                },
                ba = {
                    right: "right",
                    left: "left",
                    undefined: "center"
                },
                E = q.dataTable = {},
                hb = Infinity,
                ib = -Infinity,
                na = q.processIDMap = [],
                V,
                ua, Ma = d(a.dateintooltip, 1),
                Ja = b.legend && b.legend.item,
                Fa = q.tasksMap || (q.tasksMap = {}),
                Oa = 0,
                Pa = 0,
                ub, za, Hb, Ib, jb, vb, Qa, Jb, Kb, qa, wa, Aa, Ta, gb, Ua, Qb, wb, rb, xa, oa, kb, Q, Lb, Va, Wa, Mb, Nb, Ba, la, ma, Xa, Ya, Za, lb, $a, ab, Ga, Ha, ga, sb, Rb, ha, ja, da, mb, nb, bb, U, I, Sb, cb, xb, Ia, yb, Tb, Ob, ob, Ub, zb, Ab, Bb, Cb, Db, Pb, pb, tb, cc, dc, ec, Na, S, fc, sa, P, ya, ra, qb, ka, Vb, Wb, Xb, Yb, ta, db, gc, z, X;
            if (x) {
                q.tasks = [];
                delete q.yAxis;
                delete q.xAxis;
                k.backgroundColor = ca(e(a.bgcolor, "FFFFFF"), e(a.bgalpha, f.getColor("bgAlpha")));
                d(a.showborder, 0) || (k.borderWidth =
                    0);
                k.plotBorderColor = ca(e(a.canvasbordercolor, f.getColor("canvasBorderColor")), 0 === d(a.showcanvasborder, 1) ? 0 : e(a.canvasborderalpha, 100));
                k.backgroundColor = {
                    FCcolor: {
                        color: e(a.bgcolor, "FFFFFF"),
                        alpha: e(a.bgalpha, f.getColor("bgAlpha")),
                        angle: e(a.bgangle, f.getColor("bgAngle")),
                        ratio: e(a.bgratio, f.getColor("bgRatio"))
                    }
                };
                k.plotBackgroundColor = {
                    FCcolor: {
                        color: e(a.canvasbgcolor, f.getColor("canvasBgColor")),
                        alpha: e(a.canvasbgalpha, f.getColor("canvasBgAlpha")),
                        angle: e(a.canvasbgangle, f.getColor("canvasBgAngle")),
                        ratio: e(a.canvasbgratio, f.getColor("canvasBgRatio"))
                    }
                };
                k.plotBorderWidth = d(a.canvasborderthickness, 1);
                k.outputDateFormat = e(a.outputdateformat, k.dateFormat);
                k.extendCategoryBg = d(a.extendcategorybg, 0);
                k.ganttLineColor = ca(e(a.ganttlinecolor, f.getColor("gridColor")), d(a.ganttlinealpha, 100));
                k.ganttLineThickness = d(a.ganttlinethickness, 1);
                k.ganttLineDashStyle = d(a.ganttlinedashed, 0) ? Eb(d(a.ganttlinedashlen, 1), a.ganttlinedashgap, k.ganttLineThickness) : void 0;
                k.gridBorderColor = ca(e(a.gridbordercolor, f.getColor("gridColor")),
                    d(a.gridborderalpha, 100));
                k.gridBorderThickness = d(a.gridborderthickness, 1);
                k.gridBorderDashStyle = d(a.gridborderdashed, 0) ? Eb(d(a.gridborderdashlen, 1), a.gridborderdashgap, k.gridborderThickness) : void 0;
                k.showSlackAsFill = d(a.showslackasfill, 1);
                k.slackFillColor = pa(e(a.slackfillcolor, "FF5E5E"));
                k.gridResizeBarColor = ca(e(a.gridresizebarcolor, f.getColor("gridResizeBarColor")), d(a.gridresizebaralpha, 100));
                k.gridResizeBarThickness = d(a.gridresizebarthickness, 1);
                k.taskBarRoundRadius = d(a.taskbarroundradius, 0);
                k.taskBarFillMix = a.taskbarfillmix;
                k.taskBarFillRatio = a.taskbarfillratio;
                void 0 === k.taskBarFillMix && (k.taskBarFillMix = "{light-10},{dark-20},{light-50},{light-85}");
                void 0 === k.taskBarFillRatio && (k.taskBarFillRatio = "0,8,84,8");
                k.connectorExtension = d(a.connectorextension, 10);
                k.clickURL = e(a.clickurl, "");
                k.annRenderDelay = a.annrenderdelay;
                k.taskDatePadding = d(a.taskdatepadding, 3);
                k.taskLabelPadding = d(a.tasklabelspadding, 2);
                k.ganttStartX = d(a.ganttwidthpercent, 65);
                100 < k.ganttStartX && (k.ganttStartX = 100);
                Aa =
                    k.ganttStartX = .01 * (100 - k.ganttStartX) * t;
                k.gridWidth = t - k.ganttStartX;
                gc = d(a.showfulldatatable, 1);
                bb = n.width;
                bb = d(k.ganttStartX * (/\%/g.test(bb) && .01 * Gb(bb, 10)) || bb);
                Aa -= d(bb, 0);
                V = va(bb);
                Y += 1;
                for (z = 0; z < F; z += 1) Jb = T[z].width, Kb = d(k.ganttStartX * (/\%/g.test(Jb) && .01 * Gb(Jb, 10)) || Jb), Aa -= d(Kb, 0), Kb = T[z].width = va(Kb), Y += 1;
                0 <= Aa ? Aa /= Y : (W = !0, Aa = k.ganttStartX / Y);
                if (bc || !gc)
                    for ((isNaN(V) || W) && (V = Aa), z = 0; z < F; z += 1)(isNaN(T[z].width) || W) && (T[z].width = Aa);
                for (z = 0; z < c; z += 1) {
                    ja = H[z];
                    C = Infinity;
                    l = -Infinity;
                    mb = e(ja.bgcolor,
                        f.getColor("categoryBgColor"));
                    nb = d(ja.bgalpha, 100);
                    Xa = e(ja.font, p.fontFamily);
                    Ya = d(ja.fontsize, w + 1);
                    Za = e(ja.fontcolor, p.color);
                    lb = d(ja.isbold, 1);
                    $a = d(ja.isitalic, 0);
                    ab = d(ja.isunderline, 0);
                    d(ja.verticalpadding, 3);
                    Ga = e(ja.align, "center").toLowerCase();
                    Ha = e(ja.valign, "middle").toLowerCase();
                    sb = (Rb = ja.category) && Rb.length;
                    Na = 0;
                    ka = {};
                    for (X = 0; X < sb; X += 1) ha = Rb[X], la = s.getDateValue(ha.start).ms, ma = s.getDateValue(ha.end).ms, isNaN(la) && (la = void 0), la > l && (l = la), la <= C && (C = la), isNaN(ma) && (ma = void 0), ma > l && (l =
                            ma), ma <= C && (C = ma), ga = Ca(e(ha.label, ha.name)), S = {
                            color: pa(e(ha.fontcolor, Za)),
                            fontFamily: e(ha.font, Xa),
                            fontSize: d(ha.fontsize, Ya) + "px",
                            fontWeight: d(ha.isbold, lb) && "bold" || "normal",
                            fontStyle: d(ha.isitalic, $a) && "italic" || "normal",
                            textDecoration: d(ha.isunderline, ab) && "underline" || "none"
                        }, Ka(S), y.setStyle(S), qa = y.getOriSize(ga), Na = fa(Na, qa.height), P = "FCCAT_" + z + "_" + X, Hb = e(ha.hoverbandcolor, ja.hoverbandcolor, a.categoryhoverbandcolor, a.hoverbandcolor, f.getColor("gridColor")), Ib = d(ha.hoverbandalpha, ja.hoverbandalpha,
                            a.categoryhoverbandalpha, a.hoverbandalpha, 30), jb = d(ha.showhoverband, ja.showhoverband, a.showcategoryhoverband, a.showhoverband, a.showhovereffect, 1), g[P] = {
                            text: ga,
                            style: S,
                            start: la,
                            end: ma,
                            index: X,
                            isLast: z === c - 1,
                            bgColor: ca(e(ha.bgcolor, mb), d(ha.bgalpha, nb)),
                            dimension: ka,
                            link: ha.link,
                            align: ba[[e(ha.align, Ga).toLowerCase()]],
                            vAlign: A[ia[e(ha.valign, Ha).toLowerCase()]],
                            hoverColor: ca(Hb, Ib),
                            useHover: jb,
                            usePlotHover: d(ha.showganttpanehoverband, ja.showganttpanehoverband, a.showganttpaneverticalhoverband, jb)
                        },
                        g[ya] && (g[ya].nextCol = g[P], g[P].prevCol = g[ya]), ya = P;
                    if (xb = g["FCCAT_" + z + "_0"]) g[P].first = xb, xb.last = g[P], g[cb] && (g[cb].nextRow = xb, xb.prevRow = g[cb]);
                    cb = P;
                    ka.h = Na + 5 + 2 * d(ja.verticalpadding, 3);
                    ka.y = r;
                    ka.min = C;
                    ka.max = l;
                    ka.numCat = X;
                    r += ka.h;
                    ib = fa(ib, l);
                    hb = Da(hb, C)
                }
                g.min = hb;
                g.max = ib;
                if (x) {
                    Na = wa = 0;
                    db = "right" === e(n.positioningrid, "left").toLowerCase();
                    S = {
                        color: pa(e(n.headerfontcolor, p.color)),
                        fontFamily: e(n.headerfont, p.fontFamily),
                        fontSize: d(n.headerfontsize, w + 3) + "px",
                        fontWeight: d(n.headerisbold, 1) && "bold" ||
                            "normal",
                        fontStyle: d(n.headerisitalic, 0) && "italic" || "normal",
                        textDecoration: d(n.headerisunderline, 0) && "underline" || "none"
                    };
                    Ka(S);
                    ga = Ca(n.headertext);
                    y.setStyle(S);
                    qa = y.getOriSize(ga);
                    wa = fa(wa, qa.width);
                    Ga = ba[R[e(n.headeralign, "center").toLowerCase()]];
                    Ha = A[ia[e(n.headervalign, "middle").toLowerCase()]];
                    ka = {};
                    P = ra = cb = "processHeader";
                    E.processHeader = {
                        text: ga,
                        style: S,
                        align: Ga,
                        vAlign: Ha,
                        isHeader: !0,
                        link: e(n.headerlink),
                        dimension: {
                            x: 0,
                            w: 0,
                            h: fa(qa.height, r)
                        },
                        bgColor: ca(e(n.headerbgcolor, f.getColor("dataTableBgColor")),
                            d(n.headerbgalpha, 100)),
                        key: P,
                        isLast: db,
                        drawResizer: !db && F,
                        prevCol: null,
                        nextCol: null,
                        prevRow: null,
                        nextRow: null
                    };
                    mb = e(n.bgcolor, f.getColor("dataTableBgColor"));
                    nb = d(n.bgalpha, 100);
                    Xa = e(n.font, p.fontFamily);
                    Ya = d(n.fontsize, w);
                    Za = e(n.fontcolor, p.color);
                    lb = d(n.isbold, 0);
                    $a = d(n.isitalic, 0);
                    ab = d(n.isunderline, 0);
                    Ga = e(n.align, "center").toLowerCase();
                    Ha = e(n.valign, "middle").toLowerCase();
                    for (z = 0; z < x; z += 1) da = h[z], Hb = e(da.hoverbandcolor, n.hoverbandcolor, a.processhoverbandcolor, a.hoverbandcolor, f.getColor("gridColor")),
                        Ib = d(da.hoverbandalpha, n.hoverbandalpha, a.processhoverbandalpha, a.hoverbandalpha, 30), jb = d(da.showhoverband, n.showhoverband, a.showprocesshoverband, a.showhoverband, a.showhovereffect, 1), S = {
                            color: pa(e(da.fontcolor, Za)),
                            fontSize: d(da.fontsize, Ya) + "px",
                            fontFamily: e(da.font, Xa),
                            fontWeight: d(da.isbold, lb) && "bold" || "normal",
                            fontStyle: d(da.isitalic, $a) && "italic" || "normal",
                            textDecoration: d(da.isunderline, ab) && "underline" || "none"
                        }, Ka(S), ga = Ca(e(da.label, da.name)), y.setStyle(S), qa = y.getOriSize(ga), Na = fa(Na, qa.height),
                        wa = fa(wa, qa.width), ya = P, P = e(da.id, "__FCDPID__" + z).toUpperCase(), E[P] && (P = "__FCDPID__" + z), na[z] = P, Sa(ub = d(da.height, a.rowheight)) && (ub = ac(ub), Oa += ub || 0, Pa += 1), E[P] = {
                            text: qa.text,
                            style: S,
                            link: da.link,
                            id: P,
                            processHeight: ub,
                            labelHeight: qa.height,
                            align: ba[[e(da.align, Ga).toLowerCase()]],
                            vAlign: A[ia[e(da.valign, Ha).toLowerCase()]],
                            bgColor: ca(e(da.bgcolor, mb), d(da.bgalpha, nb)),
                            prevCol: E[ya],
                            dimension: {},
                            hoverColor: ca(Hb, Ib),
                            useHover: jb,
                            usePlotHover: d(da.showganttpanehoverband, n.showganttpanehoverband, a.showganttpanehorizontalhoverband,
                                jb),
                            isLast: db,
                            nextCol: null,
                            prevRow: null,
                            nextRow: null
                        }, E[ya] && (E[ya].nextCol = E[P]);
                    E[P].first = E[ra];
                    E[ra].last = E[P];
                    E[ra].processCount = x;
                    E[ra].countDefinedHeight = Pa;
                    E[ra].totalHeight = Oa;
                    ua = E[ra].maxProcessHeight = Na + 8;
                    isNaN(V) && (V = wa + 10);
                    aa += V;
                    ka.x = 0;
                    E[ra].dimension.w = ka.w = V;
                    ka.h = ua = fa((D - E[ra].dimension.h) / x, ua)
                }
                db && (aa = 0);
                if (F)
                    for (q.datacolumns = [], z = 0; z < F; z += 1) {
                        U = T[z];
                        wa = 0;
                        mb = pa(e(U.bgcolor, O.bgcolor, f.getColor("dataTableBgColor")));
                        nb = d(U.bgalpha, O.bgalpha, 100);
                        Xa = e(U.font, O.font, p.fontFamily);
                        Za =
                            pa(e(U.fontcolor, O.fontcolor, p.color));
                        Ya = d(U.fontsize, O.fontsize, w);
                        lb = d(U.isbold, O.isbold, 0);
                        $a = d(U.isitalic, O.isitalic, 0);
                        ab = d(U.isunderline, O.isunderline, 0);
                        Ga = ba[R[e(U.align, O.align, "center").toLowerCase()]];
                        Ha = A[ia[e(U.valign, O.valign, "middle").toLowerCase()]];
                        S = {
                            color: pa(e(U.headerfontcolor, O.headerfontcolor, Za)),
                            fontFamily: e(U.headerfont, O.headerfont, Xa),
                            fontSize: d(U.headerfontsize, O.headerfontsize, Ya + 3) + "px",
                            fontWeight: d(U.headerisbold, O.headerisbold, 1) && "bold" || "normal",
                            fontStyle: d(U.headerisitalic,
                                O.headerisitalic, $a) && "italic" || "normal",
                            textDecoration: d(U.headerisunderline, O.headerisunderline, ab) && "underline" || "none"
                        };
                        Ka(S);
                        ga = Ca(U.headertext);
                        y.setStyle(S);
                        qa = y.getOriSize(ga);
                        wa = fa(wa, qa.width);
                        P = ra = "_FCDtHeader_" + z;
                        kb = E[P] = {
                            text: ga,
                            style: S,
                            align: ba[R[e(U.headeralign, O.headeralign, Ga).toLowerCase()]],
                            vAlign: A[ia[e(U.headervalign, O.headervalign, Ha).toLowerCase()]],
                            link: e(U.headerlink),
                            drawResizer: db || z < F - 1,
                            dimension: {
                                x: 0 + aa,
                                w: U.width,
                                h: E.processHeader && E.processHeader.dimension.h
                            },
                            isHeader: !0,
                            key: P,
                            bgColor: ca(e(U.headerbgcolor, O.headerbgcolor, f.getColor("dataTableBgColor")), d(U.headerbgalpha, O.headerbgalpha, 100))
                        };
                        kb.data = [];
                        fc = U.text || [];
                        qb = E.processHeader;
                        Ia = E[cb];
                        Ia.nextRow = E[P];
                        E[P].prevRow = Ia;
                        qb = qb.nextCol;
                        Ia = Ia.nextCol;
                        ka = {};
                        cb = ra;
                        for (X = 0; qb; qb = qb.nextCol, Ia = Ia.nextCol, X += 1) ya = P, P = "_FCDt_" + z + "_" + X, (sa = fc[X]) ? (S = {
                                fontFamily: e(sa.font, Xa),
                                color: pa(e(sa.fontcolor, Za)),
                                fontSize: d(sa.fontsize, Ya) + "px",
                                fontWeight: d(sa.isbold, lb) && "bold" || "normal",
                                fontStyle: d(sa.isitalic, $a) && "italic" ||
                                    "normal",
                                textDecoration: d(sa.isunderline, ab) && "underline" || "none"
                            }, Ka(S), y.setStyle(S), ga = Ca(sa.label), qa = y.getOriSize(ga), wa = fa(wa, qa.width), E[P] = {
                                text: ga,
                                style: S,
                                link: e(sa.link, ""),
                                bgColor: ca(e(sa.bgcolor, mb), d(sa.bgalpha, nb)),
                                align: ba[R[e(sa.align, Ga).toLowerCase()]],
                                vAlign: A[ia[e(sa.valign, Ha).toLowerCase()]],
                                prevCol: E[ya],
                                dimension: ka,
                                nextCol: null,
                                nextRow: null,
                                prevRow: null
                            }) : E[P] = {
                                prevCol: E[ya],
                                dimension: ka,
                                isNaN: !0,
                                nextCol: null,
                                nextRow: null,
                                prevRow: null
                            }, E[ya].nextCol = E[P], E[P].prevRow = Ia, Ia.nextRow =
                            E[P], E[P].hoverColor = E[na[X]].hoverColor, E[P].useHover = E[na[X]].useHover, E[P].usePlotHover = E[na[X]].usePlotHover;
                        E[P].first = E[ra];
                        E[ra].last = E[P];
                        isNaN(U.width) ? kb.width = wa + 10 : kb.width = U.width;
                        ka.x = 0 + aa;
                        aa += E[ra].dimension.w = ka.w = kb.width;
                        ka.h = ua;
                        q.datacolumns.push(kb)
                    }
                db && (da = E.processHeader, da.dimension.x = da.nextCol.dimension.x = aa, aa += V);
                bc || (k.ganttStartX = Da(k.ganttStartX, aa));
                k.totalGridWidth = aa;
                Wb = b.trendlines || {};
                q.trendlines = [];
                for (z = 0; z < Wb.length; z += 1)
                    for (B = (Xb = Wb[z].line) && Xb.length, X = 0; X <
                        B; X += 1) ta = Xb[X], Yb = d(ta.istrendzone, 0), Ba = e(ta.color, f.getColor("legendBorderColor")), S = eb({}, m.trendStyle), S.color = ca(Ba), Ka(S), q.trendlines.push({
                        start: s.getDateValue(ta.start).ms,
                        end: s.getDateValue(ta.end).ms,
                        displayValue: Ca(e(ta.displayvalue, ta.start)),
                        color: ca(Ba, d(ta.alpha, Yb ? 40 : 99)),
                        style: S,
                        isTrendZone: Yb,
                        dashedStyle: d(ta.dashed, 0) ? Eb(d(ta.dashlen, 3), d(ta.dashgap, 3), d(ta.thickness, 1)) : void 0,
                        thickness: d(ta.thickness, 1)
                    });
                if (K) {
                    C = Infinity;
                    l = -Infinity;
                    d(a.taskbarroundradius, 0);
                    Wa = a.taskbarfillmix;
                    Mb = a.taskbarfillratio;
                    void 0 === Wa && (Wa = "{light-10},{dark-20},{light-50},{light-85}");
                    void 0 === Mb && (Mb = "0,8,84,8");
                    k.shadow = d(a.showshadow, 1);
                    Qa = d(a.showslackasfill, 1);
                    for (z = 0; z < K; z += 1) I = $[z], Sb = u % x, la = s.getDateValue(I.start).ms, ma = s.getDateValue(I.end).ms, P = e(E[Ea(I.processid, "").toUpperCase()], E["__FCDPID__" + Sb], E[na[Sb]]).id.toUpperCase(), yb = d(I.alpha, G.alpha, 100), Ba = e(I.color, G.color, f.getColor("plotFillColor")), Ob = d(I.borderalpha, G.borderalpha, 100), Tb = e(I.bordercolor, G.bordercolor, f.getColor("plotBorderColor")),
                        isNaN(la) && (la = void 0), la > l && (l = la), la <= C && (C = la), isNaN(ma) && (ma = void 0), ma > l && (l = ma), ma <= C && (C = ma), S = {
                            color: pa(e(I.fontcolor, G.fontcolor, p.color)),
                            fontSize: d(I.fontsize, G.fontsize, w) + "px",
                            fontFamily: e(I.font, G.font, p.fontFamily)
                        }, Ka(S), u += 1, ob = f.parseColorMix(Ba, Wa), Ub = f.parseAlphaList(yb.toString(), ob.length), zb = f.parseRatioList(Mb, ob.length), Ab = d(I.angle, G.angle, 270), Pb = f.parseColorMix(e(I.slackfillcolor, G.slackfillcolor, a.slackfillcolor, "FF5E5E"), Wa), pb = Da(d(I.percentcomplete, -1), 100), ga = Ea(e(I.label,
                            I.name), ""), Db = "", d(I.showlabel, I.showname, G.showlabels, G.showname, a.showtasklabels, a.showtasknames, 0) && (Db = ga), d(I.showpercentlabel, G.showpercentlabel, a.showpercentlabel, 0) && -1 !== pb && (Db += " " + pb + "%"), tb = {
                            FCcolor: {
                                color: ob.join(),
                                alpha: Ub,
                                ratio: zb,
                                angle: Ab
                            }
                        }, Pb = Qa ? {
                            FCcolor: {
                                color: Pb.join(),
                                alpha: Ub,
                                ratio: zb,
                                angle: Ab
                            }
                        } : La, cc = {
                            FCcolor: {
                                color: f.parseColorMix(e(I.hoverfillcolor, G.hoverfillcolor, a.taskhoverfillcolor, fb(Ba, 80)), Wa).join(),
                                alpha: f.parseAlphaList(e(I.hoverfillalpha, G.hoverfillalpha, a.taskhoverfillalpha,
                                    yb).toString(), ob.length),
                                ratio: zb,
                                angle: Ab
                            }
                        }, dc = ca(e(I.hoverbordercolor, G.hoverbordercolor, a.taskhoverbordercolor, fb(Tb, 80)), e(I.hoverborderalpha, G.hoverborderalpha, a.taskhoverborderalpha, Ob)), ec = Qa ? {
                            FCcolor: {
                                color: f.parseColorMix(fb(e(I.slackhoverfillcolor, G.slackhoverfillcolor, a.slackhoverfillcolor, a.slackfillcolor, "FF5E5E"), 80), Wa).join(),
                                alpha: f.parseAlphaList(e(I.slackhoverfillalpha, G.slackhoverfillalpha, a.slackhoverfillalpha, yb).toString(), ob.length),
                                ratio: zb,
                                angle: Ab
                            }
                        } : La, Bb = s.getFormattedDate(la),
                        Cb = s.getFormattedDate(ma), za = Zb(Ca(e(I.tooltext, I.hovertext, G.plottooltext, m.tooltext))), za = void 0 !== za ? J.parseTooltext(za, [3, 28, 29, 30, 31], {
                            end: Cb,
                            start: Bb,
                            label: ga,
                            percentComplete: -1 !== pb ? s.percentValue(pb) : "",
                            processName: E[P] && E[P].text
                        }, I) : ("" !== ga ? ga + (Ma ? ", " : "") : "") + (Ma ? Bb + " - " + Cb : ""), Va = Ea(I.id, "").toUpperCase(), Fa[Ea(Va, z)] = {
                            dataObj: {
                                processId: P,
                                label: Db,
                                labelAlign: ba[[e(I.labelalign, a.tasklabelsalign, "center").toLowerCase()]],
                                link: I.link,
                                start: la,
                                end: ma,
                                id: Ea(I.id, "").toUpperCase(),
                                showAsGroup: d(I.showasgroup,
                                    0),
                                animation: d(I.animation, a.animation, a.defaultanimation, 1),
                                style: S,
                                percentComplete: pb,
                                color: Fb(tb),
                                slackColor: Fb(Pb),
                                hoverFillColor: Fb(cc),
                                hoverBorderColor: dc,
                                slackHoverColor: Fb(ec),
                                showHoverEffect: d(I.showhovereffect, G.showhovereffect, a.showtaskhovereffect, a.showhovereffect, 1),
                                shadow: {
                                    opacity: fa(yb, Ob) / 100,
                                    inverted: !0
                                },
                                borderColor: ca(Tb, Ob),
                                borderThickness: d(I.showborder, G.showborder, 1) ? d(I.borderthickness, G.borderthickness, 1) : 0,
                                height: e(I.height, "35%"),
                                topPadding: e(I.toppadding, "35%"),
                                showPercentLabel: d(I.showpercentlabel,
                                    G.showpercentlabel, a.showpercentlabel, 0),
                                startDate: d(I.showstartdate, G.showstartdate, a.showtaskstartdate) ? Bb : void 0,
                                endDate: d(I.showenddate, G.showenddate, a.showtaskenddate) ? Cb : void 0,
                                toolText: za,
                                _start: I.start,
                                _end: I.end,
                                _formatSDate: Bb,
                                _formatEDate: Cb,
                                _label: ga
                            }
                        }, v.push(Fa[Ea(Va, z)].dataObj);
                    ib = fa(ib, l);
                    hb = Da(hb, C)
                }
                q.series.push({
                    showInLegend: !1,
                    data: v
                });
                B = N && N.length;
                for (z = 0; z < B; z += 1) Q = N[z], Va = Ea(Q.taskid, "").toUpperCase(), Nb = e(Q.shape, "polygon").toLowerCase(), Lb = d(Q.numsides, 5), Vb = 0, "star" === Nb ?
                    Vb = .4 : (Nb = $b(Lb), Nb = $b(Lb).split("-")[0]), Ba = e(Q.color, f.getColor("legendBorderColor")), za = Zb(Ca(e(Q.tooltext, Q.hovertext, a.milestonetooltext))), void 0 !== za && Fa[Va] ? (I = Fa[Va].dataObj, za = J.parseTooltext(za, [28, 32, 33, 34, 35, 36], {
                        date: s.getFormattedDate(Q.date),
                        taskStartDate: I._formatSDate,
                        taskEndDate: I._formatEDate,
                        taskLabel: I._label,
                        taskPercentComplete: -1 !== I.percentComplete ? s.percentValue(I.percentComplete) : "",
                        processName: E[I.processId] && E[I.processId].text
                    }, Q)) : za = s.getFormattedDate(Q.date), S = {
                        color: pa(e(Q.fontcolor,
                            a.milestonefontcolor, p.color)),
                        fontSize: d(Q.fontsize, a.milestonefontsize, w) + "px",
                        fontFamily: e(Q.font, a.milestonefont, p.fontFamily),
                        fontWeight: d(Q.fontbold, a.milestonefontbold, 0) && "bold" || "normal",
                        fontStyle: d(Q.fontitalic, a.milestonefontitalic, 0) && "italic" || "normal"
                    }, Ka(S), Z.push({
                        numSides: Lb,
                        startAngle: d(Q.startangle, 90),
                        radius: Q.radius,
                        origDate: Q.date,
                        date: s.getDateValue(Q.date),
                        fillColor: pa(Ba),
                        fillAlpha: .01 * d(Q.fillalpha, Q.alpha, 100),
                        borderColor: pa(e(Q.bordercolor, Ba)),
                        borderAlpha: .01 * d(Q.borderalpha,
                            Q.alpha, 100),
                        displayValue: Ca(Q.label),
                        style: S,
                        hoverFillColor: pa(e(Q.hoverfillcolor, a.milestonehoverfillcolor, fb(Ba, 80))),
                        hoverFillAlpha: .01 * d(Q.hoverfillalpha, a.milestonehoverfillalpha, Q.fillalpha, Q.alpha, 100),
                        hoverBorderColor: pa(e(Q.hoverbordercolor, a.milestonehoverbordercolor, fb(e(Q.bordercolor, Ba), 80))),
                        hoverBorderAlpha: .01 * d(Q.hoverborderalpha, a.milestonehoverborderalpha, Q.borderalpha, Q.alpha, 100),
                        showHoverEffect: d(Q.showhovereffect, a.showmilestonehovereffect, a.showhovereffect, 1),
                        depth: Vb,
                        taskId: Va,
                        borderThickness: d(Q.borderthickness, 1),
                        link: Q.link,
                        toolText: za
                    });
                for (z = 0; z < L; z += 1)
                    if (gb = (Ta = (xa = ea[z]) && xa.connector) && Ta.length)
                        for (X = 0; X < gb; X += 1) oa = Ta[X], Ua = e(oa.color, xa.color, f.getColor("plotBorderColor")), Qb = d(oa.alpha, xa.alpha, 100), wb = d(oa.thickness, xa.thickness, 1), rb = d(oa.isdashed, xa.isdashed, 1), M.push({
                            fromTaskId: Ea(oa.fromtaskid, "").toUpperCase(),
                            toTaskId: Ea(oa.totaskid, "").toUpperCase(),
                            fromTaskConnectStart: d(oa.fromtaskconnectstart, 0),
                            toTaskConnectStart: d(oa.totaskconnectstart, 1),
                            color: ca(Ua),
                            alpha: .01 * Qb,
                            link: oa.link,
                            showHoverEffect: d(oa.showhovereffect, xa.showhovereffect, a.showconnectorhovereffect, a.showhovereffect, 1),
                            hoverColor: ca(e(oa.hovercolor, xa.hovercolor, a.connectorhovercolor, fb(Ua, 80)), d(oa.hoveralpha, xa.hoveralpha, a.connectorhoveralpha, Qb)),
                            hoverThickness: d(oa.hoverthickness, xa.hoverthickness, a.connectorhoverthickness, wb),
                            thickness: wb,
                            dashedStyle: rb ? Eb(d(oa.dashlen, xa.dashlen, 5), d(oa.dashgap, xa.dashgap, wb), wb) : void 0
                        });
                q.legend.enabled = Boolean(d(a.showlegend, 1));
                q.legend.interactiveLegend = !1;
                q.legend.itemStyle.cursor = "default";
                q.legend.itemHoverStyle = {
                    cursor: "inherit"
                };
                B = Ja && Ja.length;
                for (z = 0; z < B; z += 1) vb = Ja[z], Sa(vb.label) && "" !== vb.label && q.series.push({
                    name: Ca(vb.label),
                    showInLegend: !0,
                    type: !1,
                    color: hc(e(vb.color, f.getPlotColor()))
                });
                q.max = ib;
                q.min = hb;
                q.chart.hasScroll = !0;
                return q
            }
        },
        spaceManager: function(b, a, H, c) {
            this.titleSpaceManager(b, a, H, .3 * c);
            var q = this.numberFormatter,
                k = b.chart,
                m = a.chart,
                y = b.dataTable,
                f = b.categories,
                g = b.scrollOptions = {},
                v = y.__scrollOptions = {},
                p = y.processHeader;
            c = c - k.marginTop - k.marginBottom;
            H = H - k.marginLeft - k.marginRight;
            var s = k.totalGridWidth,
                C = b.verticalScroll = {
                    enabled: d(m.useverticalscrolling, 1)
                },
                l = d(m.ganttpaneduration, -1),
                t = e(m.ganttpanedurationunit, "s").toLowerCase(),
                D = q.getDateValue(m.scrolltodate).ms,
                n = p && p.maxProcessHeight,
                h, x, q = 0;
            if (p) {
                h = p.processCount - p.countDefinedHeight;
                b.legend.enabled && (c -= this.placeLegendBlockBottom(b, a, H, c / 2));
                c -= p.dimension.h;
                g.padding = d(m.scrollpadding, b.chart.plotBorderWidth / 2);
                g.height = d(m.scrollheight, 16);
                g.showButtons = !!d(m.scrollshowbuttons, 1);
                g.buttonPadding = d(m.scrollbtnpadding, 0);
                g.flatScrollBars = d(m.flatscrollbars, 0);
                g.color = pa(e(m.scrollcolor, this.colorManager.getColor("altHGridColor")));
                a = g.height + g.padding;
                s > k.ganttStartX && (v.enabled = !0, v.startPercent = Boolean(d(m.scrolltoend, 0)));
                H -= k.ganttStartX;
                f.scroll = {};
                g = new Date(f && f.min);
                if (-1 !== l) {
                    switch (t) {
                        case "y":
                            g.setYear(g.getFullYear() + l);
                            break;
                        case "m":
                            g.setMonth(g.getMonth() + l);
                            break;
                        case "d":
                            g.setDate(g.getDate() + l);
                            break;
                        case "h":
                            g.setHours(g.getHours() +
                                l);
                            break;
                        case "mn":
                            g.setMinutes(g.getMinutes() + l);
                            break;
                        default:
                            g.setSeconds(g.getSeconds() + l)
                    }
                    g = g.getTime();
                    g > b.min && g < b.max && (b.visibleMax = g, f.scroll.enabled = !0)
                }
                if (v.enabled || f.scroll.enabled) c -= a;
                v = c - p.totalHeight;
                g = v / (h ? h : p.processCount);
                !d(m.forcerowheight, 0) && !h && p.totalHeight < c && (g = c / p.processCount, v = c, x = !0);
                n > g && (n = 3 > n - g ? g : v / va(v / n));
                p.maxProcessHeight = n;
                C.enabled && g < n && h || 0 > g ? (v = n, C.startPercent = Boolean(d(m.scrolltoend, 0)), H -= a) : (C.enabled = !1, v = g);
                f.scroll.startPercent = d(m.scrolltoend, 0);
                if (Infinity === b.min || -Infinity === b.max || b.min === b.max) b.min = f.min = 0, b.max = f.max = 1;
                if (Infinity === f.min || -Infinity === f.max) f.min = b.min, f.max = b.max;
                f.axis = new Fa(b, H);
                f.startX = f.axis.getPixel(Da(f.min, b.min));
                f.endX = f.axis.getPixel(fa(f.max, b.max));
                f.visibleW = H;
                D && D > f.min && D < f.max && (f.scroll.startPercent = Da((f.axis.getPixel(D) - f.startX) / (f.endX - f.startX - f.visibleW), 1));
                for (p = p.nextCol; p;) {
                    q += p.dimension.h = x ? v : p.processHeight || v;
                    if (b = p.nextRow)
                        for (; b;) b.dimension.h = p.dimension.h, b = b.nextRow;
                    p = p.nextCol
                }
                y.processHeader.totalPH =
                    q;
                k.processHeight = c + y.processHeader.dimension.h
            }
        }
    }, rb.gaugebase);
    Pa("renderer.gantt", {
        drawProcess: function(b) {
            var a = this,
                d = a.options,
                c = d.chart,
                q = a.paper,
                k = a.logic,
                m = k.smartLabel,
                y = a.canvasTop,
                f = a.canvasLeft,
                g = a.layers,
                v = g.gridLayer,
                p = g.gridHeaderLayer,
                s = c.gridBorderThickness,
                C = .5 * s,
                l = c.gridBorderColor,
                t = c.gridBorderDashStyle,
                D = 0,
                n = 0,
                h = [],
                x = y,
                w = b.dimension.w || 16,
                O = b.dimension.x || 0,
                T = d.dataTable.processHeader,
                F = T.nextCol.dimension.h,
                ea = T.totalPH,
                k = ca(e(k.dataObj.chart.rolloverbandcolor, "#FF0000"), e(k.dataObj.chart.rolloverbandalpha,
                    30)),
                L = T.items || (T.items = {}),
                d = d.categories || {},
                M, N, B, Z, G, $, K, u, r, J, aa;
            L.hoverEle || (L.hoverEle = q.rect(d.startX, 0, d.endX, F, 0, g.dataset).attr({
                fill: k,
                visibility: "hidden",
                "stroke-width": 0
            }));
            r = function(b) {
                Y.call(this, a, b, "ProcessClick")
            };
            J = function(b) {
                na = clearTimeout(na);
                if (!W || W.removed) W = null;
                W && a.gridOutHandler.call(W);
                a.gridHoverHandler.call(this);
                Y.call(this, a, b, "ProcessRollOver")
            };
            for (aa = function(b) {
                    W = this;
                    na = clearTimeout(na);
                    na = setTimeout(function() {
                        a.gridOutHandler.call(W)
                    }, 500);
                    Y.call(W, a, b,
                        "ProcessRollOut")
                }; b;) u = b.dimension, K = f + O, B = b.text, B = b.align, L = b.items || (b.items = {}), F = b.link, N = b.isHeader ? p : v, Z = L.background, d = Ma(x + n) - .5, B = {
                x: Ma(K + D) - .5,
                y: d,
                width: w + .5,
                height: u.h + C + .5,
                radius: 0,
                fill: b.bgColor || La,
                "stroke-dasharray": t,
                stroke: l,
                cursor: F ? "pointer" : "",
                "stroke-width": 0
            }, Z ? Z.attr(B) : (L.background = q.rect(N).attr(B).hover(J, aa), M = {
                isHeader: b.isHeader,
                label: b.text,
                vAlign: b.vAlign,
                align: b.align,
                link: b.link,
                id: b.id
            }, L.background.click(r).data("dataObj", b).data("eventArgs", M).data("data", {
                y: d,
                gridObj: b,
                rollOverColor: k,
                useHover: !0,
                useNext: !0,
                height: u.h + C + .5,
                hoverEle: T.items.hoverEle
            })), b.isNaN || (u = b.dimension, B = b.text, B = b.align, Z = L.label, B = b.text, Sa(B) && "" !== B && ($ = b.style, m.setStyle($), G = m.getSmartText(B, w - 8, fa(Ra($.lineHeight, 10), u.h)), $.title = G.oriText, B = b.align, B = {
                text: G.text,
                x: K + w * gb[B] + Ua[B],
                y: x + u.h - u.h * tb[b.vAlign],
                "text-anchor": Ta[B],
                direction: c.textDirection,
                cursor: F ? "pointer" : "",
                "vertical-align": b.vAlign
            }, Z ? Z.attr(B) : L.label = q.text(N).attr(B).css($).hover(J, aa).click(r).data("eventArgs",
                M).data("dataObj", b).data("data", {
                y: d,
                gridObj: b,
                rollOverColor: k,
                useHover: !0,
                height: u.h + C + .5,
                useNext: !0,
                hoverEle: T.items.hoverEle
            }))), b.xPos = K, b.yPos = Ma(x + u.h) - s % 2 * .5, h.push("M", K, b.yPos, "h", w), (Z = L.hBorder) ? Z.attr("path", h) : L.hBorder = q.path(h, N).attr({
                "stroke-dasharray": t,
                stroke: l,
                "stroke-width": s
            }), x += u.h, b.nextCol || (D = C, n -= 0, Z = b.first.items.vBorder, B = ["M", Ma(K + w) - s % 2 * .5, y, "v", ea], Z ? Z.attr("path", B) : b.first.items.vBorder = q.path(B, p).attr({
                    "stroke-dasharray": t,
                    stroke: l,
                    "stroke-width": s
                }), b.nextRow &&
                !b.isLast && (b.first.items.dragEle || (b.first.items.dragEle = q.path(B, g.gridTracker).attr({
                    stroke: c.gridResizeBarColor,
                    "stroke-width": c.gridResizeBarThickness,
                    visibility: "hidden"
                })), b.first.items.tracker || (b.first.items.tracker = q.path(B, g.gridTracker).attr({
                    stroke: La,
                    ishot: !0,
                    "stroke-width": 30
                }).css("cursor", ia.svg && "ew-resize" || "e-resize").drag(this.dragMove, this.dragStart, this.dragUp).data("drag-options", {
                    grid: b.first,
                    xPos: Ma(K + w) - s % 2 * .5,
                    chart: a
                })))), b = b.nextCol
        },
        dragStart: function() {
            var b = this.data("drag-options"),
                a = b.grid,
                H = a.items,
                c = a.nextRow,
                e = {
                    style: {
                        lineHeight: 16
                    }
                },
                k = a.nextCol.style || e,
                m = c && c.nextCol && c.nextCol.style || e,
                y = b.chart,
                f = y.canvasLeft,
                g = a.dimension,
                k = fa(Ra(a.style.lineHeight, 10), Ra(k.lineHeight, 10)) + 2,
                e = fa(Ra((c || e).style.lineHeight, 10), Ra(m.lineHeight, 10)) + 2;
            b.leftSideLimit = f + d(a.dimension.x, 0) + k;
            b.rightSideLimit = f + d(c && c.dimension.x + c.dimension.w, g.x + g.w) - e;
            b.origX = b.lastX || (b.lastX = 0);
            H.dragEle.show();
            y.trackerClicked = !0;
            b.draged = !1
        },
        dragMove: function(b) {
            var a = this.data("drag-options"),
                d =
                a.grid.items,
                c = a.xPos + b,
                e = a.leftSideLimit,
                k = a.rightSideLimit;
            c < e && (b = e - a.xPos);
            c > k && (b = k - a.xPos);
            c = {
                transform: "t" + (a.origX + b) + ic + 0
            };
            this.attr(c);
            d.dragEle.attr(c);
            a.draged = !0;
            a.lastX = b
        },
        dragUp: function() {
            var b = this.data("drag-options"),
                a = b.chart,
                d = b.grid,
                c = d.nextRow,
                e = a.canvasLeft,
                k = d.dimension,
                m = c && c.dimension,
                y = d.items,
                f = {
                    hcJSON: {
                        dataTable: {}
                    }
                };
            a.trackerClicked = !1;
            y.dragEle.hide();
            b.draged && (k.w = b.xPos + b.lastX - e - k.x, d.nextCol && (d.nextCol.dimension.w = k.w), f.hcJSON.dataTable[d.key] = {
                    dimension: k
                },
                c && (m.w += m.x - k.x - k.w, m.x = k.x + k.w, c.dimension.w = m.w, c.dimension.x = m.x, a.drawProcess(c), f.hcJSON.dataTable[c.key] = {
                    dimension: m
                }), a.drawProcess(d), eb(a.logic.chartInstance.jsVars._reflowData, f, !0), b.xPos += b.lastX, b.lastX += b.origX)
        },
        drawCategories: function() {
            var b = this,
                a = b.options,
                e = a.chart,
                c = b.paper,
                q = b.layers,
                k = b.logic.smartLabel,
                m = b.canvasTop,
                y = a.categories,
                f = a.dataTable.processHeader,
                g = y.FCCAT_0_0,
                v = y.axis,
                p = y.endX,
                s = y.startX,
                C = p - s,
                l = e.ganttLineThickness,
                t = f.totalPH + f.dimension.h,
                D = [],
                n = [],
                h = q.dataset,
                q = q.ganttHeaderLayer,
                x, w, O, T, F, J, L, M, N, B, Z, G, $, K, u;
            $ = function(a) {
                Y.call(this, b, a, "CategoryClick")
            };
            K = function(a) {
                na = clearTimeout(na);
                if (!W || W.removed) W = null;
                W && b.gridOutHandler.call(W);
                b.gridHoverHandler.call(this);
                Y.call(this, b, a, "CategoryRollOver")
            };
            u = function(a) {
                W = this;
                na = clearTimeout(na);
                na = setTimeout(function() {
                    b.gridOutHandler.call(W)
                }, 500);
                Y.call(W, b, a, "CategoryRollOut")
            };
            T = y.items || (y.items = {});
            f = a.dataTable.processHeader;
            for (T.hoverEle = c.rect(0, m + f.dimension.h, 50, f.totalPH, 0, h).attr({
                    fill: La,
                    visibility: "hidden",
                    "stroke-width": 0
                }); g;) w = C / g.dimension.numCat, F = s + w * (g.index + 1), N = F - w, M = g.dimension.h, B = N, G = m + g.dimension.y, J = g.align, L = g.vAlign, O = g.link, T = g.items || (g.items = {}), w = !(!g.nextRow && g.nextCol), Z = a.verticalScroll.enabled && w ? a.scrollOptions.height : 0, x = {
                    align: g.align,
                    vAlign: g.vAlign,
                    link: g.link,
                    text: g.text
                }, N = B = d(v.getPixel(g.start), N), F = d(v.getPixel(!w && g.nextCol.start || (w ? fa(g.end || 0, a.max) : void 0)), F), w = F - N, B = va(B) + .5, G = va(G) + .5, g.isLast && (D.push("M", B, G, "v", t - g.dimension.y), G -= .5 *
                    l, M -= l, e.extendCategoryBg && c.rect(B, G, w, t, 0, h).attr({
                        fill: g.bgColor,
                        "stroke-width": 0,
                        stroke: e.ganttLineColor
                    }).toBack()), T.background = c.rect(B, G, w + Z, M, 0, q).attr({
                    fill: g.bgColor,
                    "stroke-width": 0,
                    cursor: O ? "pointer" : "",
                    stroke: e.ganttLineColor
                }).click($).data("eventArgs", x).data("dataObj", g).hover(K, u).data("data", {
                    x: B,
                    width: w,
                    gridObj: g,
                    hoverEle: y.items.hoverEle
                }), n.push("M", B, G, "v", M), g.nextRow && n.push("M", s, G + M, "H", p + Z), k.setStyle(g.style), F = k.getSmartText(g.text, w - 5, M), g.style.title = F.oriText, T.label =
                c.text(q).attr({
                    text: F.text,
                    x: B + w * gb[J] + Ua[J],
                    y: G + M - M * tb[L],
                    "text-anchor": Ta[J],
                    cursor: O ? "pointer" : "",
                    direction: e.textDirection,
                    "vertical-align": L
                }).css(g.style).hover(K, u).click($).data("eventArgs", x).data("dataObj", g).data("data", {
                    x: B,
                    width: w,
                    gridObj: g,
                    hoverEle: y.items.hoverEle
                }), g = g.nextCol;
            for (; f;) D.push("M", y.startX, f.yPos, "H", p), f = f.nextCol;
            T = y.items || (y.items = {});
            T.headerGrid = c.path(n, q).attr({
                "stroke-dasharray": e.ganttLineDashStyle,
                "stroke-width": l,
                stroke: e.ganttLineColor
            });
            T.processGrid =
                c.path(D, h).attr({
                    "stroke-dasharray": e.ganttLineDashStyle,
                    "stroke-width": e.ganttLineThickness,
                    stroke: e.ganttLineColor
                })
        },
        drawScroller: function() {
            var b = this,
                a = b.options,
                e = b.paper,
                c = b.layers,
                q = b.canvasTop,
                k = b.canvasHeight,
                m = a.scrollOptions,
                y = a.categories,
                f = y.startX,
                g = y.endX - f,
                v = m.flatScrollBars,
                p = {
                    hcJSON: {
                        categories: {
                            scroll: {}
                        }
                    }
                },
                s = c.dataset,
                C = c.datalabels,
                l = c.ganttTracker,
                t = c.ganttHeaderLayer,
                D = b.logic.chartInstance && b.logic.chartInstance.jsVars._reflowData || {},
                n = a.chart,
                h = c.gridLayer,
                x = (f = a.dataTable) &&
                f.processHeader,
                w = b.canvasLeft,
                O = b.canvasWidth,
                J = n.gridBorderThickness,
                F = n.totalGridWidth,
                ea = Da(n.ganttStartX, F) + J,
                L = y.scroll,
                M = f && f.__scrollOptions,
                N = a.verticalScroll,
                B = {
                    hcJSON: {
                        dataTable: {
                            __scrollOptions: {}
                        },
                        verticalScroll: {}
                    }
                },
                Z = B.hcJSON.dataTable.__scrollOptions,
                G = x.totalPH,
                $ = c.gridHeaderLayer,
                K = c.gridTracker,
                u, r, f = d(y.startX, n.ganttStartX),
                c = c.scroll = c.scroll || e.group("scroll").insertAfter(l);
            L.enabled && (a = y.visibleW / g, L.scroller = e.scroller(f, q + k - m.height, y.visibleW, m.height, !0, {
                showButtons: m.showButtons,
                displayStyleFlat: v,
                buttonWidth: m.buttonWidth,
                scrollRatio: a,
                scrollPosition: L.startPercent
            }, c).attr({
                "scroll-display-style": v,
                fill: m.color
            }).scroll(function(a) {
                r = -va(a * (g - y.visibleW));
                s && s.transform(["T", r, s.data("vOffset")]);
                C && C.transform(["T", r, C.data("vOffset")]);
                l && l.transform(["T", r, l.data("vOffset")]);
                t && t.transform(["T", r, 0]);
                s && s.data("hOffset", r);
                C && C.data("hOffset", r);
                l && l.data("hOffset", r);
                p.hcJSON.categories.scroll.startPercent = a;
                eb(D, p, !0)
            }), function() {
                var a;
                ia.eve.on("raphael.scroll.start." +
                    L.scroller.id,
                    function(c) {
                        a = c;
                        V.raiseEvent("scrollstart", {
                            scrollPosition: c
                        }, b.logic.chartInstance)
                    });
                ia.eve.on("raphael.scroll.end." + L.scroller.id, function(c) {
                    V.raiseEvent("scrollend", {
                        prevScrollPosition: a,
                        scrollPosition: c
                    }, b.logic.chartInstance)
                })
            }(), L.startPercent && (r = -va(L.startPercent * (g - y.visibleW)), s && s.data("hOffset", r), C && C.data("hOffset", r), l && l.data("hOffset", r), t && t.transform(["T", r, 0]), s && s.transform(["T", r, s.data("vOffset")]), C && C.transform(["T", r, s.data("vOffset")]), l && l.transform(["T",
                r, s.data("vOffset")
            ])));
            M.enabled && (M.scroller = e.scroller(w, q + k - m.height, ea, m.height, !0, {
                showButtons: m.showButtons,
                displayStyleFlat: v,
                buttonWidth: m.buttonWidth,
                scrollRatio: ea / F,
                scrollPosition: M.startPercent
            }, c).attr({
                "scroll-display-style": v,
                fill: m.color
            }).scroll(function(a) {
                r = -va(a * (F - ea));
                h && h.transform(["T", r, h.data("vOffset")]);
                $ && $.transform(["T", r, 0]);
                K && K.transform(["T", r, K.data("vOffset")]);
                h.data("hOffset", r);
                $.data("hOffset", r);
                K.data("hOffset", r);
                Z.startPercent = a;
                eb(D, B, !0)
            }), function() {
                var a;
                ia.eve.on("raphael.scroll.start." + M.scroller.id, function(c) {
                    a = c;
                    V.raiseEvent("scrollstart", {
                        scrollPosition: c
                    }, b.logic.chartInstance)
                });
                ia.eve.on("raphael.scroll.end." + M.scroller.id, function(c) {
                    V.raiseEvent("scrollend", {
                        prevScrollPosition: a,
                        scrollPosition: c
                    }, b.logic.chartInstance)
                })
            }(), M.startPercent && (r = -va(M.startPercent * (F - ea)), h && h.transform(["T", r, 0]), K && K.transform(["T", r, 0]), $ && $.transform(["T", r, 0]), h.data("hOffset", r), K.data("hOffset", r)));
            N.enabled && (u = n.processHeight - x.dimension.h, N.scroller =
                e.scroller(w + O - m.height, q + x.dimension.h, m.height, n.processHeight - x.dimension.h, !1, {
                    showButtons: m.showButtons,
                    displayStyleFlat: v,
                    buttonWidth: m.buttonWidth,
                    scrollRatio: u / G,
                    scrollPosition: N.startPercent
                }, c).attr({
                    "scroll-display-style": v,
                    fill: m.color
                }).scroll(function(a) {
                    r = -va(a * (G - u));
                    h && h.transform(["T", h.data("hOffset"), r]);
                    s && s.transform(["T", s.data("hOffset"), r]);
                    C && C.transform(["T", C.data("hOffset"), r]);
                    l && l.transform(["T", l.data("hOffset"), r]);
                    K && K.transform(["T", K.data("hOffset"), r]);
                    h.data("vOffset",
                        r);
                    K.data("vOffset", r);
                    s.data("vOffset", r);
                    l.data("vOffset", r);
                    C.data("vOffset", r);
                    B.hcJSON.verticalScroll.startPercent = a;
                    eb(D, B, !0)
                }),
                function() {
                    var a;
                    ia.eve.on("raphael.scroll.start." + N.scroller.id, function(c) {
                        a = c;
                        V.raiseEvent("scrollstart", {
                            scrollPosition: c
                        }, b.logic.chartInstance)
                    });
                    ia.eve.on("raphael.scroll.end." + N.scroller.id, function(c) {
                        V.raiseEvent("scrollend", {
                            prevScrollPosition: a,
                            scrollPosition: c
                        }, b.logic.chartInstance)
                    })
                }(), N.startPercent && (r = -va(N.startPercent * (G - u)), h && h.transform(["T",
                    h.data("hOffset"), r
                ]), s && s.transform(["T", s.data("hOffset"), r]), C && C.transform(["T", C.data("hOffset"), r]), l && l.transform(["T", l.data("hOffset"), r]), K && K.transform(["T", K.data("hOffset"), r]), h.data("vOffset", r), K.data("vOffset", r), s.data("vOffset", r), C.data("vOffset", r), l.data("vOffset", r)))
        },
        finalizeScrollPlots: function() {
            var b = this,
                a = b.options,
                d = b.canvasTop,
                c = a.categories,
                e = c.endX,
                k = c.startX,
                m = c.scroll,
                y = a.chart,
                f = a.dataTable,
                g = f && f.processHeader,
                v = b.canvasLeft,
                p = y.gridBorderThickness,
                s = y.totalGridWidth,
                C = Da(y.ganttStartX, s) + p,
                l, t, D, n, h, x = e - k - c.visibleW,
                e = b.container,
                w = f && f.__scrollOptions,
                O = a.verticalScroll,
                T = g.totalPH,
                F = y.processHeight - g.dimension.h,
                ea, L, M, N, B, m = c.scroll,
                a = function(a) {
                    var e = b.elements.canvas,
                        f = N.left,
                        p = N.top,
                        q = a.type,
                        r = sb && J.getTouchEvent(a) || kc,
                        f = a.layerX || r.layerX || (a.pageX || r.pageX) - f;
                    a = a.layerY || r.layerY || (a.pageY || r.pageY) - p;
                    switch (q) {
                        case "dragstart":
                            B = e.isPointInside(f, a);
                            ea = f > k && f < k + c.visibleW;
                            M = f > v && f < k + c.visibleW && a > d + g.dimension.h;
                            L = f < k;
                            l = B && f || null;
                            t = B && a || null;
                            break;
                        case "dragend":
                            B = !1;
                            h = n = D = t = l = void 0;
                            break;
                        default:
                            if (!B || b.trackerClicked) break;
                            e = f - l;
                            q = a - t;
                            l = f;
                            t = a;
                            ea && m && m.scroller && (D = m.scroller.attrs["scroll-position"] - e / x, m.scroller.attr({
                                "scroll-position": D
                            }));
                            M && O && O.scroller && (n = O.scroller.attrs["scroll-position"] - q / (T - F), O.scroller.attr({
                                "scroll-position": n
                            }));
                            L && w && w.scroller && (h = w.scroller.attrs["scroll-position"] - e / (s - C), w.scroller.attr({
                                "scroll-position": h
                            }))
                    }
                };
            sb && (N = J.getPosition(e), e && (mc(e, "dragstart drag dragend", a), lc(e, "dragstart drag dragend",
                a)))
        },
        gridHoverHandler: function() {
            var b = this.data("data"),
                a = b.gridObj,
                d = !!a.prevRow,
                c = {};
            if (!a.isHeader)
                if (b.x && (c.x = b.x), b.y && (c.y = b.y), b.width && (c.width = b.width), b.height && (c.height = b.height), a.hoverColor && (c.fill = a.hoverColor), a.usePlotHover && b.hoverEle.attr(c).show(), b.useNext && a.useHover) {
                    for (; a && d;) a = a.prevRow, d = !!a.prevRow;
                    for (; a;) a.items.background.attr("fill", a.hoverColor), a = a.nextRow
                } else a.useHover && a.items.background.attr("fill", a.hoverColor)
        },
        gridOutHandler: function() {
            var b = this.data("data"),
                a = b.gridObj,
                d = !!a.prevRow;
            if (!a.isHeader)
                if (a.usePlotHover && b.hoverEle.hide(), b.useNext && a.useHover) {
                    for (; a && d;) a = a.prevRow, d = !!a.prevRow;
                    for (; a;) a.items.background.attr("fill", a.bgColor || La), a = a.nextRow
                } else a.useHover && a.items.background.attr("fill", a.bgColor)
        },
        drawAxes: function() {
            if (this.options.dataTable) {
                Pa["renderer.cartesian"].drawAxes.call(this, arguments);
                var b = this.options,
                    a = b.chart,
                    e = this.paper,
                    c = this.layers,
                    q = c.layerBelowDataset,
                    k = c.layerAboveDataset,
                    m = c.gridLayer,
                    y = c.dataset,
                    f = b.dataTable,
                    g = b.categories,
                    f = f && f.processHeader,
                    v = this.canvasTop,
                    y = this.canvasLeft,
                    m = a.gridBorderThickness,
                    p = Da(a.ganttStartX, a.totalGridWidth) + m,
                    s = f.dimension,
                    C = s.h,
                    s = a.processHeight - s.h,
                    l = d(g.startX, a.ganttStartX),
                    g = g.visibleW,
                    a = .5 * a.ganttLineThickness,
                    m = .5 * m,
                    m = c.gridLayer = c.gridLayer || e.group("grid", q).attr({
                        "clip-rect": [y, v + C + m, p, s - m]
                    });
                c.gridHeaderLayer = c.gridHeaderLayer || e.group("grid-header", q).attr({
                    "clip-rect": [y, v, p, C + s]
                });
                q = c.gridTracker = c.gridTracker || e.group("grid-tracker", q).attr({
                    "clip-rect": [y,
                        v, p, C + s
                    ]
                });
                m.data("vOffset", 0);
                m.data("hOffset", 0);
                q.data("vOffset", 0);
                q.data("hOffset", 0);
                c.ganttHeaderLayer = c.ganttHeaderLayer || e.group("gantt", k).attr({
                    "clip-rect": [l, v, g + (b.verticalScroll.enabled ? b.scrollOptions.height : 0), this.chartHeight]
                });
                b = c.ganttTracker = e.group("gantt-hot", c.tracker).attr({
                    "clip-rect": [l, v + C - a, g, s + a]
                });
                ia.svg ? (y = c.dataset.attr({
                    "clip-rect": [l, v + C - a, g, s + a]
                }), c = c.datalabels.attr({
                    "clip-rect": [l, v + C - a - 10, g, s + a + 10]
                })) : y = c.dataset = c = c.datalabels = b = c.ganttTracker;
                y.data("vOffset",
                    0);
                y.data("hOffset", 0);
                c.data("vOffset", 0);
                c.data("hOffset", 0);
                b.data("vOffset", 0);
                for (b.data("hOffset", 0); f;) this.drawProcess(f), f = f.nextRow;
                this.drawCategories()
            }
        },
        drawPlotGantt: function(b) {
            var a = this,
                H = a.options,
                c = H.chart,
                q = a.paper,
                k = a.layers,
                m = b.data,
                y = b.items,
                f = m.length,
                g = k.dataset,
                v = k.datalabels,
                p = H.dataTable,
                s = p.processHeader,
                C = H.categories,
                l = C.axis,
                t = a.canvasTop,
                D = c.taskBarRoundRadius,
                f = H.plotOptions.series,
                n = isNaN(+f.animation) && f.animation.duration || 1E3 * f.animation,
                h = H.tasksMap || (H.tasksMap = {}),
                x = H.milestone,
                w = H.trendlines,
                O = s.dimension.h,
                J = c.taskDatePadding,
                F, ea, L, M, N, B, Z, G, $, K, u, r, W, aa, ca, V, fa, A, R, ba, E;
            b.graphics = [];
            ca = g.shadows || (g.shadows = q.group("shadows", g));
            f = w && w.length;
            for (b = 0; b < f; b += 1) u = w[b], u.end || (u.end = u.start), u.end && (R = l.getPixel(u.start), V = l.getPixel(u.end), ba = u.thickness, H = u.items || (u.items = {}), F = void 0, u.isTrendZone ? (K = ["M", R + .5 * (V - R), t + O, "v", t + s.totalPH], ba = V - R) : (K = ["M", R, t + O, "L", V, t + O + s.totalPH], F = u.dashedStyle), H.trendLine = q.path(K, g).attr({
                stroke: u.color,
                "stroke-width": ba,
                "stroke-dasharray": F
            }), Sa(u.displayValue) && "" !== u.displayValue && (H.label = q.text(k.ganttHeaderLayer).attr({
                text: u.displayValue,
                direction: c.textDirection,
                x: K[1],
                y: 0
            }).css(u.style), F = H.label._getBBox().height, u = t + c.processHeight + (!C.scroll.enabled || c.marginBottom < F ? .5 * F : -(.5 * F) - 5), H.label.attr("y", u)));
            v.hide();
            k = function() {
                v.show()
            };
            w = s = function(b) {
                Y.call(this, a, b)
            };
            C = function(b) {
                Y.call(this, a, b, "DataPlotRollOver")
            };
            t = function(b) {
                Y.call(this, a, b, "DataPlotRollOut")
            };
            O = function(b) {
                b && b.click(function(b) {
                    Y.call(this,
                        a, b)
                }).hover(function(b) {
                    var c = this.data("dataObj");
                    Y.call(this, a, b, "DataPlotRollOver");
                    c.showHoverEffect && a.taskHoverHandler.call(this, a)
                }, function(b) {
                    var c = this.data("dataObj");
                    Y.call(this, a, b, "DataPlotRollOut");
                    c.showHoverEffect && a.taskHoverOutHandler.call(this, a)
                }).data("dataObj", A).data("eventArgs", ea)
            };
            f = m.length;
            for (b = 0; b < f; b += 1) A = m[b], H = A.processId, u = p[H], V = fa = A.color, H = A.items || (A.items = {}), K = A.animation ? n || 1E3 : 0, u && (E = A.borderThickness, R = va(l.getPixel(A.start)), ba = ac(M = l.getPixel(A.end) -
                R), R && ba && (L = u.dimension.h, u = u.yPos - L, F = L * (/%/g.test(A.height) && .01 * Gb(A.height, 10)) || d(A.height, L), r = L * (/%/g.test(A.topPadding) && .01 * Gb(A.topPadding, 10)) || d(A.topPadding, L), u += Da(r, L - F), aa = .5 * F, W = A.toolText, r = A.link, (L = y[b]) || (L = y[b] = {
                    index: b,
                    dataLabel: null,
                    start: A.start,
                    end: A.end,
                    startLabel: null,
                    endLabel: null,
                    tracker: null
                }), A.index = b, N = e(A.id, b), "" !== N && h[N] && (h[N].items = L, h[N].x = R, h[N].y = u, h[N].h = F, h[N].w = ba), M = N = B = Z = G = $ = null, A.showAsGroup ? (K ? (M = q.path(["M", R, u], g), M.animate({
                    path: ["M", R, u, "v",
                        F, "L", R + aa, u + aa, "H", R + ba - aa, "L", R + ba, u + F, "v", -F, "H", R
                    ]
                }, K, "normal", k)) : (M = q.path(["M", R, u, "v", F, "L", R + aa, u + aa, "H", R + ba - aa, "L", R + ba, u + F, "v", -F, "H", R], g), k && k()), M.attr({
                    fill: V,
                    stroke: A.borderColor,
                    cursor: r ? "pointer" : "",
                    ishot: !0,
                    "stroke-width": A.borderThickness
                }).tooltip(W).shadow(c.shadow && A.shadow, ca)) : (-1 !== A.percentComplete && (M = ba * A.percentComplete * .01, V = La, N = H.taskFill = q.rect(R, u, 0, F, 0, g).attr({
                    fill: fa,
                    cursor: r ? "pointer" : "",
                    ishot: !0,
                    "stroke-width": 0,
                    width: K ? 0 : M || 1
                }).tooltip(W), K && N.animate({
                    width: M ||
                        1
                }, K, "normal"), B = q.rect(R, u, 0, F, 0, g).attr({
                    fill: A.slackColor,
                    cursor: r ? "pointer" : "",
                    ishot: !0,
                    "stroke-width": 0,
                    x: K ? R : R + M || 1,
                    width: K ? 0 : ba - M || 1
                }).tooltip(W), K && B.animate({
                    x: R + M || 1,
                    width: ba - M || 1
                }, K, "normal")), H = ia.crispBound(R, u, ba, F, E), M = q.rect(H.x, H.y, 0, H.height, D, g).attr({
                    fill: V,
                    stroke: A.borderColor,
                    cursor: r ? "pointer" : "",
                    ishot: !0,
                    "stroke-width": A.borderThickness,
                    width: K ? 0 : H.width || 1
                }).tooltip(W).shadow(c.shadow && A.shadow, ca), K ? M.animate({
                    width: H.width || 1
                }, K, "normal", k) : k && k()), Sa(A.label) && "" !== A.label &&
                (H = A.labelAlign, Z = q.text().attr({
                    text: A.label,
                    x: R + ba * gb[H] + Ua[H],
                    "text-anchor": Ta[H],
                    direction: c.textDirection,
                    cursor: r ? "pointer" : "",
                    ishot: !0,
                    y: u - .5 * Ra(A.style.lineHeight, 10) - c.taskLabelPadding
                }).css(A.style), v.appendChild(Z)), Sa(A.startDate) && "" !== A.startDate && (G = q.text().attr({
                    text: A.startDate,
                    x: R - 2 - J,
                    y: u + .5 * F,
                    cursor: r ? "pointer" : "",
                    ishot: !0,
                    direction: c.textDirection,
                    "text-anchor": "end"
                }).css(A.style), v.appendChild(G)), Sa(A.endDate) && "" !== A.endDate && ($ = q.text().attr({
                    text: A.endDate,
                    x: R + ba + 2 + J,
                    y: u +
                        .5 * F,
                    cursor: r ? "pointer" : "",
                    ishot: !0,
                    direction: c.textDirection,
                    "text-anchor": "start"
                }).css(A.style), v.appendChild($)), L.graphic = M, L.percentCompleteGraphic = N, L.slackGraphic = B, L.dataLabel = Z, L.startLabel = G, L.endLabel = $, ea = {
                    processId: A.processId,
                    taskId: A.id,
                    start: A._start,
                    end: A._end,
                    showAsGroup: A.showAsGroup,
                    link: A.link,
                    sourceType: "task",
                    percentComplete: -1 !== A.percentComplete && A.percentComplete
                }, N && N.click(s).hover(C, t).data("eventArgs", ea), B && B.click(w).data("eventArgs", ea), Qa([M, Z, G, $], O)));
            p = function(b) {
                Y.call(this,
                    a, b, "MilestoneClick")
            };
            D = function(b) {
                var c = this.data("dataObj");
                Y.call(this, a, b, "MilestoneRollOver");
                c.showHoverEffect && c.items.graphic.attr({
                    fill: c.hoverFillColor,
                    stroke: c.hoverBorderColor,
                    "fill-opacity": c.hoverFillAlpha,
                    "stroke-opacity": c.hoverBorderAlpha
                })
            };
            J = function(b) {
                var c = this.data("dataObj");
                Y.call(this, a, b, "MilestoneRollOut");
                c.showHoverEffect && c.items.graphic.attr({
                    fill: c.fillColor,
                    stroke: c.borderColor,
                    "fill-opacity": c.fillAlpha,
                    "stroke-opacity": c.borderAlpha
                })
            };
            this.drawConnectors();
            H =
                null;
            f = x && x.length;
            for (b = 0; b < f; b += 1) m = x[b], u = h[m.taskId], H = m.items || (m.items = {}), u && (y = ia.animation({
                "fill-opacity": m.fillAlpha,
                "stroke-opacity": m.borderAlpha
            }, n, "normal"), ea = {
                sides: m.sides,
                date: m.origDate,
                radius: m.radius,
                taskId: m.taskId,
                toolText: m.toolText,
                link: m.link,
                numSides: m.numSides
            }, H.graphic = q.polypath(m.numSides, l.getPixel(m.date.ms), u.y + .5 * u.h, d(m.radius, .6 * u.h), m.startAngle, m.depth, g).attr({
                fill: m.fillColor,
                "fill-opacity": n ? 0 : m.fillAlpha,
                stroke: m.borderColor,
                "stroke-opacity": n ? 0 : m.borderAlpha,
                groupId: "gId" + b,
                ishot: !0,
                cursor: m.link ? "pointer" : "",
                "stroke-width": m.borderThickness
            }).tooltip(m.toolText).click(p).data("eventArgs", ea).data("dataObj", m), H.label = q.text().attr({
                text: m.displayValue,
                x: l.getPixel(m.date.ms),
                y: u.y + .5 * u.h,
                groupId: "gId" + b,
                cursor: m.link ? "pointer" : "",
                ishot: !0,
                direction: c.textDirection,
                "text-anchor": "middle"
            }).css(m.style).tooltip(m.toolText).click(p).data("eventArgs", ea).data("dataObj", m), v.appendChild(H.label), n && H.graphic.animate(y.delay(n)), H.graphic.hover(D, J), H.label.hover(D,
                J))
        },
        taskHoverOutHandler: function(b) {
            var a = b.options.tasksMap;
            b = this.data("dataObj");
            var a = a[e(b.id, b.index)].items,
                d = {
                    fill: b.color,
                    stroke: b.borderColor,
                    "stroke-width": b.borderThickness,
                    "stroke-dasharray": b.dashedStyle
                }; - 1 === b.percentComplete || b.showAsGroup || (a.slackGraphic.attr({
                fill: b.slackColor
            }), a.percentCompleteGraphic.attr({
                fill: b.color
            }), delete d.fill);
            a.graphic.attr(d)
        },
        taskHoverHandler: function(b) {
            var a = b.options.tasksMap;
            b = this.data("dataObj");
            var a = a[e(b.id, b.index)].items,
                d = {
                    fill: b.hoverFillColor,
                    stroke: b.hoverBorderColor
                }; - 1 === b.percentComplete || b.showAsGroup || (a.slackGraphic.attr({
                fill: b.slackHoverColor
            }), a.percentCompleteGraphic.attr({
                fill: b.hoverFillColor
            }), delete d.fill);
            a.graphic.attr(d)
        },
        drawConnectors: function() {
            var b = this,
                a = b.paper,
                d = b.options,
                c = d.chart.connectorExtension,
                e = d.connectors,
                k = d.tasksMap,
                m = e.length,
                y = b.layers.dataset,
                f = [],
                d = d.plotOptions.series,
                d = isNaN(+d.animation) && d.animation.duration || 1E3 * d.animation,
                g, v, p, s, C, l, t, D, n, h, x, w, J, T, F;
            J = function(a) {
                Y.call(this, b, a, "ConnectorClick")
            };
            T = function(a) {
                var c = this.data("dataObj"),
                    d = k[c.fromTaskId],
                    e = k[c.toTaskId],
                    f = {
                        stroke: c.hoverColor,
                        "stroke-dasharray": c.dashedStyle,
                        "stroke-width": c.hoverThickness
                    };
                Y.call(this, b, a, "ConnectorRollOver");
                c.showHoverEffect && (Qa([d, e], function(a) {
                    var b = {
                        fill: a.dataObj.hoverFillColor,
                        stroke: a.dataObj.hoverBorderColor
                    }; - 1 === a.dataObj.percentComplete || a.dataObj.showAsGroup || (a.items.slackGraphic.attr({
                            fill: a.dataObj.slackHoverColor
                        }), a.items.percentCompleteGraphic.attr({
                            fill: a.dataObj.hoverFillColor,
                            stroke: a.dataObj.hoverBorderColor
                        }),
                        delete b.fill);
                    a.items.graphic.attr(b)
                }), c.items.connector.attr(f))
            };
            F = function(a) {
                var c = this.data("dataObj"),
                    d = k[c.fromTaskId],
                    e = k[c.toTaskId],
                    f = {
                        stroke: c.color,
                        "stroke-width": c.thickness,
                        "stroke-dasharray": c.dashedStyle
                    };
                Y.call(this, b, a, "ConnectorRollOut");
                c.showHoverEffect && (Qa([d, e], function(a) {
                    var b = {
                        fill: a.dataObj.color,
                        stroke: a.dataObj.borderColor,
                        "stroke-width": a.dataObj.borderThickness,
                        "stroke-dasharray": a.dataObj.dashedStyle
                    }; - 1 === a.dataObj.percentComplete || a.dataObj.showAsGroup || (a.items.slackGraphic.attr({
                            fill: a.dataObj.slackColor
                        }),
                        a.items.percentCompleteGraphic.attr({
                            fill: a.dataObj.color
                        }), delete b.fill);
                    a.items.graphic.attr(b)
                }), c.items.connector.attr(f))
            };
            for (g = 0; g <= m; g += 1)
                if (p = e[g] || {}, l = p.fromTaskId, s = p.toTaskId, v = k[l], n = k[s], s = p.items || (p.items = {}), v && n) {
                    h = v.y + .5 * v.h;
                    x = n.y + .5 * n.h;
                    C = h == x;
                    l = v.x;
                    t = v.x + v.w;
                    D = n.x;
                    n = n.x + n.w;
                    w = w = 0;
                    0 === p.fromTaskConnectStart && 1 === p.toTaskConnectStart && (w = 1);
                    0 === p.fromTaskConnectStart && 0 === p.toTaskConnectStart && (w = 2);
                    1 === p.fromTaskConnectStart && 1 === p.toTaskConnectStart && (w = 3);
                    1 === p.fromTaskConnectStart &&
                        0 === p.toTaskConnectStart && (w = 4);
                    if (C) switch (v = v.height, w) {
                        case 1:
                            w = (D - t) / 10;
                            f = ["M", t, h, t + w, h, "L", t + w, h, t + w, h - v, "L", t + w, h - v, D - w, h - v, "L", D - w, h - v, D - w, h, "L", D - w, h, D, x, "L", n + c, x, n, x];
                            break;
                        case 2:
                            f = ["M", t, h, t + c, h, "L", t + c, h, t + c, h - v, "L", t + c, h - v, n + c, h - v, "L", n + c, x - v, n + c, x];
                            break;
                        case 3:
                            f = ["M", l, h, l - c, h, "L", l - c, h, l - c, h - v, "L", l - c, h - v, D - c, h - v, "L", D - c, h - v, D - c, h, "L", D - c, h, D, h];
                            break;
                        case 4:
                            f = ["M", l, h, l - c, h, "L", l - c, h, l - c, h - v, "L", l - c, h - v, n + c, h - v, "L", n + c, h - v, n + c, h, "L", n + c, h, n, h]
                    } else switch (w) {
                        case 1:
                            f = ["M", t, h, t +
                                (D - t) / 2, h, "L", t + (D - t) / 2, h, t + (D - t) / 2, x, "L", t + (D - t) / 2, x, D, x
                            ];
                            f = t <= D ? ["M", t, h, t + (D - t) / 2, h, "L", t + (D - t) / 2, h, t + (D - t) / 2, x, "L", t + (D - t) / 2, x, D, x] : ["M", t, h, t + c, h, "L", t + c, h, t + c, h + (x - h) / 2, "L", t + c, h + (x - h) / 2, D - c, h + (x - h) / 2, "L", D - c, h + (x - h) / 2, D - c, x, "L", D - c, x, D, x];
                            break;
                        case 2:
                            w = 0 > n - t ? 0 : n - t;
                            f = ["M", t, h, t + c + w, h, "L", t + c + w, h, t + c + w, x, "L", t + c + w, x, n, x];
                            break;
                        case 3:
                            w = 0 > l - D ? 0 : l - D;
                            f = ["M", l, h, l - c - w, h, "L", l - c - w, h, l - c - w, x, "L", l - c - w, x, D, x];
                            break;
                        case 4:
                            f = l > n ? ["M", l, h, l - (l - n) / 2, h, "L", l - (l - n) / 2, h, l - (l - n) / 2, x, "L", l - (l - n) / 2, x, n, x] : ["M", l, h, l - c, h, "L", l - c, h, l - c, h + (x - h) / 2, "L", l - c, h + (x - h) / 2, n + c, h + (x - h) / 2, "L", n + c, h + (x - h) / 2, n + c, x, "L", n + c, x, n, x]
                    }
                    s.connector ? s.connector.animate({
                        path: f
                    }) : (l = ia.animation({
                        "stroke-opacity": p.alpha
                    }, d, "normal"), s.connector = a.path(f, y).attr({
                        stroke: p.color,
                        "stroke-opacity": 0,
                        "stroke-width": p.thickness,
                        "stroke-dasharray": p.dashedStyle
                    }).animate(l.delay(d)));
                    l = {
                        fromTaskId: p.fromTaskId,
                        toTaskId: p.toTaskId,
                        fromTaskConnectStart: p.fromTaskConnectStart,
                        toTaskConnectStart: p.toTaskConnectStart,
                        link: p.link,
                        sourceType: "connector"
                    };
                    s.tracker = a.path(f, y).attr({
                        stroke: La,
                        "stroke-width": fa(p.thickness, 10),
                        ishot: !0,
                        cursor: p.link ? "pointer" : ""
                    }).data("dataObj", p).data("eventArgs", l).click(J);
                    s.tracker.hover(T, F)
                }
        }
    }, Pa["renderer.cartesian"])
}]);