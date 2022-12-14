/**
 *
 # 头脑吃鸡
 ## 配置 (Surge)
 [MITM]
 tncj.hortorgames.com

 [Script]
 http-response ^https://tncj.hortorgames.com/chicken/fight/(answer|findQuiz) requires-body=1,max-size=0,script-path=https://raw.githubusercontents.com/chavyleung/scripts/master/tncj/tncj.min.js、

 ## 配置 (QuanX)
 [MITM]
 tncj.hortorgames.com

 [rewrite_local]
 ^https://tncj.hortorgames.com/chicken/fight/(answer|findQuiz) url script-response-body tncj.min.js

 ## 感谢
 [@LeeeMooo](https://github.com/LeeeMooo)
 */
// prettier-ignore
function encrypt(t) {
    const e = "6c805e193867e3b9";
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(t)), CryptoJS.enc.Utf8.parse(e), {
        iv: CryptoJS.enc.Utf8.parse(e),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
}

function decrypt(t) {
    const e = "6c805e193867e3b9";
    return JSON.parse(CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(t)), CryptoJS.enc.Utf8.parse(e), {
        iv: CryptoJS.enc.Utf8.parse(e),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8).toString())
}

function init() {
    return isSurge = (() = > void 0 !== this.$httpClient
),
    isQuanX = (() = > void 0 !== this.$task
),
    getdata = (t = > isSurge() ? $persistentStore.read(t) : isQuanX() ? $prefs.valueForKey(t) : void 0
),
    setdata = ((t, e) = > isSurge() ? $persistentStore.write(t, e) : isQuanX() ? $prefs.setValueForKey(t, e) : void 0
),
    msg = ((t, e, r) = > {
        isSurge() && $notification.post(t, e, r),
    isQuanX() && $notify(t, e, r)
}),
    log = (t = > console.log(t)
),
    get = ((t, e) = > {
        isSurge() && $httpClient.get(t, e),
    isQuanX() && (t.method = "GET", $task.fetch(t).then(t = > e(null, {},
        t.body))
)
}),
    post = ((t, e) = > {
        isSurge() && $httpClient.post(t, e),
    isQuanX() && (t.method = "POST", $task.fetch(t).then(t = > e(null, {},
        t.body))
)
}),
    done = ((t = {}) = > {
        $done(t)
    }
),
    {
        isSurge: isSurge,
            isQuanX
    :
        isQuanX,
            msg
    :
        msg,
            log
    :
        log,
            getdata
    :
        getdata,
            setdata
    :
        setdata,
            get
    :
        get,
            post
    :
        post,
            done
    :
        done
    }
}

!
    function (t, e) {
        "object" == typeof exports ? module.exports = exports = e() : "function" == typeof define && define.amd ? define([], e) : t.CryptoJS = e()
    }(this,
        function () {
            var t, e, r, i, n, o, s, a = a ||
                function (t, e) {
                    var r = Object.create ||
                        function () {
                            function t() {
                            }

                            return function (e) {
                                var r;
                                return t.prototype = e,
                                    r = new t,
                                    t.prototype = null,
                                    r
                            }
                        }(),
                        i = {},
                        n = i.lib = {},
                        o = n.Base = {
                            extend: function (t) {
                                var e = r(this);
                                return t && e.mixIn(t),
                                e.hasOwnProperty("init") && this.init !== e.init || (e.init = function () {
                                    e.$super.init.apply(this, arguments)
                                }),
                                    e.init.prototype = e,
                                    e.$super = this,
                                    e
                            },
                            create: function () {
                                var t = this.extend();
                                return t.init.apply(t, arguments),
                                    t
                            },
                            init: function () {
                            },
                            mixIn: function (t) {
                                for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                                t.hasOwnProperty("toString") && (this.toString = t.toString)
                            },
                            clone: function () {
                                return this.init.prototype.extend(this)
                            }
                        },
                        s = n.WordArray = o.extend({
                            init: function (t, r) {
                                t = this.words = t || [],
                                    this.sigBytes = r != e ? r : 4 * t.length
                            },
                            toString: function (t) {
                                return (t || c).stringify(this)
                            },
                            concat: function (t) {
                                var e = this.words,
                                    r = t.words,
                                    i = this.sigBytes,
                                    n = t.sigBytes;
                                if (this.clamp(), i % 4) for (var o = 0; o < n; o++) {
                                    var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                    e[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8
                                } else for (o = 0; o < n; o += 4) e[i + o >>> 2] = r[o >>> 2];
                                return this.sigBytes += n,
                                    this
                            },
                            clamp: function () {
                                var e = this.words,
                                    r = this.sigBytes;
                                e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8,
                                    e.length = t.ceil(r / 4)
                            },
                            clone: function () {
                                var t = o.clone.call(this);
                                return t.words = this.words.slice(0),
                                    t
                            },
                            random: function (e) {
                                for (var r, i = [], n = function (e) {
                                        e = e;
                                        var r = 987654321,
                                            i = 4294967295;
                                        return function () {
                                            r = 36969 * (65535 & r) + (r >> 16) & i,
                                                e = 18e3 * (65535 & e) + (e >> 16) & i;
                                            var n = (r << 16) + e & i;
                                            return n /= 4294967296,
                                                n += .5,
                                            n * (t.random() > .5 ? 1 : -1)
                                        }
                                    },
                                         o = 0; o < e; o += 4) {
                                    var a = n(4294967296 * (r || t.random()));
                                    r = 987654071 * a(),
                                        i.push(4294967296 * a() | 0)
                                }
                                return new s.init(i, e)
                            }
                        }),
                        a = i.enc = {},
                        c = a.Hex = {
                            stringify: function (t) {
                                for (var e = t.words,
                                         r = t.sigBytes,
                                         i = [], n = 0; n < r; n++) {
                                    var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                    i.push((o >>> 4).toString(16)),
                                        i.push((15 & o).toString(16))
                                }
                                return i.join("")
                            },
                            parse: function (t) {
                                for (var e = t.length,
                                         r = [], i = 0; i < e; i += 2) r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
                                return new s.init(r, e / 2)
                            }
                        },
                        h = a.Latin1 = {
                            stringify: function (t) {
                                for (var e = t.words,
                                         r = t.sigBytes,
                                         i = [], n = 0; n < r; n++) {
                                    var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                    i.push(String.fromCharCode(o))
                                }
                                return i.join("")
                            },
                            parse: function (t) {
                                for (var e = t.length,
                                         r = [], i = 0; i < e; i++) r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
                                return new s.init(r, e)
                            }
                        },
                        l = a.Utf8 = {
                            stringify: function (t) {
                                try {
                                    return decodeURIComponent(escape(h.stringify(t)))
                                } catch (t) {
                                    throw new Error("Malformed UTF-8 data")
                                }
                            },
                            parse: function (t) {
                                return h.parse(unescape(encodeURIComponent(t)))
                            }
                        },
                        f = n.BufferedBlockAlgorithm = o.extend({
                            reset: function () {
                                this._data = new s.init,
                                    this._nDataBytes = 0
                            },
                            _append: function (t) {
                                "string" == typeof t && (t = l.parse(t)),
                                    this._data.concat(t),
                                    this._nDataBytes += t.sigBytes
                            },
                            _process: function (e) {
                                var r = this._data,
                                    i = r.words,
                                    n = r.sigBytes,
                                    o = this.blockSize,
                                    a = 4 * o,
                                    c = n / a;
                                c = e ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0);
                                var h = c * o,
                                    l = t.min(4 * h, n);
                                if (h) {
                                    for (var f = 0; f < h; f += o) this._doProcessBlock(i, f);
                                    var u = i.splice(0, h);
                                    r.sigBytes -= l
                                }
                                return new s.init(u, l)
                            },
                            clone: function () {
                                var t = o.clone.call(this);
                                return t._data = this._data.clone(),
                                    t
                            },
                            _minBufferSize: 0
                        }),
                        u = (n.Hasher = f.extend({
                            cfg: o.extend(),
                            init: function (t) {
                                this.cfg = this.cfg.extend(t),
                                    this.reset()
                            },
                            reset: function () {
                                f.reset.call(this),
                                    this._doReset()
                            },
                            update: function (t) {
                                return this._append(t),
                                    this._process(),
                                    this
                            },
                            finalize: function (t) {
                                t && this._append(t);
                                var e = this._doFinalize();
                                return e
                            },
                            blockSize: 16,
                            _createHelper: function (t) {
                                return function (e, r) {
                                    return new t.init(r).finalize(e)
                                }
                            },
                            _createHmacHelper: function (t) {
                                return function (e, r) {
                                    return new u.HMAC.init(t, r).finalize(e)
                                }
                            }
                        }), i.algo = {});
                    return i
                }(Math);
            return function () {
                function t(t, e, r) {
                    for (var n = [], o = 0, s = 0; s < e; s++) if (s % 4) {
                        var a = r[t.charCodeAt(s - 1)] << s % 4 * 2,
                            c = r[t.charCodeAt(s)] >>> 6 - s % 4 * 2;
                        n[o >>> 2] |= (a | c) << 24 - o % 4 * 8,
                            o++
                    }
                    return i.create(n, o)
                }

                var e = a,
                    r = e.lib,
                    i = r.WordArray,
                    n = e.enc;
                n.Base64 = {
                    stringify: function (t) {
                        var e = t.words,
                            r = t.sigBytes,
                            i = this._map;
                        t.clamp();
                        for (var n = [], o = 0; o < r; o += 3) for (var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255, a = e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, h = s << 16 | a << 8 | c, l = 0; l < 4 && o + .75 * l < r; l++) n.push(i.charAt(h >>> 6 * (3 - l) & 63));
                        var f = i.charAt(64);
                        if (f) for (; n.length % 4;) n.push(f);
                        return n.join("")
                    },
                    parse: function (e) {
                        var r = e.length,
                            i = this._map,
                            n = this._reverseMap;
                        if (!n) {
                            n = this._reverseMap = [];
                            for (var o = 0; o < i.length; o++) n[i.charCodeAt(o)] = o
                        }
                        var s = i.charAt(64);
                        if (s) {
                            var a = e.indexOf(s);
                            -1 !== a && (r = a)
                        }
                        return t(e, r, n)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                }
            }(),
                function (t) {
                    function e(t, e, r, i, n, o, s) {
                        var a = t + (e & r | ~e & i) + n + s;
                        return (a << o | a >>> 32 - o) + e
                    }

                    function r(t, e, r, i, n, o, s) {
                        var a = t + (e & i | r & ~i) + n + s;
                        return (a << o | a >>> 32 - o) + e
                    }

                    function i(t, e, r, i, n, o, s) {
                        var a = t + (e ^ r ^ i) + n + s;
                        return (a << o | a >>> 32 - o) + e
                    }

                    function n(t, e, r, i, n, o, s) {
                        var a = t + (r ^ (e | ~i)) + n + s;
                        return (a << o | a >>> 32 - o) + e
                    }

                    var o = a,
                        s = o.lib,
                        c = s.WordArray,
                        h = s.Hasher,
                        l = o.algo,
                        f = [];
                    !
                        function () {
                            for (var e = 0; e < 64; e++) f[e] = 4294967296 * t.abs(t.sin(e + 1)) | 0
                        }();
                    var u = l.MD5 = h.extend({
                        _doReset: function () {
                            this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
                        },
                        _doProcessBlock: function (t, o) {
                            for (var s = 0; s < 16; s++) {
                                var a = o + s,
                                    c = t[a];
                                t[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                            }
                            var h = this._hash.words,
                                l = t[o + 0],
                                u = t[o + 1],
                                d = t[o + 2],
                                p = t[o + 3],
                                v = t[o + 4],
                                _ = t[o + 5],
                                y = t[o + 6],
                                g = t[o + 7],
                                B = t[o + 8],
                                k = t[o + 9],
                                w = t[o + 10],
                                S = t[o + 11],
                                m = t[o + 12],
                                x = t[o + 13],
                                b = t[o + 14],
                                C = t[o + 15],
                                z = h[0],
                                H = h[1],
                                A = h[2],
                                D = h[3];
                            z = e(z, H, A, D, l, 7, f[0]),
                                D = e(D, z, H, A, u, 12, f[1]),
                                A = e(A, D, z, H, d, 17, f[2]),
                                H = e(H, A, D, z, p, 22, f[3]),
                                z = e(z, H, A, D, v, 7, f[4]),
                                D = e(D, z, H, A, _, 12, f[5]),
                                A = e(A, D, z, H, y, 17, f[6]),
                                H = e(H, A, D, z, g, 22, f[7]),
                                z = e(z, H, A, D, B, 7, f[8]),
                                D = e(D, z, H, A, k, 12, f[9]),
                                A = e(A, D, z, H, w, 17, f[10]),
                                H = e(H, A, D, z, S, 22, f[11]),
                                z = e(z, H, A, D, m, 7, f[12]),
                                D = e(D, z, H, A, x, 12, f[13]),
                                A = e(A, D, z, H, b, 17, f[14]),
                                H = e(H, A, D, z, C, 22, f[15]),
                                z = r(z, H, A, D, u, 5, f[16]),
                                D = r(D, z, H, A, y, 9, f[17]),
                                A = r(A, D, z, H, S, 14, f[18]),
                                H = r(H, A, D, z, l, 20, f[19]),
                                z = r(z, H, A, D, _, 5, f[20]),
                                D = r(D, z, H, A, w, 9, f[21]),
                                A = r(A, D, z, H, C, 14, f[22]),
                                H = r(H, A, D, z, v, 20, f[23]),
                                z = r(z, H, A, D, k, 5, f[24]),
                                D = r(D, z, H, A, b, 9, f[25]),
                                A = r(A, D, z, H, p, 14, f[26]),
                                H = r(H, A, D, z, B, 20, f[27]),
                                z = r(z, H, A, D, x, 5, f[28]),
                                D = r(D, z, H, A, d, 9, f[29]),
                                A = r(A, D, z, H, g, 14, f[30]),
                                H = r(H, A, D, z, m, 20, f[31]),
                                z = i(z, H, A, D, _, 4, f[32]),
                                D = i(D, z, H, A, B, 11, f[33]),
                                A = i(A, D, z, H, S, 16, f[34]),
                                H = i(H, A, D, z, b, 23, f[35]),
                                z = i(z, H, A, D, u, 4, f[36]),
                                D = i(D, z, H, A, v, 11, f[37]),
                                A = i(A, D, z, H, g, 16, f[38]),
                                H = i(H, A, D, z, w, 23, f[39]),
                                z = i(z, H, A, D, x, 4, f[40]),
                                D = i(D, z, H, A, l, 11, f[41]),
                                A = i(A, D, z, H, p, 16, f[42]),
                                H = i(H, A, D, z, y, 23, f[43]),
                                z = i(z, H, A, D, k, 4, f[44]),
                                D = i(D, z, H, A, m, 11, f[45]),
                                A = i(A, D, z, H, C, 16, f[46]),
                                H = i(H, A, D, z, d, 23, f[47]),
                                z = n(z, H, A, D, l, 6, f[48]),
                                D = n(D, z, H, A, g, 10, f[49]),
                                A = n(A, D, z, H, b, 15, f[50]),
                                H = n(H, A, D, z, _, 21, f[51]),
                                z = n(z, H, A, D, m, 6, f[52]),
                                D = n(D, z, H, A, p, 10, f[53]),
                                A = n(A, D, z, H, w, 15, f[54]),
                                H = n(H, A, D, z, u, 21, f[55]),
                                z = n(z, H, A, D, B, 6, f[56]),
                                D = n(D, z, H, A, C, 10, f[57]),
                                A = n(A, D, z, H, y, 15, f[58]),
                                H = n(H, A, D, z, x, 21, f[59]),
                                z = n(z, H, A, D, v, 6, f[60]),
                                D = n(D, z, H, A, S, 10, f[61]),
                                A = n(A, D, z, H, d, 15, f[62]),
                                H = n(H, A, D, z, k, 21, f[63]),
                                h[0] = h[0] + z | 0,
                                h[1] = h[1] + H | 0,
                                h[2] = h[2] + A | 0,
                                h[3] = h[3] + D | 0
                        },
                        _doFinalize: function () {
                            var e = this._data,
                                r = e.words,
                                i = 8 * this._nDataBytes,
                                n = 8 * e.sigBytes;
                            r[n >>> 5] |= 128 << 24 - n % 32;
                            var o = t.floor(i / 4294967296),
                                s = i;
                            r[15 + (n + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
                                r[14 + (n + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8),
                                e.sigBytes = 4 * (r.length + 1),
                                this._process();
                            for (var a = this._hash,
                                     c = a.words,
                                     h = 0; h < 4; h++) {
                                var l = c[h];
                                c[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                            }
                            return a
                        },
                        clone: function () {
                            var t = h.clone.call(this);
                            return t._hash = this._hash.clone(),
                                t
                        }
                    });
                    o.MD5 = h._createHelper(u),
                        o.HmacMD5 = h._createHmacHelper(u)
                }(Math),
                t = a,
                e = t.lib,
                r = e.WordArray,
                i = e.Hasher,
                n = t.algo,
                o = [],
                s = n.SHA1 = i.extend({
                    _doReset: function () {
                        this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function (t, e) {
                        for (var r = this._hash.words,
                                 i = r[0], n = r[1], s = r[2], a = r[3], c = r[4], h = 0; h < 80; h++) {
                            if (h < 16) o[h] = 0 | t[e + h];
                            else {
                                var l = o[h - 3] ^ o[h - 8] ^ o[h - 14] ^ o[h - 16];
                                o[h] = l << 1 | l >>> 31
                            }
                            var f = (i << 5 | i >>> 27) + c + o[h];
                            f += h < 20 ? 1518500249 + (n & s | ~n & a) : h < 40 ? 1859775393 + (n ^ s ^ a) : h < 60 ? (n & s | n & a | s & a) - 1894007588 : (n ^ s ^ a) - 899497514,
                                c = a,
                                a = s,
                                s = n << 30 | n >>> 2,
                                n = i,
                                i = f
                        }
                        r[0] = r[0] + i | 0,
                            r[1] = r[1] + n | 0,
                            r[2] = r[2] + s | 0,
                            r[3] = r[3] + a | 0,
                            r[4] = r[4] + c | 0
                    },
                    _doFinalize: function () {
                        var t = this._data,
                            e = t.words,
                            r = 8 * this._nDataBytes,
                            i = 8 * t.sigBytes;
                        return e[i >>> 5] |= 128 << 24 - i % 32,
                            e[14 + (i + 64 >>> 9 << 4)] = Math.floor(r / 4294967296),
                            e[15 + (i + 64 >>> 9 << 4)] = r,
                            t.sigBytes = 4 * e.length,
                            this._process(),
                            this._hash
                    },
                    clone: function () {
                        var t = i.clone.call(this);
                        return t._hash = this._hash.clone(),
                            t
                    }
                }),
                t.SHA1 = i._createHelper(s),
                t.HmacSHA1 = i._createHmacHelper(s),
                function (t) {
                    var e = a,
                        r = e.lib,
                        i = r.WordArray,
                        n = r.Hasher,
                        o = e.algo,
                        s = [],
                        c = [];
                    !
                        function () {
                            function e(e) {
                                for (var r = t.sqrt(e), i = 2; i <= r; i++) if (!(e % i)) return !1;
                                return !0
                            }

                            function r(t) {
                                return 4294967296 * (t - (0 | t)) | 0
                            }

                            for (var i = 2,
                                     n = 0; n < 64;) e(i) && (n < 8 && (s[n] = r(t.pow(i, .5))), c[n] = r(t.pow(i, 1 / 3)), n++),
                                i++
                        }();
                    var h = [],
                        l = o.SHA256 = n.extend({
                            _doReset: function () {
                                this._hash = new i.init(s.slice(0))
                            },
                            _doProcessBlock: function (t, e) {
                                for (var r = this._hash.words,
                                         i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], l = r[5], f = r[6], u = r[7], d = 0; d < 64; d++) {
                                    if (d < 16) h[d] = 0 | t[e + d];
                                    else {
                                        var p = h[d - 15],
                                            v = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3,
                                            _ = h[d - 2],
                                            y = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10;
                                        h[d] = v + h[d - 7] + y + h[d - 16]
                                    }
                                    var g = a & l ^ ~a & f,
                                        B = i & n ^ i & o ^ n & o,
                                        k = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22),
                                        w = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25),
                                        S = u + w + g + c[d] + h[d],
                                        m = k + B;
                                    u = f,
                                        f = l,
                                        l = a,
                                        a = s + S | 0,
                                        s = o,
                                        o = n,
                                        n = i,
                                        i = S + m | 0
                                }
                                r[0] = r[0] + i | 0,
                                    r[1] = r[1] + n | 0,
                                    r[2] = r[2] + o | 0,
                                    r[3] = r[3] + s | 0,
                                    r[4] = r[4] + a | 0,
                                    r[5] = r[5] + l | 0,
                                    r[6] = r[6] + f | 0,
                                    r[7] = r[7] + u | 0
                            },
                            _doFinalize: function () {
                                var e = this._data,
                                    r = e.words,
                                    i = 8 * this._nDataBytes,
                                    n = 8 * e.sigBytes;
                                return r[n >>> 5] |= 128 << 24 - n % 32,
                                    r[14 + (n + 64 >>> 9 << 4)] = t.floor(i / 4294967296),
                                    r[15 + (n + 64 >>> 9 << 4)] = i,
                                    e.sigBytes = 4 * r.length,
                                    this._process(),
                                    this._hash
                            },
                            clone: function () {
                                var t = n.clone.call(this);
                                return t._hash = this._hash.clone(),
                                    t
                            }
                        });
                    e.SHA256 = n._createHelper(l),
                        e.HmacSHA256 = n._createHmacHelper(l)
                }(Math),
                function () {
                    function t(t) {
                        return t << 8 & 4278255360 | t >>> 8 & 16711935
                    }

                    var e = a,
                        r = e.lib,
                        i = r.WordArray,
                        n = e.enc;
                    n.Utf16 = n.Utf16BE = {
                        stringify: function (t) {
                            for (var e = t.words,
                                     r = t.sigBytes,
                                     i = [], n = 0; n < r; n += 2) {
                                var o = e[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                                i.push(String.fromCharCode(o))
                            }
                            return i.join("")
                        },
                        parse: function (t) {
                            for (var e = t.length,
                                     r = [], n = 0; n < e; n++) r[n >>> 1] |= t.charCodeAt(n) << 16 - n % 2 * 16;
                            return i.create(r, 2 * e)
                        }
                    },
                        n.Utf16LE = {
                            stringify: function (e) {
                                for (var r = e.words,
                                         i = e.sigBytes,
                                         n = [], o = 0; o < i; o += 2) {
                                    var s = t(r[o >>> 2] >>> 16 - o % 4 * 8 & 65535);
                                    n.push(String.fromCharCode(s))
                                }
                                return n.join("")
                            },
                            parse: function (e) {
                                for (var r = e.length,
                                         n = [], o = 0; o < r; o++) n[o >>> 1] |= t(e.charCodeAt(o) << 16 - o % 2 * 16);
                                return i.create(n, 2 * r)
                            }
                        }
                }(),
                function () {
                    if ("function" == typeof ArrayBuffer) {
                        var t = a,
                            e = t.lib,
                            r = e.WordArray,
                            i = r.init,
                            n = r.init = function (t) {
                                if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) {
                                    for (var e = t.byteLength,
                                             r = [], n = 0; n < e; n++) r[n >>> 2] |= t[n] << 24 - n % 4 * 8;
                                    i.call(this, r, e)
                                } else i.apply(this, arguments)
                            };
                        n.prototype = r
                    }
                }(),
                function (t) {
                    function e(t, e, r) {
                        return t ^ e ^ r
                    }

                    function r(t, e, r) {
                        return t & e | ~t & r
                    }

                    function i(t, e, r) {
                        return (t | ~e) ^ r
                    }

                    function n(t, e, r) {
                        return t & r | e & ~r
                    }

                    function o(t, e, r) {
                        return t ^ (e | ~r)
                    }

                    function s(t, e) {
                        return t << e | t >>> 32 - e
                    }

                    var c = a,
                        h = c.lib,
                        l = h.WordArray,
                        f = h.Hasher,
                        u = c.algo,
                        d = l.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
                        p = l.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
                        v = l.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
                        _ = l.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
                        y = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                        g = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
                        B = u.RIPEMD160 = f.extend({
                            _doReset: function () {
                                this._hash = l.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                            },
                            _doProcessBlock: function (t, a) {
                                for (var c = 0; c < 16; c++) {
                                    var h = a + c,
                                        l = t[h];
                                    t[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                                }
                                var f, u, B, k, w, S, m, x, b, C, z = this._hash.words,
                                    H = y.words,
                                    A = g.words,
                                    D = d.words,
                                    E = p.words,
                                    R = v.words,
                                    M = _.words;
                                S = f = z[0],
                                    m = u = z[1],
                                    x = B = z[2],
                                    b = k = z[3],
                                    C = w = z[4];
                                var F;
                                for (c = 0; c < 80; c += 1) F = f + t[a + D[c]] | 0,
                                    F += c < 16 ? e(u, B, k) + H[0] : c < 32 ? r(u, B, k) + H[1] : c < 48 ? i(u, B, k) + H[2] : c < 64 ? n(u, B, k) + H[3] : o(u, B, k) + H[4],
                                    F |= 0,
                                    F = s(F, R[c]),
                                    F = F + w | 0,
                                    f = w,
                                    w = k,
                                    k = s(B, 10),
                                    B = u,
                                    u = F,
                                    F = S + t[a + E[c]] | 0,
                                    F += c < 16 ? o(m, x, b) + A[0] : c < 32 ? n(m, x, b) + A[1] : c < 48 ? i(m, x, b) + A[2] : c < 64 ? r(m, x, b) + A[3] : e(m, x, b) + A[4],
                                    F |= 0,
                                    F = s(F, M[c]),
                                    F = F + C | 0,
                                    S = C,
                                    C = b,
                                    b = s(x, 10),
                                    x = m,
                                    m = F;
                                F = z[1] + B + b | 0,
                                    z[1] = z[2] + k + C | 0,
                                    z[2] = z[3] + w + S | 0,
                                    z[3] = z[4] + f + m | 0,
                                    z[4] = z[0] + u + x | 0,
                                    z[0] = F
                            },
                            _doFinalize: function () {
                                var t = this._data,
                                    e = t.words,
                                    r = 8 * this._nDataBytes,
                                    i = 8 * t.sigBytes;
                                e[i >>> 5] |= 128 << 24 - i % 32,
                                    e[14 + (i + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                                    t.sigBytes = 4 * (e.length + 1),
                                    this._process();
                                for (var n = this._hash,
                                         o = n.words,
                                         s = 0; s < 5; s++) {
                                    var a = o[s];
                                    o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
                                }
                                return n
                            },
                            clone: function () {
                                var t = f.clone.call(this);
                                return t._hash = this._hash.clone(),
                                    t
                            }
                        });
                    c.RIPEMD160 = f._createHelper(B),
                        c.HmacRIPEMD160 = f._createHmacHelper(B)
                }(Math),
                function () {
                    var t = a,
                        e = t.lib,
                        r = e.Base,
                        i = t.enc,
                        n = i.Utf8,
                        o = t.algo;
                    o.HMAC = r.extend({
                        init: function (t, e) {
                            t = this._hasher = new t.init,
                            "string" == typeof e && (e = n.parse(e));
                            var r = t.blockSize,
                                i = 4 * r;
                            e.sigBytes > i && (e = t.finalize(e)),
                                e.clamp();
                            for (var o = this._oKey = e.clone(), s = this._iKey = e.clone(), a = o.words, c = s.words, h = 0; h < r; h++) a[h] ^= 1549556828,
                                c[h] ^= 909522486;
                            o.sigBytes = s.sigBytes = i,
                                this.reset()
                        },
                        reset: function () {
                            var t = this._hasher;
                            t.reset(),
                                t.update(this._iKey)
                        },
                        update: function (t) {
                            return this._hasher.update(t),
                                this
                        },
                        finalize: function (t) {
                            var e = this._hasher,
                                r = e.finalize(t);
                            e.reset();
                            var i = e.finalize(this._oKey.clone().concat(r));
                            return i
                        }
                    })
                }(),
                function () {
                    var t = a,
                        e = t.lib,
                        r = e.Base,
                        i = e.WordArray,
                        n = t.algo,
                        o = n.SHA1,
                        s = n.HMAC,
                        c = n.PBKDF2 = r.extend({
                            cfg: r.extend({
                                keySize: 4,
                                hasher: o,
                                iterations: 1
                            }),
                            init: function (t) {
                                this.cfg = this.cfg.extend(t)
                            },
                            compute: function (t, e) {
                                for (var r = this.cfg,
                                         n = s.create(r.hasher, t), o = i.create(), a = i.create([1]), c = o.words, h = a.words, l = r.keySize, f = r.iterations; c.length < l;) {
                                    var u = n.update(e).finalize(a);
                                    n.reset();
                                    for (var d = u.words,
                                             p = d.length,
                                             v = u,
                                             _ = 1; _ < f; _++) {
                                        v = n.finalize(v),
                                            n.reset();
                                        for (var y = v.words,
                                                 g = 0; g < p; g++) d[g] ^= y[g]
                                    }
                                    o.concat(u),
                                        h[0]++
                                }
                                return o.sigBytes = 4 * l,
                                    o
                            }
                        });
                    t.PBKDF2 = function (t, e, r) {
                        return c.create(r).compute(t, e)
                    }
                }(),
                function () {
                    var t = a,
                        e = t.lib,
                        r = e.Base,
                        i = e.WordArray,
                        n = t.algo,
                        o = n.MD5,
                        s = n.EvpKDF = r.extend({
                            cfg: r.extend({
                                keySize: 4,
                                hasher: o,
                                iterations: 1
                            }),
                            init: function (t) {
                                this.cfg = this.cfg.extend(t)
                            },
                            compute: function (t, e) {
                                for (var r = this.cfg,
                                         n = r.hasher.create(), o = i.create(), s = o.words, a = r.keySize, c = r.iterations; s.length < a;) {
                                    h && n.update(h);
                                    var h = n.update(t).finalize(e);
                                    n.reset();
                                    for (var l = 1; l < c; l++) h = n.finalize(h),
                                        n.reset();
                                    o.concat(h)
                                }
                                return o.sigBytes = 4 * a,
                                    o
                            }
                        });
                    t.EvpKDF = function (t, e, r) {
                        return s.create(r).compute(t, e)
                    }
                }(),
                function () {
                    var t = a,
                        e = t.lib,
                        r = e.WordArray,
                        i = t.algo,
                        n = i.SHA256,
                        o = i.SHA224 = n.extend({
                            _doReset: function () {
                                this._hash = new r.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                            },
                            _doFinalize: function () {
                                var t = n._doFinalize.call(this);
                                return t.sigBytes -= 4,
                                    t
                            }
                        });
                    t.SHA224 = n._createHelper(o),
                        t.HmacSHA224 = n._createHmacHelper(o)
                }(),
                function (t) {
                    var e = a,
                        r = e.lib,
                        i = r.Base,
                        n = r.WordArray,
                        o = e.x64 = {};
                    o.Word = i.extend({
                        init: function (t, e) {
                            this.high = t,
                                this.low = e
                        }
                    }),
                        o.WordArray = i.extend({
                            init: function (e, r) {
                                e = this.words = e || [],
                                    this.sigBytes = r != t ? r : 8 * e.length
                            },
                            toX32: function () {
                                for (var t = this.words,
                                         e = t.length,
                                         r = [], i = 0; i < e; i++) {
                                    var o = t[i];
                                    r.push(o.high),
                                        r.push(o.low)
                                }
                                return n.create(r, this.sigBytes)
                            },
                            clone: function () {
                                for (var t = i.clone.call(this), e = t.words = this.words.slice(0), r = e.length, n = 0; n < r; n++) e[n] = e[n].clone();
                                return t
                            }
                        })
                }(),
                function (t) {
                    var e = a,
                        r = e.lib,
                        i = r.WordArray,
                        n = r.Hasher,
                        o = e.x64,
                        s = o.Word,
                        c = e.algo,
                        h = [],
                        l = [],
                        f = [];
                    !
                        function () {
                            for (var t = 1,
                                     e = 0,
                                     r = 0; r < 24; r++) {
                                h[t + 5 * e] = (r + 1) * (r + 2) / 2 % 64;
                                var i = e % 5,
                                    n = (2 * t + 3 * e) % 5;
                                t = i,
                                    e = n
                            }
                            for (t = 0; t < 5; t++) for (e = 0; e < 5; e++) l[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5;
                            for (var o = 1,
                                     a = 0; a < 24; a++) {
                                for (var c = 0,
                                         u = 0,
                                         d = 0; d < 7; d++) {
                                    if (1 & o) {
                                        var p = (1 << d) - 1;
                                        p < 32 ? u ^= 1 << p : c ^= 1 << p - 32
                                    }
                                    128 & o ? o = o << 1 ^ 113 : o <<= 1
                                }
                                f[a] = s.create(c, u)
                            }
                        }();
                    var u = [];
                    !
                        function () {
                            for (var t = 0; t < 25; t++) u[t] = s.create()
                        }();
                    var d = c.SHA3 = n.extend({
                        cfg: n.cfg.extend({
                            outputLength: 512
                        }),
                        _doReset: function () {
                            for (var t = this._state = [], e = 0; e < 25; e++) t[e] = new s.init;
                            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                        },
                        _doProcessBlock: function (t, e) {
                            for (var r = this._state,
                                     i = this.blockSize / 2,
                                     n = 0; n < i; n++) {
                                var o = t[e + 2 * n],
                                    s = t[e + 2 * n + 1];
                                o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
                                    s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);
                                var a = r[n];
                                a.high ^= s,
                                    a.low ^= o
                            }
                            for (var c = 0; c < 24; c++) {
                                for (var d = 0; d < 5; d++) {
                                    for (var p = 0,
                                             v = 0,
                                             _ = 0; _ < 5; _++) {
                                        a = r[d + 5 * _];
                                        p ^= a.high,
                                            v ^= a.low
                                    }
                                    var y = u[d];
                                    y.high = p,
                                        y.low = v
                                }
                                for (d = 0; d < 5; d++) {
                                    var g = u[(d + 4) % 5],
                                        B = u[(d + 1) % 5],
                                        k = B.high,
                                        w = B.low;
                                    for (p = g.high ^ (k << 1 | w >>> 31), v = g.low ^ (w << 1 | k >>> 31), _ = 0; _ < 5; _++) {
                                        a = r[d + 5 * _];
                                        a.high ^= p,
                                            a.low ^= v
                                    }
                                }
                                for (var S = 1; S < 25; S++) {
                                    a = r[S];
                                    var m = a.high,
                                        x = a.low,
                                        b = h[S];
                                    if (b < 32) p = m << b | x >>> 32 - b,
                                        v = x << b | m >>> 32 - b;
                                    else p = x << b - 32 | m >>> 64 - b,
                                        v = m << b - 32 | x >>> 64 - b;
                                    var C = u[l[S]];
                                    C.high = p,
                                        C.low = v
                                }
                                var z = u[0],
                                    H = r[0];
                                z.high = H.high,
                                    z.low = H.low;
                                for (d = 0; d < 5; d++) for (_ = 0; _ < 5; _++) {
                                    S = d + 5 * _,
                                        a = r[S];
                                    var A = u[S],
                                        D = u[(d + 1) % 5 + 5 * _],
                                        E = u[(d + 2) % 5 + 5 * _];
                                    a.high = A.high ^ ~D.high & E.high,
                                        a.low = A.low ^ ~D.low & E.low
                                }
                                a = r[0];
                                var R = f[c];
                                a.high ^= R.high,
                                    a.low ^= R.low
                            }
                        },
                        _doFinalize: function () {
                            var e = this._data,
                                r = e.words,
                                n = (this._nDataBytes, 8 * e.sigBytes),
                                o = 32 * this.blockSize;
                            r[n >>> 5] |= 1 << 24 - n % 32,
                                r[(t.ceil((n + 1) / o) * o >>> 5) - 1] |= 128,
                                e.sigBytes = 4 * r.length,
                                this._process();
                            for (var s = this._state,
                                     a = this.cfg.outputLength / 8,
                                     c = a / 8,
                                     h = [], l = 0; l < c; l++) {
                                var f = s[l],
                                    u = f.high,
                                    d = f.low;
                                u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8),
                                    d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8),
                                    h.push(d),
                                    h.push(u)
                            }
                            return new i.init(h, a)
                        },
                        clone: function () {
                            for (var t = n.clone.call(this), e = t._state = this._state.slice(0), r = 0; r < 25; r++) e[r] = e[r].clone();
                            return t
                        }
                    });
                    e.SHA3 = n._createHelper(d),
                        e.HmacSHA3 = n._createHmacHelper(d)
                }(Math),
                function () {
                    function t() {
                        return o.create.apply(o, arguments)
                    }

                    var e = a,
                        r = e.lib,
                        i = r.Hasher,
                        n = e.x64,
                        o = n.Word,
                        s = n.WordArray,
                        c = e.algo,
                        h = [t(1116352408, 3609767458), t(1899447441, 602891725), t(3049323471, 3964484399), t(3921009573, 2173295548), t(961987163, 4081628472), t(1508970993, 3053834265), t(2453635748, 2937671579), t(2870763221, 3664609560), t(3624381080, 2734883394), t(310598401, 1164996542), t(607225278, 1323610764), t(1426881987, 3590304994), t(1925078388, 4068182383), t(2162078206, 991336113), t(2614888103, 633803317), t(3248222580, 3479774868), t(3835390401, 2666613458), t(4022224774, 944711139), t(264347078, 2341262773), t(604807628, 2007800933), t(770255983, 1495990901), t(1249150122, 1856431235), t(1555081692, 3175218132), t(1996064986, 2198950837), t(2554220882, 3999719339), t(2821834349, 766784016), t(2952996808, 2566594879), t(3210313671, 3203337956), t(3336571891, 1034457026), t(3584528711, 2466948901), t(113926993, 3758326383), t(338241895, 168717936), t(666307205, 1188179964), t(773529912, 1546045734), t(1294757372, 1522805485), t(1396182291, 2643833823), t(1695183700, 2343527390), t(1986661051, 1014477480), t(2177026350, 1206759142), t(2456956037, 344077627), t(2730485921, 1290863460), t(2820302411, 3158454273), t(3259730800, 3505952657), t(3345764771, 106217008), t(3516065817, 3606008344), t(3600352804, 1432725776), t(4094571909, 1467031594), t(275423344, 851169720), t(430227734, 3100823752), t(506948616, 1363258195), t(659060556, 3750685593), t(883997877, 3785050280), t(958139571, 3318307427), t(1322822218, 3812723403), t(1537002063, 2003034995), t(1747873779, 3602036899), t(1955562222, 1575990012), t(2024104815, 1125592928), t(2227730452, 2716904306), t(2361852424, 442776044), t(2428436474, 593698344), t(2756734187, 3733110249), t(3204031479, 2999351573), t(3329325298, 3815920427), t(3391569614, 3928383900), t(3515267271, 566280711), t(3940187606, 3454069534), t(4118630271, 4000239992), t(116418474, 1914138554), t(174292421, 2731055270), t(289380356, 3203993006), t(460393269, 320620315), t(685471733, 587496836), t(852142971, 1086792851), t(1017036298, 365543100), t(1126000580, 2618297676), t(1288033470, 3409855158), t(1501505948, 4234509866), t(1607167915, 987167468), t(1816402316, 1246189591)],
                        l = [];
                    !
                        function () {
                            for (var e = 0; e < 80; e++) l[e] = t()
                        }();
                    var f = c.SHA512 = i.extend({
                        _doReset: function () {
                            this._hash = new s.init([new o.init(1779033703, 4089235720), new o.init(3144134277, 2227873595), new o.init(1013904242, 4271175723), new o.init(2773480762, 1595750129), new o.init(1359893119, 2917565137), new o.init(2600822924, 725511199), new o.init(528734635, 4215389547), new o.init(1541459225, 327033209)])
                        },
                        _doProcessBlock: function (t, e) {
                            for (var r = this._hash.words,
                                     i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], c = r[5], f = r[6], u = r[7], d = i.high, p = i.low, v = n.high, _ = n.low, y = o.high, g = o.low, B = s.high, k = s.low, w = a.high, S = a.low, m = c.high, x = c.low, b = f.high, C = f.low, z = u.high, H = u.low, A = d, D = p, E = v, R = _, M = y, F = g, P = B, W = k, O = w, X = S, U = m, J = x, K = b, $ = C, I = z, L = H, j = 0; j < 80; j++) {
                                var Q = l[j];
                                if (j < 16) var N = Q.high = 0 | t[e + 2 * j],
                                    T = Q.low = 0 | t[e + 2 * j + 1];
                                else {
                                    var q = l[j - 15],
                                        Z = q.high,
                                        G = q.low,
                                        V = (Z >>> 1 | G << 31) ^ (Z >>> 8 | G << 24) ^ Z >>> 7,
                                        Y = (G >>> 1 | Z << 31) ^ (G >>> 8 | Z << 24) ^ (G >>> 7 | Z << 25),
                                        tt = l[j - 2],
                                        et = tt.high,
                                        rt = tt.low,
                                        it = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ et >>> 6,
                                        nt = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ (rt >>> 6 | et << 26),
                                        ot = l[j - 7],
                                        st = ot.high,
                                        at = ot.low,
                                        ct = l[j - 16],
                                        ht = ct.high,
                                        lt = ct.low;
                                    T = Y + at,
                                        N = V + st + (T >>> 0 < Y >>> 0 ? 1 : 0),
                                        T = T + nt,
                                        N = N + it + (T >>> 0 < nt >>> 0 ? 1 : 0),
                                        T = T + lt,
                                        N = N + ht + (T >>> 0 < lt >>> 0 ? 1 : 0);
                                    Q.high = N,
                                        Q.low = T
                                }
                                var ft = O & U ^ ~O & K,
                                    ut = X & J ^ ~X & $,
                                    dt = A & E ^ A & M ^ E & M,
                                    pt = D & R ^ D & F ^ R & F,
                                    vt = (A >>> 28 | D << 4) ^ (A << 30 | D >>> 2) ^ (A << 25 | D >>> 7),
                                    _t = (D >>> 28 | A << 4) ^ (D << 30 | A >>> 2) ^ (D << 25 | A >>> 7),
                                    yt = (O >>> 14 | X << 18) ^ (O >>> 18 | X << 14) ^ (O << 23 | X >>> 9),
                                    gt = (X >>> 14 | O << 18) ^ (X >>> 18 | O << 14) ^ (X << 23 | O >>> 9),
                                    Bt = h[j],
                                    kt = Bt.high,
                                    wt = Bt.low,
                                    St = L + gt,
                                    mt = I + yt + (St >>> 0 < L >>> 0 ? 1 : 0),
                                    xt = (St = St + ut, mt = mt + ft + (St >>> 0 < ut >>> 0 ? 1 : 0), St = St + wt, mt = mt + kt + (St >>> 0 < wt >>> 0 ? 1 : 0), St = St + T, mt = mt + N + (St >>> 0 < T >>> 0 ? 1 : 0), _t + pt),
                                    bt = vt + dt + (xt >>> 0 < _t >>> 0 ? 1 : 0);
                                I = K,
                                    L = $,
                                    K = U,
                                    $ = J,
                                    U = O,
                                    J = X,
                                    X = W + St | 0,
                                    O = P + mt + (X >>> 0 < W >>> 0 ? 1 : 0) | 0,
                                    P = M,
                                    W = F,
                                    M = E,
                                    F = R,
                                    E = A,
                                    R = D,
                                    D = St + xt | 0,
                                    A = mt + bt + (D >>> 0 < St >>> 0 ? 1 : 0) | 0
                            }
                            p = i.low = p + D,
                                i.high = d + A + (p >>> 0 < D >>> 0 ? 1 : 0),
                                _ = n.low = _ + R,
                                n.high = v + E + (_ >>> 0 < R >>> 0 ? 1 : 0),
                                g = o.low = g + F,
                                o.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0),
                                k = s.low = k + W,
                                s.high = B + P + (k >>> 0 < W >>> 0 ? 1 : 0),
                                S = a.low = S + X,
                                a.high = w + O + (S >>> 0 < X >>> 0 ? 1 : 0),
                                x = c.low = x + J,
                                c.high = m + U + (x >>> 0 < J >>> 0 ? 1 : 0),
                                C = f.low = C + $,
                                f.high = b + K + (C >>> 0 < $ >>> 0 ? 1 : 0),
                                H = u.low = H + L,
                                u.high = z + I + (H >>> 0 < L >>> 0 ? 1 : 0)
                        },
                        _doFinalize: function () {
                            var t = this._data,
                                e = t.words,
                                r = 8 * this._nDataBytes,
                                i = 8 * t.sigBytes;
                            e[i >>> 5] |= 128 << 24 - i % 32,
                                e[30 + (i + 128 >>> 10 << 5)] = Math.floor(r / 4294967296),
                                e[31 + (i + 128 >>> 10 << 5)] = r,
                                t.sigBytes = 4 * e.length,
                                this._process();
                            var n = this._hash.toX32();
                            return n
                        },
                        clone: function () {
                            var t = i.clone.call(this);
                            return t._hash = this._hash.clone(),
                                t
                        },
                        blockSize: 32
                    });
                    e.SHA512 = i._createHelper(f),
                        e.HmacSHA512 = i._createHmacHelper(f)
                }(),
                function () {
                    var t = a,
                        e = t.x64,
                        r = e.Word,
                        i = e.WordArray,
                        n = t.algo,
                        o = n.SHA512,
                        s = n.SHA384 = o.extend({
                            _doReset: function () {
                                this._hash = new i.init([new r.init(3418070365, 3238371032), new r.init(1654270250, 914150663), new r.init(2438529370, 812702999), new r.init(355462360, 4144912697), new r.init(1731405415, 4290775857), new r.init(2394180231, 1750603025), new r.init(3675008525, 1694076839), new r.init(1203062813, 3204075428)])
                            },
                            _doFinalize: function () {
                                var t = o._doFinalize.call(this);
                                return t.sigBytes -= 16,
                                    t
                            }
                        });
                    t.SHA384 = o._createHelper(s),
                        t.HmacSHA384 = o._createHmacHelper(s)
                }(),
            a.lib.Cipher ||
            function (t) {
                var e = a,
                    r = e.lib,
                    i = r.Base,
                    n = r.WordArray,
                    o = r.BufferedBlockAlgorithm,
                    s = e.enc,
                    c = (s.Utf8, s.Base64),
                    h = e.algo,
                    l = h.EvpKDF,
                    f = r.Cipher = o.extend({
                        cfg: i.extend(),
                        createEncryptor: function (t, e) {
                            return this.create(this._ENC_XFORM_MODE, t, e)
                        },
                        createDecryptor: function (t, e) {
                            return this.create(this._DEC_XFORM_MODE, t, e)
                        },
                        init: function (t, e, r) {
                            this.cfg = this.cfg.extend(r),
                                this._xformMode = t,
                                this._key = e,
                                this.reset()
                        },
                        reset: function () {
                            o.reset.call(this),
                                this._doReset()
                        },
                        process: function (t) {
                            return this._append(t),
                                this._process()
                        },
                        finalize: function (t) {
                            t && this._append(t);
                            var e = this._doFinalize();
                            return e
                        },
                        keySize: 4,
                        ivSize: 4,
                        _ENC_XFORM_MODE: 1,
                        _DEC_XFORM_MODE: 2,
                        _createHelper: function () {
                            function t(t) {
                                return "string" == typeof t ? m : k
                            }

                            return function (e) {
                                return {
                                    encrypt: function (r, i, n) {
                                        return t(i).encrypt(e, r, i, n)
                                    },
                                    decrypt: function (r, i, n) {
                                        return t(i).decrypt(e, r, i, n)
                                    }
                                }
                            }
                        }()
                    }),
                    u = (r.StreamCipher = f.extend({
                        _doFinalize: function () {
                            var t = this._process(!0);
                            return t
                        },
                        blockSize: 1
                    }), e.mode = {}),
                    d = r.BlockCipherMode = i.extend({
                        createEncryptor: function (t, e) {
                            return this.Encryptor.create(t, e)
                        },
                        createDecryptor: function (t, e) {
                            return this.Decryptor.create(t, e)
                        },
                        init: function (t, e) {
                            this._cipher = t,
                                this._iv = e
                        }
                    }),
                    p = u.CBC = function () {
                        function e(e, r, i) {
                            var n = this._iv;
                            if (n) {
                                var o = n;
                                this._iv = t
                            } else o = this._prevBlock;
                            for (var s = 0; s < i; s++) e[r + s] ^= o[s]
                        }

                        var r = d.extend();
                        return r.Encryptor = r.extend({
                            processBlock: function (t, r) {
                                var i = this._cipher,
                                    n = i.blockSize;
                                e.call(this, t, r, n),
                                    i.encryptBlock(t, r),
                                    this._prevBlock = t.slice(r, r + n)
                            }
                        }),
                            r.Decryptor = r.extend({
                                processBlock: function (t, r) {
                                    var i = this._cipher,
                                        n = i.blockSize,
                                        o = t.slice(r, r + n);
                                    i.decryptBlock(t, r),
                                        e.call(this, t, r, n),
                                        this._prevBlock = o
                                }
                            }),
                            r
                    }(),
                    v = e.pad = {},
                    _ = v.Pkcs7 = {
                        pad: function (t, e) {
                            for (var r = 4 * e,
                                     i = r - t.sigBytes % r,
                                     o = i << 24 | i << 16 | i << 8 | i,
                                     s = [], a = 0; a < i; a += 4) s.push(o);
                            var c = n.create(s, i);
                            t.concat(c)
                        },
                        unpad: function (t) {
                            var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                            t.sigBytes -= e
                        }
                    },
                    y = (r.BlockCipher = f.extend({
                        cfg: f.cfg.extend({
                            mode: p,
                            padding: _
                        }),
                        reset: function () {
                            f.reset.call(this);
                            var t = this.cfg,
                                e = t.iv,
                                r = t.mode;
                            if (this._xformMode == this._ENC_XFORM_MODE) var i = r.createEncryptor;
                            else {
                                i = r.createDecryptor;
                                this._minBufferSize = 1
                            }
                            this._mode && this._mode.__creator == i ? this._mode.init(this, e && e.words) : (this._mode = i.call(r, this, e && e.words), this._mode.__creator = i)
                        },
                        _doProcessBlock: function (t, e) {
                            this._mode.processBlock(t, e)
                        },
                        _doFinalize: function () {
                            var t = this.cfg.padding;
                            if (this._xformMode == this._ENC_XFORM_MODE) {
                                t.pad(this._data, this.blockSize);
                                var e = this._process(!0)
                            } else {
                                e = this._process(!0);
                                t.unpad(e)
                            }
                            return e
                        },
                        blockSize: 4
                    }), r.CipherParams = i.extend({
                        init: function (t) {
                            this.mixIn(t)
                        },
                        toString: function (t) {
                            return (t || this.formatter).stringify(this)
                        }
                    })),
                    g = e.format = {},
                    B = g.OpenSSL = {
                        stringify: function (t) {
                            var e = t.ciphertext,
                                r = t.salt;
                            if (r) var i = n.create([1398893684, 1701076831]).concat(r).concat(e);
                            else i = e;
                            return i.toString(c)
                        },
                        parse: function (t) {
                            var e = c.parse(t),
                                r = e.words;
                            if (1398893684 == r[0] && 1701076831 == r[1]) {
                                var i = n.create(r.slice(2, 4));
                                r.splice(0, 4),
                                    e.sigBytes -= 16
                            }
                            return y.create({
                                ciphertext: e,
                                salt: i
                            })
                        }
                    },
                    k = r.SerializableCipher = i.extend({
                        cfg: i.extend({
                            format: B
                        }),
                        encrypt: function (t, e, r, i) {
                            i = this.cfg.extend(i);
                            var n = t.createEncryptor(r, i),
                                o = n.finalize(e),
                                s = n.cfg;
                            return y.create({
                                ciphertext: o,
                                key: r,
                                iv: s.iv,
                                algorithm: t,
                                mode: s.mode,
                                padding: s.padding,
                                blockSize: t.blockSize,
                                formatter: i.format
                            })
                        },
                        decrypt: function (t, e, r, i) {
                            i = this.cfg.extend(i),
                                e = this._parse(e, i.format);
                            var n = t.createDecryptor(r, i).finalize(e.ciphertext);
                            return n
                        },
                        _parse: function (t, e) {
                            return "string" == typeof t ? e.parse(t, this) : t
                        }
                    }),
                    w = e.kdf = {},
                    S = w.OpenSSL = {
                        execute: function (t, e, r, i) {
                            i || (i = n.random(8));
                            var o = l.create({
                                    keySize: e + r
                                }).compute(t, i),
                                s = n.create(o.words.slice(e), 4 * r);
                            return o.sigBytes = 4 * e,
                                y.create({
                                    key: o,
                                    iv: s,
                                    salt: i
                                })
                        }
                    },
                    m = r.PasswordBasedCipher = k.extend({
                        cfg: k.cfg.extend({
                            kdf: S
                        }),
                        encrypt: function (t, e, r, i) {
                            i = this.cfg.extend(i);
                            var n = i.kdf.execute(r, t.keySize, t.ivSize);
                            i.iv = n.iv;
                            var o = k.encrypt.call(this, t, e, n.key, i);
                            return o.mixIn(n),
                                o
                        },
                        decrypt: function (t, e, r, i) {
                            i = this.cfg.extend(i),
                                e = this._parse(e, i.format);
                            var n = i.kdf.execute(r, t.keySize, t.ivSize, e.salt);
                            i.iv = n.iv;
                            var o = k.decrypt.call(this, t, e, n.key, i);
                            return o
                        }
                    })
            }(),
                a.mode.CFB = function () {
                    function t(t, e, r, i) {
                        var n = this._iv;
                        if (n) {
                            var o = n.slice(0);
                            this._iv = void 0
                        } else o = this._prevBlock;
                        i.encryptBlock(o, 0);
                        for (var s = 0; s < r; s++) t[e + s] ^= o[s]
                    }

                    var e = a.lib.BlockCipherMode.extend();
                    return e.Encryptor = e.extend({
                        processBlock: function (e, r) {
                            var i = this._cipher,
                                n = i.blockSize;
                            t.call(this, e, r, n, i),
                                this._prevBlock = e.slice(r, r + n)
                        }
                    }),
                        e.Decryptor = e.extend({
                            processBlock: function (e, r) {
                                var i = this._cipher,
                                    n = i.blockSize,
                                    o = e.slice(r, r + n);
                                t.call(this, e, r, n, i),
                                    this._prevBlock = o
                            }
                        }),
                        e
                }(),
                a.mode.ECB = function () {
                    var t = a.lib.BlockCipherMode.extend();
                    return t.Encryptor = t.extend({
                        processBlock: function (t, e) {
                            this._cipher.encryptBlock(t, e)
                        }
                    }),
                        t.Decryptor = t.extend({
                            processBlock: function (t, e) {
                                this._cipher.decryptBlock(t, e)
                            }
                        }),
                        t
                }(),
                a.pad.AnsiX923 = {
                    pad: function (t, e) {
                        var r = t.sigBytes,
                            i = 4 * e,
                            n = i - r % i,
                            o = r + n - 1;
                        t.clamp(),
                            t.words[o >>> 2] |= n << 24 - o % 4 * 8,
                            t.sigBytes += n
                    },
                    unpad: function (t) {
                        var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                        t.sigBytes -= e
                    }
                },
                a.pad.Iso10126 = {
                    pad: function (t, e) {
                        var r = 4 * e,
                            i = r - t.sigBytes % r;
                        t.concat(a.lib.WordArray.random(i - 1)).concat(a.lib.WordArray.create([i << 24], 1))
                    },
                    unpad: function (t) {
                        var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                        t.sigBytes -= e
                    }
                },
                a.pad.Iso97971 = {
                    pad: function (t, e) {
                        t.concat(a.lib.WordArray.create([2147483648], 1)),
                            a.pad.ZeroPadding.pad(t, e)
                    },
                    unpad: function (t) {
                        a.pad.ZeroPadding.unpad(t),
                            t.sigBytes--
                    }
                },
                a.mode.OFB = function () {
                    var t = a.lib.BlockCipherMode.extend(),
                        e = t.Encryptor = t.extend({
                            processBlock: function (t, e) {
                                var r = this._cipher,
                                    i = r.blockSize,
                                    n = this._iv,
                                    o = this._keystream;
                                n && (o = this._keystream = n.slice(0), this._iv = void 0),
                                    r.encryptBlock(o, 0);
                                for (var s = 0; s < i; s++) t[e + s] ^= o[s]
                            }
                        });
                    return t.Decryptor = e,
                        t
                }(),
                a.pad.NoPadding = {
                    pad: function () {
                    },
                    unpad: function () {
                    }
                },
                function (t) {
                    var e = a,
                        r = e.lib,
                        i = r.CipherParams,
                        n = e.enc,
                        o = n.Hex,
                        s = e.format;
                    s.Hex = {
                        stringify: function (t) {
                            return t.ciphertext.toString(o)
                        },
                        parse: function (t) {
                            var e = o.parse(t);
                            return i.create({
                                ciphertext: e
                            })
                        }
                    }
                }(),
                function () {
                    var t = a,
                        e = t.lib,
                        r = e.BlockCipher,
                        i = t.algo,
                        n = [],
                        o = [],
                        s = [],
                        c = [],
                        h = [],
                        l = [],
                        f = [],
                        u = [],
                        d = [],
                        p = [];
                    !
                        function () {
                            for (var t = [], e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
                            var r = 0,
                                i = 0;
                            for (e = 0; e < 256; e++) {
                                var a = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4;
                                a = a >>> 8 ^ 255 & a ^ 99,
                                    n[r] = a,
                                    o[a] = r;
                                var v = t[r],
                                    _ = t[v],
                                    y = t[_],
                                    g = 257 * t[a] ^ 16843008 * a;
                                s[r] = g << 24 | g >>> 8,
                                    c[r] = g << 16 | g >>> 16,
                                    h[r] = g << 8 | g >>> 24,
                                    l[r] = g;
                                g = 16843009 * y ^ 65537 * _ ^ 257 * v ^ 16843008 * r;
                                f[a] = g << 24 | g >>> 8,
                                    u[a] = g << 16 | g >>> 16,
                                    d[a] = g << 8 | g >>> 24,
                                    p[a] = g,
                                    r ? (r = v ^ t[t[t[y ^ v]]], i ^= t[t[i]]) : r = i = 1
                            }
                        }();
                    var v = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                        _ = i.AES = r.extend({
                            _doReset: function () {
                                if (!this._nRounds || this._keyPriorReset !== this._key) {
                                    for (var t = this._keyPriorReset = this._key,
                                             e = t.words,
                                             r = t.sigBytes / 4,
                                             i = this._nRounds = r + 6,
                                             o = 4 * (i + 1), s = this._keySchedule = [], a = 0; a < o; a++) if (a < r) s[a] = e[a];
                                    else {
                                        var c = s[a - 1];
                                        a % r ? r > 6 && a % r == 4 && (c = n[c >>> 24] << 24 | n[c >>> 16 & 255] << 16 | n[c >>> 8 & 255] << 8 | n[255 & c]) : (c = c << 8 | c >>> 24, c = n[c >>> 24] << 24 | n[c >>> 16 & 255] << 16 | n[c >>> 8 & 255] << 8 | n[255 & c], c ^= v[a / r | 0] << 24),
                                            s[a] = s[a - r] ^ c
                                    }
                                    for (var h = this._invKeySchedule = [], l = 0; l < o; l++) {
                                        a = o - l;
                                        if (l % 4) c = s[a];
                                        else c = s[a - 4];
                                        h[l] = l < 4 || a <= 4 ? c : f[n[c >>> 24]] ^ u[n[c >>> 16 & 255]] ^ d[n[c >>> 8 & 255]] ^ p[n[255 & c]]
                                    }
                                }
                            },
                            encryptBlock: function (t, e) {
                                this._doCryptBlock(t, e, this._keySchedule, s, c, h, l, n)
                            },
                            decryptBlock: function (t, e) {
                                var r = t[e + 1];
                                t[e + 1] = t[e + 3],
                                    t[e + 3] = r,
                                    this._doCryptBlock(t, e, this._invKeySchedule, f, u, d, p, o);
                                r = t[e + 1];
                                t[e + 1] = t[e + 3],
                                    t[e + 3] = r
                            },
                            _doCryptBlock: function (t, e, r, i, n, o, s, a) {
                                for (var c = this._nRounds,
                                         h = t[e] ^ r[0], l = t[e + 1] ^ r[1], f = t[e + 2] ^ r[2], u = t[e + 3] ^ r[3], d = 4, p = 1; p < c; p++) {
                                    var v = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ r[d++],
                                        _ = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & h] ^ r[d++],
                                        y = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ r[d++],
                                        g = i[u >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ r[d++];
                                    h = v,
                                        l = _,
                                        f = y,
                                        u = g
                                }
                                v = (a[h >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & u]) ^ r[d++],
                                    _ = (a[l >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & h]) ^ r[d++],
                                    y = (a[f >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & l]) ^ r[d++],
                                    g = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & f]) ^ r[d++];
                                t[e] = v,
                                    t[e + 1] = _,
                                    t[e + 2] = y,
                                    t[e + 3] = g
                            },
                            keySize: 8
                        });
                    t.AES = r._createHelper(_)
                }(),
                function () {
                    function t(t, e) {
                        var r = (this._lBlock >>> t ^ this._rBlock) & e;
                        this._rBlock ^= r,
                            this._lBlock ^= r << t
                    }

                    function e(t, e) {
                        var r = (this._rBlock >>> t ^ this._lBlock) & e;
                        this._lBlock ^= r,
                            this._rBlock ^= r << t
                    }

                    var r = a,
                        i = r.lib,
                        n = i.WordArray,
                        o = i.BlockCipher,
                        s = r.algo,
                        c = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
                        h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
                        l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
                        f = [{
                            0: 8421888,
                            268435456: 32768,
                            536870912: 8421378,
                            805306368: 2,
                            1073741824: 512,
                            1342177280: 8421890,
                            1610612736: 8389122,
                            1879048192: 8388608,
                            2147483648: 514,
                            2415919104: 8389120,
                            2684354560: 33280,
                            2952790016: 8421376,
                            3221225472: 32770,
                            3489660928: 8388610,
                            3758096384: 0,
                            4026531840: 33282,
                            134217728: 0,
                            402653184: 8421890,
                            671088640: 33282,
                            939524096: 32768,
                            1207959552: 8421888,
                            1476395008: 512,
                            1744830464: 8421378,
                            2013265920: 2,
                            2281701376: 8389120,
                            2550136832: 33280,
                            2818572288: 8421376,
                            3087007744: 8389122,
                            3355443200: 8388610,
                            3623878656: 32770,
                            3892314112: 514,
                            4160749568: 8388608,
                            1: 32768,
                            268435457: 2,
                            536870913: 8421888,
                            805306369: 8388608,
                            1073741825: 8421378,
                            1342177281: 33280,
                            1610612737: 512,
                            1879048193: 8389122,
                            2147483649: 8421890,
                            2415919105: 8421376,
                            2684354561: 8388610,
                            2952790017: 33282,
                            3221225473: 514,
                            3489660929: 8389120,
                            3758096385: 32770,
                            4026531841: 0,
                            134217729: 8421890,
                            402653185: 8421376,
                            671088641: 8388608,
                            939524097: 512,
                            1207959553: 32768,
                            1476395009: 8388610,
                            1744830465: 2,
                            2013265921: 33282,
                            2281701377: 32770,
                            2550136833: 8389122,
                            2818572289: 514,
                            3087007745: 8421888,
                            3355443201: 8389120,
                            3623878657: 0,
                            3892314113: 33280,
                            4160749569: 8421378
                        },
                            {
                                0: 1074282512,
                                16777216: 16384,
                                33554432: 524288,
                                50331648: 1074266128,
                                67108864: 1073741840,
                                83886080: 1074282496,
                                100663296: 1073758208,
                                117440512: 16,
                                134217728: 540672,
                                150994944: 1073758224,
                                167772160: 1073741824,
                                184549376: 540688,
                                201326592: 524304,
                                218103808: 0,
                                234881024: 16400,
                                251658240: 1074266112,
                                8388608: 1073758208,
                                25165824: 540688,
                                41943040: 16,
                                58720256: 1073758224,
                                75497472: 1074282512,
                                92274688: 1073741824,
                                109051904: 524288,
                                125829120: 1074266128,
                                142606336: 524304,
                                159383552: 0,
                                176160768: 16384,
                                192937984: 1074266112,
                                209715200: 1073741840,
                                226492416: 540672,
                                243269632: 1074282496,
                                260046848: 16400,
                                268435456: 0,
                                285212672: 1074266128,
                                301989888: 1073758224,
                                318767104: 1074282496,
                                335544320: 1074266112,
                                352321536: 16,
                                369098752: 540688,
                                385875968: 16384,
                                402653184: 16400,
                                419430400: 524288,
                                436207616: 524304,
                                452984832: 1073741840,
                                469762048: 540672,
                                486539264: 1073758208,
                                503316480: 1073741824,
                                520093696: 1074282512,
                                276824064: 540688,
                                293601280: 524288,
                                310378496: 1074266112,
                                327155712: 16384,
                                343932928: 1073758208,
                                360710144: 1074282512,
                                377487360: 16,
                                394264576: 1073741824,
                                411041792: 1074282496,
                                427819008: 1073741840,
                                444596224: 1073758224,
                                461373440: 524304,
                                478150656: 0,
                                494927872: 16400,
                                511705088: 1074266128,
                                528482304: 540672
                            },
                            {
                                0: 260,
                                1048576: 0,
                                2097152: 67109120,
                                3145728: 65796,
                                4194304: 65540,
                                5242880: 67108868,
                                6291456: 67174660,
                                7340032: 67174400,
                                8388608: 67108864,
                                9437184: 67174656,
                                10485760: 65792,
                                11534336: 67174404,
                                12582912: 67109124,
                                13631488: 65536,
                                14680064: 4,
                                15728640: 256,
                                524288: 67174656,
                                1572864: 67174404,
                                2621440: 0,
                                3670016: 67109120,
                                4718592: 67108868,
                                5767168: 65536,
                                6815744: 65540,
                                7864320: 260,
                                8912896: 4,
                                9961472: 256,
                                11010048: 67174400,
                                12058624: 65796,
                                13107200: 65792,
                                14155776: 67109124,
                                15204352: 67174660,
                                16252928: 67108864,
                                16777216: 67174656,
                                17825792: 65540,
                                18874368: 65536,
                                19922944: 67109120,
                                20971520: 256,
                                22020096: 67174660,
                                23068672: 67108868,
                                24117248: 0,
                                25165824: 67109124,
                                26214400: 67108864,
                                27262976: 4,
                                28311552: 65792,
                                29360128: 67174400,
                                30408704: 260,
                                31457280: 65796,
                                32505856: 67174404,
                                17301504: 67108864,
                                18350080: 260,
                                19398656: 67174656,
                                20447232: 0,
                                21495808: 65540,
                                22544384: 67109120,
                                23592960: 256,
                                24641536: 67174404,
                                25690112: 65536,
                                26738688: 67174660,
                                27787264: 65796,
                                28835840: 67108868,
                                29884416: 67109124,
                                30932992: 67174400,
                                31981568: 4,
                                33030144: 65792
                            },
                            {
                                0: 2151682048,
                                65536: 2147487808,
                                131072: 4198464,
                                196608: 2151677952,
                                262144: 0,
                                327680: 4198400,
                                393216: 2147483712,
                                458752: 4194368,
                                524288: 2147483648,
                                589824: 4194304,
                                655360: 64,
                                720896: 2147487744,
                                786432: 2151678016,
                                851968: 4160,
                                917504: 4096,
                                983040: 2151682112,
                                32768: 2147487808,
                                98304: 64,
                                163840: 2151678016,
                                229376: 2147487744,
                                294912: 4198400,
                                360448: 2151682112,
                                425984: 0,
                                491520: 2151677952,
                                557056: 4096,
                                622592: 2151682048,
                                688128: 4194304,
                                753664: 4160,
                                819200: 2147483648,
                                884736: 4194368,
                                950272: 4198464,
                                1015808: 2147483712,
                                1048576: 4194368,
                                1114112: 4198400,
                                1179648: 2147483712,
                                1245184: 0,
                                1310720: 4160,
                                1376256: 2151678016,
                                1441792: 2151682048,
                                1507328: 2147487808,
                                1572864: 2151682112,
                                1638400: 2147483648,
                                1703936: 2151677952,
                                1769472: 4198464,
                                1835008: 2147487744,
                                1900544: 4194304,
                                1966080: 64,
                                2031616: 4096,
                                1081344: 2151677952,
                                1146880: 2151682112,
                                1212416: 0,
                                1277952: 4198400,
                                1343488: 4194368,
                                1409024: 2147483648,
                                1474560: 2147487808,
                                1540096: 64,
                                1605632: 2147483712,
                                1671168: 4096,
                                1736704: 2147487744,
                                1802240: 2151678016,
                                1867776: 4160,
                                1933312: 2151682048,
                                1998848: 4194304,
                                2064384: 4198464
                            },
                            {
                                0: 128,
                                4096: 17039360,
                                8192: 262144,
                                12288: 536870912,
                                16384: 537133184,
                                20480: 16777344,
                                24576: 553648256,
                                28672: 262272,
                                32768: 16777216,
                                36864: 537133056,
                                40960: 536871040,
                                45056: 553910400,
                                49152: 553910272,
                                53248: 0,
                                57344: 17039488,
                                61440: 553648128,
                                2048: 17039488,
                                6144: 553648256,
                                10240: 128,
                                14336: 17039360,
                                18432: 262144,
                                22528: 537133184,
                                26624: 553910272,
                                30720: 536870912,
                                34816: 537133056,
                                38912: 0,
                                43008: 553910400,
                                47104: 16777344,
                                51200: 536871040,
                                55296: 553648128,
                                59392: 16777216,
                                63488: 262272,
                                65536: 262144,
                                69632: 128,
                                73728: 536870912,
                                77824: 553648256,
                                81920: 16777344,
                                86016: 553910272,
                                90112: 537133184,
                                94208: 16777216,
                                98304: 553910400,
                                102400: 553648128,
                                106496: 17039360,
                                110592: 537133056,
                                114688: 262272,
                                118784: 536871040,
                                122880: 0,
                                126976: 17039488,
                                67584: 553648256,
                                71680: 16777216,
                                75776: 17039360,
                                79872: 537133184,
                                83968: 536870912,
                                88064: 17039488,
                                92160: 128,
                                96256: 553910272,
                                100352: 262272,
                                104448: 553910400,
                                108544: 0,
                                112640: 553648128,
                                116736: 16777344,
                                120832: 262144,
                                124928: 537133056,
                                129024: 536871040
                            },
                            {
                                0: 268435464,
                                256: 8192,
                                512: 270532608,
                                768: 270540808,
                                1024: 268443648,
                                1280: 2097152,
                                1536: 2097160,
                                1792: 268435456,
                                2048: 0,
                                2304: 268443656,
                                2560: 2105344,
                                2816: 8,
                                3072: 270532616,
                                3328: 2105352,
                                3584: 8200,
                                3840: 270540800,
                                128: 270532608,
                                384: 270540808,
                                640: 8,
                                896: 2097152,
                                1152: 2105352,
                                1408: 268435464,
                                1664: 268443648,
                                1920: 8200,
                                2176: 2097160,
                                2432: 8192,
                                2688: 268443656,
                                2944: 270532616,
                                3200: 0,
                                3456: 270540800,
                                3712: 2105344,
                                3968: 268435456,
                                4096: 268443648,
                                4352: 270532616,
                                4608: 270540808,
                                4864: 8200,
                                5120: 2097152,
                                5376: 268435456,
                                5632: 268435464,
                                5888: 2105344,
                                6144: 2105352,
                                6400: 0,
                                6656: 8,
                                6912: 270532608,
                                7168: 8192,
                                7424: 268443656,
                                7680: 270540800,
                                7936: 2097160,
                                4224: 8,
                                4480: 2105344,
                                4736: 2097152,
                                4992: 268435464,
                                5248: 268443648,
                                5504: 8200,
                                5760: 270540808,
                                6016: 270532608,
                                6272: 270540800,
                                6528: 270532616,
                                6784: 8192,
                                7040: 2105352,
                                7296: 2097160,
                                7552: 0,
                                7808: 268435456,
                                8064: 268443656
                            },
                            {
                                0: 1048576,
                                16: 33555457,
                                32: 1024,
                                48: 1049601,
                                64: 34604033,
                                80: 0,
                                96: 1,
                                112: 34603009,
                                128: 33555456,
                                144: 1048577,
                                160: 33554433,
                                176: 34604032,
                                192: 34603008,
                                208: 1025,
                                224: 1049600,
                                240: 33554432,
                                8: 34603009,
                                24: 0,
                                40: 33555457,
                                56: 34604032,
                                72: 1048576,
                                88: 33554433,
                                104: 33554432,
                                120: 1025,
                                136: 1049601,
                                152: 33555456,
                                168: 34603008,
                                184: 1048577,
                                200: 1024,
                                216: 34604033,
                                232: 1,
                                248: 1049600,
                                256: 33554432,
                                272: 1048576,
                                288: 33555457,
                                304: 34603009,
                                320: 1048577,
                                336: 33555456,
                                352: 34604032,
                                368: 1049601,
                                384: 1025,
                                400: 34604033,
                                416: 1049600,
                                432: 1,
                                448: 0,
                                464: 34603008,
                                480: 33554433,
                                496: 1024,
                                264: 1049600,
                                280: 33555457,
                                296: 34603009,
                                312: 1,
                                328: 33554432,
                                344: 1048576,
                                360: 1025,
                                376: 34604032,
                                392: 33554433,
                                408: 34603008,
                                424: 0,
                                440: 34604033,
                                456: 1049601,
                                472: 1024,
                                488: 33555456,
                                504: 1048577
                            },
                            {
                                0: 134219808,
                                1: 131072,
                                2: 134217728,
                                3: 32,
                                4: 131104,
                                5: 134350880,
                                6: 134350848,
                                7: 2048,
                                8: 134348800,
                                9: 134219776,
                                10: 133120,
                                11: 134348832,
                                12: 2080,
                                13: 0,
                                14: 134217760,
                                15: 133152,
                                2147483648: 2048,
                                2147483649: 134350880,
                                2147483650: 134219808,
                                2147483651: 134217728,
                                2147483652: 134348800,
                                2147483653: 133120,
                                2147483654: 133152,
                                2147483655: 32,
                                2147483656: 134217760,
                                2147483657: 2080,
                                2147483658: 131104,
                                2147483659: 134350848,
                                2147483660: 0,
                                2147483661: 134348832,
                                2147483662: 134219776,
                                2147483663: 131072,
                                16: 133152,
                                17: 134350848,
                                18: 32,
                                19: 2048,
                                20: 134219776,
                                21: 134217760,
                                22: 134348832,
                                23: 131072,
                                24: 0,
                                25: 131104,
                                26: 134348800,
                                27: 134219808,
                                28: 134350880,
                                29: 133120,
                                30: 2080,
                                31: 134217728,
                                2147483664: 131072,
                                2147483665: 2048,
                                2147483666: 134348832,
                                2147483667: 133152,
                                2147483668: 32,
                                2147483669: 134348800,
                                2147483670: 134217728,
                                2147483671: 134219808,
                                2147483672: 134350880,
                                2147483673: 134217760,
                                2147483674: 134219776,
                                2147483675: 0,
                                2147483676: 133120,
                                2147483677: 2080,
                                2147483678: 131104,
                                2147483679: 134350848
                            }],
                        u = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
                        d = s.DES = o.extend({
                            _doReset: function () {
                                for (var t = this._key,
                                         e = t.words,
                                         r = [], i = 0; i < 56; i++) {
                                    var n = c[i] - 1;
                                    r[i] = e[n >>> 5] >>> 31 - n % 32 & 1
                                }
                                for (var o = this._subKeys = [], s = 0; s < 16; s++) {
                                    var a = o[s] = [],
                                        f = l[s];
                                    for (i = 0; i < 24; i++) a[i / 6 | 0] |= r[(h[i] - 1 + f) % 28] << 31 - i % 6,
                                        a[4 + (i / 6 | 0)] |= r[28 + (h[i + 24] - 1 + f) % 28] << 31 - i % 6;
                                    a[0] = a[0] << 1 | a[0] >>> 31;
                                    for (i = 1; i < 7; i++) a[i] = a[i] >>> 4 * (i - 1) + 3;
                                    a[7] = a[7] << 5 | a[7] >>> 27
                                }
                                var u = this._invSubKeys = [];
                                for (i = 0; i < 16; i++) u[i] = o[15 - i]
                            },
                            encryptBlock: function (t, e) {
                                this._doCryptBlock(t, e, this._subKeys)
                            },
                            decryptBlock: function (t, e) {
                                this._doCryptBlock(t, e, this._invSubKeys)
                            },
                            _doCryptBlock: function (r, i, n) {
                                this._lBlock = r[i],
                                    this._rBlock = r[i + 1],
                                    t.call(this, 4, 252645135),
                                    t.call(this, 16, 65535),
                                    e.call(this, 2, 858993459),
                                    e.call(this, 8, 16711935),
                                    t.call(this, 1, 1431655765);
                                for (var o = 0; o < 16; o++) {
                                    for (var s = n[o], a = this._lBlock, c = this._rBlock, h = 0, l = 0; l < 8; l++) h |= f[l][((c ^ s[l]) & u[l]) >>> 0];
                                    this._lBlock = c,
                                        this._rBlock = a ^ h
                                }
                                var d = this._lBlock;
                                this._lBlock = this._rBlock,
                                    this._rBlock = d,
                                    t.call(this, 1, 1431655765),
                                    e.call(this, 8, 16711935),
                                    e.call(this, 2, 858993459),
                                    t.call(this, 16, 65535),
                                    t.call(this, 4, 252645135),
                                    r[i] = this._lBlock,
                                    r[i + 1] = this._rBlock
                            },
                            keySize: 2,
                            ivSize: 2,
                            blockSize: 2
                        });
                    r.DES = o._createHelper(d);
                    var p = s.TripleDES = o.extend({
                        _doReset: function () {
                            var t = this._key,
                                e = t.words;
                            this._des1 = d.createEncryptor(n.create(e.slice(0, 2))),
                                this._des2 = d.createEncryptor(n.create(e.slice(2, 4))),
                                this._des3 = d.createEncryptor(n.create(e.slice(4, 6)))
                        },
                        encryptBlock: function (t, e) {
                            this._des1.encryptBlock(t, e),
                                this._des2.decryptBlock(t, e),
                                this._des3.encryptBlock(t, e)
                        },
                        decryptBlock: function (t, e) {
                            this._des3.decryptBlock(t, e),
                                this._des2.encryptBlock(t, e),
                                this._des1.decryptBlock(t, e)
                        },
                        keySize: 6,
                        ivSize: 2,
                        blockSize: 2
                    });
                    r.TripleDES = o._createHelper(p)
                }(),
                function () {
                    function t() {
                        for (var t = this._S,
                                 e = this._i,
                                 r = this._j,
                                 i = 0,
                                 n = 0; n < 4; n++) {
                            e = (e + 1) % 256,
                                r = (r + t[e]) % 256;
                            var o = t[e];
                            t[e] = t[r],
                                t[r] = o,
                                i |= t[(t[e] + t[r]) % 256] << 24 - 8 * n
                        }
                        return this._i = e,
                            this._j = r,
                            i
                    }

                    var e = a,
                        r = e.lib,
                        i = r.StreamCipher,
                        n = e.algo,
                        o = n.RC4 = i.extend({
                            _doReset: function () {
                                for (var t = this._key,
                                         e = t.words,
                                         r = t.sigBytes,
                                         i = this._S = [], n = 0; n < 256; n++) i[n] = n;
                                n = 0;
                                for (var o = 0; n < 256; n++) {
                                    var s = n % r,
                                        a = e[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                                    o = (o + i[n] + a) % 256;
                                    var c = i[n];
                                    i[n] = i[o],
                                        i[o] = c
                                }
                                this._i = this._j = 0
                            },
                            _doProcessBlock: function (e, r) {
                                e[r] ^= t.call(this)
                            },
                            keySize: 8,
                            ivSize: 0
                        });
                    e.RC4 = i._createHelper(o);
                    var s = n.RC4Drop = o.extend({
                        cfg: o.cfg.extend({
                            drop: 192
                        }),
                        _doReset: function () {
                            o._doReset.call(this);
                            for (var e = this.cfg.drop; e > 0; e--) t.call(this)
                        }
                    });
                    e.RC4Drop = i._createHelper(s)
                }(),
                a.mode.CTRGladman = function () {
                    function t(t) {
                        if (255 == (t >> 24 & 255)) {
                            var e = t >> 16 & 255,
                                r = t >> 8 & 255,
                                i = 255 & t;
                            255 === e ? (e = 0, 255 === r ? (r = 0, 255 === i ? i = 0 : ++i) : ++r) : ++e,
                                t = 0,
                                t += e << 16,
                                t += r << 8,
                                t += i
                        } else t += 1 << 24;
                        return t
                    }

                    function e(e) {
                        return 0 === (e[0] = t(e[0])) && (e[1] = t(e[1])),
                            e
                    }

                    var r = a.lib.BlockCipherMode.extend(),
                        i = r.Encryptor = r.extend({
                            processBlock: function (t, r) {
                                var i = this._cipher,
                                    n = i.blockSize,
                                    o = this._iv,
                                    s = this._counter;
                                o && (s = this._counter = o.slice(0), this._iv = void 0),
                                    e(s);
                                var a = s.slice(0);
                                i.encryptBlock(a, 0);
                                for (var c = 0; c < n; c++) t[r + c] ^= a[c]
                            }
                        });
                    return r.Decryptor = i,
                        r
                }(),
                function () {
                    function t() {
                        for (var t = this._X,
                                 e = this._C,
                                 r = 0; r < 8; r++) s[r] = e[r];
                        e[0] = e[0] + 1295307597 + this._b | 0,
                            e[1] = e[1] + 3545052371 + (e[0] >>> 0 < s[0] >>> 0 ? 1 : 0) | 0,
                            e[2] = e[2] + 886263092 + (e[1] >>> 0 < s[1] >>> 0 ? 1 : 0) | 0,
                            e[3] = e[3] + 1295307597 + (e[2] >>> 0 < s[2] >>> 0 ? 1 : 0) | 0,
                            e[4] = e[4] + 3545052371 + (e[3] >>> 0 < s[3] >>> 0 ? 1 : 0) | 0,
                            e[5] = e[5] + 886263092 + (e[4] >>> 0 < s[4] >>> 0 ? 1 : 0) | 0,
                            e[6] = e[6] + 1295307597 + (e[5] >>> 0 < s[5] >>> 0 ? 1 : 0) | 0,
                            e[7] = e[7] + 3545052371 + (e[6] >>> 0 < s[6] >>> 0 ? 1 : 0) | 0,
                            this._b = e[7] >>> 0 < s[7] >>> 0 ? 1 : 0;
                        for (r = 0; r < 8; r++) {
                            var i = t[r] + e[r],
                                n = 65535 & i,
                                o = i >>> 16,
                                a = ((n * n >>> 17) + n * o >>> 15) + o * o,
                                h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                            c[r] = a ^ h
                        }
                        t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0,
                            t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0,
                            t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0,
                            t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0,
                            t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0,
                            t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0,
                            t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0,
                            t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0
                    }

                    var e = a,
                        r = e.lib,
                        i = r.StreamCipher,
                        n = e.algo,
                        o = [],
                        s = [],
                        c = [],
                        h = n.Rabbit = i.extend({
                            _doReset: function () {
                                for (var e = this._key.words,
                                         r = this.cfg.iv,
                                         i = 0; i < 4; i++) e[i] = 16711935 & (e[i] << 8 | e[i] >>> 24) | 4278255360 & (e[i] << 24 | e[i] >>> 8);
                                var n = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
                                    o = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
                                this._b = 0;
                                for (i = 0; i < 4; i++) t.call(this);
                                for (i = 0; i < 8; i++) o[i] ^= n[i + 4 & 7];
                                if (r) {
                                    var s = r.words,
                                        a = s[0],
                                        c = s[1],
                                        h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
                                        l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
                                        f = h >>> 16 | 4294901760 & l,
                                        u = l << 16 | 65535 & h;
                                    o[0] ^= h,
                                        o[1] ^= f,
                                        o[2] ^= l,
                                        o[3] ^= u,
                                        o[4] ^= h,
                                        o[5] ^= f,
                                        o[6] ^= l,
                                        o[7] ^= u;
                                    for (i = 0; i < 4; i++) t.call(this)
                                }
                            },
                            _doProcessBlock: function (e, r) {
                                var i = this._X;
                                t.call(this),
                                    o[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16,
                                    o[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16,
                                    o[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16,
                                    o[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                                for (var n = 0; n < 4; n++) o[n] = 16711935 & (o[n] << 8 | o[n] >>> 24) | 4278255360 & (o[n] << 24 | o[n] >>> 8),
                                    e[r + n] ^= o[n]
                            },
                            blockSize: 4,
                            ivSize: 2
                        });
                    e.Rabbit = i._createHelper(h)
                }(),
                a.mode.CTR = function () {
                    var t = a.lib.BlockCipherMode.extend(),
                        e = t.Encryptor = t.extend({
                            processBlock: function (t, e) {
                                var r = this._cipher,
                                    i = r.blockSize,
                                    n = this._iv,
                                    o = this._counter;
                                n && (o = this._counter = n.slice(0), this._iv = void 0);
                                var s = o.slice(0);
                                r.encryptBlock(s, 0),
                                    o[i - 1] = o[i - 1] + 1 | 0;
                                for (var a = 0; a < i; a++) t[e + a] ^= s[a]
                            }
                        });
                    return t.Decryptor = e,
                        t
                }(),
                function () {
                    function t() {
                        for (var t = this._X,
                                 e = this._C,
                                 r = 0; r < 8; r++) s[r] = e[r];
                        e[0] = e[0] + 1295307597 + this._b | 0,
                            e[1] = e[1] + 3545052371 + (e[0] >>> 0 < s[0] >>> 0 ? 1 : 0) | 0,
                            e[2] = e[2] + 886263092 + (e[1] >>> 0 < s[1] >>> 0 ? 1 : 0) | 0,
                            e[3] = e[3] + 1295307597 + (e[2] >>> 0 < s[2] >>> 0 ? 1 : 0) | 0,
                            e[4] = e[4] + 3545052371 + (e[3] >>> 0 < s[3] >>> 0 ? 1 : 0) | 0,
                            e[5] = e[5] + 886263092 + (e[4] >>> 0 < s[4] >>> 0 ? 1 : 0) | 0,
                            e[6] = e[6] + 1295307597 + (e[5] >>> 0 < s[5] >>> 0 ? 1 : 0) | 0,
                            e[7] = e[7] + 3545052371 + (e[6] >>> 0 < s[6] >>> 0 ? 1 : 0) | 0,
                            this._b = e[7] >>> 0 < s[7] >>> 0 ? 1 : 0;
                        for (r = 0; r < 8; r++) {
                            var i = t[r] + e[r],
                                n = 65535 & i,
                                o = i >>> 16,
                                a = ((n * n >>> 17) + n * o >>> 15) + o * o,
                                h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                            c[r] = a ^ h
                        }
                        t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0,
                            t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0,
                            t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0,
                            t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0,
                            t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0,
                            t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0,
                            t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0,
                            t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0
                    }

                    var e = a,
                        r = e.lib,
                        i = r.StreamCipher,
                        n = e.algo,
                        o = [],
                        s = [],
                        c = [],
                        h = n.RabbitLegacy = i.extend({
                            _doReset: function () {
                                var e = this._key.words,
                                    r = this.cfg.iv,
                                    i = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
                                    n = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
                                this._b = 0;
                                for (var o = 0; o < 4; o++) t.call(this);
                                for (o = 0; o < 8; o++) n[o] ^= i[o + 4 & 7];
                                if (r) {
                                    var s = r.words,
                                        a = s[0],
                                        c = s[1],
                                        h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
                                        l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
                                        f = h >>> 16 | 4294901760 & l,
                                        u = l << 16 | 65535 & h;
                                    n[0] ^= h,
                                        n[1] ^= f,
                                        n[2] ^= l,
                                        n[3] ^= u,
                                        n[4] ^= h,
                                        n[5] ^= f,
                                        n[6] ^= l,
                                        n[7] ^= u;
                                    for (o = 0; o < 4; o++) t.call(this)
                                }
                            },
                            _doProcessBlock: function (e, r) {
                                var i = this._X;
                                t.call(this),
                                    o[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16,
                                    o[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16,
                                    o[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16,
                                    o[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                                for (var n = 0; n < 4; n++) o[n] = 16711935 & (o[n] << 8 | o[n] >>> 24) | 4278255360 & (o[n] << 24 | o[n] >>> 8),
                                    e[r + n] ^= o[n]
                            },
                            blockSize: 4,
                            ivSize: 2
                        });
                    e.RabbitLegacy = i._createHelper(h)
                }(),
                a.pad.ZeroPadding = {
                    pad: function (t, e) {
                        var r = 4 * e;
                        t.clamp(),
                            t.sigBytes += r - (t.sigBytes % r || r)
                    },
                    unpad: function (t) {
                        for (var e = t.words,
                                 r = t.sigBytes - 1; !(e[r >>> 2] >>> 24 - r % 4 * 8 & 255);) r--;
                        t.sigBytes = r + 1
                    }
                },
                a
        });
const chavy = init();
if ($request.url.match("findQuiz")) {
    const t = decrypt($response.body);
    if (0 == t.errcode) {
        const e = t.data.quiz,
            r = t.data.answer;
        chavy.msg("\u5934\u8111\u5403\u9e21", e, 0 == r ? "\u9519\u8bef \u2b55" : "\u2705 \u6b63\u786e")
    }
    chavy.done()
} else chavy.done();
