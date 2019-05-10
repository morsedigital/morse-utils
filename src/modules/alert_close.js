import checker from "../checker";

import {
  closeAlert,
  closeAlerts,
  getAlert,
  getCookie
} from "./helpers/alert_helpers";

export default name => {
  const { cookie, closed } = getCookie(name);

  if (closed.length > 0) {
    closeAlerts(closed);
  }

  return {
    check: checker({ alert: "Element" }),
    trigger: (el, e) => {
      e.preventDefault();
      el.setAttribute("aria-pressed", "true");

      const { alert, id } = getAlert(el);
      closeAlert(alert, false);

      closed.push(id);
      cookie.createCookie(JSON.stringify(closed), 365);
    }
  };
};
