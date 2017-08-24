import { check } from '../src/parser/properties';

const { describe, test, expect } = global;

describe('Property type verification', () => {
  test('basic', () => {
    expect(check('[object String]', '')).toBe(true);
    expect(check('[object Date]', new Date())).toBe(true);
    expect(check('[object Number]', 12)).toBe(true);
    expect(check('[object Array]', [])).toBe(true);
    expect(check('[object String]', 'test')).toBe(true);
    expect(check('[object String]', 12)).toBe(false);
    expect(check('[object Number]', '12')).toBe(false);
    expect(check('[object Date]', Date)).toBe(false);
    expect(check('[object Number]', 12)).toBe(true);
    expect(check('[object Array]', new Array(5))).toBe(true);
  });

  test('localization', () => {
    expect(check('[object String]', { es: 'hola', en: 'hello' })).toBe(true);
    expect(check('[object String]', { test: 'hola' })).toBe(false);
  });

  test('functions', () => {
    expect(check('[object String]', doc => doc.title, { title: 'test' })).toBe(true);
    expect(check('[object Date]', () => new Date())).toBe(true);
    expect(check('[object Number]', (a, b) => a + b, 4, 5)).toBe(true);
    expect(check('[object Array]', () => [])).toBe(true);
    expect(check('[object String]', () => 12)).toBe(false);
    expect(check('[object Number]', '12')).toBe(false);
    expect(check('[object Date]', () => Date)).toBe(false);
    expect(check('[object Number]', () => 12)).toBe(true);
    expect(check('[object Array]', list => list.map(c => c), new Array(5))).toBe(true);
  });
});
