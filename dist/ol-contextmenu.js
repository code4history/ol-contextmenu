
  /*!
  * ol-contextmenu - v5.3.0
  * https://github.com/jonataswalker/ol-contextmenu
  * Built: Mon Mar 04 2024 14:16:10 GMT+0900 (Japan Standard Time)
  */

var k = Object.defineProperty;
var I = (n, t, e) => t in n ? k(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var a = (n, t, e) => (I(n, typeof t != "symbol" ? t + "" : t, e), e);
import O from "ol/control/Control";
import D from "ol/MapBrowserEvent";
var S = { exports: {} };
function x() {
}
x.prototype = {
  on: function(n, t, e) {
    var s = this.e || (this.e = {});
    return (s[n] || (s[n] = [])).push({
      fn: t,
      ctx: e
    }), this;
  },
  once: function(n, t, e) {
    var s = this;
    function o() {
      s.off(n, o), t.apply(e, arguments);
    }
    return o._ = t, this.on(n, o, e);
  },
  emit: function(n) {
    var t = [].slice.call(arguments, 1), e = ((this.e || (this.e = {}))[n] || []).slice(), s = 0, o = e.length;
    for (s; s < o; s++)
      e[s].fn.apply(e[s].ctx, t);
    return this;
  },
  off: function(n, t) {
    var e = this.e || (this.e = {}), s = e[n], o = [];
    if (s && t)
      for (var i = 0, l = s.length; i < l; i++)
        s[i].fn !== t && s[i].fn._ !== t && o.push(s[i]);
    return o.length ? e[n] = o : delete e[n], this;
  }
};
S.exports = x;
var _ = S.exports.TinyEmitter = x, L = /* @__PURE__ */ ((n) => (n.CONTEXTMENU = "contextmenu", n.CLICK = "click", n.DBLCLICK = "dblclick", n))(L || {}), p = /* @__PURE__ */ ((n) => (n.BEFOREOPEN = "beforeopen", n.OPEN = "open", n.CLOSE = "close", n.ADD_MENU_ENTRY = "add-menu-entry", n))(p || {});
class w extends D {
  constructor(t) {
    super(t.type, t.map, t.originalEvent);
  }
}
const z = {
  width: 150,
  scrollAt: 4,
  eventType: L.CONTEXTMENU,
  defaultItems: !0,
  items: []
}, d = "ol-ctx-menu", r = {
  namespace: d,
  container: `${d}-container`,
  separator: `${d}-separator`,
  submenu: `${d}-submenu`,
  hidden: `${d}-hidden`,
  icon: `${d}-icon`,
  zoomIn: `${d}-zoom-in`,
  zoomOut: `${d}-zoom-out`,
  unselectable: "ol-unselectable"
}, C = [
  {
    text: "Zoom In",
    classname: `${r.zoomIn} ${r.icon}`,
    callback: (n, t) => {
      const e = t.getView();
      e.animate({
        zoom: Number(e.getZoom()) + 1,
        duration: 700,
        center: n.coordinate
      });
    }
  },
  {
    text: "Zoom Out",
    classname: `${r.zoomOut} ${r.icon}`,
    callback: (n, t) => {
      const e = t.getView();
      e.animate({
        zoom: Number(e.getZoom()) - 1,
        duration: 700,
        center: n.coordinate
      });
    }
  }
];
function y(n) {
  const t = document.createDocumentFragment(), e = document.createElement("div");
  for (e.innerHTML = n; e.firstChild; )
    t.append(e.firstChild);
  return t;
}
function P(n) {
  const t = document.importNode(n), e = n.offsetWidth;
  t.style.cssText = `position: fixed; top: 0; left: 0; overflow: auto; visibility: hidden; pointer-events: none; height: unset; max-height: unset; width: ${e}px`;
  const s = y("<span>Foo</span>"), o = y("<span>Foo</span>"), i = document.createElement("li"), l = document.createElement("li");
  i.append(s), l.append(o), t.append(i), t.append(l), n.parentNode?.append(t);
  const c = t.offsetHeight / 2;
  return n.parentNode?.removeChild(t), c;
}
function N({
  parentNode: n,
  item: t,
  isSubmenu: e = !1,
  isInsideSubmenu: s = !1,
  emitter: o
}) {
  const i = `_${Math.random().toString(36).slice(2, 11)}`;
  if (typeof t != "string" && "text" in t) {
    const E = `<span>${t.text}</span>`, m = y(E), u = document.createElement("li");
    t.classname = t.classname || "", t.icon && (t.classname === "" ? t.classname = r.icon : t.classname.includes(r.icon) === !1 && (t.classname += ` ${r.icon}`), u.setAttribute("style", `background-image:url(${t.icon})`)), u.id = i, u.className = t.classname, u.append(m), n.append(u);
    const v = {
      id: i,
      isSubmenu: e,
      isInsideSubmenu: s,
      isSeparator: !1,
      callback: "callback" in t ? t.callback : null,
      data: "data" in t ? t.data : null
    };
    return o.emit(p.ADD_MENU_ENTRY, v, u), u;
  }
  const l = `<li id="${i}" class="${r.separator}"><hr></li>`, c = y(l);
  n.append(c);
  const f = n.lastChild, g = {
    id: i,
    isSubmenu: !1,
    isInsideSubmenu: !1,
    isSeparator: !0,
    callback: null,
    data: null
  };
  return o.emit(p.ADD_MENU_ENTRY, g, f), f;
}
function M({
  container: n,
  items: t,
  menuWidth: e,
  isInsideSubmenu: s,
  emitter: o
}) {
  t.forEach((i) => {
    if (typeof i != "string" && "items" in i && Array.isArray(i.items)) {
      const l = N({ parentNode: n, item: i, isSubmenu: !0, emitter: o });
      l.classList.add(r.submenu);
      const c = document.createElement("ul");
      c.classList.add(r.container), c.style.width = `${e}px`, l.append(c), M({
        emitter: o,
        menuWidth: e,
        container: c,
        items: i.items,
        isInsideSubmenu: !0
      });
    } else
      N({
        parentNode: n,
        item: i,
        isSubmenu: !1,
        isInsideSubmenu: s,
        emitter: o
      });
  });
}
function b(n, t) {
  if (!n)
    throw new Error(t);
}
class R extends O {
  constructor(e = {}) {
    b(typeof e == "object", "@param `opts` should be object type!");
    const s = document.createElement("div");
    super({ element: s });
    a(this, "map");
    a(this, "emitter", new _());
    a(this, "container");
    a(this, "coordinate", []);
    a(this, "pixel", []);
    a(this, "contextMenuEventListener");
    a(this, "entryCallbackEventListener");
    a(this, "mapMoveListener");
    a(this, "lineHeight", 0);
    a(this, "disabled");
    a(this, "opened");
    a(this, "items", []);
    a(this, "menuEntries", /* @__PURE__ */ new Map());
    a(this, "options");
    this.options = { ...z, ...e };
    const o = document.createElement("ul");
    s.append(o), s.style.width = `${this.options.width}px`, s.classList.add(
      r.container,
      r.unselectable,
      r.hidden
    ), this.container = s, this.contextMenuEventListener = (i) => {
      this.handleContextMenu(i);
    }, this.entryCallbackEventListener = (i) => {
      this.handleEntryCallback(i);
    }, this.mapMoveListener = () => {
      this.handleMapMove();
    }, this.disabled = !1, this.opened = !1, window.addEventListener(
      "beforeunload",
      () => {
        this.removeListeners();
      },
      { once: !0 }
    );
  }
  clear() {
    for (const e of this.menuEntries.keys())
      this.removeMenuEntry(e);
    this.container.replaceChildren(), this.container.append(document.createElement("ul"));
  }
  enable() {
    this.disabled = !1;
  }
  disable() {
    this.disabled = !0;
  }
  getDefaultItems() {
    return C;
  }
  countItems() {
    return this.menuEntries.size;
  }
  extend(e) {
    b(Array.isArray(e), "@param `items` should be an Array."), M({
      items: e,
      emitter: this.emitter,
      menuWidth: this.options.width,
      container: this.container.firstElementChild
    });
  }
  closeMenu() {
    this.opened = !1, this.container.classList.add(r.hidden), this.dispatchEvent(p.CLOSE);
  }
  isOpen() {
    return this.opened;
  }
  updatePosition(e) {
    b(Array.isArray(e), "@param `pixel` should be an Array."), this.isOpen() && (this.pixel = e, this.positionContainer());
  }
  pop() {
    const e = Array.from(this.menuEntries.keys()).pop();
    e && this.removeMenuEntry(e);
  }
  shift() {
    const e = Array.from(this.menuEntries.keys()).shift();
    e && this.removeMenuEntry(e);
  }
  push(e) {
    e && this.extend([e]);
  }
  setMap(e) {
    if (super.setMap(e), e) {
      this.map = e, e.getViewport().addEventListener(
        this.options.eventType,
        this.contextMenuEventListener,
        !1
      ), e.on("movestart", () => {
        this.handleMapMove();
      }), this.emitter.on(
        p.ADD_MENU_ENTRY,
        (o, i) => {
          this.handleAddMenuEntry(o, i);
        },
        this
      ), this.items = this.options.defaultItems ? this.options.items.concat(C) : this.options.items, M({
        items: this.items,
        emitter: this.emitter,
        menuWidth: this.options.width,
        container: this.container.firstElementChild
      });
      const s = this.getMenuEntriesLength();
      this.lineHeight = s > 0 ? this.container.offsetHeight / s : P(this.container);
    } else
      this.removeListeners(), this.clear();
  }
  removeListeners() {
    this.map.getViewport().removeEventListener(this.options.eventType, this.contextMenuEventListener, !1), this.emitter.off(p.ADD_MENU_ENTRY);
  }
  removeMenuEntry(e) {
    let s = document.getElementById(e);
    s?.remove(), s = null, this.menuEntries.delete(e);
  }
  handleContextMenu(e) {
    this.coordinate = this.map.getEventCoordinate(e), this.pixel = this.map.getEventPixel(e), this.dispatchEvent(
      new w({
        map: this.map,
        originalEvent: e,
        type: p.BEFOREOPEN
      })
    ), !this.disabled && (this.options.eventType === L.CONTEXTMENU && (e.stopPropagation(), e.preventDefault()), setTimeout(() => {
      this.openMenu(e);
    }), e.target?.addEventListener(
      "pointerdown",
      (s) => {
        this.opened && (s.stopPropagation(), this.closeMenu());
      },
      { once: !0 }
    ));
  }
  openMenu(e) {
    this.opened = !0, this.positionContainer(), this.container.classList.remove(r.hidden), this.dispatchEvent(
      new w({
        map: this.map,
        originalEvent: e,
        type: p.OPEN
      })
    );
  }
  getMenuEntriesLength() {
    return Array.from(this.menuEntries).filter(
      ([, e]) => e.isSeparator === !1 && e.isSubmenu === !1 && e.isInsideSubmenu === !1
    ).length;
  }
  positionContainer() {
    const e = this.map.getSize() || [0, 0], s = {
      w: e[0] - this.pixel[0],
      h: e[1] - this.pixel[1]
    }, o = this.getMenuEntriesLength(), i = {
      w: this.container.offsetWidth,
      // a cheap way to recalculate container height
      // since offsetHeight is like cached
      h: Math.round(this.lineHeight * o)
    }, l = s.w >= i.w ? this.pixel[0] + 5 : this.pixel[0] - i.w;
    this.container.style.left = `${l}px`, this.container.style.top = s.h >= i.h ? `${this.pixel[1] - 10}px` : `${this.pixel[1] - i.h}px`, this.container.style.right = "auto", this.container.style.bottom = "auto", s.w -= i.w;
    const c = (E) => Array.from(E.children).filter(
      (m) => m.tagName === "LI" && m.classList.contains(r.submenu)
    );
    let f = 0;
    const g = (E, m) => {
      f += 1, c(E).forEach((v) => {
        const A = m >= i.w ? i.w - 8 : (i.w + 8) * -1, h = v.querySelector(
          `ul.${r.container}`
        ), $ = Math.round(
          this.lineHeight * Array.from(h.children).filter((T) => T.tagName === "LI").length
        );
        h.style.left = `${A}px`, h.style.right = "auto", h.style.top = s.h >= $ + i.h ? "0" : `-${h.offsetHeight - 25}px`, h.style.bottom = "auto", h.style.zIndex = String(f), c(h).length > 0 && g(h, m - i.w);
      });
    };
    g(this.container.firstElementChild, s.w);
  }
  handleMapMove() {
    this.closeMenu();
  }
  handleEntryCallback(e) {
    e.preventDefault(), e.stopPropagation();
    const s = e.currentTarget, o = this.menuEntries.get(s.id);
    if (!o)
      return;
    const i = {
      data: o.data,
      coordinate: this.coordinate
    };
    this.closeMenu(), o.callback?.(i, this.map);
  }
  handleAddMenuEntry(e, s) {
    this.menuEntries.set(e.id, e), this.positionContainer(), "callback" in e && typeof e.callback == "function" && s.addEventListener("click", this.entryCallbackEventListener, !1);
  }
}
export {
  R as default
};
