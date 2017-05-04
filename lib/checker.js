'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

console.log('_', _);

var checker = function checker(type, data) {
  var valid = false;
  var checks = {
    'Array': _lodash.isArray,
    'Boolean': function Boolean(d) {
      return typeof d === 'boolean';
    },
    'Element': _lodash.isElement,
    'Number': function Number(d) {
      return typeof d === 'number';
    },
    'String': function String(d) {
      return typeof d === 'string';
    }
  };

  if (!checks.hasOwnProperty(type)) return false;

  var check = checks[type];
  data = type === 'Element' ? document.getElementById(data) : data;
  return check(data);
};

exports.default = function (checks) {
  return function (el) {
    var keys = void 0,
        valid = void 0,
        chKeys = void 0;
    if (!el.dataset) return false;
    keys = Object.keys(el.dataset);
    chKeys = Object.keys(checks);
    valid = chKeys.reduce(function (test, ch) {
      if (!test) return false;
      return (0, _lodash.includes)(keys, ch);
    }, true);
    if (!valid) return valid;

    (0, _lodash.forIn)(checks, function (v, k) {
      valid = checker(v, el.dataset[k]);
      return valid;
    });

    return valid;
  };
};