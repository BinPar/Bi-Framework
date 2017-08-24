import faker from 'faker';

export default {
  getFakedValue: () => faker.image.imageUrl(),
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
};
