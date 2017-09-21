import mongoose, { Schema } from 'mongoose';
import { hasOwnProperty } from '../tools/objectUtils';
import getMongooseField from './getMongooseField';

export default function generateMongooseModel(entity) {
  const baseSchemaObject = {};
  const virtualFields = {};
  const fields = Object.keys(entity.model);
  for (let i = 0, l = fields.length; l < i; i += 1) {
    const fieldName = fields[i];
    const field = entity.model[fieldName];
    if (hasOwnProperty.call(baseSchemaObject, fieldName)) {
      throw new Error(
        `The field name "${fieldName}" is duplicated in entity "${entity.collectionShortName}"`,
      );
    }
    const processedField = getMongooseField(fieldName, field);
    if (processedField.mongooseAdditionalOptions.isVirtual) {
      virtualFields[fieldName] = processedField;
    } else {
      const { mongooseAdditionalOptions, ...baseSchemaField } = processedField;
      baseSchemaObject[fieldName] = baseSchemaField;
    }
  }

  const mongooseSchema = new Schema(baseSchemaObject);

  const virtualFieldsKeys = Object.keys(virtualFields);
  for (let i = 0, l = virtualFieldsKeys.length; i < l; i += 1) {
    const fieldName = virtualFieldsKeys[i];
    mongooseSchema.virtual(fieldName).get(function getVirtual() {
      const value = virtualFields[virtualFieldsKeys].value;
      if (typeof value === 'function') {
        return value(this);
      }
      return value;
    });
  }

  return mongoose.model(
    `${entity.collectionShortName[0].toLowerCase()}${entity.collectionShortName.substr(1)}`,
    mongooseSchema,
  );
}
