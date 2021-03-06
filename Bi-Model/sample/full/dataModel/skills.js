/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import faker from 'faker';
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  collectionShortName: 'Skills',
  entityShortName: 'Skill',
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
      indexed: true,
      required: true,
      getFakedValue: () => faker.name.jobType(),
    },
    type: {
      label: {
        es: 'Tipo',
        en: 'Type',
      },
      type: types.string,
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
