/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import faker from 'faker';
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  collectionShortName: 'Markets',
  entityShortName: 'Market',
  singularName: {
    es: 'mercado',
    en: 'market',
  },
  pluralName: {
    es: 'mercados',
    en: 'markets',
  },
  gender: {
    es: gender.male,
  },
  model: {
    phone: {
      name: {
        es: 'Nombre',
        en: 'Name',
      },
      type: types.string,
      required: true,
      getFakedValue: () => faker.lorem.word(),
    },
  },
  permissions: {
    query: ['all'],
    update: ['market management'],
    delete: ['market management'],
    insert: ['market management', 'sales'],
  },
  totalFixtures: 100,
};
