import _ from 'lodash';
import {readFileSync} from 'fs';
import {join} from 'path';

import checker from '../src/checker';

const htmlPath = join(__dirname, '/../__markup__/checker.html');
const markup = readFileSync(htmlPath);
import SpyManager from '@djforth/stubs-spy-manager-jest';

// import checkCalls from '@djforth/morse-jasmine-wp/check_calls';
// import {createHolder as createEl} from '@djforth/morse-jasmine-wp/create_elements';
// import GetMod from '@djforth/morse-jasmine-wp/get_module';
// const getMod = GetMod(checker);
// import {removeElement as removeEl} from '@djforth/morse-jasmine-wp/create_elements';
// import sim_event from '@djforth/morse-jasmine-wp/simulate_click';
// import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
// const spyManager = SpyManager();
// import Stubs from '@djforth/morse-jasmine-wp/stub_inner';
// const stubs = Stubs(checker);
// import stub_chain from '@djforth/morse-jasmine-wp/stub_chain_methods';

function setData(el, data){
  _.forIn(data, (v, k)=>{
      el.dataset[k] = JSON.stringify(v);
    });
}

describe('checker', ()=>{
  const spies_stubs = SpyManager(checker);
  let el, check;
  let mock = {
    string: 'String'
    , intiger: 'String'
    , boolean: false
    , element: 'some-id'
    , array: []
  };

  afterEach(()=>{
    spies_stubs.reset();
  });

  describe('checker', ()=>{
    let ch;
    beforeEach(()=>{
      document.body.innerHTML = markup.toString();
      ch = spies_stubs.getFn('checker');
    });

    test('should return true if array', ()=>{
      expect(ch('Array', ['foo'])).toBeTruthy();
      expect(ch('Array', 'foo')).toBeFalsy();
    });

    test('should return true if boolean', ()=>{
      expect(ch('Boolean', false)).toBeTruthy();
      expect(ch('Boolean', 'foo')).toBeFalsy();
    });

    test('should return true if Element', ()=>{
      expect(ch('Element', 'test-element')).toBeTruthy();
      expect(ch('Element', 'foo')).toBeFalsy();
    });

    test('should return true if Number', ()=>{
      expect(ch('Number', 2)).toBeTruthy();
      expect(ch('Number', 'foo')).toBeFalsy();
    });

     test('should return true if String', ()=>{
      expect(ch('String', 'foo')).toBeTruthy();
      expect(ch('String', 2)).toBeFalsy();
    });
  });

  describe('check', ()=>{
    let checkValue = false;
    beforeEach(()=>{
      checkValue = false;
      check = checker(mock);
      el = document.getElementById('holder');
      spies_stubs.add([
        {
          stub: 'checker'
          , callback: ()=>checkValue
        }
      ]);

      spies_stubs.make();
    });

    it('should return false if no dataset', ()=>{
      expect(check(document.getElementById('test-element'))).toBeFalsy();
    });

    it('should return false if not the right keys', ()=>{
      setData(el, _.omit(mock, ['string', 'boolean']));
      expect(check(el)).toBeFalsy();
    });

    it('should return false if not valid key types', ()=>{
      setData(el, mock);
      let spy = spies_stubs.get('checker');
      expect(check(el)).toBeFalsy();
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toEqual(1);
    });

    it('should return true if checker true', ()=>{
      setData(el, mock);
      let spy = spies_stubs.get('checker');
      checkValue = true;
      expect(check(el)).toBeTruthy();
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toEqual(5);
    });
  });
});
