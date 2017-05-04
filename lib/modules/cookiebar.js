'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cookie_mgmt_fp = require('@djforth/cookie_mgmt_fp');

var _cookie_mgmt_fp2 = _interopRequireDefault(_cookie_mgmt_fp);

var _checker = require('../checker');

var _checker2 = _interopRequireDefault(_checker);

var _remove_element = require('../remove_element');

var _remove_element2 = _interopRequireDefault(_remove_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (id) {
  var permission = (0, _cookie_mgmt_fp2.default)('permission');
  if (permission.getValue()) (0, _remove_element2.default)(document.getElementById(id));
  return {
    check: (0, _checker2.default)({ cookiebar: 'Element' }),
    trigger: function trigger(el, e) {
      e.preventDefault();
      (0, _remove_element2.default)(document.getElementById(el.dataset.cookiebar));
      permission.createCookie(true, 365);
    }
  };
};