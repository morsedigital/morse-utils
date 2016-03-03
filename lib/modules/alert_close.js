'use strict';

var checker = require('../checker'),
    remover = require('../remove_element');

module.exports = function () {
  return {
    check: checker({ alert: 'Element' }),
    trigger: function trigger(el) {
      remover(el.dataset.alert);
    }
  };
};