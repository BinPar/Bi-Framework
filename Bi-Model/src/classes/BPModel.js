
const privatePropertiesMap = new WeakMap();

export default class BPModel {
  constructor(mongooseModel) {
    const privateProperties = {
      mongooseModel,
    };
    privatePropertiesMap.set(this, privateProperties);
  }

  get mongooseModel() {
    return privatePropertiesMap.get(this).mongooseModel;
  }
}
