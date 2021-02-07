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

/***/ "./gesture.js":
/*!********************!*\
  !*** ./gesture.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/gesture */ \"./lib/gesture.js\");\n/*\n * @Author: mrlthf11\n * @LastEditors: mrlthf11\n * @Date: 2021-02-05 16:06:09\n * @LastEditTime: 2021-02-07 10:43:16\n * @Description: file content\n */\n\ndocument.addEventListener('contextmenu', function (e) {\n  return e.preventDefault();\n});\nnew _lib_gesture__WEBPACK_IMPORTED_MODULE_0__.Listener(document.documentElement);\ndocument.documentElement.addEventListener('tap', function (e) {\n  return console.log('tap event trigged', e);\n});\ndocument.documentElement.addEventListener('pressstart', function (e) {\n  return console.log('pressstart event trigged', e);\n});\ndocument.documentElement.addEventListener('press', function (e) {\n  return console.log('press event trigged', e);\n});\ndocument.documentElement.addEventListener('pressend', function (e) {\n  return console.log('pressend event trigged', e);\n});\ndocument.documentElement.addEventListener('panstart', function (e) {\n  return console.log('panstart event trigged', e);\n});\ndocument.documentElement.addEventListener('pan', function (e) {\n  return console.log('pan event trigged', e);\n});\ndocument.documentElement.addEventListener('panend', function (e) {\n  return console.log('panend event trigged', e);\n});\ndocument.documentElement.addEventListener('flick', function (e) {\n  return console.log('flick event trigged', e);\n});\n\n//# sourceURL=webpack://week-14/./gesture.js?");

/***/ }),

/***/ "./lib/gesture.js":
/*!************************!*\
  !*** ./lib/gesture.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Listener\": () => (/* binding */ Listener)\n/* harmony export */ });\nvar _window$devicePixelRa;\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/*\n * @Author: mrlthf11\n * @LastEditors: mrlthf11\n * @Date: 2021-02-05 14:22:04\n * @LastEditTime: 2021-02-07 10:40:53\n * @Description: file content\n */\nvar contents = new Map();\nvar threshold = ((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1) * 5;\nvar isListeningMouse = false;\nvar isTouched = false;\nvar Listener =\n/**\n * @param {HTMLElement} element\n */\nfunction Listener(element) {\n  var _Recognizer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Recognizer;\n\n  var _dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dispatch.bind(null, element);\n\n  _classCallCheck(this, Listener);\n\n  //#region mouse event，注意区分左右键（e.button & e.buttons）\n  element.addEventListener('mousedown', function (e) {\n    // fix tap trigger twice\n    if (isTouched) {\n      isTouched = false;\n      return;\n    } //#region mouse down\n\n\n    var content = new _Recognizer(_dispatch);\n    contents.set(\"mouse \".concat(1 << e.button), content);\n    content.start(e); //#endregion\n\n    var move = function move(e) {\n      var x = e.buttons; // mousemove event 没有 button\n\n      while (x) {\n        //#region fix order of buttons & button is not same\n        var t = x & -x; // 取最低位的 1\n\n        t = t === 2 ? 4 : t === 4 ? 2 : t; //#endregion\n\n        var _content = contents.get(\"mouse \".concat(t));\n\n        _content === null || _content === void 0 ? void 0 : _content.move(e);\n        x = x & x - 1; // 打掉最低位的 1\n      }\n    };\n\n    var up = function up(e) {\n      var content = contents.get(\"mouse \".concat(1 << e.button));\n      content.end(e);\n      contents[\"delete\"](\"mouse \".concat(1 << e.button));\n\n      if (e.buttons === 0) {\n        // 只有所有按键都松开才清除事件\n        document.removeEventListener('mousemove', move);\n        document.removeEventListener('mouseup', up);\n        isListeningMouse = false;\n      }\n    }; // fix press multiple keys at the same time to add event multiple times\n\n\n    if (!isListeningMouse) {\n      document.addEventListener('mousemove', move);\n      document.addEventListener('mouseup', up);\n      isListeningMouse = true;\n    }\n  }); //#endregion\n  //#region touch event\n\n  element.addEventListener('touchstart', function (e) {\n    isTouched = true;\n\n    var _iterator = _createForOfIteratorHelper(e.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        var content = new _Recognizer(_dispatch);\n        contents.set(touch.identifier, content);\n        content.start(touch);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  });\n  element.addEventListener('touchmove', function (e) {\n    var _iterator2 = _createForOfIteratorHelper(e.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        var content = contents.get(touch.identifier);\n        content.move(touch);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  });\n  element.addEventListener('touchend', function (e) {\n    var _iterator3 = _createForOfIteratorHelper(e.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        var content = contents.get(touch.identifier);\n        content.end(touch);\n        contents[\"delete\"](touch.identifier);\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  });\n  element.addEventListener('touchcancel', function (e) {\n    var _iterator4 = _createForOfIteratorHelper(e.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        var content = contents.get(touch.identifier);\n        content.cancel(touch);\n        contents[\"delete\"](touch.identifier);\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  }); //#endregion\n};\n\nvar Recognizer = /*#__PURE__*/function () {\n  function Recognizer(dispatch) {\n    _classCallCheck(this, Recognizer);\n\n    this.dispatch = dispatch;\n    this.isTap = true;\n    this.isPress = false;\n    this.isPan = false;\n    this.isFlick = false;\n    this.isVertical = false;\n    this.points = [];\n    this.handler = null;\n    this.startX = NaN;\n    this.startY = NaN;\n  }\n  /**\n   * @param {MouseEvent|TouchEvent} e\n   */\n\n\n  _createClass(Recognizer, [{\n    key: \"start\",\n    value: function start(e) {\n      var _this = this;\n\n      this.startX = e.clientX;\n      this.startY = e.clientY;\n      this.handler = setTimeout(function () {\n        _this.isPress = true;\n        _this.isTap = false;\n\n        _this.dispatch('pressstart');\n      }, 500);\n      this.points = [{\n        t: Date.now(),\n        x: e.clientX,\n        y: e.clientY\n      }];\n    }\n    /**\n     * @param {MouseEvent|TouchEvent} e\n     */\n\n  }, {\n    key: \"move\",\n    value: function move(e) {\n      var dx = e.clientX - this.startX;\n      var dy = e.clientY - this.startY;\n      this.isVertical = Math.abs(dx) < Math.abs(dy);\n\n      if (!this.isPan && Math.pow(dx, 2) + Math.pow(dy, 2) > Math.pow(threshold, 2)) {\n        this.isPan = true;\n        this.isPress = false;\n        this.isTap = false;\n        clearTimeout(this.handler);\n        this.dispatch('panstart', {\n          startX: this.startX,\n          startY: this.startY,\n          clientX: e.clientX,\n          clientY: e.clientY,\n          isVertical: this.isVertical\n        });\n      }\n\n      if (this.isPan) {\n        this.dispatch('pan', {\n          startX: this.startX,\n          startY: this.startY,\n          clientX: e.clientX,\n          clientY: e.clientY,\n          isVertical: this.isVertical\n        });\n      } //#region flick points handling\n\n\n      var now = Date.now();\n      this.points = this.points.filter(function (v) {\n        return v.t > now - 500;\n      });\n      this.points.push({\n        t: now,\n        x: e.clientX,\n        y: e.clientY\n      }); //#endregion\n    }\n    /**\n     * @param {MouseEvent|TouchEvent} e\n     */\n\n  }, {\n    key: \"end\",\n    value: function end(e) {\n      //#region flick\n      var velocity = this.points.length < 2 ? 0 : Math.sqrt(Math.pow(e.clientX - this.points[0].x, 2) + Math.pow(e.clientY - this.points[0].y, 2)) / (Date.now() - this.points[0].t);\n\n      if (velocity > 1.5) {\n        this.isFlick = true;\n        this.dispatch('flick', {\n          startX: this.startX,\n          startY: this.startY,\n          clientX: e.clientX,\n          clientY: e.clientY,\n          isVertical: this.isVertical,\n          isFlick: this.isFlick,\n          velocity: velocity\n        });\n      } //#endregion\n\n\n      if (this.isTap) {\n        clearTimeout(this.handler);\n        this.dispatch('tap');\n      }\n\n      if (this.isPan) {\n        this.dispatch('panend', {\n          startX: this.startX,\n          startY: this.startY,\n          clientX: e.clientX,\n          clientY: e.clientY,\n          isVertical: this.isVertical,\n          isFlick: this.isFlick\n        });\n      }\n\n      if (this.isPress) {\n        this.dispatch('pressend');\n        this.dispatch('press');\n      }\n    }\n    /**\n     * @param {TouchEvent} e\n     */\n\n  }, {\n    key: \"cancel\",\n    value: function cancel(e) {\n      clearTimeout(this.handler);\n      this.dispatch('cancel', e);\n    }\n  }]);\n\n  return Recognizer;\n}();\n\nfunction dispatch(element, type, props) {\n  var event = new Event(type);\n  Object.assign(event, props);\n  element.dispatchEvent(event);\n}\n\n//# sourceURL=webpack://week-14/./lib/gesture.js?");

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
/******/ 	__webpack_require__("./gesture.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;