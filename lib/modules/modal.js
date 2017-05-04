'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checker = require('../checker');

var _checker2 = _interopRequireDefault(_checker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = function () {
  return {
    check: (0, _checker2.default)({ modal: 'Element', closeModal: 'Element' }),
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