import BinParTypes, { isReference, getMongooseType } from '../src/fieldTypes';

const { describe, test, expect } = global;
describe('Utility functions of field types', () => {
  test('Is reference', () => {
    expect(isReference(BinParTypes.dateTime)).toBe(false);
    expect(isReference(BinParTypes.oneToManyReference)).toBe(true);
    expect(isReference(BinParTypes.manyToOneReference)).toBe(true);
    expect(() => isReference(null)).toThrowError(
      'The type cannot be undefined/null',
    );
    expect(() => isReference([null])).toThrowError(
      'The type cannot be undefined/null',
    );
    expect(() => isReference({})).toThrowError(
      'The type is not a valid BinParType',
    );
    expect(() => isReference(String)).toThrowError(
      'The type is not a valid BinParType',
    );
    expect(() => isReference([Date])).toThrowError(
      'The type is not a valid BinParType',
    );
  });

  test('Get mongoose type', () => {
    expect(getMongooseType(BinParTypes.companyName)).toEqual(String);
    expect(getMongooseType([BinParTypes.companyName])).toEqual([String]);
    expect(() => getMongooseType(null)).toThrowError(
      'The type cannot be undefined/null',
    );
    expect(() => getMongooseType([null])).toThrowError(
      'The type cannot be undefined/null',
    );
    expect(() => getMongooseType(String)).toThrowError(
      'The type is not a valid BinParType',
    );
    expect(() => getMongooseType([Date])).toThrowError(
      'The type is not a valid BinParType',
    );
  });
});
