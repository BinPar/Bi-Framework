/* eslint new-cap: ["error", { "newIsCap": false }] */
/* eslint class-methods-use-this: ["off"] */
/* eslint no-empty-function: ["off"] */
import { check } from '../parser/properties';

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
    /*
      return plain objects
    */
    static async aggregate(pipeline) {
      return model.aggregate(pipeline);
    }
    static async create(docs) {
      const ensuredArray = check(Array, docs) ? docs : [docs];
      const promises = [];
      const res = [];
      for (let i = 0, l = ensuredArray.length; i < l; i += 1) {
        const doc = ensuredArray[i];
        if (doc instanceof this) {
          promises.push(doc.save());
          res.push(doc);
        } else {
          const bpDoc = new this(doc);
          promises.push(bpDoc.save());
          res.push(bpDoc);
        }
      }
      await Promise.all(promises);
      return res;
    }
    static async count(filter) {
      return new Promise((resolve, reject) => {
        model.count(filter, (err, count) => {
          if (err) {
            reject(err);
          } else {
            resolve(count);
          }
        });
      });
    }
    static async deleteMany(filter) {
      return new Promise((resolve, reject) => {
        model.deleteMany(filter, (err, count) => {
          if (err) {
            reject(err);
          } else {
            resolve(count);
          }
        });
      });
    }
    static async deleteOne() {}
    static async find() {}
    static async findById() {}
    static async findByIdAndRemove() {}
    static async findByIdAndUpdate() {}
    static async findOne() {}
    static async findOneAndRemove() {}
    static async findOneAndUpdate() {}
    static async geoNear() {}
    static async geoSearch() {}
    static async insertMany() {}
    static async populate() {}
    static async remove() {}
    static async update() {}
    static async updateOne() {}
    static async updateMany() {}

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
        isNew: true,
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
