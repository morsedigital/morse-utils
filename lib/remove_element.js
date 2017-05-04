'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (el, cb) {
  if (!(0, _lodash.isElement)(el)) return null;
  var parent = el.parentNode || document.body;
  parent.removeChild(el);
  if ((0, _lodash.isFunction)(cb)) cb(el);
};

var _lodash = require('lodash');

;