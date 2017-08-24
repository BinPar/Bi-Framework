import { getValue } from '../src/parser/properties';

const { describe, test, expect } = global;

describe('Property type verification', () => {
  test('basic Test', async () => {
    expect(await getValue('[object String]', 'test')).toBe('test');
    expect(await getValue('[object Date]', new Date(10000))).toEqual(new Date(10000));
    expect(await getValue('[object Number]', 2)).toBe(2);
    expect(await getValue('[object Array]', [2, 1, 2])).toHaveLength(3);
  });
});
