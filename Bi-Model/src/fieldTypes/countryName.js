import faker from 'faker';

export default {
  getFakedValue: () => faker.address.city(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
