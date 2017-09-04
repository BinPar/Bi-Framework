/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import types from '../../../src/fieldTypes';

export default {
  collectionShortName: 'AdditionalMaterials',
  entityShortName: 'AdditionalMaterial',
  singularName: 'Additional Material',
  pluralName: 'Additional Materials',
  model: {
    title: {
      label: 'Title',
      type: types.productName,
      required: true,
      indexed: true,
    },
    country: {
      label: {
        es: 'País',
        en: 'Country',
      },
      type: types.oneToManyReference,
      targetCollectionShortName: 'Countries',
      denormalized: true,
      required: true,
      denormalizedFields: ['name'],
    },
  },
  permissions: {
    query: ['all'],
    update: ['admin'],
    delete: ['admin'],
    insert: ['admin', 'sales'],
  },
  totalFixtures: 100,
};
