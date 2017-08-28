/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  shortName: 'Companies',
  singularName: {
    es: 'empresa',
    en: 'company',
  },
  pluralName: {
    es: 'empresas',
    en: 'companies',
  },
  gender: {
    es: gender.female,
  },
  model: {
    phone: {
      label: {
        es: 'Name',
        en: 'Nombre',
      },
      type: types.companyName,
      required: true,
    },
    createdBy: {
      label: {
        es: 'Creado por',
        en: 'Created by',
      },
      readOnly: true,
      type: types.oneToManyReference,
      targetCollectionShortName: 'Users',
    },
  },
  permissions: {
    query: ['admin', 'financial', 'sales'],
    update: ['admin', 'financial', 'sales'],
    delete: (doc, user) => user.can(['admin', 'sales']) || doc.createdBy === user._id,
    insert: ['admin', 'sales'],
  },
  hooks: {
    onBeforeInsert: (doc, user) => ({ ...doc, createdBy: user._id }),
    onAfterInsert: null,
    onBeforeUpdate: null,
    onAfterUpdate: null,
    onBeforeDelete: null,
    onAfterDelete: null,
    onSelect: (col, user) =>
      (user.can(['admin', 'financial']) ? col : col.filter({ createdBy: user._id })),
  },
  totalFixtures: 100,
  defaultViews: [{}],
};
