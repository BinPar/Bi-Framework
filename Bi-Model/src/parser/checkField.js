import { check } from './properties';

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
  'targetCollectionShortName',
  'targetCollectionSelect',
  'denormalized',
  'denormalizedFields',
  'targetCollectionSelect',
  'validations',
  'permissions',
  'model',
  'readOnly',
];
const hasOwnProperty = Object.prototype.hasOwnProperty;

export default function validateModel({ model, shortName }) {
  const fieldNames = Object.keys(model);
  for (let i = 0, l = fieldNames.length; i < l; i += 1) {
    const fieldName = fieldNames[i];
    const field = model[fieldName];
    const properties = Object.keys(field);
    if (properties.indexOf('type') === -1) {
      throw new Error(
        `The field "${fieldName}" must have the property "type" in collection "${shortName}"`,
      );
    } else if (check('[object Object]', field.type)) {
      throw new Error(`The property "type" of "${fieldName}" must be an object`);
    } else if (!hasOwnProperty.call(field.type, 'getRequiredProperties')) {
      throw new Error(`The property "type" of "${fieldName}" must be a valid BinPar Framework Type which must implement `);
    }
    for (let j = 0, l2 = properties.length; j < l2; j += 1) {
      const propertyName = properties[j];
      if (ALLOWED_PROPERTIES.indexOf(propertyName) === -1) {
        throw new Error(`Property ${field} is not a valid BinPar Framework property`);
      }
    }

    const requiredProperties = field.type.getRequiredProperties();
  }
}
