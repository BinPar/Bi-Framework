const EQUIVALENCE_ENTITY_MONGOOSE_PROPS = {
  required: 'required',
  indexed: 'index',
};

const getMongooseField = async function getMongooseField(fieldName, field) {
  const mongooseField = {
    type: field.type.mongooseFieldType,
  };
  const properties = Object.keys(field);
  for (let i = 0, l = properties.length; i < l; i += 1) {
    const propertyName = properties[i];
    const property = field[propertyName];
    const mongooseProperty = EQUIVALENCE_ENTITY_MONGOOSE_PROPS[propertyName];
    if (mongooseProperty) {
      mongooseField[mongooseProperty] = property;
    }
  }
  return mongooseField;
};

export default getMongooseField;
