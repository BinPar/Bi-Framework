import faker from 'faker';

export default {
  getFakedValue: () => faker.random.boolean(),
  requiredProperties: [],
  graphQLType: 'Boolean',
  mongooseFieldType: Boolean,
};
