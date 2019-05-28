const checkParent = (check, elm) => {
  if (elm === document.body) return null;
  if (check(elm.parentNode)) return elm.parentNode;
  if (elm.parentNode === document.body) return null;
  return checkParent(check, elm.parentNode);
};

const manageEvents = modules =>
  function(e) {
    const element = e.target;
    modules.forEach(({ check, trigger }) => {
      if (check(element)) {
        trigger(element, e);
      } else {
        const elm = checkParent(check, element);
        if (elm) trigger(elm, e);
      }
    });
  };

export default function(modules) {
  if (!Array.isArray(modules)) throw new Error("Must be array");

  const eventHandler = manageEvents(modules);
  document.body.addEventListener("click", eventHandler, false);

  return function() {
    document.body.removeEventListener("click", eventHandler, false);
  };
}
