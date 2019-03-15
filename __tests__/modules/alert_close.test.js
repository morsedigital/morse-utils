/* eslint-env browser, jasmine */
import { readFileSync } from 'fs';
import { join } from 'path';
import Alert from '../../src/modules/alert_close';

import CookieMgmt, { getNameData, setValueData, getValue, createCookie } from '../../__mocks__/cookie_mgmt_fp';

const htmlPath = join(__dirname, '/../../__markup__/alert_close.html');
const markup = readFileSync(htmlPath);

jest.mock('@djforth/cookie_mgmt_fp');

describe('Module/Alert_close', () => {
  let alert;
  beforeAll(() => {
    setValueData(['alert-2']);
    document.body.innerHTML = markup.toString();
    alert = Alert();
  });

  describe('Setup', () => {
    test('should keep alert-1', () => {
      expect(document.getElementById('alert-1')).toBeElement();
    });

    test('should remove alert-2', () => {
      expect(document.getElementById('alert-2')).toBeNull();
    });

    test('should keep alert-3', () => {
      expect(document.getElementById('alert-3')).toBeElement();
    });

    test('should set cookie name & CookieMgmt.getValue', () => {
      expect(getNameData()).toEqual('alerts');
      // expect(getValue).toHaveBeenCalled();
    });
  });

  describe('check', () => {
    test('should return true if checker true', () => {
      const el = document.querySelector('#alert-1 a');
      expect(alert.check(el)).toBeTrue();
    });

    test('should return false if checker false', () => {
      const el = document.querySelector('#alert-1');
      expect(alert.check(el)).toBeFalse();
    });
  });

  describe('trigger', () => {
    let alertEl, el, event;
    beforeAll(() => {
      event = {
        preventDefault: jest.fn(),
      };
      alertEl = document.getElementById('alert-1');
      el = document.querySelector('#alert-1 a');
      alert.trigger(el, event);
    });

    test('should call event.preventDefault', () => {
      expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should remove alert-1', () => {
      expect(document.getElementById('alert-1')).toBeNull();
    });

    test.skip('should call createCookie', () => {
      expect(createCookie).toHaveBeenCalledWith(JSON.stringify(['alert-2', 'alert-1']), 365);
    });
  });
});
