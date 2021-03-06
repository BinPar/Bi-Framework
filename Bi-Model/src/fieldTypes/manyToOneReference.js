/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import mongoose, { Schema } from 'mongoose';

export default {
  graphQLType: (field, databaseModel, postFix) =>
    `[${databaseModel.find(entity => entity.collectionShortName === field.targetCollectionShortName)
      .entityShortName}${postFix}!]`,
  requiresMongooseModel: true,
  getFakedValue: async field =>
    new Promise((resolve, reject) => {
      // TODO: Review with combined collections
      mongoose.model(field.targetCollectionShortName.toLowerCase()).findOneRandom((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result._id);
      });
    }),
  mongooseRef: field => field.targetCollectionShortName.toLowerCase(),
  requiredProperties: [
    {
      propName: 'targetCollectionShortName',
      type: String,
      check: (value, _, model) => model.some(entity => entity.collectionShortName === value),
    },
    {
      propName: 'targetCollectionField',
      type: String,
      check: (value, field, model) => {
        const collection = model.find(
          entity => entity.collectionShortName === field.targetCollectionShortName,
        );
        if (collection) {
          return !!collection.model[value];
        }
        return false;
      },
    },
  ],
  mongooseFieldType: Schema.ObjectId,
};
