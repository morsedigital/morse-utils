import checker from '../checker';

import CookieMgmt from '@djforth/cookie_mgmt_fp';

export default (key = 'alerts') => {
  const alertsCookie = CookieMgmt('alerts');
  return {
    check: checker({ alertsreset: 'Boolean' }),
    trigger: function(el, e) {
      e.preventDefault();
      alertsCookie.deleteCookie();
    },
  };
};
