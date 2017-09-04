import { makeExecutableSchema } from 'graphql-tools';
import fullSampleModel from '../sample/full/dataModel';
import { generateGraphQLSchema } from '../src/parser/generateGraphQLSchema';

const { describe, test, expect } = global;

describe('Generate GraphQL Full Schema', () => {
  test('Full sample model', async () => {
    const schema = await generateGraphQLSchema(fullSampleModel);
    expect(schema.indexOf(`${fullSampleModel[0].entityShortName}`)).toBeGreaterThan(1);
  });
});

describe('Make Executable Schema', () => {
  test('Full sample model', async () => {
    const typeDefs = await generateGraphQLSchema(fullSampleModel);
    makeExecutableSchema({
      typeDefs,
      resolvers: {},
    });
  });
});
