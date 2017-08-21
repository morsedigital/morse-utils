
import checker  from '../checker';

const closeModal = (modal, lastFocus)=>{
  return (e)=>{
    e.preventDefault();
    e.target.removeEventListener('click', this);
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1');
    lastFocus.focus();
  };
};

const closeBtn = (close, closer)=>{
  close.addEventListener('click', closer);
};

const getElements = (el)=>{
  return {
    close: document.getElementById(el.dataset.closeModal)
    , lastFocus: document.activeElement
    , modal: document.getElementById(el.dataset.modal)
  };
};

const openModal = (modal)=>{
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('tabindex', '0');
  modal.focus();
};

export default ()=>{
  return {
    check: checker({modal: 'Element', closeModal: 'Element'})
    , trigger: function(el, e){

      e.preventDefault();
      let {
        close
        , lastFocus
        , modal
      } = getElements(el);

      openModal(modal);
      closeBtn(close, closeModal(modal, lastFocus));
    }
  };
};
