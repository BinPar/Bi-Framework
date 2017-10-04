/* eslint new-cap: ["error", { "newIsCap": false }] */
/* eslint class-methods-use-this: ["off"] */
const privatePropertiesMap = new WeakMap();

export default ({ entity, model }) => {
  // const MAX_FIXTURES = entity.totalFixtures || 1000;
  const Class = class {
    static get name() {
      return entity.entityShortName;
    }
    static get type() {
      return `[object ${entity.entityShortName}]`;
    }
    static get entityName() {
      return entity.entityShortName;
    }
    static createFixtures() {}
    static deleteFixtures() {}

    constructor(doc, user) {
      const hooks = entity.hooks || {};
      const privateProperties = {
        model: new model(doc),
        user,
        onBeforeInsert: hooks.onBeforeInsert,
        onAfterInsert: hooks.onAfterInsert,
        onBeforeUpdate: hooks.onBeforeUpdate,
        onAfterUpdate: hooks.onAfterUpdate,
        onBeforeDelete: hooks.onBeforeDelete,
        onAfterDelete: hooks.onAfterDelete,
        onSelect: hooks.onSelect,
        dirty: false,
      };
      privatePropertiesMap.set(this, privateProperties);
    }

    get type() {
      return this.constructor.type;
    }
    get entityName() {
      return this.constructor.entityName;
    }

    // Exposed functions 
    canRead() {}
    canCreate() {}
    canUpdate() {}
    canDelete() {}
    validate() {}
    save() {}
    update() {}
    remove() {}
  };

  // Dynamic extended properties from mongoose model
  const realFields = Object.keys(model.schema.paths).filter(k => !k.startsWith('_'));
  const virtualFields = Object.keys(model.schema.virtuals).filter(k => !k.startsWith('_'));
  for (let i = 0, l = realFields.length; i < l; i += 1) {
    const field = realFields[i];
    Object.defineProperty(Class.prototype, field, {
      enumerable: true,
      get: function get() {
        return privatePropertiesMap.get(this).model[field];
      },
      set: function set(value) {
        const privates = privatePropertiesMap.get(this);
        privates.dirty = privates.model[field] !== value;
        privates.model[field] = value;
      },
    });
  }
  for (let i = 0, l = virtualFields.length; i < l; i += 1) {
    const field = virtualFields[i];
    Object.defineProperty(Class.prototype, field, {
      enumerable: true,
      get: function get() {
        return privatePropertiesMap.get(this).model[field];
      },
    });
  }
  return Class;
};
