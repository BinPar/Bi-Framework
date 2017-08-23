import faker from 'faker';

export default {
  graphQLType: 'String',
  getFakedValue: () => faker.country.city(),
  mongooseFieldType: String,
};
