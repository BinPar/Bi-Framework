import faker from 'faker';

export default {
  getFakedValue: () => faker.company.name(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
