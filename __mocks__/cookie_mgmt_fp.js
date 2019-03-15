let name = '';
let values = '';

export const getNameData = jest.fn(() => name);
export const setValueData = jest.fn(v => {
  console.log(v);
  values = v;
});
export const getValueData = jest.fn(() => values);
export const getValue = jest.fn(() => {
  if (typeof values === 'string') return values;
  return JSON.stringify(values);
});
export const createCookie = jest.fn();
export const deleteCookie = jest.fn(() => {
  values = '';
});

export default jest.fn(n => {
  name = n;
  console.log('Ehhh', getValue);
  return {
    createCookie,
    deleteCookie,
    getValue,
  };
});
