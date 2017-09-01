import fullSampleDataModel from '../sample/full/dataModel';
import optimizeDataModel from '../src/parser/optimizeDataModel';

const { describe, test, expect } = global;

describe('Optimize Model', () => {
  test('Full sample model', async () => {
    const result = optimizeDataModel(fullSampleDataModel);
    expect(result.some(entity => entity.entityShortName === 'Address')).toBe(true);
    expect(result[result.length - 1].collectionShortName).toBe('Customers');
  });
});
