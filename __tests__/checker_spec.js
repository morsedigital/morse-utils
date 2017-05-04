import _ from 'lodash';

import checker from '../src/checker';

import checkCalls from '@djforth/morse-jasmine-wp/check_calls';
import {createHolder as createEl} from '@djforth/morse-jasmine-wp/create_elements';
import GetMod from '@djforth/morse-jasmine-wp/get_module';
const getMod = GetMod(checker);
import {removeElement as removeEl} from '@djforth/morse-jasmine-wp/create_elements';
import sim_event from '@djforth/morse-jasmine-wp/simulate_click';
import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
const spyManager = SpyManager();
import Stubs from '@djforth/morse-jasmine-wp/stub_inner';
const stubs = Stubs(checker);
import stub_chain from '@djforth/morse-jasmine-wp/stub_chain_methods';

function setData(el, data){
  _.forIn(data, (v, k)=>{
      el.dataset[k] = JSON.stringify(v)
    })
}

describe('checker', function() {
  let el, check;
  let mock = {
    string:'String'
    , intiger:'String'
    , boolean:false
    , element:'some-id'
    , array:[]
  };

  describe('checker', function() {
    let ch, testEl;
    beforeEach(function() {
      testEl = createEl('test-element');
      ch     = getMod('checker');
    });

    afterEach(function() {
      removeEl(testEl);
    });

    it('should return true if array', function() {
      expect(ch('Array', ['foo'])).toBeTruthy();
      expect(ch('Array', 'foo')).toBeFalsy();
    });

    it('should return true if boolean', function() {
      expect(ch('Boolean', false)).toBeTruthy();
      expect(ch('Boolean', 'foo')).toBeFalsy();
    });

    it('should return true if Element', function() {
      expect(ch('Element', 'test-element')).toBeTruthy();
      expect(ch('Element', 'foo')).toBeFalsy();
    });

    it('should return true if Number', function() {
      expect(ch('Number', 2)).toBeTruthy();
      expect(ch('Number', 'foo')).toBeFalsy();
    });

     it('should return true if String', function() {
      expect(ch('String', 'foo')).toBeTruthy();
      expect(ch('String', 2)).toBeFalsy();
    });
  });

  describe('check', function() {
    beforeEach(function() {
      el = createEl('holder');
      check = checker(mock);
      stubs.addSpy('checker');
    });

    afterEach(function() {
      removeEl(el);
      stubs.getSpy('checker').calls.reset()
      stubs.revertAll();
    });

    it('should return false if no dataset', function() {
      expect(check(el)).toBeFalsy();
    });

    it('should return false if not the right keys', function() {
      setData(el, _.omit(mock, ['string', 'boolean']))
      expect(check(el)).toBeFalsy();
    });

    it('should return false if not valid key types', function() {
      setData(el, mock);
      let spy = stubs.getSpy('checker');
      spy.and.returnValue(false);
      expect(check(el)).toBeFalsy();
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toEqual(1)
    });

    it('should return true if checker true', function() {
      setData(el, mock);
      let spy = stubs.getSpy('checker');
      spy.and.returnValue(true);
      expect(check(el)).toBeTruthy();
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toEqual(5)
    });
  });
});