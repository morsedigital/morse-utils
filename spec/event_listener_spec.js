const _        = require("lodash");

var event_listener = require("../src/event_listener");

const checkCalls = require("@djforth/morse-jasmine/check_calls")
  , createEl = require("@djforth/morse-jasmine/create_elements").createHolder
  , removeEl = require("@djforth/morse-jasmine/create_elements").removeElement
  , sim_event = require("@djforth/morse-jasmine/simulate_click")
  , spyManager = require("@djforth/morse-jasmine/spy_manager")()
  , stubs      = require("@djforth/morse-jasmine/stub_inner")(event_listener)
  , stub_chain = require("@djforth/morse-jasmine/stub_chain_methods");


describe('event_listener', function() {
  let listener
  beforeEach(function() {
    stub_chain.addConstructor("module0", ["check", "trigger"])
        .addConstructor("module1", ["check", "trigger"])
  });

  afterEach(function () {
    stub_chain.removeAll();
    spyManager.removeAll()
  });


  describe('Add events', function() {
    let modules;
    beforeEach(function () {
      spyManager.addSpy("event_listener");
      stubs.addSpy("manageEvents");
      stubs.getSpy("manageEvents").and.returnValue(spyManager.getSpy("event_listener"));

      modules = [
        stub_chain.getConstructor("module0")
        , stub_chain.getConstructor("module1")
      ];
      listener = event_listener(modules);
    });

    checkCalls(()=>stubs.getSpy("manageEvents")
      , 'manageEvents', ()=>[modules]
    );

    it('should apply click to body', function() {
      sim_event(document.body, "click");
      expect(spyManager.getSpy("event_listener")).toHaveBeenCalled();
    });

    it('should remove event', function() {
      let spy = spyManager.getSpy("event_listener");
      expect(_.isFunction(listener)).toBeTruthy()
      listener();
      sim_event(document.body, "click");
      expect(spyManager.getSpy("event_listener")).not.toHaveBeenCalled();
    });
  });
});