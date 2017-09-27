import { stringifyNativeType, check, getValue } from '../src/parser/properties';

const { describe, test, expect } = global;

class CustomType {
  constructor(a) {
    this.a = a;
  }
}

describe('Properties methods', () => {
  test('Stringify native types', () => {
    expect(stringifyNativeType(null)).toBe('[object Null]');
    expect(stringifyNativeType(undefined)).toBe('[object Undefined]');
    expect(stringifyNativeType(new CustomType('b'))).toBe('[object CustomType]');
  });

  test('Check function', () => {
    expect(check(String, () => 'hola mundo')).toBe(true);
    expect(check(String, { aa: '' })).toBe(true);
    expect(check(String, 'hola')).toBe(true);
  });
});
