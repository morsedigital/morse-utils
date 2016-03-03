const _        = require("lodash");

var Cookiebar = require("../../src/modules/cookiebar");

const checkCalls = require("@djforth/morse-jasmine/check_calls")
  , createEl = require("@djforth/morse-jasmine/create_elements").createHolder
  , removeEl = require("@djforth/morse-jasmine/create_elements").removeElement
  , sim_event = require("@djforth/morse-jasmine/simulate_click")
  , spyManager = require("@djforth/morse-jasmine/spy_manager")()
  , stubs      = require("@djforth/morse-jasmine/stub_inner")(Cookiebar)
  , stub_chain = require("@djforth/morse-jasmine/stub_chain_methods");


describe('Module/Cookiebar_close', function() {
  let holder, el, cookiebar;

   beforeEach(function() {
      spyManager.addSpy("check");

      spyManager.addSpy( {title:"permission", opts:["getValue", "createCookie"]
        });

      stubs.addSpy(["checker", "CookieMgmt", "remover"]);
      stubs.getSpy("checker").and.returnValue(spyManager.getSpy("check"));

      stubs.getSpy("CookieMgmt").and.returnValue(spyManager.getSpy("permission"));
      holder = createEl("cookiebar-holder");
      // cookiebar = Cookiebar()
    });

    afterEach(function () {
      removeEl(holder);
      if(el && el.parentNode) removeEl(el);
      stubs.revertAll();
      spyManager.removeAll();
    });

  describe('when there is a cookie', function() {
    beforeEach(function() {
      spyManager.getSpy("permission").getValue.and.returnValue(true);
      cookiebar = Cookiebar("some-id");
    });

    checkCalls(()=>stubs.getSpy("CookieMgmt")
      , "CookieMgmt", ['permission'])

    checkCalls(()=>spyManager.getSpy("permission").getValue
      , "permission.getValue")

    checkCalls(()=>stubs.getSpy("remover")
      , "remover", ["some-id"])
  });

  describe('when no cookie', function() {
    beforeEach(function() {
      cookiebar = Cookiebar()
    });

    describe('should check if element has attributes', function() {
      let checker;

      it('should call checker', function() {
        let spy = stubs.getSpy("checker");
        expect(spy).toHaveBeenCalledWith({cookiebar:"Element"})
      });

      it('set check function', function() {
         let spy = spyManager.getSpy("check");
         cookiebar.check("foo");
         expect(spy).toHaveBeenCalledWith("foo")
      });
    });

    describe('trigger', function() {
      beforeEach(function() {

        el = createEl("cookiebar");
        el.dataset.cookiebar = "cookiebar-holder";
        cookiebar.trigger(el);
      });


      checkCalls(()=>stubs.getSpy("remover")
      , "remover", ["cookiebar-holder"]);

      checkCalls(()=>spyManager.getSpy("permission").createCookie
      , "permission.createCookie", [true, 365]);
    });
  });


});

