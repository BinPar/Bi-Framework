import settings from '../config/settings.json';
import { toString, getPrototypeOf, hasOwnProperty } from '../tools/objectUtils';

export function stringifyNativeType(type) {
  if (type === undefined || type === null) {
    return toString.call(type);
  } else if (typeof type === 'string') {
    return type;
  } else if (hasOwnProperty.call(type, 'name') && !!type.name) {
    return `[object ${type.name}]`;
  }
  const proto = getPrototypeOf(type);
  return `[object ${proto.constructor.name}]`;
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
  const strExpectedType = stringifyNativeType(expectedType);
  const propertyType = toString.call(value);
  if (propertyType === strExpectedType) {
    return value;
  } else if (propertyType === '[object AsyncFunction]') {
    const result = await value(...params);
    return getValue(strExpectedType, result, ...params);
  } else if (propertyType === '[object Function]') {
    return getValue(strExpectedType, value(...params), ...params);
  } else if (strExpectedType === '[object String]' && propertyType === '[object Object]') {
    return value[currentLang] || value[settings.defaultLanguage];
  }
  return null;
}
