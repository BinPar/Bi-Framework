import validateModel from '../src/parser/validateModel';
import checkField from '../src/parser/checkField';
import types from '../src/fieldTypes';
import customers from '../sample/full/model/customers';

const { describe, test, expect } = global;

describe('Validate model verification', () => {
  test('Basic fields', () => {
    expect(checkField('phone', customers.model.phone, customers.shortName)).toBe(true);
    expect(checkField('firstContactAt', customers.model.firstContactAt, customers.shortName)).toBe(
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
  });
  test('Checking complex field integrity', () => {
    expect(checkField('address', customers.model.address, customers.shortName)).toBe(true);
  });
  test('Validating complex model', () => {
    expect(validateModel(customers.model, customers.shortName)).toBe(true);
  });
});
