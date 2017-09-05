import types from '../../../src/fieldTypes';

export default {
  collectionShortName: 'Topics',
  entityShortName: 'Topic',
  description: 'Topic tree nodes to catalogate the contents',
  model: {
    title: {
      label: 'Title',
      description: 'Title of the topic',
      type: types.productName,
      required: true,
      indexed: true,
    },
    bisac: {
      label: 'Bisac',
      description: 'Bisac is a classification systems for both physical and digital products',
      type: types.string,
      indexed: true,
    },
    subtopics: {
      label: 'Subtopics',
      description: 'Dependent topics derived from this topic',
      type: [types.oneToManyReference],
      targetCollectionShortName: 'Topics',
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
