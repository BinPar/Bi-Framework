import { check, stringifyNativeType } from './properties';
import { hasOwnProperty } from '../tools/objectUtils';
import validateModel from './validateModel';

const ALLOWED_PROPERTIES = [
  'label',
  'type',
  'maxValue',
  'minValue',
  'indexed',
  'optionsValues',
  'required',
  'unique',
  'value',
  'stored',
  'entityShortName',
  'targetCollectionShortName',
  'targetCollectionSelect',
  'denormalized',
  'denormalizedFields',
  'targetCollectionSelect',
  'validations',
  'permissions',
  'model',
  'readOnly',
  'collectionShortName',
  'description',
  'getFakedValue',
];

export default function checkField(fieldName, field, collectionShortName) {
  const properties = Object.keys(field);
  const isObject = check('[object Object]', field.type);
  const isArray = check('[object Array]', field.type);
  const type = isArray ? field.type[0] : field.type;
  if (properties.indexOf('type') === -1) {
    throw new Error(`Field "${fieldName}" must have the property "type" in "${collectionShortName}"`);
  } else if (!isObject && !isArray) {
    throw new Error(`The property "type" of "${fieldName}" must be an object or an Array of types`);
  } else if (!hasOwnProperty.call(type, 'requiredProperties')) {
    throw new Error(
      `Property "type" of "${fieldName}" must be a valid BinPar Framework Type which must have a property "requiredProperties" => in "${collectionShortName}"`,
    );
  }
  for (let j = 0, l2 = properties.length; j < l2; j += 1) {
    const propertyName = properties[j];
    if (ALLOWED_PROPERTIES.indexOf(propertyName) === -1) {
      throw new Error(
        `Property "${propertyName}" is not a valid BinPar Framework property of field "${fieldName}" => in "${collectionShortName}"`,
      );
    }
    if (propertyName === 'model') {
      validateModel(field[propertyName], fieldName);
    }
  }
  const requiredProperties = type.requiredProperties;
  // check required propName
  for (let j = 0, l2 = requiredProperties.length; j < l2; j += 1) {
    const requiredProperty = requiredProperties[j];
    if (properties.indexOf(requiredProperty.propName) === -1) {
      throw new Error(
        `The type of field "${fieldName}" must have the property "${requiredProperty.propName}" => in "${collectionShortName}"`,
      );
    }
    const requiredParsedType = stringifyNativeType(requiredProperty.type);
    const propVal = field[requiredProperty.propName];
    if (!check(requiredParsedType, propVal)) {
      throw new Error(
        `The type of field "${fieldName}" must be "${requiredParsedType}" => in "${collectionShortName}"`,
      );
    }
  }
  return true;
}
