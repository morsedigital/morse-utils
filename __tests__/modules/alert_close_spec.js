/* eslint-env browser, jasmine */

import Alert from '../../src/modules/alert_close';

import {CookieManager, Checker} from '../utils/create_stubs';

import ModuleCheck from '../utils/module_check';

/* eslint-disable */
const checkMulti = require('@djforth/morse-jasmine-wp/check_multiple_calls')
  , createEl = require('@djforth/morse-jasmine-wp/create_elements').createHolder
  , getMod = require('@djforth/morse-jasmine-wp/get_module')(Alert)
  , removeEl = require('@djforth/morse-jasmine-wp/create_elements').removeElement
  , spyManager = require('@djforth/morse-jasmine-wp/spy_manager')()
  , stubs      = require('@djforth/morse-jasmine-wp/stub_inner')(Alert);
/* eslint-enable */
const cookieManager = CookieManager(stubs, spyManager);
const checker = Checker(stubs, spyManager);

const modCheck = ModuleCheck(spyManager);

describe('Module/Alert_close', function(){
  let holder, el, closer;
  beforeEach(function(){
    checker();
    stubs.add('remover');
    holder = createEl('alert-holder');
  });

  afterEach(function(){
    removeEl(holder);
    if (el && el.parentNode) removeEl(el);
    stubs.revertAll();
    spyManager.removeAll();
  });

  describe('closeAlerts', function() {
    let closeAlerts, ids, els;
    beforeEach(function(){
      closeAlerts = getMod('closeAlerts');
      ids = ['alert-1', 'alert-2'];
      els = ids.map((id)=>createEl(id));
      closeAlerts(ids);
    });

    afterEach(()=>{
      els.forEach((el)=>removeEl(el));
    });

    let calls = {
      remover0:[()=>stubs.get('remover')
      , ()=>[els[0]]]
      , remover1:[()=>stubs.get('remover')
      , ()=>[els[1]], 1]
    };

    checkMulti(calls);
  });

  describe('main function if cookie data', function(){
    beforeEach(function(){
      stubs.add(['remover', 'closeAlerts']);
      cookieManager('alertsCookie', JSON.stringify(['alert1']));
      closer = Alert();
    });

    modCheck(()=>closer);

    describe('should check if element has attributes', function(){
      let calls = {
        'checker': [()=>stubs.get('checker')
        , ()=>[{alert: 'Element'}]]
        , 'CookieMgmt': [()=>stubs.get('CookieMgmt')
        , ()=>['alerts']]
        , 'alertsCookie.getValue': [()=>spyManager.get('alertsCookie').getValue
        , ()=>[]]
        , 'closeAlerts': [()=>stubs.get('closeAlerts')
        , ()=>[['alert1']]]
      };
      checkMulti(calls);
    });

    describe('trigger', function(){
      beforeEach(function(){
        spyManager.add({title: 'event', opts: ['preventDefault']});
        el = createEl('alert');
        el.dataset.alert = 'alert-holder';
        closer.trigger(el, spyManager.getSpy('event'));
      });

      afterEach(function(){
        removeEl(el);
      });

      let cookieData = JSON.stringify(['alert1', 'alert-holder']);

      let calls = {
        'event.preventDefault': ()=>spyManager.get('event').preventDefault
        , 'remover': [()=>stubs.get('remover')
        , ()=>[holder]]
        , 'alertsCookie.createCookie': [
          ()=>spyManager.get('alertsCookie').createCookie
          , ()=>[cookieData, 365]
        ]
      };
      checkMulti(calls);
    });
  });

  describe('main function if no cookie data', function(){
    beforeEach(function(){
      stubs.add(['remover', 'closeAlerts']);
      cookieManager('alertsCookie', undefined);
      closer = Alert();
    });

    modCheck(()=>closer);

    describe('should check if element has attributes', function(){
      let calls = {
        'checker': [()=>stubs.get('checker')
        , ()=>[{alert: 'Element'}]]
        , 'CookieMgmt': [()=>stubs.get('CookieMgmt')
        , ()=>['alerts']]
        , 'alertsCookie.getValue': ()=>spyManager.get('alertsCookie').getValue
      };
      checkMulti(calls);

      it('should not call closeAlerts', function(){
        expect(stubs.get('closeAlerts')).not.toHaveBeenCalled();
      });
    });

    describe('trigger', function(){
      beforeEach(function(){
        spyManager.add({title: 'event', opts: ['preventDefault']});
        el = createEl('alert');
        el.dataset.alert = 'alert-holder';
        closer.trigger(el, spyManager.getSpy('event'));
      });

      afterEach(function(){
        removeEl(el);
      });

      let cookieData = JSON.stringify(['alert-holder']);

      let calls = {
        'event.preventDefault': ()=>spyManager.get('event').preventDefault
        , 'remover': [()=>stubs.get('remover')
        , ()=>[holder]]
        , 'alertsCookie.createCookie': [
          ()=>spyManager.get('alertsCookie').createCookie
          , ()=>[cookieData, 365]
        ]
      };
      checkMulti(calls);
    });
  });
});
