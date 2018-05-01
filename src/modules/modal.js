import checker from '../checker';

const closeModal = (modal, lastFocus) => e => {
  e.preventDefault();
  e.target.removeEventListener('click', e.target);
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('tabindex', '-1');
  lastFocus.focus();
};

const closeBtn = (close, closer) => {
  close.addEventListener('click', closer);
};

const getElements = el => ({
  close: document.getElementById(el.dataset.closeModal),
  lastFocus: document.activeElement,
  modal: document.getElementById(el.dataset.modal),
});

const openModal = modal => {
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('tabindex', '0');
  modal.focus();
};

export default () => {
  const btnEl = document.querySelector('[data-modal]');

  if (btnEl) {
    let { modal: modalEl } = getElements(btnEl);

    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.setAttribute('tabindex', '-1');
    modalEl.setAttribute('role', 'dialog');
  }
  return {
    check: checker({ modal: 'Element', closeModal: 'Element' }),
    trigger: (el, e) => {
      e.preventDefault();
      let { close, lastFocus, modal } = getElements(el);

      openModal(modal);
      closeBtn(close, closeModal(modal, lastFocus));
    },
  };
};
