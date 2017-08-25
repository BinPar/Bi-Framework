import faker from 'faker';

export default {
  getFakedValue: () => faker.name.lastName(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
