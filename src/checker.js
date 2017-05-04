var _ = {
  forIn: require('lodash/forIn')
  , keys: require('lodash/keys')
  , includes: require('lodash/includes')
  , isArray: require('lodash/isArray')
  , isBoolean: require('lodash/isBoolean')
  , isElement: require('lodash/isElement')
  , isNumber: require('lodash/isNumber')
  , isString: require('lodash/isString')
  , reduce: require('lodash/reduce')
};

function checker(type, data){
  let valid = false;
  switch (type){
    case 'Array':
      valid = _.isArray(data);
      break;
    case 'Boolean':
      valid = _.isBoolean(data);
      break;
    case 'Element':
      valid = _.isElement(document.getElementById(data));
      break;
    case 'ElementClass':
      valid = _.isElement(document.querySelector(`.${data}`));
      break;
    case 'Number':
      valid = _.isNumber(data);
      break;
    case 'String':
      valid = _.isString(data);
      break;
    default:
      valid = false;
  }

  return valid;
}

module.exports = function(checks){
  return function(el){
    let keys, valid;
    if (!el.dataset) return false;
    keys = _.keys(el.dataset);
    valid = _.reduce(_.keys(checks), (test, ch)=>{
      if (!test) return false;
      return _.includes(keys, ch);
    }, true);
    if (!valid) return valid;

    _.forIn(checks, function(v, k){
      valid = checker(v, el.dataset[k]);
      return valid;
    });

    return valid;
  };
};
