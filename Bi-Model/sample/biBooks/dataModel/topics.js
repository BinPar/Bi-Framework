/*

# Topic tree node
type Topic {
  _id: ID!
  title: String!
  bisac: String
  subtopics: [Topic]
}

*/

import types from '../../../src/fieldTypes';

export default {
  collectionShortName: 'Topics',
  entityShortName: 'Topic',
  model: {
    title: {
      label: 'Title',
      type: types.productName,
      required: true,
      indexed: true,
    },
    bisac: {
      label: 'Bisac',
      type: types.productName,
      indexed: true,
    },
    subtopics: {
      label: 'Skills',
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
