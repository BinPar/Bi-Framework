import { makeExecutableSchema } from 'graphql-tools';
import biBooksSampleModel from '../sample/biBooks/dataModel';
import { generateGraphQLSchema } from '../src/parser/generateGraphQLSchema';

const { describe, test, expect } = global;

describe('Generate GraphQL Bi-Books Schema', () => {
  test('Full Bi-Books model', async () => {
    const schema = await generateGraphQLSchema(biBooksSampleModel);
    expect(schema.indexOf(`${biBooksSampleModel[0].entityShortName}`)).toBeGreaterThan(1);
  });
});

describe('Make Bi-Books Executable Schema', () => {
  test('Full Bi-Books sample model', async () => {
    const typeDefs = await generateGraphQLSchema(biBooksSampleModel);
    console.log(typeDefs);
    await makeExecutableSchema({ typeDefs, resolvers: {} });
  });
});
