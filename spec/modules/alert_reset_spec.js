/* eslint-env browser, jasmine */

import AlertReset from '../../src/modules/alert_reset';

import {CookieManager, Checker} from '../utils/create_stubs';

import ModuelCheck from '../utils/module_check';

/* eslint-disable */
const checkMulti = require('@djforth/morse-jasmine-wp/check_multiple_calls')
  , createEl = require('@djforth/morse-jasmine-wp/create_elements').createHolder
  , removeEl = require('@djforth/morse-jasmine-wp/create_elements').removeElement
  , spyManager = require('@djforth/morse-jasmine-wp/spy_manager')()
  , stubs      = require('@djforth/morse-jasmine-wp/stub_inner')(AlertReset);
/* eslint-enable */
const cookieManager = CookieManager(stubs, spyManager);
const checker = Checker(stubs, spyManager);

const modCheck = ModuelCheck(spyManager);

describe('Module/Alert_reset', function(){
  let holder, el, reset;
  beforeEach(function(){
    checker();
    stubs.add('remover');
    holder = createEl('alert-reset');
  });

  afterEach(function(){
    removeEl(holder);
    if (el && el.parentNode) removeEl(el);
    stubs.revertAll();
    spyManager.removeAll();
  });

  describe('main function', function(){
    beforeEach(function(){
      stubs.add(['remover', 'closeAlerts']);
      cookieManager('alertsCookie', JSON.stringify(['alert1']));
      reset = AlertReset();
    });

    modCheck(()=>reset);

    describe('should check if element has attributes', function(){
      let calls = {
        'checker': [()=>stubs.get('checker')
        , ()=>[{alertsreset: 'Element'}]]
        , 'CookieMgmt': [()=>stubs.get('CookieMgmt')
        , ()=>['alerts']]
      };
      checkMulti(calls);
    });

    describe('trigger', function(){
      beforeEach(function(){
        spyManager.add({title: 'event', opts: ['preventDefault']});
        el = createEl('alert');
        el.dataset.alertreset = 'alert-holder';
        reset.trigger(el, spyManager.get('event'));
      });

      afterEach(function(){
        removeEl(el);
      });

      let calls = {
        'event.preventDefault': ()=>spyManager.get('event').preventDefault
        , 'alertsCookie.deleteCookie':
          ()=>spyManager.get('alertsCookie').deleteCookie
      };
      checkMulti(calls);
    });
  });
});
