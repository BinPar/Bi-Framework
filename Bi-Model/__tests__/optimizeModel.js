import fullSampleModel from '../sample/full/model';
import optimizeModel from '../src/parser/optimizeModel';

const { describe, test, expect } = global;

describe('Optimize Model', () => {
  test('Full sample model', async () => {
    const result = optimizeModel(fullSampleModel);
    expect(result.some(entity => entity.shortName === 'Address')).toBe(true);
    expect(result[result.length - 1].shortName).toBe('Customers');
  });
});
