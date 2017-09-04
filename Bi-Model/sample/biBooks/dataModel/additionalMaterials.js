import types from '../../../src/fieldTypes';

export default {
  collectionShortName: 'AdditionalMaterials',
  entityShortName: 'AdditionalMaterial',
  pluralName: 'Additional Materials',
  singularName: 'Additional Material',
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
    active: {
      label: 'Active',
      type: types.boolean,
      indexed: true,
      required: true,
    },
    fromDate: {
      label: 'From date',
      type: types.dateTime,
      maxValue: doc => doc.toDate,
      indexed: true,
      required: true,
    },
    toDate: {
      label: 'To date',
      type: types.dateTime,
      minValue: doc => doc.fromDate,
      indexed: true,
    },
    public: {
      label: 'Public',
      type: types.boolean,
      indexed: true,
      required: true,
    },
    authors: {
      label: 'Authors',
      type: types.manyToManyReference,
      targetCollectionShortName: 'Authors',
      targetCollectionField: 'additionalMaterials',
      denormalized: true,
      denormalizedFields: ['fullName'],
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
      required: true,
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
