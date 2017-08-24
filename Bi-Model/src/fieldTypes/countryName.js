import faker from 'faker';

export default {
  getFakedValue: () => faker.country.city(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
