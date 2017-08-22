import faker from 'faker';

export default {
  graphQLType: 'String',
  getFakedValue: () => faker.image.imageUrl(),
  mongooseFieldType: String,
};
