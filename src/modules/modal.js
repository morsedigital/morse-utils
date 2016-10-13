
var checker = require('../checker');

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

module.exports = ()=>{
  return {
    check: checker({modal: 'Element', closemodal: 'Element'})
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
