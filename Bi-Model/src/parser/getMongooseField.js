const EQUIVALENCE_ENTITY_MONGOOSE_PROPS = {
  required: 'required',
  indexed: 'index',
  unique: 'unique',
  trim: 'trim',
  optionsValues: 'enum',
};

const getMongooseField = function getMongooseField(fieldName, field) {
  const mongooseField = {
    type: field.type.mongooseFieldType,
    mongooseAdditionalOptions: { },
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

  if (field.value && !field.stored) {
    mongooseField.mongooseAdditionalOptions.isVirtual = true;
  }
  return mongooseField;
};

export default getMongooseField;
