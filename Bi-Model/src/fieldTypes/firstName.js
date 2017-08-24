import faker from 'faker';

export default {
  getFakedValue: () => faker.name.firstName(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
