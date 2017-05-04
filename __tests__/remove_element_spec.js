import _ from 'lodash';

import remove_element from '../src/remove_element';

import checkCalls from '@djforth/morse-jasmine-wp/check_calls';
import {createHolder as createEl} from '@djforth/morse-jasmine-wp/create_elements';
import {removeElement as removeEl} from '@djforth/morse-jasmine-wp/create_elements';
import sim_event from '@djforth/morse-jasmine-wp/simulate_click';
import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
const spyManager = SpyManager();

describe('click_to_close', function() {
  let el
  beforeEach(function() {
    el = createEl("to-close");
    spyManager.addSpy("callback");
  });

  afterEach(function () {
    if(el.parentNode) removeEl(el);
    spyManager.removeAll();
  });

  it('should not remove element if none passed', function() {
    remove_element(null, spyManager.getSpy("callback"));
    expect(_.isElement(el.parentNode)).toBeTruthy();
    expect(spyManager.getSpy("callback")).not.toHaveBeenCalled();
  });

  it('should remove element from DOM', function() {
    expect(_.isElement(el.parentNode)).toBeTruthy();
    remove_element(el, spyManager.getSpy("callback"))
    expect(el.parentNode).toBeNull();
    expect(spyManager.getSpy("callback")).toHaveBeenCalledWith(el);
  });

});