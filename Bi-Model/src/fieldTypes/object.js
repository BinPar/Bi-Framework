export default {
  graphQLType: field => `${field.shortName}`,
  getFakedValue: () => ({}),
  requiredProperties: [],
  mongooseFieldType: Object,
  isSubObject: true,
};
