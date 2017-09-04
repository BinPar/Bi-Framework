export default {
  getFakedValue: field => field.values[Math.floor(Math.random() * field.values.length)],
  requiredProperties: ['values', 'enumName'],
  graphQLType: field => field.enumName,
  mongooseFieldType: String,
  validator: (value, field) => field.values.indexOf(value) !== -1,
  isEnum: true,
};
