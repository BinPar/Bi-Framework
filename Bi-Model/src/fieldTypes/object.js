export default {
  graphQLType: field => `[${field.shortName}]`,
  requiredProperties: [],
  getFakedValue: () => {},
  mongooseFieldType: Object,
};
