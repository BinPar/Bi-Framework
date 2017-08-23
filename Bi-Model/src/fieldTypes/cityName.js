import faker from 'faker';

export default {
  graphQLType: 'String',
  getFakedValue: () => faker.address.city(),
  mongooseFieldType: String,
};
