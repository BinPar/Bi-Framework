import getMongooseField from './getMongooseField';
import { check } from './properties';

export default function getInnerFields(optimizedDatabaseModel, innerModel) {
  if (!optimizedDatabaseModel) {
    throw new Error('You should provide a valid optimized data model');
  }
  if (!innerModel || !check(Object, innerModel)) {
    throw new Error('The field "{{FIELD_NAME}}" has type object but has invalid "model" property');
  }
  const mongooseField = {};
  const innerFieldNames = Object.keys(innerModel);
  for (let i = 0, l = innerFieldNames.length; i < l; i += 1) {
    const innerFieldName = innerFieldNames[i];
    const innerField = innerModel[innerFieldName];
    mongooseField[innerFieldName] = getMongooseField(
      optimizedDatabaseModel,
      innerFieldName,
      innerField,
      true,
    );
  }

  return mongooseField;
}
