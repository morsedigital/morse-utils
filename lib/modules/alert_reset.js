'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checker = require('../checker');

var _checker2 = _interopRequireDefault(_checker);

var _remove_element = require('../remove_element');

var _remove_element2 = _interopRequireDefault(_remove_element);

var _cookie_mgmt_fp = require('@djforth/cookie_mgmt_fp');

var _cookie_mgmt_fp2 = _interopRequireDefault(_cookie_mgmt_fp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'alerts';

  var alertsCookie = (0, _cookie_mgmt_fp2.default)('alerts');
  return {
    check: (0, _checker2.default)({ alertsreset: 'Element' }),
    trigger: function trigger(el, e) {
      e.preventDefault();
      alertsCookie.deleteCookie();
    }
  };
};