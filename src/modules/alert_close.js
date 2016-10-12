var checker = require('../checker')
  , remover = require('../remove_element');

var CookieMgmt = require('@djforth/cookie_mgmt_fp');

const closeAlerts = (closed)=>{
  closed.forEach((id)=>{
    remover(document.getElementById(id));
  });
};

module.exports = function(){
  var alertsCookie = CookieMgmt('alerts');
  var value = alertsCookie.getValue();
  var closed = (value) ? JSON.parse(alertsCookie.getValue()) : [];
  if(closed.length > 0){
    closeAlerts(closed);
  }

  return {
    check: checker({alert: 'Element'})
    , trigger: function(el, e){
      e.preventDefault();

      const id = el.dataset.alert;
      remover(document.getElementById(el.dataset.alert));
      closed.push(id);
      alertsCookie.createCookie(JSON.stringify(closed), 365);
    }
  };
};
