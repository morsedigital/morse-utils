'use strict';

var CookieMgmt = require('@djforth/cookie_mgmt_fp');

var checker = require('../checker'),
    remover = require('../remove_element');

module.exports = function (id) {
  var permission = CookieMgmt('permission');
  if (permission.getValue()) remover(id);
  return {
    check: checker({ cookiebar: 'Element' }),
    trigger: function trigger(el) {
      remover(el.dataset.cookiebar);
      permission.createCookie(true, 365);
    }
  };
};