/* eslint-env browser, jest */
import _ from 'lodash';
import { join } from 'path';
import { readFileSync } from 'fs';
import eventListener from '../src/event_listener';

import SpyManager from '@djforth/stubs-spy-manager-jest';

import SimEvent from './__helpers__/simulate_event';

const htmlPath = join(__dirname, '/../__markup__/event_listener.html');
const markup = readFileSync(htmlPath);

describe('eventListener', () => {
  // const spies_stubs = SpyManager(checker);
  let button, holder;
  beforeAll(() => {
    document.body.innerHTML = markup.toString();
    button = document.getElementById('button');
    holder = document.getElementById('holder');
  });

  describe('Add events', () => {
    let check, module, listener;
    beforeEach(() => {
      module = {
        check: jest.fn(el => el === holder),
        trigger: jest.fn(),
      };

      listener = eventListener([module]);
    });

    it('should apply click to body', () => {
      SimEvent(document.body, 'click');
      expect(module.check).toHaveBeenCalled();
      expect(module.trigger).not.toHaveBeenCalled();
    });

    it('should not call trigger if not within element', () => {
      const anotherButton = document.getElementById('another-button');
      SimEvent(anotherButton, 'click');
      expect(module.check).toHaveBeenCalled();
      expect(module.trigger).not.toHaveBeenCalled();
    });

    it('should call trigger if element clicked', () => {
      SimEvent(holder, 'click');
      expect(module.check).toHaveBeenCalled();
      expect(module.trigger).toHaveBeenCalledWith(holder, expect.anything());
    });

    it('should call trigger if element within clicked', () => {
      SimEvent(button, 'click');
      expect(module.check).toHaveBeenCalled();
      expect(module.trigger).toHaveBeenCalledWith(holder, expect.anything());
    });

    it('should remove event', () => {
      expect(listener).toBeFunction();
      listener();
      SimEvent(document.body, 'click');
      expect(module.check).not.toHaveBeenCalled();
    });
  });
});
