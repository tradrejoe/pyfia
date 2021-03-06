/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.7.0
*/
FusionCharts.register("module", ["private", "modules.renderer.js-gradientlegend", function() {
    function gb(g, h, ra) {
        var na = g[0],
            E = g[1];
        g = g[2];
        na += (h[0] - na) * ra;
        E += (h[1] - E) * ra;
        h = g + (h[2] - g) * ra;
        return {
            hex: (B + (na << 16 | E << 8 | h).toString(16)).slice(-6),
            rgb: [na, E, h]
        }
    }

    function jb(g, h) {
        return g.maxvalue - h.maxvalue
    }

    function sb(h) {
        var B, ra, na = h.colorRange || {},
            E = h.dataMin,
            s = h.dataMax,
            S = h.sortLegend || !1,
            v = h.mapByCategory || !1,
            z = h.defaultColor,
            ka = h.numberFormatter,
            C = na.color;
        h = this.colorArr = [];
        var I, X, ma;
        this.mapByCategory =
            v;
        "1" === na.mapbypercent && (this.mapbypercent = !0);
        if ("1" === na.gradient && !v) {
            this.gradient = !0;
            ra = Nb(Ma(na.startcolor, na.mincolor, na.code));
            S = Lb(Nb(Ma(ra, z, "CCCCCC")));
            v = this.scaleMin = Ra(na.startvalue, na.minvalue, this.mapbypercent ? 0 : E);
            h.push({
                code: ra,
                maxvalue: v,
                label: M(na.startlabel),
                codeRGB: Lb(ra)
            });
            if (C && (B = C.length))
                for (E = 0; E < B; E += 1) z = C[E], ra = Nb(Ma(z.color, z.code)), X = Ra(z.value, z.maxvalue), ma = Ra(z.minvalue), X > v && h.push({
                    code: ra,
                    maxvalue: X,
                    userminvalue: ma,
                    label: M(Ma(z.label, z.displayvalue)),
                    codeRGB: Lb(ra)
                });
            h.sort(jb);
            B = h.length;
            for (E = 1; E < B; E += 1) z = h[E], ra = z.maxvalue - v, 0 < ra ? (z.minvalue = v, z.range = ra, v = z.maxvalue) : (h.splice(E, 1), --E, --B);
            2 <= h.length && (this.scaleMax = v, h[E - 1].label = Ma(na.endlabel, h[E - 1].label, h[E - 1].displayvalue));
            1 === h.length && (X = Ra(na.maxvalue, this.mapbypercent ? 100 : s), h.push({
                minvalue: v,
                maxvalue: X,
                range: X - v,
                label: na.endlabel
            }), this.scaleMax = X, delete h[0].code);
            na = h[0];
            s = h[h.length - 1];
            na.code && s.code || (ra = g(S), B = D((ra[2] = 0, ra)), ra = D((ra[2] = 100, ra)), na.code || (na.codeRGB = B, na.code = ca(B)),
                s.code || (s.codeRGB = ra, s.code = ca(ra)));
            B = h.length;
            for (E = 1; E < B; E += 1)
                if (z = h[E], z.code) {
                    if (I)
                        for (s = z, ma = na.maxvalue, C = s.maxvalue - ma; I < E; I += 1) S = h[I], ra = gb(na.codeRGB, s.codeRGB, (S.maxvalue - ma) / C), S.code = ra.hex, S.codeRGB = ra.rgb;
                    I = null;
                    na = z
                } else I = I || E;
            if (void 0 === this.scaleMin || void 0 === this.scaleMax) this.noValidRange = !0
        } else if (C && (B = C.length)) {
            for (E = 0; E < B; E += 1) z = C[E], ra = Ma(z.color, z.code), X = Ra(z.maxvalue), ma = Ra(z.minvalue), I = Ma(z.label, z.displayvalue, v ? ea : ka.dataLabels(ma) + " - " + ka.dataLabels(X)), (ra &&
                X > ma || v && I) && h.push({
                code: ra,
                maxvalue: X,
                minvalue: ma,
                label: M(I),
                labelId: I.toLowerCase()
            });
            h.length ? S && h.sort(jb) : this.noValidRange = !0
        }
    }

    function C(g, h) {
        return h ? Q(100 * g) / 100 + "%" : eb(g, ea).toString()
    }
    var s = this,
        ha = s.hcLib,
        Ya = s.window,
        Ya = /msie/i.test(Ya.navigator.userAgent) && !Ya.opera,
        Ra = ha.pluckNumber,
        B = ha.COLOR_BLACK,
        Yb = ha.COLOR_GLASS,
        bb = ha.FC_CONFIG_STRING,
        h = ha.graphics,
        D = h.HSBtoRGB,
        g = h.RGBtoHSB,
        ca = h.RGBtoHex,
        Lb = h.HEXtoRGB,
        z = ha.COMMASTRING,
        ea = ha.BLANKSTRING,
        M = ha.parseUnsafeString,
        Fa = ha.graphics.convertColor,
        ka = ha.POSITION_TOP,
        nb = ha.POSITION_MIDDLE,
        Wa = ha.POSITION_START,
        yb = ha.POSITION_END,
        Zb = ha.graphics.getDarkColor,
        ob = ha.graphics.getLightColor,
        Ma = ha.pluck,
        eb = ha.getValidValue,
        mb = ha.toRaphaelColor,
        pb = ha.hasTouch,
        Q = Math.round,
        Na = Math.max,
        X = Math.min,
        ua = Math.abs,
        Ja, Gb, zb, $b = "rgba(192,192,192," + (Ya ? .002 : 1E-6) + ")",
        Nb = function(g) {
            return g && g.replace(/^#?([a-f0-9]+)/ig, "$1")
        };
    sb.prototype = {
        getColorObj: function(g) {
            var h = this.colorArr,
                B = this.gradient ? 1 : 0,
                s = h[B],
                E;
            if (this.mapByCategory) {
                for (g = M(g).toLowerCase(); s;) {
                    if (s.labelId ===
                        g) return {
                        code: s.code,
                        seriesIndex: B
                    };
                    B += 1;
                    s = h[B]
                }
                return {
                    outOfRange: !0
                }
            }
            if (this.gradient) {
                if (this.scaleMin <= g && this.scaleMax >= g) {
                    for (; s && s.maxvalue < g;) B += 1, s = h[B];
                    g = (g - s.minvalue) / s.range;
                    return {
                        code: gb(h[B - 1].codeRGB, s.codeRGB, g).hex
                    }
                }
                return {
                    outOfRange: !0
                }
            }
            for (; s;) {
                if (s.maxvalue > g && s.minvalue <= g) return {
                    code: s.code,
                    seriesIndex: B
                };
                s.maxvalue === g && (E = B);
                B += 1;
                s = h[B]
            }
            return (s = h[E]) && s.maxvalue === g ? {
                code: s.code,
                seriesIndex: E
            } : {
                outOfRange: !0
            }
        }
    };
    sb.prototype.constructor = sb;
    ha.colorRange = sb;
    Ja = ha.configureGradientLegendOptions =
        function(g, h) {
            var s = g.legend,
                z = h.chart;
            s.legendSliderBorderWidth = Ra(z.legendpointerborderthickness, 1);
            s.legendSliderBorderColor = Fa(Ma(z.legendpointerbordercolor, B), Ra(z.legendpointerborderalpha, 100));
            s.legendSliderWidth = Ra(z.legendpointerwidth, z.legendpointerswidth, 12);
            s.legendSliderHeight = Ra(z.legendpointerheight, z.legendpointersheight, 12);
            s.legendColorBoxBorderColor = s.borderColor;
            s.legendColorBoxBorderWidth = s.borderWidth;
            s.legendScaleColor = Fa(Ma(z.legendscalelinecolor, B), Ra(z.legendscalelinealpha,
                100));
            s.legendScalePadding = Ra(z.legendscalepadding, 4);
            s.legendScaleLineThickness = Ra(z.legendscalelinethickness, 1);
            s.legendScaleTickDistance = Ra(z.legendscaletickdistance, 6);
            s.itemStyle.cursor = "default";
            s.interActivity = Ra(z.interactivelegend, 1)
        };
    ha.placeGLegendBlockRight = function(g, h, B, s, E) {
        this.configureLegendOptions(g, h.chart, !0, E, B);
        Ja(g, h);
        E = this.snapLiterals || (this.snapLiterals = {});
        var z = g[bb],
            S = this.smartLabel || z.smartLabel,
            v = g.legend,
            ka = g.chart.spacingRight,
            D, M, I = v.textPadding = 2,
            ua = 2 * I,
            ma = v.title.padding,
            ga = 0,
            Q = 0,
            ca = 2 * v.padding;
        h = Ra(h.chart.legendpadding, 7) + v.borderWidth / 2 + 1;
        var aa = g.colorRange || {},
            Ba = aa.colorArr,
            Fa = aa.mapbypercent,
            ha = aa.scaleMin,
            Ca = aa.scaleMax - ha,
            Ma = v.legendSliderWidth,
            Ka = v.legendSliderHeight / 2;
        M = v.legendScalePadding;
        var A = v.legendScaleTickDistance,
            V = v.itemStyle || {};
        D = Ra(parseInt(V.lineHeight, 10) || 12);
        var Ua = .75 * D,
            La = B - ca,
            Ga, va, Ha = 0,
            Pa, t, da, wa, Aa, Da, Oa;
        s -= ca;
        if (!aa.noValidRange && Ba && 1 < (va = Ba.length)) {
            --va;
            v.title.text !== ea && (S.setStyle(v.title.style), D = S.getSmartText(v.title.text,
                La, Na(D, s / 4)), v.title.text = D.text, ga = D.width + ca, s -= Q = D.height + ma);
            S.setStyle(V);
            D = S.lineHeight;
            La -= A + M + Ma;
            v.colorBoxX = Ma;
            ma = Na(D, La / 2);
            La = X(La - ma - 4, D);
            Pa = Na(D, s / 2);
            Ga = s / 4;
            A = Ba[0];
            A.scaleLabel = C(A.maxvalue, Fa);
            D = S.getSmartText(A.label, Ga, La);
            A.label = D.text;
            V = D.height;
            A.labelY = Ua - D.height / 2;
            M = S.getSmartText(A.scaleLabel, ma, Pa);
            A.scaleLabel = M.text;
            aa = M.height / 2;
            t = M.width;
            A.scaleLabelY = Ua - M.height / 2;
            v.colorBoxY = Na(aa, D.width + ua, Ka) + Q;
            A = Oa = Ba[va];
            A.scaleLabel = C(A.maxvalue, Fa);
            D = S.getSmartText(A.label,
                Ga, La);
            A.label = D.text;
            V = Na(V, D.height);
            A.labelY = Ua - D.height / 2;
            M = S.getSmartText(A.scaleLabel, ma, Pa);
            A.scaleLabel = M.text;
            t = Na(t, M.width);
            Ga = M.height / 2;
            D = Na(D.width + ua, Ga, Ka);
            A.scaleLabelY = Ua - M.height / 2;
            v.colorBoxHeight = Ka = s - v.colorBoxY - D;
            Pa = Ka - Ga;
            da = Ka / Ca;
            Aa = X(Ka - Ha, Pa - aa) - 4;
            for (Ga = 1; Ga < va; Ga += 1) A = Ba[Ga], wa = (A.maxvalue - ha) * da, D = S.getSmartText(A.label, 2 * X(wa - Ha, Ka - wa), La), A.label = D.text, V = Na(V, D.height), A.labelY = Ua - D.height / 2, D = D.width / 2, A.scaleLabel = C(A.maxvalue, Fa), M = S.getSmartText(A.scaleLabel, ma,
                2 * X(wa - aa, Pa - wa)), A.scaleLabel = M.text, t = Na(t, M.width), Da = M.height / 2, A.scaleLabelY = Ua - M.height / 2, Aa = X(Aa, (wa - Na(Da + aa, D + Ha) - 4) * Ca / A.range), Ha = D + wa, aa = Da + wa;
            Aa = Na(X(Aa, (X(Pa - aa, Ka - Ha) - 4) * Ca / Oa.range, .3 * s), 0);
            v.colorBoxHeight -= Aa;
            v.colorBoxWidth = V && V + ua || 15;
            v.height = v.totalHeight = s + Q + ca - Aa;
            v.width = (t && t + I) + v.colorBoxWidth + Ma + v.legendScaleTickDistance + v.legendScalePadding + ca;
            v.width < ga && (v.colorBoxX += (ga - v.width) / 2, v.width = ga);
            v.width > B && (v.width = B);
            E.legendstartx = z.width - ka - v.width;
            E.legendwidth = v.width;
            E.legendendx = E.legendstartx + E.legendwidth;
            E.legendheight = v.height;
            h += v.width;
            g.chart.marginRight += h;
            return h
        }
        v.enabled = !1;
        return 0
    };
    ha.placeGLegendBlockBottom = function(g, h, B, s, z) {
        this.configureLegendOptions(g, h.chart, !1, z, B);
        Ja(g, h);
        z = this.snapLiterals || (this.snapLiterals = {});
        var D = g[bb],
            S = this.smartLabel || D.smartLabel,
            v = g.legend,
            M = g.chart,
            ka = M.spacingBottom,
            ua = M.spacingLeft,
            M = M.spacingRight,
            I, Q, ma = v.textPadding = 2,
            ga = v.title.padding,
            ca = 0,
            Fa = 0,
            aa = 2 * v.padding;
        h = Ra(h.chart.legendpadding, 7) + v.borderWidth /
            2 + 1;
        var Ba = g.colorRange || {},
            ha = Ba.colorArr,
            Sa = Ba.mapbypercent,
            Ca = Ba.scaleMin,
            Wa = Ba.scaleMax - Ca,
            Ka = v.legendSliderWidth,
            A = v.legendSliderHeight,
            V = v.legendScalePadding,
            Ua = v.legendScaleTickDistance,
            La = v.itemStyle || {};
        I = Ra(parseInt(La.lineHeight, 10) || 12);
        var Ga = .75 * I,
            va = s - aa,
            Ha, Pa, t, da, wa = 0,
            Aa, Da, Oa;
        B -= aa;
        if (!Ba.noValidRange && ha && 1 < (Pa = ha.length)) {
            --Pa;
            v.title.text !== ea && (S.setStyle(v.title.style), I = S.getSmartText(v.title.text, B, va / 3), v.title.text = I.text, ca = I.width + aa, va -= Fa = I.height + ga);
            S.setStyle(La);
            I = S.lineHeight;
            va -= Ua + V + A;
            ga = Na(I, va / 2);
            La = X(va - ga - 4, I);
            Ha = B / 4;
            da = 2 * Ha;
            t = ha[0];
            t.scaleLabel = C(t.maxvalue, Sa);
            I = S.getSmartText(t.label, Ha, La);
            t.label = I.text;
            va = I.height;
            t.labelY = Ga - I.height / 2;
            Q = S.getSmartText(t.scaleLabel, da, ga);
            t.scaleLabel = Q.text;
            V = Q.width / 2;
            Ua = Q.height;
            t.code || (t.code = Ma(v.minColor, "CCCCCC"));
            v.colorBoxX = Na(V, I.width + ma, Ka);
            t = Ba = ha[Pa];
            t.scaleLabel = C(t.maxvalue, Sa);
            I = S.getSmartText(t.label, Ha, La);
            t.label = I.text;
            va = Na(va, I.height);
            t.labelY = Ga - I.height / 2;
            Q = S.getSmartText(t.scaleLabel,
                da, ga);
            t.scaleLabel = Q.text;
            Ua = Na(Ua, Q.height);
            t = Q.width / 2;
            I = Na(I.width + ma, t, Ka);
            v.colorBoxWidth = Ka = B - v.colorBoxX - I;
            da = Ka - t;
            Aa = Ka / Wa;
            Oa = X(Ka - wa, da - V) - 4;
            for (Ha = 1; Ha < Pa; Ha += 1) t = ha[Ha], Da = (t.maxvalue - Ca) * Aa, I = S.getSmartText(t.label, 2 * X(Da - wa, Ka - Da), La), t.label = I.text, va = Na(va, I.height), t.labelY = Ga - I.height / 2, I = I.width / 2, t.scaleLabel = C(t.maxvalue, Sa), Q = S.getSmartText(t.scaleLabel, 2 * X(Da - V, da - Da), ga), t.scaleLabel = Q.text, Ua = Na(Ua, Q.height), Q = Q.width / 2, Oa = X(Oa, (Da - Na(Q + V, I + wa) - 4) * Wa / t.range), wa = I + Da, V = Q +
                Da;
            Oa = Na(X(Oa, (X(da - V, Ka - wa) - 4) * Wa / Ba.range, .3 * B), 0);
            v.colorBoxWidth -= Oa;
            v.width = B + aa - Oa;
            v.width < ca && (v.colorBoxX += (ca - v.width) / 2, v.width = ca);
            v.colorBoxY = Fa + A;
            v.colorBoxHeight = va && va + 2 * ma || 15;
            v.height = v.totalHeight = (Ua && Ua + ma) + v.colorBoxHeight + Fa + A + v.legendScaleTickDistance + v.legendScalePadding + aa;
            v.height > s && (v.height = s);
            z.legendstartx = ua + .5 * (D.width - ua - M - v.width) + (v.x || 0);
            z.legendwidth = v.width;
            z.legendendx = z.legendstartx + z.legendwidth;
            z.legendstarty = D.height - ka - v.height;
            z.legendheight = v.height;
            z.legendendy = z.legendstarty + z.legendheight;
            h += v.height;
            g.chart.marginBottom += h;
            return h
        }
        v.enabled = !1;
        return 0
    };
    Gb = function() {
        return {
            point: this
        }
    };
    zb = function(g) {
        return Q(100 * g) / 100
    };
    ha.rendererRoot.drawGradientLegendItem = function(g) {
        var h = this,
            D = h.paper,
            M = h.options,
            E = h.canvasLeft,
            C = h.canvasTop,
            S = h.canvasWidth,
            v = h.canvasHeight,
            X = M.colorRange,
            ca = M.chart.textDirection,
            ha, I, Ja, ma, ga = M.legend,
            Ya = Ra(ga.padding, 4),
            eb = ga.itemStyle,
            M = ga.symbolStyle,
            aa = ga.interActivity,
            Ba = g.elements;
        g = Ba.elementGroup.trackTooltip(!0);
        var gb = "vertical" === ga.layout,
            Sa, Ca, bb, Ka, A, V, Ua = 0,
            La = ga.lighting3d,
            Ga = ga.colorBoxWidth,
            va = ga.colorBoxHeight,
            Ha = Ga,
            Pa = va,
            t = {
                FCcolor: {
                    color: ea,
                    alpha: ea,
                    angle: 0,
                    ratio: ea
                }
            },
            da = t.FCcolor,
            wa = ga.colorBoxX + Ya,
            Aa = ga.colorBoxY + Ya,
            Da, Oa, sb = ga.legendColorBoxBorderColor,
            ya = ga.legendColorBoxBorderWidth,
            jb = ["M"],
            Lb = ga.legendScaleColor;
        V = ga.legendScalePadding;
        var Ob = ga.legendScaleLineThickness,
            Ab = Ob % 2 / 2;
        I = ga.legendScaleTickDistance;
        var tb = ga.legendSliderWidth,
            Bb = ga.legendSliderHeight;
        A = Pa / 2;
        ma = Ha / 2;
        var ib = tb / 2,
            Za = Bb / 2,
            Cb, $a, Db;
        Oa = 0;
        var Eb = ob("ABABAB", 50),
            Ya = Zb("ABABAB", 70),
            ga = Fa("ABABAB", 100),
            Ya = Fa(Ya, 100),
            Eb = Fa(Eb, 100),
            Fb, Ea = {
                isFirst: !0
            },
            sa = {},
            cb, qb, b, d;
        if (X && (ha = X.colorArr) && 1 < (Ja = ha.length)) {
            Ea.toolText = cb = bb = X.scaleMin;
            sa.toolText = qb = X = X.scaleMax;
            Ka = X - bb;
            Ea.snapPX = sa.snapPX = 0;
            Ea.tooltipConstraint = sa.tooltipConstraint = "chart";
            Ea.getLabelConfig = sa.getLabelConfig = Gb;
            Ea.tooltipPos = [0, 0];
            sa.tooltipPos = [0, 0];
            sa.tooltipOffsetReference = Ea.tooltipOffsetReference = {};
            sa.tooltipOffsetReference.left = Ea.tooltipOffsetReference.left +=
                E - 20;
            sa.tooltipOffsetReference.top = Ea.tooltipOffsetReference.top += C;
            b = Ba.colorBox = D.group("colorBox", g);
            if (gb) {
                Ea.tooltipPos[0] = sa.tooltipPos[0] = S + E;
                Oa = 270;
                da.angle = 90;
                E = wa - tb;
                S = wa + Ha;
                C = Aa - Za;
                Sa = Aa + Za;
                E = Q(wa - tb) + .5;
                S = Q(wa) + .5;
                C = Q(Aa - Za) + .5;
                Sa = Q(Aa + Za) + .5;
                Cb = Q(wa + Ha) + .5;
                Db = Q(Aa - 2) + .5;
                Ca = Q(Aa + 2) + .5;
                Da = Q(Aa) + .5;
                v = wa - ib / 2;
                $a = Q(v - Za) + .5;
                v = Q(v) + .5;
                A = Aa - Za / 2;
                Za = Q(A + Za) + .5;
                A = Q(A) + .5;
                Ga /= 2;
                ib = ["M", E, C, "L", S, C, S, Db, Cb, Da, S, Ca, S, Sa, E, Sa, "Z", "M", $a, A, "L", v, A, "M", $a, Da, "L", v, Da, "M", $a, Za, "L", v, Za];
                Za = ["M", E + 1,
                    C, "L", E + 1, Sa, "M", $a, A - 1, "L", v, A - 1, "M", $a, Da - 1, "L", v, Da - 1, "M", $a, Za - 1, "L", v, Za - 1
                ];
                A = wa + Ha + V;
                Sa = Q(A + I) + Ab;
                A = Q(A) + Ab;
                Da = wa + ma;
                $a = Ja - 1;
                for (I = 0; I < Ja; I += 1) ma = ha[I], S = (ma.maxvalue - bb) / Ka, Ca = Pa * S + Aa, V = Q(Ca) + Ab, I ? (da.ratio += z, da.color += z, da.alpha += z, jb.push("L", A, V, Sa, V, "M", A, V), I === $a ? (v = yb, V = Ca + 2) : (v = nb, V = Ca)) : (jb.push(A, V, "L", Sa, V, "M", A, V), v = Wa, V = Ca - 2), da.ratio += 100 * (S - Ua), da.color += Ma(ma.code, B), da.alpha += Ma(ma.alpha, 100), Ua = S, ma.legendItem = D.text(g).attr({
                    text: ma.label,
                    x: Da,
                    y: V,
                    "text-anchor": v,
                    direction: ca,
                    "vertical-align": nb
                }).rotate(Oa, Da, V).css(eb), ma.legendSymbol = D.text(g).attr({
                    text: ma.scaleLabel,
                    x: Sa,
                    y: Ca,
                    "text-anchor": Wa,
                    direction: ca,
                    "vertical-align": nb
                }).css(eb);
                Ea.xMin = sa.xMin = 0;
                Ea.xMax = sa.xMax = 0;
                Ea.yMin = sa.yMin = 0;
                Ea.yMax = sa.yMax = Pa;
                Ea.x = sa.x = 0;
                Ea.y = 0;
                sa.y = Pa;
                ca = Bb + Ha;
                ha = tb
            } else {
                Ea.tooltipPos[1] = sa.tooltipPos[1] = v + C;
                E = Q(wa - ib) + .5;
                S = Q(wa + ib) + .5;
                C = Q(Aa - Bb) + .5;
                Sa = Q(Aa + Pa) + .5;
                Cb = Q(wa - 2) + .5;
                v = Q(wa + 2) + .5;
                $a = Q(wa) + .5;
                Db = Q(Aa) + .5;
                Ca = Aa - Za / 2;
                Da = Q(Ca - Za) + .5;
                Ca = Q(Ca) + .5;
                Oa = wa - ib / 2;
                ma = Q(Oa + ib) + .5;
                Oa = Q(Oa) +
                    .5;
                va /= 2;
                ib = ["M", E, C, "L", S, C, S, Db, v, Db, $a, Sa, Cb, Db, E, Db, "Z", "M", Oa, Da, "L", Oa, Ca, "M", $a, Da, "L", $a, Ca, "M", ma, Da, "L", ma, Ca];
                Za = ["M", E, C + 1, "L", S, C + 1, "M", Oa - 1, Da, "L", Oa - 1, Ca, "M", $a - 1, Da, "L", $a - 1, Ca, "M", ma - 1, Da, "L", ma - 1, Ca];
                V = Aa + Pa + V;
                Oa = Q(V + I) + Ab;
                V = Q(V) + Ab;
                Ca = Aa + A;
                $a = Ja - 1;
                for (I = 0; I < Ja; I += 1) ma = ha[I], S = (ma.maxvalue - bb) / Ka, Sa = Ha * S + wa, A = Q(Sa) + Ab, I ? (da.ratio += z, da.color += z, da.alpha += z, jb.push("L", A, V, A, Oa, "M", A, V), I === $a ? (v = Wa, A = Sa + 2) : (v = nb, A = Sa)) : (jb.push(A, V, "L", A, Oa, "M", A, V), v = yb, A = Sa - 2), da.ratio += 100 * (S -
                    Ua), da.color += Ma(ma.code, B), da.alpha += Ma(ma.alpha, 100), Ua = S, ma.legendItem = D.text(g).attr({
                    text: ma.label,
                    x: A,
                    y: Ca,
                    "text-anchor": v,
                    direction: ca,
                    "vertical-align": nb
                }).css(eb), ma.legendSymbol = D.text(g).attr({
                    text: ma.scaleLabel,
                    x: Sa,
                    y: Oa,
                    "text-anchor": nb,
                    direction: ca,
                    "vertical-align": ka
                }).css(eb);
                Ea.xMin = sa.xMin = 0;
                Ea.xMax = sa.xMax = Ha;
                Ea.yMin = sa.yMin = 0;
                Ea.yMax = sa.yMax = 0;
                Ea.y = sa.y = 0;
                Ea.x = 0;
                sa.x = Ha;
                ca = tb;
                ha = Bb + Pa
            }
            Ba.colorBox = D.rect(b).attr({
                x: wa,
                y: Aa,
                width: Ha,
                height: Pa,
                fill: mb(t),
                stroke: sb,
                strokeWidth: ya
            });
            La && (Ba.colorBoxEffect = D.rect(b).attr({
                x: wa,
                y: Aa,
                width: Ga,
                height: va,
                fill: Yb,
                "stroke-width": 0
            }));
            Ba.scale = D.path(g).attr({
                path: jb,
                stroke: Lb,
                "stroke-width": Ob
            });
            Fb = function(a, b, e, f, p) {
                var l;
                gb ? (l = b * Ka / Pa + bb, f = 0 < b ? f : f + b + .01) : (l = a * Ka / Ha + bb, e = 0 < a ? e : e + a + .01);
                a = zb(l);
                p ? (Ba.slider1.translate(e, f), Ba.slider1Effect.translate(e, f), Ba.slider1Tracker.toFront().translate(e, f).tooltip(a, null, null, !0), cb = l) : (Ba.slider2.translate(e, f), Ba.slider2Effect.translate(e, f), Ba.slider2Tracker.toFront().translate(e, f).tooltip(a,
                    null, null, !0), qb = l);
                aa && (d = clearTimeout(d), d = setTimeout(function() {
                    h.setScaleRange && h.setScaleRange(cb, qb)
                }, 100))
            };
            Ja = function(a, b) {
                var d = 0,
                    f = d,
                    p, l = this.isFirst,
                    g = l ? sa : Ea;
                if (gb) {
                    f = this._startY + b;
                    0 >= f && (f = 0);
                    f > Pa && (f = Pa);
                    if (l ? f > g.y : f < g.y) f = g.y;
                    ua(f - this.y) >= (this.snapPX || 0) && (p = !0)
                } else {
                    d = this._startX + a;
                    0 >= d && (d = 0);
                    d > Ha && (d = Ha);
                    if (l ? d > g.x : d < g.x) d = g.x;
                    ua(d - this.x) >= (this.snapPX || 0) && (p = !0)
                }
                p && (Fb(d, f, d - this.x, f - this.y, l), this.x = d, this.y = f)
            };
            La = function() {
                var a = this.isFirst;
                this._startX = this.x;
                this._startY =
                    this.y;
                this._scaleStart = cb;
                this._scaleEnd = qb;
                s.raiseEvent("LegendPointerDragStart", {
                    pointerIndex: a ? 0 : 1,
                    pointers: [{
                        value: cb
                    }, {
                        value: qb
                    }],
                    legendPointerHeight: Bb,
                    legendPointerWidth: tb
                }, h.logic.chartInstance)
            };
            Ga = function() {
                var a = this._scaleStart,
                    b = this._scaleEnd;
                s.raiseEvent("LegendPointerDragStop", {
                    pointerIndex: this.isFirst ? 0 : 1,
                    pointers: [{
                        value: cb
                    }, {
                        value: qb
                    }],
                    legendPointerHeight: Bb,
                    legendPointerWidth: tb
                }, h.logic.chartInstance);
                a === cb && b === qb || s.raiseEvent("LegendRangeUpdated", {
                    previousMinValue: a,
                    previousMaxValue: b,
                    minValue: cb,
                    maxValue: qb
                }, h.logic.chartInstance);
                delete this._scaleStart;
                delete this._scaleEnd
            };
            va = zb(bb);
            Ba.slider1 = D.path(g).attr({
                path: ib,
                fill: ga,
                strokeWidth: 1,
                stroke: Ya
            });
            Ba.slider1Effect = D.path(g).attr({
                path: Za,
                fill: "none",
                strokeWidth: 1,
                stroke: Eb
            });
            pb && (E -= .5 * (Na(30, ca) - ca), C -= .5 * (Na(40, ha) - ha), ca = Na(30, ca), ha = Na(40, ha));
            Ba.slider1Tracker = D.rect(g).attr({
                ishot: !0,
                width: ca,
                height: ha,
                x: E,
                y: C,
                fill: $b,
                stroke: "none"
            }).drag(Ja, La, Ga, Ea, Ea, Ea).tooltip(va, null, null, !0).css(M);
            va = zb(X);
            Ba.slider2 = D.path(g).attr({
                path: ib,
                fill: ga,
                strokeWidth: 1,
                stroke: Ya
            }).translate(sa.x, sa.y);
            Ba.slider2Effect = D.path(g).attr({
                path: Za,
                fill: "none",
                strokeWidth: 1,
                stroke: Eb
            }).translate(sa.x, sa.y);
            Ba.slider2Tracker = D.rect(g).attr({
                ishot: !0,
                width: ca,
                height: ha,
                x: E,
                y: C,
                fill: $b,
                stroke: "none"
            }).translate(sa.x, sa.y).css(M).drag(Ja, La, Ga, sa, sa, sa).tooltip(va, null, null, !0)
        }
    }
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-powercharts", function() {
        function gb(b, d, a) {
            var c = b.fcObj;
            C.hcLib.createChart(c, b.container, b.type, void 0, void 0, !1, !0);
            s.raiseEvent("chartUpdated", M({
                sourceEvent: a
            }, d), c, [c.id])
        }

        function jb(b, d, a, c, e, f) {
            var p = Qa.atan((d - c) / (b - a)),
                l = [];
            0 > p && (p = 2 * Qa.PI + p);
            if (c > d) {
                if (a >= b && p > Qa.PI || a < b && p > Qa.PI) p -= Qa.PI
            } else if (a >= b && p < Qa.PI && 0 !== p || a < b && p < Qa.PI) p += Qa.PI;
            "undefined" == typeof f ? (a = b + e * ra(p), e = d + e * ab(p)) : (e = S(e) / 2, f = S(f) / 2, a = b + (e = b < a ? e : -e),
                e = d + e * Qa.tan(p), S(d - e) > S(f) && (e = d + (f = d < c ? f : -f), a = b + f / Qa.tan(p)));
            l.push("L", a, e, a + 10 * ra(p + .79), e + 10 * ab(p + .79), "M", a + 10 * ra(p - .79), e + 10 * ab(p - .79), "L", a, e);
            return l
        }

        function sb(b, d) {
            var a;
            d._origAttr || (d._origAttr = {});
            for (a in b) $b.test(a) || (d._origAttr[a] = b[a]);
            return d._origAttr
        }
        var C = this,
            s = C.hcLib,
            ha = s.Raphael,
            Ya = C.window,
            Ra = Ya.document,
            B = s.BLANKSTRING,
            Yb = s.createTrendLine,
            bb = s.parseTooltext,
            h = s.pluck,
            D = s.getValidValue,
            g = s.pluckNumber,
            ca = s.getFirstValue,
            Lb = s.getDefinedColor,
            z = s.parseUnsafeString,
            ea = s.FC_CONFIG_STRING,
            M = s.extend2,
            Fa = s.getDashStyle,
            ka = s.toRaphaelColor,
            nb = s.toPrecision,
            Wa = s.hasSVG,
            yb = s.createContextMenu,
            Zb = s.isIE,
            ob = s.regex.dropHash,
            Ma = s.HASHSTRING,
            eb = function(b, d) {
                var a;
                b || (b = {});
                for (a in d) b[a] = d[a];
                return b
            },
            mb = s.each,
            pb = s.addEvent,
            Q = s.removeEvent,
            Na = s.getTouchEvent,
            X = function(b) {
                return void 0 !== b && null !== b
            },
            ua = "rgba(192,192,192," + (Zb ? .002 : 1E-6) + ")",
            Ja = s.TOUCH_THRESHOLD_PIXELS,
            Gb = s.CLICK_THRESHOLD_PIXELS,
            zb = 8 === Ya.document.documentMode ? "visible" : "",
            $b = /^_/,
            Nb = s.BGRATIOSTRING,
            Qa = Math,
            ab = Qa.sin,
            ra = Qa.cos,
            na = Qa.round,
            E = Qa.min,
            Xa = Qa.max,
            S = Qa.abs,
            v = Qa.PI,
            gc = Qa.ceil,
            Xb = Qa.floor,
            xc = Qa.sqrt,
            I = Qa.pow,
            rc = v / 180,
            ma = 2 * v,
            ga = s.hasTouch,
            ac = ga ? Ja : Gb,
            bc = s.graphics.getColumnColor,
            aa = s.getFirstColor,
            Ba = s.setLineHeight,
            Xc = s.pluckFontSize,
            Sa = s.pluckColor,
            Ca = s.getFirstAlpha,
            hc = s.graphics.getDarkColor,
            Ka = s.graphics.getLightColor,
            A = s.graphics.convertColor,
            V = s.COLOR_TRANSPARENT,
            Ua = s.POSITION_CENTER,
            La = s.POSITION_TOP,
            Ga = s.POSITION_BOTTOM,
            va = s.POSITION_RIGHT,
            Ha = s.POSITION_LEFT,
            Pa = s.bindSelectionEvent,
            t = s.chartAPI,
            da = s.graphics.mapSymbolName,
            Ja = t.singleseries,
            wa = s.COMMASTRING,
            Aa = s.ZEROSTRING,
            Da = s.HUNDREDSTRING,
            Oa = s.COMMASPACE,
            cc = s.getMouseCoordinate,
            ya = s.plotEventHandler,
            Yc = C.xssEncode,
            ic = s.SHAPE_RECT,
            Ob = s.deltend,
            Gb = s.graphics,
            Ab = Gb.parseColor,
            tb = Gb.getValidColor,
            Bb = s.placeHorizontalAxis,
            ib = s.placeVerticalAxis,
            Za = s.stepYAxisNames,
            Cb = s.adjustHorizontalCanvasMargin,
            $a = s.adjustVerticalCanvasMargin,
            Db = s.getDataParser,
            Eb = {
                pageX: 0,
                pageY: 0
            },
            Fb, Ea, sa, cb = function() {
                this.data("move", !1);
                clearTimeout(this._longpressactive);
                delete this._longpressactive
            },
            qb = s.createElement;
        s.eventList.chartupdated = "FC_ChartUpdated";
        s.eventList.dataposted = "FC_DataPosted";
        s.eventList.dataposterror = "FC_DataPostError";
        s.eventList.datarestored = "FC_DataRestored";
        C.addEventListener("rendered", function(b) {
            b = b.sender;
            var d = b.__state,
                a = b.jsVars && b.jsVars.instanceAPI;
            !d.listenersAdded && a && "function" === typeof a.getCollatedData && (b.addEventListener(["chartupdated", "dataupdated", "rendered"], function(a) {
                delete a.sender.__state.hasStaleData
            }), d.listenersAdded = !0)
        });
        t("spline", {
            friendlyName: "Spline Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "spline",
            rendererId: "spline"
        }, t.linebase);
        t("splinearea", {
            friendlyName: "Spline Area Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "areaspline",
            anchorAlpha: "100",
            rendererId: "spline"
        }, t.area2dbase);
        t("msspline", {
            friendlyName: "Multi-series Spline Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "spline",
            rendererId: "spline"
        }, t.mslinebase);
        t("mssplinedy", {
            friendlyName: "Multi-series Dual Y-Axis Spline Chart",
            standaloneInit: !0,
            creditLabel: !1,
            isDual: !0,
            series: t.mscombibase.series,
            secondarySeriesType: "spline",
            secondarySeriesFilter: {
                spline: !0
            },
            defaultSeriesFilter: {
                spline: !0
            }
        }, t.msspline);
        t("mssplinearea", {
            friendlyName: "Multi-series Spline Area Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "areaspline",
            rendererId: "spline"
        }, t.msareabase);
        t("msstepline", {
            friendlyName: "Multi-series Step Line Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "line",
            rendererId: "cartesian",
            stepLine: !0
        }, t.mslinebase);
        t("inversemsline", {
            friendlyName: "Inverted Y-Axis Multi-series Line Chart",
            standaloneInit: !0,
            creditLabel: !1,
            inversed: !0,
            rendererId: "cartesian"
        }, t.mslinebase);
        t("inversemsarea", {
            friendlyName: "Inverted Y-Axis Multi-series Area Chart",
            standaloneInit: !0,
            creditLabel: !1,
            inversed: !0,
            rendererId: "cartesian"
        }, t.msareabase);
        t("inversemscolumn2d", {
            friendlyName: "Inverted Y-Axis Multi-series Column Chart",
            standaloneInit: !0,
            creditLabel: !1,
            inversed: !0,
            rendererId: "cartesian"
        }, t.mscolumn2dbase);
        t("logmsline", {
            friendlyName: "Multi-series Log Line Chart",
            standaloneInit: !0,
            isValueAbs: !0,
            isLog: !0,
            configureAxis: t.logbase.configureAxis,
            pointValueWatcher: t.logbase.pointValueWatcher,
            getLogAxisLimits: t.logbase.getLogAxisLimits,
            creditLabel: !1,
            rendererId: "cartesian"
        }, t.mslinebase);
        t("logmscolumn2d", {
            friendlyName: "Multi-series Log Column Chart",
            standaloneInit: !0,
            isLog: !0,
            isValueAbs: !0,
            configureAxis: t.logbase.configureAxis,
            pointValueWatcher: t.logbase.pointValueWatcher,
            getLogAxisLimits: t.logbase.getLogAxisLimits,
            creditLabel: !1,
            rendererId: "cartesian"
        }, t.mscolumn2dbase);
        t("logstackedcolumn2d", {
            friendlyName: "Stacked Log Column Chart",
            standaloneInit: !0,
            creditLabel: !1,
            isStacked: !0
        }, t.logmscolumn2d);
        t("errorbar2d", {
            friendlyName: "Error Bar Chart",
            standaloneInit: !0,
            creditLabel: !1,
            showValues: 0,
            rendererId: "cartesian",
            isErrorChart: !0,
            fireGroupEvent: !0,
            chart: function() {
                var b = this.base.chart.apply(this, arguments),
                    d = this.drawErrorValue;
                b.callbacks || (b.callbacks = []);
                b.callbacks.push(function() {
                    for (var a = this.elements.plots, b = this.dataset || this.options.series, e = a && a.length; e--;) b[e] &&
                        d.call(this, a[e], b[e])
                });
                return b
            },
            point: function(b, d, a, c, e, f, p, l, u) {
                b = g(c.ignoreemptydatasets, 0);
                var m = !1,
                    r = !g(c.halferrorbar, 1),
                    k = e[ea],
                    n = h(this.isValueAbs, k.isValueAbs, !1),
                    q = g(a.showvalues, k.showValues),
                    w = g(d.yAxis, 0),
                    O = g(c.use3dlighting, 1),
                    F = e[ea].numberFormatter,
                    y = this.colorManager,
                    x = g(c.useplotgradientcolor, 1) ? Lb(c.plotgradientcolor, y.getColor("plotGradientColor")) : B,
                    $ = h(a.alpha, c.plotfillalpha, "100"),
                    fa = Ca(h(a.errorbaralpha, c.errorbaralpha, $)),
                    Ia = g(a.dashed, c.plotborderdashed, 0),
                    xa = g(a.dashlen,
                        c.plotborderdashlen, 5),
                    G = g(a.dashgap, c.plotborderdashgap, 4),
                    qa = h(d.type, this.defaultSeriesType),
                    db = e.plotOptions[qa] && e.plotOptions[qa].stacking,
                    qa = y.getPlotColor(),
                    K, s, oa, t, J, z, U, L, H, N, Y, R, P, v, Z, W;
                this.errorBarShadow = g(c.errorbarshadow);
                d.errorBar2D = !0;
                d.name = D(a.seriesname);
                db || (d.columnPosition = g(u, l, p));
                if (0 === g(a.includeinlegend) || 0 === $ || void 0 === d.name) d.showInLegend = !1;
                d.errorBarWidthPercent = g(a.errorbarwidthpercent, c.errorbarwidthpercent, 70);
                d.errorBarColor = A(aa(h(a.errorbarcolor, c.errorbarcolor,
                    "AAAAAA")), fa);
                d.errorBarThickness = g(a.errorbarthickness, c.errorbarthickness, 1);
                d.color = h(a.color, qa).split(",")[0].replace(/^#?/g, "#");
                if (p = a.data)
                    for (R = h(c.plotborderthickness, "1"), db = e.chart.useRoundEdges, u = this.isBar, l = /3d$/.test(e.chart.defaultSeriesType), v = h(c.plotbordercolor, y.getColor("plotBorderColor")).split(",")[0], Z = "0" == c.showplotborder ? "0" : h(c.plotborderalpha, "100"), Z = l ? c.showplotborder ? Z : "0" : Z, v = l ? h(c.plotbordercolor, "#FFFFFF") : v, y = 0; y < f; y += 1)(s = p[y]) ? (L = F.getCleanValue(s.value, n),
                        H = F.getCleanValue(s.errorvalue, n), null === L ? d.data.push({
                            y: null
                        }) : (m = !0, U = k.oriCatTmp[y], t = h(s.color, a.color, qa), J = Ca(h(s.alpha, $)) + B, K = h(s.ratio, a.ratio, c.plotfillratio), oa = h(360 - c.plotfillangle, 90), 0 > L && (oa = 360 - oa), N = {
                            opacity: J / 100
                        }, P = E(J, Ca(Z)) + B, z = bc(t + "," + x, J, K, oa, db, v, P, u, l), Y = {
                            opacity: fa / 250
                        }, W = this.getPointStub(s, L, U, e, a, q, w, H), U = [], U.push({
                            errorValue: H,
                            toolText: W._errortoolText,
                            shadow: Y
                        }), r && U.push({
                            errorValue: -H,
                            toolText: W._errortoolText,
                            shadow: Y
                        }), K = this.pointHoverOptions(s, d, {
                            plotType: "column",
                            is3d: l,
                            isBar: u,
                            use3DLighting: O,
                            isRoundEdged: db,
                            color: t,
                            gradientColor: x,
                            alpha: J,
                            ratio: K,
                            angle: oa,
                            borderWidth: R,
                            borderColor: v,
                            borderAlpha: P,
                            borderDashed: Ia,
                            borderDashGap: G,
                            borderDashLen: xa,
                            shadow: N
                        }), d.data.push(M(W, {
                            y: L,
                            shadow: N,
                            errorValue: U,
                            color: z[0],
                            borderColor: z[1],
                            borderWidth: R,
                            use3DLighting: O,
                            dashStyle: g(s.dashed, Ia) ? Fa(h(s.dashlen, xa), h(s.dashgap, G), R) : void 0,
                            hoverEffects: K.enabled && K.options,
                            rolloverProperties: K.enabled && K.rolloverOptions
                        })), this.pointValueWatcher(e, L, H))) : d.data.push({
                        y: null
                    });
                b && !m && (d.showInLegend = !1);
                return d
            },
            pointValueWatcher: function(b, d, a) {
                var c = b[ea];
                null !== d && (a ? (b = d + a, d -= a) : b = d, c[0] || (c[0] = {}), a = c[0], a.max = a.max > b ? a.max : b, a.min = a.min < b ? a.min : b, a.max = a.max > d ? a.max : d, a.min = a.min < d ? a.min : d)
            },
            drawErrorValue: function(b, d) {
                var a = this,
                    c = a.options,
                    e = c.plotOptions.series,
                    f = c[ea],
                    f = a.smartLabel || f.smartLabel,
                    p = a.paper,
                    l = a.layers,
                    u = a.xAxis[0],
                    m = a.yAxis[0],
                    h = isNaN(+e.animation) && e.animation.duration || 1E3 * e.animation,
                    k = l.dataset = l.dataset || p.group("dataset-orphan"),
                    n = b.errorGroup =
                    p.group("errorBar").insertAfter(b.lineLayer || k.column || k),
                    q = l.errorTracker || (l.errorTracker = p.group("hot-error", l.tracker || k).toBack()),
                    w = k.errorValueGroup || (k.errorValueGroup = p.group("errorValues")),
                    O = d.errorBar2D,
                    F = d.data || [],
                    y = F.length,
                    x = b.items,
                    $ = !1 !== (c.tooltip || {}).enabled,
                    fa, Ia, xa, G, qa = b.graphics = b.graphics || [],
                    db = !1 === d.visible ? "hidden" : "visible",
                    K = c.chart,
                    s = K.textDirection,
                    oa = K.valuePadding || 0,
                    K = 1 == K.rotateValues ? 270 : void 0,
                    t = d.columnPosition || 0,
                    J = a.definition.chart,
                    A = u.getAxisPosition(0),
                    U = u.getAxisPosition(1) - A,
                    L = e.groupPadding,
                    H = e.maxColWidth,
                    A = d.numColumns || 1,
                    U = (1 - .01 * (J && J.plotspacepercent)) * U || E(U * (1 - 2 * L), H * A),
                    J = U / A,
                    t = t * J - U / 2,
                    A = a.logic,
                    U = !A.avoidCrispError,
                    L = a.canvasHeight + a.canvasTop,
                    N = l.shadows || (l.shadows = p.group("shadows", k).toBack()),
                    l = {},
                    H = c.plotOptions.series.dataLabels.style,
                    Y = a.chartWidth,
                    R = a.chartHeight,
                    P = {
                        fontFamily: H.fontFamily,
                        fontSize: H.fontSize,
                        lineHeight: H.lineHeight,
                        fontWeight: H.fontWeight,
                        fontStyle: H.fontStyle
                    },
                    v, Z, W, z, D, M, ba, C, Ta, ja, la, S, ia, I, ta, ka, aa, Q, pa,
                    fb, kb = function(b) {
                        ya.call(this, a, b)
                    },
                    da = function(b) {
                        ya.call(this, a, b, "DataPlotRollOver")
                    },
                    yc = function(b) {
                        ya.call(this, a, b, "DataPlotRollOut")
                    },
                    ca = function(b) {
                        return function() {
                            void 0 !== b && a.linkClickFN.call({
                                link: b
                            }, a)
                        }
                    },
                    V = function() {
                        n.show();
                        w.attr({
                            transform: "...t" + -Y + "," + -R
                        });
                        N.show()
                    };
                if (0 < y) {
                    for (; y--;)
                        if (fa = F[y], c = g(fa.errorStartValue, fa.y), S = fa.errorValue, k = fa.link, void 0 !== c && S && (ta = S.length)) {
                            fa = g(fa.x, y);
                            G = m.getAxisPosition(c);
                            xa = u.getAxisPosition(fa);
                            O && (t && (xa += t), J && (xa += J / 2));
                            ja = x[y] ||
                                (x[y] = {});
                            ja.errorBars = ja.errorBars || [];
                            ja.errorValues = ja.errorValues || [];
                            ja.trackerBars = ja.trackerBars || [];
                            for (Z = (v = ja.tracker || ja.graphic) && v.data("groupId"); ta--;) pa = ka = fb = null, ia = S[ta], Ta = ia.errorStartValue, Ia = ia.tooltext || ia.toolText, D = isNaN(Ta) ? G : m.getAxisPosition(Ta), W = ia.displayValue, I = ia.errorValue, ia && X(I) && (z = g(ia.isHorizontal, 0), Q = g(ia.errorBarThickness, d.errorBarThickness, 1), ka = g(J * d.errorBarWidthPercent / 100, ia.errorWidth, z ? d.hErrorBarWidth : d.vErrorBarWidth, d.errorBarWidth), aa = ka / 2, ka =
                                ia.errorBarColor || d.errorBarColor, X(W) && W !== B && (fb = p.text(w).attr({
                                    text: W,
                                    fill: H.color,
                                    direction: s,
                                    "text-bound": [H.backgroundColor, H.borderColor, H.borderThickness, H.borderPadding, H.borderRadius, H.borderDash]
                                }).css(P), f.setStyle(P), l = f.getOriSize(W)), z ? (W = la = Ta = u.getAxisPosition(fa + I), z = xa, U && (W = na(D) + Q % 2 / 2, z = na(la) + Q % 2 / 2), D = ["M", xa, W, "H", z, "M", z, W - aa, "V", W + aa]) : (W = la = Ta = m.getAxisPosition((X(Ta) ? Ta : c) + I), z = xa, U && (W = na(la) + Q % 2 / 2, z = na(xa) + Q % 2 / 2), C = .5 * (K ? l.width : l.height), M = la + .5 * Q + oa + C, ba = la - .5 * Q - oa -
                                    C, D > la ? (Ta = ba, ba - a.canvasTop < C && (Ta = M)) : (Ta = M, L - M < C && (Ta = ba)), D = ["M", z, D, "V", W, "M", z - aa, W, "H", z + aa]), ka = p.path(D, n).attr({
                                    stroke: ka,
                                    "stroke-width": Q,
                                    cursor: k ? "pointer" : "",
                                    "stroke-linecap": "round",
                                    visibility: db
                                }).shadow(g(A.errorBarShadow, e.shadow) && 0 < Q && ia.shadow, N), (k || $) && Q < ac && (pa = p.path(D, q).attr({
                                    stroke: ua,
                                    "stroke-width": ac,
                                    cursor: k ? "pointer" : "",
                                    ishot: !!k,
                                    visibility: db
                                })), pa = pa || ka, pa.data("eventArgs", v && v.data("eventArgs") || {
                                    link: k,
                                    toolText: Ia,
                                    displayValue: ia.displayValue,
                                    value: I
                                }), pa.click(kb).data("groupId",
                                    Z).hover(da, yc).tooltip(Ia), (k || $) && pa.click(ca(k)), fb && (fb.attr({
                                    x: xa,
                                    y: Ta,
                                    title: ia.originalText || "",
                                    visibility: db
                                }).css(P), K && fb.attr("transform", "T0,0,R" + K)), ka && (qa.push(ka), ja.errorBars.push(ka)), fb && (qa.push(fb), ja.errorValues.push(fb)), pa && pa !== ka && (qa.push(pa), ja.trackerBars.push(pa)));
                            h && (n.hide(), w.attr({
                                transform: "...t" + Y + "," + R
                            }), N.hide(), setTimeout(V, h))
                        }
                    b.visible = !1 !== d.visible
                }
            }
        }, t.mscolumn2dbase);
        t("errorline", {
            friendlyName: "Error Line Chart",
            standaloneInit: !0,
            creditLabel: !1,
            chart: t.errorbar2d.chart,
            drawErrorValue: t.errorbar2d.drawErrorValue,
            useErrorGroup: !0,
            rendererId: "cartesian",
            isErrorChart: !0,
            fireGroupEvent: !0,
            canvasPaddingModifiers: ["anchor", "errorbar"],
            point: function(b, d, a, c, e, f) {
                b = g(c.ignoreemptydatasets, 0);
                var p = !1,
                    l = !g(c.halferrorbar, 1),
                    u = e[ea],
                    m = h(this.isValueAbs, u.isValueAbs, !1),
                    r = g(a.showvalues, u.showValues),
                    k = g(d.yAxis, 0),
                    n = this.numberFormatter,
                    q = this.colorManager,
                    w = aa(h(a.color, c.linecolor, q.getPlotColor())),
                    O = e.chart,
                    F = g(a.alpha, c.linealpha, "100"),
                    y = g(a.errorbaralpha, c.errorbaralpha,
                        F),
                    x = g(a.linethickness, c.linethickness, 2),
                    $ = Boolean(g(a.dashed, c.linedashed, 0)),
                    fa = g(a.linedashlen, c.linedashlen, 5),
                    Ia = g(a.linedashgap, c.linedashgap, 4),
                    xa, G, qa, db, K, s, oa, z, J, v, U, L, H, N, Y, R, P, za, Z, W, C, S, ka, ba, I, Ta, ja, la, X, ia;
                this.errorBarShadow = g(c.errorbarshadow);
                d.name = D(a.seriesname);
                d.color = {
                    FCcolor: {
                        color: w,
                        alpha: F
                    }
                };
                d.lineWidth = x;
                oa = g(a.drawanchors, a.showanchors, c.drawanchors, c.showanchors);
                Z = g(a.anchorsides, c.anchorsides, 0);
                W = g(a.anchorradius, c.anchorradius, 3);
                C = aa(h(a.anchorbordercolor, c.anchorbordercolor,
                    w));
                S = g(a.anchorborderthickness, c.anchorborderthickness, 1);
                ka = aa(h(a.anchorbgcolor, c.anchorbgcolor, q.getColor("anchorBgColor")));
                ba = h(a.anchoralpha, c.anchoralpha, "100");
                I = h(a.anchorbgalpha, c.anchorbgalpha, ba);
                Ta = g(a.anchorstartangle, c.anchorstartangle, 90);
                q = d.anchorShadow = g(c.anchorshadow, 0);
                d.errorBarWidth = g(c.errorbarwidth, a.errorbarwidth, 5);
                d.errorBarColor = A(aa(h(a.errorbarcolor, c.errorbarcolor, "AAAAAA")), y);
                d.errorBarThickness = E(x, g(a.errorbarthickness, c.errorbarthickness, 1));
                if (0 === g(a.includeinlegend) ||
                    void 0 === d.name || 0 === F && 1 !== oa) d.showInLegend = !1;
                d.marker = {
                    fillColor: {
                        FCcolor: {
                            color: ka,
                            alpha: I * ba / 100 + B
                        }
                    },
                    lineColor: {
                        FCcolor: {
                            color: C,
                            alpha: ba + B
                        }
                    },
                    lineWidth: S,
                    radius: W,
                    symbol: da(Z),
                    startAngle: Ta
                };
                if (c = a.data)
                    for (db = 0; db < f; db += 1)(Y = c[db]) ? (G = n.getCleanValue(Y.value, m), qa = n.getCleanValue(Y.errorvalue, m), null === G ? d.data.push({
                        y: null
                    }) : (p = !0, N = g(Y.anchorsides, Z), H = g(Y.anchorradius, W), U = aa(h(Y.anchorbordercolor, C)), L = g(Y.anchorborderthickness, S), v = aa(h(Y.anchorbgcolor, ka)), z = h(Y.anchoralpha, ba), J = h(Y.anchorbgalpha,
                        I), K = aa(h(Y.color, w)), s = h(Y.alpha, F), la = g(Y.dashed, $) ? Fa(fa, Ia, x) : void 0, R = {
                        opacity: s / 100
                    }, ja = void 0 === oa ? 0 !== s : !!oa, xa = u.oriCatTmp[db], ia = this.getPointStub(Y, G, xa, e, a, r, k, qa), X = [], X.push({
                        errorValue: qa,
                        toolText: ia._errortoolText,
                        shadow: {
                            opacity: y / 250
                        }
                    }), l && X.push({
                        errorValue: null === qa ? null : -qa,
                        toolText: ia._errortoolText,
                        shadow: {
                            opacity: y / 250
                        }
                    }), P = h(Y.anchorstartangle, Ta), za = Boolean(g(Y.anchorshadow, q, 0)), xa = this.pointHoverOptions(Y, d, {
                        plotType: "anchor",
                        anchorBgColor: v,
                        anchorAlpha: z,
                        anchorBgAlpha: J,
                        anchorAngle: P,
                        anchorBorderThickness: L,
                        anchorBorderColor: U,
                        anchorBorderAlpha: z,
                        anchorSides: N,
                        anchorRadius: H,
                        shadow: R
                    }), d.data.push(M(ia, {
                        y: G,
                        shadow: R,
                        dashStyle: la,
                        errorValue: X,
                        valuePosition: h(Y.valueposition, O.valuePosition),
                        color: {
                            FCcolor: {
                                color: K,
                                alpha: s
                            }
                        },
                        marker: {
                            enabled: ja,
                            shadow: za && {
                                opacity: z / 100
                            },
                            fillColor: {
                                FCcolor: {
                                    color: v,
                                    alpha: J * z / 100 + B
                                }
                            },
                            lineColor: {
                                FCcolor: {
                                    color: U,
                                    alpha: z
                                }
                            },
                            lineWidth: L,
                            radius: H,
                            symbol: da(N),
                            startAngle: P
                        },
                        hoverEffects: xa.enabled && xa.options,
                        rolloverProperties: xa.enabled &&
                            xa.rolloverOptions
                    })), t.errorbar2d.pointValueWatcher(e, G, qa))) : d.data.push({
                        y: null
                    });
                b && !p && (d.showInLegend = !1);
                return d
            }
        }, t.mslinebase);
        t("errorscatter", {
            friendlyName: "Error Scatter Chart",
            isXY: !0,
            standaloneInit: !0,
            creditLabel: !1,
            chart: t.errorbar2d.chart,
            drawErrorValue: t.errorbar2d.drawErrorValue,
            defaultZeroPlaneHighlighted: !1,
            useErrorGroup: !0,
            rendererId: "cartesian",
            isErrorChart: !0,
            fireGroupEvent: !0,
            point: function(b, d, a, c, e, f, p) {
                b = g(c.ignoreemptydatasets, 0);
                f = !1;
                var l = g(a.drawline, 0),
                    u = g(a.drawprogressioncurve,
                        0),
                    m, r, k = g(a.showvalues, e[ea].showValues),
                    n = this.numberFormatter,
                    q = g(a.showregressionline, c.showregressionline, 0),
                    w = h(c.errorbarcolor, "AAAAAA"),
                    O = h(c.errorbaralpha, "100"),
                    F = g(c.errorbarthickness, 1);
                r = g(c.errorbarwidth, 5);
                var y = g(c.halfverticalerrorbar, 1),
                    x = g(a.verticalerrorbaralpha, a.errorbaralpha, c.verticalerrorbaralpha, O),
                    $ = A(h(a.verticalerrorbarcolor, a.errorbarcolor, c.verticalerrorbarcolor, w), x),
                    fa = g(a.verticalerrorbarthickness, a.errorbarthickness, c.verticalerrorbarthickness, F),
                    Ia = g(c.halfhorizontalerrorbar,
                        1),
                    O = h(a.horizontalerrorbaralpha, a.errorbaralpha, c.horizontalerrorbaralpha, O),
                    w = A(h(a.horizontalerrorbarcolor, a.errorbarcolor, c.horizontalerrorbarcolor, w), O),
                    F = g(a.horizontalerrorbarthickness, a.errorbarthickness, c.horizontalerrorbarthickness, F),
                    xa = g(a.usehorizontalerrorbar, c.usehorizontalerrorbar, 0),
                    G = g(a.useverticalerrorbar, c.useverticalerrorbar, 1),
                    qa = {
                        sumX: 0,
                        sumY: 0,
                        sumXY: 0,
                        sumXsqure: 0,
                        sumYsqure: 0,
                        xValues: [],
                        yValues: []
                    };
                m = this.colorManager;
                var s = m.getPlotColor(),
                    K, t, oa, z, J, v, U, L, H, N, Y, R, P, za, Z, W,
                    E, M, C, ba, S, ka, ja, la;
                this.errorBarShadow = g(c.errorbarshadow);
                d.zIndex = 1;
                d.name = D(a.seriesname);
                if (0 === g(a.includeinlegend) || void 0 === d.name) d.showInLegend = !1;
                d.vErrorBarWidth = g(a.verticalerrorbarwidth, a.errorbarwidth, c.verticalerrorbarwidth, r);
                d.hErrorBarWidth = g(a.horizontalerrorbarwidth, a.errorbarwidth, c.horizontalerrorbarwidth, r);
                if (l || u) u && (d.type = "spline"), t = aa(h(a.color, s)), l = h(a.alpha, Da), u = g(a.linethickness, c.linethickness, 2), r = Boolean(g(a.linedashed, a.dashed, c.linedashed, 0)), oa = g(a.linedashlen,
                    c.linedashlen, 5), z = g(a.linedashgap, c.linedashgap, 4), d.color = A(h(a.linecolor, c.linecolor, t), g(a.linealpha, c.linealpha, l)), d.lineWidth = u, d.dashStyle = r ? Fa(oa, z, u) : void 0;
                l = Boolean(g(a.drawanchors, a.showanchors, c.drawanchors, c.showanchors, 1));
                p = g(a.anchorsides, c.anchorsides, p + 3);
                u = g(a.anchorradius, c.anchorradius, 3);
                t = aa(h(a.anchorbordercolor, a.color, c.anchorbordercolor, t, s));
                s = g(a.anchorborderthickness, c.anchorborderthickness, 1);
                z = aa(h(a.anchorbgcolor, c.anchorbgcolor, m.getColor("anchorBgColor")));
                v = h(a.anchoralpha,
                    a.alpha, c.anchoralpha, "100");
                U = h(a.anchorbgalpha, c.anchorbgalpha, v);
                oa = h(a.anchorstartangle, c.anchorstartangle);
                d.anchorShadow = g(c.anchorshadow, 0);
                d.marker = {
                    fillColor: this.getPointColor(z, "100"),
                    lineColor: {
                        FCcolor: {
                            color: t,
                            alpha: v + B
                        }
                    },
                    lineWidth: s,
                    radius: u,
                    symbol: da(p)
                };
                if (m = a.data) {
                    r = m.length;
                    q && (d.events = {
                        hide: this.hideRLine,
                        show: this.showRLine
                    }, S = g(a.showyonx, c.showyonx, 1), ka = aa(h(a.regressionlinecolor, c.regressionlinecolor, t)), ja = g(a.regressionlinethickness, c.regressionlinethickness, s), c = Ca(g(a.regressionlinealpha,
                        c.regressionlinealpha, v)), ka = A(ka, c));
                    for (K = 0; K < r; K += 1)(J = m[K]) ? (c = n.getCleanValue(J.y), Z = n.getCleanValue(J.x), n.getCleanValue(J.errorvalue), W = n.getCleanValue(h(J.horizontalerrorvalue, J.errorvalue)), E = n.getCleanValue(h(J.verticalerrorvalue, J.errorvalue)), null === c ? d.data.push({
                        y: null,
                        x: Z
                    }) : (f = !0, M = this.getPointStub(J, c, n.xAxis(Z), e, a, k, void 0, E, W, Z), L = g(J.anchorsides, p), H = g(J.anchorradius, u), N = aa(h(J.anchorbordercolor, t)), Y = g(J.anchorborderthickness, s), R = aa(h(J.anchorbgcolor, z)), P = h(J.anchoralpha,
                        J.alpha, v), za = h(J.anchorbgalpha, U), C = Boolean(g(J.usehorizontalerrorbar, xa)), ba = Boolean(g(J.useverticalerrorbar, G)), la = [], C && (C = M._hErrortoolText, la.push({
                        errorValue: W,
                        toolText: C,
                        errorBarColor: w,
                        isHorizontal: 1,
                        errorBarThickness: F,
                        shadow: {
                            opacity: O / 250
                        }
                    }), Ia || la.push({
                        errorValue: -W,
                        toolText: C,
                        errorBarColor: w,
                        isHorizontal: 1,
                        errorBarThickness: F,
                        shadow: {
                            opacity: O / 250
                        }
                    })), ba && (ba = M._errortoolText, la.push({
                        errorValue: E,
                        toolText: ba,
                        errorBarColor: $,
                        errorBarThickness: fa,
                        shadow: {
                            opacity: x / 250
                        }
                    }), y || la.push({
                        errorValue: -E,
                        toolText: ba,
                        errorBarColor: $,
                        errorBarThickness: fa,
                        shadow: {
                            opacity: x / 250
                        }
                    })), ba = this.pointHoverOptions(J, d, {
                        plotType: "anchor",
                        anchorBgColor: R,
                        anchorAlpha: P,
                        anchorBgAlpha: za,
                        anchorAngle: oa,
                        anchorBorderThickness: Y,
                        anchorBorderColor: N,
                        anchorBorderAlpha: P,
                        anchorSides: L,
                        anchorRadius: H
                    }), d.data.push({
                        y: c,
                        x: Z,
                        errorValue: la,
                        displayValue: M.displayValue,
                        toolText: M.toolText,
                        link: M.link,
                        marker: {
                            enabled: l,
                            shadow: void 0,
                            fillColor: {
                                FCcolor: {
                                    color: R,
                                    alpha: za * P / 100 + B
                                }
                            },
                            lineColor: {
                                FCcolor: {
                                    color: N,
                                    alpha: P
                                }
                            },
                            lineWidth: Y,
                            radius: H,
                            symbol: da(L),
                            startAngle: h(J.anchorstartangle, oa)
                        },
                        hoverEffects: ba.enabled && ba.options,
                        rolloverProperties: ba.enabled && ba.rolloverOptions
                    }), this.pointValueWatcher(e, y ? c : c - E, Ia ? Z : Z - W, q && qa), this.pointValueWatcher(e, c + E, Z + W, q && qa))) : d.data.push({
                        y: null
                    });
                    q && (a = this.getRegressionLineSeries(qa, S, r), this.pointValueWatcher(e, a[0].y, a[0].x), this.pointValueWatcher(e, a[1].y, a[1].x), e = {
                        type: "line",
                        color: ka,
                        showInLegend: !1,
                        lineWidth: ja,
                        enableMouseTracking: !1,
                        marker: {
                            enabled: !1
                        },
                        data: a,
                        zIndex: 0
                    }, d = [d,
                        e
                    ])
                }
                b && !f && (d.showInLegend = !1);
                return d
            }
        }, t.scatterbase);
        t("waterfall2d", {
            friendlyName: "Waterfall Chart",
            standaloneInit: !0,
            isWaterfall: !0,
            creditLabel: !1,
            point: function(b, d, a, c, e) {
                var f, p, l, u, m, r, k, n, q, w, O, F, y, x, $;
                b = h(c.connectorthickness, 1);
                var fa = {
                        step: !0,
                        type: "line",
                        enableMouseTracking: !1,
                        data: [],
                        dataLabels: {
                            enabled: !1
                        },
                        marker: {
                            enabled: !1
                        },
                        dashStyle: "1" === c.connectordashed ? Fa(g(c.connectordashlen, 2), g(c.connectordashgap, 2), b) : void 0,
                        drawVerticalJoins: !1,
                        useForwardSteps: !0,
                        color: A(h(c.connectorcolor,
                            "000000"), h(c.connectoralpha, 100)),
                        lineWidth: b
                    },
                    Ia = this.colorManager,
                    xa = a.length,
                    G = e[ea],
                    qa = G.axisGridManager,
                    s = e.xAxis,
                    K = G.x,
                    t = /3d$/.test(e.chart.defaultSeriesType),
                    oa = this.isBar,
                    v = "1" === h(c.showplotborder, t ? "0" : "1") ? t ? 1 : g(c.plotborderthickness, 1) : 0,
                    J = e.chart.useRoundEdges,
                    E = g(c.plotborderalpha, c.plotfillalpha, 100) + B,
                    U = h(c.plotbordercolor, Ia.getColor("plotBorderColor").split(",")[0]),
                    L = g(c.useplotgradientcolor, 1) ? Lb(c.plotgradientcolor, Ia.getColor("plotGradientColor")) : B,
                    H = g(c.plotborderdashed, 0),
                    N = g(c.plotborderdashlen, 6),
                    Y = g(c.plotborderdashgap, 3),
                    R = 0,
                    P = Boolean(g(c.use3dlighting, 1)),
                    za = 0,
                    Z = 0,
                    W = e[ea].numberFormatter,
                    M, C = 0,
                    S, ba = g(c.showsumatend, 1);
                for (f = 0; f < xa; f += 1) n = a[f], b = W.getCleanValue(n.value), l = g(n.issum, 0), n.vline || l || (C += b, n._value = b);
                M = W.dataLabels(C);
                ba && (ba = !0, xa += 1, S = {
                    label: ca(c.sumlabel, "Total"),
                    _value: C,
                    value: C,
                    issum: 1,
                    cumulative: 1
                });
                for (p = f = 0; f < xa; f += 1) n = a[f], !n && ba && (n = S), n.vline ? qa.addVline(s, n, R, e) : (b = n._value, delete n._value, l = g(n.issum, 0), k = g(n.cumulative, 1), l ? (b = k ? za :
                        za === Z ? za : za - Z, Z = za, fa.data.push({
                            y: null,
                            x: p - .5
                        })) : za += b, l = g(n.showlabel, c.showlabels, 1), l = z(l ? ca(n.label, n.name) : B), qa.addXaxisCat(s, R, R, l, n, {}, c), R += 1, 0 < b ? (u = h(n.color, c.positivecolor, Ia.getPlotColor()), d.hoverEffects && (d.hoverEffects.color = h(n.positivehovercolor, c.positivehovercolor, c.plotfillhovercolor))) : (u = h(n.color, c.negativecolor, Ia.getPlotColor()), d.hoverEffects && (d.hoverEffects.color = h(n.negativehovercolor, c.negativehovercolor, c.plotfillhovercolor))), m = h(n.alpha, c.plotfillalpha, "100"), r =
                    h(n.ratio, c.plotfillratio), q = h(360 - c.plotfillangle, 90), 0 > b && (q = 360 - q), F = h(n.alpha, E), y = g(n.dashed, H), x = h(n.dashgap, Y), $ = h(n.dashlen, N), w = {
                        opacity: m / 100,
                        inverted: oa
                    }, k = bc(u + wa + L.replace(/,+?$/, ""), m, r, q, J, U, h(n.alpha, E), oa, t), O = y ? Fa($, x, v) : "none", u = this.pointHoverOptions(n, d, {
                        plotType: "column",
                        is3d: t,
                        isBar: oa,
                        use3DLighting: P,
                        isRoundEdged: J,
                        color: u,
                        gradientColor: L,
                        alpha: m,
                        ratio: r,
                        angle: q,
                        borderWidth: v,
                        borderColor: U,
                        borderAlpha: F,
                        borderDashed: y,
                        borderDashGap: x,
                        borderDashLen: $,
                        shadow: w
                    }), m = D(z(n.displayvalue)),
                    r = null === b ? b : W.dataLabels(b), q = D(z(h(n.tooltext, G.tooltext))), q = G.showTooltip ? void 0 !== q ? bb(q, [1, 2, 3, 5, 6, 7, 20, 21, 24, 25], {
                        formattedValue: r,
                        label: l,
                        yaxisName: z(c.yaxisname),
                        xaxisName: z(c.xaxisname),
                        cumulativeValue: za,
                        cumulativeDataValue: W.dataLabels(za),
                        sum: M,
                        unformattedSum: C
                    }, n, c) : null === r ? !1 : l !== B ? l + G.tooltipSepChar + r : r : B, m = g(n.showvalue, G.showValues) ? void 0 !== m ? m : r : B, d.data.push({
                        y: b,
                        _FCY: 0 > b ? za - b : za,
                        previousY: 0 > b ? za : 0 === za - b ? void 0 : za - b,
                        shadow: w,
                        color: k[0],
                        borderColor: k[1],
                        borderWidth: v,
                        dashStyle: O,
                        use3DLighting: P,
                        hoverEffects: u.enabled && u.options,
                        rolloverProperties: u.enabled && u.rolloverOptions,
                        displayValue: m,
                        categoryLabel: l,
                        toolText: q,
                        link: h(n.link)
                    }), fa.data.push({
                        y: b && za,
                        x: p
                    }), this.pointValueWatcher(e, za), p += 1);
                K.catCount = R;
                "0" != c.showconnectors && (d = [fa, d]);
                return d
            },
            defaultSeriesType: "column",
            rendererId: "cartesian"
        }, Ja);
        t("multilevelpie", {
            friendlyName: "Multi-level Pie Chart",
            standaloneInit: !0,
            defaultSeriesType: "multilevelpie",
            rendererId: "multiLevelPie",
            defaultPlotShadow: 0,
            series: function() {
                var b =
                    this.dataObj,
                    d = this.hcJSON,
                    a = b.chart,
                    c = d.series,
                    e = {},
                    f = Boolean(g(a.usehovercolor, 1)),
                    p = A(h(a.hoverfillcolor, "FF5904"), g(a.hoverfillalpha, 100)),
                    l = parseInt(a.pieradius, 10),
                    u = 0,
                    m = !0;
                d.chart.plotBorderColor = 0;
                d.chart.plotBackgroundColor = null;
                d.plotOptions.series.dataLabels.style = d.xAxis.labels.style;
                d.plotOptions.series.dataLabels.color = d.xAxis.labels.style.color;
                d.legend.enabled = !1;
                d.plotOptions.pie.allowPointSelect = !1;
                d.plotOptions.series.borderColor = A(h(a.plotbordercolor, a.piebordercolor, "FFFFFF"),
                    "0" != a.showplotborder ? h(a.plotborderalpha, a.pieborderalpha, 100) : 0);
                d.plotOptions.series.borderWidth = g(a.pieborderthickness, a.plotborderthickness, 1);
                d.plotOptions.pie.startingAngle = 0;
                d.plotOptions.pie.size = "100%";
                e.showLabels = g(a.showlabels, 1);
                e.showValues = g(a.showvalues, 0);
                e.showValuesInTooltip = g(a.showvaluesintooltip, a.showvalues, 0);
                e.showPercentValues = g(a.showpercentvalues, a.showpercentagevalues, 0);
                e.showPercentInTooltip = g(a.showpercentintooltip, 0);
                e.toolTipSepChar = h(a.tooltipsepchar, a.hovercapsepchar,
                    Oa);
                e.labelSepChar = h(a.labelsepchar, e.toolTipSepChar);
                e.tooltext = a.plottooltext;
                f && (d.plotOptions.series.point.events = {
                    mouseOver: function() {
                        for (var a = this, b = a.chart.plots, c, d; a;) a.graphic.attr({
                            fill: p
                        }), d = a.prevPointIndex, a = a.prevSeriesIndex, a = (c = b[a]) && c.items && c.items[d]
                    },
                    mouseOut: function() {
                        for (var a = this, b = a.chart.plots, c, d; a;) a.graphic.attr({
                            fill: a.color
                        }), d = a.prevPointIndex, a = a.prevSeriesIndex, a = (c = b[a]) && c.items && c.items[d]
                    }
                });
                d.chart.plotBorderWidth = 0;
                b.category && this.addMSPieCat(b.category,
                    0, 0, 100, h(a.plotfillalpha, a.piefillalpha, 100), e, null);
                l = parseInt(a.pieradius, 10);
                u = 0;
                m = !0;
                l ? (b = 2 * l / c.length, m = !1) : b = parseInt(100 / c.length, 10);
                d.plotOptions.series.dataLabels.distance = 0;
                d.plotOptions.series.dataLabels.placeLabelsInside = !0;
                for (d = 0; d < c.length; d += 1) c[d].innerSize = u + (m ? "%" : ""), c[d].size = (u += b) + (m ? "%" : ""), 0 === c[d].data[c[d].data.length - 1].y && c[d].data.pop()
            },
            spaceManager: function(b, d, a, c) {
                var e = b[ea];
                this.titleSpaceManager(b, d, a - (e.marginLeftExtraSpace + e.marginRightExtraSpace + b.chart.marginRight +
                    b.chart.marginLeft), .4 * (c - (e.marginBottomExtraSpace + e.marginTopExtraSpace + b.chart.marginBottom + b.chart.marginTop)))
            },
            addMSPieCat: function(b, d, a, c, e, f, p) {
                var l = this.numberFormatter,
                    u = this.colorManager,
                    m, r, k = 0,
                    n = b.length - 1,
                    q, w, O;
                m = this.hcJSON.series;
                var F = f.labelSepChar,
                    y, x, $, fa, Ia, xa;
                void 0 === this.colorCount && (this.colorCount = 0);
                0 === d && (this.colorCount = 0);
                m[d] || (m[d] = {
                    data: [{
                        toolText: !1,
                        doNotSlice: !0,
                        y: 100,
                        visible: !1,
                        color: "rgba(255,255,255,0)"
                    }]
                });
                m = m[d];
                (r = a - 100 + m.data[m.data.length - 1].y) && m.data.splice(m.data.length -
                    1, 0, {
                        toolText: !1,
                        doNotSlice: !0,
                        y: r,
                        visible: !1,
                        color: "rgba(255,255,255,0)"
                    });
                m.data[m.data.length - 1].y = 100 - c;
                for (w = 0; w <= n; w += 1) q = b[w], q._userValue = l.getCleanValue(q.value, this.isValueAbs), q._value = g(q._userValue, 1), k += q._value;
                k = k || 1;
                r = (c - a) / k;
                for (w = n; 0 <= w; --w) q = b[w], n = r * q._value, O = z(h(q.label, q.name)), $ = null !== q._userValue ? l.dataLabels(q._userValue) : B, fa = l.percentValue(q._value / k * 100), y = m.data.length - 1, x = g(q.alpha, e), xa = f.showLabels ? O : B, f.showValues && (f.showPercentValues ? xa += xa !== B ? F + fa : fa : void 0 !==
                    $ && $ !== B && (xa += xa !== B ? F + $ : $)), Ia = z(h(q.tooltext, q.hovertext, f.tooltext)), Ia === B ? (Ia = O, f.showValuesInTooltip && (f.showPercentInTooltip ? Ia += Ia !== B ? F + fa : fa : void 0 !== $ && $ !== B && (Ia += Ia !== B ? F + $ : $))) : Ia = bb(Ia, [1, 2, 3, 14], {
                    percentValue: fa,
                    label: O,
                    formattedValue: $
                }, q), m.data.splice(y, 0, {
                    prevPointIndex: p,
                    prevSeriesIndex: d - 1,
                    displayValue: xa,
                    toolText: Ia,
                    y: n,
                    link: D(q.link),
                    doNotSlice: !0,
                    color: A(q.color || u.getPlotColor(), x),
                    shadow: {
                        opacity: .01 * na(50 < x ? x * x * x * 1E-4 : x * x * .01)
                    }
                }), this.colorCount += 1, q.category && this.addMSPieCat(q.category,
                    d + 1, a, 0 === w ? c : a + n, e, f, y), a += n
            },
            isValueAbs: !0,
            creditLabel: !1
        }, Ja);
        t("radar", {
            friendlyName: "Radar Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "radar",
            areaAlpha: 50,
            spaceManager: function(b, d, a, c) {
                b.chart.plotBorderWidth = 0;
                b.chart.plotBackgroundColor = null;
                var e = b[ea],
                    f = e.x,
                    p = b.xAxis,
                    l = b.yAxis[0],
                    u = d.chart,
                    l = g(u.labelpadding, u.labelxpadding, parseInt(l && l.labels && l.labels.style && l.labels.style.fontSize || 10, 10));
                a -= e.marginLeftExtraSpace + e.marginRightExtraSpace + b.chart.marginRight + b.chart.marginLeft;
                c -= e.marginBottomExtraSpace + e.marginTopExtraSpace + b.chart.marginBottom + b.chart.marginTop;
                e = this.colorManager;
                c -= this.titleSpaceManager(b, d, a, .4 * c);
                p.min = g(f.min, 0);
                p.max = g(f.max, f.catCount - 1);
                p.gridLineColor = A(h(u.radarspikecolor, e.getColor("divLineColor")), g(u.radarspikealpha, u.radarinlinealpha, e.getColor("divLineAlpha")));
                p.gridLineWidth = g(u.radarspikethickness, 1);
                p.showRadarBorder = g(u.showradarborder, 1);
                p.radarBorderThickness = g(u.radarborderthickness, 2);
                p.radarBorderColor = A(h(u.radarbordercolor,
                    e.getColor("divLineColor")), g(u.radarborderalpha, 100));
                p.radarFillColor = A(h(u.radarfillcolor, e.getColor("altHGridColor")), g(u.radarfillalpha, e.getColor("altHGridAlpha")));
                b.legend.enabled && (h(u.legendposition, Ga).toLowerCase() != va ? c -= this.placeLegendBlockBottom(b, d, a, c / 2) : a -= this.placeLegendBlockRight(b, d, a / 3, c));
                d = g(u.radarradius);
                f = 2 * g(parseInt(p.labels.style.lineHeight, 10), 12);
                u = 2 * l;
                f = E(a - (100 + u), c - (f + u));
                d = d || .5 * f;
                a = E(.3 * a, .3 * c);
                d < a && (d = a);
                b.chart.axisRadius = d;
                p.labels.labelPadding = l
            },
            anchorAlpha: "100",
            showValues: 0,
            isRadar: !0,
            rendererId: "radar"
        }, t.msareabase);
        Ja = {
            dragExtended: !0,
            defaultRestoreButtonVisible: 1,
            spaceManager: function(b, d, a, c) {
                var e = b[ea],
                    f = b.chart,
                    p = d.chart,
                    l = e.outCanvasStyle,
                    u = c - .3 * (e.marginBottomExtraSpace + f.marginBottom + f.marginTop),
                    m = 0,
                    r = 0,
                    e = this.smartLabel || e.smartLabel,
                    k, n;
                f.formAction = D(p.formaction);
                f.formDataFormat = h(p.formdataformat, C.dataFormats.XML);
                f.formTarget = h(p.formtarget, "_self");
                f.formMethod = h(p.formmethod, "POST");
                f.submitFormAsAjax = g(p.submitformusingajax, 1);
                f.showFormBtn =
                    g(p.showformbtn, 1) && f.formAction;
                f.formBtnTitle = h(p.formbtntitle, "Submit");
                f.formBtnBorderColor = h(p.formbtnbordercolor, "CBCBCB");
                f.formBtnBgColor = h(p.formbtnbgcolor, "FFFFFF");
                f.btnPadding = g(p.btnpadding, 7);
                f.btnSpacing = g(p.btnspacing, 5);
                f.formBtnStyle = {
                    fontSize: l.fontSize,
                    fontFamily: l.fontFamily,
                    fontWeight: "bold"
                };
                f.formBtnLabelFill = l.color;
                p.btntextcolor && (f.formBtnLabelFill = p.btntextcolor.replace(ob, Ma));
                0 <= (l = g(p.btnfontsize)) && (f.formBtnStyle.fontSize = l + "px");
                Ba(f.formBtnStyle);
                f.showRestoreBtn =
                    g(p.showrestorebtn, this.defaultRestoreButtonVisible, 1);
                f.showRestoreBtn && (f.restoreBtnTitle = h(p.restorebtntitle, "Restore"), f.restoreBtnBorderColor = h(p.restorebtnbordercolor, f.formBtnBorderColor), f.restoreBtnBgColor = h(p.restorebtnbgcolor, f.formBtnBgColor), f.restoreBtnStyle = {
                        fontSize: f.formBtnStyle.fontSize,
                        fontFamily: f.formBtnStyle.fontFamily,
                        fontWeight: "bold"
                    }, f.restoreBtnLabelFill = f.formBtnLabelFill, p.restorebtntextcolor && (f.restoreBtnLabelFill = p.restorebtntextcolor.replace(ob, Ma)), 0 <= (l = g(p.restorebtnfontsize)) &&
                    (f.restoreBtnStyle.fontSize = l + "px"), Ba(f.restoreBtnStyle));
                f.showLimitUpdateMenu = g(p.showlimitupdatemenu, 1);
                f.showFormBtn && (e.setStyle(f.formBtnStyle), k = e.getOriSize(f.formBtnTitle), m = k.height || 0);
                f.showRestoreBtn && (e.setStyle(f.restoreBtnStyle), n = e.getOriSize(f.restoreBtnTitle), m = Xa(n.height, m) || 0);
                0 < m && (m += f.btnPadding + 4, m > u && (f.btnPadding = Xa(f.btnPadding - m + u, 0) / 2, m = u));
                f.btnHeight = m;
                f.showFormBtn && (r = k.width + m, f.formBtnWidth = g(p.formbtnwidth, r), f.formBtnWidth < k.width && (f.formBtnWidth = r));
                f.showRestoreBtn &&
                    (r = n.width + m, f.restoreBtnWidth = g(p.restorebtnwidth, r), f.restoreBtnWidth < n.width && (f.restoreBtnWidth = r));
                f.marginBottom += m + f.btnPadding;
                f.spacingBottom += m + f.btnPadding;
                (b.callbacks || (b.callbacks = [])).push(this.drawButtons);
                return this.placeVerticalXYSpaceManager.apply(this, arguments)
            },
            drawButtons: function() {
                var b = this.logic,
                    d = this.paper,
                    a = this.options.chart,
                    c = a.btnSpacing,
                    e = this.chartHeight - a.spacingBottom + a.btnPadding,
                    f = this.chartWidth - a.spacingRight,
                    p = this.layers.layerAboveDataset,
                    l = 0;
                a.showFormBtn &&
                    (this.submitBtn = d.button(f - a.formBtnWidth, e, a.formBtnTitle, void 0, {
                        width: a.formBtnWidth,
                        height: a.btnHeight,
                        verticalPadding: 1,
                        horizontalPadding: 15
                    }, p).labelcss(a.formBtnStyle).attr({
                        fill: [aa(a.formBtnBgColor), a.formBtnLabelFill],
                        stroke: aa(a.formBtnBorderColor)
                    }).buttonclick(function() {
                        b.chartInstance.submitData()
                    }), l = a.formBtnWidth + c);
                a.showRestoreBtn && (this.restoreBtn = d.button(f - a.restoreBtnWidth - l, e, a.restoreBtnTitle, void 0, {
                        width: a.restoreBtnWidth,
                        height: a.btnHeight,
                        verticalPadding: 1,
                        horizontalPadding: 15
                    },
                    p).labelcss(a.restoreBtnStyle).attr({
                    fill: [aa(a.restoreBtnBgColor), a.restoreBtnLabelFill],
                    stroke: aa(a.restoreBtnBorderColor)
                }).buttonclick(function() {
                    b.chartInstance.restoreData()
                }))
            },
            drawAxisUpdateUI: function() {
                var b = this,
                    d = b.logic,
                    a = b.elements,
                    c = b.options,
                    e = c.chart,
                    f = c[ea],
                    p = d.chartInstance,
                    d = d.renderer,
                    l = b.yAxis[0],
                    g = l.axisData,
                    m = l.poi,
                    h = g.plotLines,
                    k = b.container,
                    n = c.chart.showRangeError,
                    q = f.inCanvasStyle,
                    c = b.toolbar || (b.toolbar = []),
                    l = b.menus || (b.menus = []),
                    w = eb({
                        outline: "none",
                        "-webkit-appearance": "none",
                        filter: "alpha(opacity=0)",
                        position: "absolute",
                        background: "transparent",
                        border: "1px solid #cccccc",
                        textAlign: "right",
                        top: 0,
                        left: 0,
                        width: 50,
                        zIndex: 20,
                        opacity: 0,
                        borderRadius: 0
                    }, q),
                    O, F;
                d && !d.forExport && (F = function(a, c, d) {
                    if (a === c + "") return null;
                    c = d ? p.setUpperLimit(a, !0) : p.setLowerLimit(a, !0);
                    !c && n && b.showMessage("Sorry! Not enough range gap to modify axis limit to " + (Number(a) || "0") + ".<br />Please modify the data values to be within range.<br />&nbsp;<br />(click anywhere on the chart to close this message)", !0);
                    return c
                }, mb(["max", "min"], function(a) {
                    var c = m[a],
                        d = c.label,
                        f = h[c.index],
                        c = d && d.getBBox(),
                        p, l, g, n, u, O, t;
                    if (c && d) {
                        l = c.x + c.width - e.spacingLeft;
                        g = e.marginLeft - l - (Wa ? 4 : 5);
                        p = qb("input", {
                            type: "text",
                            value: f.value,
                            name: a || ""
                        }, k, !0);
                        eb(w, {
                            top: c.y + (Wa ? -1 : 0) + "px",
                            left: g + "px",
                            width: l + "px"
                        });
                        for (n in w) p.style[n] = w[n];
                        s.dem.listen(p, ["focus", "mouseup", "blur", "keyup"], [function() {
                                var a = {
                                        opacity: 1,
                                        filter: "alpha(opacity=100)",
                                        color: q.color
                                    },
                                    b;
                                this.value = f.value;
                                for (b in a) this.style[b] = a[b];
                                u = t = !0;
                                d.hide()
                            },
                            function() {
                                var a = this;
                                t && (t = !1, ga || setTimeout(function() {
                                    a.select()
                                }, 0))
                            },
                            function() {
                                !0 !== F(this.value, f.value, f.isMaxLabel) && (this.style.opacity = 0, this.style.filter = "alpha(opacity=0)", d.show());
                                Zb && Ra.getElementsByTagName("body")[0].focus && Ra.getElementsByTagName("body")[0].focus();
                                u = t = !1
                            },
                            function(a) {
                                var b = a.originalEvent.keyCode,
                                    c = this.value;
                                13 === b ? (a = F(c, f.value, f.isMaxLabel), !1 === a && (this.style.color = "#dd0000")) : 27 === b && (this.value = f.value, s.dem.fire(this, "blur", a))
                            }
                        ]);
                        p.setAttribute("isOverlay",
                            "true");
                        Wa ? (pb(b.container, "defaultprevented", O = function(a) {
                            p.parentNode && s.dem.fire(p, "blur", a)
                        }), pb(b.container, "destroy", function() {
                            Q(b, "defaultprevented", O);
                            p.parentNode.removeChild(p)
                        })) : (pb(b.container, "mousedown", O = function(a) {
                            a.srcElement !== p && u && s.dem.fire(p, "blur", a)
                        }), pb(b.container, "destroy", function() {
                            Q(b.container, "mousedown", O);
                            p.parentNode.removeChild(p)
                        }))
                    }
                }), e.showLimitUpdateMenu && (l.push(O = yb({
                    chart: b,
                    basicStyle: f.outCanvasStyle,
                    items: [{
                        text: "Increase Upper Limit",
                        onclick: function() {
                            p.setUpperLimit(g.max +
                                g.tickInterval, !0)
                        }
                    }, {
                        text: "Increase Lower Limit",
                        onclick: function() {
                            p.setLowerLimit(g.min + g.tickInterval, !0)
                        }
                    }, {
                        text: "Decrease Upper Limit",
                        onclick: function() {
                            p.setUpperLimit(g.max - g.tickInterval, !0)
                        }
                    }, {
                        text: "Decrease Lower Limit",
                        onclick: function() {
                            p.setLowerLimit(g.min - g.tickInterval, !0)
                        }
                    }],
                    position: {
                        x: e.spacingLeft,
                        y: p.height - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15)
                    }
                })), a.configureButton = c.add("configureIcon", function(a, b) {
                    return function() {
                        O.visible ? O.hide() : O.show({
                            x: a,
                            y: b + 1
                        })
                    }
                }(), {
                    x: e.spacingLeft,
                    y: p.height - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15),
                    tooltip: "Change Y-Axis Limits"
                })))
            },
            getCollatedData: function() {
                var b = this.chartInstance,
                    d = b.__state,
                    a = b.jsVars,
                    b = this.updatedDataObj || M({}, b.getChartData(C.dataFormats.JSON)),
                    c = a._reflowData,
                    a = b.dataset,
                    e = (c = c && c.hcJSON && c.hcJSON.series) && c.length,
                    f, p, l, g;
                if (void 0 !== d.hasStaleData && !d.hasStaleData && this.updatedDataObj) return this.updatedDataObj;
                if (a && c)
                    for (; e--;)
                        if (p = a[e] && a[e].data, (f = (l = c[e] && c[e].data) && l.length) &&
                            p)
                            for (; f--;)
                                if (g = l[f]) p[f].value = g.y;
                d.hasStaleData = !1;
                return this.updatedDataObj = b
            },
            eiMethods: {
                restoreData: function() {
                    var b = this.jsVars,
                        d = b.fcObj;
                    b._reflowData = {};
                    delete b._reflowClean;
                    C.hcLib.createChart(d, b.container, b.type, void 0, void 0, !1, !0);
                    s.raiseEvent("dataRestored", {}, d, [d.id]);
                    return !0
                },
                submitData: function() {
                    var b = this.jsVars,
                        d = b.fcObj,
                        a = d.__state,
                        c = a._submitAjaxObj || (a._submitAjaxObj = new C.ajax),
                        a = C.dataFormats.JSON,
                        e = C.dataFormats.CSV,
                        f = C.dataFormats.XML,
                        b = b.instanceAPI,
                        p = b.hcJSON.chart,
                        l = p.formAction,
                        g = p.submitFormAsAjax,
                        m, h, k, n, q;
                    p.formDataFormat === a ? (m = a, h = JSON.stringify(b.getCollatedData())) : p.formDataFormat === e ? (m = e, h = b.getCSVString && b.getCSVString(), void 0 === h && (h = C.core.transcodeData(b.getCollatedData(), a, e))) : (m = f, h = C.core.transcodeData(b.getCollatedData(), a, f));
                    C.raiseEvent("beforeDataSubmit", {
                        data: h
                    }, d, void 0, function() {
                        g ? (c.onError = function(a, b, c, e) {
                            s.raiseEvent("dataSubmitError", {
                                    xhrObject: b.xhr,
                                    url: e,
                                    statusText: a,
                                    httpStatus: b.xhr && b.xhr.status ? b.xhr.status : -1,
                                    data: h
                                },
                                d, [d.id, a, b.xhr && b.xhr.status])
                        }, c.onSuccess = function(a, b, e, f) {
                            s.raiseEvent("dataSubmitted", {
                                xhrObject: c,
                                response: a,
                                url: f,
                                data: h
                            }, d, [d.id, a])
                        }, k = {}, k["str" + m.toUpperCase()] = h, c.open && c.abort(), c.post(l, k)) : (n = Ya.document.createElement("span"), n.innerHTML = '<form style="display:none" action="' + l + '" method="' + p.formMethod + '" target="' + p.formTarget + '"> <input type="hidden" name="strXML" value="' + Yc(h) + '"><input type="hidden" name="dataFormat" value="' + m.toUpperCase() + '" /></form>', q = n.removeChild(n.firstChild),
                            Ya.document.body.appendChild(q), q.submit && q.submit(), q.parentNode.removeChild(q), n = q = null)
                    }, function() {
                        C.raiseEvent("dataSubmitCancelled", {
                            data: h
                        }, d)
                    })
                },
                getDataWithId: function() {
                    for (var b = this.jsVars.instanceAPI.getCollatedData(), d = [
                            [B]
                        ], a = b.dataset, b = b.categories && b.categories[0] && b.categories[0].category, c = a && a.length || 0, e = 0, f, p, l, g, m, h; c--;)
                        if (p = a[c])
                            for (d[0][c + 1] = p.id || p.seriesname, g = p.id || c + 1, h = (p = p.data) && p.length || 0, m = 0; m < h; m += 1) {
                                l = m + 1;
                                if (!d[l]) {
                                    for (f = b && b[m + e] || {}; f.vline;) e += 1, f = b[m + e] || {};
                                    f = f.label || f.name || B;
                                    d[l] = [f]
                                }
                                f = d[l];
                                l = p[m].id || l + "_" + g;
                                f[c + 1] = [l, Number(p[m].value)]
                            }
                        return d
                },
                getData: function(b) {
                    var d = this.jsVars.instanceAPI.getCollatedData(),
                        a = [
                            [B]
                        ],
                        c = d.dataset,
                        e = d.categories && d.categories[0] && d.categories[0].category,
                        f = c && c.length || 0,
                        p = 0,
                        l, g, m;
                    if (b) a = /^json$/ig.test(b) ? d : C.core.transcodeData(d, "json", b);
                    else
                        for (; f--;)
                            if (b = c[f])
                                for (a[0][f + 1] = c[f].seriesname, d = (b = c[f] && c[f].data) && b.length || 0, m = 0; m < d; m += 1) {
                                    g = m + 1;
                                    if (!a[g]) {
                                        for (l = e && e[m + p] || {}; l.vline;) p += 1, l = e[m + p] || {};
                                        l =
                                            l.label || l.name || B;
                                        a[g] = [l]
                                    }
                                    g = a[g];
                                    g[f + 1] = Number(b[m].value)
                                }
                            return a
                },
                setYAxisLimits: function(b, d) {
                    var a = this.jsVars.instanceAPI,
                        c = a.hcJSON,
                        e = a.dataObj,
                        f = e && e.chart || {},
                        c = c && c.yAxis && c.yAxis[0] || !1,
                        p = !1;
                    f.animation = !1;
                    if (!c) return !1;
                    void 0 !== b && b > a.highValue && b !== c.max ? (f.yaxismaxvalue = b, p = !0) : (b = a.highValue > c.max ? a.highValue : c.max, f.yaxismaxvalue = b);
                    void 0 !== d && d < a.lowValue && d !== c.min ? (f.yaxisminvalue = d, p = !0) : (d = a.lowValue < c.min ? a.lowValue : c.min, f.yaxisminvalue = d);
                    p && a.updateChartWithData(e);
                    return p
                },
                getUpperLimit: function() {
                    var b = this.jsVars.instanceAPI.hcJSON;
                    return (b = b.yAxis && b.yAxis[0]) ? b.max : void 0
                },
                setUpperLimit: function(b) {
                    return this.jsVars.fcObj.setYAxisLimits(b, void 0)
                },
                getLowerLimit: function() {
                    var b = this.jsVars.instanceAPI.hcJSON;
                    return (b = b.yAxis && b.yAxis[0]) ? b.min : void 0
                },
                setLowerLimit: function(b) {
                    return this.jsVars.fcObj.setYAxisLimits(void 0, b)
                }
            },
            updateChartWithData: function(b) {
                var d = this.chartInstance,
                    a = d.jsVars,
                    c = b && b.chart;
                b = a._reflowData || (a._reflowData = {});
                c = {
                    dataObj: {
                        chart: {
                            yaxisminvalue: g(c.yaxisminvalue),
                            yaxismaxvalue: g(c.yaxismaxvalue),
                            animation: c.animation
                        }
                    }
                };
                M(b, c, !0);
                C.hcLib.createChart(d, a.container, a.type)
            },
            preSeriesAddition: function() {
                var b = this,
                    d = b.hcJSON,
                    a = b.dataObj.chart,
                    c = d.chart;
                b.tooltipSepChar = d[ea].tooltipSepChar;
                c.allowAxisChange = g(a.allowaxischange, 1);
                c.changeDivWithAxis = 1;
                c.snapToDivOnly = g(a.snaptodivonly, 0);
                c.snapToDiv = c.snapToDivOnly ? 1 : g(a.snaptodiv, 1);
                c.snapToDivRelaxation = g(a.snaptodivrelaxation, 10);
                c.doNotSnap = g(a.donotsnap, 0);
                c.doNotSnap && (c.snapToDiv = c.snapToDivOnly = 0);
                c.showRangeError =
                    g(a.showrangeerror, 0);
                g(a.allowaxischange, 1) && (d.callbacks || (d.callbacks = [])).push(function(a) {
                    var c = this,
                        d = arguments,
                        l;
                    pb(a.renderer.container, "destroy", function() {
                        l && (l = clearTimeout(l))
                    });
                    l = setTimeout(function() {
                        b.drawAxisUpdateUI.apply(c, d);
                        l = null
                    }, 1)
                })
            },
            getTooltextCreator: function() {
                var b = arguments;
                return function() {
                    var d = arguments,
                        a = d.length,
                        c, e, f;
                    for (f = 0; f < a; f += 1) void 0 !== (e = d[f]) && void 0 !== (c = b[f]) && (b[f] = "object" === typeof c ? M(c, e) : e);
                    return bb.apply(this, b)
                }
            },
            getPointStub: function(b, d, a, c,
                e, f, p) {
                var l = this.isDual,
                    u = this.dataObj.chart;
                c = c[ea];
                var m = null === d ? d : c.numberFormatter.dataLabels(d, 1 === p ? !0 : !1),
                    r = D(z(h(b.tooltext, e.plottooltext, c.tooltext))),
                    k = c.tooltipSepChar,
                    n = e._sourceDataset;
                d = g(b.allowdrag, n.allowdrag, 1);
                var n = g(b.allownegativedrag, n.allownegativedrag, e.allownegativedrag, 1),
                    q, w, O, F, y = 0,
                    x = 0,
                    $, fa;
                c.showTooltip ? void 0 !== r ? (fa = this.getTooltextCreator(r, [1, 2, 3, 4, 5, 6, 7], {
                        yaxisName: z(l ? p ? u.syaxisname : u.pyaxisname : u.yaxisname),
                        xaxisName: z(u.xaxisname),
                        formattedValue: m,
                        label: a
                    },
                    b, u, e), e = fa(), e === r && (fa = void 0, y = 1)) : null === m ? e = !1 : (c.seriesNameInToolTip && (F = ca(e && e.seriesname)), e = F ? F + k : B, $ = e += a ? a + k : B, c.showPercentInToolTip ? q = !0 : e += m) : e = !1;
                g(b.showvalue, f) ? void 0 !== D(b.displayvalue) ? (O = z(b.displayvalue), x = 1) : c.showPercentValues ? w = !0 : O = m : O = B;
                b = h(b.link);
                return {
                    displayValue: O,
                    categoryLabel: a,
                    toolText: e,
                    link: b,
                    showPercentValues: w,
                    showPercentInToolTip: q,
                    allowDrag: d,
                    allowNegDrag: n,
                    _toolTextStr: $,
                    _isUserValue: x,
                    _isUserTooltip: y,
                    _getTooltext: fa
                }
            }
        };
        t("dragnode", {
            friendlyName: "Dragable Node Chart",
            standaloneInit: !0,
            decimals: 2,
            numdivlines: 0,
            numVDivLines: 0,
            defaultZeroPlaneHighlighted: !1,
            defaultZeroPlaneHidden: !0,
            spaceManager: Ja.spaceManager,
            drawButtons: Ja.drawButtons,
            updateChartWithData: Ja.updateChartWithData,
            creditLabel: !1,
            canvasPaddingModifiers: null,
            defaultSeriesType: "dragnode",
            rendererId: "dragnode",
            tooltipsepchar: " - ",
            showAxisLimitGridLines: 0,
            cleanedData: function(b, d) {
                var a = b && b.hcJSON,
                    c = d && d.hcJSON,
                    e, f, p, l, g, m, h, k, n;
                if (a && c) {
                    if (a.series && c.series && (g = c.series.length))
                        for (k = 0; k < g; k += 1)
                            if (f =
                                c.series[k], e = a.series[k], f.data && (m = f.data.length))
                                for (n = 0; n < m; n += 1) !0 === f.data[n] && e && e.data && e.data[n] && (delete e.data[n], e.data[n] = {
                                    y: null
                                });
                    if (a.connectors && c.connectors && (p = c.connectors.length))
                        for (k = 0; k < p; k += 1)
                            if (f = c.connectors[k], e = a.connectors[k], f.connector && (h = f.connector.length))
                                for (n = 0; n < h; n += 1) !0 === f.connector[n] && e && e.connector && e.connector[n] && (delete e.connector[n], e.connector[n] = {});
                    if (a.dragableLabels && c.dragableLabels && (l = c.dragableLabels.length))
                        for (k = 0; k < l; k += 1) !0 === c.dragableLabels[k] &&
                            a.dragableLabels[k] && (delete a.dragableLabels[k], a.dragableLabels[k] = {})
                }
            },
            eiMethods: M(eb(t.scatterbase.eiMethods, Ja.eiMethods), {
                addNode: function(b) {
                    var d = this.jsVars,
                        a = d.instanceAPI,
                        c = d._reflowData || (d._reflowData = {}),
                        e = a.hcJSON,
                        f = a.numberFormatter,
                        a = h(b.datasetId),
                        p = f.getCleanValue(b.y),
                        f = f.getCleanValue(b.x),
                        l = !1,
                        g = e.series,
                        m = g.length,
                        r = e.xAxis.min,
                        k = e.xAxis.max,
                        n = e.yAxis[0].min,
                        q = e.yAxis[0].max,
                        e = {
                            hcJSON: {
                                series: []
                            }
                        },
                        w = e.hcJSON.series,
                        O;
                    if (void 0 !== a && null !== p && p >= n && p <= q && null !== f && f >= r && f <=
                        k) {
                        for (r = 0; r < m && !l; r += 1) a == g[r].id && (w[r] = {
                            data: []
                        }, l = !0, O = g[r], n = O.data, k = n.length, n.push(n = O._dataParser(b, k, f, p)), w[r].data[k] = n, M(c, e, !0), O = {
                            index: k,
                            dataIndex: k,
                            link: b.link,
                            y: b.y,
                            x: b.x,
                            shape: b.shape,
                            width: b.width,
                            height: b.height,
                            radius: b.radius,
                            sides: b.sides,
                            label: b.name,
                            toolText: b.tooltext,
                            id: b.id,
                            datasetIndex: r,
                            datasetName: O.name,
                            sourceType: "dataplot"
                        });
                        if (l) return gb(d, O, "nodeadded"), C.raiseEvent("nodeadded", O, d.fcObj), !0
                    }
                    return !1
                },
                getNodeAttribute: function(b) {
                    var d = this.jsVars,
                        a = d.instanceAPI,
                        d = d._reflowData || (d._reflowData = {}),
                        d = d.hcJSON && d.hcJSON.series || [],
                        a = a.hcJSON.series,
                        c = a.length,
                        e, f, p, l;
                    if (void 0 !== b)
                        for (e = 0; e < c; e += 1)
                            for (f = a[e], l = f.data, p = l.length, f = 0; f < p; f += 1)
                                if (l[f].id === b) return d[e] && d[e].data && d[e].data[f] ? M(l[f]._options, d[e].data[f]._options, !0) : l[f]._options;
                    return !1
                },
                setNodeAttribute: function(b, d, a) {
                    var c = this.jsVars,
                        e = c.instanceAPI,
                        f = c._reflowData || (c._reflowData = {}),
                        p = e.hcJSON,
                        l = e.numberFormatter,
                        g = p.series,
                        m = g.length,
                        h = p.xAxis.min,
                        k = p.xAxis.max,
                        n = p.yAxis[0].min,
                        q =
                        p.yAxis[0].max,
                        p = {
                            hcJSON: {
                                series: []
                            }
                        },
                        e = p.hcJSON.series,
                        w = f.hcJSON && f.hcJSON.series || [],
                        O, F, y, x;
                    "object" === typeof d && void 0 === a ? x = d : (x = {}, x[d] = a);
                    if (void 0 !== b)
                        for (d = 0; d < m; d += 1)
                            for (O = g[d], F = O.data, y = F.length, a = 0; a < y; a += 1)
                                if (b === F[a].id) return b = F[a], delete x.id, w[d] && w[d].data && w[d].data[a] && w[d].data[a]._options && (x = M(w[d].data[a]._options, x, !0)), x = M(b._options, x, !0), b = l.getCleanValue(x.y), l = l.getCleanValue(x.x), null !== b && b >= n && b <= q && null !== l && l >= h && l <= k ? (e[d] = {
                                        data: []
                                    }, h = O._dataParser(x, a, l, b),
                                    k = {
                                        index: a,
                                        dataIndex: a,
                                        link: x.link,
                                        y: x.y,
                                        x: x.x,
                                        shape: x.shape,
                                        width: x.width,
                                        height: x.height,
                                        radius: x.radius,
                                        sides: x.sides,
                                        label: x.name,
                                        toolText: x.tooltext,
                                        id: x.id,
                                        datasetIndex: d,
                                        datasetName: O.name,
                                        sourceType: "dataplot"
                                    }, e[d].data[a] = h, M(f, p, !0), gb(c, k, "nodeupdated"), C.raiseEvent("nodeupdated", k, c.fcObj), !0) : !1;
                    return !1
                },
                deleteNode: function(b) {
                    if (void 0 !== b) {
                        var d = this.jsVars,
                            a = d.instanceAPI,
                            c = d._reflowClean || (d._reflowClean = {}),
                            e = a.hcJSON.series,
                            f = {
                                hcJSON: {
                                    series: []
                                }
                            },
                            p, l, g, m, h;
                        if (e && (g = e.length))
                            for (m =
                                0; m < g; m += 1)
                                if ((a = e[m]) && (l = a.data) && (p = l.length))
                                    for (h = 0; h < p; h += 1)
                                        if (b === l[h].id) return f.hcJSON.series[m] = {
                                            data: []
                                        }, f.hcJSON.series[m].data[h] = !0, M(c, f, !0), b = l[h], b = {
                                            index: h,
                                            dataIndex: h,
                                            link: b.link,
                                            y: b.y,
                                            x: b.x,
                                            shape: b._options.shape,
                                            width: b._options.width,
                                            height: b._options.height,
                                            radius: b._options.radius,
                                            sides: b._options.sides,
                                            label: b.displayValue,
                                            toolText: b.toolText,
                                            id: b.id,
                                            datasetIndex: m,
                                            datasetName: a.name,
                                            sourceType: "dataplot"
                                        }, gb(d, b, "nodedeleted"), C.raiseEvent("nodedeleted", b, d.fcObj), !0
                    }
                    return !1
                },
                addConnector: function(b) {
                    if ("object" === typeof b) {
                        var d = this.jsVars,
                            a = d.instanceAPI,
                            c = d._reflowData || (d._reflowData = {}),
                            a = a.hcJSON,
                            e = a.connectors && a.connectors[0] || {
                                connector: []
                            },
                            a = e.connector.length,
                            f = {
                                hcJSON: {
                                    connectors: [{
                                        connector: []
                                    }]
                                }
                            };
                        b = e._connectorParser && e._connectorParser(b, a);
                        e = {
                            arrowAtEnd: b.arrowAtEnd,
                            arrowAtStart: b.arrowAtStart,
                            fromNodeId: b.from,
                            id: b.id,
                            label: b.label,
                            link: b.connectorLink,
                            sourceType: "connector",
                            toNodeId: b.to
                        };
                        f.hcJSON.connectors[0].connector[a] = b;
                        M(c, f, !0);
                        gb(d, e, "connectoradded");
                        C.raiseEvent("connectoradded", e, d.fcObj);
                        return !0
                    }
                    return !1
                },
                editConnector: function(b, d, a) {
                    var c = this.jsVars,
                        e = c.instanceAPI,
                        f = c._reflowData || (c._reflowData = {}),
                        e = e.hcJSON,
                        p = e.connectors || (e.connectors = []),
                        l = p.length,
                        e = {
                            hcJSON: {
                                connectors: []
                            }
                        },
                        g = e.hcJSON.connectors,
                        m, h, k, n;
                    "object" === typeof d && void 0 === a ? n = d : (n = {}, n[d] = a);
                    if (void 0 !== b)
                        for (d = 0; d < l; d += 1)
                            if ((h = p[d]) && (m = h.connector))
                                for (k = m.length, a = 0; a < k; a += 1)
                                    if (b === m[a].id) return m = m[a], delete n.id, f.hcJSON && f.hcJSON.connectors && f.hcJSON.connectors[d] &&
                                        f.hcJSON.connectors[d].connector && f.hcJSON.connectors[d].connector[a] && f.hcJSON.connectors[d].connector[a]._options && (n = M(f.hcJSON.connectors[d].connector[a]._options, n, !0)), n = M(m._options, n, !0), b = {
                                            arrowAtEnd: Boolean(n.arrowatend),
                                            arrowAtStart: Boolean(n.arrowatstart),
                                            fromNodeId: n.from,
                                            id: b,
                                            label: n.label,
                                            link: n.link,
                                            sourceType: "connector",
                                            toNodeId: n.to
                                        }, g[d] = {
                                            connector: []
                                        }, m = h._connectorParser(n, a), g[d].connector[a] = m, M(f, e, !0), gb(c, b, "connectorupdated"), C.raiseEvent("connectorupdated", b, c.fcObj), !0;
                    return !1
                },
                deleteConnector: function(b) {
                    if (void 0 !== b) {
                        var d = this.jsVars,
                            a = d.instanceAPI,
                            c = d._reflowClean || (d._reflowClean = {}),
                            e = a.hcJSON.connectors,
                            a = {
                                hcJSON: {
                                    connectors: []
                                }
                            },
                            f, p, l, g, m, h = {};
                        if (e && (g = e.length))
                            for (m = 0; m < g; m += 1)
                                if ((f = e[m]) && (l = f.connector) && (p = l.length))
                                    for (f = 0; f < p; f += 1)
                                        if (b === l[f].id) return b = l[f], h = {
                                                arrowAtEnd: b.arrowAtEnd,
                                                arrowAtStart: b.arrowAtStart,
                                                fromNodeId: b.from,
                                                id: b.id,
                                                label: b.label,
                                                link: b.connectorLink,
                                                sourceType: "connector",
                                                toNodeId: b.to
                                            }, a.hcJSON.connectors[m] = {
                                                connector: []
                                            },
                                            a.hcJSON.connectors[m].connector[f] = !0, M(c, a, !0), gb(d, h, "connectordeleted"), C.raiseEvent("connectordeleted", h, d.fcObj), !0
                    }
                    return !1
                },
                addLabel: function(b) {
                    if (b) {
                        var d = this.jsVars,
                            a = d.instanceAPI,
                            c = d._reflowData || (d._reflowData = {}),
                            e = {
                                hcJSON: {
                                    dragableLabels: []
                                }
                            };
                        e.hcJSON.dragableLabels[(a.hcJSON.dragableLabels || []).length] = b;
                        M(c, e, !0);
                        b = {
                            text: b.text,
                            x: b.x,
                            y: b.y,
                            allowdrag: b.allowdrag,
                            sourceType: "labelnode",
                            link: b.link
                        };
                        gb(d, b, "labeladded");
                        C.raiseEvent("labeladded", b, d.fcObj);
                        return !0
                    }
                    return !1
                },
                deleteLabel: function(b,
                    d) {
                    var a = this.jsVars,
                        c = a.instanceAPI,
                        e = a._reflowClean || (a._reflowClean = {}),
                        f = {
                            hcJSON: {
                                dragableLabels: []
                            }
                        };
                    return b < (c.hcJSON.dragableLabels || []).length ? (f.hcJSON.dragableLabels[b] = !0, M(e, f, !0), gb(a, d, "labeldeleted"), C.raiseEvent("labeldeleted", d, a.fcObj), !0) : !1
                },
                setThreshold: function(b) {
                    var d = this.jsVars.hcObj.connectorsStore || [],
                        a = d.length,
                        c, e;
                    for (e = 0; e < a; e += 1)(c = d[e]) && c.options && (c.options.conStrength < b ? (c.graphic && c.graphic.hide(), c.text && (c.text.hide(), c.text.textBoundWrapper && c.text.textBoundWrapper.hide())) :
                        (c.graphic && c.graphic.show(), c.text && (c.text.show(), c.text.textBoundWrapper && c.text.textBoundWrapper.show())))
                }
            }),
            getCollatedData: function() {
                var b = this.chartInstance,
                    d = b.__state,
                    a = b.jsVars,
                    b = this.updatedDataObj || M({}, b.getChartData(C.dataFormats.JSON)),
                    c = a._reflowData,
                    e = a._reflowClean,
                    a = (b.labels || (b.labels = {
                        label: []
                    }), b.labels.label || (b.labels.label = [])),
                    f = c && c.hcJSON && c.hcJSON.dragableLabels,
                    p = e && e.hcJSON && e.hcJSON.dragableLabels,
                    l = b.connectors,
                    g = c && c.hcJSON && c.hcJSON.connectors,
                    m = e && e.hcJSON &&
                    e.hcJSON.connectors,
                    h = b.dataset,
                    k = c && c.hcJSON && c.hcJSON.series,
                    c = e && e.hcJSON && e.hcJSON.series,
                    e = k && k.length,
                    n, q, w, O;
                if (void 0 !== d.hasStaleData && !d.hasStaleData && this.updatedDataObj) return this.updatedDataObj;
                if (h && k)
                    for (; e--;)
                        if (q = h[e] && h[e].data, (n = (w = k[e] && k[e].data) && w.length) && q)
                            for (; n--;)
                                if (O = w[n]) q[n] ? M(q[n], O._options) : q[n] = O._options;
                if (e = g && g.length)
                    for (b.connectors || (l = b.connectors = [{
                            connector: []
                        }]); e--;)
                        if (k = l[e] && l[e].connector, (n = (q = g[e] && g[e].connector) && q.length) && k)
                            for (; n--;)
                                if (w =
                                    q[n]) k[n] ? M(k[n], w._options) : k[n] = w._options;
                if ((e = f && f.length) && f)
                    for (; e--;) f[e] && (a[e] = f[e]);
                Ob(h, c);
                Ob(l, m);
                Ob(a, p);
                d.hasStaleData = !1;
                return this.updatedDataObj = b
            },
            createHtmlDialog: function(b, d, a, c, e, f) {
                var p = b.paper,
                    l = this.hcJSON[ea].inCanvasStyle,
                    g = b.chartWidth,
                    m = b.chartHeight,
                    h = {
                        color: l.color,
                        textAlign: "center",
                        paddingTop: "1px",
                        border: "1px solid #cccccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        _cursor: "hand",
                        backgroundColor: "#ffffff",
                        zIndex: 21,
                        "-webkit-border-radius": "4px"
                    },
                    k;
                k = p.html("div", {
                    fill: "transparent",
                    width: g,
                    height: m
                }, {
                    fontSize: "10px",
                    lineHeight: "15px",
                    fontFamily: l.fontFamily
                }, b.container);
                k.veil = p.html("div", {
                    fill: "000000",
                    width: g,
                    height: m,
                    opacity: .3
                }, void 0, k);
                k.dialog = p.html("div", {
                    x: (g - d) / 2,
                    y: (m - a) / 2,
                    fill: "efefef",
                    strokeWidth: 1,
                    stroke: "000000",
                    width: d,
                    height: a
                }, {
                    borderRadius: "5px",
                    boxShadow: "1px 1px 3px #000000",
                    "-webkit-border-radius": "5px",
                    "-webkit-box-shadow": "1px 1px 3px #000000",
                    filter: 'progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color="#000000")'
                }, k);
                k.ok = p.html("div", {
                    x: d - 70 - 5,
                    y: a - 23 - 5,
                    width: 65,
                    height: 17,
                    text: "Submit",
                    tabIndex: 1
                }, h, k.dialog).on("click", c);
                k.cancel = p.html("div", {
                    x: d - 140 - 5,
                    y: a - 23 - 5,
                    width: 65,
                    height: 17,
                    text: "Cancel",
                    tabIndex: 2
                }, h, k.dialog).on("click", e);
                k.remove = p.html("div", {
                    x: d - 210 - 5,
                    y: a - 23 - 5,
                    width: 65,
                    height: 17,
                    text: "Delete",
                    tabIndex: 3,
                    visibility: "hidden"
                }, h, k.dialog).on("click", f);
                k.handleKeyPress = function(a) {
                    13 === a.keyCode ? k.ok.trigger(ga ? "touchStart" : "click", a) : 27 === a.keyCode && k.cancel.trigger(ga ? "touchStart" : "click", a)
                };
                k.hide();
                return k
            },
            nodeUpdateUIDefinition: [{
                key: "id",
                text: "Id",
                inputWidth: 60,
                x: 10,
                y: 15
            }, {
                key: "dataset",
                text: "Dataset",
                inputType: "select",
                inputWidth: 110,
                innerHTML: void 0,
                x: 170,
                y: 15
            }, {
                key: "x",
                text: "Value",
                x: 10,
                y: 40,
                inputWidth: 21
            }, {
                key: "y",
                text: ",",
                x: 88,
                y: 40,
                inputWidth: 21,
                labelWidth: 5
            }, {
                text: "(x, y)",
                x: 125,
                y: 40,
                labelWidth: 33,
                noInput: !0
            }, {
                key: "tooltip",
                text: "Tooltip",
                inputWidth: 105,
                x: 170,
                y: 40
            }, {
                key: "label",
                text: "Label",
                inputWidth: 92,
                x: 10,
                y: 65
            }, {
                key: "labelalign",
                text: "Align",
                labelWidth: 70,
                inputWidth: 110,
                inputType: "select",
                innerHTML: '<option></option><option value="top">Top</option><option value="middle">Middle</option><option value="bottom">Bottom</option>',
                x: 145,
                y: 63
            }, {
                key: "color",
                text: "Color",
                x: 10,
                y: 90,
                inputWidth: 60
            }, {
                key: "colorOut",
                innerHTML: "&nbsp;",
                x: 85,
                y: 90,
                inputWidth: 15,
                inputType: "span"
            }, {
                key: "alpha",
                text: "Alpha",
                x: 170,
                y: 90,
                inputWidth: 20
            }, {
                key: "draggable",
                text: "Allow Drag",
                value: !0,
                inputWidth: 20,
                x: 250,
                y: 90,
                labelWidth: 58,
                inputPaddingTop: 3,
                type: "checkbox"
            }, {
                key: "shape",
                text: "Shape",
                inputType: "select",
                inputWidth: 97,
                innerHTML: '<option value="rect">Rectangle</option><option value="circ">Circle</option><option value="poly">Polygon</option>',
                x: 10,
                y: 115
            }, {
                key: "rectHeight",
                text: "Height",
                x: 170,
                y: 115,
                inputWidth: 20
            }, {
                key: "rectWidth",
                text: "Width",
                x: 255,
                y: 115,
                inputWidth: 20
            }, {
                key: "circPolyRadius",
                text: "Radius",
                x: 170,
                y: 115,
                inputWidth: 20
            }, {
                key: "polySides",
                text: "Sides",
                x: 255,
                y: 115,
                inputWidth: 20
            }, {
                key: "link",
                text: "Link",
                x: 10,
                y: 140,
                inputWidth: 92
            }, {
                key: "image",
                text: "Image",
                type: "checkbox",
                inputPaddingTop: 4,
                inputWidth: 20,
                x: 10,
                y: 170
            }, {
                key: "imgUrl",
                text: "URL",
                inputWidth: 105,
                x: 170,
                y: 170
            }, {
                key: "imgWidth",
                text: "Width",
                inputWidth: 20,
                x: 10,
                y: 195
            }, {
                key: "imgHeight",
                text: "Height",
                inputWidth: 20,
                x: 82,
                y: 195
            }, {
                key: "imgAlign",
                text: "Align",
                inputType: "select",
                inputWidth: 75,
                innerHTML: '<option value="top">Top</option><option value="middle">Middle</option><option value="bottom">Bottom</option>',
                x: 170,
                y: 195
            }],
            showNodeUpdateUI: function() {
                var b = function(a) {
                        a = a.cacheUpdateUI;
                        for (var b = a.fields.shape, d = ["rectWidth", "rectHeight", "circPolyRadius", "polySides"], p = d.length, l; p--;) l = d[p], /rect|poly|circ/ig.test(l) && (a.labels[l].hide(), a.fields[l].hide()), (new RegExp(h(b.val(), "rect"), "ig")).test(l) &&
                            (a.labels[l].show(), a.fields[l].show())
                    },
                    d = function(a) {
                        a = a.cacheUpdateUI.fields;
                        var b = tb(a.color.val());
                        b && a.colorOut.css({
                            background: Ab(b)
                        })
                    },
                    a = function(a, b) {
                        var d = a.cacheUpdateUI,
                            p = a.chartHeight,
                            l = d.fields.image.val(),
                            g = b ? 300 : 0,
                            h = ["imgWidth", "imgHeight", "imgAlign", "imgUrl"],
                            r, k, n;
                        r = l ? 250 : 215;
                        d.ok.hide();
                        d.cancel.hide();
                        d.remove.hide();
                        d.error.hide();
                        for (k = h.length; !l && k--;) n = h[k], d.labels[n].hide(), d.fields[n].hide();
                        s.danimate.animate(d.dialog.element, {
                            top: (p - r) / 2,
                            height: r
                        }, g, "linear", function() {
                            for (k =
                                h.length; k-- && l;) n = h[k], d.labels[n].show(), d.fields[n].show();
                            d.ok.attr({
                                y: r - 23 - 5
                            }).show();
                            d.cancel.attr({
                                y: r - 23 - 5
                            }).show();
                            d.remove.attr({
                                y: r - 23 - 5
                            });
                            d.error.attr({
                                y: r - 23 - 5 + 4
                            }).show();
                            d.edit ? d.remove.show() : d.remove.hide()
                        })
                    };
                return function(c, e, f) {
                    var p = this,
                        l = c.cacheUpdateUI,
                        g = c.paper,
                        h = {
                            width: "80px",
                            border: "1px solid #cccccc",
                            fontSize: "10px",
                            lineHeight: "15px",
                            padding: "2px",
                            fontFamily: p.hcJSON[ea].inCanvasStyle.fontFamily
                        },
                        r = 0,
                        k = {
                            textAlign: "right"
                        },
                        n = l && l.fields,
                        q = l && l.labels,
                        w;
                    l || (l = c.cacheUpdateUI =
                        p.createHtmlDialog(c, 350, 215, function() {
                            var a = l && l.fields,
                                b = l.edit,
                                c = p.chartInstance,
                                d = p.hcJSON,
                                e, f, g, k, h, m, n;
                            if (!d) return !1;
                            e = d.xAxis.min;
                            f = d.yAxis[0].min;
                            d = d.series;
                            g = d.length;
                            if (a) {
                                switch (a.shape.val()) {
                                    case "circ":
                                        h = "circle";
                                        break;
                                    case "poly":
                                        h = "polygon";
                                        break;
                                    default:
                                        h = "rectangle"
                                }
                                n = {
                                    x: ca(a.x.val(), e),
                                    y: ca(a.y.val(), f),
                                    id: e = a.id.val(),
                                    datasetId: a.dataset.val(),
                                    name: a.label.val(),
                                    tooltext: a.tooltip.val(),
                                    color: a.color.val(),
                                    alpha: a.alpha.val(),
                                    labelalign: a.labelalign.val(),
                                    allowdrag: a.draggable.val(),
                                    shape: h,
                                    width: a.rectWidth.val(),
                                    height: a.rectHeight.val(),
                                    radius: a.circPolyRadius.val(),
                                    numsides: a.polySides.val(),
                                    imagenode: a.image.val(),
                                    imagewidth: a.imgWidth.val(),
                                    imageheight: a.imgHeight.val(),
                                    imagealign: a.imgAlign.val(),
                                    imageurl: a.imgUrl.val(),
                                    link: a.link.val()
                                };
                                if (void 0 !== e && !b)
                                    for (r = 0; r < g && !k; r += 1)
                                        for (h = d[r].data, m = h.length, f = 0; f < m; f += 1) e === h[f].id && (k = !0);
                                if (k) l.error.attr({
                                    text: "ID already exist."
                                }), a.label.focus();
                                else {
                                    b ? c && c.setNodeAttribute && c.setNodeAttribute(n.id, n) : c && c.addNode && c.addNode(n);
                                    return
                                }
                            }
                            l.enableFields()
                        }, function() {
                            l.hide();
                            l.enableFields();
                            l.error.attr({
                                text: B
                            })
                        }, function() {
                            p.chartInstance.deleteNode && p.chartInstance.deleteNode(l.fields.id.val())
                        }), w = l.dialog, q = l.labels = {}, n = l.fields = {});
                    l.config = e;
                    l.edit = f;
                    l.error || (l.error = g.html("span", {
                        color: "ff0000",
                        x: 30,
                        y: 228
                    }, void 0, w));
                    l.enableFields || (l.enableFields = function() {
                        for (var a in e) e[a] && e[a].disabled && n[a] && n[a].element.removeAttribute("disabled")
                    });
                    mb(this.nodeUpdateUIDefinition, function(f) {
                        var p, r = f.key,
                            x = {},
                            $ = e[r] || {},
                            fa, Ia;
                        !q[r] && (q[r] = g.html("label", {
                            x: f.x,
                            y: f.y,
                            width: f.labelWidth || 45,
                            text: f.text
                        }, k, w));
                        if (!f.noInput) {
                            p = n[r];
                            if (!p) {
                                h.border = "checkbox" == f.type ? B : "1px solid #cccccc";
                                p = n[r] = g.html(f.inputType || "input", {
                                    x: f.labelWidth && f.labelWidth + 5 || 50,
                                    y: -2 + (f.inputPaddingTop || 0),
                                    width: f.inputWidth || 50,
                                    name: r || ""
                                }, h);
                                if ("select" !== f.inputType) p.attr({
                                    type: f.type || "text"
                                }).on("keyup", l.handleKeyPress);
                                p.add(q[r])
                            }
                            X(fa = ca($.innerHTML, f.innerHTML)) && (x.innerHTML = fa);
                            $.disabled && (x.disabled = "disabled");
                            p.attr(x);
                            X(Ia = ca($.value, f.value)) && p.val(Ia);
                            "shape" == r && p.on("change", function() {
                                b(c)
                            });
                            "image" == r && p.on("click", function() {
                                a(c, !0)
                            });
                            "color" == r && p.on("keyup", function() {
                                d(c)
                            })
                        }
                    });
                    d(c);
                    a(c);
                    b(c);
                    c.options.chart.animation ? l.fadeIn("fast") : l.show();
                    l.fields[f ? "label" : "id"].focus()
                }
            }(),
            labelUpdateUIDefinition: [{
                key: "label",
                text: "Label*",
                x: 10,
                y: 15,
                inputWidth: 235
            }, {
                key: "size",
                text: "Size",
                x: 10,
                y: 40
            }, {
                key: "padding",
                text: "Padding",
                x: 10,
                y: 65
            }, {
                key: "x",
                text: "Position",
                x: 120,
                y: 65,
                labelWidth: 70,
                inputWidth: 25
            }, {
                key: "y",
                text: ",",
                x: 225,
                y: 65,
                labelWidth: 10,
                inputWidth: 25
            }, {
                key: "xy",
                text: "(x, y)",
                x: 260,
                y: 65,
                noInput: !0
            }, {
                key: "allowdrag",
                text: "Allow Drag",
                x: 120,
                y: 40,
                inputType: "checkbox",
                inputPaddingTop: 3,
                inputWidth: 15,
                labelWidth: 70,
                val: 1
            }, {
                key: "color",
                text: "Color",
                x: 10,
                y: 90
            }, {
                key: "alpha",
                text: "Alpha",
                x: 145,
                y: 90,
                inputWidth: 30,
                val: "100"
            }, {
                key: "bordercolor",
                text: "Border Color",
                x: 10,
                y: 125,
                labelWidth: 100
            }, {
                key: "bgcolor",
                text: "Background Color",
                x: 10,
                y: 150,
                labelWidth: 100
            }],
            showLabelUpdateUI: function(b, d) {
                var a = this,
                    c = b.paper,
                    e = b.cacheLabelUpdateUI,
                    f = {
                        border: "1px solid #cccccc",
                        fontSize: "10px",
                        lineHeight: "15px",
                        fontFamily: a.hcJSON[ea].inCanvasStyle.fontFamily,
                        padding: "2px"
                    },
                    p = {
                        textAlign: "right"
                    },
                    l = e && e.fields,
                    g = e && e.labels,
                    m, r, k;
                e || (e = b.cacheLabelUpdateUI = a.createHtmlDialog(b, 315, 205, function() {
                    var b = e && e.fields,
                        c;
                    b && (c = {
                            text: b.label.val(),
                            x: b.x.val(),
                            y: b.y.val(),
                            color: b.color.val(),
                            alpha: b.alpha.val(),
                            bgcolor: b.bgcolor.val(),
                            bordercolor: b.bordercolor.val(),
                            fontsize: b.size.val(),
                            allowdrag: b.allowdrag.val(),
                            padding: b.padding.val()
                        },
                        c.text ? a.chartInstance && a.chartInstance.addLabel && a.chartInstance.addLabel(c) : (e.error.attr({
                            text: "Label cannot be blank."
                        }), b.label.focus()))
                }, function() {
                    e.error.attr({
                        text: ""
                    });
                    e.hide()
                }), k = e.dialog, g = e.labels = {}, l = e.fields = {});
                mb(a.labelUpdateUIDefinition, function(a) {
                    var b = a.key;
                    g[b] || (g[b] = c.html("label", {
                        x: a.x,
                        y: a.y,
                        width: a.labelWidth || 45,
                        text: a.text
                    }, p, k));
                    a.noInput || ((m = l[b]) || (m = l[b] = c.html("input", {
                        y: -2 + (a.inputPaddingTop || 0),
                        x: a.labelWidth && a.labelWidth + 5 || 50,
                        width: a.inputWidth || 50,
                        type: a.inputType ||
                            "text",
                        name: b || ""
                    }, f, g[b]).on("keyup", e.handleKeyPress)), void 0 !== (r = h(d[b], a.val)) && m.val(r))
                });
                e.error || (e.error = c.html("span", {
                    color: "ff0000",
                    x: 10,
                    y: 180
                }, void 0, k));
                b.animation ? e.fadeIn("fast") : e.show();
                e.fields.label.focus()
            },
            showLabelDeleteUI: function(b, d) {
                var a = this,
                    c = b.paper,
                    e = b["cache-label-delete-ui"],
                    f = d.data && d.data("data") || {},
                    p = d.data && d.data("eventArgs"),
                    f = f && f.labelNode;
                e || (e = b["cache-label-delete-ui"] = a.createHtmlDialog(b, 250, 100, void 0, function() {
                    e.hide()
                }, function() {
                    a.chartInstance.deleteLabel(f.index,
                        p)
                }), e.message = c.html("span", {
                    x: 10,
                    y: 10,
                    width: 230,
                    height: 80
                }).add(e.dialog), e.ok.hide(), e.remove.translate(175).show());
                e.message.attr({
                    text: 'Would you really like to delete the label: "' + f.text + '"?'
                });
                b.animation ? e.fadeIn("fast") : e.show()
            },
            connectorUpdateUIDefinition: [{
                key: "fromid",
                text: "Connect From",
                inputType: "select",
                x: 10,
                y: 15,
                labelWidth: 80,
                inputWidth: 100
            }, {
                key: "toid",
                text: "Connect To",
                inputType: "select",
                x: 10,
                y: 40,
                labelWidth: 80,
                inputWidth: 100
            }, {
                key: "arratstart",
                text: "Arrow At Start",
                x: 200,
                y: 15,
                type: "checkbox",
                inputPaddingTop: 3,
                labelWidth: 80,
                inputWidth: 15
            }, {
                key: "arratend",
                text: "Arrow At End",
                x: 200,
                y: 40,
                type: "checkbox",
                inputPaddingTop: 3,
                labelWidth: 80,
                inputWidth: 15
            }, {
                key: "label",
                text: "Label",
                x: 10,
                y: 75,
                labelWidth: 40,
                inputWidth: 120
            }, {
                key: "id",
                text: "Node ID",
                x: 190,
                y: 75,
                inputWidth: 55
            }, {
                key: "color",
                text: "Color",
                x: 10,
                y: 100,
                labelWidth: 40,
                inputWidth: 35
            }, {
                key: "alpha",
                text: "Alpha",
                x: 110,
                y: 100,
                inputWidth: 25,
                labelWidth: 35
            }, {
                key: "strength",
                text: "Strength",
                x: 190,
                y: 100,
                inputWidth: 55,
                val: "0.1"
            }, {
                key: "url",
                text: "Link",
                x: 10,
                y: 125,
                labelWidth: 40,
                inputWidth: 120
            }, {
                key: "tooltext",
                text: "Tooltip",
                x: 190,
                y: 125,
                labelWidth: 40,
                inputWidth: 60
            }, {
                key: "dashed",
                text: "Dashed",
                x: 10,
                y: 150,
                type: "checkbox",
                inputPaddingTop: 3,
                inputWidth: 15,
                labelWidth: 40
            }, {
                key: "dashgap",
                text: "Dash Gap",
                x: 85,
                y: 150,
                labelWidth: 60,
                inputWidth: 25
            }, {
                key: "dashlen",
                text: "Dash Length",
                x: 190,
                y: 150,
                labelWidth: 70,
                inputWidth: 30
            }],
            showConnectorUpdateUI: function(b, d, a) {
                var c = this.chartInstance,
                    e = b.paper,
                    f = b.cacheConnectorUpdateUI,
                    p = {
                        border: "1px solid #cccccc",
                        fontSize: "10px",
                        lineHeight: "15px",
                        fontFamily: this.hcJSON[ea].inCanvasStyle.fontFamily,
                        padding: "2px"
                    },
                    l = {
                        textAlign: "right"
                    },
                    g = f && f.fields,
                    m = f && f.labels,
                    r, k, n, q;
                f || (f = b.cacheConnectorUpdateUI = this.createHtmlDialog(b, 315, 215, function() {
                        var b = f && f.fields,
                            d;
                        b && (d = {
                            from: b.fromid.val(),
                            to: b.toid.val(),
                            id: b.id.val(),
                            label: b.label.val(),
                            color: b.color.val(),
                            alpha: b.alpha.val(),
                            link: b.url.val(),
                            tooltext: b.tooltext.val(),
                            strength: b.strength.val(),
                            arrowatstart: b.arratstart.val(),
                            arrowatend: b.arratend.val(),
                            dashed: b.dashed.val(),
                            dashlen: b.dashlen.val(),
                            dashgap: b.dashgap.val()
                        }, d.from ? d.to ? d.from != d.to ? (a ? c.editConnector(d.id, d) : c.addConnector(d), f.enableFields()) : (f.error.attr({
                            text: "Connector cannot start and end at the same node!"
                        }), b.fromid.focus()) : (f.error.attr({
                            text: "Please select a valid connector end."
                        }), b.toid.focus()) : (f.error.attr({
                            text: "Please select a valid connector start."
                        }), b.fromid.focus()))
                    }, function() {
                        f.error.attr({
                            text: ""
                        });
                        f.enableFields();
                        f.hide()
                    }, function() {
                        c.deleteConnector(f.fields.id.val())
                    }), q =
                    f.dialog, m = f.labels = {}, g = f.fields = {});
                f.config = d;
                f.enableFields = function() {
                    for (var a in d) d[a] && d[a].disabled && g[a] && g[a].element.removeAttribute("disabled")
                };
                mb(this.connectorUpdateUIDefinition, function(a) {
                    var b = a.key,
                        c = d[b] || {};
                    m[b] || (m[b] = e.html("label", {
                        x: a.x,
                        y: a.y,
                        width: a.labelWidth || 45,
                        text: a.text
                    }, l, q));
                    if (!a.noInput) {
                        if (!(k = g[b])) {
                            k = g[b] = e.html(a.inputType || "input", {
                                y: -2 + (a.inputPaddingTop || 0),
                                x: a.labelWidth && a.labelWidth + 5 || 50,
                                width: a.inputWidth || 50,
                                name: b || ""
                            }, p);
                            if ("select" !== a.inputType) k.attr({
                                type: a.type ||
                                    "text"
                            }).on("keyup", f.handleKeyPress);
                            k.add(m[b])
                        }(r = h(c.innerHTML, a.innerHTML)) && k.attr({
                            innerHTML: r
                        });
                        void 0 !== (n = h(c.val, a.val)) && k.val(n);
                        c.disabled && k.attr({
                            disabled: "disabled"
                        })
                    }
                });
                f.checkDash = function() {
                    var a = g.dashed && g.dashed.val() ? "show" : "hide";
                    m.dashgap && m.dashgap[a]();
                    g.dashgap && g.dashgap[a]();
                    m.dashlen && m.dashlen[a]();
                    g.dashlen && g.dashlen[a]()
                };
                f.checkDash();
                g.dashed.on("click", f.checkDash);
                f.error || (f.error = e.html("span", {
                    color: "ff0000",
                    x: 10,
                    y: 170
                }, void 0, q));
                f.remove[a ? "show" : "hide"]();
                b.animation ? f.fadeIn("fast") : f.show()
            },
            drawNodeUpdateButtons: function() {
                var b = this,
                    d = b.logic,
                    a = b.options,
                    c = a.chart,
                    e = a.pointStore || {},
                    f = a.series,
                    a = (a = a[ea]) && a.outCanvasStyle || b.outCanvasStyle || {},
                    p = b.menu || (b.menu = []),
                    l = b.toolbar,
                    g = f.length,
                    h = "",
                    r = "",
                    k, n;
                for (n in e) h += '<option value="' + n + '">' + n + "</option>";
                for (n = 0; n < g; n += 1) e = f[n], r += '<option value="' + e.id + '">' + (e.name !== B && void 0 !== e.name && e.name + wa + " " || B) + e.id + "</option>";
                p.push(k = yb({
                    chart: b,
                    basicStyle: a,
                    items: [{
                        text: "Add a Node",
                        onclick: function() {
                            d.showNodeUpdateUI(b, {
                                dataset: {
                                    innerHTML: r
                                }
                            })
                        }
                    }, {
                        text: "Add a Label",
                        onclick: function() {
                            d.showLabelUpdateUI(b, {})
                        }
                    }, {
                        text: "Add a Connector",
                        onclick: function() {
                            d.showConnectorUpdateUI(b, {
                                fromid: {
                                    innerHTML: h
                                },
                                toid: {
                                    innerHTML: h
                                }
                            })
                        }
                    }],
                    position: {
                        x: c.spacingLeft,
                        y: b.chartHeight - c.spacingBottom + (c.showFormBtn || c.showRestoreBtn ? 10 : -15)
                    }
                }));
                b.elements.configureButton = l.add("configureIcon", function(a, b) {
                    return function() {
                        k.visible ? k.hide() : k.show({
                            x: a,
                            y: b + 1
                        })
                    }
                }(), {
                    x: c.spacingLeft,
                    y: b.chartHeight - c.spacingBottom + (c.showFormBtn ||
                        c.showRestoreBtn ? 10 : -15),
                    tooltip: "Add or edit items"
                })
            },
            postSeriesAddition: function() {
                var b = this.hcJSON,
                    d = this.dataObj.chart,
                    a = this.base.postSeriesAddition && this.base.postSeriesAddition.apply(this, arguments);
                b.legend.enabled = "1" == d.showlegend ? !0 : !1;
                (b.chart.viewMode = g(d.viewmode, 0)) || (b.callbacks || (b.callbacks = [])).push(this.drawNodeUpdateButtons);
                return a
            },
            pointHoverOptions: function(b, d, a, c) {
                var e = g(b.showhovereffect, d.showhovereffect, a.plothovereffect, a.showhovereffect),
                    f = {},
                    p = !!h(b.hovercolor,
                        d.hovercolor, a.plotfillhovercolor, b.hoveralpha, d.hoveralpha, a.plotfillhoveralpha, b.borderhovercolor, d.borderhovercolor, a.plotborderhovercolor, b.borderhoveralpha, d.borderhoveralpha, a.plotborderhoveralpha, b.borderhoverthickness, d.borderhoverthickness, a.plotborderhoverthickness, b.hoverheight, d.hoverheight, a.plothoverheight, b.hoverwidth, d.hoverwidth, a.plothoverwidth, b.hoverradius, d.hoverradius, a.plothoverradius, e),
                    l = !1;
                if (void 0 === e && p || e) l = !0, e = h(b.hovercolor, d.hovercolor, a.plotfillhovercolor, Ka(c.color,
                    70)), p = h(b.hoveralpha, d.hoveralpha, a.plotfillhoveralpha, c.alpha), f = {
                    stroke: A(h(b.borderhovercolor, d.borderhovercolor, a.plotborderhovercolor, c.borderColor), g(b.borderhoveralpha, d.borderhoveralpha, a.plotborderhoveralpha, p, c.borderAlpha)),
                    "stroke-width": g(b.borderhoverthickness, d.borderhoverthickness, a.plotborderhoverthickness, c.borderThickness),
                    height: g(b.hoverheight, d.hoverheight, a.plothoverheight, c.height),
                    width: g(b.hoverwidth, d.hoverwidth, a.plothoverwidth, c.width),
                    r: g(b.hoverradius, d.hoverradius,
                        a.plothoverradius, c.radius)
                }, b = c.use3D ? this.getPointColor(aa(h(b.hovercolor, d.hovercolor, a.plotfillhovercolor, Ka(c.color, 70))), h(b.hoveralpha, d.hoveralpha, a.plotfillhoveralpha, c.alpha), c.shapeType) : A(e, p), f.fill = ka(b);
                return {
                    enabled: l,
                    rolloverProperties: f
                }
            },
            point: function(b, d, a, c, e, f, p) {
                var l = this;
                b = g(c.ignoreemptydatasets, 0);
                var u = l.numberFormatter,
                    m = (f = a.data) && f.length,
                    r = g(a.showvalues, e[ea].showValues),
                    k = g(c.useroundedges),
                    n = !1,
                    q = l.colorManager,
                    w, O, F, y, x, $, fa, Ia, s, G, t, db, K, z;
                d.zIndex = 1;
                d.name =
                    D(a.seriesname);
                $ = d.id = h(a.id, p);
                if (b && !a.data) return d.showInLegend = !1, d;
                if (0 === g(a.includeinlegend) || void 0 === d.name) d.showInLegend = !1;
                O = h(c.plotfillalpha, "100");
                F = g(c.showplotborder, 1);
                p = aa(h(c.plotbordercolor, "666666"));
                w = g(c.plotborderthickness, k ? 2 : 1);
                y = h(c.plotborderalpha, c.plotfillalpha, k ? "35" : "95");
                x = Boolean(g(c.use3dlighting, c.is3d, k ? 1 : 0));
                fa = aa(h(a.color, q.getPlotColor()));
                Ia = h(a.plotfillalpha, a.nodeFillAlpha, a.alpha, O);
                k = Boolean(g(a.showplotborder, F));
                s = aa(h(a.plotbordercolor, a.nodebordercolor,
                    p));
                G = g(a.plotborderthickness, a.nodeborderthickness, w);
                t = k ? h(a.plotborderalpha, a.nodeborderalpha, a.alpha, y) : "0";
                db = Boolean(g(a.allowdrag, 1));
                d.marker = {
                    enabled: !0,
                    fillColor: A(fa, Ia),
                    lineColor: {
                        FCcolor: {
                            color: s,
                            alpha: t
                        }
                    },
                    lineWidth: G,
                    symbol: "poly_4"
                };
                y = d._dataParser = function(b, d, f, p) {
                    d = h(b.id, $ + "_" + d);
                    var k = Boolean(g(b.allowdrag, db)),
                        m = D(b.shape, "rectangle").toLowerCase(),
                        n = D(b.height, 10),
                        q = D(b.width, 10),
                        w = D(b.radius, 10),
                        y = D(b.numsides, 4),
                        F = aa(h(b.color, fa)),
                        O = h(b.alpha, Ia),
                        v = D(b.imageurl),
                        W = Boolean(g(b.imagenode));
                    switch (m) {
                        case "circle":
                            z = 0;
                            break;
                        case "polygon":
                            z = 2;
                            m = da(y);
                            break;
                        default:
                            z = 1
                    }
                    K = x ? l.getPointColor(F, O, z) : A(F, O);
                    y = l.pointHoverOptions(b, a, c, {
                        plotType: "funnel",
                        shapeType: z,
                        use3D: x,
                        height: n,
                        width: q,
                        radius: w,
                        color: F,
                        alpha: O,
                        borderColor: s,
                        borderAlpha: t,
                        borderThickness: G
                    });
                    return M(l.getPointStub(b, p, u.xAxis(f), e, a, r), {
                        hoverEffects: y,
                        _options: b,
                        y: p,
                        x: f,
                        id: d,
                        imageNode: W,
                        imageURL: v,
                        imageAlign: D(b.imagealign, B).toLowerCase(),
                        imageWidth: D(b.imagewidth),
                        imageHeight: D(b.imageheight),
                        labelAlign: h(b.labelalign,
                            W && X(v) ? La : "middle"),
                        allowDrag: k,
                        marker: {
                            enabled: !0,
                            fillColor: K,
                            lineColor: {
                                FCcolor: {
                                    color: s,
                                    alpha: t
                                }
                            },
                            lineWidth: G,
                            radius: w,
                            height: n,
                            width: q,
                            symbol: m
                        },
                        tooltipConstraint: l.tooltipConstraint
                    })
                };
                for (p = 0; p < m; p += 1)
                    if (w = f[p]) k = u.getCleanValue(w.y), q = u.getCleanValue(w.x), null === k ? d.data.push({
                        _options: w,
                        y: null
                    }) : (n = !0, d.data.push(y(w, p, q, k)), this.pointValueWatcher(e, k, q));
                b && !n && (d.showInLegend = !1);
                return d
            },
            getPointColor: function(b, d, a) {
                var c;
                b = aa(b);
                d = Ca(d);
                c = Ka(b, 80);
                b = hc(b, 65);
                d = {
                    FCcolor: {
                        gradientUnits: "objectBoundingBox",
                        color: c + "," + b,
                        alpha: d + "," + d,
                        ratio: Nb
                    }
                };
                a ? d.FCcolor.angle = 1 === a ? 0 : 180 : (d.FCcolor.cx = .4, d.FCcolor.cy = .4, d.FCcolor.r = "50%", d.FCcolor.radialGradient = !0);
                return d
            },
            getPointStub: function(b, d, a, c, e) {
                var f = this.dataObj.chart,
                    p = c[ea],
                    l = null === d ? d : p.numberFormatter.dataLabels(d),
                    g = D(z(h(b.tooltext, e.plottooltext, p.tooltext))),
                    m = this.tooltipSepChar = p.tooltipSepChar,
                    r = h(b.label, b.name);
                d = z(r);
                var k;
                c = B;
                var n = !1;
                p.showTooltip ? void 0 !== g ? (n = !0, e = bb(g, [3, 4, 5, 6, 8, 9, 10, 11], {
                    yaxisName: z(f.yaxisname),
                    xaxisName: z(f.xaxisname),
                    yDataValue: l,
                    xDataValue: a,
                    label: d
                }, b, f, e)) : void 0 !== r ? (e = d, n = !0) : null === l ? e = !1 : (p.seriesNameInToolTip && (k = ca(e && e.seriesname)), e = c = k ? k + m : B, e += a ? a + m : B, e += l) : e = !1;
                b = h(b.link);
                return {
                    displayValue: d,
                    toolText: e,
                    link: b,
                    _toolTextStr: c,
                    _isUserTooltip: n
                }
            },
            connector: function(b, d, a, c, e) {
                var f = e[ea],
                    p = f.smartLabel;
                e = (b = a.connector) && b.length;
                var l, u, m, r, k, n, q, w, O, F, y, x = D(z(h(a.connectortooltext, c.connectortooltext))),
                    $ = "$fromLabel" + f.tooltipSepChar + "$toLabel";
                l = g(a.stdthickness, 1);
                u = aa(h(a.color, "FF5904"));
                m =
                    h(a.alpha, "100");
                r = g(a.dashgap, 5);
                k = g(a.dashlen, 5);
                n = Boolean(g(a.dashed, 0));
                q = Boolean(g(a.arrowatstart, 1));
                w = Boolean(g(a.arrowatend, 1));
                O = g(a.strength, 1);
                c = d.connector;
                F = d._connectorParser = function(a, b) {
                    var c = z(h(a.label, a.name)),
                        d = h(a.alpha, m),
                        d = {
                            FCcolor: {
                                color: aa(h(a.color, u)),
                                alpha: d
                            }
                        },
                        e = p.getOriSize(c),
                        F = D(z(h(a.tooltext, x)));
                    y = f.showTooltip ? h(F, c ? "$label" : $) : !1;
                    return {
                        _options: a,
                        id: h(a.id, b).toString(),
                        from: h(a.from, B),
                        to: h(a.to, B),
                        label: c,
                        toolText: y,
                        customToolText: F,
                        color: d,
                        dashStyle: Boolean(g(a.dashed,
                            n)) ? Fa(g(a.dashlen, k), g(a.dashgap, r), l) : void 0,
                        arrowAtStart: Boolean(g(a.arrowatstart, q)),
                        arrowAtEnd: Boolean(g(a.arrowatend, w)),
                        conStrength: g(a.strength, O),
                        connectorLink: D(a.link),
                        stdThickness: l,
                        labelWidth: e.widht,
                        labelHeight: e.height
                    }
                };
                for (a = 0; a < e; a += 1) c.push(F(b[a], a));
                return d
            },
            series: function(b, d, a) {
                var c = d[ea],
                    e = [],
                    f, p, l, u;
                d.legend.enabled = Boolean(g(b.chart.showlegend, 1));
                if (b.dataset && 0 < (p = b.dataset.length)) {
                    this.categoryAdder(b, d);
                    c.x.requiredAutoNumericLabels = !1;
                    if (b.connectors && (f = b.connectors.length))
                        for (u =
                            0, l = f; u < l; u += 1) f = {
                            connector: []
                        }, e.push(this.connector(a, f, b.connectors[u], b.chart, d, c.oriCatTmp.length, u));
                    else f = {
                        connector: []
                    }, e.push(this.connector(a, f, {}, b.chart, d, c.oriCatTmp.length, u));
                    for (u = 0; u < p; u += 1) f = {
                        hoverEffects: this.parseSeriesHoverOptions(b, d, b.dataset[u], a),
                        data: []
                    }, f = this.point(a, f, b.dataset[u], b.chart, d, c.oriCatTmp.length, u), f instanceof Array ? d.series = d.series.concat(f) : d.series.push(f);
                    d.connectors = e;
                    b.labels && b.labels.label && 0 < b.labels.label.length && (d.dragableLabels = b.labels.label);
                    b.chart.showyaxisvalue = h(b.chart.showyaxisvalue, 0);
                    this.configureAxis(d, b);
                    b.trendlines && Yb(b.trendlines, d.yAxis, c, !1, this.isBar)
                }
            }
        }, t.scatterbase);
        Ea = function(b, d, a, c, e, f) {
            var p = f.logic,
                l = f.options.chart,
                u, m, r = d[b.from],
                k = d[b.to],
                n = {
                    sourceType: "connector"
                },
                q = b && b._options,
                w = p.numberFormatter,
                O, F, y, x, $;
            this.renderer = c;
            this.connectorsGroup = e;
            this.pointStore = d;
            this.options = b;
            this.style = a || {};
            r && k && (this.fromPointObj = r, this.toPointObj = k, this.fromX = O = r._xPos, this.fromY = F = r._yPos, this.toX = y = k._xPos, this.toY =
                x = k._yPos, this.arrowAtStart = n.arrowAtStart = b.arrowAtStart, this.arrowAtEnd = n.arrowAtEnd = b.arrowAtEnd, this.strokeWidth = d = b.conStrength * b.stdThickness, this.textBgColor = m = (this.color = u = b.color) && u.FCcolor && u.FCcolor.color, this.label = n.label = $ = b.label, w = bb(b.toolText, [3, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92], {
                    label: b.label,
                    fromXValue: w.dataLabels(r.x),
                    fromYValue: w.dataLabels(r.y),
                    fromXDataValue: r.x,
                    fromYDataValue: r.y,
                    fromLabel: h(r.displayValue, r.id),
                    toXValue: w.dataLabels(k.x),
                    toYValue: w.dataLabels(k.y),
                    toXDataValue: k.x,
                    toYDataValue: k.y,
                    toLabel: h(k.displayValue, k.id)
                }), this.link = n.link = q && q.link, n.id = b.id, n.fromNodeId = r.id, n.toNodeId = k.id, r._config && r._config.startConnectors && r._config.startConnectors.push(this), k._config && k._config.endConnectors && k._config.endConnectors.push(this), r = function() {
                    var a = this,
                        c = b._options || {};
                    a._longpressactive = clearTimeout(a._longpressactive);
                    a.data("fire_click_event", 1);
                    a._longpressactive = setTimeout(function() {
                        a.data("fire_click_event", 0);
                        a.data("viewMode") || p.showConnectorUpdateUI(f, {
                            fromid: {
                                val: c.from,
                                innerHTML: "<option>" + c.from + "</option>",
                                disabled: !0
                            },
                            toid: {
                                val: c.to,
                                innerHTML: "<option>" + c.to + "</option>",
                                disabled: !0
                            },
                            arratstart: {
                                val: Boolean(g(c.arrowatstart, 1))
                            },
                            arratend: {
                                val: Boolean(g(c.arrowatend, 1))
                            },
                            dashed: {
                                val: g(c.dashed)
                            },
                            dashgap: {
                                val: c.dashgap
                            },
                            dashlen: {
                                val: c.dashlen
                            },
                            label: {
                                val: c.label
                            },
                            tooltext: {
                                val: c.tooltext
                            },
                            id: {
                                val: b.id,
                                disabled: !0
                            },
                            strength: {
                                val: c.strength
                            },
                            alpha: {
                                val: c.alpha
                            },
                            color: {
                                val: c.color
                            }
                        }, !0)
                    }, 1E3)
                }, this.graphic = c.path(this.getlinePath(), e).attr({
                    "stroke-width": d,
                    ishot: !0,
                    "stroke-dasharray": b.dashStyle,
                    cursor: this.link ? "pointer" : "",
                    stroke: ka(u)
                }).mousedown(r).mousemove(function() {
                    this.data("fire_click_event", 0);
                    cb.call(this)
                }).mouseup(function(a) {
                    cb.call(this);
                    ya.call(this, f, a, "ConnectorClick")
                }).hover(function(a) {
                    ya.call(this, f, a, "ConnectorRollover")
                }, function(a) {
                    ya.call(this, f, a, "ConnectorRollout")
                }).tooltip(w).data("eventArgs", n).data("viewMode", l.viewMode), $ && (this.text = c.text(), e.appendChild(this.text), this.text.css(a.style).attr({
                    text: $,
                    x: (O + y) / 2,
                    y: (F +
                        x) / 2,
                    fill: a.color,
                    ishot: !0,
                    direction: l.textDirection,
                    cursor: this.link ? "pointer" : "",
                    "text-bound": [h(a.backgroundColor, m), h(a.borderColor, m), 1, "2"]
                }).tooltip(w).mousedown(r).mousemove(function() {
                    this.data("fire_click_event", 0);
                    cb.call(this)
                }).hover(function(a) {
                    ya.call(this, f, a, "ConnectorRollover")
                }, function(a) {
                    ya.call(this, f, a, "ConnectorRollout")
                }).mouseup(function(a) {
                    cb.call(this);
                    ya.call(this, f, a, "ConnectorClick")
                }).tooltip(w).data("eventArgs", n).data("viewMode", f.options.chart.viewMode)))
        };
        Ea.prototype = {
            updateFromPos: function(b, d) {
                this.fromX = b;
                this.fromY = d;
                this.graphic && this.graphic.animate({
                    path: this.getlinePath()
                });
                this.text && this.text.animate({
                    x: (this.fromX + this.toX) / 2,
                    y: (this.fromY + this.toY) / 2
                })
            },
            updateToPos: function(b, d) {
                this.toX = b;
                this.toY = d;
                this.graphic && this.graphic.animate({
                    path: this.getlinePath()
                });
                this.text && this.text.animate({
                    x: (this.fromX + this.toX) / 2,
                    y: (this.fromY + this.toY) / 2
                })
            },
            getlinePath: function() {
                var b = this.fromPointObj,
                    d = this.toPointObj,
                    a = this.fromX,
                    c = this.fromY,
                    e = this.toX,
                    f =
                    this.toY,
                    p = ["M", a, c];
                this.arrowAtStart && (b = b._config, p = b.shapeType === ic ? p.concat(jb(a, c, e, f, b.shapeArg.width, b.shapeArg.height)) : p.concat(jb(a, c, e, f, b.shapeArg.radius)));
                this.arrowAtEnd && (b = d._config, p = b.shapeType === ic ? p.concat(jb(e, f, a, c, b.shapeArg.width, b.shapeArg.height)) : p.concat(jb(e, f, a, c, b.shapeArg.radius)));
                p.push("L", e, f);
                return p
            }
        };
        Ea.prototype.constructor = Ea;
        sa = {
            mouseDown: function(b) {
                delete b.data.point.dragActive
            },
            click: function(b) {
                return !b.data.point.dragActive
            },
            dragHandler: function(b) {
                var d =
                    b.data,
                    a = b.type,
                    c = d.point,
                    e = d.series,
                    f = e.chart || e,
                    p = f.tooltip,
                    l = ga && Na(b) || Eb,
                    f = f.options.instanceAPI;
                switch (a) {
                    case "dragstart":
                        p.block(!0);
                        d.dragStartY = b.pageY || l.pageY || 0;
                        d.dragStartX = b.pageX || l.pageX || 0;
                        d.startValue = c.y;
                        d.startXValue = c.x;
                        c.dragActive = !0;
                        e.dragStartHandler && e.dragStartHandler(d);
                        break;
                    case "dragend":
                        p.block(!1);
                        e.repositionItems(d, d.changeX ? (b.pageX || l.pageX || 0) - d.dragStartX : 0, d.changeY ? (b.pageY || l.pageY || 0) - d.dragStartY : 0, !0);
                        a = {
                            dataIndex: c.index + 1,
                            datasetIndex: e.index + 1,
                            startValue: d.startValue,
                            endValue: c.y,
                            datasetName: e.name
                        };
                        b = [f.chartInstance.id, a.dataIndex, a.datasetIndex, a.datasetName, a.startValue, a.endValue];
                        d.changeX && (a.startYValue = d.startValue, a.endYValue = c.y, a.startXValue = d.startXValue, a.endXValue = c.x, b.push(d.startXValue, c.x), delete a.startValue, delete a.endValue);
                        s.raiseEvent("chartupdated", a, f.chartInstance, b);
                        delete d.dragStartY;
                        delete d.dragStartX;
                        delete d.startValue;
                        delete d.startXValue;
                        break;
                    default:
                        e.repositionItems(d, d.changeX ? (b.pageX || l.pageX || 0) - d.dragStartX : 0, d.changeY ?
                            (b.pageY || l.pageY || 0) - d.dragStartY : 0)
                }
            },
            dragLabelHandler: function(b) {
                var d = b.data,
                    a = b.type,
                    c = d.element,
                    e = d.tracker,
                    f = d.toolTip,
                    p = ga && Na(b) || Eb,
                    l = d.series,
                    g, h, r;
                "dragstart" === a ? (f.block(!0), d.dragStartY = b.pageY || p.pageY || 0, d.dragStartX = b.pageX || p.pageX || 0) : (g = d.x + (b.pageX || p.pageX || 0) - d.dragStartX, r = g - d.leftDistance, r + d.width > d.plotWidth && (r = d.plotWidth - d.width), 0 > r && (r = 0), g = r + d.leftDistance, h = d.y + (b.pageY || p.pageY || 0) - d.dragStartY, b = h - d.topDistance, b + d.height > d.plotHeight && (b = d.plotHeight - d.height),
                    0 > b && (b = 0), h = b + d.topDistance, "dragend" === a ? (f.block(!1), d.x = g, d.y = h, delete d.dragStartY, delete d.dragStartX) : (c.attr({
                        x: g,
                        y: h
                    }).textBound(), e.attr({
                        x: r,
                        y: b
                    })));
                "dragend" == a && (a = {
                    hcJSON: {
                        dragableLabels: []
                    }
                }, a.hcJSON.dragableLabels[d.index] = {
                    y: l.yAxis.translate(l.chart.plotHeight - h + d.yAdjustment, 1),
                    x: l.xAxis.translate(g, 1)
                }, M(l.chart.options.instanceAPI.chartInstance.jsVars._reflowData, a, !0))
            },
            pointUpdate: function(b, d, a) {
                b._isUserTooltip || b.toolText === B || b._getTooltext ? b._getTooltext && (b.toolText = b._getTooltext(void 0,
                    void 0, {
                        formattedValue: d
                    }, {
                        value: a
                    })) : b.toolText = b._toolTextStr + d;
                b._isUserValue || b.displayValue === B || (b.displayValue = d)
            },
            snapPoint: function(b, d, a) {
                var c = b.options.chart,
                    e = c.snapToDiv,
                    f = c.snapToDivOnly;
                b = b._yAxisPlotLines;
                for (var p = S(b[1] - b[0]), c = f ? .5 * p : c.snapToDivRelaxation, p = d.lastSnap, g = 1, h = b.length, m; h--;)
                    if (m = S(b[h] - a), e && m < c) {
                        p !== h && (d.lastSnap = f ? void 0 : h, a = b[h]);
                        g = 0;
                        break
                    }
                g && (d.lastSnap = void 0);
                return a
            },
            setMinMaxValue: function(b) {
                var d = b.options.series;
                b = b.logic;
                var a = 0,
                    c = Infinity,
                    e = -Infinity,
                    f = b.chartInstance.jsVars._reflowData,
                    p, g, h, m, r;
                r = 0;
                for (p = d.length; r < p; r += 1)
                    for (h = d[r] && d[r].data, a = 0, m = h.length; a < m; a += 1) g = h[a].y, null !== g && (e = e > g ? e : g, c = c < g ? c : g);
                b.highValue = e;
                b.lowValue = c;
                f.postHCJSONCreation = function() {
                    var a = this.hcJSON[ea][0];
                    a.min = c;
                    a.max = e
                }
            },
            setSelectBoxValues: function(b, d) {
                var a = d.xAxis[0],
                    c = d.yAxis[0],
                    e = d.plotHeight;
                b.startX = a.translate(b.left, 1);
                b.endX = a.translate(b.left + b.width, 1);
                b.startY = c.translate(e - b.top, 1);
                b.endY = c.translate(e - (b.top + b.height), 1)
            }
        };
        t("dragarea", eb({
            friendlyName: "Dragable Area Chart",
            standaloneInit: !0,
            creditLabel: !1,
            rendererId: "dragarea",
            defaultSeriesType: "area",
            decimals: 2,
            anchorAlpha: "100",
            eiMethods: t.msareabase.eiMethods
        }, Ja), t.msareabase);
        t("dragline", eb({
            friendlyName: "Dragable Line Chart",
            standaloneInit: !0,
            creditLabel: !1,
            decimals: 2,
            defaultSeriesType: "line",
            rendererId: "dragline",
            eiMethods: t.mslinebase.eiMethods
        }, Ja), t.mslinebase);
        t("dragcolumn2d", eb({
            friendlyName: "Dragable Column Chart",
            standaloneInit: !0,
            creditLabel: !1,
            decimals: 2,
            defaultSeriesType: "column",
            rendererId: "dragcolumn2d",
            eiMethods: t.mscolumn2dbase.eiMethods
        }, Ja), t.mscolumn2dbase);
        t("selectscatter", {
            friendlyName: "Dragable Scatter Chart",
            isXY: !0,
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "scatter",
            defaultZeroPlaneHighlighted: !1,
            spaceManager: Ja.spaceManager,
            drawButtons: Ja.drawButtons,
            updateChartWithData: Ja.updateChartWithData,
            eiMethods: eb(eb(eb({}, t.scatterbase.eiMethods), Ja.eiMethods), {
                getData: function(b) {
                    var d = this.jsVars.instanceAPI,
                        a = d.getCollatedData(),
                        c = [],
                        e = a.dataset,
                        f = e && e.length || 0,
                        p = 0,
                        g = 0;
                    if (b) c = /^json$/ig.test(b) ?
                        a : /^csv$/ig.test(b) ? d.getCSVString() : C.core.transcodeData(a, "json", b);
                    else
                        for (; p < f; p += 1)
                            if (d = e[p]) {
                                for ((a = b = (d = e[p] && e[p].data) && d.length || 0) && (c[g] || (c[g] = [D(e[p].id, "null")])); a--;) c[g][a + 1] = D(d[a].id, "null");
                                b && (g += 1)
                            } return c
                }
            }),
            getCSVString: function() {
                for (var b = this.chartInstance.getData(), d = b.length; d--;) b[d] = b[d].join(",");
                return b.join("|")
            },
            getCollatedData: function() {
                for (var b = this.chartInstance, d = b.jsVars.hcObj._selectEleArr, a = d && d.length, b = M({}, b.getChartData(C.dataFormats.JSON)), c = b.dataset,
                        e, f, p, g, h, m, r, k, n, q = []; a--;)
                    if (e = d[a])
                        for (m = e.startX, r = e.endX, k = e.startY, n = e.endY, g = c.length; g--;)
                            for (q[g] || (q[g] = {
                                    data: []
                                }), h = (p = c[g].data) && p.length; h--;) f = p[h], e = f.x, f = f.y, e > m && e < r && f < k && f > n && (q[g].data[h] = !0);
                for (g = c.length; g--;)
                    for (h = (p = c[g].data) && p.length; h--;) q[g] && q[g].data[h] || p.splice(h, 1);
                return this.updatedDataObj = b
            },
            createSelectionBox: function(b) {
                var d = b.chart,
                    a = d.paper,
                    c = d.options.chart,
                    e = d.yAxis && d.yAxis[0],
                    f = d.xAxis && d.xAxis[0],
                    g = b.selectionLeft,
                    l = b.selectionTop,
                    h = b.selectionWidth;
                b = b.selectionHeight;
                var m = g + h,
                    r = l + b,
                    k = 15 < h && 15 < b,
                    n = {
                        resizeEleRadius: 15,
                        canvasTop: d.canvasTop,
                        canvasRight: d.canvasLeft + d.canvasWidth,
                        canvasLeft: d.canvasLeft,
                        canvasBottom: d.canvasTop + d.canvasHeight
                    },
                    q = d.layers.tracker,
                    w = d._selectEleArr || (d._selectEleArr = []);
                n.index = w.length;
                n.id = "SELECT_" + n.index;
                n.selectBoxG = q = a.group("selection-box", q).toFront();
                n.selectBoxTracker = a.rect(g, l, h, b, q).attr({
                    "stroke-width": 1,
                    stroke: ka(c.selectBorderColor),
                    ishot: !0,
                    fill: c.selectFillColor
                }).css({
                    cursor: "move"
                });
                n.selectBoxTracker.data("config", {
                    position: 6,
                    selectEleObj: n,
                    xChange: !0,
                    yChange: !0
                });
                n.topTracker = a.rect(g, l - 6, h, 12, q).attr({
                    "stroke-width": 0,
                    ishot: !0,
                    fill: ua
                }).css("cursor", Wa && "ns-resize" || "n-resize");
                n.topTracker.data("config", {
                    position: 1,
                    selectEleObj: n,
                    yChange: !0
                });
                n.rightTracker = a.rect(g + h - 6, l, 12, b, q).attr({
                    "stroke-width": 0,
                    ishot: !0,
                    fill: ua
                }).css("cursor", Wa && "ew-resize" || "w-resize");
                n.rightTracker.data("config", {
                    position: 2,
                    selectEleObj: n,
                    xChange: !0
                });
                n.bottomTracker = a.rect(g, l + b - 6, h, 12, q).attr({
                    "stroke-width": 0,
                    ishot: !0,
                    fill: ua
                }).css("cursor",
                    Wa && "ns-resize" || "n-resize");
                n.bottomTracker.data("config", {
                    position: 3,
                    selectEleObj: n,
                    yChange: !0
                });
                n.leftTracker = a.rect(g - 6, l, 12, b, q).attr({
                    "stroke-width": 0,
                    ishot: !0,
                    fill: ua
                }).css("cursor", Wa && "ew-resize" || "e-resize");
                n.leftTracker.data("config", {
                    position: 4,
                    selectEleObj: n,
                    xChange: !0
                });
                n.cornerInnerSymbol = a.symbol("resizeIcon", 0, 0, 15, q).attr({
                    transform: "t" + m + "," + r,
                    "stroke-width": 1,
                    visibility: k ? zb : "hidden",
                    ishot: !0,
                    stroke: "#999999"
                });
                n.cornerOuterSymbol = a.symbol("resizeIcon", 0, 0, -12, q).attr({
                    transform: "t" +
                        m + "," + r,
                    strokeWidth: 1,
                    visibility: k ? "hidden" : zb,
                    ishot: !0,
                    stroke: "#777777"
                });
                n.resizeTracker = a.circle(m, r, 12, q).attr({
                    "stroke-width": 1,
                    stroke: ua,
                    ishot: !0,
                    fill: ua
                }).css("cursor", Wa && "nwse-resize" || "nw-resize");
                n.resizeTracker.data("config", {
                    position: 5,
                    selectEleObj: n,
                    yChange: !0,
                    xChange: !0
                });
                n.closeButton = a.symbol("closeIcon", 0, 0, 6, q).attr({
                    transform: "t" + m + "," + l,
                    "stroke-width": 2,
                    stroke: c.selectionCancelButtonBorderColor,
                    fill: c.selectionCancelButtonFillColor,
                    "stroke-linecap": "round",
                    ishot: !0,
                    "stroke-linejoin": "round"
                }).css({
                    cursor: "pointer",
                    _cursor: "hand"
                }).click(function() {
                    d.logic.deleteSelection(this, d)
                });
                n.closeButton.data("config", {
                    index: n.index
                });
                n.chart = d;
                n.startX = f.getAxisPosition(g, 1);
                n.startY = e.getAxisPosition(l, 1);
                n.endX = f.getAxisPosition(m, 1);
                n.endY = e.getAxisPosition(r, 1);
                n.isVisible = !0;
                w.push(n);
                d.logic.bindDragEvent(n)
            },
            deleteSelection: function(b, d) {
                var a = b.data("config").index,
                    c = d._selectEleArr,
                    e = c[a],
                    f, g, l;
                f = e.selectBoxTracker.getBBox();
                l = {
                    selectionLeft: f.x,
                    selectionTop: f.y,
                    selectionWidth: f.width,
                    selectionHeight: f.height,
                    startXValue: d.xAxis[0].getAxisPosition(f.x, 1),
                    startYValue: d.yAxis[0].getAxisPosition(f.y, 1),
                    endXValue: d.xAxis[0].getAxisPosition(f.x + f.width, 1),
                    endYValue: d.yAxis[0].getAxisPosition(f.y + f.height, 1),
                    data: d.logic.getCollatedData(),
                    id: e.id
                };
                for (g in e) f = e[g], f.remove && f.remove(), delete e[g];
                delete c[a];
                C.raiseEvent("selectionRemoved", l, d.logic.chartInstance)
            },
            bindDragEvent: function(b) {
                for (var d in b) /Tracker/.test(d) && b[d].drag(this.move, this.start, this.up)
            },
            start: function() {
                var b = this.data("config").selectEleObj,
                    d = b.topTracker,
                    a = b.rightTracker,
                    c = b.bottomTracker,
                    e = b.leftTracker,
                    f = b.resizeTracker,
                    g = d.data("config"),
                    l = a.data("config"),
                    h = c.data("config"),
                    m = e.data("config"),
                    r = f.data("config"),
                    k = b.selectBoxTracker.data("config"),
                    n = b.selectBoxTracker.getBBox();
                g.ox = n.x;
                g.oy = n.y;
                l.ox = n.x2;
                l.oy = n.y;
                h.ox = n.x;
                h.oy = n.y2;
                m.ox = n.x;
                m.oy = n.y;
                g.ox = n.x;
                g.oy = n.y;
                r.ox = n.x2;
                r.oy = n.y2;
                k.ox = n.x;
                k.oy = n.y;
                k.ow = n.width;
                k.oh = n.height;
                k.ox2 = n.x2;
                k.oy2 = n.y2;
                b.selectBoxG.toFront();
                d.hide();
                a.hide();
                c.hide();
                e.hide();
                f.hide();
                this.show()
            },
            move: function(b, d) {
                var a = this.data("config"),
                    c = a.selectEleObj,
                    e = c.chart,
                    f = c.topTracker,
                    g = c.rightTracker,
                    l = c.bottomTracker,
                    h = c.leftTracker,
                    m = c.resizeTracker,
                    r = c.selectBoxTracker,
                    k = c.canvasLeft,
                    n = c.canvasRight,
                    q = c.canvasTop,
                    w = c.canvasBottom,
                    O = r.data("config"),
                    F = {},
                    y, x;
                b = a.xChange ? b : 0;
                d = a.yChange ? d : 0;
                y = b + a.ox;
                x = d + a.oy;
                y = E(n - (a.ow || 0), Xa(y, k));
                x = E(w - (a.oh || 0), Xa(x, q));
                switch (a.position) {
                    case 1:
                        F.y = E(O.oy2, x);
                        F.height = S(O.oy2 - x) || 1;
                        f.attr({
                            y: x + -6
                        });
                        break;
                    case 2:
                        F.x = E(O.ox, y);
                        F.width = S(O.ox - y) || 1;
                        g.attr({
                            x: y +
                                -6
                        });
                        break;
                    case 3:
                        F.y = E(O.oy, x);
                        F.height = S(O.oy - x) || 1;
                        l.attr({
                            y: x + -6
                        });
                        break;
                    case 4:
                        F.x = E(O.ox2, y);
                        F.width = S(O.ox2 - y) || 1;
                        h.attr({
                            x: y + -6
                        });
                        break;
                    case 5:
                        F.x = E(O.ox, y);
                        F.width = S(O.ox - y) || 1;
                        F.y = E(O.oy, x);
                        F.height = S(O.oy - x) || 1;
                        m.attr({
                            cx: y,
                            cy: x
                        });
                        break;
                    default:
                        F.x = y, F.y = x
                }
                this.data("dragStarted") || (a = r.getBBox(), a = {
                    selectionLeft: a.x,
                    selectionTop: a.y,
                    selectionWidth: a.width,
                    selectionHeight: a.height,
                    startXValue: e.xAxis[0].getAxisPosition(a.x, 1),
                    startYValue: e.yAxis[0].getAxisPosition(a.y, 1),
                    endXValue: e.xAxis[0].getAxisPosition(a.x +
                        a.width, 1),
                    endYValue: e.yAxis[0].getAxisPosition(a.y + a.height, 1),
                    id: c.id
                }, C.raiseEvent("BeforeSelectionUpdate", a, e.logic.chartInstance), this.data("dragStarted", 1));
                r.animate(F);
                c.isVisible && (c.closeButton.hide(), c.cornerInnerSymbol.hide(), c.cornerOuterSymbol.hide(), c.isVisible = !1)
            },
            up: function() {
                var b = this,
                    d = b.data("config").selectEleObj,
                    a = d.chart,
                    c = a.xAxis && a.xAxis[0],
                    e = a.yAxis && a.yAxis[0],
                    f = d.topTracker,
                    g = d.rightTracker,
                    l = d.bottomTracker,
                    h = d.leftTracker,
                    m = d.resizeTracker,
                    r = d.selectBoxTracker,
                    k, n;
                setTimeout(function() {
                    k = r.getBBox();
                    d.startX = c.getAxisPosition(k.x, 1);
                    d.startY = e.getAxisPosition(k.y, 1);
                    d.endX = c.getAxisPosition(k.x2, 1);
                    d.endY = e.getAxisPosition(k.y2, 1);
                    f.attr({
                        x: k.x,
                        y: k.y + -6,
                        width: k.width
                    });
                    g.attr({
                        x: k.x2 + -6,
                        y: k.y,
                        height: k.height
                    });
                    l.attr({
                        x: k.x,
                        y: k.y2 + -6,
                        width: k.width
                    });
                    h.attr({
                        x: k.x + -6,
                        y: k.y,
                        height: k.height
                    });
                    m.attr({
                        cx: k.x2,
                        cy: k.y2
                    });
                    d.closeButton.transform("t" + k.x2 + "," + k.y);
                    d.cornerInnerSymbol.transform("t" + k.x2 + "," + k.y2);
                    d.cornerOuterSymbol.transform("t" + k.x2 + "," + k.y2);
                    d.closeButton.show();
                    15 > k.width || 15 > k.height ? (d.cornerInnerSymbol.hide(), d.cornerOuterSymbol.show()) : (d.cornerInnerSymbol.show(), d.cornerOuterSymbol.hide());
                    d.isVisible = !0;
                    f.show();
                    g.show();
                    l.show();
                    h.show();
                    m.show();
                    b.data("dragStarted") && (n = {
                        selectionLeft: k.x,
                        selectionTop: k.y,
                        selectionWidth: k.width,
                        selectionHeight: k.height,
                        startXValue: a.xAxis[0].getAxisPosition(k.x, 1),
                        startYValue: a.yAxis[0].getAxisPosition(k.y, 1),
                        endXValue: a.xAxis[0].getAxisPosition(k.x + k.width, 1),
                        endYValue: a.yAxis[0].getAxisPosition(k.y + k.height, 1),
                        data: a.logic.getCollatedData(),
                        id: d.id
                    }, C.raiseEvent("SelectionUpdated", n, a.logic.chartInstance), b.data("dragStarted", 0))
                }, 100)
            },
            postSeriesAddition: function(b, d) {
                var a = t.scatter && t.scatter.postSeriesAddition && t.scatter.postSeriesAddition.apply(this, arguments),
                    c = b.chart,
                    e = d.chart,
                    f = this.colorManager,
                    p = h(e.selectbordercolor, f.getColor("canvasBorderColor")),
                    l = g(e.selectborderalpha, f.getColor("canvasBorderAlpha"));
                c.selectBorderColor = {
                    FCcolor: {
                        color: p,
                        alpha: l
                    }
                };
                c.selectFillColor = A(h(e.selectfillcolor,
                    f.getColor("altHGridColor")), g(e.selectfillalpha, f.getColor("altHGridAlpha")));
                c.selectionCancelButtonBorderColor = A(h(e.selectioncancelbuttonbordercolor, p), g(e.selectioncancelbuttonborderalpha, l));
                c.selectionCancelButtonFillColor = A(h(e.selectioncancelbuttonfillcolor, "FFFFFF"), g(e.selectioncancelbuttonfillalpha, 100));
                b.chart.nativeZoom = !1;
                c.formAction = D(e.formaction);
                "0" !== e.submitdataasxml || e.formdataformat || (e.formdataformat = C.dataFormats.CSV);
                c.formDataFormat = h(e.formdataformat, C.dataFormats.XML);
                c.formTarget = h(e.formtarget, "_self");
                c.formMethod = h(e.formmethod, "POST");
                c.submitFormAsAjax = g(e.submitformusingajax, 1);
                (b.callbacks || (b.callbacks = [])).push(function() {
                    var a = this.logic;
                    Pa(this, {
                        selectionStart: function(a) {
                            var b = cc(a.chart.container, a.originalEvent),
                                b = M({
                                    selectionLeft: a.selectionLeft,
                                    selectionTop: a.selectionTop,
                                    selectionWidth: a.selectionWidth,
                                    selectionHeight: a.selectionHeight,
                                    startXValue: a.chart.xAxis[0].getAxisPosition(a.selectionLeft, 1),
                                    startYValue: a.chart.yAxis[0].getAxisPosition(a.selectionTop,
                                        1)
                                }, b);
                            C.raiseEvent("selectionStart", b, a.chart.logic.chartInstance)
                        },
                        selectionEnd: function(b) {
                            var c = cc(b.chart.container, b.originalEvent),
                                d = b.chart.xAxis[0],
                                e = b.chart.yAxis[0],
                                c = M({
                                    selectionLeft: b.selectionLeft,
                                    selectionTop: b.selectionTop,
                                    selectionWidth: b.selectionWidth,
                                    selectionHeight: b.selectionHeight,
                                    startXValue: d.getAxisPosition(b.selectionLeft, 1),
                                    startYValue: e.getAxisPosition(b.selectionTop, 1),
                                    endXValue: d.getAxisPosition(b.selectionLeft + b.selectionWidth, 1),
                                    endYValue: e.getAxisPosition(b.selectionTop +
                                        b.selectionHeight, 1)
                                }, c);
                            C.raiseEvent("selectionEnd", c, b.chart.logic.chartInstance);
                            a.createSelectionBox(b)
                        }
                    })
                });
                b.chart.zoomType = "xy";
                return a
            }
        }, t.scatterbase);
        t("multiaxisline", {
            friendlyName: "Multi-axis Line Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "line",
            rendererId: "multiaxisline",
            isMLAxis: !0,
            canvasPaddingModifiers: ["anchor", "anchorlabel"],
            drawAxisTrackerAndCheckBox: function() {
                for (var b = this, d = b.canvasLeft, a = b.canvasTop, c = b.canvasWidth, e = b.canvasHeight, f = b.paper, p = b.yAxis, l = p.length,
                        h = b.logic, m = 0, r = 0, k = {
                            cursor: "col-resize",
                            _cursor: "e-resize",
                            "*cursor": "e-resize"
                        }, n = h.chartInstance, q = n.jsVars, w = h.dataObj, O = q._reflowData, F = O.hcJSON || {}, y = w.axis, x = w.chart, w = g(x.allowaxisshift, 1), $ = (x = g(x.allowselection, 1)) && f.html("div", {
                            fill: "transparent",
                            width: b.chartWidth
                        }, {
                            top: "",
                            left: "",
                            fontSize: "10px",
                            lineHeight: "15px",
                            marginTop: -b.chartHeight + "px"
                        }, b.container), F = F.yAxis || (F.yAxis = []), fa, s, t, G, B, z, K = function(a) {
                            b.series && b.series[a] && b.series[a].setVisible(!1, !1)
                        }, v = function(a) {
                            var c = a.data;
                            a = c.axis[c.index].axisData;
                            var d = a._relatedSeries,
                                e = !c.checkBox.checked(),
                                c = y[a._axisposition];
                            d && mb(d, function(a) {
                                b.options.series[a].legendClick(e, !0)
                            });
                            c.hidedataplots = !e;
                            M(O, {
                                preReflowAdjustments: function() {
                                    this.dataObj.axis = y
                                }
                            });
                            C.raiseEvent("AxisSelected", {
                                selected: e,
                                AxisId: c._index,
                                AxisConfiguration: a._origAttr || sb(c, a)
                            }, b.logic.chartInstance)
                        }, A = function(a) {
                            var c = a.data;
                            a = c.axis;
                            var c = a[c.index].axisData,
                                d = c.opposite,
                                e = c._axisposition,
                                f = y.length,
                                p, l, k, m = {},
                                r = y[e],
                                w = {};
                            for (p = 0; p < f; p += 1) l = y[p],
                                l = !g(l.axisonleft, 1), l === d && (k = p, d && (p = f));
                            k !== e && (m = a[k], w = y[k], a = y.splice(k, 1, y[e]), y.splice(e, 1, a[0]));
                            if (k !== e || d !== h.dataObj.chart._lastClickedOpp) M(O, {
                                preReflowAdjustments: function() {
                                    this.dataObj.chart._lastClickedOpp = d;
                                    this.dataObj.axis = y
                                }
                            }), C.raiseEvent("AxisShifted", {
                                previousDefaultAxisId: w._index,
                                newDefaultAxisId: r._index,
                                previousDefaultAxisConfiguration: m._origAttr || sb(w, m),
                                newDefaultAxisConfiguration: c._origAttr || sb(r, c)
                            }, b.logic.chartInstance), C.hcLib.createChart(n, q.container, q.type,
                                void 0, void 0, !1, !0)
                        }; l--;) fa = p[l], s = fa.axisData, t = s._axisWidth, (G = s.opposite) || (m += t), F[l] || (F[l] = {}), x && s.showAxis && (B = d + (G ? c + r + g(s.title.margin, t - 10) + 5 : -m), z = a + e + 10, fa.checkBox = f.html("input", {}, {
                    left: B + "px",
                    top: z + "px"
                }).attr({
                    type: "checkbox",
                    name: "axis[]",
                    value: s.title.text || ""
                }).add($), fa.checkBox.val(s.hidedataplots), s.hidedataplots || s._relatedSeries && mb(s._relatedSeries, K), pb(fa.checkBox.element, ga ? "touchstart" : "mousedown", v, {
                    axis: p,
                    index: l,
                    checkBox: fa.checkBox
                })), w && (fa.tracker = f.rect(d + (G ?
                    c + r : -m), a, t, e, 0).attr({
                    "stroke-width": 0,
                    fill: ua,
                    isTracker: +new Date,
                    zIndex: 7
                }).css(k), G && (r += t), pb(fa.tracker[0], ga ? "touchstart" : "mousedown", A, {
                    axis: p,
                    index: l
                }))
            },
            series: function(b) {
                var d = this,
                    a = d.numberFormatter,
                    c = d.name,
                    e = d.dataObj,
                    f = e.chart,
                    p = e.axis,
                    l = d.hcJSON,
                    u = l[ea],
                    m = l.yAxis[0],
                    r = g(e.chart.allowselection, 1),
                    k = [],
                    n = g(f.showaxisnamesinlegend, 0),
                    q = g(f.yaxisvaluesstep, f.yaxisvaluestep, 1),
                    w = this.colorManager,
                    O, F, y, x, $, fa, s, t, G, qa, v, K, D, oa, E;
                l.callbacks || (l.callbacks = []);
                l.callbacks.push(function() {
                    d.drawAxisTrackerAndCheckBox.call(this)
                });
                l.legend.enabled = Boolean(g(e.chart.showlegend, 1));
                if (p && 0 < p.length) {
                    this.categoryAdder(e, l);
                    l.yAxis.splice(0, 2);
                    fa = u.noHiddenAxis = 0;
                    for (t = p.length; fa < t; fa += 1) G = p[fa], void 0 === G._index && (G._index = fa), G._axisposition = fa, (x = !g(G.axisonleft, 1)) ? (G._isSY = !0, k.unshift(G)) : (G._isSY = !1, k.push(G));
                    fa = 0;
                    for (t = k.length; fa < t; fa += 1)
                        if (G = k[fa], $ = g(G.showaxis, 1), p = G._index || 0, a.parseMLAxisConf(G, p), O = w.getPlotColor(p), G.id = p, D = h(G.color, f.axiscolor, O), qa = A(D, 100), x = !g(G.axisonleft, 1), v = g(G.divlinethickness, f.divlinethickness,
                                1), F = $ ? g(G.tickwidth, f.axistickwidth, 2) : 0, y = $ ? g(G.axislinethickness, f.axislinethickness, 2) : 0, K = u[fa] = {}, K.showAxis = $, u.noHiddenAxis += 1 - $, $ && (x ? E = fa : oa = fa), s = [], l.yAxis.push({
                                startOnTick: !1,
                                endOnTick: !1,
                                _axisposition: G._axisposition,
                                _isSY: G._isSY,
                                _index: p,
                                hidedataplots: !g(G.hidedataplots, 0),
                                title: {
                                    enabled: $,
                                    style: m.title.style,
                                    text: $ ? z(G.title) : B,
                                    align: r ? "low" : "middle",
                                    textAlign: r && x ? "right" : void 0
                                },
                                labels: {
                                    x: 0,
                                    style: m.labels.style
                                },
                                plotBands: [],
                                plotLines: [],
                                gridLineColor: A(h(G.divlinecolor, D), g(G.divlinealpha,
                                    f.divlinealpha, w.getColor("divLineAlpha"), 100)),
                                gridLineWidth: v,
                                gridLineDashStyle: g(G.divlinedashed, G.divlineisdashed, f.divlinedashed, f.divlineisdashed, 0) ? Fa(g(G.divlinedashlen, f.divlinedashlen, 4), g(G.divlinedashgap, f.divlinedashgap, 2), v) : void 0,
                                alternateGridColor: V,
                                lineColor: qa,
                                lineWidth: y,
                                tickLength: F,
                                tickColor: qa,
                                tickWidth: y,
                                opposite: x,
                                _relatedSeries: s,
                                showAxis: $
                            }), K.yAxisValuesStep = g(G.yaxisvaluesstep, G.yaxisvaluestep, q), K.maxValue = G.maxvalue, K.tickWidth = F, K.minValue = G.minvalue, K.setadaptiveymin =
                            g(G.setadaptiveymin, f.setadaptiveymin), K.numDivLines = g(G.numdivlines, f.numdivlines, 4), K.adjustdiv = g(G.adjustdiv, f.adjustdiv), K.showYAxisValues = $ ? g(G.showyaxisvalues, G.showyaxisvalue, f.showyaxisvalues, f.showyaxisvalue, 1) : 0, K.showLimits = $ ? g(G.showlimits, f.showyaxislimits, f.showlimits, K.showYAxisValues) : 0, K.showDivLineValues = $ ? g(G.showdivlinevalue, f.showdivlinevalues, G.showdivlinevalues, K.showYAxisValues) : 0, K.showzeroplane = G.showzeroplane, K.showzeroplanevalue = g(G.showzeroplanevalue), K.zeroplanecolor =
                            G.zeroplanecolor, K.zeroplanethickness = G.zeroplanethickness, K.zeroplanealpha = G.zeroplanealpha, K.linecolor = h(G.linecolor, f.linecolor || G.color, O), K.linealpha = G.linealpha, K.linedashed = G.linedashed, K.linethickness = G.linethickness, K.linedashlen = G.linedashlen, K.linedashgap = G.linedashgap, K.anchorShadow = G.anchorshadow, K.plottooltext = G.plottooltext, G.dataset && 0 < G.dataset.length) {
                            v = G.dataset.length;
                            O = g(G.includeinlegend, 1);
                            x = !1;
                            $ = {
                                data: [],
                                relatedSeries: s,
                                name: z(G.title),
                                type: "line",
                                marker: {
                                    symbol: "axisIcon",
                                    fillColor: ua,
                                    lineColor: hc(D, 80).replace(ob, Ma)
                                },
                                lineWidth: 0,
                                legendFillColor: 0 !== n ? A(D, 25) : void 0,
                                legendFillOpacity: 0,
                                legendIndex: G._index,
                                showInLegend: Boolean(g(n, O))
                            };
                            l.series.push($);
                            for (qa = 0; qa < v; qa += 1) {
                                y = G.dataset[qa];
                                y._yAxisName = G.title;
                                void 0 === y.color && (y.color = h(K.linecolor, D));
                                F = {
                                    visible: !g(y.initiallyhidden, 0),
                                    yAxis: fa,
                                    data: [],
                                    hoverEffects: this.parseSeriesHoverOptions(b, l, y, c)
                                };
                                F = this.point(c, F, y, e.chart, l, u.oriCatTmp.length, fa, p);
                                F.legendFillColor = $.legendFillColor;
                                F.legendIndex = G._index;
                                if (void 0 === F.showInLegend || F.showInLegend) x = !0;
                                !1 !== F.showInLegend && (F.showInLegend = Boolean(O));
                                s.push(l.series.length);
                                l.series.push(F)
                            }
                            0 !== s.length && x || ($.showInLegend = !1)
                        }
                    b = f._lastClickedOpp ? g(E, oa) : g(oa, E);
                    fa = 0;
                    for (t = l.yAxis.length; fa < t; fa += 1) fa != b && (l.yAxis[fa].gridLineWidth = 0, u[fa].zeroplanethickness = 0);
                    this.configureAxis(l, e)
                }
            },
            point: function(b, d, a, c, e, f, p, l) {
                b = !1;
                p = g(c.ignoreemptydatasets, 0);
                var u;
                u = e.chart;
                var m = a.data || [],
                    r = e[ea],
                    k = r[d.yAxis || 0],
                    n = h(d.type, this.defaultSeriesType),
                    q = e.plotOptions[n] &&
                    e.plotOptions[n].stacking,
                    w = h(this.isValueAbs, r.isValueAbs, !1),
                    O = g(d.yAxis, 0),
                    F = this.numberFormatter,
                    y = this.colorManager,
                    x = aa(h(a.color, k.linecolor, c.linecolor, y.getPlotColor())),
                    $ = g(a.alpha, k.linealpha, c.linealpha, Da),
                    fa = g(c.showshadow, this.defaultPlotShadow, 1),
                    s = g(a.drawanchors, a.showanchors, c.drawanchors, c.showanchors),
                    t = g(a.anchorsides, c.anchorsides, 0),
                    G = g(a.anchorstartangle, c.anchorstartangle, 90),
                    qa = g(a.anchorradius, c.anchorradius, 3),
                    z = aa(h(a.anchorbordercolor, c.anchorbordercolor, x)),
                    K = g(a.anchorborderthickness,
                        c.anchorborderthickness, 1),
                    y = aa(h(a.anchorbgcolor, c.anchorbgcolor, y.getColor("anchorBgColor"))),
                    v = h(a.anchoralpha, c.anchoralpha, Da),
                    A = h(a.anchorbgalpha, c.anchorbgalpha, v);
                d.anchorShadow = v && h(a.anchorshadow, k.anchorShadow, c.anchorshadow, 0);
                d.name = D(a.seriesname);
                if (0 === g(a.includeinlegend) || void 0 === d.name || 0 === $ && 1 !== s) d.showInLegend = !1;
                d.marker = {
                    fillColor: {
                        FCcolor: {
                            color: y,
                            alpha: A * v / 100 + B
                        }
                    },
                    lineColor: {
                        FCcolor: {
                            color: z,
                            alpha: v + B
                        }
                    },
                    lineWidth: K,
                    radius: qa,
                    symbol: da(t),
                    startAngle: G
                };
                d.color = {
                    FCcolor: {
                        color: x,
                        alpha: $
                    }
                };
                d.shadow = fa ? {
                    opacity: fa ? $ / 100 : 0
                } : !1;
                d.step = this.stepLine;
                d.drawVerticalJoins = Boolean(g(c.drawverticaljoins, 1));
                d.useForwardSteps = Boolean(g(c.useforwardsteps, 1));
                d.lineWidth = g(a.linethickness, k.linethickness, c.linethickness, 2);
                c = d._dataParser = Db.line(e, {
                    plottooltext: h(a.plottooltext, k.plottooltext),
                    seriesname: d.name,
                    lineAlpha: $,
                    anchorAlpha: v,
                    showValues: g(a.showvalues, r.showValues),
                    yAxis: l,
                    lineDashed: Boolean(g(a.dashed, k.linedashed, c.linedashed, 0)),
                    lineDashLen: g(a.linedashlen, k.linedashlen,
                        c.linedashlen, 5),
                    lineDashGap: g(a.linedashgap, k.linedashgap, c.linedashgap, 4),
                    lineThickness: d.lineWidth,
                    lineColor: x,
                    valuePosition: h(a.valueposition, u.valuePosition),
                    drawAnchors: s,
                    anchorShadow: d.anchorShadow,
                    anchorBgColor: y,
                    anchorBgAlpha: A,
                    anchorBorderColor: z,
                    anchorBorderThickness: K,
                    anchorRadius: qa,
                    anchorSides: t,
                    anchorAngle: G,
                    _sourceDataset: a,
                    _yAxisName: a._yAxisName,
                    hoverEffects: d.hoverEffects
                }, this);
                delete a._yAxisName;
                for (l = 0; l < f; l += 1)(u = m[l]) ? (a = F.getCleanValue(u.value, w), null === a ? d.data.push({
                        y: null
                    }) :
                    (b = !0, d.data.push(c(u, l, a)), this.pointValueWatcher(e, a, O, q, l, 0, n))) : d.data.push({
                    y: null
                });
                !p || b || this.realtimeEnabled || (d.showInLegend = !1);
                return d
            },
            configureAxis: function(b, d) {
                var a = b[ea],
                    c = d.chart,
                    e, f, p, l, h, m, r, k, n, q, w, O, F;
                b.xAxis.title.text = z(c.xaxisname);
                F = 0;
                for (f = b.yAxis.length; F < f; F += 1) e = b.yAxis[F], p = a[F], O = g(p.yAxisValuesStep, 1), O = 1 > O ? 1 : O, l = p.maxValue, h = p.minValue, m = g(p.setadaptiveymin, 0), r = m = !m, k = p.numDivLines, n = 0 !== p.adjustdiv, q = p.showLimits, w = p.showDivLineValues, this.axisMinMaxSetter(e,
                    p, l, h, m, r, k, n), this.configurePlotLines(c, b, e, p, q, w, O, this.numberFormatter, e._isSY, void 0, e._index), e.reversed && 0 <= e.min && (b.plotOptions.series.threshold = e.max)
            },
            spaceManager: function(b, d, a, c) {
                var e = b[ea],
                    f, p, l = d.chart,
                    u, m, r, k, n, q, w, O, F, y, x, $, fa, s;
                s = b.chart.marginLeft;
                var t = b.chart.marginRight,
                    G = e.marginLeftExtraSpace,
                    B = e.marginTopExtraSpace,
                    z = e.marginBottomExtraSpace,
                    K = e.marginRightExtraSpace;
                n = a - (G + K + b.chart.marginRight + b.chart.marginLeft);
                var v = c - (z + b.chart.marginBottom + b.chart.marginTop),
                    A = .3 *
                    n;
                c = .3 * v;
                var D = n - A,
                    J = v - c,
                    E = h(l.legendposition, Ga).toLowerCase();
                b.legend.enabled && E === va && (D -= this.placeLegendBlockRight(b, d, D / 2, v));
                p = b.yAxis;
                k = p.length;
                f = k - e.noHiddenAxis;
                w = 0;
                if (f)
                    for (y = O = 0, x = 10, fa = D / f, q = k - 1; 0 <= q; --q) F = p[q], F.showAxis && (f = e[q], r = F.opposite, $ = (r ? y : O) + x, u = f.tickWidth, m = h(l.rotateyaxisname, r ? "cw" : "ccw"), f.verticalAxisNamePadding = 4, f.fixedValuesPadding = u, f.verticalAxisValuesPadding = u, f.rotateVerticalAxisName = r && "ccw" !== m ? "cw" : m, f.verticalAxisNameWidth = 50, F.offset = $, w = fa + w - x, f = ib(F,
                        f, b, d, v, w, r, 0, 0), f += x, r ? (y += f, b.chart.marginRight += x) : (O += f, b.chart.marginLeft += x), w -= f, D -= f, D < x && (x = 0), F._axisWidth = f);
                D -= Cb(b, d, D);
                p = D + A;
                b.legend.enabled && E !== va && (J -= this.placeLegendBlockBottom(b, d, n, J / 2), b.legend.width > p && (b.legend.x = 0));
                J -= this.titleSpaceManager(b, d, p, J / 2);
                f = e.x;
                f.horizontalAxisNamePadding = g(l.xaxisnamepadding, 5);
                f.horizontalLabelPadding = g(l.labelpadding, 2);
                f.labelDisplay = "1" == l.rotatelabels ? "rotate" : h(l.labeldisplay, "auto").toLowerCase();
                f.staggerLines = g(l.staggerlines, 2);
                f.slantLabels =
                    g(l.slantlabels, l.slantlabel, 0);
                n = {
                    left: 0,
                    right: 0
                };
                n = b.chart.managePlotOverflow && this.canvasPaddingModifiers && this.calculateCanvasOverflow(b, !0) || n;
                q = n.left + n.right;
                w = .6 * p;
                q > w && (O = n.left / q, n.left -= O * (q - w), n.right -= (1 - O) * (q - w));
                this.xAxisMinMaxSetter(b, d, p, n.left, n.right);
                J -= Bb(b.xAxis, f, b, d, p, J, A);
                J -= $a(b, d, J, b.xAxis);
                d = c + J;
                for (q = 0; q < k; q += 1) Za(d, b, l, b.yAxis[q], e[q].lYLblIdx);
                b.legend.enabled && E === va && (e = b.legend, l = c + J, e.height > l && (e.height = l, e.scroll.enabled = !0, w = (e.scroll.scrollBarWidth = 10) + (e.scroll.scrollBarPadding =
                    2), e.width += w, b.chart.marginRight += w), e.y = 20);
                l = (e = b.title.alignWithCanvas) ? b.chart.marginLeft + p / 2 : a / 2;
                s = e ? b.chart.marginLeft : s;
                a = e ? a - b.chart.marginRight : a - t;
                switch (b.title.align) {
                    case Ha:
                        b.title.x = s;
                        b.title.align = "start";
                        break;
                    case va:
                        b.title.x = a;
                        b.title.align = "end";
                        break;
                    default:
                        b.title.x = l, b.title.align = "middle"
                }
                switch (b.subtitle.align) {
                    case Ha:
                        b.subtitle.x = s;
                        break;
                    case va:
                        b.subtitle.x = a;
                        break;
                    default:
                        b.subtitle.x = l
                }
                b.chart.marginLeft += G;
                b.chart.marginTop += B;
                b.chart.marginBottom += z;
                b.chart.marginRight +=
                    K
            }
        }, t.mslinebase);
        t("candlestick", {
            friendlyName: "Candlestick Chart",
            standaloneInit: !0,
            creditLabel: !1,
            paletteIndex: 3,
            defaultSeriesType: "candlestick",
            canvasborderthickness: 1,
            rendererId: "candlestick",
            chart: t.errorbar2d.chart,
            drawErrorValue: t.errorbar2d.drawErrorValue,
            series: function(b, d, a) {
                var c, e, f = d[ea],
                    p, l, u, m, r, k;
                c = b.chart;
                p = d.chart;
                var n = g(c.showvolumechart, 1);
                l = this.colorManager;
                var q;
                d.legend.enabled = Boolean(g(c.showlegend, 1));
                p.rollOverBandColor = A(h(c.rolloverbandcolor, l.getColor("altHGridColor")),
                    h(c.rolloverbandalpha, l.getColor("altHGridAlpha")));
                if (b.dataset && 0 < b.dataset.length) {
                    this.categoryAdder(b, d);
                    d.yAxis[0].opposite = !0;
                    f.numdivlines = D(b.chart.numpdivlines);
                    n && (q = d._FCconf.numberFormatter, p = d.labels, d._FCconf.numberFormatter = {}, d._FCconf.smartLabel && (e = d._FCconf.smartLabel, d._FCconf.smartLabel = void 0), d.labels = {}, u = M({}, d), d._FCconf.numberFormatter = q, d._FCconf.smartLabel = e, d.labels = p, e && (u._FCconf.smartLabel = e), u._FCconf.numberFormatter = new s.NumberFormatter(M(M({}, c), {
                        forcedecimals: ca(c.forcevdecimals,
                            c.forcedecimals),
                        forceyaxisvaluedecimals: ca(c.forcevyaxisvaluedecimals, c.forceyaxisvaluedecimals),
                        yaxisvaluedecimals: ca(c.vyaxisvaluedecimals, c.yaxisvaluedecimals),
                        formatnumber: ca(c.vformatnumber, c.formatnumber),
                        formatnumberscale: ca(c.vformatnumberscale, c.formatnumberscale),
                        defaultnumberscale: ca(c.vdefaultnumberscale, c.defaultnumberscale),
                        numberscaleunit: ca(c.vnumberscaleunit, c.numberscaleunit),
                        vnumberscalevalue: ca(c.vnumberscalevalue, c.numberscalevalue),
                        scalerecursively: ca(c.vscalerecursively, c.scalerecursively),
                        maxscalerecursion: ca(c.vmaxscalerecursion, c.maxscalerecursion),
                        scaleseparator: ca(c.vscaleseparator, c.scaleseparator),
                        numberprefix: ca(c.vnumberprefix, c.numberprefix),
                        numbersuffix: ca(c.vnumbersuffix, c.numbersuffix),
                        decimals: ca(c.vdecimals, c.decimals)
                    }), this), M(u, {
                        chart: {
                            backgroundColor: "rgba(255,255,255,0)",
                            borderColor: "rgba(255,255,255,0)",
                            animation: !1
                        },
                        title: {
                            text: null
                        },
                        subtitle: {
                            text: null
                        },
                        legend: {
                            enabled: !1
                        },
                        credits: {
                            enabled: !1
                        },
                        xAxis: {
                            opposite: !0,
                            labels: {
                                enabled: !1
                            }
                        },
                        yAxis: [{
                            opposite: !0,
                            title: {},
                            plotBands: [],
                            plotLines: []
                        }, {
                            opposite: !1,
                            title: {
                                text: b.chart.vyaxisname
                            }
                        }]
                    }), q = d.subCharts = [u]);
                    c = 0;
                    for (e = b.dataset.length; c < e; c += 1) p = {
                        numColumns: e,
                        data: []
                    }, l = b.dataset[c], p = this.point(a, p, l, b.chart, d, f.oriCatTmp.length, c), p instanceof Array ? (n && (u.series.push({
                        type: "column",
                        data: p[1]
                    }), u.showVolume = !0, l = g(b.chart.volumeheightpercent, 40), l = 20 > l ? 20 : 80 < l ? 80 : l, m = f.height - (d.chart.marginBottom + d.chart.marginTop), r = m * l / 100, k = d.chart.marginBottom + r, u[ea].marginTop = k + 40, u.yAxis[0].plotBands = [], u.yAxis[0].plotLines = [], u.exporting.enabled = !1, u.yAxis[0].title.text = z(D(b.chart.vyaxisname)), u.yAxis[0].title.align = "low", u.chart.height = r + 20, u.chart.width = f.width, u.chart.top = m - r, u.chart.left = 0, u.chart.volumeHeightPercent = l), d.series.push(p[0])) : (d.series.push(p), q = d.subCharts = void 0);
                    if (b.trendset && 0 < b.trendset.length)
                        for (c = 0, e = b.trendset.length; c < e; c += 1) p = {
                            type: "line",
                            marker: {
                                enabled: !1
                            },
                            connectNullData: 1,
                            data: []
                        }, u = b.trendset[c], u.data && 0 < u.data.length && (p = this.getTrendsetPoint(a, p, u, b.chart, d, f.oriCatTmp.length,
                            c), d.series.push(p));
                    b.chart.showdivlinesecondaryvalue = 0;
                    b.chart.showsecondarylimits = 0;
                    this.configureAxis(d, b);
                    d.yAxis[1].opposite = !1;
                    d.yAxis[1].min = d.yAxis[0].min;
                    d.yAxis[1].max = d.yAxis[0].max;
                    d.yAxis[1].title.text = d.yAxis[0].title.text;
                    d.yAxis[0].title.text = B;
                    n && q && (q = q[0], a = q[ea], a.numdivlines = D(b.chart.numvdivlines), a[0].min = f.volume && f.volume.min, a[0].max = f.volume && f.volume.max, q.series && q.series[0] && (q.series[0].showInLegend = !1), this.configureAxis(q, b), q.yAxis[0].title.text = z(D(b.chart.vyaxisname)),
                        q.yAxis[1].min = q.yAxis[0].min, q.yAxis[1].max = q.yAxis[0].max, q.yAxis[1].title.text = q.yAxis[0].title.text, q.yAxis[0].title.text = B);
                    if ((a = b.trendlines && b.trendlines[0] && b.trendlines[0].line) && a.length) {
                        for (n = 0; n < a.length; n += 1) a[n].parentyaxis = "s", a[n].valueonleft = "1";
                        Yb(b.trendlines, d.yAxis, f, !0, this.isBar)
                    }
                }
            },
            getTrendsetPoint: function(b, d, a, c, e) {
                if (a.data) {
                    b = a.data;
                    var f = b.length,
                        p = 0,
                        l, u, m, r, k, n = e[ea],
                        q = this.numberFormatter,
                        w = g(d.yAxis, 0),
                        n = n.toolTextStore,
                        f = aa(h(a.color, c.trendsetcolor, "666666")),
                        p = h(a.alpha, c.trendsetalpha, "100");
                    l = g(a.thickness, c.trendsetthickness, 2);
                    u = Boolean(g(a.dashed, c.trendsetdashed, 0));
                    m = g(a.dashlen, c.trendsetdashlen, 4);
                    r = g(a.dashgap, c.trendsetdashgap, 4);
                    k = h(a.includeinlegend, 1);
                    d.color = A(f, p);
                    d.lineWidth = l;
                    d.dashStyle = u ? Fa(m, r) : void 0;
                    d.includeInLegend = k;
                    d.name = D(a.name);
                    d.doNotUseBand = !0;
                    if (0 === g(a.includeinlegend) || void 0 === d.name) d.showInLegend = !1;
                    d.tooltip = {
                        enabled: !1
                    };
                    p = c.interactivelegend = 0;
                    for (f = b.length; p < f; p += 1)(c = b[p]) && !c.vline && (a = q.getCleanValue(c.value),
                        c = q.getCleanValue(c.x), c = null !== c ? c : p + 1, l = n && n[c], d.data.push({
                            x: c,
                            y: a,
                            toolText: l
                        }), this.pointValueWatchers(e, null, a, a, null, w))
                }
                return d
            },
            point: function(b, d, a, c, e) {
                if (a.data) {
                    b = t[b];
                    var f = e[ea],
                        p = D(c.plotpriceas, B).toLowerCase(),
                        l = a.data,
                        u = l && l.length,
                        m = this.numberFormatter,
                        r = [],
                        k = [],
                        n = {},
                        q, w, O, F = !1,
                        y = g(d.yAxis, 0),
                        x = aa(h(c.bearbordercolor, "B90000")),
                        $ = aa(h(c.bearfillcolor, "B90000")),
                        fa = this.colorManager,
                        s = aa(h(c.bullbordercolor, fa.getColor("canvasBorderColor"))),
                        v = aa(h(c.bullfillcolor, "FFFFFF")),
                        G = d.lineWidth = g(c.plotlinethickness, "line" == p || "bar" == p ? 2 : 1),
                        qa = h(c.plotlinealpha, "100"),
                        db = g(c.plotlinedashlen, 5),
                        K = g(c.plotlinedashgap, 4),
                        C = g(c.vplotborderthickness, 1),
                        oa = !!g(c.drawanchors, 1),
                        M = g(c.anchorsides, 0),
                        J = g(c.anchorstartangle, 90),
                        ka = g(c.anchorradius, this.anchorRadius, 3),
                        U = aa(h(c.anchorbordercolor, s)),
                        L = g(c.anchorborderthickness, this.anchorBorderThickness, 1),
                        fa = aa(h(c.anchorbgcolor, fa.getColor("anchorBgColor"))),
                        H = h(c.anchoralpha, "0"),
                        N = h(c.anchorbgalpha, H),
                        Y, R, P, za, Z, W, I, X, Q, ba, ca, Ta,
                        ja, la, V, ia = !1;
                    d.name = D(a.seriesname);
                    d.showInLegend = !1;
                    d.marker = {};
                    switch (p) {
                        case "line":
                            d.plotType = "line";
                            break;
                        case "bar":
                            d.plotType = "candlestickbar";
                            break;
                        default:
                            d.plotType = "column", d.errorBarWidthPercent = 0, ia = !0
                    }
                    for (R = 0; R < u; R += 1)(P = l[R]) && !P.vline && (I = m.getCleanValue(P.open), X = m.getCleanValue(P.close), Q = m.getCleanValue(P.high), ba = m.getCleanValue(P.low), ca = m.getCleanValue(P.volume, !0), la = m.getCleanValue(P.x), ia && S(X - I), E(I, X), Xa(I, X), null !== ca && (F = !0), Ta = E(I, X, Q, ba), ja = Xa(I, X, Q, ba), z(D(P.valuetext,
                        B)), q = aa(h(P.bordercolor, X < I ? x : s)), w = h(P.alpha, "100"), p = A(aa(h(P.color, X < I ? $ : v)), w), O = Boolean(g(P.dashed)) ? Fa(db, K) : void 0, Y = {
                        opacity: w / 100
                    }, Z = f.oriCatTmp[R], V = A(q, qa), za = b.getPointStub(e, c, P, I, X, Q, ba, ca, V, G, d.plotType, Z), la = la ? la : R + 1, n[la] = za.toolText, d.data.push({
                        high: Xa(I, X, Q, ba),
                        low: E(I, X, Q, ba),
                        color: ia ? p : {
                            FCcolor: {
                                color: q,
                                alpha: w
                            }
                        },
                        displayValue: z(h(P.displayvalue, P.valuetext, B)),
                        borderColor: V,
                        shadow: Y,
                        dashStyle: O,
                        borderWidth: G,
                        x: la,
                        y: za.y,
                        categoryLabel: Z,
                        errorValue: za.errorValue,
                        previousY: za.previousY,
                        toolText: za.toolText,
                        link: za.link,
                        marker: {
                            enabled: oa,
                            fillColor: {
                                FCcolor: {
                                    color: fa,
                                    alpha: N * H / 100 + B
                                }
                            },
                            lineColor: {
                                FCcolor: {
                                    color: U,
                                    alpha: H
                                }
                            },
                            lineWidth: L,
                            radius: ka,
                            startAngle: J,
                            symbol: da(M)
                        }
                    }), W = D(z(h(P.volumetooltext, a.volumetooltext, c.volumetooltext))), W = void 0 !== W ? b.getPointStub(e, c, P, I, X, Q, ba, ca, V, G, d.plotType, Z, W).toolText : za.toolText, k.push({
                        y: ca,
                        categoryLabel: Z,
                        color: A(p, w),
                        toolText: W,
                        borderWidth: C,
                        borderColor: A(q, h(c.plotlinealpha, P.alpha)),
                        dashStyle: O,
                        shadow: Y,
                        x: la,
                        link: P.link
                    }), this.pointValueWatchers(e,
                        la, Ta, ja, ca, y));
                    f.toolTextStore = n;
                    (d.drawVolume = F) ? r.push(d, k): r = d;
                    return r
                }
                return []
            },
            getPointStub: function(b, d, a, c, e, f, g, l, u, m, r, k, n) {
                var q = B,
                    q = b[ea],
                    w = q.numberFormatter,
                    O = "line" === r,
                    F = E(c, e),
                    y = Xa(c, e),
                    x = {};
                b = b.subCharts && b.subCharts[0] && b.subCharts[0][ea].numberFormatter || w;
                switch (r) {
                    case "line":
                        x.y = e;
                        x.link = h(a.link);
                        break;
                    case "column":
                        x.y = S(e - c);
                        x.previousY = F;
                        x.link = h(a.link);
                        x.errorValue = [];
                        0 < f - y && x.errorValue.push({
                            errorValue: f - y,
                            errorStartValue: y,
                            errorBarColor: u,
                            errorBarThickness: m,
                            opacity: 1
                        });
                        0 > g - F && x.errorValue.push({
                            errorValue: g - F,
                            errorStartValue: F,
                            errorBarColor: u,
                            errorBarThickness: m,
                            opacity: 1
                        });
                        break;
                    default:
                        x.y = c, x.previousY = e, x.link = h(a.link)
                }
                q.showTooltip ? (q = D(z(h(n, a.tooltext, q.tooltext))), void 0 !== q ? q = bb(q, [3, 5, 6, 10, 54, 55, 56, 57, 58, 59, 60, 61, 81, 82], {
                    label: k,
                    yaxisName: z(d.yaxisname),
                    xaxisName: z(d.xaxisname),
                    openValue: a.open,
                    openDataValue: w.dataLabels(c),
                    closeValue: a.close,
                    closeDataValue: w.dataLabels(e),
                    highValue: a.high,
                    highDataValue: w.dataLabels(f),
                    lowValue: a.low,
                    lowDataValue: w.dataLabels(g),
                    volumeValue: a.volume,
                    volumeDataValue: w.dataLabels(l)
                }, a, d) : (q = null === c || O ? B : "<b>Open:</b> " + w.dataLabels(c) + "<br/>", q += null !== e ? "<b>Close:</b> " + w.dataLabels(e) + "<br/>" : B, q += null === f || O ? B : "<b>High:</b> " + w.dataLabels(f) + "<br/>", q += null === g || O ? B : "<b>Low:</b> " + w.dataLabels(g) + "<br/>", q += null !== l ? "<b>Volume:</b> " + b.dataLabels(l) + "<br/>" : B, q += null !== a.date ? "<b>Date:</b> " + a.date : B)) : q = B;
                x.toolText = q;
                return x
            },
            pointValueWatchers: function(b, d, a, c, e, f) {
                var p = b[ea];
                f = g(f, 0);
                null !== e && (b = p.volume, b || (b = p.volume = {}), b.max = b.max > e ? b.max : e, b.min = b.min < e ? b.min :
                    e);
                null !== a && (b = p[f], !b.max && 0 !== b.max && (b.max = a), !b.min && 0 !== b.min && (b.min = a), b.max = Xa(b.max, a), b.min = E(b.min, a));
                null !== c && (b = p[f], !b.max && 0 !== b.max && (b.max = c), !b.min && 0 !== b.min && (b.min = c), b.max = Xa(b.max, c), b.min = E(b.min, c));
                null !== d && (a = p.x, a.max = a.max > d ? a.max : d, a.min = a.min < d ? a.min : d)
            },
            spaceManager: function(b, d, a, c) {
                var e = b[ea],
                    f, p = d.chart,
                    l = b.chart,
                    u, m, r = this.smartLabel || e.smartLabel,
                    k = e.x.min,
                    n = e.x.max,
                    q, w, O = c - (e.marginBottomExtraSpace + 0 + l.marginTop),
                    F = b.yAxis,
                    y;
                m = F.length;
                var x, $, fa = 0,
                    s = 0,
                    t =
                    8,
                    G, v = Xa(g(l.plotBorderWidth, 1), 0),
                    z;
                this.base.spaceManager.apply(this, arguments);
                b.xAxis.min = k - .5;
                b.xAxis.max = n + .5;
                b.yAxis[0].title.centerYAxis = b.yAxis[1].title.centerYAxis = !0;
                if (b.subCharts) {
                    k = b.subCharts[0];
                    fa = b.xAxis.showLine ? b.xAxis.lineThickness : v;
                    z = c - (l.marginTop + l.marginBottom + fa + v);
                    s = k.chart.volumeHeightPercent;
                    n = (e.horizontalAxisHeight || 15) + v;
                    z = z * s / 100;
                    l.marginBottom += z + fa + v;
                    m = M({}, b.xAxis);
                    s = 0;
                    for (t = b.xAxis.plotBands.length; s < t; s += 1)(f = b.xAxis.plotBands[s]) && f.label && f.label.text && (f.label.text =
                        " "), (f = m.plotBands[s]) && f.label && f.label.y && (f.label.y = Xc(p.basefontsize, 10) + 4 + fa);
                    s = 0;
                    for (t = m.plotLines.length; s < t; s += 1)(f = m.plotLines[s]) && f.label && f.label.text && (f.label.text = B);
                    k.yAxis && k.yAxis[0] && k.yAxis[0].title && k.yAxis[0].title.text && (k.yAxis[0].title.text = B);
                    k.xAxis = m;
                    m = h(d.chart.rotateyaxisname, "ccw");
                    m = m === Aa ? "none" : m;
                    r = F[1].title.rotation ? r.getSmartText(k.yAxis[1].title.text, "none" === m ? l.marginLeft - 10 : z, void 0, !0).text : r.getSmartText(k.yAxis[1].title.text, r.getOriSize(F[1].title.text).width,
                        void 0, !0).text;
                    F = k.yAxis;
                    m = F.length;
                    t = s = fa = 0;
                    for (x = m - 1; 0 <= x; --x) $ = F[x], f = e[x], y = $.opposite, G = (y ? s : fa) + t, m = h(d.chart.rotateyaxisname, y ? "cw" : "ccw"), m = m === Aa ? "none" : m, u = g(p.yaxisvaluespadding, p.labelypadding, 4), u < v && (u = v), f.verticalAxisNamePadding = 10, f.verticalAxisValuesPadding = u + ($.showLine ? $.lineThickness : 0), f.rotateVerticalAxisName = m, $.offset = G, y ? q = ib($, f, k, d, O, l.marginRight, !!y, 0, 0, s) : w = ib($, f, k, d, O, l.marginLeft, !!y, 0, 0, fa);
                    F = b.yAxis;
                    k.yAxis[1].title = M({}, b.yAxis[1].title);
                    k.yAxis[1].title.style =
                        b.orphanStyles.vyaxisname.style;
                    k.yAxis[1].title.text = r;
                    k.chart.left = 0;
                    k.chart.width = a;
                    k.chart.top = c - l.marginBottom + n;
                    k.chart.height = l.marginBottom - n;
                    q = Math.max(l.marginRight, q + l.spacingRight);
                    w = Math.max(l.marginLeft, w + l.spacingLeft);
                    k.chart.marginLeft = l.marginLeft = w;
                    k.chart.marginRight = l.marginRight = q;
                    k.chart.marginTop = 5;
                    k.chart.marginBottom = l.marginBottom - (n + z);
                    b.yAxis.push(k.yAxis[0], k.yAxis[1]);
                    k.xAxis.startY = F[2].startY = F[3].startY = k.chart.top + k.chart.marginTop;
                    k.xAxis.endY = F[2].endY = F[3].endY =
                        k.yAxis[0].startY + k.chart.height - k.chart.marginBottom;
                    k.series[0] && (k.series[0].yAxis = 3, b.series.push(k.series[0]));
                    b.xAxis = [b.xAxis, k.xAxis];
                    b.yAxis[2].title.centerYAxis = b.yAxis[3].title.centerYAxis = !0
                }
            },
            isDual: !0,
            numVDivLines: 0,
            defSetAdaptiveYMin: !0,
            divLineIsDashed: 1,
            isCandleStick: !0,
            defaultPlotShadow: 1,
            requiredAutoNumericLabels: 1
        }, t.scatterbase);
        t("kagi", {
            friendlyName: "Kagi Chart",
            standaloneInit: !0,
            stepLine: !0,
            creditLabel: !1,
            defaultSeriesType: "kagi",
            defaultZeroPlaneHighlighted: !1,
            setAdaptiveYMin: 1,
            canvasPadding: 15,
            isKagi: 1,
            rendererId: "kagi",
            pointValueWatcher: function(b, d, a) {
                null !== d && (b = b[ea], a = g(a, 0), b[a] || (b[a] = {}), a = b[a], this.maxValue = a.max = a.max > d ? a.max : d, this.minValue = a.min = a.min < d ? a.min : d)
            },
            point: function(b, d, a, c, e) {
                b = e.chart;
                var f = a.length,
                    p = 0,
                    l = e[ea].x,
                    u = e[ea].numberFormatter,
                    m = this.colorManager,
                    r, k, n, q, w, O, F, y, x, $, s, t, v, G, qa, A, K, D, oa, E, J, C, U;
                y = aa(h(c.linecolor, c.palettecolors, m.getColor("plotFillColor")));
                x = g(c.linealpha, 100);
                r = g(c.linethickness, 2);
                d.color = {
                    FCcolor: {
                        color: y,
                        alpha: x
                    }
                };
                oa = d.anchorShadow = g(c.anchorshadow, 0);
                d.lineWidth = r;
                d.step = this.stepLine;
                d.drawVerticalJoins = Boolean(g(c.drawverticaljoins, 1));
                F = g(c.drawanchors, c.showanchors);
                for (k = 0; k < f; k += 1) q = a[k], q.vline || (r = u.getCleanValue(q.value), null != r && (n = g(q.showlabel, c.showlabels, 1), n = z(n ? ca(q.label, q.name) : B), p += 1, O = g(q.linealpha, x), w = {
                    opacity: O / 100
                }, $ = g(q.anchorsides, c.anchorsides, 0), D = g(q.anchorstartangle, c.anchorstartangle, 90), v = g(q.anchorradius, c.anchorradius, this.anchorRadius, 3), t = aa(h(q.anchorbordercolor, c.anchorbordercolor,
                    y)), s = g(q.anchorborderthickness, c.anchorborderthickness, this.anchorBorderThickness, 1), G = aa(h(q.anchorbgcolor, c.anchorbgcolor, m.getColor("anchorBgColor"))), qa = h(q.anchoralpha, c.anchoralpha, "100"), A = h(q.anchorbgalpha, c.anchorbgalpha, qa), O = void 0 === F ? 0 !== O : !!F, E = Boolean(g(q.anchorshadow, oa, 0)), J = h(q.anchorimageurl, c.anchorimageurl), C = h(q.anchorimagescale, c.anchorimagescale, 100), U = h(q.anchorimagealpha, c.anchorimagealpha, 100), K = this.pointHoverOptions(q, d, {
                    plotType: "anchor",
                    anchorBgColor: G,
                    anchorAlpha: qa,
                    anchorBgAlpha: A,
                    anchorAngle: D,
                    anchorBorderThickness: s,
                    anchorBorderColor: t,
                    anchorBorderAlpha: qa,
                    anchorSides: $,
                    anchorRadius: v,
                    imageUrl: J,
                    imageScale: C,
                    imageAlpha: U,
                    shadow: w
                }), d.data.push(M(this.getPointStub(q, r, n, e), {
                    y: r,
                    color: y,
                    shadow: w,
                    dashStyle: q.dashed,
                    valuePosition: h(q.valueposition, b.valuePosition),
                    isDefined: !0,
                    marker: {
                        enabled: !!O,
                        shadow: E && {
                            opacity: qa / 100
                        },
                        fillColor: {
                            FCcolor: {
                                color: G,
                                alpha: A * qa / 100 + B
                            }
                        },
                        lineColor: {
                            FCcolor: {
                                color: t,
                                alpha: qa
                            }
                        },
                        lineWidth: s,
                        radius: v,
                        startAngle: D,
                        symbol: da($),
                        imageUrl: J,
                        imageScale: C,
                        imageAlpha: U
                    },
                    hoverEffects: K.enabled && K.options,
                    rolloverProperties: K.enabled && K.rolloverOptions
                })), this.pointValueWatcher(e, r)));
                l.catCount = p;
                return d
            },
            postSeriesAddition: function(b, d) {
                var a = b.series[0],
                    c = d.chart,
                    e = d.data,
                    f = a && a.data,
                    p = f && f.length,
                    l = b[ea],
                    u = l.x,
                    l = l.axisGridManager,
                    m = b.xAxis,
                    r = !1,
                    k = 0,
                    n = .5,
                    q = g(c.reversalvalue, -1),
                    p = g(c.reversalpercentage, 5),
                    w = this.maxValue,
                    O = this.minValue,
                    F, y, x, $, s, t, v, G, A, D, K, E, oa, C, J, M, U = {};
                if (f && f.length) {
                    a.rallyColor = h(c.rallycolor, "FF0000");
                    a.rallyAlpha =
                        g(c.rallyalpha, c.linealpha, 100);
                    a.declineColor = h(c.declinecolor, "0000FF");
                    a.declineAlpha = g(c.declinealpha, c.linealpha, 100);
                    a.rallyThickness = g(c.rallythickness, c.linethickness, 2);
                    s = g(c.rallydashlen, c.linedashlen, 5);
                    E = g(c.rallydashgap, c.linedashgap, 4);
                    a.declineThickness = g(c.declinethickness, c.linethickness, 2);
                    oa = g(c.declinedashlen, c.linedashlen, 5);
                    C = g(c.declinedashgap, c.linedashgap, 4);
                    a.lineDashed = {
                        "true": g(c.rallydashed, c.linedashed, 0),
                        "false": g(c.declinedashed, c.linedashed, 0)
                    };
                    a.rallyDashed = g(c.rallydashed,
                        c.linedashed, 0) ? Fa(s, E, a.rallyThickness) : void 0;
                    a.declineDashed = g(c.declinedashed, c.linedashed, 0) ? Fa(oa, C, a.declineThickness) : void 0;
                    a.canvasPadding = g(c.canvaspadding, this.canvasPadding, 15);
                    q = 0 < q ? q : p * (w - O) / 100;
                    w = f[0].y;
                    O = function(a, b) {
                        for (var c, d = 1, e = f[0].y; d < a;) c = f[d].y, b ? c <= e && (f[d].isDefined = !1) : c >= e && (f[d].isDefined = !1), d += 1;
                        f[0].vAlign = b ? Ga : La;
                        f[0].align = "center"
                    };
                    p = e && e.length;
                    for (C = oa = 0; C < p; C += 1)
                        if ((E = e[C]) && E.vline) oa && l.addVline(m, E, n, b);
                        else {
                            U = e[C];
                            M && (M = !1, n += .5);
                            if (oa && (A = f[oa])) {
                                D = f[oa -
                                    1];
                                A.vAlign = "middle";
                                A.align = va;
                                A.showLabel = !1;
                                s = null;
                                $ = A.y;
                                x = f[oa + 1] && f[oa + 1].y;
                                K = S(w - $);
                                r ? $ < t && F ? F = !1 : $ > v && !F && (F = !0) : ($ > w && K > q ? (F = !0, t = w, v = null, r = y = !0, O(oa, F)) : $ < w && K > q ? (F = !1, t = null, v = w, y = !1, r = !0, O(oa, F)) : (y = F = null, r = !1), X(D) && (D.isRally = F), null != F && (f[0].isRally = F));
                                A.isRally = F;
                                if (y && $ < w || !y && $ > w) s = w;
                                J = s ? s : $;
                                K = S(J - x);
                                x = null == y ? null : y ? J > x && K >= q : J < x && K >= q;
                                if (D && D.isShift)
                                    for (y ? (t = w, G = Ga) : y || (v = w, G = La), D = oa; 1 < D; --D)
                                        if (f[D].y == w) {
                                            f[D].vAlign = G;
                                            f[D].align = "center";
                                            f[D].showLabel = !0;
                                            break
                                        }
                                x ? (k += 1, n +=
                                    .5, M = !0, y = !y, A.isShift = !0, w = J, $ = g(E.showlabel, c.showlabels, 1), $ = z($ ? ca(E.label, E.name) : B), l.addXaxisCat(m, k - 1, k - 1, $, E, {}, c)) : y && $ > w || !y && $ < w ? w = $ : s = w;
                                A.plotValue = s;
                                A.objParams = {
                                    isRally: F,
                                    lastHigh: v,
                                    lastLow: t,
                                    isRallyInitialised: r
                                }
                            }
                            oa += 1
                        }
                    $ = g(U.showlabel, c.showlabels, 1);
                    $ = z($ ? ca(U.label, U.name) : B);
                    l.addXaxisCat(m, k, k, $, U, {}, c);
                    a.shiftCount = u.catCount = k + 1
                }
            },
            xAxisMinMaxSetter: function(b, d, a) {
                var c = b[ea].x,
                    e = d.chart;
                d = c.min = g(c.min, 0);
                var c = c.max = g(c.max, c.catCount - 1),
                    f = b.xAxis,
                    p = E(g(e.canvaspadding, 0),
                        a / 2 - 10),
                    l = p,
                    h = g(e.maxhshiftpercent, 10),
                    m = b.series[0];
                b = m && m.shiftCount;
                var e = g(e.canvaspadding, this.canvasPadding, 15),
                    r = a - 2 * e;
                m && (l = m.xShiftLength = E(r / b, (0 >= h ? 10 : h) * r / 100), p = e + l / 2, l = a - (l * Xa(b - 1, 1) + p), c = Xa(c, 1));
                f.labels.enabled = !1;
                f.gridLineWidth = 0;
                f.alternateGridColor = V;
                a = (a - (p + l)) / (c - d + 0);
                f.min = d - (0 + p / a);
                f.max = c + (0 + l / a)
            }
        }, t.linebase);
        Fb = function(b, d, a) {
            this.nf = d;
            this.dataSeparator = a;
            this.method = (b || B).toLowerCase().replace(/\s/g, "")
        };
        Fb.prototype = {
            setArray: function(b) {
                var d = this.nf,
                    a = this.dataSeparator,
                    c = 0;
                !b && (b = B);
                for (b = this.dataLength = (a = b.replace(/\s/g, B).split(a)) && a.length; b--;) c += a[b] = d.getCleanValue(a[b]);
                a && a.sort(function(a, b) {
                    return a - b
                });
                this.values = a;
                this.mean = c / this.dataLength;
                this.getFrequencies()
            },
            getQuartiles: function() {
                var b = this.values,
                    d = this.dataLength,
                    a = d % 2,
                    c, e;
                switch (this.method) {
                    case "tukey":
                        a ? (a = (d + 3) / 4, d = (3 * d + 1) / 4) : (a = (d + 2) / 4, d = (3 * d + 2) / 4);
                        break;
                    case "mooremccabe":
                        a ? (a = (d + 1) / 4, d = 3 * a) : (a = (d + 2) / 4, d = (3 * d + 2) / 4);
                        break;
                    case "freundperles":
                        a = (d + 3) / 4;
                        d = (3 * d + 1) / 4;
                        break;
                    case "mendenhallsincich":
                        a =
                            na((d + 1) / 4);
                        d = na(3 * a);
                        break;
                    default:
                        a = (d + 1) / 4, d = 3 * a
                }--a;
                --d;
                c = Xb(a);
                e = Xb(d);
                a = a - c ? b[c] + (b[gc(a)] - b[c]) * (a - c) : b[a];
                b = d - e ? b[e] + (b[gc(d)] - b[e]) * (d - e) : b[d];
                return this.quartiles = {
                    q1: a,
                    q3: b
                }
            },
            getMinMax: function() {
                var b = this.values;
                return {
                    min: b[0],
                    max: b[this.dataLength - 1]
                }
            },
            getMean: function() {
                return this.mean
            },
            getMD: function() {
                for (var b = this.mean, d = this.frequencies, a = d.length, c, e = 0; a--;) c = d[a], e += c.frequency * S(c.value - b);
                return e / this.dataLength
            },
            getSD: function() {
                for (var b = this.mean, d = this.values, a = this.dataLength,
                        c = a, e = 0; a--;) e += I(d[a] - b, 2);
                return xc(e) / c
            },
            getQD: function() {
                return .5 * (this.quartiles.q3 - this.quartiles.q1)
            },
            getFrequencies: function() {
                var b = [],
                    d = this.dataLength,
                    a = this.values,
                    c = 0,
                    e, f, g;
                for (g = 0; g < d; g += 1) c += e = a[g], X(b[g]) ? b[g].frequency += 1 : (f = {}, f.value = e, f.frequency = 1, b[g] = f);
                this.sum = c;
                this.frequencies = b
            },
            getMedian: function() {
                var b = this.dataLength,
                    d = .5 * b,
                    a = this.values;
                return 0 === b % 2 ? (a[d] + a[d - 1]) / 2 : a[Xb(d)]
            }
        };
        Fb.prototype.constructor = Fb;
        t("boxandwhisker2d", {
            friendlyName: "Box and Whisker Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "boxandwhisker2d",
            chart: t.errorbar2d.chart,
            drawErrorValue: t.errorbar2d.drawErrorValue,
            decimals: 2,
            maxColWidth: 9E3,
            useErrorAnimation: 1,
            avoidCrispError: 0,
            tooltipsepchar: ": ",
            rendererId: "boxandwhisker",
            fireGroupEvent: !0,
            point: function(b, d, a, c, e, f, p, l, u) {
                var m = e[ea],
                    r = g(c.ignoreemptydatasets, 0),
                    k = m.numberFormatter,
                    n = e.chart.useRoundEdges,
                    q = g(c.showshadow, 1),
                    w = this.colorManager,
                    O = "," + (g(c.useplotgradientcolor, 0) ? Lb(c.plotgradientcolor, w.getColor("plotGradientColor")) : B),
                    F = 2 * p,
                    y = g(c.plotborderthickness, 1),
                    x = h(c.plotbordercolor, w.getColor("plotBorderColor")).split(",")[0],
                    s = h(c.plotborderalpha, "100"),
                    t = "0" == c.showplotborder ? "0" : s,
                    v = g(a.dashed, c.plotborderdashed, 0),
                    xa = g(a.dashlen, c.plotborderdashlen, 5),
                    G = g(a.dashgap, c.plotborderdashgap, 4),
                    qa = h(a.upperboxcolor, c.upperboxcolor, w.getPlotColor(F)),
                    C = h(a.lowerboxcolor, c.lowerboxcolor, w.getPlotColor(F + 1)),
                    K = g(a.upperboxalpha, c.upperboxalpha),
                    I = g(a.lowerboxalpha, c.lowerboxalpha),
                    oa = h(a.upperwhiskercolor, c.upperwhiskercolor,
                        x),
                    S = h(a.lowerwhiskercolor, c.lowerwhiskercolor, x),
                    J = g(a.upperwhiskeralpha, c.upperwhiskeralpha, c.plotborderalpha, "100"),
                    Q = g(a.lowerwhiskeralpha, c.lowerwhiskeralpha, c.plotborderalpha, "100"),
                    U = g(a.upperwhiskerthickness, c.upperwhiskerthickness, y),
                    L = g(a.lowerwhiskerthickness, c.lowerwhiskerthickness, y),
                    H = h(a.upperwhiskerdashed, c.upperwhiskerdashed, 0),
                    N = h(a.lowerwhiskerdashed, c.lowerwhiskerdashed, 0),
                    Y = h(a.upperwhiskerdashlen, c.upperwhiskerdashlen, 5),
                    R = h(a.lowerwhiskerdashlen, c.lowerwhiskerdashlen, 5),
                    P = h(a.upperwhiskerdashgap,
                        c.upperwhiskerdashgap, 4),
                    za = h(a.lowerwhiskerdashgap, c.lowerwhiskerdashgap, 4),
                    Z = h(a.upperquartilecolor, c.upperquartilecolor, x),
                    W = h(a.lowerquartilecolor, c.lowerquartilecolor, x),
                    aa = h(a.upperboxbordercolor, c.upperboxbordercolor, x),
                    ca = h(a.lowerboxbordercolor, c.lowerboxbordercolor, x),
                    Jc = h(a.mediancolor, c.mediancolor, x),
                    ba = h(a.upperquartilealpha, c.upperquartilealpha, n ? 0 : s),
                    na = h(a.lowerquartilealpha, c.lowerquartilealpha, n ? 0 : s),
                    Ta = h(a.upperboxborderalpha, c.upperboxborderalpha, n ? 0 : t),
                    ja = h(a.lowerboxborderalpha,
                        c.lowerboxborderalpha, n ? 0 : t),
                    la = h(a.medianalpha, c.medianalpha, s),
                    ha = h(a.upperquartilethickness, c.upperquartilethickness, y),
                    ia = h(a.lowerquartilethickness, c.lowerquartilethickness, y),
                    ma = h(a.upperboxborderthickness, c.upperboxborderthickness, y),
                    ta = h(a.lowerboxborderthickness, c.lowerboxborderthickness, y),
                    ga = h(a.medianthickness, c.medianthickness, y),
                    Zc = h(a.upperquartiledashed, c.upperquartiledashed, v),
                    ua = h(a.lowerquartiledashed, c.lowerquartiledashed, v),
                    pa = h(a.upperboxborderdashed, c.upperboxborderdashed, v),
                    fb = h(a.lowerboxborderdashed, c.lowerboxborderdashed, v),
                    kb = h(a.mediandashed, c.mediandashed, v),
                    ya = h(a.upperquartiledashlen, c.upperquartiledashlen, xa),
                    yc = h(a.lowerquartiledashlen, c.lowerquartiledashlen, xa),
                    ad = h(a.upperboxborderdashlen, c.upperboxborderdashlen, xa),
                    sa = h(a.lowerboxborderdashlen, c.lowerboxborderdashlen, xa),
                    $c = h(a.mediandashlen, c.mediandashlen, xa),
                    ra = h(a.upperquartiledashgap, c.upperquartiledashgap, G),
                    va = h(a.lowerquartiledashgap, c.lowerquartiledashgap, G),
                    wa = h(a.upperboxborderdashgap, c.upperboxborderdashgap,
                        G),
                    Ba = h(a.lowerboxborderdashgap, c.lowerboxborderdashgap, G),
                    Ea = h(a.mediandashgap, c.mediandashgap, G),
                    Ca = {},
                    Da = {},
                    Ga = {},
                    Ha = {},
                    Aa = {},
                    Ja = [],
                    Ka = [],
                    La = [],
                    Na = [],
                    Oa = [],
                    Ma = {
                        polygon: "polygon",
                        spoke: "spoke"
                    },
                    Pa = Ma[h(a.meaniconshape, c.meaniconshape, "polygon").toLowerCase()] || "polygon",
                    Qa = g(a.meaniconradius, c.meaniconradius, 5),
                    Ra = g(a.meaniconsides, c.meaniconsides, 3),
                    Sa = h(a.meaniconcolor, c.meaniconcolor, "000000"),
                    Ua = h(a.meaniconbordercolor, c.meaniconbordercolor, "000000"),
                    Ya = g(a.meaniconalpha, c.meaniconalpha, 100),
                    Wa = Ma[h(a.sdiconshape, c.sdiconshape, "polygon").toLowerCase()] || "polygon",
                    Za = g(a.sdiconradius, c.sdiconradius, 5),
                    bb = g(a.sdiconsides, c.sdiconsides, 3),
                    $a = h(a.sdiconcolor, c.sdiconcolor, "000000"),
                    ab = h(a.sdiconbordercolor, c.sdiconbordercolor, "000000"),
                    eb = g(a.sdiconalpha, c.sdiconalpha, 100),
                    cb = Ma[h(a.mdiconshape, c.mdiconshape, "polygon").toLowerCase()] || "polygon",
                    gb = g(a.mdiconradius, c.mdiconradius, 5),
                    jb = g(a.mdiconsides, c.mdiconsides, 3),
                    ib = h(a.mdiconcolor, c.mdiconcolor, "000000"),
                    mb = h(a.mdiconbordercolor, c.mdiconbordercolor,
                        "000000"),
                    sb = g(a.mdiconalpha, c.mdiconalpha, 100),
                    nb = Ma[h(a.qdiconshape, c.qdiconshape, "polygon").toLowerCase()] || "polygon",
                    ob = g(a.qdiconradius, c.qdiconradius, 5),
                    qb = g(a.qdiconsides, c.qdiconsides, 3),
                    pb = h(a.qdiconcolor, c.qdiconcolor, "000000"),
                    tb = h(a.qdiconbordercolor, c.qdiconbordercolor, "000000"),
                    Db = g(a.qdiconalpha, c.qdiconalpha, 100),
                    zb = Ma[h(a.outliericonshape, c.outliericonshape, "polygon").toLowerCase()] || "polygon",
                    Bb = g(a.outliericonradius, c.outliericonradius, 5),
                    Eb = g(a.outliericonsides, c.outliericonsides,
                        3),
                    Fb = h(a.outliericoncolor, c.outliericoncolor, "000000"),
                    Gb = h(a.outliericonbordercolor, c.outliericonbordercolor, "000000"),
                    Ob = g(a.outliericonalpha, c.outliericonalpha, 100),
                    Cb = (1 - 2 * m.plotSpacePercent) / 2 * (-.5 + p),
                    Nb = g(c.reverselegend, 0),
                    yb = Nb ? -1 : 1,
                    jc = d.legendIndex = 6 * p + (Nb ? 5 : 0),
                    Yb = g(a.showmean, c.showmean, 0),
                    Zb = g(a.showmd, c.showmd, 0),
                    $b = g(a.showsd, c.showsd, 0),
                    cc = g(a.showqd, c.showqd, 0),
                    Xb = g(a.showalloutliers, c.showalloutliers, 0),
                    sc = g(c.outliersupperrangeratio, 0),
                    tc = g(c.outlierslowerrangeratio, 0),
                    ac = !1,
                    kc =
                    Boolean(g(c.showdetailedlegend, 1)),
                    lc = m.tooltipSepChar,
                    Rb = !0,
                    ic = m.dataSeparator,
                    Pb = m.bwCalc,
                    gc = h(d.type, this.defaultSeriesType),
                    rc = e.plotOptions[gc] && e.plotOptions[gc].stacking,
                    rb, Sb, zc, Ac, hc, Kc, Lc, Mc, Nc, Oc, Pc, lb, Hb, Ib, Jb, Kb, uc, Bc, Mb, dc, mc, Qb, ec, Tb, Ub, Vb, Cc, Dc, nc, Ec, T, oc, Wb, pc, fc, Qc, Fc, hb, Va, Rc, qc, Gc, ub, vb, vc, Hc, wb, xb, Ic, xc = function(a, b) {
                        return a - b
                    },
                    wc, Sc, Tc, Uc, Vc, Wc;
                d.errorBarWidthPercent = g(a.whiskerslimitswidthratio, c.whiskerslimitswidthratio, 40);
                Gc = a.data;
                d.name = D(a.seriesname);
                rc || (d.columnPosition =
                    g(u, l, p));
                d.errorBar2D = !0;
                if (0 === g(a.includeinlegend) || void 0 === d.name) Rb = d.showInLegend = !1;
                3 > Ra && (Ra = 3);
                uc = Ab(qa.split(",")[0]);
                Bc = Ab(C.split(",")[0]);
                d.color = {
                    FCcolor: {
                        color: uc + "," + uc + "," + Bc + "," + Bc,
                        alpha: "100,100,100,100",
                        angle: 90,
                        ratio: "0,50,0,50"
                    }
                };
                pc = this.isBar;
                t = (fc = /3d$/.test(e.chart.defaultSeriesType)) ? c.showplotborder ? t : "0" : t;
                x = fc ? h(c.plotbordercolor, "#FFFFFF") : x;
                sc = 0 > sc ? 0 : sc;
                tc = 0 > tc ? 0 : tc;
                for (Vb = 0; Vb < f; Vb += 1) {
                    if (T = Gc && Gc[Vb]) T.value ? (Pb.setArray(T.value), Hc = Pb.getQuartiles(), wb = Hc.q1, xb =
                        Hc.q3, Ic = Pb.getMinMax(), vb = Ub = Ic.min, ub = Ic.max, vc = Pb.getMedian(), Hb = Pb.getMean(), Jb = Pb.getMD(), Ib = Pb.getSD(), Kb = Pb.getQD(), Tb = ec = ub) : (wb = k.getCleanValue(T.q1), xb = k.getCleanValue(T.q3), vb = Ub = k.getCleanValue(T.min), ub = k.getCleanValue(T.max), vc = k.getCleanValue(T.median), Tb = ec = ub, Hb = Ac = k.getCleanValue(T.mean), Jb = k.getCleanValue(T.md), Ib = k.getCleanValue(T.sd), Kb = k.getCleanValue(T.qd));
                    if (T && null != wb && null != xb && null !== ec) {
                        ac = !0;
                        Ac = g(T.showmean, Yb);
                        hc = g(T.showmd, Zb);
                        Kc = g(T.showsd, $b);
                        Lc = g(T.showqd, cc);
                        Sb =
                            m.oriCatTmp[Vb];
                        hb = this.getPointStub(e, c, a, T, ub, xb, vc, wb, vb, Hb, Jb, Ib, Kb, Sb);
                        Va = hb.toolText;
                        Ac ? (Mc = 1, lb = g(T.meaniconalpha, Ya), Va = D(z(h(T.meantooltext, a.meantooltext, c.meantooltext))), Va = void 0 !== Va ? this.getTooltext(Va, e, c, a, T, ub, vb, wb, xb, Aa, Ib, Kb, Jb, Hb, Sb) : "<b>Mean" + lc + "</b>" + k.dataLabels(Hb), Ja.push({
                            y: Hb,
                            toolText: Va,
                            link: hb.link,
                            marker: {
                                enabled: !0,
                                fillColor: A(h(T.meaniconcolor, Sa), lb),
                                lineColor: A(h(T.meaniconbordercolor, Ua), lb),
                                radius: g(T.meaniconradius, Qa),
                                symbol: da(g(T.meaniconsides, Ra), "spoke" ==
                                    h(T.meaniconshape, Pa))
                            }
                        })) : Ja.push({
                            y: null
                        });
                        hc ? (Nc = 1, lb = g(T.mdiconalpha, sb), Va = D(z(h(T.mdtooltext, a.mdtooltext, c.mdtooltext))), Va = void 0 !== Va ? this.getTooltext(Va, e, c, a, T, ub, vb, wb, xb, Aa, Ib, Kb, Jb, Hb, Sb) : "<b>MD" + lc + "</b>" + k.dataLabels(Jb), Ka.push({
                            y: Jb,
                            toolText: Va,
                            link: hb.link,
                            marker: {
                                enabled: !0,
                                fillColor: A(h(T.mdiconcolor, ib), lb),
                                lineColor: A(h(T.mdiconbordercolor, ab), lb),
                                radius: g(T.mdiconradius, gb),
                                symbol: da(g(T.mdiconsides, jb), "spoke" == h(T.mdiconshape, cb))
                            }
                        })) : Ka.push({
                            y: null
                        });
                        Kc ? (Oc = 1, lb = g(T.sdiconalpha,
                            eb), Va = D(z(h(T.sdtooltext, a.sdtooltext, c.sdtooltext))), Va = void 0 !== Va ? this.getTooltext(Va, e, c, a, T, ub, vb, wb, xb, Aa, Ib, Kb, Jb, Hb, Sb) : "<b>SD" + lc + "</b>" + k.dataLabels(Ib), La.push({
                            y: Ib,
                            toolText: Va,
                            link: hb.link,
                            marker: {
                                enabled: !0,
                                fillColor: A(h(T.sdiconcolor, $a), lb),
                                lineColor: A(h(T.sdiconbordercolor, ab), lb),
                                radius: g(T.sdiconradius, Za),
                                symbol: da(g(T.sdiconsides, bb), "spoke" == h(T.sdiconshape, Wa))
                            }
                        })) : La.push({
                            y: null
                        });
                        Lc ? (Pc = 1, lb = g(T.qdiconalpha, Db), Va = D(z(h(T.qdtooltext, a.qdtooltext, c.qdtooltext))), Va = void 0 !==
                            Va ? this.getTooltext(Va, e, c, a, T, ub, vb, wb, xb, Aa, Ib, Kb, Jb, Hb, Sb) : "<b>QD" + lc + "</b>" + k.dataLabels(Kb), Na.push({
                                y: Kb,
                                toolText: Va,
                                link: hb.link,
                                marker: {
                                    enabled: !0,
                                    fillColor: A(h(T.qdiconcolor, pb), lb),
                                    lineColor: A(h(T.qdiconbordercolor, tb), lb),
                                    radius: g(T.qdiconradius, ob),
                                    symbol: da(g(T.qdiconsides, qb), "spoke" == h(T.qdiconshape, nb))
                                }
                            })) : Na.push({
                            y: null
                        });
                        if (Mb = T.outliers) {
                            Mb = Mb.replace(/\s/g, B).split(ic);
                            for (dc = Mb.length; dc--;) Mb[dc] = k.getCleanValue(Mb[dc]);
                            Mb.sort(xc);
                            dc = Mb.length;
                            for (mc = 0; mc < dc; mc += 1)
                                if (Qb = Mb[mc],
                                    Xb && (Tb = Xa(ec, Qb), Ub = E(vb, Qb)), lb = g(T.outliericonalpha, Ob), Qb > ec || Qb < vb) Va = D(z(h(T.outlierstooltext, a.outlierstooltext, c.outlierstooltext))), Va = void 0 !== Va ? this.getTooltext(Va, e, c, a, T, ub, vb, wb, xb, Aa, Ib, Kb, Jb, Hb, Sb, Qb) : "<b>Outlier" + lc + "</b>" + k.dataLabels(Qb), Oa.push({
                                    y: Qb,
                                    toolText: Va,
                                    x: Vb,
                                    link: hb.link,
                                    marker: {
                                        enabled: !0,
                                        fillColor: A(h(T.outliericoncolor, Fb), lb),
                                        lineColor: A(h(T.outliericonbordercolor, Gb), lb),
                                        radius: g(T.outliericonradius, Bb),
                                        symbol: da(g(T.outliericonsides, Eb), "spoke" == h(T.outliericonshape,
                                            zb))
                                    }
                                })
                        }
                        Xb || (zc = Tb - Ub, Tb += zc * sc, Ub -= zc * tc);
                        Cc = h(T.upperboxcolor, qa) + O;
                        Dc = h(T.lowerboxcolor, C) + O;
                        nc = h(T.upperboxalpha, K, c.upperboxalpha, c.plotfillalpha, "100") + B;
                        Ec = h(T.lowerboxalpha, I, c.lowerboxalpha, c.plotfillalpha, "100") + B;
                        oc = h(T.ratio, a.ratio, c.plotfillratio);
                        Wb = h(360 - c.plotfillangle, 90);
                        0 > ec && (Wb = 360 - Wb);
                        Rc = {
                            opacity: nc / 100
                        };
                        qc = E(nc, t) + B;
                        Qc = bc(Cc, nc, oc, Wb, n, x, qc, pc, fc);
                        Fc = bc(Dc, Ec, oc, Wb, n, x, qc, pc, fc);
                        Ca = {
                            value: xb,
                            color: A(h(T.upperquartilecolor, Z), g(T.upperquartilealpha, ba)),
                            borderWidth: g(T.upperquartilethickness,
                                ha),
                            dashStyle: g(T.upperquartiledashed, Zc) ? Fa(h(T.upperquartiledashlen, ya), h(T.upperquartiledashgap, ra), g(T.upperquartilethickness, ha)) : void 0,
                            displayValue: hb.displayValueQ3
                        };
                        Da = {
                            value: wb,
                            color: A(h(T.lowerquartilecolor, W), g(T.lowerquartilealpha, na)),
                            borderWidth: g(T.lowerquartilethickness, ia),
                            dashStyle: g(T.lowerquartiledashed, ua) ? Fa(h(T.lowerquartiledashlen, yc), h(T.lowerquartiledashgap, va), g(T.lowerquartilethickness, ia)) : void 0,
                            displayValue: hb.displayValueQ1
                        };
                        Ga = {
                            color: A(h(T.upperboxbordercolor, aa),
                                g(T.upperboxborderalpha, Ta)),
                            borderWidth: g(T.upperboxborderthickness, ma),
                            dashStyle: g(T.upperboxborderdashed, pa) ? Fa(h(T.upperboxborderdashlen, ad), h(T.upperboxborderdashgap, wa), g(T.upperboxborderthickness, ma)) : void 0
                        };
                        Ha = {
                            color: A(h(T.lowerboxbordercolor, ca), g(T.lowerboxborderalpha, ja)),
                            borderWidth: g(T.lowerboxborderthickness, ta),
                            dashStyle: g(T.lowerboxborderdashed, fb) ? Fa(h(T.lowerboxborderdashlen, sa), h(T.lowerboxborderdashgap, Ba), g(T.lowerboxborderthickness, ta)) : void 0
                        };
                        Aa = {
                            value: vc,
                            color: A(h(T.mediancolor,
                                Jc), g(T.medianalpha, la)),
                            borderWidth: g(T.medianthickness, ga),
                            dashStyle: g(T.mediandashed, kb) ? Fa(h(T.mediandashlen, $c), h(T.mediandashgap, Ea), g(T.medianthickness, ga)) : void 0,
                            displayValue: hb.displayValueMid
                        };
                        wc = [];
                        X(ub) && wc.push({
                            errorValue: ub - xb,
                            toolText: hb.toolText,
                            link: hb.link,
                            errorBarColor: A(h(T.upperwhiskercolor, oa), g(T.upperwhiskeralpha, J)),
                            errorBarThickness: g(T.upperwhiskerthickness, U),
                            dashStyle: g(T.upperwhiskerdashed, H) ? Fa(h(T.upperwhiskerdashlen, Y), h(T.upperwhiskerdashgap, P), g(T.upperwhiskerthickness,
                                U)) : void 0,
                            displayValue: hb.displayValueMax,
                            shadow: {
                                opacity: q ? g(T.upperwhiskeralpha, J) / 250 : 0
                            }
                        });
                        X(vb) && wc.push({
                            errorValue: -(wb - vb),
                            errorStartValue: wb,
                            toolText: hb.toolText,
                            link: hb.link,
                            errorBarColor: A(h(T.lowerwhiskercolor, S), g(T.lowerwhiskeralpha, Q)),
                            errorBarThickness: g(T.lowerwhiskerthickness, L),
                            dashStyle: g(T.lowerwhiskerdashed, N) ? Fa(h(T.lowerwhiskerdashlen, R), h(T.lowerwhiskerdashgap, za), g(T.lowerwhiskerthickness, L)) : void 0,
                            displayValue: hb.displayValueMin,
                            shadow: {
                                opacity: q ? g(T.lowerwhiskeralpha,
                                    Q) / 250 : 0
                            }
                        });
                        rb = this.pointHoverOptions(T, a, c, {
                            upperBoxColor: Cc,
                            upperBoxAlpha: nc,
                            upperBoxBorderColor: h(T.upperboxbordercolor, aa),
                            upperBoxBorderAlpha: g(T.upperboxborderalpha, Ta),
                            upperBoxBorderThickness: Ga.borderWidth,
                            lowerBoxColor: Dc,
                            lowerBoxAlpha: Ec,
                            lowerBoxBorderColor: h(T.lowerboxbordercolor, ca),
                            lowerBoxBorderAlpha: g(T.lowerboxborderalpha, ja),
                            lowerBoxBorderThickness: Ha.borderWidth,
                            upperQuartileColor: h(T.upperquartilecolor, Z),
                            upperQuartileAlpha: g(T.upperquartilealpha, ba),
                            upperQuartileThickness: Ca.borderWidth,
                            lowerQuartileColor: h(T.lowerquartilecolor, W),
                            lowerQuartileAlpha: g(T.lowerquartilealpha, na),
                            lowerQuartileThickness: Da.borderWidth,
                            upperWhiskerColor: h(T.upperwhiskercolor, oa),
                            upperWhiskerThickness: g(T.upperwhiskerthickness, U),
                            upperWhiskerAlpha: g(T.upperwhiskeralpha, J),
                            lowerWhiskerColor: h(T.lowerwhiskercolor, S),
                            lowerWhiskerAlpha: g(T.lowerwhiskeralpha, Q),
                            lowerWhiskerThickness: g(T.lowerwhiskerthickness, L),
                            medianColor: h(T.mediancolor, Jc),
                            medianAlpha: g(T.medianalpha, la),
                            medianThickness: g(T.medianthickness,
                                ga)
                        });
                        rb.enabled && (rb.upperBox.fill = ka(bc(rb.upperBox.color, rb.upperBox.alpha, oc, Wb, n, x, qc, pc, fc)[0].FCcolor), delete rb.upperBox.color, delete rb.upperBox.alpha, rb.lowerBox.fill = ka(bc(rb.lowerBox.color, rb.lowerBox.alpha, oc, Wb, n, x, qc, pc, fc)[0].FCcolor), delete rb.lowerBox.color, delete rb.lowerBox.alpha);
                        d.data.push(M(hb, {
                            y: xb,
                            errorValue: wc,
                            shadow: Rc,
                            color: Qc[0],
                            toolText: hb.toolText,
                            lowerboxColor: Fc[0],
                            lowerboxBorderColor: Fc[1],
                            borderWidth: 0,
                            upperQuartile: Ca,
                            lowerQuartile: Da,
                            upperBoxBorder: Ga,
                            lowerBoxBorder: Ha,
                            median: Aa,
                            hoverEffects: rb
                        }));
                        this.pointValueWatcher(e, Tb);
                        this.pointValueWatcher(e, Ub)
                    } else d.data.push({
                        y: null
                    }), Ka.push({
                        y: null
                    }), La.push({
                        y: null
                    }), Na.push({
                        y: null
                    }), Ja.push({
                        y: null
                    })
                }
                d.showInLegend = Rb && (ac || !r);
                d.legendFillColor = A(uc, 20);
                Sc = {
                    type: "line",
                    name: "Mean",
                    relatedSeries: "boxandwhisker",
                    data: Ja,
                    legendIndex: jc + yb,
                    showInLegend: !!Mc && Rb && kc,
                    marker: {
                        fillColor: A(Sa, 100),
                        lineColor: A(Ua, 100),
                        radius: Qa,
                        symbol: da(Ra, "spoke" == Pa)
                    },
                    color: g(c.drawmeanconnector, a.drawmeanconnector, 0) ? A(h(a.meanconnectorcolor,
                        c.meanconnectorcolor, Sa), g(a.meanconnectoralpha, c.meanconnectoralpha, 100)) : V,
                    lineWidth: g(c.drawmeanconnector, a.drawmeanconnector, 0) ? g(a.meanconnectorthickness, c.meanconnectorthickness, 1) : 0,
                    shadow: 0,
                    legendFillColor: d.legendFillColor
                };
                Tc = {
                    type: "line",
                    name: "SD",
                    relatedSeries: "boxandwhisker",
                    data: La,
                    legendIndex: jc + 2 * yb,
                    showInLegend: !!Oc && Rb && kc,
                    marker: {
                        fillColor: A($a, 100),
                        lineColor: A(ab, 100),
                        radius: Za,
                        symbol: da(bb, "spoke" == Wa)
                    },
                    color: g(c.drawsdconnector, a.drawsdconnector, 0) ? A(h(a.sdconnectorcolor, c.sdconnectorcolor,
                        $a), g(a.sdconnectoralpha, c.sdconnectoralpha, 100)) : V,
                    lineWidth: g(c.drawsdconnector, a.drawsdconnector, 0) ? g(a.sdconnectorthickness, c.sdconnectorthickness, 1) : 0,
                    shadow: 0,
                    pointStart: Cb,
                    legendFillColor: d.legendFillColor
                };
                Uc = {
                    type: "line",
                    name: "MD",
                    relatedSeries: "boxandwhisker",
                    data: Ka,
                    legendIndex: jc + 3 * yb,
                    showInLegend: !!Nc && Rb && kc,
                    marker: {
                        fillColor: A(ib, 100),
                        lineColor: A(mb, 100),
                        radius: gb,
                        symbol: da(jb, "spoke" == cb)
                    },
                    color: g(c.drawmdconnector, a.drawmdconnector, 0) ? A(h(a.mdconnectorcolor, c.mdconnectorcolor, ib),
                        g(a.mdconnectoralpha, c.mdconnectoralpha, 100)) : V,
                    lineWidth: g(c.drawmdconnector, a.drawmdconnector, 0) ? g(a.mdconnectorthickness, c.mdconnectorthickness, 1) : 0,
                    shadow: 0,
                    pointStart: Cb,
                    legendFillColor: d.legendFillColor
                };
                Vc = {
                    type: "line",
                    name: "QD",
                    relatedSeries: "boxandwhisker",
                    data: Na,
                    legendIndex: jc + 4 * yb,
                    showInLegend: !!Pc && Rb && kc,
                    marker: {
                        fillColor: A(pb, 100),
                        lineColor: A(tb, 100),
                        radius: ob,
                        symbol: da(qb, "spoke" == nb)
                    },
                    color: g(c.drawqdconnector, a.drawqdconnector, 0) ? A(h(a.qdconnectorcolor, c.qdconnectorcolor, pb), g(a.qdconnectoralpha,
                        c.qdconnectoralpha, 100)) : V,
                    lineWidth: g(c.drawqdconnector, a.drawqdconnector, 0) ? g(a.qdconnectorthickness, c.qdconnectorthickness, 1) : 0,
                    shadow: 0,
                    pointStart: Cb,
                    legendFillColor: d.legendFillColor
                };
                Wc = {
                    type: "line",
                    name: "Outlier",
                    relatedSeries: "boxandwhisker",
                    showInLegend: !(!Oa || !Oa.length) && Rb && kc,
                    data: Oa,
                    legendIndex: jc + 5 * yb,
                    marker: {
                        fillColor: A(Fb, 100),
                        lineColor: A(Gb, 100),
                        radius: Bb,
                        symbol: da(Eb, "spoke" == zb)
                    },
                    color: V,
                    lineWidth: 0,
                    shadow: 0,
                    pointStart: Cb,
                    legendFillColor: d.legendFillColor
                };
                e._meanDataArr.push(Sc);
                e._sdDataArr.push(Tc);
                e._mdDataArr.push(Uc);
                e._qdDataArr.push(Vc);
                e._outliers.push(Wc);
                return d
            },
            series: function(b, d, a) {
                var c = d.series,
                    e = d._meanDataArr = [],
                    f = d._sdDataArr = [],
                    g = d._mdDataArr = [],
                    l = d._qdDataArr = [],
                    u = d._outliers = [],
                    m = d[ea],
                    r = d.yAxis[0],
                    k = 2 * m.plotSpacePercent,
                    n, q, w, s, F;
                m.dataSeparator = h(d.chart.dataseparator, wa);
                m.bwCalc = new Fb(b.chart.calculationmethod, m.numberFormatter, m.dataSeparator);
                t.multiseries.series.call(this, b, d, a);
                a = c && c.length;
                b = Xa(e.length, f.length, g.length, l.length, u.length,
                    a);
                k = (1 - k) / a;
                m = r.min;
                F = r.max;
                d.series = c.concat(e, f, g, l, u);
                for (r = 0; r < a; r += 1)
                    for (q = c[r], n = r, !q.relatedSeries && (q.relatedSeries = []), w = 0; 5 > w; w += 1) n += a, q.relatedSeries.push(n);
                for (w = r = 0; w < b; w += 1, r += 1)
                    if (c = (-.5 * (a - 1) + r) * k, e[r] && (e[r].pointStart = c), f[r] && (f[r].pointStart = c), l[r] && (l[r].pointStart = c), g[r] && (g[r].pointStart = c), u[r] && (u[r].pointStart = c), n = (c = u[r]) && c.data)
                        for (c = 0; c < n.length; c += 1) q = n[c], s = q.y, q.y = s > F || s < m ? null : s;
                delete d._meanDataArr;
                delete d._sdDataArr;
                delete d._mdDataArr;
                delete d._qdDataArr;
                delete d._outliers
            },
            getTooltext: function(b, d, a, c, e, f, g, l, h, m, r, k, n, q, w, s) {
                d = this.numberFormatter;
                return bb(b, [1, 2, 3, 4, 5, 6, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80], {
                    maxValue: f,
                    maxDataValue: d.dataLabels(f),
                    minValue: g,
                    minDataValue: d.dataLabels(g),
                    Q1: d.dataLabels(l),
                    unformattedQ1: l,
                    Q3: d.dataLabels(h),
                    unformattedQ3: h,
                    median: d.dataLabels(m),
                    unformattedMedian: m,
                    SD: d.dataLabels(r),
                    unformattedSD: r,
                    QD: d.dataLabels(k),
                    unformattedQD: k,
                    MD: d.dataLabels(n),
                    unformattedMD: n,
                    mean: d.dataLabels(q),
                    unformattedMean: q,
                    label: z(w),
                    yaxisName: z(a.yaxisname),
                    xaxisName: z(a.xaxisname),
                    formattedValue: d.dataLabels(s),
                    value: s
                }, {
                    value: s
                }, a, c)
            },
            pointHoverOptions: function(b, d, a, c) {
                var e = g(b.showhovereffect, d.showhovereffect, a.plothovereffect, a.showhovereffect),
                    f = g(b.highlightonhover, d.highlightonhover, d.highlightplotonhover, a.highlightonhover, a.highlightplotonhover, e),
                    p = {},
                    l = {},
                    u = {},
                    m = {},
                    r = {},
                    k = {},
                    n = {},
                    q = {},
                    w = {},
                    s;
                p.color = h(b.upperboxhovercolor, d.upperboxhovercolor, a.plotfillhovercolor, a.upperboxhovercolor);
                p.alpha = h(b.upperboxhoveralpha,
                    d.upperboxhoveralpha, a.upperboxhoveralpha);
                n.color = h(b.upperboxborderhovercolor, d.upperboxborderhovercolor, a.upperboxborderhovercolor);
                n.alpha = h(b.upperboxborderhoveralpha, d.upperboxborderhoveralpha, a.upperboxborderhoveralpha);
                n.thickness = g(b.upperboxborderhoverthickness, d.upperboxborderhoverthickness, a.upperboxborderhoverthickness);
                l.color = h(b.lowerboxhovercolor, d.lowerboxhovercolor, a.plotfillhovercolor, a.lowerboxhovercolor);
                l.alpha = h(b.lowerboxhoveralpha, d.lowerboxhoveralpha, a.lowerboxhoveralpha);
                q.color = h(b.lowerboxborderhovercolor, d.lowerboxborderhovercolor, a.lowerboxborderhovercolor);
                q.alpha = h(b.lowerboxborderhoveralpha, d.lowerboxborderhoveralpha, a.lowerboxborderhoveralpha);
                q.thickness = g(b.lowerboxborderhoverthickness, d.lowerboxborderhoverthickness, a.lowerboxborderhoverthickness);
                r.color = h(b.upperwhiskerhovercolor, d.upperwhiskerhovercolor, a.upperwhiskerhovercolor);
                r.alpha = h(b.upperwhiskerhoveralpha, d.upperwhiskerhoveralpha, a.upperwhiskerhoveralpha);
                r.thickness = h(b.upperwhiskerhoverthickness,
                    d.upperwhiskerhoverthickness, a.upperwhiskerhoverthickness);
                k.color = h(b.lowerwhiskerhovercolor, d.lowerwhiskerhovercolor, a.lowerwhiskerhovercolor);
                k.alpha = h(b.lowerwhiskerhoveralpha, d.lowerwhiskerhoveralpha, a.lowerwhiskerhoveralpha);
                k.thickness = h(b.lowerwhiskerhoverthickness, d.lowerwhiskerhoverthickness, a.lowerwhiskerhoverthickness);
                u.color = h(b.upperquartilehovercolor, d.upperquartilehovercolor, a.upperquartilehovercolor);
                u.alpha = h(b.upperquartilehoveralpha, d.upperquartilehoveralpha, a.upperquartilehoveralpha);
                u.thickness = h(b.upperquartilehoverthickness, d.upperquartilehoverthickness, a.upperquartilehoverthickness);
                m.color = h(b.lowerquartilehovercolor, d.lowerquartilehovercolor, a.lowerquartilehovercolor);
                m.alpha = h(b.lowerquartilehoveralpha, d.lowerquartilehoveralpha, a.lowerquartilehoveralpha);
                m.thickness = h(b.lowerquartilehoverthickness, d.lowerquartilehoverthickness, a.lowerquartilehoverthickness);
                w.color = h(b.medianhovercolor, d.medianhovercolor, a.medianhovercolor);
                w.alpha = h(b.medianhoveralpha, d.medianhoveralpha,
                    a.medianhoveralpha);
                w.thickness = h(b.medianhoverthickness, d.medianhoverthickness, a.medianhoverthickness);
                b = !!h(p.color, p.alpha, n.color, n.alpha, n.thickness, l.color, l.alpha, q.color, q.thickness, q.alpha, r.color, r.alpha, r.thickness, k.color, k.alpha, k.thickness, u.color, u.alpha, u.thickness, m.color, m.alpha, m.thickness, w.color, w.alpha, w.thickness, f);
                void 0 === e && void 0 === f && b && (f = 0);
                if (void 0 === e && b || e) s = !0, p.color = h(p.color, f ? Ka(c.upperBoxColor, 70) : c.upperBoxColor), p.alpha = h(p.alpha, c.upperBoxAlpha), l.color =
                    h(l.color, f ? Ka(c.lowerBoxColor, 70) : c.lowerBoxColor), l.alpha = h(l.alpha, c.lowerBoxAlpha), n.color = h(n.color, c.upperBoxBorderColor), n.alpha = g(n.alpha, c.upperBoxBorderAlpha), n.stroke = A(n.color, n.alpha), n["stroke-width"] = g(n.thickness, c.upperBoxBorderThickness), delete n.color, delete n.alpha, delete n.thickness, q.color = h(q.color, c.lowerBoxBorderColor), q.alpha = h(q.alpha, c.lowerBoxBorderAlpha), q.stroke = A(q.color, q.alpha), q["stroke-width"] = g(q.thickness, c.lowerBoxBorderThickness), delete q.color, delete q.alpha,
                    delete q.thickness, r.color = h(r.color, c.upperWhiskerColor, 70), r.alpha = h(r.alpha, c.upperWhiskerAlpha), r.stroke = A(r.color, r.alpha), r["stroke-width"] = h(r.thickness, c.upperWhiskerThickness), delete r.color, delete r.alpha, delete r.thickness, k.color = h(k.color, c.lowerWhiskerColor, 70), k.alpha = h(k.alpha, c.lowerWhiskerAlpha), k.stroke = A(k.color, k.alpha), k["stroke-width"] = h(k.thickness, c.lowerWhiskerThickness), delete k.color, delete k.alpha, delete k.thickness, u.color = h(u.color, c.upperQuartileColor, 70), u.alpha = h(u.alpha,
                        c.upperQuartileAlpha), u.stroke = A(u.color, u.alpha), u["stroke-width"] = h(u.thickness, c.upperQuartileThickness), delete u.color, delete u.alpha, delete u.thickness, m.color = h(m.color, c.lowerQuartileColor, 70), m.alpha = h(m.alpha, c.lowerQuartileAlpha), m.stroke = A(m.color, m.alpha), m["stroke-width"] = h(m.thickness, c.lowerQuartileThickness), delete m.color, delete m.alpha, delete m.thickness, w.color = h(w.color, c.medianColor, 70), w.alpha = h(w.alpha, c.medianAlpha), w.stroke = A(w.color, w.alpha), w["stroke-width"] = h(w.thickness,
                        c.medianThickness), delete w.color, delete w.alpha, delete w.thickness;
                return {
                    enabled: s,
                    upperBox: p,
                    upperBoxBorder: n,
                    lowerBox: l,
                    lowerBoxBorder: q,
                    upperQuartile: u,
                    lowerQuartile: m,
                    upperWhisker: r,
                    lowerWhisker: k,
                    median: w
                }
            },
            getPointStub: function(b, d, a, c, e, f, p, l, u, m, r, k, n, q) {
                var w = B,
                    w = b[ea],
                    s = w.tooltipSepChar,
                    F = this.numberFormatter,
                    y = g(c.showvalue, a.showvalues, d.showvalues, 1),
                    x = {
                        "true": F.dataLabels(e),
                        "false": B
                    },
                    $ = {
                        "true": F.dataLabels(f),
                        "false": B
                    },
                    t = {
                        "true": F.dataLabels(p),
                        "false": B
                    },
                    v = {
                        "true": F.dataLabels(l),
                        "false": B
                    },
                    F = {
                        "true": F.dataLabels(u),
                        "false": B
                    };
                w.showTooltip ? (w = D(z(h(c.tooltext, a.plottooltext, w.tooltext))), w = void 0 !== w ? this.getTooltext(w, b, d, a, c, e, u, l, f, p, k, n, r, m, q) : "<b>Maximum" + s + "</b>" + x[!0] + "<br/><b>Q3" + s + "</b>" + $[!0] + "<br/><b>Median" + s + "</b>" + t[!0] + "<br/><b>Q1" + s + "</b>" + v[!0] + "<br/><b>Minimum" + s + "</b>" + F[!0]) : w = B;
                return {
                    toolText: w,
                    link: h(c.link),
                    categoryLabel: q,
                    displayValueMax: x[!(!y || !g(c.showmaxvalue, a.showmaxvalues, d.showmaxvalues, 1))],
                    displayValueMid: t[!(!y || !g(c.showmedianvalue, a.showmedianvalues,
                        d.showmedianvalues, 1))],
                    displayValueMin: F[!(!y || !g(c.showminvalue, a.showminvalues, d.showminvalues, 1))],
                    displayValueQ3: $[!(!y || !g(c.showq3value, a.showq3values, d.showq3values, 0))],
                    displayValueQ1: v[!(!y || !g(c.showq1value, a.showq1values, d.showq1values, 0))]
                }
            }
        }, t.multiseries);
        t("heatmap", {
            friendlyName: "Heatmap Chart",
            standaloneInit: !0,
            creditLabel: !1,
            defaultSeriesType: "heatmap",
            tooltipsepchar: ": ",
            tooltipConstraint: "chart",
            rendererId: "heatmap",
            series: function(b, d, a) {
                var c = b.chart,
                    e = d.chart,
                    f = d[ea],
                    p = this.colorManager,
                    l = d.series,
                    u = this.numberFormatter,
                    m = b.rows && b.rows.row,
                    r = m && m.length,
                    k = b.columns && b.columns.column,
                    n = k && k.length,
                    q = b.dataset,
                    w = q && q.data,
                    O = b.colorrange || {},
                    F = f.mapByPercent = g(O.mapbypercent, 0),
                    y = f.mapByCategory = g(c.mapbycategory, 0),
                    O = !y && g(O.gradient, 0),
                    x = h(c.plotfillalpha, 100),
                    $ = g(c.showlabels, c.showlabel, 1),
                    t = g(c.showplotborder, 1),
                    v = t ? g(c.plotborderthickness, 1) : 0,
                    p = h(c.plotbordercolor, p.getColor("plotBorderColor")),
                    t = h(c.plotborderalpha, t ? 95 : 0).toString(),
                    p = A(p, t),
                    t = g(c.plotborderdashed, 0),
                    xa = g(c.plotborderdashlen,
                        5),
                    w = g(c.plotborderdashgap, 4),
                    xa = t ? Fa(xa, w, v) : void 0,
                    G = s.colorRange,
                    qa = 0,
                    E = 0,
                    K = 0,
                    C = 0,
                    oa = f.rowIdObj = {},
                    S = f.columnIdObj = {},
                    J = [],
                    t = [],
                    I = 0,
                    U = [],
                    L, H, N, Y, R, P, za, Z, W;
                e.showHoverEffect = g(c.showhovereffect, 1);
                O && (d.legend.type = "gradient");
                d.legend.enabled = Boolean(g(c.showlegend, 1));
                for (e = 0; e < r; e += 1) H = m[e], L = H.id, X(L) && L !== B && (qa += 1, oa[L.toLowerCase()] = {
                    index: qa,
                    label: g(H.showlabel, c.showyaxislabels, c.showyaxisnames, $) ? h(H.label, H.name, L) : B
                });
                for (e = 0; e < n; e += 1) N = k[e], m = N.id, X(m) && m !== B && (S[m.toLowerCase()] = {
                    index: E,
                    label: g(N.showlabel, c.showxaxislabels, c.showxaxisnames, $) ? h(N.label, N.name, m) : B
                }, E += 1);
                za = 0;
                for (Z = q && q.length; za < Z; za += 1)
                    for (w = q[za] && q[za].data, e = 0, W = w && w.length; e < W; e += 1)
                        if (k = w[e], P = u.getCleanValue(k.value), null !== P || y) L = D(k.rowid, k.rowids), H = D(L, B).toLowerCase(), m = D(k.columnid, k.columnids), N = D(m, B).toLowerCase(), J.push(P), X(R) || X(Y) || !X(P) || (Y = R = P), R > P && (R = P), Y < P && (Y = P), !X(H) || X(oa[H]) || r || (K += 1, oa[H] = {
                                index: K,
                                label: L
                            }), !X(N) || X(S[N]) || n || (S[N] = {
                                index: C,
                                label: m
                            }, C += 1), H = oa[H], N = S[N], H &&
                            N && (X(U[H.index]) || (U[H.index] = []), U[H.index][N.index] ? t[U[H.index][N.index] - 1] = {
                                rowId: L,
                                columnId: m,
                                categoryId: h(k.colorrangelabel, k.categoryid, k.categoryname, k.category),
                                tlLabel: z(h(k.tllabel, k.ltlabel)),
                                trLabel: z(h(k.trlabel, k.rtlabel)),
                                blLabel: z(h(k.bllabel, k.lblabel)),
                                brLabel: z(h(k.brlabel, k.rblabel)),
                                rowLabel: H.label,
                                columnLabel: N.label,
                                setColor: k.color,
                                setAlpha: h(k.alpha, x),
                                setShowLabel: g(k.showlabel, k.showname, $),
                                colorRangeLabel: k.colorrangelabel,
                                displayValue: k.displayvalue,
                                tooltext: k.tooltext,
                                showvalue: k.showvalue,
                                link: k.link,
                                hoverColor: h(k.hovercolor, c.hovercolor, c.plotfillhovercolor),
                                hoverAlpha: g(k.hoveralpha, c.hoveralpha, c.plotfillhoveralpha),
                                index: I,
                                value: P,
                                y: H.index,
                                x: N.index,
                                _value: k.value,
                                _cleanValue: P
                            } : (I += 1, t.push({
                                rowId: L,
                                columnId: m,
                                categoryId: h(k.colorrangelabel, k.categoryid, k.categoryname, k.category),
                                tlLabel: z(h(k.tllabel, k.ltlabel)),
                                trLabel: z(h(k.trlabel, k.rtlabel)),
                                blLabel: z(h(k.bllabel, k.lblabel)),
                                brLabel: z(h(k.brlabel, k.rblabel)),
                                rowLabel: H.label,
                                columnLabel: N.label,
                                setColor: k.color &&
                                    k.color.replace(ob, Ma),
                                setAlpha: h(k.alpha, x),
                                setShowLabel: g(k.showlabel, k.showname, $),
                                colorRangeLabel: k.colorrangelabel,
                                displayValue: k.displayvalue,
                                tooltext: k.tooltext,
                                showvalue: k.showvalue,
                                link: k.link,
                                hoverColor: h(k.hovercolor, c.hovercolor, c.plotfillhovercolor),
                                hoverAlpha: g(k.hoveralpha, c.hoveralpha, c.plotfillhoveralpha),
                                index: I,
                                value: P,
                                y: H.index,
                                x: N.index,
                                _value: k.value,
                                _cleanValue: P
                            }), U[H.index][N.index] = I));
                if (t.length) {
                    f.rowCount = qa = Xa(qa, K);
                    f.columnCount = Xa(E, C);
                    for (e in oa) oa[e].index = qa - oa[e].index +
                        1;
                    f.minHeatValue = R;
                    f.maxHeatValue = Y;
                    r = Y - R;
                    F = F && !y;
                    d.colorRange = new G({
                        colorRange: b.colorrange,
                        dataMin: R,
                        dataMax: Y,
                        sortLegend: g(c.autoorderlegendicon, c.autoorderlegendicon, 0),
                        mapByCategory: y,
                        defaultColor: "cccccc",
                        numberFormatter: u
                    });
                    if (O) l.push({
                        data: [],
                        hoverEffects: this.parseSeriesHoverOptions(b, d, q, a),
                        borderWidth: v,
                        borderColor: p,
                        dashStyle: xa
                    });
                    else
                        for (u = (c = d.colorRange.colorArr) && c.length, e = 0; e < u; e += 1) Y = c[e], X(Y.code) && l.push({
                            data: [],
                            hoverEffects: this.parseSeriesHoverOptions(b, d, q, a),
                            name: h(Y.label,
                                Y.name),
                            borderWidth: v,
                            borderColor: p,
                            color: Ab(Y.code),
                            dashStyle: xa
                        });
                    l.length || l.push({
                        data: [],
                        showInLegend: !1
                    });
                    for (e = 0; e < t.length; e += 1) k = t[e], F && (k.value = na((k.value - R) / r * 1E4) / 100), a = d.colorRange.getColorObj(y ? k.categoryId : k.value), a.outOfRange || (k.y = f.rowCount - k.y + 1, k.color = A(h(k.setColor, a.code), h(k.setAlpha, x)), k.hoverColor = A(h(k.hoverColor, k.setColor, a.code), g(k.hoverAlpha, 25)), k = M(k, this.getPointStub(k, k.value, B, d, b)), O ? l[0].data.push(k) : l[a.seriesIndex] && l[a.seriesIndex].data.push(k))
                } else d.series = [];
                this.configureAxis(d, b)
            },
            getPointStub: function(b, d, a, c, e) {
                a = c[ea];
                var f = e.chart,
                    p = a.tooltipSepChar,
                    l = a.mapByCategory;
                e = a.mapByPercent && !l;
                var u = this.numberFormatter,
                    m = b._cleanValue;
                c = u.percentValue(d);
                d = null === m ? d : u.dataLabels(m);
                var r = D(z(h(b.tooltext, a.tooltext))),
                    u = D(z(b.displayValue)),
                    k = l ? u : h(u, d),
                    n = g(b.showvalue, a.showValues),
                    q = D(f.tltype, B),
                    w = D(f.trtype, B),
                    s = D(f.bltype, B),
                    F = D(f.brtype, B),
                    l = b.tlLabel,
                    m = b.trLabel,
                    y = b.blLabel,
                    x = b.brLabel,
                    t;
                q !== B && (q = "<b>" + q + p + "</b>");
                w !== B && (w = "<b>" + w + p + "</b>");
                s !== B && (s = "<b>" + s + p + "</b>");
                F !== B && (F = "<b>" + F + p + "</b>");
                a = a.showTooltip ? void 0 !== r ? bb(r, [1, 2, 5, 6, 7, 14, 93, 94, 95, 96, 97, 98, 112, 113, 114, 115, 116, 117], {
                    formattedValue: d,
                    percentValue: e ? c : B,
                    yaxisName: z(f.yaxisname),
                    xaxisName: z(f.xaxisname)
                }, {
                    value: b._value,
                    displayvalue: b.displayValue
                }, f, b) : k === B ? !1 : (e ? "<b>Value" + p + "</b>" + d + "<br/><b>Percentage" + p + "</b>" + c : k) + (b.tlLabel !== B ? "<br/>" + (q + b.tlLabel) : B) + (b.trLabel !== B ? "<br/>" + w + b.trLabel : B) + (b.blLabel !== B ? "<br/>" + s + b.blLabel : B) + (b.brLabel !== B ? "<br/>" + F + b.brLabel :
                    B) : B;
                n ? t = void 0 !== u ? u : e ? c : d : l = m = y = x = t = B;
                b = h(b.link);
                return {
                    displayValue: t,
                    toolText: a,
                    link: b,
                    tlLabel: l,
                    trLabel: m,
                    blLabel: y,
                    brLabel: x
                }
            },
            configureAxis: function(b, d) {
                var a = b[ea],
                    c = d.chart,
                    e = b.yAxis[0],
                    f = b.xAxis,
                    p = a.rowCount,
                    l = a.columnCount,
                    u = a.axisGridManager,
                    m = a.rowIdObj,
                    r = a.columnIdObj,
                    k = this.colorManager,
                    n = A(h(c.vdivlinecolor, c.divlinecolor, k.getColor("divLineColor")), g(c.vdivlinealpha, c.divlinealpha, k.getColor("divLineAlpha"))),
                    q = g(c.vdivlinethickness, c.divlinethickness, 1),
                    w = g(c.vdivlinedashed, c.vdivlineisdashed,
                        c.divlinedashed, c.divlineisdashed, 0) ? Fa(g(c.vdivlinedashlen, c.divlinedashlen, 4), g(c.vdivlinedashgap, c.divlinedashgap, 2), q) : void 0,
                    s = A(h(c.hdivlinecolor, c.divlinecolor, k.getColor("divLineColor")), g(c.hdivlinealpha, c.divlinealpha, k.getColor("divLineAlpha"))),
                    F = g(c.hdivlinethickness, c.divlinethickness, 1),
                    y = g(c.hdivlinedashed, c.hdivlineisdashed, c.divlinedashed, c.divlineisdashed, 0) ? Fa(g(c.hdivlinedashlen, c.divlinedashlen, 4), g(c.hdivlinedashgap, c.divlinedashgap, 2), q) : void 0,
                    x, t;
                e.min = 0;
                e.max = p;
                for (t in m) x =
                    m[t], k = x.index, x = x.label, u.addAxisGridLine(e, k + -.5, x, .1, void 0, V, 1), k < p && e.plotBands.push({
                        isTrend: !0,
                        color: s,
                        value: k,
                        width: F,
                        dashStyle: y,
                        zIndex: 3
                    });
                e.labels.enabled = !1;
                e.gridLineWidth = 0;
                e.alternateGridColor = V;
                e.title.text = z(c.yaxisname);
                f.min = -.5;
                f.max = e = l + -.5;
                f.opposite = g(c.placexaxislabelsontop, 0);
                a.x.catCount = l;
                for (t in r) a = r[t], k = a.index, x = a.label, u.addXaxisCat(f, k, 1, x, a, {}, c), k -= -.5, k < e && f.plotBands.push({
                    isTrend: !0,
                    color: n,
                    value: k,
                    width: q,
                    dashStyle: w,
                    zIndex: 3
                });
                f.labels.enabled = !1;
                f.gridLineWidth =
                    0;
                f.alternateGridColor = V;
                f.title.text = z(c.xaxisname)
            },
            xAxisMinMaxSetter: function() {},
            placeLegendBlockRight: function() {
                return "gradient" === arguments[0].legend.type ? s.placeGLegendBlockRight ? s.placeGLegendBlockRight.apply(this, arguments) : 0 : s.placeLegendBlockRight.apply(this, arguments)
            },
            placeLegendBlockBottom: function() {
                return "gradient" === arguments[0].legend.type ? s.placeGLegendBlockBottom ? s.placeGLegendBlockBottom.apply(this, arguments) : 0 : s.placeLegendBlockBottom.apply(this, arguments)
            }
        }, t.column2dbase);
        t("renderer.multiaxisline", {
            legendClick: function(b, d, a) {
                var c = this.options.series,
                    e = this.yAxis[c[b.index].yAxis],
                    f = e.axisData._relatedSeries,
                    g = f.length,
                    l = !1;
                t["renderer.cartesian"].legendClick.call(this, b, d, a);
                if (!a) {
                    for (; g-- && !(l = c[f[g]].visible););
                    e.checkBox.element.checked = l
                }
            }
        }, t["renderer.cartesian"]);
        t("renderer.candlestick", {
            drawPlotCandlestickbar: function(b, d) {
                var a = b.data,
                    c = a.length,
                    e = b.items,
                    f = b.graphics = [],
                    p = this.paper,
                    l = this.layers,
                    h = this.definition.chart,
                    m = this.options.plotOptions.series,
                    r = this.xAxis[d.xAxis || 0],
                    k = this.yAxis[d.yAxis || 0],
                    n = d.numColumns || 1,
                    q = d.columnPosition || 0,
                    w = !1 === d.visible ? "hidden" : "visible",
                    s = r.getAxisPosition(0),
                    s = r.getAxisPosition(1) - s,
                    F = m.groupPadding,
                    y = m.maxColWidth,
                    h = (1 - .01 * (h && h.plotspacepercent)) * s || E(s * (1 - 2 * F), y * n),
                    n = h / n * q - h / 2,
                    x, t, v, B, z, F = l.dataset = l.dataset || p.group("dataset-orphan");
                F.column = F.column || p.group("columns", F);
                for (l = 0; l < c; l += 1) {
                    q = a[l];
                    s = q.y;
                    x = null;
                    if (null === s) {
                        if (y = e[l]) x = y.graphic, x.attr({
                            height: 0
                        })
                    } else y = g(q.x, l), h = q.link, y = r.getAxisPosition(y),
                        x = q.previousY, t = k.getAxisPosition(x), x = k.getAxisPosition(s), v = k.getAxisPosition(q.high), B = k.getAxisPosition(q.low), S(x - t), z = n, t = ["M", y, B, "L", y, v, "M", y, x, "L", y + z, x, "M", y, t, "L", y - z, t], (y = e[l]) || (y = e[l] = {
                            index: l,
                            value: s,
                            graphic: p.path(t, F),
                            dataLabel: null,
                            tracker: null
                        }), x = y.graphic, x.attr({
                            path: t,
                            fill: ka(q.color),
                            stroke: ka(q.borderColor),
                            "stroke-width": q.borderWidth,
                            "stroke-dasharray": q.dashStyle,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "shape-rendering": "crisp",
                            cursor: h ? "pointer" : "",
                            visibility: w
                        }).shadow(m.shadow ||
                            q.shadow), this.drawTracker && this.drawTracker.call(this, b, d, l);
                    x && f.push(x);
                    this.drawTracker && this.drawTracker.call(this, b, d, l)
                }
                b.visible = !1 !== d.visible;
                return b
            },
            drawCanvas: function() {
                t["renderer.cartesian"].drawCanvas.call(this, arguments);
                if (this.options.subCharts && this.options.subCharts[0]) {
                    var b = this.options,
                        b = (b.subCharts && b.subCharts[0]).chart || {},
                        d = this.paper,
                        a = this.elements,
                        c = a.volumeCanvas,
                        e = b.marginTop + b.top,
                        f = b.left = b.marginLeft,
                        p = b.width - b.marginLeft - b.marginRight,
                        l = b.height - b.marginBottom,
                        h = g(b.plotBorderRadius, 0),
                        m = b.plotBorderWidth,
                        r = b.plotBackgroundColor,
                        k = .5 * m,
                        n = b.plotBorderColor,
                        q = this.layers.canvas;
                    c || (a.volumeCanvas = d.rect(f - k, e - k - 1, p + m, l + m, h, q).attr({
                        fill: ka(r),
                        "stroke-width": m,
                        stroke: n,
                        "stroke-linejoin": 2 < m ? "round" : "miter",
                        "shape-rendering": "crisp"
                    }).shadow(b.plotShadow).crisp())
                }
            },
            drawTracker: function(b, d, a) {
                var c = this,
                    e = c.paper,
                    f = c.xAxis[0],
                    p = b.data[a],
                    h = c.yAxis[0].getAxisPosition(p.y),
                    u = f.getAxisPosition(g(p.x, a));
                b = b.items[a];
                a = ga ? 40 : 20;
                var m = c.layers.tracker,
                    r = c.definition.chart,
                    k = c.options.plotOptions.series,
                    n = f.getAxisPosition(0),
                    f = f.getAxisPosition(1) - n,
                    n = k.groupPadding,
                    k = k.maxColWidth,
                    q = ((1 - .01 * (r && r.plotspacepercent)) * f || E(f * (1 - 2 * n), 1 * k)) / 1,
                    w = .5 * -q,
                    r = c.elements,
                    f = r.canvas.getBBox(),
                    k = r.volumeCanvas && r.volumeCanvas.getBBox(),
                    n = r.rollOverBand,
                    s = b && b.tracker,
                    q = {
                        "stroke-width": q,
                        ishot: !0,
                        stroke: ka(c.options.chart.rollOverBandColor),
                        fill: ka(c.options.chart.rollOverBandColor),
                        visibility: "hidden"
                    };
                k && s && !d.doNotUseBand && (s || (s = b.tracker = e.circle(u, h, a, m).attr({
                    "stroke-width": 0,
                    fill: ua
                })), s.data("x", u), p.toolText && s.tooltip(p.toolText), n || (n = r.rollOverBand = e.path(["M", 0, f.y, "L", 0, f.y2, "M", 0, k.y, "L", 0, k.y2]).attr(q), c.layers.dataset.appendChild(n), n.toBack()), s.mouseover(function() {
                    c.rollOver(c, this, w)
                }).mouseout(function() {
                    c.rollOut(c)
                }))
            },
            rollOver: function(b, d) {
                b.elements.rollOverBand.transform("t" + d.data("x") + ",0").show()
            },
            rollOut: function(b) {
                b.elements.rollOverBand.hide()
            }
        }, t["renderer.cartesian"]);
        t("renderer.spline", {
            drawPlotSpline: function(b, d) {
                var a = this,
                    c = a.paper,
                    e = a.elements,
                    f = a.options,
                    p = f.chart,
                    h = f.plotOptions.series,
                    u = h.dataLabels && h.dataLabels.style || {},
                    m = {
                        fontFamily: u.fontFamily,
                        fontSize: u.fontSize,
                        lineHeight: u.lineHeight,
                        fontWeight: u.fontWeight,
                        fontStyle: u.fontStyle
                    },
                    u = b.items,
                    r = b.graphics = b.graphics || [],
                    k = a.xAxis[d.xAxis || 0],
                    n = a.yAxis[d.yAxis || 0],
                    q = b.data,
                    w = [],
                    s = [],
                    F = !1 === d.visible,
                    y = F ? "hidden" : "visible",
                    x = isNaN(+h.animation) && h.animation.duration || 1E3 * h.animation,
                    t = !1 !== (f.tooltip || {}).enabled,
                    v = a.chartWidth,
                    B = a.chartHeight,
                    f = function() {
                        la.attr({
                            "clip-rect": null
                        });
                        ca.show();
                        Ta.show();
                        ja.show();
                        Q.attr({
                            transform: "...t" + -v + "," + -B
                        })
                    },
                    z, G, A = h.connectNullData,
                    D, K, E, oa, C, J, M = null,
                    U, L = d.lineWidth,
                    H, N, Y, R, P, I, Z, W, S = a.layers,
                    X = S.dataset = S.dataset || c.group("dataset-orphan"),
                    Q = S.datalabels = S.datalabels || c.group("datalables"),
                    ba = S.tracker,
                    S = p.anchorTrackingRadius,
                    aa, Ta, ja, la, ca, ia = [],
                    V, ta, da, ea = function(e, f, g, h, p, k, l, m) {
                        return function() {
                            var n = g.imageUrl,
                                q = g.imageScale,
                                u = g.imageAlpha,
                                w = l.imageHoverAlpha,
                                s = l.imageHoverScale,
                                x = this.width * q * .01,
                                F = this.width * s * .01;
                            Z = {
                                x: e -
                                    this.width * q * .005,
                                y: f - this.height * q * .005,
                                width: x,
                                height: this.height * q * .01,
                                alpha: u
                            };
                            W = {
                                x: e - this.width * s * .005,
                                y: f - this.height * s * .005,
                                width: F,
                                height: this.height * s * .01,
                                alpha: w
                            };
                            w = F > x ? W : Z;
                            h.graphic = R = c.image(n, ca).attr(Z).css({
                                opacity: .01 * u
                            }).data("alwaysInvisible", 0 === q).data("setRolloverProperties", l).data("setRolloverAttr", W).data("setRolloutAttr", Z).data("anchorRadius", q).data("anchorHoverRadius", s);
                            r.push(R);
                            if (oa || t || l) ta = h.tracker = c.rect(ba).attr(w).attr({
                                cursor: oa ? "pointer" : "",
                                stroke: ua,
                                "stroke-width": g.lineWidth,
                                fill: ua,
                                ishot: !0,
                                visibility: y
                            }).data("eventArgs", p).click(function(b) {
                                ya.call(this, a, b)
                            }).hover(function(b) {
                                return function(c) {
                                    a.hoverPlotAnchor(this, c, "DataPlotRollOver", b, a)
                                }
                            }(h), function(b) {
                                return function(c) {
                                    a.hoverPlotAnchor(this, c, "DataPlotRollOut", b, a)
                                }
                            }(h)).tooltip(k);
                            (V = a.drawPlotLineLabel(b, d, m, e, f)) && r.push(V)
                        }
                    },
                    na = function(c, e, f, g, h, p, l) {
                        return function() {
                            (V = f.dataLabel = a.drawPlotLineLabel(b, d, l, c, e)) && r.push(V)
                        }
                    },
                    pa = function(b) {
                        ya.call(this, a, b)
                    },
                    fb = function(b, c) {
                        return function(d) {
                            a.hoverPlotAnchor(this,
                                d, c, b, a)
                        }
                    },
                    p = function(a, b, c, d) {
                        var e = a.length,
                            f = a[e - 1],
                            g = f.length,
                            h = f[0],
                            f = f[g - 2];
                        3 > g || ("R" === h && 3 === g && (a[e - 1][0] = "L"), b && a.push(["L", f, d, c, d, "Z"]))
                    };
                a.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", m);
                Q.insertAfter(X);
                Q.attr({
                    "class": "fusioncharts-datalabels",
                    transform: "...t" + v + "," + B
                });
                x && a.animationCompleteQueue.push({
                    fn: f,
                    scope: a
                });
                m = X.line || (X.line = c.group("line-connector", X));
                Ta = c.group("connector-shadow", m);
                ja = c.group("anchor-shadow", m);
                la = c.group("connector", m);
                ca = c.group("anchors",
                    m);
                ca.hide();
                Ta.hide();
                ja.hide();
                z = 0;
                for (G = q.length; z < G; z += 1)
                    if (D = q[z], E = D.y, R = ta = V = null, null === E) 0 === A && (M = null);
                    else {
                        m = u[z] = {
                            chart: a,
                            index: z,
                            value: E
                        };
                        K = g(D.x, z);
                        oa = D.link;
                        C = D.tooltext || D.toolText;
                        U = n.getAxisPosition(E);
                        K = k.getAxisPosition(K);
                        if ((N = D.marker) && N.enabled)
                            if (H = N.radius, I = N.shadow, Y = N.symbol.split("_"), aa = {
                                    index: z,
                                    link: oa,
                                    value: E,
                                    displayValue: D.displayValue,
                                    categoryLabel: D.categoryLabel,
                                    toolText: D.toolText,
                                    id: b.userID,
                                    datasetIndex: b.index,
                                    datasetName: b.name,
                                    visible: b.visible
                                }, Z = W = {},
                                E = D.rolloverProperties, N.imageUrl) H = new Ya.Image, H.onload = ea(K, U, N, m, aa, C, E, z), H.onerror = na(K, U, m, z), H.src = N.imageUrl;
                            else {
                                E && (Z = {
                                    polypath: [Y[1] || 2, K, U, N.radius, N.startAngle, 0],
                                    fill: ka(N.fillColor),
                                    "stroke-width": N.lineWidth,
                                    stroke: ka(N.lineColor)
                                }, W = {
                                    polypath: [E.sides || 2, K, U, E.radius, E.startAngle, E.dip],
                                    fill: ka(E.fillColor),
                                    "stroke-width": E.lineWidth,
                                    stroke: ka(E.lineColor)
                                });
                                R = m.graphic = c.polypath(Y[1] || 2, K, U, N.radius, N.startAngle, 0, ca).attr({
                                    fill: ka(N.fillColor),
                                    "stroke-width": N.lineWidth,
                                    stroke: ka(N.lineColor),
                                    cursor: oa ? "pointer" : "",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    ishot: !0,
                                    visibility: 0 === H ? "hidden" : y
                                }).data("alwaysInvisible", 0 === H).data("setRolloverProperties", E).data("setRolloverAttr", W).data("setRolloutAttr", Z).data("anchorRadius", H).data("anchorHoverRadius", E && E.radius).shadow(I || !1, ja);
                                if (oa || t || E) H = Xa(H, E && E.radius || 0, S), ta = c.polypath(Y[1] || 2, K, U, H, N.startAngle, 0, ba).attr({
                                    cursor: oa ? "pointer" : "",
                                    stroke: ua,
                                    "stroke-width": 0,
                                    ishot: !0,
                                    fill: ua,
                                    visibility: y
                                });
                                da = ta || R;
                                da.click(pa);
                                (ta ||
                                    R).data("eventArgs", aa).hover(fb(m, "DataPlotRollOver"), fb(m, "DataPlotRollOut")).tooltip(C)
                            }
                        C = ia.length;
                        null !== M ? 2 <= C ? (ia[C - 1].push(K), ia[C - 1].push(U)) : (ia.push(["M", J, M]), ia.push(["R", K, U])) : null === M && 2 <= C && (J = ia[C - 1], "R" === J[0] && 3 === J.length && (J.push(J[1]), J.push(J[2])), ia.push(["M", K, U]), ia.push(["R"]));
                        R && r.push(R);
                        da && r.push(da);
                        J = K;
                        M = U;
                        C = D.color;
                        H = D.dashStyle;
                        s.push(R);
                        m.dataLabel = V;
                        m.tracker = da;
                        N && N.imageUrl || (V = a.drawPlotLineLabel(b, d, z, K, U));
                        V && r.push(V);
                        a.drawTracker && a.drawTracker.call(a,
                            b, d, z)
                    }
                2 <= ia.length && (p(ia, !1), P = b.graphic = c.path(ia, la).attr({
                    "stroke-dasharray": H,
                    "stroke-width": L,
                    stroke: ka(C),
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    visibility: y
                }).shadow(h.shadow && D.shadow, Ta), w.push(P), X.shadow(h.shadow || D.shadow));
                x ? la.attr({
                    "clip-rect": e["clip-canvas-init"]
                }).animate({
                    "clip-rect": e["clip-canvas"]
                }, x, "normal", a.getAnimationCompleteFn()) : (f && f(), f = void 0);
                P && r.push(P);
                b.visible = !F;
                return b
            },
            drawPlotAreaspline: function(b, d) {
                var a = this,
                    c = a.paper,
                    e = a.layers,
                    f = a.options,
                    h = f.chart,
                    l = a.elements,
                    u = f.plotOptions.series,
                    m = u.dataLabels && u.dataLabels.style || {},
                    r = {
                        fontFamily: m.fontFamily,
                        fontSize: m.fontSize,
                        lineHeight: m.lineHeight,
                        fontWeight: m.fontWeight,
                        fontStyle: m.fontStyle
                    },
                    k = a.xAxis[d.xAxis || 0],
                    n = a.yAxis[d.yAxis || 0],
                    q = b.data,
                    w = (m = !1 === d.visible) ? "hidden" : "visible",
                    s = isNaN(+u.animation) && u.animation.duration || 1E3 * u.animation,
                    F = "0" === a.definition.chart.drawfullareaborder,
                    y = !1 !== (f.tooltip || {}).enabled,
                    x, t, v, z, B, f = b.items,
                    G = b.graphics = b.graphics || [],
                    A = null,
                    D, K, E = n.max,
                    C = n.min,
                    E = n.getAxisPosition(0 < E && 0 < C ? C : 0 > E && 0 > C ? E : 0),
                    M = e.tracker,
                    J = e.dataset = e.dataset || c.group("dataset-orphan"),
                    S = e.datalabels = e.datalabels || c.group("datalabels").insertAfter(J),
                    U = h.anchorTrackingRadius,
                    L = a.chartWidth,
                    H = a.chartHeight,
                    e = function() {
                        P.attr({
                            "clip-rect": null
                        });
                        R.show();
                        Y.show();
                        S.attr({
                            transform: "...t" + -L + "," + -H
                        })
                    },
                    N, Y, R, P, I, Z, W = [],
                    C = [],
                    X, Q, aa, ba, ca, V, ja, la, da, ia, ea, ta, na, ha, ma, pa = function(e, f, g, h, p, l, k, m) {
                        return function() {
                            var n = g.imageUrl,
                                q = g.imageScale,
                                r = g.imageAlpha,
                                u = k.imageHoverAlpha,
                                s = k.imageHoverScale,
                                x = this.width * q * .01,
                                t = this.width * s * .01;
                            ea = {
                                x: e - this.width * q * .005,
                                y: f - this.height * q * .005,
                                width: x,
                                height: this.height * q * .01,
                                alpha: r
                            };
                            ta = {
                                x: e - this.width * s * .005,
                                y: f - this.height * s * .005,
                                width: t,
                                height: this.height * s * .01,
                                alpha: u
                            };
                            u = t > x ? ta : ea;
                            h.graphic = V = c.image(n, R).attr(ea).css({
                                opacity: .01 * r
                            }).data("alwaysInvisible", 0 === q).data("setRolloverProperties", k).data("setRolloverAttr", ta).data("setRolloutAttr", ea).data("anchorRadius", q).data("anchorHoverRadius", s);
                            G.push(V);
                            if (z || y || k) ja = h.tracker =
                                c.rect(M).attr(u).attr({
                                    cursor: z ? "pointer" : "",
                                    stroke: ua,
                                    "stroke-width": g.lineWidth,
                                    fill: ua,
                                    ishot: !0,
                                    visibility: w
                                }).data("eventArgs", p).click(function(b) {
                                    ya.call(this, a, b)
                                }).hover(function(b) {
                                    return function(c) {
                                        a.hoverPlotAnchor(this, c, "DataPlotRollOver", b, a)
                                    }
                                }(h), function(b) {
                                    return function(c) {
                                        a.hoverPlotAnchor(this, c, "DataPlotRollOut", b, a)
                                    }
                                }(h)).tooltip(l);
                            (la = h.dataLabel = a.drawPlotLineLabel(b, d, m, e, f)) && G.push(la)
                        }
                    },
                    fb = function(c, e, f, g) {
                        return function() {
                            (la = f.dataLabel = a.drawPlotLineLabel(b, d,
                                g, c, e)) && G.push(la)
                        }
                    },
                    kb = function(b) {
                        ya.call(this, a, b)
                    },
                    ga = function(b, c) {
                        return function(d) {
                            a.hoverPlotAnchor(this, d, c, b, a)
                        }
                    };
                aa = function(a, b, c, d) {
                    var e = a.length,
                        f = a[e - 1],
                        g = f.length,
                        h = f[0],
                        f = f[g - 2];
                    3 > g || ("R" === h && 3 === g && (a[e - 1][0] = "L"), b && a.push(["L", f, d, c, d, "Z"]))
                };
                P = J.area = J.area || c.group("area", J);
                N = J.line || (J.line = c.group("line-connector", J));
                c.group("connector-shadow", N);
                Y = c.group("anchor-shadow", N);
                h = c.group("area-connector", N);
                R = c.group("area-anchors", N);
                R.hide();
                Y.hide();
                a.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label",
                    r);
                S.insertAfter(J);
                S.attr({
                    "class": "fusioncharts-datalabels",
                    transform: "...t" + L + "," + H
                });
                s && a.animationCompleteQueue.push({
                    fn: e,
                    scope: a
                });
                r = 0;
                for (J = q.length; r < J; r += 1)
                    if (x = q[r], v = x.y, N = W.length, X = C.length, V = ja = la = null, 2 <= N && (Q = W[N - 1], B = Q.length), null === v) 0 === u.connectNullData && (A = null);
                    else {
                        ha = f[r] = {
                            chart: a,
                            index: r,
                            value: v
                        };
                        t = g(x.x, r);
                        z = x.link;
                        B = x.tooltext || x.toolText;
                        t = k.getAxisPosition(t);
                        v = n.getAxisPosition(v);
                        if ((ba = x.marker) && ba.enabled)
                            if (ma = {
                                    index: r,
                                    link: z,
                                    value: x.y,
                                    displayValue: x.displayValue,
                                    categoryLabel: x.categoryLabel,
                                    toolText: B,
                                    id: b.userID,
                                    datasetIndex: b.index,
                                    datasetName: b.name,
                                    visible: b.visible
                                }, Z = ba.radius, na = ba.shadow, ca = ba.symbol.split("_"), ea = ta = {}, ia = x.rolloverProperties, ba.imageUrl) Z = new Ya.Image, Z.onload = pa(t, v, ba, ha, ma, B, ia, r), Z.onerror = fb(t, v, ha, r), Z.src = ba.imageUrl;
                            else {
                                if (ia = x.rolloverProperties) ea = {
                                    polypath: [ca[1] || 2, t, v, Z, ba.startAngle, 0],
                                    fill: ka(ba.fillColor),
                                    "stroke-width": ba.lineWidth,
                                    stroke: ka(ba.lineColor)
                                }, ta = {
                                    polypath: [ia.sides || 2, t, v, ia.radius, ia.startAngle,
                                        ia.dip
                                    ],
                                    fill: ka(ia.fillColor),
                                    "stroke-width": ia.lineWidth,
                                    stroke: ka(ia.lineColor)
                                };
                                V = ha.graphic = c.polypath(ca[1] || 2, t, v, Z, ba.startAngle, 0, R).attr({
                                    fill: ka(ba.fillColor),
                                    "stroke-width": ba.lineWidth,
                                    stroke: ka(ba.lineColor),
                                    "stroke-linecap": "round",
                                    cursor: z ? "pointer" : "",
                                    ishot: !0,
                                    visibility: 0 === Z ? "hidden" : w
                                }).data("alwaysInvisible", 0 === Z).data("setRolloverProperties", ia).data("setRolloverAttr", ta).data("setRolloutAttr", ea).data("anchorRadius", Z).data("anchorHoverRadius", ia && ia.radius).shadow(na || !1, Y);
                                if (z || y || ia) Z = Xa(Z, ia && ia.radius || 0, U), ja = c.polypath(ca[1] || 2, t, v, Z, ba.startAngle, 0, M).attr({
                                    cursor: z ? "pointer" : "",
                                    stroke: ua,
                                    "stroke-width": 0,
                                    ishot: !0,
                                    fill: ua,
                                    visibility: w
                                });
                                (ja || V).data("eventArgs", ma).click(kb).hover(ga(ha, "DataPlotRollOver"), ga(ha, "DataPlotRollOut")).tooltip(B)
                            }
                        null !== A ? 2 <= N ? ("M" === W[N - 1][0] && W.push(["R"]), "M" === C[X - 1][0] && C.push(["R"]), N = W.length, X = C.length, Q = W[N - 1], B = Q.length, W[N - 1].push(t), W[N - 1].push(v), C[X - 1].push(t), C[X - 1].push(v), r === J - 1 && "R" === Q[0] && (aa(W, !0, K, E), aa(C, !1))) : (W.push(["M", D, A]), W.push(["R", t, v]), C.push(["M", D, A]), C.push(["R", t, v]), K = D) : null === A && 2 <= N && ("R" === Q[0] && (aa(W, !0, K, E), aa(C, !1)), W.push(["M", t, v]), C.push(["M", t, v]), K = t);
                        V && G.push(V);
                        a.drawTracker && a.drawTracker.call(a, b, d, r);
                        ha.graphic = V;
                        ha.dataLabel = la;
                        ha.tracker = void 0;
                        ba && ba.imageUrl || (la = a.drawPlotLineLabel(b, d, r, t, v));
                        la && G.push(la);
                        a.drawTracker && a.drawTracker.call(a, b, d, r);
                        D = t;
                        A = v
                    }
                if (Q = W[W.length - 1]) B = Q.length, "Z" !== Q[B - 1] && "R" === Q[0] && (aa(W, !0, K, E), aa(C, !1));
                2 <= W.length && (D = c.path(W,
                    P).attr({
                    fill: ka(d.fillColor),
                    "stroke-dasharray": d.dashStyle,
                    "stroke-width": F ? 0 : d.lineWidth,
                    stroke: ka(d.lineColor),
                    "stroke-linecap": "round",
                    visibility: w
                }).shadow(u.shadow && x.shadow), b.graphic = D, G.push(D));
                s ? da = P.attr({
                    "clip-rect": l["clip-canvas-init"]
                }).animate({
                    "clip-rect": l["clip-canvas"]
                }, s, "normal", a.getAnimationCompleteFn()) : (e && e(), e = void 0);
                F && (2 <= C.length && (I = c.path(C, h).attr({
                    stroke: ka(d.lineColor),
                    "stroke-width": d.lineWidth,
                    "stroke-dasharray": x.dashStyle || d.dashStyle,
                    "stroke-linecap": "round",
                    visibility: w
                }).shadow(u.shadow || x.shadow)), G.push(I), s && h.attr({
                    "clip-rect": l["clip-canvas-init"]
                }).animateWith(P, da, {
                    "clip-rect": l["clip-canvas"]
                }, s, "normal"));
                b.visible = !m;
                return b
            }
        }, t["renderer.cartesian"]);
        t("renderer.kagi", {
            drawPlotKagi: function(b, d) {
                var a = this,
                    c = a.paper,
                    e = a.options,
                    f = a.elements,
                    g = b.data,
                    l = e.plotOptions.series,
                    u = a.xAxis[d.xAxis || 0],
                    m = a.yAxis[d.yAxis || 0],
                    r = d.canvasPadding,
                    k = d.xShiftLength,
                    n = b.items,
                    q = a.logic,
                    w = !1 === d.visible ? "hidden" : "visible",
                    s = !1 !== (e.tooltip || {}).enabled,
                    t = {
                        stroke: ka({
                            color: d.rallyColor,
                            alpha: d.rallyAlpha
                        }),
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": d.rallyThickness || d.lineWidth,
                        "stroke-dasharray": d.rallyDashed
                    },
                    y = {
                        stroke: ka({
                            color: d.declineColor,
                            alpha: d.declineAlpha
                        }),
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": d.declineThickness || d.lineWidth,
                        "stroke-dasharray": d.declineDashed
                    },
                    x = {
                        "true": t["stroke-width"],
                        "false": y["stroke-width"]
                    },
                    v = a.layers,
                    z = v.dataset = v.dataset || c.group("dataset-orphan"),
                    B = v.datalabels =
                    v.datalabels || c.group("datalabels").insertAfter(z),
                    A = v.tracker,
                    v = isNaN(+l.animation) && l.animation.duration || 1E3 * l.animation,
                    G = f["clip-canvas-init"].slice(0),
                    f = f["clip-canvas"].slice(0),
                    D = 0,
                    E = u.getAxisPosition(D),
                    K = a.chartWidth,
                    C = a.chartHeight,
                    M = function() {
                        ha.attr({
                            "clip-rect": null
                        });
                        ia.show();
                        ta.show();
                        B.attr({
                            transform: "...t" + -K + "," + -C
                        })
                    },
                    S = [],
                    J = [],
                    I, U, L, H, N, Y, R, P, X, Z, W, Q, aa, V, ba, ca, ea, ja, la = e.chart.anchorTrackingRadius,
                    da, ia, ha, ta, ma, ga, sa, pa, fb, kb, ra;
                if (g.length) {
                    e = z.line || (z.line = c.group("line-connector",
                        z));
                    c.group("connector-shadow", e);
                    ia = c.group("anchor-shadow", e);
                    ha = c.group("connector", e);
                    ta = c.group("anchors", e);
                    ta.hide();
                    ia.hide();
                    B.attr({
                        transform: "...t" + K + "," + C
                    });
                    v && a.animationCompleteQueue.push({
                        fn: M,
                        scope: this
                    });
                    R = !!g[0].isRally;
                    e = 0;
                    for (z = g.length; e < z; e += 1) n[e] = {
                        chart: a,
                        index: e,
                        graphic: null,
                        line: [],
                        dataLabel: null,
                        tracker: null
                    }, P = g[e], X = P.y, P.isDefined || (X = P.plotValue), X = h(P.plotValue, X), P.plotY = nb(m.getAxisPosition(P.y), 2), P.graphY = nb(m.getAxisPosition(X), 2), P.plotX = E, P.isShift && (D += 1, E =
                        u.getAxisPosition(D)), e && (X = g[e - 1], R = P && P.objParams && P.objParams.isRally, aa = P && P.objParams && P.objParams.lastHigh, V = P && P.objParams && P.objParams.lastLow, ba = P && P.objParams && P.objParams.isRallyInitialised, X && ba && X.isRally !== P.isRally ? (P.isChanged = !0, P.ty = nb(m.getAxisPosition(R ? aa : V), 2)) : P.isChanged = !1);
                    u = a.canvasLeft + r;
                    E = u + k / 2;
                    Z = g[0].plotY;
                    R = !!g[0].isRally;
                    m = na(Z) + x[R] % 2 / 2;
                    R ? S.push("M", u, m, "H", E) : J.push("M", u, m, "H", E);
                    mb(g, function(e, f) {
                        if (ca = g[f + 1]) ja = ["M", E, Z], R = e.isRally, e.isShift && (E += k, Z = e.graphY,
                            ja.push("H", E), ja[2] = na(ja[2]) + x[R] % 2 / 2, ja = ja.toString(), R ? S.push(ja) : J.push(ja), ja = ["M", E, Z]), ca.isChanged && (Z = ca.ty, ja.push("V", Z), ja[1] = na(ja[1]) + x[R] % 2 / 2, ja = ja.toString(), R ? S.push(ja) : J.push(ja), ja = ["M", E, Z]), ea = ca.isRally, ca.graphY !== ja[2] && (ja.push("V", ca.graphY), ja[1] = na(ja[1]) + x[ea] % 2 / 2, ja = ja.toString(), ea ? S.push(ja) : J.push(ja)), Z = ca.graphY;
                        W = e.plotX;
                        Q = e.plotY;
                        H = e.marker;
                        I = e && e.link;
                        U = e && e.toolText;
                        if (void 0 !== Q && !isNaN(Q) && e.isDefined)
                            if (N = H.symbol.split("_"), fb = "spoke" === N[0] ? 1 : 0, kb = H.radius,
                                ma = H.shadow, da = {
                                    index: f,
                                    link: I,
                                    value: e.y,
                                    displayValue: e.displayValue,
                                    categoryLabel: e.categoryLabel,
                                    toolText: U,
                                    id: b.userID,
                                    datasetIndex: b.index,
                                    datasetName: b.name,
                                    visible: b.visible
                                }, ga = sa = {}, pa = e.rolloverProperties, H.imageUrl) ra = new Ya.Image, ra.onload = function(e, f, g, h, k, l, p, m) {
                                return function() {
                                    var n = g.imageUrl,
                                        q = g.imageScale,
                                        r = g.imageAlpha,
                                        u = p.imageHoverAlpha,
                                        x = p.imageHoverScale,
                                        t = this.width * q * .01,
                                        y = this.width * x * .01;
                                    ga = {
                                        x: e - this.width * q * .005,
                                        y: f - this.height * q * .005,
                                        width: t,
                                        height: this.height * q * .01,
                                        alpha: r
                                    };
                                    sa = {
                                        x: e - this.width * x * .005,
                                        y: f - this.height * x * .005,
                                        width: y,
                                        height: this.height * x * .01,
                                        alpha: u
                                    };
                                    u = y > t ? sa : ga;
                                    h.graphic = Y = c.image(n, ta).attr(ga).css({
                                        opacity: .01 * r
                                    }).data("alwaysInvisible", 0 === q).data("setRolloverProperties", p).data("setRolloverAttr", sa).data("setRolloutAttr", ga).data("anchorRadius", q).data("anchorHoverRadius", x);
                                    if (I || s || p) L = h.tracker = c.rect(A).attr(u).attr({
                                        cursor: I ? "pointer" : "",
                                        stroke: ua,
                                        "stroke-width": g.lineWidth,
                                        fill: ua,
                                        ishot: !0,
                                        visibility: w
                                    }).data("eventArgs", k).click(function(b) {
                                        ya.call(this,
                                            a, b)
                                    }).hover(function(b) {
                                        return function(c) {
                                            a.hoverPlotAnchor(this, c, "DataPlotRollOver", b, a)
                                        }
                                    }(h), function(b) {
                                        return function(c) {
                                            a.hoverPlotAnchor(this, c, "DataPlotRollOut", b, a)
                                        }
                                    }(h)).tooltip(l);
                                    h.dataLabel = a.drawPlotKagiLabel(b, d, m, e, f)
                                }
                            }(W, Q, H, n[f], da, U, pa, f), ra.onerror = function(c, e, f, g, h, p, k, l) {
                                return function() {
                                    g.dataLabel = a.drawPlotKagiLabel(b, d, l, c, e)
                                }
                            }(W, Q, H, n[f], da, U, pa, f), ra.src = H.imageUrl;
                            else {
                                !q.multisetRealtime && pa && (ga = {
                                    polypath: [N[1] || 2, W, Q, kb, H.startAngle, fb],
                                    fill: ka(H.fillColor),
                                    "stroke-width": H.lineWidth,
                                    stroke: ka(H.lineColor)
                                }, sa = {
                                    polypath: [pa.sides || 2, W, Q, pa.radius, pa.startAngle, pa.dip],
                                    fill: ka(pa.fillColor),
                                    "stroke-width": pa.lineWidth,
                                    stroke: ka(pa.lineColor)
                                });
                                Y = n[f].graphic = c.polypath(N[1] || 2, W, Q, kb, H.startAngle, fb, ta).attr({
                                    fill: ka(H.fillColor),
                                    "stroke-width": H.lineWidth,
                                    stroke: ka(H.lineColor),
                                    "stroke-linecap": "round",
                                    cursor: I ? "pointer" : "",
                                    ishot: !0,
                                    visibility: 0 === kb ? "hidden" : w
                                }).data("alwaysInvisible", 0 === kb).data("setRolloverProperties", pa).data("setRolloverAttr", sa).data("setRolloutAttr", ga).data("anchorRadius",
                                    kb).data("anchorHoverRadius", pa && pa.radius).shadow(ma || !1, ia);
                                if (I || s) kb = Xa(kb, pa && pa.radius || 0, la), L = c.circle(W, Q, kb, A).attr({
                                    cursor: I ? "pointer" : "",
                                    stroke: ua,
                                    ishot: !0,
                                    fill: ua,
                                    "stroke-width": H.lineWidth,
                                    visibility: w
                                }).data("eventArgs", da).click(function(b) {
                                    ya.call(this, a, b)
                                }).hover(function(b) {
                                    return function(c) {
                                        a.hoverPlotAnchor(this, c, "DataPlotRollOver", b, a)
                                    }
                                }(n[f]), function(b) {
                                    return function(c) {
                                        a.hoverPlotAnchor(this, c, "DataPlotRollOut", b, a)
                                    }
                                }(n[f])).tooltip(U);
                                n[f].tracker = L || Y;
                                H && H.imageUrl ||
                                    (n[f].dataLabel = a.drawPlotKagiLabel(b, d, f, W, Q))
                            }
                    });
                    t = c.path(S, ha).attr(t).shadow(l.shadow);
                    n[0].line.push(t);
                    t = c.path(J, ha).attr(y).shadow(l.shadow);
                    n[0].line.push(t);
                    v ? ha.attr({
                        "clip-rect": G
                    }).animate({
                        "clip-rect": f
                    }, v, "normal", a.getAnimationCompleteFn()) : (M && M(), M = void 0)
                }
            },
            drawPlotKagiLabel: function(b, d, a, c, e, f) {
                var g = this.options,
                    h = g.chart,
                    u = this.paper,
                    m = this.layers,
                    r = g.plotOptions.series.dataLabels.style,
                    g = 1 === h.rotateValues ? 270 : 0,
                    k = this.canvasHeight,
                    n = this.canvasTop,
                    q = this.canvasLeft,
                    w = b.data[a],
                    s = b.items[a];
                b = (b = s.graphic) && "image" == b.type && .5 * b.attr("height") || w.marker && w.marker.radius - 3;
                b = h.valuePadding + 2 + b;
                d = !1 === d.visible ? "hidden" : "visible";
                a = s.dataLabel;
                var t = {
                        fontFamily: r.fontFamily,
                        fontSize: r.fontSize,
                        lineHeight: r.lineHeight,
                        fontWeight: r.fontWeight,
                        fontStyle: r.fontStyle
                    },
                    y, x, v;
                f = f || m.datalabels;
                m = w.displayValue;
                X(m) && m !== B ? (a ? g && a.rotate(360 - g) : a = s.dataLabel = u.text(f).attr({
                    text: m,
                    fill: r.color,
                    direction: h.textDirection,
                    "text-bound": [r.backgroundColor, r.borderColor, r.borderThickness,
                        r.borderPadding, r.borderRadius, r.borderDash
                    ]
                }).css(t), a.attr({
                    title: w.originalText || "",
                    fill: r.color
                }), u = a.getBBox(), f = m = g ? u.width : u.height, h = e, f = f + b + 4, m = .5 * m + b, g ? (q = !0, w.vAlign === La ? (h -= m, q = e - n < f) : w.vAlign === Ga && (h += m - 2, y = 1, q = e + f > n + k), q && (x = 1, c -= b + 3 + .5 * u.height, h = e)) : w.vAlign === La ? h -= m : w.vAlign === Ga ? (h += m, y = 1) : u.width > c - q ? h -= m : (x = 1, c -= b + 3, v = "end"), a.attr({
                    x: c,
                    y: h,
                    "text-anchor": v,
                    visibility: d
                }).data("isBelow", y).data("isMiddle", x), g && a.attr("transform", "T0,0,R" + g)) : a && a.attr({
                    text: B
                });
                return a
            }
        }, t["renderer.cartesian"]);
        t("renderer.boxandwhisker", {
            drawPlotBoxandwhisker2d: function(b, d) {
                var a = this,
                    c = a.paper,
                    e = a.options,
                    f = e.plotOptions.series,
                    h = a.xAxis[d.xAxis || 0],
                    l = a.yAxis[d.xAxis || 0],
                    u = isNaN(+f.animation) && f.animation.duration || 1E3 * f.animation,
                    m = a.layers,
                    r = m.dataset = m.dataset || c.group("dataset-orphan"),
                    k = m.datalabels = m.datalabels || c.group("datalabels"),
                    n = d.data,
                    q = b.items || (b.items = []),
                    w = !1 === d.visible ? "hidden" : "visible",
                    s = !1 !== (e.tooltip || {}).enabled,
                    t = d.columnPosition || 0,
                    y = a.definition.chart,
                    x = h.getAxisPosition(0),
                    v = h.getAxisPosition(1) - x,
                    z = f.groupPadding,
                    D = f.maxColWidth,
                    x = d.numColumns || 1,
                    v = (1 - .01 * (y && y.plotspacepercent)) * v || E(v * (1 - 2 * z), D * x),
                    y = v / x,
                    t = t * y - v / 2,
                    x = e.chart,
                    v = 1 === x.rotateValues ? 270 : void 0,
                    z = g(x.valuePadding, 0),
                    D = r.upperBoxGroup = r.upperBoxGroup || c.group("upperBox", r),
                    A = r.lowerBoxGroup = r.lowerBoxGroup || c.group("lowerBox", r),
                    G = r.medianGroup = r.medianGroup || c.group("median", r),
                    C = b.graphics = b.graphics || [],
                    M = q.displayValues = {},
                    K = M.upperQuartileValues = [],
                    S = M.lowerQuartileValues = [],
                    M = M.medianValues = [],
                    I = function(b) {
                        ya.call(this,
                            a, b)
                    },
                    m = m.shadows || (m.shadows = c.group("shadows", r).toBack()),
                    e = e.plotOptions.series.dataLabels.style,
                    Q = {
                        fontFamily: e.fontFamily,
                        fontSize: e.fontSize,
                        lineHeight: e.lineHeight,
                        fontWeight: e.fontWeight,
                        fontStyle: e.fontStyle
                    },
                    J = function(b, c) {
                        return function(d) {
                            b.upperBox.attr(c.upperBox);
                            b.lowerBox.attr(c.lowerBox);
                            b.upperBoxBorder.attr(c.upperBoxBorder);
                            b.lowerBoxBorder.attr(c.lowerBoxBorder);
                            b.upperQuartile.attr(c.upperQuartile);
                            b.lowerQuartile.attr(c.lowerQuartile);
                            b.medianBorder.attr(c.median);
                            ya.call(this,
                                a, d, "DataPlotRollOver")
                        }
                    },
                    aa = function(b, c) {
                        return function(d) {
                            b.upperBox.attr(c.upperBox);
                            b.lowerBox.attr(c.lowerBox);
                            b.upperBoxBorder.attr(c.upperBoxBorder);
                            b.lowerBoxBorder.attr(c.lowerBoxBorder);
                            b.upperQuartile.attr(c.upperQuartile);
                            b.lowerQuartile.attr(c.lowerQuartile);
                            b.medianBorder.attr(c.median);
                            ya.call(this, a, d, "DataPlotRollOut")
                        }
                    },
                    U, L, H, N, Y, R, P, ca, Z, W, V, da, ea, ba, ha, ga, ja, la, ma, ia, sa, ta, ua, ra, va, pa;
                la = 0;
                for (ma = n.length; la < ma; la += 1) L = n[la], H = L.y, Y = L.link, R = L.tooltext || L.toolText, (U = q[la]) ||
                    (U = q[la] = {
                        index: la,
                        value: H,
                        upperBox: null,
                        lowerBox: null,
                        upperBoxBorder: null,
                        lowerBoxBorder: null,
                        upperQuartileBorder: null,
                        lowerQuartileBorder: null,
                        medianBorder: null,
                        upperQuartileValues: null,
                        lowerQuartileValues: null,
                        medianValues: null,
                        tracker: null,
                        hot: null
                    }), null !== H && (l.getAxisPosition(H), H = g(L.x, la), H = h.getAxisPosition(H), t && (H += t), N = f.borderRadius || 0, ca = ((ca = (ea = L.upperQuartile || {}, ea.value)) || 0 === ca) && l.getAxisPosition(ca), P = ((P = (ba = L.lowerQuartile || {}, ba.value)) || 0 === P) && l.getAxisPosition(P), W = ((Z =
                            (ja = L.median) && ja.value) || 0 === Z) && l.getAxisPosition(Z), V = W - ca, da = P - W, ha = L.upperBoxBorder || {}, ga = L.lowerBoxBorder || {}, Z = {
                            index: la,
                            link: Y,
                            maximum: L.displayValueMax,
                            minimum: L.displayValueMin,
                            median: Z,
                            q3: ea.value,
                            q1: ba.value,
                            maxDisplayValue: L.displayValueMax,
                            minDisplayValue: L.displayValueMin,
                            medianDisplayValue: L.displayValueMid,
                            q1DisplayValue: L.displayValueQ1,
                            q3DisplayValue: L.displayValueQ3,
                            categoryLabel: L.categoryLabel,
                            toolText: L.toolText,
                            id: b.userID,
                            datasetIndex: b.index,
                            datasetName: b.name,
                            visible: b.visible
                        },
                        ia = na(H) + ha.borderWidth % 2 * .5, sa = na(H + y) + ha.borderWidth % 2 * .5, ta = na(ca) + ea.borderWidth % 2 * .5, y = sa - ia, pa = L.hoverEffects.rollOut = {
                            upperBox: {
                                fill: ka(L.color.FCcolor),
                                "stroke-width": 0,
                                "stroke-dasharray": ha.dashStyle,
                                cursor: Y ? "pointer" : "",
                                ishot: !0,
                                visibility: w
                            },
                            lowerBox: {
                                fill: ka(L.lowerboxColor.FCcolor),
                                "stroke-width": 0,
                                "stroke-dasharray": ga.dashStyle,
                                cursor: Y ? "pointer" : B,
                                ishot: !0,
                                visibility: w
                            },
                            upperBoxBorder: {
                                stroke: ha.color,
                                "stroke-width": ha.borderWidth,
                                "stroke-linecap": "round",
                                dashstyle: ha.dashStyle,
                                ishot: !0,
                                visibility: w
                            },
                            lowerBoxBorder: {
                                stroke: ga.color,
                                "stroke-width": ga.borderWidth,
                                dashstyle: ga.dashStyle,
                                "stroke-linecap": "round",
                                ishot: !0,
                                visibility: w
                            },
                            upperQuartile: {
                                stroke: ka(ea.color),
                                "stroke-width": ea.borderWidth,
                                "stroke-dasharray": ea.dashSyle,
                                "stroke-linecap": "round",
                                cursor: Y ? "pointer" : B,
                                ishot: !0,
                                visibility: w
                            },
                            lowerQuartile: {
                                stroke: ka(ba.color),
                                "stroke-width": ba.borderWidth,
                                "stroke-dasharray": ba.dashSyle,
                                cursor: Y ? "pointer" : "",
                                "stroke-linecap": "round",
                                ishot: !0,
                                visibility: w
                            },
                            median: {
                                stroke: ka(ja.color),
                                "stroke-width": ja.borderWidth,
                                "stroke-dasharray": ja.dashSyle,
                                cursor: Y ? "pointer" : "",
                                "stroke-linecap": "round",
                                ishot: !0,
                                visibility: w
                            }
                        }, Y = U.graphic = U.upperBox = c.rect(ia, ta, y, V, N, D).attr(pa.upperBox).shadow(f.shadow && L.shadow, m), V = U.upperBoxBorder = c.path(["M", ia, ta, "V", ta + V, "M", sa, ta, "V", ta + V], D).attr(pa.upperBoxBorder).shadow(f.shadow && ha.shadow, m), ha = U.upperQuartile = c.path(["M", ia, ta, "H", ia + y], G).attr(pa.upperQuartile).shadow(f.shadow && ea.shadow, m), ia = na(H) + ga.borderWidth % 2 * .5, sa = na(H + y) + ga.borderWidth %
                        2 * .5, ta = na(W + da) + ba.borderWidth % 2 * .5, N = U.lowerBox = c.rect(ia, W, y, ta - W, N, A).attr(pa.lowerBox).shadow(f.shadow && L.shadow, m), ga = U.lowerBoxBorder = c.path(["M", ia, W, "V", W + da, "M", sa, W, "V", W + da], A).attr(pa.lowerBoxBorder).shadow(f.shadow && ga.shadow, m), ta = na(W + da) + ba.borderWidth % 2 * .5, da = U.lowerQuartile = c.path(["M", ia, ta, "H", ia + y], G).attr(pa.lowerQuartile).shadow(f.shadow && ea.shadow, m), ta = na(W) + ja.borderWidth % 2 * .5, ia = U.medianBorder = c.path(["M", ia, ta, "H", ia + y], G).attr(pa.median), ta = b.index + "_" + la, Y.click(I).hover(J(U,
                            L.hoverEffects), aa(U, pa)).data("groupId", ta).data("eventArgs", Z), N.click(I).hover(J(U, L.hoverEffects), aa(U, pa)).data("groupId", ta).data("eventArgs", Z), V.click(I).hover(J(U, L.hoverEffects), aa(U, pa)).data("groupId", ta).data("eventArgs", Z), ga.click(I).hover(J(U, L.hoverEffects), aa(U, pa)).data("groupId", ta).data("eventArgs", Z), ha.click(I).hover(J(U, L.hoverEffects), aa(U, pa)).data("groupId", ta).data("eventArgs", Z), da.click(I).hover(J(U, L.hoverEffects), aa(U, pa)).data("groupId", ta).data("eventArgs", Z), ia.click(I).hover(J(U,
                            L.hoverEffects), aa(U, pa)).data("groupId", ta).data("eventArgs", Z), Z = v ? Ha : Ua, X(ea.displayValue) && ea.displayValue !== B && (ua = K[la] = c.text(k).attr({
                            text: ea.displayValue,
                            x: H + y / 2,
                            title: ea.originalText || "",
                            y: ca - z,
                            "text-anchor": v ? "start" : Z,
                            "vertical-align": v ? "middle" : "bottom",
                            visibility: w,
                            direction: x.textDirection,
                            fill: e.color,
                            "text-bound": [e.backgroundColor, e.borderColor, e.borderThickness, e.borderPadding, e.borderRadius, e.borderDash]
                        }).hover(J(U, L.hoverEffects), aa(U, pa)).data("groupId", ta).css(Q), v && ua.rotate(v,
                            H + y / 2, ca - z)), X(ja.displayValue) && ja.displayValue !== B && (va = M[la] = c.text(k).attr({
                            text: ja.displayValue,
                            x: H + y / 2,
                            y: W - z,
                            title: ja.originalText || "",
                            "text-anchor": v ? "start" : Z,
                            "vertical-align": v ? "middle" : "bottom",
                            visibility: w,
                            direction: x.textDirection,
                            fill: e.color,
                            "text-bound": [e.backgroundColor, e.borderColor, e.borderThickness, e.borderPadding, e.borderRadius, e.borderDash]
                        }).hover(J(U, L.hoverEffects), aa(U, pa)).data("groupId", ta).css(Q), v && va.rotate(v, H + y / 2, W - z)), X(ba.displayValue) && ba.displayValue !== B && (ra =
                            S[la] = c.text(k).attr({
                                text: ba.displayValue,
                                x: H + y / 2,
                                y: P + z,
                                title: ba.originalText || "",
                                "text-anchor": v ? "start" : Z,
                                "vertical-align": v ? "middle" : "top",
                                visibility: w,
                                direction: x.textDirection,
                                fill: e.color,
                                "text-bound": [e.backgroundColor, e.borderColor, e.borderThickness, e.borderPadding, e.borderRadius, e.borderDash]
                            }).hover(J(U, L.hoverEffects), aa(U, pa)).data("groupId", ta).css(Q), v && ra.rotate(v, H + y / 2, P + z)), s && (Y.tooltip(R), N.tooltip(R), V.tooltip(R), ga.tooltip(R), ha.tooltip(R), da.tooltip(R), ia.tooltip(R), ua && ua.tooltip(R),
                            va && va.tooltip(R), ra && ra.tooltip(R)), Y && C.push(Y), N && C.push(N), ia && C.push(ia), V && C.push(V), ga && C.push(ga), ha && C.push(ha), da && C.push(da), ua && C.push(ua), va && C.push(va), ra && C.push(ra));
                r.attr({
                    "clip-rect": [a.canvasLeft, a.canvasTop, u ? 0 : a.canvasWidth, a.canvasHeight]
                });
                u && r.animate({
                    "clip-rect": [a.canvasLeft, a.canvasTop, a.canvasWidth, a.canvasHeight]
                }, u, "normal");
                b.visible = !1 !== d.visible
            }
        }, t["renderer.cartesian"]);
        t("renderer.dragnode", {
            drawPlotDragnode: function(b, d) {
                var a = this,
                    c = b.graphics = [],
                    e = {},
                    f = a.options,
                    p = f.tooltip,
                    l = f._FCconf.inCanvasStyle,
                    u = a.paper,
                    m = a.layers,
                    r = b.items,
                    k = m.dataset,
                    n = m.connector,
                    q = e.xAxis = a.xAxis[d.xAxis || 0],
                    w = e.yAxis = a.yAxis[d.yAxis || 0],
                    t = d.data,
                    v = e.elements = {
                        data: []
                    },
                    y = a.smartLabel,
                    x = f.plotOptions.series.dataLabels.style,
                    D = f.orphanStyles.connectorlabels.style,
                    A = f.connectors,
                    E = f.connectorsStore,
                    C = f.pointStore || (f.pointStore = []),
                    G = f.invalConnectStore,
                    qa = {
                        fontFamily: x.fontFamily,
                        fontSize: x.fontSize,
                        lineHeight: x.lineHeight,
                        fontWeight: x.fontWeight,
                        fontStyle: x.fontStyle
                    },
                    I = function(b) {
                        C[b.from] &&
                            C[b.to] ? E.push(new Ea(b, C, D, u, n, a)) : G.push(b)
                    },
                    K = function() {
                        var b = this;
                        b.data("fire_click_event", 1);
                        clearTimeout(b._longpressactive);
                        b._longpressactive = setTimeout(function() {
                            b.data("fire_click_event", 0);
                            b.data("viewMode") || a.logic.showLabelDeleteUI(a, b)
                        }, 1E3)
                    },
                    S = function() {
                        this.data("fire_click_event") && (this.data("fire_click_event", 0), cb.call(this))
                    },
                    Q = function(b) {
                        var c = this.data("fire_click_event");
                        cb.call(this);
                        c && ya.call(this, a, b, "LabelClick")
                    },
                    aa = function(b) {
                        ya.call(this, a, b, "LabelRollover")
                    },
                    J = function(b) {
                        ya.call(this, a, b, "LabelRollout")
                    },
                    ca = function(b, c, d, e, f) {
                        d = this.data("data");
                        e = d.bBox;
                        var g = a.canvasTop + a.canvasHeight,
                            h = a.canvasLeft + a.canvasWidth;
                        this.data("fire_dragend") || (ya.call(this, a, f, "LabelDragStart"), this.data("fire_dragend", 1));
                        e.x + b < a.canvasLeft && (b = a.canvasLeft - e.x);
                        e.x2 + b > h && (b = h - e.x2);
                        e.y + c < a.canvasTop && (c = a.canvasTop - e.y);
                        e.y2 + c > g && (c = g - e.y2);
                        this.attr({
                            x: e.x + b,
                            y: e.y + c
                        });
                        d.label.attr({
                            x: d.ox + b,
                            y: d.oy + c
                        })
                    },
                    U = function() {
                        var a = this.data("data"),
                            b = this.getBBox();
                        a.ox = a.label.attr("x");
                        a.oy = a.label.attr("y");
                        a.bBox = b;
                        this.data("fire_dragend", 0)
                    },
                    L = function(b) {
                        var c = this.data("data"),
                            d = c.label,
                            e = {
                                hcJSON: {
                                    dragableLabels: []
                                }
                            },
                            f = this.data("eventArgs"),
                            g = f.x = a.xAxis[0].getAxisPosition(d.attr("x"), 1),
                            d = f.y = a.yAxis[0].getAxisPosition(d.attr("y"), 1);
                        e.hcJSON.dragableLabels[c.labelNode.index] = {
                            y: d,
                            x: g
                        };
                        M(a.logic.chartInstance.jsVars._reflowData, e, !0);
                        this.data("fire_dragend") && (c = cc(a.container, b), c.sourceEvent = "labeldragend", s.raiseEvent("chartupdated", M(c, f), a.logic.chartInstance), ya.call(this,
                            a, b, "labeldragend"))
                    },
                    H, N, Y, R, P, V, Z, W, ea, ha, da, ba, ga, ma, ja, la, na, ia, sa, ta, ra, va, wa, pa;
                n || (n = m.connector = u.group("connectors").insertBefore(k));
                p && !1 !== p.enabled && n.trackTooltip(!0);
                m = v.group = u.group(k);
                p = v.dragLabelGroup = u.group(k);
                y.setStyle(x);
                k = 0;
                for (v = t.length; k < v; k += 1) {
                    H = t[k];
                    R = H.marker;
                    H._yPos = Y = w.getAxisPosition(H.y);
                    H._xPos = N = q.getAxisPosition(H.x);
                    V = r[k] || (r[k] = {});
                    pa = H.hoverEffects && H.hoverEffects.rolloverProperties;
                    R = V.graphic;
                    Z = V.image;
                    W = V.label;
                    R = H.marker;
                    if (void 0 !== Y && !isNaN(Y) && R) {
                        da =
                            H._config = H._config || {
                                shapeArg: {},
                                startConnectors: [],
                                endConnectors: []
                            };
                        ba = da.shapeArg;
                        ga = g(R && R.height);
                        ma = g(R && R.width);
                        ja = g(R && R.radius);
                        P = h(R && R.symbol);
                        la = "rectangle" === P;
                        ea = H.id;
                        na = H.imageNode;
                        ia = H.imageURL;
                        sa = H.imageAlign;
                        ta = H.labelAlign;
                        ra = la ? ma : 1.4 * ja;
                        va = g(H.imageWidth, ra);
                        la = la ? ga : 1.4 * ja;
                        wa = g(H.imageHeight, la);
                        ja = {
                            fill: ka(R.fillColor),
                            "stroke-width": R.lineWidth,
                            r: R.radius,
                            stroke: ka(R.lineColor)
                        };
                        P = ba.symbol = h(R && R.symbol, e.symbol);
                        P = P.split("_");
                        ba.x = N;
                        ba.y = Y;
                        ba.radius = R.radius;
                        ba.width =
                            ma;
                        ba.height = ga;
                        ba.sides = P[1];
                        "poly" === P[0] || "circle" === P[0] ? R = u.polypath(P[1], N, Y, R.radius, R.startAngle, 0, m).attr(ja) : (da.shapeType = ic, ba.x = N - ma / 2, ba.y = Y - ga / 2, ba.r = 0, ja.width = ma, ja.height = ga, ja.x = N - ma / 2, ja.y = Y - ga / 2, pa && H.hoverEffects.enabled && (pa.x = N - pa.width / 2, pa.y = Y - pa.height / 2, delete pa.r), delete ja.r, R = u.rect(ba.x, ba.y, ma, ga, 0, m).attr(ja));
                        if (na && ia) {
                            wa > la && (wa = la);
                            va > ra && (va = ra);
                            switch (sa) {
                                case "middle":
                                    pa = Y - wa / 2;
                                    break;
                                case "bottom":
                                    pa = la > wa ? Y + la / 2 - wa : Y - wa / 2;
                                    break;
                                default:
                                    pa = la > wa ? Y - .5 * la : Y -
                                        wa / 2
                            }
                            da.imageX = N - va / 2;
                            da.imageY = pa;
                            Z || (Z = u.image(m));
                            Z.attr({
                                src: ia,
                                x: da.imageX,
                                y: pa,
                                width: va,
                                height: wa
                            })
                        }
                        da = H.displayValue;
                        if (X(da) || da !== B) {
                            ra = y.getSmartText(da, ra, la);
                            da = .5 * la - .5 * ra.height;
                            switch (ta) {
                                case "top":
                                    da = -da;
                                    break;
                                case "bottom":
                                    break;
                                default:
                                    da = 0
                            }
                            H._yAdjustment = ta = da;
                            Y += ta;
                            W ? W.attr({
                                text: ra.text,
                                title: ra.tooltext || "",
                                fill: x.color,
                                x: N,
                                y: Y
                            }) : (W = u.text(m), W.attr({
                                text: ra.text,
                                fill: x.color,
                                x: N,
                                y: Y,
                                direction: f.chart.textDirection,
                                "text-bound": [x.backgroundColor, x.borderColor, x.borderThickness,
                                    x.borderPadding, x.borderRadius, x.borderDash
                                ]
                            }).css(qa))
                        }
                        C[ea] = H;
                        V.index = k;
                        V.graphic = R;
                        V.label = W;
                        V.image = Z;
                        ea = a.drawTracker && a.drawTracker.call(a, b, d, k, ja);
                        R && c.push(R);
                        W && c.push(W);
                        Z && c.push(Z);
                        ea && c.push(ea)
                    }
                    V.index = k;
                    V.tracker = ea
                }
                if (E)
                    for (k = G.length - 1; 0 <= k; --k) c = G[k], C[c.from] && C[c.to] && (G.splice(k, 1), E.push(new Ea(c, C, D, u, n, a)));
                else
                    for (E = f.connectorsStore = [], G = f.invalConnectStore = [], k = 0; k < A.length; k += 1) mb(A[k].connector, I);
                if (!a.dragLabelsDrawn && (ha = f.dragableLabels) && 0 < (v = ha.length)) {
                    ra = a.plotSizeX;
                    la = a.plotSizeY;
                    c = parseInt(l.fontSize, 10);
                    r = l.backgroundColor;
                    t = l.borderColor;
                    for (k = 0; k < v; k += 1)
                        if (y = ha[k], y.index = k, qa = z(h(y.text, y.label))) qa = z(qa), I = q.getAxisPosition(y.x || 0), Y = w.getAxisPosition(y.y || 0, 0, 1, 0, 1), H = g(y.fontsize, c), N = Sa(h(y.color, l.color)), m = g(y.alpha, 100) / 100, x = g(y.allowdrag, 1), ta = .8 * H, A = g(y.padding, 5), Z = {
                                fontSize: H + "px",
                                fontFamily: l.fontFamily,
                                fill: N,
                                color: N,
                                opacity: m
                            }, Ba(Z), N = h(y.bgcolor, r), V = h(y.bordercolor, t), H = {
                                link: y.link,
                                text: qa,
                                x: I,
                                y: Y,
                                allowdrag: x,
                                sourceType: "labelnode"
                            }, N &&
                            (Z.backgroundColor = N.replace(ob, Ma), Z.backgroundOpacity = m), V && (Z.borderColor = V.replace(ob, Ma), Z.borderOpacity = m), qa = u.text(p).css(Z).attr({
                                text: qa,
                                x: I,
                                y: Y,
                                align: Ua,
                                direction: f.chart.textDirection,
                                "text-bound": [(y.bgcolor || "").replace(ob, Ma), (y.bordercolor || "").replace(ob, Ma), g(y.borderthickness, 1), A, g(y.radius, 0), g(y.dashed, 0) ? Fa(g(y.dashlen, 5), g(y.dashgap, 4), g(y.borderthickness, 1)) : void 0]
                            }), I = qa.getBBox(), A = u.rect(I.x - A, I.y - A, I.width + 2 * A, I.height + 2 * A, 0).attr({
                                fill: ua,
                                ishot: !0,
                                "stroke-width": 0
                            }).css({
                                cursor: x ?
                                    "move" : ""
                            }).mousedown(K).mousemove(S).mouseup(Q).data("viewMode", f.chart.viewMode).hover(aa, J), p.appendChild(A), A.data("data", {
                                label: qa,
                                labelNode: y,
                                chart: a
                            }).data("eventArgs", H).data("link", y.link), x && A.drag(ca, U, L);
                    a.dragLabelsDrawn = !0
                }
                return e
            },
            drawTracker: function(b, d, a, c) {
                var e = this,
                    f = e.paper,
                    g = b.data[a],
                    l = b.items[a],
                    u = g._config,
                    m = e.layers.tracker,
                    r = eb({}, u.pointAttr),
                    k = u.shapeArg,
                    n = k.x,
                    q = k.y,
                    w = k.width,
                    s = k.height,
                    t = k.radius,
                    y = e.dragStart,
                    x = e.dragUp,
                    v = e.dragMove,
                    z = g.link ? "pointer" : g.allowDrag ?
                    "move" : "",
                    A = l.tracker;
                r.fill = ua;
                r.stroke = ua;
                r.cursor = z;
                r.ishot = !0;
                A = "rect" === u.shapeType ? f.rect(n, q, w, s, 0).attr(r) : f.polypath(k.sides, n, q, t, k.startAngle).attr(r);
                f = {
                    index: a,
                    link: g.link,
                    y: g.y,
                    x: g.x,
                    shape: h(g._options.shape, "rect"),
                    width: w,
                    height: s,
                    radius: t,
                    sides: k.sides,
                    label: g.displayValue,
                    toolText: g.toolText,
                    id: g.id,
                    datasetIndex: b.index,
                    datasetName: b.name,
                    sourceType: "dataplot"
                };
                l.tracker = A.hover(function(a, b) {
                        return function(c) {
                            a.graphic.attr(b);
                            ya.call(this, e, c, "DataPlotRollOver")
                        }
                    }(l, g.hoverEffects.rolloverProperties),
                    function(a, b) {
                        return function(c) {
                            a.graphic.attr(b);
                            ya.call(this, e, c, "DataPlotRollOut")
                        }
                    }(l, c)).data("eventArgs", f).data("drag-options", {
                    plotItems: l,
                    dataObj: g,
                    endConnectors: u.endConnectors,
                    startConnectors: u.startConnectors,
                    boundaryTop: e.canvasTop,
                    boundaryBottom: e.canvasTop + e.canvasHeight,
                    boundaryLeft: e.canvasLeft,
                    boundaryRight: e.canvasLeft + e.canvasWidth,
                    cloneGroup: e.layers.dataset,
                    datasetIndex: b.index,
                    pointIndex: a,
                    dataOptions: d,
                    cursor: z,
                    chart: e,
                    link: g.link
                }).tooltip(g.toolText);
                m.appendChild(A);
                g.allowDrag &&
                    A.drag(function(a, b, c, d, f) {
                        v.call(this, a, b, c, d, f, e)
                    }, function(a, b, c) {
                        y.call(this, a, b, c, e)
                    }, function(a) {
                        x.call(this, a, e)
                    });
                return A
            },
            dragStart: function(b, d, a, c) {
                var e = this;
                b = e.paper;
                d = e.data("drag-options") || {};
                var f = d.dataObj,
                    g = d.plotItems,
                    h = g.cloneGroup,
                    u = g.cloneGraphic,
                    m = g.cloneImage,
                    r = g.cloneLabel,
                    k = e.getBBox(),
                    n = ga && Na(a) || Eb,
                    q = a.layerX || n.layerX,
                    w = a.layerY || n.layerY,
                    t = s.getPosition(c.container),
                    v = c.elements,
                    y = v.waitElement,
                    x = d.dataOptions,
                    z = c.layers.tracker,
                    A = {
                        opacity: .3
                    };
                e.data("fire_click_event",
                    1);
                e.data("mousedown", 1);
                void 0 === q && (q = (a.pageX || n.pageX) - t.left, w = (a.pageY || n.pageY) - t.top);
                clearTimeout(e._longpressactive);
                e.data("move", !0);
                c.options.chart.viewMode || (y || (y = v.waitElement = b.ringpath(z).attr({
                    fill: ka({
                        alpha: "100,100",
                        angle: 120,
                        color: "CCCCCC,FFFFFF",
                        ratio: "30,50"
                    }),
                    "stroke-width": 0
                })), q += 11, w -= 21, y.attr({
                    ringpath: [q, w, 8, 11, 0, 0]
                }).show().animate({
                    ringpath: [q, w, 8, 11, 0, 6.28]
                }, 1E3), e._longpressactive = setTimeout(function() {
                    var a = x.name !== B && void 0 !== x.name ? x.name + wa + " " : B,
                        b = x.id,
                        d = f._options,
                        g = {
                            circle: "circ",
                            polygon: "poly",
                            undefined: "rect"
                        }[d.shape];
                    v.waitElement && v.waitElement.hide();
                    e.data("fire_click_event", 0);
                    c.logic.showNodeUpdateUI(c, {
                        x: {
                            value: f.x
                        },
                        y: {
                            value: f.y
                        },
                        draggable: {
                            value: ca(d.allowdrag, 1)
                        },
                        color: {
                            value: d.color
                        },
                        alpha: {
                            value: d.alpha
                        },
                        label: {
                            value: ca(d.label, d.name)
                        },
                        tooltip: {
                            value: d.tooltext
                        },
                        shape: {
                            value: g
                        },
                        rectWidth: {
                            value: d.width
                        },
                        rectHeight: {
                            value: d.height
                        },
                        circPolyRadius: {
                            value: d.radius
                        },
                        polySides: {
                            value: d.numsides
                        },
                        image: {
                            value: d.imagenode
                        },
                        imgWidth: {
                            value: d.imagewidth
                        },
                        imgHeight: {
                            value: d.imageheight
                        },
                        imgAlign: {
                            value: d.imagealign
                        },
                        imgUrl: {
                            value: d.imageurl
                        },
                        id: {
                            value: f.id,
                            disabled: !0
                        },
                        link: {
                            value: d.link
                        },
                        dataset: {
                            innerHTML: '<option value="' + b + '">' + a + b + "</option>",
                            disabled: !0
                        }
                    }, !0)
                }, 1E3));
                d.bBoxX = k.x;
                d.bBoxX2 = k.x2 || k.x + k.width;
                d.bBoxY = k.y;
                d.bBoxY2 = k.y2 || k.y + k.height;
                d.origX = d.lastX || (d.lastX = 0);
                d.origY = d.lastY || (d.lastY = 0);
                d.draged = !1;
                d.startYValue = f.y;
                d.startXValue = f.x;
                h || (h = g.cloneGroup = b.group(d.cloneGroup).attr(A));
                g.graphic && !u && (u = g.cloneGraphic = g.graphic.clone(),
                    h.appendChild(u), u.attr(A));
                g.image && !m && (m = g.cloneImage = g.image.clone(), h.appendChild(m).attr(A));
                g.label && !r && (r = g.cloneLabel = g.label.clone(), h.appendChild(r).attr(A));
                h.show()
            },
            dragMove: function(b, d, a, c, e, f) {
                a = this.data("drag-options");
                c = a.plotItems;
                var g = a.bBoxX2 + b,
                    h = a.bBoxY + d,
                    u = a.bBoxY2 + d,
                    m = f.elements;
                a.bBoxX + b < a.boundaryLeft && (b = a.boundaryLeft - a.bBoxX);
                g > a.boundaryRight && (b = a.boundaryRight - a.bBoxX2);
                h < a.boundaryTop && (d = a.boundaryTop - a.bBoxY);
                u > a.boundaryBottom && (d = a.boundaryBottom - a.bBoxY2);
                if (b || d) m.waitElement && m.waitElement.hide(), this.data("fire_click_event", 0), cb.call(this);
                g = a._transformObj = {
                    transform: "t" + (a.origX + b) + "," + (a.origY + d)
                };
                this.attr(g);
                c.cloneGraphic && c.cloneGraphic.attr(g);
                c.cloneImage && c.cloneImage.attr(g);
                c.cloneLabel && c.cloneLabel.attr(g);
                a.draged || ya.call(this, f, e, "DataplotDragStart");
                a.draged = !0;
                a.lastX = b;
                a.lastY = d
            },
            dragUp: function(b) {
                var d = this.data("drag-options"),
                    a = d.plotItems,
                    c = d.chart,
                    e = c.xAxis[0],
                    f = c.yAxis[0],
                    g = c.logic,
                    h = g.tooltipSepChar,
                    u = g.numberFormatter,
                    m = d.dataObj,
                    r = c.elements,
                    k = this.data("fire_click_event"),
                    n, q, w;
                r.waitElement && r.waitElement.hide();
                cb.call(this);
                this.data("mousedown", 0);
                k && ya.call(this, c, b);
                if (d.draged) {
                    d.lastX += d.origX;
                    d.lastY += d.origY;
                    k = m._xPos + d.lastX;
                    r = m._yPos + d.lastY;
                    n = d.startConnectors;
                    q = n.length;
                    for (w = 0; w < q; w += 1) n[w].updateFromPos(k, r);
                    n = d.endConnectors;
                    q = n.length;
                    for (w = 0; w < q; w += 1) n[w].updateToPos(k, r);
                    a.label && a.label.attr(d._transformObj);
                    a.image && a.image.attr(d._transformObj);
                    a.graphic && a.graphic.attr(d._transformObj);
                    e = e.getAxisPosition(k, 1);
                    f = f.getAxisPosition(r, 1);
                    m._isUserTooltip || m.toolText === B || (m.toolText = m._toolTextStr + u.dataLabels(e) + h + u.dataLabels(f));
                    u = this.data("eventArgs");
                    m.x = u.x = e;
                    m.y = u.y = f;
                    h = cc(c.container, b);
                    h.sourceEvent = "dataplotdragend";
                    s.raiseEvent("chartupdated", M(h, u), c.logic.chartInstance);
                    ya.call(this, c, b, "dataplotdragend");
                    b = {
                        hcJSON: {
                            series: []
                        }
                    };
                    b.hcJSON.series[d.datasetIndex] = {
                        data: []
                    };
                    b.hcJSON.series[d.datasetIndex].data[d.pointIndex] = {
                        _options: {
                            x: e,
                            y: f
                        },
                        x: e,
                        y: f,
                        toolText: m.toolText,
                        displayValue: m.displayValue
                    };
                    M(g.chartInstance.jsVars._reflowData, b, !0)
                }
                a.cloneGroup && a.cloneGroup.hide()
            }
        }, t["renderer.cartesian"]);
        t("renderer.dragcolumn2d", {
            drawTracker: function(b, d, a) {
                var c = this.paper,
                    e = this.yAxis[0],
                    f = b.data[a],
                    g = e.getAxisPosition(f.y),
                    h = b.items[a],
                    u = this.layers.tracker,
                    m = h && h.dragTracker || null,
                    r = this.dragStart,
                    k = this.dragUp,
                    n = this.dragMove,
                    q = {
                        stroke: ua,
                        "stroke-width": ga ? 40 : 10,
                        ishot: !0,
                        cursor: Wa && "ns-resize" || "n-resize"
                    },
                    w = e && e.axisData && e.axisData.plotLines,
                    s = this._yAxisPlotLines ||
                    (this._yAxisPlotLines = []),
                    t = 0,
                    y, x;
                if (!s.length)
                    for (y = w.length; t < y; t += 1) x = w[t], x.isGrid && s.push(e.getAxisPosition(x.value));
                null !== f.y && f.allowDrag && (e = h.graphic.getBBox(), e = ["M", e.x, g, "L", e.x + e.width, g, "Z"], m ? m.animate({
                    d: e
                }).attr(q) : m = h.dragTracker = c.path(e, u).attr(q), m.drag(n, r, k).data("drag-options", {
                    items: h,
                    yPos: g,
                    chart: this,
                    datasetIndex: b.index,
                    pointIndex: a,
                    dataOptions: d,
                    dataObj: f
                }), h.dragTracker = m)
            },
            dragStart: function() {
                var b = this.data("drag-options"),
                    d = b.chart,
                    a = d.yAxis[0],
                    c = a.max,
                    a = a.min,
                    e = this.getBBox();
                b.barH = b.items.graphic.getBBox().height;
                b.isAllPositive = 0 < c && 0 < a;
                b.isAllPositiveZero = 0 < c && 0 <= a;
                b.isAllNegative = 0 > c && 0 > a;
                b.isAllNegativeZero = 0 >= c && 0 > a;
                b.isPositiveNegative = 0 < c && 0 > a;
                b.boundaryTop = d.canvasTop;
                b.boundaryBottom = d.canvasTop + d.canvasHeight;
                b.bBoxY = e.y;
                b.bBoxY2 = e.y2 || e.y + e.height;
                b.startValue = b.dataObj.y;
                b.origX = b.lastX || (b.lastX = 0);
                b.origY = b.lastY || (b.lastY = 0);
                b.draged = !1
            },
            dragMove: function(b, d) {
                var a = this.data("drag-options"),
                    c = a.items,
                    e = a.dataObj,
                    f = a.chart,
                    g = f.options.chart,
                    h = f.yAxis[0],
                    u = f.logic.numberFormatter,
                    m = h.yBasePos,
                    r = c.dataLabel,
                    k = {},
                    n = a.bBoxY2 + d,
                    q = a.bBoxY + d,
                    w = f.canvasBottom,
                    s = e.allowNegDrag ? w : m,
                    t = f.canvasTop,
                    y = parseFloat(e.borderWidth) || 0,
                    g = g.isCanvasBorder,
                    x = a.isAllNegativeZero,
                    v = a.isPositiveNegative,
                    z = a.dataOptions;
                q < a.boundaryTop && (d = a.boundaryTop - a.bBoxY);
                n > s && (d = s - a.bBoxY2);
                q = a._transformObj = {
                    transform: "t0," + (a.origY + d)
                };
                a.draged || (n = {
                    dataIndex: a.pointIndex + 1,
                    datasetIndex: z.__i + 1,
                    startValue: a.startValue,
                    datasetName: z.name
                }, C.raiseEvent("dataplotDragStart",
                    n, f.logic.chartInstance));
                n = a.yPos + d;
                n <= m ? (k.y = n, k.height = m - n) : (k.y = m, k.height = n - m);
                g && !v && (x ? k.y -= k.y - (t - y / 2) : k.height = w - k.y + y / 2);
                this.attr(q);
                c.graphic.animate(k);
                a.shapeAttr = k;
                c = a.value = na(1E8 * h.getAxisPosition(n, 1)) / 1E8;
                u = u.dataLabels(c);
                sa.pointUpdate(e, u, c);
                r && f.drawPlotColumnLabel(f.plots[a.datasetIndex], a.dataOptions, a.pointIndex, void 0, n).attr("text", a.dataObj.displayValue);
                a.draged = !0;
                a.lastX = b;
                a.lastY = d
            },
            dragUp: function() {
                var b = this.data("drag-options"),
                    d = b.chart,
                    a = d.logic,
                    c = !d.options.chart.doNotSnap,
                    e = b.dataObj,
                    f = b.dataOptions,
                    g, h;
                b.draged && (g = b.yPos + b.lastY, c && (h = sa.snapPoint(d, e, g), h - g && d.dragMove.call(this, 0, h - b.yPos)), b.yPos = h, b.lastX += b.origX, b.lastY += b.origY, c = {
                        dataIndex: b.pointIndex + 1,
                        datasetIndex: f.__i + 1,
                        startValue: b.startValue,
                        endValue: b.dataObj.y = b.value,
                        datasetName: f.name
                    }, f = [d.logic.chartInstance.id, c.dataIndex, c.datasetIndex, c.datsetName, c.startValue, c.endValue], C.raiseEvent("dataplotDragEnd", c, d.logic.chartInstance), s.raiseEvent("chartupdated", c, d.logic.chartInstance, f), c = {
                        hcJSON: {
                            series: []
                        }
                    },
                    c.hcJSON.series[b.datasetIndex] = {
                        data: []
                    }, b.items.tracker.attr(b.shapeAttr).tooltip(e.toolText), c.hcJSON.series[b.datasetIndex].data[b.pointIndex] = {
                        y: b.value,
                        toolText: e.toolText,
                        displayValue: e.displayValue
                    }, sa.setMinMaxValue(d), M(a.chartInstance.jsVars._reflowData, c, !0))
            }
        }, t["renderer.cartesian"]);
        t("renderer.dragline", {
            drawTracker: function(b, d, a) {
                var c = this.paper,
                    e = this.yAxis[0],
                    f = this.xAxis[0],
                    g = b.data[a],
                    h = b.items[a],
                    u = ga ? 20 : Xa(g.marker && g.marker.radius || 0, 5),
                    m = this.layers.tracker,
                    r = h.tracker ||
                    null,
                    k = this.dragStart,
                    n = this.dragUp,
                    q = this.dragMove,
                    w = {
                        fill: ua,
                        "stroke-width": 0,
                        cursor: Wa && "ns-resize" || "n-resize"
                    },
                    s = e && e.axisData && e.axisData.plotLines,
                    t = this._yAxisPlotLines || (this._yAxisPlotLines = []),
                    y = 0,
                    x, v;
                if (!t.length)
                    for (x = s.length; y < x; y += 1) v = s[y], v.isGrid && t.push(e.getAxisPosition(v.value));
                null !== g.y && g.allowDrag && (f = f.getAxisPosition(a), e = e.getAxisPosition(g.y), r || (r = h.tracker = c.circle(f, e, u, m).attr(w)), r.attr({
                    cursor: Wa && "ns-resize" || "n-resize",
                    ishot: !0
                }).drag(q, k, n).data("drag-options", {
                    items: b.items,
                    yPos: e,
                    chart: this,
                    datasetIndex: b.index,
                    pointIndex: a,
                    dataOptions: d,
                    dataObj: g
                }))
            },
            dragStart: function() {
                var b = this.data("drag-options"),
                    d = b.items,
                    a = b.pointIndex,
                    c = d[a + 1],
                    d = d[a],
                    c = b.nextGraph = c && c.connector,
                    d = b.currGraph = d && d.connector,
                    a = b.chart;
                b._origY = b._lastY || (b._lastY = 0);
                b.boundaryTop = a.canvasTop;
                b.boundaryBottom = a.canvasTop + a.canvasHeight;
                b.currPath = d && d.attr("path");
                b.nextPath = c && c.attr("path");
                b.startValue = b.dataObj.y;
                b.origY = this.attr("cy");
                b.origX = this.attr("cx");
                b.draged = !1
            },
            dragMove: function(b, d) {
                var a = this.data("drag-options"),
                    c = a.items[a.pointIndex],
                    e = a.nextPath,
                    f = a.currPath,
                    g = a.dataObj,
                    h = a.chart,
                    u = h.elements.plots[a.datasetIndex],
                    m = h.yAxis[0],
                    r = h.logic.numberFormatter,
                    k = m.yBasePos,
                    n = c.dataLabel,
                    q = g.allowNegDrag ? a.boundaryBottom : k,
                    w = a.dataOptions,
                    k = a.origY + d;
                a.draged || (w = {
                    dataIndex: a.pointIndex + 1,
                    datasetIndex: w.__i + 1,
                    startValue: a.startValue,
                    datasetName: w.name
                }, C.raiseEvent("dataplotDragStart", w, h.logic.chartInstance));
                k < a.boundaryTop && (d = a.boundaryTop - a.origY);
                k > q &&
                    (d = q - a.origY);
                k = a.origY + d;
                this.animate({
                    cy: k
                });
                c.graphic && c.graphic.attr("transform", "t0," + (a._origY + d));
                e && e[0] && a.nextGraph && (Wa ? e[0][2] = k : e[2] = k, a.nextGraph.animate({
                    path: e
                }));
                f && f[1] && a.currGraph && (Wa ? f[1][2] = k : f[5] = k, a.currGraph.animate({
                    path: f
                }));
                c = g.y = a.value = na(1E8 * m.getAxisPosition(k, 1)) / 1E8;
                r = r.dataLabels(c);
                sa.pointUpdate(g, r, c);
                n && h.drawPlotLineLabel(h.plots[a.datasetIndex], a.dataOptions, a.pointIndex, a.origX, k).attr("text", g.displayValue);
                a.draged = !0;
                a.lastY = d;
                h.getAreaPath && u.graphic &&
                    u.graphic.attr({
                        path: h.getAreaPath(u.data)
                    })
            },
            dragUp: function() {
                var b = this.data("drag-options"),
                    d = b.chart,
                    a = d.logic,
                    c = !d.options.chart.doNotSnap,
                    e = b.dataObj,
                    f = b.dataOptions,
                    g, h;
                b.draged && (g = b.yPos + b.lastY, c && (h = sa.snapPoint(d, e, g), h - g && d.dragMove.call(this, 0, h - b.yPos)), b.yPos = h, b._lastY = b.lastY + b._origY, b.lastY += b.origY, f = {
                    dataIndex: b.pointIndex + 1,
                    datasetIndex: f.__i + 1,
                    startValue: b.startValue,
                    endValue: b.dataObj.y = b.value,
                    datasetName: f.name
                }, c = [d.logic.chartInstance.id, f.dataIndex, f.datasetIndex, f.datasetName,
                    f.startValue, f.endValue
                ], C.raiseEvent("dataplotDragEnd", f, d.logic.chartInstance), s.raiseEvent("chartupdated", f, d.logic.chartInstance, c), c = {
                    hcJSON: {
                        series: []
                    }
                }, c.hcJSON.series[b.datasetIndex] = {
                    data: []
                }, c.hcJSON.series[b.datasetIndex].data[b.pointIndex] = {
                    y: b.value,
                    toolText: e.toolText,
                    displayValue: e.displayValue
                }, b.items[b.pointIndex].tracker.tooltip(e.toolText), sa.setMinMaxValue(d), M(a.chartInstance.jsVars._reflowData, c, !0))
            }
        }, t["renderer.cartesian"]);
        t("renderer.dragarea", {
            getAreaPath: function(b) {
                for (var d =
                        this.xAxis[0], a = this.yAxis[0], c = a.yBasePos, e = b.length, f = 0, g = [], h = [], u = [], m = !0, r, k, n; f < e; f += 1) k = b[f], u[f] = d.getAxisPosition(f), h[f] = null, null !== k.y && (h[f] = a.getAxisPosition(k.y), n = b[f - 1] ? b[f - 1].y : null, k = b[f + 1] ? b[f + 1].y : null, null !== n ? (m ? (g.push("M", u[f - 1], c, "L", u[f - 1], h[f - 1], "L", u[f], h[f]), r = f - 1) : g.push("L", u[f], h[f]), null === k && g.push("L", u[f], c, "L", u[r], c), m = !1) : m = !0);
                return g
            }
        }, t["renderer.dragline"]);
        t("renderer.heatmap", {
            drawPlotHeatmap: function(b, d) {
                var a = this,
                    c = b.data,
                    e = b.items,
                    f = b.graphics = b.graphics || [],
                    h = a.paper,
                    l = a.layers,
                    u = a.options,
                    m = u.chart,
                    r = m.showHoverEffect,
                    k = !1 !== (u.tooltip || {}).enabled,
                    n = u.plotOptions.series,
                    u = a.xAxis[d.xAxis || 0],
                    q = a.yAxis[d.yAxis || 0],
                    n = isNaN(+n.animation) && n.animation.duration || 1E3 * n.animation,
                    w = !1 === d.visible ? "hidden" : "visible",
                    s, t, y = u.getAxisPosition(0),
                    x = u.getAxisPosition(1),
                    v = q.getAxisPosition(0),
                    z = q.getAxisPosition(1),
                    y = x - y,
                    v = v - z,
                    m = g(m.useRoundEdges, 0),
                    z = d.borderColor,
                    x = d.borderWidth,
                    A = d.dashStyle,
                    B = y / 2,
                    D = v / 2,
                    E = l.dataset = l.dataset || h.group("dataset-orphan"),
                    C =
                    l.datalabels = l.datalabels || h.group("datalables").insertAfter(E),
                    l = l.tracker,
                    K = a.chartWidth,
                    I = a.chartHeight,
                    M = function(b) {
                        ya.call(this, a, b)
                    },
                    S = function(b) {
                        ya.call(this, a, b, "DataPlotRollOver")
                    },
                    J = function(b) {
                        ya.call(this, a, b, "DataPlotRollOut")
                    },
                    Q = function(a, b) {
                        return function() {
                            a.attr({
                                fill: ka(b)
                            })
                        }
                    },
                    U, L, H, N, Y, R, P, X, Z;
                n && (C.attr({
                    transform: "t" + K + "," + I
                }), a.animationCompleteQueue.push({
                    fn: function() {
                        C.attr({
                            transform: "t0,0"
                        })
                    },
                    scope: this
                }));
                K = 0;
                for (I = c.length; K < I; K++) {
                    N = c[K];
                    L = N.y;
                    U = null;
                    if (null !== L) {
                        Y =
                            N.link;
                        R = N.toolText || N.tooltext;
                        U = ka(N.setColor || N.color);
                        t = (s = N.visible) && !1 === s ? "hiddden" : w;
                        P = g(N.x, K);
                        P = u.getAxisPosition(P) - B;
                        Z = q.getAxisPosition(L);
                        X = Z + D;
                        L = {
                            link: Y,
                            value: N.value,
                            columnId: N.columnId,
                            rowId: N.rowId,
                            displayValue: N.displayValue,
                            tlLabel: N.tlLabel,
                            trLabel: N.trLabel,
                            blLabel: N.blLabel,
                            brLabel: N.brLabel,
                            toolText: R,
                            id: b.userID,
                            datasetIndex: b.index,
                            datasetName: b.name,
                            visible: b.visible
                        };
                        U = h.rect(P, Z, y, v, m, E).attr({
                            fill: U,
                            stroke: z,
                            "stroke-width": x,
                            "stroke-dasharray": A,
                            "stroke-linejoin": "miter",
                            "shape-rendering": 0 === m ? "crisp" : "",
                            cursor: Y ? "pointer" : "",
                            opacity: n ? 0 : N.setAlpha && +N.setAlpha / 100 || 1
                        }).crisp().attr({
                            visibility: t
                        });
                        n && U.animate({
                            opacity: N.setAlpha && +N.setAlpha / 100 || 1
                        }, n, "normal", a.getAnimationCompleteFn());
                        if (r || k || Y) H = h.rect(P, Z, y, v, m, l).attr({
                            cursor: Y ? "pointer" : "",
                            stroke: ua,
                            "stroke-width": x,
                            fill: ua,
                            ishot: !0
                        }).data("eventArgs", L);
                        (H || U).click(M).hover(S, J).tooltip(R);
                        1 === r && U && H && H.hover(Q(U, N.hoverColor), Q(U, N.setColor || N.color));
                        e[K] = {
                            index: K,
                            value: N.value,
                            graphic: U,
                            tracker: H,
                            dataLabel: null,
                            dataLabels: [],
                            visible: s || "hidden" !== t
                        };
                        s = a.drawLabelHeatmap.call(a, b, d, K);
                        U && f.push(U);
                        H && f.push(H);
                        t = 0;
                        for (N = s.length; t < N; t++) !e[K].dataLabels && (e[K].dataLabels = []), s[t] && f.push(s[t]), e[K].dataLabels.push(s[t])
                    }
                    a.drawTracker && a.drawTracker.call(a, b, K, P, X)
                }
                b.visible = !1 !== d.visible;
                return b
            },
            drawLabelHeatmap: function(b, d, a) {
                var c = b.items[a],
                    e = b.data[a],
                    f = this.options;
                b = this.paper;
                a = this.layers.datalabels;
                var g = f.plotOptions.series.dataLabels,
                    h = g.style;
                d = !1 === d.visible ? "hidden" : zb;
                var u =
                    e.displayValue,
                    f = f.chart.textDirection,
                    m = e.tlLabel,
                    r = e.trLabel,
                    k = e.blLabel,
                    e = e.brLabel,
                    n = g.tlLabelStyle,
                    q = g.trLabelStyle,
                    s = g.blLabelStyle,
                    g = g.brLabelStyle,
                    t = {
                        fontFamily: n.fontFamily,
                        fontSize: n.fontSize,
                        lineHeight: n.lineHeight,
                        fontWeight: n.fontWeight,
                        fontStyle: n.fontStyle
                    },
                    v = {
                        fontFamily: q.fontFamily,
                        fontSize: q.fontSize,
                        lineHeight: q.lineHeight,
                        fontWeight: q.fontWeight,
                        fontStyle: q.fontStyle
                    },
                    y = {
                        fontFamily: s.fontFamily,
                        fontSize: s.fontSize,
                        lineHeight: s.lineHeight,
                        fontWeight: s.fontWeight,
                        fontStyle: s.fontStyle
                    },
                    x = {
                        fontFamily: g.fontFamily,
                        fontSize: g.fontSize,
                        lineHeight: g.lineHeight,
                        fontWeight: g.fontWeight,
                        fontStyle: g.fontStyle
                    },
                    z = c.tlLabel,
                    A = c.trLabel,
                    D = c.blLabel,
                    E = c.brLabel,
                    G = this.smartLabel,
                    C = c.dataLabel,
                    I = [],
                    K = {
                        fontFamily: h.fontFamily,
                        fontSize: h.fontSize,
                        lineHeight: h.lineHeight,
                        fontWeight: h.fontWeight,
                        fontStyle: h.fontStyle
                    },
                    M, S, Q, J, V, U, L, H;
                J = c.graphic.getBBox();
                M = J.width;
                S = J.height;
                Q = J.x;
                J = J.y;
                G.setStyle(h);
                X(u) && u !== B && (L = G.getSmartText(u, M, S, !1), u = L.text, C || (C = c.dataLabel = b.text(a)), C.attr({
                    text: u,
                    title: L.tooltext ||
                        "",
                    visibility: d,
                    fill: h.color,
                    direction: f,
                    x: Q + .5 * M,
                    y: J + .5 * S,
                    "text-bound": [h.backgroundColor, h.borderColor, h.borderThickness, h.borderPadding, h.borderRadius, h.borderDash]
                }).css(K), I.push(C));
                u = X(m) && m !== B;
                K = X(r) && r !== B;
                V = X(k) && k !== B;
                U = X(e) && e !== B;
                h = M * (u && K ? .5 : .9);
                C = .5 * (S - (L && L.height || 0));
                H = J + 4;
                u && (G.setStyle(n), L = G.getSmartText(m, h, C, !1), u = L.text, m = Q, z || (z = c.tlLabel = b.text(a)), z.attr({
                    text: u,
                    title: L.tooltext || "",
                    visibility: d,
                    fill: n.color,
                    "text-anchor": "start",
                    "vertical-align": La,
                    direction: f,
                    x: m + 4,
                    y: H,
                    "text-bound": [n.backgroundColor, n.borderColor, n.borderThickness, n.borderPadding, n.borderRadius, n.borderDash]
                }).css(t), a.appendChild(z), I.push(z));
                K && (G.setStyle(q), L = G.getSmartText(r, h, C, !1), u = L.text, m = Q + M, A || (A = c.trLabel = b.text(a)), A.attr({
                    text: u,
                    title: L.tooltext || "",
                    visibility: d,
                    fill: q.color,
                    "text-anchor": "end",
                    "vertical-align": La,
                    direction: f,
                    x: m - 4,
                    y: H,
                    "text-bound": [q.backgroundColor, q.borderColor, q.borderThickness, q.borderPadding, q.borderRadius, q.borderDash]
                }).css(v), a.appendChild(A), I.push(A));
                H = J + S - 4;
                V && (G.setStyle(s), L = G.getSmartText(k, h, C, !1), u = L.text, m = Q, D || (D = c.blLabel = b.text(a)), D.attr({
                    text: u,
                    title: L.tooltext || "",
                    visibility: d,
                    fill: s.color,
                    "text-anchor": "start",
                    "vertical-align": Ga,
                    direction: f,
                    x: m + 4,
                    y: H,
                    "text-bound": [s.backgroundColor, s.borderColor, s.borderThickness, s.borderPadding, s.borderRadius, s.borderDash]
                }).css(y), I.push(D));
                U && (G.setStyle(s), L = G.getSmartText(e, h, C, !1), u = L.text, m = Q + M - 4, E || (E = c.brLabel = b.text(a)), E.attr({
                    text: u,
                    title: L.tooltext || "",
                    visibility: d,
                    fill: g.color,
                    "text-anchor": "end",
                    "vertical-align": Ga,
                    direction: f,
                    x: m,
                    y: H,
                    "text-bound": [g.backgroundColor, g.borderColor, g.borderThickness, g.borderPadding, g.borderRadius, g.borderDash]
                }).css(x), a.appendChild(E), I.push(E));
                return I
            },
            setScaleRange: function(b, d) {
                var a = this.logic,
                    c = this.plots[0],
                    e = {
                        visibility: "visible"
                    },
                    f = {
                        visibility: "hidden"
                    },
                    g = {
                        hcJSON: {
                            series: [{}]
                        }
                    },
                    h = g.hcJSON.series[0],
                    u = h.data || (h.data = []),
                    m = a.chartInstance.jsVars._reflowData,
                    r = c.items,
                    k, n, q, s, t, v, y, x = function(a) {
                        a.attr(v)
                    };
                setTimeout(function() {
                    var a, c;
                    a = 0;
                    for (c = r.length; a <
                        c; a++) k = r[a], n = k.value, q = k.graphic, t = u[a] || (u[a] = {}), s = k.dataLabels, v = (y = n >= b && n <= d) ? e : f, q.attr(v), mb(s, x), t.visible = y;
                    M(m, g, !0)
                }, 100)
            }
        }, t["renderer.cartesian"]);
        t("renderer.radar", {
            createRadarAxis: function() {
                var b = this.options,
                    d = this.canvasLeft + this.canvasWidth / 2,
                    a = this.canvasTop + this.canvasHeight / 2,
                    c = b.xAxis,
                    e = b.yAxis instanceof Array ? b.yAxis[0] : b.yAxis,
                    f = c.max - c.min + 1,
                    g = S(e.max - e.min),
                    b = X(b.chart.axisRadius) ? b.chart.axisRadius : E(d, a),
                    h, s = Qa.PI / 2,
                    m = {};
                0 > b && (b = E(d, a));
                h = 2 * Qa.PI / f;
                m.yTrans = b / g;
                m.xTrans =
                    h;
                m.yRange = g;
                m.startAngle = s;
                m.yMin = e.min;
                m.centerX = d;
                m.centerY = a;
                m.radius = b;
                m.categories = [];
                m.catLength = f;
                m.yAxis = e;
                m.xAxis = c;
                return this.radarAxis = m
            },
            drawRadarAxis: function() {
                var b = this.radarAxis,
                    d = b.catLength,
                    a = b.xAxis,
                    c = b.yAxis,
                    e = c.min,
                    f = c.plotLines,
                    p = f.length,
                    l = a.plotLines,
                    s = b.xTrans,
                    m = b.yTrans,
                    r = b.radius,
                    k = b.startAngle,
                    n = this.canvasLeft + this.canvasWidth / 2,
                    q = this.canvasTop + this.canvasHeight / 2,
                    t = this.paper,
                    v = this.layers,
                    z = v.dataset = v.dataset || t.group("orphan-dataset").trackTooltip(!0),
                    y = v.layerBelowDataset =
                    v.layerBelowDataset || t.group("axisbottom").trackTooltip(!0),
                    x = v.layerAboveDataset = v.layerAboveDataset || t.group("axistop").trackTooltip(!0),
                    A = v.axisLines = v.axisLines || t.group("axis-lines", y),
                    D = v.axisLabels = v.axisLabels || t.group("axis-labels", y),
                    B = c.labels,
                    c = 2 * Qa.PI,
                    C = Qa.PI / 2,
                    E = Qa.PI + C,
                    I = !1 !== (this.options.tooltip || {}).enabled,
                    M = ["right", "center", "left"],
                    K = a.labels,
                    Q = g(.9 * parseInt(K.style && K.style.fontSize, 10), 9) / 2,
                    K = r + K.labelPadding,
                    X = [],
                    V = ["M"],
                    J = [],
                    aa = this.logic.smartLabel,
                    U = this.options.chart.textDirection,
                    L, H, N, Y, R, P;
                y.insertBefore(z);
                x.insertAfter(z);
                b.divline = [];
                for (R = 0; R < p; R += 1) {
                    J[R] = ["M"];
                    y = !0;
                    z = d;
                    L = f[R];
                    P = L.tooltext;
                    for (H = L.value; z--;) B = S(H - e) * m, N = n + B * ra(-(k + z * s)), Y = q + B * ab(-(k + z * s)), J[R].splice(J[R].length, 0, N, Y), y && (J[R].push("L"), y = !1), 0 === z && L.label && (B = L.label, ((x = B.text) || 0 === x) && t.text(D).attr({
                        text: x,
                        x: N,
                        y: Y,
                        "text-anchor": "right" === B.textAlign ? "end" : "left" === B.textAlign ? "start" : "middle",
                        "vertical-align": B.verticalAlign,
                        direction: U,
                        rotation: B.rotation
                    }).css(B.style));
                    J[R].push("Z");
                    b.divline[R] =
                        t.path(J[R], A).attr({
                            stroke: L.color,
                            "stroke-width": L.width
                        });
                    I && P && t.path({
                        stroke: ua,
                        "stroke-width": Xa(L.width, ac),
                        ishot: !0,
                        path: J[R]
                    }, v.tracker).toBack().tooltip(P)
                }
                y = !0;
                for (z = l.length; z--;)
                    if (L = l[z], H = L.value, I = k + H * s, d = I % c, N = n + r * ra(-I), Y = q + r * ab(-I), X.splice(X.length, 0, "M", n, q, "L", N, Y), V.splice(V.length, 0, N, Y), y && (V.push("L"), y = !1), L.label && (B = L.label, (x = B.text) || 0 === x)) {
                        f = d > C && d < E ? 0 : d == C || d == E ? 1 : 2;
                        d = B.style;
                        e = {
                            fontFamily: d.fontFamily,
                            fontSize: d.fontSize,
                            lineHeight: d.lineHeight,
                            fontWeight: d.fontWeight,
                            fontStyle: d.fontStyle
                        };
                        aa.setStyle(e);
                        f = "right" === M[f] ? "end" : "left" === M[f] ? "start" : "middle";
                        p = n + K * ra(-I);
                        m = q + K * ab(-I);
                        L = parseInt(e.lineHeight, 10);
                        J = B.verticalAlign;
                        switch (f) {
                            case "start":
                                v = this.canvasLeft + this.canvasWidth - p;
                                I = l[z - 1];
                                I = k + I.value * s;
                                I = q + K * ab(-I) + Q * ab(-I) + Q;
                                J = l[z + 1 === l.length ? 0 : z + 1];
                                J = k + J.value * s;
                                J = q + K * ab(-J) + Q * ab(-J) + Q;
                                L = .5 * (I - m) + .5 * (m - J);
                                J = "middle";
                                break;
                            case "end":
                                v = p - this.canvasLeft;
                                I = l[z + 1];
                                I = k + I.value * s;
                                I = q + K * ab(-I) + Q * ab(-I) + Q;
                                J = l[z - 1];
                                J = k + J.value * s;
                                J = q + K * ab(-J) + Q * ab(-J) + Q;
                                L = .5 *
                                    (I - m) + .5 * (m - J);
                                J = "middle";
                                break;
                            default:
                                v = this.canvasWidth, m += Q * ab(-I) + Q
                        }
                        x = aa.getSmartText(x, v, L).text;
                        t.text(D).attr({
                            text: x,
                            x: p,
                            y: m,
                            "text-anchor": f,
                            "vertical-align": J,
                            rotation: B.rotation,
                            direction: U,
                            "text-bound": [d.backgroundColor, d.borderColor, d.borderThickness, d.borderPadding, d.borderRadius, d.borderDash]
                        }).css(e)
                    }
                V.push("Z");
                b.spikeGraph = t.path(X, A).attr({
                    stroke: a.gridLineColor,
                    "stroke-width": h(a.gridLineWidth, 1)
                });
                a.showRadarBorder && (b.borderGraph = t.path(V, A).toBack().attr({
                    stroke: a.radarBorderColor,
                    "stroke-width": h(a.radarBorderThickness, 2),
                    fill: a.radarFillColor
                }))
            },
            drawPlotRadar: function(b, d) {
                var a = this,
                    c = a.paper,
                    e = a.layers,
                    f = e.dataset = e.dataset || c.group("orphan-dataset"),
                    h = e.datalabels = e.datalabels || c.group("datalabels").insertAfter(f),
                    l = e.tracker = e.tracker || c.group("hot").insertAfter(f),
                    s = a.options,
                    m = s.chart.anchorTrackingRadius,
                    r = s.plotOptions.series,
                    k = [],
                    n = b.items || {},
                    q = b.graphics = b.graphics || [],
                    e = a.radarAxis,
                    w = d.data || [],
                    v = w.length,
                    z, y, x = !1 === d.visible,
                    A = x ? "hidden" : "visible",
                    r = isNaN(+r.animation) &&
                    r.animation.duration || 1E3 * r.animation,
                    B, D, C = !1 !== (s.tooltip || {}).enabled,
                    E, I, M, K, Q = f.radarGroup = f.radarGroup || c.group("connectors", f),
                    V = f.marker = f.marker || c.group("anchors", f),
                    X = l.trackers = l.trackers || c.group("trackers", l),
                    J = a.chartWidth,
                    aa = a.chartHeight,
                    f = [],
                    U, L, H, N, Y, R, P, da, Z, W, ca, ea, ha, ba, ga, ma, ja = (s = s.cursor) && {
                        cursor: s
                    },
                    la = t["renderer.cartesian"],
                    na, ia, sa;
                void 0 === a.radarAxis && (e = a.radarAxis = a.createRadarAxis(d), a.drawRadarAxis(d));
                B = e.yTrans;
                E = e.yMin;
                I = e.startAngle;
                D = e.xTrans;
                z = e.centerX;
                y =
                    e.centerY;
                1 <= v && (R = [], mb(w, function(e, f) {
                    Z = null;
                    f ? 2 > f && R.push("L") : R.push("M");
                    n[f] = na = k[f] = {
                        chart: a,
                        index: f,
                        value: e.y
                    };
                    if (null === e.y) R.push(z, y);
                    else {
                        P = W = null;
                        ca = e.link;
                        ea = e.tooltext || e.toolText;
                        M = z + B * S(e.y - E) * ra(-(I + f * D));
                        K = y + B * S(e.y - E) * ab(-(I + f * D));
                        if (P = e.anchorElem) Y = g(P.attr("r"), L.radius), P.attr({
                            x: M,
                            y: K,
                            r: Y
                        });
                        else if (L = e.marker, sa = {
                                index: f,
                                link: ca,
                                value: e.y,
                                displayValue: e.displayValue,
                                categoryLabel: e.categoryLabel,
                                toolText: ea,
                                id: b.userID,
                                datasetIndex: b.index,
                                datasetName: b.name,
                                visible: b.visible
                            },
                            L && L.enabled)
                            if (H = L.radius, ha = L.shadow, U = L.symbol.split("_"), N = "spoke" === U[0] ? 1 : 0, ga = ma = {}, ba = e.rolloverProperties, L.imageUrl) ia = new Ya.Image, ia.onload = function(e, f, g, h, k, p, m, n) {
                                return function() {
                                    var r = g.imageUrl,
                                        s = g.imageScale,
                                        t = g.imageAlpha,
                                        u = m.imageHoverAlpha,
                                        w = m.imageHoverScale,
                                        v = this.width * s * .01,
                                        x = this.width * w * .01;
                                    ga = {
                                        x: e - this.width * s * .005,
                                        y: f - this.height * s * .005,
                                        width: v,
                                        height: this.height * s * .01,
                                        alpha: t
                                    };
                                    ma = {
                                        x: e - this.width * w * .005,
                                        y: f - this.height * w * .005,
                                        width: x,
                                        height: this.height * w * .01,
                                        alpha: u
                                    };
                                    u = x > v ? ma : ga;
                                    (h.graphic = P = c.image(r, V).attr(ga).css({
                                        opacity: .01 * t
                                    }).data("alwaysInvisible", 0 === s).data("setRolloverProperties", m).data("setRolloverAttr", ma).data("setRolloutAttr", ga).data("anchorRadius", s).data("anchorHoverRadius", w)) && q.push(P);
                                    if (ca || C || m) W = h.tracker = c.rect(l).attr(u).attr({
                                        cursor: ca ? "pointer" : "",
                                        stroke: ua,
                                        "stroke-width": g.lineWidth,
                                        fill: ua,
                                        ishot: !0,
                                        visibility: A
                                    }).data("eventArgs", k).click(function(b) {
                                        ya.call(this, a, b)
                                    }).hover(function(b) {
                                        return function(c) {
                                            la.hoverPlotAnchor(this,
                                                c, "DataPlotRollOver", b, a)
                                        }
                                    }(h), function(b) {
                                        return function(c) {
                                            la.hoverPlotAnchor(this, c, "DataPlotRollOut", b, a)
                                        }
                                    }(h)).tooltip(p);
                                    (Z = h.dataLabel = la.drawPlotLineLabel.call(a, b, d, n, e, f)) && q.push(Z)
                                }
                            }(M, K, L, na, sa, ea, ba, f), ia.onerror = function(c, e, f, g, h, k, l, m) {
                                return function() {
                                    (Z = g.dataLabel = la.drawPlotLineLabel.call(a, b, d, m, c, e)) && q.push(Z)
                                }
                            }(M, K, L, na, sa, ea, ba, f), ia.src = L.imageUrl;
                            else {
                                ba && (ga = {
                                        polypath: [U[1] || 2, M, K, H, L.startAngle, N],
                                        fill: ka(L.fillColor),
                                        "stroke-width": L.lineWidth,
                                        stroke: ka(L.lineColor)
                                    },
                                    ma = {
                                        polypath: [ba.sides || 2, M, K, ba.radius, ba.startAngle, ba.dip],
                                        fill: ka(ba.fillColor),
                                        "stroke-width": ba.lineWidth,
                                        stroke: ka(ba.lineColor)
                                    });
                                P = na.graphic = c.polypath(U[1] || 2, M, K, H, L.startAngle, null, V).attr({
                                    fill: ka(L.fillColor),
                                    "stroke-width": L.lineWidth,
                                    stroke: ka(L.lineColor),
                                    cursor: ca ? "pointer" : "",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    ishot: !0,
                                    visibility: 0 === H ? "hidden" : A
                                }).data("alwaysInvisible", 0 === H).data("setRolloverProperties", ba).data("setRolloverAttr", ma).data("setRolloutAttr", ga).data("anchorRadius",
                                    H).data("anchorHoverRadius", ba && ba.radius).shadow(ha);
                                e.anchorElem = P;
                                if (ca || C || ba)(W = e.trackerElem) ? (Y = g(W.attr("r"), L.radius + 1), W.attr({
                                    x: M,
                                    y: K,
                                    r: Y
                                })) : (U || (U = L.symbol.split("_")), H = Xa(H, m, ba && ba.radius || 0), W = c.circle(M, K, H, X).attr({
                                    cursor: e.link ? "pointer" : "",
                                    stroke: ua,
                                    "stroke-width": 1,
                                    fill: ua,
                                    ishot: !0,
                                    visibility: A
                                }).css(ja)), e.trackerElem = W;
                                (W = W || P) && W.data("eventArgs", sa).click(function(b) {
                                    ya.call(this, a, b)
                                }).hover(function(b) {
                                        return function(c) {
                                            la.hoverPlotAnchor(this, c, "DataPlotRollOver", b, a)
                                        }
                                    }(na),
                                    function(b) {
                                        return function(c) {
                                            la.hoverPlotAnchor(this, c, "DataPlotRollOut", b, a)
                                        }
                                    }(na)).tooltip(ea)
                            }
                        R.push(M, K);
                        na.dataLabel = Z;
                        na.tracker = W;
                        L && L.imageUrl || (Z = la.drawPlotLineLabel.call(a, b, d, f, M, K));
                        P && q.push(P);
                        Z && q.push(Z);
                        W && q.push(W)
                    }
                }), R.push("Z"), f = f.concat(R));
                f && 0 < f.length && (da = b.graphic = c.path(f, Q).attr({
                    stroke: ka(d.lineColor.FCcolor),
                    fill: ka(d.fillColor.FCcolor),
                    "stroke-width": d.lineWidth,
                    visibility: A
                }));
                r && (a.animationCompleteQueue.push({
                    fn: function() {
                        V.show();
                        h.attr({
                            transform: "...t" + -J +
                                "," + -aa
                        })
                    },
                    scope: a
                }), V.hide(), h.attr({
                    transform: "...t" + J + "," + aa
                }), Q.scale(.01, .01, z, y).animate({
                    transform: "s1,1"
                }, r, "normal", a.getAnimationCompleteFn()));
                da && q.push(da);
                b.visible = !x
            },
            legendClick: function(b) {
                t["renderer.cartesian"].legendClick.call(this, b)
            },
            getEventArgs: function(b) {
                return t["renderer.cartesian"].getEventArgs.call(this, b)
            }
        }, t["renderer.root"]);
        t("renderer.multiLevelPie", {
            drawPlotMultilevelpie: function(b, d) {
                var a = this,
                    c = b.items,
                    e = b.data,
                    f = a.options,
                    h = f.plotOptions.series,
                    l = a.layers,
                    s = h.animation,
                    m = h.dataLabels.style,
                    r = h.shadow,
                    k = g(b.moveDuration, s.duration, 0),
                    n = h.borderWidth,
                    q = h.borderColor,
                    t = a.paper,
                    v = f.chart.textDirection,
                    f = (f = f.tooltip || {}, !1 !== f.enabled),
                    z = (d.startAngle || 0) % ma,
                    y = ma / (d.valueTotal || 100),
                    x = a.canvasLeft + .5 * a.canvasWidth,
                    A = a.canvasTop + .5 * a.canvasHeight,
                    B, D, C, G, I, M, K, Q, S, V, J;
                D = E(a.canvasWidth, a.canvasHeight);
                var X, U = l.dataset,
                    L = s.mainItem,
                    H = s.animObj,
                    N = function(b) {
                        ya.call(this.graphic, a, b, "DataPlotRollOver");
                        h.point.events.mouseOver.call(this)
                    },
                    Y = function(b) {
                        ya.call(this.graphic,
                            a, b, "DataPlotRollOut");
                        h.point.events.mouseOut.call(this)
                    },
                    R = function(b) {
                        ya.call(this.graphic, a, b, "DataPlotRollOver");
                        h.point.events.mouseOver.call(this)
                    },
                    P = function(b) {
                        ya.call(this.graphic, a, b, "DataPlotRollOut");
                        h.point.events.mouseOut.call(this)
                    },
                    aa = function() {
                        a.placeDataLabels(!1, c, b, d)
                    };
                B = .5 * (/%$/.test(d.size) ? D * parseInt(d.size, 10) / 100 : d.size);
                D = .5 * (/%$/.test(d.innerSize) ? D * parseInt(d.innerSize, 10) / 100 : d.innerSize);
                d.metrics = [x, A, 2 * B, 2 * D];
                e && e.length || (e = []);
                X = l.datalabels || (l.datalabels = t.group("datalabels").insertAfter(U));
                V = S = z;
                for (J = e.length; J--;) G = e[J], I = G.y, M = G.displayValue, l = G.toolText, K = !!G.link, null !== I && void 0 !== I && (V = S, S -= I * y, Q = .5 * (S + V), (C = c[J]) || (C = c[J] = {
                    chart: a,
                    link: G.link,
                    value: I,
                    angle: Q,
                    color: G.color,
                    prevPointIndex: G.prevPointIndex,
                    prevSeriesIndex: G.prevSeriesIndex,
                    labelText: M,
                    graphic: t.ringpath(x, A, B, D, z, z, U).attr({
                        "stroke-width": G.borderWidth || n,
                        stroke: G.borderColor || q,
                        fill: ka(G.color),
                        "stroke-dasharray": G.dashStyle,
                        ishot: K,
                        cursor: K ? "pointer" : ""
                    }).shadow(r && !!G.shadow)
                }, G = {
                    link: G.link,
                    label: G.displayValue,
                    toolText: G.toolText
                }, C.graphic.mouseover(N, C), C.graphic.mouseout(Y, C), C.graphic.mouseup(a.plotMouseUp), C.graphic.data("plotItem", C), C.graphic.data("eventArgs", G), f && C.graphic.tooltip(l), void 0 !== M && (C.dataLabel = t.text(X).css(m).attr({
                    text: M,
                    fill: m.color || "#000000",
                    visibility: "hidden",
                    direction: v,
                    ishot: K,
                    cursor: K ? "pointer" : ""
                }).mouseover(R, C).mouseout(P, C).mouseup(a.plotMouseUp).data("plotItem", C).data("eventArgs", G), f && C.dataLabel.tooltip(l))), k ? L ? C.graphic.animateWith(L, H, {
                        ringpath: [x, A, B, D, S, V]
                    },
                    k, "easeIn", !J && aa) : (H = s.animObj = ha.animation({
                    ringpath: [x, A, B, D, S, V]
                }, k, "easeIn", !J && aa), L = s.mainItem = C.graphic.animate(H)) : (C.graphic.attr({
                    ringpath: [x, A, B, D, S, V]
                }), !J && aa && aa()))
            },
            plotMouseUp: function(b) {
                var d = this.data("plotItem");
                ya.call(this, d.chart, b)
            }
        }, t["renderer.piebase"]);
        ha.addSymbol({
            resizeIcon: function(b, d, a) {
                var c = g(a, 15) / 3,
                    e = [];
                0 > c && (c = -c, a = -a, b += a - c / 2, d += a - c / 2);
                for (a = 3; 0 < a; --a) e.push("M", b - c * a, d - 3, "L", b - 3, d - c * a);
                return e
            },
            closeIcon: function(b, d, a) {
                var c = 1.3 * a,
                    e = 43 * rc,
                    f = 48 * rc,
                    g = b + c *
                    ra(e),
                    e = d + c * ab(e),
                    h = b + c * ra(f),
                    s = d + c * ab(f),
                    f = .71 * (a - 2);
                a = .71 * (a - 2);
                c = ["A", c, c, 0, 1, 0, h, s];
                g = ["M", g, e];
                g = g.concat(c);
                return g = g.concat(["M", b + f, d - a, "L", b - f, d + a, "M", b - f, d - a, "L", b + f, d + a])
            },
            configureIcon: function(b, d, a) {
                --a;
                var c = .71 * a,
                    e = .71 * (a + 2),
                    f = b - a,
                    g = d - a,
                    h = b + a;
                a = d + a;
                var s = b + .5,
                    m = d + .5,
                    r = b - .5,
                    k = d - .5,
                    n = f - 2,
                    q = g - 2,
                    t = h + 2,
                    v = a + 2,
                    z = b + c,
                    y = d + c,
                    x = b - c,
                    c = d - c,
                    A = b + e,
                    B = d + e;
                b -= e;
                d -= e;
                return ["M", f, m, "L", n, m, n, k, f, k, x - .25, c + .25, b - .25, d + .25, b + .25, d - .25, x + .25, c - .25, r, g, r, q, s, q, s, g, z - .25, c - .25, A - .25, d - .25, A + .25, d + .25, z +
                    .25, c + .25, h, k, t, k, t, m, h, m, z + .25, y - .25, A + .25, B - .25, A - .25, B + .25, z - .25, y + .25, s, a, s, v, r, v, r, a, x + .25, y + .25, b + .25, B + .25, b - .25, B - .25, x - .25, y - .25, "Z"
                ]
            },
            axisIcon: function(b, d, a) {
                --a;
                var c = .33 * a,
                    e = a / 2,
                    f = b - a,
                    g = d - a,
                    h = b + e;
                a = d + a;
                b -= e;
                e = d + c;
                d -= c;
                return ["M", f, g, "L", h, g, h, a, f, a, "M", b, e, "L", h, e, "M", b, d, "L", h, d]
            },
            loggerIcon: function(b, d, a) {
                --a;
                b -= a;
                d -= a;
                var c = b + 2 * a,
                    e = b + 2,
                    f = c - 2,
                    g = d + 2;
                a = g + a;
                var h = a + 2;
                return ["M", b, d, "L", c, d, c, g, f, g, f, a, c, a, c, h, b, h, b, a, e, a, e, g, b, g, b, d]
            }
        })
    },
    [3, 2, 1, "release"]
]);