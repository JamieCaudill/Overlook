/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_beach_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,600&family=Noto+Sans:wght@400;500;600;700;900&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;900&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_beach_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: \"Noto Sans\", sans-serif;\n  background-color: #f4f1e5;\n}\n\nheader {\n  background-color: white;\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 20px;\n  height: 5em;\n}\n\n.header__left {\n  margin: 0;\n  display: flex;\n  align-items: center;\n  font-family: \"Josefin Sans\", sans-serif;\n  font-size: 1.5em;\n  color: #6bac89;\n  text-shadow: black 1px 1px 1px;\n}\n\n.header__right {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  width: 15%;\n}\n.header__right .header__username {\n  font-size: 1.2em;\n  color: #52926f;\n}\n\n.header__username {\n  font-weight: bold;\n}\n\n.login {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n}\n.login .login__form {\n  background-color: #8cbea3;\n  padding: 20px;\n  border: solid black 1px;\n  border-radius: 5px;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n.login .login__form h1 {\n  margin-top: 0;\n}\n.login .login__form input {\n  display: block;\n  padding: 10px;\n  margin-bottom: 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  box-sizing: border-box;\n  width: 100%;\n}\n.login .login__form button {\n  width: 70%;\n  padding: 10px;\n  background-color: #d78877;\n  color: black;\n  border: solid black 1px;\n  border-radius: 4px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.login .login__form button:hover {\n  background-color: #b34b35;\n  color: white;\n}\n\n.main {\n  width: 100vw;\n}\n\n.main__form__container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 30em;\n  width: 100vw;\n  margin-bottom: 30px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: 100%;\n  border: solid black 1px;\n}\n.main__form__container .main__form {\n  background-color: white;\n  opacity: 85%;\n  width: 80vw;\n  border: solid black 2px;\n  border-radius: 0.5em;\n  text-align: center;\n}\n.main__form__container .main__form label {\n  font-size: 0.7em;\n}\n.main__form__container .main__form .form {\n  background-color: #dfba46;\n  font-weight: 600;\n  height: 3em;\n  margin: 1em;\n  border: solid black 1px;\n  border-radius: 0.5em;\n  width: 10em;\n  text-align: center;\n  cursor: pointer;\n}\n.main__form__container .main__form .form:hover {\n  background-color: #cea524;\n  color: white;\n}\n\n.bookings {\n  height: 100%;\n}\n.bookings .bookings__subheader {\n  margin: 0 0.5em 0 0;\n  padding: 1em;\n  font-family: \"Josefin Sans\", sans-serif;\n  font-size: 2em;\n  color: #8cbea3;\n  text-shadow: black 1px 1px 1px;\n}\n.bookings .bookings__header {\n  height: 3em;\n  padding: 0;\n  display: flex;\n  align-items: flex-end;\n}\n.bookings .bookings__header button {\n  margin: 1em 2em 1em 1em;\n  background-color: #d4816f;\n  border: solid black 1px;\n  border-radius: 0.3em;\n  font-size: medium;\n  font-weight: 600;\n  height: 2.5em;\n  width: 8em;\n  color: black;\n  cursor: pointer;\n}\n.bookings .bookings__header button:hover {\n  background-color: #c5543c;\n  color: white;\n}\n.bookings .bookings__total__cost {\n  display: flex;\n  flex-direction: column;\n  height: 80%;\n}\n.bookings .bookings__total__cost .total__cost {\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n  border: solid black 2px;\n  margin: 0.5em;\n  border-radius: 1em;\n  padding: 1em;\n  background-color: #8cbea3;\n  font-weight: 600;\n  font-size: 1.5em;\n}\n.bookings .bookings__total__cost .booking__cost {\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n  border: solid black 2px;\n  margin: 0.5em;\n  border-radius: 1em;\n  padding: 1em;\n  height: 4em;\n}\n.bookings .bookings__total__cost .booking__cost p {\n  margin: 0.3em;\n}\n.bookings .bookings__past, .bookings .bookings__future, .bookings .bookings__results, .bookings .bookings__cost {\n  display: flex;\n  flex-direction: column;\n}\n.bookings .bookings__past .booking, .bookings .bookings__future .booking, .bookings .bookings__results .booking, .bookings .bookings__cost .booking {\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n  border: solid black 2px;\n  margin: 0.5em;\n  border-radius: 1em;\n  padding: 1em;\n}\n.bookings .bookings__past .booking p, .bookings .bookings__future .booking p, .bookings .bookings__results .booking p, .bookings .bookings__cost .booking p {\n  margin: 0;\n  padding: 0.3em;\n}\n.bookings .bookings__past .booking button, .bookings .bookings__future .booking button, .bookings .bookings__results .booking button, .bookings .bookings__cost .booking button {\n  align-self: center;\n  height: 2em;\n  background-color: #d78877;\n  border: 0;\n  border-radius: 0.5em;\n  font-weight: 400;\n}\n.bookings .bookings__past .booking button:hover, .bookings .bookings__future .booking button:hover, .bookings .bookings__results .booking button:hover, .bookings .bookings__cost .booking button:hover {\n  background-color: #c5543c;\n  cursor: pointer;\n}\n\n.current__booking {\n  border: solid black 2px;\n  margin: 1em;\n  padding: 1em;\n  border-radius: 0.5em;\n  background-color: white;\n}\n.current__booking button {\n  align-self: center;\n  height: 2em;\n  background-color: #d78877;\n  border: 0;\n  border-radius: 0.5em;\n  font-weight: 400;\n}\n.current__booking button:hover {\n  background-color: #c5543c;\n  cursor: pointer;\n}\n\nfooter {\n  background-color: #f2f2f2;\n  padding: 10px;\n  text-align: center;\n}\n\n.hidden {\n  display: none !important;\n}/*# sourceMappingURL=index.css.map */", "",{"version":3,"sources":["webpack://./src/css/index.scss","webpack://./src/css/index.css"],"names":[],"mappings":"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","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/beach.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userLogin": () => (/* binding */ userLogin),
/* harmony export */   "checkPassword": () => (/* binding */ checkPassword)
/* harmony export */ });
// LOGIN FUNCTIONS //

const userLogin = (username, customersData) => {
  const splitUsername = username.split('customer');
  if (splitUsername.length > 2) {
    return;
  }
  const customerNumber = splitUsername[1];
  if (!customerNumber) {
    return;
  }
  return customersData.find(customer => customer.id === parseInt(customerNumber));
};

const checkPassword = (password) => {
  // if (password === 'overlook2021') {
    return true;
  // } 
  // return false;
};



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// FIND BOOKINGS FUNCTION //

const findBookings = (customer, roomsData, bookingsData) => {
  const bookingDetails = bookingsData.filter(booking => customer.id === booking.userID);
  const bookingInfo = roomsData.reduce((acc, room) => {
    bookingDetails.forEach(booking => {
      if (booking.roomNumber === room.number) {
        acc.push({bookingDetails: booking, roomDetails: room})
      }
    })
    return acc;
  }, [])
  return bookingInfo;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findBookings);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterRoomsByDate": () => (/* binding */ filterRoomsByDate),
/* harmony export */   "filterRoomsByType": () => (/* binding */ filterRoomsByType),
/* harmony export */   "getRoomsDetails": () => (/* binding */ getRoomsDetails)
/* harmony export */ });
// FILTER ROOMS FUNCTIONS //

const filterRoomsByType = (roomFilter, roomsData) => {
  if (!roomFilter) {
    return [];
  }
  const filteredRooms = roomsData
    .filter(room => {
      return room.roomType === roomFilter
    })
    .map(data => data.number)
    .sort((a, b) => a - b)
  return [...new Set(filteredRooms)];
};

const filterRoomsByDate = (date, bookingsData) => {
  const roomNumbers = bookingsData.map(booking => booking.roomNumber)
  const sortedRoomNumbers = ([...new Set(roomNumbers)].sort((a, b) => a - b))
  if (!date) {
    return [];
  }
  const unavailableRooms = bookingsData
    .reduce((acc, booking) => {
      if  (booking.date === date) {
        acc.push(booking.roomNumber);
      }
      return acc;
    }, [])
    .sort((a, b) => a - b);
  return sortedRoomNumbers.filter(number => !unavailableRooms.includes(number));
};

const getRoomsDetails = (roomNumbers, roomsData) => {
  return roomsData.reduce((acc, room) => {
    roomNumbers.forEach(roomNumber => {
      if (room.number === roomNumber) {
        acc.push(room);
      }
    }) 
    return acc;
  }, []);
};



/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// FIND TOTAL COST FUNCTION //

const findTotalCost = (bookings) => {
  return bookings.reduce((acc, booking) => {
    return acc += booking.roomDetails.costPerNight;
  }, 0)
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findTotalCost);

/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _functions_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _functions_find_bookings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _functions_filter_rooms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _functions_find_total_cost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* eslint-disable max-len */
// SCRIPTS //

// IMPORTS //







// QUERY SELECTORS //

const loginForm = document.querySelector('.login__form');
const loginUsername = document.querySelector('.login__username');
const loginPassword = document.querySelector('.login__password');
const loginPage = document.querySelector('.login');
const mainPage = document.querySelector('.main');
const headerUsername = document.querySelector('.header__username');
const mainFormContainer = document.querySelector('.main__form__container');
const searchResults = document.querySelector('.bookings__results');
const dateInput = document.querySelector('.main__date');
const typeInput = document.querySelector('.main__room__type');
const pastBookings = document.querySelector('.bookings__past');
const futureBookings = document.querySelector('.bookings__future');
const bookingCostSection = document.querySelector('.bookings__cost');
const bookingsSubheader = document.querySelector('.bookings__subheader')
const totalCostSection = document.querySelector('.bookings__total__cost');
const totalCostText = document.querySelector('.total__cost');

// BUTTONS //

const loginBtn = document.querySelector('.login__submit');
const btnHistory = document.querySelector('.bookings__past__btn');
const btnUpcoming = document.querySelector('.bookings__future__btn');
const btnSearchSubmit = document.querySelector('.main__submit');
const btnTotalCost = document.querySelector('.bookings__cost__btn');

// FETCHED DATA //

let customersData = [];
let roomsData = [];
let bookingsData = [];

// GLOBAL VARIABLES //

let userBookings = [];
let bookingsHistory = [];
let bookingsUpcoming = [];
let currentCustomer;
let currentRoom = {};
let currentDateValue = '';
let availableRooms = [];

// API CALLS //

const fetchCustomers = fetch('https://overlook-api.onrender.com/api/v1/customers');
const fetchRooms = fetch('https://overlook-api.onrender.com/api/v1/rooms');
const fetchBookings = fetch('https://overlook-api.onrender.com/api/v1/bookings');
const fetchAllData = () => {
  Promise.all([fetchCustomers, fetchRooms, fetchBookings])
    .then(responses => {
      responses.forEach(response => {
        if (response.ok) {
          response.json()
            .then(data => {
              if (response.url.includes('/customers')) {
                customersData = data.customers;
              } else if (response.url.includes('/rooms')) {
                roomsData = data.rooms;
              } else if (response.url.includes('/bookings')) {
                bookingsData = data.bookings;
              }
            })
            .catch(error => {
              console.error('Error parsing response:', error);
            });
        } else {
          alert(`${response.status} server request failed, try again later`)
          console.error('Request failed with status:', response.status);
        }
      });
    });
};

// EVENT LISTENERS //

window.addEventListener('load', () => {
  fetchAllData();
});

loginBtn.addEventListener('click', (event) => {
  checkLogin(event, customersData);
  console.log(customersData)
});

btnHistory.addEventListener('click', () => {
  showHistory();
});

btnUpcoming.addEventListener('click', () => {
  showUpcoming();
});

pastBookings.addEventListener('click', (event) => {
  showBookingDetails(event, bookingsHistory, pastBookings);
});

futureBookings.addEventListener('click', (event) => {
  showBookingDetails(event, bookingsUpcoming, futureBookings);
});

btnSearchSubmit.addEventListener('click', (event) => {
  searchRooms(event);
});

searchResults.addEventListener('click', (event) => {
  showRoomDetails(event, availableRooms);
});

searchResults.addEventListener('click', (event) => {
  bookRoom(event, searchResults);
});

btnTotalCost.addEventListener('click', () => {
  showTotalCost(userBookings, bookingCostSection);
});

// MODIFIERS //

const show = (names) => {
  names.forEach((name) => name.classList.remove('hidden'));
};

const hide = (names) => {
  names.forEach((name) => name.classList.add('hidden'));
};

// DOM UPDATES //

const checkLogin = (event, data) => {
  event.preventDefault();
  if ((0,_functions_login__WEBPACK_IMPORTED_MODULE_1__.checkPassword)(loginPassword.value)) {
    currentCustomer = (0,_functions_login__WEBPACK_IMPORTED_MODULE_1__.userLogin)(loginUsername.value, data);
  } else {
    loginForm.reset();
    alert('Incorrect password');
    return;
  }
  if (!currentCustomer) {
    loginForm.reset();
    alert('Username not recognized') 
    return;
  }
  userBookings = (0,_functions_find_bookings__WEBPACK_IMPORTED_MODULE_2__.default)(currentCustomer, roomsData, bookingsData);
  getLoggedIn(userBookings, currentCustomer);
};

const getLoggedIn = (bookings) => {
  hide([loginPage]);
  show([mainPage, headerUsername]);
  sortByToday(bookings)
  sortByDate(bookings);
  headerUsername.innerText = currentCustomer.name;
};

const populateBookings = (bookings, section) => {
  section.innerHTML = '';
  bookings.forEach(booking => {
    section.innerHTML += 
      `<div class="booking">
        <p>Room Number: ${booking.roomDetails.number}</p>
        <p>Room Type: ${booking.roomDetails.roomType}</p>
        <p>Date: ${booking.bookingDetails.date}</p>
        <button id=${booking.bookingDetails.id}>View Details</button>
      </div>`;
  });
};

const populateBooking = (booking, section) => {
  section.innerHTML = '';
  section.innerHTML = 
    `<div class="current__booking" id=${booking.bookingDetails.id}>
      <p>Date of Stay: ${booking.bookingDetails.date}</p>
      <p>Room Number: ${booking.bookingDetails.roomNumber}</p>
      <p>Room Type: ${booking.roomDetails.roomType}</p>
      <p>Bidet: ${booking.roomDetails.bidet}</p>
      <p>Bed Size: ${booking.roomDetails.bedSize}</p>
      <p>Number of Beds: ${booking.roomDetails.numBeds}</p>
      <p>Cost Per Night: ${booking.roomDetails.costPerNight}</p>
    </div>`;
};

const populateRooms = (rooms, section) => {
  section.innerHTML = '';
  rooms.forEach(room => {
    section.innerHTML += 
      `<div class="booking">
        <p>Room Number: ${room.number}</p>
        <p>Room Type: ${room.roomType}</p>
        <p>Cost Per Night: ${room.costPerNight}</p>
        <button  id=${room.number}>view details</booking>
      </div>`
  });
};

const populateRoom = (room, section) => {
  if (room) {
    section.innerHTML = '';
    section.innerHTML = 
    `<div class="current__booking">
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number of Beds: ${room.numBeds}</p>
      <p>Cost Per Night: ${room.costPerNight}</p>
      <button class="book__room" id=${room.number}>Book Room</button>
    </div>`
  }
};

const sortByDate = (bookings) => {
  return bookings.sort((a, b) => new Date(a.bookingDetails.date) - new Date(b.bookingDetails.date));
};

const sortByToday = (bookings) => {
  bookingsHistory = [];
  bookingsUpcoming = [];
  const currentDate = new Date();
  bookings.forEach(booking => {
    const bookingDate = new Date(booking.bookingDetails.date);
    if (bookingDate < currentDate) {
      if (!bookingsHistory.includes(booking)) {
        bookingsHistory.push(booking);
      }
    } else {
      if (!bookingsUpcoming.includes(booking)) {
        bookingsUpcoming.push(booking);
      }
    }
  });
}

const showBookingDetails = (event, bookings, section) => {
  bookingsSubheader.innerText = 'Booking Details';
  const target = event.target.id;
  const targetedRoom = bookings.find(booking => booking.bookingDetails.id === target);
  if (targetedRoom) {
    currentRoom = targetedRoom;
    populateBooking(currentRoom, section);
  }
};

const showRoomDetails = (event, rooms) => {
  bookingsSubheader.innerText = 'Room Details';
  const target = parseInt(event.target.id);
  const targetedRoom = rooms.find(room => room.number === target);
  if (targetedRoom) {
    currentRoom = targetedRoom;
    populateRoom(currentRoom, searchResults);
  }
};

const showHistory = () => {
  mainFormContainer.style.height = '10em';
  bookingsSubheader.innerText = 'Past Stays';
  show([pastBookings]);
  hide([futureBookings, searchResults, totalCostSection]);
  sortByDate(bookingsHistory);
  populateBookings(bookingsHistory, pastBookings);
};

const showUpcoming = () => {
  mainFormContainer.style.height = '10em';
  bookingsSubheader.innerText = 'Upcoming Stays';
  show([futureBookings]);
  hide([pastBookings, searchResults, totalCostSection]);
  sortByToday(userBookings);
  populateBookings(bookingsUpcoming, futureBookings);
};

const showTotalCost = (bookings, section) => {
  mainFormContainer.style.height = '10em';
  show([totalCostSection]);
  hide([pastBookings, futureBookings, searchResults])
  const totalCost = (0,_functions_find_total_cost__WEBPACK_IMPORTED_MODULE_4__.default)(bookings).toFixed(2);
  bookingsSubheader.innerText = '';
  totalCostText.innerText = `Total Spent: $${totalCost}`;
  bookings.forEach(booking => {
    section.innerHTML += 
    `<div class="booking__cost">
      <p>Date: ${booking.bookingDetails.date}</p>
      <p>Cost: ${booking.roomDetails.costPerNight}</p>
    </div>`
  })
};

const searchRooms = (event) => {
  event.preventDefault();
  if (!dateInput.value) {
    alert('Please select a date');
    return;
  }
  if (new Date(dateInput.value) < new Date()) {
    alert('Please select a future date');
    return;
  }
  mainFormContainer.style.height = '10em';
  bookingsSubheader.innerText = 'Available Rooms';
  hide([pastBookings, futureBookings, totalCostSection]);
  show([searchResults]);
  const filteredByDate = searchByDate(dateInput, bookingsData);
  availableRooms = (0,_functions_filter_rooms__WEBPACK_IMPORTED_MODULE_3__.getRoomsDetails)(filteredByDate, roomsData);
  if (typeInput.value) {
    const filteredByType = searchByType(typeInput, availableRooms);
    availableRooms = (0,_functions_filter_rooms__WEBPACK_IMPORTED_MODULE_3__.getRoomsDetails)(filteredByType, roomsData);
  }
  if (!availableRooms.length) {
    searchResults.innerHTML = 
      `<div class="booking">
        <p>We are terribly sorry. There are no specified rooms available on ${dateInput.value}.</p>
      </div>`  
  } else {
    populateRooms(availableRooms, searchResults);
  }
};

const searchByDate = (date, bookingsData) => {
  currentDateValue = formatDate(date);
  return (0,_functions_filter_rooms__WEBPACK_IMPORTED_MODULE_3__.filterRoomsByDate)(currentDateValue, bookingsData);
};

const formatDate = (date) => {
  const dateSplit = date.value.split('-');
  return `${dateSplit[0]}/${dateSplit[1]}/${dateSplit[2]}`;
};

const searchByType = (input, data) => {
  const typeFilter = input.value;
  const filteredRooms = (0,_functions_filter_rooms__WEBPACK_IMPORTED_MODULE_3__.filterRoomsByType)(typeFilter, data);
  return filteredRooms;
};

const getBookedRoom = (currentCustomer, currentDate, currentRoom) => {
  const bookedRoom = {
    "userID": currentCustomer.id,
    "date": currentDate,
    "roomNumber": currentRoom.number
  };
  return bookedRoom;
};
  
const postBookedRoom = (data) => {  
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        alert(`${response.status} server request failed, please try again later`)
        console.error('Request failed with status:', response.status)
      }
    })
    .then(json => {
      console.log(json)
      fetch('http://localhost:3001/api/v1/bookings')
        .then(response => response.json())
        .then(data => {
          bookingsData = data.bookings;
          userBookings = (0,_functions_find_bookings__WEBPACK_IMPORTED_MODULE_2__.default)(currentCustomer, roomsData, bookingsData);
          sortByToday(userBookings)
          sortByDate(userBookings);         
        })
    })
    .catch(err => console.log(err));
};

const bookRoom = (event, section) => {
  if (event.target.classList.contains('book__room')) {
    const roomToBook = getBookedRoom(currentCustomer, currentDateValue, currentRoom);
    postBookedRoom(roomToBook);
    section.innerHTML = 
      `<div class="booking">
        <p>Get stoked for your trip! Room #${currentRoom.number} booked by ${currentCustomer.name} for ${currentDateValue}</p>
      </div>`    
  }
};



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map