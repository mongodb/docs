/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _util = __webpack_require__(1);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  _util2.default.setupSidebar();
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _domSlider = __webpack_require__(2);
	
	var _domSlider2 = _interopRequireDefault(_domSlider);
	
	var _elementClass = __webpack_require__(3);
	
	var _elementClass2 = _interopRequireDefault(_elementClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var utils = {
	  setupCopyButtons: function setupCopyButtons() {
	    var copyableBlocks = document.getElementsByClassName('highlight');
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      var _loop = function _loop() {
	        var highlightElement = _step.value;
	
	        var text = highlightElement.innerText.trim();
	        var copyButtonContainer = document.createElement('div');
	        var copyButton = document.createElement('button');
	        copyButtonContainer.className = 'copy-button-container';
	        copyButton.className = 'copy-button';
	        copyButton.appendChild(document.createTextNode('Copy'));
	        copyButtonContainer.appendChild(copyButton);
	        highlightElement.insertBefore(copyButtonContainer, highlightElement.children[0]);
	        copyButton.addEventListener('click', function () {
	          var tempElement = document.createElement('textarea');
	          document.body.appendChild(tempElement);
	          tempElement.value = text;
	          tempElement.select();
	
	          try {
	            var successful = document.execCommand('copy');
	            if (!successful) {
	              throw new Error('Failed to copy');
	            }
	          } catch (err) {
	            console.error('Failed to copy');
	            console.error(err);
	          }
	
	          document.body.removeChild(tempElement);
	        });
	      };
	
	      for (var _iterator = copyableBlocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        _loop();
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  },
	  setupSidebar: function setupSidebar() {
	    var tocLinks = document.querySelectorAll('.toc__link');
	
	    tocLinks.forEach(function (link) {
	      // handle opening & closing of the toc
	      var nestedList = link.nextElementSibling;
	
	      if (nestedList) {
	        link.addEventListener('click', function (e) {
	          (0, _elementClass2.default)(link).toggle('toc__link--open');
	          nestedList.slideToggle(400);
	        });
	      }
	
	      link.addEventListener('click', function (e) {
	        tocLinks.forEach(function (l) {
	          return (0, _elementClass2.default)(l).remove('toc__link--active');
	        });
	        (0, _elementClass2.default)(link).add('toc__link--active');
	      });
	    });
	  },
	
	
	  // this is currently only used on the landing pages
	  setupList: function setupList() {
	    var links = document.querySelectorAll('.list__item__title');
	
	    links.forEach(function (link) {
	      var nestedList = link.nextElementSibling;
	
	      link.parentElement.addEventListener('click', function (e) {
	        (0, _elementClass2.default)(link).toggle('list__item--open');
	        nestedList.slideToggle(400);
	      });
	    });
	  }
	};
	
	exports.default = utils;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	// Array.isArray polyfill and Array.from polyfill
	
	Array.from || (Array.from = function () {
	    var a = Object.prototype.toString,
	        b = function b(_b) {
	        return "function" == typeof _b || "[object Function]" === a.call(_b);
	    },
	        c = function c(a) {
	        var b = Number(a);return isNaN(b) ? 0 : 0 !== b && isFinite(b) ? (b > 0 ? 1 : -1) * Math.floor(Math.abs(b)) : b;
	    },
	        d = Math.pow(2, 53) - 1,
	        e = function e(a) {
	        var b = c(a);return Math.min(Math.max(b, 0), d);
	    };return function (c) {
	        var d = this,
	            f = Object(c);if (null == c) throw new TypeError("Array.from requires an array-like object - not null or undefined");var h,
	            g = arguments.length > 1 ? arguments[1] : void 0;if ("undefined" != typeof g) {
	            if (!b(g)) throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length > 2 && (h = arguments[2]);
	        }for (var l, i = e(f.length), j = b(d) ? Object(new d(i)) : new Array(i), k = 0; k < i;) {
	            l = f[k], g ? j[k] = "undefined" == typeof h ? g(l, k) : g.call(h, l, k) : j[k] = l, k += 1;
	        }return j.length = i, j;
	    };
	}());
	function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	            arr2[i] = arr[i];
	        }return arr2;
	    } else {
	        return Array.from(arr);
	    }
	}
	
	function slide(element, _speed, direction, easing) {
	    // prevent user from sliding down if already sliding
	    if (direction === 'down' && ([].concat(_toConsumableArray(element.classList)).some(function (e) {
	        return new RegExp(/setHeight/).test(e);
	    }) || !element.classList.contains('DOM-slider-hidden'))) return false;
	
	    // prevent user from sliding up if already sliding
	    if (direction === 'up' && (element.classList.contains('DOM-slider-hidden') || [].concat(_toConsumableArray(element.classList)).some(function (e) {
	        return new RegExp(/setHeight/).test(e);
	    }))) return false;
	
	    var s = element.style;
	    var speed = _speed ? _speed : _speed === 0 ? 0 : 300;
	    var contentHeight = element.scrollHeight;
	
	    // subtract padding from contentHeight
	    if (direction === 'up') {
	        var style = window.getComputedStyle(element);
	        var paddingTop = +style.getPropertyValue('padding-top').split('px')[0];
	        var paddingBottom = +style.getPropertyValue('padding-bottom').split('px')[0];
	        contentHeight = element.scrollHeight - paddingTop - paddingBottom;
	    }
	
	    // create a setHeight CSS class
	    var sheet = document.createElement('style');
	    // create an id for each class to allow multiple elements to slide
	    // at the same time, such as when activated by a forEach loop
	    var setHeightId = (Date.now() * Math.random()).toFixed(0);
	    sheet.innerHTML = '.setHeight-' + setHeightId + ' {height: ' + contentHeight + 'px;}';
	    document.head.appendChild(sheet);
	
	    // add the CSS classes that will give the computer a fixed starting point
	    if (direction === 'up') {
	        element.classList.add('setHeight-' + setHeightId);
	    } else {
	        element.classList.add('DOM-slider-hidden', 'setHeight-' + setHeightId);
	    }
	
	    s.transition = 'all ' + speed + 'ms ' + (easing || '');
	    s.overflow = 'hidden';
	
	    // add/remove the CSS class(s) that will animate the element
	    if (direction === 'up') {
	        // Don't know why, but waiting 10 milliseconds before adding
	        // the 'hidden' class when sliding up prevents height-jumping
	        setTimeout(function () {
	            element.classList.add('DOM-slider-hidden');
	        }, 10);
	    } else {
	        element.classList.remove('DOM-slider-hidden');
	    }
	
	    var done = new Promise(function (resolve, reject) {
	        setTimeout(function () {
	            // remove the temporary inline styles and remove the temp stylesheet
	            element.removeAttribute('style');
	            sheet.parentNode.removeChild(sheet);
	            element.classList.remove('setHeight-' + setHeightId);
	            resolve(element);
	        }, speed);
	    });
	
	    return done;
	}
	
	function printStyles() {
	    var hiddenElements = void 0;
	
	    function showContent() {
	        console.log('before print');
	        hiddenElements = document.querySelectorAll('.DOM-slider-hidden');
	        hiddenElements.forEach(function (element) {
	            element.classList.remove('DOM-slider-hidden');
	        });
	    }
	
	    function hideContent() {
	        console.log('after print');
	        hiddenElements.forEach(function (element) {
	            element.classList.add('DOM-slider-hidden');
	        });
	    }
	
	    window.onbeforeprint = showContent;
	    window.onafterprint = hideContent;
	
	    var mediaQueryList = window.matchMedia('print');
	    mediaQueryList.addListener(function (mql) {
	        if (mql.matches) {
	            showContent();
	            setTimeout(hideContent, 500);
	        };
	    });
	}
	
	(function DOMsliderInit() {
	    var sheet = document.createElement('style');
	    sheet.id = 'slideCSSClasses';
	    sheet.innerHTML = '\n    .DOM-slider-hidden {\n        height: 0 !important;\n        padding-top: 0 !important;\n        padding-bottom: 0 !important;\n        border-top-width: 0 !important;\n        border-bottom-width: 0 !important;\n        margin-top: 0 !important;\n        margin-bottom: 0 !important;\n        overflow: hidden !important;\n    }\n    ';
	    document.head.appendChild(sheet);
	
	    Object.prototype.slideDown = function (_speed, easing) {
	        return slide(this, _speed, 'down', easing);
	    };
	
	    Object.prototype.slideUp = function (_speed, easing) {
	        return slide(this, _speed, 'up', easing);
	    };
	
	    Object.prototype.slideToggle = function (_speed, easing) {
	        if (this.classList.contains('DOM-slider-hidden')) {
	            return slide(this, _speed, 'down', easing);
	        } else {
	            return slide(this, _speed, 'up', easing);
	        }
	    };
	
	    printStyles();
	})();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	module.exports = function (opts) {
	  return new ElementClass(opts);
	};
	
	function indexOf(arr, prop) {
	  if (arr.indexOf) return arr.indexOf(prop);
	  for (var i = 0, len = arr.length; i < len; i++) {
	    if (arr[i] === prop) return i;
	  }return -1;
	}
	
	function ElementClass(opts) {
	  if (!(this instanceof ElementClass)) return new ElementClass(opts);
	  var self = this;
	  if (!opts) opts = {};
	
	  // similar doing instanceof HTMLElement but works in IE8
	  if (opts.nodeType) opts = { el: opts };
	
	  this.opts = opts;
	  this.el = opts.el || document.body;
	  if (_typeof(this.el) !== 'object') this.el = document.querySelector(this.el);
	}
	
	ElementClass.prototype.add = function (className) {
	  var el = this.el;
	  if (!el) return;
	  if (el.className === "") return el.className = className;
	  var classes = el.className.split(' ');
	  if (indexOf(classes, className) > -1) return classes;
	  classes.push(className);
	  el.className = classes.join(' ');
	  return classes;
	};
	
	ElementClass.prototype.remove = function (className) {
	  var el = this.el;
	  if (!el) return;
	  if (el.className === "") return;
	  var classes = el.className.split(' ');
	  var idx = indexOf(classes, className);
	  if (idx > -1) classes.splice(idx, 1);
	  el.className = classes.join(' ');
	  return classes;
	};
	
	ElementClass.prototype.has = function (className) {
	  var el = this.el;
	  if (!el) return;
	  var classes = el.className.split(' ');
	  return indexOf(classes, className) > -1;
	};
	
	ElementClass.prototype.toggle = function (className) {
	  var el = this.el;
	  if (!el) return;
	  if (this.has(className)) this.remove(className);else this.add(className);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=landing-sidebar.js.map