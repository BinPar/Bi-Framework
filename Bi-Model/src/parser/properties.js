import settings from '../config/settings.json';
import { toString, getPrototypeOf, hasOwnProperty } from '../tools/objectUtils';

export function stringifyNativeType(type) {
  if (type === undefined || type === null) {
    return toString.call(type);
  }
  if (typeof type === 'string') {
    return type;
  }
  if (hasOwnProperty.call(type, 'name') && !!type.name) {
    return `[object ${type.name}]`;
  }
  const proto = getPrototypeOf(type);
  if (hasOwnProperty.call(proto, 'constructor')) {
    return `[object ${proto.constructor.name}]`;
  }
  return '[object Object]';
}

export function check(expectedType, value, ...params) {
  const strExpectedType = stringifyNativeType(expectedType);
  const propertyType = toString.call(value);
  if (propertyType === '[object AsyncFunction]' || propertyType === strExpectedType) {
    return true;
  } else if (propertyType === '[object Function]') {
    return check(strExpectedType, value(...params));
  } else if (strExpectedType === '[object String]' && propertyType === '[object Object]') {
    return Object.keys(value).filter(key => key.length !== 2).length === 0;
  }
  return false;
}

export async function getValue(expectedType, value, currentLang, ...params) {
  const propertyType = toString.call(value);
  if (propertyType === expectedType) {
    return value;
  } else if (propertyType === '[object AsyncFunction]') {
    const result = await value(...params);
    return getValue(expectedType, result, ...params);
  } else if (propertyType === '[object Function]') {
    return getValue(expectedType, value(...params), ...params);
  } else if (expectedType === '[object String]' && propertyType === '[object Object]') {
    return value[currentLang] || value[settings.defaultLanguage];
  }
  return null;
}
