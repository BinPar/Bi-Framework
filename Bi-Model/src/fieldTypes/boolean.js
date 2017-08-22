import faker from 'faker';

export default {
  graphQLType: 'Boolean',
  getFakedValue: () => faker.random.boolean(),
  mongooseFieldType: Boolean,
};
