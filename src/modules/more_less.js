import checker from "../checker";

const moreText = "Read More";
const lessText = "Read Less";

const getElement = (el, attr) => {
  return document.getElementById(el.dataset[attr]);
};

const getPressed = el => {
  const pressed = el.getAttribute("aria-pressed") === "true";

  el.setAttribute("aria-pressed", !pressed);
  el.textContent = pressed ? moreText : lessText;
  return pressed;
};

export default () => {
  return {
    check: checker({ more: "Element", less: "Element" }),
    trigger: (el, e) => {
      e.preventDefault();
      const more = getElement(el, "more");
      const less = getElement(el, "less");

      const pressed = getPressed(el);

      more.setAttribute("aria-hidden", pressed);

      less.setAttribute("aria-hidden", !pressed);
    }
  };
};
