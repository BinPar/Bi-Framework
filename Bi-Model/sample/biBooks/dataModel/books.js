import faker from 'faker';
import types from '../../../src/fieldTypes';

/* 
Campos Pendientes `
type Book implements Content {
  content: BookContent
  firstLevelContents: [FirstLevelContent]
`;
*/

export default {
  collectionShortName: 'Books',
  entityShortName: 'Book',
  model: {
    format: {
      label: 'Format',
      type: types.enum,
      values: ['PDF', 'EPUB2', 'EPUB3FLOW', 'EPUB3FIXED'],
      enumName: 'EbookFormats',
      required: true,
      indexed: true,
    },
    type: {
      label: 'Type',
      description: 'Extra materials, teacher materials, promotional, etc.',
      type: types.string,
      required: true,
      indexed: true,
    },
    ean: {
      label: 'EAN',
      type: types.ean,
      required: true,
      indexed: true,
    },
    paperEan: {
      label: 'Paper EAN',
      type: types.ean,
      indexed: true,
    },
    title: {
      label: 'Title',
      type: types.productName,
      required: true,
      indexed: true,
    },
    description: {
      label: 'Description',
      type: types.text,
      required: true,
      indexed: true,
    },
    coverUrl: {
      label: 'Cover URL',
      type: types.url,
      getFakedValue: () => faker.image.imageUrl(),
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
      targetCollectionField: 'books',
      denormalized: true,
      denormalizedFields: ['fullName'],
    },
    topics: {
      label: 'topics',
      type: [types.oneToManyReference],
      targetCollectionShortName: 'Topics',
    },
    publishDate: {
      label: 'Publish date',
      type: types.dateTime,
      indexed: true,
    },
    edition: {
      label: 'Edition',
      type: types.int,
      indexed: true,
    },
    publisher: {
      label: 'Publisher',
      type: types.string,
      indexed: true,
    },
    publisherBranch: {
      label: 'Publisher branch',
      type: types.string,
      indexed: true,
    },
    tags: {
      label: 'Tags',
      type: [types.string],
    },
    language: {
      label: 'Language',
      type: types.string,
      indexed: true,
    },
    chapterCount: {
      label: 'Chapter count',
      type: types.int,
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
    allowPrint: {
      label: 'Allow print',
      type: types.boolean,
      indexed: true,
      required: true,
    },
    allowOffLine: {
      label: 'Allow offline',
      type: types.boolean,
      indexed: true,
      required: true,
    },
    allowOnLine: {
      label: 'Allow online',
      type: types.boolean,
      indexed: true,
      required: true,
    },
    allowCrossSearch: {
      label: 'Allow cross search',
      type: types.boolean,
      indexed: true,
      required: true,
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
