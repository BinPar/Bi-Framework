import { check } from '../src/parser/properties';
import types from '../src/fieldTypes';

const { describe, test, expect } = global;

describe('BinPar Framework types coverage', () => {
  test('Basic', () => {
    expect(check(Boolean, types.boolean.getFakedValue())).toBe(true);
    expect(check(String, types.cityName.getFakedValue())).toBe(true);
    expect(check(String, types.countryName.getFakedValue())).toBe(true);
    expect(check(Date, types.dateTime.getFakedValue({}))).toBe(true);
    expect(check(String, types.email.getFakedValue())).toBe(true);
    expect(types.email.validator('marcos@binpar.com')).toBe(true);
    expect(types.email.validator('marcosbinpar.com')).not.toBe(true);
    expect(check(String, types.firstName.getFakedValue())).toBe(true);
    expect(check(String, types.image.getFakedValue())).toBe(true);
    expect(check(String, types.lastName.getFakedValue())).toBe(true);
    expect(check(String, types.NIFCIF.getFakedValue())).toBe(true);
    expect(check(Object, types.object.getFakedValue())).toBe(true);
    expect(types.object.graphQLType({ shortName: 'Test' })).toBe('[Test]');
    expect(check(String, types.phone.getFakedValue())).toBe(true);
    expect(check(String, types.string.getFakedValue())).toBe(true);

    expect(types.oneToManyReference.graphQLType({ targetCollectionShortName: 'References' })).toBe('[References]');
    expect(types.oneToManyReference.mongooseRef({ targetCollectionShortName: 'References' })).toBe('references');
  });
});
