import faker from 'faker';

export default {
  graphQLType: 'String',
  getFakedValue: () => faker.name.firstName(),
  mongooseFieldType: String,
};
