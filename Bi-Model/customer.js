/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import types from './types';
import gender from './gender';

export default {
  collectionName: 'customers',
  singularName: {
    es: 'cliente',
    en: 'customer',
  },
  pluralName: {
    es: 'clientes',
    en: 'customers',
  },
  gender: {
    es: gender.male,
  },
  model: {
    phone: {
      label: {
        es: 'Teléfono',
        en: 'Phone',
      },
      type: types.phone,
    },
    sexo: {
      label: {
        es: 'Sexo',
        en: 'Sex',
      },
      type: types.boolean,
      optionsValues: [
        {
          value: true,
          label: {
            en: 'Male',
            es: 'Masculino',
          },
        },
        {
          value: false,
          label: {
            en: 'Female',
            es: 'Femenino',
          },
        },
        {
          value: null,
          label: '?',
        },
      ],
      required: doc => !doc.lastName || !doc.firstName,
      indexed: true,
    },
    alias: {
      label: {
        es: 'Apodo',
        en: 'Alias',
      },
      description: {
        es: 'Sobrenombre empleado por el contacto',
      },
      type: types.firstName,
      required: doc => !doc.lastName || !doc.firstName,
      indexed: true,
      unique: true,
    },
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
    },
    market: {
      label: {
        es: 'Mercado',
        en: 'Market',
      },
      type: types.reference,
      targetCollectionName: 'markets',
    },
    company: {
      label: {
        es: 'Empresa',
        en: 'Company',
      },
      type: types.reference,
      targetCollectionName: 'companies',
      targetCollectionSelect: col => col.find({ isClient: true }),
      denormalized: true,
    },
    nationality: {
      label: {
        es: 'Nacionalidad',
        en: 'Nationality',
      },
      type: types.reference,
      targetCollectionName: 'countries',
      denormalized: true,
      denormalizedFields: ['demonym'],
      targetCollectionSelect: col => col.sort({ demonym: 1 }),
    },
    skills: {
      label: {
        es: 'Habilidades',
        en: 'Skills',
      },
      type: [types.reference],
      targetCollectionName: 'skills',
      denormalized: true,
      denormalizedFields: ['name', 'type'],
      validations: [
        {
          check: doc => doc.skills && doc.skills.length,
          error: {
            es: 'Es necesario tener al menos una habilidad.',
            en: 'It is required to add one skill at least',
          },
        },
      ],
    },
    CIF: {
      label: 'CIF',
      type: types.NIFCIF,
      required: true,
      permissions: {
        display: ['admin', 'financial'],
        update: (doc, user) => user.can('admin') || doc.createdBy === user._id,
        remove: 'admin',
        add: 'admin',
      },
    },
    avatar: {
      label: 'Avatar',
      type: types.image,
      required: true,
      permissions: {
        display: (doc, user) => user.can('admin') || doc.createdBy === user._id,
        update: (doc, user) => user.can('admin') || doc.createdBy === user._id,
        remove: 'admin',
        add: 'admin',
      },
    },
    address: {
      type: types.object,
      label: {
        es: 'Dirección',
        en: 'Address',
      },
      required: true,
      model: {
        country: {
          label: {
            es: 'País',
            en: 'Country',
          },
          type: types.reference,
          targetCollectionName: 'countries',
          denormalized: true,
          denormalizedFields: ['name'],
          targetCollectionSelect: col => col.sort({ name: 1 }),
          // solo un ejemplo dado que tomaría el primero de los campos de-normalizados.
          // Al igual que para la búsqueda predictiva.
        },
        city: {
          label: {
            es: 'Ciudad',
            en: 'City',
          },
          type: types.reference,
          targetCollectionName: 'cities',
          denormalized: true,
          denormalizedFields: ['name'],
          targetCollectionSelect: (col, doc) => col.filter({ 'country._id': doc.country._id }),
        },
        lines: {
          label: {
            es: 'Lineas',
            en: 'Lines',
          },
          type: [types.string],
          required: true,
        },
      },
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
      type: types.reference,
      targetCollectionName: 'user',
    },
  },
  permissions: {
    display: ['admin', 'financial', 'sales'],
    update: ['admin', 'financial', 'sales'],
    delete: (doc, user) => user.can(['admin', 'sales']) || doc.createdBy === user._id,
    add: ['admin', 'sales'],
  },
  hooks: {
    onBeforeAdd: (doc, user) => ({ ...doc, createdBy: user._id }),
    onAfterAdd: null,
    onBeforeUpdate: null,
    onAfterUpdate: null,
    onBeforeDelete: null,
    onAfterDelete: null,
    onSelect: (col, user) =>
      (user.can(['admin', 'financial']) ? col : col.filter({ createdBy: user._id })),
  },
  defaultViews: [{}],
};
