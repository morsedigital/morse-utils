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

var closeAlerts = function closeAlerts(closed) {
  closed.forEach(function (id) {
    (0, _remove_element2.default)(document.getElementById(id));
  });
};

exports.default = function () {
  var alertsCookie = (0, _cookie_mgmt_fp2.default)('alerts');
  var value = alertsCookie.getValue();
  var closed = value ? JSON.parse(alertsCookie.getValue()) : [];
  if (closed.length > 0) {
    closeAlerts(closed);
  }

  return {
    check: (0, _checker2.default)({ alert: 'Element' }),
    trigger: function trigger(el, e) {
      e.preventDefault();

      var id = el.dataset.alert;
      (0, _remove_element2.default)(document.getElementById(el.dataset.alert));
      closed.push(id);
      alertsCookie.createCookie(JSON.stringify(closed), 365);
    }
  };
};