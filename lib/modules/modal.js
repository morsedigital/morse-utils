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

module.exports = function () {
  return {
    check: checker({ modal: 'Element', closeModal: 'Element' }),
    trigger: function trigger(el, e) {
      e.preventDefault();

      var _getElements = getElements(el);

      var close = _getElements.close;
      var lastFocus = _getElements.lastFocus;
      var modal = _getElements.modal;


      openModal(modal);
      closeBtn(close, closeModal(modal, lastFocus));
    }
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(closeModal, 'closeModal', 'src/modules/modal.js');

  __REACT_HOT_LOADER__.register(closeBtn, 'closeBtn', 'src/modules/modal.js');

  __REACT_HOT_LOADER__.register(getElements, 'getElements', 'src/modules/modal.js');

  __REACT_HOT_LOADER__.register(openModal, 'openModal', 'src/modules/modal.js');
}();

;