import _ from 'lodash';
import { readFileSync } from 'fs';
import { join } from 'path';
import removeElement from '../src/remove_element';

const htmlPath = join(__dirname, '/../__markup__/remove_element.html');
const markup = readFileSync(htmlPath);

// import checkCalls from '@djforth/morse-jasmine-wp/check_calls';
// import {createHolder as createEl} from '@djforth/morse-jasmine-wp/create_elements';
// import {removeElement as removeEl} from '@djforth/morse-jasmine-wp/create_elements';
// import sim_event from '@djforth/morse-jasmine-wp/simulate_click';
// import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
// const spyManager = SpyManager();

describe('click_to_close', () => {
  let spy;
  beforeEach(() => {
    document.body.innerHTML = markup.toString();
    spy = jest.fn();
  });

  it('should not remove element if none passed', () => {
    const el = document.getElementById('holder');
    removeElement(null, spy);
    expect(el.parentNode).toBeElement();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should remove element from DOM', () => {
    const el = document.getElementById('holder');
    expect(el).toBeElement();
    removeElement(el, spy);
    expect(document.getElementById('holder')).toBeNull();
    expect(spy).toHaveBeenCalledWith(el);
  });

  it('should remove nested element from DOM', () => {
    const holder = document.getElementById('holder');
    const el = document.getElementById('nest-holder');
    expect(el).toBeElement();
    removeElement(el, spy);
    expect(document.getElementById('nest-holder')).toBeNull();
    expect(document.getElementById('holder')).toBeElement();
    expect(spy).toHaveBeenCalledWith(el);
  });
});
