'use strict';

var _ = {
  isElement: require('lodash/isElement')
};

module.exports = function (el, cb) {
  if (!_.isElement(el)) return null;
  var parent = el.parentNode || document.body;
  parent.removeChild(el);
  cb(el);
};