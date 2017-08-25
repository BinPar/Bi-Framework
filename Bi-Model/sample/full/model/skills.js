/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import faker from 'faker';
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  shortName: 'Skills',
  singularName: {
    es: 'skill',
    en: 'habilidad',
  },
  pluralName: {
    es: 'skills',
    en: 'habilidades',
  },
  gender: {
    es: gender.female,
  },
  model: {
    name: {
      label: {
        es: 'Nombre',
        en: 'Name',
      },
      type: types.string,
      getFakedValue: () => faker.name.jobType(),
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
