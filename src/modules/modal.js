
var checker = require('../checker')

const closeModal = (modal, lastFocus)=>{
  return (e)=>{
    e.preventDefault();
    e.target.removeEventListener('click', this);
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1')
    lastFocus.focus();
  };
};

const positionModal = (el)=>{
  el.style.top = '-20px';
};

const openModal = (modal)=>{
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('tabindex', '0');
  modal.focus();
}

module.exports = ()=>{
  return {
    check: checker({openmodal: 'Element', closemodal: 'Element'})
    , trigger: function(el, e){
      e.preventDefault();
      const lastFocus = document.activeElement;
      const modal = document.getElementById(el.dataset.openmodal);
      const close = document.getElementById(el.dataset.closemodal);
      openModal(modal);
      positionModal(modal);

      close.addEventListener('click', closeModal(modal, lastFocus));
    }
  };
};