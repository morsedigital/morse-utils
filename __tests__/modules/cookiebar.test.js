/* eslint-env browser, jasmine */
import { readFileSync } from 'fs';
import { join } from 'path';
import Cookiebar from '../../src/modules/cookiebar';

import { getNameData, setValueData, getValue, createCookie } from '../../__mocks__/cookie_mgmt_fp';

const htmlPath = join(__dirname, '/../../__markup__/cookiebar.html');
const markup = readFileSync(htmlPath);

jest.mock('@djforth/cookie_mgmt_fp');

describe('Module/cookiebar', () => {
  let cookiebar;

  describe('if no persmission cookie', () => {
    beforeAll(() => {
      document.body.innerHTML = markup.toString();
      cookiebar = Cookiebar('cookiebar');
    });

    test('should set cookie name & CookieMgmt.getValue', () => {
      expect(getNameData()).toEqual('permission');
    });

    describe('check', () => {
      test('should return true if checker true', () => {
        const el = document.getElementById('btn1');
        expect(cookiebar.check(el)).toBeTrue();
      });

      test('should return false if checker false', () => {
        const el = document.getElementById('cookiebar');
        expect(cookiebar.check(el)).toBeFalse();
      });
    });

    describe('trigger', () => {
      let cookiebarEl, el, event;
      beforeAll(() => {
        event = {
          preventDefault: jest.fn(),
        };
        cookiebarEl = document.getElementById('cookiebar');
        el = document.getElementById('btn1');
        cookiebar.trigger(el, event);
      });

      test('should call event.preventDefault', () => {
        expect(event.preventDefault).toHaveBeenCalled();
      });

      test('should remove cookiebar-1', () => {
        expect(document.getElementById('cookiebar')).toBeNull();
      });

      test.skip('should call createCookie', () => {
        expect(createCookie).toHaveBeenCalledWith(true, 365);
      });
    });
  });

  describe('if permission cookie is set', () => {
    beforeAll(() => {
      setValueData(true);
      document.body.innerHTML = markup.toString();
      cookiebar = Cookiebar('cookiebar');
    });

    test('should remove cookiebar', () => {
      expect(document.getElementById('cookiebar')).toBeNull();
    });
  });
});
