const toString = Object.prototype.toString;

export function check(expectedType, value, ...params) {
  const propertyType = toString.call(value);
  if (propertyType === '[object AsyncFunction]' || propertyType === expectedType) {
    return true;
  } else if (propertyType === '[object Function]') {
    return check(expectedType, value(...params));
  } else if (expectedType === '[object String]' && propertyType === '[object Object]') {
    return Object.keys(value).filter(key => key.length !== 2).length === 0;
  }
  return false;
}

export function getValue(value, ...params) {
  const propertyType = toString.call(value);
  if (propertyType === '[object AsyncFunction]​​​​​' || propertyType === '[object Function]​​​​​') {
    return value(...params);
  }
  return value;
}
