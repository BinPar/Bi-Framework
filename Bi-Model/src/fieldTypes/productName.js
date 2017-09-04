import faker from 'faker';

export default {
  getFakedValue: () => faker.commerce.productName(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
