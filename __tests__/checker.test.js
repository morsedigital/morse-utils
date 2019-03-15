import _ from 'lodash';
import { readFileSync } from 'fs';
import { join } from 'path';

import checker, { checker as ch } from '../src/checker';

const htmlPath = join(__dirname, '/../__markup__/checker.html');
const markup = readFileSync(htmlPath);

function setData(el, data) {
  Object.entries(data).forEach(([k, v]) => {
    const value = typeof v === 'string' ? v : JSON.stringify(v);
    el.setAttribute(`data-${k}`, value);
  });
}

describe('checker', () => {
  let check;
  const mock = {
    String: 'String',
    Number: 10,
    Boolean: false,
    Element: 'test-element',
    Array: ['some-data'],
  };

  // afterEach(() => {
  //   spies_stubs.reset();
  // });

  describe('checker', () => {
    beforeEach(() => {
      document.body.innerHTML = markup.toString();
    });

    test('should return true if array', () => {
      expect(ch('Array', JSON.stringify(['foo']))).toBeTruthy();
      expect(ch('Array', 'foo')).toBeFalsy();
    });

    test('should return true if boolean', () => {
      expect(ch('Boolean', false)).toBeTruthy();
      expect(ch('Boolean', 'foo')).toBeFalsy();
    });

    test('should return true if Element', () => {
      expect(ch('Element', 'test-element')).toBeTruthy();
      expect(ch('Element', 'foo')).toBeFalsy();
    });

    test('should return true if Number', () => {
      expect(ch('Number', 2)).toBeTruthy();
      expect(ch('Number', 'foo')).toBeFalsy();
    });

    test('should return true if String', () => {
      expect(ch('String', 'foo')).toBeTruthy();
      expect(ch('String', 2)).toBeFalsy();
    });
  });

  describe('check', () => {
    let el;
    beforeAll(() => {
      document.body.innerHTML = markup.toString();

      check = checker({
        string: 'String',
        number: 'Number',
        boolean: 'Boolean',
        element: 'Element',
        array: 'Array',
      });
      el = document.getElementById('holder');
    });

    afterEach(() => {
      Object.entries(mock).forEach(([k, v]) => {
        el.removeAttribute(`data-${k}`);
      });
    });

    it('should return false if no dataset', () => {
      expect(check(document.getElementById('test-element'))).toBeFalsy();
    });

    it('should return false if not the right keys', () => {
      setData(el, _.omit(mock, ['String', 'Boolean']));
      expect(check(el)).toBeFalsy();
    });

    test('should return false if not valid key types', () => {
      setData(el, { ...mock, Number: 'foo' });
      expect(check(el)).toBeFalsy();
      // expect(spy.calls.count()).toEqual(1);
    });

    test('should return true if checker true', () => {
      setData(el, mock);
      expect(check(el)).toBeTruthy();
    });
  });
});
