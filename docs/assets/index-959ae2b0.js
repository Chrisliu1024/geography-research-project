(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const r of s) if (r.type === 'childList') for (const o of r.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && n(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : s.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = t(s);
    fetch(s.href, r);
  }
})();
function wl(i, e) {
  const t = Object.create(null),
    n = i.split(',');
  for (let s = 0; s < n.length; s++) t[n[s]] = !0;
  return e ? (s) => !!t[s.toLowerCase()] : (s) => !!t[s];
}
function Sl(i) {
  if (ae(i)) {
    const e = {};
    for (let t = 0; t < i.length; t++) {
      const n = i[t],
        s = We(n) ? df(n) : Sl(n);
      if (s) for (const r in s) e[r] = s[r];
    }
    return e;
  } else {
    if (We(i)) return i;
    if (Ae(i)) return i;
  }
}
const cf = /;(?![^(]*\))/g,
  hf = /:([^]+)/,
  uf = /\/\*.*?\*\//gs;
function df(i) {
  const e = {};
  return (
    i
      .replace(uf, '')
      .split(cf)
      .forEach((t) => {
        if (t) {
          const n = t.split(hf);
          n.length > 1 && (e[n[0].trim()] = n[1].trim());
        }
      }),
    e
  );
}
function Tl(i) {
  let e = '';
  if (We(i)) e = i;
  else if (ae(i))
    for (let t = 0; t < i.length; t++) {
      const n = Tl(i[t]);
      n && (e += n + ' ');
    }
  else if (Ae(i)) for (const t in i) i[t] && (e += t + ' ');
  return e.trim();
}
const ff = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  gf = wl(ff);
function Ph(i) {
  return !!i || i === '';
}
const be = {},
  yn = [],
  Et = () => {},
  mf = () => !1,
  _f = /^on[^a-z]/,
  Pr = (i) => _f.test(i),
  Rl = (i) => i.startsWith('onUpdate:'),
  Ke = Object.assign,
  bl = (i, e) => {
    const t = i.indexOf(e);
    t > -1 && i.splice(t, 1);
  },
  pf = Object.prototype.hasOwnProperty,
  pe = (i, e) => pf.call(i, e),
  ae = Array.isArray,
  Jn = (i) => Mr(i) === '[object Map]',
  yf = (i) => Mr(i) === '[object Set]',
  ce = (i) => typeof i == 'function',
  We = (i) => typeof i == 'string',
  Il = (i) => typeof i == 'symbol',
  Ae = (i) => i !== null && typeof i == 'object',
  Mh = (i) => Ae(i) && ce(i.then) && ce(i.catch),
  xf = Object.prototype.toString,
  Mr = (i) => xf.call(i),
  vf = (i) => Mr(i).slice(8, -1),
  Ef = (i) => Mr(i) === '[object Object]',
  Ll = (i) => We(i) && i !== 'NaN' && i[0] !== '-' && '' + parseInt(i, 10) === i,
  tr = wl(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  Ar = (i) => {
    const e = Object.create(null);
    return (t) => e[t] || (e[t] = i(t));
  },
  Cf = /-(\w)/g,
  Dt = Ar((i) => i.replace(Cf, (e, t) => (t ? t.toUpperCase() : ''))),
  wf = /\B([A-Z])/g,
  Dn = Ar((i) => i.replace(wf, '-$1').toLowerCase()),
  Or = Ar((i) => i.charAt(0).toUpperCase() + i.slice(1)),
  so = Ar((i) => (i ? `on${Or(i)}` : '')),
  ls = (i, e) => !Object.is(i, e),
  ro = (i, e) => {
    for (let t = 0; t < i.length; t++) i[t](e);
  },
  ar = (i, e, t) => {
    Object.defineProperty(i, e, { configurable: !0, enumerable: !1, value: t });
  },
  Sf = (i) => {
    const e = parseFloat(i);
    return isNaN(e) ? i : e;
  };
let Ya;
const Tf = () =>
  Ya ||
  (Ya = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : typeof global < 'u' ? global : {});
let yt;
class Rf {
  constructor(e = !1) {
    (this.detached = e),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = yt),
      !e && yt && (this.index = (yt.scopes || (yt.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const t = yt;
      try {
        return (yt = this), e();
      } finally {
        yt = t;
      }
    }
  }
  on() {
    yt = this;
  }
  off() {
    yt = this.parent;
  }
  stop(e) {
    if (this._active) {
      let t, n;
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
      for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
      if (!this.detached && this.parent && !e) {
        const s = this.parent.scopes.pop();
        s && s !== this && ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function bf(i, e = yt) {
  e && e.active && e.effects.push(i);
}
function If() {
  return yt;
}
const Pl = (i) => {
    const e = new Set(i);
    return (e.w = 0), (e.n = 0), e;
  },
  Ah = (i) => (i.w & xi) > 0,
  Oh = (i) => (i.n & xi) > 0,
  Lf = ({ deps: i }) => {
    if (i.length) for (let e = 0; e < i.length; e++) i[e].w |= xi;
  },
  Pf = (i) => {
    const { deps: e } = i;
    if (e.length) {
      let t = 0;
      for (let n = 0; n < e.length; n++) {
        const s = e[n];
        Ah(s) && !Oh(s) ? s.delete(i) : (e[t++] = s), (s.w &= ~xi), (s.n &= ~xi);
      }
      e.length = t;
    }
  },
  ko = new WeakMap();
let Zn = 0,
  xi = 1;
const No = 30;
let xt;
const ji = Symbol(''),
  Go = Symbol('');
class Ml {
  constructor(e, t = null, n) {
    (this.fn = e), (this.scheduler = t), (this.active = !0), (this.deps = []), (this.parent = void 0), bf(this, n);
  }
  run() {
    if (!this.active) return this.fn();
    let e = xt,
      t = _i;
    for (; e; ) {
      if (e === this) return;
      e = e.parent;
    }
    try {
      return (this.parent = xt), (xt = this), (_i = !0), (xi = 1 << ++Zn), Zn <= No ? Lf(this) : Ua(this), this.fn();
    } finally {
      Zn <= No && Pf(this), (xi = 1 << --Zn), (xt = this.parent), (_i = t), (this.parent = void 0), this.deferStop && this.stop();
    }
  }
  stop() {
    xt === this ? (this.deferStop = !0) : this.active && (Ua(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Ua(i) {
  const { deps: e } = i;
  if (e.length) {
    for (let t = 0; t < e.length; t++) e[t].delete(i);
    e.length = 0;
  }
}
let _i = !0;
const Fh = [];
function kn() {
  Fh.push(_i), (_i = !1);
}
function Nn() {
  const i = Fh.pop();
  _i = i === void 0 ? !0 : i;
}
function et(i, e, t) {
  if (_i && xt) {
    let n = ko.get(i);
    n || ko.set(i, (n = new Map()));
    let s = n.get(t);
    s || n.set(t, (s = Pl())), Dh(s);
  }
}
function Dh(i, e) {
  let t = !1;
  Zn <= No ? Oh(i) || ((i.n |= xi), (t = !Ah(i))) : (t = !i.has(xt)), t && (i.add(xt), xt.deps.push(i));
}
function ii(i, e, t, n, s, r) {
  const o = ko.get(i);
  if (!o) return;
  let l = [];
  if (e === 'clear') l = [...o.values()];
  else if (t === 'length' && ae(i)) {
    const a = Number(n);
    o.forEach((c, h) => {
      (h === 'length' || h >= a) && l.push(c);
    });
  } else
    switch ((t !== void 0 && l.push(o.get(t)), e)) {
      case 'add':
        ae(i) ? Ll(t) && l.push(o.get('length')) : (l.push(o.get(ji)), Jn(i) && l.push(o.get(Go)));
        break;
      case 'delete':
        ae(i) || (l.push(o.get(ji)), Jn(i) && l.push(o.get(Go)));
        break;
      case 'set':
        Jn(i) && l.push(o.get(ji));
        break;
    }
  if (l.length === 1) l[0] && Wo(l[0]);
  else {
    const a = [];
    for (const c of l) c && a.push(...c);
    Wo(Pl(a));
  }
}
function Wo(i, e) {
  const t = ae(i) ? i : [...i];
  for (const n of t) n.computed && Va(n);
  for (const n of t) n.computed || Va(n);
}
function Va(i, e) {
  (i !== xt || i.allowRecurse) && (i.scheduler ? i.scheduler() : i.run());
}
const Mf = wl('__proto__,__v_isRef,__isVue'),
  kh = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((i) => i !== 'arguments' && i !== 'caller')
      .map((i) => Symbol[i])
      .filter(Il),
  ),
  Af = Al(),
  Of = Al(!1, !0),
  Ff = Al(!0),
  Ha = Df();
function Df() {
  const i = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
      i[e] = function (...t) {
        const n = ye(this);
        for (let r = 0, o = this.length; r < o; r++) et(n, 'get', r + '');
        const s = n[e](...t);
        return s === -1 || s === !1 ? n[e](...t.map(ye)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
      i[e] = function (...t) {
        kn();
        const n = ye(this)[e].apply(this, t);
        return Nn(), n;
      };
    }),
    i
  );
}
function kf(i) {
  const e = ye(this);
  return et(e, 'has', i), e.hasOwnProperty(i);
}
function Al(i = !1, e = !1) {
  return function (n, s, r) {
    if (s === '__v_isReactive') return !i;
    if (s === '__v_isReadonly') return i;
    if (s === '__v_isShallow') return e;
    if (s === '__v_raw' && r === (i ? (e ? Jf : Bh) : e ? zh : Wh).get(n)) return n;
    const o = ae(n);
    if (!i) {
      if (o && pe(Ha, s)) return Reflect.get(Ha, s, r);
      if (s === 'hasOwnProperty') return kf;
    }
    const l = Reflect.get(n, s, r);
    return (Il(s) ? kh.has(s) : Mf(s)) || (i || et(n, 'get', s), e)
      ? l
      : He(l)
      ? o && Ll(s)
        ? l
        : l.value
      : Ae(l)
      ? i
        ? Xh(l)
        : Ts(l)
      : l;
  };
}
const Nf = Nh(),
  Gf = Nh(!0);
function Nh(i = !1) {
  return function (t, n, s, r) {
    let o = t[n];
    if (Rn(o) && He(o) && !He(s)) return !1;
    if (!i && (!cr(s) && !Rn(s) && ((o = ye(o)), (s = ye(s))), !ae(t) && He(o) && !He(s))) return (o.value = s), !0;
    const l = ae(t) && Ll(n) ? Number(n) < t.length : pe(t, n),
      a = Reflect.set(t, n, s, r);
    return t === ye(r) && (l ? ls(s, o) && ii(t, 'set', n, s) : ii(t, 'add', n, s)), a;
  };
}
function Wf(i, e) {
  const t = pe(i, e);
  i[e];
  const n = Reflect.deleteProperty(i, e);
  return n && t && ii(i, 'delete', e, void 0), n;
}
function zf(i, e) {
  const t = Reflect.has(i, e);
  return (!Il(e) || !kh.has(e)) && et(i, 'has', e), t;
}
function Bf(i) {
  return et(i, 'iterate', ae(i) ? 'length' : ji), Reflect.ownKeys(i);
}
const Gh = { get: Af, set: Nf, deleteProperty: Wf, has: zf, ownKeys: Bf },
  Xf = {
    get: Ff,
    set(i, e) {
      return !0;
    },
    deleteProperty(i, e) {
      return !0;
    },
  },
  jf = Ke({}, Gh, { get: Of, set: Gf }),
  Ol = (i) => i,
  Fr = (i) => Reflect.getPrototypeOf(i);
function Ds(i, e, t = !1, n = !1) {
  i = i.__v_raw;
  const s = ye(i),
    r = ye(e);
  t || (e !== r && et(s, 'get', e), et(s, 'get', r));
  const { has: o } = Fr(s),
    l = n ? Ol : t ? kl : as;
  if (o.call(s, e)) return l(i.get(e));
  if (o.call(s, r)) return l(i.get(r));
  i !== s && i.get(e);
}
function ks(i, e = !1) {
  const t = this.__v_raw,
    n = ye(t),
    s = ye(i);
  return e || (i !== s && et(n, 'has', i), et(n, 'has', s)), i === s ? t.has(i) : t.has(i) || t.has(s);
}
function Ns(i, e = !1) {
  return (i = i.__v_raw), !e && et(ye(i), 'iterate', ji), Reflect.get(i, 'size', i);
}
function Ka(i) {
  i = ye(i);
  const e = ye(this);
  return Fr(e).has.call(e, i) || (e.add(i), ii(e, 'add', i, i)), this;
}
function Za(i, e) {
  e = ye(e);
  const t = ye(this),
    { has: n, get: s } = Fr(t);
  let r = n.call(t, i);
  r || ((i = ye(i)), (r = n.call(t, i)));
  const o = s.call(t, i);
  return t.set(i, e), r ? ls(e, o) && ii(t, 'set', i, e) : ii(t, 'add', i, e), this;
}
function $a(i) {
  const e = ye(this),
    { has: t, get: n } = Fr(e);
  let s = t.call(e, i);
  s || ((i = ye(i)), (s = t.call(e, i))), n && n.call(e, i);
  const r = e.delete(i);
  return s && ii(e, 'delete', i, void 0), r;
}
function qa() {
  const i = ye(this),
    e = i.size !== 0,
    t = i.clear();
  return e && ii(i, 'clear', void 0, void 0), t;
}
function Gs(i, e) {
  return function (n, s) {
    const r = this,
      o = r.__v_raw,
      l = ye(o),
      a = e ? Ol : i ? kl : as;
    return !i && et(l, 'iterate', ji), o.forEach((c, h) => n.call(s, a(c), a(h), r));
  };
}
function Ws(i, e, t) {
  return function (...n) {
    const s = this.__v_raw,
      r = ye(s),
      o = Jn(r),
      l = i === 'entries' || (i === Symbol.iterator && o),
      a = i === 'keys' && o,
      c = s[i](...n),
      h = t ? Ol : e ? kl : as;
    return (
      !e && et(r, 'iterate', a ? Go : ji),
      {
        next() {
          const { value: u, done: d } = c.next();
          return d ? { value: u, done: d } : { value: l ? [h(u[0]), h(u[1])] : h(u), done: d };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function si(i) {
  return function (...e) {
    return i === 'delete' ? !1 : this;
  };
}
function Yf() {
  const i = {
      get(r) {
        return Ds(this, r);
      },
      get size() {
        return Ns(this);
      },
      has: ks,
      add: Ka,
      set: Za,
      delete: $a,
      clear: qa,
      forEach: Gs(!1, !1),
    },
    e = {
      get(r) {
        return Ds(this, r, !1, !0);
      },
      get size() {
        return Ns(this);
      },
      has: ks,
      add: Ka,
      set: Za,
      delete: $a,
      clear: qa,
      forEach: Gs(!1, !0),
    },
    t = {
      get(r) {
        return Ds(this, r, !0);
      },
      get size() {
        return Ns(this, !0);
      },
      has(r) {
        return ks.call(this, r, !0);
      },
      add: si('add'),
      set: si('set'),
      delete: si('delete'),
      clear: si('clear'),
      forEach: Gs(!0, !1),
    },
    n = {
      get(r) {
        return Ds(this, r, !0, !0);
      },
      get size() {
        return Ns(this, !0);
      },
      has(r) {
        return ks.call(this, r, !0);
      },
      add: si('add'),
      set: si('set'),
      delete: si('delete'),
      clear: si('clear'),
      forEach: Gs(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      (i[r] = Ws(r, !1, !1)), (t[r] = Ws(r, !0, !1)), (e[r] = Ws(r, !1, !0)), (n[r] = Ws(r, !0, !0));
    }),
    [i, t, e, n]
  );
}
const [Uf, Vf, Hf, Kf] = Yf();
function Fl(i, e) {
  const t = e ? (i ? Kf : Hf) : i ? Vf : Uf;
  return (n, s, r) =>
    s === '__v_isReactive' ? !i : s === '__v_isReadonly' ? i : s === '__v_raw' ? n : Reflect.get(pe(t, s) && s in n ? t : n, s, r);
}
const Zf = { get: Fl(!1, !1) },
  $f = { get: Fl(!1, !0) },
  qf = { get: Fl(!0, !1) },
  Wh = new WeakMap(),
  zh = new WeakMap(),
  Bh = new WeakMap(),
  Jf = new WeakMap();
function Qf(i) {
  switch (i) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function eg(i) {
  return i.__v_skip || !Object.isExtensible(i) ? 0 : Qf(vf(i));
}
function Ts(i) {
  return Rn(i) ? i : Dl(i, !1, Gh, Zf, Wh);
}
function tg(i) {
  return Dl(i, !1, jf, $f, zh);
}
function Xh(i) {
  return Dl(i, !0, Xf, qf, Bh);
}
function Dl(i, e, t, n, s) {
  if (!Ae(i) || (i.__v_raw && !(e && i.__v_isReactive))) return i;
  const r = s.get(i);
  if (r) return r;
  const o = eg(i);
  if (o === 0) return i;
  const l = new Proxy(i, o === 2 ? n : t);
  return s.set(i, l), l;
}
function xn(i) {
  return Rn(i) ? xn(i.__v_raw) : !!(i && i.__v_isReactive);
}
function Rn(i) {
  return !!(i && i.__v_isReadonly);
}
function cr(i) {
  return !!(i && i.__v_isShallow);
}
function jh(i) {
  return xn(i) || Rn(i);
}
function ye(i) {
  const e = i && i.__v_raw;
  return e ? ye(e) : i;
}
function Yh(i) {
  return ar(i, '__v_skip', !0), i;
}
const as = (i) => (Ae(i) ? Ts(i) : i),
  kl = (i) => (Ae(i) ? Xh(i) : i);
function Uh(i) {
  _i && xt && ((i = ye(i)), Dh(i.dep || (i.dep = Pl())));
}
function Vh(i, e) {
  i = ye(i);
  const t = i.dep;
  t && Wo(t);
}
function He(i) {
  return !!(i && i.__v_isRef === !0);
}
function ig(i) {
  return Hh(i, !1);
}
function ng(i) {
  return Hh(i, !0);
}
function Hh(i, e) {
  return He(i) ? i : new sg(i, e);
}
class sg {
  constructor(e, t) {
    (this.__v_isShallow = t), (this.dep = void 0), (this.__v_isRef = !0), (this._rawValue = t ? e : ye(e)), (this._value = t ? e : as(e));
  }
  get value() {
    return Uh(this), this._value;
  }
  set value(e) {
    const t = this.__v_isShallow || cr(e) || Rn(e);
    (e = t ? e : ye(e)), ls(e, this._rawValue) && ((this._rawValue = e), (this._value = t ? e : as(e)), Vh(this));
  }
}
function vn(i) {
  return He(i) ? i.value : i;
}
const rg = {
  get: (i, e, t) => vn(Reflect.get(i, e, t)),
  set: (i, e, t, n) => {
    const s = i[e];
    return He(s) && !He(t) ? ((s.value = t), !0) : Reflect.set(i, e, t, n);
  },
};
function Kh(i) {
  return xn(i) ? i : new Proxy(i, rg);
}
var Zh;
class og {
  constructor(e, t, n, s) {
    (this._setter = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Zh] = !1),
      (this._dirty = !0),
      (this.effect = new Ml(e, () => {
        this._dirty || ((this._dirty = !0), Vh(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = n);
  }
  get value() {
    const e = ye(this);
    return Uh(e), (e._dirty || !e._cacheable) && ((e._dirty = !1), (e._value = e.effect.run())), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
Zh = '__v_isReadonly';
function lg(i, e, t = !1) {
  let n, s;
  const r = ce(i);
  return r ? ((n = i), (s = Et)) : ((n = i.get), (s = i.set)), new og(n, s, r || !s, t);
}
function pi(i, e, t, n) {
  let s;
  try {
    s = n ? i(...n) : i();
  } catch (r) {
    Dr(r, e, t);
  }
  return s;
}
function ft(i, e, t, n) {
  if (ce(i)) {
    const r = pi(i, e, t, n);
    return (
      r &&
        Mh(r) &&
        r.catch((o) => {
          Dr(o, e, t);
        }),
      r
    );
  }
  const s = [];
  for (let r = 0; r < i.length; r++) s.push(ft(i[r], e, t, n));
  return s;
}
function Dr(i, e, t, n = !0) {
  const s = e ? e.vnode : null;
  if (e) {
    let r = e.parent;
    const o = e.proxy,
      l = t;
    for (; r; ) {
      const c = r.ec;
      if (c) {
        for (let h = 0; h < c.length; h++) if (c[h](i, o, l) === !1) return;
      }
      r = r.parent;
    }
    const a = e.appContext.config.errorHandler;
    if (a) {
      pi(a, null, 10, [i, o, l]);
      return;
    }
  }
  ag(i, t, s, n);
}
function ag(i, e, t, n = !0) {
  console.error(i);
}
let cs = !1,
  zo = !1;
const Ve = [];
let Mt = 0;
const En = [];
let Vt = null,
  Oi = 0;
const $h = Promise.resolve();
let Nl = null;
function qh(i) {
  const e = Nl || $h;
  return i ? e.then(this ? i.bind(this) : i) : e;
}
function cg(i) {
  let e = Mt + 1,
    t = Ve.length;
  for (; e < t; ) {
    const n = (e + t) >>> 1;
    hs(Ve[n]) < i ? (e = n + 1) : (t = n);
  }
  return e;
}
function Gl(i) {
  (!Ve.length || !Ve.includes(i, cs && i.allowRecurse ? Mt + 1 : Mt)) && (i.id == null ? Ve.push(i) : Ve.splice(cg(i.id), 0, i), Jh());
}
function Jh() {
  !cs && !zo && ((zo = !0), (Nl = $h.then(eu)));
}
function hg(i) {
  const e = Ve.indexOf(i);
  e > Mt && Ve.splice(e, 1);
}
function ug(i) {
  ae(i) ? En.push(...i) : (!Vt || !Vt.includes(i, i.allowRecurse ? Oi + 1 : Oi)) && En.push(i), Jh();
}
function Ja(i, e = cs ? Mt + 1 : 0) {
  for (; e < Ve.length; e++) {
    const t = Ve[e];
    t && t.pre && (Ve.splice(e, 1), e--, t());
  }
}
function Qh(i) {
  if (En.length) {
    const e = [...new Set(En)];
    if (((En.length = 0), Vt)) {
      Vt.push(...e);
      return;
    }
    for (Vt = e, Vt.sort((t, n) => hs(t) - hs(n)), Oi = 0; Oi < Vt.length; Oi++) Vt[Oi]();
    (Vt = null), (Oi = 0);
  }
}
const hs = (i) => (i.id == null ? 1 / 0 : i.id),
  dg = (i, e) => {
    const t = hs(i) - hs(e);
    if (t === 0) {
      if (i.pre && !e.pre) return -1;
      if (e.pre && !i.pre) return 1;
    }
    return t;
  };
function eu(i) {
  (zo = !1), (cs = !0), Ve.sort(dg);
  const e = Et;
  try {
    for (Mt = 0; Mt < Ve.length; Mt++) {
      const t = Ve[Mt];
      t && t.active !== !1 && pi(t, null, 14);
    }
  } finally {
    (Mt = 0), (Ve.length = 0), Qh(), (cs = !1), (Nl = null), (Ve.length || En.length) && eu();
  }
}
function fg(i, e, ...t) {
  if (i.isUnmounted) return;
  const n = i.vnode.props || be;
  let s = t;
  const r = e.startsWith('update:'),
    o = r && e.slice(7);
  if (o && o in n) {
    const h = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: u, trim: d } = n[h] || be;
    d && (s = t.map((f) => (We(f) ? f.trim() : f))), u && (s = t.map(Sf));
  }
  let l,
    a = n[(l = so(e))] || n[(l = so(Dt(e)))];
  !a && r && (a = n[(l = so(Dn(e)))]), a && ft(a, i, 6, s);
  const c = n[l + 'Once'];
  if (c) {
    if (!i.emitted) i.emitted = {};
    else if (i.emitted[l]) return;
    (i.emitted[l] = !0), ft(c, i, 6, s);
  }
}
function tu(i, e, t = !1) {
  const n = e.emitsCache,
    s = n.get(i);
  if (s !== void 0) return s;
  const r = i.emits;
  let o = {},
    l = !1;
  if (!ce(i)) {
    const a = (c) => {
      const h = tu(c, e, !0);
      h && ((l = !0), Ke(o, h));
    };
    !t && e.mixins.length && e.mixins.forEach(a), i.extends && a(i.extends), i.mixins && i.mixins.forEach(a);
  }
  return !r && !l ? (Ae(i) && n.set(i, null), null) : (ae(r) ? r.forEach((a) => (o[a] = null)) : Ke(o, r), Ae(i) && n.set(i, o), o);
}
function kr(i, e) {
  return !i || !Pr(e) ? !1 : ((e = e.slice(2).replace(/Once$/, '')), pe(i, e[0].toLowerCase() + e.slice(1)) || pe(i, Dn(e)) || pe(i, e));
}
let ht = null,
  iu = null;
function hr(i) {
  const e = ht;
  return (ht = i), (iu = (i && i.type.__scopeId) || null), e;
}
function gg(i, e = ht, t) {
  if (!e || i._n) return i;
  const n = (...s) => {
    n._d && ac(-1);
    const r = hr(e);
    let o;
    try {
      o = i(...s);
    } finally {
      hr(r), n._d && ac(1);
    }
    return o;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function oo(i) {
  const {
    type: e,
    vnode: t,
    proxy: n,
    withProxy: s,
    props: r,
    propsOptions: [o],
    slots: l,
    attrs: a,
    emit: c,
    render: h,
    renderCache: u,
    data: d,
    setupState: f,
    ctx: g,
    inheritAttrs: m,
  } = i;
  let _, p;
  const v = hr(i);
  try {
    if (t.shapeFlag & 4) {
      const E = s || n;
      (_ = Pt(h.call(E, E, u, r, f, d, g))), (p = a);
    } else {
      const E = e;
      (_ = Pt(E.length > 1 ? E(r, { attrs: a, slots: l, emit: c }) : E(r, null))), (p = e.props ? a : mg(a));
    }
  } catch (E) {
    (es.length = 0), Dr(E, i, 1), (_ = ut(Qt));
  }
  let x = _;
  if (p && m !== !1) {
    const E = Object.keys(p),
      { shapeFlag: w } = x;
    E.length && w & 7 && (o && E.some(Rl) && (p = _g(p, o)), (x = vi(x, p)));
  }
  return (
    t.dirs && ((x = vi(x)), (x.dirs = x.dirs ? x.dirs.concat(t.dirs) : t.dirs)),
    t.transition && (x.transition = t.transition),
    (_ = x),
    hr(v),
    _
  );
}
const mg = (i) => {
    let e;
    for (const t in i) (t === 'class' || t === 'style' || Pr(t)) && ((e || (e = {}))[t] = i[t]);
    return e;
  },
  _g = (i, e) => {
    const t = {};
    for (const n in i) (!Rl(n) || !(n.slice(9) in e)) && (t[n] = i[n]);
    return t;
  };
function pg(i, e, t) {
  const { props: n, children: s, component: r } = i,
    { props: o, children: l, patchFlag: a } = e,
    c = r.emitsOptions;
  if (e.dirs || e.transition) return !0;
  if (t && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return n ? Qa(n, o, c) : !!o;
    if (a & 8) {
      const h = e.dynamicProps;
      for (let u = 0; u < h.length; u++) {
        const d = h[u];
        if (o[d] !== n[d] && !kr(c, d)) return !0;
      }
    }
  } else return (s || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? (o ? Qa(n, o, c) : !0) : !!o;
  return !1;
}
function Qa(i, e, t) {
  const n = Object.keys(e);
  if (n.length !== Object.keys(i).length) return !0;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    if (e[r] !== i[r] && !kr(t, r)) return !0;
  }
  return !1;
}
function yg({ vnode: i, parent: e }, t) {
  for (; e && e.subTree === i; ) ((i = e.vnode).el = t), (e = e.parent);
}
const xg = (i) => i.__isSuspense;
function vg(i, e) {
  e && e.pendingBranch ? (ae(i) ? e.effects.push(...i) : e.effects.push(i)) : ug(i);
}
function ir(i, e) {
  if (Pe) {
    let t = Pe.provides;
    const n = Pe.parent && Pe.parent.provides;
    n === t && (t = Pe.provides = Object.create(n)), (t[i] = e);
  }
}
function Jt(i, e, t = !1) {
  const n = Pe || ht;
  if (n) {
    const s = n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides;
    if (s && i in s) return s[i];
    if (arguments.length > 1) return t && ce(e) ? e.call(n.proxy) : e;
  }
}
const zs = {};
function nr(i, e, t) {
  return nu(i, e, t);
}
function nu(i, e, { immediate: t, deep: n, flush: s, onTrack: r, onTrigger: o } = be) {
  const l = If() === (Pe == null ? void 0 : Pe.scope) ? Pe : null;
  let a,
    c = !1,
    h = !1;
  if (
    (He(i)
      ? ((a = () => i.value), (c = cr(i)))
      : xn(i)
      ? ((a = () => i), (n = !0))
      : ae(i)
      ? ((h = !0),
        (c = i.some((x) => xn(x) || cr(x))),
        (a = () =>
          i.map((x) => {
            if (He(x)) return x.value;
            if (xn(x)) return _n(x);
            if (ce(x)) return pi(x, l, 2);
          })))
      : ce(i)
      ? e
        ? (a = () => pi(i, l, 2))
        : (a = () => {
            if (!(l && l.isUnmounted)) return u && u(), ft(i, l, 3, [d]);
          })
      : (a = Et),
    e && n)
  ) {
    const x = a;
    a = () => _n(x());
  }
  let u,
    d = (x) => {
      u = p.onStop = () => {
        pi(x, l, 4);
      };
    },
    f;
  if (ds)
    if (((d = Et), e ? t && ft(e, l, 3, [a(), h ? [] : void 0, d]) : a(), s === 'sync')) {
      const x = ym();
      f = x.__watcherHandles || (x.__watcherHandles = []);
    } else return Et;
  let g = h ? new Array(i.length).fill(zs) : zs;
  const m = () => {
    if (p.active)
      if (e) {
        const x = p.run();
        (n || c || (h ? x.some((E, w) => ls(E, g[w])) : ls(x, g))) &&
          (u && u(), ft(e, l, 3, [x, g === zs ? void 0 : h && g[0] === zs ? [] : g, d]), (g = x));
      } else p.run();
  };
  m.allowRecurse = !!e;
  let _;
  s === 'sync' ? (_ = m) : s === 'post' ? (_ = () => Qe(m, l && l.suspense)) : ((m.pre = !0), l && (m.id = l.uid), (_ = () => Gl(m)));
  const p = new Ml(a, _);
  e ? (t ? m() : (g = p.run())) : s === 'post' ? Qe(p.run.bind(p), l && l.suspense) : p.run();
  const v = () => {
    p.stop(), l && l.scope && bl(l.scope.effects, p);
  };
  return f && f.push(v), v;
}
function Eg(i, e, t) {
  const n = this.proxy,
    s = We(i) ? (i.includes('.') ? su(n, i) : () => n[i]) : i.bind(n, n);
  let r;
  ce(e) ? (r = e) : ((r = e.handler), (t = e));
  const o = Pe;
  bn(this);
  const l = nu(s, r.bind(n), t);
  return o ? bn(o) : Yi(), l;
}
function su(i, e) {
  const t = e.split('.');
  return () => {
    let n = i;
    for (let s = 0; s < t.length && n; s++) n = n[t[s]];
    return n;
  };
}
function _n(i, e) {
  if (!Ae(i) || i.__v_skip || ((e = e || new Set()), e.has(i))) return i;
  if ((e.add(i), He(i))) _n(i.value, e);
  else if (ae(i)) for (let t = 0; t < i.length; t++) _n(i[t], e);
  else if (yf(i) || Jn(i))
    i.forEach((t) => {
      _n(t, e);
    });
  else if (Ef(i)) for (const t in i) _n(i[t], e);
  return i;
}
function Cg() {
  const i = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
  return (
    au(() => {
      i.isMounted = !0;
    }),
    cu(() => {
      i.isUnmounting = !0;
    }),
    i
  );
}
const at = [Function, Array],
  wg = {
    name: 'BaseTransition',
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: at,
      onEnter: at,
      onAfterEnter: at,
      onEnterCancelled: at,
      onBeforeLeave: at,
      onLeave: at,
      onAfterLeave: at,
      onLeaveCancelled: at,
      onBeforeAppear: at,
      onAppear: at,
      onAfterAppear: at,
      onAppearCancelled: at,
    },
    setup(i, { slots: e }) {
      const t = hm(),
        n = Cg();
      let s;
      return () => {
        const r = e.default && ou(e.default(), !0);
        if (!r || !r.length) return;
        let o = r[0];
        if (r.length > 1) {
          for (const m of r)
            if (m.type !== Qt) {
              o = m;
              break;
            }
        }
        const l = ye(i),
          { mode: a } = l;
        if (n.isLeaving) return lo(o);
        const c = ec(o);
        if (!c) return lo(o);
        const h = Bo(c, l, n, t);
        Xo(c, h);
        const u = t.subTree,
          d = u && ec(u);
        let f = !1;
        const { getTransitionKey: g } = c.type;
        if (g) {
          const m = g();
          s === void 0 ? (s = m) : m !== s && ((s = m), (f = !0));
        }
        if (d && d.type !== Qt && (!Fi(c, d) || f)) {
          const m = Bo(d, l, n, t);
          if ((Xo(d, m), a === 'out-in'))
            return (
              (n.isLeaving = !0),
              (m.afterLeave = () => {
                (n.isLeaving = !1), t.update.active !== !1 && t.update();
              }),
              lo(o)
            );
          a === 'in-out' &&
            c.type !== Qt &&
            (m.delayLeave = (_, p, v) => {
              const x = ru(n, d);
              (x[String(d.key)] = d),
                (_._leaveCb = () => {
                  p(), (_._leaveCb = void 0), delete h.delayedLeave;
                }),
                (h.delayedLeave = v);
            });
        }
        return o;
      };
    },
  },
  Sg = wg;
function ru(i, e) {
  const { leavingVNodes: t } = i;
  let n = t.get(e.type);
  return n || ((n = Object.create(null)), t.set(e.type, n)), n;
}
function Bo(i, e, t, n) {
  const {
      appear: s,
      mode: r,
      persisted: o = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: c,
      onEnterCancelled: h,
      onBeforeLeave: u,
      onLeave: d,
      onAfterLeave: f,
      onLeaveCancelled: g,
      onBeforeAppear: m,
      onAppear: _,
      onAfterAppear: p,
      onAppearCancelled: v,
    } = e,
    x = String(i.key),
    E = ru(t, i),
    w = (S, k) => {
      S && ft(S, n, 9, k);
    },
    P = (S, k) => {
      const W = k[1];
      w(S, k), ae(S) ? S.every((Q) => Q.length <= 1) && W() : S.length <= 1 && W();
    },
    b = {
      mode: r,
      persisted: o,
      beforeEnter(S) {
        let k = l;
        if (!t.isMounted)
          if (s) k = m || l;
          else return;
        S._leaveCb && S._leaveCb(!0);
        const W = E[x];
        W && Fi(i, W) && W.el._leaveCb && W.el._leaveCb(), w(k, [S]);
      },
      enter(S) {
        let k = a,
          W = c,
          Q = h;
        if (!t.isMounted)
          if (s) (k = _ || a), (W = p || c), (Q = v || h);
          else return;
        let $ = !1;
        const ee = (S._enterCb = (Ee) => {
          $ || (($ = !0), Ee ? w(Q, [S]) : w(W, [S]), b.delayedLeave && b.delayedLeave(), (S._enterCb = void 0));
        });
        k ? P(k, [S, ee]) : ee();
      },
      leave(S, k) {
        const W = String(i.key);
        if ((S._enterCb && S._enterCb(!0), t.isUnmounting)) return k();
        w(u, [S]);
        let Q = !1;
        const $ = (S._leaveCb = (ee) => {
          Q || ((Q = !0), k(), ee ? w(g, [S]) : w(f, [S]), (S._leaveCb = void 0), E[W] === i && delete E[W]);
        });
        (E[W] = i), d ? P(d, [S, $]) : $();
      },
      clone(S) {
        return Bo(S, e, t, n);
      },
    };
  return b;
}
function lo(i) {
  if (Nr(i)) return (i = vi(i)), (i.children = null), i;
}
function ec(i) {
  return Nr(i) ? (i.children ? i.children[0] : void 0) : i;
}
function Xo(i, e) {
  i.shapeFlag & 6 && i.component
    ? Xo(i.component.subTree, e)
    : i.shapeFlag & 128
    ? ((i.ssContent.transition = e.clone(i.ssContent)), (i.ssFallback.transition = e.clone(i.ssFallback)))
    : (i.transition = e);
}
function ou(i, e = !1, t) {
  let n = [],
    s = 0;
  for (let r = 0; r < i.length; r++) {
    let o = i[r];
    const l = t == null ? o.key : String(t) + String(o.key != null ? o.key : r);
    o.type === Lt
      ? (o.patchFlag & 128 && s++, (n = n.concat(ou(o.children, e, l))))
      : (e || o.type !== Qt) && n.push(l != null ? vi(o, { key: l }) : o);
  }
  if (s > 1) for (let r = 0; r < n.length; r++) n[r].patchFlag = -2;
  return n;
}
function Wl(i) {
  return ce(i) ? { setup: i, name: i.name } : i;
}
const sr = (i) => !!i.type.__asyncLoader,
  Nr = (i) => i.type.__isKeepAlive;
function Tg(i, e) {
  lu(i, 'a', e);
}
function Rg(i, e) {
  lu(i, 'da', e);
}
function lu(i, e, t = Pe) {
  const n =
    i.__wdc ||
    (i.__wdc = () => {
      let s = t;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return i();
    });
  if ((Gr(e, n, t), t)) {
    let s = t.parent;
    for (; s && s.parent; ) Nr(s.parent.vnode) && bg(n, e, t, s), (s = s.parent);
  }
}
function bg(i, e, t, n) {
  const s = Gr(e, i, n, !0);
  hu(() => {
    bl(n[e], s);
  }, t);
}
function Gr(i, e, t = Pe, n = !1) {
  if (t) {
    const s = t[i] || (t[i] = []),
      r =
        e.__weh ||
        (e.__weh = (...o) => {
          if (t.isUnmounted) return;
          kn(), bn(t);
          const l = ft(e, t, i, o);
          return Yi(), Nn(), l;
        });
    return n ? s.unshift(r) : s.push(r), r;
  }
}
const ni =
    (i) =>
    (e, t = Pe) =>
      (!ds || i === 'sp') && Gr(i, (...n) => e(...n), t),
  Ig = ni('bm'),
  au = ni('m'),
  Lg = ni('bu'),
  Pg = ni('u'),
  cu = ni('bum'),
  hu = ni('um'),
  Mg = ni('sp'),
  Ag = ni('rtg'),
  Og = ni('rtc');
function Fg(i, e = Pe) {
  Gr('ec', i, e);
}
function bi(i, e, t, n) {
  const s = i.dirs,
    r = e && e.dirs;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    r && (l.oldValue = r[o].value);
    let a = l.dir[n];
    a && (kn(), ft(a, t, 8, [i.el, l, i, e]), Nn());
  }
}
const uu = 'components';
function Dg(i, e) {
  return Ng(uu, i, !0, e) || i;
}
const kg = Symbol();
function Ng(i, e, t = !0, n = !1) {
  const s = ht || Pe;
  if (s) {
    const r = s.type;
    if (i === uu) {
      const l = mm(r, !1);
      if (l && (l === e || l === Dt(e) || l === Or(Dt(e)))) return r;
    }
    const o = tc(s[i] || r[i], e) || tc(s.appContext[i], e);
    return !o && n ? r : o;
  }
}
function tc(i, e) {
  return i && (i[e] || i[Dt(e)] || i[Or(Dt(e))]);
}
const jo = (i) => (i ? (wu(i) ? Ul(i) || i.proxy : jo(i.parent)) : null),
  Qn = Ke(Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => jo(i.parent),
    $root: (i) => jo(i.root),
    $emit: (i) => i.emit,
    $options: (i) => zl(i),
    $forceUpdate: (i) => i.f || (i.f = () => Gl(i.update)),
    $nextTick: (i) => i.n || (i.n = qh.bind(i.proxy)),
    $watch: (i) => Eg.bind(i),
  }),
  ao = (i, e) => i !== be && !i.__isScriptSetup && pe(i, e),
  Gg = {
    get({ _: i }, e) {
      const { ctx: t, setupState: n, data: s, props: r, accessCache: o, type: l, appContext: a } = i;
      let c;
      if (e[0] !== '$') {
        const f = o[e];
        if (f !== void 0)
          switch (f) {
            case 1:
              return n[e];
            case 2:
              return s[e];
            case 4:
              return t[e];
            case 3:
              return r[e];
          }
        else {
          if (ao(n, e)) return (o[e] = 1), n[e];
          if (s !== be && pe(s, e)) return (o[e] = 2), s[e];
          if ((c = i.propsOptions[0]) && pe(c, e)) return (o[e] = 3), r[e];
          if (t !== be && pe(t, e)) return (o[e] = 4), t[e];
          Yo && (o[e] = 0);
        }
      }
      const h = Qn[e];
      let u, d;
      if (h) return e === '$attrs' && et(i, 'get', e), h(i);
      if ((u = l.__cssModules) && (u = u[e])) return u;
      if (t !== be && pe(t, e)) return (o[e] = 4), t[e];
      if (((d = a.config.globalProperties), pe(d, e))) return d[e];
    },
    set({ _: i }, e, t) {
      const { data: n, setupState: s, ctx: r } = i;
      return ao(s, e)
        ? ((s[e] = t), !0)
        : n !== be && pe(n, e)
        ? ((n[e] = t), !0)
        : pe(i.props, e) || (e[0] === '$' && e.slice(1) in i)
        ? !1
        : ((r[e] = t), !0);
    },
    has({ _: { data: i, setupState: e, accessCache: t, ctx: n, appContext: s, propsOptions: r } }, o) {
      let l;
      return (
        !!t[o] ||
        (i !== be && pe(i, o)) ||
        ao(e, o) ||
        ((l = r[0]) && pe(l, o)) ||
        pe(n, o) ||
        pe(Qn, o) ||
        pe(s.config.globalProperties, o)
      );
    },
    defineProperty(i, e, t) {
      return t.get != null ? (i._.accessCache[e] = 0) : pe(t, 'value') && this.set(i, e, t.value, null), Reflect.defineProperty(i, e, t);
    },
  };
let Yo = !0;
function Wg(i) {
  const e = zl(i),
    t = i.proxy,
    n = i.ctx;
  (Yo = !1), e.beforeCreate && ic(e.beforeCreate, i, 'bc');
  const {
    data: s,
    computed: r,
    methods: o,
    watch: l,
    provide: a,
    inject: c,
    created: h,
    beforeMount: u,
    mounted: d,
    beforeUpdate: f,
    updated: g,
    activated: m,
    deactivated: _,
    beforeDestroy: p,
    beforeUnmount: v,
    destroyed: x,
    unmounted: E,
    render: w,
    renderTracked: P,
    renderTriggered: b,
    errorCaptured: S,
    serverPrefetch: k,
    expose: W,
    inheritAttrs: Q,
    components: $,
    directives: ee,
    filters: Ee,
  } = e;
  if ((c && zg(c, n, null, i.appContext.config.unwrapInjectedRef), o))
    for (const O in o) {
      const j = o[O];
      ce(j) && (n[O] = j.bind(t));
    }
  if (s) {
    const O = s.call(t, t);
    Ae(O) && (i.data = Ts(O));
  }
  if (((Yo = !0), r))
    for (const O in r) {
      const j = r[O],
        le = ce(j) ? j.bind(t, t) : ce(j.get) ? j.get.bind(t, t) : Et,
        ue = !ce(j) && ce(j.set) ? j.set.bind(t) : Et,
        xe = ct({ get: le, set: ue });
      Object.defineProperty(n, O, { enumerable: !0, configurable: !0, get: () => xe.value, set: (M) => (xe.value = M) });
    }
  if (l) for (const O in l) du(l[O], n, t, O);
  if (a) {
    const O = ce(a) ? a.call(t) : a;
    Reflect.ownKeys(O).forEach((j) => {
      ir(j, O[j]);
    });
  }
  h && ic(h, i, 'c');
  function U(O, j) {
    ae(j) ? j.forEach((le) => O(le.bind(t))) : j && O(j.bind(t));
  }
  if ((U(Ig, u), U(au, d), U(Lg, f), U(Pg, g), U(Tg, m), U(Rg, _), U(Fg, S), U(Og, P), U(Ag, b), U(cu, v), U(hu, E), U(Mg, k), ae(W)))
    if (W.length) {
      const O = i.exposed || (i.exposed = {});
      W.forEach((j) => {
        Object.defineProperty(O, j, { get: () => t[j], set: (le) => (t[j] = le) });
      });
    } else i.exposed || (i.exposed = {});
  w && i.render === Et && (i.render = w), Q != null && (i.inheritAttrs = Q), $ && (i.components = $), ee && (i.directives = ee);
}
function zg(i, e, t = Et, n = !1) {
  ae(i) && (i = Uo(i));
  for (const s in i) {
    const r = i[s];
    let o;
    Ae(r) ? ('default' in r ? (o = Jt(r.from || s, r.default, !0)) : (o = Jt(r.from || s))) : (o = Jt(r)),
      He(o) && n
        ? Object.defineProperty(e, s, { enumerable: !0, configurable: !0, get: () => o.value, set: (l) => (o.value = l) })
        : (e[s] = o);
  }
}
function ic(i, e, t) {
  ft(ae(i) ? i.map((n) => n.bind(e.proxy)) : i.bind(e.proxy), e, t);
}
function du(i, e, t, n) {
  const s = n.includes('.') ? su(t, n) : () => t[n];
  if (We(i)) {
    const r = e[i];
    ce(r) && nr(s, r);
  } else if (ce(i)) nr(s, i.bind(t));
  else if (Ae(i))
    if (ae(i)) i.forEach((r) => du(r, e, t, n));
    else {
      const r = ce(i.handler) ? i.handler.bind(t) : e[i.handler];
      ce(r) && nr(s, r, i);
    }
}
function zl(i) {
  const e = i.type,
    { mixins: t, extends: n } = e,
    {
      mixins: s,
      optionsCache: r,
      config: { optionMergeStrategies: o },
    } = i.appContext,
    l = r.get(e);
  let a;
  return (
    l ? (a = l) : !s.length && !t && !n ? (a = e) : ((a = {}), s.length && s.forEach((c) => ur(a, c, o, !0)), ur(a, e, o)),
    Ae(e) && r.set(e, a),
    a
  );
}
function ur(i, e, t, n = !1) {
  const { mixins: s, extends: r } = e;
  r && ur(i, r, t, !0), s && s.forEach((o) => ur(i, o, t, !0));
  for (const o in e)
    if (!(n && o === 'expose')) {
      const l = Bg[o] || (t && t[o]);
      i[o] = l ? l(i[o], e[o]) : e[o];
    }
  return i;
}
const Bg = {
  data: nc,
  props: Mi,
  emits: Mi,
  methods: Mi,
  computed: Mi,
  beforeCreate: $e,
  created: $e,
  beforeMount: $e,
  mounted: $e,
  beforeUpdate: $e,
  updated: $e,
  beforeDestroy: $e,
  beforeUnmount: $e,
  destroyed: $e,
  unmounted: $e,
  activated: $e,
  deactivated: $e,
  errorCaptured: $e,
  serverPrefetch: $e,
  components: Mi,
  directives: Mi,
  watch: jg,
  provide: nc,
  inject: Xg,
};
function nc(i, e) {
  return e
    ? i
      ? function () {
          return Ke(ce(i) ? i.call(this, this) : i, ce(e) ? e.call(this, this) : e);
        }
      : e
    : i;
}
function Xg(i, e) {
  return Mi(Uo(i), Uo(e));
}
function Uo(i) {
  if (ae(i)) {
    const e = {};
    for (let t = 0; t < i.length; t++) e[i[t]] = i[t];
    return e;
  }
  return i;
}
function $e(i, e) {
  return i ? [...new Set([].concat(i, e))] : e;
}
function Mi(i, e) {
  return i ? Ke(Ke(Object.create(null), i), e) : e;
}
function jg(i, e) {
  if (!i) return e;
  if (!e) return i;
  const t = Ke(Object.create(null), i);
  for (const n in e) t[n] = $e(i[n], e[n]);
  return t;
}
function Yg(i, e, t, n = !1) {
  const s = {},
    r = {};
  ar(r, zr, 1), (i.propsDefaults = Object.create(null)), fu(i, e, s, r);
  for (const o in i.propsOptions[0]) o in s || (s[o] = void 0);
  t ? (i.props = n ? s : tg(s)) : i.type.props ? (i.props = s) : (i.props = r), (i.attrs = r);
}
function Ug(i, e, t, n) {
  const {
      props: s,
      attrs: r,
      vnode: { patchFlag: o },
    } = i,
    l = ye(s),
    [a] = i.propsOptions;
  let c = !1;
  if ((n || o > 0) && !(o & 16)) {
    if (o & 8) {
      const h = i.vnode.dynamicProps;
      for (let u = 0; u < h.length; u++) {
        let d = h[u];
        if (kr(i.emitsOptions, d)) continue;
        const f = e[d];
        if (a)
          if (pe(r, d)) f !== r[d] && ((r[d] = f), (c = !0));
          else {
            const g = Dt(d);
            s[g] = Vo(a, l, g, f, i, !1);
          }
        else f !== r[d] && ((r[d] = f), (c = !0));
      }
    }
  } else {
    fu(i, e, s, r) && (c = !0);
    let h;
    for (const u in l)
      (!e || (!pe(e, u) && ((h = Dn(u)) === u || !pe(e, h)))) &&
        (a ? t && (t[u] !== void 0 || t[h] !== void 0) && (s[u] = Vo(a, l, u, void 0, i, !0)) : delete s[u]);
    if (r !== l) for (const u in r) (!e || !pe(e, u)) && (delete r[u], (c = !0));
  }
  c && ii(i, 'set', '$attrs');
}
function fu(i, e, t, n) {
  const [s, r] = i.propsOptions;
  let o = !1,
    l;
  if (e)
    for (let a in e) {
      if (tr(a)) continue;
      const c = e[a];
      let h;
      s && pe(s, (h = Dt(a)))
        ? !r || !r.includes(h)
          ? (t[h] = c)
          : ((l || (l = {}))[h] = c)
        : kr(i.emitsOptions, a) || ((!(a in n) || c !== n[a]) && ((n[a] = c), (o = !0)));
    }
  if (r) {
    const a = ye(t),
      c = l || be;
    for (let h = 0; h < r.length; h++) {
      const u = r[h];
      t[u] = Vo(s, a, u, c[u], i, !pe(c, u));
    }
  }
  return o;
}
function Vo(i, e, t, n, s, r) {
  const o = i[t];
  if (o != null) {
    const l = pe(o, 'default');
    if (l && n === void 0) {
      const a = o.default;
      if (o.type !== Function && ce(a)) {
        const { propsDefaults: c } = s;
        t in c ? (n = c[t]) : (bn(s), (n = c[t] = a.call(null, e)), Yi());
      } else n = a;
    }
    o[0] && (r && !l ? (n = !1) : o[1] && (n === '' || n === Dn(t)) && (n = !0));
  }
  return n;
}
function gu(i, e, t = !1) {
  const n = e.propsCache,
    s = n.get(i);
  if (s) return s;
  const r = i.props,
    o = {},
    l = [];
  let a = !1;
  if (!ce(i)) {
    const h = (u) => {
      a = !0;
      const [d, f] = gu(u, e, !0);
      Ke(o, d), f && l.push(...f);
    };
    !t && e.mixins.length && e.mixins.forEach(h), i.extends && h(i.extends), i.mixins && i.mixins.forEach(h);
  }
  if (!r && !a) return Ae(i) && n.set(i, yn), yn;
  if (ae(r))
    for (let h = 0; h < r.length; h++) {
      const u = Dt(r[h]);
      sc(u) && (o[u] = be);
    }
  else if (r)
    for (const h in r) {
      const u = Dt(h);
      if (sc(u)) {
        const d = r[h],
          f = (o[u] = ae(d) || ce(d) ? { type: d } : Object.assign({}, d));
        if (f) {
          const g = lc(Boolean, f.type),
            m = lc(String, f.type);
          (f[0] = g > -1), (f[1] = m < 0 || g < m), (g > -1 || pe(f, 'default')) && l.push(u);
        }
      }
    }
  const c = [o, l];
  return Ae(i) && n.set(i, c), c;
}
function sc(i) {
  return i[0] !== '$';
}
function rc(i) {
  const e = i && i.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : i === null ? 'null' : '';
}
function oc(i, e) {
  return rc(i) === rc(e);
}
function lc(i, e) {
  return ae(e) ? e.findIndex((t) => oc(t, i)) : ce(e) && oc(e, i) ? 0 : -1;
}
const mu = (i) => i[0] === '_' || i === '$stable',
  Bl = (i) => (ae(i) ? i.map(Pt) : [Pt(i)]),
  Vg = (i, e, t) => {
    if (e._n) return e;
    const n = gg((...s) => Bl(e(...s)), t);
    return (n._c = !1), n;
  },
  _u = (i, e, t) => {
    const n = i._ctx;
    for (const s in i) {
      if (mu(s)) continue;
      const r = i[s];
      if (ce(r)) e[s] = Vg(s, r, n);
      else if (r != null) {
        const o = Bl(r);
        e[s] = () => o;
      }
    }
  },
  pu = (i, e) => {
    const t = Bl(e);
    i.slots.default = () => t;
  },
  Hg = (i, e) => {
    if (i.vnode.shapeFlag & 32) {
      const t = e._;
      t ? ((i.slots = ye(e)), ar(e, '_', t)) : _u(e, (i.slots = {}));
    } else (i.slots = {}), e && pu(i, e);
    ar(i.slots, zr, 1);
  },
  Kg = (i, e, t) => {
    const { vnode: n, slots: s } = i;
    let r = !0,
      o = be;
    if (n.shapeFlag & 32) {
      const l = e._;
      l ? (t && l === 1 ? (r = !1) : (Ke(s, e), !t && l === 1 && delete s._)) : ((r = !e.$stable), _u(e, s)), (o = e);
    } else e && (pu(i, e), (o = { default: 1 }));
    if (r) for (const l in s) !mu(l) && !(l in o) && delete s[l];
  };
function yu() {
  return {
    app: null,
    config: {
      isNativeTag: mf,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Zg = 0;
function $g(i, e) {
  return function (n, s = null) {
    ce(n) || (n = Object.assign({}, n)), s != null && !Ae(s) && (s = null);
    const r = yu(),
      o = new Set();
    let l = !1;
    const a = (r.app = {
      _uid: Zg++,
      _component: n,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: xm,
      get config() {
        return r.config;
      },
      set config(c) {},
      use(c, ...h) {
        return o.has(c) || (c && ce(c.install) ? (o.add(c), c.install(a, ...h)) : ce(c) && (o.add(c), c(a, ...h))), a;
      },
      mixin(c) {
        return r.mixins.includes(c) || r.mixins.push(c), a;
      },
      component(c, h) {
        return h ? ((r.components[c] = h), a) : r.components[c];
      },
      directive(c, h) {
        return h ? ((r.directives[c] = h), a) : r.directives[c];
      },
      mount(c, h, u) {
        if (!l) {
          const d = ut(n, s);
          return (
            (d.appContext = r),
            h && e ? e(d, c) : i(d, c, u),
            (l = !0),
            (a._container = c),
            (c.__vue_app__ = a),
            Ul(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        l && (i(null, a._container), delete a._container.__vue_app__);
      },
      provide(c, h) {
        return (r.provides[c] = h), a;
      },
    });
    return a;
  };
}
function Ho(i, e, t, n, s = !1) {
  if (ae(i)) {
    i.forEach((d, f) => Ho(d, e && (ae(e) ? e[f] : e), t, n, s));
    return;
  }
  if (sr(n) && !s) return;
  const r = n.shapeFlag & 4 ? Ul(n.component) || n.component.proxy : n.el,
    o = s ? null : r,
    { i: l, r: a } = i,
    c = e && e.r,
    h = l.refs === be ? (l.refs = {}) : l.refs,
    u = l.setupState;
  if ((c != null && c !== a && (We(c) ? ((h[c] = null), pe(u, c) && (u[c] = null)) : He(c) && (c.value = null)), ce(a)))
    pi(a, l, 12, [o, h]);
  else {
    const d = We(a),
      f = He(a);
    if (d || f) {
      const g = () => {
        if (i.f) {
          const m = d ? (pe(u, a) ? u[a] : h[a]) : a.value;
          s
            ? ae(m) && bl(m, r)
            : ae(m)
            ? m.includes(r) || m.push(r)
            : d
            ? ((h[a] = [r]), pe(u, a) && (u[a] = h[a]))
            : ((a.value = [r]), i.k && (h[i.k] = a.value));
        } else d ? ((h[a] = o), pe(u, a) && (u[a] = o)) : f && ((a.value = o), i.k && (h[i.k] = o));
      };
      o ? ((g.id = -1), Qe(g, t)) : g();
    }
  }
}
const Qe = vg;
function qg(i) {
  return Jg(i);
}
function Jg(i, e) {
  const t = Tf();
  t.__VUE__ = !0;
  const {
      insert: n,
      remove: s,
      patchProp: r,
      createElement: o,
      createText: l,
      createComment: a,
      setText: c,
      setElementText: h,
      parentNode: u,
      nextSibling: d,
      setScopeId: f = Et,
      insertStaticContent: g,
    } = i,
    m = (y, C, T, I = null, L = null, D = null, B = !1, F = null, N = !!C.dynamicChildren) => {
      if (y === C) return;
      y && !Fi(y, C) && ((I = G(y)), M(y, L, D, !0), (y = null)), C.patchFlag === -2 && ((N = !1), (C.dynamicChildren = null));
      const { type: A, ref: V, shapeFlag: X } = C;
      switch (A) {
        case Wr:
          _(y, C, T, I);
          break;
        case Qt:
          p(y, C, T, I);
          break;
        case co:
          y == null && v(C, T, I, B);
          break;
        case Lt:
          $(y, C, T, I, L, D, B, F, N);
          break;
        default:
          X & 1
            ? w(y, C, T, I, L, D, B, F, N)
            : X & 6
            ? ee(y, C, T, I, L, D, B, F, N)
            : (X & 64 || X & 128) && A.process(y, C, T, I, L, D, B, F, N, ne);
      }
      V != null && L && Ho(V, y && y.ref, D, C || y, !C);
    },
    _ = (y, C, T, I) => {
      if (y == null) n((C.el = l(C.children)), T, I);
      else {
        const L = (C.el = y.el);
        C.children !== y.children && c(L, C.children);
      }
    },
    p = (y, C, T, I) => {
      y == null ? n((C.el = a(C.children || '')), T, I) : (C.el = y.el);
    },
    v = (y, C, T, I) => {
      [y.el, y.anchor] = g(y.children, C, T, I, y.el, y.anchor);
    },
    x = ({ el: y, anchor: C }, T, I) => {
      let L;
      for (; y && y !== C; ) (L = d(y)), n(y, T, I), (y = L);
      n(C, T, I);
    },
    E = ({ el: y, anchor: C }) => {
      let T;
      for (; y && y !== C; ) (T = d(y)), s(y), (y = T);
      s(C);
    },
    w = (y, C, T, I, L, D, B, F, N) => {
      (B = B || C.type === 'svg'), y == null ? P(C, T, I, L, D, B, F, N) : k(y, C, L, D, B, F, N);
    },
    P = (y, C, T, I, L, D, B, F) => {
      let N, A;
      const { type: V, props: X, shapeFlag: H, transition: Z, dirs: re } = y;
      if (
        ((N = y.el = o(y.type, D, X && X.is, X)),
        H & 8 ? h(N, y.children) : H & 16 && S(y.children, N, null, I, L, D && V !== 'foreignObject', B, F),
        re && bi(y, null, I, 'created'),
        b(N, y, y.scopeId, B, I),
        X)
      ) {
        for (const de in X) de !== 'value' && !tr(de) && r(N, de, null, X[de], D, y.children, I, L, z);
        'value' in X && r(N, 'value', null, X.value), (A = X.onVnodeBeforeMount) && It(A, I, y);
      }
      re && bi(y, null, I, 'beforeMount');
      const me = (!L || (L && !L.pendingBranch)) && Z && !Z.persisted;
      me && Z.beforeEnter(N),
        n(N, C, T),
        ((A = X && X.onVnodeMounted) || me || re) &&
          Qe(() => {
            A && It(A, I, y), me && Z.enter(N), re && bi(y, null, I, 'mounted');
          }, L);
    },
    b = (y, C, T, I, L) => {
      if ((T && f(y, T), I)) for (let D = 0; D < I.length; D++) f(y, I[D]);
      if (L) {
        let D = L.subTree;
        if (C === D) {
          const B = L.vnode;
          b(y, B, B.scopeId, B.slotScopeIds, L.parent);
        }
      }
    },
    S = (y, C, T, I, L, D, B, F, N = 0) => {
      for (let A = N; A < y.length; A++) {
        const V = (y[A] = F ? ui(y[A]) : Pt(y[A]));
        m(null, V, C, T, I, L, D, B, F);
      }
    },
    k = (y, C, T, I, L, D, B) => {
      const F = (C.el = y.el);
      let { patchFlag: N, dynamicChildren: A, dirs: V } = C;
      N |= y.patchFlag & 16;
      const X = y.props || be,
        H = C.props || be;
      let Z;
      T && Ii(T, !1), (Z = H.onVnodeBeforeUpdate) && It(Z, T, C, y), V && bi(C, y, T, 'beforeUpdate'), T && Ii(T, !0);
      const re = L && C.type !== 'foreignObject';
      if ((A ? W(y.dynamicChildren, A, F, T, I, re, D) : B || j(y, C, F, null, T, I, re, D, !1), N > 0)) {
        if (N & 16) Q(F, C, X, H, T, I, L);
        else if ((N & 2 && X.class !== H.class && r(F, 'class', null, H.class, L), N & 4 && r(F, 'style', X.style, H.style, L), N & 8)) {
          const me = C.dynamicProps;
          for (let de = 0; de < me.length; de++) {
            const Se = me[de],
              ze = X[Se],
              Le = H[Se];
            (Le !== ze || Se === 'value') && r(F, Se, ze, Le, L, y.children, T, I, z);
          }
        }
        N & 1 && y.children !== C.children && h(F, C.children);
      } else !B && A == null && Q(F, C, X, H, T, I, L);
      ((Z = H.onVnodeUpdated) || V) &&
        Qe(() => {
          Z && It(Z, T, C, y), V && bi(C, y, T, 'updated');
        }, I);
    },
    W = (y, C, T, I, L, D, B) => {
      for (let F = 0; F < C.length; F++) {
        const N = y[F],
          A = C[F],
          V = N.el && (N.type === Lt || !Fi(N, A) || N.shapeFlag & 70) ? u(N.el) : T;
        m(N, A, V, null, I, L, D, B, !0);
      }
    },
    Q = (y, C, T, I, L, D, B) => {
      if (T !== I) {
        if (T !== be) for (const F in T) !tr(F) && !(F in I) && r(y, F, T[F], null, B, C.children, L, D, z);
        for (const F in I) {
          if (tr(F)) continue;
          const N = I[F],
            A = T[F];
          N !== A && F !== 'value' && r(y, F, A, N, B, C.children, L, D, z);
        }
        'value' in I && r(y, 'value', T.value, I.value);
      }
    },
    $ = (y, C, T, I, L, D, B, F, N) => {
      const A = (C.el = y ? y.el : l('')),
        V = (C.anchor = y ? y.anchor : l(''));
      let { patchFlag: X, dynamicChildren: H, slotScopeIds: Z } = C;
      Z && (F = F ? F.concat(Z) : Z),
        y == null
          ? (n(A, T, I), n(V, T, I), S(C.children, T, V, L, D, B, F, N))
          : X > 0 && X & 64 && H && y.dynamicChildren
          ? (W(y.dynamicChildren, H, T, L, D, B, F), (C.key != null || (L && C === L.subTree)) && xu(y, C, !0))
          : j(y, C, T, V, L, D, B, F, N);
    },
    ee = (y, C, T, I, L, D, B, F, N) => {
      (C.slotScopeIds = F), y == null ? (C.shapeFlag & 512 ? L.ctx.activate(C, T, I, B, N) : Ee(C, T, I, L, D, B, N)) : K(y, C, N);
    },
    Ee = (y, C, T, I, L, D, B) => {
      const F = (y.component = cm(y, I, L));
      if ((Nr(y) && (F.ctx.renderer = ne), um(F), F.asyncDep)) {
        if ((L && L.registerDep(F, U), !y.el)) {
          const N = (F.subTree = ut(Qt));
          p(null, N, C, T);
        }
        return;
      }
      U(F, y, C, T, L, D, B);
    },
    K = (y, C, T) => {
      const I = (C.component = y.component);
      if (pg(y, C, T))
        if (I.asyncDep && !I.asyncResolved) {
          O(I, C, T);
          return;
        } else (I.next = C), hg(I.update), I.update();
      else (C.el = y.el), (I.vnode = C);
    },
    U = (y, C, T, I, L, D, B) => {
      const F = () => {
          if (y.isMounted) {
            let { next: V, bu: X, u: H, parent: Z, vnode: re } = y,
              me = V,
              de;
            Ii(y, !1),
              V ? ((V.el = re.el), O(y, V, B)) : (V = re),
              X && ro(X),
              (de = V.props && V.props.onVnodeBeforeUpdate) && It(de, Z, V, re),
              Ii(y, !0);
            const Se = oo(y),
              ze = y.subTree;
            (y.subTree = Se),
              m(ze, Se, u(ze.el), G(ze), y, L, D),
              (V.el = Se.el),
              me === null && yg(y, Se.el),
              H && Qe(H, L),
              (de = V.props && V.props.onVnodeUpdated) && Qe(() => It(de, Z, V, re), L);
          } else {
            let V;
            const { el: X, props: H } = C,
              { bm: Z, m: re, parent: me } = y,
              de = sr(C);
            if ((Ii(y, !1), Z && ro(Z), !de && (V = H && H.onVnodeBeforeMount) && It(V, me, C), Ii(y, !0), X && se)) {
              const Se = () => {
                (y.subTree = oo(y)), se(X, y.subTree, y, L, null);
              };
              de ? C.type.__asyncLoader().then(() => !y.isUnmounted && Se()) : Se();
            } else {
              const Se = (y.subTree = oo(y));
              m(null, Se, T, I, y, L, D), (C.el = Se.el);
            }
            if ((re && Qe(re, L), !de && (V = H && H.onVnodeMounted))) {
              const Se = C;
              Qe(() => It(V, me, Se), L);
            }
            (C.shapeFlag & 256 || (me && sr(me.vnode) && me.vnode.shapeFlag & 256)) && y.a && Qe(y.a, L),
              (y.isMounted = !0),
              (C = T = I = null);
          }
        },
        N = (y.effect = new Ml(F, () => Gl(A), y.scope)),
        A = (y.update = () => N.run());
      (A.id = y.uid), Ii(y, !0), A();
    },
    O = (y, C, T) => {
      C.component = y;
      const I = y.vnode.props;
      (y.vnode = C), (y.next = null), Ug(y, C.props, I, T), Kg(y, C.children, T), kn(), Ja(), Nn();
    },
    j = (y, C, T, I, L, D, B, F, N = !1) => {
      const A = y && y.children,
        V = y ? y.shapeFlag : 0,
        X = C.children,
        { patchFlag: H, shapeFlag: Z } = C;
      if (H > 0) {
        if (H & 128) {
          ue(A, X, T, I, L, D, B, F, N);
          return;
        } else if (H & 256) {
          le(A, X, T, I, L, D, B, F, N);
          return;
        }
      }
      Z & 8
        ? (V & 16 && z(A, L, D), X !== A && h(T, X))
        : V & 16
        ? Z & 16
          ? ue(A, X, T, I, L, D, B, F, N)
          : z(A, L, D, !0)
        : (V & 8 && h(T, ''), Z & 16 && S(X, T, I, L, D, B, F, N));
    },
    le = (y, C, T, I, L, D, B, F, N) => {
      (y = y || yn), (C = C || yn);
      const A = y.length,
        V = C.length,
        X = Math.min(A, V);
      let H;
      for (H = 0; H < X; H++) {
        const Z = (C[H] = N ? ui(C[H]) : Pt(C[H]));
        m(y[H], Z, T, null, L, D, B, F, N);
      }
      A > V ? z(y, L, D, !0, !1, X) : S(C, T, I, L, D, B, F, N, X);
    },
    ue = (y, C, T, I, L, D, B, F, N) => {
      let A = 0;
      const V = C.length;
      let X = y.length - 1,
        H = V - 1;
      for (; A <= X && A <= H; ) {
        const Z = y[A],
          re = (C[A] = N ? ui(C[A]) : Pt(C[A]));
        if (Fi(Z, re)) m(Z, re, T, null, L, D, B, F, N);
        else break;
        A++;
      }
      for (; A <= X && A <= H; ) {
        const Z = y[X],
          re = (C[H] = N ? ui(C[H]) : Pt(C[H]));
        if (Fi(Z, re)) m(Z, re, T, null, L, D, B, F, N);
        else break;
        X--, H--;
      }
      if (A > X) {
        if (A <= H) {
          const Z = H + 1,
            re = Z < V ? C[Z].el : I;
          for (; A <= H; ) m(null, (C[A] = N ? ui(C[A]) : Pt(C[A])), T, re, L, D, B, F, N), A++;
        }
      } else if (A > H) for (; A <= X; ) M(y[A], L, D, !0), A++;
      else {
        const Z = A,
          re = A,
          me = new Map();
        for (A = re; A <= H; A++) {
          const Be = (C[A] = N ? ui(C[A]) : Pt(C[A]));
          Be.key != null && me.set(Be.key, A);
        }
        let de,
          Se = 0;
        const ze = H - re + 1;
        let Le = !1,
          en = 0;
        const Ri = new Array(ze);
        for (A = 0; A < ze; A++) Ri[A] = 0;
        for (A = Z; A <= X; A++) {
          const Be = y[A];
          if (Se >= ze) {
            M(Be, L, D, !0);
            continue;
          }
          let tt;
          if (Be.key != null) tt = me.get(Be.key);
          else
            for (de = re; de <= H; de++)
              if (Ri[de - re] === 0 && Fi(Be, C[de])) {
                tt = de;
                break;
              }
          tt === void 0
            ? M(Be, L, D, !0)
            : ((Ri[tt - re] = A + 1), tt >= en ? (en = tt) : (Le = !0), m(Be, C[tt], T, null, L, D, B, F, N), Se++);
        }
        const As = Le ? Qg(Ri) : yn;
        for (de = As.length - 1, A = ze - 1; A >= 0; A--) {
          const Be = re + A,
            tt = C[Be],
            tn = Be + 1 < V ? C[Be + 1].el : I;
          Ri[A] === 0 ? m(null, tt, T, tn, L, D, B, F, N) : Le && (de < 0 || A !== As[de] ? xe(tt, T, tn, 2) : de--);
        }
      }
    },
    xe = (y, C, T, I, L = null) => {
      const { el: D, type: B, transition: F, children: N, shapeFlag: A } = y;
      if (A & 6) {
        xe(y.component.subTree, C, T, I);
        return;
      }
      if (A & 128) {
        y.suspense.move(C, T, I);
        return;
      }
      if (A & 64) {
        B.move(y, C, T, ne);
        return;
      }
      if (B === Lt) {
        n(D, C, T);
        for (let X = 0; X < N.length; X++) xe(N[X], C, T, I);
        n(y.anchor, C, T);
        return;
      }
      if (B === co) {
        x(y, C, T);
        return;
      }
      if (I !== 2 && A & 1 && F)
        if (I === 0) F.beforeEnter(D), n(D, C, T), Qe(() => F.enter(D), L);
        else {
          const { leave: X, delayLeave: H, afterLeave: Z } = F,
            re = () => n(D, C, T),
            me = () => {
              X(D, () => {
                re(), Z && Z();
              });
            };
          H ? H(D, re, me) : me();
        }
      else n(D, C, T);
    },
    M = (y, C, T, I = !1, L = !1) => {
      const { type: D, props: B, ref: F, children: N, dynamicChildren: A, shapeFlag: V, patchFlag: X, dirs: H } = y;
      if ((F != null && Ho(F, null, T, y, !0), V & 256)) {
        C.ctx.deactivate(y);
        return;
      }
      const Z = V & 1 && H,
        re = !sr(y);
      let me;
      if ((re && (me = B && B.onVnodeBeforeUnmount) && It(me, C, y), V & 6)) R(y.component, T, I);
      else {
        if (V & 128) {
          y.suspense.unmount(T, I);
          return;
        }
        Z && bi(y, null, C, 'beforeUnmount'),
          V & 64
            ? y.type.remove(y, C, T, L, ne, I)
            : A && (D !== Lt || (X > 0 && X & 64))
            ? z(A, C, T, !1, !0)
            : ((D === Lt && X & 384) || (!L && V & 16)) && z(N, C, T),
          I && Oe(y);
      }
      ((re && (me = B && B.onVnodeUnmounted)) || Z) &&
        Qe(() => {
          me && It(me, C, y), Z && bi(y, null, C, 'unmounted');
        }, T);
    },
    Oe = (y) => {
      const { type: C, el: T, anchor: I, transition: L } = y;
      if (C === Lt) {
        ge(T, I);
        return;
      }
      if (C === co) {
        E(y);
        return;
      }
      const D = () => {
        s(T), L && !L.persisted && L.afterLeave && L.afterLeave();
      };
      if (y.shapeFlag & 1 && L && !L.persisted) {
        const { leave: B, delayLeave: F } = L,
          N = () => B(T, D);
        F ? F(y.el, D, N) : N();
      } else D();
    },
    ge = (y, C) => {
      let T;
      for (; y !== C; ) (T = d(y)), s(y), (y = T);
      s(C);
    },
    R = (y, C, T) => {
      const { bum: I, scope: L, update: D, subTree: B, um: F } = y;
      I && ro(I),
        L.stop(),
        D && ((D.active = !1), M(B, y, C, T)),
        F && Qe(F, C),
        Qe(() => {
          y.isUnmounted = !0;
        }, C),
        C &&
          C.pendingBranch &&
          !C.isUnmounted &&
          y.asyncDep &&
          !y.asyncResolved &&
          y.suspenseId === C.pendingId &&
          (C.deps--, C.deps === 0 && C.resolve());
    },
    z = (y, C, T, I = !1, L = !1, D = 0) => {
      for (let B = D; B < y.length; B++) M(y[B], C, T, I, L);
    },
    G = (y) => (y.shapeFlag & 6 ? G(y.component.subTree) : y.shapeFlag & 128 ? y.suspense.next() : d(y.anchor || y.el)),
    Y = (y, C, T) => {
      y == null ? C._vnode && M(C._vnode, null, null, !0) : m(C._vnode || null, y, C, null, null, null, T), Ja(), Qh(), (C._vnode = y);
    },
    ne = { p: m, um: M, m: xe, r: Oe, mt: Ee, mc: S, pc: j, pbc: W, n: G, o: i };
  let ve, se;
  return e && ([ve, se] = e(ne)), { render: Y, hydrate: ve, createApp: $g(Y, ve) };
}
function Ii({ effect: i, update: e }, t) {
  i.allowRecurse = e.allowRecurse = t;
}
function xu(i, e, t = !1) {
  const n = i.children,
    s = e.children;
  if (ae(n) && ae(s))
    for (let r = 0; r < n.length; r++) {
      const o = n[r];
      let l = s[r];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = s[r] = ui(s[r])), (l.el = o.el)), t || xu(o, l)),
        l.type === Wr && (l.el = o.el);
    }
}
function Qg(i) {
  const e = i.slice(),
    t = [0];
  let n, s, r, o, l;
  const a = i.length;
  for (n = 0; n < a; n++) {
    const c = i[n];
    if (c !== 0) {
      if (((s = t[t.length - 1]), i[s] < c)) {
        (e[n] = s), t.push(n);
        continue;
      }
      for (r = 0, o = t.length - 1; r < o; ) (l = (r + o) >> 1), i[t[l]] < c ? (r = l + 1) : (o = l);
      c < i[t[r]] && (r > 0 && (e[n] = t[r - 1]), (t[r] = n));
    }
  }
  for (r = t.length, o = t[r - 1]; r-- > 0; ) (t[r] = o), (o = e[o]);
  return t;
}
const em = (i) => i.__isTeleport,
  Lt = Symbol(void 0),
  Wr = Symbol(void 0),
  Qt = Symbol(void 0),
  co = Symbol(void 0),
  es = [];
let vt = null;
function Xl(i = !1) {
  es.push((vt = i ? null : []));
}
function tm() {
  es.pop(), (vt = es[es.length - 1] || null);
}
let us = 1;
function ac(i) {
  us += i;
}
function vu(i) {
  return (i.dynamicChildren = us > 0 ? vt || yn : null), tm(), us > 0 && vt && vt.push(i), i;
}
function im(i, e, t, n, s, r) {
  return vu(jl(i, e, t, n, s, r, !0));
}
function Eu(i, e, t, n, s) {
  return vu(ut(i, e, t, n, s, !0));
}
function Ko(i) {
  return i ? i.__v_isVNode === !0 : !1;
}
function Fi(i, e) {
  return i.type === e.type && i.key === e.key;
}
const zr = '__vInternal',
  Cu = ({ key: i }) => i ?? null,
  rr = ({ ref: i, ref_key: e, ref_for: t }) => (i != null ? (We(i) || He(i) || ce(i) ? { i: ht, r: i, k: e, f: !!t } : i) : null);
function jl(i, e = null, t = null, n = 0, s = null, r = i === Lt ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: i,
    props: e,
    key: e && Cu(e),
    ref: e && rr(e),
    scopeId: iu,
    slotScopeIds: null,
    children: t,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: ht,
  };
  return (
    l ? (Yl(a, t), r & 128 && i.normalize(a)) : t && (a.shapeFlag |= We(t) ? 8 : 16),
    us > 0 && !o && vt && (a.patchFlag > 0 || r & 6) && a.patchFlag !== 32 && vt.push(a),
    a
  );
}
const ut = nm;
function nm(i, e = null, t = null, n = 0, s = null, r = !1) {
  if (((!i || i === kg) && (i = Qt), Ko(i))) {
    const l = vi(i, e, !0);
    return t && Yl(l, t), us > 0 && !r && vt && (l.shapeFlag & 6 ? (vt[vt.indexOf(i)] = l) : vt.push(l)), (l.patchFlag |= -2), l;
  }
  if ((_m(i) && (i = i.__vccOpts), e)) {
    e = sm(e);
    let { class: l, style: a } = e;
    l && !We(l) && (e.class = Tl(l)), Ae(a) && (jh(a) && !ae(a) && (a = Ke({}, a)), (e.style = Sl(a)));
  }
  const o = We(i) ? 1 : xg(i) ? 128 : em(i) ? 64 : Ae(i) ? 4 : ce(i) ? 2 : 0;
  return jl(i, e, t, n, s, o, r, !0);
}
function sm(i) {
  return i ? (jh(i) || zr in i ? Ke({}, i) : i) : null;
}
function vi(i, e, t = !1) {
  const { props: n, ref: s, patchFlag: r, children: o } = i,
    l = e ? om(n || {}, e) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: i.type,
    props: l,
    key: l && Cu(l),
    ref: e && e.ref ? (t && s ? (ae(s) ? s.concat(rr(e)) : [s, rr(e)]) : rr(e)) : s,
    scopeId: i.scopeId,
    slotScopeIds: i.slotScopeIds,
    children: o,
    target: i.target,
    targetAnchor: i.targetAnchor,
    staticCount: i.staticCount,
    shapeFlag: i.shapeFlag,
    patchFlag: e && i.type !== Lt ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: i.dynamicProps,
    dynamicChildren: i.dynamicChildren,
    appContext: i.appContext,
    dirs: i.dirs,
    transition: i.transition,
    component: i.component,
    suspense: i.suspense,
    ssContent: i.ssContent && vi(i.ssContent),
    ssFallback: i.ssFallback && vi(i.ssFallback),
    el: i.el,
    anchor: i.anchor,
    ctx: i.ctx,
    ce: i.ce,
  };
}
function rm(i = ' ', e = 0) {
  return ut(Wr, null, i, e);
}
function Pt(i) {
  return i == null || typeof i == 'boolean'
    ? ut(Qt)
    : ae(i)
    ? ut(Lt, null, i.slice())
    : typeof i == 'object'
    ? ui(i)
    : ut(Wr, null, String(i));
}
function ui(i) {
  return (i.el === null && i.patchFlag !== -1) || i.memo ? i : vi(i);
}
function Yl(i, e) {
  let t = 0;
  const { shapeFlag: n } = i;
  if (e == null) e = null;
  else if (ae(e)) t = 16;
  else if (typeof e == 'object')
    if (n & 65) {
      const s = e.default;
      s && (s._c && (s._d = !1), Yl(i, s()), s._c && (s._d = !0));
      return;
    } else {
      t = 32;
      const s = e._;
      !s && !(zr in e) ? (e._ctx = ht) : s === 3 && ht && (ht.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (i.patchFlag |= 1024)));
    }
  else ce(e) ? ((e = { default: e, _ctx: ht }), (t = 32)) : ((e = String(e)), n & 64 ? ((t = 16), (e = [rm(e)])) : (t = 8));
  (i.children = e), (i.shapeFlag |= t);
}
function om(...i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = i[t];
    for (const s in n)
      if (s === 'class') e.class !== n.class && (e.class = Tl([e.class, n.class]));
      else if (s === 'style') e.style = Sl([e.style, n.style]);
      else if (Pr(s)) {
        const r = e[s],
          o = n[s];
        o && r !== o && !(ae(r) && r.includes(o)) && (e[s] = r ? [].concat(r, o) : o);
      } else s !== '' && (e[s] = n[s]);
  }
  return e;
}
function It(i, e, t, n = null) {
  ft(i, e, 7, [t, n]);
}
const lm = yu();
let am = 0;
function cm(i, e, t) {
  const n = i.type,
    s = (e ? e.appContext : i.appContext) || lm,
    r = {
      uid: am++,
      vnode: i,
      type: n,
      parent: e,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Rf(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: gu(n, s),
      emitsOptions: tu(n, s),
      emit: null,
      emitted: null,
      propsDefaults: be,
      inheritAttrs: n.inheritAttrs,
      ctx: be,
      data: be,
      props: be,
      attrs: be,
      slots: be,
      refs: be,
      setupState: be,
      setupContext: null,
      suspense: t,
      suspenseId: t ? t.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (r.ctx = { _: r }), (r.root = e ? e.root : r), (r.emit = fg.bind(null, r)), i.ce && i.ce(r), r;
}
let Pe = null;
const hm = () => Pe || ht,
  bn = (i) => {
    (Pe = i), i.scope.on();
  },
  Yi = () => {
    Pe && Pe.scope.off(), (Pe = null);
  };
function wu(i) {
  return i.vnode.shapeFlag & 4;
}
let ds = !1;
function um(i, e = !1) {
  ds = e;
  const { props: t, children: n } = i.vnode,
    s = wu(i);
  Yg(i, t, s, e), Hg(i, n);
  const r = s ? dm(i, e) : void 0;
  return (ds = !1), r;
}
function dm(i, e) {
  const t = i.type;
  (i.accessCache = Object.create(null)), (i.proxy = Yh(new Proxy(i.ctx, Gg)));
  const { setup: n } = t;
  if (n) {
    const s = (i.setupContext = n.length > 1 ? gm(i) : null);
    bn(i), kn();
    const r = pi(n, i, 0, [i.props, s]);
    if ((Nn(), Yi(), Mh(r))) {
      if ((r.then(Yi, Yi), e))
        return r
          .then((o) => {
            cc(i, o, e);
          })
          .catch((o) => {
            Dr(o, i, 0);
          });
      i.asyncDep = r;
    } else cc(i, r, e);
  } else Su(i, e);
}
function cc(i, e, t) {
  ce(e) ? (i.type.__ssrInlineRender ? (i.ssrRender = e) : (i.render = e)) : Ae(e) && (i.setupState = Kh(e)), Su(i, t);
}
let hc;
function Su(i, e, t) {
  const n = i.type;
  if (!i.render) {
    if (!e && hc && !n.render) {
      const s = n.template || zl(i).template;
      if (s) {
        const { isCustomElement: r, compilerOptions: o } = i.appContext.config,
          { delimiters: l, compilerOptions: a } = n,
          c = Ke(Ke({ isCustomElement: r, delimiters: l }, o), a);
        n.render = hc(s, c);
      }
    }
    i.render = n.render || Et;
  }
  bn(i), kn(), Wg(i), Nn(), Yi();
}
function fm(i) {
  return new Proxy(i.attrs, {
    get(e, t) {
      return et(i, 'get', '$attrs'), e[t];
    },
  });
}
function gm(i) {
  const e = (n) => {
    i.exposed = n || {};
  };
  let t;
  return {
    get attrs() {
      return t || (t = fm(i));
    },
    slots: i.slots,
    emit: i.emit,
    expose: e,
  };
}
function Ul(i) {
  if (i.exposed)
    return (
      i.exposeProxy ||
      (i.exposeProxy = new Proxy(Kh(Yh(i.exposed)), {
        get(e, t) {
          if (t in e) return e[t];
          if (t in Qn) return Qn[t](i);
        },
        has(e, t) {
          return t in e || t in Qn;
        },
      }))
    );
}
function mm(i, e = !0) {
  return ce(i) ? i.displayName || i.name : i.name || (e && i.__name);
}
function _m(i) {
  return ce(i) && '__vccOpts' in i;
}
const ct = (i, e) => lg(i, e, ds);
function Tu(i, e, t) {
  const n = arguments.length;
  return n === 2
    ? Ae(e) && !ae(e)
      ? Ko(e)
        ? ut(i, null, [e])
        : ut(i, e)
      : ut(i, null, e)
    : (n > 3 ? (t = Array.prototype.slice.call(arguments, 2)) : n === 3 && Ko(t) && (t = [t]), ut(i, e, t));
}
const pm = Symbol(''),
  ym = () => Jt(pm),
  xm = '3.2.47',
  vm = 'http://www.w3.org/2000/svg',
  Di = typeof document < 'u' ? document : null,
  uc = Di && Di.createElement('template'),
  Em = {
    insert: (i, e, t) => {
      e.insertBefore(i, t || null);
    },
    remove: (i) => {
      const e = i.parentNode;
      e && e.removeChild(i);
    },
    createElement: (i, e, t, n) => {
      const s = e ? Di.createElementNS(vm, i) : Di.createElement(i, t ? { is: t } : void 0);
      return i === 'select' && n && n.multiple != null && s.setAttribute('multiple', n.multiple), s;
    },
    createText: (i) => Di.createTextNode(i),
    createComment: (i) => Di.createComment(i),
    setText: (i, e) => {
      i.nodeValue = e;
    },
    setElementText: (i, e) => {
      i.textContent = e;
    },
    parentNode: (i) => i.parentNode,
    nextSibling: (i) => i.nextSibling,
    querySelector: (i) => Di.querySelector(i),
    setScopeId(i, e) {
      i.setAttribute(e, '');
    },
    insertStaticContent(i, e, t, n, s, r) {
      const o = t ? t.previousSibling : e.lastChild;
      if (s && (s === r || s.nextSibling)) for (; e.insertBefore(s.cloneNode(!0), t), !(s === r || !(s = s.nextSibling)); );
      else {
        uc.innerHTML = n ? `<svg>${i}</svg>` : i;
        const l = uc.content;
        if (n) {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        e.insertBefore(l, t);
      }
      return [o ? o.nextSibling : e.firstChild, t ? t.previousSibling : e.lastChild];
    },
  };
function Cm(i, e, t) {
  const n = i._vtc;
  n && (e = (e ? [e, ...n] : [...n]).join(' ')),
    e == null ? i.removeAttribute('class') : t ? i.setAttribute('class', e) : (i.className = e);
}
function wm(i, e, t) {
  const n = i.style,
    s = We(t);
  if (t && !s) {
    if (e && !We(e)) for (const r in e) t[r] == null && Zo(n, r, '');
    for (const r in t) Zo(n, r, t[r]);
  } else {
    const r = n.display;
    s ? e !== t && (n.cssText = t) : e && i.removeAttribute('style'), '_vod' in i && (n.display = r);
  }
}
const dc = /\s*!important$/;
function Zo(i, e, t) {
  if (ae(t)) t.forEach((n) => Zo(i, e, n));
  else if ((t == null && (t = ''), e.startsWith('--'))) i.setProperty(e, t);
  else {
    const n = Sm(i, e);
    dc.test(t) ? i.setProperty(Dn(n), t.replace(dc, ''), 'important') : (i[n] = t);
  }
}
const fc = ['Webkit', 'Moz', 'ms'],
  ho = {};
function Sm(i, e) {
  const t = ho[e];
  if (t) return t;
  let n = Dt(e);
  if (n !== 'filter' && n in i) return (ho[e] = n);
  n = Or(n);
  for (let s = 0; s < fc.length; s++) {
    const r = fc[s] + n;
    if (r in i) return (ho[e] = r);
  }
  return e;
}
const gc = 'http://www.w3.org/1999/xlink';
function Tm(i, e, t, n, s) {
  if (n && e.startsWith('xlink:')) t == null ? i.removeAttributeNS(gc, e.slice(6, e.length)) : i.setAttributeNS(gc, e, t);
  else {
    const r = gf(e);
    t == null || (r && !Ph(t)) ? i.removeAttribute(e) : i.setAttribute(e, r ? '' : t);
  }
}
function Rm(i, e, t, n, s, r, o) {
  if (e === 'innerHTML' || e === 'textContent') {
    n && o(n, s, r), (i[e] = t ?? '');
    return;
  }
  if (e === 'value' && i.tagName !== 'PROGRESS' && !i.tagName.includes('-')) {
    i._value = t;
    const a = t ?? '';
    (i.value !== a || i.tagName === 'OPTION') && (i.value = a), t == null && i.removeAttribute(e);
    return;
  }
  let l = !1;
  if (t === '' || t == null) {
    const a = typeof i[e];
    a === 'boolean' ? (t = Ph(t)) : t == null && a === 'string' ? ((t = ''), (l = !0)) : a === 'number' && ((t = 0), (l = !0));
  }
  try {
    i[e] = t;
  } catch {}
  l && i.removeAttribute(e);
}
function bm(i, e, t, n) {
  i.addEventListener(e, t, n);
}
function Im(i, e, t, n) {
  i.removeEventListener(e, t, n);
}
function Lm(i, e, t, n, s = null) {
  const r = i._vei || (i._vei = {}),
    o = r[e];
  if (n && o) o.value = n;
  else {
    const [l, a] = Pm(e);
    if (n) {
      const c = (r[e] = Om(n, s));
      bm(i, l, c, a);
    } else o && (Im(i, l, o, a), (r[e] = void 0));
  }
}
const mc = /(?:Once|Passive|Capture)$/;
function Pm(i) {
  let e;
  if (mc.test(i)) {
    e = {};
    let n;
    for (; (n = i.match(mc)); ) (i = i.slice(0, i.length - n[0].length)), (e[n[0].toLowerCase()] = !0);
  }
  return [i[2] === ':' ? i.slice(3) : Dn(i.slice(2)), e];
}
let uo = 0;
const Mm = Promise.resolve(),
  Am = () => uo || (Mm.then(() => (uo = 0)), (uo = Date.now()));
function Om(i, e) {
  const t = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= t.attached) return;
    ft(Fm(n, t.value), e, 5, [n]);
  };
  return (t.value = i), (t.attached = Am()), t;
}
function Fm(i, e) {
  if (ae(e)) {
    const t = i.stopImmediatePropagation;
    return (
      (i.stopImmediatePropagation = () => {
        t.call(i), (i._stopped = !0);
      }),
      e.map((n) => (s) => !s._stopped && n && n(s))
    );
  } else return e;
}
const _c = /^on[a-z]/,
  Dm = (i, e, t, n, s = !1, r, o, l, a) => {
    e === 'class'
      ? Cm(i, n, s)
      : e === 'style'
      ? wm(i, t, n)
      : Pr(e)
      ? Rl(e) || Lm(i, e, t, n, o)
      : (e[0] === '.' ? ((e = e.slice(1)), !0) : e[0] === '^' ? ((e = e.slice(1)), !1) : km(i, e, n, s))
      ? Rm(i, e, n, r, o, l, a)
      : (e === 'true-value' ? (i._trueValue = n) : e === 'false-value' && (i._falseValue = n), Tm(i, e, n, s));
  };
function km(i, e, t, n) {
  return n
    ? !!(e === 'innerHTML' || e === 'textContent' || (e in i && _c.test(e) && ce(t)))
    : e === 'spellcheck' ||
      e === 'draggable' ||
      e === 'translate' ||
      e === 'form' ||
      (e === 'list' && i.tagName === 'INPUT') ||
      (e === 'type' && i.tagName === 'TEXTAREA') ||
      (_c.test(e) && We(t))
    ? !1
    : e in i;
}
const Nm = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Sg.props;
const Gm = Ke({ patchProp: Dm }, Em);
let pc;
function Wm() {
  return pc || (pc = qg(Gm));
}
const zm = (...i) => {
  const e = Wm().createApp(...i),
    { mount: t } = e;
  return (
    (e.mount = (n) => {
      const s = Bm(n);
      if (!s) return;
      const r = e._component;
      !ce(r) && !r.render && !r.template && (r.template = s.innerHTML), (s.innerHTML = '');
      const o = t(s, !1, s instanceof SVGElement);
      return s instanceof Element && (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')), o;
    }),
    e
  );
};
function Bm(i) {
  return We(i) ? document.querySelector(i) : i;
}
const Ru = (i, e) => {
    const t = i.__vccOpts || i;
    for (const [n, s] of e) t[n] = s;
    return t;
  },
  Xm = {};
function jm(i, e) {
  const t = Dg('router-view');
  return Xl(), Eu(t);
}
const Ym = Ru(Xm, [['render', jm]]);
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const un = typeof window < 'u';
function Um(i) {
  return i.__esModule || i[Symbol.toStringTag] === 'Module';
}
const we = Object.assign;
function fo(i, e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    t[n] = Rt(s) ? s.map(i) : i(s);
  }
  return t;
}
const ts = () => {},
  Rt = Array.isArray,
  Vm = /\/$/,
  Hm = (i) => i.replace(Vm, '');
function go(i, e, t = '/') {
  let n,
    s = {},
    r = '',
    o = '';
  const l = e.indexOf('#');
  let a = e.indexOf('?');
  return (
    l < a && l >= 0 && (a = -1),
    a > -1 && ((n = e.slice(0, a)), (r = e.slice(a + 1, l > -1 ? l : e.length)), (s = i(r))),
    l > -1 && ((n = n || e.slice(0, l)), (o = e.slice(l, e.length))),
    (n = qm(n ?? e, t)),
    { fullPath: n + (r && '?') + r + o, path: n, query: s, hash: o }
  );
}
function Km(i, e) {
  const t = e.query ? i(e.query) : '';
  return e.path + (t && '?') + t + (e.hash || '');
}
function yc(i, e) {
  return !e || !i.toLowerCase().startsWith(e.toLowerCase()) ? i : i.slice(e.length) || '/';
}
function Zm(i, e, t) {
  const n = e.matched.length - 1,
    s = t.matched.length - 1;
  return n > -1 && n === s && In(e.matched[n], t.matched[s]) && bu(e.params, t.params) && i(e.query) === i(t.query) && e.hash === t.hash;
}
function In(i, e) {
  return (i.aliasOf || i) === (e.aliasOf || e);
}
function bu(i, e) {
  if (Object.keys(i).length !== Object.keys(e).length) return !1;
  for (const t in i) if (!$m(i[t], e[t])) return !1;
  return !0;
}
function $m(i, e) {
  return Rt(i) ? xc(i, e) : Rt(e) ? xc(e, i) : i === e;
}
function xc(i, e) {
  return Rt(e) ? i.length === e.length && i.every((t, n) => t === e[n]) : i.length === 1 && i[0] === e;
}
function qm(i, e) {
  if (i.startsWith('/')) return i;
  if (!i) return e;
  const t = e.split('/'),
    n = i.split('/');
  let s = t.length - 1,
    r,
    o;
  for (r = 0; r < n.length; r++)
    if (((o = n[r]), o !== '.'))
      if (o === '..') s > 1 && s--;
      else break;
  return t.slice(0, s).join('/') + '/' + n.slice(r - (r === n.length ? 1 : 0)).join('/');
}
var fs;
(function (i) {
  (i.pop = 'pop'), (i.push = 'push');
})(fs || (fs = {}));
var is;
(function (i) {
  (i.back = 'back'), (i.forward = 'forward'), (i.unknown = '');
})(is || (is = {}));
function Jm(i) {
  if (!i)
    if (un) {
      const e = document.querySelector('base');
      (i = (e && e.getAttribute('href')) || '/'), (i = i.replace(/^\w+:\/\/[^\/]+/, ''));
    } else i = '/';
  return i[0] !== '/' && i[0] !== '#' && (i = '/' + i), Hm(i);
}
const Qm = /^[^#]+#/;
function e_(i, e) {
  return i.replace(Qm, '#') + e;
}
function t_(i, e) {
  const t = document.documentElement.getBoundingClientRect(),
    n = i.getBoundingClientRect();
  return { behavior: e.behavior, left: n.left - t.left - (e.left || 0), top: n.top - t.top - (e.top || 0) };
}
const Br = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function i_(i) {
  let e;
  if ('el' in i) {
    const t = i.el,
      n = typeof t == 'string' && t.startsWith('#'),
      s = typeof t == 'string' ? (n ? document.getElementById(t.slice(1)) : document.querySelector(t)) : t;
    if (!s) return;
    e = t_(s, i);
  } else e = i;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(e)
    : window.scrollTo(e.left != null ? e.left : window.pageXOffset, e.top != null ? e.top : window.pageYOffset);
}
function vc(i, e) {
  return (history.state ? history.state.position - e : -1) + i;
}
const $o = new Map();
function n_(i, e) {
  $o.set(i, e);
}
function s_(i) {
  const e = $o.get(i);
  return $o.delete(i), e;
}
let r_ = () => location.protocol + '//' + location.host;
function Iu(i, e) {
  const { pathname: t, search: n, hash: s } = e,
    r = i.indexOf('#');
  if (r > -1) {
    let l = s.includes(i.slice(r)) ? i.slice(r).length : 1,
      a = s.slice(l);
    return a[0] !== '/' && (a = '/' + a), yc(a, '');
  }
  return yc(t, i) + n + s;
}
function o_(i, e, t, n) {
  let s = [],
    r = [],
    o = null;
  const l = ({ state: d }) => {
    const f = Iu(i, location),
      g = t.value,
      m = e.value;
    let _ = 0;
    if (d) {
      if (((t.value = f), (e.value = d), o && o === g)) {
        o = null;
        return;
      }
      _ = m ? d.position - m.position : 0;
    } else n(f);
    s.forEach((p) => {
      p(t.value, g, { delta: _, type: fs.pop, direction: _ ? (_ > 0 ? is.forward : is.back) : is.unknown });
    });
  };
  function a() {
    o = t.value;
  }
  function c(d) {
    s.push(d);
    const f = () => {
      const g = s.indexOf(d);
      g > -1 && s.splice(g, 1);
    };
    return r.push(f), f;
  }
  function h() {
    const { history: d } = window;
    d.state && d.replaceState(we({}, d.state, { scroll: Br() }), '');
  }
  function u() {
    for (const d of r) d();
    (r = []), window.removeEventListener('popstate', l), window.removeEventListener('beforeunload', h);
  }
  return window.addEventListener('popstate', l), window.addEventListener('beforeunload', h), { pauseListeners: a, listen: c, destroy: u };
}
function Ec(i, e, t, n = !1, s = !1) {
  return { back: i, current: e, forward: t, replaced: n, position: window.history.length, scroll: s ? Br() : null };
}
function l_(i) {
  const { history: e, location: t } = window,
    n = { value: Iu(i, t) },
    s = { value: e.state };
  s.value || r(n.value, { back: null, current: n.value, forward: null, position: e.length - 1, replaced: !0, scroll: null }, !0);
  function r(a, c, h) {
    const u = i.indexOf('#'),
      d = u > -1 ? (t.host && document.querySelector('base') ? i : i.slice(u)) + a : r_() + i + a;
    try {
      e[h ? 'replaceState' : 'pushState'](c, '', d), (s.value = c);
    } catch (f) {
      console.error(f), t[h ? 'replace' : 'assign'](d);
    }
  }
  function o(a, c) {
    const h = we({}, e.state, Ec(s.value.back, a, s.value.forward, !0), c, { position: s.value.position });
    r(a, h, !0), (n.value = a);
  }
  function l(a, c) {
    const h = we({}, s.value, e.state, { forward: a, scroll: Br() });
    r(h.current, h, !0);
    const u = we({}, Ec(n.value, a, null), { position: h.position + 1 }, c);
    r(a, u, !1), (n.value = a);
  }
  return { location: n, state: s, push: l, replace: o };
}
function a_(i) {
  i = Jm(i);
  const e = l_(i),
    t = o_(i, e.state, e.location, e.replace);
  function n(r, o = !0) {
    o || t.pauseListeners(), history.go(r);
  }
  const s = we({ location: '', base: i, go: n, createHref: e_.bind(null, i) }, e, t);
  return (
    Object.defineProperty(s, 'location', { enumerable: !0, get: () => e.location.value }),
    Object.defineProperty(s, 'state', { enumerable: !0, get: () => e.state.value }),
    s
  );
}
function c_(i) {
  return (i = location.host ? i || location.pathname + location.search : ''), i.includes('#') || (i += '#'), a_(i);
}
function h_(i) {
  return typeof i == 'string' || (i && typeof i == 'object');
}
function Lu(i) {
  return typeof i == 'string' || typeof i == 'symbol';
}
const ri = { path: '/', name: void 0, params: {}, query: {}, hash: '', fullPath: '/', matched: [], meta: {}, redirectedFrom: void 0 },
  Pu = Symbol('');
var Cc;
(function (i) {
  (i[(i.aborted = 4)] = 'aborted'), (i[(i.cancelled = 8)] = 'cancelled'), (i[(i.duplicated = 16)] = 'duplicated');
})(Cc || (Cc = {}));
function Ln(i, e) {
  return we(new Error(), { type: i, [Pu]: !0 }, e);
}
function Bt(i, e) {
  return i instanceof Error && Pu in i && (e == null || !!(i.type & e));
}
const wc = '[^/]+?',
  u_ = { sensitive: !1, strict: !1, start: !0, end: !0 },
  d_ = /[.+*?^${}()[\]/\\]/g;
function f_(i, e) {
  const t = we({}, u_, e),
    n = [];
  let s = t.start ? '^' : '';
  const r = [];
  for (const c of i) {
    const h = c.length ? [] : [90];
    t.strict && !c.length && (s += '/');
    for (let u = 0; u < c.length; u++) {
      const d = c[u];
      let f = 40 + (t.sensitive ? 0.25 : 0);
      if (d.type === 0) u || (s += '/'), (s += d.value.replace(d_, '\\$&')), (f += 40);
      else if (d.type === 1) {
        const { value: g, repeatable: m, optional: _, regexp: p } = d;
        r.push({ name: g, repeatable: m, optional: _ });
        const v = p || wc;
        if (v !== wc) {
          f += 10;
          try {
            new RegExp(`(${v})`);
          } catch (E) {
            throw new Error(`Invalid custom RegExp for param "${g}" (${v}): ` + E.message);
          }
        }
        let x = m ? `((?:${v})(?:/(?:${v}))*)` : `(${v})`;
        u || (x = _ && c.length < 2 ? `(?:/${x})` : '/' + x),
          _ && (x += '?'),
          (s += x),
          (f += 20),
          _ && (f += -8),
          m && (f += -20),
          v === '.*' && (f += -50);
      }
      h.push(f);
    }
    n.push(h);
  }
  if (t.strict && t.end) {
    const c = n.length - 1;
    n[c][n[c].length - 1] += 0.7000000000000001;
  }
  t.strict || (s += '/?'), t.end ? (s += '$') : t.strict && (s += '(?:/|$)');
  const o = new RegExp(s, t.sensitive ? '' : 'i');
  function l(c) {
    const h = c.match(o),
      u = {};
    if (!h) return null;
    for (let d = 1; d < h.length; d++) {
      const f = h[d] || '',
        g = r[d - 1];
      u[g.name] = f && g.repeatable ? f.split('/') : f;
    }
    return u;
  }
  function a(c) {
    let h = '',
      u = !1;
    for (const d of i) {
      (!u || !h.endsWith('/')) && (h += '/'), (u = !1);
      for (const f of d)
        if (f.type === 0) h += f.value;
        else if (f.type === 1) {
          const { value: g, repeatable: m, optional: _ } = f,
            p = g in c ? c[g] : '';
          if (Rt(p) && !m) throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);
          const v = Rt(p) ? p.join('/') : p;
          if (!v)
            if (_) d.length < 2 && (h.endsWith('/') ? (h = h.slice(0, -1)) : (u = !0));
            else throw new Error(`Missing required param "${g}"`);
          h += v;
        }
    }
    return h || '/';
  }
  return { re: o, score: n, keys: r, parse: l, stringify: a };
}
function g_(i, e) {
  let t = 0;
  for (; t < i.length && t < e.length; ) {
    const n = e[t] - i[t];
    if (n) return n;
    t++;
  }
  return i.length < e.length
    ? i.length === 1 && i[0] === 40 + 40
      ? -1
      : 1
    : i.length > e.length
    ? e.length === 1 && e[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function m_(i, e) {
  let t = 0;
  const n = i.score,
    s = e.score;
  for (; t < n.length && t < s.length; ) {
    const r = g_(n[t], s[t]);
    if (r) return r;
    t++;
  }
  if (Math.abs(s.length - n.length) === 1) {
    if (Sc(n)) return 1;
    if (Sc(s)) return -1;
  }
  return s.length - n.length;
}
function Sc(i) {
  const e = i[i.length - 1];
  return i.length > 0 && e[e.length - 1] < 0;
}
const __ = { type: 0, value: '' },
  p_ = /[a-zA-Z0-9_]/;
function y_(i) {
  if (!i) return [[]];
  if (i === '/') return [[__]];
  if (!i.startsWith('/')) throw new Error(`Invalid path "${i}"`);
  function e(f) {
    throw new Error(`ERR (${t})/"${c}": ${f}`);
  }
  let t = 0,
    n = t;
  const s = [];
  let r;
  function o() {
    r && s.push(r), (r = []);
  }
  let l = 0,
    a,
    c = '',
    h = '';
  function u() {
    c &&
      (t === 0
        ? r.push({ type: 0, value: c })
        : t === 1 || t === 2 || t === 3
        ? (r.length > 1 && (a === '*' || a === '+') && e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),
          r.push({ type: 1, value: c, regexp: h, repeatable: a === '*' || a === '+', optional: a === '*' || a === '?' }))
        : e('Invalid state to consume buffer'),
      (c = ''));
  }
  function d() {
    c += a;
  }
  for (; l < i.length; ) {
    if (((a = i[l++]), a === '\\' && t !== 2)) {
      (n = t), (t = 4);
      continue;
    }
    switch (t) {
      case 0:
        a === '/' ? (c && u(), o()) : a === ':' ? (u(), (t = 1)) : d();
        break;
      case 4:
        d(), (t = n);
        break;
      case 1:
        a === '(' ? (t = 2) : p_.test(a) ? d() : (u(), (t = 0), a !== '*' && a !== '?' && a !== '+' && l--);
        break;
      case 2:
        a === ')' ? (h[h.length - 1] == '\\' ? (h = h.slice(0, -1) + a) : (t = 3)) : (h += a);
        break;
      case 3:
        u(), (t = 0), a !== '*' && a !== '?' && a !== '+' && l--, (h = '');
        break;
      default:
        e('Unknown state');
        break;
    }
  }
  return t === 2 && e(`Unfinished custom RegExp for param "${c}"`), u(), o(), s;
}
function x_(i, e, t) {
  const n = f_(y_(i.path), t),
    s = we(n, { record: i, parent: e, children: [], alias: [] });
  return e && !s.record.aliasOf == !e.record.aliasOf && e.children.push(s), s;
}
function v_(i, e) {
  const t = [],
    n = new Map();
  e = bc({ strict: !1, end: !0, sensitive: !1 }, e);
  function s(h) {
    return n.get(h);
  }
  function r(h, u, d) {
    const f = !d,
      g = E_(h);
    g.aliasOf = d && d.record;
    const m = bc(e, h),
      _ = [g];
    if ('alias' in h) {
      const x = typeof h.alias == 'string' ? [h.alias] : h.alias;
      for (const E of x) _.push(we({}, g, { components: d ? d.record.components : g.components, path: E, aliasOf: d ? d.record : g }));
    }
    let p, v;
    for (const x of _) {
      const { path: E } = x;
      if (u && E[0] !== '/') {
        const w = u.record.path,
          P = w[w.length - 1] === '/' ? '' : '/';
        x.path = u.record.path + (E && P + E);
      }
      if (
        ((p = x_(x, u, m)),
        d ? d.alias.push(p) : ((v = v || p), v !== p && v.alias.push(p), f && h.name && !Rc(p) && o(h.name)),
        g.children)
      ) {
        const w = g.children;
        for (let P = 0; P < w.length; P++) r(w[P], p, d && d.children[P]);
      }
      (d = d || p), ((p.record.components && Object.keys(p.record.components).length) || p.record.name || p.record.redirect) && a(p);
    }
    return v
      ? () => {
          o(v);
        }
      : ts;
  }
  function o(h) {
    if (Lu(h)) {
      const u = n.get(h);
      u && (n.delete(h), t.splice(t.indexOf(u), 1), u.children.forEach(o), u.alias.forEach(o));
    } else {
      const u = t.indexOf(h);
      u > -1 && (t.splice(u, 1), h.record.name && n.delete(h.record.name), h.children.forEach(o), h.alias.forEach(o));
    }
  }
  function l() {
    return t;
  }
  function a(h) {
    let u = 0;
    for (; u < t.length && m_(h, t[u]) >= 0 && (h.record.path !== t[u].record.path || !Mu(h, t[u])); ) u++;
    t.splice(u, 0, h), h.record.name && !Rc(h) && n.set(h.record.name, h);
  }
  function c(h, u) {
    let d,
      f = {},
      g,
      m;
    if ('name' in h && h.name) {
      if (((d = n.get(h.name)), !d)) throw Ln(1, { location: h });
      (m = d.record.name),
        (f = we(
          Tc(
            u.params,
            d.keys.filter((v) => !v.optional).map((v) => v.name),
          ),
          h.params &&
            Tc(
              h.params,
              d.keys.map((v) => v.name),
            ),
        )),
        (g = d.stringify(f));
    } else if ('path' in h) (g = h.path), (d = t.find((v) => v.re.test(g))), d && ((f = d.parse(g)), (m = d.record.name));
    else {
      if (((d = u.name ? n.get(u.name) : t.find((v) => v.re.test(u.path))), !d)) throw Ln(1, { location: h, currentLocation: u });
      (m = d.record.name), (f = we({}, u.params, h.params)), (g = d.stringify(f));
    }
    const _ = [];
    let p = d;
    for (; p; ) _.unshift(p.record), (p = p.parent);
    return { name: m, path: g, params: f, matched: _, meta: w_(_) };
  }
  return i.forEach((h) => r(h)), { addRoute: r, resolve: c, removeRoute: o, getRoutes: l, getRecordMatcher: s };
}
function Tc(i, e) {
  const t = {};
  for (const n of e) n in i && (t[n] = i[n]);
  return t;
}
function E_(i) {
  return {
    path: i.path,
    redirect: i.redirect,
    name: i.name,
    meta: i.meta || {},
    aliasOf: void 0,
    beforeEnter: i.beforeEnter,
    props: C_(i),
    children: i.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: 'components' in i ? i.components || null : i.component && { default: i.component },
  };
}
function C_(i) {
  const e = {},
    t = i.props || !1;
  if ('component' in i) e.default = t;
  else for (const n in i.components) e[n] = typeof t == 'boolean' ? t : t[n];
  return e;
}
function Rc(i) {
  for (; i; ) {
    if (i.record.aliasOf) return !0;
    i = i.parent;
  }
  return !1;
}
function w_(i) {
  return i.reduce((e, t) => we(e, t.meta), {});
}
function bc(i, e) {
  const t = {};
  for (const n in i) t[n] = n in e ? e[n] : i[n];
  return t;
}
function Mu(i, e) {
  return e.children.some((t) => t === i || Mu(i, t));
}
const Au = /#/g,
  S_ = /&/g,
  T_ = /\//g,
  R_ = /=/g,
  b_ = /\?/g,
  Ou = /\+/g,
  I_ = /%5B/g,
  L_ = /%5D/g,
  Fu = /%5E/g,
  P_ = /%60/g,
  Du = /%7B/g,
  M_ = /%7C/g,
  ku = /%7D/g,
  A_ = /%20/g;
function Vl(i) {
  return encodeURI('' + i)
    .replace(M_, '|')
    .replace(I_, '[')
    .replace(L_, ']');
}
function O_(i) {
  return Vl(i).replace(Du, '{').replace(ku, '}').replace(Fu, '^');
}
function qo(i) {
  return Vl(i)
    .replace(Ou, '%2B')
    .replace(A_, '+')
    .replace(Au, '%23')
    .replace(S_, '%26')
    .replace(P_, '`')
    .replace(Du, '{')
    .replace(ku, '}')
    .replace(Fu, '^');
}
function F_(i) {
  return qo(i).replace(R_, '%3D');
}
function D_(i) {
  return Vl(i).replace(Au, '%23').replace(b_, '%3F');
}
function k_(i) {
  return i == null ? '' : D_(i).replace(T_, '%2F');
}
function dr(i) {
  try {
    return decodeURIComponent('' + i);
  } catch {}
  return '' + i;
}
function N_(i) {
  const e = {};
  if (i === '' || i === '?') return e;
  const n = (i[0] === '?' ? i.slice(1) : i).split('&');
  for (let s = 0; s < n.length; ++s) {
    const r = n[s].replace(Ou, ' '),
      o = r.indexOf('='),
      l = dr(o < 0 ? r : r.slice(0, o)),
      a = o < 0 ? null : dr(r.slice(o + 1));
    if (l in e) {
      let c = e[l];
      Rt(c) || (c = e[l] = [c]), c.push(a);
    } else e[l] = a;
  }
  return e;
}
function Ic(i) {
  let e = '';
  for (let t in i) {
    const n = i[t];
    if (((t = F_(t)), n == null)) {
      n !== void 0 && (e += (e.length ? '&' : '') + t);
      continue;
    }
    (Rt(n) ? n.map((r) => r && qo(r)) : [n && qo(n)]).forEach((r) => {
      r !== void 0 && ((e += (e.length ? '&' : '') + t), r != null && (e += '=' + r));
    });
  }
  return e;
}
function G_(i) {
  const e = {};
  for (const t in i) {
    const n = i[t];
    n !== void 0 && (e[t] = Rt(n) ? n.map((s) => (s == null ? null : '' + s)) : n == null ? n : '' + n);
  }
  return e;
}
const W_ = Symbol(''),
  Lc = Symbol(''),
  Hl = Symbol(''),
  Nu = Symbol(''),
  Jo = Symbol('');
function Un() {
  let i = [];
  function e(n) {
    return (
      i.push(n),
      () => {
        const s = i.indexOf(n);
        s > -1 && i.splice(s, 1);
      }
    );
  }
  function t() {
    i = [];
  }
  return { add: e, list: () => i, reset: t };
}
function di(i, e, t, n, s) {
  const r = n && (n.enterCallbacks[s] = n.enterCallbacks[s] || []);
  return () =>
    new Promise((o, l) => {
      const a = (u) => {
          u === !1
            ? l(Ln(4, { from: t, to: e }))
            : u instanceof Error
            ? l(u)
            : h_(u)
            ? l(Ln(2, { from: e, to: u }))
            : (r && n.enterCallbacks[s] === r && typeof u == 'function' && r.push(u), o());
        },
        c = i.call(n && n.instances[s], e, t, a);
      let h = Promise.resolve(c);
      i.length < 3 && (h = h.then(a)), h.catch((u) => l(u));
    });
}
function mo(i, e, t, n) {
  const s = [];
  for (const r of i)
    for (const o in r.components) {
      let l = r.components[o];
      if (!(e !== 'beforeRouteEnter' && !r.instances[o]))
        if (z_(l)) {
          const c = (l.__vccOpts || l)[e];
          c && s.push(di(c, t, n, r, o));
        } else {
          let a = l();
          s.push(() =>
            a.then((c) => {
              if (!c) return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${r.path}"`));
              const h = Um(c) ? c.default : c;
              r.components[o] = h;
              const d = (h.__vccOpts || h)[e];
              return d && di(d, t, n, r, o)();
            }),
          );
        }
    }
  return s;
}
function z_(i) {
  return typeof i == 'object' || 'displayName' in i || 'props' in i || '__vccOpts' in i;
}
function Pc(i) {
  const e = Jt(Hl),
    t = Jt(Nu),
    n = ct(() => e.resolve(vn(i.to))),
    s = ct(() => {
      const { matched: a } = n.value,
        { length: c } = a,
        h = a[c - 1],
        u = t.matched;
      if (!h || !u.length) return -1;
      const d = u.findIndex(In.bind(null, h));
      if (d > -1) return d;
      const f = Mc(a[c - 2]);
      return c > 1 && Mc(h) === f && u[u.length - 1].path !== f ? u.findIndex(In.bind(null, a[c - 2])) : d;
    }),
    r = ct(() => s.value > -1 && Y_(t.params, n.value.params)),
    o = ct(() => s.value > -1 && s.value === t.matched.length - 1 && bu(t.params, n.value.params));
  function l(a = {}) {
    return j_(a) ? e[vn(i.replace) ? 'replace' : 'push'](vn(i.to)).catch(ts) : Promise.resolve();
  }
  return { route: n, href: ct(() => n.value.href), isActive: r, isExactActive: o, navigate: l };
}
const B_ = Wl({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
    },
    useLink: Pc,
    setup(i, { slots: e }) {
      const t = Ts(Pc(i)),
        { options: n } = Jt(Hl),
        s = ct(() => ({
          [Ac(i.activeClass, n.linkActiveClass, 'router-link-active')]: t.isActive,
          [Ac(i.exactActiveClass, n.linkExactActiveClass, 'router-link-exact-active')]: t.isExactActive,
        }));
      return () => {
        const r = e.default && e.default(t);
        return i.custom
          ? r
          : Tu('a', { 'aria-current': t.isExactActive ? i.ariaCurrentValue : null, href: t.href, onClick: t.navigate, class: s.value }, r);
      };
    },
  }),
  X_ = B_;
function j_(i) {
  if (!(i.metaKey || i.altKey || i.ctrlKey || i.shiftKey) && !i.defaultPrevented && !(i.button !== void 0 && i.button !== 0)) {
    if (i.currentTarget && i.currentTarget.getAttribute) {
      const e = i.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(e)) return;
    }
    return i.preventDefault && i.preventDefault(), !0;
  }
}
function Y_(i, e) {
  for (const t in e) {
    const n = e[t],
      s = i[t];
    if (typeof n == 'string') {
      if (n !== s) return !1;
    } else if (!Rt(s) || s.length !== n.length || n.some((r, o) => r !== s[o])) return !1;
  }
  return !0;
}
function Mc(i) {
  return i ? (i.aliasOf ? i.aliasOf.path : i.path) : '';
}
const Ac = (i, e, t) => i ?? e ?? t,
  U_ = Wl({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(i, { attrs: e, slots: t }) {
      const n = Jt(Jo),
        s = ct(() => i.route || n.value),
        r = Jt(Lc, 0),
        o = ct(() => {
          let c = vn(r);
          const { matched: h } = s.value;
          let u;
          for (; (u = h[c]) && !u.components; ) c++;
          return c;
        }),
        l = ct(() => s.value.matched[o.value]);
      ir(
        Lc,
        ct(() => o.value + 1),
      ),
        ir(W_, l),
        ir(Jo, s);
      const a = ig();
      return (
        nr(
          () => [a.value, l.value, i.name],
          ([c, h, u], [d, f, g]) => {
            h &&
              ((h.instances[u] = c),
              f &&
                f !== h &&
                c &&
                c === d &&
                (h.leaveGuards.size || (h.leaveGuards = f.leaveGuards), h.updateGuards.size || (h.updateGuards = f.updateGuards))),
              c && h && (!f || !In(h, f) || !d) && (h.enterCallbacks[u] || []).forEach((m) => m(c));
          },
          { flush: 'post' },
        ),
        () => {
          const c = s.value,
            h = i.name,
            u = l.value,
            d = u && u.components[h];
          if (!d) return Oc(t.default, { Component: d, route: c });
          const f = u.props[h],
            g = f ? (f === !0 ? c.params : typeof f == 'function' ? f(c) : f) : null,
            _ = Tu(
              d,
              we({}, g, e, {
                onVnodeUnmounted: (p) => {
                  p.component.isUnmounted && (u.instances[h] = null);
                },
                ref: a,
              }),
            );
          return Oc(t.default, { Component: _, route: c }) || _;
        }
      );
    },
  });
function Oc(i, e) {
  if (!i) return null;
  const t = i(e);
  return t.length === 1 ? t[0] : t;
}
const V_ = U_;
function H_(i) {
  const e = v_(i.routes, i),
    t = i.parseQuery || N_,
    n = i.stringifyQuery || Ic,
    s = i.history,
    r = Un(),
    o = Un(),
    l = Un(),
    a = ng(ri);
  let c = ri;
  un && i.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual');
  const h = fo.bind(null, (R) => '' + R),
    u = fo.bind(null, k_),
    d = fo.bind(null, dr);
  function f(R, z) {
    let G, Y;
    return Lu(R) ? ((G = e.getRecordMatcher(R)), (Y = z)) : (Y = R), e.addRoute(Y, G);
  }
  function g(R) {
    const z = e.getRecordMatcher(R);
    z && e.removeRoute(z);
  }
  function m() {
    return e.getRoutes().map((R) => R.record);
  }
  function _(R) {
    return !!e.getRecordMatcher(R);
  }
  function p(R, z) {
    if (((z = we({}, z || a.value)), typeof R == 'string')) {
      const y = go(t, R, z.path),
        C = e.resolve({ path: y.path }, z),
        T = s.createHref(y.fullPath);
      return we(y, C, { params: d(C.params), hash: dr(y.hash), redirectedFrom: void 0, href: T });
    }
    let G;
    if ('path' in R) G = we({}, R, { path: go(t, R.path, z.path).path });
    else {
      const y = we({}, R.params);
      for (const C in y) y[C] == null && delete y[C];
      (G = we({}, R, { params: u(R.params) })), (z.params = u(z.params));
    }
    const Y = e.resolve(G, z),
      ne = R.hash || '';
    Y.params = h(d(Y.params));
    const ve = Km(n, we({}, R, { hash: O_(ne), path: Y.path })),
      se = s.createHref(ve);
    return we({ fullPath: ve, hash: ne, query: n === Ic ? G_(R.query) : R.query || {} }, Y, { redirectedFrom: void 0, href: se });
  }
  function v(R) {
    return typeof R == 'string' ? go(t, R, a.value.path) : we({}, R);
  }
  function x(R, z) {
    if (c !== R) return Ln(8, { from: z, to: R });
  }
  function E(R) {
    return b(R);
  }
  function w(R) {
    return E(we(v(R), { replace: !0 }));
  }
  function P(R) {
    const z = R.matched[R.matched.length - 1];
    if (z && z.redirect) {
      const { redirect: G } = z;
      let Y = typeof G == 'function' ? G(R) : G;
      return (
        typeof Y == 'string' && ((Y = Y.includes('?') || Y.includes('#') ? (Y = v(Y)) : { path: Y }), (Y.params = {})),
        we({ query: R.query, hash: R.hash, params: 'path' in Y ? {} : R.params }, Y)
      );
    }
  }
  function b(R, z) {
    const G = (c = p(R)),
      Y = a.value,
      ne = R.state,
      ve = R.force,
      se = R.replace === !0,
      y = P(G);
    if (y) return b(we(v(y), { state: typeof y == 'object' ? we({}, ne, y.state) : ne, force: ve, replace: se }), z || G);
    const C = G;
    C.redirectedFrom = z;
    let T;
    return (
      !ve && Zm(n, Y, G) && ((T = Ln(16, { to: C, from: Y })), ue(Y, Y, !0, !1)),
      (T ? Promise.resolve(T) : k(C, Y))
        .catch((I) => (Bt(I) ? (Bt(I, 2) ? I : le(I)) : O(I, C, Y)))
        .then((I) => {
          if (I) {
            if (Bt(I, 2))
              return b(we({ replace: se }, v(I.to), { state: typeof I.to == 'object' ? we({}, ne, I.to.state) : ne, force: ve }), z || C);
          } else I = Q(C, Y, !0, se, ne);
          return W(C, Y, I), I;
        })
    );
  }
  function S(R, z) {
    const G = x(R, z);
    return G ? Promise.reject(G) : Promise.resolve();
  }
  function k(R, z) {
    let G;
    const [Y, ne, ve] = K_(R, z);
    G = mo(Y.reverse(), 'beforeRouteLeave', R, z);
    for (const y of Y)
      y.leaveGuards.forEach((C) => {
        G.push(di(C, R, z));
      });
    const se = S.bind(null, R, z);
    return (
      G.push(se),
      sn(G)
        .then(() => {
          G = [];
          for (const y of r.list()) G.push(di(y, R, z));
          return G.push(se), sn(G);
        })
        .then(() => {
          G = mo(ne, 'beforeRouteUpdate', R, z);
          for (const y of ne)
            y.updateGuards.forEach((C) => {
              G.push(di(C, R, z));
            });
          return G.push(se), sn(G);
        })
        .then(() => {
          G = [];
          for (const y of R.matched)
            if (y.beforeEnter && !z.matched.includes(y))
              if (Rt(y.beforeEnter)) for (const C of y.beforeEnter) G.push(di(C, R, z));
              else G.push(di(y.beforeEnter, R, z));
          return G.push(se), sn(G);
        })
        .then(() => (R.matched.forEach((y) => (y.enterCallbacks = {})), (G = mo(ve, 'beforeRouteEnter', R, z)), G.push(se), sn(G)))
        .then(() => {
          G = [];
          for (const y of o.list()) G.push(di(y, R, z));
          return G.push(se), sn(G);
        })
        .catch((y) => (Bt(y, 8) ? y : Promise.reject(y)))
    );
  }
  function W(R, z, G) {
    for (const Y of l.list()) Y(R, z, G);
  }
  function Q(R, z, G, Y, ne) {
    const ve = x(R, z);
    if (ve) return ve;
    const se = z === ri,
      y = un ? history.state : {};
    G && (Y || se ? s.replace(R.fullPath, we({ scroll: se && y && y.scroll }, ne)) : s.push(R.fullPath, ne)),
      (a.value = R),
      ue(R, z, G, se),
      le();
  }
  let $;
  function ee() {
    $ ||
      ($ = s.listen((R, z, G) => {
        if (!ge.listening) return;
        const Y = p(R),
          ne = P(Y);
        if (ne) {
          b(we(ne, { replace: !0 }), Y).catch(ts);
          return;
        }
        c = Y;
        const ve = a.value;
        un && n_(vc(ve.fullPath, G.delta), Br()),
          k(Y, ve)
            .catch((se) =>
              Bt(se, 12)
                ? se
                : Bt(se, 2)
                ? (b(se.to, Y)
                    .then((y) => {
                      Bt(y, 20) && !G.delta && G.type === fs.pop && s.go(-1, !1);
                    })
                    .catch(ts),
                  Promise.reject())
                : (G.delta && s.go(-G.delta, !1), O(se, Y, ve)),
            )
            .then((se) => {
              (se = se || Q(Y, ve, !1)),
                se && (G.delta && !Bt(se, 8) ? s.go(-G.delta, !1) : G.type === fs.pop && Bt(se, 20) && s.go(-1, !1)),
                W(Y, ve, se);
            })
            .catch(ts);
      }));
  }
  let Ee = Un(),
    K = Un(),
    U;
  function O(R, z, G) {
    le(R);
    const Y = K.list();
    return Y.length ? Y.forEach((ne) => ne(R, z, G)) : console.error(R), Promise.reject(R);
  }
  function j() {
    return U && a.value !== ri
      ? Promise.resolve()
      : new Promise((R, z) => {
          Ee.add([R, z]);
        });
  }
  function le(R) {
    return U || ((U = !R), ee(), Ee.list().forEach(([z, G]) => (R ? G(R) : z())), Ee.reset()), R;
  }
  function ue(R, z, G, Y) {
    const { scrollBehavior: ne } = i;
    if (!un || !ne) return Promise.resolve();
    const ve = (!G && s_(vc(R.fullPath, 0))) || ((Y || !G) && history.state && history.state.scroll) || null;
    return qh()
      .then(() => ne(R, z, ve))
      .then((se) => se && i_(se))
      .catch((se) => O(se, R, z));
  }
  const xe = (R) => s.go(R);
  let M;
  const Oe = new Set(),
    ge = {
      currentRoute: a,
      listening: !0,
      addRoute: f,
      removeRoute: g,
      hasRoute: _,
      getRoutes: m,
      resolve: p,
      options: i,
      push: E,
      replace: w,
      go: xe,
      back: () => xe(-1),
      forward: () => xe(1),
      beforeEach: r.add,
      beforeResolve: o.add,
      afterEach: l.add,
      onError: K.add,
      isReady: j,
      install(R) {
        const z = this;
        R.component('RouterLink', X_),
          R.component('RouterView', V_),
          (R.config.globalProperties.$router = z),
          Object.defineProperty(R.config.globalProperties, '$route', { enumerable: !0, get: () => vn(a) }),
          un && !M && a.value === ri && ((M = !0), E(s.location).catch((ne) => {}));
        const G = {};
        for (const ne in ri) G[ne] = ct(() => a.value[ne]);
        R.provide(Hl, z), R.provide(Nu, Ts(G)), R.provide(Jo, a);
        const Y = R.unmount;
        Oe.add(R),
          (R.unmount = function () {
            Oe.delete(R), Oe.size < 1 && ((c = ri), $ && $(), ($ = null), (a.value = ri), (M = !1), (U = !1)), Y();
          });
      },
    };
  return ge;
}
function sn(i) {
  return i.reduce((e, t) => e.then(() => t()), Promise.resolve());
}
function K_(i, e) {
  const t = [],
    n = [],
    s = [],
    r = Math.max(e.matched.length, i.matched.length);
  for (let o = 0; o < r; o++) {
    const l = e.matched[o];
    l && (i.matched.find((c) => In(c, l)) ? n.push(l) : t.push(l));
    const a = i.matched[o];
    a && (e.matched.find((c) => In(c, a)) || s.push(a));
  }
  return [t, n, s];
}
const Z_ = 'modulepreload',
  $_ = function (i) {
    return '/geography-research/' + i;
  },
  Fc = {},
  q_ = function (e, t, n) {
    if (!t || t.length === 0) return e();
    const s = document.getElementsByTagName('link');
    return Promise.all(
      t.map((r) => {
        if (((r = $_(r)), r in Fc)) return;
        Fc[r] = !0;
        const o = r.endsWith('.css'),
          l = o ? '[rel="stylesheet"]' : '';
        if (!!n)
          for (let h = s.length - 1; h >= 0; h--) {
            const u = s[h];
            if (u.href === r && (!o || u.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${r}"]${l}`)) return;
        const c = document.createElement('link');
        if (
          ((c.rel = o ? 'stylesheet' : Z_), o || ((c.as = 'script'), (c.crossOrigin = '')), (c.href = r), document.head.appendChild(c), o)
        )
          return new Promise((h, u) => {
            c.addEventListener('load', h), c.addEventListener('error', () => u(new Error(`Unable to preload CSS for ${r}`)));
          });
      }),
    ).then(() => e());
  };
const J_ = {
  1: 'The view center is not defined',
  2: 'The view resolution is not defined',
  3: 'The view rotation is not defined',
  4: '`image` and `src` cannot be provided at the same time',
  5: '`imgSize` must be set when `image` is provided',
  7: '`format` must be set when `url` is set',
  8: 'Unknown `serverType` configured',
  9: '`url` must be configured or set using `#setUrl()`',
  10: 'The default `geometryFunction` can only handle `Point` geometries',
  11: '`options.featureTypes` must be an Array',
  12: '`options.geometryName` must also be provided when `options.bbox` is set',
  13: 'Invalid corner',
  14: 'Invalid color',
  15: 'Tried to get a value for a key that does not exist in the cache',
  16: 'Tried to set a value for a key that is used already',
  17: '`resolutions` must be sorted in descending order',
  18: 'Either `origin` or `origins` must be configured, never both',
  19: 'Number of `tileSizes` and `resolutions` must be equal',
  20: 'Number of `origins` and `resolutions` must be equal',
  22: 'Either `tileSize` or `tileSizes` must be configured, never both',
  24: 'Invalid extent or geometry provided as `geometry`',
  25: 'Cannot fit empty extent provided as `geometry`',
  26: 'Features must have an id set',
  27: 'Features must have an id set',
  28: '`renderMode` must be `"hybrid"` or `"vector"`',
  30: 'The passed `feature` was already added to the source',
  31: 'Tried to enqueue an `element` that was already added to the queue',
  32: 'Transformation matrix cannot be inverted',
  33: 'Invalid units',
  34: 'Invalid geometry layout',
  36: 'Unknown SRS type',
  37: 'Unknown geometry type found',
  38: '`styleMapValue` has an unknown type',
  39: 'Unknown geometry type',
  40: 'Expected `feature` to have a geometry',
  41: 'Expected an `ol/style/Style` or an array of `ol/style/Style.js`',
  42: 'Question unknown, the answer is 42',
  43: 'Expected `layers` to be an array or a `Collection`',
  47: 'Expected `controls` to be an array or an `ol/Collection`',
  48: 'Expected `interactions` to be an array or an `ol/Collection`',
  49: 'Expected `overlays` to be an array or an `ol/Collection`',
  50: '`options.featureTypes` should be an Array',
  51: 'Either `url` or `tileJSON` options must be provided',
  52: 'Unknown `serverType` configured',
  53: 'Unknown `tierSizeCalculation` configured',
  55: 'The {-y} placeholder requires a tile grid with extent',
  56: 'mapBrowserEvent must originate from a pointer event',
  57: 'At least 2 conditions are required',
  59: 'Invalid command found in the PBF',
  60: 'Missing or invalid `size`',
  61: 'Cannot determine IIIF Image API version from provided image information JSON',
  62: 'A `WebGLArrayBuffer` must either be of type `ELEMENT_ARRAY_BUFFER` or `ARRAY_BUFFER`',
  64: 'Layer opacity must be a number',
  66: '`forEachFeatureAtCoordinate` cannot be used on a WebGL layer if the hit detection logic has not been enabled. This is done by providing adequate shaders using the `hitVertexShader` and `hitFragmentShader` properties of `WebGLPointsLayerRenderer`',
  67: 'A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both',
  68: 'A VectorTile source can only be rendered if it has a projection compatible with the view projection',
  69: '`width` or `height` cannot be provided together with `scale`',
};
class Q_ extends Error {
  constructor(e) {
    const t = J_[e];
    super(t), (this.code = e), (this.name = 'AssertionError'), (this.message = t);
  }
}
const Gu = Q_;
class ep {
  constructor(e) {
    this.propagationStopped, this.defaultPrevented, (this.type = e), (this.target = null);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
const Gt = ep,
  Pn = { PROPERTYCHANGE: 'propertychange' };
class tp {
  constructor() {
    this.disposed = !1;
  }
  dispose() {
    this.disposed || ((this.disposed = !0), this.disposeInternal());
  }
  disposeInternal() {}
}
const Kl = tp;
function ip(i, e, t) {
  let n, s;
  t = t || Hi;
  let r = 0,
    o = i.length,
    l = !1;
  for (; r < o; ) (n = r + ((o - r) >> 1)), (s = +t(i[n], e)), s < 0 ? (r = n + 1) : ((o = n), (l = !s));
  return l ? r : ~r;
}
function Hi(i, e) {
  return i > e ? 1 : i < e ? -1 : 0;
}
function Zl(i, e, t) {
  const n = i.length;
  if (i[0] <= e) return 0;
  if (e <= i[n - 1]) return n - 1;
  let s;
  if (t > 0) {
    for (s = 1; s < n; ++s) if (i[s] < e) return s - 1;
  } else if (t < 0) {
    for (s = 1; s < n; ++s) if (i[s] <= e) return s;
  } else
    for (s = 1; s < n; ++s) {
      if (i[s] == e) return s;
      if (i[s] < e) return typeof t == 'function' ? (t(e, i[s - 1], i[s]) > 0 ? s - 1 : s) : i[s - 1] - e < e - i[s] ? s - 1 : s;
    }
  return n - 1;
}
function np(i, e, t) {
  for (; e < t; ) {
    const n = i[e];
    (i[e] = i[t]), (i[t] = n), ++e, --t;
  }
}
function Ct(i, e) {
  const t = Array.isArray(e) ? e : [e],
    n = t.length;
  for (let s = 0; s < n; s++) i[i.length] = t[s];
}
function Ti(i, e) {
  const t = i.length;
  if (t !== e.length) return !1;
  for (let n = 0; n < t; n++) if (i[n] !== e[n]) return !1;
  return !0;
}
function sp(i, e, t) {
  const n = e || Hi;
  return i.every(function (s, r) {
    if (r === 0) return !0;
    const o = n(i[r - 1], s);
    return !(o > 0 || (t && o === 0));
  });
}
function Ki() {
  return !0;
}
function Rs() {
  return !1;
}
function Mn() {}
function rp(i) {
  let e = !1,
    t,
    n,
    s;
  return function () {
    const r = Array.prototype.slice.call(arguments);
    return (!e || this !== s || !Ti(r, n)) && ((e = !0), (s = this), (n = r), (t = i.apply(this, arguments))), t;
  };
}
function Gn(i) {
  for (const e in i) delete i[e];
}
function An(i) {
  let e;
  for (e in i) return !1;
  return !e;
}
class op extends Kl {
  constructor(e) {
    super(), (this.eventTarget_ = e), (this.pendingRemovals_ = null), (this.dispatching_ = null), (this.listeners_ = null);
  }
  addEventListener(e, t) {
    if (!e || !t) return;
    const n = this.listeners_ || (this.listeners_ = {}),
      s = n[e] || (n[e] = []);
    s.includes(t) || s.push(t);
  }
  dispatchEvent(e) {
    const t = typeof e == 'string',
      n = t ? e : e.type,
      s = this.listeners_ && this.listeners_[n];
    if (!s) return;
    const r = t ? new Gt(e) : e;
    r.target || (r.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}),
      l = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    n in o || ((o[n] = 0), (l[n] = 0)), ++o[n];
    let a;
    for (let c = 0, h = s.length; c < h; ++c)
      if (('handleEvent' in s[c] ? (a = s[c].handleEvent(r)) : (a = s[c].call(this, r)), a === !1 || r.propagationStopped)) {
        a = !1;
        break;
      }
    if (--o[n] === 0) {
      let c = l[n];
      for (delete l[n]; c--; ) this.removeEventListener(n, Mn);
      delete o[n];
    }
    return a;
  }
  disposeInternal() {
    this.listeners_ && Gn(this.listeners_);
  }
  getListeners(e) {
    return (this.listeners_ && this.listeners_[e]) || void 0;
  }
  hasListener(e) {
    return this.listeners_ ? (e ? e in this.listeners_ : Object.keys(this.listeners_).length > 0) : !1;
  }
  removeEventListener(e, t) {
    const n = this.listeners_ && this.listeners_[e];
    if (n) {
      const s = n.indexOf(t);
      s !== -1 &&
        (this.pendingRemovals_ && e in this.pendingRemovals_
          ? ((n[s] = Mn), ++this.pendingRemovals_[e])
          : (n.splice(s, 1), n.length === 0 && delete this.listeners_[e]));
    }
  }
}
const Xr = op,
  oe = {
    CHANGE: 'change',
    ERROR: 'error',
    BLUR: 'blur',
    CLEAR: 'clear',
    CONTEXTMENU: 'contextmenu',
    CLICK: 'click',
    DBLCLICK: 'dblclick',
    DRAGENTER: 'dragenter',
    DRAGOVER: 'dragover',
    DROP: 'drop',
    FOCUS: 'focus',
    KEYDOWN: 'keydown',
    KEYPRESS: 'keypress',
    LOAD: 'load',
    RESIZE: 'resize',
    TOUCHMOVE: 'touchmove',
    WHEEL: 'wheel',
  };
function _e(i, e, t, n, s) {
  if ((n && n !== i && (t = t.bind(n)), s)) {
    const o = t;
    t = function () {
      i.removeEventListener(e, t), o.apply(this, arguments);
    };
  }
  const r = { target: i, type: e, listener: t };
  return i.addEventListener(e, t), r;
}
function fr(i, e, t, n) {
  return _e(i, e, t, n, !0);
}
function Te(i) {
  i && i.target && (i.target.removeEventListener(i.type, i.listener), Gn(i));
}
class Wn extends Xr {
  constructor() {
    super(), (this.on = this.onInternal), (this.once = this.onceInternal), (this.un = this.unInternal), (this.revision_ = 0);
  }
  changed() {
    ++this.revision_, this.dispatchEvent(oe.CHANGE);
  }
  getRevision() {
    return this.revision_;
  }
  onInternal(e, t) {
    if (Array.isArray(e)) {
      const n = e.length,
        s = new Array(n);
      for (let r = 0; r < n; ++r) s[r] = _e(this, e[r], t);
      return s;
    }
    return _e(this, e, t);
  }
  onceInternal(e, t) {
    let n;
    if (Array.isArray(e)) {
      const s = e.length;
      n = new Array(s);
      for (let r = 0; r < s; ++r) n[r] = fr(this, e[r], t);
    } else n = fr(this, e, t);
    return (t.ol_key = n), n;
  }
  unInternal(e, t) {
    const n = t.ol_key;
    if (n) Ei(n);
    else if (Array.isArray(e)) for (let s = 0, r = e.length; s < r; ++s) this.removeEventListener(e[s], t);
    else this.removeEventListener(e, t);
  }
}
Wn.prototype.on;
Wn.prototype.once;
Wn.prototype.un;
function Ei(i) {
  if (Array.isArray(i)) for (let e = 0, t = i.length; e < t; ++e) Te(i[e]);
  else Te(i);
}
const lp = Object.freeze(Object.defineProperty({ __proto__: null, default: Wn, unByKey: Ei }, Symbol.toStringTag, { value: 'Module' }));
function ie() {
  throw new Error('Unimplemented abstract method.');
}
let ap = 0;
function fe(i) {
  return i.ol_uid || (i.ol_uid = String(++ap));
}
const cp = '7.3.0';
class Dc extends Gt {
  constructor(e, t, n) {
    super(e), (this.key = t), (this.oldValue = n);
  }
}
class hp extends Wn {
  constructor(e) {
    super(), this.on, this.once, this.un, fe(this), (this.values_ = null), e !== void 0 && this.setProperties(e);
  }
  get(e) {
    let t;
    return this.values_ && this.values_.hasOwnProperty(e) && (t = this.values_[e]), t;
  }
  getKeys() {
    return (this.values_ && Object.keys(this.values_)) || [];
  }
  getProperties() {
    return (this.values_ && Object.assign({}, this.values_)) || {};
  }
  hasProperties() {
    return !!this.values_;
  }
  notify(e, t) {
    let n;
    (n = `change:${e}`),
      this.hasListener(n) && this.dispatchEvent(new Dc(n, e, t)),
      (n = Pn.PROPERTYCHANGE),
      this.hasListener(n) && this.dispatchEvent(new Dc(n, e, t));
  }
  addChangeListener(e, t) {
    this.addEventListener(`change:${e}`, t);
  }
  removeChangeListener(e, t) {
    this.removeEventListener(`change:${e}`, t);
  }
  set(e, t, n) {
    const s = this.values_ || (this.values_ = {});
    if (n) s[e] = t;
    else {
      const r = s[e];
      (s[e] = t), r !== t && this.notify(e, r);
    }
  }
  setProperties(e, t) {
    for (const n in e) this.set(n, e[n], t);
  }
  applyProperties(e) {
    e.values_ && Object.assign(this.values_ || (this.values_ = {}), e.values_);
  }
  unset(e, t) {
    if (this.values_ && e in this.values_) {
      const n = this.values_[e];
      delete this.values_[e], An(this.values_) && (this.values_ = null), t || this.notify(e, n);
    }
  }
}
const Ze = hp,
  Ge = { ADD: 'add', REMOVE: 'remove' },
  kc = { LENGTH: 'length' };
class Bs extends Gt {
  constructor(e, t, n) {
    super(e), (this.element = t), (this.index = n);
  }
}
class up extends Ze {
  constructor(e, t) {
    if ((super(), this.on, this.once, this.un, (t = t || {}), (this.unique_ = !!t.unique), (this.array_ = e || []), this.unique_))
      for (let n = 0, s = this.array_.length; n < s; ++n) this.assertUnique_(this.array_[n], n);
    this.updateLength_();
  }
  clear() {
    for (; this.getLength() > 0; ) this.pop();
  }
  extend(e) {
    for (let t = 0, n = e.length; t < n; ++t) this.push(e[t]);
    return this;
  }
  forEach(e) {
    const t = this.array_;
    for (let n = 0, s = t.length; n < s; ++n) e(t[n], n, t);
  }
  getArray() {
    return this.array_;
  }
  item(e) {
    return this.array_[e];
  }
  getLength() {
    return this.get(kc.LENGTH);
  }
  insertAt(e, t) {
    if (e < 0 || e > this.getLength()) throw new Error('Index out of bounds: ' + e);
    this.unique_ && this.assertUnique_(t), this.array_.splice(e, 0, t), this.updateLength_(), this.dispatchEvent(new Bs(Ge.ADD, t, e));
  }
  pop() {
    return this.removeAt(this.getLength() - 1);
  }
  push(e) {
    this.unique_ && this.assertUnique_(e);
    const t = this.getLength();
    return this.insertAt(t, e), this.getLength();
  }
  remove(e) {
    const t = this.array_;
    for (let n = 0, s = t.length; n < s; ++n) if (t[n] === e) return this.removeAt(n);
  }
  removeAt(e) {
    if (e < 0 || e >= this.getLength()) return;
    const t = this.array_[e];
    return this.array_.splice(e, 1), this.updateLength_(), this.dispatchEvent(new Bs(Ge.REMOVE, t, e)), t;
  }
  setAt(e, t) {
    const n = this.getLength();
    if (e >= n) {
      this.insertAt(e, t);
      return;
    }
    if (e < 0) throw new Error('Index out of bounds: ' + e);
    this.unique_ && this.assertUnique_(t, e);
    const s = this.array_[e];
    (this.array_[e] = t), this.dispatchEvent(new Bs(Ge.REMOVE, s, e)), this.dispatchEvent(new Bs(Ge.ADD, t, e));
  }
  updateLength_() {
    this.set(kc.LENGTH, this.array_.length);
  }
  assertUnique_(e, t) {
    for (let n = 0, s = this.array_.length; n < s; ++n) if (this.array_[n] === e && n !== t) throw new Gu(58);
  }
}
const dt = up;
function he(i, e) {
  if (!i) throw new Gu(e);
}
class $l extends Ze {
  constructor(e) {
    if (
      (super(),
      this.on,
      this.once,
      this.un,
      (this.id_ = void 0),
      (this.geometryName_ = 'geometry'),
      (this.style_ = null),
      (this.styleFunction_ = void 0),
      (this.geometryChangeKey_ = null),
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_),
      e)
    )
      if (typeof e.getSimplifiedGeometry == 'function') {
        const t = e;
        this.setGeometry(t);
      } else {
        const t = e;
        this.setProperties(t);
      }
  }
  clone() {
    const e = new $l(this.hasProperties() ? this.getProperties() : null);
    e.setGeometryName(this.getGeometryName());
    const t = this.getGeometry();
    t && e.setGeometry(t.clone());
    const n = this.getStyle();
    return n && e.setStyle(n), e;
  }
  getGeometry() {
    return this.get(this.geometryName_);
  }
  getId() {
    return this.id_;
  }
  getGeometryName() {
    return this.geometryName_;
  }
  getStyle() {
    return this.style_;
  }
  getStyleFunction() {
    return this.styleFunction_;
  }
  handleGeometryChange_() {
    this.changed();
  }
  handleGeometryChanged_() {
    this.geometryChangeKey_ && (Te(this.geometryChangeKey_), (this.geometryChangeKey_ = null));
    const e = this.getGeometry();
    e && (this.geometryChangeKey_ = _e(e, oe.CHANGE, this.handleGeometryChange_, this)), this.changed();
  }
  setGeometry(e) {
    this.set(this.geometryName_, e);
  }
  setStyle(e) {
    (this.style_ = e), (this.styleFunction_ = e ? dp(e) : void 0), this.changed();
  }
  setId(e) {
    (this.id_ = e), this.changed();
  }
  setGeometryName(e) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_),
      (this.geometryName_ = e),
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_),
      this.handleGeometryChanged_();
  }
}
function dp(i) {
  if (typeof i == 'function') return i;
  let e;
  return (
    Array.isArray(i) ? (e = i) : (he(typeof i.getZIndex == 'function', 41), (e = [i])),
    function () {
      return e;
    }
  );
}
const $t = $l,
  Ci = typeof navigator < 'u' && typeof navigator.userAgent < 'u' ? navigator.userAgent.toLowerCase() : '',
  fp = Ci.includes('firefox'),
  gp = Ci.includes('safari') && !Ci.includes('chrom');
gp && (Ci.includes('version/15.4') || /cpu (os|iphone os) 15_4 like mac os x/.test(Ci));
const mp = Ci.includes('webkit') && !Ci.includes('edge'),
  _p = Ci.includes('macintosh'),
  Ni = typeof devicePixelRatio < 'u' ? devicePixelRatio : 1,
  ql = typeof WorkerGlobalScope < 'u' && typeof OffscreenCanvas < 'u' && self instanceof WorkerGlobalScope,
  pp = typeof Image < 'u' && Image.prototype.decode,
  Wu = (function () {
    let i = !1;
    try {
      const e = Object.defineProperty({}, 'passive', {
        get: function () {
          i = !0;
        },
      });
      window.addEventListener('_', null, e), window.removeEventListener('_', null, e);
    } catch {}
    return i;
  })(),
  yp = new Array(6);
function wt() {
  return [1, 0, 0, 1, 0, 0];
}
function zu(i, e) {
  const t = i[0],
    n = i[1],
    s = i[2],
    r = i[3],
    o = i[4],
    l = i[5],
    a = e[0],
    c = e[1],
    h = e[2],
    u = e[3],
    d = e[4],
    f = e[5];
  return (
    (i[0] = t * a + s * c),
    (i[1] = n * a + r * c),
    (i[2] = t * h + s * u),
    (i[3] = n * h + r * u),
    (i[4] = t * d + s * f + o),
    (i[5] = n * d + r * f + l),
    i
  );
}
function Bu(i, e, t, n, s, r, o) {
  return (i[0] = e), (i[1] = t), (i[2] = n), (i[3] = s), (i[4] = r), (i[5] = o), i;
}
function xp(i, e) {
  return (i[0] = e[0]), (i[1] = e[1]), (i[2] = e[2]), (i[3] = e[3]), (i[4] = e[4]), (i[5] = e[5]), i;
}
function Ne(i, e) {
  const t = e[0],
    n = e[1];
  return (e[0] = i[0] * t + i[2] * n + i[4]), (e[1] = i[1] * t + i[3] * n + i[5]), e;
}
function vp(i, e, t) {
  return zu(i, Bu(yp, e, 0, 0, t, 0, 0));
}
function Ep(i, e, t) {
  return Bu(i, e, 0, 0, t, 0, 0);
}
function wi(i, e, t, n, s, r, o, l) {
  const a = Math.sin(r),
    c = Math.cos(r);
  return (
    (i[0] = n * c),
    (i[1] = s * a),
    (i[2] = -n * a),
    (i[3] = s * c),
    (i[4] = o * n * c - l * n * a + e),
    (i[5] = o * s * a + l * s * c + t),
    i
  );
}
function Jl(i, e) {
  const t = Cp(e);
  he(t !== 0, 32);
  const n = e[0],
    s = e[1],
    r = e[2],
    o = e[3],
    l = e[4],
    a = e[5];
  return (i[0] = o / t), (i[1] = -s / t), (i[2] = -r / t), (i[3] = n / t), (i[4] = (r * a - o * l) / t), (i[5] = -(n * a - s * l) / t), i;
}
function Cp(i) {
  return i[0] * i[3] - i[1] * i[2];
}
let Nc;
function Xu(i) {
  const e = 'matrix(' + i.join(', ') + ')';
  if (ql) return e;
  const t = Nc || (Nc = document.createElement('div'));
  return (t.style.transform = e), t.style.transform;
}
const ke = { UNKNOWN: 0, INTERSECTING: 1, ABOVE: 2, RIGHT: 4, BELOW: 8, LEFT: 16 };
function Gc(i) {
  const e = gt();
  for (let t = 0, n = i.length; t < n; ++t) ns(e, i[t]);
  return e;
}
function wp(i, e, t) {
  const n = Math.min.apply(null, i),
    s = Math.min.apply(null, e),
    r = Math.max.apply(null, i),
    o = Math.max.apply(null, e);
  return kt(n, s, r, o, t);
}
function Ql(i, e, t) {
  return t ? ((t[0] = i[0] - e), (t[1] = i[1] - e), (t[2] = i[2] + e), (t[3] = i[3] + e), t) : [i[0] - e, i[1] - e, i[2] + e, i[3] + e];
}
function ju(i, e) {
  return e ? ((e[0] = i[0]), (e[1] = i[1]), (e[2] = i[2]), (e[3] = i[3]), e) : i.slice();
}
function $i(i, e, t) {
  let n, s;
  return (
    e < i[0] ? (n = i[0] - e) : i[2] < e ? (n = e - i[2]) : (n = 0),
    t < i[1] ? (s = i[1] - t) : i[3] < t ? (s = t - i[3]) : (s = 0),
    n * n + s * s
  );
}
function jr(i, e) {
  return ea(i, e[0], e[1]);
}
function Gi(i, e) {
  return i[0] <= e[0] && e[2] <= i[2] && i[1] <= e[1] && e[3] <= i[3];
}
function ea(i, e, t) {
  return i[0] <= e && e <= i[2] && i[1] <= t && t <= i[3];
}
function Qo(i, e) {
  const t = i[0],
    n = i[1],
    s = i[2],
    r = i[3],
    o = e[0],
    l = e[1];
  let a = ke.UNKNOWN;
  return (
    o < t ? (a = a | ke.LEFT) : o > s && (a = a | ke.RIGHT),
    l < n ? (a = a | ke.BELOW) : l > r && (a = a | ke.ABOVE),
    a === ke.UNKNOWN && (a = ke.INTERSECTING),
    a
  );
}
function gt() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function kt(i, e, t, n, s) {
  return s ? ((s[0] = i), (s[1] = e), (s[2] = t), (s[3] = n), s) : [i, e, t, n];
}
function bs(i) {
  return kt(1 / 0, 1 / 0, -1 / 0, -1 / 0, i);
}
function Sp(i, e) {
  const t = i[0],
    n = i[1];
  return kt(t, n, t, n, e);
}
function Yu(i, e, t, n, s) {
  const r = bs(s);
  return Uu(r, i, e, t, n);
}
function gs(i, e) {
  return i[0] == e[0] && i[2] == e[2] && i[1] == e[1] && i[3] == e[3];
}
function ta(i, e) {
  return e[0] < i[0] && (i[0] = e[0]), e[2] > i[2] && (i[2] = e[2]), e[1] < i[1] && (i[1] = e[1]), e[3] > i[3] && (i[3] = e[3]), i;
}
function ns(i, e) {
  e[0] < i[0] && (i[0] = e[0]), e[0] > i[2] && (i[2] = e[0]), e[1] < i[1] && (i[1] = e[1]), e[1] > i[3] && (i[3] = e[1]);
}
function Uu(i, e, t, n, s) {
  for (; t < n; t += s) Tp(i, e[t], e[t + 1]);
  return i;
}
function Tp(i, e, t) {
  (i[0] = Math.min(i[0], e)), (i[1] = Math.min(i[1], t)), (i[2] = Math.max(i[2], e)), (i[3] = Math.max(i[3], t));
}
function Vu(i, e) {
  let t;
  return (t = e(Yr(i))), t || ((t = e(Ur(i))), t) || ((t = e(Vr(i))), t) || ((t = e(qi(i))), t) ? t : !1;
}
function el(i) {
  let e = 0;
  return ia(i) || (e = Re(i) * Nt(i)), e;
}
function Yr(i) {
  return [i[0], i[1]];
}
function Ur(i) {
  return [i[2], i[1]];
}
function Si(i) {
  return [(i[0] + i[2]) / 2, (i[1] + i[3]) / 2];
}
function Rp(i, e) {
  let t;
  return (
    e === 'bottom-left'
      ? (t = Yr(i))
      : e === 'bottom-right'
      ? (t = Ur(i))
      : e === 'top-left'
      ? (t = qi(i))
      : e === 'top-right'
      ? (t = Vr(i))
      : he(!1, 13),
    t
  );
}
function tl(i, e, t, n, s) {
  const [r, o, l, a, c, h, u, d] = il(i, e, t, n);
  return kt(Math.min(r, l, c, u), Math.min(o, a, h, d), Math.max(r, l, c, u), Math.max(o, a, h, d), s);
}
function il(i, e, t, n) {
  const s = (e * n[0]) / 2,
    r = (e * n[1]) / 2,
    o = Math.cos(t),
    l = Math.sin(t),
    a = s * o,
    c = s * l,
    h = r * o,
    u = r * l,
    d = i[0],
    f = i[1];
  return [d - a + u, f - c - h, d - a - u, f - c + h, d + a - u, f + c + h, d + a + u, f + c - h, d - a + u, f - c - h];
}
function Nt(i) {
  return i[3] - i[1];
}
function ss(i, e, t) {
  const n = t || gt();
  return (
    Ue(i, e)
      ? (i[0] > e[0] ? (n[0] = i[0]) : (n[0] = e[0]),
        i[1] > e[1] ? (n[1] = i[1]) : (n[1] = e[1]),
        i[2] < e[2] ? (n[2] = i[2]) : (n[2] = e[2]),
        i[3] < e[3] ? (n[3] = i[3]) : (n[3] = e[3]))
      : bs(n),
    n
  );
}
function qi(i) {
  return [i[0], i[3]];
}
function Vr(i) {
  return [i[2], i[3]];
}
function Re(i) {
  return i[2] - i[0];
}
function Ue(i, e) {
  return i[0] <= e[2] && i[2] >= e[0] && i[1] <= e[3] && i[3] >= e[1];
}
function ia(i) {
  return i[2] < i[0] || i[3] < i[1];
}
function bp(i, e) {
  return e ? ((e[0] = i[0]), (e[1] = i[1]), (e[2] = i[2]), (e[3] = i[3]), e) : i;
}
function Ip(i, e, t) {
  let n = !1;
  const s = Qo(i, e),
    r = Qo(i, t);
  if (s === ke.INTERSECTING || r === ke.INTERSECTING) n = !0;
  else {
    const o = i[0],
      l = i[1],
      a = i[2],
      c = i[3],
      h = e[0],
      u = e[1],
      d = t[0],
      f = t[1],
      g = (f - u) / (d - h);
    let m, _;
    r & ke.ABOVE && !(s & ke.ABOVE) && ((m = d - (f - c) / g), (n = m >= o && m <= a)),
      !n && r & ke.RIGHT && !(s & ke.RIGHT) && ((_ = f - (d - a) * g), (n = _ >= l && _ <= c)),
      !n && r & ke.BELOW && !(s & ke.BELOW) && ((m = d - (f - l) / g), (n = m >= o && m <= a)),
      !n && r & ke.LEFT && !(s & ke.LEFT) && ((_ = f - (d - o) * g), (n = _ >= l && _ <= c));
  }
  return n;
}
function Lp(i, e, t, n) {
  let s = [];
  if (n > 1) {
    const l = i[2] - i[0],
      a = i[3] - i[1];
    for (let c = 0; c < n; ++c)
      s.push(i[0] + (l * c) / n, i[1], i[2], i[1] + (a * c) / n, i[2] - (l * c) / n, i[3], i[0], i[3] - (a * c) / n);
  } else s = [i[0], i[1], i[2], i[1], i[2], i[3], i[0], i[3]];
  e(s, s, 2);
  const r = [],
    o = [];
  for (let l = 0, a = s.length; l < a; l += 2) r.push(s[l]), o.push(s[l + 1]);
  return wp(r, o, t);
}
function Hu(i, e) {
  const t = e.getExtent(),
    n = Si(i);
  if (e.canWrapX() && (n[0] < t[0] || n[0] >= t[2])) {
    const s = Re(t),
      o = Math.floor((n[0] - t[0]) / s) * s;
    (i[0] -= o), (i[2] -= o);
  }
  return i;
}
function Pp(i, e) {
  if (e.canWrapX()) {
    const t = e.getExtent();
    if (!isFinite(i[0]) || !isFinite(i[2])) return [[t[0], i[1], t[2], i[3]]];
    Hu(i, e);
    const n = Re(t);
    if (Re(i) > n) return [[t[0], i[1], t[2], i[3]]];
    if (i[0] < t[0])
      return [
        [i[0] + n, i[1], t[2], i[3]],
        [t[0], i[1], i[2], i[3]],
      ];
    if (i[2] > t[2])
      return [
        [i[0], i[1], t[2], i[3]],
        [t[0], i[1], i[2] - n, i[3]],
      ];
  }
  return [i];
}
const ms = { radians: 6370997 / (2 * Math.PI), degrees: (2 * Math.PI * 6370997) / 360, ft: 0.3048, m: 1, 'us-ft': 1200 / 3937 };
class Mp {
  constructor(e) {
    (this.code_ = e.code),
      (this.units_ = e.units),
      (this.extent_ = e.extent !== void 0 ? e.extent : null),
      (this.worldExtent_ = e.worldExtent !== void 0 ? e.worldExtent : null),
      (this.axisOrientation_ = e.axisOrientation !== void 0 ? e.axisOrientation : 'enu'),
      (this.global_ = e.global !== void 0 ? e.global : !1),
      (this.canWrapX_ = !!(this.global_ && this.extent_)),
      (this.getPointResolutionFunc_ = e.getPointResolution),
      (this.defaultTileGrid_ = null),
      (this.metersPerUnit_ = e.metersPerUnit);
  }
  canWrapX() {
    return this.canWrapX_;
  }
  getCode() {
    return this.code_;
  }
  getExtent() {
    return this.extent_;
  }
  getUnits() {
    return this.units_;
  }
  getMetersPerUnit() {
    return this.metersPerUnit_ || ms[this.units_];
  }
  getWorldExtent() {
    return this.worldExtent_;
  }
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  isGlobal() {
    return this.global_;
  }
  setGlobal(e) {
    (this.global_ = e), (this.canWrapX_ = !!(e && this.extent_));
  }
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  setDefaultTileGrid(e) {
    this.defaultTileGrid_ = e;
  }
  setExtent(e) {
    (this.extent_ = e), (this.canWrapX_ = !!(this.global_ && e));
  }
  setWorldExtent(e) {
    this.worldExtent_ = e;
  }
  setGetPointResolution(e) {
    this.getPointResolutionFunc_ = e;
  }
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const Ku = Mp,
  Is = 6378137,
  pn = Math.PI * Is,
  Ap = [-pn, -pn, pn, pn],
  Op = [-180, -85, 180, 85],
  Xs = Is * Math.log(Math.tan(Math.PI / 2));
class rn extends Ku {
  constructor(e) {
    super({
      code: e,
      units: 'm',
      extent: Ap,
      global: !0,
      worldExtent: Op,
      getPointResolution: function (t, n) {
        return t / Math.cosh(n[1] / Is);
      },
    });
  }
}
const Wc = [
  new rn('EPSG:3857'),
  new rn('EPSG:102100'),
  new rn('EPSG:102113'),
  new rn('EPSG:900913'),
  new rn('http://www.opengis.net/def/crs/EPSG/0/3857'),
  new rn('http://www.opengis.net/gml/srs/epsg.xml#3857'),
];
function Fp(i, e, t) {
  const n = i.length;
  (t = t > 1 ? t : 2), e === void 0 && (t > 2 ? (e = i.slice()) : (e = new Array(n)));
  for (let s = 0; s < n; s += t) {
    e[s] = (pn * i[s]) / 180;
    let r = Is * Math.log(Math.tan((Math.PI * (+i[s + 1] + 90)) / 360));
    r > Xs ? (r = Xs) : r < -Xs && (r = -Xs), (e[s + 1] = r);
  }
  return e;
}
function Dp(i, e, t) {
  const n = i.length;
  (t = t > 1 ? t : 2), e === void 0 && (t > 2 ? (e = i.slice()) : (e = new Array(n)));
  for (let s = 0; s < n; s += t) (e[s] = (180 * i[s]) / pn), (e[s + 1] = (360 * Math.atan(Math.exp(i[s + 1] / Is))) / Math.PI - 90);
  return e;
}
const kp = 6378137,
  zc = [-180, -90, 180, 90],
  Np = (Math.PI * kp) / 180;
class Li extends Ku {
  constructor(e, t) {
    super({ code: e, units: 'degrees', extent: zc, axisOrientation: t, global: !0, metersPerUnit: Np, worldExtent: zc });
  }
}
const Bc = [
  new Li('CRS:84'),
  new Li('EPSG:4326', 'neu'),
  new Li('urn:ogc:def:crs:OGC:1.3:CRS84'),
  new Li('urn:ogc:def:crs:OGC:2:84'),
  new Li('http://www.opengis.net/def/crs/OGC/1.3/CRS84'),
  new Li('http://www.opengis.net/gml/srs/epsg.xml#4326', 'neu'),
  new Li('http://www.opengis.net/def/crs/EPSG/0/4326', 'neu'),
];
let nl = {};
function Gp(i) {
  return nl[i] || nl[i.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, 'EPSG:$3')] || null;
}
function Wp(i, e) {
  nl[i] = e;
}
let Cn = {};
function gr(i, e, t) {
  const n = i.getCode(),
    s = e.getCode();
  n in Cn || (Cn[n] = {}), (Cn[n][s] = t);
}
function zp(i, e) {
  let t;
  return i in Cn && e in Cn[i] && (t = Cn[i][e]), t;
}
function Fe(i, e, t) {
  return Math.min(Math.max(i, e), t);
}
function Bp(i, e, t, n, s, r) {
  const o = s - t,
    l = r - n;
  if (o !== 0 || l !== 0) {
    const a = ((i - t) * o + (e - n) * l) / (o * o + l * l);
    a > 1 ? ((t = s), (n = r)) : a > 0 && ((t += o * a), (n += l * a));
  }
  return Ui(i, e, t, n);
}
function Ui(i, e, t, n) {
  const s = t - i,
    r = n - e;
  return s * s + r * r;
}
function Xp(i) {
  const e = i.length;
  for (let n = 0; n < e; n++) {
    let s = n,
      r = Math.abs(i[n][n]);
    for (let l = n + 1; l < e; l++) {
      const a = Math.abs(i[l][n]);
      a > r && ((r = a), (s = l));
    }
    if (r === 0) return null;
    const o = i[s];
    (i[s] = i[n]), (i[n] = o);
    for (let l = n + 1; l < e; l++) {
      const a = -i[l][n] / i[n][n];
      for (let c = n; c < e + 1; c++) n == c ? (i[l][c] = 0) : (i[l][c] += a * i[n][c]);
    }
  }
  const t = new Array(e);
  for (let n = e - 1; n >= 0; n--) {
    t[n] = i[n][e] / i[n][n];
    for (let s = n - 1; s >= 0; s--) i[s][e] -= i[s][n] * t[n];
  }
  return t;
}
function or(i) {
  return (i * Math.PI) / 180;
}
function wn(i, e) {
  const t = i % e;
  return t * e < 0 ? t + e : t;
}
function st(i, e, t) {
  return i + t * (e - i);
}
function na(i, e) {
  const t = Math.pow(10, e);
  return Math.round(i * t) / t;
}
function js(i, e) {
  return Math.floor(na(i, e));
}
function Ys(i, e) {
  return Math.ceil(na(i, e));
}
function jp(i, e) {
  return (i[0] += +e[0]), (i[1] += +e[1]), i;
}
function mr(i, e) {
  let t = !0;
  for (let n = i.length - 1; n >= 0; --n)
    if (i[n] != e[n]) {
      t = !1;
      break;
    }
  return t;
}
function sa(i, e) {
  const t = Math.cos(e),
    n = Math.sin(e),
    s = i[0] * t - i[1] * n,
    r = i[1] * t + i[0] * n;
  return (i[0] = s), (i[1] = r), i;
}
function Yp(i, e) {
  return (i[0] *= e), (i[1] *= e), i;
}
function Zu(i, e) {
  if (e.canWrapX()) {
    const t = Re(e.getExtent()),
      n = Up(i, e, t);
    n && (i[0] -= n * t);
  }
  return i;
}
function Up(i, e, t) {
  const n = e.getExtent();
  let s = 0;
  return e.canWrapX() && (i[0] < n[0] || i[0] > n[2]) && ((t = t || Re(n)), (s = Math.floor((i[0] - n[0]) / t))), s;
}
const Vp = 63710088e-1;
function Xc(i, e, t) {
  t = t || Vp;
  const n = or(i[1]),
    s = or(e[1]),
    r = (s - n) / 2,
    o = or(e[0] - i[0]) / 2,
    l = Math.sin(r) * Math.sin(r) + Math.sin(o) * Math.sin(o) * Math.cos(n) * Math.cos(s);
  return 2 * t * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l));
}
const $u = { info: 1, warn: 2, error: 3, none: 4 };
let Hp = $u.info;
function qu(...i) {
  Hp > $u.warn || console.warn(...i);
}
let sl = !0;
function Kp(i) {
  sl = !(i === void 0 ? !0 : i);
}
function ra(i, e) {
  if (e !== void 0) {
    for (let t = 0, n = i.length; t < n; ++t) e[t] = i[t];
    e = e;
  } else e = i.slice();
  return e;
}
function Ju(i, e) {
  if (e !== void 0 && i !== e) {
    for (let t = 0, n = i.length; t < n; ++t) e[t] = i[t];
    i = e;
  }
  return i;
}
function Zp(i) {
  Wp(i.getCode(), i), gr(i, i, ra);
}
function $p(i) {
  i.forEach(Zp);
}
function Me(i) {
  return typeof i == 'string' ? Gp(i) : i || null;
}
function jc(i, e, t, n) {
  i = Me(i);
  let s;
  const r = i.getPointResolutionFunc();
  if (r) {
    if (((s = r(e, t)), n && n !== i.getUnits())) {
      const o = i.getMetersPerUnit();
      o && (s = (s * o) / ms[n]);
    }
  } else {
    const o = i.getUnits();
    if ((o == 'degrees' && !n) || n == 'degrees') s = e;
    else {
      const l = Hr(i, Me('EPSG:4326'));
      if (l === Ju && o !== 'degrees') s = e * i.getMetersPerUnit();
      else {
        let c = [t[0] - e / 2, t[1], t[0] + e / 2, t[1], t[0], t[1] - e / 2, t[0], t[1] + e / 2];
        c = l(c, c, 2);
        const h = Xc(c.slice(0, 2), c.slice(2, 4)),
          u = Xc(c.slice(4, 6), c.slice(6, 8));
        s = (h + u) / 2;
      }
      const a = n ? ms[n] : i.getMetersPerUnit();
      a !== void 0 && (s /= a);
    }
  }
  return s;
}
function Yc(i) {
  $p(i),
    i.forEach(function (e) {
      i.forEach(function (t) {
        e !== t && gr(e, t, ra);
      });
    });
}
function qp(i, e, t, n) {
  i.forEach(function (s) {
    e.forEach(function (r) {
      gr(s, r, t), gr(r, s, n);
    });
  });
}
function oa(i, e) {
  if (i) {
    if (typeof i == 'string') return Me(i);
  } else return Me(e);
  return i;
}
function ki(i, e) {
  if (i === e) return !0;
  const t = i.getUnits() === e.getUnits();
  return (i.getCode() === e.getCode() || Hr(i, e) === ra) && t;
}
function Hr(i, e) {
  const t = i.getCode(),
    n = e.getCode();
  let s = zp(t, n);
  return s || (s = Ju), s;
}
function _r(i, e) {
  const t = Me(i),
    n = Me(e);
  return Hr(t, n);
}
function Qu(i, e, t) {
  return _r(e, t)(i, void 0, i.length);
}
function rl(i, e) {
  return i;
}
function Yt(i, e) {
  return (
    sl &&
      !mr(i, [0, 0]) &&
      i[0] >= -180 &&
      i[0] <= 180 &&
      i[1] >= -90 &&
      i[1] <= 90 &&
      ((sl = !1), qu('Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.')),
    i
  );
}
function ed(i, e) {
  return i;
}
function Wi(i, e) {
  return i;
}
function Jp() {
  Yc(Wc), Yc(Bc), qp(Bc, Wc, Fp, Dp);
}
Jp();
function Vi(i, e, t, n, s, r) {
  r = r || [];
  let o = 0;
  for (let l = e; l < t; l += n) {
    const a = i[l],
      c = i[l + 1];
    (r[o++] = s[0] * a + s[2] * c + s[4]), (r[o++] = s[1] * a + s[3] * c + s[5]);
  }
  return r && r.length != o && (r.length = o), r;
}
function td(i, e, t, n, s, r, o) {
  o = o || [];
  const l = Math.cos(s),
    a = Math.sin(s),
    c = r[0],
    h = r[1];
  let u = 0;
  for (let d = e; d < t; d += n) {
    const f = i[d] - c,
      g = i[d + 1] - h;
    (o[u++] = c + f * l - g * a), (o[u++] = h + f * a + g * l);
    for (let m = d + 2; m < d + n; ++m) o[u++] = i[m];
  }
  return o && o.length != u && (o.length = u), o;
}
function Qp(i, e, t, n, s, r, o, l) {
  l = l || [];
  const a = o[0],
    c = o[1];
  let h = 0;
  for (let u = e; u < t; u += n) {
    const d = i[u] - a,
      f = i[u + 1] - c;
    (l[h++] = a + s * d), (l[h++] = c + r * f);
    for (let g = u + 2; g < u + n; ++g) l[h++] = i[g];
  }
  return l && l.length != h && (l.length = h), l;
}
function ey(i, e, t, n, s, r, o) {
  o = o || [];
  let l = 0;
  for (let a = e; a < t; a += n) {
    (o[l++] = i[a] + s), (o[l++] = i[a + 1] + r);
    for (let c = a + 2; c < a + n; ++c) o[l++] = i[c];
  }
  return o && o.length != l && (o.length = l), o;
}
const Uc = wt();
class ty extends Ze {
  constructor() {
    super(),
      (this.extent_ = gt()),
      (this.extentRevision_ = -1),
      (this.simplifiedGeometryMaxMinSquaredTolerance = 0),
      (this.simplifiedGeometryRevision = 0),
      (this.simplifyTransformedInternal = rp(function (e, t, n) {
        if (!n) return this.getSimplifiedGeometry(t);
        const s = this.clone();
        return s.applyTransform(n), s.getSimplifiedGeometry(t);
      }));
  }
  simplifyTransformed(e, t) {
    return this.simplifyTransformedInternal(this.getRevision(), e, t);
  }
  clone() {
    return ie();
  }
  closestPointXY(e, t, n, s) {
    return ie();
  }
  containsXY(e, t) {
    const n = this.getClosestPoint([e, t]);
    return n[0] === e && n[1] === t;
  }
  getClosestPoint(e, t) {
    return (t = t || [NaN, NaN]), this.closestPointXY(e[0], e[1], t, 1 / 0), t;
  }
  intersectsCoordinate(e) {
    return this.containsXY(e[0], e[1]);
  }
  computeExtent(e) {
    return ie();
  }
  getExtent(e) {
    if (this.extentRevision_ != this.getRevision()) {
      const t = this.computeExtent(this.extent_);
      (isNaN(t[0]) || isNaN(t[1])) && bs(t), (this.extentRevision_ = this.getRevision());
    }
    return bp(this.extent_, e);
  }
  rotate(e, t) {
    ie();
  }
  scale(e, t, n) {
    ie();
  }
  simplify(e) {
    return this.getSimplifiedGeometry(e * e);
  }
  getSimplifiedGeometry(e) {
    return ie();
  }
  getType() {
    return ie();
  }
  applyTransform(e) {
    ie();
  }
  intersectsExtent(e) {
    return ie();
  }
  translate(e, t) {
    ie();
  }
  transform(e, t) {
    const n = Me(e),
      s =
        n.getUnits() == 'tile-pixels'
          ? function (r, o, l) {
              const a = n.getExtent(),
                c = n.getWorldExtent(),
                h = Nt(c) / Nt(a);
              return wi(Uc, c[0], c[3], h, -h, 0, 0, 0), Vi(r, 0, r.length, l, Uc, o), _r(n, t)(r, o, l);
            }
          : _r(n, t);
    return this.applyTransform(s), this;
  }
}
const id = ty;
class iy extends id {
  constructor() {
    super(), (this.layout = 'XY'), (this.stride = 2), (this.flatCoordinates = null);
  }
  computeExtent(e) {
    return Yu(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, e);
  }
  getCoordinates() {
    return ie();
  }
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  getLastCoordinate() {
    return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
  }
  getLayout() {
    return this.layout;
  }
  getSimplifiedGeometry(e) {
    if (
      (this.simplifiedGeometryRevision !== this.getRevision() &&
        ((this.simplifiedGeometryMaxMinSquaredTolerance = 0), (this.simplifiedGeometryRevision = this.getRevision())),
      e < 0 || (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && e <= this.simplifiedGeometryMaxMinSquaredTolerance))
    )
      return this;
    const t = this.getSimplifiedGeometryInternal(e);
    return t.getFlatCoordinates().length < this.flatCoordinates.length ? t : ((this.simplifiedGeometryMaxMinSquaredTolerance = e), this);
  }
  getSimplifiedGeometryInternal(e) {
    return this;
  }
  getStride() {
    return this.stride;
  }
  setFlatCoordinates(e, t) {
    (this.stride = Vc(e)), (this.layout = e), (this.flatCoordinates = t);
  }
  setCoordinates(e, t) {
    ie();
  }
  setLayout(e, t, n) {
    let s;
    if (e) s = Vc(e);
    else {
      for (let r = 0; r < n; ++r) {
        if (t.length === 0) {
          (this.layout = 'XY'), (this.stride = 2);
          return;
        }
        t = t[0];
      }
      (s = t.length), (e = ny(s));
    }
    (this.layout = e), (this.stride = s);
  }
  applyTransform(e) {
    this.flatCoordinates && (e(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed());
  }
  rotate(e, t) {
    const n = this.getFlatCoordinates();
    if (n) {
      const s = this.getStride();
      td(n, 0, n.length, s, e, t, n), this.changed();
    }
  }
  scale(e, t, n) {
    t === void 0 && (t = e), n || (n = Si(this.getExtent()));
    const s = this.getFlatCoordinates();
    if (s) {
      const r = this.getStride();
      Qp(s, 0, s.length, r, e, t, n, s), this.changed();
    }
  }
  translate(e, t) {
    const n = this.getFlatCoordinates();
    if (n) {
      const s = this.getStride();
      ey(n, 0, n.length, s, e, t, n), this.changed();
    }
  }
}
function ny(i) {
  let e;
  return i == 2 ? (e = 'XY') : i == 3 ? (e = 'XYZ') : i == 4 && (e = 'XYZM'), e;
}
function Vc(i) {
  let e;
  return i == 'XY' ? (e = 2) : i == 'XYZ' || i == 'XYM' ? (e = 3) : i == 'XYZM' && (e = 4), e;
}
function sy(i, e, t) {
  const n = i.getFlatCoordinates();
  if (!n) return null;
  const s = i.getStride();
  return Vi(n, 0, n.length, s, e, t);
}
const Ji = iy;
function Hc(i, e, t, n, s, r, o) {
  const l = i[e],
    a = i[e + 1],
    c = i[t] - l,
    h = i[t + 1] - a;
  let u;
  if (c === 0 && h === 0) u = e;
  else {
    const d = ((s - l) * c + (r - a) * h) / (c * c + h * h);
    if (d > 1) u = t;
    else if (d > 0) {
      for (let f = 0; f < n; ++f) o[f] = st(i[e + f], i[t + f], d);
      o.length = n;
      return;
    } else u = e;
  }
  for (let d = 0; d < n; ++d) o[d] = i[u + d];
  o.length = n;
}
function la(i, e, t, n, s) {
  let r = i[e],
    o = i[e + 1];
  for (e += n; e < t; e += n) {
    const l = i[e],
      a = i[e + 1],
      c = Ui(r, o, l, a);
    c > s && (s = c), (r = l), (o = a);
  }
  return s;
}
function aa(i, e, t, n, s) {
  for (let r = 0, o = t.length; r < o; ++r) {
    const l = t[r];
    (s = la(i, e, l, n, s)), (e = l);
  }
  return s;
}
function ry(i, e, t, n, s) {
  for (let r = 0, o = t.length; r < o; ++r) {
    const l = t[r];
    (s = aa(i, e, l, n, s)), (e = l[l.length - 1]);
  }
  return s;
}
function ca(i, e, t, n, s, r, o, l, a, c, h) {
  if (e == t) return c;
  let u, d;
  if (s === 0) {
    if (((d = Ui(o, l, i[e], i[e + 1])), d < c)) {
      for (u = 0; u < n; ++u) a[u] = i[e + u];
      return (a.length = n), d;
    }
    return c;
  }
  h = h || [NaN, NaN];
  let f = e + n;
  for (; f < t; )
    if ((Hc(i, f - n, f, n, o, l, h), (d = Ui(o, l, h[0], h[1])), d < c)) {
      for (c = d, u = 0; u < n; ++u) a[u] = h[u];
      (a.length = n), (f += n);
    } else f += n * Math.max(((Math.sqrt(d) - Math.sqrt(c)) / s) | 0, 1);
  if (r && (Hc(i, t - n, e, n, o, l, h), (d = Ui(o, l, h[0], h[1])), d < c)) {
    for (c = d, u = 0; u < n; ++u) a[u] = h[u];
    a.length = n;
  }
  return c;
}
function ha(i, e, t, n, s, r, o, l, a, c, h) {
  h = h || [NaN, NaN];
  for (let u = 0, d = t.length; u < d; ++u) {
    const f = t[u];
    (c = ca(i, e, f, n, s, r, o, l, a, c, h)), (e = f);
  }
  return c;
}
function oy(i, e, t, n, s, r, o, l, a, c, h) {
  h = h || [NaN, NaN];
  for (let u = 0, d = t.length; u < d; ++u) {
    const f = t[u];
    (c = ha(i, e, f, n, s, r, o, l, a, c, h)), (e = f[f.length - 1]);
  }
  return c;
}
function ly(i, e, t, n) {
  for (let s = 0, r = t.length; s < r; ++s) i[e++] = t[s];
  return e;
}
function Kr(i, e, t, n) {
  for (let s = 0, r = t.length; s < r; ++s) {
    const o = t[s];
    for (let l = 0; l < n; ++l) i[e++] = o[l];
  }
  return e;
}
function ua(i, e, t, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, l = t.length; o < l; ++o) {
    const a = Kr(i, e, t[o], n);
    (s[r++] = a), (e = a);
  }
  return (s.length = r), s;
}
function ay(i, e, t, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, l = t.length; o < l; ++o) {
    const a = ua(i, e, t[o], n, s[r]);
    a.length === 0 && (a[0] = e), (s[r++] = a), (e = a[a.length - 1]);
  }
  return (s.length = r), s;
}
function da(i, e, t, n, s, r, o) {
  const l = (t - e) / n;
  if (l < 3) {
    for (; e < t; e += n) (r[o++] = i[e]), (r[o++] = i[e + 1]);
    return o;
  }
  const a = new Array(l);
  (a[0] = 1), (a[l - 1] = 1);
  const c = [e, t - n];
  let h = 0;
  for (; c.length > 0; ) {
    const u = c.pop(),
      d = c.pop();
    let f = 0;
    const g = i[d],
      m = i[d + 1],
      _ = i[u],
      p = i[u + 1];
    for (let v = d + n; v < u; v += n) {
      const x = i[v],
        E = i[v + 1],
        w = Bp(x, E, g, m, _, p);
      w > f && ((h = v), (f = w));
    }
    f > s && ((a[(h - e) / n] = 1), d + n < h && c.push(d, h), h + n < u && c.push(h, u));
  }
  for (let u = 0; u < l; ++u) a[u] && ((r[o++] = i[e + u * n]), (r[o++] = i[e + u * n + 1]));
  return o;
}
function cy(i, e, t, n, s, r, o, l) {
  for (let a = 0, c = t.length; a < c; ++a) {
    const h = t[a];
    (o = da(i, e, h, n, s, r, o)), l.push(o), (e = h);
  }
  return o;
}
function Ai(i, e) {
  return e * Math.round(i / e);
}
function hy(i, e, t, n, s, r, o) {
  if (e == t) return o;
  let l = Ai(i[e], s),
    a = Ai(i[e + 1], s);
  (e += n), (r[o++] = l), (r[o++] = a);
  let c, h;
  do if (((c = Ai(i[e], s)), (h = Ai(i[e + 1], s)), (e += n), e == t)) return (r[o++] = c), (r[o++] = h), o;
  while (c == l && h == a);
  for (; e < t; ) {
    const u = Ai(i[e], s),
      d = Ai(i[e + 1], s);
    if (((e += n), u == c && d == h)) continue;
    const f = c - l,
      g = h - a,
      m = u - l,
      _ = d - a;
    if (f * _ == g * m && ((f < 0 && m < f) || f == m || (f > 0 && m > f)) && ((g < 0 && _ < g) || g == _ || (g > 0 && _ > g))) {
      (c = u), (h = d);
      continue;
    }
    (r[o++] = c), (r[o++] = h), (l = c), (a = h), (c = u), (h = d);
  }
  return (r[o++] = c), (r[o++] = h), o;
}
function nd(i, e, t, n, s, r, o, l) {
  for (let a = 0, c = t.length; a < c; ++a) {
    const h = t[a];
    (o = hy(i, e, h, n, s, r, o)), l.push(o), (e = h);
  }
  return o;
}
function uy(i, e, t, n, s, r, o, l) {
  for (let a = 0, c = t.length; a < c; ++a) {
    const h = t[a],
      u = [];
    (o = nd(i, e, h, n, s, r, o, u)), l.push(u), (e = h[h.length - 1]);
  }
  return o;
}
function fi(i, e, t, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = e; o < t; o += n) s[r++] = i.slice(o, o + n);
  return (s.length = r), s;
}
function _s(i, e, t, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, l = t.length; o < l; ++o) {
    const a = t[o];
    (s[r++] = fi(i, e, a, n, s[r])), (e = a);
  }
  return (s.length = r), s;
}
function ll(i, e, t, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, l = t.length; o < l; ++o) {
    const a = t[o];
    (s[r++] = a.length === 1 && a[0] === e ? [] : _s(i, e, a, n, s[r])), (e = a[a.length - 1]);
  }
  return (s.length = r), s;
}
function sd(i, e, t, n) {
  let s = 0,
    r = i[t - n],
    o = i[t - n + 1];
  for (; e < t; e += n) {
    const l = i[e],
      a = i[e + 1];
    (s += o * l - r * a), (r = l), (o = a);
  }
  return s / 2;
}
function rd(i, e, t, n) {
  let s = 0;
  for (let r = 0, o = t.length; r < o; ++r) {
    const l = t[r];
    (s += sd(i, e, l, n)), (e = l);
  }
  return s;
}
function dy(i, e, t, n) {
  let s = 0;
  for (let r = 0, o = t.length; r < o; ++r) {
    const l = t[r];
    (s += rd(i, e, l, n)), (e = l[l.length - 1]);
  }
  return s;
}
class pr extends Ji {
  constructor(e, t) {
    super(),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      t !== void 0 && !Array.isArray(e[0]) ? this.setFlatCoordinates(t, e) : this.setCoordinates(e, t);
  }
  clone() {
    return new pr(this.flatCoordinates.slice(), this.layout);
  }
  closestPointXY(e, t, n, s) {
    return s < $i(this.getExtent(), e, t)
      ? s
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(la(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0))),
          (this.maxDeltaRevision_ = this.getRevision())),
        ca(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !0, e, t, n, s));
  }
  getArea() {
    return sd(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  getCoordinates() {
    return fi(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  getSimplifiedGeometryInternal(e) {
    const t = [];
    return (t.length = da(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, e, t, 0)), new pr(t, 'XY');
  }
  getType() {
    return 'LinearRing';
  }
  intersectsExtent(e) {
    return !1;
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = Kr(this.flatCoordinates, 0, e, this.stride)),
      this.changed();
  }
}
const Kc = pr;
class fa extends Ji {
  constructor(e, t) {
    super(), this.setCoordinates(e, t);
  }
  clone() {
    const e = new fa(this.flatCoordinates.slice(), this.layout);
    return e.applyProperties(this), e;
  }
  closestPointXY(e, t, n, s) {
    const r = this.flatCoordinates,
      o = Ui(e, t, r[0], r[1]);
    if (o < s) {
      const l = this.stride;
      for (let a = 0; a < l; ++a) n[a] = r[a];
      return (n.length = l), o;
    }
    return s;
  }
  getCoordinates() {
    return this.flatCoordinates ? this.flatCoordinates.slice() : [];
  }
  computeExtent(e) {
    return Sp(this.flatCoordinates, e);
  }
  getType() {
    return 'Point';
  }
  intersectsExtent(e) {
    return ea(e, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 0),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = ly(this.flatCoordinates, 0, e, this.stride)),
      this.changed();
  }
}
const ei = fa;
function fy(i, e, t, n, s) {
  return !Vu(s, function (o) {
    return !zi(i, e, t, n, o[0], o[1]);
  });
}
function zi(i, e, t, n, s, r) {
  let o = 0,
    l = i[t - n],
    a = i[t - n + 1];
  for (; e < t; e += n) {
    const c = i[e],
      h = i[e + 1];
    a <= r ? h > r && (c - l) * (r - a) - (s - l) * (h - a) > 0 && o++ : h <= r && (c - l) * (r - a) - (s - l) * (h - a) < 0 && o--,
      (l = c),
      (a = h);
  }
  return o !== 0;
}
function ga(i, e, t, n, s, r) {
  if (t.length === 0 || !zi(i, e, t[0], n, s, r)) return !1;
  for (let o = 1, l = t.length; o < l; ++o) if (zi(i, t[o - 1], t[o], n, s, r)) return !1;
  return !0;
}
function gy(i, e, t, n, s, r) {
  if (t.length === 0) return !1;
  for (let o = 0, l = t.length; o < l; ++o) {
    const a = t[o];
    if (ga(i, e, a, n, s, r)) return !0;
    e = a[a.length - 1];
  }
  return !1;
}
function od(i, e, t, n, s, r, o) {
  let l, a, c, h, u, d, f;
  const g = s[r + 1],
    m = [];
  for (let v = 0, x = t.length; v < x; ++v) {
    const E = t[v];
    for (h = i[E - n], d = i[E - n + 1], l = e; l < E; l += n)
      (u = i[l]),
        (f = i[l + 1]),
        ((g <= d && f <= g) || (d <= g && g <= f)) && ((c = ((g - d) / (f - d)) * (u - h) + h), m.push(c)),
        (h = u),
        (d = f);
  }
  let _ = NaN,
    p = -1 / 0;
  for (m.sort(Hi), h = m[0], l = 1, a = m.length; l < a; ++l) {
    u = m[l];
    const v = Math.abs(u - h);
    v > p && ((c = (h + u) / 2), ga(i, e, t, n, c, g) && ((_ = c), (p = v))), (h = u);
  }
  return isNaN(_) && (_ = s[r]), o ? (o.push(_, g, p), o) : [_, g, p];
}
function my(i, e, t, n, s) {
  let r = [];
  for (let o = 0, l = t.length; o < l; ++o) {
    const a = t[o];
    (r = od(i, e, a, n, s, 2 * o, r)), (e = a[a.length - 1]);
  }
  return r;
}
function ld(i, e, t, n, s) {
  let r;
  for (e += n; e < t; e += n) if (((r = s(i.slice(e - n, e), i.slice(e, e + n))), r)) return r;
  return !1;
}
function Zr(i, e, t, n, s) {
  const r = Uu(gt(), i, e, t, n);
  return Ue(s, r)
    ? Gi(s, r) || (r[0] >= s[0] && r[2] <= s[2]) || (r[1] >= s[1] && r[3] <= s[3])
      ? !0
      : ld(i, e, t, n, function (o, l) {
          return Ip(s, o, l);
        })
    : !1;
}
function _y(i, e, t, n, s) {
  for (let r = 0, o = t.length; r < o; ++r) {
    if (Zr(i, e, t[r], n, s)) return !0;
    e = t[r];
  }
  return !1;
}
function ad(i, e, t, n, s) {
  return !!(
    Zr(i, e, t, n, s) ||
    zi(i, e, t, n, s[0], s[1]) ||
    zi(i, e, t, n, s[0], s[3]) ||
    zi(i, e, t, n, s[2], s[1]) ||
    zi(i, e, t, n, s[2], s[3])
  );
}
function cd(i, e, t, n, s) {
  if (!ad(i, e, t[0], n, s)) return !1;
  if (t.length === 1) return !0;
  for (let r = 1, o = t.length; r < o; ++r) if (fy(i, t[r - 1], t[r], n, s) && !Zr(i, t[r - 1], t[r], n, s)) return !1;
  return !0;
}
function py(i, e, t, n, s) {
  for (let r = 0, o = t.length; r < o; ++r) {
    const l = t[r];
    if (cd(i, e, l, n, s)) return !0;
    e = l[l.length - 1];
  }
  return !1;
}
function yy(i, e, t, n) {
  for (; e < t - n; ) {
    for (let s = 0; s < n; ++s) {
      const r = i[e + s];
      (i[e + s] = i[t - n + s]), (i[t - n + s] = r);
    }
    (e += n), (t -= n);
  }
}
function hd(i, e, t, n) {
  let s = 0,
    r = i[t - n],
    o = i[t - n + 1];
  for (; e < t; e += n) {
    const l = i[e],
      a = i[e + 1];
    (s += (l - r) * (a + o)), (r = l), (o = a);
  }
  return s === 0 ? void 0 : s > 0;
}
function ud(i, e, t, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = t.length; r < o; ++r) {
    const l = t[r],
      a = hd(i, e, l, n);
    if (r === 0) {
      if ((s && a) || (!s && !a)) return !1;
    } else if ((s && !a) || (!s && a)) return !1;
    e = l;
  }
  return !0;
}
function xy(i, e, t, n, s) {
  for (let r = 0, o = t.length; r < o; ++r) {
    const l = t[r];
    if (!ud(i, e, l, n, s)) return !1;
    l.length && (e = l[l.length - 1]);
  }
  return !0;
}
function al(i, e, t, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = t.length; r < o; ++r) {
    const l = t[r],
      a = hd(i, e, l, n);
    (r === 0 ? (s && a) || (!s && !a) : (s && !a) || (!s && a)) && yy(i, e, l, n), (e = l);
  }
  return e;
}
function Zc(i, e, t, n, s) {
  for (let r = 0, o = t.length; r < o; ++r) e = al(i, e, t[r], n, s);
  return e;
}
class St extends Ji {
  constructor(e, t, n) {
    super(),
      (this.ends_ = []),
      (this.flatInteriorPointRevision_ = -1),
      (this.flatInteriorPoint_ = null),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      (this.orientedRevision_ = -1),
      (this.orientedFlatCoordinates_ = null),
      t !== void 0 && n ? (this.setFlatCoordinates(t, e), (this.ends_ = n)) : this.setCoordinates(e, t);
  }
  appendLinearRing(e) {
    this.flatCoordinates ? Ct(this.flatCoordinates, e.getFlatCoordinates()) : (this.flatCoordinates = e.getFlatCoordinates().slice()),
      this.ends_.push(this.flatCoordinates.length),
      this.changed();
  }
  clone() {
    const e = new St(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
    return e.applyProperties(this), e;
  }
  closestPointXY(e, t, n, s) {
    return s < $i(this.getExtent(), e, t)
      ? s
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(aa(this.flatCoordinates, 0, this.ends_, this.stride, 0))),
          (this.maxDeltaRevision_ = this.getRevision())),
        ha(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !0, e, t, n, s));
  }
  containsXY(e, t) {
    return ga(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, e, t);
  }
  getArea() {
    return rd(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
  }
  getCoordinates(e) {
    let t;
    return (
      e !== void 0 ? ((t = this.getOrientedFlatCoordinates().slice()), al(t, 0, this.ends_, this.stride, e)) : (t = this.flatCoordinates),
      _s(t, 0, this.ends_, this.stride)
    );
  }
  getEnds() {
    return this.ends_;
  }
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const e = Si(this.getExtent());
      (this.flatInteriorPoint_ = od(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, e, 0)),
        (this.flatInteriorPointRevision_ = this.getRevision());
    }
    return this.flatInteriorPoint_;
  }
  getInteriorPoint() {
    return new ei(this.getFlatInteriorPoint(), 'XYM');
  }
  getLinearRingCount() {
    return this.ends_.length;
  }
  getLinearRing(e) {
    return e < 0 || this.ends_.length <= e
      ? null
      : new Kc(this.flatCoordinates.slice(e === 0 ? 0 : this.ends_[e - 1], this.ends_[e]), this.layout);
  }
  getLinearRings() {
    const e = this.layout,
      t = this.flatCoordinates,
      n = this.ends_,
      s = [];
    let r = 0;
    for (let o = 0, l = n.length; o < l; ++o) {
      const a = n[o],
        c = new Kc(t.slice(r, a), e);
      s.push(c), (r = a);
    }
    return s;
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const e = this.flatCoordinates;
      ud(e, 0, this.ends_, this.stride)
        ? (this.orientedFlatCoordinates_ = e)
        : ((this.orientedFlatCoordinates_ = e.slice()),
          (this.orientedFlatCoordinates_.length = al(this.orientedFlatCoordinates_, 0, this.ends_, this.stride))),
        (this.orientedRevision_ = this.getRevision());
    }
    return this.orientedFlatCoordinates_;
  }
  getSimplifiedGeometryInternal(e) {
    const t = [],
      n = [];
    return (t.length = nd(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(e), t, 0, n)), new St(t, 'XY', n);
  }
  getType() {
    return 'Polygon';
  }
  intersectsExtent(e) {
    return cd(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, e);
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = ua(this.flatCoordinates, 0, e, this.stride, this.ends_);
    (this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1]), this.changed();
  }
}
function $c(i) {
  const e = i[0],
    t = i[1],
    n = i[2],
    s = i[3],
    r = [e, t, e, s, n, s, n, t, e, t];
  return new St(r, 'XY', [r.length]);
}
const yi = {
  PRERENDER: 'prerender',
  POSTRENDER: 'postrender',
  PRECOMPOSE: 'precompose',
  POSTCOMPOSE: 'postcompose',
  RENDERCOMPLETE: 'rendercomplete',
};
class ma {
  constructor(e) {
    (e = e || {}), (this.color_ = e.color !== void 0 ? e.color : null);
  }
  clone() {
    const e = this.getColor();
    return new ma({ color: Array.isArray(e) ? e.slice() : e || void 0 });
  }
  getColor() {
    return this.color_;
  }
  setColor(e) {
    this.color_ = e;
  }
}
const bt = ma;
function dd(i, e, t, n, s, r, o) {
  let l, a;
  const c = (t - e) / n;
  if (c === 1) l = e;
  else if (c === 2) (l = e), (a = s);
  else if (c !== 0) {
    let h = i[e],
      u = i[e + 1],
      d = 0;
    const f = [0];
    for (let _ = e + n; _ < t; _ += n) {
      const p = i[_],
        v = i[_ + 1];
      (d += Math.sqrt((p - h) * (p - h) + (v - u) * (v - u))), f.push(d), (h = p), (u = v);
    }
    const g = s * d,
      m = ip(f, g);
    m < 0 ? ((a = (g - f[-m - 2]) / (f[-m - 1] - f[-m - 2])), (l = e + (-m - 2) * n)) : (l = e + m * n);
  }
  (o = o > 1 ? o : 2), (r = r || new Array(o));
  for (let h = 0; h < o; ++h) r[h] = l === void 0 ? NaN : a === void 0 ? i[l + h] : st(i[l + h], i[l + n + h], a);
  return r;
}
function cl(i, e, t, n, s, r) {
  if (t == e) return null;
  let o;
  if (s < i[e + n - 1]) return r ? ((o = i.slice(e, e + n)), (o[n - 1] = s), o) : null;
  if (i[t - 1] < s) return r ? ((o = i.slice(t - n, t)), (o[n - 1] = s), o) : null;
  if (s == i[e + n - 1]) return i.slice(e, e + n);
  let l = e / n,
    a = t / n;
  for (; l < a; ) {
    const d = (l + a) >> 1;
    s < i[(d + 1) * n - 1] ? (a = d) : (l = d + 1);
  }
  const c = i[l * n - 1];
  if (s == c) return i.slice((l - 1) * n, (l - 1) * n + n);
  const h = i[(l + 1) * n - 1],
    u = (s - c) / (h - c);
  o = [];
  for (let d = 0; d < n - 1; ++d) o.push(st(i[(l - 1) * n + d], i[l * n + d], u));
  return o.push(s), o;
}
function vy(i, e, t, n, s, r, o) {
  if (o) return cl(i, e, t[t.length - 1], n, s, r);
  let l;
  if (s < i[n - 1]) return r ? ((l = i.slice(0, n)), (l[n - 1] = s), l) : null;
  if (i[i.length - 1] < s) return r ? ((l = i.slice(i.length - n)), (l[n - 1] = s), l) : null;
  for (let a = 0, c = t.length; a < c; ++a) {
    const h = t[a];
    if (e != h) {
      if (s < i[e + n - 1]) return null;
      if (s <= i[h - 1]) return cl(i, e, h, n, s, !1);
      e = h;
    }
  }
  return null;
}
function fd(i, e, t, n) {
  let s = i[e],
    r = i[e + 1],
    o = 0;
  for (let l = e + n; l < t; l += n) {
    const a = i[l],
      c = i[l + 1];
    (o += Math.sqrt((a - s) * (a - s) + (c - r) * (c - r))), (s = a), (r = c);
  }
  return o;
}
class yr extends Ji {
  constructor(e, t) {
    super(),
      (this.flatMidpoint_ = null),
      (this.flatMidpointRevision_ = -1),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      t !== void 0 && !Array.isArray(e[0]) ? this.setFlatCoordinates(t, e) : this.setCoordinates(e, t);
  }
  appendCoordinate(e) {
    this.flatCoordinates ? Ct(this.flatCoordinates, e) : (this.flatCoordinates = e.slice()), this.changed();
  }
  clone() {
    const e = new yr(this.flatCoordinates.slice(), this.layout);
    return e.applyProperties(this), e;
  }
  closestPointXY(e, t, n, s) {
    return s < $i(this.getExtent(), e, t)
      ? s
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(la(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0))),
          (this.maxDeltaRevision_ = this.getRevision())),
        ca(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !1, e, t, n, s));
  }
  forEachSegment(e) {
    return ld(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, e);
  }
  getCoordinateAtM(e, t) {
    return this.layout != 'XYM' && this.layout != 'XYZM'
      ? null
      : ((t = t !== void 0 ? t : !1), cl(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, e, t));
  }
  getCoordinates() {
    return fi(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  getCoordinateAt(e, t) {
    return dd(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, e, t, this.stride);
  }
  getLength() {
    return fd(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  getFlatMidpoint() {
    return (
      this.flatMidpointRevision_ != this.getRevision() &&
        ((this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_)), (this.flatMidpointRevision_ = this.getRevision())),
      this.flatMidpoint_
    );
  }
  getSimplifiedGeometryInternal(e) {
    const t = [];
    return (t.length = da(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, e, t, 0)), new yr(t, 'XY');
  }
  getType() {
    return 'LineString';
  }
  intersectsExtent(e) {
    return Zr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, e);
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = Kr(this.flatCoordinates, 0, e, this.stride)),
      this.changed();
  }
}
const Sn = yr;
class _a {
  constructor(e) {
    (e = e || {}),
      (this.color_ = e.color !== void 0 ? e.color : null),
      (this.lineCap_ = e.lineCap),
      (this.lineDash_ = e.lineDash !== void 0 ? e.lineDash : null),
      (this.lineDashOffset_ = e.lineDashOffset),
      (this.lineJoin_ = e.lineJoin),
      (this.miterLimit_ = e.miterLimit),
      (this.width_ = e.width);
  }
  clone() {
    const e = this.getColor();
    return new _a({
      color: Array.isArray(e) ? e.slice() : e || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth(),
    });
  }
  getColor() {
    return this.color_;
  }
  getLineCap() {
    return this.lineCap_;
  }
  getLineDash() {
    return this.lineDash_;
  }
  getLineDashOffset() {
    return this.lineDashOffset_;
  }
  getLineJoin() {
    return this.lineJoin_;
  }
  getMiterLimit() {
    return this.miterLimit_;
  }
  getWidth() {
    return this.width_;
  }
  setColor(e) {
    this.color_ = e;
  }
  setLineCap(e) {
    this.lineCap_ = e;
  }
  setLineDash(e) {
    this.lineDash_ = e;
  }
  setLineDashOffset(e) {
    this.lineDashOffset_ = e;
  }
  setLineJoin(e) {
    this.lineJoin_ = e;
  }
  setMiterLimit(e) {
    this.miterLimit_ = e;
  }
  setWidth(e) {
    this.width_ = e;
  }
}
const Tt = _a,
  De = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3, EMPTY: 4 };
function qc(i) {
  return i[0] > 0 && i[1] > 0;
}
function Ey(i, e, t) {
  return t === void 0 && (t = [0, 0]), (t[0] = (i[0] * e + 0.5) | 0), (t[1] = (i[1] * e + 0.5) | 0), t;
}
function rt(i, e) {
  return Array.isArray(i) ? i : (e === void 0 ? (e = [i, i]) : ((e[0] = i), (e[1] = i)), e);
}
class pa {
  constructor(e) {
    (this.opacity_ = e.opacity),
      (this.rotateWithView_ = e.rotateWithView),
      (this.rotation_ = e.rotation),
      (this.scale_ = e.scale),
      (this.scaleArray_ = rt(e.scale)),
      (this.displacement_ = e.displacement),
      (this.declutterMode_ = e.declutterMode);
  }
  clone() {
    const e = this.getScale();
    return new pa({
      opacity: this.getOpacity(),
      scale: Array.isArray(e) ? e.slice() : e,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode(),
    });
  }
  getOpacity() {
    return this.opacity_;
  }
  getRotateWithView() {
    return this.rotateWithView_;
  }
  getRotation() {
    return this.rotation_;
  }
  getScale() {
    return this.scale_;
  }
  getScaleArray() {
    return this.scaleArray_;
  }
  getDisplacement() {
    return this.displacement_;
  }
  getDeclutterMode() {
    return this.declutterMode_;
  }
  getAnchor() {
    return ie();
  }
  getImage(e) {
    return ie();
  }
  getHitDetectionImage() {
    return ie();
  }
  getPixelRatio(e) {
    return 1;
  }
  getImageState() {
    return ie();
  }
  getImageSize() {
    return ie();
  }
  getOrigin() {
    return ie();
  }
  getSize() {
    return ie();
  }
  setDisplacement(e) {
    this.displacement_ = e;
  }
  setOpacity(e) {
    this.opacity_ = e;
  }
  setRotateWithView(e) {
    this.rotateWithView_ = e;
  }
  setRotation(e) {
    this.rotation_ = e;
  }
  setScale(e) {
    (this.scale_ = e), (this.scaleArray_ = rt(e));
  }
  listenImageChange(e) {
    ie();
  }
  load() {
    ie();
  }
  unlistenImageChange(e) {
    ie();
  }
}
const gd = pa,
  Cy = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i,
  wy = /^([a-z]*)$|^hsla?\(.*\)$/i;
function $r(i) {
  return typeof i == 'string' ? i : md(i);
}
function Sy(i) {
  const e = document.createElement('div');
  if (((e.style.color = i), e.style.color !== '')) {
    document.body.appendChild(e);
    const t = getComputedStyle(e).color;
    return document.body.removeChild(e), t;
  }
  return '';
}
const Ty = (function () {
  const e = {};
  let t = 0;
  return function (n) {
    let s;
    if (e.hasOwnProperty(n)) s = e[n];
    else {
      if (t >= 1024) {
        let r = 0;
        for (const o in e) r++ & 3 || (delete e[o], --t);
      }
      (s = Ry(n)), (e[n] = s), ++t;
    }
    return s;
  };
})();
function xr(i) {
  return Array.isArray(i) ? i : Ty(i);
}
function Ry(i) {
  let e, t, n, s, r;
  if ((wy.exec(i) && (i = Sy(i)), Cy.exec(i))) {
    const o = i.length - 1;
    let l;
    o <= 4 ? (l = 1) : (l = 2);
    const a = o === 4 || o === 8;
    (e = parseInt(i.substr(1 + 0 * l, l), 16)),
      (t = parseInt(i.substr(1 + 1 * l, l), 16)),
      (n = parseInt(i.substr(1 + 2 * l, l), 16)),
      a ? (s = parseInt(i.substr(1 + 3 * l, l), 16)) : (s = 255),
      l == 1 && ((e = (e << 4) + e), (t = (t << 4) + t), (n = (n << 4) + n), a && (s = (s << 4) + s)),
      (r = [e, t, n, s / 255]);
  } else
    i.startsWith('rgba(')
      ? ((r = i.slice(5, -1).split(',').map(Number)), Jc(r))
      : i.startsWith('rgb(')
      ? ((r = i.slice(4, -1).split(',').map(Number)), r.push(1), Jc(r))
      : he(!1, 14);
  return r;
}
function Jc(i) {
  return (
    (i[0] = Fe((i[0] + 0.5) | 0, 0, 255)),
    (i[1] = Fe((i[1] + 0.5) | 0, 0, 255)),
    (i[2] = Fe((i[2] + 0.5) | 0, 0, 255)),
    (i[3] = Fe(i[3], 0, 1)),
    i
  );
}
function md(i) {
  let e = i[0];
  e != (e | 0) && (e = (e + 0.5) | 0);
  let t = i[1];
  t != (t | 0) && (t = (t + 0.5) | 0);
  let n = i[2];
  n != (n | 0) && (n = (n + 0.5) | 0);
  const s = i[3] === void 0 ? 1 : Math.round(i[3] * 100) / 100;
  return 'rgba(' + e + ',' + t + ',' + n + ',' + s + ')';
}
function Ft(i) {
  return Array.isArray(i) ? md(i) : i;
}
function qe(i, e, t, n) {
  let s;
  return (
    t && t.length ? (s = t.shift()) : ql ? (s = new OffscreenCanvas(i || 300, e || 300)) : (s = document.createElement('canvas')),
    i && (s.width = i),
    e && (s.height = e),
    s.getContext('2d', n)
  );
}
function qr(i) {
  const e = i.canvas;
  (e.width = 1), (e.height = 1), i.clearRect(0, 0, 1, 1);
}
function by(i) {
  let e = i.offsetWidth;
  const t = getComputedStyle(i);
  return (e += parseInt(t.marginLeft, 10) + parseInt(t.marginRight, 10)), e;
}
function Iy(i) {
  let e = i.offsetHeight;
  const t = getComputedStyle(i);
  return (e += parseInt(t.marginTop, 10) + parseInt(t.marginBottom, 10)), e;
}
function Qc(i, e) {
  const t = e.parentNode;
  t && t.replaceChild(i, e);
}
function vr(i) {
  return i && i.parentNode ? i.parentNode.removeChild(i) : null;
}
function _d(i) {
  for (; i.lastChild; ) i.removeChild(i.lastChild);
}
function Ly(i, e) {
  const t = i.childNodes;
  for (let n = 0; ; ++n) {
    const s = t[n],
      r = e[n];
    if (!s && !r) break;
    if (s !== r) {
      if (!s) {
        i.appendChild(r);
        continue;
      }
      if (!r) {
        i.removeChild(s), --n;
        continue;
      }
      i.insertBefore(r, s);
    }
  }
}
const Us = 'ol-hidden',
  Py = 'ol-selectable',
  Jr = 'ol-unselectable',
  ya = 'ol-control',
  eh = 'ol-collapsed',
  My = new RegExp(
    [
      '^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)',
      '(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)',
      '(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)',
      '(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?',
      '(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))',
      '(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))',
      `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`,
    ].join(''),
    'i',
  ),
  th = ['style', 'variant', 'weight', 'size', 'lineHeight', 'family'],
  pd = function (i) {
    const e = i.match(My);
    if (!e) return null;
    const t = { lineHeight: 'normal', size: '1.2em', style: 'normal', weight: 'normal', variant: 'normal' };
    for (let n = 0, s = th.length; n < s; ++n) {
      const r = e[n + 1];
      r !== void 0 && (t[th[n]] = r);
    }
    return (t.families = t.family.split(/,\s?/)), t;
  },
  yd = '10px sans-serif',
  ti = '#000',
  Er = 'round',
  ps = [],
  ys = 0,
  On = 'round',
  xs = 10,
  vs = '#000',
  Es = 'center',
  Cr = 'middle',
  Bi = [0, 0, 0, 0],
  Cs = 1,
  Ut = new Ze();
let dn = null,
  hl;
const ul = {},
  Ay = (function () {
    const e = '32px ',
      t = ['monospace', 'serif'],
      n = t.length,
      s = 'wmytzilWMYTZIL@#/&?$%10';
    let r, o;
    function l(c, h, u) {
      let d = !0;
      for (let f = 0; f < n; ++f) {
        const g = t[f];
        if (((o = wr(c + ' ' + h + ' ' + e + g, s)), u != g)) {
          const m = wr(c + ' ' + h + ' ' + e + u + ',' + g, s);
          d = d && m != o;
        }
      }
      return !!d;
    }
    function a() {
      let c = !0;
      const h = Ut.getKeys();
      for (let u = 0, d = h.length; u < d; ++u) {
        const f = h[u];
        Ut.get(f) < 100 &&
          (l.apply(
            this,
            f.split(`
`),
          )
            ? (Gn(ul), (dn = null), (hl = void 0), Ut.set(f, 100))
            : (Ut.set(f, Ut.get(f) + 1, !0), (c = !1)));
      }
      c && (clearInterval(r), (r = void 0));
    }
    return function (c) {
      const h = pd(c);
      if (!h) return;
      const u = h.families;
      for (let d = 0, f = u.length; d < f; ++d) {
        const g = u[d],
          m =
            h.style +
            `
` +
            h.weight +
            `
` +
            g;
        Ut.get(m) === void 0 &&
          (Ut.set(m, 100, !0), l(h.style, h.weight, g) || (Ut.set(m, 0, !0), r === void 0 && (r = setInterval(a, 32))));
      }
    };
  })(),
  Oy = (function () {
    let i;
    return function (e) {
      let t = ul[e];
      if (t == null) {
        if (ql) {
          const n = pd(e),
            s = xd(e, 'Žg');
          t = (isNaN(Number(n.lineHeight)) ? 1.2 : Number(n.lineHeight)) * (s.actualBoundingBoxAscent + s.actualBoundingBoxDescent);
        } else
          i ||
            ((i = document.createElement('div')),
            (i.innerHTML = 'M'),
            (i.style.minHeight = '0'),
            (i.style.maxHeight = 'none'),
            (i.style.height = 'auto'),
            (i.style.padding = '0'),
            (i.style.border = 'none'),
            (i.style.position = 'absolute'),
            (i.style.display = 'block'),
            (i.style.left = '-99999px')),
            (i.style.font = e),
            document.body.appendChild(i),
            (t = i.offsetHeight),
            document.body.removeChild(i);
        ul[e] = t;
      }
      return t;
    };
  })();
function xd(i, e) {
  return dn || (dn = qe(1, 1)), i != hl && ((dn.font = i), (hl = dn.font)), dn.measureText(e);
}
function wr(i, e) {
  return xd(i, e).width;
}
function ih(i, e, t) {
  if (e in t) return t[e];
  const n = e
    .split(
      `
`,
    )
    .reduce((s, r) => Math.max(s, wr(i, r)), 0);
  return (t[e] = n), n;
}
function Fy(i, e) {
  const t = [],
    n = [],
    s = [];
  let r = 0,
    o = 0,
    l = 0,
    a = 0;
  for (let c = 0, h = e.length; c <= h; c += 2) {
    const u = e[c];
    if (
      u ===
        `
` ||
      c === h
    ) {
      (r = Math.max(r, o)), s.push(o), (o = 0), (l += a);
      continue;
    }
    const d = e[c + 1] || i.font,
      f = wr(d, u);
    t.push(f), (o += f);
    const g = Oy(d);
    n.push(g), (a = Math.max(a, g));
  }
  return { width: r, height: l, widths: t, heights: n, lineWidths: s };
}
function Dy(i, e, t, n, s, r, o, l, a, c, h) {
  i.save(),
    t !== 1 && (i.globalAlpha *= t),
    e && i.setTransform.apply(i, e),
    n.contextInstructions
      ? (i.translate(a, c), i.scale(h[0], h[1]), ky(n, i))
      : h[0] < 0 || h[1] < 0
      ? (i.translate(a, c), i.scale(h[0], h[1]), i.drawImage(n, s, r, o, l, 0, 0, o, l))
      : i.drawImage(n, s, r, o, l, a, c, o * h[0], l * h[1]),
    i.restore();
}
function ky(i, e) {
  const t = i.contextInstructions;
  for (let n = 0, s = t.length; n < s; n += 2) Array.isArray(t[n + 1]) ? e[t[n]].apply(e, t[n + 1]) : (e[t[n]] = t[n + 1]);
}
class xa extends gd {
  constructor(e) {
    const t = e.rotateWithView !== void 0 ? e.rotateWithView : !1;
    super({
      opacity: 1,
      rotateWithView: t,
      rotation: e.rotation !== void 0 ? e.rotation : 0,
      scale: e.scale !== void 0 ? e.scale : 1,
      displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
      declutterMode: e.declutterMode,
    }),
      (this.canvas_ = void 0),
      (this.hitDetectionCanvas_ = null),
      (this.fill_ = e.fill !== void 0 ? e.fill : null),
      (this.origin_ = [0, 0]),
      (this.points_ = e.points),
      (this.radius_ = e.radius !== void 0 ? e.radius : e.radius1),
      (this.radius2_ = e.radius2),
      (this.angle_ = e.angle !== void 0 ? e.angle : 0),
      (this.stroke_ = e.stroke !== void 0 ? e.stroke : null),
      (this.size_ = null),
      (this.renderOptions_ = null),
      this.render();
  }
  clone() {
    const e = this.getScale(),
      t = new xa({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        points: this.getPoints(),
        radius: this.getRadius(),
        radius2: this.getRadius2(),
        angle: this.getAngle(),
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        scale: Array.isArray(e) ? e.slice() : e,
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
      });
    return t.setOpacity(this.getOpacity()), t;
  }
  getAnchor() {
    const e = this.size_;
    if (!e) return null;
    const t = this.getDisplacement(),
      n = this.getScaleArray();
    return [e[0] / 2 - t[0] / n[0], e[1] / 2 + t[1] / n[1]];
  }
  getAngle() {
    return this.angle_;
  }
  getFill() {
    return this.fill_;
  }
  setFill(e) {
    (this.fill_ = e), this.render();
  }
  getHitDetectionImage() {
    return this.hitDetectionCanvas_ || this.createHitDetectionCanvas_(this.renderOptions_), this.hitDetectionCanvas_;
  }
  getImage(e) {
    let t = this.canvas_[e];
    if (!t) {
      const n = this.renderOptions_,
        s = qe(n.size * e, n.size * e);
      this.draw_(n, s, e), (t = s.canvas), (this.canvas_[e] = t);
    }
    return t;
  }
  getPixelRatio(e) {
    return e;
  }
  getImageSize() {
    return this.size_;
  }
  getImageState() {
    return De.LOADED;
  }
  getOrigin() {
    return this.origin_;
  }
  getPoints() {
    return this.points_;
  }
  getRadius() {
    return this.radius_;
  }
  getRadius2() {
    return this.radius2_;
  }
  getSize() {
    return this.size_;
  }
  getStroke() {
    return this.stroke_;
  }
  setStroke(e) {
    (this.stroke_ = e), this.render();
  }
  listenImageChange(e) {}
  load() {}
  unlistenImageChange(e) {}
  calculateLineJoinSize_(e, t, n) {
    if (t === 0 || this.points_ === 1 / 0 || (e !== 'bevel' && e !== 'miter')) return t;
    let s = this.radius_,
      r = this.radius2_ === void 0 ? s : this.radius2_;
    if (s < r) {
      const P = s;
      (s = r), (r = P);
    }
    const o = this.radius2_ === void 0 ? this.points_ : this.points_ * 2,
      l = (2 * Math.PI) / o,
      a = r * Math.sin(l),
      c = Math.sqrt(r * r - a * a),
      h = s - c,
      u = Math.sqrt(a * a + h * h),
      d = u / a;
    if (e === 'miter' && d <= n) return d * t;
    const f = t / 2 / d,
      g = (t / 2) * (h / u),
      _ = Math.sqrt((s + f) * (s + f) + g * g) - s;
    if (this.radius2_ === void 0 || e === 'bevel') return _ * 2;
    const p = s * Math.sin(l),
      v = Math.sqrt(s * s - p * p),
      x = r - v,
      w = Math.sqrt(p * p + x * x) / p;
    if (w <= n) {
      const P = (w * t) / 2 - r - s;
      return 2 * Math.max(_, P);
    }
    return _ * 2;
  }
  createRenderOptions() {
    let e = On,
      t = 0,
      n = null,
      s = 0,
      r,
      o = 0;
    this.stroke_ &&
      ((r = this.stroke_.getColor()),
      r === null && (r = vs),
      (r = Ft(r)),
      (o = this.stroke_.getWidth()),
      o === void 0 && (o = Cs),
      (n = this.stroke_.getLineDash()),
      (s = this.stroke_.getLineDashOffset()),
      (e = this.stroke_.getLineJoin()),
      e === void 0 && (e = On),
      (t = this.stroke_.getMiterLimit()),
      t === void 0 && (t = xs));
    const l = this.calculateLineJoinSize_(e, o, t),
      a = Math.max(this.radius_, this.radius2_ || 0),
      c = Math.ceil(2 * a + l);
    return { strokeStyle: r, strokeWidth: o, size: c, lineDash: n, lineDashOffset: s, lineJoin: e, miterLimit: t };
  }
  render() {
    this.renderOptions_ = this.createRenderOptions();
    const e = this.renderOptions_.size;
    (this.canvas_ = {}), (this.size_ = [e, e]);
  }
  draw_(e, t, n) {
    if ((t.scale(n, n), t.translate(e.size / 2, e.size / 2), this.createPath_(t), this.fill_)) {
      let s = this.fill_.getColor();
      s === null && (s = ti), (t.fillStyle = Ft(s)), t.fill();
    }
    this.stroke_ &&
      ((t.strokeStyle = e.strokeStyle),
      (t.lineWidth = e.strokeWidth),
      e.lineDash && (t.setLineDash(e.lineDash), (t.lineDashOffset = e.lineDashOffset)),
      (t.lineJoin = e.lineJoin),
      (t.miterLimit = e.miterLimit),
      t.stroke());
  }
  createHitDetectionCanvas_(e) {
    if (this.fill_) {
      let t = this.fill_.getColor(),
        n = 0;
      if ((typeof t == 'string' && (t = xr(t)), t === null ? (n = 1) : Array.isArray(t) && (n = t.length === 4 ? t[3] : 1), n === 0)) {
        const s = qe(e.size, e.size);
        (this.hitDetectionCanvas_ = s.canvas), this.drawHitDetectionCanvas_(e, s);
      }
    }
    this.hitDetectionCanvas_ || (this.hitDetectionCanvas_ = this.getImage(1));
  }
  createPath_(e) {
    let t = this.points_;
    const n = this.radius_;
    if (t === 1 / 0) e.arc(0, 0, n, 0, 2 * Math.PI);
    else {
      const s = this.radius2_ === void 0 ? n : this.radius2_;
      this.radius2_ !== void 0 && (t *= 2);
      const r = this.angle_ - Math.PI / 2,
        o = (2 * Math.PI) / t;
      for (let l = 0; l < t; l++) {
        const a = r + l * o,
          c = l % 2 === 0 ? n : s;
        e.lineTo(c * Math.cos(a), c * Math.sin(a));
      }
      e.closePath();
    }
  }
  drawHitDetectionCanvas_(e, t) {
    t.translate(e.size / 2, e.size / 2),
      this.createPath_(t),
      (t.fillStyle = ti),
      t.fill(),
      this.stroke_ &&
        ((t.strokeStyle = e.strokeStyle),
        (t.lineWidth = e.strokeWidth),
        e.lineDash && (t.setLineDash(e.lineDash), (t.lineDashOffset = e.lineDashOffset)),
        (t.lineJoin = e.lineJoin),
        (t.miterLimit = e.miterLimit),
        t.stroke());
  }
}
const va = xa;
class Ea extends va {
  constructor(e) {
    (e = e || { radius: 5 }),
      super({
        points: 1 / 0,
        fill: e.fill,
        radius: e.radius,
        stroke: e.stroke,
        scale: e.scale !== void 0 ? e.scale : 1,
        rotation: e.rotation !== void 0 ? e.rotation : 0,
        rotateWithView: e.rotateWithView !== void 0 ? e.rotateWithView : !1,
        displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
        declutterMode: e.declutterMode,
      });
  }
  clone() {
    const e = this.getScale(),
      t = new Ea({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        radius: this.getRadius(),
        scale: Array.isArray(e) ? e.slice() : e,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
      });
    return t.setOpacity(this.getOpacity()), t;
  }
  setRadius(e) {
    (this.radius_ = e), this.render();
  }
}
const Fn = Ea;
class gi {
  constructor(e) {
    (e = e || {}),
      (this.geometry_ = null),
      (this.geometryFunction_ = nh),
      e.geometry !== void 0 && this.setGeometry(e.geometry),
      (this.fill_ = e.fill !== void 0 ? e.fill : null),
      (this.image_ = e.image !== void 0 ? e.image : null),
      (this.renderer_ = e.renderer !== void 0 ? e.renderer : null),
      (this.hitDetectionRenderer_ = e.hitDetectionRenderer !== void 0 ? e.hitDetectionRenderer : null),
      (this.stroke_ = e.stroke !== void 0 ? e.stroke : null),
      (this.text_ = e.text !== void 0 ? e.text : null),
      (this.zIndex_ = e.zIndex);
  }
  clone() {
    let e = this.getGeometry();
    return (
      e && typeof e == 'object' && (e = e.clone()),
      new gi({
        geometry: e,
        fill: this.getFill() ? this.getFill().clone() : void 0,
        image: this.getImage() ? this.getImage().clone() : void 0,
        renderer: this.getRenderer(),
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        text: this.getText() ? this.getText().clone() : void 0,
        zIndex: this.getZIndex(),
      })
    );
  }
  getRenderer() {
    return this.renderer_;
  }
  setRenderer(e) {
    this.renderer_ = e;
  }
  setHitDetectionRenderer(e) {
    this.hitDetectionRenderer_ = e;
  }
  getHitDetectionRenderer() {
    return this.hitDetectionRenderer_;
  }
  getGeometry() {
    return this.geometry_;
  }
  getGeometryFunction() {
    return this.geometryFunction_;
  }
  getFill() {
    return this.fill_;
  }
  setFill(e) {
    this.fill_ = e;
  }
  getImage() {
    return this.image_;
  }
  setImage(e) {
    this.image_ = e;
  }
  getStroke() {
    return this.stroke_;
  }
  setStroke(e) {
    this.stroke_ = e;
  }
  getText() {
    return this.text_;
  }
  setText(e) {
    this.text_ = e;
  }
  getZIndex() {
    return this.zIndex_;
  }
  setGeometry(e) {
    typeof e == 'function'
      ? (this.geometryFunction_ = e)
      : typeof e == 'string'
      ? (this.geometryFunction_ = function (t) {
          return t.get(e);
        })
      : e
      ? e !== void 0 &&
        (this.geometryFunction_ = function () {
          return e;
        })
      : (this.geometryFunction_ = nh),
      (this.geometry_ = e);
  }
  setZIndex(e) {
    this.zIndex_ = e;
  }
}
function Ny(i) {
  let e;
  if (typeof i == 'function') e = i;
  else {
    let t;
    Array.isArray(i) ? (t = i) : (he(typeof i.getZIndex == 'function', 41), (t = [i])),
      (e = function () {
        return t;
      });
  }
  return e;
}
let _o = null;
function Gy(i, e) {
  if (!_o) {
    const t = new bt({ color: 'rgba(255,255,255,0.4)' }),
      n = new Tt({ color: '#3399CC', width: 1.25 });
    _o = [new gi({ image: new Fn({ fill: t, stroke: n, radius: 5 }), fill: t, stroke: n })];
  }
  return _o;
}
function Wy() {
  const i = {},
    e = [255, 255, 255, 1],
    t = [0, 153, 255, 1],
    n = 3;
  return (
    (i.Polygon = [new gi({ fill: new bt({ color: [255, 255, 255, 0.5] }) })]),
    (i.MultiPolygon = i.Polygon),
    (i.LineString = [new gi({ stroke: new Tt({ color: e, width: n + 2 }) }), new gi({ stroke: new Tt({ color: t, width: n }) })]),
    (i.MultiLineString = i.LineString),
    (i.Circle = i.Polygon.concat(i.LineString)),
    (i.Point = [
      new gi({ image: new Fn({ radius: n * 2, fill: new bt({ color: t }), stroke: new Tt({ color: e, width: n / 2 }) }), zIndex: 1 / 0 }),
    ]),
    (i.MultiPoint = i.Point),
    (i.GeometryCollection = i.Polygon.concat(i.LineString, i.Point)),
    i
  );
}
function nh(i) {
  return i.getGeometry();
}
const qt = gi,
  zy = '#333';
class Ca {
  constructor(e) {
    (e = e || {}),
      (this.font_ = e.font),
      (this.rotation_ = e.rotation),
      (this.rotateWithView_ = e.rotateWithView),
      (this.scale_ = e.scale),
      (this.scaleArray_ = rt(e.scale !== void 0 ? e.scale : 1)),
      (this.text_ = e.text),
      (this.textAlign_ = e.textAlign),
      (this.justify_ = e.justify),
      (this.repeat_ = e.repeat),
      (this.textBaseline_ = e.textBaseline),
      (this.fill_ = e.fill !== void 0 ? e.fill : new bt({ color: zy })),
      (this.maxAngle_ = e.maxAngle !== void 0 ? e.maxAngle : Math.PI / 4),
      (this.placement_ = e.placement !== void 0 ? e.placement : 'point'),
      (this.overflow_ = !!e.overflow),
      (this.stroke_ = e.stroke !== void 0 ? e.stroke : null),
      (this.offsetX_ = e.offsetX !== void 0 ? e.offsetX : 0),
      (this.offsetY_ = e.offsetY !== void 0 ? e.offsetY : 0),
      (this.backgroundFill_ = e.backgroundFill ? e.backgroundFill : null),
      (this.backgroundStroke_ = e.backgroundStroke ? e.backgroundStroke : null),
      (this.padding_ = e.padding === void 0 ? null : e.padding);
  }
  clone() {
    const e = this.getScale();
    return new Ca({
      font: this.getFont(),
      placement: this.getPlacement(),
      repeat: this.getRepeat(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(e) ? e.slice() : e,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      justify: this.getJustify(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
      padding: this.getPadding() || void 0,
    });
  }
  getOverflow() {
    return this.overflow_;
  }
  getFont() {
    return this.font_;
  }
  getMaxAngle() {
    return this.maxAngle_;
  }
  getPlacement() {
    return this.placement_;
  }
  getRepeat() {
    return this.repeat_;
  }
  getOffsetX() {
    return this.offsetX_;
  }
  getOffsetY() {
    return this.offsetY_;
  }
  getFill() {
    return this.fill_;
  }
  getRotateWithView() {
    return this.rotateWithView_;
  }
  getRotation() {
    return this.rotation_;
  }
  getScale() {
    return this.scale_;
  }
  getScaleArray() {
    return this.scaleArray_;
  }
  getStroke() {
    return this.stroke_;
  }
  getText() {
    return this.text_;
  }
  getTextAlign() {
    return this.textAlign_;
  }
  getJustify() {
    return this.justify_;
  }
  getTextBaseline() {
    return this.textBaseline_;
  }
  getBackgroundFill() {
    return this.backgroundFill_;
  }
  getBackgroundStroke() {
    return this.backgroundStroke_;
  }
  getPadding() {
    return this.padding_;
  }
  setOverflow(e) {
    this.overflow_ = e;
  }
  setFont(e) {
    this.font_ = e;
  }
  setMaxAngle(e) {
    this.maxAngle_ = e;
  }
  setOffsetX(e) {
    this.offsetX_ = e;
  }
  setOffsetY(e) {
    this.offsetY_ = e;
  }
  setPlacement(e) {
    this.placement_ = e;
  }
  setRepeat(e) {
    this.repeat_ = e;
  }
  setRotateWithView(e) {
    this.rotateWithView_ = e;
  }
  setFill(e) {
    this.fill_ = e;
  }
  setRotation(e) {
    this.rotation_ = e;
  }
  setScale(e) {
    (this.scale_ = e), (this.scaleArray_ = rt(e !== void 0 ? e : 1));
  }
  setStroke(e) {
    this.stroke_ = e;
  }
  setText(e) {
    this.text_ = e;
  }
  setTextAlign(e) {
    this.textAlign_ = e;
  }
  setJustify(e) {
    this.justify_ = e;
  }
  setTextBaseline(e) {
    this.textBaseline_ = e;
  }
  setBackgroundFill(e) {
    this.backgroundFill_ = e;
  }
  setBackgroundStroke(e) {
    this.backgroundStroke_ = e;
  }
  setPadding(e) {
    this.padding_ = e;
  }
}
const rs = Ca,
  Ce = {
    OPACITY: 'opacity',
    VISIBLE: 'visible',
    EXTENT: 'extent',
    Z_INDEX: 'zIndex',
    MAX_RESOLUTION: 'maxResolution',
    MIN_RESOLUTION: 'minResolution',
    MAX_ZOOM: 'maxZoom',
    MIN_ZOOM: 'minZoom',
    SOURCE: 'source',
    MAP: 'map',
  };
class By extends Ze {
  constructor(e) {
    super(), this.on, this.once, this.un, (this.background_ = e.background);
    const t = Object.assign({}, e);
    typeof e.properties == 'object' && (delete t.properties, Object.assign(t, e.properties)),
      (t[Ce.OPACITY] = e.opacity !== void 0 ? e.opacity : 1),
      he(typeof t[Ce.OPACITY] == 'number', 64),
      (t[Ce.VISIBLE] = e.visible !== void 0 ? e.visible : !0),
      (t[Ce.Z_INDEX] = e.zIndex),
      (t[Ce.MAX_RESOLUTION] = e.maxResolution !== void 0 ? e.maxResolution : 1 / 0),
      (t[Ce.MIN_RESOLUTION] = e.minResolution !== void 0 ? e.minResolution : 0),
      (t[Ce.MIN_ZOOM] = e.minZoom !== void 0 ? e.minZoom : -1 / 0),
      (t[Ce.MAX_ZOOM] = e.maxZoom !== void 0 ? e.maxZoom : 1 / 0),
      (this.className_ = t.className !== void 0 ? t.className : 'ol-layer'),
      delete t.className,
      this.setProperties(t),
      (this.state_ = null);
  }
  getBackground() {
    return this.background_;
  }
  getClassName() {
    return this.className_;
  }
  getLayerState(e) {
    const t = this.state_ || { layer: this, managed: e === void 0 ? !0 : e },
      n = this.getZIndex();
    return (
      (t.opacity = Fe(Math.round(this.getOpacity() * 100) / 100, 0, 1)),
      (t.visible = this.getVisible()),
      (t.extent = this.getExtent()),
      (t.zIndex = n === void 0 && !t.managed ? 1 / 0 : n),
      (t.maxResolution = this.getMaxResolution()),
      (t.minResolution = Math.max(this.getMinResolution(), 0)),
      (t.minZoom = this.getMinZoom()),
      (t.maxZoom = this.getMaxZoom()),
      (this.state_ = t),
      t
    );
  }
  getLayersArray(e) {
    return ie();
  }
  getLayerStatesArray(e) {
    return ie();
  }
  getExtent() {
    return this.get(Ce.EXTENT);
  }
  getMaxResolution() {
    return this.get(Ce.MAX_RESOLUTION);
  }
  getMinResolution() {
    return this.get(Ce.MIN_RESOLUTION);
  }
  getMinZoom() {
    return this.get(Ce.MIN_ZOOM);
  }
  getMaxZoom() {
    return this.get(Ce.MAX_ZOOM);
  }
  getOpacity() {
    return this.get(Ce.OPACITY);
  }
  getSourceState() {
    return ie();
  }
  getVisible() {
    return this.get(Ce.VISIBLE);
  }
  getZIndex() {
    return this.get(Ce.Z_INDEX);
  }
  setBackground(e) {
    (this.background_ = e), this.changed();
  }
  setExtent(e) {
    this.set(Ce.EXTENT, e);
  }
  setMaxResolution(e) {
    this.set(Ce.MAX_RESOLUTION, e);
  }
  setMinResolution(e) {
    this.set(Ce.MIN_RESOLUTION, e);
  }
  setMaxZoom(e) {
    this.set(Ce.MAX_ZOOM, e);
  }
  setMinZoom(e) {
    this.set(Ce.MIN_ZOOM, e);
  }
  setOpacity(e) {
    he(typeof e == 'number', 64), this.set(Ce.OPACITY, e);
  }
  setVisible(e) {
    this.set(Ce.VISIBLE, e);
  }
  setZIndex(e) {
    this.set(Ce.Z_INDEX, e);
  }
  disposeInternal() {
    this.state_ && ((this.state_.layer = null), (this.state_ = null)), super.disposeInternal();
  }
}
const wa = By,
  Ye = { ANIMATING: 0, INTERACTING: 1 },
  mt = { CENTER: 'center', RESOLUTION: 'resolution', ROTATION: 'rotation' },
  Xy = 42,
  Sa = 256;
function sh(i, e, t) {
  return function (n, s, r, o, l) {
    if (!n) return;
    if (!s && !e) return n;
    const a = e ? 0 : r[0] * s,
      c = e ? 0 : r[1] * s,
      h = l ? l[0] : 0,
      u = l ? l[1] : 0;
    let d = i[0] + a / 2 + h,
      f = i[2] - a / 2 + h,
      g = i[1] + c / 2 + u,
      m = i[3] - c / 2 + u;
    d > f && ((d = (f + d) / 2), (f = d)), g > m && ((g = (m + g) / 2), (m = g));
    let _ = Fe(n[0], d, f),
      p = Fe(n[1], g, m);
    if (o && t && s) {
      const v = 30 * s;
      (_ += -v * Math.log(1 + Math.max(0, d - n[0]) / v) + v * Math.log(1 + Math.max(0, n[0] - f) / v)),
        (p += -v * Math.log(1 + Math.max(0, g - n[1]) / v) + v * Math.log(1 + Math.max(0, n[1] - m) / v));
    }
    return [_, p];
  };
}
function jy(i) {
  return i;
}
function Ta(i, e, t, n) {
  const s = Re(e) / t[0],
    r = Nt(e) / t[1];
  return n ? Math.min(i, Math.max(s, r)) : Math.min(i, Math.min(s, r));
}
function Ra(i, e, t) {
  let n = Math.min(i, e);
  const s = 50;
  return (
    (n *= Math.log(1 + s * Math.max(0, i / e - 1)) / s + 1),
    t && ((n = Math.max(n, t)), (n /= Math.log(1 + s * Math.max(0, t / i - 1)) / s + 1)),
    Fe(n, t / 2, e * 2)
  );
}
function Yy(i, e, t, n) {
  return (
    (e = e !== void 0 ? e : !0),
    function (s, r, o, l) {
      if (s !== void 0) {
        const a = i[0],
          c = i[i.length - 1],
          h = t ? Ta(a, t, o, n) : a;
        if (l) return e ? Ra(s, h, c) : Fe(s, c, h);
        const u = Math.min(h, s),
          d = Math.floor(Zl(i, u, r));
        return i[d] > h && d < i.length - 1 ? i[d + 1] : i[d];
      }
    }
  );
}
function Uy(i, e, t, n, s, r) {
  return (
    (n = n !== void 0 ? n : !0),
    (t = t !== void 0 ? t : 0),
    function (o, l, a, c) {
      if (o !== void 0) {
        const h = s ? Ta(e, s, a, r) : e;
        if (c) return n ? Ra(o, h, t) : Fe(o, t, h);
        const u = 1e-9,
          d = Math.ceil(Math.log(e / h) / Math.log(i) - u),
          f = -l * (0.5 - u) + 0.5,
          g = Math.min(h, o),
          m = Math.floor(Math.log(e / g) / Math.log(i) + f),
          _ = Math.max(d, m),
          p = e / Math.pow(i, _);
        return Fe(p, t, h);
      }
    }
  );
}
function rh(i, e, t, n, s) {
  return (
    (t = t !== void 0 ? t : !0),
    function (r, o, l, a) {
      if (r !== void 0) {
        const c = n ? Ta(i, n, l, s) : i;
        return !t || !a ? Fe(r, e, c) : Ra(r, c, e);
      }
    }
  );
}
function ba(i) {
  if (i !== void 0) return 0;
}
function oh(i) {
  if (i !== void 0) return i;
}
function Vy(i) {
  const e = (2 * Math.PI) / i;
  return function (t, n) {
    if (n) return t;
    if (t !== void 0) return (t = Math.floor(t / e + 0.5) * e), t;
  };
}
function Hy(i) {
  return (
    (i = i || or(5)),
    function (e, t) {
      if (t) return e;
      if (e !== void 0) return Math.abs(e) <= i ? 0 : e;
    }
  );
}
function vd(i) {
  return Math.pow(i, 3);
}
function Qi(i) {
  return 1 - vd(1 - i);
}
function dl(i) {
  return 3 * i * i - 2 * i * i * i;
}
function Ed(i) {
  return i;
}
function Ky(i) {
  return i < 0.5 ? dl(2 * i) : 1 - dl(2 * (i - 0.5));
}
const po = 0;
class Zy extends Ze {
  constructor(e) {
    super(),
      this.on,
      this.once,
      this.un,
      (e = Object.assign({}, e)),
      (this.hints_ = [0, 0]),
      (this.animations_ = []),
      this.updateAnimationKey_,
      (this.projection_ = oa(e.projection, 'EPSG:3857')),
      (this.viewportSize_ = [100, 100]),
      (this.targetCenter_ = null),
      this.targetResolution_,
      this.targetRotation_,
      (this.nextCenter_ = null),
      this.nextResolution_,
      this.nextRotation_,
      (this.cancelAnchor_ = void 0),
      e.projection && Kp(),
      e.center && (e.center = Yt(e.center, this.projection_)),
      e.extent && (e.extent = Wi(e.extent, this.projection_)),
      this.applyOptions_(e);
  }
  applyOptions_(e) {
    const t = Object.assign({}, e);
    for (const l in mt) delete t[l];
    this.setProperties(t, !0);
    const n = qy(e);
    (this.maxResolution_ = n.maxResolution),
      (this.minResolution_ = n.minResolution),
      (this.zoomFactor_ = n.zoomFactor),
      (this.resolutions_ = e.resolutions),
      (this.padding_ = e.padding),
      (this.minZoom_ = n.minZoom);
    const s = $y(e),
      r = n.constraint,
      o = Jy(e);
    (this.constraints_ = { center: s, resolution: r, rotation: o }),
      this.setRotation(e.rotation !== void 0 ? e.rotation : 0),
      this.setCenterInternal(e.center !== void 0 ? e.center : null),
      e.resolution !== void 0 ? this.setResolution(e.resolution) : e.zoom !== void 0 && this.setZoom(e.zoom);
  }
  get padding() {
    return this.padding_;
  }
  set padding(e) {
    let t = this.padding_;
    this.padding_ = e;
    const n = this.getCenterInternal();
    if (n) {
      const s = e || [0, 0, 0, 0];
      t = t || [0, 0, 0, 0];
      const r = this.getResolution(),
        o = (r / 2) * (s[3] - t[3] + t[1] - s[1]),
        l = (r / 2) * (s[0] - t[0] + t[2] - s[2]);
      this.setCenterInternal([n[0] + o, n[1] - l]);
    }
  }
  getUpdatedOptions_(e) {
    const t = this.getProperties();
    return (
      t.resolution !== void 0 ? (t.resolution = this.getResolution()) : (t.zoom = this.getZoom()),
      (t.center = this.getCenterInternal()),
      (t.rotation = this.getRotation()),
      Object.assign({}, t, e)
    );
  }
  animate(e) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
    const t = new Array(arguments.length);
    for (let n = 0; n < t.length; ++n) {
      let s = arguments[n];
      s.center && ((s = Object.assign({}, s)), (s.center = Yt(s.center, this.getProjection()))),
        s.anchor && ((s = Object.assign({}, s)), (s.anchor = Yt(s.anchor, this.getProjection()))),
        (t[n] = s);
    }
    this.animateInternal.apply(this, t);
  }
  animateInternal(e) {
    let t = arguments.length,
      n;
    t > 1 && typeof arguments[t - 1] == 'function' && ((n = arguments[t - 1]), --t);
    let s = 0;
    for (; s < t && !this.isDef(); ++s) {
      const h = arguments[s];
      h.center && this.setCenterInternal(h.center),
        h.zoom !== void 0 ? this.setZoom(h.zoom) : h.resolution && this.setResolution(h.resolution),
        h.rotation !== void 0 && this.setRotation(h.rotation);
    }
    if (s === t) {
      n && Vs(n, !0);
      return;
    }
    let r = Date.now(),
      o = this.targetCenter_.slice(),
      l = this.targetResolution_,
      a = this.targetRotation_;
    const c = [];
    for (; s < t; ++s) {
      const h = arguments[s],
        u = {
          start: r,
          complete: !1,
          anchor: h.anchor,
          duration: h.duration !== void 0 ? h.duration : 1e3,
          easing: h.easing || dl,
          callback: n,
        };
      if (
        (h.center && ((u.sourceCenter = o), (u.targetCenter = h.center.slice()), (o = u.targetCenter)),
        h.zoom !== void 0
          ? ((u.sourceResolution = l), (u.targetResolution = this.getResolutionForZoom(h.zoom)), (l = u.targetResolution))
          : h.resolution && ((u.sourceResolution = l), (u.targetResolution = h.resolution), (l = u.targetResolution)),
        h.rotation !== void 0)
      ) {
        u.sourceRotation = a;
        const d = wn(h.rotation - a + Math.PI, 2 * Math.PI) - Math.PI;
        (u.targetRotation = a + d), (a = u.targetRotation);
      }
      Qy(u) ? (u.complete = !0) : (r += u.duration), c.push(u);
    }
    this.animations_.push(c), this.setHint(Ye.ANIMATING, 1), this.updateAnimations_();
  }
  getAnimating() {
    return this.hints_[Ye.ANIMATING] > 0;
  }
  getInteracting() {
    return this.hints_[Ye.INTERACTING] > 0;
  }
  cancelAnimations() {
    this.setHint(Ye.ANIMATING, -this.hints_[Ye.ANIMATING]);
    let e;
    for (let t = 0, n = this.animations_.length; t < n; ++t) {
      const s = this.animations_[t];
      if ((s[0].callback && Vs(s[0].callback, !1), !e))
        for (let r = 0, o = s.length; r < o; ++r) {
          const l = s[r];
          if (!l.complete) {
            e = l.anchor;
            break;
          }
        }
    }
    (this.animations_.length = 0),
      (this.cancelAnchor_ = e),
      (this.nextCenter_ = null),
      (this.nextResolution_ = NaN),
      (this.nextRotation_ = NaN);
  }
  updateAnimations_() {
    if (
      (this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), (this.updateAnimationKey_ = void 0)),
      !this.getAnimating())
    )
      return;
    const e = Date.now();
    let t = !1;
    for (let n = this.animations_.length - 1; n >= 0; --n) {
      const s = this.animations_[n];
      let r = !0;
      for (let o = 0, l = s.length; o < l; ++o) {
        const a = s[o];
        if (a.complete) continue;
        const c = e - a.start;
        let h = a.duration > 0 ? c / a.duration : 1;
        h >= 1 ? ((a.complete = !0), (h = 1)) : (r = !1);
        const u = a.easing(h);
        if (a.sourceCenter) {
          const d = a.sourceCenter[0],
            f = a.sourceCenter[1],
            g = a.targetCenter[0],
            m = a.targetCenter[1];
          this.nextCenter_ = a.targetCenter;
          const _ = d + u * (g - d),
            p = f + u * (m - f);
          this.targetCenter_ = [_, p];
        }
        if (a.sourceResolution && a.targetResolution) {
          const d = u === 1 ? a.targetResolution : a.sourceResolution + u * (a.targetResolution - a.sourceResolution);
          if (a.anchor) {
            const f = this.getViewportSize_(this.getRotation()),
              g = this.constraints_.resolution(d, 0, f, !0);
            this.targetCenter_ = this.calculateCenterZoom(g, a.anchor);
          }
          (this.nextResolution_ = a.targetResolution), (this.targetResolution_ = d), this.applyTargetState_(!0);
        }
        if (a.sourceRotation !== void 0 && a.targetRotation !== void 0) {
          const d =
            u === 1 ? wn(a.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : a.sourceRotation + u * (a.targetRotation - a.sourceRotation);
          if (a.anchor) {
            const f = this.constraints_.rotation(d, !0);
            this.targetCenter_ = this.calculateCenterRotate(f, a.anchor);
          }
          (this.nextRotation_ = a.targetRotation), (this.targetRotation_ = d);
        }
        if ((this.applyTargetState_(!0), (t = !0), !a.complete)) break;
      }
      if (r) {
        (this.animations_[n] = null),
          this.setHint(Ye.ANIMATING, -1),
          (this.nextCenter_ = null),
          (this.nextResolution_ = NaN),
          (this.nextRotation_ = NaN);
        const o = s[0].callback;
        o && Vs(o, !0);
      }
    }
    (this.animations_ = this.animations_.filter(Boolean)),
      t && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this)));
  }
  calculateCenterRotate(e, t) {
    let n;
    const s = this.getCenterInternal();
    return s !== void 0 && ((n = [s[0] - t[0], s[1] - t[1]]), sa(n, e - this.getRotation()), jp(n, t)), n;
  }
  calculateCenterZoom(e, t) {
    let n;
    const s = this.getCenterInternal(),
      r = this.getResolution();
    if (s !== void 0 && r !== void 0) {
      const o = t[0] - (e * (t[0] - s[0])) / r,
        l = t[1] - (e * (t[1] - s[1])) / r;
      n = [o, l];
    }
    return n;
  }
  getViewportSize_(e) {
    const t = this.viewportSize_;
    if (e) {
      const n = t[0],
        s = t[1];
      return [Math.abs(n * Math.cos(e)) + Math.abs(s * Math.sin(e)), Math.abs(n * Math.sin(e)) + Math.abs(s * Math.cos(e))];
    }
    return t;
  }
  setViewportSize(e) {
    (this.viewportSize_ = Array.isArray(e) ? e.slice() : [100, 100]), this.getAnimating() || this.resolveConstraints(0);
  }
  getCenter() {
    const e = this.getCenterInternal();
    return e && rl(e, this.getProjection());
  }
  getCenterInternal() {
    return this.get(mt.CENTER);
  }
  getConstraints() {
    return this.constraints_;
  }
  getConstrainResolution() {
    return this.get('constrainResolution');
  }
  getHints(e) {
    return e !== void 0 ? ((e[0] = this.hints_[0]), (e[1] = this.hints_[1]), e) : this.hints_.slice();
  }
  calculateExtent(e) {
    const t = this.calculateExtentInternal(e);
    return ed(t, this.getProjection());
  }
  calculateExtentInternal(e) {
    e = e || this.getViewportSizeMinusPadding_();
    const t = this.getCenterInternal();
    he(t, 1);
    const n = this.getResolution();
    he(n !== void 0, 2);
    const s = this.getRotation();
    return he(s !== void 0, 3), tl(t, n, s, e);
  }
  getMaxResolution() {
    return this.maxResolution_;
  }
  getMinResolution() {
    return this.minResolution_;
  }
  getMaxZoom() {
    return this.getZoomForResolution(this.minResolution_);
  }
  setMaxZoom(e) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: e }));
  }
  getMinZoom() {
    return this.getZoomForResolution(this.maxResolution_);
  }
  setMinZoom(e) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: e }));
  }
  setConstrainResolution(e) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: e }));
  }
  getProjection() {
    return this.projection_;
  }
  getResolution() {
    return this.get(mt.RESOLUTION);
  }
  getResolutions() {
    return this.resolutions_;
  }
  getResolutionForExtent(e, t) {
    return this.getResolutionForExtentInternal(Wi(e, this.getProjection()), t);
  }
  getResolutionForExtentInternal(e, t) {
    t = t || this.getViewportSizeMinusPadding_();
    const n = Re(e) / t[0],
      s = Nt(e) / t[1];
    return Math.max(n, s);
  }
  getResolutionForValueFunction(e) {
    e = e || 2;
    const t = this.getConstrainedResolution(this.maxResolution_),
      n = this.minResolution_,
      s = Math.log(t / n) / Math.log(e);
    return function (r) {
      return t / Math.pow(e, r * s);
    };
  }
  getRotation() {
    return this.get(mt.ROTATION);
  }
  getValueForResolutionFunction(e) {
    const t = Math.log(e || 2),
      n = this.getConstrainedResolution(this.maxResolution_),
      s = this.minResolution_,
      r = Math.log(n / s) / t;
    return function (o) {
      return Math.log(n / o) / t / r;
    };
  }
  getViewportSizeMinusPadding_(e) {
    let t = this.getViewportSize_(e);
    const n = this.padding_;
    return n && (t = [t[0] - n[1] - n[3], t[1] - n[0] - n[2]]), t;
  }
  getState() {
    const e = this.getProjection(),
      t = this.getResolution(),
      n = this.getRotation();
    let s = this.getCenterInternal();
    const r = this.padding_;
    if (r) {
      const o = this.getViewportSizeMinusPadding_();
      s = yo(s, this.getViewportSize_(), [o[0] / 2 + r[3], o[1] / 2 + r[0]], t, n);
    }
    return {
      center: s.slice(0),
      projection: e !== void 0 ? e : null,
      resolution: t,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: n,
      zoom: this.getZoom(),
    };
  }
  getViewStateAndExtent() {
    return { viewState: this.getState(), extent: this.calculateExtent() };
  }
  getZoom() {
    let e;
    const t = this.getResolution();
    return t !== void 0 && (e = this.getZoomForResolution(t)), e;
  }
  getZoomForResolution(e) {
    let t = this.minZoom_ || 0,
      n,
      s;
    if (this.resolutions_) {
      const r = Zl(this.resolutions_, e, 1);
      (t = r), (n = this.resolutions_[r]), r == this.resolutions_.length - 1 ? (s = 2) : (s = n / this.resolutions_[r + 1]);
    } else (n = this.maxResolution_), (s = this.zoomFactor_);
    return t + Math.log(n / e) / Math.log(s);
  }
  getResolutionForZoom(e) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1) return 0;
      const t = Fe(Math.floor(e), 0, this.resolutions_.length - 2),
        n = this.resolutions_[t] / this.resolutions_[t + 1];
      return this.resolutions_[t] / Math.pow(n, Fe(e - t, 0, 1));
    }
    return this.maxResolution_ / Math.pow(this.zoomFactor_, e - this.minZoom_);
  }
  fit(e, t) {
    let n;
    if ((he(Array.isArray(e) || typeof e.getSimplifiedGeometry == 'function', 24), Array.isArray(e))) {
      he(!ia(e), 25);
      const s = Wi(e, this.getProjection());
      n = $c(s);
    } else if (e.getType() === 'Circle') {
      const s = Wi(e.getExtent(), this.getProjection());
      (n = $c(s)), n.rotate(this.getRotation(), Si(s));
    } else n = e;
    this.fitInternal(n, t);
  }
  rotatedExtentForGeometry(e) {
    const t = this.getRotation(),
      n = Math.cos(t),
      s = Math.sin(-t),
      r = e.getFlatCoordinates(),
      o = e.getStride();
    let l = 1 / 0,
      a = 1 / 0,
      c = -1 / 0,
      h = -1 / 0;
    for (let u = 0, d = r.length; u < d; u += o) {
      const f = r[u] * n - r[u + 1] * s,
        g = r[u] * s + r[u + 1] * n;
      (l = Math.min(l, f)), (a = Math.min(a, g)), (c = Math.max(c, f)), (h = Math.max(h, g));
    }
    return [l, a, c, h];
  }
  fitInternal(e, t) {
    t = t || {};
    let n = t.size;
    n || (n = this.getViewportSizeMinusPadding_());
    const s = t.padding !== void 0 ? t.padding : [0, 0, 0, 0],
      r = t.nearest !== void 0 ? t.nearest : !1;
    let o;
    t.minResolution !== void 0 ? (o = t.minResolution) : t.maxZoom !== void 0 ? (o = this.getResolutionForZoom(t.maxZoom)) : (o = 0);
    const l = this.rotatedExtentForGeometry(e);
    let a = this.getResolutionForExtentInternal(l, [n[0] - s[1] - s[3], n[1] - s[0] - s[2]]);
    (a = isNaN(a) ? o : Math.max(a, o)), (a = this.getConstrainedResolution(a, r ? 0 : 1));
    const c = this.getRotation(),
      h = Math.sin(c),
      u = Math.cos(c),
      d = Si(l);
    (d[0] += ((s[1] - s[3]) / 2) * a), (d[1] += ((s[0] - s[2]) / 2) * a);
    const f = d[0] * u - d[1] * h,
      g = d[1] * u + d[0] * h,
      m = this.getConstrainedCenter([f, g], a),
      _ = t.callback ? t.callback : Mn;
    t.duration !== void 0
      ? this.animateInternal({ resolution: a, center: m, duration: t.duration, easing: t.easing }, _)
      : ((this.targetResolution_ = a), (this.targetCenter_ = m), this.applyTargetState_(!1, !0), Vs(_, !0));
  }
  centerOn(e, t, n) {
    this.centerOnInternal(Yt(e, this.getProjection()), t, n);
  }
  centerOnInternal(e, t, n) {
    this.setCenterInternal(yo(e, t, n, this.getResolution(), this.getRotation()));
  }
  calculateCenterShift(e, t, n, s) {
    let r;
    const o = this.padding_;
    if (o && e) {
      const l = this.getViewportSizeMinusPadding_(-n),
        a = yo(e, s, [l[0] / 2 + o[3], l[1] / 2 + o[0]], t, n);
      r = [e[0] - a[0], e[1] - a[1]];
    }
    return r;
  }
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  adjustCenter(e) {
    const t = rl(this.targetCenter_, this.getProjection());
    this.setCenter([t[0] + e[0], t[1] + e[1]]);
  }
  adjustCenterInternal(e) {
    const t = this.targetCenter_;
    this.setCenterInternal([t[0] + e[0], t[1] + e[1]]);
  }
  adjustResolution(e, t) {
    (t = t && Yt(t, this.getProjection())), this.adjustResolutionInternal(e, t);
  }
  adjustResolutionInternal(e, t) {
    const n = this.getAnimating() || this.getInteracting(),
      s = this.getViewportSize_(this.getRotation()),
      r = this.constraints_.resolution(this.targetResolution_ * e, 0, s, n);
    t && (this.targetCenter_ = this.calculateCenterZoom(r, t)), (this.targetResolution_ *= e), this.applyTargetState_();
  }
  adjustZoom(e, t) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -e), t);
  }
  adjustRotation(e, t) {
    t && (t = Yt(t, this.getProjection())), this.adjustRotationInternal(e, t);
  }
  adjustRotationInternal(e, t) {
    const n = this.getAnimating() || this.getInteracting(),
      s = this.constraints_.rotation(this.targetRotation_ + e, n);
    t && (this.targetCenter_ = this.calculateCenterRotate(s, t)), (this.targetRotation_ += e), this.applyTargetState_();
  }
  setCenter(e) {
    this.setCenterInternal(e && Yt(e, this.getProjection()));
  }
  setCenterInternal(e) {
    (this.targetCenter_ = e), this.applyTargetState_();
  }
  setHint(e, t) {
    return (this.hints_[e] += t), this.changed(), this.hints_[e];
  }
  setResolution(e) {
    (this.targetResolution_ = e), this.applyTargetState_();
  }
  setRotation(e) {
    (this.targetRotation_ = e), this.applyTargetState_();
  }
  setZoom(e) {
    this.setResolution(this.getResolutionForZoom(e));
  }
  applyTargetState_(e, t) {
    const n = this.getAnimating() || this.getInteracting() || t,
      s = this.constraints_.rotation(this.targetRotation_, n),
      r = this.getViewportSize_(s),
      o = this.constraints_.resolution(this.targetResolution_, 0, r, n),
      l = this.constraints_.center(this.targetCenter_, o, r, n, this.calculateCenterShift(this.targetCenter_, o, s, r));
    this.get(mt.ROTATION) !== s && this.set(mt.ROTATION, s),
      this.get(mt.RESOLUTION) !== o && (this.set(mt.RESOLUTION, o), this.set('zoom', this.getZoom(), !0)),
      (!l || !this.get(mt.CENTER) || !mr(this.get(mt.CENTER), l)) && this.set(mt.CENTER, l),
      this.getAnimating() && !e && this.cancelAnimations(),
      (this.cancelAnchor_ = void 0);
  }
  resolveConstraints(e, t, n) {
    e = e !== void 0 ? e : 200;
    const s = t || 0,
      r = this.constraints_.rotation(this.targetRotation_),
      o = this.getViewportSize_(r),
      l = this.constraints_.resolution(this.targetResolution_, s, o),
      a = this.constraints_.center(this.targetCenter_, l, o, !1, this.calculateCenterShift(this.targetCenter_, l, r, o));
    if (e === 0 && !this.cancelAnchor_) {
      (this.targetResolution_ = l), (this.targetRotation_ = r), (this.targetCenter_ = a), this.applyTargetState_();
      return;
    }
    (n = n || (e === 0 ? this.cancelAnchor_ : void 0)),
      (this.cancelAnchor_ = void 0),
      (this.getResolution() !== l || this.getRotation() !== r || !this.getCenterInternal() || !mr(this.getCenterInternal(), a)) &&
        (this.getAnimating() && this.cancelAnimations(),
        this.animateInternal({ rotation: r, center: a, resolution: l, duration: e, easing: Qi, anchor: n }));
  }
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(Ye.INTERACTING, 1);
  }
  endInteraction(e, t, n) {
    (n = n && Yt(n, this.getProjection())), this.endInteractionInternal(e, t, n);
  }
  endInteractionInternal(e, t, n) {
    this.getInteracting() && (this.setHint(Ye.INTERACTING, -1), this.resolveConstraints(e, t, n));
  }
  getConstrainedCenter(e, t) {
    const n = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(e, t || this.getResolution(), n);
  }
  getConstrainedZoom(e, t) {
    const n = this.getResolutionForZoom(e);
    return this.getZoomForResolution(this.getConstrainedResolution(n, t));
  }
  getConstrainedResolution(e, t) {
    t = t || 0;
    const n = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(e, t, n);
  }
}
function Vs(i, e) {
  setTimeout(function () {
    i(e);
  }, 0);
}
function $y(i) {
  if (i.extent !== void 0) {
    const t = i.smoothExtentConstraint !== void 0 ? i.smoothExtentConstraint : !0;
    return sh(i.extent, i.constrainOnlyCenter, t);
  }
  const e = oa(i.projection, 'EPSG:3857');
  if (i.multiWorld !== !0 && e.isGlobal()) {
    const t = e.getExtent().slice();
    return (t[0] = -1 / 0), (t[2] = 1 / 0), sh(t, !1, !1);
  }
  return jy;
}
function qy(i) {
  let e,
    t,
    n,
    o = i.minZoom !== void 0 ? i.minZoom : po,
    l = i.maxZoom !== void 0 ? i.maxZoom : 28;
  const a = i.zoomFactor !== void 0 ? i.zoomFactor : 2,
    c = i.multiWorld !== void 0 ? i.multiWorld : !1,
    h = i.smoothResolutionConstraint !== void 0 ? i.smoothResolutionConstraint : !0,
    u = i.showFullExtent !== void 0 ? i.showFullExtent : !1,
    d = oa(i.projection, 'EPSG:3857'),
    f = d.getExtent();
  let g = i.constrainOnlyCenter,
    m = i.extent;
  if ((!c && !m && d.isGlobal() && ((g = !1), (m = f)), i.resolutions !== void 0)) {
    const _ = i.resolutions;
    (t = _[o]),
      (n = _[l] !== void 0 ? _[l] : _[_.length - 1]),
      i.constrainResolution ? (e = Yy(_, h, !g && m, u)) : (e = rh(t, n, h, !g && m, u));
  } else {
    const p = (f ? Math.max(Re(f), Nt(f)) : (360 * ms.degrees) / d.getMetersPerUnit()) / Sa / Math.pow(2, po),
      v = p / Math.pow(2, 28 - po);
    (t = i.maxResolution),
      t !== void 0 ? (o = 0) : (t = p / Math.pow(a, o)),
      (n = i.minResolution),
      n === void 0 && (i.maxZoom !== void 0 ? (i.maxResolution !== void 0 ? (n = t / Math.pow(a, l)) : (n = p / Math.pow(a, l))) : (n = v)),
      (l = o + Math.floor(Math.log(t / n) / Math.log(a))),
      (n = t / Math.pow(a, l - o)),
      i.constrainResolution ? (e = Uy(a, t, n, h, !g && m, u)) : (e = rh(t, n, h, !g && m, u));
  }
  return { constraint: e, maxResolution: t, minResolution: n, minZoom: o, zoomFactor: a };
}
function Jy(i) {
  if (i.enableRotation !== void 0 ? i.enableRotation : !0) {
    const t = i.constrainRotation;
    return t === void 0 || t === !0 ? Hy() : t === !1 ? oh : typeof t == 'number' ? Vy(t) : oh;
  }
  return ba;
}
function Qy(i) {
  return !(
    (i.sourceCenter && i.targetCenter && !mr(i.sourceCenter, i.targetCenter)) ||
    i.sourceResolution !== i.targetResolution ||
    i.sourceRotation !== i.targetRotation
  );
}
function yo(i, e, t, n, s) {
  const r = Math.cos(-s);
  let o = Math.sin(-s),
    l = i[0] * r - i[1] * o,
    a = i[1] * r + i[0] * o;
  (l += (e[0] / 2 - t[0]) * n), (a += (t[1] - e[1] / 2) * n), (o = -o);
  const c = l * r - a * o,
    h = a * r + l * o;
  return [c, h];
}
const At = Zy;
class e0 extends wa {
  constructor(e) {
    const t = Object.assign({}, e);
    delete t.source,
      super(t),
      this.on,
      this.once,
      this.un,
      (this.mapPrecomposeKey_ = null),
      (this.mapRenderKey_ = null),
      (this.sourceChangeKey_ = null),
      (this.renderer_ = null),
      (this.sourceReady_ = !1),
      (this.rendered = !1),
      e.render && (this.render = e.render),
      e.map && this.setMap(e.map),
      this.addChangeListener(Ce.SOURCE, this.handleSourcePropertyChange_);
    const n = e.source ? e.source : null;
    this.setSource(n);
  }
  getLayersArray(e) {
    return (e = e || []), e.push(this), e;
  }
  getLayerStatesArray(e) {
    return (e = e || []), e.push(this.getLayerState()), e;
  }
  getSource() {
    return this.get(Ce.SOURCE) || null;
  }
  getRenderSource() {
    return this.getSource();
  }
  getSourceState() {
    const e = this.getSource();
    return e ? e.getState() : 'undefined';
  }
  handleSourceChange_() {
    this.changed(),
      !(this.sourceReady_ || this.getSource().getState() !== 'ready') && ((this.sourceReady_ = !0), this.dispatchEvent('sourceready'));
  }
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ && (Te(this.sourceChangeKey_), (this.sourceChangeKey_ = null)), (this.sourceReady_ = !1);
    const e = this.getSource();
    e &&
      ((this.sourceChangeKey_ = _e(e, oe.CHANGE, this.handleSourceChange_, this)),
      e.getState() === 'ready' &&
        ((this.sourceReady_ = !0),
        setTimeout(() => {
          this.dispatchEvent('sourceready');
        }, 0))),
      this.changed();
  }
  getFeatures(e) {
    return this.renderer_ ? this.renderer_.getFeatures(e) : Promise.resolve([]);
  }
  getData(e) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(e);
  }
  isVisible(e) {
    let t;
    e instanceof At ? (t = { viewState: e.getState(), extent: e.calculateExtent() }) : (t = e);
    const n = this.getExtent();
    return this.getVisible() && Ia(this.getLayerState(), t.viewState) && (!n || Ue(n, t.extent));
  }
  getAttributions(e) {
    if (!this.isVisible(e)) return [];
    let t;
    const n = this.getSource();
    if ((n && (t = n.getAttributions()), !t)) return [];
    const s = e instanceof At ? e.getViewStateAndExtent() : e;
    let r = t(s);
    return Array.isArray(r) || (r = [r]), r;
  }
  render(e, t) {
    const n = this.getRenderer();
    if (n.prepareFrame(e)) return (this.rendered = !0), n.renderFrame(e, t);
  }
  unrender() {
    this.rendered = !1;
  }
  setMapInternal(e) {
    e || this.unrender(), this.set(Ce.MAP, e);
  }
  getMapInternal() {
    return this.get(Ce.MAP);
  }
  setMap(e) {
    this.mapPrecomposeKey_ && (Te(this.mapPrecomposeKey_), (this.mapPrecomposeKey_ = null)),
      e || this.changed(),
      this.mapRenderKey_ && (Te(this.mapRenderKey_), (this.mapRenderKey_ = null)),
      e &&
        ((this.mapPrecomposeKey_ = _e(
          e,
          yi.PRECOMPOSE,
          function (t) {
            const s = t.frameState.layerStatesArray,
              r = this.getLayerState(!1);
            he(
              !s.some(function (o) {
                return o.layer === r.layer;
              }),
              67,
            ),
              s.push(r);
          },
          this,
        )),
        (this.mapRenderKey_ = _e(this, oe.CHANGE, e.render, e)),
        this.changed());
  }
  setSource(e) {
    this.set(Ce.SOURCE, e);
  }
  getRenderer() {
    return this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_;
  }
  hasRenderer() {
    return !!this.renderer_;
  }
  createRenderer() {
    return null;
  }
  disposeInternal() {
    this.renderer_ && (this.renderer_.dispose(), delete this.renderer_), this.setSource(null), super.disposeInternal();
  }
}
function Ia(i, e) {
  if (!i.visible) return !1;
  const t = e.resolution;
  if (t < i.minResolution || t >= i.maxResolution) return !1;
  const n = e.zoom;
  return n > i.minZoom && n <= i.maxZoom;
}
const Qr = e0;
function t0(i, e, t, n, s) {
  Cd(i, e, t || 0, n || i.length - 1, s || i0);
}
function Cd(i, e, t, n, s) {
  for (; n > t; ) {
    if (n - t > 600) {
      var r = n - t + 1,
        o = e - t + 1,
        l = Math.log(r),
        a = 0.5 * Math.exp((2 * l) / 3),
        c = 0.5 * Math.sqrt((l * a * (r - a)) / r) * (o - r / 2 < 0 ? -1 : 1),
        h = Math.max(t, Math.floor(e - (o * a) / r + c)),
        u = Math.min(n, Math.floor(e + ((r - o) * a) / r + c));
      Cd(i, e, h, u, s);
    }
    var d = i[e],
      f = t,
      g = n;
    for (Vn(i, t, e), s(i[n], d) > 0 && Vn(i, t, n); f < g; ) {
      for (Vn(i, f, g), f++, g--; s(i[f], d) < 0; ) f++;
      for (; s(i[g], d) > 0; ) g--;
    }
    s(i[t], d) === 0 ? Vn(i, t, g) : (g++, Vn(i, g, n)), g <= e && (t = g + 1), e <= g && (n = g - 1);
  }
}
function Vn(i, e, t) {
  var n = i[e];
  (i[e] = i[t]), (i[t] = n);
}
function i0(i, e) {
  return i < e ? -1 : i > e ? 1 : 0;
}
let wd = class {
  constructor(e = 9) {
    (this._maxEntries = Math.max(4, e)), (this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4))), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(e) {
    let t = this.data;
    const n = [];
    if (!Ks(e, t)) return n;
    const s = this.toBBox,
      r = [];
    for (; t; ) {
      for (let o = 0; o < t.children.length; o++) {
        const l = t.children[o],
          a = t.leaf ? s(l) : l;
        Ks(e, a) && (t.leaf ? n.push(l) : vo(e, a) ? this._all(l, n) : r.push(l));
      }
      t = r.pop();
    }
    return n;
  }
  collides(e) {
    let t = this.data;
    if (!Ks(e, t)) return !1;
    const n = [];
    for (; t; ) {
      for (let s = 0; s < t.children.length; s++) {
        const r = t.children[s],
          o = t.leaf ? this.toBBox(r) : r;
        if (Ks(e, o)) {
          if (t.leaf || vo(e, o)) return !0;
          n.push(r);
        }
      }
      t = n.pop();
    }
    return !1;
  }
  load(e) {
    if (!(e && e.length)) return this;
    if (e.length < this._minEntries) {
      for (let n = 0; n < e.length; n++) this.insert(e[n]);
      return this;
    }
    let t = this._build(e.slice(), 0, e.length - 1, 0);
    if (!this.data.children.length) this.data = t;
    else if (this.data.height === t.height) this._splitRoot(this.data, t);
    else {
      if (this.data.height < t.height) {
        const n = this.data;
        (this.data = t), (t = n);
      }
      this._insert(t, this.data.height - t.height - 1, !0);
    }
    return this;
  }
  insert(e) {
    return e && this._insert(e, this.data.height - 1), this;
  }
  clear() {
    return (this.data = fn([])), this;
  }
  remove(e, t) {
    if (!e) return this;
    let n = this.data;
    const s = this.toBBox(e),
      r = [],
      o = [];
    let l, a, c;
    for (; n || r.length; ) {
      if ((n || ((n = r.pop()), (a = r[r.length - 1]), (l = o.pop()), (c = !0)), n.leaf)) {
        const h = n0(e, n.children, t);
        if (h !== -1) return n.children.splice(h, 1), r.push(n), this._condense(r), this;
      }
      !c && !n.leaf && vo(n, s)
        ? (r.push(n), o.push(l), (l = 0), (a = n), (n = n.children[0]))
        : a
        ? (l++, (n = a.children[l]), (c = !1))
        : (n = null);
    }
    return this;
  }
  toBBox(e) {
    return e;
  }
  compareMinX(e, t) {
    return e.minX - t.minX;
  }
  compareMinY(e, t) {
    return e.minY - t.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(e) {
    return (this.data = e), this;
  }
  _all(e, t) {
    const n = [];
    for (; e; ) e.leaf ? t.push(...e.children) : n.push(...e.children), (e = n.pop());
    return t;
  }
  _build(e, t, n, s) {
    const r = n - t + 1;
    let o = this._maxEntries,
      l;
    if (r <= o) return (l = fn(e.slice(t, n + 1))), on(l, this.toBBox), l;
    s || ((s = Math.ceil(Math.log(r) / Math.log(o))), (o = Math.ceil(r / Math.pow(o, s - 1)))), (l = fn([])), (l.leaf = !1), (l.height = s);
    const a = Math.ceil(r / o),
      c = a * Math.ceil(Math.sqrt(o));
    lh(e, t, n, c, this.compareMinX);
    for (let h = t; h <= n; h += c) {
      const u = Math.min(h + c - 1, n);
      lh(e, h, u, a, this.compareMinY);
      for (let d = h; d <= u; d += a) {
        const f = Math.min(d + a - 1, u);
        l.children.push(this._build(e, d, f, s - 1));
      }
    }
    return on(l, this.toBBox), l;
  }
  _chooseSubtree(e, t, n, s) {
    for (; s.push(t), !(t.leaf || s.length - 1 === n); ) {
      let r = 1 / 0,
        o = 1 / 0,
        l;
      for (let a = 0; a < t.children.length; a++) {
        const c = t.children[a],
          h = xo(c),
          u = o0(e, c) - h;
        u < o ? ((o = u), (r = h < r ? h : r), (l = c)) : u === o && h < r && ((r = h), (l = c));
      }
      t = l || t.children[0];
    }
    return t;
  }
  _insert(e, t, n) {
    const s = n ? e : this.toBBox(e),
      r = [],
      o = this._chooseSubtree(s, this.data, t, r);
    for (o.children.push(e), qn(o, s); t >= 0 && r[t].children.length > this._maxEntries; ) this._split(r, t), t--;
    this._adjustParentBBoxes(s, r, t);
  }
  _split(e, t) {
    const n = e[t],
      s = n.children.length,
      r = this._minEntries;
    this._chooseSplitAxis(n, r, s);
    const o = this._chooseSplitIndex(n, r, s),
      l = fn(n.children.splice(o, n.children.length - o));
    (l.height = n.height), (l.leaf = n.leaf), on(n, this.toBBox), on(l, this.toBBox), t ? e[t - 1].children.push(l) : this._splitRoot(n, l);
  }
  _splitRoot(e, t) {
    (this.data = fn([e, t])), (this.data.height = e.height + 1), (this.data.leaf = !1), on(this.data, this.toBBox);
  }
  _chooseSplitIndex(e, t, n) {
    let s,
      r = 1 / 0,
      o = 1 / 0;
    for (let l = t; l <= n - t; l++) {
      const a = $n(e, 0, l, this.toBBox),
        c = $n(e, l, n, this.toBBox),
        h = l0(a, c),
        u = xo(a) + xo(c);
      h < r ? ((r = h), (s = l), (o = u < o ? u : o)) : h === r && u < o && ((o = u), (s = l));
    }
    return s || n - t;
  }
  _chooseSplitAxis(e, t, n) {
    const s = e.leaf ? this.compareMinX : s0,
      r = e.leaf ? this.compareMinY : r0,
      o = this._allDistMargin(e, t, n, s),
      l = this._allDistMargin(e, t, n, r);
    o < l && e.children.sort(s);
  }
  _allDistMargin(e, t, n, s) {
    e.children.sort(s);
    const r = this.toBBox,
      o = $n(e, 0, t, r),
      l = $n(e, n - t, n, r);
    let a = Hs(o) + Hs(l);
    for (let c = t; c < n - t; c++) {
      const h = e.children[c];
      qn(o, e.leaf ? r(h) : h), (a += Hs(o));
    }
    for (let c = n - t - 1; c >= t; c--) {
      const h = e.children[c];
      qn(l, e.leaf ? r(h) : h), (a += Hs(l));
    }
    return a;
  }
  _adjustParentBBoxes(e, t, n) {
    for (let s = n; s >= 0; s--) qn(t[s], e);
  }
  _condense(e) {
    for (let t = e.length - 1, n; t >= 0; t--)
      e[t].children.length === 0 ? (t > 0 ? ((n = e[t - 1].children), n.splice(n.indexOf(e[t]), 1)) : this.clear()) : on(e[t], this.toBBox);
  }
};
function n0(i, e, t) {
  if (!t) return e.indexOf(i);
  for (let n = 0; n < e.length; n++) if (t(i, e[n])) return n;
  return -1;
}
function on(i, e) {
  $n(i, 0, i.children.length, e, i);
}
function $n(i, e, t, n, s) {
  s || (s = fn(null)), (s.minX = 1 / 0), (s.minY = 1 / 0), (s.maxX = -1 / 0), (s.maxY = -1 / 0);
  for (let r = e; r < t; r++) {
    const o = i.children[r];
    qn(s, i.leaf ? n(o) : o);
  }
  return s;
}
function qn(i, e) {
  return (
    (i.minX = Math.min(i.minX, e.minX)),
    (i.minY = Math.min(i.minY, e.minY)),
    (i.maxX = Math.max(i.maxX, e.maxX)),
    (i.maxY = Math.max(i.maxY, e.maxY)),
    i
  );
}
function s0(i, e) {
  return i.minX - e.minX;
}
function r0(i, e) {
  return i.minY - e.minY;
}
function xo(i) {
  return (i.maxX - i.minX) * (i.maxY - i.minY);
}
function Hs(i) {
  return i.maxX - i.minX + (i.maxY - i.minY);
}
function o0(i, e) {
  return (Math.max(e.maxX, i.maxX) - Math.min(e.minX, i.minX)) * (Math.max(e.maxY, i.maxY) - Math.min(e.minY, i.minY));
}
function l0(i, e) {
  const t = Math.max(i.minX, e.minX),
    n = Math.max(i.minY, e.minY),
    s = Math.min(i.maxX, e.maxX),
    r = Math.min(i.maxY, e.maxY);
  return Math.max(0, s - t) * Math.max(0, r - n);
}
function vo(i, e) {
  return i.minX <= e.minX && i.minY <= e.minY && e.maxX <= i.maxX && e.maxY <= i.maxY;
}
function Ks(i, e) {
  return e.minX <= i.maxX && e.minY <= i.maxY && e.maxX >= i.minX && e.maxY >= i.minY;
}
function fn(i) {
  return { children: i, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
}
function lh(i, e, t, n, s) {
  const r = [e, t];
  for (; r.length; ) {
    if (((t = r.pop()), (e = r.pop()), t - e <= n)) continue;
    const o = e + Math.ceil((t - e) / n / 2) * n;
    t0(i, o, e, t, s), r.push(e, o, o, t);
  }
}
class a0 {
  constructor() {
    (this.cache_ = {}), (this.cacheSize_ = 0), (this.maxCacheSize_ = 32);
  }
  clear() {
    (this.cache_ = {}), (this.cacheSize_ = 0);
  }
  canExpireCache() {
    return this.cacheSize_ > this.maxCacheSize_;
  }
  expire() {
    if (this.canExpireCache()) {
      let e = 0;
      for (const t in this.cache_) {
        const n = this.cache_[t];
        !(e++ & 3) && !n.hasListener() && (delete this.cache_[t], --this.cacheSize_);
      }
    }
  }
  get(e, t, n) {
    const s = ah(e, t, n);
    return s in this.cache_ ? this.cache_[s] : null;
  }
  set(e, t, n, s) {
    const r = ah(e, t, n);
    (this.cache_[r] = s), ++this.cacheSize_;
  }
  setSize(e) {
    (this.maxCacheSize_ = e), this.expire();
  }
}
function ah(i, e, t) {
  const n = t ? $r(t) : 'null';
  return e + ':' + i + ':' + n;
}
const Sr = new a0();
function Sd(i, e, t) {
  const n = i;
  let s = !0,
    r = !1,
    o = !1;
  const l = [
    fr(n, oe.LOAD, function () {
      (o = !0), r || e();
    }),
  ];
  return (
    n.src && pp
      ? ((r = !0),
        n
          .decode()
          .then(function () {
            s && e();
          })
          .catch(function (a) {
            s && (o ? e() : t());
          }))
      : l.push(fr(n, oe.ERROR, t)),
    function () {
      (s = !1), l.forEach(Te);
    }
  );
}
let Hn = null;
class c0 extends Xr {
  constructor(e, t, n, s, r, o) {
    super(),
      (this.hitDetectionImage_ = null),
      (this.image_ = e),
      (this.crossOrigin_ = s),
      (this.canvas_ = {}),
      (this.color_ = o),
      (this.unlisten_ = null),
      (this.imageState_ = r),
      (this.size_ = n),
      (this.src_ = t),
      this.tainted_;
  }
  initializeImage_() {
    (this.image_ = new Image()), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_);
  }
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === De.LOADED) {
      Hn || (Hn = qe(1, 1, void 0, { willReadFrequently: !0 })), Hn.drawImage(this.image_, 0, 0);
      try {
        Hn.getImageData(0, 0, 1, 1), (this.tainted_ = !1);
      } catch {
        (Hn = null), (this.tainted_ = !0);
      }
    }
    return this.tainted_ === !0;
  }
  dispatchChangeEvent_() {
    this.dispatchEvent(oe.CHANGE);
  }
  handleImageError_() {
    (this.imageState_ = De.ERROR), this.unlistenImage_(), this.dispatchChangeEvent_();
  }
  handleImageLoad_() {
    (this.imageState_ = De.LOADED),
      this.size_
        ? ((this.image_.width = this.size_[0]), (this.image_.height = this.size_[1]))
        : (this.size_ = [this.image_.width, this.image_.height]),
      this.unlistenImage_(),
      this.dispatchChangeEvent_();
  }
  getImage(e) {
    return this.image_ || this.initializeImage_(), this.replaceColor_(e), this.canvas_[e] ? this.canvas_[e] : this.image_;
  }
  getPixelRatio(e) {
    return this.replaceColor_(e), this.canvas_[e] ? e : 1;
  }
  getImageState() {
    return this.imageState_;
  }
  getHitDetectionImage() {
    if ((this.image_ || this.initializeImage_(), !this.hitDetectionImage_))
      if (this.isTainted_()) {
        const e = this.size_[0],
          t = this.size_[1],
          n = qe(e, t);
        n.fillRect(0, 0, e, t), (this.hitDetectionImage_ = n.canvas);
      } else this.hitDetectionImage_ = this.image_;
    return this.hitDetectionImage_;
  }
  getSize() {
    return this.size_;
  }
  getSrc() {
    return this.src_;
  }
  load() {
    if (this.imageState_ === De.IDLE) {
      this.image_ || this.initializeImage_(), (this.imageState_ = De.LOADING);
      try {
        this.image_.src = this.src_;
      } catch {
        this.handleImageError_();
      }
      this.unlisten_ = Sd(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  }
  replaceColor_(e) {
    if (!this.color_ || this.canvas_[e] || this.imageState_ !== De.LOADED) return;
    const t = this.image_,
      n = document.createElement('canvas');
    (n.width = Math.ceil(t.width * e)), (n.height = Math.ceil(t.height * e));
    const s = n.getContext('2d');
    s.scale(e, e),
      s.drawImage(t, 0, 0),
      (s.globalCompositeOperation = 'multiply'),
      (s.fillStyle = $r(this.color_)),
      s.fillRect(0, 0, n.width / e, n.height / e),
      (s.globalCompositeOperation = 'destination-in'),
      s.drawImage(t, 0, 0),
      (this.canvas_[e] = n);
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), (this.unlisten_ = null));
  }
}
function h0(i, e, t, n, s, r) {
  let o = Sr.get(e, n, r);
  return o || ((o = new c0(i, e, t, n, s, r)), Sr.set(e, n, r, o)), o;
}
class La extends gd {
  constructor(e) {
    e = e || {};
    const t = e.opacity !== void 0 ? e.opacity : 1,
      n = e.rotation !== void 0 ? e.rotation : 0,
      s = e.scale !== void 0 ? e.scale : 1,
      r = e.rotateWithView !== void 0 ? e.rotateWithView : !1;
    super({
      opacity: t,
      rotation: n,
      scale: s,
      displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
      rotateWithView: r,
      declutterMode: e.declutterMode,
    }),
      (this.anchor_ = e.anchor !== void 0 ? e.anchor : [0.5, 0.5]),
      (this.normalizedAnchor_ = null),
      (this.anchorOrigin_ = e.anchorOrigin !== void 0 ? e.anchorOrigin : 'top-left'),
      (this.anchorXUnits_ = e.anchorXUnits !== void 0 ? e.anchorXUnits : 'fraction'),
      (this.anchorYUnits_ = e.anchorYUnits !== void 0 ? e.anchorYUnits : 'fraction'),
      (this.crossOrigin_ = e.crossOrigin !== void 0 ? e.crossOrigin : null);
    const o = e.img !== void 0 ? e.img : null;
    this.imgSize_ = e.imgSize;
    let l = e.src;
    he(!(l !== void 0 && o), 4),
      he(!o || (o && this.imgSize_), 5),
      (l === void 0 || l.length === 0) && o && (l = o.src || fe(o)),
      he(l !== void 0 && l.length > 0, 6),
      he(!((e.width !== void 0 || e.height !== void 0) && e.scale !== void 0), 69);
    const a = e.src !== void 0 ? De.IDLE : De.LOADED;
    if (
      ((this.color_ = e.color !== void 0 ? xr(e.color) : null),
      (this.iconImage_ = h0(o, l, this.imgSize_ !== void 0 ? this.imgSize_ : null, this.crossOrigin_, a, this.color_)),
      (this.offset_ = e.offset !== void 0 ? e.offset : [0, 0]),
      (this.offsetOrigin_ = e.offsetOrigin !== void 0 ? e.offsetOrigin : 'top-left'),
      (this.origin_ = null),
      (this.size_ = e.size !== void 0 ? e.size : null),
      (this.width_ = e.width),
      (this.height_ = e.height),
      this.width_ !== void 0 || this.height_ !== void 0)
    ) {
      const c = this.getImage(1),
        h = () => {
          this.updateScaleFromWidthAndHeight(this.width_, this.height_);
        };
      c.width > 0 ? this.updateScaleFromWidthAndHeight(this.width_, this.height_) : c.addEventListener('load', h);
    }
  }
  clone() {
    let e = this.getScale();
    return (
      (e = Array.isArray(e) ? e.slice() : e),
      (this.width_ !== void 0 || this.height_ !== void 0) && (e = void 0),
      new La({
        anchor: this.anchor_.slice(),
        anchorOrigin: this.anchorOrigin_,
        anchorXUnits: this.anchorXUnits_,
        anchorYUnits: this.anchorYUnits_,
        color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
        crossOrigin: this.crossOrigin_,
        imgSize: this.imgSize_,
        offset: this.offset_.slice(),
        offsetOrigin: this.offsetOrigin_,
        opacity: this.getOpacity(),
        rotateWithView: this.getRotateWithView(),
        rotation: this.getRotation(),
        scale: e,
        size: this.size_ !== null ? this.size_.slice() : void 0,
        src: this.getSrc(),
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
        width: this.width_,
        height: this.height_,
      })
    );
  }
  updateScaleFromWidthAndHeight(e, t) {
    const n = this.getImage(1);
    e !== void 0 && t !== void 0
      ? super.setScale([e / n.width, t / n.height])
      : e !== void 0
      ? super.setScale([e / n.width, e / n.width])
      : t !== void 0
      ? super.setScale([t / n.height, t / n.height])
      : super.setScale([1, 1]);
  }
  getAnchor() {
    let e = this.normalizedAnchor_;
    if (!e) {
      e = this.anchor_;
      const s = this.getSize();
      if (this.anchorXUnits_ == 'fraction' || this.anchorYUnits_ == 'fraction') {
        if (!s) return null;
        (e = this.anchor_.slice()), this.anchorXUnits_ == 'fraction' && (e[0] *= s[0]), this.anchorYUnits_ == 'fraction' && (e[1] *= s[1]);
      }
      if (this.anchorOrigin_ != 'top-left') {
        if (!s) return null;
        e === this.anchor_ && (e = this.anchor_.slice()),
          (this.anchorOrigin_ == 'top-right' || this.anchorOrigin_ == 'bottom-right') && (e[0] = -e[0] + s[0]),
          (this.anchorOrigin_ == 'bottom-left' || this.anchorOrigin_ == 'bottom-right') && (e[1] = -e[1] + s[1]);
      }
      this.normalizedAnchor_ = e;
    }
    const t = this.getDisplacement(),
      n = this.getScaleArray();
    return [e[0] - t[0] / n[0], e[1] + t[1] / n[1]];
  }
  setAnchor(e) {
    (this.anchor_ = e), (this.normalizedAnchor_ = null);
  }
  getColor() {
    return this.color_;
  }
  getImage(e) {
    return this.iconImage_.getImage(e);
  }
  getPixelRatio(e) {
    return this.iconImage_.getPixelRatio(e);
  }
  getImageSize() {
    return this.iconImage_.getSize();
  }
  getImageState() {
    return this.iconImage_.getImageState();
  }
  getHitDetectionImage() {
    return this.iconImage_.getHitDetectionImage();
  }
  getOrigin() {
    if (this.origin_) return this.origin_;
    let e = this.offset_;
    if (this.offsetOrigin_ != 'top-left') {
      const t = this.getSize(),
        n = this.iconImage_.getSize();
      if (!t || !n) return null;
      (e = e.slice()),
        (this.offsetOrigin_ == 'top-right' || this.offsetOrigin_ == 'bottom-right') && (e[0] = n[0] - t[0] - e[0]),
        (this.offsetOrigin_ == 'bottom-left' || this.offsetOrigin_ == 'bottom-right') && (e[1] = n[1] - t[1] - e[1]);
    }
    return (this.origin_ = e), this.origin_;
  }
  getSrc() {
    return this.iconImage_.getSrc();
  }
  getSize() {
    return this.size_ ? this.size_ : this.iconImage_.getSize();
  }
  getWidth() {
    return this.width_;
  }
  getHeight() {
    return this.height_;
  }
  setWidth(e) {
    (this.width_ = e), this.updateScaleFromWidthAndHeight(e, this.height_);
  }
  setHeight(e) {
    (this.height_ = e), this.updateScaleFromWidthAndHeight(this.width_, e);
  }
  setScale(e) {
    super.setScale(e);
    const t = this.getImage(1);
    if (t) {
      const n = Array.isArray(e) ? e[0] : e;
      n !== void 0 && (this.width_ = n * t.width);
      const s = Array.isArray(e) ? e[1] : e;
      s !== void 0 && (this.height_ = s * t.height);
    }
  }
  listenImageChange(e) {
    this.iconImage_.addEventListener(oe.CHANGE, e);
  }
  load() {
    this.iconImage_.load();
  }
  unlistenImageChange(e) {
    this.iconImage_.removeEventListener(oe.CHANGE, e);
  }
}
const eo = La;
function ch(i) {
  return new qt({ fill: ws(i, ''), stroke: Ss(i, ''), text: u0(i), image: d0(i) });
}
function ws(i, e) {
  const t = i[e + 'fill-color'];
  if (t) return new bt({ color: t });
}
function Ss(i, e) {
  const t = i[e + 'stroke-width'],
    n = i[e + 'stroke-color'];
  if (!(!t && !n))
    return new Tt({
      width: t,
      color: n,
      lineCap: i[e + 'stroke-line-cap'],
      lineJoin: i[e + 'stroke-line-join'],
      lineDash: i[e + 'stroke-line-dash'],
      lineDashOffset: i[e + 'stroke-line-dash-offset'],
      miterLimit: i[e + 'stroke-miter-limit'],
    });
}
function u0(i) {
  const e = i['text-value'];
  return e
    ? new rs({
        text: e,
        font: i['text-font'],
        maxAngle: i['text-max-angle'],
        offsetX: i['text-offset-x'],
        offsetY: i['text-offset-y'],
        overflow: i['text-overflow'],
        placement: i['text-placement'],
        repeat: i['text-repeat'],
        scale: i['text-scale'],
        rotateWithView: i['text-rotate-with-view'],
        rotation: i['text-rotation'],
        textAlign: i['text-align'],
        justify: i['text-justify'],
        textBaseline: i['text-baseline'],
        padding: i['text-padding'],
        fill: ws(i, 'text-'),
        backgroundFill: ws(i, 'text-background-'),
        stroke: Ss(i, 'text-'),
        backgroundStroke: Ss(i, 'text-background-'),
      })
    : void 0;
}
function d0(i) {
  const e = i['icon-src'],
    t = i['icon-img'];
  if (e || t)
    return new eo({
      src: e,
      img: t,
      imgSize: i['icon-img-size'],
      anchor: i['icon-anchor'],
      anchorOrigin: i['icon-anchor-origin'],
      anchorXUnits: i['icon-anchor-x-units'],
      anchorYUnits: i['icon-anchor-y-units'],
      color: i['icon-color'],
      crossOrigin: i['icon-cross-origin'],
      offset: i['icon-offset'],
      displacement: i['icon-displacement'],
      opacity: i['icon-opacity'],
      scale: i['icon-scale'],
      rotation: i['icon-rotation'],
      rotateWithView: i['icon-rotate-with-view'],
      size: i['icon-size'],
      declutterMode: i['icon-declutter-mode'],
    });
  const n = i['shape-points'];
  if (n) {
    const r = 'shape-';
    return new va({
      points: n,
      fill: ws(i, r),
      stroke: Ss(i, r),
      radius: i['shape-radius'],
      radius1: i['shape-radius1'],
      radius2: i['shape-radius2'],
      angle: i['shape-angle'],
      displacement: i['shape-displacement'],
      rotation: i['shape-rotation'],
      rotateWithView: i['shape-rotate-with-view'],
      scale: i['shape-scale'],
      declutterMode: i['shape-declutter-mode'],
    });
  }
  const s = i['circle-radius'];
  if (s) {
    const r = 'circle-';
    return new Fn({
      radius: s,
      fill: ws(i, r),
      stroke: Ss(i, r),
      displacement: i['circle-displacement'],
      scale: i['circle-scale'],
      rotation: i['circle-rotation'],
      rotateWithView: i['circle-rotate-with-view'],
      declutterMode: i['circle-declutter-mode'],
    });
  }
}
const hh = { RENDER_ORDER: 'renderOrder' };
class f0 extends Qr {
  constructor(e) {
    e = e || {};
    const t = Object.assign({}, e);
    delete t.style,
      delete t.renderBuffer,
      delete t.updateWhileAnimating,
      delete t.updateWhileInteracting,
      super(t),
      (this.declutter_ = e.declutter !== void 0 ? e.declutter : !1),
      (this.renderBuffer_ = e.renderBuffer !== void 0 ? e.renderBuffer : 100),
      (this.style_ = null),
      (this.styleFunction_ = void 0),
      this.setStyle(e.style),
      (this.updateWhileAnimating_ = e.updateWhileAnimating !== void 0 ? e.updateWhileAnimating : !1),
      (this.updateWhileInteracting_ = e.updateWhileInteracting !== void 0 ? e.updateWhileInteracting : !1);
  }
  getDeclutter() {
    return this.declutter_;
  }
  getFeatures(e) {
    return super.getFeatures(e);
  }
  getRenderBuffer() {
    return this.renderBuffer_;
  }
  getRenderOrder() {
    return this.get(hh.RENDER_ORDER);
  }
  getStyle() {
    return this.style_;
  }
  getStyleFunction() {
    return this.styleFunction_;
  }
  getUpdateWhileAnimating() {
    return this.updateWhileAnimating_;
  }
  getUpdateWhileInteracting() {
    return this.updateWhileInteracting_;
  }
  renderDeclutter(e) {
    e.declutterTree || (e.declutterTree = new wd(9)), this.getRenderer().renderDeclutter(e);
  }
  setRenderOrder(e) {
    this.set(hh.RENDER_ORDER, e);
  }
  setStyle(e) {
    let t;
    if (e === void 0) t = Gy;
    else if (e === null) t = null;
    else if (typeof e == 'function') t = e;
    else if (e instanceof qt) t = e;
    else if (Array.isArray(e)) {
      const n = e.length,
        s = new Array(n);
      for (let r = 0; r < n; ++r) {
        const o = e[r];
        o instanceof qt ? (s[r] = o) : (s[r] = ch(o));
      }
      t = s;
    } else t = ch(e);
    (this.style_ = t), (this.styleFunction_ = e === null ? void 0 : Ny(this.style_)), this.changed();
  }
}
const g0 = f0,
  Ls = {
    BEGIN_GEOMETRY: 0,
    BEGIN_PATH: 1,
    CIRCLE: 2,
    CLOSE_PATH: 3,
    CUSTOM: 4,
    DRAW_CHARS: 5,
    DRAW_IMAGE: 6,
    END_GEOMETRY: 7,
    FILL: 8,
    MOVE_TO_LINE_TO: 9,
    SET_FILL_STYLE: 10,
    SET_STROKE_STYLE: 11,
    STROKE: 12,
  },
  Zs = [Ls.FILL],
  mi = [Ls.STROKE],
  Xi = [Ls.BEGIN_PATH],
  uh = [Ls.CLOSE_PATH],
  te = Ls;
class m0 {
  drawCustom(e, t, n, s) {}
  drawGeometry(e) {}
  setStyle(e) {}
  drawCircle(e, t) {}
  drawFeature(e, t) {}
  drawGeometryCollection(e, t) {}
  drawLineString(e, t) {}
  drawMultiLineString(e, t) {}
  drawMultiPoint(e, t) {}
  drawMultiPolygon(e, t) {}
  drawPoint(e, t) {}
  drawPolygon(e, t) {}
  drawText(e, t) {}
  setFillStrokeStyle(e, t) {}
  setImageStyle(e, t) {}
  setTextStyle(e, t) {}
}
const Td = m0;
class _0 extends Td {
  constructor(e, t, n, s) {
    super(),
      (this.tolerance = e),
      (this.maxExtent = t),
      (this.pixelRatio = s),
      (this.maxLineWidth = 0),
      (this.resolution = n),
      (this.beginGeometryInstruction1_ = null),
      (this.beginGeometryInstruction2_ = null),
      (this.bufferedMaxExtent_ = null),
      (this.instructions = []),
      (this.coordinates = []),
      (this.tmpCoordinate_ = []),
      (this.hitDetectionInstructions = []),
      (this.state = {});
  }
  applyPixelRatio(e) {
    const t = this.pixelRatio;
    return t == 1
      ? e
      : e.map(function (n) {
          return n * t;
        });
  }
  appendFlatPointCoordinates(e, t) {
    const n = this.getBufferedMaxExtent(),
      s = this.tmpCoordinate_,
      r = this.coordinates;
    let o = r.length;
    for (let l = 0, a = e.length; l < a; l += t) (s[0] = e[l]), (s[1] = e[l + 1]), jr(n, s) && ((r[o++] = s[0]), (r[o++] = s[1]));
    return o;
  }
  appendFlatLineCoordinates(e, t, n, s, r, o) {
    const l = this.coordinates;
    let a = l.length;
    const c = this.getBufferedMaxExtent();
    o && (t += s);
    let h = e[t],
      u = e[t + 1];
    const d = this.tmpCoordinate_;
    let f = !0,
      g,
      m,
      _;
    for (g = t + s; g < n; g += s)
      (d[0] = e[g]),
        (d[1] = e[g + 1]),
        (_ = Qo(c, d)),
        _ !== m
          ? (f && ((l[a++] = h), (l[a++] = u), (f = !1)), (l[a++] = d[0]), (l[a++] = d[1]))
          : _ === ke.INTERSECTING
          ? ((l[a++] = d[0]), (l[a++] = d[1]), (f = !1))
          : (f = !0),
        (h = d[0]),
        (u = d[1]),
        (m = _);
    return ((r && f) || g === t + s) && ((l[a++] = h), (l[a++] = u)), a;
  }
  drawCustomCoordinates_(e, t, n, s, r) {
    for (let o = 0, l = n.length; o < l; ++o) {
      const a = n[o],
        c = this.appendFlatLineCoordinates(e, t, a, s, !1, !1);
      r.push(c), (t = a);
    }
    return t;
  }
  drawCustom(e, t, n, s) {
    this.beginGeometry(e, t);
    const r = e.getType(),
      o = e.getStride(),
      l = this.coordinates.length;
    let a, c, h, u, d;
    switch (r) {
      case 'MultiPolygon':
        (a = e.getOrientedFlatCoordinates()), (u = []);
        const f = e.getEndss();
        d = 0;
        for (let g = 0, m = f.length; g < m; ++g) {
          const _ = [];
          (d = this.drawCustomCoordinates_(a, d, f[g], o, _)), u.push(_);
        }
        this.instructions.push([te.CUSTOM, l, u, e, n, ll]), this.hitDetectionInstructions.push([te.CUSTOM, l, u, e, s || n, ll]);
        break;
      case 'Polygon':
      case 'MultiLineString':
        (h = []),
          (a = r == 'Polygon' ? e.getOrientedFlatCoordinates() : e.getFlatCoordinates()),
          (d = this.drawCustomCoordinates_(a, 0, e.getEnds(), o, h)),
          this.instructions.push([te.CUSTOM, l, h, e, n, _s]),
          this.hitDetectionInstructions.push([te.CUSTOM, l, h, e, s || n, _s]);
        break;
      case 'LineString':
      case 'Circle':
        (a = e.getFlatCoordinates()),
          (c = this.appendFlatLineCoordinates(a, 0, a.length, o, !1, !1)),
          this.instructions.push([te.CUSTOM, l, c, e, n, fi]),
          this.hitDetectionInstructions.push([te.CUSTOM, l, c, e, s || n, fi]);
        break;
      case 'MultiPoint':
        (a = e.getFlatCoordinates()),
          (c = this.appendFlatPointCoordinates(a, o)),
          c > l &&
            (this.instructions.push([te.CUSTOM, l, c, e, n, fi]), this.hitDetectionInstructions.push([te.CUSTOM, l, c, e, s || n, fi]));
        break;
      case 'Point':
        (a = e.getFlatCoordinates()),
          this.coordinates.push(a[0], a[1]),
          (c = this.coordinates.length),
          this.instructions.push([te.CUSTOM, l, c, e, n]),
          this.hitDetectionInstructions.push([te.CUSTOM, l, c, e, s || n]);
        break;
    }
    this.endGeometry(t);
  }
  beginGeometry(e, t) {
    (this.beginGeometryInstruction1_ = [te.BEGIN_GEOMETRY, t, 0, e]),
      this.instructions.push(this.beginGeometryInstruction1_),
      (this.beginGeometryInstruction2_ = [te.BEGIN_GEOMETRY, t, 0, e]),
      this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  }
  finish() {
    return { instructions: this.instructions, hitDetectionInstructions: this.hitDetectionInstructions, coordinates: this.coordinates };
  }
  reverseHitDetectionInstructions() {
    const e = this.hitDetectionInstructions;
    e.reverse();
    let t;
    const n = e.length;
    let s,
      r,
      o = -1;
    for (t = 0; t < n; ++t)
      (s = e[t]),
        (r = s[0]),
        r == te.END_GEOMETRY ? (o = t) : r == te.BEGIN_GEOMETRY && ((s[2] = t), np(this.hitDetectionInstructions, o, t), (o = -1));
  }
  setFillStrokeStyle(e, t) {
    const n = this.state;
    if (e) {
      const s = e.getColor();
      n.fillStyle = Ft(s || ti);
    } else n.fillStyle = void 0;
    if (t) {
      const s = t.getColor();
      n.strokeStyle = Ft(s || vs);
      const r = t.getLineCap();
      n.lineCap = r !== void 0 ? r : Er;
      const o = t.getLineDash();
      n.lineDash = o ? o.slice() : ps;
      const l = t.getLineDashOffset();
      n.lineDashOffset = l || ys;
      const a = t.getLineJoin();
      n.lineJoin = a !== void 0 ? a : On;
      const c = t.getWidth();
      n.lineWidth = c !== void 0 ? c : Cs;
      const h = t.getMiterLimit();
      (n.miterLimit = h !== void 0 ? h : xs),
        n.lineWidth > this.maxLineWidth && ((this.maxLineWidth = n.lineWidth), (this.bufferedMaxExtent_ = null));
    } else
      (n.strokeStyle = void 0),
        (n.lineCap = void 0),
        (n.lineDash = null),
        (n.lineDashOffset = void 0),
        (n.lineJoin = void 0),
        (n.lineWidth = void 0),
        (n.miterLimit = void 0);
  }
  createFill(e) {
    const t = e.fillStyle,
      n = [te.SET_FILL_STYLE, t];
    return typeof t != 'string' && n.push(!0), n;
  }
  applyStroke(e) {
    this.instructions.push(this.createStroke(e));
  }
  createStroke(e) {
    return [
      te.SET_STROKE_STYLE,
      e.strokeStyle,
      e.lineWidth * this.pixelRatio,
      e.lineCap,
      e.lineJoin,
      e.miterLimit,
      this.applyPixelRatio(e.lineDash),
      e.lineDashOffset * this.pixelRatio,
    ];
  }
  updateFillStyle(e, t) {
    const n = e.fillStyle;
    (typeof n != 'string' || e.currentFillStyle != n) &&
      (n !== void 0 && this.instructions.push(t.call(this, e)), (e.currentFillStyle = n));
  }
  updateStrokeStyle(e, t) {
    const n = e.strokeStyle,
      s = e.lineCap,
      r = e.lineDash,
      o = e.lineDashOffset,
      l = e.lineJoin,
      a = e.lineWidth,
      c = e.miterLimit;
    (e.currentStrokeStyle != n ||
      e.currentLineCap != s ||
      (r != e.currentLineDash && !Ti(e.currentLineDash, r)) ||
      e.currentLineDashOffset != o ||
      e.currentLineJoin != l ||
      e.currentLineWidth != a ||
      e.currentMiterLimit != c) &&
      (n !== void 0 && t.call(this, e),
      (e.currentStrokeStyle = n),
      (e.currentLineCap = s),
      (e.currentLineDash = r),
      (e.currentLineDashOffset = o),
      (e.currentLineJoin = l),
      (e.currentLineWidth = a),
      (e.currentMiterLimit = c));
  }
  endGeometry(e) {
    (this.beginGeometryInstruction1_[2] = this.instructions.length),
      (this.beginGeometryInstruction1_ = null),
      (this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length),
      (this.beginGeometryInstruction2_ = null);
    const t = [te.END_GEOMETRY, e];
    this.instructions.push(t), this.hitDetectionInstructions.push(t);
  }
  getBufferedMaxExtent() {
    if (!this.bufferedMaxExtent_ && ((this.bufferedMaxExtent_ = ju(this.maxExtent)), this.maxLineWidth > 0)) {
      const e = (this.resolution * (this.maxLineWidth + 1)) / 2;
      Ql(this.bufferedMaxExtent_, e, this.bufferedMaxExtent_);
    }
    return this.bufferedMaxExtent_;
  }
}
const Ps = _0;
class p0 extends Ps {
  constructor(e, t, n, s) {
    super(e, t, n, s),
      (this.hitDetectionImage_ = null),
      (this.image_ = null),
      (this.imagePixelRatio_ = void 0),
      (this.anchorX_ = void 0),
      (this.anchorY_ = void 0),
      (this.height_ = void 0),
      (this.opacity_ = void 0),
      (this.originX_ = void 0),
      (this.originY_ = void 0),
      (this.rotateWithView_ = void 0),
      (this.rotation_ = void 0),
      (this.scale_ = void 0),
      (this.width_ = void 0),
      (this.declutterMode_ = void 0),
      (this.declutterImageWithText_ = void 0);
  }
  drawPoint(e, t) {
    if (!this.image_) return;
    this.beginGeometry(e, t);
    const n = e.getFlatCoordinates(),
      s = e.getStride(),
      r = this.coordinates.length,
      o = this.appendFlatPointCoordinates(n, s);
    this.instructions.push([
      te.DRAW_IMAGE,
      r,
      o,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [(this.scale_[0] * this.pixelRatio) / this.imagePixelRatio_, (this.scale_[1] * this.pixelRatio) / this.imagePixelRatio_],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_,
    ]),
      this.hitDetectionInstructions.push([
        te.DRAW_IMAGE,
        r,
        o,
        this.hitDetectionImage_,
        this.anchorX_,
        this.anchorY_,
        this.height_,
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterMode_,
        this.declutterImageWithText_,
      ]),
      this.endGeometry(t);
  }
  drawMultiPoint(e, t) {
    if (!this.image_) return;
    this.beginGeometry(e, t);
    const n = e.getFlatCoordinates(),
      s = e.getStride(),
      r = this.coordinates.length,
      o = this.appendFlatPointCoordinates(n, s);
    this.instructions.push([
      te.DRAW_IMAGE,
      r,
      o,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [(this.scale_[0] * this.pixelRatio) / this.imagePixelRatio_, (this.scale_[1] * this.pixelRatio) / this.imagePixelRatio_],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_,
    ]),
      this.hitDetectionInstructions.push([
        te.DRAW_IMAGE,
        r,
        o,
        this.hitDetectionImage_,
        this.anchorX_,
        this.anchorY_,
        this.height_,
        this.opacity_,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterMode_,
        this.declutterImageWithText_,
      ]),
      this.endGeometry(t);
  }
  finish() {
    return (
      this.reverseHitDetectionInstructions(),
      (this.anchorX_ = void 0),
      (this.anchorY_ = void 0),
      (this.hitDetectionImage_ = null),
      (this.image_ = null),
      (this.imagePixelRatio_ = void 0),
      (this.height_ = void 0),
      (this.scale_ = void 0),
      (this.opacity_ = void 0),
      (this.originX_ = void 0),
      (this.originY_ = void 0),
      (this.rotateWithView_ = void 0),
      (this.rotation_ = void 0),
      (this.width_ = void 0),
      super.finish()
    );
  }
  setImageStyle(e, t) {
    const n = e.getAnchor(),
      s = e.getSize(),
      r = e.getOrigin();
    (this.imagePixelRatio_ = e.getPixelRatio(this.pixelRatio)),
      (this.anchorX_ = n[0]),
      (this.anchorY_ = n[1]),
      (this.hitDetectionImage_ = e.getHitDetectionImage()),
      (this.image_ = e.getImage(this.pixelRatio)),
      (this.height_ = s[1]),
      (this.opacity_ = e.getOpacity()),
      (this.originX_ = r[0]),
      (this.originY_ = r[1]),
      (this.rotateWithView_ = e.getRotateWithView()),
      (this.rotation_ = e.getRotation()),
      (this.scale_ = e.getScaleArray()),
      (this.width_ = s[0]),
      (this.declutterMode_ = e.getDeclutterMode()),
      (this.declutterImageWithText_ = t);
  }
}
const y0 = p0;
class x0 extends Ps {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  drawFlatCoordinates_(e, t, n, s) {
    const r = this.coordinates.length,
      o = this.appendFlatLineCoordinates(e, t, n, s, !1, !1),
      l = [te.MOVE_TO_LINE_TO, r, o];
    return this.instructions.push(l), this.hitDetectionInstructions.push(l), n;
  }
  drawLineString(e, t) {
    const n = this.state,
      s = n.strokeStyle,
      r = n.lineWidth;
    if (s === void 0 || r === void 0) return;
    this.updateStrokeStyle(n, this.applyStroke),
      this.beginGeometry(e, t),
      this.hitDetectionInstructions.push(
        [te.SET_STROKE_STYLE, n.strokeStyle, n.lineWidth, n.lineCap, n.lineJoin, n.miterLimit, ps, ys],
        Xi,
      );
    const o = e.getFlatCoordinates(),
      l = e.getStride();
    this.drawFlatCoordinates_(o, 0, o.length, l), this.hitDetectionInstructions.push(mi), this.endGeometry(t);
  }
  drawMultiLineString(e, t) {
    const n = this.state,
      s = n.strokeStyle,
      r = n.lineWidth;
    if (s === void 0 || r === void 0) return;
    this.updateStrokeStyle(n, this.applyStroke),
      this.beginGeometry(e, t),
      this.hitDetectionInstructions.push(
        [te.SET_STROKE_STYLE, n.strokeStyle, n.lineWidth, n.lineCap, n.lineJoin, n.miterLimit, n.lineDash, n.lineDashOffset],
        Xi,
      );
    const o = e.getEnds(),
      l = e.getFlatCoordinates(),
      a = e.getStride();
    let c = 0;
    for (let h = 0, u = o.length; h < u; ++h) c = this.drawFlatCoordinates_(l, c, o[h], a);
    this.hitDetectionInstructions.push(mi), this.endGeometry(t);
  }
  finish() {
    const e = this.state;
    return (
      e.lastStroke != null && e.lastStroke != this.coordinates.length && this.instructions.push(mi),
      this.reverseHitDetectionInstructions(),
      (this.state = null),
      super.finish()
    );
  }
  applyStroke(e) {
    e.lastStroke != null &&
      e.lastStroke != this.coordinates.length &&
      (this.instructions.push(mi), (e.lastStroke = this.coordinates.length)),
      (e.lastStroke = 0),
      super.applyStroke(e),
      this.instructions.push(Xi);
  }
}
const v0 = x0;
class E0 extends Ps {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  drawFlatCoordinatess_(e, t, n, s) {
    const r = this.state,
      o = r.fillStyle !== void 0,
      l = r.strokeStyle !== void 0,
      a = n.length;
    this.instructions.push(Xi), this.hitDetectionInstructions.push(Xi);
    for (let c = 0; c < a; ++c) {
      const h = n[c],
        u = this.coordinates.length,
        d = this.appendFlatLineCoordinates(e, t, h, s, !0, !l),
        f = [te.MOVE_TO_LINE_TO, u, d];
      this.instructions.push(f),
        this.hitDetectionInstructions.push(f),
        l && (this.instructions.push(uh), this.hitDetectionInstructions.push(uh)),
        (t = h);
    }
    return (
      o && (this.instructions.push(Zs), this.hitDetectionInstructions.push(Zs)),
      l && (this.instructions.push(mi), this.hitDetectionInstructions.push(mi)),
      t
    );
  }
  drawCircle(e, t) {
    const n = this.state,
      s = n.fillStyle,
      r = n.strokeStyle;
    if (s === void 0 && r === void 0) return;
    this.setFillStrokeStyles_(),
      this.beginGeometry(e, t),
      n.fillStyle !== void 0 && this.hitDetectionInstructions.push([te.SET_FILL_STYLE, ti]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          te.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          n.lineDash,
          n.lineDashOffset,
        ]);
    const o = e.getFlatCoordinates(),
      l = e.getStride(),
      a = this.coordinates.length;
    this.appendFlatLineCoordinates(o, 0, o.length, l, !1, !1);
    const c = [te.CIRCLE, a];
    this.instructions.push(Xi, c),
      this.hitDetectionInstructions.push(Xi, c),
      n.fillStyle !== void 0 && (this.instructions.push(Zs), this.hitDetectionInstructions.push(Zs)),
      n.strokeStyle !== void 0 && (this.instructions.push(mi), this.hitDetectionInstructions.push(mi)),
      this.endGeometry(t);
  }
  drawPolygon(e, t) {
    const n = this.state,
      s = n.fillStyle,
      r = n.strokeStyle;
    if (s === void 0 && r === void 0) return;
    this.setFillStrokeStyles_(),
      this.beginGeometry(e, t),
      n.fillStyle !== void 0 && this.hitDetectionInstructions.push([te.SET_FILL_STYLE, ti]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          te.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          n.lineDash,
          n.lineDashOffset,
        ]);
    const o = e.getEnds(),
      l = e.getOrientedFlatCoordinates(),
      a = e.getStride();
    this.drawFlatCoordinatess_(l, 0, o, a), this.endGeometry(t);
  }
  drawMultiPolygon(e, t) {
    const n = this.state,
      s = n.fillStyle,
      r = n.strokeStyle;
    if (s === void 0 && r === void 0) return;
    this.setFillStrokeStyles_(),
      this.beginGeometry(e, t),
      n.fillStyle !== void 0 && this.hitDetectionInstructions.push([te.SET_FILL_STYLE, ti]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          te.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          n.lineDash,
          n.lineDashOffset,
        ]);
    const o = e.getEndss(),
      l = e.getOrientedFlatCoordinates(),
      a = e.getStride();
    let c = 0;
    for (let h = 0, u = o.length; h < u; ++h) c = this.drawFlatCoordinatess_(l, c, o[h], a);
    this.endGeometry(t);
  }
  finish() {
    this.reverseHitDetectionInstructions(), (this.state = null);
    const e = this.tolerance;
    if (e !== 0) {
      const t = this.coordinates;
      for (let n = 0, s = t.length; n < s; ++n) t[n] = Ai(t[n], e);
    }
    return super.finish();
  }
  setFillStrokeStyles_() {
    const e = this.state;
    e.fillStyle !== void 0 && this.updateFillStyle(e, this.createFill),
      e.strokeStyle !== void 0 && this.updateStrokeStyle(e, this.applyStroke);
  }
}
const dh = E0;
function C0(i, e, t, n, s) {
  const r = [];
  let o = t,
    l = 0,
    a = e.slice(t, 2);
  for (; l < i && o + s < n; ) {
    const [c, h] = a.slice(-2),
      u = e[o + s],
      d = e[o + s + 1],
      f = Math.sqrt((u - c) * (u - c) + (d - h) * (d - h));
    if (((l += f), l >= i)) {
      const g = (i - l + f) / f,
        m = st(c, u, g),
        _ = st(h, d, g);
      a.push(m, _), r.push(a), (a = [m, _]), l == i && (o += s), (l = 0);
    } else if (l < i) a.push(e[o + s], e[o + s + 1]), (o += s);
    else {
      const g = f - l,
        m = st(c, u, g / f),
        _ = st(h, d, g / f);
      a.push(m, _), r.push(a), (a = [m, _]), (l = 0), (o += s);
    }
  }
  return l > 0 && r.push(a), r;
}
function w0(i, e, t, n, s) {
  let r = t,
    o = t,
    l = 0,
    a = 0,
    c = t,
    h,
    u,
    d,
    f,
    g,
    m,
    _,
    p,
    v,
    x;
  for (u = t; u < n; u += s) {
    const E = e[u],
      w = e[u + 1];
    g !== void 0 &&
      ((v = E - g),
      (x = w - m),
      (f = Math.sqrt(v * v + x * x)),
      _ !== void 0 &&
        ((a += d), (h = Math.acos((_ * v + p * x) / (d * f))), h > i && (a > l && ((l = a), (r = c), (o = u)), (a = 0), (c = u - s))),
      (d = f),
      (_ = v),
      (p = x)),
      (g = E),
      (m = w);
  }
  return (a += f), a > l ? [c, u] : [r, o];
}
const os = {
  left: 0,
  end: 0,
  center: 0.5,
  right: 1,
  start: 1,
  top: 0,
  middle: 0.5,
  hanging: 0.2,
  alphabetic: 0.8,
  ideographic: 0.8,
  bottom: 1,
};
class S0 extends Ps {
  constructor(e, t, n, s) {
    super(e, t, n, s),
      (this.labels_ = null),
      (this.text_ = ''),
      (this.textOffsetX_ = 0),
      (this.textOffsetY_ = 0),
      (this.textRotateWithView_ = void 0),
      (this.textRotation_ = 0),
      (this.textFillState_ = null),
      (this.fillStates = {}),
      (this.textStrokeState_ = null),
      (this.strokeStates = {}),
      (this.textState_ = {}),
      (this.textStates = {}),
      (this.textKey_ = ''),
      (this.fillKey_ = ''),
      (this.strokeKey_ = ''),
      (this.declutterImageWithText_ = void 0);
  }
  finish() {
    const e = super.finish();
    return (e.textStates = this.textStates), (e.fillStates = this.fillStates), (e.strokeStates = this.strokeStates), e;
  }
  drawText(e, t) {
    const n = this.textFillState_,
      s = this.textStrokeState_,
      r = this.textState_;
    if (this.text_ === '' || !r || (!n && !s)) return;
    const o = this.coordinates;
    let l = o.length;
    const a = e.getType();
    let c = null,
      h = e.getStride();
    if (r.placement === 'line' && (a == 'LineString' || a == 'MultiLineString' || a == 'Polygon' || a == 'MultiPolygon')) {
      if (!Ue(this.getBufferedMaxExtent(), e.getExtent())) return;
      let u;
      if (((c = e.getFlatCoordinates()), a == 'LineString')) u = [c.length];
      else if (a == 'MultiLineString') u = e.getEnds();
      else if (a == 'Polygon') u = e.getEnds().slice(0, 1);
      else if (a == 'MultiPolygon') {
        const m = e.getEndss();
        u = [];
        for (let _ = 0, p = m.length; _ < p; ++_) u.push(m[_][0]);
      }
      this.beginGeometry(e, t);
      const d = r.repeat,
        f = d ? void 0 : r.textAlign;
      let g = 0;
      for (let m = 0, _ = u.length; m < _; ++m) {
        let p;
        d ? (p = C0(d * this.resolution, c, g, u[m], h)) : (p = [c.slice(g, u[m])]);
        for (let v = 0, x = p.length; v < x; ++v) {
          const E = p[v];
          let w = 0,
            P = E.length;
          if (f == null) {
            const S = w0(r.maxAngle, E, 0, E.length, 2);
            (w = S[0]), (P = S[1]);
          }
          for (let S = w; S < P; S += h) o.push(E[S], E[S + 1]);
          const b = o.length;
          (g = u[m]), this.drawChars_(l, b), (l = b);
        }
      }
      this.endGeometry(t);
    } else {
      let u = r.overflow ? null : [];
      switch (a) {
        case 'Point':
        case 'MultiPoint':
          c = e.getFlatCoordinates();
          break;
        case 'LineString':
          c = e.getFlatMidpoint();
          break;
        case 'Circle':
          c = e.getCenter();
          break;
        case 'MultiLineString':
          (c = e.getFlatMidpoints()), (h = 2);
          break;
        case 'Polygon':
          (c = e.getFlatInteriorPoint()), r.overflow || u.push(c[2] / this.resolution), (h = 3);
          break;
        case 'MultiPolygon':
          const _ = e.getFlatInteriorPoints();
          c = [];
          for (let p = 0, v = _.length; p < v; p += 3) r.overflow || u.push(_[p + 2] / this.resolution), c.push(_[p], _[p + 1]);
          if (c.length === 0) return;
          h = 2;
          break;
      }
      const d = this.appendFlatPointCoordinates(c, h);
      if (d === l) return;
      if (u && (d - l) / 2 !== c.length / h) {
        let _ = l / 2;
        u = u.filter((p, v) => {
          const x = o[(_ + v) * 2] === c[v * h] && o[(_ + v) * 2 + 1] === c[v * h + 1];
          return x || --_, x;
        });
      }
      this.saveTextStates_(),
        (r.backgroundFill || r.backgroundStroke) &&
          (this.setFillStrokeStyle(r.backgroundFill, r.backgroundStroke),
          r.backgroundFill &&
            (this.updateFillStyle(this.state, this.createFill), this.hitDetectionInstructions.push(this.createFill(this.state))),
          r.backgroundStroke &&
            (this.updateStrokeStyle(this.state, this.applyStroke), this.hitDetectionInstructions.push(this.createStroke(this.state)))),
        this.beginGeometry(e, t);
      let f = r.padding;
      if (f != Bi && (r.scale[0] < 0 || r.scale[1] < 0)) {
        let _ = r.padding[0],
          p = r.padding[1],
          v = r.padding[2],
          x = r.padding[3];
        r.scale[0] < 0 && ((p = -p), (x = -x)), r.scale[1] < 0 && ((_ = -_), (v = -v)), (f = [_, p, v, x]);
      }
      const g = this.pixelRatio;
      this.instructions.push([
        te.DRAW_IMAGE,
        l,
        d,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        void 0,
        this.declutterImageWithText_,
        f == Bi
          ? Bi
          : f.map(function (_) {
              return _ * g;
            }),
        !!r.backgroundFill,
        !!r.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        u,
      ]);
      const m = 1 / g;
      this.hitDetectionInstructions.push([
        te.DRAW_IMAGE,
        l,
        d,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [m, m],
        NaN,
        void 0,
        this.declutterImageWithText_,
        f,
        !!r.backgroundFill,
        !!r.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        u,
      ]),
        this.endGeometry(t);
    }
  }
  saveTextStates_() {
    const e = this.textStrokeState_,
      t = this.textState_,
      n = this.textFillState_,
      s = this.strokeKey_;
    e &&
      (s in this.strokeStates ||
        (this.strokeStates[s] = {
          strokeStyle: e.strokeStyle,
          lineCap: e.lineCap,
          lineDashOffset: e.lineDashOffset,
          lineWidth: e.lineWidth,
          lineJoin: e.lineJoin,
          miterLimit: e.miterLimit,
          lineDash: e.lineDash,
        }));
    const r = this.textKey_;
    r in this.textStates ||
      (this.textStates[r] = {
        font: t.font,
        textAlign: t.textAlign || Es,
        justify: t.justify,
        textBaseline: t.textBaseline || Cr,
        scale: t.scale,
      });
    const o = this.fillKey_;
    n && (o in this.fillStates || (this.fillStates[o] = { fillStyle: n.fillStyle }));
  }
  drawChars_(e, t) {
    const n = this.textStrokeState_,
      s = this.textState_,
      r = this.strokeKey_,
      o = this.textKey_,
      l = this.fillKey_;
    this.saveTextStates_();
    const a = this.pixelRatio,
      c = os[s.textBaseline],
      h = this.textOffsetY_ * a,
      u = this.text_,
      d = n ? (n.lineWidth * Math.abs(s.scale[0])) / 2 : 0;
    this.instructions.push([te.DRAW_CHARS, e, t, c, s.overflow, l, s.maxAngle, a, h, r, d * a, u, o, 1]),
      this.hitDetectionInstructions.push([te.DRAW_CHARS, e, t, c, s.overflow, l, s.maxAngle, 1, h, r, d, u, o, 1 / a]);
  }
  setTextStyle(e, t) {
    let n, s, r;
    if (!e) this.text_ = '';
    else {
      const o = e.getFill();
      o
        ? ((s = this.textFillState_), s || ((s = {}), (this.textFillState_ = s)), (s.fillStyle = Ft(o.getColor() || ti)))
        : ((s = null), (this.textFillState_ = s));
      const l = e.getStroke();
      if (!l) (r = null), (this.textStrokeState_ = r);
      else {
        (r = this.textStrokeState_), r || ((r = {}), (this.textStrokeState_ = r));
        const g = l.getLineDash(),
          m = l.getLineDashOffset(),
          _ = l.getWidth(),
          p = l.getMiterLimit();
        (r.lineCap = l.getLineCap() || Er),
          (r.lineDash = g ? g.slice() : ps),
          (r.lineDashOffset = m === void 0 ? ys : m),
          (r.lineJoin = l.getLineJoin() || On),
          (r.lineWidth = _ === void 0 ? Cs : _),
          (r.miterLimit = p === void 0 ? xs : p),
          (r.strokeStyle = Ft(l.getColor() || vs));
      }
      n = this.textState_;
      const a = e.getFont() || yd;
      Ay(a);
      const c = e.getScaleArray();
      (n.overflow = e.getOverflow()),
        (n.font = a),
        (n.maxAngle = e.getMaxAngle()),
        (n.placement = e.getPlacement()),
        (n.textAlign = e.getTextAlign()),
        (n.repeat = e.getRepeat()),
        (n.justify = e.getJustify()),
        (n.textBaseline = e.getTextBaseline() || Cr),
        (n.backgroundFill = e.getBackgroundFill()),
        (n.backgroundStroke = e.getBackgroundStroke()),
        (n.padding = e.getPadding() || Bi),
        (n.scale = c === void 0 ? [1, 1] : c);
      const h = e.getOffsetX(),
        u = e.getOffsetY(),
        d = e.getRotateWithView(),
        f = e.getRotation();
      (this.text_ = e.getText() || ''),
        (this.textOffsetX_ = h === void 0 ? 0 : h),
        (this.textOffsetY_ = u === void 0 ? 0 : u),
        (this.textRotateWithView_ = d === void 0 ? !1 : d),
        (this.textRotation_ = f === void 0 ? 0 : f),
        (this.strokeKey_ = r
          ? (typeof r.strokeStyle == 'string' ? r.strokeStyle : fe(r.strokeStyle)) +
            r.lineCap +
            r.lineDashOffset +
            '|' +
            r.lineWidth +
            r.lineJoin +
            r.miterLimit +
            '[' +
            r.lineDash.join() +
            ']'
          : ''),
        (this.textKey_ = n.font + n.scale + (n.textAlign || '?') + (n.repeat || '?') + (n.justify || '?') + (n.textBaseline || '?')),
        (this.fillKey_ = s ? (typeof s.fillStyle == 'string' ? s.fillStyle : '|' + fe(s.fillStyle)) : '');
    }
    this.declutterImageWithText_ = t;
  }
}
const T0 = { Circle: dh, Default: Ps, Image: y0, LineString: v0, Polygon: dh, Text: S0 };
class R0 {
  constructor(e, t, n, s) {
    (this.tolerance_ = e), (this.maxExtent_ = t), (this.pixelRatio_ = s), (this.resolution_ = n), (this.buildersByZIndex_ = {});
  }
  finish() {
    const e = {};
    for (const t in this.buildersByZIndex_) {
      e[t] = e[t] || {};
      const n = this.buildersByZIndex_[t];
      for (const s in n) {
        const r = n[s].finish();
        e[t][s] = r;
      }
    }
    return e;
  }
  getBuilder(e, t) {
    const n = e !== void 0 ? e.toString() : '0';
    let s = this.buildersByZIndex_[n];
    s === void 0 && ((s = {}), (this.buildersByZIndex_[n] = s));
    let r = s[t];
    if (r === void 0) {
      const o = T0[t];
      (r = new o(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_)), (s[t] = r);
    }
    return r;
  }
}
const fh = R0;
class b0 extends Wn {
  constructor(e) {
    super(),
      (this.ready = !0),
      (this.boundHandleImageChange_ = this.handleImageChange_.bind(this)),
      (this.layer_ = e),
      (this.declutterExecutorGroup = null);
  }
  getFeatures(e) {
    return ie();
  }
  getData(e) {
    return null;
  }
  prepareFrame(e) {
    return ie();
  }
  renderFrame(e, t) {
    return ie();
  }
  loadedTileCallback(e, t, n) {
    e[t] || (e[t] = {}), (e[t][n.tileCoord.toString()] = n);
  }
  createLoadedTileFinder(e, t, n) {
    return (s, r) => {
      const o = this.loadedTileCallback.bind(this, n, s);
      return e.forEachLoadedTile(t, s, r, o);
    };
  }
  forEachFeatureAtCoordinate(e, t, n, s, r) {}
  getLayer() {
    return this.layer_;
  }
  handleFontsChanged() {}
  handleImageChange_(e) {
    e.target.getState() === De.LOADED && this.renderIfReadyAndVisible();
  }
  loadImage(e) {
    let t = e.getState();
    return (
      t != De.LOADED && t != De.ERROR && e.addEventListener(oe.CHANGE, this.boundHandleImageChange_),
      t == De.IDLE && (e.load(), (t = e.getState())),
      t == De.LOADED
    );
  }
  renderIfReadyAndVisible() {
    const e = this.getLayer();
    e && e.getVisible() && e.getSourceState() === 'ready' && e.changed();
  }
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
const I0 = b0;
class L0 extends Gt {
  constructor(e, t, n, s) {
    super(e), (this.inversePixelTransform = t), (this.frameState = n), (this.context = s);
  }
}
const Rd = L0,
  gh = [];
let gn = null;
function P0() {
  gn = qe(1, 1, void 0, { willReadFrequently: !0 });
}
class M0 extends I0 {
  constructor(e) {
    super(e),
      (this.container = null),
      this.renderedResolution,
      (this.tempTransform = wt()),
      (this.pixelTransform = wt()),
      (this.inversePixelTransform = wt()),
      (this.context = null),
      (this.containerReused = !1),
      (this.pixelContext_ = null),
      (this.frameState = null);
  }
  getImageData(e, t, n) {
    gn || P0(), gn.clearRect(0, 0, 1, 1);
    let s;
    try {
      gn.drawImage(e, t, n, 1, 1, 0, 0, 1, 1), (s = gn.getImageData(0, 0, 1, 1).data);
    } catch {
      return (gn = null), null;
    }
    return s;
  }
  getBackground(e) {
    let n = this.getLayer().getBackground();
    return typeof n == 'function' && (n = n(e.viewState.resolution)), n || void 0;
  }
  useContainer(e, t, n) {
    const s = this.getLayer().getClassName();
    let r, o;
    if (e && e.className === s && (!n || (e && e.style.backgroundColor && Ti(xr(e.style.backgroundColor), xr(n))))) {
      const l = e.firstElementChild;
      l instanceof HTMLCanvasElement && (o = l.getContext('2d'));
    }
    if (
      (o && o.canvas.style.transform === t
        ? ((this.container = e), (this.context = o), (this.containerReused = !0))
        : this.containerReused && ((this.container = null), (this.context = null), (this.containerReused = !1)),
      !this.container)
    ) {
      (r = document.createElement('div')), (r.className = s);
      let l = r.style;
      (l.position = 'absolute'), (l.width = '100%'), (l.height = '100%'), (o = qe());
      const a = o.canvas;
      r.appendChild(a),
        (l = a.style),
        (l.position = 'absolute'),
        (l.left = '0'),
        (l.transformOrigin = 'top left'),
        (this.container = r),
        (this.context = o);
    }
    !this.containerReused && n && !this.container.style.backgroundColor && (this.container.style.backgroundColor = n);
  }
  clipUnrotated(e, t, n) {
    const s = qi(n),
      r = Vr(n),
      o = Ur(n),
      l = Yr(n);
    Ne(t.coordinateToPixelTransform, s),
      Ne(t.coordinateToPixelTransform, r),
      Ne(t.coordinateToPixelTransform, o),
      Ne(t.coordinateToPixelTransform, l);
    const a = this.inversePixelTransform;
    Ne(a, s),
      Ne(a, r),
      Ne(a, o),
      Ne(a, l),
      e.save(),
      e.beginPath(),
      e.moveTo(Math.round(s[0]), Math.round(s[1])),
      e.lineTo(Math.round(r[0]), Math.round(r[1])),
      e.lineTo(Math.round(o[0]), Math.round(o[1])),
      e.lineTo(Math.round(l[0]), Math.round(l[1])),
      e.clip();
  }
  dispatchRenderEvent_(e, t, n) {
    const s = this.getLayer();
    if (s.hasListener(e)) {
      const r = new Rd(e, this.inversePixelTransform, n, t);
      s.dispatchEvent(r);
    }
  }
  preRender(e, t) {
    (this.frameState = t), this.dispatchRenderEvent_(yi.PRERENDER, e, t);
  }
  postRender(e, t) {
    this.dispatchRenderEvent_(yi.POSTRENDER, e, t);
  }
  getRenderTransform(e, t, n, s, r, o, l) {
    const a = r / 2,
      c = o / 2,
      h = s / t,
      u = -h,
      d = -e[0] + l,
      f = -e[1];
    return wi(this.tempTransform, a, c, h, u, -n, d, f);
  }
  disposeInternal() {
    delete this.frameState, super.disposeInternal();
  }
}
const bd = M0;
function A0(i, e, t, n, s, r, o, l, a, c, h, u) {
  let d = i[e],
    f = i[e + 1],
    g = 0,
    m = 0,
    _ = 0,
    p = 0;
  function v() {
    (g = d), (m = f), (e += n), (d = i[e]), (f = i[e + 1]), (p += _), (_ = Math.sqrt((d - g) * (d - g) + (f - m) * (f - m)));
  }
  do v();
  while (e < t - n && p + _ < r);
  let x = _ === 0 ? 0 : (r - p) / _;
  const E = st(g, d, x),
    w = st(m, f, x),
    P = e - n,
    b = p,
    S = r + l * a(c, s, h);
  for (; e < t - n && p + _ < S; ) v();
  x = _ === 0 ? 0 : (S - p) / _;
  const k = st(g, d, x),
    W = st(m, f, x);
  let Q;
  if (u) {
    const U = [E, w, k, W];
    td(U, 0, 4, 2, u, U, U), (Q = U[0] > U[2]);
  } else Q = E > k;
  const $ = Math.PI,
    ee = [],
    Ee = P + n === e;
  (e = P), (_ = 0), (p = b), (d = i[e]), (f = i[e + 1]);
  let K;
  if (Ee) {
    v(), (K = Math.atan2(f - m, d - g)), Q && (K += K > 0 ? -$ : $);
    const U = (k + E) / 2,
      O = (W + w) / 2;
    return (ee[0] = [U, O, (S - r) / 2, K, s]), ee;
  }
  s = s.replace(/\n/g, ' ');
  for (let U = 0, O = s.length; U < O; ) {
    v();
    let j = Math.atan2(f - m, d - g);
    if ((Q && (j += j > 0 ? -$ : $), K !== void 0)) {
      let ge = j - K;
      if (((ge += ge > $ ? -2 * $ : ge < -$ ? 2 * $ : 0), Math.abs(ge) > o)) return null;
    }
    K = j;
    const le = U;
    let ue = 0;
    for (; U < O; ++U) {
      const ge = Q ? O - U - 1 : U,
        R = l * a(c, s[ge], h);
      if (e + n < t && p + _ < r + ue + R / 2) break;
      ue += R;
    }
    if (U === le) continue;
    const xe = Q ? s.substring(O - le, O - U) : s.substring(le, U);
    x = _ === 0 ? 0 : (r + ue / 2 - p) / _;
    const M = st(g, d, x),
      Oe = st(m, f, x);
    ee.push([M, Oe, ue / 2, j, xe]), (r += ue);
  }
  return ee;
}
const ln = gt(),
  oi = [],
  Xt = [],
  jt = [],
  li = [];
function mh(i) {
  return i[3].declutterBox;
}
const O0 = new RegExp(
  '[' +
    String.fromCharCode(1425) +
    '-' +
    String.fromCharCode(2303) +
    String.fromCharCode(64285) +
    '-' +
    String.fromCharCode(65023) +
    String.fromCharCode(65136) +
    '-' +
    String.fromCharCode(65276) +
    String.fromCharCode(67584) +
    '-' +
    String.fromCharCode(69631) +
    String.fromCharCode(124928) +
    '-' +
    String.fromCharCode(126975) +
    ']',
);
function _h(i, e) {
  return (e === 'start' || e === 'end') && !O0.test(i) && (e = e === 'start' ? 'left' : 'right'), os[e];
}
function F0(i, e, t) {
  return (
    t > 0 &&
      i.push(
        `
`,
        '',
      ),
    i.push(e, ''),
    i
  );
}
class D0 {
  constructor(e, t, n, s) {
    (this.overlaps = n),
      (this.pixelRatio = t),
      (this.resolution = e),
      this.alignFill_,
      (this.instructions = s.instructions),
      (this.coordinates = s.coordinates),
      (this.coordinateCache_ = {}),
      (this.renderedTransform_ = wt()),
      (this.hitDetectionInstructions = s.hitDetectionInstructions),
      (this.pixelCoordinates_ = null),
      (this.viewRotation_ = 0),
      (this.fillStates = s.fillStates || {}),
      (this.strokeStates = s.strokeStates || {}),
      (this.textStates = s.textStates || {}),
      (this.widths_ = {}),
      (this.labels_ = {});
  }
  createLabel(e, t, n, s) {
    const r = e + t + n + s;
    if (this.labels_[r]) return this.labels_[r];
    const o = s ? this.strokeStates[s] : null,
      l = n ? this.fillStates[n] : null,
      a = this.textStates[t],
      c = this.pixelRatio,
      h = [a.scale[0] * c, a.scale[1] * c],
      u = Array.isArray(e),
      d = a.justify ? os[a.justify] : _h(Array.isArray(e) ? e[0] : e, a.textAlign || Es),
      f = s && o.lineWidth ? o.lineWidth : 0,
      g = u
        ? e
        : e
            .split(
              `
`,
            )
            .reduce(F0, []),
      { width: m, height: _, widths: p, heights: v, lineWidths: x } = Fy(a, g),
      E = m + f,
      w = [],
      P = (E + 2) * h[0],
      b = (_ + f) * h[1],
      S = { width: P < 0 ? Math.floor(P) : Math.ceil(P), height: b < 0 ? Math.floor(b) : Math.ceil(b), contextInstructions: w };
    (h[0] != 1 || h[1] != 1) && w.push('scale', h),
      s &&
        (w.push('strokeStyle', o.strokeStyle),
        w.push('lineWidth', f),
        w.push('lineCap', o.lineCap),
        w.push('lineJoin', o.lineJoin),
        w.push('miterLimit', o.miterLimit),
        w.push('setLineDash', [o.lineDash]),
        w.push('lineDashOffset', o.lineDashOffset)),
      n && w.push('fillStyle', l.fillStyle),
      w.push('textBaseline', 'middle'),
      w.push('textAlign', 'center');
    const k = 0.5 - d;
    let W = d * E + k * f;
    const Q = [],
      $ = [];
    let ee = 0,
      Ee = 0,
      K = 0,
      U = 0,
      O;
    for (let j = 0, le = g.length; j < le; j += 2) {
      const ue = g[j];
      if (
        ue ===
        `
`
      ) {
        (Ee += ee), (ee = 0), (W = d * E + k * f), ++U;
        continue;
      }
      const xe = g[j + 1] || a.font;
      xe !== O && (s && Q.push('font', xe), n && $.push('font', xe), (O = xe)), (ee = Math.max(ee, v[K]));
      const M = [ue, W + k * p[K] + d * (p[K] - x[U]), 0.5 * (f + ee) + Ee];
      (W += p[K]), s && Q.push('strokeText', M), n && $.push('fillText', M), ++K;
    }
    return Array.prototype.push.apply(w, Q), Array.prototype.push.apply(w, $), (this.labels_[r] = S), S;
  }
  replayTextBackground_(e, t, n, s, r, o, l) {
    e.beginPath(),
      e.moveTo.apply(e, t),
      e.lineTo.apply(e, n),
      e.lineTo.apply(e, s),
      e.lineTo.apply(e, r),
      e.lineTo.apply(e, t),
      o && ((this.alignFill_ = o[2]), this.fill_(e)),
      l && (this.setStrokeStyle_(e, l), e.stroke());
  }
  calculateImageOrLabelDimensions_(e, t, n, s, r, o, l, a, c, h, u, d, f, g, m, _) {
    (l *= d[0]), (a *= d[1]);
    let p = n - l,
      v = s - a;
    const x = r + c > e ? e - c : r,
      E = o + h > t ? t - h : o,
      w = g[3] + x * d[0] + g[1],
      P = g[0] + E * d[1] + g[2],
      b = p - g[3],
      S = v - g[0];
    (m || u !== 0) &&
      ((oi[0] = b), (li[0] = b), (oi[1] = S), (Xt[1] = S), (Xt[0] = b + w), (jt[0] = Xt[0]), (jt[1] = S + P), (li[1] = jt[1]));
    let k;
    return (
      u !== 0
        ? ((k = wi(wt(), n, s, 1, 1, u, -n, -s)),
          Ne(k, oi),
          Ne(k, Xt),
          Ne(k, jt),
          Ne(k, li),
          kt(
            Math.min(oi[0], Xt[0], jt[0], li[0]),
            Math.min(oi[1], Xt[1], jt[1], li[1]),
            Math.max(oi[0], Xt[0], jt[0], li[0]),
            Math.max(oi[1], Xt[1], jt[1], li[1]),
            ln,
          ))
        : kt(Math.min(b, b + w), Math.min(S, S + P), Math.max(b, b + w), Math.max(S, S + P), ln),
      f && ((p = Math.round(p)), (v = Math.round(v))),
      {
        drawImageX: p,
        drawImageY: v,
        drawImageW: x,
        drawImageH: E,
        originX: c,
        originY: h,
        declutterBox: { minX: ln[0], minY: ln[1], maxX: ln[2], maxY: ln[3], value: _ },
        canvasTransform: k,
        scale: d,
      }
    );
  }
  replayImageOrLabel_(e, t, n, s, r, o, l) {
    const a = !!(o || l),
      c = s.declutterBox,
      h = e.canvas,
      u = l ? (l[2] * s.scale[0]) / 2 : 0;
    return (
      c.minX - u <= h.width / t &&
        c.maxX + u >= 0 &&
        c.minY - u <= h.height / t &&
        c.maxY + u >= 0 &&
        (a && this.replayTextBackground_(e, oi, Xt, jt, li, o, l),
        Dy(e, s.canvasTransform, r, n, s.originX, s.originY, s.drawImageW, s.drawImageH, s.drawImageX, s.drawImageY, s.scale)),
      !0
    );
  }
  fill_(e) {
    if (this.alignFill_) {
      const t = Ne(this.renderedTransform_, [0, 0]),
        n = 512 * this.pixelRatio;
      e.save(), e.translate(t[0] % n, t[1] % n), e.rotate(this.viewRotation_);
    }
    e.fill(), this.alignFill_ && e.restore();
  }
  setStrokeStyle_(e, t) {
    (e.strokeStyle = t[1]),
      (e.lineWidth = t[2]),
      (e.lineCap = t[3]),
      (e.lineJoin = t[4]),
      (e.miterLimit = t[5]),
      (e.lineDashOffset = t[7]),
      e.setLineDash(t[6]);
  }
  drawLabelWithPointPlacement_(e, t, n, s) {
    const r = this.textStates[t],
      o = this.createLabel(e, t, s, n),
      l = this.strokeStates[n],
      a = this.pixelRatio,
      c = _h(Array.isArray(e) ? e[0] : e, r.textAlign || Es),
      h = os[r.textBaseline || Cr],
      u = l && l.lineWidth ? l.lineWidth : 0,
      d = o.width / a - 2 * r.scale[0],
      f = c * d + 2 * (0.5 - c) * u,
      g = (h * o.height) / a + 2 * (0.5 - h) * u;
    return { label: o, anchorX: f, anchorY: g };
  }
  execute_(e, t, n, s, r, o, l, a) {
    let c;
    this.pixelCoordinates_ && Ti(n, this.renderedTransform_)
      ? (c = this.pixelCoordinates_)
      : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []),
        (c = Vi(this.coordinates, 0, this.coordinates.length, 2, n, this.pixelCoordinates_)),
        xp(this.renderedTransform_, n));
    let h = 0;
    const u = s.length;
    let d = 0,
      f,
      g,
      m,
      _,
      p,
      v,
      x,
      E,
      w,
      P,
      b,
      S,
      k = 0,
      W = 0,
      Q = null,
      $ = null;
    const ee = this.coordinateCache_,
      Ee = this.viewRotation_,
      K = Math.round(Math.atan2(-n[1], n[0]) * 1e12) / 1e12,
      U = { context: e, pixelRatio: this.pixelRatio, resolution: this.resolution, rotation: Ee },
      O = this.instructions != s || this.overlaps ? 0 : 200;
    let j, le, ue, xe;
    for (; h < u; ) {
      const M = s[h];
      switch (M[0]) {
        case te.BEGIN_GEOMETRY:
          (j = M[1]), (xe = M[3]), j.getGeometry() ? (l !== void 0 && !Ue(l, xe.getExtent()) ? (h = M[2] + 1) : ++h) : (h = M[2]);
          break;
        case te.BEGIN_PATH:
          k > O && (this.fill_(e), (k = 0)), W > O && (e.stroke(), (W = 0)), !k && !W && (e.beginPath(), (_ = NaN), (p = NaN)), ++h;
          break;
        case te.CIRCLE:
          d = M[1];
          const ge = c[d],
            R = c[d + 1],
            z = c[d + 2],
            G = c[d + 3],
            Y = z - ge,
            ne = G - R,
            ve = Math.sqrt(Y * Y + ne * ne);
          e.moveTo(ge + ve, R), e.arc(ge, R, ve, 0, 2 * Math.PI, !0), ++h;
          break;
        case te.CLOSE_PATH:
          e.closePath(), ++h;
          break;
        case te.CUSTOM:
          (d = M[1]), (f = M[2]);
          const se = M[3],
            y = M[4],
            C = M.length == 6 ? M[5] : void 0;
          (U.geometry = se), (U.feature = j), h in ee || (ee[h] = []);
          const T = ee[h];
          C ? C(c, d, f, 2, T) : ((T[0] = c[d]), (T[1] = c[d + 1]), (T.length = 2)), y(T, U), ++h;
          break;
        case te.DRAW_IMAGE:
          (d = M[1]), (f = M[2]), (E = M[3]), (g = M[4]), (m = M[5]);
          let I = M[6];
          const L = M[7],
            D = M[8],
            B = M[9],
            F = M[10];
          let N = M[11];
          const A = M[12];
          let V = M[13];
          const X = M[14],
            H = M[15];
          if (!E && M.length >= 20) {
            (w = M[19]), (P = M[20]), (b = M[21]), (S = M[22]);
            const it = this.drawLabelWithPointPlacement_(w, P, b, S);
            (E = it.label), (M[3] = E);
            const nn = M[23];
            (g = (it.anchorX - nn) * this.pixelRatio), (M[4] = g);
            const ot = M[24];
            (m = (it.anchorY - ot) * this.pixelRatio), (M[5] = m), (I = E.height), (M[6] = I), (V = E.width), (M[13] = V);
          }
          let Z;
          M.length > 25 && (Z = M[25]);
          let re, me, de;
          M.length > 17 ? ((re = M[16]), (me = M[17]), (de = M[18])) : ((re = Bi), (me = !1), (de = !1)),
            F && K ? (N += Ee) : !F && !K && (N -= Ee);
          let Se = 0;
          for (; d < f; d += 2) {
            if (Z && Z[Se++] < V / this.pixelRatio) continue;
            const it = this.calculateImageOrLabelDimensions_(E.width, E.height, c[d], c[d + 1], V, I, g, m, D, B, N, A, r, re, me || de, j),
              nn = [e, t, E, it, L, me ? Q : null, de ? $ : null];
            if (a) {
              if (X === 'none') continue;
              if (X === 'obstacle') {
                a.insert(it.declutterBox);
                continue;
              } else {
                let ot, Wt;
                if (H) {
                  const nt = f - d;
                  if (!H[nt]) {
                    H[nt] = nn;
                    continue;
                  }
                  if (((ot = H[nt]), delete H[nt], (Wt = mh(ot)), a.collides(Wt))) continue;
                }
                if (a.collides(it.declutterBox)) continue;
                ot && (a.insert(Wt), this.replayImageOrLabel_.apply(this, ot)), a.insert(it.declutterBox);
              }
            }
            this.replayImageOrLabel_.apply(this, nn);
          }
          ++h;
          break;
        case te.DRAW_CHARS:
          const ze = M[1],
            Le = M[2],
            en = M[3],
            Ri = M[4];
          S = M[5];
          const As = M[6],
            Be = M[7],
            tt = M[8];
          b = M[9];
          const tn = M[10];
          (w = M[11]), (P = M[12]);
          const Ba = [M[13], M[13]],
            no = this.textStates[P],
            Xn = no.font,
            jn = [no.scale[0] * Be, no.scale[1] * Be];
          let Yn;
          Xn in this.widths_ ? (Yn = this.widths_[Xn]) : ((Yn = {}), (this.widths_[Xn] = Yn));
          const Xa = fd(c, ze, Le, 2),
            ja = Math.abs(jn[0]) * ih(Xn, w, Yn);
          if (Ri || ja <= Xa) {
            const it = this.textStates[P].textAlign,
              nn = (Xa - ja) * os[it],
              ot = A0(c, ze, Le, 2, w, nn, As, Math.abs(jn[0]), ih, Xn, Yn, K ? 0 : this.viewRotation_);
            e: if (ot) {
              const Wt = [];
              let nt, Os, Fs, Je, lt;
              if (b)
                for (nt = 0, Os = ot.length; nt < Os; ++nt) {
                  (lt = ot[nt]),
                    (Fs = lt[4]),
                    (Je = this.createLabel(Fs, P, '', b)),
                    (g = lt[2] + (jn[0] < 0 ? -tn : tn)),
                    (m = en * Je.height + ((0.5 - en) * 2 * tn * jn[1]) / jn[0] - tt);
                  const zt = this.calculateImageOrLabelDimensions_(
                    Je.width,
                    Je.height,
                    lt[0],
                    lt[1],
                    Je.width,
                    Je.height,
                    g,
                    m,
                    0,
                    0,
                    lt[3],
                    Ba,
                    !1,
                    Bi,
                    !1,
                    j,
                  );
                  if (a && a.collides(zt.declutterBox)) break e;
                  Wt.push([e, t, Je, zt, 1, null, null]);
                }
              if (S)
                for (nt = 0, Os = ot.length; nt < Os; ++nt) {
                  (lt = ot[nt]), (Fs = lt[4]), (Je = this.createLabel(Fs, P, S, '')), (g = lt[2]), (m = en * Je.height - tt);
                  const zt = this.calculateImageOrLabelDimensions_(
                    Je.width,
                    Je.height,
                    lt[0],
                    lt[1],
                    Je.width,
                    Je.height,
                    g,
                    m,
                    0,
                    0,
                    lt[3],
                    Ba,
                    !1,
                    Bi,
                    !1,
                    j,
                  );
                  if (a && a.collides(zt.declutterBox)) break e;
                  Wt.push([e, t, Je, zt, 1, null, null]);
                }
              a && a.load(Wt.map(mh));
              for (let zt = 0, af = Wt.length; zt < af; ++zt) this.replayImageOrLabel_.apply(this, Wt[zt]);
            }
          }
          ++h;
          break;
        case te.END_GEOMETRY:
          if (o !== void 0) {
            j = M[1];
            const it = o(j, xe);
            if (it) return it;
          }
          ++h;
          break;
        case te.FILL:
          O ? k++ : this.fill_(e), ++h;
          break;
        case te.MOVE_TO_LINE_TO:
          for (
            d = M[1],
              f = M[2],
              le = c[d],
              ue = c[d + 1],
              v = (le + 0.5) | 0,
              x = (ue + 0.5) | 0,
              (v !== _ || x !== p) && (e.moveTo(le, ue), (_ = v), (p = x)),
              d += 2;
            d < f;
            d += 2
          )
            (le = c[d]),
              (ue = c[d + 1]),
              (v = (le + 0.5) | 0),
              (x = (ue + 0.5) | 0),
              (d == f - 2 || v !== _ || x !== p) && (e.lineTo(le, ue), (_ = v), (p = x));
          ++h;
          break;
        case te.SET_FILL_STYLE:
          (Q = M), (this.alignFill_ = M[2]), k && (this.fill_(e), (k = 0), W && (e.stroke(), (W = 0))), (e.fillStyle = M[1]), ++h;
          break;
        case te.SET_STROKE_STYLE:
          ($ = M), W && (e.stroke(), (W = 0)), this.setStrokeStyle_(e, M), ++h;
          break;
        case te.STROKE:
          O ? W++ : e.stroke(), ++h;
          break;
        default:
          ++h;
          break;
      }
    }
    k && this.fill_(e), W && e.stroke();
  }
  execute(e, t, n, s, r, o) {
    (this.viewRotation_ = s), this.execute_(e, t, n, this.instructions, r, void 0, void 0, o);
  }
  executeHitDetection(e, t, n, s, r) {
    return (this.viewRotation_ = n), this.execute_(e, 1, t, this.hitDetectionInstructions, !0, s, r);
  }
}
const k0 = D0,
  Eo = ['Polygon', 'Circle', 'LineString', 'Image', 'Text', 'Default'];
class N0 {
  constructor(e, t, n, s, r, o) {
    (this.maxExtent_ = e),
      (this.overlaps_ = s),
      (this.pixelRatio_ = n),
      (this.resolution_ = t),
      (this.renderBuffer_ = o),
      (this.executorsByZIndex_ = {}),
      (this.hitDetectionContext_ = null),
      (this.hitDetectionTransform_ = wt()),
      this.createExecutors_(r);
  }
  clip(e, t) {
    const n = this.getClipCoords(t);
    e.beginPath(), e.moveTo(n[0], n[1]), e.lineTo(n[2], n[3]), e.lineTo(n[4], n[5]), e.lineTo(n[6], n[7]), e.clip();
  }
  createExecutors_(e) {
    for (const t in e) {
      let n = this.executorsByZIndex_[t];
      n === void 0 && ((n = {}), (this.executorsByZIndex_[t] = n));
      const s = e[t];
      for (const r in s) {
        const o = s[r];
        n[r] = new k0(this.resolution_, this.pixelRatio_, this.overlaps_, o);
      }
    }
  }
  hasExecutors(e) {
    for (const t in this.executorsByZIndex_) {
      const n = this.executorsByZIndex_[t];
      for (let s = 0, r = e.length; s < r; ++s) if (e[s] in n) return !0;
    }
    return !1;
  }
  forEachFeatureAtCoordinate(e, t, n, s, r, o) {
    s = Math.round(s);
    const l = s * 2 + 1,
      a = wi(this.hitDetectionTransform_, s + 0.5, s + 0.5, 1 / t, -1 / t, -n, -e[0], -e[1]),
      c = !this.hitDetectionContext_;
    c && (this.hitDetectionContext_ = qe(l, l, void 0, { willReadFrequently: !0 }));
    const h = this.hitDetectionContext_;
    h.canvas.width !== l || h.canvas.height !== l ? ((h.canvas.width = l), (h.canvas.height = l)) : c || h.clearRect(0, 0, l, l);
    let u;
    this.renderBuffer_ !== void 0 && ((u = gt()), ns(u, e), Ql(u, t * (this.renderBuffer_ + s), u));
    const d = G0(s);
    let f;
    function g(w, P) {
      const b = h.getImageData(0, 0, l, l).data;
      for (let S = 0, k = d.length; S < k; S++)
        if (b[d[S]] > 0) {
          if (!o || (f !== 'Image' && f !== 'Text') || o.includes(w)) {
            const W = (d[S] - 3) / 4,
              Q = s - (W % l),
              $ = s - ((W / l) | 0),
              ee = r(w, P, Q * Q + $ * $);
            if (ee) return ee;
          }
          h.clearRect(0, 0, l, l);
          break;
        }
    }
    const m = Object.keys(this.executorsByZIndex_).map(Number);
    m.sort(Hi);
    let _, p, v, x, E;
    for (_ = m.length - 1; _ >= 0; --_) {
      const w = m[_].toString();
      for (v = this.executorsByZIndex_[w], p = Eo.length - 1; p >= 0; --p)
        if (((f = Eo[p]), (x = v[f]), x !== void 0 && ((E = x.executeHitDetection(h, a, n, g, u)), E))) return E;
    }
  }
  getClipCoords(e) {
    const t = this.maxExtent_;
    if (!t) return null;
    const n = t[0],
      s = t[1],
      r = t[2],
      o = t[3],
      l = [n, s, n, o, r, o, r, s];
    return Vi(l, 0, 8, 2, e, l), l;
  }
  isEmpty() {
    return An(this.executorsByZIndex_);
  }
  execute(e, t, n, s, r, o, l) {
    const a = Object.keys(this.executorsByZIndex_).map(Number);
    a.sort(Hi), this.maxExtent_ && (e.save(), this.clip(e, n)), (o = o || Eo);
    let c, h, u, d, f, g;
    for (l && a.reverse(), c = 0, h = a.length; c < h; ++c) {
      const m = a[c].toString();
      for (f = this.executorsByZIndex_[m], u = 0, d = o.length; u < d; ++u) {
        const _ = o[u];
        (g = f[_]), g !== void 0 && g.execute(e, t, n, s, r, l);
      }
    }
    this.maxExtent_ && e.restore();
  }
}
const Co = {};
function G0(i) {
  if (Co[i] !== void 0) return Co[i];
  const e = i * 2 + 1,
    t = i * i,
    n = new Array(t + 1);
  for (let r = 0; r <= i; ++r)
    for (let o = 0; o <= i; ++o) {
      const l = r * r + o * o;
      if (l > t) break;
      let a = n[l];
      a || ((a = []), (n[l] = a)),
        a.push(((i + r) * e + (i + o)) * 4 + 3),
        r > 0 && a.push(((i - r) * e + (i + o)) * 4 + 3),
        o > 0 && (a.push(((i + r) * e + (i - o)) * 4 + 3), r > 0 && a.push(((i - r) * e + (i - o)) * 4 + 3));
    }
  const s = [];
  for (let r = 0, o = n.length; r < o; ++r) n[r] && s.push(...n[r]);
  return (Co[i] = s), s;
}
const ph = N0;
class W0 extends Td {
  constructor(e, t, n, s, r, o, l) {
    super(),
      (this.context_ = e),
      (this.pixelRatio_ = t),
      (this.extent_ = n),
      (this.transform_ = s),
      (this.transformRotation_ = s ? na(Math.atan2(s[1], s[0]), 10) : 0),
      (this.viewRotation_ = r),
      (this.squaredTolerance_ = o),
      (this.userTransform_ = l),
      (this.contextFillState_ = null),
      (this.contextStrokeState_ = null),
      (this.contextTextState_ = null),
      (this.fillState_ = null),
      (this.strokeState_ = null),
      (this.image_ = null),
      (this.imageAnchorX_ = 0),
      (this.imageAnchorY_ = 0),
      (this.imageHeight_ = 0),
      (this.imageOpacity_ = 0),
      (this.imageOriginX_ = 0),
      (this.imageOriginY_ = 0),
      (this.imageRotateWithView_ = !1),
      (this.imageRotation_ = 0),
      (this.imageScale_ = [0, 0]),
      (this.imageWidth_ = 0),
      (this.text_ = ''),
      (this.textOffsetX_ = 0),
      (this.textOffsetY_ = 0),
      (this.textRotateWithView_ = !1),
      (this.textRotation_ = 0),
      (this.textScale_ = [0, 0]),
      (this.textFillState_ = null),
      (this.textStrokeState_ = null),
      (this.textState_ = null),
      (this.pixelCoordinates_ = []),
      (this.tmpLocalTransform_ = wt());
  }
  drawImages_(e, t, n, s) {
    if (!this.image_) return;
    const r = Vi(e, t, n, s, this.transform_, this.pixelCoordinates_),
      o = this.context_,
      l = this.tmpLocalTransform_,
      a = o.globalAlpha;
    this.imageOpacity_ != 1 && (o.globalAlpha = a * this.imageOpacity_);
    let c = this.imageRotation_;
    this.transformRotation_ === 0 && (c -= this.viewRotation_), this.imageRotateWithView_ && (c += this.viewRotation_);
    for (let h = 0, u = r.length; h < u; h += 2) {
      const d = r[h] - this.imageAnchorX_,
        f = r[h + 1] - this.imageAnchorY_;
      if (c !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const g = d + this.imageAnchorX_,
          m = f + this.imageAnchorY_;
        wi(l, g, m, 1, 1, c, -g, -m),
          o.setTransform.apply(o, l),
          o.translate(g, m),
          o.scale(this.imageScale_[0], this.imageScale_[1]),
          o.drawImage(
            this.image_,
            this.imageOriginX_,
            this.imageOriginY_,
            this.imageWidth_,
            this.imageHeight_,
            -this.imageAnchorX_,
            -this.imageAnchorY_,
            this.imageWidth_,
            this.imageHeight_,
          ),
          o.setTransform(1, 0, 0, 1, 0, 0);
      } else
        o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          d,
          f,
          this.imageWidth_,
          this.imageHeight_,
        );
    }
    this.imageOpacity_ != 1 && (o.globalAlpha = a);
  }
  drawText_(e, t, n, s) {
    if (!this.textState_ || this.text_ === '') return;
    this.textFillState_ && this.setContextFillState_(this.textFillState_),
      this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_),
      this.setContextTextState_(this.textState_);
    const r = Vi(e, t, n, s, this.transform_, this.pixelCoordinates_),
      o = this.context_;
    let l = this.textRotation_;
    for (this.transformRotation_ === 0 && (l -= this.viewRotation_), this.textRotateWithView_ && (l += this.viewRotation_); t < n; t += s) {
      const a = r[t] + this.textOffsetX_,
        c = r[t + 1] + this.textOffsetY_;
      l !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1
        ? (o.translate(a - this.textOffsetX_, c - this.textOffsetY_),
          o.rotate(l),
          o.translate(this.textOffsetX_, this.textOffsetY_),
          o.scale(this.textScale_[0], this.textScale_[1]),
          this.textStrokeState_ && o.strokeText(this.text_, 0, 0),
          this.textFillState_ && o.fillText(this.text_, 0, 0),
          o.setTransform(1, 0, 0, 1, 0, 0))
        : (this.textStrokeState_ && o.strokeText(this.text_, a, c), this.textFillState_ && o.fillText(this.text_, a, c));
    }
  }
  moveToLineTo_(e, t, n, s, r) {
    const o = this.context_,
      l = Vi(e, t, n, s, this.transform_, this.pixelCoordinates_);
    o.moveTo(l[0], l[1]);
    let a = l.length;
    r && (a -= 2);
    for (let c = 2; c < a; c += 2) o.lineTo(l[c], l[c + 1]);
    return r && o.closePath(), n;
  }
  drawRings_(e, t, n, s) {
    for (let r = 0, o = n.length; r < o; ++r) t = this.moveToLineTo_(e, t, n[r], s, !0);
    return t;
  }
  drawCircle(e) {
    if (Ue(this.extent_, e.getExtent())) {
      if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const t = sy(e, this.transform_, this.pixelCoordinates_),
          n = t[2] - t[0],
          s = t[3] - t[1],
          r = Math.sqrt(n * n + s * s),
          o = this.context_;
        o.beginPath(), o.arc(t[0], t[1], r, 0, 2 * Math.PI), this.fillState_ && o.fill(), this.strokeState_ && o.stroke();
      }
      this.text_ !== '' && this.drawText_(e.getCenter(), 0, 2, 2);
    }
  }
  setStyle(e) {
    this.setFillStrokeStyle(e.getFill(), e.getStroke()), this.setImageStyle(e.getImage()), this.setTextStyle(e.getText());
  }
  setTransform(e) {
    this.transform_ = e;
  }
  drawGeometry(e) {
    switch (e.getType()) {
      case 'Point':
        this.drawPoint(e);
        break;
      case 'LineString':
        this.drawLineString(e);
        break;
      case 'Polygon':
        this.drawPolygon(e);
        break;
      case 'MultiPoint':
        this.drawMultiPoint(e);
        break;
      case 'MultiLineString':
        this.drawMultiLineString(e);
        break;
      case 'MultiPolygon':
        this.drawMultiPolygon(e);
        break;
      case 'GeometryCollection':
        this.drawGeometryCollection(e);
        break;
      case 'Circle':
        this.drawCircle(e);
        break;
    }
  }
  drawFeature(e, t) {
    const n = t.getGeometryFunction()(e);
    !n || !Ue(this.extent_, n.getExtent()) || (this.setStyle(t), this.drawGeometry(n));
  }
  drawGeometryCollection(e) {
    const t = e.getGeometriesArray();
    for (let n = 0, s = t.length; n < s; ++n) this.drawGeometry(t[n]);
  }
  drawPoint(e) {
    this.squaredTolerance_ && (e = e.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
    const t = e.getFlatCoordinates(),
      n = e.getStride();
    this.image_ && this.drawImages_(t, 0, t.length, n), this.text_ !== '' && this.drawText_(t, 0, t.length, n);
  }
  drawMultiPoint(e) {
    this.squaredTolerance_ && (e = e.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
    const t = e.getFlatCoordinates(),
      n = e.getStride();
    this.image_ && this.drawImages_(t, 0, t.length, n), this.text_ !== '' && this.drawText_(t, 0, t.length, n);
  }
  drawLineString(e) {
    if (
      (this.squaredTolerance_ && (e = e.simplifyTransformed(this.squaredTolerance_, this.userTransform_)),
      !!Ue(this.extent_, e.getExtent()))
    ) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const t = this.context_,
          n = e.getFlatCoordinates();
        t.beginPath(), this.moveToLineTo_(n, 0, n.length, e.getStride(), !1), t.stroke();
      }
      if (this.text_ !== '') {
        const t = e.getFlatMidpoint();
        this.drawText_(t, 0, 2, 2);
      }
    }
  }
  drawMultiLineString(e) {
    this.squaredTolerance_ && (e = e.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
    const t = e.getExtent();
    if (Ue(this.extent_, t)) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const n = this.context_,
          s = e.getFlatCoordinates();
        let r = 0;
        const o = e.getEnds(),
          l = e.getStride();
        n.beginPath();
        for (let a = 0, c = o.length; a < c; ++a) r = this.moveToLineTo_(s, r, o[a], l, !1);
        n.stroke();
      }
      if (this.text_ !== '') {
        const n = e.getFlatMidpoints();
        this.drawText_(n, 0, n.length, 2);
      }
    }
  }
  drawPolygon(e) {
    if (
      (this.squaredTolerance_ && (e = e.simplifyTransformed(this.squaredTolerance_, this.userTransform_)),
      !!Ue(this.extent_, e.getExtent()))
    ) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const t = this.context_;
        t.beginPath(),
          this.drawRings_(e.getOrientedFlatCoordinates(), 0, e.getEnds(), e.getStride()),
          this.fillState_ && t.fill(),
          this.strokeState_ && t.stroke();
      }
      if (this.text_ !== '') {
        const t = e.getFlatInteriorPoint();
        this.drawText_(t, 0, 2, 2);
      }
    }
  }
  drawMultiPolygon(e) {
    if (
      (this.squaredTolerance_ && (e = e.simplifyTransformed(this.squaredTolerance_, this.userTransform_)),
      !!Ue(this.extent_, e.getExtent()))
    ) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const t = this.context_,
          n = e.getOrientedFlatCoordinates();
        let s = 0;
        const r = e.getEndss(),
          o = e.getStride();
        t.beginPath();
        for (let l = 0, a = r.length; l < a; ++l) {
          const c = r[l];
          s = this.drawRings_(n, s, c, o);
        }
        this.fillState_ && t.fill(), this.strokeState_ && t.stroke();
      }
      if (this.text_ !== '') {
        const t = e.getFlatInteriorPoints();
        this.drawText_(t, 0, t.length, 2);
      }
    }
  }
  setContextFillState_(e) {
    const t = this.context_,
      n = this.contextFillState_;
    n
      ? n.fillStyle != e.fillStyle && ((n.fillStyle = e.fillStyle), (t.fillStyle = e.fillStyle))
      : ((t.fillStyle = e.fillStyle), (this.contextFillState_ = { fillStyle: e.fillStyle }));
  }
  setContextStrokeState_(e) {
    const t = this.context_,
      n = this.contextStrokeState_;
    n
      ? (n.lineCap != e.lineCap && ((n.lineCap = e.lineCap), (t.lineCap = e.lineCap)),
        Ti(n.lineDash, e.lineDash) || t.setLineDash((n.lineDash = e.lineDash)),
        n.lineDashOffset != e.lineDashOffset && ((n.lineDashOffset = e.lineDashOffset), (t.lineDashOffset = e.lineDashOffset)),
        n.lineJoin != e.lineJoin && ((n.lineJoin = e.lineJoin), (t.lineJoin = e.lineJoin)),
        n.lineWidth != e.lineWidth && ((n.lineWidth = e.lineWidth), (t.lineWidth = e.lineWidth)),
        n.miterLimit != e.miterLimit && ((n.miterLimit = e.miterLimit), (t.miterLimit = e.miterLimit)),
        n.strokeStyle != e.strokeStyle && ((n.strokeStyle = e.strokeStyle), (t.strokeStyle = e.strokeStyle)))
      : ((t.lineCap = e.lineCap),
        t.setLineDash(e.lineDash),
        (t.lineDashOffset = e.lineDashOffset),
        (t.lineJoin = e.lineJoin),
        (t.lineWidth = e.lineWidth),
        (t.miterLimit = e.miterLimit),
        (t.strokeStyle = e.strokeStyle),
        (this.contextStrokeState_ = {
          lineCap: e.lineCap,
          lineDash: e.lineDash,
          lineDashOffset: e.lineDashOffset,
          lineJoin: e.lineJoin,
          lineWidth: e.lineWidth,
          miterLimit: e.miterLimit,
          strokeStyle: e.strokeStyle,
        }));
  }
  setContextTextState_(e) {
    const t = this.context_,
      n = this.contextTextState_,
      s = e.textAlign ? e.textAlign : Es;
    n
      ? (n.font != e.font && ((n.font = e.font), (t.font = e.font)),
        n.textAlign != s && ((n.textAlign = s), (t.textAlign = s)),
        n.textBaseline != e.textBaseline && ((n.textBaseline = e.textBaseline), (t.textBaseline = e.textBaseline)))
      : ((t.font = e.font),
        (t.textAlign = s),
        (t.textBaseline = e.textBaseline),
        (this.contextTextState_ = { font: e.font, textAlign: s, textBaseline: e.textBaseline }));
  }
  setFillStrokeStyle(e, t) {
    if (!e) this.fillState_ = null;
    else {
      const n = e.getColor();
      this.fillState_ = { fillStyle: Ft(n || ti) };
    }
    if (!t) this.strokeState_ = null;
    else {
      const n = t.getColor(),
        s = t.getLineCap(),
        r = t.getLineDash(),
        o = t.getLineDashOffset(),
        l = t.getLineJoin(),
        a = t.getWidth(),
        c = t.getMiterLimit(),
        h = r || ps;
      this.strokeState_ = {
        lineCap: s !== void 0 ? s : Er,
        lineDash: this.pixelRatio_ === 1 ? h : h.map((u) => u * this.pixelRatio_),
        lineDashOffset: (o || ys) * this.pixelRatio_,
        lineJoin: l !== void 0 ? l : On,
        lineWidth: (a !== void 0 ? a : Cs) * this.pixelRatio_,
        miterLimit: c !== void 0 ? c : xs,
        strokeStyle: Ft(n || vs),
      };
    }
  }
  setImageStyle(e) {
    let t;
    if (!e || !(t = e.getSize())) {
      this.image_ = null;
      return;
    }
    const n = e.getPixelRatio(this.pixelRatio_),
      s = e.getAnchor(),
      r = e.getOrigin();
    (this.image_ = e.getImage(this.pixelRatio_)),
      (this.imageAnchorX_ = s[0] * n),
      (this.imageAnchorY_ = s[1] * n),
      (this.imageHeight_ = t[1] * n),
      (this.imageOpacity_ = e.getOpacity()),
      (this.imageOriginX_ = r[0]),
      (this.imageOriginY_ = r[1]),
      (this.imageRotateWithView_ = e.getRotateWithView()),
      (this.imageRotation_ = e.getRotation());
    const o = e.getScaleArray();
    (this.imageScale_ = [(o[0] * this.pixelRatio_) / n, (o[1] * this.pixelRatio_) / n]), (this.imageWidth_ = t[0] * n);
  }
  setTextStyle(e) {
    if (!e) this.text_ = '';
    else {
      const t = e.getFill();
      if (!t) this.textFillState_ = null;
      else {
        const f = t.getColor();
        this.textFillState_ = { fillStyle: Ft(f || ti) };
      }
      const n = e.getStroke();
      if (!n) this.textStrokeState_ = null;
      else {
        const f = n.getColor(),
          g = n.getLineCap(),
          m = n.getLineDash(),
          _ = n.getLineDashOffset(),
          p = n.getLineJoin(),
          v = n.getWidth(),
          x = n.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: g !== void 0 ? g : Er,
          lineDash: m || ps,
          lineDashOffset: _ || ys,
          lineJoin: p !== void 0 ? p : On,
          lineWidth: v !== void 0 ? v : Cs,
          miterLimit: x !== void 0 ? x : xs,
          strokeStyle: Ft(f || vs),
        };
      }
      const s = e.getFont(),
        r = e.getOffsetX(),
        o = e.getOffsetY(),
        l = e.getRotateWithView(),
        a = e.getRotation(),
        c = e.getScaleArray(),
        h = e.getText(),
        u = e.getTextAlign(),
        d = e.getTextBaseline();
      (this.textState_ = { font: s !== void 0 ? s : yd, textAlign: u !== void 0 ? u : Es, textBaseline: d !== void 0 ? d : Cr }),
        (this.text_ = h !== void 0 ? (Array.isArray(h) ? h.reduce((f, g, m) => (f += m % 2 ? ' ' : g), '') : h) : ''),
        (this.textOffsetX_ = r !== void 0 ? this.pixelRatio_ * r : 0),
        (this.textOffsetY_ = o !== void 0 ? this.pixelRatio_ * o : 0),
        (this.textRotateWithView_ = l !== void 0 ? l : !1),
        (this.textRotation_ = a !== void 0 ? a : 0),
        (this.textScale_ = [this.pixelRatio_ * c[0], this.pixelRatio_ * c[1]]);
    }
  }
}
const Pa = W0,
  Ot = 0.5;
function z0(i, e, t, n, s, r, o) {
  const l = i[0] * Ot,
    a = i[1] * Ot,
    c = qe(l, a);
  c.imageSmoothingEnabled = !1;
  const h = c.canvas,
    u = new Pa(c, Ot, s, null, o),
    d = t.length,
    f = Math.floor((256 * 256 * 256 - 1) / d),
    g = {};
  for (let _ = 1; _ <= d; ++_) {
    const p = t[_ - 1],
      v = p.getStyleFunction() || n;
    if (!n) continue;
    let x = v(p, r);
    if (!x) continue;
    Array.isArray(x) || (x = [x]);
    const w = (_ * f).toString(16).padStart(7, '#00000');
    for (let P = 0, b = x.length; P < b; ++P) {
      const S = x[P],
        k = S.getGeometryFunction()(p);
      if (!k || !Ue(s, k.getExtent())) continue;
      const W = S.clone(),
        Q = W.getFill();
      Q && Q.setColor(w);
      const $ = W.getStroke();
      $ && ($.setColor(w), $.setLineDash(null)), W.setText(void 0);
      const ee = S.getImage();
      if (ee && ee.getOpacity() !== 0) {
        const O = ee.getImageSize();
        if (!O) continue;
        const j = qe(O[0], O[1], void 0, { alpha: !1 }),
          le = j.canvas;
        (j.fillStyle = w),
          j.fillRect(0, 0, le.width, le.height),
          W.setImage(
            new eo({
              img: le,
              imgSize: O,
              anchor: ee.getAnchor(),
              anchorXUnits: 'pixels',
              anchorYUnits: 'pixels',
              offset: ee.getOrigin(),
              opacity: 1,
              size: ee.getSize(),
              scale: ee.getScale(),
              rotation: ee.getRotation(),
              rotateWithView: ee.getRotateWithView(),
            }),
          );
      }
      const Ee = W.getZIndex() || 0;
      let K = g[Ee];
      K || ((K = {}), (g[Ee] = K), (K.Polygon = []), (K.Circle = []), (K.LineString = []), (K.Point = []));
      const U = k.getType();
      if (U === 'GeometryCollection') {
        const O = k.getGeometriesArrayRecursive();
        for (let j = 0, le = O.length; j < le; ++j) {
          const ue = O[j];
          K[ue.getType().replace('Multi', '')].push(ue, W);
        }
      } else K[U.replace('Multi', '')].push(k, W);
    }
  }
  const m = Object.keys(g).map(Number).sort(Hi);
  for (let _ = 0, p = m.length; _ < p; ++_) {
    const v = g[m[_]];
    for (const x in v) {
      const E = v[x];
      for (let w = 0, P = E.length; w < P; w += 2) {
        u.setStyle(E[w + 1]);
        for (let b = 0, S = e.length; b < S; ++b) u.setTransform(e[b]), u.drawGeometry(E[w]);
      }
    }
  }
  return c.getImageData(0, 0, h.width, h.height);
}
function B0(i, e, t) {
  const n = [];
  if (t) {
    const s = Math.floor(Math.round(i[0]) * Ot),
      r = Math.floor(Math.round(i[1]) * Ot),
      o = (Fe(s, 0, t.width - 1) + Fe(r, 0, t.height - 1) * t.width) * 4,
      l = t.data[o],
      a = t.data[o + 1],
      h = t.data[o + 2] + 256 * (a + 256 * l),
      u = Math.floor((256 * 256 * 256 - 1) / e.length);
    h && h % u === 0 && n.push(e[h / u - 1]);
  }
  return n;
}
const X0 = 0.5,
  Id = {
    Point: q0,
    LineString: K0,
    Polygon: Q0,
    MultiPoint: J0,
    MultiLineString: Z0,
    MultiPolygon: $0,
    GeometryCollection: H0,
    Circle: U0,
  };
function j0(i, e) {
  return parseInt(fe(i), 10) - parseInt(fe(e), 10);
}
function Y0(i, e) {
  const t = fl(i, e);
  return t * t;
}
function fl(i, e) {
  return (X0 * i) / e;
}
function U0(i, e, t, n, s) {
  const r = t.getFill(),
    o = t.getStroke();
  if (r || o) {
    const a = i.getBuilder(t.getZIndex(), 'Circle');
    a.setFillStrokeStyle(r, o), a.drawCircle(e, n);
  }
  const l = t.getText();
  if (l && l.getText()) {
    const a = (s || i).getBuilder(t.getZIndex(), 'Text');
    a.setTextStyle(l), a.drawText(e, n);
  }
}
function yh(i, e, t, n, s, r, o) {
  let l = !1;
  const a = t.getImage();
  if (a) {
    const c = a.getImageState();
    c == De.LOADED || c == De.ERROR ? a.unlistenImageChange(s) : (c == De.IDLE && a.load(), a.listenImageChange(s), (l = !0));
  }
  return V0(i, e, t, n, r, o), l;
}
function V0(i, e, t, n, s, r) {
  const o = t.getGeometryFunction()(e);
  if (!o) return;
  const l = o.simplifyTransformed(n, s);
  if (t.getRenderer()) Ld(i, l, t, e);
  else {
    const c = Id[l.getType()];
    c(i, l, t, e, r);
  }
}
function Ld(i, e, t, n) {
  if (e.getType() == 'GeometryCollection') {
    const r = e.getGeometries();
    for (let o = 0, l = r.length; o < l; ++o) Ld(i, r[o], t, n);
    return;
  }
  i.getBuilder(t.getZIndex(), 'Default').drawCustom(e, n, t.getRenderer(), t.getHitDetectionRenderer());
}
function H0(i, e, t, n, s) {
  const r = e.getGeometriesArray();
  let o, l;
  for (o = 0, l = r.length; o < l; ++o) {
    const a = Id[r[o].getType()];
    a(i, r[o], t, n, s);
  }
}
function K0(i, e, t, n, s) {
  const r = t.getStroke();
  if (r) {
    const l = i.getBuilder(t.getZIndex(), 'LineString');
    l.setFillStrokeStyle(null, r), l.drawLineString(e, n);
  }
  const o = t.getText();
  if (o && o.getText()) {
    const l = (s || i).getBuilder(t.getZIndex(), 'Text');
    l.setTextStyle(o), l.drawText(e, n);
  }
}
function Z0(i, e, t, n, s) {
  const r = t.getStroke();
  if (r) {
    const l = i.getBuilder(t.getZIndex(), 'LineString');
    l.setFillStrokeStyle(null, r), l.drawMultiLineString(e, n);
  }
  const o = t.getText();
  if (o && o.getText()) {
    const l = (s || i).getBuilder(t.getZIndex(), 'Text');
    l.setTextStyle(o), l.drawText(e, n);
  }
}
function $0(i, e, t, n, s) {
  const r = t.getFill(),
    o = t.getStroke();
  if (o || r) {
    const a = i.getBuilder(t.getZIndex(), 'Polygon');
    a.setFillStrokeStyle(r, o), a.drawMultiPolygon(e, n);
  }
  const l = t.getText();
  if (l && l.getText()) {
    const a = (s || i).getBuilder(t.getZIndex(), 'Text');
    a.setTextStyle(l), a.drawText(e, n);
  }
}
function q0(i, e, t, n, s) {
  const r = t.getImage(),
    o = t.getText();
  let l;
  if (r) {
    if (r.getImageState() != De.LOADED) return;
    let a = i;
    if (s) {
      const h = r.getDeclutterMode();
      if (h !== 'none')
        if (((a = s), h === 'obstacle')) {
          const u = i.getBuilder(t.getZIndex(), 'Image');
          u.setImageStyle(r, l), u.drawPoint(e, n);
        } else o && o.getText() && (l = {});
    }
    const c = a.getBuilder(t.getZIndex(), 'Image');
    c.setImageStyle(r, l), c.drawPoint(e, n);
  }
  if (o && o.getText()) {
    let a = i;
    s && (a = s);
    const c = a.getBuilder(t.getZIndex(), 'Text');
    c.setTextStyle(o, l), c.drawText(e, n);
  }
}
function J0(i, e, t, n, s) {
  const r = t.getImage(),
    o = t.getText();
  let l;
  if (r) {
    if (r.getImageState() != De.LOADED) return;
    let a = i;
    if (s) {
      const h = r.getDeclutterMode();
      if (h !== 'none')
        if (((a = s), h === 'obstacle')) {
          const u = i.getBuilder(t.getZIndex(), 'Image');
          u.setImageStyle(r, l), u.drawMultiPoint(e, n);
        } else o && o.getText() && (l = {});
    }
    const c = a.getBuilder(t.getZIndex(), 'Image');
    c.setImageStyle(r, l), c.drawMultiPoint(e, n);
  }
  if (o && o.getText()) {
    let a = i;
    s && (a = s);
    const c = a.getBuilder(t.getZIndex(), 'Text');
    c.setTextStyle(o, l), c.drawText(e, n);
  }
}
function Q0(i, e, t, n, s) {
  const r = t.getFill(),
    o = t.getStroke();
  if (r || o) {
    const a = i.getBuilder(t.getZIndex(), 'Polygon');
    a.setFillStrokeStyle(r, o), a.drawPolygon(e, n);
  }
  const l = t.getText();
  if (l && l.getText()) {
    const a = (s || i).getBuilder(t.getZIndex(), 'Text');
    a.setTextStyle(l), a.drawText(e, n);
  }
}
class ex extends bd {
  constructor(e) {
    super(e),
      (this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this)),
      this.animatingOrInteracting_,
      (this.hitDetectionImageData_ = null),
      (this.renderedFeatures_ = null),
      (this.renderedRevision_ = -1),
      (this.renderedResolution_ = NaN),
      (this.renderedExtent_ = gt()),
      (this.wrappedRenderedExtent_ = gt()),
      this.renderedRotation_,
      (this.renderedCenter_ = null),
      (this.renderedProjection_ = null),
      (this.renderedRenderOrder_ = null),
      (this.replayGroup_ = null),
      (this.replayGroupChanged = !0),
      (this.declutterExecutorGroup = null),
      (this.clipping = !0),
      (this.compositionContext_ = null),
      (this.opacity_ = 1);
  }
  renderWorlds(e, t, n) {
    const s = t.extent,
      r = t.viewState,
      o = r.center,
      l = r.resolution,
      a = r.projection,
      c = r.rotation,
      h = a.getExtent(),
      u = this.getLayer().getSource(),
      d = t.pixelRatio,
      f = t.viewHints,
      g = !(f[Ye.ANIMATING] || f[Ye.INTERACTING]),
      m = this.compositionContext_,
      _ = Math.round(t.size[0] * d),
      p = Math.round(t.size[1] * d),
      v = u.getWrapX() && a.canWrapX(),
      x = v ? Re(h) : null,
      E = v ? Math.ceil((s[2] - h[2]) / x) + 1 : 1;
    let w = v ? Math.floor((s[0] - h[0]) / x) : 0;
    do {
      const P = this.getRenderTransform(o, l, c, d, _, p, w * x);
      e.execute(m, 1, P, c, g, void 0, n);
    } while (++w < E);
  }
  setupCompositionContext_() {
    if (this.opacity_ !== 1) {
      const e = qe(this.context.canvas.width, this.context.canvas.height, gh);
      this.compositionContext_ = e;
    } else this.compositionContext_ = this.context;
  }
  releaseCompositionContext_() {
    if (this.opacity_ !== 1) {
      const e = this.context.globalAlpha;
      (this.context.globalAlpha = this.opacity_),
        this.context.drawImage(this.compositionContext_.canvas, 0, 0),
        (this.context.globalAlpha = e),
        qr(this.compositionContext_),
        gh.push(this.compositionContext_.canvas),
        (this.compositionContext_ = null);
    }
  }
  renderDeclutter(e) {
    this.declutterExecutorGroup &&
      (this.setupCompositionContext_(),
      this.renderWorlds(this.declutterExecutorGroup, e, e.declutterTree),
      this.releaseCompositionContext_());
  }
  renderFrame(e, t) {
    const n = e.pixelRatio,
      s = e.layerStatesArray[e.layerIndex];
    Ep(this.pixelTransform, 1 / n, 1 / n), Jl(this.inversePixelTransform, this.pixelTransform);
    const r = Xu(this.pixelTransform);
    this.useContainer(t, r, this.getBackground(e));
    const o = this.context,
      l = o.canvas,
      a = this.replayGroup_,
      c = this.declutterExecutorGroup;
    if ((!a || a.isEmpty()) && (!c || c.isEmpty())) return null;
    const h = Math.round(e.size[0] * n),
      u = Math.round(e.size[1] * n);
    l.width != h || l.height != u
      ? ((l.width = h), (l.height = u), l.style.transform !== r && (l.style.transform = r))
      : this.containerReused || o.clearRect(0, 0, h, u),
      this.preRender(o, e);
    const d = e.viewState;
    d.projection, (this.opacity_ = s.opacity), this.setupCompositionContext_();
    let f = !1,
      g = !0;
    if (s.extent && this.clipping) {
      const m = Wi(s.extent);
      (g = Ue(m, e.extent)), (f = g && !Gi(m, e.extent)), f && this.clipUnrotated(this.compositionContext_, e, m);
    }
    return (
      g && this.renderWorlds(a, e),
      f && this.compositionContext_.restore(),
      this.releaseCompositionContext_(),
      this.postRender(o, e),
      this.renderedRotation_ !== d.rotation && ((this.renderedRotation_ = d.rotation), (this.hitDetectionImageData_ = null)),
      this.container
    );
  }
  getFeatures(e) {
    return new Promise((t) => {
      if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
        const n = [this.context.canvas.width, this.context.canvas.height];
        Ne(this.pixelTransform, n);
        const s = this.renderedCenter_,
          r = this.renderedResolution_,
          o = this.renderedRotation_,
          l = this.renderedProjection_,
          a = this.wrappedRenderedExtent_,
          c = this.getLayer(),
          h = [],
          u = n[0] * Ot,
          d = n[1] * Ot;
        h.push(this.getRenderTransform(s, r, o, Ot, u, d, 0).slice());
        const f = c.getSource(),
          g = l.getExtent();
        if (f.getWrapX() && l.canWrapX() && !Gi(g, a)) {
          let m = a[0];
          const _ = Re(g);
          let p = 0,
            v;
          for (; m < g[0]; ) --p, (v = _ * p), h.push(this.getRenderTransform(s, r, o, Ot, u, d, v).slice()), (m += _);
          for (p = 0, m = a[2]; m > g[2]; ) ++p, (v = _ * p), h.push(this.getRenderTransform(s, r, o, Ot, u, d, v).slice()), (m -= _);
        }
        this.hitDetectionImageData_ = z0(n, h, this.renderedFeatures_, c.getStyleFunction(), a, r, o);
      }
      t(B0(e, this.renderedFeatures_, this.hitDetectionImageData_));
    });
  }
  forEachFeatureAtCoordinate(e, t, n, s, r) {
    if (!this.replayGroup_) return;
    const o = t.viewState.resolution,
      l = t.viewState.rotation,
      a = this.getLayer(),
      c = {},
      h = function (f, g, m) {
        const _ = fe(f),
          p = c[_];
        if (p) {
          if (p !== !0 && m < p.distanceSq) {
            if (m === 0) return (c[_] = !0), r.splice(r.lastIndexOf(p), 1), s(f, a, g);
            (p.geometry = g), (p.distanceSq = m);
          }
        } else {
          if (m === 0) return (c[_] = !0), s(f, a, g);
          r.push((c[_] = { feature: f, layer: a, geometry: g, distanceSq: m, callback: s }));
        }
      };
    let u;
    const d = [this.replayGroup_];
    return (
      this.declutterExecutorGroup && d.push(this.declutterExecutorGroup),
      d.some(
        (f) =>
          (u = f.forEachFeatureAtCoordinate(
            e,
            o,
            l,
            n,
            h,
            f === this.declutterExecutorGroup && t.declutterTree ? t.declutterTree.all().map((g) => g.value) : null,
          )),
      ),
      u
    );
  }
  handleFontsChanged() {
    const e = this.getLayer();
    e.getVisible() && this.replayGroup_ && e.changed();
  }
  handleStyleImageChange_(e) {
    this.renderIfReadyAndVisible();
  }
  prepareFrame(e) {
    const t = this.getLayer(),
      n = t.getSource();
    if (!n) return !1;
    const s = e.viewHints[Ye.ANIMATING],
      r = e.viewHints[Ye.INTERACTING],
      o = t.getUpdateWhileAnimating(),
      l = t.getUpdateWhileInteracting();
    if ((this.ready && !o && s) || (!l && r)) return (this.animatingOrInteracting_ = !0), !0;
    this.animatingOrInteracting_ = !1;
    const a = e.extent,
      c = e.viewState,
      h = c.projection,
      u = c.resolution,
      d = e.pixelRatio,
      f = t.getRevision(),
      g = t.getRenderBuffer();
    let m = t.getRenderOrder();
    m === void 0 && (m = j0);
    const _ = c.center.slice(),
      p = Ql(a, g * u),
      v = p.slice(),
      x = [p.slice()],
      E = h.getExtent();
    if (n.getWrapX() && h.canWrapX() && !Gi(E, e.extent)) {
      const K = Re(E),
        U = Math.max(Re(p) / 2, K);
      (p[0] = E[0] - U), (p[2] = E[2] + U), Zu(_, h);
      const O = Hu(x[0], h);
      O[0] < E[0] && O[2] < E[2]
        ? x.push([O[0] + K, O[1], O[2] + K, O[3]])
        : O[0] > E[0] && O[2] > E[2] && x.push([O[0] - K, O[1], O[2] - K, O[3]]);
    }
    if (
      this.ready &&
      this.renderedResolution_ == u &&
      this.renderedRevision_ == f &&
      this.renderedRenderOrder_ == m &&
      Gi(this.wrappedRenderedExtent_, p)
    )
      return (
        Ti(this.renderedExtent_, v) || ((this.hitDetectionImageData_ = null), (this.renderedExtent_ = v)),
        (this.renderedCenter_ = _),
        (this.replayGroupChanged = !1),
        !0
      );
    this.replayGroup_ = null;
    const w = new fh(fl(u, d), p, u, d);
    let P;
    this.getLayer().getDeclutter() && (P = new fh(fl(u, d), p, u, d));
    let b;
    for (let K = 0, U = x.length; K < U; ++K) n.loadFeatures(x[K], u, h);
    const S = Y0(u, d);
    let k = !0;
    const W = (K) => {
        let U;
        const O = K.getStyleFunction() || t.getStyleFunction();
        if ((O && (U = O(K, u)), U)) {
          const j = this.renderFeature(K, S, U, w, b, P);
          k = k && !j;
        }
      },
      Q = ed(p),
      $ = n.getFeaturesInExtent(Q);
    m && $.sort(m);
    for (let K = 0, U = $.length; K < U; ++K) W($[K]);
    (this.renderedFeatures_ = $), (this.ready = k);
    const ee = w.finish(),
      Ee = new ph(p, u, d, n.getOverlaps(), ee, t.getRenderBuffer());
    return (
      P && (this.declutterExecutorGroup = new ph(p, u, d, n.getOverlaps(), P.finish(), t.getRenderBuffer())),
      (this.renderedResolution_ = u),
      (this.renderedRevision_ = f),
      (this.renderedRenderOrder_ = m),
      (this.renderedExtent_ = v),
      (this.wrappedRenderedExtent_ = p),
      (this.renderedCenter_ = _),
      (this.renderedProjection_ = h),
      (this.replayGroup_ = Ee),
      (this.hitDetectionImageData_ = null),
      (this.replayGroupChanged = !0),
      !0
    );
  }
  renderFeature(e, t, n, s, r, o) {
    if (!n) return !1;
    let l = !1;
    if (Array.isArray(n)) for (let a = 0, c = n.length; a < c; ++a) l = yh(s, e, n[a], t, this.boundHandleStyleImageChange_, r, o) || l;
    else l = yh(s, e, n, t, this.boundHandleStyleImageChange_, r, o);
    return l;
  }
}
const tx = ex;
class ix extends g0 {
  constructor(e) {
    super(e);
  }
  createRenderer() {
    return new tx(this);
  }
}
const Tr = ix;
class nx {
  constructor(e) {
    (this.rbush_ = new wd(e)), (this.items_ = {});
  }
  insert(e, t) {
    const n = { minX: e[0], minY: e[1], maxX: e[2], maxY: e[3], value: t };
    this.rbush_.insert(n), (this.items_[fe(t)] = n);
  }
  load(e, t) {
    const n = new Array(t.length);
    for (let s = 0, r = t.length; s < r; s++) {
      const o = e[s],
        l = t[s],
        a = { minX: o[0], minY: o[1], maxX: o[2], maxY: o[3], value: l };
      (n[s] = a), (this.items_[fe(l)] = a);
    }
    this.rbush_.load(n);
  }
  remove(e) {
    const t = fe(e),
      n = this.items_[t];
    return delete this.items_[t], this.rbush_.remove(n) !== null;
  }
  update(e, t) {
    const n = this.items_[fe(t)],
      s = [n.minX, n.minY, n.maxX, n.maxY];
    gs(s, e) || (this.remove(t), this.insert(e, t));
  }
  getAll() {
    return this.rbush_.all().map(function (t) {
      return t.value;
    });
  }
  getInExtent(e) {
    const t = { minX: e[0], minY: e[1], maxX: e[2], maxY: e[3] };
    return this.rbush_.search(t).map(function (s) {
      return s.value;
    });
  }
  forEach(e) {
    return this.forEach_(this.getAll(), e);
  }
  forEachInExtent(e, t) {
    return this.forEach_(this.getInExtent(e), t);
  }
  forEach_(e, t) {
    let n;
    for (let s = 0, r = e.length; s < r; s++) if (((n = t(e[s])), n)) return n;
    return n;
  }
  isEmpty() {
    return An(this.items_);
  }
  clear() {
    this.rbush_.clear(), (this.items_ = {});
  }
  getExtent(e) {
    const t = this.rbush_.toJSON();
    return kt(t.minX, t.minY, t.maxX, t.maxY, e);
  }
  concat(e) {
    this.rbush_.load(e.rbush_.all());
    for (const t in e.items_) this.items_[t] = e.items_[t];
  }
}
const xh = nx;
class sx extends Ze {
  constructor(e) {
    super(),
      (this.projection = Me(e.projection)),
      (this.attributions_ = vh(e.attributions)),
      (this.attributionsCollapsible_ = e.attributionsCollapsible !== void 0 ? e.attributionsCollapsible : !0),
      (this.loading = !1),
      (this.state_ = e.state !== void 0 ? e.state : 'ready'),
      (this.wrapX_ = e.wrapX !== void 0 ? e.wrapX : !1),
      (this.interpolate_ = !!e.interpolate),
      (this.viewResolver = null),
      (this.viewRejector = null);
    const t = this;
    this.viewPromise_ = new Promise(function (n, s) {
      (t.viewResolver = n), (t.viewRejector = s);
    });
  }
  getAttributions() {
    return this.attributions_;
  }
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  }
  getProjection() {
    return this.projection;
  }
  getResolutions(e) {
    return null;
  }
  getView() {
    return this.viewPromise_;
  }
  getState() {
    return this.state_;
  }
  getWrapX() {
    return this.wrapX_;
  }
  getInterpolate() {
    return this.interpolate_;
  }
  refresh() {
    this.changed();
  }
  setAttributions(e) {
    (this.attributions_ = vh(e)), this.changed();
  }
  setState(e) {
    (this.state_ = e), this.changed();
  }
}
function vh(i) {
  return i
    ? Array.isArray(i)
      ? function (e) {
          return i;
        }
      : typeof i == 'function'
      ? i
      : function (e) {
          return [i];
        }
    : null;
}
const Pd = sx,
  _t = {
    ADDFEATURE: 'addfeature',
    CHANGEFEATURE: 'changefeature',
    CLEAR: 'clear',
    REMOVEFEATURE: 'removefeature',
    FEATURESLOADSTART: 'featuresloadstart',
    FEATURESLOADEND: 'featuresloadend',
    FEATURESLOADERROR: 'featuresloaderror',
  };
function rx(i, e) {
  return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]];
}
let ox = !1;
function lx(i, e, t, n, s, r, o) {
  const l = new XMLHttpRequest();
  l.open('GET', typeof i == 'function' ? i(t, n, s) : i, !0),
    e.getType() == 'arraybuffer' && (l.responseType = 'arraybuffer'),
    (l.withCredentials = ox),
    (l.onload = function (a) {
      if (!l.status || (l.status >= 200 && l.status < 300)) {
        const c = e.getType();
        let h;
        c == 'json' || c == 'text'
          ? (h = l.responseText)
          : c == 'xml'
          ? ((h = l.responseXML), h || (h = new DOMParser().parseFromString(l.responseText, 'application/xml')))
          : c == 'arraybuffer' && (h = l.response),
          h ? r(e.readFeatures(h, { extent: t, featureProjection: s }), e.readProjection(h)) : o();
      } else o();
    }),
    (l.onerror = o),
    l.send();
}
function Eh(i, e) {
  return function (t, n, s, r, o) {
    const l = this;
    lx(
      i,
      e,
      t,
      n,
      s,
      function (a, c) {
        l.addFeatures(a), r !== void 0 && r(a);
      },
      o || Mn,
    );
  };
}
class ai extends Gt {
  constructor(e, t, n) {
    super(e), (this.feature = t), (this.features = n);
  }
}
class ax extends Pd {
  constructor(e) {
    (e = e || {}),
      super({
        attributions: e.attributions,
        interpolate: !0,
        projection: void 0,
        state: 'ready',
        wrapX: e.wrapX !== void 0 ? e.wrapX : !0,
      }),
      this.on,
      this.once,
      this.un,
      (this.loader_ = Mn),
      (this.format_ = e.format),
      (this.overlaps_ = e.overlaps === void 0 ? !0 : e.overlaps),
      (this.url_ = e.url),
      e.loader !== void 0
        ? (this.loader_ = e.loader)
        : this.url_ !== void 0 && (he(this.format_, 7), (this.loader_ = Eh(this.url_, this.format_))),
      (this.strategy_ = e.strategy !== void 0 ? e.strategy : rx);
    const t = e.useSpatialIndex !== void 0 ? e.useSpatialIndex : !0;
    (this.featuresRtree_ = t ? new xh() : null),
      (this.loadedExtentsRtree_ = new xh()),
      (this.loadingExtentsCount_ = 0),
      (this.nullGeometryFeatures_ = {}),
      (this.idIndex_ = {}),
      (this.uidIndex_ = {}),
      (this.featureChangeKeys_ = {}),
      (this.featuresCollection_ = null);
    let n, s;
    Array.isArray(e.features) ? (s = e.features) : e.features && ((n = e.features), (s = n.getArray())),
      !t && n === void 0 && (n = new dt(s)),
      s !== void 0 && this.addFeaturesInternal(s),
      n !== void 0 && this.bindFeaturesCollection_(n);
  }
  addFeature(e) {
    this.addFeatureInternal(e), this.changed();
  }
  addFeatureInternal(e) {
    const t = fe(e);
    if (!this.addToIndex_(t, e)) {
      this.featuresCollection_ && this.featuresCollection_.remove(e);
      return;
    }
    this.setupChangeEvents_(t, e);
    const n = e.getGeometry();
    if (n) {
      const s = n.getExtent();
      this.featuresRtree_ && this.featuresRtree_.insert(s, e);
    } else this.nullGeometryFeatures_[t] = e;
    this.dispatchEvent(new ai(_t.ADDFEATURE, e));
  }
  setupChangeEvents_(e, t) {
    this.featureChangeKeys_[e] = [
      _e(t, oe.CHANGE, this.handleFeatureChange_, this),
      _e(t, Pn.PROPERTYCHANGE, this.handleFeatureChange_, this),
    ];
  }
  addToIndex_(e, t) {
    let n = !0;
    const s = t.getId();
    return (
      s !== void 0 && (s.toString() in this.idIndex_ ? (n = !1) : (this.idIndex_[s.toString()] = t)),
      n && (he(!(e in this.uidIndex_), 30), (this.uidIndex_[e] = t)),
      n
    );
  }
  addFeatures(e) {
    this.addFeaturesInternal(e), this.changed();
  }
  addFeaturesInternal(e) {
    const t = [],
      n = [],
      s = [];
    for (let r = 0, o = e.length; r < o; r++) {
      const l = e[r],
        a = fe(l);
      this.addToIndex_(a, l) && n.push(l);
    }
    for (let r = 0, o = n.length; r < o; r++) {
      const l = n[r],
        a = fe(l);
      this.setupChangeEvents_(a, l);
      const c = l.getGeometry();
      if (c) {
        const h = c.getExtent();
        t.push(h), s.push(l);
      } else this.nullGeometryFeatures_[a] = l;
    }
    if ((this.featuresRtree_ && this.featuresRtree_.load(t, s), this.hasListener(_t.ADDFEATURE)))
      for (let r = 0, o = n.length; r < o; r++) this.dispatchEvent(new ai(_t.ADDFEATURE, n[r]));
  }
  bindFeaturesCollection_(e) {
    let t = !1;
    this.addEventListener(_t.ADDFEATURE, function (n) {
      t || ((t = !0), e.push(n.feature), (t = !1));
    }),
      this.addEventListener(_t.REMOVEFEATURE, function (n) {
        t || ((t = !0), e.remove(n.feature), (t = !1));
      }),
      e.addEventListener(Ge.ADD, (n) => {
        t || ((t = !0), this.addFeature(n.element), (t = !1));
      }),
      e.addEventListener(Ge.REMOVE, (n) => {
        t || ((t = !0), this.removeFeature(n.element), (t = !1));
      }),
      (this.featuresCollection_ = e);
  }
  clear(e) {
    if (e) {
      for (const n in this.featureChangeKeys_) this.featureChangeKeys_[n].forEach(Te);
      this.featuresCollection_ || ((this.featureChangeKeys_ = {}), (this.idIndex_ = {}), (this.uidIndex_ = {}));
    } else if (this.featuresRtree_) {
      const n = (s) => {
        this.removeFeatureInternal(s);
      };
      this.featuresRtree_.forEach(n);
      for (const s in this.nullGeometryFeatures_) this.removeFeatureInternal(this.nullGeometryFeatures_[s]);
    }
    this.featuresCollection_ && this.featuresCollection_.clear(),
      this.featuresRtree_ && this.featuresRtree_.clear(),
      (this.nullGeometryFeatures_ = {});
    const t = new ai(_t.CLEAR);
    this.dispatchEvent(t), this.changed();
  }
  forEachFeature(e) {
    if (this.featuresRtree_) return this.featuresRtree_.forEach(e);
    this.featuresCollection_ && this.featuresCollection_.forEach(e);
  }
  forEachFeatureAtCoordinateDirect(e, t) {
    const n = [e[0], e[1], e[0], e[1]];
    return this.forEachFeatureInExtent(n, function (s) {
      if (s.getGeometry().intersectsCoordinate(e)) return t(s);
    });
  }
  forEachFeatureInExtent(e, t) {
    if (this.featuresRtree_) return this.featuresRtree_.forEachInExtent(e, t);
    this.featuresCollection_ && this.featuresCollection_.forEach(t);
  }
  forEachFeatureIntersectingExtent(e, t) {
    return this.forEachFeatureInExtent(e, function (n) {
      if (n.getGeometry().intersectsExtent(e)) {
        const r = t(n);
        if (r) return r;
      }
    });
  }
  getFeaturesCollection() {
    return this.featuresCollection_;
  }
  getFeatures() {
    let e;
    return (
      this.featuresCollection_
        ? (e = this.featuresCollection_.getArray().slice(0))
        : this.featuresRtree_ &&
          ((e = this.featuresRtree_.getAll()), An(this.nullGeometryFeatures_) || Ct(e, Object.values(this.nullGeometryFeatures_))),
      e
    );
  }
  getFeaturesAtCoordinate(e) {
    const t = [];
    return (
      this.forEachFeatureAtCoordinateDirect(e, function (n) {
        t.push(n);
      }),
      t
    );
  }
  getFeaturesInExtent(e, t) {
    if (this.featuresRtree_) {
      if (!(t && t.canWrapX() && this.getWrapX())) return this.featuresRtree_.getInExtent(e);
      const s = Pp(e, t);
      return [].concat(...s.map((r) => this.featuresRtree_.getInExtent(r)));
    } else if (this.featuresCollection_) return this.featuresCollection_.getArray().slice(0);
    return [];
  }
  getClosestFeatureToCoordinate(e, t) {
    const n = e[0],
      s = e[1];
    let r = null;
    const o = [NaN, NaN];
    let l = 1 / 0;
    const a = [-1 / 0, -1 / 0, 1 / 0, 1 / 0];
    return (
      (t = t || Ki),
      this.featuresRtree_.forEachInExtent(a, function (c) {
        if (t(c)) {
          const h = c.getGeometry(),
            u = l;
          if (((l = h.closestPointXY(n, s, o, l)), l < u)) {
            r = c;
            const d = Math.sqrt(l);
            (a[0] = n - d), (a[1] = s - d), (a[2] = n + d), (a[3] = s + d);
          }
        }
      }),
      r
    );
  }
  getExtent(e) {
    return this.featuresRtree_.getExtent(e);
  }
  getFeatureById(e) {
    const t = this.idIndex_[e.toString()];
    return t !== void 0 ? t : null;
  }
  getFeatureByUid(e) {
    const t = this.uidIndex_[e];
    return t !== void 0 ? t : null;
  }
  getFormat() {
    return this.format_;
  }
  getOverlaps() {
    return this.overlaps_;
  }
  getUrl() {
    return this.url_;
  }
  handleFeatureChange_(e) {
    const t = e.target,
      n = fe(t),
      s = t.getGeometry();
    if (!s) n in this.nullGeometryFeatures_ || (this.featuresRtree_ && this.featuresRtree_.remove(t), (this.nullGeometryFeatures_[n] = t));
    else {
      const o = s.getExtent();
      n in this.nullGeometryFeatures_
        ? (delete this.nullGeometryFeatures_[n], this.featuresRtree_ && this.featuresRtree_.insert(o, t))
        : this.featuresRtree_ && this.featuresRtree_.update(o, t);
    }
    const r = t.getId();
    if (r !== void 0) {
      const o = r.toString();
      this.idIndex_[o] !== t && (this.removeFromIdIndex_(t), (this.idIndex_[o] = t));
    } else this.removeFromIdIndex_(t), (this.uidIndex_[n] = t);
    this.changed(), this.dispatchEvent(new ai(_t.CHANGEFEATURE, t));
  }
  hasFeature(e) {
    const t = e.getId();
    return t !== void 0 ? t in this.idIndex_ : fe(e) in this.uidIndex_;
  }
  isEmpty() {
    return this.featuresRtree_
      ? this.featuresRtree_.isEmpty() && An(this.nullGeometryFeatures_)
      : this.featuresCollection_
      ? this.featuresCollection_.getLength() === 0
      : !0;
  }
  loadFeatures(e, t, n) {
    const s = this.loadedExtentsRtree_,
      r = this.strategy_(e, t, n);
    for (let o = 0, l = r.length; o < l; ++o) {
      const a = r[o];
      s.forEachInExtent(a, function (h) {
        return Gi(h.extent, a);
      }) ||
        (++this.loadingExtentsCount_,
        this.dispatchEvent(new ai(_t.FEATURESLOADSTART)),
        this.loader_.call(
          this,
          a,
          t,
          n,
          (h) => {
            --this.loadingExtentsCount_, this.dispatchEvent(new ai(_t.FEATURESLOADEND, void 0, h));
          },
          () => {
            --this.loadingExtentsCount_, this.dispatchEvent(new ai(_t.FEATURESLOADERROR));
          },
        ),
        s.insert(a, { extent: a.slice() }));
    }
    this.loading = this.loader_.length < 4 ? !1 : this.loadingExtentsCount_ > 0;
  }
  refresh() {
    this.clear(!0), this.loadedExtentsRtree_.clear(), super.refresh();
  }
  removeLoadedExtent(e) {
    const t = this.loadedExtentsRtree_;
    let n;
    t.forEachInExtent(e, function (s) {
      if (gs(s.extent, e)) return (n = s), !0;
    }),
      n && t.remove(n);
  }
  removeFeature(e) {
    if (!e) return;
    const t = fe(e);
    t in this.nullGeometryFeatures_ ? delete this.nullGeometryFeatures_[t] : this.featuresRtree_ && this.featuresRtree_.remove(e),
      this.removeFeatureInternal(e) && this.changed();
  }
  removeFeatureInternal(e) {
    const t = fe(e),
      n = this.featureChangeKeys_[t];
    if (!n) return;
    n.forEach(Te), delete this.featureChangeKeys_[t];
    const s = e.getId();
    return s !== void 0 && delete this.idIndex_[s.toString()], delete this.uidIndex_[t], this.dispatchEvent(new ai(_t.REMOVEFEATURE, e)), e;
  }
  removeFromIdIndex_(e) {
    let t = !1;
    for (const n in this.idIndex_)
      if (this.idIndex_[n] === e) {
        delete this.idIndex_[n], (t = !0);
        break;
      }
    return t;
  }
  setLoader(e) {
    this.loader_ = e;
  }
  setUrl(e) {
    he(this.format_, 7), (this.url_ = e), this.setLoader(Eh(e, this.format_));
  }
}
const gl = ax;
function cx(i, e) {
  const t = i.canvas;
  e = e || {};
  const n = e.pixelRatio || Ni,
    s = e.size;
  s && ((t.width = s[0] * n), (t.height = s[1] * n), (t.style.width = s[0] + 'px'), (t.style.height = s[1] + 'px'));
  const r = [0, 0, t.width, t.height],
    o = vp(wt(), n, n);
  return new Pa(i, n, r, o, 0);
}
const J = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3, EMPTY: 4 };
class hx extends Xr {
  constructor(e, t, n) {
    super(),
      (n = n || {}),
      (this.tileCoord = e),
      (this.state = t),
      (this.interimTile = null),
      (this.key = ''),
      (this.transition_ = n.transition === void 0 ? 250 : n.transition),
      (this.transitionStarts_ = {}),
      (this.interpolate = !!n.interpolate);
  }
  changed() {
    this.dispatchEvent(oe.CHANGE);
  }
  release() {
    this.state === J.ERROR && this.setState(J.EMPTY);
  }
  getKey() {
    return this.key + '/' + this.tileCoord;
  }
  getInterimTile() {
    if (!this.interimTile) return this;
    let e = this.interimTile;
    do {
      if (e.getState() == J.LOADED) return (this.transition_ = 0), e;
      e = e.interimTile;
    } while (e);
    return this;
  }
  refreshInterimChain() {
    if (!this.interimTile) return;
    let e = this.interimTile,
      t = this;
    do {
      if (e.getState() == J.LOADED) {
        e.interimTile = null;
        break;
      } else e.getState() == J.LOADING ? (t = e) : e.getState() == J.IDLE ? (t.interimTile = e.interimTile) : (t = e);
      e = t.interimTile;
    } while (e);
  }
  getTileCoord() {
    return this.tileCoord;
  }
  getState() {
    return this.state;
  }
  setState(e) {
    if (this.state !== J.ERROR && this.state > e) throw new Error('Tile load sequence violation');
    (this.state = e), this.changed();
  }
  load() {
    ie();
  }
  getAlpha(e, t) {
    if (!this.transition_) return 1;
    let n = this.transitionStarts_[e];
    if (!n) (n = t), (this.transitionStarts_[e] = n);
    else if (n === -1) return 1;
    const s = t - n + 1e3 / 60;
    return s >= this.transition_ ? 1 : vd(s / this.transition_);
  }
  inTransition(e) {
    return this.transition_ ? this.transitionStarts_[e] !== -1 : !1;
  }
  endTransition(e) {
    this.transition_ && (this.transitionStarts_[e] = -1);
  }
}
const Md = hx;
class ux extends Md {
  constructor(e, t, n, s, r, o) {
    super(e, t, o),
      (this.crossOrigin_ = s),
      (this.src_ = n),
      (this.key = n),
      (this.image_ = new Image()),
      s !== null && (this.image_.crossOrigin = s),
      (this.unlisten_ = null),
      (this.tileLoadFunction_ = r);
  }
  getImage() {
    return this.image_;
  }
  setImage(e) {
    (this.image_ = e), (this.state = J.LOADED), this.unlistenImage_(), this.changed();
  }
  handleImageError_() {
    (this.state = J.ERROR), this.unlistenImage_(), (this.image_ = dx()), this.changed();
  }
  handleImageLoad_() {
    const e = this.image_;
    e.naturalWidth && e.naturalHeight ? (this.state = J.LOADED) : (this.state = J.EMPTY), this.unlistenImage_(), this.changed();
  }
  load() {
    this.state == J.ERROR &&
      ((this.state = J.IDLE), (this.image_ = new Image()), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)),
      this.state == J.IDLE &&
        ((this.state = J.LOADING),
        this.changed(),
        this.tileLoadFunction_(this, this.src_),
        (this.unlisten_ = Sd(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this))));
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), (this.unlisten_ = null));
  }
}
function dx() {
  const i = qe(1, 1);
  return (i.fillStyle = 'rgba(0,0,0,0)'), i.fillRect(0, 0, 1, 1), i.canvas;
}
const Ad = ux;
class fx {
  constructor(e, t, n) {
    (this.decay_ = e), (this.minVelocity_ = t), (this.delay_ = n), (this.points_ = []), (this.angle_ = 0), (this.initialVelocity_ = 0);
  }
  begin() {
    (this.points_.length = 0), (this.angle_ = 0), (this.initialVelocity_ = 0);
  }
  update(e, t) {
    this.points_.push(e, t, Date.now());
  }
  end() {
    if (this.points_.length < 6) return !1;
    const e = Date.now() - this.delay_,
      t = this.points_.length - 3;
    if (this.points_[t + 2] < e) return !1;
    let n = t - 3;
    for (; n > 0 && this.points_[n + 2] > e; ) n -= 3;
    const s = this.points_[t + 2] - this.points_[n + 2];
    if (s < 1e3 / 60) return !1;
    const r = this.points_[t] - this.points_[n],
      o = this.points_[t + 1] - this.points_[n + 1];
    return (
      (this.angle_ = Math.atan2(o, r)), (this.initialVelocity_ = Math.sqrt(r * r + o * o) / s), this.initialVelocity_ > this.minVelocity_
    );
  }
  getDistance() {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  }
  getAngle() {
    return this.angle_;
  }
}
const gx = fx;
class mx extends Kl {
  constructor(e) {
    super(), (this.map_ = e);
  }
  dispatchRenderEvent(e, t) {
    ie();
  }
  calculateMatrices2D(e) {
    const t = e.viewState,
      n = e.coordinateToPixelTransform,
      s = e.pixelToCoordinateTransform;
    wi(n, e.size[0] / 2, e.size[1] / 2, 1 / t.resolution, -1 / t.resolution, -t.rotation, -t.center[0], -t.center[1]), Jl(s, n);
  }
  forEachFeatureAtCoordinate(e, t, n, s, r, o, l, a) {
    let c;
    const h = t.viewState;
    function u(E, w, P, b) {
      return r.call(o, w, E ? P : null, b);
    }
    const d = h.projection,
      f = Zu(e.slice(), d),
      g = [[0, 0]];
    if (d.canWrapX() && s) {
      const E = d.getExtent(),
        w = Re(E);
      g.push([-w, 0], [w, 0]);
    }
    const m = t.layerStatesArray,
      _ = m.length,
      p = [],
      v = [];
    for (let E = 0; E < g.length; E++)
      for (let w = _ - 1; w >= 0; --w) {
        const P = m[w],
          b = P.layer;
        if (b.hasRenderer() && Ia(P, h) && l.call(a, b)) {
          const S = b.getRenderer(),
            k = b.getSource();
          if (S && k) {
            const W = k.getWrapX() ? f : e,
              Q = u.bind(null, P.managed);
            (v[0] = W[0] + g[E][0]), (v[1] = W[1] + g[E][1]), (c = S.forEachFeatureAtCoordinate(v, t, n, Q, p));
          }
          if (c) return c;
        }
      }
    if (p.length === 0) return;
    const x = 1 / p.length;
    return (
      p.forEach((E, w) => (E.distanceSq += w * x)),
      p.sort((E, w) => E.distanceSq - w.distanceSq),
      p.some((E) => (c = E.callback(E.feature, E.layer, E.geometry))),
      c
    );
  }
  hasFeatureAtCoordinate(e, t, n, s, r, o) {
    return this.forEachFeatureAtCoordinate(e, t, n, s, Ki, this, r, o) !== void 0;
  }
  getMap() {
    return this.map_;
  }
  renderFrame(e) {
    ie();
  }
  scheduleExpireIconCache(e) {
    Sr.canExpireCache() && e.postRenderFunctions.push(_x);
  }
}
function _x(i, e) {
  Sr.expire();
}
const px = mx;
class yx extends px {
  constructor(e) {
    super(e),
      (this.fontChangeListenerKey_ = _e(Ut, Pn.PROPERTYCHANGE, e.redrawText.bind(e))),
      (this.element_ = document.createElement('div'));
    const t = this.element_.style;
    (t.position = 'absolute'), (t.width = '100%'), (t.height = '100%'), (t.zIndex = '0'), (this.element_.className = Jr + ' ol-layers');
    const n = e.getViewport();
    n.insertBefore(this.element_, n.firstChild || null), (this.children_ = []), (this.renderedVisible_ = !0);
  }
  dispatchRenderEvent(e, t) {
    const n = this.getMap();
    if (n.hasListener(e)) {
      const s = new Rd(e, void 0, t);
      n.dispatchEvent(s);
    }
  }
  disposeInternal() {
    Te(this.fontChangeListenerKey_), this.element_.parentNode.removeChild(this.element_), super.disposeInternal();
  }
  renderFrame(e) {
    if (!e) {
      this.renderedVisible_ && ((this.element_.style.display = 'none'), (this.renderedVisible_ = !1));
      return;
    }
    this.calculateMatrices2D(e), this.dispatchRenderEvent(yi.PRECOMPOSE, e);
    const t = e.layerStatesArray.sort(function (o, l) {
        return o.zIndex - l.zIndex;
      }),
      n = e.viewState;
    this.children_.length = 0;
    const s = [];
    let r = null;
    for (let o = 0, l = t.length; o < l; ++o) {
      const a = t[o];
      e.layerIndex = o;
      const c = a.layer,
        h = c.getSourceState();
      if (!Ia(a, n) || (h != 'ready' && h != 'undefined')) {
        c.unrender();
        continue;
      }
      const u = c.render(e, r);
      u && (u !== r && (this.children_.push(u), (r = u)), 'getDeclutter' in c && s.push(c));
    }
    for (let o = s.length - 1; o >= 0; --o) s[o].renderDeclutter(e);
    Ly(this.element_, this.children_),
      this.dispatchRenderEvent(yi.POSTCOMPOSE, e),
      this.renderedVisible_ || ((this.element_.style.display = ''), (this.renderedVisible_ = !0)),
      this.scheduleExpireIconCache(e);
  }
}
const xx = yx;
class Kt extends Gt {
  constructor(e, t) {
    super(e), (this.layer = t);
  }
}
const wo = { LAYERS: 'layers' };
class Ma extends wa {
  constructor(e) {
    e = e || {};
    const t = Object.assign({}, e);
    delete t.layers;
    let n = e.layers;
    super(t),
      this.on,
      this.once,
      this.un,
      (this.layersListenerKeys_ = []),
      (this.listenerKeys_ = {}),
      this.addChangeListener(wo.LAYERS, this.handleLayersChanged_),
      n
        ? Array.isArray(n)
          ? (n = new dt(n.slice(), { unique: !0 }))
          : he(typeof n.getArray == 'function', 43)
        : (n = new dt(void 0, { unique: !0 })),
      this.setLayers(n);
  }
  handleLayerChange_() {
    this.changed();
  }
  handleLayersChanged_() {
    this.layersListenerKeys_.forEach(Te), (this.layersListenerKeys_.length = 0);
    const e = this.getLayers();
    this.layersListenerKeys_.push(_e(e, Ge.ADD, this.handleLayersAdd_, this), _e(e, Ge.REMOVE, this.handleLayersRemove_, this));
    for (const n in this.listenerKeys_) this.listenerKeys_[n].forEach(Te);
    Gn(this.listenerKeys_);
    const t = e.getArray();
    for (let n = 0, s = t.length; n < s; n++) {
      const r = t[n];
      this.registerLayerListeners_(r), this.dispatchEvent(new Kt('addlayer', r));
    }
    this.changed();
  }
  registerLayerListeners_(e) {
    const t = [_e(e, Pn.PROPERTYCHANGE, this.handleLayerChange_, this), _e(e, oe.CHANGE, this.handleLayerChange_, this)];
    e instanceof Ma && t.push(_e(e, 'addlayer', this.handleLayerGroupAdd_, this), _e(e, 'removelayer', this.handleLayerGroupRemove_, this)),
      (this.listenerKeys_[fe(e)] = t);
  }
  handleLayerGroupAdd_(e) {
    this.dispatchEvent(new Kt('addlayer', e.layer));
  }
  handleLayerGroupRemove_(e) {
    this.dispatchEvent(new Kt('removelayer', e.layer));
  }
  handleLayersAdd_(e) {
    const t = e.element;
    this.registerLayerListeners_(t), this.dispatchEvent(new Kt('addlayer', t)), this.changed();
  }
  handleLayersRemove_(e) {
    const t = e.element,
      n = fe(t);
    this.listenerKeys_[n].forEach(Te), delete this.listenerKeys_[n], this.dispatchEvent(new Kt('removelayer', t)), this.changed();
  }
  getLayers() {
    return this.get(wo.LAYERS);
  }
  setLayers(e) {
    const t = this.getLayers();
    if (t) {
      const n = t.getArray();
      for (let s = 0, r = n.length; s < r; ++s) this.dispatchEvent(new Kt('removelayer', n[s]));
    }
    this.set(wo.LAYERS, e);
  }
  getLayersArray(e) {
    return (
      (e = e !== void 0 ? e : []),
      this.getLayers().forEach(function (t) {
        t.getLayersArray(e);
      }),
      e
    );
  }
  getLayerStatesArray(e) {
    const t = e !== void 0 ? e : [],
      n = t.length;
    this.getLayers().forEach(function (o) {
      o.getLayerStatesArray(t);
    });
    const s = this.getLayerState();
    let r = s.zIndex;
    !e && s.zIndex === void 0 && (r = 0);
    for (let o = n, l = t.length; o < l; o++) {
      const a = t[o];
      (a.opacity *= s.opacity),
        (a.visible = a.visible && s.visible),
        (a.maxResolution = Math.min(a.maxResolution, s.maxResolution)),
        (a.minResolution = Math.max(a.minResolution, s.minResolution)),
        (a.minZoom = Math.max(a.minZoom, s.minZoom)),
        (a.maxZoom = Math.min(a.maxZoom, s.maxZoom)),
        s.extent !== void 0 && (a.extent !== void 0 ? (a.extent = ss(a.extent, s.extent)) : (a.extent = s.extent)),
        a.zIndex === void 0 && (a.zIndex = r);
    }
    return t;
  }
  getSourceState() {
    return 'ready';
  }
}
const Zi = Ma,
  vx = Object.freeze(Object.defineProperty({ __proto__: null, GroupEvent: Kt, default: Zi }, Symbol.toStringTag, { value: 'Module' }));
class Ex extends Gt {
  constructor(e, t, n) {
    super(e), (this.map = t), (this.frameState = n !== void 0 ? n : null);
  }
}
const mn = Ex;
class Cx extends mn {
  constructor(e, t, n, s, r, o) {
    super(e, t, r),
      (this.originalEvent = n),
      (this.pixel_ = null),
      (this.coordinate_ = null),
      (this.dragging = s !== void 0 ? s : !1),
      (this.activePointers = o);
  }
  get pixel() {
    return this.pixel_ || (this.pixel_ = this.map.getEventPixel(this.originalEvent)), this.pixel_;
  }
  set pixel(e) {
    this.pixel_ = e;
  }
  get coordinate() {
    return this.coordinate_ || (this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel)), this.coordinate_;
  }
  set coordinate(e) {
    this.coordinate_ = e;
  }
  preventDefault() {
    super.preventDefault(), 'preventDefault' in this.originalEvent && this.originalEvent.preventDefault();
  }
  stopPropagation() {
    super.stopPropagation(), 'stopPropagation' in this.originalEvent && this.originalEvent.stopPropagation();
  }
}
const hi = Cx,
  Ie = {
    SINGLECLICK: 'singleclick',
    CLICK: oe.CLICK,
    DBLCLICK: oe.DBLCLICK,
    POINTERDRAG: 'pointerdrag',
    POINTERMOVE: 'pointermove',
    POINTERDOWN: 'pointerdown',
    POINTERUP: 'pointerup',
    POINTEROVER: 'pointerover',
    POINTEROUT: 'pointerout',
    POINTERENTER: 'pointerenter',
    POINTERLEAVE: 'pointerleave',
    POINTERCANCEL: 'pointercancel',
  },
  ml = {
    POINTERMOVE: 'pointermove',
    POINTERDOWN: 'pointerdown',
    POINTERUP: 'pointerup',
    POINTEROVER: 'pointerover',
    POINTEROUT: 'pointerout',
    POINTERENTER: 'pointerenter',
    POINTERLEAVE: 'pointerleave',
    POINTERCANCEL: 'pointercancel',
  };
class wx extends Xr {
  constructor(e, t) {
    super(e),
      (this.map_ = e),
      this.clickTimeoutId_,
      (this.emulateClicks_ = !1),
      (this.dragging_ = !1),
      (this.dragListenerKeys_ = []),
      (this.moveTolerance_ = t === void 0 ? 1 : t),
      (this.down_ = null);
    const n = this.map_.getViewport();
    (this.activePointers_ = []),
      (this.trackedTouches_ = {}),
      (this.element_ = n),
      (this.pointerdownListenerKey_ = _e(n, ml.POINTERDOWN, this.handlePointerDown_, this)),
      this.originalPointerMoveEvent_,
      (this.relayedListenerKey_ = _e(n, ml.POINTERMOVE, this.relayMoveEvent_, this)),
      (this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this)),
      this.element_.addEventListener(oe.TOUCHMOVE, this.boundHandleTouchMove_, Wu ? { passive: !1 } : !1);
  }
  emulateClick_(e) {
    let t = new hi(Ie.CLICK, this.map_, e);
    this.dispatchEvent(t),
      this.clickTimeoutId_ !== void 0
        ? (clearTimeout(this.clickTimeoutId_),
          (this.clickTimeoutId_ = void 0),
          (t = new hi(Ie.DBLCLICK, this.map_, e)),
          this.dispatchEvent(t))
        : (this.clickTimeoutId_ = setTimeout(() => {
            this.clickTimeoutId_ = void 0;
            const n = new hi(Ie.SINGLECLICK, this.map_, e);
            this.dispatchEvent(n);
          }, 250));
  }
  updateActivePointers_(e) {
    const t = e,
      n = t.pointerId;
    if (t.type == Ie.POINTERUP || t.type == Ie.POINTERCANCEL) {
      delete this.trackedTouches_[n];
      for (const s in this.trackedTouches_)
        if (this.trackedTouches_[s].target !== t.target) {
          delete this.trackedTouches_[s];
          break;
        }
    } else (t.type == Ie.POINTERDOWN || t.type == Ie.POINTERMOVE) && (this.trackedTouches_[n] = t);
    this.activePointers_ = Object.values(this.trackedTouches_);
  }
  handlePointerUp_(e) {
    this.updateActivePointers_(e);
    const t = new hi(Ie.POINTERUP, this.map_, e, void 0, void 0, this.activePointers_);
    this.dispatchEvent(t),
      this.emulateClicks_ && !t.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(e) && this.emulateClick_(this.down_),
      this.activePointers_.length === 0 &&
        (this.dragListenerKeys_.forEach(Te), (this.dragListenerKeys_.length = 0), (this.dragging_ = !1), (this.down_ = null));
  }
  isMouseActionButton_(e) {
    return e.button === 0;
  }
  handlePointerDown_(e) {
    (this.emulateClicks_ = this.activePointers_.length === 0), this.updateActivePointers_(e);
    const t = new hi(Ie.POINTERDOWN, this.map_, e, void 0, void 0, this.activePointers_);
    if (
      (this.dispatchEvent(t),
      (this.down_ = new PointerEvent(e.type, e)),
      Object.defineProperty(this.down_, 'target', { writable: !1, value: e.target }),
      this.dragListenerKeys_.length === 0)
    ) {
      const n = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push(
        _e(n, Ie.POINTERMOVE, this.handlePointerMove_, this),
        _e(n, Ie.POINTERUP, this.handlePointerUp_, this),
        _e(this.element_, Ie.POINTERCANCEL, this.handlePointerUp_, this),
      ),
        this.element_.getRootNode &&
          this.element_.getRootNode() !== n &&
          this.dragListenerKeys_.push(_e(this.element_.getRootNode(), Ie.POINTERUP, this.handlePointerUp_, this));
    }
  }
  handlePointerMove_(e) {
    if (this.isMoving_(e)) {
      this.updateActivePointers_(e), (this.dragging_ = !0);
      const t = new hi(Ie.POINTERDRAG, this.map_, e, this.dragging_, void 0, this.activePointers_);
      this.dispatchEvent(t);
    }
  }
  relayMoveEvent_(e) {
    this.originalPointerMoveEvent_ = e;
    const t = !!(this.down_ && this.isMoving_(e));
    this.dispatchEvent(new hi(Ie.POINTERMOVE, this.map_, e, t));
  }
  handleTouchMove_(e) {
    const t = this.originalPointerMoveEvent_;
    (!t || t.defaultPrevented) && (typeof e.cancelable != 'boolean' || e.cancelable === !0) && e.preventDefault();
  }
  isMoving_(e) {
    return (
      this.dragging_ ||
      Math.abs(e.clientX - this.down_.clientX) > this.moveTolerance_ ||
      Math.abs(e.clientY - this.down_.clientY) > this.moveTolerance_
    );
  }
  disposeInternal() {
    this.relayedListenerKey_ && (Te(this.relayedListenerKey_), (this.relayedListenerKey_ = null)),
      this.element_.removeEventListener(oe.TOUCHMOVE, this.boundHandleTouchMove_),
      this.pointerdownListenerKey_ && (Te(this.pointerdownListenerKey_), (this.pointerdownListenerKey_ = null)),
      this.dragListenerKeys_.forEach(Te),
      (this.dragListenerKeys_.length = 0),
      (this.element_ = null),
      super.disposeInternal();
  }
}
const Sx = wx,
  Ht = { POSTRENDER: 'postrender', MOVESTART: 'movestart', MOVEEND: 'moveend', LOADSTART: 'loadstart', LOADEND: 'loadend' },
  je = { LAYERGROUP: 'layergroup', SIZE: 'size', TARGET: 'target', VIEW: 'view' },
  Rr = 1 / 0;
class Tx {
  constructor(e, t) {
    (this.priorityFunction_ = e), (this.keyFunction_ = t), (this.elements_ = []), (this.priorities_ = []), (this.queuedElements_ = {});
  }
  clear() {
    (this.elements_.length = 0), (this.priorities_.length = 0), Gn(this.queuedElements_);
  }
  dequeue() {
    const e = this.elements_,
      t = this.priorities_,
      n = e[0];
    e.length == 1 ? ((e.length = 0), (t.length = 0)) : ((e[0] = e.pop()), (t[0] = t.pop()), this.siftUp_(0));
    const s = this.keyFunction_(n);
    return delete this.queuedElements_[s], n;
  }
  enqueue(e) {
    he(!(this.keyFunction_(e) in this.queuedElements_), 31);
    const t = this.priorityFunction_(e);
    return t != Rr
      ? (this.elements_.push(e),
        this.priorities_.push(t),
        (this.queuedElements_[this.keyFunction_(e)] = !0),
        this.siftDown_(0, this.elements_.length - 1),
        !0)
      : !1;
  }
  getCount() {
    return this.elements_.length;
  }
  getLeftChildIndex_(e) {
    return e * 2 + 1;
  }
  getRightChildIndex_(e) {
    return e * 2 + 2;
  }
  getParentIndex_(e) {
    return (e - 1) >> 1;
  }
  heapify_() {
    let e;
    for (e = (this.elements_.length >> 1) - 1; e >= 0; e--) this.siftUp_(e);
  }
  isEmpty() {
    return this.elements_.length === 0;
  }
  isKeyQueued(e) {
    return e in this.queuedElements_;
  }
  isQueued(e) {
    return this.isKeyQueued(this.keyFunction_(e));
  }
  siftUp_(e) {
    const t = this.elements_,
      n = this.priorities_,
      s = t.length,
      r = t[e],
      o = n[e],
      l = e;
    for (; e < s >> 1; ) {
      const a = this.getLeftChildIndex_(e),
        c = this.getRightChildIndex_(e),
        h = c < s && n[c] < n[a] ? c : a;
      (t[e] = t[h]), (n[e] = n[h]), (e = h);
    }
    (t[e] = r), (n[e] = o), this.siftDown_(l, e);
  }
  siftDown_(e, t) {
    const n = this.elements_,
      s = this.priorities_,
      r = n[t],
      o = s[t];
    for (; t > e; ) {
      const l = this.getParentIndex_(t);
      if (s[l] > o) (n[t] = n[l]), (s[t] = s[l]), (t = l);
      else break;
    }
    (n[t] = r), (s[t] = o);
  }
  reprioritize() {
    const e = this.priorityFunction_,
      t = this.elements_,
      n = this.priorities_;
    let s = 0;
    const r = t.length;
    let o, l, a;
    for (l = 0; l < r; ++l)
      (o = t[l]), (a = e(o)), a == Rr ? delete this.queuedElements_[this.keyFunction_(o)] : ((n[s] = a), (t[s++] = o));
    (t.length = s), (n.length = s), this.heapify_();
  }
}
const Rx = Tx;
class bx extends Rx {
  constructor(e, t) {
    super(
      function (n) {
        return e.apply(null, n);
      },
      function (n) {
        return n[0].getKey();
      },
    ),
      (this.boundHandleTileChange_ = this.handleTileChange.bind(this)),
      (this.tileChangeCallback_ = t),
      (this.tilesLoading_ = 0),
      (this.tilesLoadingKeys_ = {});
  }
  enqueue(e) {
    const t = super.enqueue(e);
    return t && e[0].addEventListener(oe.CHANGE, this.boundHandleTileChange_), t;
  }
  getTilesLoading() {
    return this.tilesLoading_;
  }
  handleTileChange(e) {
    const t = e.target,
      n = t.getState();
    if (n === J.LOADED || n === J.ERROR || n === J.EMPTY) {
      n !== J.ERROR && t.removeEventListener(oe.CHANGE, this.boundHandleTileChange_);
      const s = t.getKey();
      s in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[s], --this.tilesLoading_), this.tileChangeCallback_();
    }
  }
  loadMoreTiles(e, t) {
    let n = 0,
      s,
      r,
      o;
    for (; this.tilesLoading_ < e && n < t && this.getCount() > 0; )
      (r = this.dequeue()[0]),
        (o = r.getKey()),
        (s = r.getState()),
        s === J.IDLE && !(o in this.tilesLoadingKeys_) && ((this.tilesLoadingKeys_[o] = !0), ++this.tilesLoading_, ++n, r.load());
  }
}
const Ix = bx;
function Lx(i, e, t, n, s) {
  if (!i || !(t in i.wantedTiles) || !i.wantedTiles[t][e.getKey()]) return Rr;
  const r = i.viewState.center,
    o = n[0] - r[0],
    l = n[1] - r[1];
  return 65536 * Math.log(s) + Math.sqrt(o * o + l * l) / s;
}
class Px extends Ze {
  constructor(e) {
    super();
    const t = e.element;
    t && !e.target && !t.style.pointerEvents && (t.style.pointerEvents = 'auto'),
      (this.element = t || null),
      (this.target_ = null),
      (this.map_ = null),
      (this.listenerKeys = []),
      e.render && (this.render = e.render),
      e.target && this.setTarget(e.target);
  }
  disposeInternal() {
    vr(this.element), super.disposeInternal();
  }
  getMap() {
    return this.map_;
  }
  setMap(e) {
    this.map_ && vr(this.element);
    for (let t = 0, n = this.listenerKeys.length; t < n; ++t) Te(this.listenerKeys[t]);
    (this.listenerKeys.length = 0),
      (this.map_ = e),
      e &&
        ((this.target_ ? this.target_ : e.getOverlayContainerStopEvent()).appendChild(this.element),
        this.render !== Mn && this.listenerKeys.push(_e(e, Ht.POSTRENDER, this.render, this)),
        e.render());
  }
  render(e) {}
  setTarget(e) {
    this.target_ = typeof e == 'string' ? document.getElementById(e) : e;
  }
}
const zn = Px,
  Mx = Object.freeze(Object.defineProperty({ __proto__: null, default: zn }, Symbol.toStringTag, { value: 'Module' }));
class Ax extends zn {
  constructor(e) {
    (e = e || {}),
      super({ element: document.createElement('div'), render: e.render, target: e.target }),
      (this.ulElement_ = document.createElement('ul')),
      (this.collapsed_ = e.collapsed !== void 0 ? e.collapsed : !0),
      (this.userCollapsed_ = this.collapsed_),
      (this.overrideCollapsible_ = e.collapsible !== void 0),
      (this.collapsible_ = e.collapsible !== void 0 ? e.collapsible : !0),
      this.collapsible_ || (this.collapsed_ = !1);
    const t = e.className !== void 0 ? e.className : 'ol-attribution',
      n = e.tipLabel !== void 0 ? e.tipLabel : 'Attributions',
      s = e.expandClassName !== void 0 ? e.expandClassName : t + '-expand',
      r = e.collapseLabel !== void 0 ? e.collapseLabel : '›',
      o = e.collapseClassName !== void 0 ? e.collapseClassName : t + '-collapse';
    typeof r == 'string'
      ? ((this.collapseLabel_ = document.createElement('span')), (this.collapseLabel_.textContent = r), (this.collapseLabel_.className = o))
      : (this.collapseLabel_ = r);
    const l = e.label !== void 0 ? e.label : 'i';
    typeof l == 'string'
      ? ((this.label_ = document.createElement('span')), (this.label_.textContent = l), (this.label_.className = s))
      : (this.label_ = l);
    const a = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    (this.toggleButton_ = document.createElement('button')),
      this.toggleButton_.setAttribute('type', 'button'),
      this.toggleButton_.setAttribute('aria-expanded', String(!this.collapsed_)),
      (this.toggleButton_.title = n),
      this.toggleButton_.appendChild(a),
      this.toggleButton_.addEventListener(oe.CLICK, this.handleClick_.bind(this), !1);
    const c =
        t + ' ' + Jr + ' ' + ya + (this.collapsed_ && this.collapsible_ ? ' ' + eh : '') + (this.collapsible_ ? '' : ' ol-uncollapsible'),
      h = this.element;
    (h.className = c),
      h.appendChild(this.toggleButton_),
      h.appendChild(this.ulElement_),
      (this.renderedAttributions_ = []),
      (this.renderedVisible_ = !0);
  }
  collectSourceAttributions_(e) {
    const t = Array.from(
        new Set(
          this.getMap()
            .getAllLayers()
            .flatMap((s) => s.getAttributions(e)),
        ),
      ),
      n = !this.getMap()
        .getAllLayers()
        .some((s) => s.getSource() && s.getSource().getAttributionsCollapsible() === !1);
    return this.overrideCollapsible_ || this.setCollapsible(n), t;
  }
  updateElement_(e) {
    if (!e) {
      this.renderedVisible_ && ((this.element.style.display = 'none'), (this.renderedVisible_ = !1));
      return;
    }
    const t = this.collectSourceAttributions_(e),
      n = t.length > 0;
    if (
      (this.renderedVisible_ != n && ((this.element.style.display = n ? '' : 'none'), (this.renderedVisible_ = n)),
      !Ti(t, this.renderedAttributions_))
    ) {
      _d(this.ulElement_);
      for (let s = 0, r = t.length; s < r; ++s) {
        const o = document.createElement('li');
        (o.innerHTML = t[s]), this.ulElement_.appendChild(o);
      }
      this.renderedAttributions_ = t;
    }
  }
  handleClick_(e) {
    e.preventDefault(), this.handleToggle_(), (this.userCollapsed_ = this.collapsed_);
  }
  handleToggle_() {
    this.element.classList.toggle(eh),
      this.collapsed_ ? Qc(this.collapseLabel_, this.label_) : Qc(this.label_, this.collapseLabel_),
      (this.collapsed_ = !this.collapsed_),
      this.toggleButton_.setAttribute('aria-expanded', String(!this.collapsed_));
  }
  getCollapsible() {
    return this.collapsible_;
  }
  setCollapsible(e) {
    this.collapsible_ !== e &&
      ((this.collapsible_ = e), this.element.classList.toggle('ol-uncollapsible'), this.userCollapsed_ && this.handleToggle_());
  }
  setCollapsed(e) {
    (this.userCollapsed_ = e), !(!this.collapsible_ || this.collapsed_ === e) && this.handleToggle_();
  }
  getCollapsed() {
    return this.collapsed_;
  }
  render(e) {
    this.updateElement_(e.frameState);
  }
}
const Ox = Ax;
class Fx extends zn {
  constructor(e) {
    (e = e || {}), super({ element: document.createElement('div'), render: e.render, target: e.target });
    const t = e.className !== void 0 ? e.className : 'ol-rotate',
      n = e.label !== void 0 ? e.label : '⇧',
      s = e.compassClassName !== void 0 ? e.compassClassName : 'ol-compass';
    (this.label_ = null),
      typeof n == 'string'
        ? ((this.label_ = document.createElement('span')), (this.label_.className = s), (this.label_.textContent = n))
        : ((this.label_ = n), this.label_.classList.add(s));
    const r = e.tipLabel ? e.tipLabel : 'Reset rotation',
      o = document.createElement('button');
    (o.className = t + '-reset'),
      o.setAttribute('type', 'button'),
      (o.title = r),
      o.appendChild(this.label_),
      o.addEventListener(oe.CLICK, this.handleClick_.bind(this), !1);
    const l = t + ' ' + Jr + ' ' + ya,
      a = this.element;
    (a.className = l),
      a.appendChild(o),
      (this.callResetNorth_ = e.resetNorth ? e.resetNorth : void 0),
      (this.duration_ = e.duration !== void 0 ? e.duration : 250),
      (this.autoHide_ = e.autoHide !== void 0 ? e.autoHide : !0),
      (this.rotation_ = void 0),
      this.autoHide_ && this.element.classList.add(Us);
  }
  handleClick_(e) {
    e.preventDefault(), this.callResetNorth_ !== void 0 ? this.callResetNorth_() : this.resetNorth_();
  }
  resetNorth_() {
    const t = this.getMap().getView();
    if (!t) return;
    const n = t.getRotation();
    n !== void 0 &&
      (this.duration_ > 0 && n % (2 * Math.PI) !== 0 ? t.animate({ rotation: 0, duration: this.duration_, easing: Qi }) : t.setRotation(0));
  }
  render(e) {
    const t = e.frameState;
    if (!t) return;
    const n = t.viewState.rotation;
    if (n != this.rotation_) {
      const s = 'rotate(' + n + 'rad)';
      if (this.autoHide_) {
        const r = this.element.classList.contains(Us);
        !r && n === 0 ? this.element.classList.add(Us) : r && n !== 0 && this.element.classList.remove(Us);
      }
      this.label_.style.transform = s;
    }
    this.rotation_ = n;
  }
}
const Dx = Fx;
class kx extends zn {
  constructor(e) {
    (e = e || {}), super({ element: document.createElement('div'), target: e.target });
    const t = e.className !== void 0 ? e.className : 'ol-zoom',
      n = e.delta !== void 0 ? e.delta : 1,
      s = e.zoomInClassName !== void 0 ? e.zoomInClassName : t + '-in',
      r = e.zoomOutClassName !== void 0 ? e.zoomOutClassName : t + '-out',
      o = e.zoomInLabel !== void 0 ? e.zoomInLabel : '+',
      l = e.zoomOutLabel !== void 0 ? e.zoomOutLabel : '–',
      a = e.zoomInTipLabel !== void 0 ? e.zoomInTipLabel : 'Zoom in',
      c = e.zoomOutTipLabel !== void 0 ? e.zoomOutTipLabel : 'Zoom out',
      h = document.createElement('button');
    (h.className = s),
      h.setAttribute('type', 'button'),
      (h.title = a),
      h.appendChild(typeof o == 'string' ? document.createTextNode(o) : o),
      h.addEventListener(oe.CLICK, this.handleClick_.bind(this, n), !1);
    const u = document.createElement('button');
    (u.className = r),
      u.setAttribute('type', 'button'),
      (u.title = c),
      u.appendChild(typeof l == 'string' ? document.createTextNode(l) : l),
      u.addEventListener(oe.CLICK, this.handleClick_.bind(this, -n), !1);
    const d = t + ' ' + Jr + ' ' + ya,
      f = this.element;
    (f.className = d), f.appendChild(h), f.appendChild(u), (this.duration_ = e.duration !== void 0 ? e.duration : 250);
  }
  handleClick_(e, t) {
    t.preventDefault(), this.zoomByDelta_(e);
  }
  zoomByDelta_(e) {
    const n = this.getMap().getView();
    if (!n) return;
    const s = n.getZoom();
    if (s !== void 0) {
      const r = n.getConstrainedZoom(s + e);
      this.duration_ > 0
        ? (n.getAnimating() && n.cancelAnimations(), n.animate({ zoom: r, duration: this.duration_, easing: Qi }))
        : n.setZoom(r);
    }
  }
}
const Nx = kx;
function Gx(i) {
  i = i || {};
  const e = new dt();
  return (
    (i.zoom !== void 0 ? i.zoom : !0) && e.push(new Nx(i.zoomOptions)),
    (i.rotate !== void 0 ? i.rotate : !0) && e.push(new Dx(i.rotateOptions)),
    (i.attribution !== void 0 ? i.attribution : !0) && e.push(new Ox(i.attributionOptions)),
    e
  );
}
const Ch = { ACTIVE: 'active' };
class Wx extends Ze {
  constructor(e) {
    super(), this.on, this.once, this.un, e && e.handleEvent && (this.handleEvent = e.handleEvent), (this.map_ = null), this.setActive(!0);
  }
  getActive() {
    return this.get(Ch.ACTIVE);
  }
  getMap() {
    return this.map_;
  }
  handleEvent(e) {
    return !0;
  }
  setActive(e) {
    this.set(Ch.ACTIVE, e);
  }
  setMap(e) {
    this.map_ = e;
  }
}
function zx(i, e, t) {
  const n = i.getCenterInternal();
  if (n) {
    const s = [n[0] + e[0], n[1] + e[1]];
    i.animateInternal({ duration: t !== void 0 ? t : 250, easing: Ed, center: i.getConstrainedCenter(s) });
  }
}
function Aa(i, e, t, n) {
  const s = i.getZoom();
  if (s === void 0) return;
  const r = i.getConstrainedZoom(s + e),
    o = i.getResolutionForZoom(r);
  i.getAnimating() && i.cancelAnimations(), i.animate({ resolution: o, anchor: t, duration: n !== void 0 ? n : 250, easing: Qi });
}
const Bn = Wx;
class Bx extends Bn {
  constructor(e) {
    super(), (e = e || {}), (this.delta_ = e.delta ? e.delta : 1), (this.duration_ = e.duration !== void 0 ? e.duration : 250);
  }
  handleEvent(e) {
    let t = !1;
    if (e.type == Ie.DBLCLICK) {
      const n = e.originalEvent,
        s = e.map,
        r = e.coordinate,
        o = n.shiftKey ? -this.delta_ : this.delta_,
        l = s.getView();
      Aa(l, o, r, this.duration_), n.preventDefault(), (t = !0);
    }
    return !t;
  }
}
const Xx = Bx;
class jx extends Bn {
  constructor(e) {
    (e = e || {}),
      super(e),
      e.handleDownEvent && (this.handleDownEvent = e.handleDownEvent),
      e.handleDragEvent && (this.handleDragEvent = e.handleDragEvent),
      e.handleMoveEvent && (this.handleMoveEvent = e.handleMoveEvent),
      e.handleUpEvent && (this.handleUpEvent = e.handleUpEvent),
      e.stopDown && (this.stopDown = e.stopDown),
      (this.handlingDownUpSequence = !1),
      (this.targetPointers = []);
  }
  getPointerCount() {
    return this.targetPointers.length;
  }
  handleDownEvent(e) {
    return !1;
  }
  handleDragEvent(e) {}
  handleEvent(e) {
    if (!e.originalEvent) return !0;
    let t = !1;
    if ((this.updateTrackedPointers_(e), this.handlingDownUpSequence)) {
      if (e.type == Ie.POINTERDRAG) this.handleDragEvent(e), e.originalEvent.preventDefault();
      else if (e.type == Ie.POINTERUP) {
        const n = this.handleUpEvent(e);
        this.handlingDownUpSequence = n && this.targetPointers.length > 0;
      }
    } else if (e.type == Ie.POINTERDOWN) {
      const n = this.handleDownEvent(e);
      (this.handlingDownUpSequence = n), (t = this.stopDown(n));
    } else e.type == Ie.POINTERMOVE && this.handleMoveEvent(e);
    return !t;
  }
  handleMoveEvent(e) {}
  handleUpEvent(e) {
    return !1;
  }
  stopDown(e) {
    return e;
  }
  updateTrackedPointers_(e) {
    e.activePointers && (this.targetPointers = e.activePointers);
  }
}
function Oa(i) {
  const e = i.length;
  let t = 0,
    n = 0;
  for (let s = 0; s < e; s++) (t += i[s].clientX), (n += i[s].clientY);
  return { clientX: t / e, clientY: n / e };
}
const Ms = jx;
function _l(i) {
  const e = arguments;
  return function (t) {
    let n = !0;
    for (let s = 0, r = e.length; s < r && ((n = n && e[s](t)), !!n); ++s);
    return n;
  };
}
const Yx = function (i) {
    const e = i.originalEvent;
    return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
  },
  Ux = function (i) {
    const e = i.map.getTargetElement(),
      t = i.map.getOwnerDocument().activeElement;
    return e.contains(t);
  },
  Od = function (i) {
    return i.map.getTargetElement().hasAttribute('tabindex') ? Ux(i) : !0;
  },
  Vx = Ki,
  Fd = function (i) {
    const e = i.originalEvent;
    return e.button == 0 && !(mp && _p && e.ctrlKey);
  },
  wh = Rs,
  Hx = function (i) {
    return i.type == Ie.SINGLECLICK;
  },
  Dd = function (i) {
    const e = i.originalEvent;
    return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey;
  },
  kd = function (i) {
    const e = i.originalEvent;
    return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
  },
  Nd = function (i) {
    const e = i.originalEvent,
      t = e.target.tagName;
    return t !== 'INPUT' && t !== 'SELECT' && t !== 'TEXTAREA' && !e.target.isContentEditable;
  },
  So = function (i) {
    const e = i.originalEvent;
    return he(e !== void 0, 56), e.pointerType == 'mouse';
  },
  Kx = function (i) {
    const e = i.originalEvent;
    return he(e !== void 0, 56), e.isPrimary && e.button === 0;
  };
class Zx extends Ms {
  constructor(e) {
    super({ stopDown: Rs }),
      (e = e || {}),
      (this.kinetic_ = e.kinetic),
      (this.lastCentroid = null),
      this.lastPointersCount_,
      (this.panning_ = !1);
    const t = e.condition ? e.condition : _l(Dd, Kx);
    (this.condition_ = e.onFocusOnly ? _l(Od, t) : t), (this.noKinetic_ = !1);
  }
  handleDragEvent(e) {
    const t = e.map;
    this.panning_ || ((this.panning_ = !0), t.getView().beginInteraction());
    const n = this.targetPointers,
      s = t.getEventPixel(Oa(n));
    if (n.length == this.lastPointersCount_) {
      if ((this.kinetic_ && this.kinetic_.update(s[0], s[1]), this.lastCentroid)) {
        const r = [this.lastCentroid[0] - s[0], s[1] - this.lastCentroid[1]],
          l = e.map.getView();
        Yp(r, l.getResolution()), sa(r, l.getRotation()), l.adjustCenterInternal(r);
      }
    } else this.kinetic_ && this.kinetic_.begin();
    (this.lastCentroid = s), (this.lastPointersCount_ = n.length), e.originalEvent.preventDefault();
  }
  handleUpEvent(e) {
    const t = e.map,
      n = t.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        const s = this.kinetic_.getDistance(),
          r = this.kinetic_.getAngle(),
          o = n.getCenterInternal(),
          l = t.getPixelFromCoordinateInternal(o),
          a = t.getCoordinateFromPixelInternal([l[0] - s * Math.cos(r), l[1] - s * Math.sin(r)]);
        n.animateInternal({ center: n.getConstrainedCenter(a), duration: 500, easing: Qi });
      }
      return this.panning_ && ((this.panning_ = !1), n.endInteraction()), !1;
    }
    return this.kinetic_ && this.kinetic_.begin(), (this.lastCentroid = null), !0;
  }
  handleDownEvent(e) {
    if (this.targetPointers.length > 0 && this.condition_(e)) {
      const n = e.map.getView();
      return (
        (this.lastCentroid = null),
        n.getAnimating() && n.cancelAnimations(),
        this.kinetic_ && this.kinetic_.begin(),
        (this.noKinetic_ = this.targetPointers.length > 1),
        !0
      );
    }
    return !1;
  }
}
const $x = Zx;
class qx extends Ms {
  constructor(e) {
    (e = e || {}),
      super({ stopDown: Rs }),
      (this.condition_ = e.condition ? e.condition : Yx),
      (this.lastAngle_ = void 0),
      (this.duration_ = e.duration !== void 0 ? e.duration : 250);
  }
  handleDragEvent(e) {
    if (!So(e)) return;
    const t = e.map,
      n = t.getView();
    if (n.getConstraints().rotation === ba) return;
    const s = t.getSize(),
      r = e.pixel,
      o = Math.atan2(s[1] / 2 - r[1], r[0] - s[0] / 2);
    if (this.lastAngle_ !== void 0) {
      const l = o - this.lastAngle_;
      n.adjustRotationInternal(-l);
    }
    this.lastAngle_ = o;
  }
  handleUpEvent(e) {
    return So(e) ? (e.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(e) {
    return So(e) && Fd(e) && this.condition_(e) ? (e.map.getView().beginInteraction(), (this.lastAngle_ = void 0), !0) : !1;
  }
}
const Jx = qx;
class Qx extends Kl {
  constructor(e) {
    super(),
      (this.geometry_ = null),
      (this.element_ = document.createElement('div')),
      (this.element_.style.position = 'absolute'),
      (this.element_.style.pointerEvents = 'auto'),
      (this.element_.className = 'ol-box ' + e),
      (this.map_ = null),
      (this.startPixel_ = null),
      (this.endPixel_ = null);
  }
  disposeInternal() {
    this.setMap(null);
  }
  render_() {
    const e = this.startPixel_,
      t = this.endPixel_,
      n = 'px',
      s = this.element_.style;
    (s.left = Math.min(e[0], t[0]) + n),
      (s.top = Math.min(e[1], t[1]) + n),
      (s.width = Math.abs(t[0] - e[0]) + n),
      (s.height = Math.abs(t[1] - e[1]) + n);
  }
  setMap(e) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_);
      const t = this.element_.style;
      (t.left = 'inherit'), (t.top = 'inherit'), (t.width = 'inherit'), (t.height = 'inherit');
    }
    (this.map_ = e), this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
  }
  setPixels(e, t) {
    (this.startPixel_ = e), (this.endPixel_ = t), this.createOrUpdateGeometry(), this.render_();
  }
  createOrUpdateGeometry() {
    const e = this.startPixel_,
      t = this.endPixel_,
      s = [e, [e[0], t[1]], t, [t[0], e[1]]].map(this.map_.getCoordinateFromPixelInternal, this.map_);
    (s[4] = s[0].slice()), this.geometry_ ? this.geometry_.setCoordinates([s]) : (this.geometry_ = new St([s]));
  }
  getGeometry() {
    return this.geometry_;
  }
}
const ev = Qx,
  $s = { BOXSTART: 'boxstart', BOXDRAG: 'boxdrag', BOXEND: 'boxend', BOXCANCEL: 'boxcancel' };
class To extends Gt {
  constructor(e, t, n) {
    super(e), (this.coordinate = t), (this.mapBrowserEvent = n);
  }
}
class tv extends Ms {
  constructor(e) {
    super(),
      this.on,
      this.once,
      this.un,
      (e = e || {}),
      (this.box_ = new ev(e.className || 'ol-dragbox')),
      (this.minArea_ = e.minArea !== void 0 ? e.minArea : 64),
      e.onBoxEnd && (this.onBoxEnd = e.onBoxEnd),
      (this.startPixel_ = null),
      (this.condition_ = e.condition ? e.condition : Fd),
      (this.boxEndCondition_ = e.boxEndCondition ? e.boxEndCondition : this.defaultBoxEndCondition);
  }
  defaultBoxEndCondition(e, t, n) {
    const s = n[0] - t[0],
      r = n[1] - t[1];
    return s * s + r * r >= this.minArea_;
  }
  getGeometry() {
    return this.box_.getGeometry();
  }
  handleDragEvent(e) {
    this.box_.setPixels(this.startPixel_, e.pixel), this.dispatchEvent(new To($s.BOXDRAG, e.coordinate, e));
  }
  handleUpEvent(e) {
    this.box_.setMap(null);
    const t = this.boxEndCondition_(e, this.startPixel_, e.pixel);
    return t && this.onBoxEnd(e), this.dispatchEvent(new To(t ? $s.BOXEND : $s.BOXCANCEL, e.coordinate, e)), !1;
  }
  handleDownEvent(e) {
    return this.condition_(e)
      ? ((this.startPixel_ = e.pixel),
        this.box_.setMap(e.map),
        this.box_.setPixels(this.startPixel_, this.startPixel_),
        this.dispatchEvent(new To($s.BOXSTART, e.coordinate, e)),
        !0)
      : !1;
  }
  onBoxEnd(e) {}
}
const iv = tv;
class nv extends iv {
  constructor(e) {
    e = e || {};
    const t = e.condition ? e.condition : kd;
    super({ condition: t, className: e.className || 'ol-dragzoom', minArea: e.minArea }),
      (this.duration_ = e.duration !== void 0 ? e.duration : 200),
      (this.out_ = e.out !== void 0 ? e.out : !1);
  }
  onBoxEnd(e) {
    const n = this.getMap().getView();
    let s = this.getGeometry();
    if (this.out_) {
      const r = n.rotatedExtentForGeometry(s),
        o = n.getResolutionForExtentInternal(r),
        l = n.getResolution() / o;
      (s = s.clone()), s.scale(l * l);
    }
    n.fitInternal(s, { duration: this.duration_, easing: Qi });
  }
}
const sv = nv,
  Pi = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
class rv extends Bn {
  constructor(e) {
    super(),
      (e = e || {}),
      (this.defaultCondition_ = function (t) {
        return Dd(t) && Nd(t);
      }),
      (this.condition_ = e.condition !== void 0 ? e.condition : this.defaultCondition_),
      (this.duration_ = e.duration !== void 0 ? e.duration : 100),
      (this.pixelDelta_ = e.pixelDelta !== void 0 ? e.pixelDelta : 128);
  }
  handleEvent(e) {
    let t = !1;
    if (e.type == oe.KEYDOWN) {
      const n = e.originalEvent,
        s = n.keyCode;
      if (this.condition_(e) && (s == Pi.DOWN || s == Pi.LEFT || s == Pi.RIGHT || s == Pi.UP)) {
        const o = e.map.getView(),
          l = o.getResolution() * this.pixelDelta_;
        let a = 0,
          c = 0;
        s == Pi.DOWN ? (c = -l) : s == Pi.LEFT ? (a = -l) : s == Pi.RIGHT ? (a = l) : (c = l);
        const h = [a, c];
        sa(h, o.getRotation()), zx(o, h, this.duration_), n.preventDefault(), (t = !0);
      }
    }
    return !t;
  }
}
const ov = rv;
class lv extends Bn {
  constructor(e) {
    super(),
      (e = e || {}),
      (this.condition_ = e.condition ? e.condition : Nd),
      (this.delta_ = e.delta ? e.delta : 1),
      (this.duration_ = e.duration !== void 0 ? e.duration : 100);
  }
  handleEvent(e) {
    let t = !1;
    if (e.type == oe.KEYDOWN || e.type == oe.KEYPRESS) {
      const n = e.originalEvent,
        s = n.key;
      if (this.condition_(e) && (s === '+' || s === '-')) {
        const r = e.map,
          o = s === '+' ? this.delta_ : -this.delta_,
          l = r.getView();
        Aa(l, o, void 0, this.duration_), n.preventDefault(), (t = !0);
      }
    }
    return !t;
  }
}
const av = lv;
class cv extends Bn {
  constructor(e) {
    (e = e || {}),
      super(e),
      (this.totalDelta_ = 0),
      (this.lastDelta_ = 0),
      (this.maxDelta_ = e.maxDelta !== void 0 ? e.maxDelta : 1),
      (this.duration_ = e.duration !== void 0 ? e.duration : 250),
      (this.timeout_ = e.timeout !== void 0 ? e.timeout : 80),
      (this.useAnchor_ = e.useAnchor !== void 0 ? e.useAnchor : !0),
      (this.constrainResolution_ = e.constrainResolution !== void 0 ? e.constrainResolution : !1);
    const t = e.condition ? e.condition : Vx;
    (this.condition_ = e.onFocusOnly ? _l(Od, t) : t),
      (this.lastAnchor_ = null),
      (this.startTime_ = void 0),
      this.timeoutId_,
      (this.mode_ = void 0),
      (this.trackpadEventGap_ = 400),
      this.trackpadTimeoutId_,
      (this.deltaPerZoom_ = 300);
  }
  endInteraction_() {
    this.trackpadTimeoutId_ = void 0;
    const e = this.getMap();
    if (!e) return;
    e.getView().endInteraction(void 0, this.lastDelta_ ? (this.lastDelta_ > 0 ? 1 : -1) : 0, this.lastAnchor_);
  }
  handleEvent(e) {
    if (!this.condition_(e) || e.type !== oe.WHEEL) return !0;
    const n = e.map,
      s = e.originalEvent;
    s.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = e.coordinate);
    let r;
    if (
      (e.type == oe.WHEEL &&
        ((r = s.deltaY),
        fp && s.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (r /= Ni),
        s.deltaMode === WheelEvent.DOM_DELTA_LINE && (r *= 40)),
      r === 0)
    )
      return !1;
    this.lastDelta_ = r;
    const o = Date.now();
    this.startTime_ === void 0 && (this.startTime_ = o),
      (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(r) < 4 ? 'trackpad' : 'wheel');
    const l = n.getView();
    if (this.mode_ === 'trackpad' && !(l.getConstrainResolution() || this.constrainResolution_))
      return (
        this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : (l.getAnimating() && l.cancelAnimations(), l.beginInteraction()),
        (this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.timeout_)),
        l.adjustZoom(-r / this.deltaPerZoom_, this.lastAnchor_),
        (this.startTime_ = o),
        !1
      );
    this.totalDelta_ += r;
    const a = Math.max(this.timeout_ - (o - this.startTime_), 0);
    return clearTimeout(this.timeoutId_), (this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, n), a)), !1;
  }
  handleWheelZoom_(e) {
    const t = e.getView();
    t.getAnimating() && t.cancelAnimations();
    let n = -Fe(this.totalDelta_, -this.maxDelta_ * this.deltaPerZoom_, this.maxDelta_ * this.deltaPerZoom_) / this.deltaPerZoom_;
    (t.getConstrainResolution() || this.constrainResolution_) && (n = n ? (n > 0 ? 1 : -1) : 0),
      Aa(t, n, this.lastAnchor_, this.duration_),
      (this.mode_ = void 0),
      (this.totalDelta_ = 0),
      (this.lastAnchor_ = null),
      (this.startTime_ = void 0),
      (this.timeoutId_ = void 0);
  }
  setMouseAnchor(e) {
    (this.useAnchor_ = e), e || (this.lastAnchor_ = null);
  }
}
const hv = cv;
class uv extends Ms {
  constructor(e) {
    e = e || {};
    const t = e;
    t.stopDown || (t.stopDown = Rs),
      super(t),
      (this.anchor_ = null),
      (this.lastAngle_ = void 0),
      (this.rotating_ = !1),
      (this.rotationDelta_ = 0),
      (this.threshold_ = e.threshold !== void 0 ? e.threshold : 0.3),
      (this.duration_ = e.duration !== void 0 ? e.duration : 250);
  }
  handleDragEvent(e) {
    let t = 0;
    const n = this.targetPointers[0],
      s = this.targetPointers[1],
      r = Math.atan2(s.clientY - n.clientY, s.clientX - n.clientX);
    if (this.lastAngle_ !== void 0) {
      const a = r - this.lastAngle_;
      (this.rotationDelta_ += a), !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), (t = a);
    }
    this.lastAngle_ = r;
    const o = e.map,
      l = o.getView();
    l.getConstraints().rotation !== ba &&
      ((this.anchor_ = o.getCoordinateFromPixelInternal(o.getEventPixel(Oa(this.targetPointers)))),
      this.rotating_ && (o.render(), l.adjustRotationInternal(t, this.anchor_)));
  }
  handleUpEvent(e) {
    return this.targetPointers.length < 2 ? (e.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(e) {
    if (this.targetPointers.length >= 2) {
      const t = e.map;
      return (
        (this.anchor_ = null),
        (this.lastAngle_ = void 0),
        (this.rotating_ = !1),
        (this.rotationDelta_ = 0),
        this.handlingDownUpSequence || t.getView().beginInteraction(),
        !0
      );
    }
    return !1;
  }
}
const dv = uv;
class fv extends Ms {
  constructor(e) {
    e = e || {};
    const t = e;
    t.stopDown || (t.stopDown = Rs),
      super(t),
      (this.anchor_ = null),
      (this.duration_ = e.duration !== void 0 ? e.duration : 400),
      (this.lastDistance_ = void 0),
      (this.lastScaleDelta_ = 1);
  }
  handleDragEvent(e) {
    let t = 1;
    const n = this.targetPointers[0],
      s = this.targetPointers[1],
      r = n.clientX - s.clientX,
      o = n.clientY - s.clientY,
      l = Math.sqrt(r * r + o * o);
    this.lastDistance_ !== void 0 && (t = this.lastDistance_ / l), (this.lastDistance_ = l);
    const a = e.map,
      c = a.getView();
    t != 1 && (this.lastScaleDelta_ = t),
      (this.anchor_ = a.getCoordinateFromPixelInternal(a.getEventPixel(Oa(this.targetPointers)))),
      a.render(),
      c.adjustResolutionInternal(t, this.anchor_);
  }
  handleUpEvent(e) {
    if (this.targetPointers.length < 2) {
      const n = e.map.getView(),
        s = this.lastScaleDelta_ > 1 ? 1 : -1;
      return n.endInteraction(this.duration_, s), !1;
    }
    return !0;
  }
  handleDownEvent(e) {
    if (this.targetPointers.length >= 2) {
      const t = e.map;
      return (
        (this.anchor_ = null),
        (this.lastDistance_ = void 0),
        (this.lastScaleDelta_ = 1),
        this.handlingDownUpSequence || t.getView().beginInteraction(),
        !0
      );
    }
    return !1;
  }
}
const gv = fv;
function mv(i) {
  i = i || {};
  const e = new dt(),
    t = new gx(-0.005, 0.05, 100);
  return (
    (i.altShiftDragRotate !== void 0 ? i.altShiftDragRotate : !0) && e.push(new Jx()),
    (i.doubleClickZoom !== void 0 ? i.doubleClickZoom : !0) && e.push(new Xx({ delta: i.zoomDelta, duration: i.zoomDuration })),
    (i.dragPan !== void 0 ? i.dragPan : !0) && e.push(new $x({ onFocusOnly: i.onFocusOnly, kinetic: t })),
    (i.pinchRotate !== void 0 ? i.pinchRotate : !0) && e.push(new dv()),
    (i.pinchZoom !== void 0 ? i.pinchZoom : !0) && e.push(new gv({ duration: i.zoomDuration })),
    (i.keyboard !== void 0 ? i.keyboard : !0) && (e.push(new ov()), e.push(new av({ delta: i.zoomDelta, duration: i.zoomDuration }))),
    (i.mouseWheelZoom !== void 0 ? i.mouseWheelZoom : !0) && e.push(new hv({ onFocusOnly: i.onFocusOnly, duration: i.zoomDuration })),
    (i.shiftDragZoom !== void 0 ? i.shiftDragZoom : !0) && e.push(new sv({ duration: i.zoomDuration })),
    e
  );
}
function Gd(i) {
  if (i instanceof Qr) {
    i.setMapInternal(null);
    return;
  }
  i instanceof Zi && i.getLayers().forEach(Gd);
}
function Wd(i, e) {
  if (i instanceof Qr) {
    i.setMapInternal(e);
    return;
  }
  if (i instanceof Zi) {
    const t = i.getLayers().getArray();
    for (let n = 0, s = t.length; n < s; ++n) Wd(t[n], e);
  }
}
let _v = class extends Ze {
  constructor(e) {
    super(), (e = e || {}), this.on, this.once, this.un;
    const t = pv(e);
    this.renderComplete_,
      (this.loaded_ = !0),
      (this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this)),
      (this.maxTilesLoading_ = e.maxTilesLoading !== void 0 ? e.maxTilesLoading : 16),
      (this.pixelRatio_ = e.pixelRatio !== void 0 ? e.pixelRatio : Ni),
      this.postRenderTimeoutHandle_,
      this.animationDelayKey_,
      (this.animationDelay_ = this.animationDelay_.bind(this)),
      (this.coordinateToPixelTransform_ = wt()),
      (this.pixelToCoordinateTransform_ = wt()),
      (this.frameIndex_ = 0),
      (this.frameState_ = null),
      (this.previousExtent_ = null),
      (this.viewPropertyListenerKey_ = null),
      (this.viewChangeListenerKey_ = null),
      (this.layerGroupPropertyListenerKeys_ = null),
      (this.viewport_ = document.createElement('div')),
      (this.viewport_.className = 'ol-viewport' + ('ontouchstart' in window ? ' ol-touch' : '')),
      (this.viewport_.style.position = 'relative'),
      (this.viewport_.style.overflow = 'hidden'),
      (this.viewport_.style.width = '100%'),
      (this.viewport_.style.height = '100%'),
      (this.overlayContainer_ = document.createElement('div')),
      (this.overlayContainer_.style.position = 'absolute'),
      (this.overlayContainer_.style.zIndex = '0'),
      (this.overlayContainer_.style.width = '100%'),
      (this.overlayContainer_.style.height = '100%'),
      (this.overlayContainer_.style.pointerEvents = 'none'),
      (this.overlayContainer_.className = 'ol-overlaycontainer'),
      this.viewport_.appendChild(this.overlayContainer_),
      (this.overlayContainerStopEvent_ = document.createElement('div')),
      (this.overlayContainerStopEvent_.style.position = 'absolute'),
      (this.overlayContainerStopEvent_.style.zIndex = '0'),
      (this.overlayContainerStopEvent_.style.width = '100%'),
      (this.overlayContainerStopEvent_.style.height = '100%'),
      (this.overlayContainerStopEvent_.style.pointerEvents = 'none'),
      (this.overlayContainerStopEvent_.className = 'ol-overlaycontainer-stopevent'),
      this.viewport_.appendChild(this.overlayContainerStopEvent_),
      (this.mapBrowserEventHandler_ = null),
      (this.moveTolerance_ = e.moveTolerance),
      (this.keyboardEventTarget_ = t.keyboardEventTarget),
      (this.targetChangeHandlerKeys_ = null),
      (this.targetElement_ = null),
      (this.resizeObserver_ = new ResizeObserver(() => this.updateSize())),
      (this.controls = t.controls || Gx()),
      (this.interactions = t.interactions || mv({ onFocusOnly: !0 })),
      (this.overlays_ = t.overlays),
      (this.overlayIdIndex_ = {}),
      (this.renderer_ = null),
      (this.postRenderFunctions_ = []),
      (this.tileQueue_ = new Ix(this.getTilePriority.bind(this), this.handleTileChange_.bind(this))),
      this.addChangeListener(je.LAYERGROUP, this.handleLayerGroupChanged_),
      this.addChangeListener(je.VIEW, this.handleViewChanged_),
      this.addChangeListener(je.SIZE, this.handleSizeChanged_),
      this.addChangeListener(je.TARGET, this.handleTargetChanged_),
      this.setProperties(t.values);
    const n = this;
    e.view &&
      !(e.view instanceof At) &&
      e.view.then(function (s) {
        n.setView(new At(s));
      }),
      this.controls.addEventListener(Ge.ADD, (s) => {
        s.element.setMap(this);
      }),
      this.controls.addEventListener(Ge.REMOVE, (s) => {
        s.element.setMap(null);
      }),
      this.interactions.addEventListener(Ge.ADD, (s) => {
        s.element.setMap(this);
      }),
      this.interactions.addEventListener(Ge.REMOVE, (s) => {
        s.element.setMap(null);
      }),
      this.overlays_.addEventListener(Ge.ADD, (s) => {
        this.addOverlayInternal_(s.element);
      }),
      this.overlays_.addEventListener(Ge.REMOVE, (s) => {
        const r = s.element.getId();
        r !== void 0 && delete this.overlayIdIndex_[r.toString()], s.element.setMap(null);
      }),
      this.controls.forEach((s) => {
        s.setMap(this);
      }),
      this.interactions.forEach((s) => {
        s.setMap(this);
      }),
      this.overlays_.forEach(this.addOverlayInternal_.bind(this));
  }
  addControl(e) {
    this.getControls().push(e);
  }
  addInteraction(e) {
    this.getInteractions().push(e);
  }
  addLayer(e) {
    this.getLayerGroup().getLayers().push(e);
  }
  handleLayerAdd_(e) {
    Wd(e.layer, this);
  }
  addOverlay(e) {
    this.getOverlays().push(e);
  }
  addOverlayInternal_(e) {
    const t = e.getId();
    t !== void 0 && (this.overlayIdIndex_[t.toString()] = e), e.setMap(this);
  }
  disposeInternal() {
    this.controls.clear(),
      this.interactions.clear(),
      this.overlays_.clear(),
      this.resizeObserver_.disconnect(),
      this.setTarget(null),
      super.disposeInternal();
  }
  forEachFeatureAtPixel(e, t, n) {
    if (!this.frameState_ || !this.renderer_) return;
    const s = this.getCoordinateFromPixelInternal(e);
    n = n !== void 0 ? n : {};
    const r = n.hitTolerance !== void 0 ? n.hitTolerance : 0,
      o = n.layerFilter !== void 0 ? n.layerFilter : Ki,
      l = n.checkWrapped !== !1;
    return this.renderer_.forEachFeatureAtCoordinate(s, this.frameState_, r, l, t, null, o, null);
  }
  getFeaturesAtPixel(e, t) {
    const n = [];
    return (
      this.forEachFeatureAtPixel(
        e,
        function (s) {
          n.push(s);
        },
        t,
      ),
      n
    );
  }
  getAllLayers() {
    const e = [];
    function t(n) {
      n.forEach(function (s) {
        s instanceof Zi ? t(s.getLayers()) : e.push(s);
      });
    }
    return t(this.getLayers()), e;
  }
  hasFeatureAtPixel(e, t) {
    if (!this.frameState_ || !this.renderer_) return !1;
    const n = this.getCoordinateFromPixelInternal(e);
    t = t !== void 0 ? t : {};
    const s = t.layerFilter !== void 0 ? t.layerFilter : Ki,
      r = t.hitTolerance !== void 0 ? t.hitTolerance : 0,
      o = t.checkWrapped !== !1;
    return this.renderer_.hasFeatureAtCoordinate(n, this.frameState_, r, o, s, null);
  }
  getEventCoordinate(e) {
    return this.getCoordinateFromPixel(this.getEventPixel(e));
  }
  getEventCoordinateInternal(e) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(e));
  }
  getEventPixel(e) {
    const n = this.viewport_.getBoundingClientRect(),
      s = this.getSize(),
      r = n.width / s[0],
      o = n.height / s[1],
      l = 'changedTouches' in e ? e.changedTouches[0] : e;
    return [(l.clientX - n.left) / r, (l.clientY - n.top) / o];
  }
  getTarget() {
    return this.get(je.TARGET);
  }
  getTargetElement() {
    return this.targetElement_;
  }
  getCoordinateFromPixel(e) {
    return rl(this.getCoordinateFromPixelInternal(e), this.getView().getProjection());
  }
  getCoordinateFromPixelInternal(e) {
    const t = this.frameState_;
    return t ? Ne(t.pixelToCoordinateTransform, e.slice()) : null;
  }
  getControls() {
    return this.controls;
  }
  getOverlays() {
    return this.overlays_;
  }
  getOverlayById(e) {
    const t = this.overlayIdIndex_[e.toString()];
    return t !== void 0 ? t : null;
  }
  getInteractions() {
    return this.interactions;
  }
  getLayerGroup() {
    return this.get(je.LAYERGROUP);
  }
  setLayers(e) {
    const t = this.getLayerGroup();
    if (e instanceof dt) {
      t.setLayers(e);
      return;
    }
    const n = t.getLayers();
    n.clear(), n.extend(e);
  }
  getLayers() {
    return this.getLayerGroup().getLayers();
  }
  getLoadingOrNotReady() {
    const e = this.getLayerGroup().getLayerStatesArray();
    for (let t = 0, n = e.length; t < n; ++t) {
      const s = e[t];
      if (!s.visible) continue;
      const r = s.layer.getRenderer();
      if (r && !r.ready) return !0;
      const o = s.layer.getSource();
      if (o && o.loading) return !0;
    }
    return !1;
  }
  getPixelFromCoordinate(e) {
    const t = Yt(e, this.getView().getProjection());
    return this.getPixelFromCoordinateInternal(t);
  }
  getPixelFromCoordinateInternal(e) {
    const t = this.frameState_;
    return t ? Ne(t.coordinateToPixelTransform, e.slice(0, 2)) : null;
  }
  getRenderer() {
    return this.renderer_;
  }
  getSize() {
    return this.get(je.SIZE);
  }
  getView() {
    return this.get(je.VIEW);
  }
  getViewport() {
    return this.viewport_;
  }
  getOverlayContainer() {
    return this.overlayContainer_;
  }
  getOverlayContainerStopEvent() {
    return this.overlayContainerStopEvent_;
  }
  getOwnerDocument() {
    const e = this.getTargetElement();
    return e ? e.ownerDocument : document;
  }
  getTilePriority(e, t, n, s) {
    return Lx(this.frameState_, e, t, n, s);
  }
  handleBrowserEvent(e, t) {
    t = t || e.type;
    const n = new hi(t, this, e);
    this.handleMapBrowserEvent(n);
  }
  handleMapBrowserEvent(e) {
    if (!this.frameState_) return;
    const t = e.originalEvent,
      n = t.type;
    if (n === ml.POINTERDOWN || n === oe.WHEEL || n === oe.KEYDOWN) {
      const s = this.getOwnerDocument(),
        r = this.viewport_.getRootNode ? this.viewport_.getRootNode() : s,
        o = t.target;
      if (this.overlayContainerStopEvent_.contains(o) || !(r === s ? s.documentElement : r).contains(o)) return;
    }
    if (((e.frameState = this.frameState_), this.dispatchEvent(e) !== !1)) {
      const s = this.getInteractions().getArray().slice();
      for (let r = s.length - 1; r >= 0; r--) {
        const o = s[r];
        if (o.getMap() !== this || !o.getActive() || !this.getTargetElement()) continue;
        if (!o.handleEvent(e) || e.propagationStopped) break;
      }
    }
  }
  handlePostRender() {
    const e = this.frameState_,
      t = this.tileQueue_;
    if (!t.isEmpty()) {
      let s = this.maxTilesLoading_,
        r = s;
      if (e) {
        const o = e.viewHints;
        if (o[Ye.ANIMATING] || o[Ye.INTERACTING]) {
          const l = Date.now() - e.time > 8;
          (s = l ? 0 : 8), (r = l ? 0 : 2);
        }
      }
      t.getTilesLoading() < s && (t.reprioritize(), t.loadMoreTiles(s, r));
    }
    e &&
      this.renderer_ &&
      !e.animate &&
      (this.renderComplete_ === !0
        ? (this.hasListener(yi.RENDERCOMPLETE) && this.renderer_.dispatchRenderEvent(yi.RENDERCOMPLETE, e),
          this.loaded_ === !1 && ((this.loaded_ = !0), this.dispatchEvent(new mn(Ht.LOADEND, this, e))))
        : this.loaded_ === !0 && ((this.loaded_ = !1), this.dispatchEvent(new mn(Ht.LOADSTART, this, e))));
    const n = this.postRenderFunctions_;
    for (let s = 0, r = n.length; s < r; ++s) n[s](this, e);
    n.length = 0;
  }
  handleSizeChanged_() {
    this.getView() && !this.getView().getAnimating() && this.getView().resolveConstraints(0), this.render();
  }
  handleTargetChanged_() {
    if (this.mapBrowserEventHandler_) {
      for (let n = 0, s = this.targetChangeHandlerKeys_.length; n < s; ++n) Te(this.targetChangeHandlerKeys_[n]);
      (this.targetChangeHandlerKeys_ = null),
        this.viewport_.removeEventListener(oe.CONTEXTMENU, this.boundHandleBrowserEvent_),
        this.viewport_.removeEventListener(oe.WHEEL, this.boundHandleBrowserEvent_),
        this.mapBrowserEventHandler_.dispose(),
        (this.mapBrowserEventHandler_ = null),
        vr(this.viewport_);
    }
    if (this.targetElement_) {
      this.resizeObserver_.unobserve(this.targetElement_);
      const n = this.targetElement_.getRootNode();
      n instanceof ShadowRoot && this.resizeObserver_.unobserve(n.host);
    }
    const e = this.getTarget(),
      t = typeof e == 'string' ? document.getElementById(e) : e;
    if (((this.targetElement_ = t), !t))
      this.renderer_ &&
        (clearTimeout(this.postRenderTimeoutHandle_),
        (this.postRenderTimeoutHandle_ = void 0),
        (this.postRenderFunctions_.length = 0),
        this.renderer_.dispose(),
        (this.renderer_ = null)),
        this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), (this.animationDelayKey_ = void 0));
    else {
      t.appendChild(this.viewport_),
        this.renderer_ || (this.renderer_ = new xx(this)),
        (this.mapBrowserEventHandler_ = new Sx(this, this.moveTolerance_));
      for (const r in Ie) this.mapBrowserEventHandler_.addEventListener(Ie[r], this.handleMapBrowserEvent.bind(this));
      this.viewport_.addEventListener(oe.CONTEXTMENU, this.boundHandleBrowserEvent_, !1),
        this.viewport_.addEventListener(oe.WHEEL, this.boundHandleBrowserEvent_, Wu ? { passive: !1 } : !1);
      const n = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : t;
      this.targetChangeHandlerKeys_ = [_e(n, oe.KEYDOWN, this.handleBrowserEvent, this), _e(n, oe.KEYPRESS, this.handleBrowserEvent, this)];
      const s = t.getRootNode();
      s instanceof ShadowRoot && this.resizeObserver_.observe(s.host), this.resizeObserver_.observe(t);
    }
    this.updateSize();
  }
  handleTileChange_() {
    this.render();
  }
  handleViewPropertyChanged_() {
    this.render();
  }
  handleViewChanged_() {
    this.viewPropertyListenerKey_ && (Te(this.viewPropertyListenerKey_), (this.viewPropertyListenerKey_ = null)),
      this.viewChangeListenerKey_ && (Te(this.viewChangeListenerKey_), (this.viewChangeListenerKey_ = null));
    const e = this.getView();
    e &&
      (this.updateViewportSize_(),
      (this.viewPropertyListenerKey_ = _e(e, Pn.PROPERTYCHANGE, this.handleViewPropertyChanged_, this)),
      (this.viewChangeListenerKey_ = _e(e, oe.CHANGE, this.handleViewPropertyChanged_, this)),
      e.resolveConstraints(0)),
      this.render();
  }
  handleLayerGroupChanged_() {
    this.layerGroupPropertyListenerKeys_ &&
      (this.layerGroupPropertyListenerKeys_.forEach(Te), (this.layerGroupPropertyListenerKeys_ = null));
    const e = this.getLayerGroup();
    e &&
      (this.handleLayerAdd_(new Kt('addlayer', e)),
      (this.layerGroupPropertyListenerKeys_ = [
        _e(e, Pn.PROPERTYCHANGE, this.render, this),
        _e(e, oe.CHANGE, this.render, this),
        _e(e, 'addlayer', this.handleLayerAdd_, this),
        _e(e, 'removelayer', this.handleLayerRemove_, this),
      ])),
      this.render();
  }
  isRendered() {
    return !!this.frameState_;
  }
  animationDelay_() {
    (this.animationDelayKey_ = void 0), this.renderFrame_(Date.now());
  }
  renderSync() {
    this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_();
  }
  redrawText() {
    const e = this.getLayerGroup().getLayerStatesArray();
    for (let t = 0, n = e.length; t < n; ++t) {
      const s = e[t].layer;
      s.hasRenderer() && s.getRenderer().handleFontsChanged();
    }
  }
  render() {
    this.renderer_ && this.animationDelayKey_ === void 0 && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_));
  }
  removeControl(e) {
    return this.getControls().remove(e);
  }
  removeInteraction(e) {
    return this.getInteractions().remove(e);
  }
  removeLayer(e) {
    return this.getLayerGroup().getLayers().remove(e);
  }
  handleLayerRemove_(e) {
    Gd(e.layer);
  }
  removeOverlay(e) {
    return this.getOverlays().remove(e);
  }
  renderFrame_(e) {
    const t = this.getSize(),
      n = this.getView(),
      s = this.frameState_;
    let r = null;
    if (t !== void 0 && qc(t) && n && n.isDef()) {
      const o = n.getHints(this.frameState_ ? this.frameState_.viewHints : void 0),
        l = n.getState();
      if (
        ((r = {
          animate: !1,
          coordinateToPixelTransform: this.coordinateToPixelTransform_,
          declutterTree: null,
          extent: tl(l.center, l.resolution, l.rotation, t),
          index: this.frameIndex_++,
          layerIndex: 0,
          layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
          pixelRatio: this.pixelRatio_,
          pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
          postRenderFunctions: [],
          size: t,
          tileQueue: this.tileQueue_,
          time: e,
          usedTiles: {},
          viewState: l,
          viewHints: o,
          wantedTiles: {},
          mapId: fe(this),
          renderTargets: {},
        }),
        l.nextCenter && l.nextResolution)
      ) {
        const a = isNaN(l.nextRotation) ? l.rotation : l.nextRotation;
        r.nextExtent = tl(l.nextCenter, l.nextResolution, a, t);
      }
    }
    (this.frameState_ = r),
      this.renderer_.renderFrame(r),
      r &&
        (r.animate && this.render(),
        Array.prototype.push.apply(this.postRenderFunctions_, r.postRenderFunctions),
        s &&
          (!this.previousExtent_ || (!ia(this.previousExtent_) && !gs(r.extent, this.previousExtent_))) &&
          (this.dispatchEvent(new mn(Ht.MOVESTART, this, s)), (this.previousExtent_ = bs(this.previousExtent_))),
        this.previousExtent_ &&
          !r.viewHints[Ye.ANIMATING] &&
          !r.viewHints[Ye.INTERACTING] &&
          !gs(r.extent, this.previousExtent_) &&
          (this.dispatchEvent(new mn(Ht.MOVEEND, this, r)), ju(r.extent, this.previousExtent_))),
      this.dispatchEvent(new mn(Ht.POSTRENDER, this, r)),
      (this.renderComplete_ =
        this.hasListener(Ht.LOADSTART) || this.hasListener(Ht.LOADEND) || this.hasListener(yi.RENDERCOMPLETE)
          ? !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady()
          : void 0),
      this.postRenderTimeoutHandle_ ||
        (this.postRenderTimeoutHandle_ = setTimeout(() => {
          (this.postRenderTimeoutHandle_ = void 0), this.handlePostRender();
        }, 0));
  }
  setLayerGroup(e) {
    const t = this.getLayerGroup();
    t && this.handleLayerRemove_(new Kt('removelayer', t)), this.set(je.LAYERGROUP, e);
  }
  setSize(e) {
    this.set(je.SIZE, e);
  }
  setTarget(e) {
    this.set(je.TARGET, e);
  }
  setView(e) {
    if (!e || e instanceof At) {
      this.set(je.VIEW, e);
      return;
    }
    this.set(je.VIEW, new At());
    const t = this;
    e.then(function (n) {
      t.setView(new At(n));
    });
  }
  updateSize() {
    const e = this.getTargetElement();
    let t;
    if (e) {
      const s = getComputedStyle(e),
        r =
          e.offsetWidth -
          parseFloat(s.borderLeftWidth) -
          parseFloat(s.paddingLeft) -
          parseFloat(s.paddingRight) -
          parseFloat(s.borderRightWidth),
        o =
          e.offsetHeight -
          parseFloat(s.borderTopWidth) -
          parseFloat(s.paddingTop) -
          parseFloat(s.paddingBottom) -
          parseFloat(s.borderBottomWidth);
      !isNaN(r) &&
        !isNaN(o) &&
        ((t = [r, o]),
        !qc(t) &&
          (e.offsetWidth || e.offsetHeight || e.getClientRects().length) &&
          qu("No map visible because the map container's width or height are 0."));
    }
    const n = this.getSize();
    t && (!n || !Ti(t, n)) && (this.setSize(t), this.updateViewportSize_());
  }
  updateViewportSize_() {
    const e = this.getView();
    if (e) {
      let t;
      const n = getComputedStyle(this.viewport_);
      n.width && n.height && (t = [parseInt(n.width, 10), parseInt(n.height, 10)]), e.setViewportSize(t);
    }
  }
};
function pv(i) {
  let e = null;
  i.keyboardEventTarget !== void 0 &&
    (e = typeof i.keyboardEventTarget == 'string' ? document.getElementById(i.keyboardEventTarget) : i.keyboardEventTarget);
  const t = {},
    n = i.layers && typeof i.layers.getLayers == 'function' ? i.layers : new Zi({ layers: i.layers });
  (t[je.LAYERGROUP] = n), (t[je.TARGET] = i.target), (t[je.VIEW] = i.view instanceof At ? i.view : new At());
  let s;
  i.controls !== void 0 &&
    (Array.isArray(i.controls) ? (s = new dt(i.controls.slice())) : (he(typeof i.controls.getArray == 'function', 47), (s = i.controls)));
  let r;
  i.interactions !== void 0 &&
    (Array.isArray(i.interactions)
      ? (r = new dt(i.interactions.slice()))
      : (he(typeof i.interactions.getArray == 'function', 48), (r = i.interactions)));
  let o;
  return (
    i.overlays !== void 0
      ? Array.isArray(i.overlays)
        ? (o = new dt(i.overlays.slice()))
        : (he(typeof i.overlays.getArray == 'function', 49), (o = i.overlays))
      : (o = new dt()),
    { controls: s, interactions: r, keyboardEventTarget: e, overlays: o, values: t }
  );
}
const zd = _v,
  Xe = { ELEMENT: 'element', MAP: 'map', OFFSET: 'offset', POSITION: 'position', POSITIONING: 'positioning' };
class yv extends Ze {
  constructor(e) {
    super(),
      this.on,
      this.once,
      this.un,
      (this.options = e),
      (this.id = e.id),
      (this.insertFirst = e.insertFirst !== void 0 ? e.insertFirst : !0),
      (this.stopEvent = e.stopEvent !== void 0 ? e.stopEvent : !0),
      (this.element = document.createElement('div')),
      (this.element.className = e.className !== void 0 ? e.className : 'ol-overlay-container ' + Py),
      (this.element.style.position = 'absolute'),
      (this.element.style.pointerEvents = 'auto'),
      (this.autoPan = e.autoPan === !0 ? {} : e.autoPan || void 0),
      (this.rendered = { transform_: '', visible: !0 }),
      (this.mapPostrenderListenerKey = null),
      this.addChangeListener(Xe.ELEMENT, this.handleElementChanged),
      this.addChangeListener(Xe.MAP, this.handleMapChanged),
      this.addChangeListener(Xe.OFFSET, this.handleOffsetChanged),
      this.addChangeListener(Xe.POSITION, this.handlePositionChanged),
      this.addChangeListener(Xe.POSITIONING, this.handlePositioningChanged),
      e.element !== void 0 && this.setElement(e.element),
      this.setOffset(e.offset !== void 0 ? e.offset : [0, 0]),
      this.setPositioning(e.positioning || 'top-left'),
      e.position !== void 0 && this.setPosition(e.position);
  }
  getElement() {
    return this.get(Xe.ELEMENT);
  }
  getId() {
    return this.id;
  }
  getMap() {
    return this.get(Xe.MAP) || null;
  }
  getOffset() {
    return this.get(Xe.OFFSET);
  }
  getPosition() {
    return this.get(Xe.POSITION);
  }
  getPositioning() {
    return this.get(Xe.POSITIONING);
  }
  handleElementChanged() {
    _d(this.element);
    const e = this.getElement();
    e && this.element.appendChild(e);
  }
  handleMapChanged() {
    this.mapPostrenderListenerKey && (vr(this.element), Te(this.mapPostrenderListenerKey), (this.mapPostrenderListenerKey = null));
    const e = this.getMap();
    if (e) {
      (this.mapPostrenderListenerKey = _e(e, Ht.POSTRENDER, this.render, this)), this.updatePixelPosition();
      const t = this.stopEvent ? e.getOverlayContainerStopEvent() : e.getOverlayContainer();
      this.insertFirst ? t.insertBefore(this.element, t.childNodes[0] || null) : t.appendChild(this.element), this.performAutoPan();
    }
  }
  render() {
    this.updatePixelPosition();
  }
  handleOffsetChanged() {
    this.updatePixelPosition();
  }
  handlePositionChanged() {
    this.updatePixelPosition(), this.performAutoPan();
  }
  handlePositioningChanged() {
    this.updatePixelPosition();
  }
  setElement(e) {
    this.set(Xe.ELEMENT, e);
  }
  setMap(e) {
    this.set(Xe.MAP, e);
  }
  setOffset(e) {
    this.set(Xe.OFFSET, e);
  }
  setPosition(e) {
    this.set(Xe.POSITION, e);
  }
  performAutoPan() {
    this.autoPan && this.panIntoView(this.autoPan);
  }
  panIntoView(e) {
    const t = this.getMap();
    if (!t || !t.getTargetElement() || !this.get(Xe.POSITION)) return;
    const n = this.getRect(t.getTargetElement(), t.getSize()),
      s = this.getElement(),
      r = this.getRect(s, [by(s), Iy(s)]);
    e = e || {};
    const o = e.margin === void 0 ? 20 : e.margin;
    if (!Gi(n, r)) {
      const l = r[0] - n[0],
        a = n[2] - r[2],
        c = r[1] - n[1],
        h = n[3] - r[3],
        u = [0, 0];
      if (
        (l < 0 ? (u[0] = l - o) : a < 0 && (u[0] = Math.abs(a) + o),
        c < 0 ? (u[1] = c - o) : h < 0 && (u[1] = Math.abs(h) + o),
        u[0] !== 0 || u[1] !== 0)
      ) {
        const d = t.getView().getCenterInternal(),
          f = t.getPixelFromCoordinateInternal(d);
        if (!f) return;
        const g = [f[0] + u[0], f[1] + u[1]],
          m = e.animation || {};
        t.getView().animateInternal({ center: t.getCoordinateFromPixelInternal(g), duration: m.duration, easing: m.easing });
      }
    }
  }
  getRect(e, t) {
    const n = e.getBoundingClientRect(),
      s = n.left + window.pageXOffset,
      r = n.top + window.pageYOffset;
    return [s, r, s + t[0], r + t[1]];
  }
  setPositioning(e) {
    this.set(Xe.POSITIONING, e);
  }
  setVisible(e) {
    this.rendered.visible !== e && ((this.element.style.display = e ? '' : 'none'), (this.rendered.visible = e));
  }
  updatePixelPosition() {
    const e = this.getMap(),
      t = this.getPosition();
    if (!e || !e.isRendered() || !t) {
      this.setVisible(!1);
      return;
    }
    const n = e.getPixelFromCoordinate(t),
      s = e.getSize();
    this.updateRenderedPosition(n, s);
  }
  updateRenderedPosition(e, t) {
    const n = this.element.style,
      s = this.getOffset(),
      r = this.getPositioning();
    this.setVisible(!0);
    const o = Math.round(e[0] + s[0]) + 'px',
      l = Math.round(e[1] + s[1]) + 'px';
    let a = '0%',
      c = '0%';
    r == 'bottom-right' || r == 'center-right' || r == 'top-right'
      ? (a = '-100%')
      : (r == 'bottom-center' || r == 'center-center' || r == 'top-center') && (a = '-50%'),
      r == 'bottom-left' || r == 'bottom-center' || r == 'bottom-right'
        ? (c = '-100%')
        : (r == 'center-left' || r == 'center-center' || r == 'center-right') && (c = '-50%');
    const h = `translate(${a}, ${c}) translate(${o}, ${l})`;
    this.rendered.transform_ != h && ((this.rendered.transform_ = h), (n.transform = h));
  }
  getOptions() {
    return this.options;
  }
}
const xv = yv;
class vv {
  constructor(e) {
    (this.highWaterMark = e !== void 0 ? e : 2048), (this.count_ = 0), (this.entries_ = {}), (this.oldest_ = null), (this.newest_ = null);
  }
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  expireCache(e) {
    for (; this.canExpireCache(); ) this.pop();
  }
  clear() {
    (this.count_ = 0), (this.entries_ = {}), (this.oldest_ = null), (this.newest_ = null);
  }
  containsKey(e) {
    return this.entries_.hasOwnProperty(e);
  }
  forEach(e) {
    let t = this.oldest_;
    for (; t; ) e(t.value_, t.key_, this), (t = t.newer);
  }
  get(e, t) {
    const n = this.entries_[e];
    return (
      he(n !== void 0, 15),
      n === this.newest_ ||
        (n === this.oldest_
          ? ((this.oldest_ = this.oldest_.newer), (this.oldest_.older = null))
          : ((n.newer.older = n.older), (n.older.newer = n.newer)),
        (n.newer = null),
        (n.older = this.newest_),
        (this.newest_.newer = n),
        (this.newest_ = n)),
      n.value_
    );
  }
  remove(e) {
    const t = this.entries_[e];
    return (
      he(t !== void 0, 15),
      t === this.newest_
        ? ((this.newest_ = t.older), this.newest_ && (this.newest_.newer = null))
        : t === this.oldest_
        ? ((this.oldest_ = t.newer), this.oldest_ && (this.oldest_.older = null))
        : ((t.newer.older = t.older), (t.older.newer = t.newer)),
      delete this.entries_[e],
      --this.count_,
      t.value_
    );
  }
  getCount() {
    return this.count_;
  }
  getKeys() {
    const e = new Array(this.count_);
    let t = 0,
      n;
    for (n = this.newest_; n; n = n.older) e[t++] = n.key_;
    return e;
  }
  getValues() {
    const e = new Array(this.count_);
    let t = 0,
      n;
    for (n = this.newest_; n; n = n.older) e[t++] = n.value_;
    return e;
  }
  peekLast() {
    return this.oldest_.value_;
  }
  peekLastKey() {
    return this.oldest_.key_;
  }
  peekFirstKey() {
    return this.newest_.key_;
  }
  peek(e) {
    if (this.containsKey(e)) return this.entries_[e].value_;
  }
  pop() {
    const e = this.oldest_;
    return (
      delete this.entries_[e.key_],
      e.newer && (e.newer.older = null),
      (this.oldest_ = e.newer),
      this.oldest_ || (this.newest_ = null),
      --this.count_,
      e.value_
    );
  }
  replace(e, t) {
    this.get(e), (this.entries_[e].value_ = t);
  }
  set(e, t) {
    he(!(e in this.entries_), 16);
    const n = { key_: e, newer: null, older: this.newest_, value_: t };
    this.newest_ ? (this.newest_.newer = n) : (this.oldest_ = n), (this.newest_ = n), (this.entries_[e] = n), ++this.count_;
  }
  setSize(e) {
    this.highWaterMark = e;
  }
}
const Ev = vv;
function pl(i, e, t, n) {
  return n !== void 0 ? ((n[0] = i), (n[1] = e), (n[2] = t), n) : [i, e, t];
}
function to(i, e, t) {
  return i + '/' + e + '/' + t;
}
function Bd(i) {
  return to(i[0], i[1], i[2]);
}
function Cv(i) {
  return i.split('/').map(Number);
}
function wv(i) {
  return (i[1] << i[0]) + i[2];
}
function Sv(i, e) {
  const t = i[0],
    n = i[1],
    s = i[2];
  if (e.getMinZoom() > t || t > e.getMaxZoom()) return !1;
  const r = e.getFullTileRange(t);
  return r ? r.containsXY(n, s) : !0;
}
class Tv extends Ev {
  clear() {
    for (; this.getCount() > 0; ) this.pop().release();
    super.clear();
  }
  expireCache(e) {
    for (; this.canExpireCache() && !(this.peekLast().getKey() in e); ) this.pop().release();
  }
  pruneExceptNewestZ() {
    if (this.getCount() === 0) return;
    const e = this.peekFirstKey(),
      n = Cv(e)[0];
    this.forEach((s) => {
      s.tileCoord[0] !== n && (this.remove(Bd(s.tileCoord)), s.release());
    });
  }
}
const Xd = Tv;
class jd {
  constructor(e, t, n, s) {
    (this.minX = e), (this.maxX = t), (this.minY = n), (this.maxY = s);
  }
  contains(e) {
    return this.containsXY(e[1], e[2]);
  }
  containsTileRange(e) {
    return this.minX <= e.minX && e.maxX <= this.maxX && this.minY <= e.minY && e.maxY <= this.maxY;
  }
  containsXY(e, t) {
    return this.minX <= e && e <= this.maxX && this.minY <= t && t <= this.maxY;
  }
  equals(e) {
    return this.minX == e.minX && this.minY == e.minY && this.maxX == e.maxX && this.maxY == e.maxY;
  }
  extend(e) {
    e.minX < this.minX && (this.minX = e.minX),
      e.maxX > this.maxX && (this.maxX = e.maxX),
      e.minY < this.minY && (this.minY = e.minY),
      e.maxY > this.maxY && (this.maxY = e.maxY);
  }
  getHeight() {
    return this.maxY - this.minY + 1;
  }
  getSize() {
    return [this.getWidth(), this.getHeight()];
  }
  getWidth() {
    return this.maxX - this.minX + 1;
  }
  intersects(e) {
    return this.minX <= e.maxX && this.maxX >= e.minX && this.minY <= e.maxY && this.maxY >= e.minY;
  }
}
function an(i, e, t, n, s) {
  return s !== void 0 ? ((s.minX = i), (s.maxX = e), (s.minY = t), (s.maxY = n), s) : new jd(i, e, t, n);
}
const Yd = jd,
  qs = { PRELOAD: 'preload', USE_INTERIM_TILES_ON_ERROR: 'useInterimTilesOnError' };
class Rv extends Qr {
  constructor(e) {
    e = e || {};
    const t = Object.assign({}, e);
    delete t.preload,
      delete t.useInterimTilesOnError,
      super(t),
      this.on,
      this.once,
      this.un,
      this.setPreload(e.preload !== void 0 ? e.preload : 0),
      this.setUseInterimTilesOnError(e.useInterimTilesOnError !== void 0 ? e.useInterimTilesOnError : !0);
  }
  getPreload() {
    return this.get(qs.PRELOAD);
  }
  setPreload(e) {
    this.set(qs.PRELOAD, e);
  }
  getUseInterimTilesOnError() {
    return this.get(qs.USE_INTERIM_TILES_ON_ERROR);
  }
  setUseInterimTilesOnError(e) {
    this.set(qs.USE_INTERIM_TILES_ON_ERROR, e);
  }
  getData(e) {
    return super.getData(e);
  }
}
const bv = Rv,
  Iv = 0.5,
  Lv = 10,
  Sh = 0.25;
class Pv {
  constructor(e, t, n, s, r, o) {
    (this.sourceProj_ = e), (this.targetProj_ = t);
    let l = {};
    const a = _r(this.targetProj_, this.sourceProj_);
    (this.transformInv_ = function (v) {
      const x = v[0] + '/' + v[1];
      return l[x] || (l[x] = a(v)), l[x];
    }),
      (this.maxSourceExtent_ = s),
      (this.errorThresholdSquared_ = r * r),
      (this.triangles_ = []),
      (this.wrapsXInSource_ = !1),
      (this.canWrapXInSource_ =
        this.sourceProj_.canWrapX() && !!s && !!this.sourceProj_.getExtent() && Re(s) == Re(this.sourceProj_.getExtent())),
      (this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? Re(this.sourceProj_.getExtent()) : null),
      (this.targetWorldWidth_ = this.targetProj_.getExtent() ? Re(this.targetProj_.getExtent()) : null);
    const c = qi(n),
      h = Vr(n),
      u = Ur(n),
      d = Yr(n),
      f = this.transformInv_(c),
      g = this.transformInv_(h),
      m = this.transformInv_(u),
      _ = this.transformInv_(d),
      p = Lv + (o ? Math.max(0, Math.ceil(Math.log2(el(n) / (o * o * 256 * 256)))) : 0);
    if ((this.addQuad_(c, h, u, d, f, g, m, _, p), this.wrapsXInSource_)) {
      let v = 1 / 0;
      this.triangles_.forEach(function (x, E, w) {
        v = Math.min(v, x.source[0][0], x.source[1][0], x.source[2][0]);
      }),
        this.triangles_.forEach((x) => {
          if (Math.max(x.source[0][0], x.source[1][0], x.source[2][0]) - v > this.sourceWorldWidth_ / 2) {
            const E = [
              [x.source[0][0], x.source[0][1]],
              [x.source[1][0], x.source[1][1]],
              [x.source[2][0], x.source[2][1]],
            ];
            E[0][0] - v > this.sourceWorldWidth_ / 2 && (E[0][0] -= this.sourceWorldWidth_),
              E[1][0] - v > this.sourceWorldWidth_ / 2 && (E[1][0] -= this.sourceWorldWidth_),
              E[2][0] - v > this.sourceWorldWidth_ / 2 && (E[2][0] -= this.sourceWorldWidth_);
            const w = Math.min(E[0][0], E[1][0], E[2][0]);
            Math.max(E[0][0], E[1][0], E[2][0]) - w < this.sourceWorldWidth_ / 2 && (x.source = E);
          }
        });
    }
    l = {};
  }
  addTriangle_(e, t, n, s, r, o) {
    this.triangles_.push({ source: [s, r, o], target: [e, t, n] });
  }
  addQuad_(e, t, n, s, r, o, l, a, c) {
    const h = Gc([r, o, l, a]),
      u = this.sourceWorldWidth_ ? Re(h) / this.sourceWorldWidth_ : null,
      d = this.sourceWorldWidth_,
      f = this.sourceProj_.canWrapX() && u > 0.5 && u < 1;
    let g = !1;
    if (c > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const _ = Gc([e, t, n, s]);
        g = Re(_) / this.targetWorldWidth_ > Sh || g;
      }
      !f && this.sourceProj_.isGlobal() && u && (g = u > Sh || g);
    }
    if (
      !g &&
      this.maxSourceExtent_ &&
      isFinite(h[0]) &&
      isFinite(h[1]) &&
      isFinite(h[2]) &&
      isFinite(h[3]) &&
      !Ue(h, this.maxSourceExtent_)
    )
      return;
    let m = 0;
    if (
      !g &&
      (!isFinite(r[0]) ||
        !isFinite(r[1]) ||
        !isFinite(o[0]) ||
        !isFinite(o[1]) ||
        !isFinite(l[0]) ||
        !isFinite(l[1]) ||
        !isFinite(a[0]) ||
        !isFinite(a[1]))
    ) {
      if (c > 0) g = !0;
      else if (
        ((m =
          (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) +
          (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) +
          (!isFinite(l[0]) || !isFinite(l[1]) ? 2 : 0) +
          (!isFinite(a[0]) || !isFinite(a[1]) ? 1 : 0)),
        m != 1 && m != 2 && m != 4 && m != 8)
      )
        return;
    }
    if (c > 0) {
      if (!g) {
        const _ = [(e[0] + n[0]) / 2, (e[1] + n[1]) / 2],
          p = this.transformInv_(_);
        let v;
        f ? (v = (wn(r[0], d) + wn(l[0], d)) / 2 - wn(p[0], d)) : (v = (r[0] + l[0]) / 2 - p[0]);
        const x = (r[1] + l[1]) / 2 - p[1];
        g = v * v + x * x > this.errorThresholdSquared_;
      }
      if (g) {
        if (Math.abs(e[0] - n[0]) <= Math.abs(e[1] - n[1])) {
          const _ = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2],
            p = this.transformInv_(_),
            v = [(s[0] + e[0]) / 2, (s[1] + e[1]) / 2],
            x = this.transformInv_(v);
          this.addQuad_(e, t, _, v, r, o, p, x, c - 1), this.addQuad_(v, _, n, s, x, p, l, a, c - 1);
        } else {
          const _ = [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2],
            p = this.transformInv_(_),
            v = [(n[0] + s[0]) / 2, (n[1] + s[1]) / 2],
            x = this.transformInv_(v);
          this.addQuad_(e, _, v, s, r, p, x, a, c - 1), this.addQuad_(_, t, n, v, p, o, l, x, c - 1);
        }
        return;
      }
    }
    if (f) {
      if (!this.canWrapXInSource_) return;
      this.wrapsXInSource_ = !0;
    }
    m & 11 || this.addTriangle_(e, n, s, r, l, a),
      m & 14 || this.addTriangle_(e, n, t, r, l, o),
      m && (m & 13 || this.addTriangle_(t, s, e, o, a, r), m & 7 || this.addTriangle_(t, s, n, o, a, l));
  }
  calculateSourceExtent() {
    const e = gt();
    return (
      this.triangles_.forEach(function (t, n, s) {
        const r = t.source;
        ns(e, r[0]), ns(e, r[1]), ns(e, r[2]);
      }),
      e
    );
  }
  getTriangles() {
    return this.triangles_;
  }
}
const Mv = Pv;
let Ro;
const Tn = [];
function Th(i, e, t, n, s) {
  i.beginPath(),
    i.moveTo(0, 0),
    i.lineTo(e, t),
    i.lineTo(n, s),
    i.closePath(),
    i.save(),
    i.clip(),
    i.fillRect(0, 0, Math.max(e, n) + 1, Math.max(t, s)),
    i.restore();
}
function bo(i, e) {
  return Math.abs(i[e * 4] - 210) > 2 || Math.abs(i[e * 4 + 3] - 0.75 * 255) > 2;
}
function Av() {
  if (Ro === void 0) {
    const i = qe(6, 6, Tn);
    (i.globalCompositeOperation = 'lighter'), (i.fillStyle = 'rgba(210, 0, 0, 0.75)'), Th(i, 4, 5, 4, 0), Th(i, 4, 5, 0, 5);
    const e = i.getImageData(0, 0, 3, 3).data;
    (Ro = bo(e, 0) || bo(e, 4) || bo(e, 8)), qr(i), Tn.push(i.canvas);
  }
  return Ro;
}
function Rh(i, e, t, n) {
  const s = Qu(t, e, i);
  let r = jc(e, n, t);
  const o = e.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const l = i.getMetersPerUnit();
  l !== void 0 && (r /= l);
  const a = i.getExtent();
  if (!a || jr(a, s)) {
    const c = jc(i, r, s) / r;
    isFinite(c) && c > 0 && (r /= c);
  }
  return r;
}
function Ov(i, e, t, n) {
  const s = Si(t);
  let r = Rh(i, e, s, n);
  return (
    (!isFinite(r) || r <= 0) &&
      Vu(t, function (o) {
        return (r = Rh(i, e, o, n)), isFinite(r) && r > 0;
      }),
    r
  );
}
function Fv(i, e, t, n, s, r, o, l, a, c, h, u) {
  const d = qe(Math.round(t * i), Math.round(t * e), Tn);
  if ((u || (d.imageSmoothingEnabled = !1), a.length === 0)) return d.canvas;
  d.scale(t, t);
  function f(E) {
    return Math.round(E * t) / t;
  }
  d.globalCompositeOperation = 'lighter';
  const g = gt();
  a.forEach(function (E, w, P) {
    ta(g, E.extent);
  });
  const m = Re(g),
    _ = Nt(g),
    p = qe(Math.round((t * m) / n), Math.round((t * _) / n), Tn);
  u || (p.imageSmoothingEnabled = !1);
  const v = t / n;
  a.forEach(function (E, w, P) {
    const b = E.extent[0] - g[0],
      S = -(E.extent[3] - g[3]),
      k = Re(E.extent),
      W = Nt(E.extent);
    E.image.width > 0 &&
      E.image.height > 0 &&
      p.drawImage(E.image, c, c, E.image.width - 2 * c, E.image.height - 2 * c, b * v, S * v, k * v, W * v);
  });
  const x = qi(o);
  return (
    l.getTriangles().forEach(function (E, w, P) {
      const b = E.source,
        S = E.target;
      let k = b[0][0],
        W = b[0][1],
        Q = b[1][0],
        $ = b[1][1],
        ee = b[2][0],
        Ee = b[2][1];
      const K = f((S[0][0] - x[0]) / r),
        U = f(-(S[0][1] - x[1]) / r),
        O = f((S[1][0] - x[0]) / r),
        j = f(-(S[1][1] - x[1]) / r),
        le = f((S[2][0] - x[0]) / r),
        ue = f(-(S[2][1] - x[1]) / r),
        xe = k,
        M = W;
      (k = 0), (W = 0), (Q -= xe), ($ -= M), (ee -= xe), (Ee -= M);
      const Oe = [
          [Q, $, 0, 0, O - K],
          [ee, Ee, 0, 0, le - K],
          [0, 0, Q, $, j - U],
          [0, 0, ee, Ee, ue - U],
        ],
        ge = Xp(Oe);
      if (ge) {
        if ((d.save(), d.beginPath(), Av() || !u)) {
          d.moveTo(O, j);
          const R = 4,
            z = K - O,
            G = U - j;
          for (let Y = 0; Y < R; Y++)
            d.lineTo(O + f(((Y + 1) * z) / R), j + f((Y * G) / (R - 1))),
              Y != R - 1 && d.lineTo(O + f(((Y + 1) * z) / R), j + f(((Y + 1) * G) / (R - 1)));
          d.lineTo(le, ue);
        } else d.moveTo(O, j), d.lineTo(K, U), d.lineTo(le, ue);
        d.clip(),
          d.transform(ge[0], ge[2], ge[1], ge[3], K, U),
          d.translate(g[0] - xe, g[3] - M),
          d.scale(n / t, -n / t),
          d.drawImage(p.canvas, 0, 0),
          d.restore();
      }
    }),
    qr(p),
    Tn.push(p.canvas),
    h &&
      (d.save(),
      (d.globalCompositeOperation = 'source-over'),
      (d.strokeStyle = 'black'),
      (d.lineWidth = 1),
      l.getTriangles().forEach(function (E, w, P) {
        const b = E.target,
          S = (b[0][0] - x[0]) / r,
          k = -(b[0][1] - x[1]) / r,
          W = (b[1][0] - x[0]) / r,
          Q = -(b[1][1] - x[1]) / r,
          $ = (b[2][0] - x[0]) / r,
          ee = -(b[2][1] - x[1]) / r;
        d.beginPath(), d.moveTo(W, Q), d.lineTo(S, k), d.lineTo($, ee), d.closePath(), d.stroke();
      }),
      d.restore()),
    d.canvas
  );
}
class Dv extends Md {
  constructor(e, t, n, s, r, o, l, a, c, h, u, d) {
    super(r, J.IDLE, { interpolate: !!d }),
      (this.renderEdges_ = u !== void 0 ? u : !1),
      (this.pixelRatio_ = l),
      (this.gutter_ = a),
      (this.canvas_ = null),
      (this.sourceTileGrid_ = t),
      (this.targetTileGrid_ = s),
      (this.wrappedTileCoord_ = o || r),
      (this.sourceTiles_ = []),
      (this.sourcesListenerKeys_ = null),
      (this.sourceZ_ = 0);
    const f = s.getTileCoordExtent(this.wrappedTileCoord_),
      g = this.targetTileGrid_.getExtent();
    let m = this.sourceTileGrid_.getExtent();
    const _ = g ? ss(f, g) : f;
    if (el(_) === 0) {
      this.state = J.EMPTY;
      return;
    }
    const p = e.getExtent();
    p && (m ? (m = ss(m, p)) : (m = p));
    const v = s.getResolution(this.wrappedTileCoord_[0]),
      x = Ov(e, n, _, v);
    if (!isFinite(x) || x <= 0) {
      this.state = J.EMPTY;
      return;
    }
    const E = h !== void 0 ? h : Iv;
    if (((this.triangulation_ = new Mv(e, n, _, m, x * E, v)), this.triangulation_.getTriangles().length === 0)) {
      this.state = J.EMPTY;
      return;
    }
    this.sourceZ_ = t.getZForResolution(x);
    let w = this.triangulation_.calculateSourceExtent();
    if ((m && (e.canWrapX() ? ((w[1] = Fe(w[1], m[1], m[3])), (w[3] = Fe(w[3], m[1], m[3]))) : (w = ss(w, m))), !el(w)))
      this.state = J.EMPTY;
    else {
      const P = t.getTileRangeForExtentAndZ(w, this.sourceZ_);
      for (let b = P.minX; b <= P.maxX; b++)
        for (let S = P.minY; S <= P.maxY; S++) {
          const k = c(this.sourceZ_, b, S, l);
          k && this.sourceTiles_.push(k);
        }
      this.sourceTiles_.length === 0 && (this.state = J.EMPTY);
    }
  }
  getImage() {
    return this.canvas_;
  }
  reproject_() {
    const e = [];
    if (
      (this.sourceTiles_.forEach((t) => {
        t && t.getState() == J.LOADED && e.push({ extent: this.sourceTileGrid_.getTileCoordExtent(t.tileCoord), image: t.getImage() });
      }),
      (this.sourceTiles_.length = 0),
      e.length === 0)
    )
      this.state = J.ERROR;
    else {
      const t = this.wrappedTileCoord_[0],
        n = this.targetTileGrid_.getTileSize(t),
        s = typeof n == 'number' ? n : n[0],
        r = typeof n == 'number' ? n : n[1],
        o = this.targetTileGrid_.getResolution(t),
        l = this.sourceTileGrid_.getResolution(this.sourceZ_),
        a = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
      (this.canvas_ = Fv(
        s,
        r,
        this.pixelRatio_,
        l,
        this.sourceTileGrid_.getExtent(),
        o,
        a,
        this.triangulation_,
        e,
        this.gutter_,
        this.renderEdges_,
        this.interpolate,
      )),
        (this.state = J.LOADED);
    }
    this.changed();
  }
  load() {
    if (this.state == J.IDLE) {
      (this.state = J.LOADING), this.changed();
      let e = 0;
      (this.sourcesListenerKeys_ = []),
        this.sourceTiles_.forEach((t) => {
          const n = t.getState();
          if (n == J.IDLE || n == J.LOADING) {
            e++;
            const s = _e(
              t,
              oe.CHANGE,
              function (r) {
                const o = t.getState();
                (o == J.LOADED || o == J.ERROR || o == J.EMPTY) && (Te(s), e--, e === 0 && (this.unlistenSources_(), this.reproject_()));
              },
              this,
            );
            this.sourcesListenerKeys_.push(s);
          }
        }),
        e === 0
          ? setTimeout(this.reproject_.bind(this), 0)
          : this.sourceTiles_.forEach(function (t, n, s) {
              t.getState() == J.IDLE && t.load();
            });
    }
  }
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(Te), (this.sourcesListenerKeys_ = null);
  }
  release() {
    this.canvas_ && (qr(this.canvas_.getContext('2d')), Tn.push(this.canvas_), (this.canvas_ = null)), super.release();
  }
}
const yl = Dv;
class kv extends bd {
  constructor(e) {
    super(e),
      (this.extentChanged = !0),
      (this.renderedExtent_ = null),
      this.renderedPixelRatio,
      (this.renderedProjection = null),
      this.renderedRevision,
      (this.renderedTiles = []),
      (this.newTiles_ = !1),
      (this.tmpExtent = gt()),
      (this.tmpTileRange_ = new Yd(0, 0, 0, 0));
  }
  isDrawableTile(e) {
    const t = this.getLayer(),
      n = e.getState(),
      s = t.getUseInterimTilesOnError();
    return n == J.LOADED || n == J.EMPTY || (n == J.ERROR && !s);
  }
  getTile(e, t, n, s) {
    const r = s.pixelRatio,
      o = s.viewState.projection,
      l = this.getLayer();
    let c = l.getSource().getTile(e, t, n, r, o);
    return (
      c.getState() == J.ERROR && l.getUseInterimTilesOnError() && l.getPreload() > 0 && (this.newTiles_ = !0),
      this.isDrawableTile(c) || (c = c.getInterimTile()),
      c
    );
  }
  getData(e) {
    const t = this.frameState;
    if (!t) return null;
    const n = this.getLayer(),
      s = Ne(t.pixelToCoordinateTransform, e.slice()),
      r = n.getExtent();
    if (r && !jr(r, s)) return null;
    const o = t.pixelRatio,
      l = t.viewState.projection,
      a = t.viewState,
      c = n.getRenderSource(),
      h = c.getTileGridForProjection(a.projection),
      u = c.getTilePixelRatio(t.pixelRatio);
    for (let d = h.getZForResolution(a.resolution); d >= h.getMinZoom(); --d) {
      const f = h.getTileCoordForCoordAndZ(s, d),
        g = c.getTile(d, f[1], f[2], o, l);
      if (!(g instanceof Ad || g instanceof yl) || (g instanceof yl && g.getState() === J.EMPTY)) return null;
      if (g.getState() !== J.LOADED) continue;
      const m = h.getOrigin(d),
        _ = rt(h.getTileSize(d)),
        p = h.getResolution(d),
        v = Math.floor(u * ((s[0] - m[0]) / p - f[1] * _[0])),
        x = Math.floor(u * ((m[1] - s[1]) / p - f[2] * _[1])),
        E = Math.round(u * c.getGutterForProjection(a.projection));
      return this.getImageData(g.getImage(), v + E, x + E);
    }
    return null;
  }
  loadedTileCallback(e, t, n) {
    return this.isDrawableTile(n) ? super.loadedTileCallback(e, t, n) : !1;
  }
  prepareFrame(e) {
    return !!this.getLayer().getSource();
  }
  renderFrame(e, t) {
    const n = e.layerStatesArray[e.layerIndex],
      s = e.viewState,
      r = s.projection,
      o = s.resolution,
      l = s.center,
      a = s.rotation,
      c = e.pixelRatio,
      h = this.getLayer(),
      u = h.getSource(),
      d = u.getRevision(),
      f = u.getTileGridForProjection(r),
      g = f.getZForResolution(o, u.zDirection),
      m = f.getResolution(g);
    let _ = e.extent;
    const p = e.viewState.resolution,
      v = u.getTilePixelRatio(c),
      x = Math.round((Re(_) / p) * c),
      E = Math.round((Nt(_) / p) * c),
      w = n.extent && Wi(n.extent);
    w && (_ = ss(_, Wi(n.extent)));
    const P = (m * x) / 2 / v,
      b = (m * E) / 2 / v,
      S = [l[0] - P, l[1] - b, l[0] + P, l[1] + b],
      k = f.getTileRangeForExtentAndZ(_, g),
      W = {};
    W[g] = {};
    const Q = this.createLoadedTileFinder(u, r, W),
      $ = this.tmpExtent,
      ee = this.tmpTileRange_;
    this.newTiles_ = !1;
    const Ee = a ? il(s.center, p, a, e.size) : void 0;
    for (let Oe = k.minX; Oe <= k.maxX; ++Oe)
      for (let ge = k.minY; ge <= k.maxY; ++ge) {
        if (a && !f.tileCoordIntersectsViewport([g, Oe, ge], Ee)) continue;
        const R = this.getTile(g, Oe, ge, e);
        if (this.isDrawableTile(R)) {
          const Y = fe(this);
          if (R.getState() == J.LOADED) {
            W[g][R.tileCoord.toString()] = R;
            let ne = R.inTransition(Y);
            ne && n.opacity !== 1 && (R.endTransition(Y), (ne = !1)),
              !this.newTiles_ && (ne || !this.renderedTiles.includes(R)) && (this.newTiles_ = !0);
          }
          if (R.getAlpha(Y, e.time) === 1) continue;
        }
        const z = f.getTileCoordChildTileRange(R.tileCoord, ee, $);
        let G = !1;
        z && (G = Q(g + 1, z)), G || f.forEachTileCoordParentTileRange(R.tileCoord, Q, ee, $);
      }
    const K = ((m / o) * c) / v;
    wi(this.pixelTransform, e.size[0] / 2, e.size[1] / 2, 1 / c, 1 / c, a, -x / 2, -E / 2);
    const U = Xu(this.pixelTransform);
    this.useContainer(t, U, this.getBackground(e));
    const O = this.context,
      j = O.canvas;
    Jl(this.inversePixelTransform, this.pixelTransform),
      wi(this.tempTransform, x / 2, E / 2, K, K, 0, -x / 2, -E / 2),
      j.width != x || j.height != E ? ((j.width = x), (j.height = E)) : this.containerReused || O.clearRect(0, 0, x, E),
      w && this.clipUnrotated(O, e, w),
      u.getInterpolate() || (O.imageSmoothingEnabled = !1),
      this.preRender(O, e),
      (this.renderedTiles.length = 0);
    let le = Object.keys(W).map(Number);
    le.sort(Hi);
    let ue, xe, M;
    n.opacity === 1 && (!this.containerReused || u.getOpaque(e.viewState.projection)) ? (le = le.reverse()) : ((ue = []), (xe = []));
    for (let Oe = le.length - 1; Oe >= 0; --Oe) {
      const ge = le[Oe],
        R = u.getTilePixelSize(ge, c, r),
        G = f.getResolution(ge) / m,
        Y = R[0] * G * K,
        ne = R[1] * G * K,
        ve = f.getTileCoordForCoordAndZ(qi(S), ge),
        se = f.getTileCoordExtent(ve),
        y = Ne(this.tempTransform, [(v * (se[0] - S[0])) / m, (v * (S[3] - se[3])) / m]),
        C = v * u.getGutterForProjection(r),
        T = W[ge];
      for (const I in T) {
        const L = T[I],
          D = L.tileCoord,
          B = ve[1] - D[1],
          F = Math.round(y[0] - (B - 1) * Y),
          N = ve[2] - D[2],
          A = Math.round(y[1] - (N - 1) * ne),
          V = Math.round(y[0] - B * Y),
          X = Math.round(y[1] - N * ne),
          H = F - V,
          Z = A - X,
          re = g === ge,
          me = re && L.getAlpha(fe(this), e.time) !== 1;
        let de = !1;
        if (!me)
          if (ue) {
            M = [V, X, V + H, X, V + H, X + Z, V, X + Z];
            for (let Se = 0, ze = ue.length; Se < ze; ++Se)
              if (g !== ge && ge < xe[Se]) {
                const Le = ue[Se];
                Ue([V, X, V + H, X + Z], [Le[0], Le[3], Le[4], Le[7]]) &&
                  (de || (O.save(), (de = !0)),
                  O.beginPath(),
                  O.moveTo(M[0], M[1]),
                  O.lineTo(M[2], M[3]),
                  O.lineTo(M[4], M[5]),
                  O.lineTo(M[6], M[7]),
                  O.moveTo(Le[6], Le[7]),
                  O.lineTo(Le[4], Le[5]),
                  O.lineTo(Le[2], Le[3]),
                  O.lineTo(Le[0], Le[1]),
                  O.clip());
              }
            ue.push(M), xe.push(ge);
          } else O.clearRect(V, X, H, Z);
        this.drawTileImage(L, e, V, X, H, Z, C, re),
          ue && !me ? (de && O.restore(), this.renderedTiles.unshift(L)) : this.renderedTiles.push(L),
          this.updateUsedTiles(e.usedTiles, u, L);
      }
    }
    return (
      (this.renderedRevision = d),
      (this.renderedResolution = m),
      (this.extentChanged = !this.renderedExtent_ || !gs(this.renderedExtent_, S)),
      (this.renderedExtent_ = S),
      (this.renderedPixelRatio = c),
      (this.renderedProjection = r),
      this.manageTilePyramid(e, u, f, c, r, _, g, h.getPreload()),
      this.scheduleExpireCache(e, u),
      this.postRender(O, e),
      n.extent && O.restore(),
      (O.imageSmoothingEnabled = !0),
      U !== j.style.transform && (j.style.transform = U),
      this.container
    );
  }
  drawTileImage(e, t, n, s, r, o, l, a) {
    const c = this.getTileImage(e);
    if (!c) return;
    const h = fe(this),
      u = t.layerStatesArray[t.layerIndex],
      d = u.opacity * (a ? e.getAlpha(h, t.time) : 1),
      f = d !== this.context.globalAlpha;
    f && (this.context.save(), (this.context.globalAlpha = d)),
      this.context.drawImage(c, l, l, c.width - 2 * l, c.height - 2 * l, n, s, r, o),
      f && this.context.restore(),
      d !== u.opacity ? (t.animate = !0) : a && e.endTransition(h);
  }
  getImage() {
    const e = this.context;
    return e ? e.canvas : null;
  }
  getTileImage(e) {
    return e.getImage();
  }
  scheduleExpireCache(e, t) {
    if (t.canExpireCache()) {
      const n = function (s, r, o) {
        const l = fe(s);
        l in o.usedTiles && s.expireCache(o.viewState.projection, o.usedTiles[l]);
      }.bind(null, t);
      e.postRenderFunctions.push(n);
    }
  }
  updateUsedTiles(e, t, n) {
    const s = fe(t);
    s in e || (e[s] = {}), (e[s][n.getKey()] = !0);
  }
  manageTilePyramid(e, t, n, s, r, o, l, a, c) {
    const h = fe(t);
    h in e.wantedTiles || (e.wantedTiles[h] = {});
    const u = e.wantedTiles[h],
      d = e.tileQueue,
      f = n.getMinZoom(),
      g = e.viewState.rotation,
      m = g ? il(e.viewState.center, e.viewState.resolution, g, e.size) : void 0;
    let _ = 0,
      p,
      v,
      x,
      E,
      w,
      P;
    for (P = f; P <= l; ++P)
      for (v = n.getTileRangeForExtentAndZ(o, P, v), x = n.getResolution(P), E = v.minX; E <= v.maxX; ++E)
        for (w = v.minY; w <= v.maxY; ++w)
          (g && !n.tileCoordIntersectsViewport([P, E, w], m)) ||
            (l - P <= a
              ? (++_,
                (p = t.getTile(P, E, w, s, r)),
                p.getState() == J.IDLE &&
                  ((u[p.getKey()] = !0), d.isKeyQueued(p.getKey()) || d.enqueue([p, h, n.getTileCoordCenter(p.tileCoord), x])),
                c !== void 0 && c(p))
              : t.useTile(P, E, w, r));
    t.updateCacheSize(_, r);
  }
}
const Nv = kv;
class Gv extends bv {
  constructor(e) {
    super(e);
  }
  createRenderer() {
    return new Nv(this);
  }
}
const Kn = Gv,
  Io = { TILELOADSTART: 'tileloadstart', TILELOADEND: 'tileloadend', TILELOADERROR: 'tileloaderror' },
  cn = [0, 0, 0],
  ci = 5;
class Wv {
  constructor(e) {
    (this.minZoom = e.minZoom !== void 0 ? e.minZoom : 0),
      (this.resolutions_ = e.resolutions),
      he(
        sp(
          this.resolutions_,
          function (s, r) {
            return r - s;
          },
          !0,
        ),
        17,
      );
    let t;
    if (!e.origins) {
      for (let s = 0, r = this.resolutions_.length - 1; s < r; ++s)
        if (!t) t = this.resolutions_[s] / this.resolutions_[s + 1];
        else if (this.resolutions_[s] / this.resolutions_[s + 1] !== t) {
          t = void 0;
          break;
        }
    }
    (this.zoomFactor_ = t),
      (this.maxZoom = this.resolutions_.length - 1),
      (this.origin_ = e.origin !== void 0 ? e.origin : null),
      (this.origins_ = null),
      e.origins !== void 0 && ((this.origins_ = e.origins), he(this.origins_.length == this.resolutions_.length, 20));
    const n = e.extent;
    n !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = qi(n)),
      he((!this.origin_ && this.origins_) || (this.origin_ && !this.origins_), 18),
      (this.tileSizes_ = null),
      e.tileSizes !== void 0 && ((this.tileSizes_ = e.tileSizes), he(this.tileSizes_.length == this.resolutions_.length, 19)),
      (this.tileSize_ = e.tileSize !== void 0 ? e.tileSize : this.tileSizes_ ? null : Sa),
      he((!this.tileSize_ && this.tileSizes_) || (this.tileSize_ && !this.tileSizes_), 22),
      (this.extent_ = n !== void 0 ? n : null),
      (this.fullTileRanges_ = null),
      (this.tmpSize_ = [0, 0]),
      (this.tmpExtent_ = [0, 0, 0, 0]),
      e.sizes !== void 0
        ? (this.fullTileRanges_ = e.sizes.map(function (s, r) {
            const o = new Yd(Math.min(0, s[0]), Math.max(s[0] - 1, -1), Math.min(0, s[1]), Math.max(s[1] - 1, -1));
            if (n) {
              const l = this.getTileRangeForExtentAndZ(n, r);
              (o.minX = Math.max(l.minX, o.minX)),
                (o.maxX = Math.min(l.maxX, o.maxX)),
                (o.minY = Math.max(l.minY, o.minY)),
                (o.maxY = Math.min(l.maxY, o.maxY));
            }
            return o;
          }, this))
        : n && this.calculateTileRanges_(n);
  }
  forEachTileCoord(e, t, n) {
    const s = this.getTileRangeForExtentAndZ(e, t);
    for (let r = s.minX, o = s.maxX; r <= o; ++r) for (let l = s.minY, a = s.maxY; l <= a; ++l) n([t, r, l]);
  }
  forEachTileCoordParentTileRange(e, t, n, s) {
    let r,
      o,
      l,
      a = null,
      c = e[0] - 1;
    for (this.zoomFactor_ === 2 ? ((o = e[1]), (l = e[2])) : (a = this.getTileCoordExtent(e, s)); c >= this.minZoom; ) {
      if (
        (this.zoomFactor_ === 2
          ? ((o = Math.floor(o / 2)), (l = Math.floor(l / 2)), (r = an(o, o, l, l, n)))
          : (r = this.getTileRangeForExtentAndZ(a, c, n)),
        t(c, r))
      )
        return !0;
      --c;
    }
    return !1;
  }
  getExtent() {
    return this.extent_;
  }
  getMaxZoom() {
    return this.maxZoom;
  }
  getMinZoom() {
    return this.minZoom;
  }
  getOrigin(e) {
    return this.origin_ ? this.origin_ : this.origins_[e];
  }
  getResolution(e) {
    return this.resolutions_[e];
  }
  getResolutions() {
    return this.resolutions_;
  }
  getTileCoordChildTileRange(e, t, n) {
    if (e[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const r = e[1] * 2,
          o = e[2] * 2;
        return an(r, r + 1, o, o + 1, t);
      }
      const s = this.getTileCoordExtent(e, n || this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(s, e[0] + 1, t);
    }
    return null;
  }
  getTileRangeForTileCoordAndZ(e, t, n) {
    if (t > this.maxZoom || t < this.minZoom) return null;
    const s = e[0],
      r = e[1],
      o = e[2];
    if (t === s) return an(r, o, r, o, n);
    if (this.zoomFactor_) {
      const a = Math.pow(this.zoomFactor_, t - s),
        c = Math.floor(r * a),
        h = Math.floor(o * a);
      if (t < s) return an(c, c, h, h, n);
      const u = Math.floor(a * (r + 1)) - 1,
        d = Math.floor(a * (o + 1)) - 1;
      return an(c, u, h, d, n);
    }
    const l = this.getTileCoordExtent(e, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(l, t, n);
  }
  getTileRangeExtent(e, t, n) {
    const s = this.getOrigin(e),
      r = this.getResolution(e),
      o = rt(this.getTileSize(e), this.tmpSize_),
      l = s[0] + t.minX * o[0] * r,
      a = s[0] + (t.maxX + 1) * o[0] * r,
      c = s[1] + t.minY * o[1] * r,
      h = s[1] + (t.maxY + 1) * o[1] * r;
    return kt(l, c, a, h, n);
  }
  getTileRangeForExtentAndZ(e, t, n) {
    this.getTileCoordForXYAndZ_(e[0], e[3], t, !1, cn);
    const s = cn[1],
      r = cn[2];
    this.getTileCoordForXYAndZ_(e[2], e[1], t, !0, cn);
    const o = cn[1],
      l = cn[2];
    return an(s, o, r, l, n);
  }
  getTileCoordCenter(e) {
    const t = this.getOrigin(e[0]),
      n = this.getResolution(e[0]),
      s = rt(this.getTileSize(e[0]), this.tmpSize_);
    return [t[0] + (e[1] + 0.5) * s[0] * n, t[1] - (e[2] + 0.5) * s[1] * n];
  }
  getTileCoordExtent(e, t) {
    const n = this.getOrigin(e[0]),
      s = this.getResolution(e[0]),
      r = rt(this.getTileSize(e[0]), this.tmpSize_),
      o = n[0] + e[1] * r[0] * s,
      l = n[1] - (e[2] + 1) * r[1] * s,
      a = o + r[0] * s,
      c = l + r[1] * s;
    return kt(o, l, a, c, t);
  }
  getTileCoordForCoordAndResolution(e, t, n) {
    return this.getTileCoordForXYAndResolution_(e[0], e[1], t, !1, n);
  }
  getTileCoordForXYAndResolution_(e, t, n, s, r) {
    const o = this.getZForResolution(n),
      l = n / this.getResolution(o),
      a = this.getOrigin(o),
      c = rt(this.getTileSize(o), this.tmpSize_);
    let h = (l * (e - a[0])) / n / c[0],
      u = (l * (a[1] - t)) / n / c[1];
    return s ? ((h = Ys(h, ci) - 1), (u = Ys(u, ci) - 1)) : ((h = js(h, ci)), (u = js(u, ci))), pl(o, h, u, r);
  }
  getTileCoordForXYAndZ_(e, t, n, s, r) {
    const o = this.getOrigin(n),
      l = this.getResolution(n),
      a = rt(this.getTileSize(n), this.tmpSize_);
    let c = (e - o[0]) / l / a[0],
      h = (o[1] - t) / l / a[1];
    return s ? ((c = Ys(c, ci) - 1), (h = Ys(h, ci) - 1)) : ((c = js(c, ci)), (h = js(h, ci))), pl(n, c, h, r);
  }
  getTileCoordForCoordAndZ(e, t, n) {
    return this.getTileCoordForXYAndZ_(e[0], e[1], t, !1, n);
  }
  getTileCoordResolution(e) {
    return this.resolutions_[e[0]];
  }
  getTileSize(e) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[e];
  }
  getFullTileRange(e) {
    return this.fullTileRanges_ ? this.fullTileRanges_[e] : this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, e) : null;
  }
  getZForResolution(e, t) {
    const n = Zl(this.resolutions_, e, t || 0);
    return Fe(n, this.minZoom, this.maxZoom);
  }
  tileCoordIntersectsViewport(e, t) {
    return ad(t, 0, t.length, 2, this.getTileCoordExtent(e));
  }
  calculateTileRanges_(e) {
    const t = this.resolutions_.length,
      n = new Array(t);
    for (let s = this.minZoom; s < t; ++s) n[s] = this.getTileRangeForExtentAndZ(e, s);
    this.fullTileRanges_ = n;
  }
}
const Ud = Wv;
function Vd(i) {
  let e = i.getDefaultTileGrid();
  return e || ((e = Xv(i)), i.setDefaultTileGrid(e)), e;
}
function zv(i, e, t) {
  const n = e[0],
    s = i.getTileCoordCenter(e),
    r = io(t);
  if (!jr(r, s)) {
    const o = Re(r),
      l = Math.ceil((r[0] - s[0]) / o);
    return (s[0] += o * l), i.getTileCoordForCoordAndZ(s, n);
  }
  return e;
}
function Bv(i, e, t, n) {
  n = n !== void 0 ? n : 'top-left';
  const s = Kd(i, e, t);
  return new Ud({ extent: i, origin: Rp(i, n), resolutions: s, tileSize: t });
}
function Hd(i) {
  const e = i || {},
    t = e.extent || Me('EPSG:3857').getExtent(),
    n = { extent: t, minZoom: e.minZoom, tileSize: e.tileSize, resolutions: Kd(t, e.maxZoom, e.tileSize, e.maxResolution) };
  return new Ud(n);
}
function Kd(i, e, t, n) {
  (e = e !== void 0 ? e : Xy), (t = rt(t !== void 0 ? t : Sa));
  const s = Nt(i),
    r = Re(i);
  n = n > 0 ? n : Math.max(r / t[0], s / t[1]);
  const o = e + 1,
    l = new Array(o);
  for (let a = 0; a < o; ++a) l[a] = n / Math.pow(2, a);
  return l;
}
function Xv(i, e, t, n) {
  const s = io(i);
  return Bv(s, e, t, n);
}
function io(i) {
  i = Me(i);
  let e = i.getExtent();
  if (!e) {
    const t = (180 * ms.degrees) / i.getMetersPerUnit();
    e = kt(-t, -t, t, t);
  }
  return e;
}
class jv extends Pd {
  constructor(e) {
    super({
      attributions: e.attributions,
      attributionsCollapsible: e.attributionsCollapsible,
      projection: e.projection,
      state: e.state,
      wrapX: e.wrapX,
      interpolate: e.interpolate,
    }),
      this.on,
      this.once,
      this.un,
      (this.opaque_ = e.opaque !== void 0 ? e.opaque : !1),
      (this.tilePixelRatio_ = e.tilePixelRatio !== void 0 ? e.tilePixelRatio : 1),
      (this.tileGrid = e.tileGrid !== void 0 ? e.tileGrid : null);
    const t = [256, 256];
    this.tileGrid && rt(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), t),
      (this.tileCache = new Xd(e.cacheSize || 0)),
      (this.tmpSize = [0, 0]),
      (this.key_ = e.key || ''),
      (this.tileOptions = { transition: e.transition, interpolate: e.interpolate }),
      (this.zDirection = e.zDirection ? e.zDirection : 0);
  }
  canExpireCache() {
    return this.tileCache.canExpireCache();
  }
  expireCache(e, t) {
    const n = this.getTileCacheForProjection(e);
    n && n.expireCache(t);
  }
  forEachLoadedTile(e, t, n, s) {
    const r = this.getTileCacheForProjection(e);
    if (!r) return !1;
    let o = !0,
      l,
      a,
      c;
    for (let h = n.minX; h <= n.maxX; ++h)
      for (let u = n.minY; u <= n.maxY; ++u)
        (a = to(t, h, u)),
          (c = !1),
          r.containsKey(a) && ((l = r.get(a)), (c = l.getState() === J.LOADED), c && (c = s(l) !== !1)),
          c || (o = !1);
    return o;
  }
  getGutterForProjection(e) {
    return 0;
  }
  getKey() {
    return this.key_;
  }
  setKey(e) {
    this.key_ !== e && ((this.key_ = e), this.changed());
  }
  getOpaque(e) {
    return this.opaque_;
  }
  getResolutions(e) {
    const t = e ? this.getTileGridForProjection(e) : this.tileGrid;
    return t ? t.getResolutions() : null;
  }
  getTile(e, t, n, s, r) {
    return ie();
  }
  getTileGrid() {
    return this.tileGrid;
  }
  getTileGridForProjection(e) {
    return this.tileGrid ? this.tileGrid : Vd(e);
  }
  getTileCacheForProjection(e) {
    const t = this.getProjection();
    return he(t === null || ki(t, e), 68), this.tileCache;
  }
  getTilePixelRatio(e) {
    return this.tilePixelRatio_;
  }
  getTilePixelSize(e, t, n) {
    const s = this.getTileGridForProjection(n),
      r = this.getTilePixelRatio(t),
      o = rt(s.getTileSize(e), this.tmpSize);
    return r == 1 ? o : Ey(o, r, this.tmpSize);
  }
  getTileCoordForTileUrlFunction(e, t) {
    t = t !== void 0 ? t : this.getProjection();
    const n = this.getTileGridForProjection(t);
    return this.getWrapX() && t.isGlobal() && (e = zv(n, e, t)), Sv(e, n) ? e : null;
  }
  clear() {
    this.tileCache.clear();
  }
  refresh() {
    this.clear(), super.refresh();
  }
  updateCacheSize(e, t) {
    const n = this.getTileCacheForProjection(t);
    e > n.highWaterMark && (n.highWaterMark = e);
  }
  useTile(e, t, n, s) {}
}
class Yv extends Gt {
  constructor(e, t) {
    super(e), (this.tile = t);
  }
}
const Uv = jv;
function Vv(i, e) {
  const t = /\{z\}/g,
    n = /\{x\}/g,
    s = /\{y\}/g,
    r = /\{-y\}/g;
  return function (o, l, a) {
    if (o)
      return i
        .replace(t, o[0].toString())
        .replace(n, o[1].toString())
        .replace(s, o[2].toString())
        .replace(r, function () {
          const c = o[0],
            h = e.getFullTileRange(c);
          return he(h, 55), (h.getHeight() - o[2] - 1).toString();
        });
  };
}
function Hv(i, e) {
  const t = i.length,
    n = new Array(t);
  for (let s = 0; s < t; ++s) n[s] = Vv(i[s], e);
  return Zd(n);
}
function Zd(i) {
  return i.length === 1
    ? i[0]
    : function (e, t, n) {
        if (!e) return;
        const s = wv(e),
          r = wn(s, i.length);
        return i[r](e, t, n);
      };
}
function Kv(i) {
  const e = [];
  let t = /\{([a-z])-([a-z])\}/.exec(i);
  if (t) {
    const n = t[1].charCodeAt(0),
      s = t[2].charCodeAt(0);
    let r;
    for (r = n; r <= s; ++r) e.push(i.replace(t[0], String.fromCharCode(r)));
    return e;
  }
  if (((t = /\{(\d+)-(\d+)\}/.exec(i)), t)) {
    const n = parseInt(t[2], 10);
    for (let s = parseInt(t[1], 10); s <= n; s++) e.push(i.replace(t[0], s.toString()));
    return e;
  }
  return e.push(i), e;
}
class Fa extends Uv {
  constructor(e) {
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      opaque: e.opaque,
      projection: e.projection,
      state: e.state,
      tileGrid: e.tileGrid,
      tilePixelRatio: e.tilePixelRatio,
      wrapX: e.wrapX,
      transition: e.transition,
      interpolate: e.interpolate,
      key: e.key,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection,
    }),
      (this.generateTileUrlFunction_ = this.tileUrlFunction === Fa.prototype.tileUrlFunction),
      (this.tileLoadFunction = e.tileLoadFunction),
      e.tileUrlFunction && (this.tileUrlFunction = e.tileUrlFunction),
      (this.urls = null),
      e.urls ? this.setUrls(e.urls) : e.url && this.setUrl(e.url),
      (this.tileLoadingKeys_ = {});
  }
  getTileLoadFunction() {
    return this.tileLoadFunction;
  }
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  }
  getUrls() {
    return this.urls;
  }
  handleTileChange(e) {
    const t = e.target,
      n = fe(t),
      s = t.getState();
    let r;
    s == J.LOADING
      ? ((this.tileLoadingKeys_[n] = !0), (r = Io.TILELOADSTART))
      : n in this.tileLoadingKeys_ &&
        (delete this.tileLoadingKeys_[n], (r = s == J.ERROR ? Io.TILELOADERROR : s == J.LOADED ? Io.TILELOADEND : void 0)),
      r != null && this.dispatchEvent(new Yv(r, t));
  }
  setTileLoadFunction(e) {
    this.tileCache.clear(), (this.tileLoadFunction = e), this.changed();
  }
  setTileUrlFunction(e, t) {
    (this.tileUrlFunction = e), this.tileCache.pruneExceptNewestZ(), typeof t < 'u' ? this.setKey(t) : this.changed();
  }
  setUrl(e) {
    const t = Kv(e);
    (this.urls = t), this.setUrls(t);
  }
  setUrls(e) {
    this.urls = e;
    const t = e.join(`
`);
    this.generateTileUrlFunction_ ? this.setTileUrlFunction(Hv(e, this.tileGrid), t) : this.setKey(t);
  }
  tileUrlFunction(e, t, n) {}
  useTile(e, t, n) {
    const s = to(e, t, n);
    this.tileCache.containsKey(s) && this.tileCache.get(s);
  }
}
const Zv = Fa;
class $v extends Zv {
  constructor(e) {
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      opaque: e.opaque,
      projection: e.projection,
      state: e.state,
      tileGrid: e.tileGrid,
      tileLoadFunction: e.tileLoadFunction ? e.tileLoadFunction : qv,
      tilePixelRatio: e.tilePixelRatio,
      tileUrlFunction: e.tileUrlFunction,
      url: e.url,
      urls: e.urls,
      wrapX: e.wrapX,
      transition: e.transition,
      interpolate: e.interpolate !== void 0 ? e.interpolate : !0,
      key: e.key,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection,
    }),
      (this.crossOrigin = e.crossOrigin !== void 0 ? e.crossOrigin : null),
      (this.tileClass = e.tileClass !== void 0 ? e.tileClass : Ad),
      (this.tileCacheForProjection = {}),
      (this.tileGridForProjection = {}),
      (this.reprojectionErrorThreshold_ = e.reprojectionErrorThreshold),
      (this.renderReprojectionEdges_ = !1);
  }
  canExpireCache() {
    if (this.tileCache.canExpireCache()) return !0;
    for (const e in this.tileCacheForProjection) if (this.tileCacheForProjection[e].canExpireCache()) return !0;
    return !1;
  }
  expireCache(e, t) {
    const n = this.getTileCacheForProjection(e);
    this.tileCache.expireCache(this.tileCache == n ? t : {});
    for (const s in this.tileCacheForProjection) {
      const r = this.tileCacheForProjection[s];
      r.expireCache(r == n ? t : {});
    }
  }
  getGutterForProjection(e) {
    return this.getProjection() && e && !ki(this.getProjection(), e) ? 0 : this.getGutter();
  }
  getGutter() {
    return 0;
  }
  getKey() {
    let e = super.getKey();
    return this.getInterpolate() || (e += ':disable-interpolation'), e;
  }
  getOpaque(e) {
    return this.getProjection() && e && !ki(this.getProjection(), e) ? !1 : super.getOpaque(e);
  }
  getTileGridForProjection(e) {
    const t = this.getProjection();
    if (this.tileGrid && (!t || ki(t, e))) return this.tileGrid;
    const n = fe(e);
    return n in this.tileGridForProjection || (this.tileGridForProjection[n] = Vd(e)), this.tileGridForProjection[n];
  }
  getTileCacheForProjection(e) {
    const t = this.getProjection();
    if (!t || ki(t, e)) return this.tileCache;
    const n = fe(e);
    return (
      n in this.tileCacheForProjection || (this.tileCacheForProjection[n] = new Xd(this.tileCache.highWaterMark)),
      this.tileCacheForProjection[n]
    );
  }
  createTile_(e, t, n, s, r, o) {
    const l = [e, t, n],
      a = this.getTileCoordForTileUrlFunction(l, r),
      c = a ? this.tileUrlFunction(a, s, r) : void 0,
      h = new this.tileClass(
        l,
        c !== void 0 ? J.IDLE : J.EMPTY,
        c !== void 0 ? c : '',
        this.crossOrigin,
        this.tileLoadFunction,
        this.tileOptions,
      );
    return (h.key = o), h.addEventListener(oe.CHANGE, this.handleTileChange.bind(this)), h;
  }
  getTile(e, t, n, s, r) {
    const o = this.getProjection();
    if (!o || !r || ki(o, r)) return this.getTileInternal(e, t, n, s, o || r);
    const l = this.getTileCacheForProjection(r),
      a = [e, t, n];
    let c;
    const h = Bd(a);
    l.containsKey(h) && (c = l.get(h));
    const u = this.getKey();
    if (c && c.key == u) return c;
    const d = this.getTileGridForProjection(o),
      f = this.getTileGridForProjection(r),
      g = this.getTileCoordForTileUrlFunction(a, r),
      m = new yl(
        o,
        d,
        r,
        f,
        a,
        g,
        this.getTilePixelRatio(s),
        this.getGutter(),
        (_, p, v, x) => this.getTileInternal(_, p, v, x, o),
        this.reprojectionErrorThreshold_,
        this.renderReprojectionEdges_,
        this.getInterpolate(),
      );
    return (m.key = u), c ? ((m.interimTile = c), m.refreshInterimChain(), l.replace(h, m)) : l.set(h, m), m;
  }
  getTileInternal(e, t, n, s, r) {
    let o = null;
    const l = to(e, t, n),
      a = this.getKey();
    if (!this.tileCache.containsKey(l)) (o = this.createTile_(e, t, n, s, r, a)), this.tileCache.set(l, o);
    else if (((o = this.tileCache.get(l)), o.key != a)) {
      const c = o;
      (o = this.createTile_(e, t, n, s, r, a)),
        c.getState() == J.IDLE ? (o.interimTile = c.interimTile) : (o.interimTile = c),
        o.refreshInterimChain(),
        this.tileCache.replace(l, o);
    }
    return o;
  }
  setRenderReprojectionEdges(e) {
    if (this.renderReprojectionEdges_ != e) {
      this.renderReprojectionEdges_ = e;
      for (const t in this.tileCacheForProjection) this.tileCacheForProjection[t].clear();
      this.changed();
    }
  }
  setTileGridForProjection(e, t) {
    const n = Me(e);
    if (n) {
      const s = fe(n);
      s in this.tileGridForProjection || (this.tileGridForProjection[s] = t);
    }
  }
  clear() {
    super.clear();
    for (const e in this.tileCacheForProjection) this.tileCacheForProjection[e].clear();
  }
}
function qv(i, e) {
  i.getImage().src = e;
}
const $d = $v;
function Jv(i) {
  const e = i[0],
    t = new Array(e);
  let n = 1 << (e - 1),
    s,
    r;
  for (s = 0; s < e; ++s) (r = 48), i[1] & n && (r += 1), i[2] & n && (r += 2), (t[s] = String.fromCharCode(r)), (n >>= 1);
  return t.join('');
}
const Qv = '<a class="ol-attribution-bing-tos" href="https://www.microsoft.com/maps/product/terms.html" target="_blank">Terms of Use</a>';
class eE extends $d {
  constructor(e) {
    const t = e.hidpi !== void 0 ? e.hidpi : !1;
    super({
      cacheSize: e.cacheSize,
      crossOrigin: 'anonymous',
      interpolate: e.interpolate,
      opaque: !0,
      projection: Me('EPSG:3857'),
      reprojectionErrorThreshold: e.reprojectionErrorThreshold,
      state: 'loading',
      tileLoadFunction: e.tileLoadFunction,
      tilePixelRatio: t ? 2 : 1,
      wrapX: e.wrapX !== void 0 ? e.wrapX : !0,
      transition: e.transition,
      zDirection: e.zDirection,
    }),
      (this.hidpi_ = t),
      (this.culture_ = e.culture !== void 0 ? e.culture : 'en-us'),
      (this.maxZoom_ = e.maxZoom !== void 0 ? e.maxZoom : -1),
      (this.apiKey_ = e.key),
      (this.imagerySet_ = e.imagerySet);
    const n =
      'https://dev.virtualearth.net/REST/v1/Imagery/Metadata/' +
      this.imagerySet_ +
      '?uriScheme=https&include=ImageryProviders&key=' +
      this.apiKey_ +
      '&c=' +
      this.culture_;
    fetch(n)
      .then((s) => s.json())
      .then((s) => this.handleImageryMetadataResponse(s));
  }
  getApiKey() {
    return this.apiKey_;
  }
  getImagerySet() {
    return this.imagerySet_;
  }
  handleImageryMetadataResponse(e) {
    if (
      e.statusCode != 200 ||
      e.statusDescription != 'OK' ||
      e.authenticationResultCode != 'ValidCredentials' ||
      e.resourceSets.length != 1 ||
      e.resourceSets[0].resources.length != 1
    ) {
      this.setState('error');
      return;
    }
    const t = e.resourceSets[0].resources[0],
      n = this.maxZoom_ == -1 ? t.zoomMax : this.maxZoom_,
      s = this.getProjection(),
      r = io(s),
      o = this.hidpi_ ? 2 : 1,
      l = t.imageWidth == t.imageHeight ? t.imageWidth / o : [t.imageWidth / o, t.imageHeight / o],
      a = Hd({ extent: r, minZoom: t.zoomMin, maxZoom: n, tileSize: l });
    this.tileGrid = a;
    const c = this.culture_,
      h = this.hidpi_;
    if (
      ((this.tileUrlFunction = Zd(
        t.imageUrlSubdomains.map(function (u) {
          const d = [0, 0, 0],
            f = t.imageUrl.replace('{subdomain}', u).replace('{culture}', c);
          return function (g, m, _) {
            if (!g) return;
            pl(g[0], g[1], g[2], d);
            let p = f;
            return h && (p += '&dpi=d1&device=mobile'), p.replace('{quadkey}', Jv(d));
          };
        }),
      )),
      t.imageryProviders)
    ) {
      const u = Hr(Me('EPSG:4326'), this.getProjection());
      this.setAttributions((d) => {
        const f = [],
          g = d.viewState,
          m = this.getTileGrid(),
          _ = m.getZForResolution(g.resolution, this.zDirection),
          v = m.getTileCoordForCoordAndZ(g.center, _)[0];
        return (
          t.imageryProviders.map(function (x) {
            let E = !1;
            const w = x.coverageAreas;
            for (let P = 0, b = w.length; P < b; ++P) {
              const S = w[P];
              if (v >= S.zoomMin && v <= S.zoomMax) {
                const k = S.bbox,
                  W = [k[1], k[0], k[3], k[2]],
                  Q = Lp(W, u);
                if (Ue(Q, d.extent)) {
                  E = !0;
                  break;
                }
              }
            }
            E && f.push(x.attribution);
          }),
          f.push(Qv),
          f
        );
      });
    }
    this.setState('ready');
  }
}
const bh = eE;
class tE extends $d {
  constructor(e) {
    e = e || {};
    const t = e.projection !== void 0 ? e.projection : 'EPSG:3857',
      n =
        e.tileGrid !== void 0
          ? e.tileGrid
          : Hd({ extent: io(t), maxResolution: e.maxResolution, maxZoom: e.maxZoom, minZoom: e.minZoom, tileSize: e.tileSize });
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      crossOrigin: e.crossOrigin,
      interpolate: e.interpolate,
      opaque: e.opaque,
      projection: t,
      reprojectionErrorThreshold: e.reprojectionErrorThreshold,
      tileGrid: n,
      tileLoadFunction: e.tileLoadFunction,
      tilePixelRatio: e.tilePixelRatio,
      tileUrlFunction: e.tileUrlFunction,
      url: e.url,
      urls: e.urls,
      wrapX: e.wrapX !== void 0 ? e.wrapX : !0,
      transition: e.transition,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection,
    }),
      (this.gutter_ = e.gutter !== void 0 ? e.gutter : 0);
  }
  getGutter() {
    return this.gutter_;
  }
}
const qd = tE;
var Jd = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {};
function Da(i) {
  if (i.__esModule) return i;
  var e = i.default;
  if (typeof e == 'function') {
    var t = function n() {
      if (this instanceof n) {
        var s = [null];
        s.push.apply(s, arguments);
        var r = Function.bind.apply(e, s);
        return new r();
      }
      return e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return (
    Object.defineProperty(t, '__esModule', { value: !0 }),
    Object.keys(i).forEach(function (n) {
      var s = Object.getOwnPropertyDescriptor(i, n);
      Object.defineProperty(
        t,
        n,
        s.get
          ? s
          : {
              enumerable: !0,
              get: function () {
                return i[n];
              },
            },
      );
    }),
    t
  );
}
const iE = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
class nE extends qd {
  constructor(e) {
    e = e || {};
    let t;
    e.attributions !== void 0 ? (t = e.attributions) : (t = [iE]);
    const n = e.crossOrigin !== void 0 ? e.crossOrigin : 'anonymous',
      s = e.url !== void 0 ? e.url : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    super({
      attributions: t,
      attributionsCollapsible: !1,
      cacheSize: e.cacheSize,
      crossOrigin: n,
      interpolate: e.interpolate,
      maxZoom: e.maxZoom !== void 0 ? e.maxZoom : 19,
      opaque: e.opaque !== void 0 ? e.opaque : !0,
      reprojectionErrorThreshold: e.reprojectionErrorThreshold,
      tileLoadFunction: e.tileLoadFunction,
      transition: e.transition,
      url: s,
      wrapX: e.wrapX,
      zDirection: e.zDirection,
    });
  }
}
const Ih = nE;
class br extends id {
  constructor(e) {
    super(), (this.geometries_ = e || null), (this.changeEventsKeys_ = []), this.listenGeometriesChange_();
  }
  unlistenGeometriesChange_() {
    this.changeEventsKeys_.forEach(Te), (this.changeEventsKeys_.length = 0);
  }
  listenGeometriesChange_() {
    if (this.geometries_)
      for (let e = 0, t = this.geometries_.length; e < t; ++e)
        this.changeEventsKeys_.push(_e(this.geometries_[e], oe.CHANGE, this.changed, this));
  }
  clone() {
    const e = new br(null);
    return e.setGeometries(this.geometries_), e.applyProperties(this), e;
  }
  closestPointXY(e, t, n, s) {
    if (s < $i(this.getExtent(), e, t)) return s;
    const r = this.geometries_;
    for (let o = 0, l = r.length; o < l; ++o) s = r[o].closestPointXY(e, t, n, s);
    return s;
  }
  containsXY(e, t) {
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s) if (n[s].containsXY(e, t)) return !0;
    return !1;
  }
  computeExtent(e) {
    bs(e);
    const t = this.geometries_;
    for (let n = 0, s = t.length; n < s; ++n) ta(e, t[n].getExtent());
    return e;
  }
  getGeometries() {
    return Lh(this.geometries_);
  }
  getGeometriesArray() {
    return this.geometries_;
  }
  getGeometriesArrayRecursive() {
    let e = [];
    const t = this.geometries_;
    for (let n = 0, s = t.length; n < s; ++n)
      t[n].getType() === this.getType() ? (e = e.concat(t[n].getGeometriesArrayRecursive())) : e.push(t[n]);
    return e;
  }
  getSimplifiedGeometry(e) {
    if (
      (this.simplifiedGeometryRevision !== this.getRevision() &&
        ((this.simplifiedGeometryMaxMinSquaredTolerance = 0), (this.simplifiedGeometryRevision = this.getRevision())),
      e < 0 || (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && e < this.simplifiedGeometryMaxMinSquaredTolerance))
    )
      return this;
    const t = [],
      n = this.geometries_;
    let s = !1;
    for (let r = 0, o = n.length; r < o; ++r) {
      const l = n[r],
        a = l.getSimplifiedGeometry(e);
      t.push(a), a !== l && (s = !0);
    }
    if (s) {
      const r = new br(null);
      return r.setGeometriesArray(t), r;
    }
    return (this.simplifiedGeometryMaxMinSquaredTolerance = e), this;
  }
  getType() {
    return 'GeometryCollection';
  }
  intersectsExtent(e) {
    const t = this.geometries_;
    for (let n = 0, s = t.length; n < s; ++n) if (t[n].intersectsExtent(e)) return !0;
    return !1;
  }
  isEmpty() {
    return this.geometries_.length === 0;
  }
  rotate(e, t) {
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s) n[s].rotate(e, t);
    this.changed();
  }
  scale(e, t, n) {
    n || (n = Si(this.getExtent()));
    const s = this.geometries_;
    for (let r = 0, o = s.length; r < o; ++r) s[r].scale(e, t, n);
    this.changed();
  }
  setGeometries(e) {
    this.setGeometriesArray(Lh(e));
  }
  setGeometriesArray(e) {
    this.unlistenGeometriesChange_(), (this.geometries_ = e), this.listenGeometriesChange_(), this.changed();
  }
  applyTransform(e) {
    const t = this.geometries_;
    for (let n = 0, s = t.length; n < s; ++n) t[n].applyTransform(e);
    this.changed();
  }
  translate(e, t) {
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s) n[s].translate(e, t);
    this.changed();
  }
  disposeInternal() {
    this.unlistenGeometriesChange_(), super.disposeInternal();
  }
}
function Lh(i) {
  const e = [];
  for (let t = 0, n = i.length; t < n; ++t) e.push(i[t].clone());
  return e;
}
const sE = br;
class Ir extends Ji {
  constructor(e, t, n) {
    if ((super(), (this.ends_ = []), (this.maxDelta_ = -1), (this.maxDeltaRevision_ = -1), Array.isArray(e[0]))) this.setCoordinates(e, t);
    else if (t !== void 0 && n) this.setFlatCoordinates(t, e), (this.ends_ = n);
    else {
      let s = this.getLayout();
      const r = e,
        o = [],
        l = [];
      for (let a = 0, c = r.length; a < c; ++a) {
        const h = r[a];
        a === 0 && (s = h.getLayout()), Ct(o, h.getFlatCoordinates()), l.push(o.length);
      }
      this.setFlatCoordinates(s, o), (this.ends_ = l);
    }
  }
  appendLineString(e) {
    this.flatCoordinates
      ? Ct(this.flatCoordinates, e.getFlatCoordinates().slice())
      : (this.flatCoordinates = e.getFlatCoordinates().slice()),
      this.ends_.push(this.flatCoordinates.length),
      this.changed();
  }
  clone() {
    const e = new Ir(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
    return e.applyProperties(this), e;
  }
  closestPointXY(e, t, n, s) {
    return s < $i(this.getExtent(), e, t)
      ? s
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(aa(this.flatCoordinates, 0, this.ends_, this.stride, 0))),
          (this.maxDeltaRevision_ = this.getRevision())),
        ha(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !1, e, t, n, s));
  }
  getCoordinateAtM(e, t, n) {
    return (this.layout != 'XYM' && this.layout != 'XYZM') || this.flatCoordinates.length === 0
      ? null
      : ((t = t !== void 0 ? t : !1), (n = n !== void 0 ? n : !1), vy(this.flatCoordinates, 0, this.ends_, this.stride, e, t, n));
  }
  getCoordinates() {
    return _s(this.flatCoordinates, 0, this.ends_, this.stride);
  }
  getEnds() {
    return this.ends_;
  }
  getLineString(e) {
    return e < 0 || this.ends_.length <= e
      ? null
      : new Sn(this.flatCoordinates.slice(e === 0 ? 0 : this.ends_[e - 1], this.ends_[e]), this.layout);
  }
  getLineStrings() {
    const e = this.flatCoordinates,
      t = this.ends_,
      n = this.layout,
      s = [];
    let r = 0;
    for (let o = 0, l = t.length; o < l; ++o) {
      const a = t[o],
        c = new Sn(e.slice(r, a), n);
      s.push(c), (r = a);
    }
    return s;
  }
  getFlatMidpoints() {
    const e = [],
      t = this.flatCoordinates;
    let n = 0;
    const s = this.ends_,
      r = this.stride;
    for (let o = 0, l = s.length; o < l; ++o) {
      const a = s[o],
        c = dd(t, n, a, r, 0.5);
      Ct(e, c), (n = a);
    }
    return e;
  }
  getSimplifiedGeometryInternal(e) {
    const t = [],
      n = [];
    return (t.length = cy(this.flatCoordinates, 0, this.ends_, this.stride, e, t, 0, n)), new Ir(t, 'XY', n);
  }
  getType() {
    return 'MultiLineString';
  }
  intersectsExtent(e) {
    return _y(this.flatCoordinates, 0, this.ends_, this.stride, e);
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = ua(this.flatCoordinates, 0, e, this.stride, this.ends_);
    (this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1]), this.changed();
  }
}
const rE = Ir;
class ka extends Ji {
  constructor(e, t) {
    super(), t && !Array.isArray(e[0]) ? this.setFlatCoordinates(t, e) : this.setCoordinates(e, t);
  }
  appendPoint(e) {
    this.flatCoordinates ? Ct(this.flatCoordinates, e.getFlatCoordinates()) : (this.flatCoordinates = e.getFlatCoordinates().slice()),
      this.changed();
  }
  clone() {
    const e = new ka(this.flatCoordinates.slice(), this.layout);
    return e.applyProperties(this), e;
  }
  closestPointXY(e, t, n, s) {
    if (s < $i(this.getExtent(), e, t)) return s;
    const r = this.flatCoordinates,
      o = this.stride;
    for (let l = 0, a = r.length; l < a; l += o) {
      const c = Ui(e, t, r[l], r[l + 1]);
      if (c < s) {
        s = c;
        for (let h = 0; h < o; ++h) n[h] = r[l + h];
        n.length = o;
      }
    }
    return s;
  }
  getCoordinates() {
    return fi(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  getPoint(e) {
    const t = this.flatCoordinates ? this.flatCoordinates.length / this.stride : 0;
    return e < 0 || t <= e ? null : new ei(this.flatCoordinates.slice(e * this.stride, (e + 1) * this.stride), this.layout);
  }
  getPoints() {
    const e = this.flatCoordinates,
      t = this.layout,
      n = this.stride,
      s = [];
    for (let r = 0, o = e.length; r < o; r += n) {
      const l = new ei(e.slice(r, r + n), t);
      s.push(l);
    }
    return s;
  }
  getType() {
    return 'MultiPoint';
  }
  intersectsExtent(e) {
    const t = this.flatCoordinates,
      n = this.stride;
    for (let s = 0, r = t.length; s < r; s += n) {
      const o = t[s],
        l = t[s + 1];
      if (ea(e, o, l)) return !0;
    }
    return !1;
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = Kr(this.flatCoordinates, 0, e, this.stride)),
      this.changed();
  }
}
const Qd = ka;
function oE(i, e, t, n) {
  const s = [];
  let r = gt();
  for (let o = 0, l = t.length; o < l; ++o) {
    const a = t[o];
    (r = Yu(i, e, a[0], n)), s.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2), (e = a[a.length - 1]);
  }
  return s;
}
class Lr extends Ji {
  constructor(e, t, n) {
    if (
      (super(),
      (this.endss_ = []),
      (this.flatInteriorPointsRevision_ = -1),
      (this.flatInteriorPoints_ = null),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      (this.orientedRevision_ = -1),
      (this.orientedFlatCoordinates_ = null),
      !n && !Array.isArray(e[0]))
    ) {
      let s = this.getLayout();
      const r = e,
        o = [],
        l = [];
      for (let a = 0, c = r.length; a < c; ++a) {
        const h = r[a];
        a === 0 && (s = h.getLayout());
        const u = o.length,
          d = h.getEnds();
        for (let f = 0, g = d.length; f < g; ++f) d[f] += u;
        Ct(o, h.getFlatCoordinates()), l.push(d);
      }
      (t = s), (e = o), (n = l);
    }
    t !== void 0 && n ? (this.setFlatCoordinates(t, e), (this.endss_ = n)) : this.setCoordinates(e, t);
  }
  appendPolygon(e) {
    let t;
    if (!this.flatCoordinates) (this.flatCoordinates = e.getFlatCoordinates().slice()), (t = e.getEnds().slice()), this.endss_.push();
    else {
      const n = this.flatCoordinates.length;
      Ct(this.flatCoordinates, e.getFlatCoordinates()), (t = e.getEnds().slice());
      for (let s = 0, r = t.length; s < r; ++s) t[s] += n;
    }
    this.endss_.push(t), this.changed();
  }
  clone() {
    const e = this.endss_.length,
      t = new Array(e);
    for (let s = 0; s < e; ++s) t[s] = this.endss_[s].slice();
    const n = new Lr(this.flatCoordinates.slice(), this.layout, t);
    return n.applyProperties(this), n;
  }
  closestPointXY(e, t, n, s) {
    return s < $i(this.getExtent(), e, t)
      ? s
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(ry(this.flatCoordinates, 0, this.endss_, this.stride, 0))),
          (this.maxDeltaRevision_ = this.getRevision())),
        oy(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, this.maxDelta_, !0, e, t, n, s));
  }
  containsXY(e, t) {
    return gy(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, e, t);
  }
  getArea() {
    return dy(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride);
  }
  getCoordinates(e) {
    let t;
    return (
      e !== void 0 ? ((t = this.getOrientedFlatCoordinates().slice()), Zc(t, 0, this.endss_, this.stride, e)) : (t = this.flatCoordinates),
      ll(t, 0, this.endss_, this.stride)
    );
  }
  getEndss() {
    return this.endss_;
  }
  getFlatInteriorPoints() {
    if (this.flatInteriorPointsRevision_ != this.getRevision()) {
      const e = oE(this.flatCoordinates, 0, this.endss_, this.stride);
      (this.flatInteriorPoints_ = my(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, e)),
        (this.flatInteriorPointsRevision_ = this.getRevision());
    }
    return this.flatInteriorPoints_;
  }
  getInteriorPoints() {
    return new Qd(this.getFlatInteriorPoints().slice(), 'XYM');
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const e = this.flatCoordinates;
      xy(e, 0, this.endss_, this.stride)
        ? (this.orientedFlatCoordinates_ = e)
        : ((this.orientedFlatCoordinates_ = e.slice()),
          (this.orientedFlatCoordinates_.length = Zc(this.orientedFlatCoordinates_, 0, this.endss_, this.stride))),
        (this.orientedRevision_ = this.getRevision());
    }
    return this.orientedFlatCoordinates_;
  }
  getSimplifiedGeometryInternal(e) {
    const t = [],
      n = [];
    return (t.length = uy(this.flatCoordinates, 0, this.endss_, this.stride, Math.sqrt(e), t, 0, n)), new Lr(t, 'XY', n);
  }
  getPolygon(e) {
    if (e < 0 || this.endss_.length <= e) return null;
    let t;
    if (e === 0) t = 0;
    else {
      const r = this.endss_[e - 1];
      t = r[r.length - 1];
    }
    const n = this.endss_[e].slice(),
      s = n[n.length - 1];
    if (t !== 0) for (let r = 0, o = n.length; r < o; ++r) n[r] -= t;
    return new St(this.flatCoordinates.slice(t, s), this.layout, n);
  }
  getPolygons() {
    const e = this.layout,
      t = this.flatCoordinates,
      n = this.endss_,
      s = [];
    let r = 0;
    for (let o = 0, l = n.length; o < l; ++o) {
      const a = n[o].slice(),
        c = a[a.length - 1];
      if (r !== 0) for (let u = 0, d = a.length; u < d; ++u) a[u] -= r;
      const h = new St(t.slice(r, c), e, a);
      s.push(h), (r = c);
    }
    return s;
  }
  getType() {
    return 'MultiPolygon';
  }
  intersectsExtent(e) {
    return py(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, e);
  }
  setCoordinates(e, t) {
    this.setLayout(t, e, 3), this.flatCoordinates || (this.flatCoordinates = []);
    const n = ay(this.flatCoordinates, 0, e, this.stride, this.endss_);
    if (n.length === 0) this.flatCoordinates.length = 0;
    else {
      const s = n[n.length - 1];
      this.flatCoordinates.length = s.length === 0 ? 0 : s[s.length - 1];
    }
    this.changed();
  }
}
const lE = Lr;
class aE {
  constructor() {
    (this.dataProjection = void 0), (this.defaultFeatureProjection = void 0), (this.supportedMediaTypes = null);
  }
  getReadOptions(e, t) {
    if (t) {
      let n = t.dataProjection ? Me(t.dataProjection) : this.readProjection(e);
      t.extent && n && n.getUnits() === 'tile-pixels' && ((n = Me(n)), n.setWorldExtent(t.extent)),
        (t = { dataProjection: n, featureProjection: t.featureProjection });
    }
    return this.adaptOptions(t);
  }
  adaptOptions(e) {
    return Object.assign({ dataProjection: this.dataProjection, featureProjection: this.defaultFeatureProjection }, e);
  }
  getType() {
    return ie();
  }
  readFeature(e, t) {
    return ie();
  }
  readFeatures(e, t) {
    return ie();
  }
  readGeometry(e, t) {
    return ie();
  }
  readProjection(e) {
    return ie();
  }
  writeFeature(e, t) {
    return ie();
  }
  writeFeatures(e, t) {
    return ie();
  }
  writeGeometry(e, t) {
    return ie();
  }
}
function ef(i, e, t) {
  const n = t ? Me(t.featureProjection) : null,
    s = t ? Me(t.dataProjection) : null;
  let r;
  if ((n && s && !ki(n, s) ? (r = (e ? i.clone() : i).transform(e ? n : s, e ? s : n)) : (r = i), e && t && t.decimals !== void 0)) {
    const o = Math.pow(10, t.decimals),
      l = function (a) {
        for (let c = 0, h = a.length; c < h; ++c) a[c] = Math.round(a[c] * o) / o;
        return a;
      };
    r === i && (r = i.clone()), r.applyTransform(l);
  }
  return r;
}
class cE extends aE {
  constructor() {
    super();
  }
  getType() {
    return 'json';
  }
  readFeature(e, t) {
    return this.readFeatureFromObject(Js(e), this.getReadOptions(e, t));
  }
  readFeatures(e, t) {
    return this.readFeaturesFromObject(Js(e), this.getReadOptions(e, t));
  }
  readFeatureFromObject(e, t) {
    return ie();
  }
  readFeaturesFromObject(e, t) {
    return ie();
  }
  readGeometry(e, t) {
    return this.readGeometryFromObject(Js(e), this.getReadOptions(e, t));
  }
  readGeometryFromObject(e, t) {
    return ie();
  }
  readProjection(e) {
    return this.readProjectionFromObject(Js(e));
  }
  readProjectionFromObject(e) {
    return ie();
  }
  writeFeature(e, t) {
    return JSON.stringify(this.writeFeatureObject(e, t));
  }
  writeFeatureObject(e, t) {
    return ie();
  }
  writeFeatures(e, t) {
    return JSON.stringify(this.writeFeaturesObject(e, t));
  }
  writeFeaturesObject(e, t) {
    return ie();
  }
  writeGeometry(e, t) {
    return JSON.stringify(this.writeGeometryObject(e, t));
  }
  writeGeometryObject(e, t) {
    return ie();
  }
}
function Js(i) {
  if (typeof i == 'string') {
    const e = JSON.parse(i);
    return e || null;
  } else if (i !== null) return i;
  return null;
}
const hE = cE;
class uE extends hE {
  constructor(e) {
    (e = e || {}),
      super(),
      (this.dataProjection = Me(e.dataProjection ? e.dataProjection : 'EPSG:4326')),
      e.featureProjection && (this.defaultFeatureProjection = Me(e.featureProjection)),
      (this.geometryName_ = e.geometryName),
      (this.extractGeometryName_ = e.extractGeometryName),
      (this.supportedMediaTypes = ['application/geo+json', 'application/vnd.geo+json']);
  }
  readFeatureFromObject(e, t) {
    let n = null;
    e.type === 'Feature' ? (n = e) : (n = { type: 'Feature', geometry: e, properties: null });
    const s = xl(n.geometry, t),
      r = new $t();
    return (
      this.geometryName_
        ? r.setGeometryName(this.geometryName_)
        : this.extractGeometryName_ && 'geometry_name' in n !== void 0 && r.setGeometryName(n.geometry_name),
      r.setGeometry(s),
      'id' in n && r.setId(n.id),
      n.properties && r.setProperties(n.properties, !0),
      r
    );
  }
  readFeaturesFromObject(e, t) {
    const n = e;
    let s = null;
    if (n.type === 'FeatureCollection') {
      const r = e;
      s = [];
      const o = r.features;
      for (let l = 0, a = o.length; l < a; ++l) s.push(this.readFeatureFromObject(o[l], t));
    } else s = [this.readFeatureFromObject(e, t)];
    return s;
  }
  readGeometryFromObject(e, t) {
    return xl(e, t);
  }
  readProjectionFromObject(e) {
    const t = e.crs;
    let n;
    return (
      t
        ? t.type == 'name'
          ? (n = Me(t.properties.name))
          : t.type === 'EPSG'
          ? (n = Me('EPSG:' + t.properties.code))
          : he(!1, 36)
        : (n = this.dataProjection),
      n
    );
  }
  writeFeatureObject(e, t) {
    t = this.adaptOptions(t);
    const n = { type: 'Feature', geometry: null, properties: null },
      s = e.getId();
    if ((s !== void 0 && (n.id = s), !e.hasProperties())) return n;
    const r = e.getProperties(),
      o = e.getGeometry();
    return o && ((n.geometry = vl(o, t)), delete r[e.getGeometryName()]), An(r) || (n.properties = r), n;
  }
  writeFeaturesObject(e, t) {
    t = this.adaptOptions(t);
    const n = [];
    for (let s = 0, r = e.length; s < r; ++s) n.push(this.writeFeatureObject(e[s], t));
    return { type: 'FeatureCollection', features: n };
  }
  writeGeometryObject(e, t) {
    return vl(e, this.adaptOptions(t));
  }
}
function xl(i, e) {
  if (!i) return null;
  let t;
  switch (i.type) {
    case 'Point': {
      t = fE(i);
      break;
    }
    case 'LineString': {
      t = gE(i);
      break;
    }
    case 'Polygon': {
      t = yE(i);
      break;
    }
    case 'MultiPoint': {
      t = _E(i);
      break;
    }
    case 'MultiLineString': {
      t = mE(i);
      break;
    }
    case 'MultiPolygon': {
      t = pE(i);
      break;
    }
    case 'GeometryCollection': {
      t = dE(i);
      break;
    }
    default:
      throw new Error('Unsupported GeoJSON type: ' + i.type);
  }
  return ef(t, !1, e);
}
function dE(i, e) {
  const t = i.geometries.map(function (n) {
    return xl(n, e);
  });
  return new sE(t);
}
function fE(i) {
  return new ei(i.coordinates);
}
function gE(i) {
  return new Sn(i.coordinates);
}
function mE(i) {
  return new rE(i.coordinates);
}
function _E(i) {
  return new Qd(i.coordinates);
}
function pE(i) {
  return new lE(i.coordinates);
}
function yE(i) {
  return new St(i.coordinates);
}
function vl(i, e) {
  i = ef(i, !0, e);
  const t = i.getType();
  let n;
  switch (t) {
    case 'Point': {
      n = SE(i);
      break;
    }
    case 'LineString': {
      n = vE(i);
      break;
    }
    case 'Polygon': {
      n = TE(i, e);
      break;
    }
    case 'MultiPoint': {
      n = CE(i);
      break;
    }
    case 'MultiLineString': {
      n = EE(i);
      break;
    }
    case 'MultiPolygon': {
      n = wE(i, e);
      break;
    }
    case 'GeometryCollection': {
      n = xE(i, e);
      break;
    }
    case 'Circle': {
      n = { type: 'GeometryCollection', geometries: [] };
      break;
    }
    default:
      throw new Error('Unsupported geometry type: ' + t);
  }
  return n;
}
function xE(i, e) {
  return (
    (e = Object.assign({}, e)),
    delete e.featureProjection,
    {
      type: 'GeometryCollection',
      geometries: i.getGeometriesArray().map(function (n) {
        return vl(n, e);
      }),
    }
  );
}
function vE(i, e) {
  return { type: 'LineString', coordinates: i.getCoordinates() };
}
function EE(i, e) {
  return { type: 'MultiLineString', coordinates: i.getCoordinates() };
}
function CE(i, e) {
  return { type: 'MultiPoint', coordinates: i.getCoordinates() };
}
function wE(i, e) {
  let t;
  return e && (t = e.rightHanded), { type: 'MultiPolygon', coordinates: i.getCoordinates(t) };
}
function SE(i, e) {
  return { type: 'Point', coordinates: i.getCoordinates() };
}
function TE(i, e) {
  let t;
  return e && (t = e.rightHanded), { type: 'Polygon', coordinates: i.getCoordinates(t) };
}
const RE = uE;
var El = {},
  bE = {
    get exports() {
      return El;
    },
    set exports(i) {
      El = i;
    },
  };
const IE = Da(Mx),
  LE = Da(lp),
  PE = Da(vx);
(function (i, e) {
  (function (t, n) {
    i.exports = n(IE, LE, PE);
  })(Jd, function (t, n, s) {
    (t = 'default' in t ? t.default : t), (s = 'default' in s ? s.default : s);
    const r = 'layer-switcher-';
    class o extends t {
      constructor(a) {
        const c = Object.assign({}, a),
          h = document.createElement('div');
        super({ element: h, target: c.target }),
          (this.activationMode = c.activationMode || 'mouseover'),
          (this.startActive = c.startActive === !0),
          (this.label = c.label !== void 0 ? c.label : ''),
          (this.collapseLabel = c.collapseLabel !== void 0 ? c.collapseLabel : '»'),
          (this.tipLabel = c.tipLabel ? c.tipLabel : 'Legend'),
          (this.collapseTipLabel = c.collapseTipLabel ? c.collapseTipLabel : 'Collapse legend'),
          (this.groupSelectStyle = o.getGroupSelectStyle(c.groupSelectStyle)),
          (this.reverse = c.reverse !== !1),
          (this.mapListeners = []),
          (this.hiddenClassName = 'ol-unselectable ol-control layer-switcher'),
          o.isTouchDevice_() && (this.hiddenClassName += ' touch'),
          (this.shownClassName = 'shown'),
          (h.className = this.hiddenClassName),
          (this.button = document.createElement('button')),
          h.appendChild(this.button),
          (this.panel = document.createElement('div')),
          (this.panel.className = 'panel'),
          h.appendChild(this.panel),
          o.enableTouchScroll_(this.panel),
          h.classList.add(r + 'group-select-style-' + this.groupSelectStyle),
          h.classList.add(r + 'activation-mode-' + this.activationMode),
          this.activationMode === 'click'
            ? (h.classList.add('activationModeClick'),
              (this.button.onclick = (u) => {
                const d = u || window.event;
                this.element.classList.contains(this.shownClassName) ? this.hidePanel() : this.showPanel(), d.preventDefault();
              }))
            : ((this.button.onmouseover = () => {
                this.showPanel();
              }),
              (this.button.onclick = (u) => {
                const d = u || window.event;
                this.showPanel(), d.preventDefault();
              }),
              (this.panel.onmouseout = (u) => {
                this.panel.contains(u.relatedTarget) || this.hidePanel();
              })),
          this.updateButton();
      }
      setMap(a) {
        for (let c = 0; c < this.mapListeners.length; c++) n.unByKey(this.mapListeners[c]);
        (this.mapListeners.length = 0),
          super.setMap(a),
          a &&
            (this.startActive ? this.showPanel() : this.renderPanel(),
            this.activationMode !== 'click' &&
              this.mapListeners.push(
                a.on('pointerdown', () => {
                  this.hidePanel();
                }),
              ));
      }
      showPanel() {
        this.element.classList.contains(this.shownClassName) ||
          (this.element.classList.add(this.shownClassName), this.updateButton(), this.renderPanel()),
          this.dispatchEvent('show');
      }
      hidePanel() {
        this.element.classList.contains(this.shownClassName) && (this.element.classList.remove(this.shownClassName), this.updateButton()),
          this.dispatchEvent('hide');
      }
      updateButton() {
        this.element.classList.contains(this.shownClassName)
          ? ((this.button.textContent = this.collapseLabel),
            this.button.setAttribute('title', this.collapseTipLabel),
            this.button.setAttribute('aria-label', this.collapseTipLabel))
          : ((this.button.textContent = this.label),
            this.button.setAttribute('title', this.tipLabel),
            this.button.setAttribute('aria-label', this.tipLabel));
      }
      renderPanel() {
        this.dispatchEvent('render'),
          o.renderPanel(this.getMap(), this.panel, { groupSelectStyle: this.groupSelectStyle, reverse: this.reverse }),
          this.dispatchEvent('rendercomplete');
      }
      static renderPanel(a, c, h) {
        const u = new Event('render');
        for (
          c.dispatchEvent(u),
            h = h || {},
            h.groupSelectStyle = o.getGroupSelectStyle(h.groupSelectStyle),
            o.ensureTopVisibleBaseLayerShown(a, h.groupSelectStyle);
          c.firstChild;

        )
          c.removeChild(c.firstChild);
        o.forEachRecursive(a, function (g, m, _) {
          g.set('indeterminate', !1);
        }),
          h.groupSelectStyle === 'children' || h.groupSelectStyle === 'none'
            ? o.setGroupVisibility(a)
            : h.groupSelectStyle === 'group' && o.setChildVisibility(a);
        const d = document.createElement('ul');
        c.appendChild(d),
          o.renderLayers_(a, a, d, h, function (m) {
            o.renderPanel(a, c, h);
          });
        const f = new Event('rendercomplete');
        c.dispatchEvent(f);
      }
      static isBaseGroup(a) {
        if (a instanceof s) {
          const c = a.getLayers().getArray();
          return c.length && c[0].get('type') === 'base';
        } else return !1;
      }
      static setGroupVisibility(a) {
        o.getGroupsAndLayers(a, function (h) {
          return h instanceof s && !h.get('combine') && !o.isBaseGroup(h);
        })
          .reverse()
          .forEach(function (h) {
            const u = h.getLayersArray().map(function (d) {
              return d.getVisible();
            });
            u.every(function (d) {
              return d === !0;
            })
              ? (h.setVisible(!0), h.set('indeterminate', !1))
              : u.every(function (d) {
                  return d === !1;
                })
              ? (h.setVisible(!1), h.set('indeterminate', !1))
              : (h.setVisible(!0), h.set('indeterminate', !0));
          });
      }
      static setChildVisibility(a) {
        o.getGroupsAndLayers(a, function (h) {
          return h instanceof s && !h.get('combine') && !o.isBaseGroup(h);
        }).forEach(function (h) {
          const u = h,
            d = u.getVisible(),
            f = u.get('indeterminate');
          u.getLayers()
            .getArray()
            .forEach(function (g) {
              g.set('indeterminate', !1), (!d || f) && g.getVisible() && g.set('indeterminate', !0);
            });
        });
      }
      static ensureTopVisibleBaseLayerShown(a, c) {
        let h;
        o.forEachRecursive(a, function (u, d, f) {
          u.get('type') === 'base' && u.getVisible() && (h = u);
        }),
          h && o.setVisible_(a, h, !0, c);
      }
      static getGroupsAndLayers(a, c) {
        const h = [];
        return (
          (c =
            c ||
            function (u, d, f) {
              return !0;
            }),
          o.forEachRecursive(a, function (u, d, f) {
            u.get('title') && c(u, d, f) && h.push(u);
          }),
          h
        );
      }
      static setVisible_(a, c, h, u) {
        c.setVisible(h),
          h &&
            c.get('type') === 'base' &&
            o.forEachRecursive(a, function (d, f, g) {
              d != c && d.get('type') === 'base' && d.setVisible(!1);
            }),
          c instanceof s &&
            !c.get('combine') &&
            u === 'children' &&
            c.getLayers().forEach((d) => {
              o.setVisible_(a, d, c.getVisible(), u);
            });
      }
      static renderLayer_(a, c, h, u, d) {
        const f = document.createElement('li'),
          g = c.get('title'),
          m = o.uuid(),
          _ = document.createElement('label');
        if (c instanceof s && !c.get('combine')) {
          const p = o.isBaseGroup(c);
          if ((f.classList.add('group'), p && f.classList.add(r + 'base-group'), c.get('fold'))) {
            f.classList.add(r + 'fold'), f.classList.add(r + c.get('fold'));
            const x = document.createElement('button');
            (x.onclick = function (E) {
              const w = E || window.event;
              o.toggleFold_(c, f), w.preventDefault();
            }),
              f.appendChild(x);
          }
          if (!p && u.groupSelectStyle != 'none') {
            const x = document.createElement('input');
            (x.type = 'checkbox'),
              (x.id = m),
              (x.checked = c.getVisible()),
              (x.indeterminate = c.get('indeterminate')),
              (x.onchange = function (E) {
                const w = E.target;
                o.setVisible_(a, c, w.checked, u.groupSelectStyle), d(c);
              }),
              f.appendChild(x),
              (_.htmlFor = m);
          }
          (_.innerHTML = g), f.appendChild(_);
          const v = document.createElement('ul');
          f.appendChild(v), o.renderLayers_(a, c, v, u, d);
        } else {
          f.className = 'layer';
          const p = document.createElement('input');
          c.get('type') === 'base' ? (p.type = 'radio') : (p.type = 'checkbox'),
            (p.id = m),
            (p.checked = c.get('visible')),
            (p.indeterminate = c.get('indeterminate')),
            (p.onchange = function (x) {
              const E = x.target;
              o.setVisible_(a, c, E.checked, u.groupSelectStyle), d(c);
            }),
            f.appendChild(p),
            (_.htmlFor = m),
            (_.innerHTML = g);
          const v = a.getView().getResolution();
          if (v >= c.getMaxResolution() || v < c.getMinResolution()) _.className += ' disabled';
          else if (c.getMinZoom && c.getMaxZoom) {
            const x = a.getView().getZoom();
            (x <= c.getMinZoom() || x > c.getMaxZoom()) && (_.className += ' disabled');
          }
          f.appendChild(_);
        }
        return f;
      }
      static renderLayers_(a, c, h, u, d) {
        let f = c.getLayers().getArray().slice();
        u.reverse && (f = f.reverse());
        for (let g = 0, m; g < f.length; g++) (m = f[g]), m.get('title') && h.appendChild(o.renderLayer_(a, m, g, u, d));
      }
      static forEachRecursive(a, c) {
        a.getLayers().forEach(function (h, u, d) {
          c(h, u, d), h instanceof s && o.forEachRecursive(h, c);
        });
      }
      static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a) {
          const c = (Math.random() * 16) | 0;
          return (a == 'x' ? c : (c & 3) | 8).toString(16);
        });
      }
      static enableTouchScroll_(a) {
        if (o.isTouchDevice_()) {
          let c = 0;
          a.addEventListener(
            'touchstart',
            function (h) {
              c = this.scrollTop + h.touches[0].pageY;
            },
            !1,
          ),
            a.addEventListener(
              'touchmove',
              function (h) {
                this.scrollTop = c - h.touches[0].pageY;
              },
              !1,
            );
        }
      }
      static isTouchDevice_() {
        try {
          return document.createEvent('TouchEvent'), !0;
        } catch {
          return !1;
        }
      }
      static toggleFold_(a, c) {
        c.classList.remove(r + a.get('fold')),
          a.set('fold', a.get('fold') === 'open' ? 'close' : 'open'),
          c.classList.add(r + a.get('fold'));
      }
      static getGroupSelectStyle(a) {
        return ['none', 'children', 'group'].indexOf(a) >= 0 ? a : 'children';
      }
    }
    return window.ol && window.ol.control && (window.ol.control.LayerSwitcher = o), o;
  });
})(bE);
const ME = El,
  AE = { SELECT: 'select' };
class OE extends Gt {
  constructor(e, t, n, s) {
    super(e), (this.selected = t), (this.deselected = n), (this.mapBrowserEvent = s);
  }
}
const Qs = {};
class Na extends Bn {
  constructor(e) {
    super(),
      this.on,
      this.once,
      this.un,
      (e = e || {}),
      (this.boundAddFeature_ = this.addFeature_.bind(this)),
      (this.boundRemoveFeature_ = this.removeFeature_.bind(this)),
      (this.condition_ = e.condition ? e.condition : Hx),
      (this.addCondition_ = e.addCondition ? e.addCondition : wh),
      (this.removeCondition_ = e.removeCondition ? e.removeCondition : wh),
      (this.toggleCondition_ = e.toggleCondition ? e.toggleCondition : kd),
      (this.multi_ = e.multi ? e.multi : !1),
      (this.filter_ = e.filter ? e.filter : Ki),
      (this.hitTolerance_ = e.hitTolerance ? e.hitTolerance : 0),
      (this.style_ = e.style !== void 0 ? e.style : FE()),
      (this.features_ = e.features || new dt());
    let t;
    if (e.layers)
      if (typeof e.layers == 'function') t = e.layers;
      else {
        const n = e.layers;
        t = function (s) {
          return n.includes(s);
        };
      }
    else t = Ki;
    (this.layerFilter_ = t), (this.featureLayerAssociation_ = {});
  }
  addFeatureLayerAssociation_(e, t) {
    this.featureLayerAssociation_[fe(e)] = t;
  }
  getFeatures() {
    return this.features_;
  }
  getHitTolerance() {
    return this.hitTolerance_;
  }
  getLayer(e) {
    return this.featureLayerAssociation_[fe(e)];
  }
  setHitTolerance(e) {
    this.hitTolerance_ = e;
  }
  setMap(e) {
    this.getMap() && this.style_ && this.features_.forEach(this.restorePreviousStyle_.bind(this)),
      super.setMap(e),
      e
        ? (this.features_.addEventListener(Ge.ADD, this.boundAddFeature_),
          this.features_.addEventListener(Ge.REMOVE, this.boundRemoveFeature_),
          this.style_ && this.features_.forEach(this.applySelectedStyle_.bind(this)))
        : (this.features_.removeEventListener(Ge.ADD, this.boundAddFeature_),
          this.features_.removeEventListener(Ge.REMOVE, this.boundRemoveFeature_));
  }
  addFeature_(e) {
    const t = e.element;
    if ((this.style_ && this.applySelectedStyle_(t), !this.getLayer(t))) {
      const n = this.getMap()
        .getAllLayers()
        .find(function (s) {
          if (s instanceof Tr && s.getSource() && s.getSource().hasFeature(t)) return s;
        });
      n && this.addFeatureLayerAssociation_(t, n);
    }
  }
  removeFeature_(e) {
    this.style_ && this.restorePreviousStyle_(e.element);
  }
  getStyle() {
    return this.style_;
  }
  applySelectedStyle_(e) {
    const t = fe(e);
    t in Qs || (Qs[t] = e.getStyle()), e.setStyle(this.style_);
  }
  restorePreviousStyle_(e) {
    const t = this.getMap().getInteractions().getArray();
    for (let s = t.length - 1; s >= 0; --s) {
      const r = t[s];
      if (r !== this && r instanceof Na && r.getStyle() && r.getFeatures().getArray().lastIndexOf(e) !== -1) {
        e.setStyle(r.getStyle());
        return;
      }
    }
    const n = fe(e);
    e.setStyle(Qs[n]), delete Qs[n];
  }
  removeFeatureLayerAssociation_(e) {
    delete this.featureLayerAssociation_[fe(e)];
  }
  handleEvent(e) {
    if (!this.condition_(e)) return !0;
    const t = this.addCondition_(e),
      n = this.removeCondition_(e),
      s = this.toggleCondition_(e),
      r = !t && !n && !s,
      o = e.map,
      l = this.getFeatures(),
      a = [],
      c = [];
    if (r) {
      Gn(this.featureLayerAssociation_),
        o.forEachFeatureAtPixel(
          e.pixel,
          (h, u) => {
            if (!(!(h instanceof $t) || !this.filter_(h, u))) return this.addFeatureLayerAssociation_(h, u), c.push(h), !this.multi_;
          },
          { layerFilter: this.layerFilter_, hitTolerance: this.hitTolerance_ },
        );
      for (let h = l.getLength() - 1; h >= 0; --h) {
        const u = l.item(h),
          d = c.indexOf(u);
        d > -1 ? c.splice(d, 1) : (l.remove(u), a.push(u));
      }
      c.length !== 0 && l.extend(c);
    } else {
      o.forEachFeatureAtPixel(
        e.pixel,
        (h, u) => {
          if (!(!(h instanceof $t) || !this.filter_(h, u)))
            return (
              (t || s) && !l.getArray().includes(h)
                ? (this.addFeatureLayerAssociation_(h, u), c.push(h))
                : (n || s) && l.getArray().includes(h) && (a.push(h), this.removeFeatureLayerAssociation_(h)),
              !this.multi_
            );
        },
        { layerFilter: this.layerFilter_, hitTolerance: this.hitTolerance_ },
      );
      for (let h = a.length - 1; h >= 0; --h) l.remove(a[h]);
      l.extend(c);
    }
    return (c.length > 0 || a.length > 0) && this.dispatchEvent(new OE(AE.SELECT, c, a, e)), !0;
  }
}
function FE() {
  const i = Wy();
  return (
    Ct(i.Polygon, i.LineString),
    Ct(i.GeometryCollection, i.LineString),
    function (e) {
      return e.getGeometry() ? i[e.getGeometry().getType()] : null;
    }
  );
}
const DE = Na;
window.ol && ol.ext && !ol.ext.input && (ol.ext.input = {});
var kE = class extends Ze {
    constructor(e) {
      (e = e || {}), super();
      var t = (this.input = e.input);
      t ||
        ((t = this.input = document.createElement('INPUT')),
        e.type && t.setAttribute('type', e.type),
        e.min !== void 0 && t.setAttribute('min', e.min),
        e.max !== void 0 && t.setAttribute('max', e.max),
        e.step !== void 0 && t.setAttribute('step', e.step),
        e.parent && e.parent.appendChild(t)),
        e.disabled && (t.disabled = !0),
        e.checked !== void 0 && (t.checked = !!e.checked),
        e.val !== void 0 && (t.value = e.val),
        e.hidden && (t.style.display = 'none'),
        t.addEventListener(
          'focus',
          function () {
            this.element && this.element.classList.add('ol-focus');
          }.bind(this),
        );
      var n;
      t.addEventListener(
        'focusout',
        function () {
          this.element &&
            (n && clearTimeout(n),
            (n = setTimeout(
              function () {
                this.element.classList.remove('ol-focus');
              }.bind(this),
              0,
            )));
        }.bind(this),
      );
    }
    _listenDrag(e, t) {
      var n = function (s) {
        (this.moving = !0), this.element.classList.add('ol-moving');
        var r = function (o) {
          o.type === 'pointerup' &&
            (document.removeEventListener('pointermove', r),
            document.removeEventListener('pointerup', r),
            document.removeEventListener('pointercancel', r),
            setTimeout(
              function () {
                (this.moving = !1), this.element.classList.remove('ol-moving');
              }.bind(this),
            )),
            o.target === e && t(o),
            o.stopPropagation(),
            o.preventDefault();
        }.bind(this);
        document.addEventListener('pointermove', r, !1),
          document.addEventListener('pointerup', r, !1),
          document.addEventListener('pointercancel', r, !1),
          s.stopPropagation(),
          s.preventDefault();
      }.bind(this);
      e.addEventListener('mousedown', n, !1), e.addEventListener('touchstart', n, !1);
    }
    setValue(e) {
      e !== void 0 && (this.input.value = e), this.input.dispatchEvent(new Event('change'));
    }
    getValue() {
      return this.input.value;
    }
    getInputElement() {
      return this.input;
    }
  },
  Ga = class extends kE {
    constructor(e) {
      (e = e || {}), super(e);
      var t = (this.element = document.createElement('LABEL'));
      e.html instanceof Element ? t.appendChild(e.html) : e.html !== void 0 && (t.innerHTML = e.html),
        (t.className = ('ol-ext-check ol-ext-checkbox ' + (e.className || '')).trim()),
        this.input.parentNode && this.input.parentNode.insertBefore(t, this.input),
        t.appendChild(this.input),
        t.appendChild(document.createElement('SPAN')),
        e.after && t.appendChild(document.createTextNode(e.after)),
        this.input.addEventListener(
          'change',
          function () {
            this.dispatchEvent({ type: 'check', checked: this.input.checked, value: this.input.value });
          }.bind(this),
        );
    }
    isChecked() {
      return this.input.checked;
    }
  },
  NE = class extends Ga {
    constructor(e) {
      (e = e || {}), super(e), (this.element.className = ('ol-ext-toggle-switch ' + (e.className || '')).trim());
    }
  },
  GE = class extends Ga {
    constructor(e) {
      (e = e || {}), super(e), (this.element.className = ('ol-ext-check ol-ext-radio ' + (e.className || '')).trim());
    }
  },
  q = {};
q.create = function (i, e) {
  e = e || {};
  var t;
  if (i === 'TEXT') (t = document.createTextNode(e.html || '')), e.parent && e.parent.appendChild(t);
  else {
    (t = document.createElement(i)), /button/i.test(i) && t.setAttribute('type', 'button');
    for (var n in e)
      switch (n) {
        case 'className': {
          e.className && e.className.trim && t.setAttribute('class', e.className.trim());
          break;
        }
        case 'text': {
          t.innerText = e.text;
          break;
        }
        case 'html': {
          e.html instanceof Element ? t.appendChild(e.html) : e.html !== void 0 && (t.innerHTML = e.html);
          break;
        }
        case 'parent': {
          e.parent && e.parent.appendChild(t);
          break;
        }
        case 'options': {
          if (/select/i.test(i)) for (var s in e.options) q.create('OPTION', { html: s, value: e.options[s], parent: t });
          break;
        }
        case 'style': {
          q.setStyle(t, e.style);
          break;
        }
        case 'change':
        case 'click': {
          q.addListener(t, n, e[n]);
          break;
        }
        case 'on': {
          for (var r in e.on) q.addListener(t, r, e.on[r]);
          break;
        }
        case 'checked': {
          t.checked = !!e.checked;
          break;
        }
        default: {
          t.setAttribute(n, e[n]);
          break;
        }
      }
  }
  return t;
};
q.createSwitch = function (i) {
  var e = q.create('INPUT', { type: 'checkbox', on: i.on, click: i.click, change: i.change, parent: i.parent }),
    t = Object.assign({ input: e }, i || {});
  return new NE(t), e;
};
q.createCheck = function (i) {
  var e = q.create('INPUT', { name: i.name, type: i.type === 'radio' ? 'radio' : 'checkbox', on: i.on, parent: i.parent }),
    t = Object.assign({ input: e }, i || {});
  return i.type === 'radio' ? new GE(t) : new Ga(t), e;
};
q.setHTML = function (i, e) {
  e instanceof Element ? i.appendChild(e) : e !== void 0 && (i.innerHTML = e);
};
q.appendText = function (i, e) {
  i.appendChild(document.createTextNode(e || ''));
};
q.addListener = function (i, e, t, n) {
  typeof e == 'string' && (e = e.split(' ')),
    e.forEach(function (s) {
      i.addEventListener(s, t, n);
    });
};
q.removeListener = function (i, e, t) {
  typeof e == 'string' && (e = e.split(' ')),
    e.forEach(function (n) {
      i.removeEventListener(n, t);
    });
};
q.show = function (i) {
  i.style.display = '';
};
q.hide = function (i) {
  i.style.display = 'none';
};
q.hidden = function (i) {
  return q.getStyle(i, 'display') === 'none';
};
q.toggle = function (i) {
  i.style.display = i.style.display === 'none' ? '' : 'none';
};
q.setStyle = function (i, e) {
  for (var t in e)
    switch (t) {
      case 'top':
      case 'left':
      case 'bottom':
      case 'right':
      case 'minWidth':
      case 'maxWidth':
      case 'width':
      case 'height': {
        typeof e[t] == 'number' ? (i.style[t] = e[t] + 'px') : (i.style[t] = e[t]);
        break;
      }
      default:
        i.style[t] = e[t];
    }
};
q.getStyle = function (i, e) {
  var t,
    n = (i.ownerDocument || document).defaultView;
  if (n && n.getComputedStyle) (e = e.replace(/([A-Z])/g, '-$1').toLowerCase()), (t = n.getComputedStyle(i, null).getPropertyValue(e));
  else if (
    i.currentStyle &&
    ((e = e.replace(/-(\w)/g, function (s, r) {
      return r.toUpperCase();
    })),
    (t = i.currentStyle[e]),
    /^\d+(em|pt|%|ex)?$/i.test(t))
  )
    return (function (s) {
      var r = i.style.left,
        o = i.runtimeStyle.left;
      return (
        (i.runtimeStyle.left = i.currentStyle.left),
        (i.style.left = s || 0),
        (s = i.style.pixelLeft + 'px'),
        (i.style.left = r),
        (i.runtimeStyle.left = o),
        s
      );
    })(t);
  return /px$/.test(t) ? parseInt(t) : t;
};
q.outerHeight = function (i) {
  return i.offsetHeight + q.getStyle(i, 'marginBottom');
};
q.outerWidth = function (i) {
  return i.offsetWidth + q.getStyle(i, 'marginLeft');
};
q.offsetRect = function (i) {
  var e = i.getBoundingClientRect();
  return {
    top: e.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
    left: e.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
    height: e.height || e.bottom - e.top,
    width: e.width || e.right - e.left,
  };
};
q.getFixedOffset = function (i) {
  var e = { left: 0, top: 0 },
    t = function (n) {
      if (!n) return e;
      if (q.getStyle(n, 'position') === 'absolute' && q.getStyle(n, 'transform') !== 'none') {
        var s = n.getBoundingClientRect();
        return (e.left += s.left), (e.top += s.top), e;
      }
      return t(n.offsetParent);
    };
  return t(i.offsetParent);
};
q.positionRect = function (i, e) {
  var t = 0,
    n = 0,
    s = function (r) {
      if (r) return (t += r.offsetLeft), (n += r.offsetTop), s(r.offsetParent);
      var o = { top: i.offsetTop + n, left: i.offsetLeft + t };
      return (
        e &&
          ((o.top -= window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
          (o.left -= window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)),
        (o.bottom = o.top + i.offsetHeight),
        (o.right = o.top + i.offsetWidth),
        o
      );
    };
  return s(i.offsetParent);
};
q.scrollDiv = function (i, e) {
  e = e || {};
  var t = !1,
    n = 0,
    s,
    r = 0,
    o = typeof e.onmove == 'function' ? e.onmove : function () {},
    l = e.vertical ? 'screenY' : 'screenX',
    a = e.vertical ? 'scrollTop' : 'scrollLeft',
    c = !1,
    h,
    u,
    d = 0,
    f = function () {
      x && (d++, setTimeout(g));
    },
    g = function () {
      if (x) {
        if ((d--, d)) return;
        var b = i.clientHeight,
          S = i.scrollHeight;
        (h = b / S),
          (x.style.height = h * 100 + '%'),
          (x.style.top = (i.scrollTop / S) * 100 + '%'),
          (v.style.height = b + 'px'),
          b > S - 0.5 ? v.classList.add('ol-100pc') : v.classList.remove('ol-100pc');
      }
    },
    m = function (b) {
      b.target.classList.contains('ol-noscroll') ||
        ((c = !1),
        (t = b[l]),
        (r = new Date()),
        i.classList.add('ol-move'),
        b.preventDefault(),
        window.addEventListener('pointermove', _),
        q.addListener(window, ['pointerup', 'pointercancel'], w));
    },
    _ = function (b) {
      if (t !== !1) {
        var S = (u ? -1 / h : 1) * (t - b[l]);
        (c = c || Math.round(S)), (i[a] += S), (s = new Date()), s - r && (n = (n + S / (s - r)) / 2), (t = b[l]), (r = s), S && o(!0);
      } else c = !0;
    },
    p = function (b) {
      var S = b > 0 ? Math.min(100, b / 2) : Math.max(-100, b / 2);
      (b -= S),
        (i[a] += S),
        -1 < b && b < 1
          ? (c
              ? setTimeout(function () {
                  i.classList.remove('ol-move');
                })
              : i.classList.remove('ol-move'),
            (c = !1),
            o(!1))
          : setTimeout(function () {
              p(b);
            }, 40);
    },
    v,
    x;
  if (e.vertical && e.minibar) {
    var E = function (b) {
      i.removeEventListener('pointermove', E),
        i.parentNode.classList.add('ol-miniscroll'),
        (x = q.create('DIV')),
        (v = q.create('DIV', { className: 'ol-scroll', html: x })),
        i.parentNode.insertBefore(v, i),
        x.addEventListener('pointerdown', function (S) {
          (u = !0), m(S);
        }),
        e.mousewheel &&
          (q.addListener(v, ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], function (S) {
            P(S);
          }),
          q.addListener(x, ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], function (S) {
            P(S);
          })),
        i.parentNode.addEventListener('pointerenter', f),
        window.addEventListener('resize', f),
        b !== !1 && f();
    };
    i.parentNode ? E(!1) : i.addEventListener('pointermove', E),
      i.addEventListener('scroll', function () {
        f();
      });
  }
  (i.style['touch-action'] = 'none'),
    (i.style.overflow = 'hidden'),
    i.classList.add('ol-scrolldiv'),
    q.addListener(i, ['pointerdown'], function (b) {
      (u = !1), m(b);
    }),
    i.addEventListener(
      'click',
      function (b) {
        i.classList.contains('ol-move') && (b.preventDefault(), b.stopPropagation());
      },
      !0,
    );
  var w = function (b) {
      (r = new Date() - r),
        r > 100 || u ? (n = 0) : r > 0 && (n = ((n || 0) + (t - b[l]) / r) / 2),
        p(e.animate === !1 ? 0 : n * 200),
        (t = !1),
        (n = 0),
        (r = 0),
        i.classList.contains('ol-move')
          ? i.classList.remove('ol-hasClick')
          : (i.classList.add('ol-hasClick'),
            setTimeout(function () {
              i.classList.remove('ol-hasClick');
            }, 500)),
        (u = !1),
        window.removeEventListener('pointermove', _),
        q.removeListener(window, ['pointerup', 'pointercancel'], w);
    },
    P = function (b) {
      var S = Math.max(-1, Math.min(1, b.wheelDelta || -b.detail));
      return i.classList.add('ol-move'), (i[a] -= S * 30), i.classList.remove('ol-move'), !1;
    };
  return e.mousewheel && q.addListener(i, ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], P), { refresh: f };
};
q.dispatchEvent = function (i, e) {
  var t;
  try {
    t = new CustomEvent(i);
  } catch {
    (t = document.createEvent('CustomEvent')), t.initCustomEvent(i, !0, !0, {});
  }
  e.dispatchEvent(t);
};
var WE = class extends xv {
    constructor(e) {
      e = e || {};
      var t = document.createElement('div');
      (e.element = t),
        super(e),
        typeof e.offsetBox == 'number'
          ? (this.offsetBox = [e.offsetBox, e.offsetBox, e.offsetBox, e.offsetBox])
          : (this.offsetBox = e.offsetBox),
        (this.closeBox = e.closeBox),
        (this.onclose = e.onclose),
        (this.onshow = e.onshow),
        q.create('BUTTON', {
          className: 'closeBox' + (e.closeBox ? ' hasclosebox' : ''),
          type: 'button',
          click: function () {
            this.hide();
          }.bind(this),
          parent: t,
        }),
        e.anchor !== !1 && q.create('DIV', { className: 'anchor', parent: t }),
        (this.content = q.create('DIV', { html: e.html || '', className: 'ol-popup-content', parent: t })),
        e.minibar && q.scrollDiv(this.content, { vertical: !0, mousewheel: !0, minibar: !0 }),
        e.stopEvent &&
          (t.addEventListener('mousedown', function (n) {
            n.stopPropagation();
          }),
          t.addEventListener('touchstart', function (n) {
            n.stopPropagation();
          })),
        (this._elt = t),
        this.setPositioning(e.positioning || 'auto'),
        this.setPopupClass(e.popupClass || e.className || 'default'),
        e.anim && this.addPopupClass('anim'),
        e.position &&
          setTimeout(
            function () {
              this.show(e.position);
            }.bind(this),
          );
    }
    getClassPositioning() {
      var e = '',
        t = this.getPositioning();
      return (
        /bottom/.test(t) && (e += 'ol-popup-bottom '),
        /top/.test(t) && (e += 'ol-popup-top '),
        /left/.test(t) && (e += 'ol-popup-left '),
        /right/.test(t) && (e += 'ol-popup-right '),
        /^center/.test(t) && (e += 'ol-popup-middle '),
        /center$/.test(t) && (e += 'ol-popup-center '),
        e
      );
    }
    setClosebox(e) {
      (this.closeBox = e), e ? this.element.classList.add('hasclosebox') : this.element.classList.remove('hasclosebox');
    }
    setPopupClass(e) {
      var t = ['ol-popup'];
      this.getVisible() && t.push('visible'), (this.element.className = '');
      var n = this.getClassPositioning()
        .split(' ')
        .filter(function (s) {
          return s.length > 0;
        });
      e
        ? e
            .split(' ')
            .filter(function (s) {
              return s.length > 0;
            })
            .forEach(function (s) {
              t.push(s);
            })
        : t.push('default'),
        n.forEach(function (s) {
          t.push(s);
        }),
        this.closeBox && t.push('hasclosebox'),
        this.element.classList.add.apply(this.element.classList, t);
    }
    addPopupClass(e) {
      this.element.classList.add(e);
    }
    removePopupClass(e) {
      this.element.classList.remove(e);
    }
    setPositioning(e) {
      e !== void 0 &&
        (/auto/.test(e)
          ? ((this.autoPositioning = e.split('-')), this.autoPositioning.length == 1 && (this.autoPositioning[1] = 'auto'))
          : (this.autoPositioning = !1),
        (e = e.replace(/auto/g, 'center')),
        e == 'center' && (e = 'bottom-center'),
        this.setPositioning_(e));
    }
    setPositioning_(e) {
      if (this.element) {
        super.setPositioning(e),
          this.element.classList.remove(
            'ol-popup-top',
            'ol-popup-bottom',
            'ol-popup-left',
            'ol-popup-right',
            'ol-popup-center',
            'ol-popup-middle',
          );
        var t = this.getClassPositioning()
          .split(' ')
          .filter(function (n) {
            return n.length > 0;
          });
        this.element.classList.add.apply(this.element.classList, t);
      }
    }
    getVisible() {
      return this.element.classList.contains('visible');
    }
    show(e, t) {
      !t && typeof e == 'string' && ((t = e), (e = null)), e === !0 && (e = this.getPosition());
      var n = this,
        s = this.getMap();
      if (
        s &&
        (t &&
          t !== this.prevHTML &&
          ((this.prevHTML = t),
          (this.content.innerHTML = ''),
          t instanceof Element ? this.content.appendChild(t) : q.create('DIV', { html: t, parent: this.content }),
          Array.prototype.slice.call(this.content.querySelectorAll('img')).forEach(function (a) {
            a.addEventListener('load', function () {
              try {
                s.renderSync();
              } catch {}
              n.content.dispatchEvent(new Event('scroll'));
            });
          })),
        e)
      ) {
        if (this.autoPositioning) {
          var r = s.getPixelFromCoordinate(e),
            o = s.getSize(),
            l = [];
          this.autoPositioning[0] == 'auto' ? (l[0] = r[1] < o[1] / 3 ? 'top' : 'bottom') : (l[0] = this.autoPositioning[0]),
            (l[1] = r[0] < (2 * o[0]) / 3 ? 'left' : 'right'),
            this.setPositioning_(l[0] + '-' + l[1]),
            this.offsetBox && this.setOffset([this.offsetBox[l[1] == 'left' ? 2 : 0], this.offsetBox[l[0] == 'top' ? 3 : 1]]);
        } else this.offsetBox && this.setOffset(this.offsetBox);
        this.setPosition(e),
          (this.element.parentElement.style.display = ''),
          typeof this.onshow == 'function' && this.onshow(),
          this.dispatchEvent({ type: 'show' }),
          (this._tout = setTimeout(function () {
            n.element.classList.add('visible');
          }, 0));
      }
    }
    hide() {
      this.getPosition() != null &&
        (typeof this.onclose == 'function' && this.onclose(),
        this.setPosition(void 0),
        this._tout && clearTimeout(this._tout),
        this.element.classList.remove('visible'),
        this.dispatchEvent({ type: 'hide' }));
    }
  },
  tf = class extends zn {
    constructor(e) {
      e = e || {};
      var t = (e.className || '') + ' ol-search' + (e.target ? '' : ' ol-unselectable ol-control'),
        n = q.create('DIV', { className: t });
      super({ element: n, target: e.target });
      var s = this;
      if (
        (e.typing == null && (e.typing = 300),
        (this._classname = e.className || 'search'),
        e.collapsed !== !1 && n.classList.add('ol-collapsed'),
        e.target ||
          ((this.button = document.createElement('BUTTON')),
          this.button.setAttribute('type', 'button'),
          this.button.setAttribute('title', e.title || e.label || 'Search'),
          this.button.addEventListener('click', function () {
            if ((n.classList.toggle('ol-collapsed'), !n.classList.contains('ol-collapsed'))) {
              n.querySelector('input.search').focus();
              for (var d = n.querySelectorAll('li'), f = 0; f < d.length; f++) d[f].classList.remove('select');
              a.value || s.drawList_();
            }
          }),
          n.appendChild(this.button)),
        e.inputLabel)
      ) {
        var r = document.createElement('LABEL');
        (r.innerText = e.inputLabel), n.appendChild(r);
      }
      var o,
        l = '',
        a = (this._input = document.createElement('INPUT'));
      a.setAttribute('type', 'search'),
        a.setAttribute('class', 'search'),
        a.setAttribute('autocomplete', 'off'),
        a.setAttribute('placeholder', e.placeholder || 'Search...'),
        a.addEventListener('change', function (d) {
          s.dispatchEvent({ type: 'change:input', input: d, value: a.value });
        });
      var c = function (d) {
        var f = n.querySelector('ul.autocomplete li.select'),
          g = a.value;
        if (d.key == 'ArrowDown' || d.key == 'ArrowUp' || d.key == 'Down' || d.key == 'Up')
          f
            ? (f.classList.remove('select'),
              (f = /Down/.test(d.key) ? f.nextElementSibling : f.previousElementSibling),
              f && f.classList.add('select'))
            : n.querySelector('ul.autocomplete li').classList.add('select');
        else if (d.type == 'input' && !g)
          setTimeout(function () {
            s.drawList_();
          }, 200);
        else if (f && (d.type == 'search' || d.key == 'Enter'))
          n.classList.contains('ol-control') && a.blur(),
            f.classList.remove('select'),
            (l = g),
            s._handleSelect(s._list[f.getAttribute('data-search')]);
        else if (d.type == 'search' || d.key == 'Enter' || (l != g && e.typing >= 0))
          if (((l = g), l)) {
            o && clearTimeout(o);
            var m = s.get('minLength');
            o = setTimeout(function () {
              if (l.length >= m) {
                var _ = s.autocomplete(l, function (p) {
                  s.drawList_(p);
                });
                _ && s.drawList_(_);
              } else s.drawList_();
            }, e.typing);
          } else s.drawList_();
        else (f = n.querySelector('ul.autocomplete li')), f && f.classList.remove('select');
      };
      if (
        (a.addEventListener('keyup', c),
        a.addEventListener('search', c),
        a.addEventListener('cut', c),
        a.addEventListener('paste', c),
        a.addEventListener('input', c),
        e.noCollapse ||
          (a.addEventListener(
            'blur',
            function () {
              setTimeout(
                function () {
                  a !== document.activeElement &&
                    (n.classList.add('ol-collapsed'), this.set('reverse', !1), n.classList.remove('ol-revers'));
                }.bind(this),
                200,
              );
            }.bind(this),
          ),
          a.addEventListener(
            'focus',
            function () {
              this.get('reverse') || (n.classList.remove('ol-collapsed'), n.classList.remove('ol-revers'));
            }.bind(this),
          )),
        n.appendChild(a),
        e.reverse)
      ) {
        var h = q.create('BUTTON', {
          type: 'button',
          class: 'ol-revers',
          title: e.reverseTitle || 'click on the map',
          click: function () {
            this.get('reverse')
              ? this.set('reverse', !1)
              : (this.set('reverse', !this.get('reverse')), a.focus(), n.classList.add('ol-revers'));
          }.bind(this),
        });
        n.appendChild(h);
      }
      var u = document.createElement('UL');
      u.classList.add('autocomplete'),
        n.appendChild(u),
        typeof e.getTitle == 'function' && (this.getTitle = e.getTitle),
        typeof e.autocomplete == 'function' && (this.autocomplete = e.autocomplete),
        this.set('copy', e.copy),
        this.set('minLength', e.minLength || 1),
        this.set('maxItems', e.maxItems || 10),
        this.set('maxHistory', e.maxHistory || e.maxItems || 10),
        e.onselect && this.on('select', e.onselect),
        e.centerOnSelect &&
          this.on(
            'select',
            function (d) {
              var f = this.getMap();
              f && f.getView().setCenter(d.coordinate);
            }.bind(this),
          ),
        e.zoomOnSelect &&
          this.on(
            'select',
            function (d) {
              var f = this.getMap();
              f && (f.getView().setCenter(d.coordinate), f.getView().getZoom() < e.zoomOnSelect && f.getView().setZoom(e.zoomOnSelect));
            }.bind(this),
          ),
        this.restoreHistory(),
        this.drawList_();
    }
    setMap(e) {
      this._listener && Ei(this._listener),
        (this._listener = null),
        super.setMap(e),
        e && (this._listener = e.on('click', this._handleClick.bind(this)));
    }
    collapse(e) {
      e === !1 ? this.element.classList.remove('ol-collapsed') : this.element.classList.add('ol-collapsed');
    }
    getInputField() {
      return this._input;
    }
    getTitle(e) {
      return e.name || 'No title';
    }
    _getTitleTxt(e) {
      return q.create('DIV', { html: this.getTitle(e) }).innerText;
    }
    search() {
      var e = this.element.querySelector('input.search');
      this._triggerCustomEvent('search', e);
    }
    _handleClick(e) {
      this.get('reverse') && (document.activeElement.blur(), this.reverseGeocode(e.coordinate));
    }
    reverseGeocode() {}
    _triggerCustomEvent(e, t) {
      q.dispatchEvent(e, t);
    }
    setInput(e, t) {
      var n = this.element.querySelector('input.search');
      (n.value = e), t && this._triggerCustomEvent('keyup', n);
    }
    select(e, t, n, s) {
      var r = { type: 'select', search: e, reverse: !!t, coordinate: n };
      if (s) for (var o in s) r[o] = s[o];
      this.dispatchEvent(r);
    }
    _handleSelect(e, t, n) {
      if (e) {
        var s = this.get('history'),
          r;
        try {
          var o = JSON.stringify(e);
          for (r = s.length - 1; r >= 0; r--) (!s[r] || JSON.stringify(s[r]) === o) && s.splice(r, 1);
        } catch {
          for (r = s.length - 1; r >= 0; r--) s[r] === e && s.splice(r, 1);
        }
        s.unshift(e);
        for (var l = Math.max(0, this.get('maxHistory') || 10) || 0; s.length > l; ) s.pop();
        this.saveHistory(),
          this.select(e, t, null, n),
          t &&
            (this.setInput(this._getTitleTxt(e)),
            this.drawList_(),
            setTimeout(
              function () {
                this.collapse(!1);
              }.bind(this),
              300,
            ));
      }
    }
    saveHistory() {
      try {
        this.get('maxHistory') >= 0
          ? (localStorage['ol@search-' + this._classname] = JSON.stringify(this.get('history')))
          : localStorage.removeItem('ol@search-' + this._classname);
      } catch {
        console.warn('Failed to access localStorage...');
      }
    }
    restoreHistory() {
      if (this._history[this._classname]) this.set('history', this._history[this._classname]);
      else
        try {
          (this._history[this._classname] = JSON.parse(localStorage['ol@search-' + this._classname])),
            this.set('history', this._history[this._classname]);
        } catch {
          this.set('history', []);
        }
    }
    clearHistory() {
      this.set('history', []), this.saveHistory(), this.drawList_();
    }
    getHistory() {
      return this.get('history');
    }
    autocomplete(e, t) {
      return t([]), !1;
    }
    drawList_(e) {
      var t = this,
        n = this.element.querySelector('ul.autocomplete');
      if (((n.innerHTML = ''), (this._list = []), e)) n.setAttribute('class', 'autocomplete');
      else {
        var s = this.element.querySelector('input.search'),
          r = s.value;
        if (!r) e = this.get('history');
        else return;
        n.setAttribute('class', 'autocomplete history');
      }
      for (var o, l = Math.min(t.get('maxItems'), e.length), a = 0; a < l; a++)
        if (e[a] && (!a || !t.equalFeatures(e[a], e[a - 1]))) {
          (o = document.createElement('LI')),
            o.setAttribute('data-search', this._list.length),
            this._list.push(e[a]),
            o.addEventListener('click', function (h) {
              t._handleSelect(t._list[h.currentTarget.getAttribute('data-search')]);
            });
          var c = t.getTitle(e[a]);
          c instanceof Element ? o.appendChild(c) : (o.innerHTML = c), n.appendChild(o);
        }
      l &&
        this.get('copy') &&
        ((o = document.createElement('LI')), o.classList.add('copy'), (o.innerHTML = this.get('copy')), n.appendChild(o));
    }
    equalFeatures() {
      return !1;
    }
  };
tf.prototype._history = {};
var zE = class extends tf {
    constructor(e) {
      (e = e || {}),
        (e.className = e.className || 'feature'),
        super(e),
        typeof e.getSearchString == 'function' && (this.getSearchString = e.getSearchString),
        this.set('property', e.property || 'name'),
        (this.source_ = e.source),
        (this._sort = e.sort);
    }
    restoreHistory() {
      this.set('history', []);
    }
    saveHistory() {
      try {
        localStorage.removeItem('ol@search-' + this._classname);
      } catch {
        console.warn('Failed to access localStorage...');
      }
    }
    getTitle(e) {
      return e.get(this.get('property') || 'name');
    }
    getSearchString(e) {
      return this.getTitle(e);
    }
    getSource() {
      return this.source_;
    }
    setSource(e) {
      this.source_ = e;
    }
    setSortFunction(e) {
      this._sort = e;
    }
    autocomplete(e) {
      var t = [];
      if (this.source_) {
        e = e.replace(/^\*/, '');
        for (var n = new RegExp(e, 'i'), s = this.source_.getFeatures(), r = this.get('maxItems'), o = 0, l; (l = s[o]); o++) {
          var a = this.getSearchString(l);
          if (a !== void 0 && n.test(a) && (t.push(l), --r <= 0)) break;
        }
      }
      return typeof this._sort == 'function' && (t = t.sort(this._sort)), t;
    }
  },
  Lo = class extends Ze {
    constructor(e) {
      (e = e || {}), super(e), e.feature && this.set('feature', e.feature.clone()), this.setWidth(e.width), this.setHeight(e.height);
    }
    setTitle(e) {
      this.set('title', e || ''), this.changed();
    }
    setWidth(e) {
      this.set('width', e || null), this.changed();
    }
    setHeight(e) {
      this.set('heigth', e || null), this.changed();
    }
    getElement(e, t) {
      this.get('width') && (e[1] = this.get('width')), this.get('height') && (e[1] = this.get('height'));
      var n = q.create('LI', {
        className: this.get('className'),
        click: function (s) {
          t(!1), s.stopPropagation();
        },
        style: { height: e[1] + 'px' },
        'aria-label': this.get('title'),
      });
      return (
        q.create('DIV', {
          click: function (s) {
            t(!0), s.stopPropagation();
          },
          style: { width: e[0] + 'px', height: e[1] + 'px' },
          parent: n,
        }),
        n
      );
    }
  },
  er = class extends Ze {
    constructor(e) {
      (e = e || {}),
        super(e),
        this.set('width', e.width),
        (this._img = e.img || new Image()),
        (this._img.onload = function () {
          this.changed();
        }.bind(this)),
        e.img || (this._img.src = e.src);
    }
    setTitle(e) {
      this.set('title', e || ''), this.changed();
    }
    setWidth(e) {
      this.set('width', e || null), this.changed();
    }
    getWidth() {
      return this._img.naturalWidth ? this.get('width') || this._img.naturalWidth : 0;
    }
    getHeight() {
      return this._img.naturalWidth
        ? this.get('width')
          ? (this.get('width') * this._img.naturalHeight) / this._img.naturalWidth
          : this._img.naturalHeight || 0
        : 0;
    }
    getImage() {
      return this._img;
    }
    getElement(e, t) {
      this.get('width') && (e[1] = this.get('width')), this.get('height') && (e[1] = this.get('height'));
      var n = q.create('LI', {
        className: this.get('className'),
        click: function (s) {
          t(!1), s.stopPropagation();
        },
        style: { height: this.getHeight() + 'px' },
        'aria-label': this.get('title'),
      });
      return (
        q.create('DIV', {
          click: function (s) {
            t(!0), s.stopPropagation();
          },
          style: { width: this.getWidth() + 'px', height: this.getHeight() + 'px' },
          parent: n,
        }),
        n
      );
    }
  };
window.ol && !ol.legend && (ol.legend = {});
var Zt = class extends Ze {
    constructor(e) {
      super(), (e = e || {}), (this._items = new dt());
      var t = [],
        n;
      this._items.on(
        'add',
        function (s) {
          t.push({
            item: s.element,
            on: s.element.on(
              'change',
              function () {
                this.refresh();
              }.bind(this),
            ),
          }),
            n && (clearTimeout(n), (n = null)),
            (n = setTimeout(
              function () {
                this.refresh();
              }.bind(this),
              0,
            ));
        }.bind(this),
      ),
        this._items.on(
          'remove',
          function (s) {
            for (var r = 0; r < t; r++)
              if (s.element === t[r].item) {
                Ei(t[r].on), t.splice(r, 1);
                break;
              }
            n && (clearTimeout(n), (n = null)),
              (n = setTimeout(
                function () {
                  this.refresh();
                }.bind(this),
                0,
              ));
          }.bind(this),
        ),
        (this._listElement = q.create('UL', { className: 'ol-legend' })),
        (this._canvas = document.createElement('canvas')),
        this.setLayer(e.layer),
        this.set('maxWidth', e.maxWidth, !0),
        this.set('size', e.size || [40, 25], !0),
        this.set('margin', e.margin === 0 ? 0 : e.margin || 10, !0),
        (this._textStyle =
          e.textStyle ||
          new rs({ font: '16px sans-serif', fill: new bt({ color: '#333' }), backgroundFill: new bt({ color: 'rgba(255,255,255,.8)' }) })),
        (this._title = new Lo({ title: e.title || '', className: 'ol-title' })),
        e.titleStyle
          ? (this._titleStyle = e.titleStyle)
          : ((this._titleStyle = this._textStyle.clone()), this._titleStyle.setFont('bold ' + this._titleStyle.getFont())),
        this.setStyle(e.style),
        e.items instanceof Array &&
          e.items.forEach(
            function (s) {
              this.addItem(s);
            }.bind(this),
          ),
        this.refresh();
    }
    static getLegendImage(e, t, n) {
      (e = e || {}), typeof e.margin > 'u' && (e.margin = 10);
      var s = e.size || [40, 25];
      e.width && (s[0] = e.width),
        e.heigth && (s[1] = e.heigth),
        (e.onload =
          e.onload ||
          function () {
            setTimeout(function () {
              Zt.getLegendImage(e, t, n);
            }, 100);
          });
      var r = s[0] + 2 * e.margin,
        o = e.lineHeight || s[1] + 2 * e.margin,
        l = e.pixelratio || Ni;
      t || ((n = 0), (t = document.createElement('canvas')), (t.width = r * l), (t.height = o * l));
      var a = t.getContext('2d');
      a.save();
      var c = cx(a, { pixelRatio: l }),
        h = e.typeGeom,
        u,
        d = e.feature;
      !d &&
        h &&
        (/Point/.test(h)
          ? (d = new $t(new ei([0, 0])))
          : /LineString/.test(h)
          ? (d = new $t(new Sn([0, 0])))
          : (d = new $t(new St([[0, 0]]))),
        e.properties && d.setProperties(e.properties)),
        d
          ? ((u = d.getStyle()),
            typeof u == 'function' && (u = u(d)),
            u || (u = typeof e.style == 'function' ? e.style(d) : e.style || []),
            (h = d.getGeometry().getType()))
          : (u = []),
        u instanceof Array || (u = [u]);
      var f = r / 2,
        g = o / 2,
        m = s[0] / 2,
        _ = s[1] / 2,
        p,
        v;
      if (h === 'Point') {
        var x = null;
        for (p = 0; (v = u[p]); p++) {
          var E = v.getImage();
          if (E) {
            var w = E.getPhoto ? E.getPhoto() : E.getImage();
            if (
              (w &&
                w instanceof HTMLImageElement &&
                !w.naturalWidth &&
                (typeof e.onload == 'function' &&
                  w.addEventListener('load', function () {
                    setTimeout(function () {
                      e.onload();
                    }, 100);
                  }),
                E.load()),
              E.getAnchor)
            ) {
              var P = E.getAnchor();
              if (P) {
                var b = E.getSize(),
                  S = P[0] - b[0],
                  k = P[1] - b[1];
                x ? ta(x, [S, k, S + b[0], k + b[1]]) : (x = [S, k, S + b[0], k + b[1]]);
              }
            }
          }
        }
        x && ((f = f + (x[2] + x[0]) / 2), (g = g + (x[3] + x[1]) / 2));
      }
      for (g += n || 0, p = 0; (v = u[p]); p++) {
        c.setStyle(v), a.save();
        var W;
        switch (h) {
          case ei:
          case 'Point':
          case 'MultiPoint': {
            W = new ei([f, g]);
            break;
          }
          case Sn:
          case 'LineString':
          case 'MultiLineString': {
            a.rect(e.margin * l, 0, s[0] * l, t.height),
              a.clip(),
              (W = new Sn([
                [f - m, g],
                [f + m, g],
              ]));
            break;
          }
          case St:
          case 'Polygon':
          case 'MultiPolygon': {
            W = new St([
              [
                [f - m, g - _],
                [f + m, g - _],
                [f + m, g + _],
                [f - m, g + _],
                [f - m, g - _],
              ],
            ]);
            break;
          }
        }
        v.getGeometryFunction() && (W = v.getGeometryFunction()(new $t(W))), c.drawGeometry(W), a.restore();
      }
      return a.restore(), t;
    }
    setTitle(e) {
      this._title.setTitle(e), this.refresh();
    }
    getTitle() {
      return this._title.get('title');
    }
    setLayer(e) {
      this._layerListener && Ei(this._layerListener),
        (this._layer = e),
        e
          ? (this._layerListener = e.on(
              'change:visible',
              function () {
                this.refresh();
              }.bind(this),
            ))
          : (this._layerListener = null);
    }
    getTextStyle() {
      return this._textStyle;
    }
    set(e, t, n) {
      super.set(e, t, n), n || this.refresh();
    }
    getListElement() {
      return this._listElement;
    }
    getCanvas() {
      return this._canvas;
    }
    setStyle(e) {
      (this._style = e), this.refresh();
    }
    addItem(e) {
      e instanceof Zt
        ? (this._items.push(e),
          e.on(
            'refresh',
            function () {
              this.refresh(!0);
            }.bind(this),
          ))
        : e instanceof Lo || e instanceof er
        ? this._items.push(e)
        : this._items.push(new Lo(e));
    }
    removeItem(e) {
      this._items.remove(e);
    }
    removeItemAt(e) {
      this._items.removeAt(e);
    }
    getItems() {
      return this._items;
    }
    _drawText(e, t, n, s) {
      e.save(), e.scale(Ni, Ni), (t = t || '');
      var r = t.split(`
`);
      r.length === 1
        ? e.fillText(t, n, s)
        : ((e.textBaseline = 'bottom'), e.fillText(r[0], n, s), (e.textBaseline = 'top'), e.fillText(r[1], n, s)),
        e.restore();
    }
    _measureText(e, t) {
      var n = (t || '').split(`
`);
      if (n.length === 1) return e.measureText(t);
      var s = e.measureText(n[0]),
        r = e.measureText(n[1]);
      return { width: Math.max(s.width, r.width), height: s.height + r.height };
    }
    refresh(e) {
      var t = this._listElement;
      if (t) {
        t.innerHTML = '';
        var n = this.get('margin'),
          s = this.get('size')[0] + 2 * n,
          r = this.get('lineHeight') || this.get('size')[1] + 2 * n,
          o = this.getCanvas(),
          l = o.getContext('2d');
        (l.textAlign = 'left'), (l.textBaseline = 'middle');
        var a = Ni,
          c = Math.min(this.getWidth(), this.get('maxWidth') || 1 / 0),
          h = this.getHeight();
        (o.width = c * a),
          (o.height = h * a),
          (o.style.height = h + 'px'),
          (l.textBaseline = 'middle'),
          (l.fillStyle = $r(this._textStyle.getFill().getColor())),
          this.getTitle() &&
            (t.appendChild(
              this._title.getElement(
                [s, r],
                function (d) {
                  this.dispatchEvent({ type: 'select', index: -1, symbol: d, item: this._title });
                }.bind(this),
              ),
            ),
            (l.font = this._titleStyle.getFont()),
            (l.textAlign = 'center'),
            this._drawText(l, this.getTitle(), o.width / a / 2, r / 2));
        var u = 0;
        this.getTitle() && (u = r),
          this._items.forEach(
            function (d, f) {
              if (d instanceof Zt) {
                if ((!d._layer || d._layer.getVisible()) && d.getCanvas().height) {
                  l.drawImage(d.getCanvas(), 0, u * a);
                  for (var g = d._listElement.querySelectorAll('li'), m = 0; m < g.length; m++) {
                    var _ = g[m].cloneNode();
                    (_.innerHTML = g[m].innerHTML), t.appendChild(_);
                  }
                  u += d.getHeight();
                }
              } else {
                if (d instanceof er) {
                  d.get('title') &&
                    (t.appendChild(
                      this._title.getElement(
                        [s, r],
                        function (E) {
                          this.dispatchEvent({ type: 'select', index: -1, symbol: E, item: this._title });
                        }.bind(this),
                      ),
                    ),
                    (l.font = d.get('textStyle') ? d.get('textStyle').getFont() : this._titleStyle.getFont()),
                    /\bcenter\b/.test(d.get('className'))
                      ? ((l.textAlign = 'center'), this._drawText(l, d.get('title'), o.width / a / 2, u + r / 2))
                      : this._drawText(l, d.get('title'), n, u + r / 2),
                    (u += r));
                  var p = d.getImage();
                  l.drawImage(p, 0, 0, p.naturalWidth, p.naturalHeight, 0, u * a, d.getWidth() * a, d.getHeight() * a),
                    (u += d.getHeight());
                } else {
                  var v = d.getProperties(),
                    x = v.height || r;
                  (l.textAlign = 'left'),
                    v.feature || v.typeGeom
                      ? ((o = this.getLegendImage(v, o, u)),
                        (l.font = d.get('textStyle') ? d.get('textStyle').getFont() : this._textStyle.getFont()),
                        this._drawText(l, d.get('title'), s + n, u + x / 2))
                      : ((l.font = d.get('textStyle') ? d.get('textStyle').getFont() : this._titleStyle.getFont()),
                        /\bcenter\b/.test(v.className)
                          ? ((l.textAlign = 'center'), this._drawText(l, d.get('title'), o.width / a / 2, u + x / 2))
                          : this._drawText(l, d.get('title'), n, u + x / 2)),
                    (u += x);
                }
                t.appendChild(
                  d.getElement(
                    [s, r],
                    function (E) {
                      this.dispatchEvent({ type: 'select', index: f, symbol: E, item: d });
                    }.bind(this),
                  ),
                );
              }
            }.bind(this),
          ),
          e || this.dispatchEvent({ type: 'refresh', width: s, height: (this._items.length + 1) * r });
      }
    }
    getHeight() {
      var e = this.get('margin'),
        t = this.get('lineHeight') || this.get('size')[1] + 2 * e,
        n = this.getTitle() ? t : 0;
      return (
        this._items.forEach(function (s) {
          s instanceof Zt
            ? (!s._layer || s._layer.getVisible()) && (n += s.getHeight())
            : s instanceof er
            ? (s.get('title') && (n += t), (n += s.getHeight()))
            : s.get('height')
            ? (n += s.get('height') + 2 * e)
            : (n += t);
        }),
        n
      );
    }
    getWidth() {
      var e = this.getCanvas(),
        t = e.getContext('2d'),
        n = this.get('margin'),
        s = this.get('size')[0] + 2 * n;
      t.font = this._titleStyle.getFont();
      var r = this._measureText(t, this.getTitle('title')).width;
      return (
        this._items.forEach(
          function (o) {
            o instanceof Zt
              ? (!o._layer || o._layer.getVisible()) && (r = Math.max(r, o.getWidth()))
              : o instanceof er
              ? ((r = Math.max(r, o.getWidth())),
                o.get('title') &&
                  ((t.font = o.get('textStyle') ? o.get('textStyle').getFont() : this._titleStyle.getFont()),
                  (r = Math.max(r, this._measureText(t, o.get('title')).width))))
              : o.get('feature') || o.get('typeGeom')
              ? ((t.font = o.get('textStyle') ? o.get('textStyle').getFont() : this._textStyle.getFont()),
                (r = Math.max(r, this._measureText(t, o.get('title')).width + s)))
              : ((t.font = o.get('textStyle') ? o.get('textStyle').getFont() : this._titleStyle.getFont()),
                (r = Math.max(r, this._measureText(t, o.get('title')).width)));
          }.bind(this),
        ),
        r + 2 * n
      );
    }
    getLegendImage(e, t, n) {
      e = e || {};
      var s = this.get('size');
      return Zt.getLegendImage(
        {
          className: e.className,
          feature: e.feature,
          typeGeom: e.typeGeom,
          style: e.style || this._style,
          properties: e.properties,
          margin: e.margin || this.get('margin'),
          size: [e.width || s[0], e.height || s[1]],
          lineHeight: e.lineHeight || this.get('lineHeight'),
          onload: function () {
            this.refresh();
          }.bind(this),
        },
        t,
        n,
      );
    }
  },
  BE = function (i) {
    if (!i) return null;
    var e = i.getViewport().getElementsByClassName('ol-fixedoverlay')[0];
    return (
      e ||
        (i.getViewport().querySelector('.ol-layers')
          ? ((e = document.createElement('canvas')),
            (e.className = 'ol-fixedoverlay'),
            i.getViewport().querySelector('.ol-layers').after(e),
            i.on('precompose', function (t) {
              (e.width = i.getSize()[0] * t.frameState.pixelRatio), (e.height = i.getSize()[1] * t.frameState.pixelRatio);
            }))
          : (e = i.getViewport().querySelector('canvas'))),
      e
    );
  },
  XE = class extends zn {
    constructor(e) {
      (e = e || {}), super(e), this.setStyle(e.style);
    }
    setMap(e) {
      this.getCanvas(e);
      var t = this.getMap();
      if ((this._listener && (Ei(this._listener), (this._listener = null)), super.setMap(e), t))
        try {
          t.renderSync();
        } catch {}
      e && (this._listener = e.on('postcompose', this._draw.bind(this)));
    }
    getCanvas(e) {
      return BE(e);
    }
    getContext(e) {
      var t = e.context;
      if (!t && this.getMap()) {
        var n = this.getMap().getViewport().getElementsByClassName('ol-fixedoverlay')[0];
        t = n ? n.getContext('2d') : null;
      }
      return t;
    }
    setStyle(e) {
      this._style = e || new qt({});
    }
    getStyle() {
      return this._style;
    }
    getStroke() {
      var e = this._style.getStroke();
      return e || this._style.setStroke(new Tt({ color: '#000', width: 1.25 })), this._style.getStroke();
    }
    getFill() {
      var e = this._style.getFill();
      return e || this._style.setFill(new bt({ color: '#fff' })), this._style.getFill();
    }
    getTextStroke() {
      var e = this._style.getText();
      return e || (e = new rs({})), e.getStroke() || e.setStroke(new Tt({ color: '#fff', width: 3 })), e.getStroke();
    }
    getTextFill() {
      var e = this._style.getText();
      return e || (e = new rs({})), e.getFill() || e.setFill(new bt({ color: '#fff' })), e.getFill();
    }
    getTextFont() {
      var e = this._style.getText();
      return e || (e = new rs({})), e.getFont() || e.setFont('12px sans-serif'), e.getFont();
    }
    _draw() {
      console.warn('[CanvasBase] draw function not implemented.');
    }
  },
  jE = class extends XE {
    constructor(e) {
      e = e || {};
      var t = document.createElement('div');
      if ((super({ element: t, target: e.target }), e.target)) t.className = e.className || 'ol-legend';
      else {
        t.className =
          (e.className || 'ol-legend') + ' ol-unselectable ol-control' + (e.collapsible === !1 ? ' ol-uncollapsible' : ' ol-collapsed');
        var n = document.createElement('button');
        n.setAttribute('type', 'button'),
          n.addEventListener(
            'click',
            function () {
              this.toggle();
            }.bind(this),
          ),
          t.appendChild(n),
          (n = document.createElement('button')),
          n.setAttribute('type', 'button'),
          (n.className = 'ol-closebox'),
          n.addEventListener(
            'click',
            function () {
              this.toggle();
            }.bind(this),
          ),
          t.appendChild(n);
      }
      (this._legend = e.legend),
        (this._legend.getCanvas().className = 'ol-legendImg'),
        t.appendChild(this._legend.getCanvas()),
        t.appendChild(this._legend.getListElement()),
        e.collapsible !== !1 && e.collapsed === !1 && this.show(),
        this._legend.on(
          'select',
          function (s) {
            this.dispatchEvent(s);
          }.bind(this),
        ),
        this._legend.on(
          'refresh',
          function () {
            if (this._onCanvas && this.getMap())
              try {
                this.getMap().renderSync();
              } catch {}
          }.bind(this),
        );
    }
    getLegend() {
      return this._legend;
    }
    setCanvas(e) {
      if (((this._onCanvas = e), (this.element.style.visibility = e ? 'hidden' : 'visible'), this.getMap()))
        try {
          this.getMap().renderSync();
        } catch {}
    }
    onCanvas() {
      return !!this._onCanvas;
    }
    _draw(e) {
      if (this._onCanvas && !this.element.classList.contains('ol-collapsed')) {
        var t = this._legend.getCanvas(),
          n = this.getContext(e),
          s = n.canvas.height - t.height;
        n.save(), n.rect(0, s, t.width, t.height);
        var r = '#fff';
        this._legend.getTextStyle().getBackgroundFill() && (r = $r(this._legend.getTextStyle().getBackgroundFill().getColor())),
          (n.fillStyle = n.strokeStyle = r),
          (n.lineWidth = 10),
          (n.lineJoin = 'round'),
          n.stroke(),
          n.clearRect(0, s, t.width, t.height),
          n.fill(),
          n.drawImage(t, 0, s),
          n.restore();
      }
    }
    show() {
      if (
        this.element.classList.contains('ol-collapsed') &&
        (this.element.classList.remove('ol-collapsed'), this.dispatchEvent({ type: 'change:collapse', collapsed: !1 }), this.getMap())
      )
        try {
          this.getMap().renderSync();
        } catch {}
    }
    hide() {
      if (
        !this.element.classList.contains('ol-collapsed') &&
        (this.element.classList.add('ol-collapsed'), this.dispatchEvent({ type: 'change:collapse', collapsed: !0 }), this.getMap())
      )
        try {
          this.getMap().renderSync();
        } catch {}
    }
    collapse(e) {
      e === !1 ? this.show() : this.hide();
    }
    isCollapsed() {
      return this.element.classList.contains('ol-collapsed');
    }
    toggle() {
      if (
        (this.element.classList.toggle('ol-collapsed'),
        this.dispatchEvent({ type: 'change:collapse', collapsed: this.element.classList.contains('ol-collapsed') }),
        this.getMap())
      )
        try {
          this.getMap().renderSync();
        } catch {}
    }
  };
function nf(i) {
  const e = i.frameState,
    t = zu(i.inversePixelTransform.slice(), e.coordinateToPixelTransform);
  return new Pa(i.context, e.pixelRatio, e.extent, t, e.viewState.rotation);
}
window.ol && (ol.util ? ol.util.VERSION || (ol.util.VERSION = ol.VERSION || '6.1.0') : (ol.util = { VERSION: ol.VERSION || '5.3.0' }));
var lr = cp.split('.');
lr = parseInt(lr[0]) * 100 + parseInt(lr[1]);
var YE = function (i, e) {
    var t = i.frameState.pixelRatio;
    if (lr > 605 && t !== 1 && e.getImage() instanceof eo) {
      e = e.clone();
      var n = e.getImage();
      n.setScale(n.getScale() * t);
      var s = n.getAnchor();
      if (n.setDisplacement) {
        var r = n.getDisplacement();
        r && ((r[0] -= s[0] / t), (r[1] += s[1] / t), n.setAnchor([0, 0]));
      } else s && ((s[0] /= t), (s[1] /= t));
    }
    return e;
  },
  Wa = class extends Ze {
    constructor(e) {
      (e = e || {}),
        super(),
        (this.duration_ = typeof e.duration == 'number' ? (e.duration >= 0 ? e.duration : 0) : 1e3),
        (this.fade_ = typeof e.fade == 'function' ? e.fade : null),
        (this.repeat_ = Number(e.repeat));
      var t = typeof e.easing == 'function' ? e.easing : Ed;
      e.revers
        ? (this.easing_ = function (n) {
            return 1 - t(n);
          })
        : (this.easing_ = t),
        (this.hiddenStyle = e.hiddenStyle);
    }
    drawGeom_(e, t, n) {
      this.fade_ && (e.context.globalAlpha = this.fade_(1 - e.elapsed));
      for (var s = e.style, r = 0; r < s.length; r++)
        try {
          var o = e.vectorContext || nf(e),
            l = YE(e, s[r]);
          o.setStyle(l), l.getZIndex() < 0 ? o.drawGeometry(n || t) : o.drawGeometry(t);
        } catch {}
    }
    animate() {
      return !1;
    }
  };
Wa.hiddenStyle = new qt({ image: new Fn({}), stroke: new Tt({ color: 'transparent' }) });
zd.prototype.animateFeature = function (i, e) {
  var t = this._featureAnimationLayer;
  t || ((t = this._featureAnimationLayer = new Tr({ source: new gl() })), t.setMap(this)), t.getSource().addFeature(i);
  var n = e.on('animationend', function (s) {
    s.feature === i && (t.getSource().removeFeature(i), Ei(n));
  });
  t.animateFeature(i, e);
};
wa.prototype.animateFeature = function (i, e, t) {
  var n = this,
    s,
    r = i.getStyle(),
    o = r || (this.getStyleFunction ? this.getStyleFunction()(i) : null);
  o || (o = []), o instanceof Array || (o = [o]);
  var l = {
    vectorContext: null,
    frameState: null,
    start: 0,
    time: 0,
    elapsed: 0,
    extent: !1,
    feature: i,
    geom: i.getGeometry(),
    typeGeom: i.getGeometry().getType(),
    bbox: i.getGeometry().getExtent(),
    coord: Si(i.getGeometry().getExtent()),
    style: o,
  };
  e instanceof Array || (e = [e]);
  for (var a = e.length - 1; a >= 0; a--) e[a].duration_ === 0 && e.splice(a, 1);
  var c = 0,
    h = 0,
    u = t && this.getFilters ? this.getFilters() : [];
  function d(m) {
    l.type = m.type;
    try {
      l.vectorContext = m.vectorContext || nf(m);
    } catch {}
    if (
      ((l.frameState = m.frameState),
      (l.inversePixelTransform = m.inversePixelTransform),
      l.extent || ((l.extent = m.frameState.extent), (l.start = m.frameState.time), (l.context = m.context)),
      (l.time = m.frameState.time - l.start),
      (l.elapsed = l.time / e[h].duration_),
      l.elapsed > 1 && (l.elapsed = 1),
      m.context.save(),
      u.forEach(function (p) {
        p.get('active') && p.precompose(m);
      }),
      this.getOpacity && (m.context.globalAlpha = this.getOpacity()),
      !e[h].animate(l))
    )
      c++,
        c < e[h].repeat_
          ? (l.extent = !1)
          : h < e.length - 1
          ? (e[h].dispatchEvent({ type: 'animationend', feature: i }), h++, (c = 0), (l.extent = !1))
          : f();
    else {
      var _ = {
        type: 'animating',
        step: h,
        start: l.start,
        time: l.time,
        elapsed: l.elapsed,
        rotation: l.rotation || 0,
        geom: l.geom,
        coordinate: l.coord,
        feature: i,
        extra: l.extra || {},
      };
      e[h].dispatchEvent(_), n.dispatchEvent(_);
    }
    u.forEach(function (p) {
      p.get('active') && p.postcompose(m);
    }),
      m.context.restore(),
      (m.frameState.animate = !0);
  }
  function f(m) {
    Ei(s), (s = null), i.setStyle(r), (l.stop = new Date().getTime());
    var _ = { type: 'animationend', feature: i };
    if (m) for (var p in m) m.hasOwnProperty(p) && (_[p] = m[p]);
    e[h].dispatchEvent(_), n.dispatchEvent(_);
  }
  function g(m) {
    if (e.length && !s) {
      if (
        (l.stop && ((l.start = new Date().getTime() - l.stop + l.start), (l.stop = 0)),
        (s = n.on(['postcompose', 'postrender'], d.bind(n))),
        n.renderSync)
      )
        try {
          n.renderSync();
        } catch {}
      else n.changed();
      i.setStyle(e[h].hiddenStyle || Wa.hiddenStyle);
      var _ = { type: 'animationstart', feature: i };
      if (m) for (var p in m) m.hasOwnProperty(p) && (_[p] = m[p]);
      e[h].dispatchEvent(_), n.dispatchEvent(_);
    }
  }
  return (
    g(),
    {
      start: g,
      stop: f,
      isPlaying: function () {
        return !!s;
      },
    }
  );
};
var UE = class extends Wa {
  constructor(e) {
    (e = e || {}), super(e), this.set('zoomout', e.zoomOut);
  }
  animate(e) {
    var t = this.easing_(e.elapsed);
    if (t) {
      this.get('zoomout') && (t = 1 / t);
      var n = e.style,
        s,
        r,
        o = [];
      for (s = 0; s < n.length; s++)
        (r = n[s].getImage()),
          r && ((o[s] = r.getScale()), e.type === 'postrender' ? r.setScale((o[s] * t) / e.frameState.pixelRatio) : r.setScale(o[s] * t));
      for (this.drawGeom_(e, e.geom), s = 0; s < n.length; s++) (r = n[s].getImage()), r && r.setScale(o[s]);
    }
    return e.time <= this.duration_;
  }
};
let pt, Po, Mo, Ao, Oo, Fo, Do, hn;
const VE = '/geography-research/logo.png',
  HE = '/geography-research/research_final.json',
  KE = {
    name: 'OlMap',
    data() {
      return {};
    },
    mounted() {
      (pt = new zd({ target: 'myMap', view: new At({ center: [0, 0], zoom: 2 }) })),
        (Po = new gl({ url: HE, format: new RE() })),
        (Oo = new qt({ image: new Fn({ radius: 5, fill: new bt({ color: '#ff6688' }) }), stroke: new Tt({ color: '#555555', width: 1 }) })),
        (Fo = new qt({ image: new Fn({ radius: 5, fill: new bt({ color: '#3d54c9' }) }), stroke: new Tt({ color: '#555555', width: 1 }) })),
        (Do = new qt({ image: new eo({ opacity: 0.75, size: [256, 256], scale: 0.08, src: VE }) })),
        this.pulsePoint([-105.265946, 40.007582]),
        this.baseMapLayerInit(),
        this.dataMapLayerInit();
      const i = new ME({ reverse: !0, groupSelectStyle: 'group' });
      pt.addControl(i), this.popupInit(), this.searchInit(), this.legendInit();
    },
    methods: {
      baseMapLayerInit() {
        const i = new Kn({ title: 'OSM', type: 'base', visible: !0, source: new Ih() }),
          e = new Kn({
            title: 'OSM terrain',
            type: 'base',
            visible: !1,
            source: new Ih({ url: 'http://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png' }),
          }),
          t = new Kn({
            title: 'Bing Maps',
            type: 'base',
            visible: !1,
            source: new bh({ key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ', imagerySet: 'Road' }),
          }),
          n = new Kn({
            title: 'Bing Maps aerial',
            type: 'base',
            visible: !1,
            source: new bh({
              key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',
              imagerySet: 'AerialWithLabelsOnDemand',
            }),
          }),
          s = new Kn({
            title: 'ArcGIS satellite',
            type: 'base',
            visible: !1,
            source: new qd({ url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' }),
          }),
          r = new Zi({ title: 'Base maps', layers: [e, i, n, t, s] });
        pt.addLayer(r);
      },
      dataMapLayerInit() {
        Mo = new Tr({
          title: 'Research projects',
          visible: !0,
          source: Po,
          style: function (n) {
            return n.get('faculty') == 'y' ? [Fo] : [Oo];
          },
        });
        const i = new gl({}),
          e = new $t({ geometry: new ei([-105.265946, 40.007582], 'XY').transform('EPSG:4326', 'EPSG:3857') });
        e.set('name', 'CU Boulder'),
          e.set(
            'description',
            'The University of Colorado Boulder (CU Boulder) is a public research university located in Boulder, Colorado, United States. It was founded in 1876 and is part of the University of Colorado system. CU Boulder has a student body of over 33,000 students and is one of the largest universities in the state of Colorado.',
          ),
          e.set('Supporting_Faculty', ''),
          i.addFeature(e),
          (Ao = new Tr({ title: 'CU Boulder', visible: !0, source: i, style: Do }));
        const t = new Zi({ title: 'Overlays', fold: 'open', layers: [Mo, Ao] });
        pt.addLayer(t);
      },
      popupInit() {
        const i = new WE({
          popupClass: 'default anim',
          closeBox: !0,
          onshow: function () {},
          onclose: function () {},
          positioning: 'center-left',
          anim: !0,
          autoPan: { animation: { duration: 250 } },
        });
        pt.addOverlay(i),
          (hn = new DE({})),
          pt.addInteraction(hn),
          hn.getFeatures().on('add', function (e) {
            var o;
            const t = e.element;
            console.log(t.getGeometry()), console.log(t.getProperties);
            let n = `<table class="style-table"><tbody>
          <tr><td class="active-row">Name</td><td>${t.get('name')}</td></tr>
          <tr><td class="active-row">Research Summary</td><td>${t.get('description')}</td></tr>`;
            t.get('Supporting_Faculty') != '' &&
              (n += `<tr><td class="active-row">Supporting Faculty</td><td>${t.get('Supporting_Faculty')}</td></tr>`),
              (n += '</tbody><colgroup><col><col></colgroup></table>');
            const r = t;
            i.show((o = r.getGeometry()) == null ? void 0 : o.getFirstCoordinate(), n);
          }),
          hn.getFeatures().on('remove', function () {
            i.hide();
          });
      },
      searchInit() {
        const i = new zE({ placeholder: 'Search PI name', property: 'name', maxHistory: 3, noCollapse: !0 });
        i.setSource(Po),
          pt.addControl(i),
          i.on('select', function (e) {
            hn.getFeatures().clear(), hn.getFeatures().push(e.search);
            const t = e.search.getGeometry().getFirstCoordinate();
            pt.getView().animate({ center: t });
          });
      },
      legendInit() {
        const i = new Zt({ title: 'Legend', margin: 5, maxWidth: 300 }),
          e = new jE({ legend: i, collapsed: !1 });
        pt.addControl(e);
        const t = new Zt({ layer: Mo, margin: 4 });
        t.addItem({ title: 'Principal Investigator (PI)' }),
          t.addItem({ title: 'Faculty', typeGeom: 'Point', style: Fo }),
          t.addItem({ title: 'Graduate Student', typeGeom: 'Point', style: Oo }),
          i.addItem(t);
        const n = new Zt({ layer: Ao, margin: 4 });
        n.addItem({ title: 'University Location' }), n.addItem({ title: 'CU Boulder', typeGeom: 'Point', style: Do }), i.addItem(n);
      },
      pulsePoint(i) {
        function e(n) {
          var s = new $t(new ei(n));
          s.setStyle(new qt({ image: new va({ radius: 20, points: 4, stroke: new Tt({ color: 'red', width: 2 }) }) })),
            pt.animateFeature(s, new UE({ fade: Qi, duration: 3e3, easing: Ky }));
        }
        function t(n) {
          for (var s = 3, r = 0; r < s; r++)
            setTimeout(function () {
              e(Qu(n, 'EPSG:4326', pt.getView().getProjection()));
            }, r * 1e3);
        }
        t(i);
      },
    },
  };
const ZE = { id: 'olMap' },
  $E = { ref: 'myMap', class: 'mapContainer', id: 'myMap' };
function qE(i, e, t, n, s, r) {
  return Xl(), im('div', ZE, [jl('div', $E, null, 512)]);
}
const sf = Ru(KE, [['render', qE]]),
  JE = Object.freeze(Object.defineProperty({ __proto__: null, default: sf }, Symbol.toStringTag, { value: 'Module' })),
  QE = Wl({
    __name: 'index',
    setup(i) {
      return (e, t) => (Xl(), Eu(sf));
    },
  }),
  eC = () => q_(() => Promise.resolve().then(() => JE), void 0),
  rf = [
    { name: 'map-view', path: '/map-view', component: eC, props: !0 },
    { name: 'index', path: '/', component: QE, props: !0 },
  ];
var Cl = {},
  tC = {
    get exports() {
      return Cl;
    },
    set exports(i) {
      Cl = i;
    },
  };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */ (function (i, e) {
  (function (t, n) {
    i.exports = n();
  })(Jd, function () {
    var t = {};
    t.version = '0.2.0';
    var n = (t.settings = {
      minimum: 0.08,
      easing: 'ease',
      positionUsing: '',
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: 'body',
      template:
        '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    });
    (t.configure = function (g) {
      var m, _;
      for (m in g) (_ = g[m]), _ !== void 0 && g.hasOwnProperty(m) && (n[m] = _);
      return this;
    }),
      (t.status = null),
      (t.set = function (g) {
        var m = t.isStarted();
        (g = s(g, n.minimum, 1)), (t.status = g === 1 ? null : g);
        var _ = t.render(!m),
          p = _.querySelector(n.barSelector),
          v = n.speed,
          x = n.easing;
        return (
          _.offsetWidth,
          l(function (E) {
            n.positionUsing === '' && (n.positionUsing = t.getPositioningCSS()),
              a(p, o(g, v, x)),
              g === 1
                ? (a(_, { transition: 'none', opacity: 1 }),
                  _.offsetWidth,
                  setTimeout(function () {
                    a(_, { transition: 'all ' + v + 'ms linear', opacity: 0 }),
                      setTimeout(function () {
                        t.remove(), E();
                      }, v);
                  }, v))
                : setTimeout(E, v);
          }),
          this
        );
      }),
      (t.isStarted = function () {
        return typeof t.status == 'number';
      }),
      (t.start = function () {
        t.status || t.set(0);
        var g = function () {
          setTimeout(function () {
            t.status && (t.trickle(), g());
          }, n.trickleSpeed);
        };
        return n.trickle && g(), this;
      }),
      (t.done = function (g) {
        return !g && !t.status ? this : t.inc(0.3 + 0.5 * Math.random()).set(1);
      }),
      (t.inc = function (g) {
        var m = t.status;
        return m
          ? (typeof g != 'number' && (g = (1 - m) * s(Math.random() * m, 0.1, 0.95)), (m = s(m + g, 0, 0.994)), t.set(m))
          : t.start();
      }),
      (t.trickle = function () {
        return t.inc(Math.random() * n.trickleRate);
      }),
      (function () {
        var g = 0,
          m = 0;
        t.promise = function (_) {
          return !_ || _.state() === 'resolved'
            ? this
            : (m === 0 && t.start(),
              g++,
              m++,
              _.always(function () {
                m--, m === 0 ? ((g = 0), t.done()) : t.set((g - m) / g);
              }),
              this);
        };
      })(),
      (t.render = function (g) {
        if (t.isRendered()) return document.getElementById('nprogress');
        h(document.documentElement, 'nprogress-busy');
        var m = document.createElement('div');
        (m.id = 'nprogress'), (m.innerHTML = n.template);
        var _ = m.querySelector(n.barSelector),
          p = g ? '-100' : r(t.status || 0),
          v = document.querySelector(n.parent),
          x;
        return (
          a(_, { transition: 'all 0 linear', transform: 'translate3d(' + p + '%,0,0)' }),
          n.showSpinner || ((x = m.querySelector(n.spinnerSelector)), x && f(x)),
          v != document.body && h(v, 'nprogress-custom-parent'),
          v.appendChild(m),
          m
        );
      }),
      (t.remove = function () {
        u(document.documentElement, 'nprogress-busy'), u(document.querySelector(n.parent), 'nprogress-custom-parent');
        var g = document.getElementById('nprogress');
        g && f(g);
      }),
      (t.isRendered = function () {
        return !!document.getElementById('nprogress');
      }),
      (t.getPositioningCSS = function () {
        var g = document.body.style,
          m = 'WebkitTransform' in g ? 'Webkit' : 'MozTransform' in g ? 'Moz' : 'msTransform' in g ? 'ms' : 'OTransform' in g ? 'O' : '';
        return m + 'Perspective' in g ? 'translate3d' : m + 'Transform' in g ? 'translate' : 'margin';
      });
    function s(g, m, _) {
      return g < m ? m : g > _ ? _ : g;
    }
    function r(g) {
      return (-1 + g) * 100;
    }
    function o(g, m, _) {
      var p;
      return (
        n.positionUsing === 'translate3d'
          ? (p = { transform: 'translate3d(' + r(g) + '%,0,0)' })
          : n.positionUsing === 'translate'
          ? (p = { transform: 'translate(' + r(g) + '%,0)' })
          : (p = { 'margin-left': r(g) + '%' }),
        (p.transition = 'all ' + m + 'ms ' + _),
        p
      );
    }
    var l = (function () {
        var g = [];
        function m() {
          var _ = g.shift();
          _ && _(m);
        }
        return function (_) {
          g.push(_), g.length == 1 && m();
        };
      })(),
      a = (function () {
        var g = ['Webkit', 'O', 'Moz', 'ms'],
          m = {};
        function _(E) {
          return E.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (w, P) {
            return P.toUpperCase();
          });
        }
        function p(E) {
          var w = document.body.style;
          if (E in w) return E;
          for (var P = g.length, b = E.charAt(0).toUpperCase() + E.slice(1), S; P--; ) if (((S = g[P] + b), S in w)) return S;
          return E;
        }
        function v(E) {
          return (E = _(E)), m[E] || (m[E] = p(E));
        }
        function x(E, w, P) {
          (w = v(w)), (E.style[w] = P);
        }
        return function (E, w) {
          var P = arguments,
            b,
            S;
          if (P.length == 2) for (b in w) (S = w[b]), S !== void 0 && w.hasOwnProperty(b) && x(E, b, S);
          else x(E, P[1], P[2]);
        };
      })();
    function c(g, m) {
      var _ = typeof g == 'string' ? g : d(g);
      return _.indexOf(' ' + m + ' ') >= 0;
    }
    function h(g, m) {
      var _ = d(g),
        p = _ + m;
      c(_, m) || (g.className = p.substring(1));
    }
    function u(g, m) {
      var _ = d(g),
        p;
      c(g, m) && ((p = _.replace(' ' + m + ' ', ' ')), (g.className = p.substring(1, p.length - 1)));
    }
    function d(g) {
      return (' ' + (g.className || '') + ' ').replace(/\s+/gi, ' ');
    }
    function f(g) {
      g && g.parentNode && g.parentNode.removeChild(g);
    }
    return t;
  });
})(tC);
const of = Cl;
rf.push({ path: '/', redirect: '/login' });
const za = H_({ history: c_(), routes: rf });
za.beforeEach(async (i, e, t) => {
  of.start(), t();
});
za.afterEach((i) => {
  of.done();
});
if (typeof window < 'u') {
  let i = function () {
    var e = document.body,
      t = document.getElementById('__svg__icons__dom__');
    t ||
      ((t = document.createElementNS('http://www.w3.org/2000/svg', 'svg')),
      (t.style.position = 'absolute'),
      (t.style.width = '0'),
      (t.style.height = '0'),
      (t.id = '__svg__icons__dom__'),
      t.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
      t.setAttribute('xmlns:link', 'http://www.w3.org/1999/xlink')),
      (t.innerHTML = ''),
      e.insertBefore(t, e.lastChild);
  };
  var loadSvg = i;
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', i) : i();
}
const lf = zm(Ym);
lf.use(za);
lf.mount('#app');
