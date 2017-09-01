/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  collectionShortName: 'Cities',
  entityShortName: 'City',
  singularName: {
    es: 'ciudad',
    en: 'city',
  },
  pluralName: {
    es: 'ciudades',
    en: 'cities',
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
      type: types.cityName,
      required: true,
      indexed: true,
    },
    country: {
      label: {
        es: 'País',
        en: 'Country',
      },
      type: types.oneToManyReference,
      targetCollectionShortName: 'Countries',
      denormalized: true,
      required: true,
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
