import { find } from '../src/db';

const { describe, test, expect } = global;
describe('imports co', () => {
  test('db import', () => {
    expect(find).toBeDefined();
  });
});
