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

var positionModal = function positionModal(el) {
  el.style.top = '-20px';
};

var openModal = function openModal(modal) {
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('tabindex', '0');
  modal.focus();
};

module.exports = function () {
  return {
    check: checker({ openmodal: 'Element', closemodal: 'Element' }),
    trigger: function trigger(el, e) {
      e.preventDefault();
      var lastFocus = document.activeElement;
      var modal = document.getElementById(el.dataset.openmodal);
      var close = document.getElementById(el.dataset.closemodal);
      openModal(modal);
      positionModal(modal);

      close.addEventListener('click', closeModal(modal, lastFocus));
    }
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(closeModal, 'closeModal', 'src/modules/modal.js');

  __REACT_HOT_LOADER__.register(positionModal, 'positionModal', 'src/modules/modal.js');

  __REACT_HOT_LOADER__.register(openModal, 'openModal', 'src/modules/modal.js');
}();

;