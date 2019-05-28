import CookieMgmt from "@djforth/cookie_mgmt_fp";
import checker from "../checker";
import remover from "../remove_element";

const closeCookie = (el, remove = false) => {
  if (el) {
    el.setAttribute("aria-hidden", "true");
    el.style.display = "none";
    if (remove) remover(el);
  }
};

export default id => {
  const permission = CookieMgmt("permission");
  if (permission.getValue()) remover(document.getElementById(id));
  return {
    check: checker({ cookiebar: "Element" }),
    trigger: (el, e) => {
      e.preventDefault();
      closeCookie(document.getElementById(el.dataset.cookiebar));
      // console.log('create');
      permission.createCookie(true, 365);
    }
  };
};
