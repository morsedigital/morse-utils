'use strict';

var checker = require('../checker'),
    remover = require('../remove_element');

var CookieMgmt = require('@djforth/cookie_mgmt_fp');

module.exports = function () {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'alerts';

  var alertsCookie = CookieMgmt('alerts');
  return {
    check: checker({ alertsreset: 'Element' }),
    trigger: function trigger(el, e) {
      e.preventDefault();
      alertsCookie.deleteCookie();
    }
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;