var checker = require('../checker')
  , remover = require('../remove_element');

module.exports = function(){
  return {
    check: checker({alert: 'Element'})
    , trigger: function(el){
      remover(document.getElementById(el.dataset.alert));
    }
  };
};
