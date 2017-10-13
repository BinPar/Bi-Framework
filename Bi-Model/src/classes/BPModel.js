/* eslint new-cap: ["error", { "newIsCap": false }] */
/* eslint class-methods-use-this: ["off"] */
/* eslint no-empty-function: ["off"] */
import { check } from '../parser/properties';

const privatePropertiesMap = new WeakMap();

export default ({ entity, model }) => {
  // const MAX_FIXTURES = entity.totalFixtures || 1000;
  /**
   * Dynamic class BPModels.
   * It's generated dynamically for every entity of the database model
   * @class
   */
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

    /**
     * Performs aggregations on the models collection.
     * @function aggregate
     * @async
     * @static
     * @param {Array} pipeline - The aggregation pipeline.
     * @return {Promise} The promise which will be resolved
     * with the plain object result of aggregation.
     */
    static async aggregate(pipeline) {
      return model.aggregate(pipeline).exec();
    }

    /**
     * Create and save the docs provided.
     * @function create
     * @async
     * @static
     * @param {Array} documents - Documents to be saved.
     * @param {boolean} [dontSave] - If true the documents just will be transform to BPModels.
     * @return {Array.<T>} An array with all the documents in BPModel form.
     */
    static async create(docs, dontSave) {
      const ensuredArray = check(Array, docs) ? docs : [docs];
      const promises = [];
      const res = [];
      for (let i = 0, l = ensuredArray.length; i < l; i += 1) {
        const doc = ensuredArray[i];
        if (doc instanceof this) {
          if (!dontSave) {
            promises.push(doc.save());
          }
          res.push(doc);
        } else {
          const bpDoc = new this(doc);
          if (!dontSave) {
            promises.push(bpDoc.save());
          }
          res.push(bpDoc);
        }
      }
      await Promise.all(promises);
      return res;
    }

    /**
     * Counts number of matching documents in a database collection.
     * @function count
     * @async
     * @static
     * @param {Object} filter - Mongo filter like object
     * @return {number} Number of matching documents.
     */
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

    /**
     * Deletes all of the documents that match filter from the collection.
     * Performs a remove() in every document that match the filter.
     * @function deleteMany
     * @async
     * @static
     * @param {Object} filter - Mongo filter like object
     * @return {number} Number of removed elements.
     */
    static async deleteMany(filter) {
      const matchingDocuments = await this.find(filter);
      const promises = [];
      for (let i = 0, l = matchingDocuments.length; i < l; i += 1) {
        promises.push(matchingDocuments[i].remove());
      }
      await Promise.all(promises);
      return matchingDocuments.length;
    }

    /**
     * Deletes the first document that match filter from the collection.
     * Performs a remove() in the document that match the filter.
     * @function deleteOne
     * @async
     * @static
     * @param {Object} filter - Mongo filter like object
     * @return {boolean} True if an element is removed and false if not.
     */
    static async deleteOne(filter) {
      const matchingDocument = await this.findOne(filter);
      if (matchingDocument) {
        return matchingDocument.remove();
      }
      return false;
    }

    /**
     * Finds documents with projections, sort, limits and skip options.
     * @function find
     * @async
     * @static
     * @param {Object} filter - Mongo filter like object
     * @param {Object} [projection] - Mongo projection like object
     * @param {Object} [sort] - Mongo sort like object
     * @param {number} [limit]
     * @param {number} [skip]
     * @return {Array.<T>} An array of BPModels representing the matching documents.
     */
    static async find(filter, projection, sort, limit, skip) {
      let query = model.find(filter, projection);
      if (sort) {
        query = query.sort(sort);
      }
      if (limit) {
        query = query.limit(limit);
      }
      if (skip) {
        query = query.limit(skip);
      }
      const result = await query.exec();
      return this.create(result, true);
    }

    /**
     * Find a document by _id.
     * @function findById
     * @async
     * @static
     * @param {(ObjectId|string)} id - The id to find
     * @param {Object} [projection] - Mongo projection like object
     * @return {<T>} The BPModel that represents the matching document.
     */
    static async findById(id, projection) {
      return model.findById(id, projection).exec();
    }
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
        model: doc instanceof model ? doc : new model(doc),
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
      /* Object.defineProperty(privateProperties, 'model', {
        enumerable: true,
        get: function get() {
          if (!this.modelSingleton) {
            this.modelSingleton = (doc instanceof model) ? doc : new model(doc);
          }
          return this.modelSingleton;
        },
      }); */
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
