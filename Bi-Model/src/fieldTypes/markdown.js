import faker from 'faker';

export default {
  getFakedValue: () => faker.lorem.paragraphs(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
