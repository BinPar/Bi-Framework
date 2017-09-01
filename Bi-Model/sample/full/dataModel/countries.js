/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import faker from 'faker';
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  collectionShortName: 'Countries',
  entityShortName: 'Country',
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
      indexed: true,
    },
    demonym: {
      label: {
        es: 'Gentilicio',
        en: 'Demonym',
      },
      type: types.string,
      indexed: true,
      getFakedValue: () => faker.lorem.word(),
    },
    cities: {
      label: {
        es: 'Ciudades',
        en: 'Cities',
      },
      type: types.manyToOneReference,
      targetCollectionShortName: 'Cities',
      targetCollectionField: 'country',
      denormalized: true,
      denormalizedFields: ['name'],
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
