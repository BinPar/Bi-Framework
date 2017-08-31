import faker from 'faker';

export default {
  getFakedValue: () => faker.company.companyName(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
