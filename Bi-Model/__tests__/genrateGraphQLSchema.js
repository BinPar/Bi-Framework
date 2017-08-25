import fullSampleModel from '../sample/full/model';
import { generateGraphQLSchema, generateGraphQLEntity } from '../src/parser/generateGraphQLSchema';

const { describe, test, expect } = global;

describe('Generate GraphQL Entities', () => {
  fullSampleModel.forEach((entity) => {
    test(`${entity.shortName} Test`, () => {
      expect(generateGraphQLEntity(entity).indexOf(`${entity.shortName}`)).toBeGreaterThan(1);
    });
  });
});

describe('Generate GraphQL Schema', () => {
  test('Full sample model', () => {
    expect(generateGraphQLSchema(fullSampleModel).indexOf(`${fullSampleModel[0].shortName}`)).toBeGreaterThan(1);
  });
});
