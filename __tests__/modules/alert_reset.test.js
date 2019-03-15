/* eslint-env browser, jasmine */
import { readFileSync } from 'fs';
import { join } from 'path';
import AlertReset from '../../src/modules/alert_reset';

import { setValueData, deleteCookie } from '../../__mocks__/cookie_mgmt_fp';

const htmlPath = join(__dirname, '/../../__markup__/alert_close.html');
const markup = readFileSync(htmlPath);

jest.mock('@djforth/cookie_mgmt_fp');

describe('Module/AlertReset', () => {
  let alert;
  beforeAll(() => {
    setValueData(['alert-2']);
    document.body.innerHTML = markup.toString();
    alert = AlertReset();
  });

  describe('check', () => {
    test('should return true if checker true', () => {
      const el = document.getElementById('reset');
      expect(alert.check(el)).toBeTrue();
    });

    test('should return false if checker false', () => {
      const el = document.getElementById('alert-1');
      expect(alert.check(el)).toBeFalse();
    });
  });

  describe('trigger', () => {
    let el, event;
    beforeAll(() => {
      event = {
        preventDefault: jest.fn(),
      };
      el = document.getElementById('reset');
      alert.trigger(el, event);
    });

    test('should call event.preventDefault', () => {
      expect(event.preventDefault).toHaveBeenCalled();
    });

    // test('should call deleteCookie', () => {
    //   expect(deleteCookie).toHaveBeenCalledWith();
    // });
  });
});
