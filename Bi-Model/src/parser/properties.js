const toString = Object.prototype.toString;

export function check(expectedType, value, ...params) {
  const propertyType = toString.call(value);
  if (propertyType === '[object AsyncFunction]​​​​​' || propertyType === expectedType) {
    return true;
  } else if (propertyType === '[object Function]') {
    const returnType = toString.call(value(...params));
    return returnType === '​​​​​[object AsyncFunction]​​​​​' || returnType === expectedType;
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
