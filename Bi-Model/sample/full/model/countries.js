/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import faker from 'faker';
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  shortName: 'Countries',
  singularName: {
    es: 'país',
    en: 'country',
  },
  pluralName: {
    es: 'países',
    en: 'countries',
  },
  gender: {
    es: gender.male,
  },
  model: {
    name: {
      label: {
        es: 'Nombre',
        en: 'Name',
      },
      type: types.countryName,
      required: true,
    },
    demonym: {
      label: {
        es: 'Gentilicio',
        en: 'Demonym',
      },
      type: types.string,
      getFakedValue: () => faker.lorem.word(),
    },
  },
  permissions: {
    display: ['all'],
    update: ['admin'],
    delete: ['admin'],
    insert: ['admin', 'sales'],
  },
  totalFixtures: 100,
};
