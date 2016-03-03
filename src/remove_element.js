var _ = {
  isElement: require('lodash/isElement')
};

module.exports = function(el, cb){
  if (!_.isElement(el)) return null;
  let parent = el.parentNode || document.body;
  parent.removeChild(el);
  cb(el);
};

