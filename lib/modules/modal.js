'use strict';

var checker = require('../checker');

var closeModal = function closeModal(modal, lastFocus) {
  return function (e) {
    e.preventDefault();
    e.target.removeEventListener('click', undefined);
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1');
    lastFocus.focus();
  };
};

var closeBtn = function closeBtn(close, closer) {
  close.addEventListener('click', closer);
};

var getElements = function getElements(el) {
  return {
    close: document.getElementById(el.dataset.closeModal),
    lastFocus: document.activeElement,
    modal: document.getElementById(el.dataset.modal)
  };
};

var openModal = function openModal(modal) {
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('tabindex', '0');
  modal.focus();
};
console.log('Modal >>>>>>>>>>>>>');
module.exports = function () {
  console.log('Modal >>>>>>>>>>>>>');
  return {
    check: checker({ modal: 'Element', closeModal: 'Element' }),
    trigger: function trigger(el, e) {
      e.preventDefault();

      var _getElements = getElements(el),
          close = _getElements.close,
          lastFocus = _getElements.lastFocus,
          modal = _getElements.modal;

      openModal(modal);
      closeBtn(close, closeModal(modal, lastFocus));
    }
  };
};
//# sourceMappingURL=modal.js.map