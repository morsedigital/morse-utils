/* eslint-env browser, jasmine */
import _ from 'lodash';

import event_listener from '../src/event_listener';

import checkCalls from '@djforth/morse-jasmine-wp/check_calls';
import checkMulti from '@djforth/morse-jasmine-wp/check_multiple_calls';
import GetMod from '@djforth/morse-jasmine-wp/get_module';
const getMod = GetMod(event_listener);
import sim_event from '@djforth/morse-jasmine-wp/simulate_click';
import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
const spyManager = SpyManager();
import Stubs from '@djforth/morse-jasmine-wp/stub_inner';
const stubs = Stubs(event_listener);
import stub_chain from '@djforth/morse-jasmine-wp/stub_chain_methods';

describe('event_listener', function() {
  let listener;
  beforeEach(function() {
    stub_chain.addConstructor('module0', ['check', 'trigger'])
        .addConstructor('module1', ['check', 'trigger'])
  });

  afterEach(function () {
    stub_chain.removeAll();
    spyManager.removeAll()
  });

  describe('manageEvents', function() {
    let manageEvents;
    beforeEach(function () {
      manageEvents = getMod('manageEvents');

      spyManager.addSpy([
        {title:'mod1', opts:['check', 'trigger']}
        , {title:'mod2', opts:['check', 'trigger']}
      ]);

      spyManager.getSpy('mod1').check.and.returnValue(true);
      spyManager.getSpy('mod2').check.and.returnValue(false);

      stubs.addSpy('checkParent');

      stubs.getSpy('checkParent').and.returnValue(null);

      let em = manageEvents([spyManager.getSpy('mod1'), spyManager.getSpy('mod2')]);
      em({target:'elementTarget'})
    });

    let calls = {
      'mod1.check':[()=> spyManager.getSpy('mod1').check
      , ['elementTarget']
      ]
    , 'mod2.check':[()=> spyManager.getSpy('mod2').check
      , ['elementTarget']
      ]
    , 'mod1.trigger':[()=> spyManager.getSpy('mod1').trigger
      , ['elementTarget']
      ]
    };

    checkMulti(calls);

    it('should not call mod2.trigger', function() {
      expect(spyManager.getSpy('mod2').trigger).not.toHaveBeenCalled()
    });
  });

  describe('Add events', function() {
    let modules;
    beforeEach(function () {
      spyManager.addSpy('event_listener');
      stubs.addSpy('manageEvents');
      stubs.getSpy('manageEvents').and.returnValue(spyManager.getSpy('event_listener'));

      modules = [
        stub_chain.getConstructor('module0')
        , stub_chain.getConstructor('module1')
      ];
      listener = event_listener(modules);
    });

    checkCalls(()=>stubs.getSpy('manageEvents')
      , 'manageEvents', ()=>[modules]
    );

    it('should apply click to body', function() {
      sim_event(document.body, 'click');
      expect(spyManager.getSpy('event_listener')).toHaveBeenCalled();
    });

    it('should remove event', function() {
      let spy = spyManager.getSpy('event_listener');
      expect(_.isFunction(listener)).toBeTruthy()
      listener();
      sim_event(document.body, 'click');
      expect(spyManager.getSpy('event_listener')).not.toHaveBeenCalled();
    });
  });
});