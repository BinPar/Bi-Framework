import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('general', () => {
  it('aritmética', () => {
    assert.equal(5, 3 + 2, 'la suma funciona');
  });
});
