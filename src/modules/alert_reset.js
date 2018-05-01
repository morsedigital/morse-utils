import checker from '../checker';
import remover from '../remove_element';

import CookieMgmt from '@djforth/cookie_mgmt_fp';

export default (key = 'alerts') => {
  let alertsCookie = CookieMgmt('alerts');
  return {
    check: checker({ alertsreset: 'Boolean' }),
    trigger: function(el, e) {
      e.preventDefault();
      alertsCookie.deleteCookie();
    },
  };
};
