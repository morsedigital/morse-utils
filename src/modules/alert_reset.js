var checker = require('../checker')
  , remover = require('../remove_element');

var CookieMgmt = require('@djforth/cookie_mgmt_fp');

module.exports = function(key = 'alerts'){
  var alertsCookie = CookieMgmt('alerts');
  return {
    check: checker({alertsreset: 'Element'})
    , trigger: function(el, e){
      e.preventDefault();
      alertsCookie.deleteCookie();
    }
  };
};