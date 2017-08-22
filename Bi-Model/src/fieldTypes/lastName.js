import faker from 'faker';

export default {
  graphQLType: 'String',
  getFakedValue: () => faker.name.image(),
  mongooseFieldType: String,
};
