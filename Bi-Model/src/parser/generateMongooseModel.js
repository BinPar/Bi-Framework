import mongoose, { Schema } from 'mongoose';
import { hasOwnProperty } from '../tools/objectUtils';
import getMongooseField from './getMongooseField';
import optimizeDataModel from './optimizeDataModel';

export function processEntity(optimizedDatabaseModel, entity) {
  if (!optimizedDatabaseModel) {
    throw new Error('You should provide an optimized database model to "processEntity" function');
  }
  if (!entity) {
    throw new Error('You should provide a valid entity to "processEntity" function');
  }
  const baseSchemaObject = {};
  const virtualFields = {};
  const fields = Object.keys(entity.model);
  for (let i = 0, l = fields.length; i < l; i += 1) {
    const fieldName = fields[i];
    const field = entity.model[fieldName];
    const processedField = getMongooseField(optimizedDatabaseModel, fieldName, field);
    if (processedField.isVirtual) {
      virtualFields[fieldName] = processedField;
    } else {
      baseSchemaObject[fieldName] = processedField;
    }
  }

  return {
    baseSchemaObject,
    virtualFields,
  };
}

function addVirtualFieldsToSchema(virtualFields, schema) {
  const virtualFieldsKeys = Object.keys(virtualFields);
  for (let i = 0, l = virtualFieldsKeys.length; i < l; i += 1) {
    const fieldName = virtualFieldsKeys[i];
    schema.virtual(fieldName).get(function getVirtual() {
      const value = virtualFields[virtualFieldsKeys].value;
      if (typeof value === 'function') {
        return value(this);
      }
      return value;
    });
  }
  return schema;
}

export default function generateMongooseModel(databaseModel) {
  let optimizedDatabaseModel = databaseModel;
  optimizedDatabaseModel = optimizeDataModel(optimizedDatabaseModel);
  const DB = [];
  for (let i = 0; i < optimizedDatabaseModel.length; i += 1) {
    const entity = optimizedDatabaseModel[i];
    if (entity.collectionShortName) {
      const { baseSchemaObject, virtualFields } = processEntity(optimizedDatabaseModel, entity);
      const mongooseSchema = new Schema(baseSchemaObject);
      addVirtualFieldsToSchema(virtualFields, mongooseSchema);
      DB.push(mongoose.model(
        `${entity.collectionShortName[0].toLowerCase()}${entity.collectionShortName.substr(1)}`,
        mongooseSchema,
      ));
    }
  }
  return DB;
}
