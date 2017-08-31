import fullSampleModel from '../sample/full/model';
import { generateGraphQLSchema, generateGraphQLEntity } from '../src/parser/generateGraphQLSchema';

const { describe, test, expect } = global;

describe('Generate GraphQL Entities', () => {
  fullSampleModel.forEach((entity) => {
    test(`${entity.shortName} Test`, async () => {
      const schema = await generateGraphQLEntity(entity);
      expect(schema.indexOf(`${entity.shortName}`)).toBeGreaterThan(1);
    });
  });
});

describe('Generate GraphQL Schema', () => {
  test('Full sample model', async () => {
    const schema = await generateGraphQLSchema(fullSampleModel);
    expect(schema.indexOf(`${fullSampleModel[0].shortName}`)).toBeGreaterThan(1);
  });
});
