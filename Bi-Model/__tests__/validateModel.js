import validateModel from '../src/parser/validateModel';
import checkField from '../src/parser/checkField';
import types from '../src/fieldTypes';
import customers from '../sample/full/dataModel/customers';

const { describe, test, expect } = global;

describe('Validate model verification', () => {
  test('Basic fields', () => {
    expect(checkField('phone', customers.model.phone, customers.collectionShortName)).toBe(true);
    expect(checkField('firstContactAt', customers.model.firstContactAt, customers.collectionShortName)).toBe(
      true,
    );
    expect(() => {
      checkField(
        'reference',
        {
          label: {
            es: 'Referencia',
            en: 'Reference',
          },
          type: types.oneToManyReference,
        },
        'TestingError',
      );
    }).toThrowError(
      'The type of field "reference" must have the property "targetCollectionShortName" => in "TestingError"',
    );
    expect(() => {
      checkField(
        'reference',
        {
          label: {
            es: 'Referencia',
            en: 'Reference',
          },
        },
        'TestingError',
      );
    }).toThrowError(
      'Field "reference" must have the property "type" in "TestingError"',
    );
    expect(() => {
      checkField(
        'reference',
        {
          label: {
            es: 'Referencia',
            en: 'Reference',
          },
          type: types.undefinedType,
        },
        'TestingError',
      );
    }).toThrowError(
      'The property "type" of "reference" must be an object or an Array of types',
    );
    expect(() => {
      checkField(
        'reference',
        {
          label: {
            es: 'Referencia',
            en: 'Reference',
          },
          type: {},
        },
        'TestingError',
      );
    }).toThrowError(
      'Property "type" of "reference" must be a valid BinPar Framework Type which must have a property "requiredProperties" => in "TestingError"',
    );
    expect(() => {
      checkField(
        'reference',
        {
          label: {
            es: 'Referencia',
            en: 'Reference',
          },
          type: types.oneToManyReference,
          targetCollectionShortName: 'References',
          notValidProperty: 'Wrong!',
        },
        'TestingError',
      );
    }).toThrowError(
      'Property "notValidProperty" is not a valid BinPar Framework property of field "reference" => in "TestingError"',
    );
    expect(() => {
      checkField(
        'reference',
        {
          label: {
            es: 'Referencia',
            en: 'Reference',
          },
          type: types.oneToManyReference,
          targetCollectionShortName: false,
        },
        'TestingError',
      );
    }).toThrowError(
      'The type of field "reference" must be "[object String]" => in "TestingError"',
    );
  });
  test('Checking complex field integrity', () => {
    expect(checkField('address', customers.model.address, customers.collectionShortName)).toBe(true);
  });
  test('Validating complex model', () => {
    expect(validateModel(customers.model, customers.collectionShortName)).toBe(true);
  });
});
