/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  collectionShortName: 'Users',
  entityShortName: 'User',
  singularName: {
    es: 'usuario',
    en: 'user',
  },
  pluralName: {
    es: 'usuarios',
    en: 'users',
  },
  gender: {
    es: gender.male,
  },
  model: {
    firstName: {
      label: {
        es: 'Nombre',
        en: 'First Name',
      },
      type: types.firstName,
      required: doc => !doc.alias,
    },
    lastName: {
      label: {
        es: 'Apellidos',
        en: 'Last Name',
      },
      type: types.lastName,
      required: doc => !doc.alias,
      indexed: true,
    },
    fullName: {
      label: {
        es: 'Nombre Completo',
        en: 'Full Name',
      },
      type: types.string,
      value: doc => doc.alias || `${doc.fistName} ${doc.lastName}`.trim(),
      stored: true,
    },
    email: {
      label: {
        es: 'Correo Electrónico',
        en: 'Email',
      },
      type: types.email,
      required: false, // default
      indexed: true,
    },
    company: {
      label: {
        es: 'Empresa',
        en: 'Company',
      },
      type: types.oneToManyReference,
      targetCollectionShortName: 'Companies',
      targetCollectionSelect: col => col.find({ isClient: true }),
      denormalized: true,
    },
    updatedAt: {
      // No label so not displayed
      type: types.dateTime,
      value: () => new Date(),
      stored: true,
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
