function getEntityFromModel(model, shortName) {
  return model.find(entity => entity.shortName === shortName);
}

function addEntityAndReferences(model) {
  let needAdditionalLoop = false;
  model.forEach((entity) => {
    const properties = Object.keys(entity.model).map(key => entity.model[key]);
    properties.filter(property => property.type.isSubObject).forEach((subEntity) => {
      if (!getEntityFromModel(model, subEntity.shortName)) {
        model.push(subEntity);
        needAdditionalLoop = true;
      }
    });
  });
  if (needAdditionalLoop) addEntityAndReferences(model);
}

function processEntity(model, entity, orderedModel) {
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
  orderedModel.push(entity);
}

export default (input) => {
  const model = [...input];
  addEntityAndReferences(model);
  const orderedModel = [];
  while (model.length) {
    processEntity(model, model.pop(), orderedModel);
  }
  return orderedModel;
};
