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
})({"assets/js/infinite-gallery.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var InfiniteGallery = function InfiniteGallery() {
  var mainElement;
  var options;
  var width = 0,
      height = 0;
  var bodyElement;
  var imageItems = [];

  var mount = function mount(element) {
    var _ref, _ref$itemElementClass, _ref$gap, _ref$itemsX, _ref$itemsY;

    var mountOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_ref = {}, _ref$itemElementClass = _ref.itemElementClassName, itemElementClassName = _ref$itemElementClass === void 0 ? ".image" : _ref$itemElementClass, _ref$gap = _ref.gap, gap = _ref$gap === void 0 ? 30 : _ref$gap, _ref$itemsX = _ref.itemsX, itemsX = _ref$itemsX === void 0 ? 4 : _ref$itemsX, _ref$itemsY = _ref.itemsY, itemsY = _ref$itemsY === void 0 ? 4 : _ref$itemsY, _ref);
    mainElement = document.querySelector(element);
    mainElement.classList.add("infinite-gallery");
    bodyElement = mainElement.querySelector(".infinite-gallery-body");
    var items = mainElement.querySelectorAll(mountOptions.itemElementClassName);
    var itemWidth = mainElement.querySelector(mountOptions.itemElementClassName).clientWidth;
    var itemHeight = mainElement.querySelector(mountOptions.itemElementClassName).clientHeight;
    width = itemWidth * mountOptions.itemsX + (mountOptions.itemsX - 1) * mountOptions.gap;
    height = itemHeight * mountOptions.itemsY + (mountOptions.itemsY - 1) * mountOptions.gap;
    bodyElement.style.width = "".concat(width, "px");
    bodyElement.style.height = "".concat(height, "px");
    items.forEach(function (item, index) {
      var width = item.clientWidth;
      var height = item.clientHeight;
      item.style.position = "absolute";
      var indexY = Math.floor(index / mountOptions.itemsX);
      var indexX = index % mountOptions.itemsX;
      var gapX = indexX === 0 ? 0 : mountOptions.gap * indexX;
      var gapY = indexY === 0 ? 0 : mountOptions.gap * indexY;
      item.style.top = "".concat(indexY * height + gapY, "px");
      item.style.left = "".concat(indexX * width + gapX, "px");
      imageItems.push({
        x: indexY * height + gapY,
        y: indexX * width + gapX,
        element: item
      });
    });
    options = mountOptions;
    makeDummies();
    init();
  };

  var init = function init() {
    dragInit();
  };

  var makeDummies = function makeDummies() {
    var xTimes = Math.ceil(window.innerWidth / width);
    var yTimes = Math.ceil(window.innerHeight / height);

    for (var i = 0; i < xTimes; i++) {
      var cloneBodyElement = bodyElement.cloneNode(true);
      cloneBodyElement.classList.add("infinite-gallery-dummy");
      cloneBodyElement.style.left = "-".concat((width + options.gap) * (i + 1), "px");
      cloneBodyElement.style.top = "0px";
      mainElement.appendChild(cloneBodyElement);
    }

    for (var _i = 0; _i < xTimes; _i++) {
      var _cloneBodyElement = bodyElement.cloneNode(true);

      _cloneBodyElement.classList.add("infinite-gallery-dummy");

      _cloneBodyElement.style.left = "".concat((width + options.gap) * (_i + 1), "px");
      _cloneBodyElement.style.top = "0px";
      mainElement.appendChild(_cloneBodyElement);
    }

    for (var _i2 = 0; _i2 < yTimes; _i2++) {
      var _cloneBodyElement2 = bodyElement.cloneNode(true);

      _cloneBodyElement2.classList.add("infinite-gallery-dummy");

      _cloneBodyElement2.style.left = "0px";
      _cloneBodyElement2.style.top = "".concat((height + options.gap) * (_i2 + 1), "px");
      mainElement.appendChild(_cloneBodyElement2);
    }

    for (var _i3 = 0; _i3 < yTimes; _i3++) {
      var _cloneBodyElement3 = bodyElement.cloneNode(true);

      _cloneBodyElement3.classList.add("infinite-gallery-dummy");

      _cloneBodyElement3.style.left = "0px";
      _cloneBodyElement3.style.top = "-".concat((height + options.gap) * (_i3 + 1), "px");
      mainElement.appendChild(_cloneBodyElement3);
    }

    for (var _i4 = 0; _i4 < yTimes; _i4++) {
      for (var j = 0; j < xTimes; j++) {
        var _cloneBodyElement4 = bodyElement.cloneNode(true);

        _cloneBodyElement4.classList.add("infinite-gallery-dummy");

        _cloneBodyElement4.style.left = "".concat((width + options.gap) * (j + 1), "px");
        _cloneBodyElement4.style.top = "-".concat((height + options.gap) * (_i4 + 1), "px");
        mainElement.appendChild(_cloneBodyElement4);
      }

      for (var _j = 0; _j < xTimes; _j++) {
        var _cloneBodyElement5 = bodyElement.cloneNode(true);

        _cloneBodyElement5.classList.add("infinite-gallery-dummy");

        _cloneBodyElement5.style.left = "".concat((width + options.gap) * (_j + 1), "px");
        _cloneBodyElement5.style.top = "".concat((height + options.gap) * (_i4 + 1), "px");
        mainElement.appendChild(_cloneBodyElement5);
      }

      for (var _j2 = 0; _j2 < xTimes; _j2++) {
        var _cloneBodyElement6 = bodyElement.cloneNode(true);

        _cloneBodyElement6.classList.add("infinite-gallery-dummy");

        _cloneBodyElement6.style.left = "-".concat((width + options.gap) * (_j2 + 1), "px");
        _cloneBodyElement6.style.top = "-".concat((height + options.gap) * (_i4 + 1), "px");
        mainElement.appendChild(_cloneBodyElement6);
      }

      for (var _j3 = 0; _j3 < xTimes; _j3++) {
        var _cloneBodyElement7 = bodyElement.cloneNode(true);

        _cloneBodyElement7.classList.add("infinite-gallery-dummy");

        _cloneBodyElement7.style.left = "-".concat((width + options.gap) * (_j3 + 1), "px");
        _cloneBodyElement7.style.top = "".concat((height + options.gap) * (_i4 + 1), "px");
        mainElement.appendChild(_cloneBodyElement7);
      }
    }
  };

  var mouseDown = {
    down: false,
    x: 0,
    y: 0
  };

  var reposition = function reposition(x, y) {
    mainElement.style.top = "".concat(y, "px");
    mainElement.style.left = "".concat(x, "px");
  };

  function dragInit() {
    mainElement.addEventListener("mousedown", function (e) {
      mouseDown.down = true;
      mouseDown.x = mainElement.offsetLeft - e.clientX;
      mouseDown.y = mainElement.offsetTop - e.clientY;
      mainElement.style.cursor = "grabbing";
    }, true);
    mainElement.addEventListener("mousemove", function (e) {
      var clientX = e.clientX,
          clientY = e.clientY;

      if (mouseDown.down) {
        var x = mouseDown.x + clientX;
        var y = mouseDown.y + clientY;

        if (y >= window.innerHeight) {
          y = window.innerHeight - height;
          mouseDown.x = mainElement.offsetLeft - e.clientX;
          mouseDown.y = mainElement.offsetTop - e.clientY;
        }

        if (y <= -height) {
          y = 0;
          mouseDown.x = mainElement.offsetLeft - e.clientX;
          mouseDown.y = mainElement.offsetTop - e.clientY;
        }

        if (x <= -width) {
          x = 0;
          mouseDown.x = mainElement.offsetLeft - e.clientX;
          mouseDown.y = mainElement.offsetTop - e.clientY;
        }

        if (x >= window.innerWidth) {
          x = window.innerWidth - width;
          mouseDown.x = mainElement.offsetLeft - e.clientX;
          mouseDown.y = mainElement.offsetTop - e.clientY;
        }

        reposition(x, y);
      }
    }, true);

    function resetMouseDown() {
      if (!mouseDown.down) return;
      mouseDown.down = false;
      mainElement.style.cursor = "";
    }

    window.addEventListener("mouseup", resetMouseDown, true);
  }

  return {
    mount: mount
  };
};

var _default = InfiniteGallery();

exports.default = _default;
},{}],"assets/js/scripts.js":[function(require,module,exports) {
"use strict";

var _infiniteGallery = _interopRequireDefault(require("./infinite-gallery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_infiniteGallery.default.mount("#gallery", {
  itemsX: 4,
  itemsY: 4,
  itemElementClassName: ".image",
  gap: 30
});
},{"./infinite-gallery":"assets/js/infinite-gallery.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61232" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/scripts.js"], null)
//# sourceMappingURL=/scripts.66fe92b2.js.map