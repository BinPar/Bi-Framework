import { check, stringifyNativeType } from '../src/parser/properties';

const { describe, test, expect } = global;

describe('Stringify type verification', () => {
  test('String', () => {
    const expectedResult = '[object String]';
    expect(stringifyNativeType(String)).toBe(expectedResult);
  });
  test('Number', () => {
    const expectedResult = '[object Number]';
    expect(stringifyNativeType(Number)).toBe(expectedResult);
    expect(stringifyNativeType(1)).toBe(expectedResult);
  });
  test('Boolean', () => {
    const expectedResult = '[object Boolean]';
    expect(stringifyNativeType(Boolean)).toBe(expectedResult);
    expect(stringifyNativeType(true)).toBe(expectedResult);
  });
  test('Date', () => {
    const expectedResult = '[object Date]';
    expect(stringifyNativeType(Date)).toBe(expectedResult);
    expect(stringifyNativeType(new Date())).toBe(expectedResult);
  });
  test('Array', () => {
    const expectedResult = '[object Array]';
    expect(stringifyNativeType(Array)).toBe(expectedResult);
    expect(stringifyNativeType([])).toBe(expectedResult);
  });
  test('Function', () => {
    const expectedResult = '[object Function]';
    expect(stringifyNativeType(Function)).toBe(expectedResult);
    expect(stringifyNativeType(() => {})).toBe(expectedResult);
  });
  test('AsyncFunction', () => {
    const expectedResult = '[object AsyncFunction]';
    expect(stringifyNativeType(async () => {})).toBe(expectedResult);
  });
  test('Object', () => {
    const expectedResult = '[object Object]';
    expect(stringifyNativeType(Object)).toBe(expectedResult);
    expect(stringifyNativeType({})).toBe(expectedResult);
  });
  test('Undefined & null', () => {
    expect(stringifyNativeType(undefined)).toBe('[object Undefined]');
    expect(stringifyNativeType(null)).toBe('[object Null]');
  });
});

describe('Property value verification', () => {
  test('basic', () => {
    expect(check('[object String]', '')).toBe(true);
    expect(check('[object Date]', new Date())).toBe(true);
    expect(check('[object Number]', 12)).toBe(true);
    expect(check('[object Array]', [])).toBe(true);
    expect(check(Object, {})).toBe(true);
    expect(check('[object String]', 'test')).toBe(true);
    expect(check('[object String]', 12)).toBe(false);
    expect(check('[object Number]', '12')).toBe(false);
    expect(check('[object Date]', Date)).toBe(false);
    expect(check('[object Number]', 12)).toBe(true);
    expect(check('[object Array]', new Array(5))).toBe(true);
  });

  test('Localization', () => {
    expect(check('[object String]', { es: 'hola', en: 'hello' })).toBe(true);
    expect(check('[object String]', { test: 'hola' })).toBe(false);
  });

  test('Functions', () => {
    expect(check('[object String]', doc => doc.title, { title: 'test' })).toBe(true);
    expect(check('[object Date]', () => new Date())).toBe(true);
    expect(check('[object Number]', (a, b) => a + b, 4, 5)).toBe(true);
    expect(check('[object Array]', () => [])).toBe(true);
    expect(check('[object String]', () => 12)).toBe(false);
    expect(check('[object Number]', '12')).toBe(false);
    expect(check('[object Date]', () => Date)).toBe(false);
    expect(check('[object Number]', () => 12)).toBe(true);
    expect(check('[object Array]', list => list.map(c => c), new Array(5))).toBe(true);
    expect(check('[object String]', () => ({ es: 'hola', en: 'hello' }))).toBe(true);
  });

  test('Promises', () => {
    expect(check('[object String]', async () => '')).toBe(true);
    expect(check('[object Date]', async () => '')).toBe(true);
  });
});
