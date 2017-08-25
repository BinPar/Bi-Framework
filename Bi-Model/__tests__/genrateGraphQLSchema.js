import fullSampleModel from '../sample/full/model';
import { generateGraphQLSchema, generateGraphQLEntity } from '../src/parser/generateGraphQLSchema';

const { describe, test, expect } = global;

describe('GenerateGraphQLSchema', () => {
  fullSampleModel.forEach((entity) => {
    test(`${entity.shortName} Test`, async () => {
      expect(generateGraphQLEntity(entity).indexOf(`${entity.shortName}`)).toBeGreaterThan(1);
    });
  });
});
