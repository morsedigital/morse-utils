let name = '';
let values = '';

export const getNameData = () => name;
export const setValueData = v => {
  values = v;
};
export const getValueData = () => values;
export const getValue = jest.fn(() => {
  if (typeof values === 'string') return values;
  return JSON.stringify(values);
});
export const createCookie = jest.fn();
export const deleteCookie = jest.fn(() => {
  values = '';
});

export default n => {
  name = n;
  return {
    createCookie,
    deleteCookie,
    getValue,
  };
};
