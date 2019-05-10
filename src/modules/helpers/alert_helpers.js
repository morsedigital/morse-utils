import CookieMgmt from "@djforth/cookie_mgmt_fp";
import remover from "../../remove_element";

export const closeAlert = (el, remove = true) => {
  if (el) {
    el.setAttribute("aria-hidden", "true");
    if (remove) remover(el);
  }
};

export const closeAlerts = (alerts, remove = true) => {
  alerts.forEach(id => {
    remover(document.getElementById(id), remove);
  });
};

export const getAlert = el => {
  const id = el.dataset.alert;
  const alert = document.getElementById(id);

  return { alert, id };
};

export const getCookie = (name = "alerts") => {
  const cookie = CookieMgmt(name);
  const value = cookie.getValue();
  const closed = value ? JSON.parse(cookie.getValue()) : [];
  return { cookie, closed };
};
