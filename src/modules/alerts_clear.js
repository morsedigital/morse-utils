import checker from "../checker";

import { closeAlert, getAlert, getCookie } from "./helpers/alert_helpers";

const closeAlerts = () => {
  const alerts = [...document.querySelectorAll("[data-alert]")];

  return alerts.map(el => {
    const { alert, id } = getAlert(el);
    closeAlert(alert);
    return id;
  });
};

export default name => {
  const { cookie, closed } = getCookie(name);

  if (closed.length > 0) {
    closeAlerts(closed);
  }

  return {
    check: checker({ alertsClear: "Boolean" }),
    trigger: function(el, e) {
      e.preventDefault();
      const updated = closed.concat(closeAlerts());
      cookie.createCookie(JSON.stringify(updated), 365);
    }
  };
};
