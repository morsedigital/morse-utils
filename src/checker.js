import {
  forIn
  , includes
  , isArray
  , isElement
} from 'lodash';

const checker = (type, data)=>{
  let valid = false;
  const checks = {
    'Array': isArray
    , 'Boolean': (d)=> typeof d === 'boolean'
    , 'Element': isElement
    , 'Number': (d)=> typeof d === 'number'
    , 'String': (d)=> typeof d === 'string'
  }

  if (!checks.hasOwnProperty(type)) return false;

  const check = checks[type];
  data = (type === 'Element') ? document.getElementById(data) : data;
  return check(data);
}

export default (checks)=>{
  return function(el){
    let keys, valid, chKeys;
    if (!el.dataset) return false;
    keys = Object.keys(el.dataset);
    chKeys = Object.keys(checks);
    valid = chKeys.reduce((test, ch)=>{
      if (!test) return false;
      return includes(keys, ch);
    }, true);
    if (!valid) return valid;

    forIn(checks, function(v, k){
      valid = checker(v, el.dataset[k]);
      return valid;
    });

    return valid;
  };
};
