import CookieMgmt from '@djforth/cookie_mgmt_fp';
import checker from '../checker';
import remover from '../remove_element';

export default id => {
  let permission = CookieMgmt('permission');
  if (permission.getValue()) remover(document.getElementById(id));
  return {
    check: checker({ cookiebar: 'Element' }),
    trigger: (el, e) => {
      e.preventDefault();
      remover(document.getElementById(el.dataset.cookiebar));
      permission.createCookie(true, 365);
    },
  };
};
