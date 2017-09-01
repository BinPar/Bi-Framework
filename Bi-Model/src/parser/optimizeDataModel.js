import isEquivalent from '../tools/isEquivalent';

function getEntityFromModel(dataModel, collectionShortName) {
  return dataModel.find(entity => entity.collectionShortName === collectionShortName);
}

function addEntityAndReferences(dataModel) {
  let needAdditionalLoop = false;
  dataModel.forEach((entity) => {
    if (entity.model) {
      const properties = Object.keys(entity.model).map(key => entity.model[key]);
      properties.filter(property => property.type.isSubObject).forEach((subEntity) => {
        if (!getEntityFromModel(dataModel, subEntity.collectionShortName)) {
          dataModel.push({ ...subEntity, isVirtual: true });
          needAdditionalLoop = true;
        }
      });
    }
  });
  if (needAdditionalLoop) addEntityAndReferences(dataModel);
}

function processEntity(dataModel, entity, orderedDataModel) {
  if (entity.composedBy) {
    const targetEntity = getEntityFromModel(dataModel, entity.composedBy.collectionShortName);
    if (targetEntity) {
      const index = dataModel.indexOf(targetEntity);
      dataModel.splice(index, 1);
      processEntity(dataModel, targetEntity, orderedDataModel);
    }
  }
  if (entity.model) {
    Object.keys(entity.model)
      .map(name => entity.model[name].targetCollectionShortName)
      .filter(target => target)
      .forEach((referencedCollectionName) => {
        const targetEntity = getEntityFromModel(dataModel, referencedCollectionName);
        if (targetEntity) {
          const index = dataModel.indexOf(targetEntity);
          dataModel.splice(index, 1);
          processEntity(dataModel, targetEntity, orderedDataModel);
        }
      });
  }
  orderedDataModel.push(entity);
}

function getRelatedEntities(entity, dataModel) {
  if (entity.model) {
    return [entity];
  }
  let result = [];
  entity.composedModel.forEach((subEntity) => {
    result = result.concat(getRelatedEntities(subEntity, dataModel));
  });
  return result;
}

function calculateComposedModel(entity, model) {
  const relatedEntities = getRelatedEntities(entity, model);
  if (relatedEntities.length) {
    for (let i = 0; i < relatedEntities.length; i += 1) {
      relatedEntities[i].composedBy = entity;
    }
    const fistEntity = relatedEntities.pop();
    const mergedModel = {};
    Object.keys(fistEntity.model)
      .filter(name =>
        relatedEntities.every(
          related =>
            related.model[name] && isEquivalent(fistEntity.model[name], related.model[name]),
        ),
      )
      .forEach((name) => {
        mergedModel[name] = fistEntity.model[name];
      });
    return { ...entity, model: mergedModel, isInterface: true };
  }
  return entity;
}

function addComposedEntities(dataModel) {
  let newModel = [];
  dataModel.forEach((entity) => {
    if (entity.composedModel && !entity.model) {
      newModel = newModel.concat(calculateComposedModel(entity, dataModel));
    } else {
      newModel.push(entity);
    }
  });
  return newModel;
}

export default (input) => {
  let dataModel = [...input];
  dataModel = addComposedEntities(dataModel);
  addEntityAndReferences(dataModel);
  const orderedModel = [];
  while (dataModel.length) {
    processEntity(dataModel, dataModel.pop(), orderedModel);
  }
  return orderedModel;
};
