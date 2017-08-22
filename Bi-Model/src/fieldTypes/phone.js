import faker from 'faker';

export default {
  graphQLType: 'String',
  getFakedValue: () => faker.phone.phoneNumber(),
  mongooseFieldType: String,
};
