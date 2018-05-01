export default (el, ev, value)=>{
  const event = new Event(ev, {
    'view': window
    , 'bubbles': true
    , 'cancelable': true
  });

  el.dispatchEvent(event);
};
