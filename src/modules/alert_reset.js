import checker from "../checker";

import CookieMgmt from "@djforth/cookie_mgmt_fp";

export default (key = "alerts") => {
  const alertsCookie = CookieMgmt("alerts");
  return {
    check: checker({ alertsReset: "Boolean" }),
    trigger: function(el, e) {
      e.preventDefault();
      alertsCookie.deleteCookie();
      document.location.reload();
    }
  };
};
