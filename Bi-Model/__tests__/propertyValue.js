import { getValue } from '../src/parser/properties';

const { describe, test, expect } = global;

describe('Property type verification', () => {
  test('basic Test', async () => {
    expect(await getValue('[object String]', 'test')).toBe('test');
    expect(await getValue('[object String]', 't')).not.toBe('test');
    expect(await getValue('[object Date]', new Date(10000))).toEqual(new Date(10000));
    expect(await getValue('[object Number]', 2)).toBe(2);
    expect(await getValue('[object Array]', [2, 1, 2])).toHaveLength(3);
  });
  test('localized Test', async () => {
    expect(await getValue('[object String]', { es: 'nombre', en: 'name' }, 'es')).toBe('nombre');
    expect(await getValue('[object String]', { es: 'nombre', en: 'name' }, 'en')).toBe('name');
    expect(await getValue('[object String]', { es: 'nombre', en: 'name' }, 'fr')).toBe('nombre');
    expect(await getValue('[object String]', { en: 'name', es: 'nombre' }, 'fr')).toBe('nombre');
  });

  test('function Test', async () => {
    expect(await getValue('[object String]', () => 'test')).toBe('test');
    expect(await getValue('[object String]', () => 'test')).not.toBe('test ');
    expect(await getValue('[object String]', param => `Hello ${param}`, 'es', 'World')).toBe(
      'Hello World',
    );
    expect(await getValue('[object Number]', (a, b) => a ** b), null, 3, 2).not.toBe(9);
    expect(
      await getValue('[object Array]', list => list.filter(value => value % 2), null, [4, 3, 2, 1]),
    ).toHaveLength(2);
    expect(await getValue('[object Date]', () => new Date(10000))).not.toEqual(new Date(10001));
  });

  test('async Test', async () => {
    expect(
      await getValue(
        '[object String]',
        async (param) => {
          const result = await `Hello ${param}`;
          return result;
        },
        'es',
        'World',
      ),
    ).toBe('Hello World');
    expect(
      await getValue(
        '[object Number]',
        async (param) => {
          const result = await `Hello ${param}`;
          return result;
        },
        'es',
        'World',
      ),
    ).toBe(null);
  });
});
