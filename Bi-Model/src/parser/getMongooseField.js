import { Schema } from 'mongoose';
import BinParTypes, { isReference, getMongooseType } from '../fieldTypes';
import getInnerFields from './getInnerFields';

const EQUIVALENCE_ENTITY_MONGOOSE_PROPS = {
  required: 'required',
  indexed: 'index',
  unique: 'unique',
  trim: 'trim',
  optionsValues: 'enum',
};

const DATABASE_ENTITY_NAME_CACHE = {};
export function getEntityByName(databaseModel, entityName) {
  if (DATABASE_ENTITY_NAME_CACHE[entityName]) {
    return DATABASE_ENTITY_NAME_CACHE[entityName];
  }
  DATABASE_ENTITY_NAME_CACHE[entityName] = databaseModel.find(
    entity => entity.collectionShortName === entityName,
  );
  return DATABASE_ENTITY_NAME_CACHE[entityName];
}

export function addDenormalizedReferences(optimizedDatabaseModel, field) {
  const mongooseField = [];
  const targetEntity = getEntityByName(optimizedDatabaseModel, field.targetCollectionShortName);
  if (field.denormalizedFields && field.denormalizedFields.length > 0) {
    const innerModel = {
      id: Schema.Types.ObjectId,
    };
    field.denormalizedFields.forEach((denormalizedFieldName) => {
      const targetField = targetEntity.model[denormalizedFieldName];
      if (!targetField) {
        throw new Error(
          `Target entity "${targetEntity.collectionShortName}" has no field called "${denormalizedFieldName}".`,
        );
      }
      const mongooseType = getMongooseType(targetField.type);
      if (denormalizedFieldName === 'type') {
        innerModel[denormalizedFieldName] = { type: mongooseType };
      } else {
        innerModel[denormalizedFieldName] = mongooseType;
      }
    });
    mongooseField.push(innerModel);
  } else {
    mongooseField.push(Schema.Types.ObjectId);
  }
  return mongooseField;
}

export default function getMongooseField(optimizedDatabaseModel, fieldName, field, isInnerModel) {
  let mongooseField = {};
  if (field.type === BinParTypes.object) {
    try {
      mongooseField = getInnerFields(optimizedDatabaseModel, field.model);
    } catch (err) {
      throw new Error(err.message.replace('{{FIELD_NAME}}', fieldName));
    }
  } else {
    if (isReference(field.type) && field.denormalized) {
      mongooseField = addDenormalizedReferences(optimizedDatabaseModel, field);
    } else {
      mongooseField.type = getMongooseType(field.type);
    }
    const properties = Object.keys(field);
    for (let i = 0, l = properties.length; i < l; i += 1) {
      const propertyName = properties[i];
      const property = field[propertyName];
      const mongooseProperty = EQUIVALENCE_ENTITY_MONGOOSE_PROPS[propertyName];
      if (mongooseProperty) {
        if (mongooseProperty === 'enum') {
          mongooseField[mongooseProperty] = property.map(v => v.value);
        } else {
          mongooseField[mongooseProperty] = property;
        }
      }
    }
  }

  if (!isInnerModel && field.value && !field.stored) {
    mongooseField.isVirtual = true;
  }

  return mongooseField;
}
