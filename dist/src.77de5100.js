// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.ts":[function(require,module,exports) {
"use strict";

function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
const CDN_URL = "https://cdn.freecodecamp.org/curriculum/typescript/tarot-app";
const defaultImg = new URL("default.svg", import.meta.url);
const LOCAL_DEFAULT_IMG = defaultImg;
const getElement = selector => {
  const el = document.querySelector(selector);
  if (!el) throw new Error("Element not found: ".concat(selector));
  return el;
};
const hideElements = function () {
  for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
    elements[_key] = arguments[_key];
  }
  return elements.forEach(el => el.classList.add("hidden"));
};
const showElements = function () {
  for (var _len2 = arguments.length, elements = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    elements[_key2] = arguments[_key2];
  }
  return elements.forEach(el => el.classList.remove("hidden"));
};
const getRandomItem = items => {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};
const renderCard = (drawingType, isReversed, shortName, img) => "\n  <div>\n    <h2>".concat(drawingType, "</h2>\n    <figure class=\"card_container ").concat(isReversed ? "reversed-card" : "", "\" data-id=\"").concat(shortName, "\">\n      <div class=\"img-loader\"></div>\n      <img\n        src=\"").concat(img ? "".concat(CDN_URL, "/").concat(img) : LOCAL_DEFAULT_IMG, "\"\n        class=\"card-img hidden\"\n        onload=\"this.classList.remove('hidden');this.previousElementSibling.style.display='none';\"\n        onerror=\"\n          if (!this.dataset.failed) {\n            this.dataset.failed = '1';\n            this.src='").concat(LOCAL_DEFAULT_IMG, "';\n          } else {\n            this.classList.remove('hidden');\n            this.previousElementSibling.style.display='none';\n          }\n        \"\n      />\n    </figure>\n  </div>\n");
var DrawingType;
(function (DrawingType) {
  DrawingType["Past"] = "past";
  DrawingType["Present"] = "present";
  DrawingType["Future"] = "future";
})(DrawingType || (DrawingType = {}));
class Game {
  constructor() {
    _defineProperty(this, "cards", []);
    _defineProperty(this, "elements", void 0);
    this.elements = {
      singleCardBtn: getElement("#btn-single-card"),
      singleCard: getElement(".single_card"),
      multipleCardsBtn: getElement("#btn-multiple-cards"),
      multipleCard: getElement(".multiple_card"),
      title: getElement(".title"),
      newReadingBtn: getElement(".btn_reveal"),
      fortuneContainer: getElement(".fortune_container"),
      fortuneDescription: getElement(".fortune_description"),
      headerTitle: getElement(".header_title"),
      subTitle: getElement(".sub_title"),
      cardTitle: getElement(".desc_title"),
      description: getElement(".description"),
      text: getElement(".text")
    };
    this.fetchCardsData();
    this.initializeEventListeners();
  }
  async fetchCardsData() {
    try {
      const response = await fetch("".concat(CDN_URL, "/card_data.json"));
      const data = await response.json();
      this.cards = data.cards;
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  }
  initializeEventListeners() {
    this.elements.singleCardBtn.addEventListener("click", () => this.singleCardSelected());
    this.elements.multipleCardsBtn.addEventListener("click", () => this.multipleCardSelected());
    this.elements.newReadingBtn.addEventListener("click", () => this.newReading());
    document.addEventListener("click", e => this.showFortune(e));
  }
  singleCardSelected() {
    hideElements(this.elements.singleCardBtn, this.elements.multipleCardsBtn, this.elements.multipleCard, this.elements.text, this.elements.headerTitle);
    const isReversed = Math.random() < 0.5;
    const chosenCard = getRandomItem(this.cards);
    this.elements.singleCard.innerHTML = renderCard("Click the card and reveal the fortune", isReversed, chosenCard.name_short, chosenCard.img);
    this.elements.multipleCard.innerHTML = "";
    showElements(this.elements.singleCard, this.elements.fortuneContainer);
  }
  multipleCardSelected() {
    hideElements(this.elements.singleCard, this.elements.singleCardBtn, this.elements.multipleCardsBtn, this.elements.headerTitle);
    showElements(this.elements.multipleCard, this.elements.fortuneContainer, this.elements.text);
    this.elements.multipleCard.innerHTML = Object.values(DrawingType).map(type => {
      const isReversed = Math.random() < 0.5;
      const card = getRandomItem(this.cards);
      return renderCard(type, isReversed, card.name_short, card.img);
    }).join("");
  }
  showFortune(e) {
    const target = e.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const cardElement = target === null || target === void 0 ? void 0 : target.closest(".card_container");
    if (!(cardElement instanceof HTMLElement)) {
      return;
    }
    if (!cardElement) {
      return;
    }
    const cardId = cardElement.getAttribute("data-id");
    const foundCard = this.cards.find(card => card.name_short === cardId);
    if (foundCard) {
      this.elements.cardTitle.textContent = foundCard.name;
      this.elements.description.textContent = foundCard.desc;
      this.elements.subTitle.textContent = foundCard.meaning_up;
      this.elements.title.textContent = foundCard.name;
      showElements(this.elements.fortuneDescription);
    }
  }
  newReading() {
    showElements(this.elements.singleCardBtn, this.elements.multipleCardsBtn, this.elements.headerTitle);
    hideElements(this.elements.singleCard, this.elements.multipleCard, this.elements.fortuneContainer, this.elements.fortuneDescription);
  }
}
const game = new Game();
},{}],"../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46115" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map