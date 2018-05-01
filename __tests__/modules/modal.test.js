/* eslint-env browser, jasmine */
import { readFileSync } from 'fs';
import { join } from 'path';
import Modal from '../../src/modules/modal';

import SimEvent from '../__helpers__/simulate_event';

const htmlPath = join(__dirname, '/../../__markup__/modal.html');
const markup = readFileSync(htmlPath);

describe('Module/modal', () => {
  let modal, open;
  beforeAll(() => {
    document.body.innerHTML = markup.toString();
    modal = Modal();
  });

  describe('setup', () => {
    let modalEl;
    beforeAll(() => {
      modalEl = document.getElementById('modal');
      open = document.getElementById('modal-open');
      open.focus();
    });

    test('should set aria-hidden', () => {
      expect(modalEl).toHaveAttribute('aria-hidden', 'true');
    });

    test('should set tabindex', () => {
      expect(modalEl).toHaveAttribute('tabindex', '-1');
    });

    test('should set role', () => {
      expect(modalEl).toHaveAttribute('role', 'dialog');
    });
  });

  describe('check', () => {
    test('should return true if checker true', () => {
      const el = document.getElementById('modal-open');
      expect(modal.check(el)).toBeTrue();
    });

    test('should return false if checker false', () => {
      const el = document.getElementById('modal');
      expect(modal.check(el)).toBeFalse();
    });
  });

  describe('trigger', () => {
    let modalEl, el, event;
    beforeAll(() => {
      event = {
        preventDefault: jest.fn(),
      };
      modalEl = document.getElementById('modal');
      el = document.getElementById('modal-open');
      modal.trigger(el, event);
    });

    test('should call event.preventDefault', () => {
      expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should open modal', () => {
      expect(modalEl).toHaveAttribute('tabindex', '0');
      expect(modalEl).toHaveAttribute('aria-hidden', 'false');
      expect(modalEl).toEqual(document.activeElement);
    });

    test('should set close button', () => {
      const closeBtn = document.getElementById('modal-close');
      SimEvent(closeBtn, 'click');

      expect(modalEl).toHaveAttribute('tabindex', '-1');
      expect(modalEl).toHaveAttribute('aria-hidden', 'true');
      expect(open).toEqual(document.activeElement);
    });
  });
});
