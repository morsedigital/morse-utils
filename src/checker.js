import { includes, isArray, isElement } from "lodash";

const setData = (type, data) => {
  switch (type) {
    case "Element":
      return document.getElementById(data); //document.getElementById(data);
    case "String":
      return data;
    default:
      try {
        return JSON.parse(data);
      } catch (e) {
        return null;
      }
  }
};

export const checker = (type, dataAttr) => {
  const checks = {
    Array: isArray,
    Boolean: d => typeof d === "boolean",
    Element: isElement,
    Number: d => typeof d === "number",
    String: d => typeof d === "string"
  };

  if (!checks.hasOwnProperty(type)) return false;
  const data = setData(type, dataAttr);
  const check = checks[type];
  return check(data);
};

const checkAttributes = attrs =>
  attrs.reduce((ds, attr) => {
    if (ds) return true;
    if (!attr.nodeName) return ds;
    return attr.nodeName.match(/data/) ? true : false;
  }, false);

export default checks => el => {
  let keys, valid, chKeys;
  if (!el && !el.attributes) return false;
  const attrs = [...el.attributes];
  if (!checkAttributes(attrs)) return false;
  keys = Object.keys(el.dataset);
  chKeys = Object.keys(checks);

  valid = chKeys.reduce((test, ch) => {
    if (!test) return false;
    return includes(keys, ch);
  }, true);
  if (!valid) return valid;

  return Object.entries(checks).reduce((val, [k, v]) => {
    if (!val) return val;
    return checker(v, el.dataset[k]);
  }, true);
};
