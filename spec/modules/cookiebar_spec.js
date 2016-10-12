/* eslint-env browser, jasmine */
var Cookiebar = require('../../src/modules/cookiebar');

import {CookieManager, Checker} from '../utils/create_stubs';
import ModuelCheck from '../utils/module_check';

/* eslint-disable */
const checkMulti = require('@djforth/morse-jasmine-wp/check_multiple_calls')
  , checkCalls = require('@djforth/morse-jasmine-wp/check_calls')
  , createEl = require('@djforth/morse-jasmine-wp/create_elements').createHolder
  , removeEl = require('@djforth/morse-jasmine-wp/create_elements').removeElement
  , sim_event = require('@djforth/morse-jasmine-wp/simulate_click')
  , spyManager = require('@djforth/morse-jasmine-wp/spy_manager')()
  , stubs      = require('@djforth/morse-jasmine-wp/stub_inner')(Cookiebar)
  , stub_chain = require('@djforth/morse-jasmine-wp/stub_chain_methods');
/* eslint-enable */
const cookieManager = CookieManager(stubs, spyManager);
const checker = Checker(stubs, spyManager);
const modCheck = ModuelCheck(spyManager);

describe('Module/Cookiebar_close', function(){
  let holder, el, cookiebar;
  beforeEach(function(){
    checker();
    stubs.add('remover');
    holder = createEl('cookiebar-holder');
    // cookiebar = Cookiebar()
  });

  afterEach(function(){
    removeEl(holder);
    if (el && el.parentNode) removeEl(el);
    stubs.revertAll();
    spyManager.removeAll();
  });

  describe('when there is a cookie', function(){
    beforeEach(function(){
      cookieManager('permission', true);
      cookiebar = Cookiebar('cookiebar-holder');
    });

    modCheck(()=>cookiebar);

    let calls = {
      'checker': [()=>stubs.get('checker')
      , ()=>[{cookiebar: 'Element'}]]
      , 'CookieMgmt': [()=>stubs.get('CookieMgmt')
      , ()=>['permission']]
      , 'permission.getValue': [()=>spyManager.get('permission').getValue
      , ()=>[]]
      , 'remover': [()=>stubs.get('remover')
        , ()=>[holder]]
    };
    checkMulti(calls);

    // checkCalls(()=>stubs.get('CookieMgmt')
    //   , 'CookieMgmt', ['permission'])

    // checkCalls(()=>spyManager.get('permission').getValue
    //   , 'permission.getValue')

    // checkCalls(()=>stubs.get('remover')
    //   , 'remover', ()=>[holder])
  });

  describe('when no cookie', function(){
    beforeEach(function(){
      cookieManager('permission', false);
      cookiebar = Cookiebar();
    });

    modCheck(()=>cookiebar);

    let calls = {
      'checker': [()=>stubs.get('checker')
      , ()=>[{cookiebar: 'Element'}]]
      , 'CookieMgmt': [()=>stubs.get('CookieMgmt')
      , ()=>['permission']]
      , 'permission.getValue': [()=>spyManager.get('permission').getValue
      , ()=>[]]
    };
    checkMulti(calls);

    it('should not call remover', function() {
      expect(stubs.get('remover')).not.toHaveBeenCalled()
    });
  });

  describe('trigger', function(){
    beforeEach(function(){
      cookieManager('permission', false);
      cookiebar = Cookiebar();

      spyManager.add({title:'event', opts:['preventDefault']});
      el = createEl('cookiebar');
      el.dataset.cookiebar = 'cookiebar-holder';
      cookiebar.trigger(el, spyManager.get('event'));
    });

    let calls = {
      'event.preventDefault': ()=>spyManager.get('event').preventDefault
      , 'remover': [()=>stubs.get('remover')
      , ()=>[holder]]
      , 'permission.createCookie': [
        ()=>spyManager.get('permission').createCookie
        , ()=>[true, 365]
      ]
    };
    checkMulti(calls);
  });
});
