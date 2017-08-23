/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import types from '../../fieldTypes';
import gender from '../../enums/gender';

export default {
  shortName: 'Cities',
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
    },
    country: {
      label: {
        es: 'País',
        en: 'Country',
      },
      type: types.oneToManyReference,
      targetCollectionShortName: 'Countries',
      denormalized: true,
      denormalizedFields: ['name'],
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
