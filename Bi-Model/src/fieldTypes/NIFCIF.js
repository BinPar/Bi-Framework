import faker from 'faker';

export default {
  getFakedValue: () => faker.random.uuid(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
