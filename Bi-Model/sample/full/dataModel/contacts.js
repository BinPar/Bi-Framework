/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import gender from '../../../src/enums/gender';
import leads from './leads';
import customers from './customers';

export default {
  collectionShortName: 'Contacts',
  entityShortName: 'Contact',
  singularName: {
    es: 'contacto',
    en: 'contact',
  },
  pluralName: {
    es: 'contactos',
    en: 'clientes',
  },
  gender: {
    es: gender.male,
  },
  composedModel: [leads, customers],
  permissions: {
    query: ['admin', 'financial', 'sales'],
  },
  hooks: {
    onSelect: (col, user) =>
      (user.can(['admin', 'financial']) ? col : col.filter({ createdBy: user._id })),
  },
  defaultViews: [{}],
};
