'use strict';

var checker = require('../checker'),
    remover = require('../remove_element');

var CookieMgmt = require('@djforth/cookie_mgmt_fp');

var closeAlerts = function closeAlerts(closed) {
  closed.forEach(function (id) {
    remover(document.getElementById(id));
  });
};

module.exports = function () {
  var alertsCookie = CookieMgmt('alerts');
  var value = alertsCookie.getValue();
  var closed = value ? JSON.parse(alertsCookie.getValue()) : [];
  if (closed.length > 0) {
    closeAlerts(closed);
  }

  return {
    check: checker({ alert: 'Element' }),
    trigger: function trigger(el, e) {
      e.preventDefault();

      var id = el.dataset.alert;
      remover(document.getElementById(el.dataset.alert));
      closed.push(id);
      alertsCookie.createCookie(JSON.stringify(closed), 365);
    }
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(closeAlerts, 'closeAlerts', 'src/modules/alert_close.js');
}();

;