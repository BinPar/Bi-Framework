/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import gender from '../../../src/enums/gender';
import lead from './lead';
import customers from './customers';

export default {
  shortName: 'Contacts',
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
  model: [lead, customers],
  permissions: {
    query: ['admin', 'financial', 'sales'],
  },
  hooks: {
    onSelect: (col, user) =>
      (user.can(['admin', 'financial']) ? col : col.filter({ createdBy: user._id })),
  },
  defaultViews: [{}],
};
