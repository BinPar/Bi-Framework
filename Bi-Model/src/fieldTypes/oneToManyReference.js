/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import mongoose, { Schema } from 'mongoose';

export default {
  graphQLType: field => `[${field.targetCollectionShortName}]`,
  requiredProperties: [{ propName: 'targetCollectionShortName', type: String }],
  getFakedValue: field =>
    new Promise((resolve, reject) => {
      mongoose.model(field.targetCollectionShortName.toLowerCase()).findOneRandom((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result._id);
      });
    }),
  mongooseFieldType: Schema.ObjectId,
  mongooseRef: field => field.targetCollectionShortName.toLowerCase(),
};
