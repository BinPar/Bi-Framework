/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import faker from 'faker';
import moment from 'moment';
import types from '../../../src/fieldTypes';
import gender from '../../../src/enums/gender';

export default {
  shortName: 'Customers',
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
    firstContactAt: {
      label: {
        es: 'Primer contacto',
        en: 'Fist contact',
      },
      type: types.dateTime,
      maxValue: () => new Date(),
      indexed: true,
    },
    lastContactAt: {
      label: {
        es: 'Próximo contacto',
        en: 'Next contact',
      },
      type: types.dateTime,
      minValue: doc => doc.firstContactAt,
      maxValue: new Date(),
      indexed: true,
    },
    nextContactAt: {
      label: {
        es: 'Próximo contacto',
        en: 'Next contact',
      },
      type: types.dateTime,
      minValue: () => new Date(),
      maxValue: () => new Date(moment().add(6, 'months')),
      indexed: true,
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
      type: types.oneToManyReference,
      targetCollectionShortName: 'Markets',
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
    nationality: {
      label: {
        es: 'Nacionalidad',
        en: 'Nationality',
      },
      type: types.oneToManyReference,
      targetCollectionShortName: 'Countries',
      denormalized: true,
      denormalizedFields: ['demonym'],
      targetCollectionSelect: col => col.sort({ demonym: 1 }),
    },
    skills: {
      label: {
        es: 'Habilidades',
        en: 'Skills',
      },
      type: [types.oneToManyReference],
      targetCollectionShortName: 'Skills',
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
        insert: 'admin',
      },
    },
    avatar: {
      label: 'Avatar',
      type: types.image,
      getFakedValue: () => faker.name.avatar(),
      permissions: {
        display: (doc, user) => user.can('admin') || doc.createdBy === user._id,
        update: (doc, user) => user.can('admin') || doc.createdBy === user._id,
        remove: 'admin',
        add: 'admin',
      },
    },
    address: {
      type: types.object,
      shortName: 'Address',
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
          type: types.oneToManyReference,
          targetCollectionShortName: 'Countries',
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
          type: types.oneToManyReference,
          targetCollectionShortName: 'Cities',
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
      type: types.oneToManyReference,
      targetCollectionShortName: 'Users',
    },
  },
  permissions: {
    display: ['admin', 'financial', 'sales'],
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
