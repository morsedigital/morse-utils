var _ = {
  forEach: require('lodash/forEach')
  , isArray: require('lodash/isArray')
};

function manageEvents(modules){
  return function(e){
    let element = e.target;
    _.forEach(modules, (mod)=>{
      if (mod.check(element)){
        mod.tigger(element, event);
      }
    });
  };
}

module.exports = function(modules){
  if (!_.isArray) throw new Error('Must be array');

  var eventHandler = manageEvents(modules);
  document.body.addEventListener('click', eventHandler, false);

  return function(){
    document.body.removeEventListener('click', eventHandler, false);
  };
};
