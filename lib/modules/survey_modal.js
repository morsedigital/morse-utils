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
    check: checker({ surveyModal: 'Element', closeSurveyModal: 'ElementClass' }),
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
//# sourceMappingURL=survey_modal.js.map