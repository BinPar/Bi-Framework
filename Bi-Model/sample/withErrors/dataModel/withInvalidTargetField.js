import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  collectionShortName: 'withInvalidTargetField',
  entityShortName: 'WithInvalidTargetField',
  singularName: {
    es: 'invalidTarget',
    en: 'invalidTarget',
  },
  pluralName: {
    es: 'invalidTarget',
    en: 'invalidTarget',
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
      type: types.string,
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
      denormalizedFields: ['invalidTarget'],
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
