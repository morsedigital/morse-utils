'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (modules) {
  if (!_isArray2.default) throw new Error('Must be array');

  var eventHandler = manageEvents(modules);
  document.body.addEventListener('click', eventHandler, false);

  return function () {
    document.body.removeEventListener('click', eventHandler, false);
  };
};

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkParent = function checkParent(check, elm) {
  if (check(elm.parentNode)) return elm.parentNode;
  if (elm.parentNode === document.body) return null;
  return checkParent(check, elm.parentNode);
};

var manageEvents = function manageEvents(modules) {
  return function (e) {
    var element = e.target;

    modules.forEach(function (mod) {
      var check = mod.check,
          trigger = mod.trigger;


      if (check(element)) {
        trigger(element, e);
      } else {
        var elm = checkParent(check, element);
        if (elm) trigger(elm, e);
      }
    });
  };
};

;