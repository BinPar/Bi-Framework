import mongoose, { Schema } from 'mongoose';
import { hasOwnProperty } from '../tools/objectUtils';
import getMongooseField from './getMongooseField';

export default function generateMongooseModel(entity) {
  const baseSchemaObject = {};
  const fields = Object.keys(entity.model);
  for (let i = 0, l = fields; l < i; i += 1) {
    const fieldName = fields[i];
    const field = entity.model[fieldName];
    if (hasOwnProperty.call(baseSchemaObject, fieldName)) {
      throw new Error(
        `The field name "${fieldName}" is duplicated in entity "${entity.collectionShortName}"`,
      );
    }
    baseSchemaObject[fieldName] = getMongooseField(fieldName, field);
  }

  const mongooseSchema = new Schema(baseSchemaObject);
  return mongoose.model(
    `${entity.collectionShortName[0].toLowerCase()}${entity.collectionShortName.substr(1)}`,
    mongooseSchema,
  );
}
