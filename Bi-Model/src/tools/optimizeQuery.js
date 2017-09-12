import mongoose from 'mongoose';

const getRelatedFields = (selectors, collectionName) => {
  const model = mongoose.model(collectionName);
  const fields = {};

  selectors.forEach((selection) => {
    const fieldName = selection.name.value;
    const targetFieldInfo = model.schema.paths[fieldName];
    if (targetFieldInfo) {
      if (
        !(
          targetFieldInfo.caster &&
          targetFieldInfo.caster.options &&
          targetFieldInfo.caster.options.ref
        )
      ) {
        fields[fieldName] = 1;
      }
    }
  });

  return fields;
};

let processSelectionFieldReqReference = () => {};

function processSelection(selection, collectionSchema, relations, collection, prefix = '') {
  const fieldName = selection.name.value;
  const targetFieldInfo = collectionSchema.paths[prefix + fieldName];
  let fields = {};
  if (targetFieldInfo) {
    if (
      targetFieldInfo.caster &&
      targetFieldInfo.caster.options &&
      targetFieldInfo.caster.options.ref
    ) {
      relations.push({
        fieldName,
        fields: getRelatedFields(
          selection.selectionSet.selections,
          targetFieldInfo.caster.options.ref,
        ),
      });
    }
    fields[prefix + fieldName] = 1;
  } else if (selection.selectionSet) {
    fields = {
      ...processSelectionFieldReqReference(
        selection.selectionSet.selections,
        collectionSchema,
        relations,
        collection,
        `${prefix}${fieldName}.`,
      ),
      ...fields,
    };
  }
  return fields;
}

function processSelectionFieldReq(selections, collectionSchema, relations, collection, prefix) {
  let fields = {};
  selections.forEach((selection) => {
    fields = {
      ...fields,
      ...processSelection(selection, collectionSchema, relations, collection, prefix),
    };
  });
  return fields;
}

processSelectionFieldReqReference = processSelectionFieldReq;

const optimizeQuery = (query, queryInfo, collection) => {
  let result = query;
  const relations = [];
  let fields = {};
  const collectionSchema = collection().schema;
  queryInfo.fieldNodes[0].selectionSet.selections.forEach((selection) => {
    fields = { ...fields, ...processSelection(selection, collectionSchema, relations, collection) };
  });

  if (Object.keys(fields).length) {
    result = result.select(fields);
  }

  relations.forEach((relation) => {
    if (relation.fields) {
      result = result.populate(relation.fieldName, relation.fields);
    }
  });

  return result;
};

export default optimizeQuery;
