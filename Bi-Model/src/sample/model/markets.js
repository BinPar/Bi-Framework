/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import faker from 'faker';
import types from '../../fieldTypes';
import gender from '../../enums/gender';

export default {
  shortName: 'Markets',
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
      getFakedValue: () => faker.lorem.word(),
    },
  },
  permissions: {
    display: ['all'],
    update: ['market management'],
    delete: ['market management'],
    insert: ['market management', 'sales'],
  },
  totalFixtures: 100,
};
