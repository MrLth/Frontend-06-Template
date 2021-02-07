/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/Animation.js":
/*!**************************!*\
  !*** ./lib/Animation.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _TimingFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimingFunction */ \"./lib/TimingFunction.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n/*\n * @Author: mrlthf11\n * @LastEditors: mrlthf11\n * @Date: 2021-02-04 10:26:55\n * @LastEditTime: 2021-02-05 16:58:07\n * @Description: file content\n */\n\nvar Animation = /*#__PURE__*/function () {\n  function Animation(target, property, startValue, endValue, duration, delay) {\n    var timingFunction = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _TimingFunction__WEBPACK_IMPORTED_MODULE_0__.linear;\n    var template = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : function (v) {\n      return v;\n    };\n\n    _classCallCheck(this, Animation);\n\n    this.target = target;\n    this.property = property;\n    this.startValue = startValue;\n    this.endValue = endValue;\n    this.duration = duration;\n    this.delay = delay;\n    this.template = template;\n    this.timingFunction = timingFunction;\n    this.range = endValue - startValue;\n  }\n\n  _createClass(Animation, [{\n    key: \"receive\",\n    value: function receive(timing) {\n      this.target[this.property] = this.template(this.startValue + this.timingFunction(timing / this.duration) * this.range);\n    }\n  }]);\n\n  return Animation;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animation);\n\n//# sourceURL=webpack://week-14/./lib/Animation.js?");

/***/ }),

/***/ "./lib/TimeLine.js":
/*!*************************!*\
  !*** ./lib/TimeLine.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*\n * @Author: mrlthf11\n * @LastEditors: mrlthf11\n * @Date: 2021-02-04 10:27:04\n * @LastEditTime: 2021-02-04 16:30:46\n * @Description: file content\n */\nvar TICK = Symbol('tick');\nvar TASKS = Symbol('tasks');\nvar TICK_HANDLER = Symbol('Tick handler');\nvar PAUSE_START = Symbol('Pause start');\nvar PAUSE_TIME = Symbol('Pause time');\n\nvar TimeLine = /*#__PURE__*/function () {\n  function TimeLine() {\n    _classCallCheck(this, TimeLine);\n\n    this.state = 'initd';\n    this[TASKS] = new Set();\n    this[TICK] = this[TICK].bind(this);\n  }\n\n  _createClass(TimeLine, [{\n    key: TICK,\n    value: function value() {\n      var now = Date.now();\n\n      var _iterator = _createForOfIteratorHelper(this[TASKS]),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var task = _step.value;\n          var animation = task.animation,\n              startTime = task.startTime;\n\n          if (startTime > now) {\n            continue;\n          }\n\n          var timing = now - startTime - this[PAUSE_TIME];\n\n          if (timing > animation.duration) {\n            this[TASKS][\"delete\"](task);\n            timing = animation.duration;\n          }\n\n          animation.receive(timing);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      if (this.state !== 'initd') {\n        return;\n      }\n\n      this.state = 'started';\n      this.startTime = new Date();\n      this[PAUSE_TIME] = 0;\n      this[TICK]();\n    }\n  }, {\n    key: \"add\",\n    value: function add(animation, delay) {\n      var _ref, _delay;\n\n      delay = (_ref = (_delay = delay) !== null && _delay !== void 0 ? _delay : animation.delay) !== null && _ref !== void 0 ? _ref : 0;\n      this[TASKS].add({\n        animation: animation,\n        startTime: Date.now() + delay\n      });\n      return this;\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      if (this.state !== 'started') {\n        return;\n      }\n\n      this.state = 'paused';\n      this[PAUSE_START] = new Date();\n      cancelAnimationFrame(this[TICK_HANDLER]);\n    }\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      if (this.state !== 'paused') {\n        return;\n      }\n\n      this.state = 'started';\n      this[PAUSE_TIME] += Date.now() - this[PAUSE_START];\n      this[TICK]();\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      this.pause();\n      this.state = 'initd';\n      this.startTime = new Date();\n      this[PAUSE_TIME] = 0;\n      this[PAUSE_START] = 0;\n      this[TICK_HANDLER] = null;\n      this[TASKS] = new Set();\n      return this;\n    }\n  }]);\n\n  return TimeLine;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLine);\n\n//# sourceURL=webpack://week-14/./lib/TimeLine.js?");

/***/ }),

/***/ "./lib/TimingFunction.js":
/*!*******************************!*\
  !*** ./lib/TimingFunction.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cubicBezier\": () => (/* binding */ cubicBezier),\n/* harmony export */   \"linear\": () => (/* binding */ linear),\n/* harmony export */   \"ease\": () => (/* binding */ ease),\n/* harmony export */   \"easeIn\": () => (/* binding */ easeIn),\n/* harmony export */   \"easeOut\": () => (/* binding */ easeOut),\n/* harmony export */   \"easeInOut\": () => (/* binding */ easeInOut)\n/* harmony export */ });\n/*\n * @Author: mrlthf11\n * @LastEditors: mrlthf11\n * @Date: 2021-02-04 14:24:30\n * @LastEditTime: 2021-02-04 15:23:52\n * @Description: file content\n */\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // First try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wiki/Newton's_method\n\n    for (var i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\nvar linear = function linear(v) {\n  return v;\n};\nvar ease = cubicBezier(0.25, 0.1, 0.25, 1);\nvar easeIn = cubicBezier(0.42, 0, 1, 1);\nvar easeOut = cubicBezier(0, 0, 0.58, 1);\nvar easeInOut = cubicBezier(0.42, 0, 0.58, 1);\n\n//# sourceURL=webpack://week-14/./lib/TimingFunction.js?");

/***/ }),

/***/ "./pause/pause.js":
/*!************************!*\
  !*** ./pause/pause.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_TimeLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/TimeLine */ \"./lib/TimeLine.js\");\n/* harmony import */ var _lib_Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Animation */ \"./lib/Animation.js\");\n/* harmony import */ var _lib_TimingFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/TimingFunction */ \"./lib/TimingFunction.js\");\n\n\n\n/*\n * @Author: mrlthf11\n * @LastEditors: mrlthf11\n * @Date: 2021-02-04 13:50:07\n * @LastEditTime: 2021-02-04 16:28:37\n * @Description: file content\n */\n\nvar timeline = new _lib_TimeLine__WEBPACK_IMPORTED_MODULE_0__.default();\ntimeline.add(new _lib_Animation__WEBPACK_IMPORTED_MODULE_1__.default(document.querySelector('#div1').style, 'transform', 0, 800, 5500, 0, _lib_TimingFunction__WEBPACK_IMPORTED_MODULE_2__.linear, function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n})).add(new _lib_Animation__WEBPACK_IMPORTED_MODULE_1__.default(document.querySelector('#div2').style, 'transform', 0, 800, 5500, 0, _lib_TimingFunction__WEBPACK_IMPORTED_MODULE_2__.ease, function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n})).add(new _lib_Animation__WEBPACK_IMPORTED_MODULE_1__.default(document.querySelector('#div3').style, 'transform', 0, 800, 5500, 0, _lib_TimingFunction__WEBPACK_IMPORTED_MODULE_2__.easeIn, function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n})).add(new _lib_Animation__WEBPACK_IMPORTED_MODULE_1__.default(document.querySelector('#div4').style, 'transform', 0, 800, 5500, 0, _lib_TimingFunction__WEBPACK_IMPORTED_MODULE_2__.easeOut, function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n})).add(new _lib_Animation__WEBPACK_IMPORTED_MODULE_1__.default(document.querySelector('#div5').style, 'transform', 0, 800, 5500, 0, _lib_TimingFunction__WEBPACK_IMPORTED_MODULE_2__.easeInOut, function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n})).start();\n\nfunction _native2(id, timingFunctionName) {\n  var _native = document.querySelector(id);\n\n  _native.style.transition = '5.5s ' + timingFunctionName;\n  _native.style.transform = 'translateX(800px)';\n}\n\n_native2('#native1', 'linear');\n\n_native2('#native2', 'ease');\n\n_native2('#native3', 'ease-in');\n\n_native2('#native4', 'ease-out');\n\n_native2('#native5', 'ease-in-out');\n\ndocument.querySelector('#btn-pause').addEventListener('click', function () {\n  return timeline.pause();\n});\ndocument.querySelector('#btn-resume').addEventListener('click', function () {\n  return timeline.resume();\n});\n\n//# sourceURL=webpack://week-14/./pause/pause.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./pause/pause.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;