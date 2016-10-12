'use strict';

var _ = {
  isElement: require('lodash/isElement'),
  isFunction: require('lodash/isFunction')
};

module.exports = function (el, cb) {
  if (!_.isElement(el)) return null;
  var parent = el.parentNode || document.body;
  parent.removeChild(el);
  if (_.isFunction(cb)) cb(el);
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_, '_', 'src/remove_element.js');
}();

;