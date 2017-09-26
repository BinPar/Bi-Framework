import { check } from '../parser/properties';
import boolean from './boolean';
import fString from './string';
import cityName from './cityName';
import companyName from './companyName';
import countryName from './countryName';
import dateTime from './dateTime';
import ean from './ean';
import email from './email';
import fEnum from './enum';
import firstName from './firstName';
import float from './float';
import int from './int';
import image from './image';
import lastName from './lastName';
import object from './object';
import oneToManyReference from './oneToManyReference';
import markdown from './markdown';
import manyToOneReference from './manyToOneReference';
import manyToManyReference from './manyToManyReference';
import phone from './phone';
import productName from './productName';
import NIFCIF from './NIFCIF';
import text from './text';
import url from './url';

export default {
  boolean,
  string: fString,
  cityName,
  companyName,
  countryName,
  dateTime,
  ean,
  email,
  enum: fEnum,
  firstName,
  float,
  int,
  image,
  lastName,
  object,
  oneToManyReference,
  markdown,
  manyToOneReference,
  manyToManyReference,
  phone,
  productName,
  NIFCIF,
  text,
  url,
};

export function isValidBinParType(typeParam) {
  const isArray = check('[object Array]', typeParam);
  const type = isArray ? typeParam[0] : typeParam;
  if (!type) {
    throw new Error('The type cannot be undefined/null');
  }
  if (!type.mongooseFieldType) {
    throw new Error('The type is not a valid BinParType');
  }
  return {
    ok: true,
    isArray,
    type,
  };
}

export function isReference(typeParam) {
  const { type } = isValidBinParType(typeParam);
  return type === oneToManyReference || type === manyToManyReference || type === manyToOneReference;
}

export function getMongooseType(binparType) {
  const { isArray, type } = isValidBinParType(binparType);
  return isArray ? [type.mongooseFieldType] : type.mongooseFieldType;
}
