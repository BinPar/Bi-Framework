import isEquivalent from '../src/tools/isEquivalent';

const { describe, test, expect } = global;

describe('Object equivalence type verification', () => {
  test('Simple', () => expect(isEquivalent({}, {})).toBe(true));
  test('Left Only', () => expect(isEquivalent({}, { a: 1 })).toBe(false));
  test('Right Only', () => expect(isEquivalent({}, { a: 1 })).toBe(false));
  test('One property', () => expect(isEquivalent({ a: 1 }, { a: 1 })).toBe(true));
  test('One distinct property', () => expect(isEquivalent({ a: 1 }, { a: 2 })).toBe(false));
  test('Who properties', () =>
    expect(isEquivalent({ a: 1, b: 'as' }, { a: 1, b: 'as' })).toBe(true));
  test('Who distinct properties', () =>
    expect(isEquivalent({ a: 1, b: 'as' }, { a: 1, b: 2 })).toBe(false));
  test('Sub nodes', () =>
    expect(isEquivalent({ a: 1, b: { a: 'as', c: 1 } }, { b: { a: 'as', c: 1 }, a: 1 })).toBe(
      true,
    ));
  test('Distinct sub nodes', () =>
    expect(isEquivalent({ a: 1, b: { a: 'as', c: 1 } }, { b: { a: 'asd', c: 1 }, a: 1 })).toBe(
      false,
    ));
  test('Distinct sub nodes Level 2', () =>
    expect(isEquivalent({ b: { a: 3, c: 1 }, a: 2 }, { b: { a: 3, c: 1 }, a: 1 })).toBe(false));
});
