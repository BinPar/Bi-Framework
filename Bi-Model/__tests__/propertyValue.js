import { getValue } from '../src/parser/properties';

const { describe, test, expect } = global;

describe('Property type verification', () => {
  test('basic Test', () => {
    expect.assertions(1);
    return getValue('[object String]', 'test').then(value => expect(value).toBe('test'));
  });

  test('not Date', () => {
    expect.assertions(1);
    return getValue('[object Date]', new Date(10000)).then(value =>
      expect(value.toISOString()).toBe(new Date(10000).toISOString()),
    );
  });

  test('basic Number', () => {
    expect.assertions(1);
    return getValue('[object Number]', 2).then(value => expect(value).toBe(2));
  });

  test('basic Array', () => {
    expect.assertions(1);
    return getValue('[object Array]', [2, 1, 2]).then(value => expect(value.length).toBe(3));
  });
});
