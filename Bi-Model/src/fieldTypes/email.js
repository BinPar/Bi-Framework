import faker from 'faker';

export default {
  getFakedValue: () => faker.internet.email(),
  validator: value =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value,
    ),
  requiredProperties: [],
  mongooseFieldType: String,
  graphQLType: 'String',
};
