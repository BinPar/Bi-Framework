import faker from 'faker';

export default {
  getFakedValue: () => faker.phone.phoneNumber(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
