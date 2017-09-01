export default {
  graphQLType: (field, _, postFix) => `${field.entityShortName}${postFix}`,
  getFakedValue: () => ({}),
  requiredProperties: [],
  mongooseFieldType: Object,
  isSubObject: true,
};
