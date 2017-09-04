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
    url: {
      label: 'URL',
      type: types.url,
      required: true,
      indexed: true,
    },
    createdAt: {
      label: 'Created At',
      type: types.dateTime,
      maxValue: doc => doc.createdAt || new Date(),
      readOnly: true,
      indexed: true,
    },
    updatedAt: {
      label: 'Created At',
      type: types.dateTime,
      maxValue: () => new Date(),
      readOnly: true,
      indexed: true,
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
