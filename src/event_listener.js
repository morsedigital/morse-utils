import {
  isArray
  , isElement
} from 'lodash';

const checkParent = (check, elm)=>{
  if (!isElement(elm.parentNode)) return null;
  if (check(elm.parentNode)) return elm.parentNode;
  if (elm.parentNode === document.body) return null;
  return checkParent(check, elm.parentNode)
}

const manageEvents = (modules)=>{
  return function(e){
    let element = e.target;

    modules.forEach((mod)=>{
      let {check, trigger} = mod;

      if (check(element)){
        trigger(element, e);
      } else {
        const elm = checkParent(check, element);
        if (elm) trigger(elm, e);
      }
    });
  };
}

export default function(modules){
  if (!isArray) throw new Error('Must be array');

  var eventHandler = manageEvents(modules);
  document.body.addEventListener('click', eventHandler, false);

  return function(){
    document.body.removeEventListener('click', eventHandler, false);
  };
};
