import checker from '../checker';
import remover from '../remove_element';

import CookieMgmt from '@djforth/cookie_mgmt_fp';

const closeAlerts = (closed)=>{
  closed.forEach((id)=>{
    remover(document.getElementById(id));
  });
};

export default ()=>{
  let alertsCookie = CookieMgmt('alerts');
  let value = alertsCookie.getValue();
  let closed = (value) ? JSON.parse(alertsCookie.getValue()) : [];
  if (closed.length > 0){
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
