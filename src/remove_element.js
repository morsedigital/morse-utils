// import { isElement, isFunction } from 'lodash';

const isElement = el => el instanceof Element;

const isFunction = cb => typeof cb === "function";

export default function(el, cb) {
  if (!isElement(el)) return null;
  const parent = el.parentNode || document.body;
  if (!isElement(parent)) return null;
  parent.removeChild(el);
  if (isFunction(cb)) {
    cb(el);
  }
}
