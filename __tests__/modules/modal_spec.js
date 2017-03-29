/* eslint-env browser, jasmine */
import _ from 'lodash';
import Modal from '../../src/modules/modal';

import {Checker} from '../utils/create_stubs';

import ModuelCheck from '../utils/module_check';

/* eslint-disable */
const checkMulti = require('@djforth/morse-jasmine-wp/check_multiple_calls')
  , checkCalls = require('@djforth/morse-jasmine-wp/check_calls')
  , createEl = require('@djforth/morse-jasmine-wp/create_elements').create
  , getMod = require('@djforth/morse-jasmine-wp/get_module')(Modal)
  , removeEl = require('@djforth/morse-jasmine-wp/create_elements').removeElement
  , sim_event = require('@djforth/morse-jasmine-wp/simulate_click')
  , spyManager = require('@djforth/morse-jasmine-wp/spy_manager')()
  , stubs      = require('@djforth/morse-jasmine-wp/stub_inner')(Modal);
/* eslint-enable */
// const cookieManager = CookieManager(stubs, spyManager);
const checker = Checker(stubs, spyManager);

const modCheck = ModuelCheck(spyManager);

describe('Module/Alert_close', function(){
  let modal, open, el, close;
  beforeEach(function(){
    checker();
    stubs.add('remover');
    close = createEl('button')
              .addId('modal-close')
              .append();
    modal = createEl().addId('modal').append();
    open = createEl('button')
              .addId('modal-open')
              .append(modal.get());
  });

  afterEach(function(){
    removeEl(close.get());
    removeEl(open.get());
    removeEl(modal.get());
    if (el && el.parentNode) removeEl(el);
    stubs.revertAll();
    spyManager.removeAll();
  });

  describe('utility functions', function(){
    describe('closeBtn', function(){
      let closeBtn;
      beforeEach(function(){
        closeBtn = getMod('closeBtn');
        spyManager.add('closer');
        closeBtn(close.get(), spyManager.get('closer'));
        sim_event(close.get(), 'click');
      });

      it('should call spy when clicked', function(){
        expect(spyManager.get('closer')).toHaveBeenCalled();
      });
    });

    describe('closeModal', function(){
      let closer, closeModal;
      beforeEach(function(){
        spyManager.add('preventDefault');
        closeModal = getMod('closeModal');
        closer = closeModal(modal.get(), open.get());
        closer({
          preventDefault: spyManager.get('preventDefault')
          , target: close.get()
        });
      });

      it('should return function', function(){
        expect(_.isFunction(closer)).toBeTruthy();
      });

      checkCalls(
        ()=>spyManager.get('preventDefault')
        , 'e.preventDefault'
        , ()=>[]
      );
    });

    describe('getElements', function(){
      let getElements, elements;
      beforeEach(function(){
        let openBtn = open.get()
        openBtn.dataset.closeModal = 'modal-close';
        openBtn.dataset.modal = 'modal';


        getElements = getMod('getElements');
        openBtn.focus();
        elements = getElements(openBtn);
      });

      it('should return close', function() {
        expect(_.isElement(elements.close)).toBeTruthy();
        expect(elements.close).toEqual(close.get());
      });

      it('should return modal', function() {
        expect(_.isElement(elements.modal)).toBeTruthy();
        expect(elements.modal).toEqual(modal.get());
      });

      it('should return lastFocus', function(){
        expect(_.isElement(elements.lastFocus)).toBeTruthy();
        expect(elements.lastFocus).toEqual(open.get());
      });
    });

    describe('openModal', function(){
      let openModal;
      beforeEach(function(){
        openModal = getMod('openModal');
        openModal(modal.get());
      });

      it('should set attributes', function(){
        let holder = modal.get();
        expect(holder.getAttribute('aria-hidden')).toEqual('false');
        expect(holder.getAttribute('tabindex')).toEqual('0');
        expect(document.activeElement).toEqual(holder);
      });
    });  });

  describe('main function', function(){
    let returnValue;
    beforeEach(function(){
      checker();
      stubs.add(['openModal', 'closeBtn']);
      stubs.return('getElements')('returnValue', {
        close: close.get()
        , lastFocus: open.get()
        , modal: modal.get()
      });

      spyManager.add({title: 'e', opts: ['preventDefault']});

      stubs.return('closeModal')('returnValue', 'closer');
      returnValue = Modal();
    });

    modCheck(()=>returnValue);

    let calls = {
      checker: [()=>stubs.get('checker')
        , ()=>[{modal: 'Element', closeModal: 'Element'}]]
    };

    checkMulti(calls);

    describe('trigger', function(){
      beforeEach(function(){
        returnValue.trigger(open.get(), spyManager.get('e'));
      });

      let calls = {
        'e.preventDefault': ()=>spyManager.get('e').preventDefault
        , 'getElements': [()=>stubs.get('getElements')
        , ()=>[open.get()]]
        , 'openModal': [
          ()=>stubs.get('openModal')
          , ()=>[modal.get()]
        ]
        , 'closeBtn': [
          ()=>stubs.get('closeBtn')
          , ()=>[close.get(), 'closer']
        ]
        , 'closeModal': [
          ()=>stubs.get('closeModal')
          , ()=>[modal.get(), open.get()]
        ]
      };
      checkMulti(calls);
    });
  });
});
