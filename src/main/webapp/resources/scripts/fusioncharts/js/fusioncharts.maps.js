/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.7.0
*/
FusionCharts.register("module", ["private", "modules.renderer.js-gradientlegend", function() {
    function U(b, d, l) {
        var m = b[0],
            n = b[1];
        b = b[2];
        m += (d[0] - m) * l;
        n += (d[1] - n) * l;
        d = b + (d[2] - b) * l;
        return {
            hex: (sa + (m << 16 | n << 8 | d).toString(16)).slice(-6),
            rgb: [m, n, d]
        }
    }

    function Z(b, d) {
        return b.maxvalue - d.maxvalue
    }

    function D(b) {
        var d, l, m = b.colorRange || {},
            n = b.dataMin,
            w = b.dataMax,
            s = b.sortLegend || !1,
            h = b.mapByCategory || !1,
            v = b.defaultColor,
            e = b.numberFormatter,
            c = m.color;
        b = this.colorArr = [];
        var g, f, a;
        this.mapByCategory = h;
        "1" === m.mapbypercent &&
            (this.mapbypercent = !0);
        if ("1" === m.gradient && !h) {
            this.gradient = !0;
            l = Ba(ba(m.startcolor, m.mincolor, m.code));
            s = ga(Ba(ba(l, v, "CCCCCC")));
            h = this.scaleMin = F(m.startvalue, m.minvalue, this.mapbypercent ? 0 : n);
            b.push({
                code: l,
                maxvalue: h,
                label: ca(m.startlabel),
                codeRGB: ga(l)
            });
            if (c && (d = c.length))
                for (n = 0; n < d; n += 1) v = c[n], l = Ba(ba(v.color, v.code)), f = F(v.value, v.maxvalue), a = F(v.minvalue), f > h && b.push({
                    code: l,
                    maxvalue: f,
                    userminvalue: a,
                    label: ca(ba(v.label, v.displayvalue)),
                    codeRGB: ga(l)
                });
            b.sort(Z);
            d = b.length;
            for (n = 1; n <
                d; n += 1) v = b[n], l = v.maxvalue - h, 0 < l ? (v.minvalue = h, v.range = l, h = v.maxvalue) : (b.splice(n, 1), --n, --d);
            2 <= b.length && (this.scaleMax = h, b[n - 1].label = ba(m.endlabel, b[n - 1].label, b[n - 1].displayvalue));
            1 === b.length && (f = F(m.maxvalue, this.mapbypercent ? 100 : w), b.push({
                minvalue: h,
                maxvalue: f,
                range: f - h,
                label: m.endlabel
            }), this.scaleMax = f, delete b[0].code);
            m = b[0];
            w = b[b.length - 1];
            m.code && w.code || (l = la(s), d = Ea((l[2] = 0, l)), l = Ea((l[2] = 100, l)), m.code || (m.codeRGB = d, m.code = ta(d)), w.code || (w.codeRGB = l, w.code = ta(l)));
            d = b.length;
            for (n = 1; n < d; n += 1)
                if (v = b[n], v.code) {
                    if (g)
                        for (w = v, a = m.maxvalue, c = w.maxvalue - a; g < n; g += 1) s = b[g], l = U(m.codeRGB, w.codeRGB, (s.maxvalue - a) / c), s.code = l.hex, s.codeRGB = l.rgb;
                    g = null;
                    m = v
                } else g = g || n;
            if (void 0 === this.scaleMin || void 0 === this.scaleMax) this.noValidRange = !0
        } else if (c && (d = c.length)) {
            for (n = 0; n < d; n += 1) v = c[n], l = ba(v.color, v.code), f = F(v.maxvalue), a = F(v.minvalue), g = ba(v.label, v.displayvalue, h ? W : e.dataLabels(a) + " - " + e.dataLabels(f)), (l && f > a || h && g) && b.push({
                code: l,
                maxvalue: f,
                minvalue: a,
                label: ca(g),
                labelId: g.toLowerCase()
            });
            b.length ? s && b.sort(Z) : this.noValidRange = !0
        }
    }

    function X(b, d) {
        return d ? G(100 * b) / 100 + "%" : P(b, W).toString()
    }
    var ha = this,
        b = ha.hcLib,
        ua = ha.window,
        ua = /msie/i.test(ua.navigator.userAgent) && !ua.opera,
        F = b.pluckNumber,
        sa = b.COLOR_BLACK,
        d = b.COLOR_GLASS,
        Ca = b.FC_CONFIG_STRING,
        ya = b.graphics,
        Ea = ya.HSBtoRGB,
        la = ya.RGBtoHSB,
        ta = ya.RGBtoHex,
        ga = ya.HEXtoRGB,
        pa = b.COMMASTRING,
        W = b.BLANKSTRING,
        ca = b.parseUnsafeString,
        va = b.graphics.convertColor,
        Fa = b.POSITION_TOP,
        ma = b.POSITION_MIDDLE,
        xa = b.POSITION_START,
        Ga = b.POSITION_END,
        wa = b.graphics.getDarkColor,
        qa = b.graphics.getLightColor,
        ba = b.pluck,
        P = b.getValidValue,
        ra = b.toRaphaelColor,
        za = b.hasTouch,
        G = Math.round,
        Q = Math.max,
        S = Math.min,
        Ha = Math.abs,
        Y, Ia, Aa, Ja = "rgba(192,192,192," + (ua ? .002 : 1E-6) + ")",
        Ba = function(b) {
            return b && b.replace(/^#?([a-f0-9]+)/ig, "$1")
        };
    D.prototype = {
        getColorObj: function(b) {
            var d = this.colorArr,
                l = this.gradient ? 1 : 0,
                m = d[l],
                n;
            if (this.mapByCategory) {
                for (b = ca(b).toLowerCase(); m;) {
                    if (m.labelId === b) return {
                        code: m.code,
                        seriesIndex: l
                    };
                    l += 1;
                    m = d[l]
                }
                return {
                    outOfRange: !0
                }
            }
            if (this.gradient) {
                if (this.scaleMin <=
                    b && this.scaleMax >= b) {
                    for (; m && m.maxvalue < b;) l += 1, m = d[l];
                    b = (b - m.minvalue) / m.range;
                    return {
                        code: U(d[l - 1].codeRGB, m.codeRGB, b).hex
                    }
                }
                return {
                    outOfRange: !0
                }
            }
            for (; m;) {
                if (m.maxvalue > b && m.minvalue <= b) return {
                    code: m.code,
                    seriesIndex: l
                };
                m.maxvalue === b && (n = l);
                l += 1;
                m = d[l]
            }
            return (m = d[n]) && m.maxvalue === b ? {
                code: m.code,
                seriesIndex: n
            } : {
                outOfRange: !0
            }
        }
    };
    D.prototype.constructor = D;
    b.colorRange = D;
    Y = b.configureGradientLegendOptions = function(b, d) {
        var l = b.legend,
            m = d.chart;
        l.legendSliderBorderWidth = F(m.legendpointerborderthickness,
            1);
        l.legendSliderBorderColor = va(ba(m.legendpointerbordercolor, sa), F(m.legendpointerborderalpha, 100));
        l.legendSliderWidth = F(m.legendpointerwidth, m.legendpointerswidth, 12);
        l.legendSliderHeight = F(m.legendpointerheight, m.legendpointersheight, 12);
        l.legendColorBoxBorderColor = l.borderColor;
        l.legendColorBoxBorderWidth = l.borderWidth;
        l.legendScaleColor = va(ba(m.legendscalelinecolor, sa), F(m.legendscalelinealpha, 100));
        l.legendScalePadding = F(m.legendscalepadding, 4);
        l.legendScaleLineThickness = F(m.legendscalelinethickness,
            1);
        l.legendScaleTickDistance = F(m.legendscaletickdistance, 6);
        l.itemStyle.cursor = "default";
        l.interActivity = F(m.interactivelegend, 1)
    };
    b.placeGLegendBlockRight = function(b, d, l, m, n) {
        this.configureLegendOptions(b, d.chart, !0, n, l);
        Y(b, d);
        n = this.snapLiterals || (this.snapLiterals = {});
        var w = b[Ca],
            s = this.smartLabel || w.smartLabel,
            h = b.legend,
            v = b.chart.spacingRight,
            e, c, g = h.textPadding = 2,
            f = 2 * g,
            a = h.title.padding,
            y = 0,
            da = 0,
            k = 2 * h.padding;
        d = F(d.chart.legendpadding, 7) + h.borderWidth / 2 + 1;
        var B = b.colorRange || {},
            u = B.colorArr,
            ia = B.mapbypercent,
            V = B.scaleMin,
            q = B.scaleMax - V,
            T = h.legendSliderWidth,
            M = h.legendSliderHeight / 2;
        c = h.legendScalePadding;
        var r = h.legendScaleTickDistance,
            t = h.itemStyle || {};
        e = F(parseInt(t.lineHeight, 10) || 12);
        var x = .75 * e,
            R = l - k,
            z, I, p = 0,
            E, A, C, K, O, H, J;
        m -= k;
        if (!B.noValidRange && u && 1 < (I = u.length)) {
            --I;
            h.title.text !== W && (s.setStyle(h.title.style), e = s.getSmartText(h.title.text, R, Q(e, m / 4)), h.title.text = e.text, y = e.width + k, m -= da = e.height + a);
            s.setStyle(t);
            e = s.lineHeight;
            R -= r + c + T;
            h.colorBoxX = T;
            a = Q(e, R / 2);
            R = S(R - a - 4, e);
            E = Q(e, m / 2);
            z = m / 4;
            r = u[0];
            r.scaleLabel = X(r.maxvalue, ia);
            e = s.getSmartText(r.label, z, R);
            r.label = e.text;
            t = e.height;
            r.labelY = x - e.height / 2;
            c = s.getSmartText(r.scaleLabel, a, E);
            r.scaleLabel = c.text;
            B = c.height / 2;
            A = c.width;
            r.scaleLabelY = x - c.height / 2;
            h.colorBoxY = Q(B, e.width + f, M) + da;
            r = J = u[I];
            r.scaleLabel = X(r.maxvalue, ia);
            e = s.getSmartText(r.label, z, R);
            r.label = e.text;
            t = Q(t, e.height);
            r.labelY = x - e.height / 2;
            c = s.getSmartText(r.scaleLabel, a, E);
            r.scaleLabel = c.text;
            A = Q(A, c.width);
            z = c.height / 2;
            e = Q(e.width + f, z, M);
            r.scaleLabelY =
                x - c.height / 2;
            h.colorBoxHeight = M = m - h.colorBoxY - e;
            E = M - z;
            C = M / q;
            O = S(M - p, E - B) - 4;
            for (z = 1; z < I; z += 1) r = u[z], K = (r.maxvalue - V) * C, e = s.getSmartText(r.label, 2 * S(K - p, M - K), R), r.label = e.text, t = Q(t, e.height), r.labelY = x - e.height / 2, e = e.width / 2, r.scaleLabel = X(r.maxvalue, ia), c = s.getSmartText(r.scaleLabel, a, 2 * S(K - B, E - K)), r.scaleLabel = c.text, A = Q(A, c.width), H = c.height / 2, r.scaleLabelY = x - c.height / 2, O = S(O, (K - Q(H + B, e + p) - 4) * q / r.range), p = e + K, B = H + K;
            O = Q(S(O, (S(E - B, M - p) - 4) * q / J.range, .3 * m), 0);
            h.colorBoxHeight -= O;
            h.colorBoxWidth = t &&
                t + f || 15;
            h.height = h.totalHeight = m + da + k - O;
            h.width = (A && A + g) + h.colorBoxWidth + T + h.legendScaleTickDistance + h.legendScalePadding + k;
            h.width < y && (h.colorBoxX += (y - h.width) / 2, h.width = y);
            h.width > l && (h.width = l);
            n.legendstartx = w.width - v - h.width;
            n.legendwidth = h.width;
            n.legendendx = n.legendstartx + n.legendwidth;
            n.legendheight = h.height;
            d += h.width;
            b.chart.marginRight += d;
            return d
        }
        h.enabled = !1;
        return 0
    };
    b.placeGLegendBlockBottom = function(b, d, l, m, n) {
        this.configureLegendOptions(b, d.chart, !1, n, l);
        Y(b, d);
        n = this.snapLiterals ||
            (this.snapLiterals = {});
        var w = b[Ca],
            s = this.smartLabel || w.smartLabel,
            h = b.legend,
            v = b.chart,
            e = v.spacingBottom,
            c = v.spacingLeft,
            v = v.spacingRight,
            g, f, a = h.textPadding = 2,
            y = h.title.padding,
            da = 0,
            k = 0,
            B = 2 * h.padding;
        d = F(d.chart.legendpadding, 7) + h.borderWidth / 2 + 1;
        var u = b.colorRange || {},
            ia = u.colorArr,
            V = u.mapbypercent,
            q = u.scaleMin,
            T = u.scaleMax - q,
            M = h.legendSliderWidth,
            r = h.legendSliderHeight,
            t = h.legendScalePadding,
            x = h.legendScaleTickDistance,
            R = h.itemStyle || {};
        g = F(parseInt(R.lineHeight, 10) || 12);
        var z = .75 * g,
            I = m - B,
            p, E,
            A, C, K = 0,
            O, H, J;
        l -= B;
        if (!u.noValidRange && ia && 1 < (E = ia.length)) {
            --E;
            h.title.text !== W && (s.setStyle(h.title.style), g = s.getSmartText(h.title.text, l, I / 3), h.title.text = g.text, da = g.width + B, I -= k = g.height + y);
            s.setStyle(R);
            g = s.lineHeight;
            I -= x + t + r;
            y = Q(g, I / 2);
            R = S(I - y - 4, g);
            p = l / 4;
            C = 2 * p;
            A = ia[0];
            A.scaleLabel = X(A.maxvalue, V);
            g = s.getSmartText(A.label, p, R);
            A.label = g.text;
            I = g.height;
            A.labelY = z - g.height / 2;
            f = s.getSmartText(A.scaleLabel, C, y);
            A.scaleLabel = f.text;
            t = f.width / 2;
            x = f.height;
            A.code || (A.code = ba(h.minColor, "CCCCCC"));
            h.colorBoxX = Q(t, g.width + a, M);
            A = u = ia[E];
            A.scaleLabel = X(A.maxvalue, V);
            g = s.getSmartText(A.label, p, R);
            A.label = g.text;
            I = Q(I, g.height);
            A.labelY = z - g.height / 2;
            f = s.getSmartText(A.scaleLabel, C, y);
            A.scaleLabel = f.text;
            x = Q(x, f.height);
            A = f.width / 2;
            g = Q(g.width + a, A, M);
            h.colorBoxWidth = M = l - h.colorBoxX - g;
            C = M - A;
            O = M / T;
            J = S(M - K, C - t) - 4;
            for (p = 1; p < E; p += 1) A = ia[p], H = (A.maxvalue - q) * O, g = s.getSmartText(A.label, 2 * S(H - K, M - H), R), A.label = g.text, I = Q(I, g.height), A.labelY = z - g.height / 2, g = g.width / 2, A.scaleLabel = X(A.maxvalue, V), f = s.getSmartText(A.scaleLabel,
                2 * S(H - t, C - H), y), A.scaleLabel = f.text, x = Q(x, f.height), f = f.width / 2, J = S(J, (H - Q(f + t, g + K) - 4) * T / A.range), K = g + H, t = f + H;
            J = Q(S(J, (S(C - t, M - K) - 4) * T / u.range, .3 * l), 0);
            h.colorBoxWidth -= J;
            h.width = l + B - J;
            h.width < da && (h.colorBoxX += (da - h.width) / 2, h.width = da);
            h.colorBoxY = k + r;
            h.colorBoxHeight = I && I + 2 * a || 15;
            h.height = h.totalHeight = (x && x + a) + h.colorBoxHeight + k + r + h.legendScaleTickDistance + h.legendScalePadding + B;
            h.height > m && (h.height = m);
            n.legendstartx = c + .5 * (w.width - c - v - h.width) + (h.x || 0);
            n.legendwidth = h.width;
            n.legendendx = n.legendstartx +
                n.legendwidth;
            n.legendstarty = w.height - e - h.height;
            n.legendheight = h.height;
            n.legendendy = n.legendstarty + n.legendheight;
            d += h.height;
            b.chart.marginBottom += d;
            return d
        }
        h.enabled = !1;
        return 0
    };
    Ia = function() {
        return {
            point: this
        }
    };
    Aa = function(b) {
        return G(100 * b) / 100
    };
    b.rendererRoot.drawGradientLegendItem = function(b) {
        var D = this,
            l = D.paper,
            m = D.options,
            n = D.canvasLeft,
            w = D.canvasTop,
            s = D.canvasWidth,
            h = D.canvasHeight,
            v = m.colorRange,
            e = m.chart.textDirection,
            c, g, f, a, y = m.legend,
            da = F(y.padding, 4),
            k = y.itemStyle,
            m = y.symbolStyle,
            B = y.interActivity,
            u = b.elements;
        b = u.elementGroup.trackTooltip(!0);
        var ia = "vertical" === y.layout,
            V, q, T, M, r, t, x = 0,
            R = y.lighting3d,
            z = y.colorBoxWidth,
            I = y.colorBoxHeight,
            p = z,
            E = I,
            A = {
                FCcolor: {
                    color: W,
                    alpha: W,
                    angle: 0,
                    ratio: W
                }
            },
            C = A.FCcolor,
            K = y.colorBoxX + da,
            O = y.colorBoxY + da,
            H, J, Ma = y.legendColorBoxBorderColor,
            Na = y.legendColorBoxBorderWidth,
            Da = ["M"],
            ea = y.legendScaleColor;
        t = y.legendScalePadding;
        var Y = y.legendScaleLineThickness,
            U = Y % 2 / 2;
        g = y.legendScaleTickDistance;
        var S = y.legendSliderWidth,
            X = y.legendSliderHeight;
        r =
            E / 2;
        a = p / 2;
        var P = S / 2,
            $ = X / 2,
            ca, aa, na;
        J = 0;
        var fa = qa("ABABAB", 50),
            da = wa("ABABAB", 70),
            y = va("ABABAB", 100),
            da = va(da, 100),
            fa = va(fa, 100),
            Z, N = {
                isFirst: !0
            },
            L = {},
            oa, ja, ka, ga;
        if (v && (c = v.colorArr) && 1 < (f = c.length)) {
            N.toolText = oa = T = v.scaleMin;
            L.toolText = ja = v = v.scaleMax;
            M = v - T;
            N.snapPX = L.snapPX = 0;
            N.tooltipConstraint = L.tooltipConstraint = "chart";
            N.getLabelConfig = L.getLabelConfig = Ia;
            N.tooltipPos = [0, 0];
            L.tooltipPos = [0, 0];
            L.tooltipOffsetReference = N.tooltipOffsetReference = {};
            L.tooltipOffsetReference.left = N.tooltipOffsetReference.left +=
                n - 20;
            L.tooltipOffsetReference.top = N.tooltipOffsetReference.top += w;
            ka = u.colorBox = l.group("colorBox", b);
            if (ia) {
                N.tooltipPos[0] = L.tooltipPos[0] = s + n;
                J = 270;
                C.angle = 90;
                n = K - S;
                s = K + p;
                w = O - $;
                V = O + $;
                n = G(K - S) + .5;
                s = G(K) + .5;
                w = G(O - $) + .5;
                V = G(O + $) + .5;
                ca = G(K + p) + .5;
                na = G(O - 2) + .5;
                q = G(O + 2) + .5;
                H = G(O) + .5;
                h = K - P / 2;
                aa = G(h - $) + .5;
                h = G(h) + .5;
                r = O - $ / 2;
                $ = G(r + $) + .5;
                r = G(r) + .5;
                z /= 2;
                P = ["M", n, w, "L", s, w, s, na, ca, H, s, q, s, V, n, V, "Z", "M", aa, r, "L", h, r, "M", aa, H, "L", h, H, "M", aa, $, "L", h, $];
                $ = ["M", n + 1, w, "L", n + 1, V, "M", aa, r - 1, "L", h, r - 1, "M", aa, H - 1, "L",
                    h, H - 1, "M", aa, $ - 1, "L", h, $ - 1
                ];
                r = K + p + t;
                V = G(r + g) + U;
                r = G(r) + U;
                H = K + a;
                aa = f - 1;
                for (g = 0; g < f; g += 1) a = c[g], s = (a.maxvalue - T) / M, q = E * s + O, t = G(q) + U, g ? (C.ratio += pa, C.color += pa, C.alpha += pa, Da.push("L", r, t, V, t, "M", r, t), g === aa ? (h = Ga, t = q + 2) : (h = ma, t = q)) : (Da.push(r, t, "L", V, t, "M", r, t), h = xa, t = q - 2), C.ratio += 100 * (s - x), C.color += ba(a.code, sa), C.alpha += ba(a.alpha, 100), x = s, a.legendItem = l.text(b).attr({
                    text: a.label,
                    x: H,
                    y: t,
                    "text-anchor": h,
                    direction: e,
                    "vertical-align": ma
                }).rotate(J, H, t).css(k), a.legendSymbol = l.text(b).attr({
                    text: a.scaleLabel,
                    x: V,
                    y: q,
                    "text-anchor": xa,
                    direction: e,
                    "vertical-align": ma
                }).css(k);
                N.xMin = L.xMin = 0;
                N.xMax = L.xMax = 0;
                N.yMin = L.yMin = 0;
                N.yMax = L.yMax = E;
                N.x = L.x = 0;
                N.y = 0;
                L.y = E;
                e = X + p;
                c = S
            } else {
                N.tooltipPos[1] = L.tooltipPos[1] = h + w;
                n = G(K - P) + .5;
                s = G(K + P) + .5;
                w = G(O - X) + .5;
                V = G(O + E) + .5;
                ca = G(K - 2) + .5;
                h = G(K + 2) + .5;
                aa = G(K) + .5;
                na = G(O) + .5;
                q = O - $ / 2;
                H = G(q - $) + .5;
                q = G(q) + .5;
                J = K - P / 2;
                a = G(J + P) + .5;
                J = G(J) + .5;
                I /= 2;
                P = ["M", n, w, "L", s, w, s, na, h, na, aa, V, ca, na, n, na, "Z", "M", J, H, "L", J, q, "M", aa, H, "L", aa, q, "M", a, H, "L", a, q];
                $ = ["M", n, w + 1, "L", s, w + 1, "M", J - 1, H, "L", J -
                    1, q, "M", aa - 1, H, "L", aa - 1, q, "M", a - 1, H, "L", a - 1, q
                ];
                t = O + E + t;
                J = G(t + g) + U;
                t = G(t) + U;
                q = O + r;
                aa = f - 1;
                for (g = 0; g < f; g += 1) a = c[g], s = (a.maxvalue - T) / M, V = p * s + K, r = G(V) + U, g ? (C.ratio += pa, C.color += pa, C.alpha += pa, Da.push("L", r, t, r, J, "M", r, t), g === aa ? (h = xa, r = V + 2) : (h = ma, r = V)) : (Da.push(r, t, "L", r, J, "M", r, t), h = Ga, r = V - 2), C.ratio += 100 * (s - x), C.color += ba(a.code, sa), C.alpha += ba(a.alpha, 100), x = s, a.legendItem = l.text(b).attr({
                    text: a.label,
                    x: r,
                    y: q,
                    "text-anchor": h,
                    direction: e,
                    "vertical-align": ma
                }).css(k), a.legendSymbol = l.text(b).attr({
                    text: a.scaleLabel,
                    x: V,
                    y: J,
                    "text-anchor": ma,
                    direction: e,
                    "vertical-align": Fa
                }).css(k);
                N.xMin = L.xMin = 0;
                N.xMax = L.xMax = p;
                N.yMin = L.yMin = 0;
                N.yMax = L.yMax = 0;
                N.y = L.y = 0;
                N.x = 0;
                L.x = p;
                e = S;
                c = X + E
            }
            u.colorBox = l.rect(ka).attr({
                x: K,
                y: O,
                width: p,
                height: E,
                fill: ra(A),
                stroke: Ma,
                strokeWidth: Na
            });
            R && (u.colorBoxEffect = l.rect(ka).attr({
                x: K,
                y: O,
                width: z,
                height: I,
                fill: d,
                "stroke-width": 0
            }));
            u.scale = l.path(b).attr({
                path: Da,
                stroke: ea,
                "stroke-width": Y
            });
            Z = function(a, e, c, b, g) {
                var f;
                ia ? (f = e * M / E + T, b = 0 < e ? b : b + e + .01) : (f = a * M / p + T, c = 0 < a ? c : c + a + .01);
                a = Aa(f);
                g ?
                    (u.slider1.translate(c, b), u.slider1Effect.translate(c, b), u.slider1Tracker.toFront().translate(c, b).tooltip(a, null, null, !0), oa = f) : (u.slider2.translate(c, b), u.slider2Effect.translate(c, b), u.slider2Tracker.toFront().translate(c, b).tooltip(a, null, null, !0), ja = f);
                B && (ga = clearTimeout(ga), ga = setTimeout(function() {
                    D.setScaleRange && D.setScaleRange(oa, ja)
                }, 100))
            };
            f = function(a, e) {
                var c = 0,
                    b = c,
                    g, f = this.isFirst,
                    d = f ? L : N;
                if (ia) {
                    b = this._startY + e;
                    0 >= b && (b = 0);
                    b > E && (b = E);
                    if (f ? b > d.y : b < d.y) b = d.y;
                    Ha(b - this.y) >= (this.snapPX ||
                        0) && (g = !0)
                } else {
                    c = this._startX + a;
                    0 >= c && (c = 0);
                    c > p && (c = p);
                    if (f ? c > d.x : c < d.x) c = d.x;
                    Ha(c - this.x) >= (this.snapPX || 0) && (g = !0)
                }
                g && (Z(c, b, c - this.x, b - this.y, f), this.x = c, this.y = b)
            };
            R = function() {
                var a = this.isFirst;
                this._startX = this.x;
                this._startY = this.y;
                this._scaleStart = oa;
                this._scaleEnd = ja;
                ha.raiseEvent("LegendPointerDragStart", {
                    pointerIndex: a ? 0 : 1,
                    pointers: [{
                        value: oa
                    }, {
                        value: ja
                    }],
                    legendPointerHeight: X,
                    legendPointerWidth: S
                }, D.logic.chartInstance)
            };
            z = function() {
                var a = this._scaleStart,
                    c = this._scaleEnd;
                ha.raiseEvent("LegendPointerDragStop", {
                    pointerIndex: this.isFirst ? 0 : 1,
                    pointers: [{
                        value: oa
                    }, {
                        value: ja
                    }],
                    legendPointerHeight: X,
                    legendPointerWidth: S
                }, D.logic.chartInstance);
                a === oa && c === ja || ha.raiseEvent("LegendRangeUpdated", {
                    previousMinValue: a,
                    previousMaxValue: c,
                    minValue: oa,
                    maxValue: ja
                }, D.logic.chartInstance);
                delete this._scaleStart;
                delete this._scaleEnd
            };
            I = Aa(T);
            u.slider1 = l.path(b).attr({
                path: P,
                fill: y,
                strokeWidth: 1,
                stroke: da
            });
            u.slider1Effect = l.path(b).attr({
                path: $,
                fill: "none",
                strokeWidth: 1,
                stroke: fa
            });
            za && (n -= .5 * (Q(30, e) - e), w -= .5 * (Q(40,
                c) - c), e = Q(30, e), c = Q(40, c));
            u.slider1Tracker = l.rect(b).attr({
                ishot: !0,
                width: e,
                height: c,
                x: n,
                y: w,
                fill: Ja,
                stroke: "none"
            }).drag(f, R, z, N, N, N).tooltip(I, null, null, !0).css(m);
            I = Aa(v);
            u.slider2 = l.path(b).attr({
                path: P,
                fill: y,
                strokeWidth: 1,
                stroke: da
            }).translate(L.x, L.y);
            u.slider2Effect = l.path(b).attr({
                path: $,
                fill: "none",
                strokeWidth: 1,
                stroke: fa
            }).translate(L.x, L.y);
            u.slider2Tracker = l.rect(b).attr({
                ishot: !0,
                width: e,
                height: c,
                x: n,
                y: w,
                fill: Ja,
                stroke: "none"
            }).translate(L.x, L.y).css(m).drag(f, R, z, L, L, L).tooltip(I,
                null, null, !0)
        }
    }
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-maps", function() {
        var U = this,
            Z = U.window,
            D = U.hcLib,
            X = D.chartAPI,
            ha = Z.document,
            b = D.pluck,
            ua = D.imprint,
            F = D.extend2,
            sa = D.parseTooltext,
            d = D.pluckNumber,
            Ca = D.pluckFontSize,
            ya = D.HCstub,
            Ea = F(D.defaultPaletteOptions, {
                foregroundcolor: "333333",
                foregroundalpha: "100",
                foregrounddarkcolor: "111111",
                foregrounddarkalpha: "100",
                foregroundlightcolor: "666666",
                foregroundlightalpha: "100",
                backgroundlightcolor: "FFFFFF",
                backgroundlightalpha: "100",
                backgroundlightangle: 90,
                backgroundlightratio: "",
                backgroundcolor: "FFFFCC",
                backgroundalpha: "100",
                backgrounddarkcolor: "ffcc66",
                backgrounddarkalpha: "100",
                backgrounddarkangle: 270,
                backgrounddarkratio: "",
                shadow: 1
            }),
            la = D.setLineHeight,
            ta = D.getValidValue,
            ga = D.parseUnsafeString,
            pa = D.getFirstColor,
            W = D.graphics.convertColor,
            ca = D.hashify,
            va = D.getDashStyle,
            Fa = Z.navigator.userAgent,
            ma = /msie/i.test(Fa) && !Z.opera,
            xa = /AppleWebKit/.test(Fa),
            Ga = /stroke/ig,
            wa = D.hasSVG,
            qa = D.FC_CONFIG_STRING,
            ba = Z.Math,
            P = ba.min,
            ra = ba.max,
            za = ba.ceil,
            G = D.toRaphaelColor,
            Q = {
                left: "start",
                right: "end",
                center: "middle"
            },
            S = function(e, c) {
                var b;
                e || (e = {});
                for (b in c) e[b] = c[b];
                return e
            },
            Ha = function(e) {
                var c = this.parentNode;
                if (!c) return !1;
                for (; c && c !== ha.documentElement;) {
                    if (c === e) return !0;
                    c = c.parentNode
                }
                return !1
            },
            Y = function(e, c) {
                var b = c ? S(e.FCcolor, c) : {
                    FCcolor: e
                };
                b.toString = G;
                return b
            },
            Ia = function(e, c) {
                var b, f;
                this.index = c;
                for (f in e) b = Ea[e[f]], this[f] = b instanceof Array ? b[c] : b
            },
            Aa = {
                right: function(e, c) {
                    return c
                },
                left: function(e, c) {
                    return e - c
                },
                center: function(e, c) {
                    return 2 * P(c,
                        e - c)
                }
            },
            Ja = {
                top: function(e, c) {
                    return c
                },
                middle: function(e, c) {
                    return 2 * P(c, e - c)
                },
                bottom: function(e, c) {
                    return e - c
                }
            },
            Ba = function(e, c, b, f) {
                c = P(e, c);
                e = .02 * c;
                c *= .07;
                f = parseFloat(f);
                b = parseFloat(b);
                return isNaN(f) || isNaN(b) ? isNaN(f) ? isNaN(b) ? {
                    min: e,
                    max: c
                } : {
                    min: parseInt(b / 10, 10),
                    max: b
                } : {
                    min: f,
                    max: 10 * f
                } : f < b ? {
                    min: f,
                    max: b
                } : {
                    min: b,
                    max: f
                }
            },
            La = function(e) {
                for (var c = e && e.length || 0, b = {}, f; c--;) f = e[c], void 0 !== f.id && (b[f.id.toLowerCase()] = f);
                return b
            },
            Ka = function(e, c) {
                var b, f = {};
                c = c || 1;
                if (!e || "object" !== typeof e) return f;
                for (b in e) Ga.test(b) || ("stroke-width" === b ? (f[b] = Number(e[b]) / c, xa && (f[b] = f[b] && za(f[b]) || 0)) : f[b] = e[b]);
                return f
            },
            l = function() {
                this.hoverEntity && (D.raiseEvent.apply(D, this.hoverEntityEventArgs), delete this.hoverEntityEventArgs, this.hoverEntity && this.hoverEntityAttr && this.hoverEntity.attr(this.hoverEntityAttr), delete this.hoverEntityAttr, this.hoverEntity = null)
            },
            m = function(e, c) {
                var b = e && e.length || !1,
                    f = c || "id",
                    a = {},
                    d;
                if (!e) return e;
                for (; b--;) d = e[b], void 0 !== d[f] && (a[d[f].toLowerCase()] = d);
                return a
            },
            n = function(e, c, b, f) {
                function a() {
                    var a = this,
                        c = a.entityPathMap,
                        e = a.data,
                        b = a.items,
                        g, e = La(e);
                    t = function() {
                        for (var f, k = c[g]; k;) b[g] ? a = null : ((f = e[g]) ? f.mapItem = b[g] = new w(g, ua(d(f), k), q, a.group) : b[g] = new w(g, k, q, a.group), g = k.nextId && k.nextId.toLowerCase(), k = void 0 !== g && c[g] || null);
                        B.call(a)
                    };
                    x = function() {
                        var g, f, k = r,
                            t, h = 0;
                        for (t in n)
                            if (!b[t] && (g = c[t], (f = e[t]) ? f.mapItem = b[t] = new w(t, ua(d(f), g), q, a.group) : b[t] = new w(t, g, q, a.group), h += 1, delete n[t], h === k)) break;
                        h < m ? (m -= h, setTimeout(x, 0)) : B.call(a)
                    };
                    (g = u &&
                        u.toLowerCase()) ? t(): x()
                }

                function d(a) {
                    delete a.outlines;
                    delete a.label;
                    delete a.shortlabel;
                    delete a.labelposition;
                    delete a.labelalignment;
                    delete a.labelconnectors;
                    return a
                }

                function h() {
                    var a = this.items,
                        c = [],
                        e, b = {
                            id: "entityLabels",
                            items: c
                        };
                    for (e in a) a[e].drawLabel(c);
                    T.addGroup(b)
                }

                function k() {
                    var a = this.items,
                        c;
                    for (c in a) a[c].destroy();
                    delete this.entityPathMap;
                    delete this.data;
                    delete this.chartObj;
                    delete this.items;
                    delete this.group
                }

                function B() {
                    M.entities.labelsOnTop && h.call(this);
                    this.ready = !0;
                    q.checkComplete()
                }
                if (b && b.getEntityPaths()) {
                    var u = b.getFirstId(),
                        m = b.entityCount,
                        n = b.getEntityPaths(!0),
                        q = c,
                        T = c.mapAnnotations,
                        M = q.options,
                        r = wa ? 100 : 50,
                        t, x, R;
                    this.entityPathMap = n;
                    this.data = e;
                    this.chartObj = q;
                    this.items = {};
                    this.ready = !1;
                    this.group = f || c.mapGroup;
                    this.isReady = function() {
                        return this.ready
                    };
                    a.call(this);
                    this.drawLabels = h;
                    this.destroy = k;
                    this.init = a;
                    this.initComplete = B;
                    q.__canvasMouseOutListenerAdded || (q.__canvasMouseOutListenerAdded = !0, R = c.paper.canvas, D.addEvent(R, "mouseout", function(a) {
                        a =
                            a.originalEvent.relatedTarget || a.originalEvent.toElement;
                        !ma || wa ? a && a.ownerSVGElement && a.ownerSVGElement === R || l.call(q) : a === ha.documentElement || a === c.container || a === c.container.parentElement ? l.call(q) : Ha.call(a, R) || l.call(q)
                    }))
                }
            },
            w = function(e, c, g, f) {
                function a(a) {
                    var c = this.featureConfig;
                    return c && "undefined" !== typeof c[a] ? Boolean(c[a]) : !1
                }

                function y() {
                    var e;
                    if (a.apply(this, ["_ds"])) {
                        e = c.labels && c.labels[0];
                        if (!e) return;
                        e = (p.useSNameInTooltip ? e.shortText : e.text) + (isNaN(A) ? "" : p.tooltipSepChar + C)
                    } else e =
                        (p.useSNameInTooltip ? c.shortLabel : c.label) + (isNaN(A) ? "" : p.tooltipSepChar + C);
                    return e
                }

                function h(a, e, g) {
                    e ? g && "undefined" !== typeof c.displayvalue ? a = c.displayvalue : (a = b(p.includeNameInLabels ? p.useShortName ? a.shortText : a.text : ""), p.includeValueInLabels && !isNaN(A) && (a = void 0 === a ? C : a + K + C)) : a = a.text;
                    return a
                }

                function k(a) {
                    for (var c = a && a.length || 0, e; c--;) e = a[c], this.connectorElem[c] = I.path(e, this.group).attr({
                        transform: ka.transform,
                        stroke: W(Q, S),
                        "shape-rendering": "crisp",
                        "stroke-width": P
                    })
                }

                function B() {
                    var a =
                        this.chart.paper,
                        c = wa || !ma ? "litepath" : "path",
                        e = this.eJSON.outlines,
                        b = this.group,
                        f, d, y;
                    f = e && e.length || 0;
                    if (this.hasFeature("_ds")) {
                        if (this.hasFeature("isDataEnabled"))
                            if (L)
                                for (; f--;) d = e[f].outline, this.svgElems[f] = {}, this.svgElems[f].graphic = a[c](d, b).attr(ka).tooltip(H).shadow(ha, g.shadowLayer);
                            else
                                for (; f--;) d = e[f].outline, this.svgElems[f] = {}, this.svgElems[f].graphic = a[c](d, b).tooltip(H).attr(ka);
                        else if (L)
                            for (; f--;) y = F(F({}, ka), Ka(e[f].style, ja)), d = e[f].outline, this.svgElems[f] = {}, this.svgElems[f].graphic =
                                a[c](d, b).attr(y).tooltip(H).shadow(ha, g.shadowLayer);
                        else
                            for (; f--;) y = F(F({}, ka), Ka(e[f].style, ja)), d = e[f].outline, this.svgElems[f] = {}, this.svgElems[f].graphic = a[c](d, b).tooltip(H).attr(y);
                        this.hasFeature("isDataEnabled") && this.addMouseGestures()
                    } else {
                        if (L)
                            for (; f--;) d = e[f], this.svgElems[f] = {}, this.svgElems[f].graphic = a[c](d, b).attr(ka).tooltip(H).shadow(ha, g.shadowLayer);
                        else
                            for (; f--;) d = e[f], this.svgElems[f] = {}, this.svgElems[f].graphic = a[c](d, b).tooltip(H).attr(ka);
                        this.addMouseGestures()
                    }
                    return this
                }

                function u(a) {
                    var e = this.chart;
                    e.hoverEntityEventArgs = ["entityrollout", this.eventArgs, e.fusionCharts, [e.fusionCharts.id, "rollOut", this.legacyEventArgs], a];
                    na && this.isVisible && (e.hoverEntity = this, e.hoverEntityAttr = this.revertAttr, this.attr(this.hoverAttr));
                    D.raiseEvent("entityrollover", this.eventArgs, e.fusionCharts, [e.fusionCharts.id, "rollOver", this.legacyEventArgs], a)
                }

                function m(a, e, c) {
                    var b = this,
                        f = b.chart,
                        d = a.labelPosition,
                        y = a.labelAlignment,
                        t = b.svgElems[0] && b.svgElems[0].graphic,
                        k = a.style,
                        p, x, z,
                        q, r;
                    d ? (t = d[0], d = d[1]) : (d = t.getBBox(), t = d.x + d.width / 2, d = d.y + d.height / 2);
                    y ? (p = y[0], y = y[1], "right" === p ? t -= Z : "left" === p && (t += Z), "top" === y ? d -= Z : "bottom" === y && (d += Z)) : (p = "center", y = "middle");
                    x = $;
                    z = parseFloat(ca) / g.sFactor;
                    q = X;
                    r = la;
                    !e && k && (k.color && (x = k.color), k["font-size"] && (z = parseFloat(k["font-size"]) / g.sFactor), k["font-family"] && (q = k["font-family"]), void 0 !== k["font-weight"] && (r = "bold" === k["font-weight"]));
                    return {
                        x: t.toString(),
                        y: d.toString(),
                        wrapwidth: Aa[p](pa, t + ua) - Z,
                        wrapheight: Ja[y](ta, d + va) - Z,
                        wrap: 1,
                        type: "text",
                        align: p,
                        valign: y,
                        text: h(a, e, c),
                        tooltext: H,
                        link: N,
                        bgcolor: "",
                        bordercolor: "",
                        fillcolor: x,
                        fontsize: z,
                        font: q,
                        bold: r,
                        onclick: function(a) {
                            U.raiseEvent("entityclick", b.eventArgs, g.fusionCharts, a)
                        },
                        onmouseover: function(a) {
                            b !== f.hoverEntity && (l.call(b.chart), u.call(b, a))
                        },
                        ontouchstart: function(a) {
                            b !== f.hoverEntity && (l.call(b.chart), u.call(b, a))
                        }
                    }
                }

                function n(a) {
                    var e = this.eJSON,
                        c = this.hasFeature("isDataEnabled"),
                        b, f;
                    if (!G) return null;
                    if (this.hasFeature("_ds"))
                        for (f = (e = e.labels) && e.length || 0; f--;) b =
                            e[f], a.push(this.getLabelObject(b, c, !f)), b.labelConnectors && this.drawLabelConnectors(b.labelConnectors);
                    else b = {
                        text: e.label,
                        shortText: e.shortLabel,
                        labelAlignment: e.labelAlignment,
                        labelPosition: e.labelPosition
                    }, a.push(this.getLabelObject(b, !0, !0)), e.labelConnectors && this.drawLabelConnectors(e.labelConnectors)
                }

                function q(a, e) {
                    var c = this.svgElems,
                        b;
                    for (b in c) c[b].graphic && c[b].graphic.attr(a, e)
                }

                function T() {
                    var a = this.svgElems,
                        e;
                    this.isVisible = !0;
                    for (e in a) a[e].graphic && a[e].graphic.attr(ka)
                }

                function M() {
                    var a =
                        this.svgElems,
                        e = this.chart,
                        c;
                    this.isVisible = !1;
                    e.hoverEntity === this && l.call(e);
                    for (c in a) a[c].graphic && a[c].graphic.attr(oa)
                }

                function r(a) {
                    U.raiseEvent("entityclick", this.node.__entity.eventArgs, g.fusionCharts, a);
                    void 0 !== N && g.logic.linkClickFN.call({
                        link: N
                    })
                }

                function t(a) {
                    var e = this.node.__entity,
                        c = e.chart;
                    e !== c.hoverEntity && (l.call(c), u.call(e, a))
                }

                function x() {
                    var a = this.eJSON,
                        e = this.svgElems,
                        c;
                    this.eventArgs = {
                        value: this.value,
                        label: a.label,
                        shortLabel: a.shortLabel,
                        originalId: this.originalId || this.id,
                        id: this.id
                    };
                    this.legacyEventArgs = {
                        value: this.value,
                        lName: a.label,
                        sName: a.shortLabel,
                        id: this.originalId || this.id
                    };
                    na && (this.hoverAttr = {
                        fill: this.hoverColor.toString()
                    }, this.revertAttr = {
                        fill: this.fillColor.toString()
                    }, fa !== ea && (this.hoverAttr["stroke-width"] = fa, this.revertAttr["stroke-width"] = ea));
                    if (!isNaN(A) || aa)
                        for (c in e) void 0 !== N && e[c].graphic.css({
                            cursor: "pointer",
                            _cursor: "hand"
                        }), e[c].graphic.node.__entity = this, e[c].graphic.click(r).hover(t)
                }

                function R() {
                    var a = this.svgElems,
                        e = this.connectorElem,
                        c;
                    for (c in a) a[c].remove && a[c].remove();
                    for (c in e) e[c].destroy && e[c].destroy();
                    delete this.value;
                    delete this.formattedValue;
                    delete this.toolText;
                    delete this.fillColor;
                    delete this.hoverColor;
                    delete this.chart;
                    delete this.group;
                    delete this.id;
                    delete this.isVisible;
                    delete this.svgElems;
                    delete this.connectorElem;
                    delete this.renderer;
                    delete this.options
                }
                if (c && g && void 0 !== e) {
                    this.chart = g;
                    this.eJSON = c;
                    this.group = f;
                    this.id = e;
                    this.originalId = c.origId;
                    this.isVisible = !0;
                    this.svgElems = {};
                    this.connectorElem = {};
                    this.featureConfig = c.options;
                    "object" === typeof this.featureConfig && (this.featureConfig._ds = !0);
                    var z = g.options,
                        I = g.paper,
                        p = z.entities,
                        E = p.dataLabels.style;
                    e = c.cleanValue;
                    var A = null === e ? void 0 : e,
                        C = this.formattedValue = c.formattedValue || "",
                        K = p.labelSepChar,
                        s = d(c.showtooltip, p.showTooltip);
                    e = y.call(this);
                    f = {
                        formattedValue: C,
                        sName: c.shortLabel,
                        lName: c.label
                    };
                    var H = s ? ga(b(sa(b(c.tooltext, p.tooltext, e), [1, 2, 7, 38, 39], f, c))) : "",
                        J, v, w, G = d(c.showlabel, p.showLabels);
                    f = b(c.bordercolor, p.borderColor);
                    e = b(c.borderalpha,
                        p.borderAlpha);
                    var s = 1 === p.scaleBorder,
                        ea = d(c.borderthickness, p.borderThickness),
                        Q = b(c.labelconnectorcolor, p.connectorColor),
                        S = b(c.labelconnectoralpha, p.connectorAlpha),
                        P = d(c.labelconnectorthickness, p.connectorThickness),
                        X = b(c.font, E.fontFamily),
                        ca = d(parseInt(c.fontsize, 10), parseInt(E.fontSize, 10)),
                        $ = b(c.fontcolor, E.color),
                        Z = d(c.labelpadding, p.labelPadding),
                        aa = p.hoverOnNull,
                        na = d(c.showhovereffect, c.usehovercolor, aa ? p.showHoverEffect : isNaN(A) ? 0 : p.showHoverEffect),
                        fa = d(c.borderhoverthickness, c.hoverborderthickness,
                            p.hoverBorderThickness),
                        la = d(c.fontbold, 0),
                        N = c.link,
                        L = p.shadow;
                    w = !ma || wa;
                    E = g.sFactor / p.baseScaleFactor;
                    J = g.strokeWidth;
                    v = (w ? p.baseScaleFactor : 1) * J;
                    var oa = p.hiddenEntityFillObject || (p.hiddenEntityFillObject = {
                            fill: Y({
                                color: p.hiddenEntityColor,
                                alpha: p.hiddenEntityAlpha
                            }).toString()
                        }),
                        ja, ka, ha, z = z[qa],
                        pa = z._labelBaseWidth,
                        ta = z._labelBaseHeight,
                        ua = z._labelXOffset,
                        va = z._labelYOffset;
                    w ? (ea = s ? ea * v : ea / E, P /= E, ja = s ? E : g.sFactor, xa && (ea = ea && za(ea) || 0, P = P && za(P) || 0)) : (ea = s ? ea * J : ea, ja = s ? g.scaleFactor : p.baseScaleFactor);
                    p.showHiddenEntityBorder || (oa["stroke-width"] = 0);
                    void 0 === fa ? fa = ea : w ? (fa = s ? ea * v : fa / E, xa && (fa = fa && za(fa) || 0)) : fa = s ? fa * J : fa;
                    !p.showNullEntityBorder && isNaN(A) && (ea = 0);
                    void 0 !== b(c.color, c.alpha, c.angle, c.ratio) ? (s = b(c.color, p.fillColor), z = b(c.alpha, p.fillAlpha), J = b(c.angle, p.fillAngle), v = b(c.ratio, p.fillRatio), w = Y({
                        color: s,
                        alpha: z,
                        angle: J,
                        ratio: v
                    })) : (p.fillColorObject || (p.fillColorObject = Y({
                        color: b(p.fillColor),
                        alpha: b(p.fillAlpha),
                        angle: b(p.fillAngle),
                        ratio: b(p.fillRatio)
                    })), p.emptyColorObject || (p.emptyColorObject =
                        Y({
                            color: b(p.nullEntityColor),
                            alpha: b(p.nullEntityAlpha),
                            angle: b(p.nullEntityAngle),
                            ratio: b(p.nullEntityRatio)
                        })), w = isNaN(A) ? p.emptyColorObject : p.fillColorObject, s = w.FCcolor.color, z = w.FCcolor.alpha, J = w.FCcolor.angle, v = w.FCcolor.ratio);
                    "" === H && (s = 0);
                    ka = {
                        transform: wa || !ma ? "" : g.transformStr,
                        stroke: W(f, e),
                        "stroke-width": ea,
                        fill: (this.fillColor = w).toString()
                    };
                    f = z.split(",");
                    ea && f.push(e);
                    ha = {
                        scalefactor: [E, g.sFactor],
                        opacity: ra.apply(ba, f) / 100
                    };
                    na && (void 0 !== b(c.fillhovercolor, c.fillhoveralpha, c.fillhoverangle,
                            c.fillhoverratio, c.hoverfillcolor, c.hoverfillalpha, c.hoverfillratio, c.hoverfillangle) ? (s = b(c.fillhovercolor, c.hoverfillcolor, p.hoverFillColor), z = b(c.fillhoveralpha, c.hoverfillalpha, p.hoverFillAlpha), J = b(c.fillhoverangle, c.hoverfillangle, p.hoverFillAngle), v = b(c.fillhoverratio, c.hoverfillratio, p.hoverFillRatio), e = Y({
                            color: s,
                            alpha: z,
                            angle: J,
                            ratio: v
                        })) : (p.hoverColorObject || (p.hoverColorObject = Y({
                            color: p.hoverFillColor,
                            alpha: p.hoverFillAlpha,
                            angle: p.hoverFillAngle,
                            ratio: p.hoverFillRatio
                        })), e = p.hoverColorObject),
                        this.hoverColor = e);
                    this.value = A;
                    this.addMouseGestures = x;
                    this.attr = q;
                    this.draw = B;
                    this.drawLabel = n;
                    this.getLabelObject = m;
                    this.destroy = R;
                    this.show = T;
                    this.hide = M;
                    this.hasFeature = a;
                    this.drawLabelConnectors = k;
                    B.call(this);
                    p.hideNullEntities && void 0 === A && this.hide()
                }
            },
            s = function(e, c, b, f) {
                this.id = e;
                this.definition = c;
                this.application = b;
                this.rapi = f;
                this.markerLabel = this.markerShape = this.label = this.options = this.value = this.hasValue = null;
                this.drawOptions = {
                    shape: null,
                    label: null
                };
                this.drawComplete = !1;
                if (e = f.options) this._conf =
                    e[qa];
                this.init()
            },
            h = function(e, c, b, f) {
                this.options = e;
                this.from = c;
                this.to = b;
                this.api = f;
                if (e = f.options) this._conf = e[qa]
            },
            v = function(e, c) {
                function g() {
                    var e = u.definition,
                        b = m(e) || {},
                        f = m(u.application) || {},
                        g = u.shapes,
                        k, p;
                    if (e && e.length) {
                        if (g && g.length)
                            for (e = g.length; e; --e)
                                if (k = g[e - 1], p = k.id.toLowerCase()) a[p] = k;
                        for (p in b) {
                            k = b[p];
                            g = new s(p, k, f[p], c);
                            if (e = g.getShapeId()) g.shapeObj = a[e];
                            d[p] = g
                        }
                    }
                }

                function f() {
                    var e = u.items,
                        b = u.shapes,
                        f, g, k, p;
                    if (e && e.length) {
                        if (b && b.length)
                            for (f = b.length; f; --f)
                                if (g = b[f - 1],
                                    p = g.id.toLowerCase()) a[p] = g;
                        for (f = e.length; f--;)
                            if (g = e[f], p = g.id && g.id.toLowerCase()) void 0 !== g.value && "" !== g.value && parseFloat(g.value), g.mapItem = b = new s(p, g, null, c), k = b.getShapeId(), g.__hideMarker && (b._isHidden = !0), k && (b.shapeObj = a[k]), d[p] = b
                    }
                }
                var a = {},
                    d = {},
                    da = [],
                    k = c.options.markers,
                    B = c.options.connectors,
                    u = e,
                    l = c.mapAnnotations,
                    n, q, T, M, r = [];
                this.items = d;
                (function() {
                    var a = s.prototype,
                        e = h.prototype,
                        f;
                    f = Boolean(b(k.hoverFillColor, k.hoverFillAlpha, k.hoverFillAngle, k.hoverFillRatio, k.hoverBorderThickness,
                        k.hoverBorderColor, k.hoverBorderAlpha));
                    a.markerFont = k.dataLabels.style.fontFamily;
                    a.markerFontSize = k.dataLabels.style.fontSize;
                    a.markerFontColor = k.dataLabels.style.fontColor;
                    a.showMarkerTooltip = k.showTooltip;
                    a.showHoverEffect = f;
                    a.tooltext = k.tooltext;
                    a.showMarkerLabels = k.showLabels;
                    a.markerLabelPadding = k.labelPadding;
                    a.labelWrapWidth = k.labelWrapWidth;
                    a.labelWrapHeight = k.labelWrapHeight;
                    a.labelSepChar = k.labelSepChar;
                    a.tooltipSepChar = k.tooltipSepChar;
                    a.fillColor = k.fillColor;
                    a.fillAlpha = k.fillAlpha;
                    a.fillRatio = k.fillRatio;
                    a.fillAngle = k.fillAngle;
                    a.hoverFillColor = k.hoverFillColor;
                    a.hoverFillAlpha = k.hoverFillAlpha;
                    a.hoverFillRatio = k.hoverFillRatio;
                    a.hoverFillAngle = k.hoverFillAngle;
                    a.startAngle = k.startAngle;
                    a.shapeId = k.shapeId;
                    a.borderThickness = k.borderThickness;
                    a.borderColor = k.borderColor;
                    a.borderAlpha = k.borderAlpha;
                    a.hoverBorderThickness = k.hoverBorderThickness;
                    a.hoverBorderColor = k.hoverBorderColor;
                    a.hoverBorderAlpha = k.hoverBorderAlpha;
                    a.markerRadius = k.radius;
                    a.autoScale = k.autoScale ? c.sFactor :
                        1;
                    a.shadow = k.shadow;
                    a.applyAll = k.applyAll;
                    a.dataEnabled = k.dataEnabled;
                    a.valueToRadius = k.valueToRadius;
                    a = Boolean(b(B.hoverthickness, B.hovercolor, B.hoveralpha));
                    e.showHoverEffect = a;
                    e.showTooltip = B.showTooltip;
                    e.tooltext = B.tooltext;
                    e.thickness = B.thickness;
                    e.color = B.color;
                    e.alpha = B.alpha;
                    e.hoverThickness = B.hoverthickness;
                    e.hoverColor = B.hovercolor;
                    e.hoverAlpha = B.hoveralpha;
                    e.dashed = B.dashed;
                    e.dashlen = B.dashLen;
                    e.dashgap = B.dashGap;
                    e.font = B.font;
                    e.fontsize = B.fontSize;
                    e.fontcolor = B.fontColor;
                    e.bgcolor = B.labelBgColor;
                    e.bordercolor = B.labelBorderColor;
                    e.shadow = B.shadow;
                    e.hideOpen = B.hideOpen
                })();
                k.dataEnabled ? f() : g();
                (function() {
                    var e = d,
                        c = [],
                        b, f, g, k;
                    n = l.addGroup({
                        fillalpha: "100",
                        items: c
                    });
                    q = l.addGroup({
                        items: []
                    });
                    for (k in e) b = null, f = e[k], g = f.getShapeId(), f && !f._isHidden && (g && (f.shapeObj = a[g]), b = f.draw()), b && (f._annotationIndex = c.length, f.markerShape = b.markerShape && n.addItem(b.markerShape), f.markerLabel = b.markerLabel && q.addItem(b.markerLabel))
                })();
                (function() {
                    var a = B.showLabels,
                        e = u.connectors,
                        b = e && e.length,
                        f = [],
                        g = [],
                        k, q, l;
                    if (b)
                        for (r.push({
                                id: "connectorLabels",
                                fillalpha: "100",
                                items: g
                            }), r.push({
                                id: "connectors",
                                fillalpha: "100",
                                items: f
                            }); b--;)
                            if (l = e[b], l.from && l.to && (k = d[l.from.toLowerCase()], q = d[l.to.toLowerCase()], k && q && (!B.hideOpen || !k._isHidden && !q._isHidden) && (da.push(q = new h(l, k, q, c)), q.connectJSON = k = q.computeConnectorJSON()))) f.push(k), k.label && a && g.push(q.getLabelJSON())
                })();
                M = r.length;
                for (c.internalAnnotations = {}; M--;) T = r.shift(), T.id ? c.internalAnnotations[T.id] = l.addGroup(T) : l.addGroup(T);
                this.addMarkerItem =
                    function(e) {
                        var b, f;
                        if ((b = e.id.toLowerCase()) && !d[b]) {
                            delete e.value;
                            e = new s(b, e, null, c);
                            if (f = e.getShapeId()) e.shapeObj = a[f];
                            d[b] = e;
                            b = e.draw();
                            n && q && (e.markerShape = b.markerShape && n.addItem(b.markerShape, !0), e.markerLabel = b.markerLabel && q.addItem(b.markerLabel, !0))
                        }
                    }
            };
        h.prototype = {
            constructor: h,
            computeConnectorJSON: function() {
                var e = this.api,
                    c = this.options,
                    g = this.from,
                    f = this.to,
                    a = c.link,
                    y = c.label,
                    h = d(c.showtooltip, this.showTooltip),
                    k = h ? b(c.tooltext, this.tooltext) : "",
                    B = b(c.thickness, this.thickness),
                    u = b(c.color, this.color),
                    m = b(c.alpha, this.alpha),
                    n = d(c.showhovereffect, this.showHoverEffect),
                    q = b(c.hovercolor, this.hoverColor, u),
                    s = b(c.hoveralpha, this.hoverAlpha, m),
                    M = b(c.hoverthickness, this.hoverThickness, B),
                    r = b(c.dashed, this.dashed),
                    t = d(c.dashlen, this.dashlen),
                    x = d(c.dashgap, this.dashgap),
                    v;
                k && (this.tooltext = k = ga(sa(k, [3, 40, 41, 42, 43], {
                    label: y,
                    fromId: g.definition.id,
                    toId: f.definition.id,
                    fromLabel: g.definition.label,
                    toLabel: f.definition.label
                }, c)));
                return g && f ? (v = {
                    fromMarkerId: g.id,
                    toMarkerId: f.id,
                    label: y
                }, F({
                    type: "line"
                }, {
                    x: g.definition.x,
                    y: g.definition.y,
                    tox: f.definition.x,
                    toy: f.definition.y,
                    dashed: r,
                    dashlen: t,
                    dashgap: x,
                    link: a,
                    tooltext: h ? k : "",
                    thickness: B,
                    color: u,
                    alpha: m,
                    label: y,
                    showshadow: this.shadow,
                    _hovereffect: n,
                    _defaultattrs: {
                        stroke: Y({
                            color: u,
                            alpha: m
                        }).toString(),
                        "stroke-width": B
                    },
                    _hoverattrs: {
                        stroke: Y({
                            color: q,
                            alpha: s
                        }).toString(),
                        "stroke-width": M
                    },
                    onmouseover: function(a) {
                        var c = a.data,
                            b = c.wrapper;
                        b && c.options._hovereffect && (l.call(e), b.attr(c.options._hoverattrs));
                        U.raiseEvent("connectorrollover",
                            v, e.fusionCharts, a)
                    },
                    onmouseout: function(a) {
                        var c = a.data,
                            b = c.wrapper;
                        b && c.options._hovereffect && b.attr(c.options._defaultattrs);
                        U.raiseEvent("connectorrollout", v, e.fusionCharts, a)
                    },
                    onclick: function(a) {
                        U.raiseEvent("connectorClick", v, e.fusionCharts, a)
                    }
                })) : null
            },
            getLabelJSON: function() {
                var e = this.connectJSON;
                return F({
                    type: "text"
                }, {
                    x: ((Number(e.x) + Number(e.tox)) / 2).toString(),
                    y: ((Number(e.y) + Number(e.toy)) / 2).toString(),
                    text: e.label,
                    align: "center",
                    valign: "middle",
                    font: this.font,
                    fontsize: this.fontsize /
                        this.api.sFactor,
                    fillcolor: this.fontcolor,
                    bgcolor: this.bgcolor,
                    bordercolor: this.bordercolor,
                    tooltext: this.tooltext
                })
            }
        };
        s.prototype = {
            constructor: s,
            init: function() {
                var e;
                e = this.options = F({}, this.definition);
                this.dataEnabled ? isNaN(e.value) || "" === e.value || (this.value = parseFloat(e.value), this.hasValue = !0) : this.applyAll ? this.options = F(e, this.application) : this.application && (this.options = F(e, this.application))
            },
            getShapeId: function() {
                return this.options.shapeid && this.options.shapeid.toLowerCase() || this.shapeId
            },
            getLabelOptions: function(e, c, b, f, a) {
                var d, h = e && e.toLowerCase();
                this.getLabelAlignment[h] || (h = "center");
                e = Number(b.x);
                d = Number(b.y);
                b = void 0 === f || void 0 === a ? b.radius || 0 : /^(top|bottom)$/ig.test(h) && .5 * a || /^(left|right)$/ig.test(h) && .5 * f || 0;
                b = Number(b) + Number(c);
                return this.getLabelAlignment[h](e, d, b)
            },
            draw: function() {
                if (this.options) {
                    var e = this.rapi,
                        c = this._conf,
                        g = e.translateX,
                        f = e.translateY,
                        a = this.options,
                        y = this.getShapeId(),
                        h = a.scale || 1,
                        k = a.label || "",
                        B = (a.labelpos || "top").toLowerCase(),
                        u = void 0 ===
                        a.formattedValue ? void 0 : a.formattedValue,
                        m = a.tooltext || this.tooltext,
                        n = d(a.radius, this.markerRadius) * h * this.autoScale || 1E-4,
                        q = b(a.fillcolor, a.color, this.fillColor),
                        s = b(a.fillalpha, a.alpha, this.fillAlpha),
                        M = b(a.fillratio, this.fillRatio),
                        r = b(a.fillangle, this.fillAngle),
                        t = d(a.borderthickness, this.borderThickness),
                        x = b(a.bordercolor, this.borderColor),
                        v = b(a.borderalpha, this.borderAlpha),
                        z = a.labelpadding || this.markerLabelPadding;
                    if (y) {
                        m = m ? ga(sa(m, [1, 2, 3], {
                                formattedValue: u,
                                label: k
                            }, a)) : u ? k + this.tooltipSepChar +
                            u : k;
                        void 0 !== u && null !== u ? k = k + this.labelSepChar + u : isNaN(h) ? h = 1 : 0 > h ? h = 0 : 5 < h && (h = 5);
                        a = {
                            x: a.x.toString(),
                            y: a.y.toString(),
                            fillcolor: q,
                            fillalpha: s,
                            fillratio: M,
                            fillangle: r,
                            borderthickness: t,
                            bordercolor: x,
                            borderalpha: v,
                            hovereffect: b(a.showhovereffect, this.showHoverEffect),
                            radius: n.toString(),
                            tooltext: this.showMarkerTooltip ? m : "",
                            link: a.link,
                            showshadow: d(a.showshadow, this.shadow),
                            _markerLabel: k,
                            _markerId: a.id,
                            id: (a.id + "").toLowerCase(),
                            onmouseover: function(a) {
                                var c = a.data,
                                    b = c.options,
                                    d = c.bounds,
                                    k = b._markerEventArgs;
                                (c = c.wrapper) && b.hovereffect && (l.call(e), c.attr(b._hoverattrs));
                                k || (k = b._markerEventArgs = {
                                    x: d.x1 / d.xs,
                                    y: d.y1 / d.ys,
                                    scaledX: d.x1,
                                    scaledY: d.y1,
                                    chartX: g + d.x1,
                                    chartY: f + d.y1,
                                    id: b._markerId,
                                    label: b._markerLabel
                                });
                                U.raiseEvent("markerRollOver", k, e.fusionCharts, a)
                            },
                            onmouseout: function(a) {
                                var b = a.data,
                                    c = b.wrapper;
                                c && b.options.hovereffect && c.attr(b.options._defaultattrs);
                                U.raiseEvent("markerRollOut", b.options._markerEventArgs, e.fusionCharts, a)
                            },
                            onclick: function(a) {
                                U.raiseEvent("markerClick", a.data.options._markerEventArgs,
                                    e.fusionCharts, a)
                            }
                        };
                        "triangle" === y ? F(a, {
                            type: "polygon",
                            sides: 3,
                            startangle: this.startAngle
                        }) : "diamond" === y ? F(a, {
                            type: "polygon",
                            sides: 4,
                            startangle: this.startAngle
                        }) : "arc" === y ? F(a, {
                            type: "arc",
                            startangle: 0,
                            endangle: 360,
                            innerradius: .6 * n
                        }) : "circle" === y ? a.type = "circle" : (z = this.getShapeArgs(), this.dataEnabled && this.valueToRadius && void 0 !== a.radius ? delete z.radius : (!z.radius && (z.radius = this.markerRadius), z.radius = z.radius * h * this.autoScale), F(a, z));
                        F(a, {
                            hoverfillcolor: b(a.fillhovercolor, this.hoverFillColor,
                                a.fillcolor),
                            hoverfillalpha: b(a.fillhoveralpha, this.hoverFillAlpha, a.fillalpha),
                            hoverfillratio: b(a.fillhoverratio, this.hoverFillRatio, a.fillratio),
                            hoverfillangle: b(a.fillhoverangle, this.hoverFillAngle, a.fillangle),
                            hoverborderthickness: d(a.borderhoverthickness, this.hoverBorderThickness, a.borderthickness),
                            hoverbordercolor: b(a.borderhovercolor, this.hoverBorderColor, a.bordercolor),
                            hoverborderalpha: b(a.borderhoveralpha, this.hoverBorderAlpha, a.borderalpha)
                        });
                        a._defaultattrs = {
                            fill: Y({
                                alpha: a.fillalpha,
                                color: a.fillcolor,
                                angle: a.fillangle,
                                ratio: a.fillratio
                            }).toString(),
                            "stroke-width": "0" !== a.showborder ? a.borderthickness : 0,
                            stroke: W(a.bordercolor, a.borderalpha)
                        };
                        a._hoverattrs = {
                            fill: Y({
                                alpha: a.hoverfillalpha,
                                color: a.hoverfillcolor,
                                angle: a.hoverfillangle,
                                ratio: a.hoverfillratio
                            }).toString(),
                            "stroke-width": "0" !== a.showborder ? a.hoverborderthickness : 0,
                            stroke: W(a.hoverbordercolor, a.hoverborderalpha)
                        };
                        "image" === a.type && (a.borderthickness = a.borderthickness || 0, a.onload = function(a) {
                            var b = this.options,
                                c = a.width;
                            a = a.height;
                            var f =
                                (Number(b.x) - c / (2 * e.sFactor)) * e.sFactor,
                                b = (Number(b.y) - a / (2 * e.sFactor)) * e.sFactor,
                                g;
                            if (c && a)
                                for (g in {
                                        wrapper: 1,
                                        tracker: 1
                                    }) this[g] && this[g].attr({
                                    x: f,
                                    y: b,
                                    width: c,
                                    height: a
                                })
                        });
                        this.drawOptions.shape = a;
                        if (!this.showMarkerLabels) return {
                            markerShape: a
                        };
                        z = a.labelpadding || this.markerLabelPadding;
                        h = this.getLabelOptions(B, z, a);
                        B = h.align;
                        y = h.valign;
                        m = c._labelBaseWidth;
                        u = c._labelBaseHeight;
                        n = c._labelXOffset;
                        c = c._labelYOffset;
                        m = this.labelWrapWidth ? this.labelWrapWidth : this.getWrapWidth[B](m, Number(h.x) + n);
                        c = this.labelWrapHeight ?
                            this.labelWrapHeight : this.getWrapHeight[y](u, Number(h.y) + c);
                        m > z && (m -= z);
                        c > z && (c -= z);
                        this.drawOptions.label = F({
                            type: "text"
                        }, {
                            text: k,
                            tooltext: a.tooltext,
                            x: h.x,
                            y: h.y,
                            align: B,
                            valign: h.valign,
                            wrap: 1,
                            wrapwidth: m,
                            wrapheight: c,
                            fontsize: this.markerFontSize / e.sFactor,
                            font: this.markerFont,
                            fillcolor: this.markerFontColor
                        });
                        return {
                            markerShape: a,
                            markerLabel: this.drawOptions.label
                        }
                    }
                }
            },
            show: function() {
                this.setMarkerVisibility(!0)
            },
            hide: function() {
                this.setMarkerVisibility(!1)
            },
            setMarkerVisibility: function(e) {
                var b =
                    this.rapi && this.rapi.internalAnnotations;
                if (b = (b = b && b.markers) && b.items)
                    if (b = b[this._annotationIndex]) this._origFill || (this._origFill = Y({
                        alpha: b.fillAlpha,
                        color: b.fillColor,
                        angle: b.fillAngle,
                        ratio: b.fillRatio
                    }), this._hideFill = Y({
                        alpha: "0",
                        color: b.fillColor,
                        angle: b.fillAngle,
                        ratio: b.fillRatio
                    })), e ? b.wrapper.attr({
                        fill: this._origFill
                    }) : b.wrapper.attr({
                        fill: this._hideFill
                    })
            },
            getShapeArgs: function() {
                var e = F({}, this.shapeObj),
                    b;
                return e ? ("polygon" === e.type ? 3 > e.sides ? e.type = "circle" : e.startangle = this.startAngle :
                    "arc" === e.type && (b = (e.radius || this.markerRadius) * this.autoScale, e.radius = b, e.innerradius = e.innerradius && e.innerradius * this.autoScale || .6 * b), e) : null
            },
            destroy: function() {
                var e = this.markerShape,
                    b = this.markerLabel,
                    g;
                e && e.destroy();
                b && b.destroy();
                for (g in this) delete this[g]
            },
            getLabelAlignment: {
                top: function(e, b, g) {
                    return {
                        x: e.toString(),
                        y: (b - g).toString(),
                        align: "center",
                        valign: "top"
                    }
                },
                left: function(e, b, g) {
                    return {
                        x: (e - g).toString(),
                        y: b.toString(),
                        align: "right",
                        valign: "middle"
                    }
                },
                right: function(e, b, g) {
                    return {
                        x: (e +
                            g).toString(),
                        y: b.toString(),
                        align: "left",
                        valign: "middle"
                    }
                },
                bottom: function(e, b, g) {
                    return {
                        x: e.toString(),
                        y: (b + g).toString(),
                        align: "center",
                        valign: "bottom"
                    }
                },
                center: function(e, b) {
                    return {
                        x: e.toString(),
                        y: b.toString(),
                        align: "center",
                        valign: "middle"
                    }
                }
            },
            getWrapWidth: {
                right: function(e, b) {
                    return b
                },
                left: function(e, b) {
                    return e - b
                },
                center: function(e, b) {
                    return 2 * P(b, e - b)
                }
            },
            getWrapHeight: {
                top: function(e, b) {
                    return b
                },
                middle: function(e, b) {
                    return 2 * P(b, e - b)
                },
                bottom: function(b, c) {
                    return b - c
                }
            }
        };
        S(D.eventList, {
            entityrollover: "FC_Event",
            entityrollout: "FC_Event"
        });
        X("geo", {
            name: "geo",
            friendlyName: "Map",
            revision: 1,
            creditLabel: !1,
            standaloneInit: !1,
            annotationInteractionEvents: !1,
            charttopmargin: 10,
            chartrightmargin: 10,
            chartbottommargin: 10,
            chartleftmargin: 10,
            baseWidth: 400,
            baseHeight: 300,
            baseScaleFactor: 1,
            defaultSeriesType: "geo",
            rendererId: "maps",
            entities: {},
            draw: function(b, c) {
                var g = this.renderer,
                    f = this.chartInstance;
                g || (g = this.renderer = new X("renderer." + this.rendererId));
                this.updateDefaultAnnotations();
                f.addEventListener("internal.mapdrawingcomplete",
                    function(a, b) {
                        c && c.apply(this, [b.renderer]);
                        a.detachHandler()
                    });
                return g.init(this, b, function(a) {
                    a.checkComplete()
                })
            },
            chart: function(e, c) {
                F(this.dataObj.chart, {
                    charttopmargin: this.dataObj.chart.maptopmargin,
                    chartrightmargin: this.dataObj.chart.maprightmargin,
                    chartbottommargin: this.dataObj.chart.mapbottommargin,
                    chartleftmargin: this.dataObj.chart.mapleftmargin,
                    animation: this.dataObj.chart.animation || "0"
                });
                var g = this.dataObj,
                    f = ya(g, e, c, this),
                    a = g.chart,
                    y = g.markers,
                    h = f.chart,
                    k = f[qa],
                    l = h.useRoundEdges = 1 ===
                    d(a.useroundedges),
                    u = l ? 1 : 0,
                    l = l ? 0 : 1,
                    m = h.use3DLighting = 1 === d(a.use3dlighting, 1),
                    n = F({}, f.tooltip.style),
                    q = new Ia(this.colorPaletteMap, (0 < a.palette && 6 > a.palette ? a.palette : d(this.paletteIndex, 1)) - 1),
                    s = b(a.basefont, "Verdana,sans"),
                    v = Ca(a.basefontsize, 10),
                    r = b(a.basefontcolor, q.basefontcolor),
                    t = Ca(a.outcnvbasefontsize, v),
                    x = b(a.outcnvbasefont, s),
                    w = t + "px",
                    z = ca(b(a.outcnvbasefontcolor, r)),
                    I = b(a.bgcolor, a.canvasbgcolor, q.canvasbgcolor),
                    p = b(a.bgalpha, a.canvasbgalpha, q.canvasbgalpha),
                    E = d(a.usevaluesformarkers,
                        g.markers && g.markers.items && g.markers.items.length, !(g.markers && g.markers.application && g.markers.application.length && g.markers.definition && g.markers.definition.length)),
                    A, C, K, O, H, J, G, v = v + "px",
                    r = ca(r);
                this.realtimeEnabled && this.postHCJSONCreation && this.postHCJSONCreation.call(this, f);
                h.events.click = this.linkClickFN;
                k.numberFormatter = this.numberFormatter;
                F(k, {
                    width: e,
                    height: c,
                    showTooltip: d(a.showtooltip, this.showtooltip, 1),
                    showHoverEffect: d(a.showhovereffect, 1),
                    tooltipSepChar: b(a.tooltipsepchar, ", "),
                    showValues: d(a.showvalues, this.showValues, 1),
                    showCanvasBG: b(a.showcanvasbg, 1),
                    useValuesForMarkers: E,
                    adjustViewPortForMarkers: d(a.adjustviewportformarkers, E),
                    flatScrollBars: d(a.flatscrollbars, 0),
                    scrollBar3DLighting: d(a.scrollbar3dlighting, 1),
                    outCanvasStyle: {
                        fontFamily: x,
                        color: z,
                        fontSize: w
                    },
                    inCanvasStyle: {
                        fontFamily: s,
                        fontSize: v,
                        color: r
                    }
                });
                la(k.outCanvasStyle);
                A = la(k.inCanvasStyle);
                k.trendStyle = k.outCanvasStyle;
                "0" == k.showCanvasBG && (p = "0");
                C = b(a.entitybordercolor, a.bordercolor, q.plotbordercolor);
                K =
                    b(a.entityfillcolor, a.fillcolor, q.plotfillcolor);
                O = b(a.entityfillalpha, a.fillalpha, q.plotfillalpha);
                H = b(a.entityfillratio, a.fillratio, q.plotfillratio);
                J = b(a.entityfillangle, a.fillangle, q.plotfillangle);
                G = b(a.nullentityfillcolor, a.nullentitycolor, K);
                E = d(a.showcanvasborder, l) ? d(a.canvasborderthickness, 1) : 0;
                F(f, {
                    chart: {
                        emulateFlashGutter: d(a._emulateflashgutter, 1),
                        defaultSeriesType: this.defaultSeriesType,
                        paletteIndex: q.index,
                        borderRadius: d(a.canvasborderradius, 0),
                        borderColor: W(b(a.canvasbordercolor,
                            q.canvasbordercolor), b(a.canvasborderalpha, q.canvasborderalpha)),
                        borderWidth: E,
                        borderDashStyle: d(a.canvasborderdashed, 0) ? va(d(a.canvasborderdashlen, 4), d(a.canvasborderdashgap, 2), E) : void 0,
                        backgroundColor: Y({
                            color: I,
                            alpha: p,
                            angle: b(a.bgangle, a.canvasbgangle, q.canvasbgangle),
                            ratio: b(a.bgratio, a.canvasbgratio, q.canvasbgratio)
                        }),
                        plotBorderColor: "#ffffff",
                        plotBorderWidth: 0,
                        plotBackgroundColor: Y({
                            color: "#ffffff",
                            alpha: 0
                        }),
                        bgSWF: b(a.bgimage, a.bgswf),
                        bgSWFAlpha: d(a.bgimagealpha, a.bgswfalpha, 100),
                        bgImageScale: d(a.bgimagescale,
                            100),
                        bgImageDisplayMode: b(a.bgimagedisplaymode, "none").toLowerCase(),
                        logoURL: ta(a.logourl),
                        logoPosition: b(a.logoposition, "tl").toLowerCase(),
                        logoAlpha: d(a.logoalpha, 100),
                        logoLink: ta(a.logolink),
                        logoScale: d(a.logoscale, 100),
                        logoLeftMargin: d(a.logoleftmargin, 0),
                        logoTopMargin: d(a.logotopmargin, 0),
                        toolbar: function() {
                            var f = {
                                    button: {}
                                },
                                g = f.button,
                                k;
                            g.scale = d(a.toolbarbuttonscale, 1.15);
                            g.width = d(a.toolbarbuttonwidth, 15);
                            g.height = d(a.toolbarbuttonheight, 15);
                            g.radius = d(a.toolbarbuttonradius, 2);
                            g.spacing = d(a.toolbarbuttonspacing,
                                5);
                            g.fill = W(b(a.toolbarbuttoncolor, "ffffff"));
                            g.labelFill = W(b(a.toolbarlabelcolor, "cccccc"));
                            g.symbolFill = W(b(a.toolbarsymbolcolor, "ffffff"));
                            g.hoverFill = W(b(a.toolbarbuttonhovercolor, "ffffff"));
                            g.stroke = W(b(a.toolbarbuttonbordercolor, "bbbbbb"));
                            g.symbolStroke = W(b(a.toolbarsymbolbordercolor, "9a9a9a"));
                            g.strokeWidth = d(a.toolbarbuttonborderthickness, 1);
                            g.symbolStrokeWidth = d(a.toolbarsymbolborderthickness, 1);
                            k = g.symbolPadding = d(a.toolbarsymbolpadding, 5);
                            g.symbolHPadding = d(a.toolbarsymbolhpadding, k);
                            g.symbolVPadding = d(a.toolbarsymbolvpadding, k);
                            k = f.position = b(a.toolbarposition, "tr").toLowerCase();
                            switch (k) {
                                case "tr":
                                case "tl":
                                case "br":
                                case "bl":
                                    break;
                                default:
                                    k = "tr"
                            }
                            g = f.hAlign = "left" === ("" + a.toolbarhalign).toLowerCase() ? "l" : k.charAt(1);
                            k = f.vAlign = "bottom" === ("" + a.toolbarvalign).toLowerCase() ? "b" : k.charAt(0);
                            f.hDirection = d(a.toolbarhdirection, "r" === g ? -1 : 1);
                            f.vDirection = d(a.toolbarvdirection, "b" === k ? -1 : 1);
                            f.vMargin = d(a.toolbarvmargin, 6);
                            f.hMargin = d(a.toolbarhmargin, 10);
                            f.x = d(a.toolbarx, "l" === g ?
                                0 : e);
                            f.y = d(a.toolbary, "t" === k ? 0 : c);
                            return f
                        }()
                    },
                    title: {
                        text: ga(a.caption),
                        offsetX: Number(a.captionxshift),
                        offsetY: Number(a.captionyshift),
                        position: b(a.captionposition, void 0 !== a.captionxshift || void 0 !== a.captionyshift ? "top left" : "top"),
                        padding: d(a.captionpadding, 10),
                        style: {
                            fontFamily: b(a.captionfontfamily, x),
                            color: b(a.captionfontcolor, z).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                            fontSize: d(a.captionfontsize, t + 3) + "px",
                            fontWeight: 0 === d(a.captionfontbold) ? "normal" : "bold"
                        }
                    },
                    subtitle: {
                        text: ga(a.subcaption),
                        style: {
                            fontFamily: b(a.subcaptionfontfamily,
                                a.captionfontfamily, x),
                            color: b(a.subcaptionfontcolor, a.captionfontcolor, z).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                            fontSize: d(a.subcaptionfontsize, d(ra(a.captionfontsize - 3, 1), t)) + "px",
                            fontWeight: 0 === d(a.subcaptionfontbold) ? "normal" : "bold"
                        }
                    },
                    orphanStyles: {
                        defaultStyle: {
                            style: F({}, k.inCanvasStyle)
                        }
                    },
                    tooltip: {
                        enabled: 0 !== k.showTooltip,
                        style: {
                            fontFamily: s,
                            fontSize: v,
                            lineHeight: A,
                            color: r,
                            padding: d(a.tooltippadding, this.tooltippadding, 3) + "px",
                            backgroundColor: W(b(n.backgroundColor, a.tooltipbgcolor, q.tooltipbgcolor),
                                b(a.tooltipbgalpha, "100")),
                            borderColor: W(b(n.borderColor, a.tooltipbordercolor, q.tooltipbordercolor), b(a.tooltipborderalpha, "100")),
                            borderWidth: d(a.tooltipborderthickness, l) + "px",
                            borderRadius: d(a.tooltipborderradius, u + 1) + "px"
                        },
                        constrain: d(a.constraintooltip, 1),
                        shadow: d(a.showtooltipshadow, a.showshadow, 1) ? {
                            enabled: !0,
                            opacity: ra(d(a.tooltipbgalpha, 100), d(a.tooltipborderalpha, 100)) / 100
                        } : !1
                    },
                    legend: {
                        itemStyle: {
                            fontFamily: b(a.legenditemfont, x),
                            fontSize: d(a.legenditemfontsize, t) + "px",
                            color: ca(b(a.legenditemfontcolor,
                                z)),
                            fontWeight: d(a.legenditemfontbold) ? "bold" : "normal"
                        },
                        itemHiddenStyle: {
                            fontFamily: x,
                            fontSize: w,
                            color: ca(b(a.legenditemhiddencolor, z))
                        },
                        itemHoverStyle: {
                            color: ca(b(a.legenditemhoverfontcolor, a.legenditemfontcolor, z))
                        },
                        enabled: d(a.showlegend, 1),
                        title: {
                            text: ga(a.legendcaption),
                            style: {
                                fontFamily: b(a.legendcaptionfont, x),
                                fontSize: d(a.legendcaptionfontsize, t) + "px",
                                color: ca(b(a.legendcaptionfontcolor, z)),
                                fontWeight: d(a.legendcaptionfontbold, 1) ? "bold" : "normal"
                            },
                            align: Q[b(a.legendcaptionalignment)]
                        },
                        position: b(a.legendposition,
                            0 === d(g.colorrange && g.colorrange.gradient, 0) ? "right" : "bottom"),
                        backgroundColor: b(a.legendbgcolor, q.bgcolor),
                        backgroundAlpha: b(a.legendbgalpha, "100"),
                        borderColor: b(a.legendbordercolor, q.legendbordercolor),
                        borderThickness: b(a.legendborderthickness, "1"),
                        borderAlpha: b(a.legendborderalpha, "100"),
                        shadow: d(a.legendshadow, 1),
                        allowDrag: d(a.legendallowdrag, 0),
                        scroll: {
                            scrollBgColor: b(a.legendscrollbgcolor, a.scrollcolor, "AAAAAA"),
                            scrollBtnColor: b(a.legendscrollbtncolor, "BBBBBB"),
                            scrollBarColor: b(a.legendscrollbarcolor,
                                "CCCCCC")
                        },
                        reversed: d(a.reverselegend, 0),
                        interactive: d(a.interactivelegend, 0),
                        minColor: G,
                        lighting3d: m
                    },
                    markers: {
                        dataLabels: {
                            style: {
                                fontFamily: b(a.markerfont, s),
                                fontSize: d(a.markerfontsize, parseInt(v, 10)),
                                fontColor: b(a.markerfontcolor, r)
                            }
                        },
                        showTooltip: d(a.showmarkertooltip, k.showTooltip),
                        showLabels: d(a.showmarkerlabels, a.showlabels, 1),
                        showHoverEffect: d(a.showmarkerhovereffect, 1),
                        labelPadding: b(a.markerlabelpadding, "5"),
                        labelWrapWidth: d(a.markerlabelwrapwidth, 0),
                        labelWrapHeight: d(a.markerlabelwrapheight,
                            0),
                        fillColor: b(a.markerfillcolor, a.markerbgcolor, q.markerfillcolor),
                        fillAlpha: b(a.markerfillalpha, q.markerfillalpha),
                        fillAngle: b(a.markerfillangle, q.markerfillangle),
                        fillRatio: b(a.markerfillratio, q.markerfillratio),
                        fillPattern: b(a.markerfillpattern, q.markerbgpattern),
                        hoverFillColor: a.markerfillhovercolor,
                        hoverFillAlpha: a.markerfillhoveralpha,
                        hoverFillRatio: a.markerfillhoverratio,
                        hoverFillAngle: a.markerfillhoverangle,
                        borderThickness: b(a.markerborderthickness, 1),
                        borderColor: b(a.markerbordercolor, q.markerbordercolor),
                        borderAlpha: d(a.markerborderalpha, q.markerborderalpha),
                        hoverBorderThickness: a.markerborderhoverthickness,
                        hoverBorderColor: a.markerborderhovercolor,
                        hoverBorderAlpha: a.markerborderhoveralpha,
                        radius: d(a.markerradius && D.trimString(a.markerradius), 7),
                        shapeId: b(a.defaultmarkershape, "circle"),
                        labelSepChar: b(a.labelsepchar, ", "),
                        tooltipSepChar: k.tooltipSepChar,
                        autoScale: d(a.autoscalemarkers, 0),
                        tooltext: b(y && y.tooltext, a.markertooltext),
                        dataEnabled: k.useValuesForMarkers,
                        valueToRadius: d(a.markerradiusfromvalue,
                            1),
                        valueMarkerAlpha: b(a.valuemarkeralpha, "75"),
                        hideNull: d(a.hidenullmarkers, 0),
                        nullRadius: d(a.nullmarkerradius, a.markerradius, 7),
                        adjustViewPort: d(a.adjustviewportformarkers, 0),
                        startAngle: d(a.markerstartangle, 90),
                        maxRadius: d(a.maxmarkerradius, 0),
                        minRadius: d(a.minmarkerradius, 0),
                        applyAll: d(a.applyallmarkers, 0),
                        shadow: d(a.showmarkershadow, a.showshadow, 0)
                    },
                    connectors: {
                        showHoverEffect: d(a.showconnectorhovereffect, 1),
                        thickness: d(a.connectorthickness, a.markerconnthickness, "2"),
                        color: b(a.connectorcolor, a.markerconncolor,
                            q.markerbordercolor),
                        alpha: b(a.connectoralpha, a.markerconnalpha, "100"),
                        hoverthickness: d(a.connectorhoverthickness, a.connectorthickness, a.markerconnthickness, "2"),
                        hovercolor: b(a.connectorhovercolor, a.connectorcolor, a.markerconncolor, q.markerbordercolor),
                        hoveralpha: b(a.connectorhoveralpha, a.connectoralpha, a.markerconnalpha, "100"),
                        dashed: d(a.connectordashed, a.markerconndashed, 0),
                        dashLen: d(a.connectordashlen, a.markerconndashlen, 3),
                        dashGap: d(a.connectordashgap, a.markerconndashgap, 2),
                        font: b(a.connectorfont,
                            a.markerconnfont, s),
                        fontColor: b(a.connectorfontcolor, a.markerconnfontcolor, r),
                        fontSize: d(a.connectorfontsize, a.markerconnfontsize, parseInt(v, 10)),
                        showLabels: d(a.showconnectorlabels, a.showmarkerlabels, a.showlabels, 1),
                        labelBgColor: b(a.connectorlabelbgcolor, a.markerconnlabelbgcolor, q.plotfillcolor),
                        labelBorderColor: b(a.connectorlabelbordercolor, a.markerconnlabelbordercolor, q.markerbordercolor),
                        shadow: d(a.showconnectorshadow, a.showmarkershadow, a.showshadow, 0),
                        showTooltip: d(a.showconnectortooltip, a.showmarkertooltip,
                            k.showTooltip),
                        tooltext: b(y && y.connectortooltext, a.connectortooltext),
                        hideOpen: d(a.hideopenconnectors, 1)
                    },
                    entities: {
                        baseScaleFactor: this.baseScaleFactor,
                        dataLabels: {
                            style: {
                                fontFamily: s,
                                fontSize: v,
                                lineHeight: A,
                                color: f.plotOptions.series.dataLabels.color = r
                            }
                        },
                        fillColor: K,
                        fillAlpha: O,
                        fillRatio: H,
                        fillAngle: J,
                        borderColor: C,
                        borderAlpha: b(a.entityborderalpha, a.borderalpha, this.borderAlpha, "100"),
                        borderThickness: d(a.showentityborder, a.showborder, 1) ? d(a.entityborderthickness, a.borderthickness, 1) : 0,
                        scaleBorder: d(a.scaleentityborder,
                            a.scaleborder, 0),
                        hoverFillColor: b(a.entityfillhovercolor, a.hoverfillcolor, a.hovercolor, q.plothoverfillcolor),
                        hoverFillAlpha: b(a.entityfillhoveralpha, a.hoverfillalpha, a.hoveralpha, q.plothoverfillalpha),
                        hoverFillRatio: b(a.entityfillhoverratio, a.hoverfillratio, a.hoverratio, q.plothoverfillratio),
                        hoverFillAngle: b(a.entityfillhoverangle, a.hoverfillangle, a.hoverangle, q.plothoverfillangle),
                        hoverBorderThickness: b(a.entityborderhoverthickness, a.hoverborderthickness),
                        hoverBorderColor: b(a.entityborderhovercolor,
                            q.plotbordercolor),
                        hoverBorderAlpha: b(a.entityborderhoveralpha, q.plotborderalpha),
                        nullEntityColor: G,
                        nullEntityAlpha: b(a.nullentityfillalpha, a.nullentityalpha, O),
                        nullEntityRatio: b(a.nullentityfillratio, a.nullentityratio, H),
                        nullEntityAngle: b(a.nullentityfillangle, a.nullentityangle, J),
                        connectorColor: b(a.labelconnectorcolor, a.connectorcolor, r),
                        connectorAlpha: b(a.labelconnectoralpha, a.connectoralpha, "100"),
                        connectorThickness: d(a.labelconnectorthickness, a.borderthickness, 1),
                        showHoverEffect: d(a.showentityhovereffect,
                            a.usehovercolor, k.showHoverEffect),
                        hoverOnNull: d(a.hoveronnull, a.entityhoveronnull, 1),
                        labelPadding: d(a.labelpadding, 5),
                        showLabels: d(a.showlabels, 1),
                        labelsOnTop: d(a.entitylabelsontop, 1),
                        includeNameInLabels: d(a.includenameinlabels, 1),
                        includeValueInLabels: d(a.includevalueinlabels, 0),
                        useSNameInTooltip: d(a.usesnameintooltip, 0),
                        useShortName: d(a.usesnameinlabels, 1),
                        labelSepChar: b(a.labelsepchar, ", "),
                        showTooltip: d(a.showentitytooltip, k.showTooltip),
                        tooltipSepChar: k.tooltipSepChar,
                        tooltext: a.entitytooltext,
                        hideNullEntities: d(a.hidenullentities, 0),
                        showHiddenEntityBorder: d(a.showhiddenentityborder, 1),
                        showNullEntityBorder: d(a.shownullentityborder, 1),
                        hiddenEntityColor: b(a.hiddenentitycolor, a.hiddenentityfillcolor, a.hiddenentityalpha || a.hiddenentityfillalpha ? G : "ffffff"),
                        hiddenEntityAlpha: b(a.hiddenentityalpha, a.hiddenentityfillalpha, .001),
                        shadow: d(a.showshadow, this.defaultPlotShadow, q.shadow)
                    },
                    entitydef: {
                        useSNameAsId: d(a.usesnameasid, 0)
                    }
                });
                f.legend.title.style.lineHeight = la(f.legend.title.style);
                f.legend.itemStyle.lineHeight =
                    la(f.legend.itemStyle);
                f.legend.itemHiddenStyle.lineHeight = la(f.legend.itemHiddenStyle);
                y = Ba(e, c, a.markermaxradius, a.markerminradius);
                f.markers.maxRadius = y.max;
                f.markers.minRadius = y.min;
                a.tooltipcolor && (f.tooltip.style.color = pa(a.tooltipcolor));
                void 0 !== b(a.clickurl) && (h.link = a.clickurl, h.style.cursor = "pointer", ma && (h.style._cursor = "hand"), f.plotOptions.series.point.events.click = function() {
                    h.events.click.call({
                        link: a.clickurl
                    })
                });
                y = h.bgImageDisplayMode;
                k = ta(a.bgimagevalign, "").toLowerCase();
                u = ta(a.bgimagehalign,
                    "").toLowerCase();
                "tile" == y || "fill" == y || "fit" == y ? ("top" != k && "middle" != k && "bottom" != k && (k = "middle"), "left" != u && "middle" != u && "right" != u && (u = "middle")) : ("top" != k && "middle" != k && "bottom" != k && (k = "top"), "left" != u && "middle" != u && "right" != u && (u = "left"));
                h.bgImageVAlign = k;
                h.bgImageHAlign = u;
                this.parseStyles(f);
                la(f.title.style);
                la(f.subtitle.style);
                la(f.tooltip.style);
                f.plotOptions.series.allowPointSelect = !0;
                this.parseExportOptions(f);
                this.preSeriesAddition && this.preSeriesAddition(f, g, e, c);
                this.series && this.series(g,
                    f, this.name, e, c);
                this.postSeriesAddition && this.postSeriesAddition(f, g, e, c);
                this.spaceManager(f, g, e, c);
                Z.console && Z.FC_DEV_ENVIRONMENT && Z.console.log(f);
                return f
            },
            series: function(e, c) {
                function g(b) {
                    for (C = b && b.length || 0; C--;) x = b[C], p = x.value, x.cleanValue = a.getCleanValue(p), x.formattedValue = null !== x.cleanValue ? a.dataLabels(p) : void 0, x.origValue = p, null !== x.cleanValue && (r = P(x.cleanValue, r), t = ra(x.cleanValue, t))
                }

                function f(a, e, f) {
                    for (C = a && a.length || 0; C--;) {
                        x = a[C];
                        var g;
                        a: {
                            g = d(x.value);
                            for (var h = void 0,
                                    y = void 0, h = void 0, p = I && I.length || 0; p--;)
                                if (h = I[p], y = Number(h.maxvalue), h = d(h.minvalue, c.colorRange.scaleMin), g >= h && g <= y) {
                                    g = p;
                                    break a
                                }
                            g = null
                        }
                        E = g;
                        null !== E && (G = "gradient" === v.type ? c.colorRange.getColorObj(x.value).code : q && q[E] && b(q[E].color, q[E].code), w[E] || (w[E] = []), G && (x.color = x.color ? x.color : G, e && (x.alpha = x.alpha ? x.alpha : e), f && (m || x.fillhoveralpha || (x.fillhoveralpha = x.alpha), k || x.fillhovercolor || (x.fillhovercolor = x.color)), w[E].push(x)))
                    }
                }
                var a = this.numberFormatter,
                    h = this.hcJSON.series,
                    l = c.markers.valueMarkerAlpha,
                    k = c.markers.hasHoverColor,
                    m = c.markers.hasHoverAlpha,
                    u = this.dataObj,
                    n = c[qa],
                    s = u.colorrange,
                    q = s && s.color,
                    v = c.legend,
                    w = {},
                    s = {
                        legendClick: function() {
                            var a;
                            if (a = this.chart) !this.legend && (this.legend = this.plot.legend), a.legendClick(this, !this.visible)
                        },
                        getEventArgs: function() {
                            var a;
                            if (a = this.chart) return !this.legend && (this.legend = this.plot.legend), a.getEventArgs(this)
                        },
                        setVisible: function(a) {
                            var b = this.data,
                                e = this.legendItem,
                                c = this.visible;
                            this.visible = a = void 0 === a ? !c : a;
                            e && v.colorizeItem && v.colorizeItem(this,
                                a);
                            for (c = b && b.length; c--;)(e = b[c].mapItem) && (a ? e.show && e.show() : e.hide && e.hide())
                        }
                    },
                    r = Infinity,
                    t = -Infinity,
                    x, G, z, I, p, E, A, C;
                g(u.data || []);
                n.useValuesForMarkers && g(u.markers && u.markers.items || []);
                n._doNotShowLegend = !0;
                v.type = u.colorrange && "1" === u.colorrange.gradient ? "gradient" : "point";
                Infinity === r && (r = void 0); - Infinity === t && (t = void 0);
                n.dataMin = r;
                n.dataMax = t;
                c.colorRange = new D.colorRange({
                    colorRange: u.colorrange,
                    dataMin: r,
                    dataMax: t,
                    defaultColor: v.minColor,
                    numberFormatter: a
                });
                C = (I = c.colorRange.colorArr) &&
                    I.length || 0;
                if (0 < C) {
                    for (; C--;) z = I[C], !n._doNotShowLegend || "" === z.label && void 0 === z.label || (n._doNotShowLegend = !1), h.push(F({
                        type: this.defaultSeriesType,
                        showInLegend: !0,
                        data: [],
                        plot: {},
                        name: z.label,
                        color: z.code,
                        rangeMin: z.minvalue,
                        rangeMax: z.maxvalue,
                        visible: !0
                    }, s));
                    f(u.data || []);
                    n.useValuesForMarkers && f(u.markers && u.markers.items || [], l, !0);
                    h = h.reverse();
                    for (A in w) h[A] && (h[A].data = w[A])
                } else h.push({
                    type: this.defaultSeriesType,
                    data: []
                });
                n._doNotShowLegend && (this.hcJSON.legend.enabled = !1)
            },
            preliminaryScaling: function(b,
                c) {
                for (var g = c.markers && c.markers.items || [], f = g && g.length || 0, a = Infinity, d = Infinity, h = -Infinity, k = -Infinity, l, u; f--;) u = g[f], l = Number(u.x), u = Number(u.y), a = P(a, l), d = P(d, u), h = ra(h, l), k = ra(k, u);
                return {
                    x: a,
                    y: d,
                    x1: h,
                    y1: k
                }
            },
            getScalingParameters: function(b, c, g, f) {
                var a = b / c,
                    d = g / (b * this.baseScaleFactor),
                    h = f / (c * this.baseScaleFactor),
                    k = 0,
                    l = 0;
                d > h ? (d = h, k += (g - f * a) / 2, b = 200 / (c * d)) : (l += (f - g / a) / 2, b = 200 / (b * d));
                return {
                    scaleFactor: d,
                    strokeWidth: b,
                    translateX: k,
                    translateY: l
                }
            },
            calculateMarkerBounds: function(b, c, g, f, a) {
                var d =
                    b.markers,
                    h = b[qa];
                b = h.dataMin;
                for (var h = h.dataMax, k = d.minRadius, l = d.maxRadius, u = d.hideNull, m = d.nullRadius, d = d.valueToRadius, n = (c = c.markers && c.markers.items || [], c.length) || 0, q = Infinity, s = Infinity, v = -Infinity, r = -Infinity, t, x, w; n--;) x = c[n], null !== x.cleanValue ? (d && void 0 === x.radius && (x.radius = k + (l - k) * (x.cleanValue - b) / (h - b)), w = Number(x.radius), t = (Number(x.x) + f) * g, x = (Number(x.y) + a) * g, q = P(q, t - w), s = P(s, x - w), v = ra(v, t + w), r = ra(r, x + w)) : u ? x.__hideMarker = !0 : void 0 === x.radius && (x.radius = m);
                return {
                    x: q,
                    y: s,
                    x1: v,
                    y1: r
                }
            },
            spaceManager: function(b, c, g, f) {
                var a = b.chart,
                    d = b[qa],
                    h = a.spacingLeft,
                    k = a.spacingTop,
                    l = this.baseWidth,
                    u = this.baseHeight;
                g -= a.spacingRight + h;
                a = f - (a.spacingBottom + k);
                f = d._captionBlock = this.manageTitleSpace(b, c, g, a);
                var m = d._legendBlock = this.placeLegendBlock(b, c, g, a - f.height, f.isBottom ? f.height : 0);
                g -= m.width;
                var a = a - f.height - m.height,
                    n = m = 0;
                d.useValuesForMarkers ? (d.adjustViewPortForMarkers ? (d = this.preliminaryScaling(b, c), d.x1 > l && (l = d.x1), 0 > d.x && (l += -d.x, n = -d.x), d.y1 > u && (u = d.y1), 0 > d.y && (u += -d.y, m = -d.y),
                    d = this.getScalingParameters(l, u, g, a), d = this.calculateMarkerBounds(b, c, d.scaleFactor * this.baseScaleFactor, n, m), b = a, c = g, 0 > d.x && (h += -d.x, g += d.x), 0 > d.y && (k += -d.y, a += d.y), d.x1 > c && (g -= d.x1 - c), d.y1 > b && (a -= d.y1 - b)) : (d = this.getScalingParameters(l, u, g, a), this.calculateMarkerBounds(b, c, d.scaleFactor * this.baseScaleFactor, n, m)), d = this.getScalingParameters(l, u, g, a), h += n * d.scaleFactor * this.baseScaleFactor, k += m * d.scaleFactor * this.baseScaleFactor) : d = this.getScalingParameters(l, u, g, a);
                /bottom/i.test(f.position) || (k +=
                    f.height);
                this.scaleFactor = d.scaleFactor;
                this.strokeWidth = d.strokeWidth;
                this.translateX = d.translateX + h;
                this.translateY = d.translateY + k
            },
            placeGLegendBlockRight: D.placeGLegendBlockRight,
            placeGLegendBlockBottom: D.placeGLegendBlockBottom,
            placeLegendBlock: function(b, c, d, f, a) {
                var h = b.legend,
                    l = b[qa],
                    k = h.position.toLowerCase(),
                    m = {
                        position: k
                    };
                if ("0" === c.chart.showlegend || l._doNotShowLegend) return m.height = 0, m.width = 0, m;
                "bottom" === k ? (m.height = "gradient" === h.type ? this.placeGLegendBlockBottom(b, c, d, f) : this.placeLegendBlockBottom(b,
                    c, d, f), m.width = 0, a && (h.y = -a)) : (d /= 2, m.width = "gradient" === h.type ? this.placeGLegendBlockRight(b, c, d, f) : this.placeLegendBlockRight(b, c, d, f), m.height = 0);
                return m
            },
            manageTitleSpace: function(b, c, d, f) {
                var a = this.hcJSON;
                b = a.title;
                c = a.chart;
                var a = a.subtitle,
                    h = this.smartLabel,
                    l = f / 2,
                    k = 0,
                    m = b.position.toLowerCase(),
                    n = b.padding,
                    s = !1,
                    v = b.offsetX,
                    q = b.offsetY,
                    w = 0,
                    D = {},
                    r, t;
                if ("" === b.text && "" === a.text) return {
                    height: 0,
                    position: m
                };
                isNaN(v) && isNaN(q) || (s = !0, v = isNaN(v) ? 0 : v, q = isNaN(q) ? 0 : q);
                r = b.text;
                if ("" !== r) {
                    h.setStyle(b.style);
                    t = h.getOriSize(r);
                    if (t.width > d || t.height > l) t = h.getSmartText(r, d, l), b.text = t.text, t.tooltext && (b.originalText = t.tooltext);
                    b.height = w = t.height;
                    k += w
                }
                l -= k;
                r = a.text;
                if ("" !== r) {
                    h.setStyle(a.style);
                    t = h.getOriSize(r);
                    if (t.width > d || t.height > l) t = h.getSmartText(r, d, l), a.text = t.text, t.tooltext && (a.originalText = t.tooltext);
                    k += a.height = t.height
                }
                k = k + n > l ? l : k + n;
                m.match(/left/) ? (a.align = b.align = "start", a.x = b.x = c.marginLeft) : m.match(/right/) ? (a.align = b.align = "end", a.x = b.x = d) : (a.align = b.align = "middle", a.x = b.x = d / 2);
                /bottom/.test(m) ?
                    (d = f - k + c.marginTop + n, b.y = d, a.y = d + w, s ? (b.y += q, a.y += q, b.x += v, a.x += v) : (c.marginBottom += k, D.isBottom = !0)) : s ? (b.y += q, a.y += q, b.x += v, a.x += v) : c.marginTop += k;
                D.height = s ? 0 : k;
                D.position = m;
                return D
            },
            getFirstId: function() {
                return this.firstEntity
            },
            getEntityPaths: function(b) {
                var c = {},
                    d = this.entities,
                    f;
                if (b) {
                    for (f in d) c[f] = d[f];
                    return c
                }
                return d
            },
            redefineEntities: function(b, c) {
                var d = this.entities,
                    f = {},
                    a = {},
                    h = 0,
                    l, k, m, n, s, v, q, w;
                for (q = b.length; q--;)
                    if (l = b[q], k = l.internalid, s = l.newid ? l.newid : k, m = l.sname, l = l.lname, n =
                        d[k], k = D.trimString(k), s = D.trimString(s), n) {
                        f[s] = s = {
                            origId: k
                        };
                        a[k] = !0;
                        for (v in n) s[v] = n[v];
                        s.shortLabel = m ? m : n.shortLabel;
                        s.label = l ? l : n.label
                    }
                this.entities = {};
                for (w in f) f[w].origId = w, this.entities[w.toLowerCase()] = f[w], h += 1;
                for (w in d)
                    if (s = d[w], w = D.trimString(w), !a[w]) {
                        c.useSNameAsId ? (this.entities[s.shortLabel.toLowerCase()] = n = {}, n.origId = s.shortLabel) : (this.entities[w.toLowerCase()] = n = {}, n.origId = w);
                        for (v in s) n[v] = s[v];
                        h += 1
                    }
                this.entityCount = h
            },
            colorPaletteMap: {
                basefontcolor: "foregroundcolor",
                bordercolor: "foregrounddarkcolor",
                borderalpha: "foregrounddarkalpha",
                bgcolor: "backgroundlightcolor",
                bgalpha: "backgroundlightalpha",
                bgangle: "backgroundlightangle",
                bgratio: "backgroundlightratio",
                canvasbordercolor: "foregrounddarkcolor",
                canvasborderalpha: "foregrounddarkalpha",
                canvasbgcolor: "backgroundlightcolor",
                canvasbgalpha: "backgroundlightalpha",
                canvasbgangle: "backgroundlightangle",
                canvasbgratio: "backgroundlightratio",
                tooltipbordercolor: "foregrounddarkcolor",
                tooltipborderalpha: "foregrounddarkalpha",
                tooltipbgcolor: "backgroundlightcolor",
                tooltipbgalpha: "backgroundlightalpha",
                tooltipfontcolor: "foregroundcolor",
                legendbordercolor: "foregrounddarkcolor",
                legendborderalpha: "foregrounddarkalpha",
                markerbordercolor: "foregroundlightcolor",
                markerborderalpha: "foregroundlightalpha",
                markerfillcolor: "backgrounddarkcolor",
                markerfillalpha: "backgrounddarkalpha",
                markerfillangle: "backgrounddarkangle",
                markerfillratio: "backgrounddarkratio",
                plotfillcolor: "backgroundcolor",
                plotfillalpha: "backgroundalpha",
                plotfillangle: "backgroundangle",
                plotfillratio: "backgroundratio",
                plothoverfillcolor: "backgrounddarkcolor",
                plothoverfillalpha: "backgrounddarkalpha",
                plothoverfillangle: "backgrounddarkangle",
                plothoverfillratio: "backgrounddarkratio",
                plotbordercolor: "foregroundcolor",
                plotborderalpha: "foregroundalpha",
                shadow: "shadow"
            },
            eiMethods: {
                getMapName: function() {
                    return this.jsVars.hcObj.logic.name
                },
                getEntityList: function() {
                    var b = this.jsVars.hcObj,
                        b = b.entities && b.entities.items,
                        c, d = [],
                        f, a;
                    for (f in b) a = b[f], c = a.eJSON, d.push({
                        id: a.id,
                        originalId: a.originalId || a.id,
                        label: c.label,
                        shortlabel: c.shortLabel,
                        value: a.value,
                        formattedValue: a.formattedValue,
                        toolText: a.toolText
                    });
                    return d
                },
                getDataAsCSV: function() {
                    var b = this.jsVars,
                        b = b.hcObj && b.hcObj.entities && b.hcObj.entities.items,
                        c = '"Id","Short Name","Long Name","Value","Formatted Value"',
                        d, f, a, h;
                    for (d in b) f = b[d], a = f.eJSON, h = f.value, c += '\r\n"' + f.id + '","' + a.shortLabel + '","' + a.label + '","' + (void 0 === h ? "" : h) + '","' + f.formattedValue + '"';
                    return c
                },
                getMapAttribute: function() {
                    var b = this.jsVars.fcObj;
                    U.raiseWarning(this, "12061210581", "run", "JavaScriptRenderer~getMapAttribute()",
                        'Use of deprecated "getMapAttribute()". Replace with "getChartAttribute()".');
                    return b.getChartAttribute.apply(b, arguments)
                },
                exportMap: function() {
                    var b = this.jsVars.fcObj;
                    U.raiseWarning(this, "12061210581", "run", "JavaScriptRenderer~exportMap()", 'Use of deprecated "exportMap()". Replace with "exportChart()".');
                    return b.exportChart && b.exportChart.apply(b, arguments)
                },
                addMarker: function(b) {
                    this.jsVars.hcObj.markers.addMarkerItem(b) || U.raiseWarning(this, "1309264086", "run", "MapsRenderer~addMarker()", "Failed to add marker. Check the options and try again.")
                },
                updateMarker: function(b, c) {
                    var d = this.jsVars.hcObj,
                        f = d.markers,
                        d = d.mapAnnotations,
                        a;
                    b && (b = (b + "").toLowerCase(), f = f.items[b]) && (a = f.options, F(a, c), f = f.draw().markerShape, d.update(b, f))
                },
                removeMarker: function(b) {
                    var c = this.jsVars.hcObj.markers,
                        d;
                    b && (b = (b + "").toLowerCase(), (d = c.items[b]) && d.destroy(), delete c.items[b])
                }
            }
        }, X.linebase);
        X("renderer.maps", {
            drawGraph: function() {
                var b = this,
                    c = b.logic.chartInstance,
                    d = b.paper,
                    f = b.layers,
                    a, h, l;
                b.options.nativeMessage || (f.dataset || (f.dataset = d.group("dataset").insertAfter(f.background),
                    f.tracker = d.group("hot").insertAfter(f.dataset)), b.shadowLayer || (b.shadowLayer = f.shadow = d.group("shadow").insertBefore(f.dataset)), wa || (f.dataset && f.dataset.hide(), f.shadow && f.shadow.hide()), b.strokeWidth = b.logic.strokeWidth, a = b.logic.scaleFactor, b.translateX = h = b.logic.translateX, b.translateY = l = b.logic.translateY, b.sFactor = a * b.logic.baseScaleFactor, b.transformStr = ["t", h, ",", l, "s", a, ",", a, ",0,0"].join(""), b.options.tooltip && !1 !== b.options.tooltip.enabled && d.tooltip(b.options.tooltip.style, b.options.tooltip.shadow,
                    b.options.tooltip.constrain), b.mapAnnotations = new D.Annotations, b.mapAnnotations.reset(null, {
                    id: "geo",
                    showbelow: 0,
                    autoscale: 0,
                    grpxshift: b.translateX ? b.translateX : 0,
                    grpyshift: b.translateY ? b.translateY : 0,
                    xscale: 100 * (b.sFactor ? b.sFactor : 1),
                    yscale: 100 * (b.sFactor ? b.sFactor : 1),
                    options: {
                        useTracker: !0
                    }
                }), b.processEntityDefs(), b.drawEntities(), c.addEventListener("internal.mapdrawingcomplete", function(a) {
                    a.detachHandler();
                    wa ? (f.dataset && f.dataset.attr({
                            transform: b.transformStr
                        }), f.shadow && f.shadow.attr({
                            transform: b.transformStr
                        })) :
                        (f.dataset && f.dataset.show(), f.shadow && f.shadow.show())
                }), b.drawMarkers())
            },
            setScaleRange: function(b, c) {
                for (var d = this.options.series, f = d.length, a, h, l, k; f--;)
                    if (l = d[f], h = (a = l.data) && a.length)
                        if (l.rangeMin >= b && l.rangeMax <= c) l.setVisible(!0);
                        else if (l.rangeMax < b || l.rangeMin > c) l.setVisible(!1);
                else
                    for (; h--;) l = (k = a[h].mapItem) && k.value, isNaN(l) || "" === l || (l >= b && l <= c ? k.show() : k.hide())
            },
            processEntityDefs: function() {
                var b = this.logic,
                    c = this.options.series,
                    d = c && c.length;
                for (b.redefineEntities(b.dataObj.entitydef || [], this.options.entitydef); d--;) c[d].chart = this
            },
            drawEntities: function() {
                this.entities = new n(this.logic && this.logic.dataObj && this.logic.dataObj.data, this, this.logic, this.layers.dataset)
            },
            drawMarkers: function() {
                var b = this.logic && this.logic.dataObj && this.logic.dataObj.markers || null;
                b && (this.markers = new v(b, this, this.group));
                this.options.entities.labelsOnTop || this.entities.drawLabels()
            },
            checkComplete: function() {
                var b = this.logic,
                    c = b.chartInstance;
                this.entities && this.entities.isReady() && (this.mapAnnotations.draw(this),
                    b.hasRendered = !0, U.raiseEvent("internal.mapdrawingcomplete", {
                        renderer: this
                    }, c))
            }
        }, X["renderer.root"])
    },
    [3, 2, 0, "release"]
]);