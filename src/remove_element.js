import {
  isElement
  , isFunction
} from 'lodash';

export default function(el, cb){
  if (!isElement(el)) return null;
  let parent = el.parentNode || document.body;
  parent.removeChild(el);
  if (isFunction(cb)) cb(el);
};

