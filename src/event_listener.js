import isArray from 'lodash/isArray';

const checkParent = (check, elm) => {
  if (elm === document.body) return null;
  if (check(elm.parentNode)) return elm.parentNode;
  if (elm.parentNode === document.body) return null;
  return checkParent(check, elm.parentNode);
};

const manageEvents = modules =>
  function(e) {
    let element = e.target;

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
  if (!isArray) throw new Error('Must be array');

  let eventHandler = manageEvents(modules);
  document.body.addEventListener('click', eventHandler, false);

  return function() {
    document.body.removeEventListener('click', eventHandler, false);
  };
}
