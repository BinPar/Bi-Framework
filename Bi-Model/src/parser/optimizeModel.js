import isEquivalent from '../tools/isEquivalent';

function getEntityFromModel(model, shortName) {
  return model.find(entity => entity.shortName === shortName);
}

function addEntityAndReferences(model) {
  let needAdditionalLoop = false;
  model.forEach((entity) => {
    if (entity.model) {
      const properties = Object.keys(entity.model).map(key => entity.model[key]);
      properties.filter(property => property.type.isSubObject).forEach((subEntity) => {
        if (!getEntityFromModel(model, subEntity.shortName)) {
          model.push({ ...subEntity, isVirtual: true });
          needAdditionalLoop = true;
        }
      });
    }
  });
  if (needAdditionalLoop) addEntityAndReferences(model);
}

function processEntity(model, entity, orderedModel) {
  if (entity.composedBy) {
    const targetEntity = getEntityFromModel(model, entity.composedBy.shortName);
    if (targetEntity) {
      const index = model.indexOf(targetEntity);
      model.splice(index, 1);
      processEntity(model, targetEntity, orderedModel);
    }
  }
  if (entity.model) {
    Object.keys(entity.model)
      .map(name => entity.model[name].targetCollectionShortName)
      .filter(target => target)
      .forEach((referencedCollectionName) => {
        const targetEntity = getEntityFromModel(model, referencedCollectionName);
        if (targetEntity) {
          const index = model.indexOf(targetEntity);
          model.splice(index, 1);
          processEntity(model, targetEntity, orderedModel);
        }
      });
  }
  orderedModel.push(entity);
}
function getRelatedEntities(entity, model) {
  if (entity.model) {
    return [entity];
  }
  let result = [];
  entity.composedModel.forEach((subEntity) => {
    result = result.concat(getRelatedEntities(subEntity, model));
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

function addComposedEntities(model) {
  let newModel = [];
  model.forEach((entity) => {
    if (entity.composedModel && !entity.model) {
      newModel = newModel.concat(calculateComposedModel(entity, model));
    } else {
      newModel.push(entity);
    }
  });
  return newModel;
}

export default (input) => {
  let model = [...input];
  model = addComposedEntities(model);
  addEntityAndReferences(model);
  const orderedModel = [];
  while (model.length) {
    processEntity(model, model.pop(), orderedModel);
  }
  return orderedModel;
};
