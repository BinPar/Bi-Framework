import types from '../../../src/fieldTypes';

export default {
  collectionShortName: 'Authors',
  entityShortName: 'Author',
  model: {
    alias: {
      label: {
        es: 'Apodo',
        en: 'Alias',
      },
      description: {
        es: 'Sobrenombre empleado por el contacto',
      },
      type: types.firstName,
      indexed: true,
      unique: true,
    },
    firstName: {
      label: {
        es: 'Nombre',
        en: 'First Name',
      },
      type: types.firstName,
      required: true,
    },
    lastName: {
      label: {
        es: 'Apellidos',
        en: 'Last Name',
      },
      type: types.lastName,
      required: true,
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
      indexed: true,
    },
    books: {
      label: 'Books',
      type: types.manyToManyReference,
      targetCollectionShortName: 'Books',
      targetCollectionField: 'authors',
      denormalized: true,
      denormalizedFields: ['title', 'isbn'],
    },
    additionalMaterials: {
      label: 'Books',
      type: types.manyToManyReference,
      targetCollectionShortName: 'AdditionalMaterials',
      targetCollectionField: 'authors',
      denormalized: true,
      denormalizedFields: ['title', 'url'],
    },
    updatedAt: {
      label: 'Created At',
      type: types.dateTime,
      maxValue: () => new Date(),
      readOnly: true,
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
