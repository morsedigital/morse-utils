const _        = require("lodash");

var Alert = require("../../src/modules/alert_close");

const checkCalls = require("@djforth/morse-jasmine/check_calls")
  , createEl = require("@djforth/morse-jasmine/create_elements").createHolder
  , removeEl = require("@djforth/morse-jasmine/create_elements").removeElement
  , sim_event = require("@djforth/morse-jasmine/simulate_click")
  , spyManager = require("@djforth/morse-jasmine/spy_manager")()
  , stubs      = require("@djforth/morse-jasmine/stub_inner")(Alert)
  , stub_chain = require("@djforth/morse-jasmine/stub_chain_methods");


describe('Module/Alert_close', function() {
  let holder, el, closer
  beforeEach(function() {
    spyManager.addSpy("check");
    stubs.addSpy("checker");
    stubs.getSpy("checker").and.returnValue(spyManager.getSpy("check"))
    holder = createEl("alert-holder");
    closer = Alert()
    // el = createEl("alert");
    // el.dataset.alert = {close:"alert-holder"}
  });

  afterEach(function () {
    removeEl(holder);
    if(el && el.parentNode) removeEl(el);
    stubs.revertAll();
    spyManager.removeAll();
  });

  describe('should check if element has attributes', function() {
    let checker;

    it('should call checker', function() {
      let spy = stubs.getSpy("checker");
      expect(spy).toHaveBeenCalledWith({alert:"Element"})
    });

    it('set check function', function() {
       let spy = spyManager.getSpy("check");
       closer.check("foo");
       expect(spy).toHaveBeenCalledWith("foo")
    });
  });

  describe('trigger', function() {
    beforeEach(function() {
      stubs.addSpy("remover");
      el = createEl("alert");
      el.dataset.alert = "alert-holder";
    });

    it('should call remover', function() {
      closer.trigger(el);
      let spy = stubs.getSpy("remover");
      expect(spy).toHaveBeenCalledWith(holder);

    });
  });

});

