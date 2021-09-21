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

/***/ "./src/js/CreateTag.js":
/*!*****************************!*\
  !*** ./src/js/CreateTag.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CreateTag)\n/* harmony export */ });\nclass CreateTag {\n  constructor(selector, string) {\n    this.selector = selector;\n    this.string = string;\n    this.buildTag(string);\n    this.deletedTag();\n  }\n\n  buildTag(string) {\n    const tag = document.createElement(\"div\");\n    tag.classList.add(\"tag\");\n    const tagText = document.createElement(\"p\");\n    tagText.classList.add(\"tag__text\");\n    const tagIcon = document.createElement(\"em\");\n    tagIcon.classList.add(\"tag__icon\", \"far\", \"fa-times-circle\");\n\n    tag.appendChild(tagText);\n    tag.appendChild(tagIcon);\n\n    tagText.innerText = string;\n\n    this.selector.appendChild(tag);\n    return tag;\n  }\n\n  deletedTag() {\n    const tag = document.querySelectorAll(\".tag__icon\");\n    tag.forEach((icon) => {\n      icon.addEventListener(\"click\", () => {\n        console.log(icon.parentNode);\n        icon.parentNode.parentNode.removeChild(icon.parentNode);\n      });\n    });\n  }\n}\n\n\n//# sourceURL=webpack://bastienguillaumont_7_21092021/./src/js/CreateTag.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CreateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTag */ \"./src/js/CreateTag.js\");\n\n\n// Ajout des tags\n\nconst testTag = document.querySelectorAll(\".test\"); // A modifier avec les bons inputs\n\ntestTag.forEach((tag) => {\n  tag.addEventListener(\"click\", () => {\n    new _CreateTag__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.querySelector(\".tags\"), tag.textContent);\n  });\n});\n\n\n//# sourceURL=webpack://bastienguillaumont_7_21092021/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;