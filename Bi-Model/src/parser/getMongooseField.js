import { getValue } from './properties';

const EQUIVALENCE_ENTITY_MONGOOSE_PROPS = {
  required: { propName: 'required', type: Boolean },
  indexed: { propName: 'index', type: Boolean },
  unique: { propName: 'unique', type: Boolean },
  trim: { propName: 'trim', type: Boolean },
  optionsValues: { propName: 'enum', type: Array },
};

const getMongooseField = async function getMongooseField(fieldName, field) {
  const mongooseField = {
    type: field.type.mongooseFieldType,
  };

  function processProperty(propertyName) {
    return (async () => {
      const mongooseProperty = EQUIVALENCE_ENTITY_MONGOOSE_PROPS[propertyName];
      if (mongooseProperty) {
        mongooseField[mongooseProperty.propName] = await getValue(
          mongooseProperty.type,
          field[propertyName],
          null,
          {},
        );
      }
    })();
  }
  await Promise.all(Object.keys(field).map(processProperty));
  const stored = !!field.stored && (await getValue(Boolean, field.stored, null, {}));
  if (field.value && !stored) {
    mongooseField.isVirtual = true;
  }
  return mongooseField;
};

export default getMongooseField;
