export default {
  graphQLType: field => `[${field.shortName}]`,
  mongooseFieldType: Object,
  getFakedValue: () => {},
};
