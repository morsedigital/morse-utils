const _        = require("lodash");

var remove_element = require("../src/remove_element");

const checkCalls = require("@djforth/morse-jasmine-wp/check_calls")
  , createEl = require("@djforth/morse-jasmine-wp/create_elements").createHolder
  , removeEl = require("@djforth/morse-jasmine-wp/create_elements").removeElement
  , sim_event = require("@djforth/morse-jasmine-wp/simulate_click")
  , spyManager = require("@djforth/morse-jasmine-wp/spy_manager")();

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