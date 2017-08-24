import faker from 'faker';

export default {
  getFakedValue: () => faker.random.word(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
