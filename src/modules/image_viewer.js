import checker from '../checker';
import  uniqueId from 'lodash/uniqueId';

const closeModal = (modal, lastFocus) => e => {
  e.preventDefault();
  e.target.removeEventListener('click', e.target);
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('tabindex', '-1');
  modal.parentElement.removeChild(modal);
  lastFocus.focus();
};

const closeBtn = (close, closer) => {
  close.addEventListener('click', closer);
};

const modalTemplate = (
  imagePath,
  id,
  modalClass = '',
  alt
) => `<section class="modal-overlay ${modalClass}" id="${id}" aria-hidden="false" role="dialog" tabindex="1">
    <div class="modal-content">
      <button id="${id}-close" class="close-btn clearfix">x</button>
      <div class="modal-content-image">
        <img src="${imagePath}" alt="${alt}" />
      </div>
    </div>
  </section>`;

const getElements = el => ({
  alt: el.getAttribute('alt'),
  imageLarge: el.dataset.imageLarge,
  modalClass: el.dataset.modalClass,
});

export default () => ({
  check: checker({ imageViewer: 'Boolean' }),
  trigger: (el, e) => {
    e.preventDefault();
    el.focus();
    const { alt, imageLarge, modalClass } = getElements(el);

    const id = uniqueId('imageViewer');
    document.body.insertAdjacentHTML('beforeend', modalTemplate(imageLarge, id, modalClass, alt));
    const modal = document.getElementById(id);
    modal.focus();

    const close = document.getElementById(`${id}-close`);
    closeBtn(close, closeModal(modal, el));
  },
});
