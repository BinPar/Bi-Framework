import { Schema } from 'mongoose';
import fullSampleModel from '../sample/full/dataModel';
import sampleWithErrors from '../sample/withErrors/dataModel';
import getMongooseField, {
  getEntityByName,
  addDenormalizedReferences,
} from '../src/parser/getMongooseField';
import generateMongooseModel, { processEntity } from '../src/parser/generateMongooseModel';
import getInnerFields from '../src/parser/getInnerFields';
import optimizeDataModel from '../src/parser/optimizeDataModel';
import BinParTypes from '../src/fieldTypes';

const { describe, test, expect } = global;
const optimizedDatabaseModel = optimizeDataModel(fullSampleModel);
const optimizedSampleWithErrors = optimizeDataModel(sampleWithErrors);

describe('Generation of mongoose model', () => {
  test('Get mongoose field from entity simple model', () => {
    expect(
      getMongooseField(
        optimizedDatabaseModel,
        'phone',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.phone,
      ),
    ).toMatchObject({
      type: String,
    });
    expect(
      getMongooseField(
        optimizedDatabaseModel,
        'firstContactAt',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model
          .firstContactAt,
      ),
    ).toMatchObject({
      type: Date,
      index: true,
    });
    expect(
      getMongooseField(
        optimizedDatabaseModel,
        'fullName',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.fullName,
      ),
    ).toMatchObject({
      type: String,
    });
    expect(
      getMongooseField(
        optimizedDatabaseModel,
        'initials',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.initials,
      ),
    ).toMatchObject({
      type: String,
      isVirtual: true,
    });
    expect(() =>
      getMongooseField(optimizedDatabaseModel, 'withError', {
        type: BinParTypes.object,
        model: null,
      }),
    ).toThrowError('The field "withError" has type object but has invalid "model" property');
  });

  test('Get mongoose field from entity complex model', () => {
    expect(
      getMongooseField(
        optimizedDatabaseModel,
        'address',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.address,
      ),
    ).toMatchObject({
      country: [
        {
          id: Schema.Types.ObjectId,
          name: String,
        },
      ],
      city: [
        {
          id: Schema.Types.ObjectId,
          name: String,
        },
      ],
      lines: {
        type: [String],
        required: true,
      },
    });
  });

  // Get inner fields
  test('Get inner fields', () => {
    expect(() => getInnerFields(optimizedDatabaseModel, null)).toThrowError(
      'The field "{{FIELD_NAME}}" has type object but has invalid "model" property',
    );
    expect(() => getInnerFields(null, {})).toThrowError(
      'You should provide a valid optimized data model',
    );
  });

  // Get entity by name
  test('Get entity by name', () => {
    optimizedDatabaseModel.forEach((originalEntity) => {
      const entity = getEntityByName(optimizedDatabaseModel, originalEntity.collectionShortName);
      expect(entity).toMatchObject(originalEntity);
    });
  });

  // Add denormalized References
  test('Add denormalized references', () => {
    const mongooseFieldSkills = addDenormalizedReferences(
      optimizedDatabaseModel,
      fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.skills,
    );
    expect(mongooseFieldSkills).toMatchObject([
      {
        id: Schema.Types.ObjectId,
        name: String,
        type: { type: String },
      },
    ]);

    const mongooseFieldCompany = addDenormalizedReferences(
      optimizedDatabaseModel,
      fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.company,
    );
    expect(mongooseFieldCompany).toMatchObject([Schema.Types.ObjectId]);

    const mongooseFieldNationality = addDenormalizedReferences(
      optimizedDatabaseModel,
      fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.nationality,
    );
    expect(mongooseFieldNationality).toMatchObject([
      {
        id: Schema.Types.ObjectId,
        demonym: String,
      },
    ]);

    expect(() =>
      addDenormalizedReferences(
        optimizedSampleWithErrors,
        optimizedSampleWithErrors.find(
          entity => entity.collectionShortName === 'withInvalidTargetField',
        ).model.country,
      ),
    ).toThrowError('Target entity "Countries" has no field called "invalidTarget".');
  });

  // Process entity
  test('Process entity', () => {
    expect(() =>
      processEntity(
        null,
        optimizedDatabaseModel.find(entity => entity.collectionShortName === 'Customers'),
      ),
    ).toThrowError('You should provide an optimized database model to "processEntity" function');
    expect(() => processEntity(optimizedDatabaseModel, null)).toThrowError(
      'You should provide a valid entity to "processEntity" function',
    );
    expect(
      processEntity(
        optimizedDatabaseModel,
        optimizedDatabaseModel.find(entity => entity.collectionShortName === 'Customers'),
      ),
    ).toMatchObject({
      baseSchemaObject: {
        phone: {
          type: String,
        },
        firstContactAt: {
          type: Date,
          index: true,
        },
        lastContactAt: {
          type: Date,
          index: true,
        },
        nextContactAt: {
          type: Date,
          index: true,
        },
        sexo: {
          type: Boolean,
          enum: [true, false, null],
          index: true,
        },
        alias: {
          type: String,
          index: true,
          unique: true,
        },
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
          index: true,
        },
        email: {
          type: String,
          required: false,
        },
        company: [Schema.Types.ObjectId],
        nationality: [
          {
            id: Schema.Types.ObjectId,
            demonym: String,
          },
        ],
        skills: [
          {
            id: Schema.Types.ObjectId,
            name: String,
            type: {
              type: String,
            },
          },
        ],
        CIF: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
        },
        address: {
          country: [
            {
              id: Schema.Types.ObjectId,
              name: String,
            },
          ],
          city: [
            {
              id: Schema.Types.ObjectId,
              name: String,
            },
          ],
          lines: {
            type: [String],
            required: true,
          },
        },
        updatedAt: {
          type: Date,
        },
      },
      virtualFields: {
        initials: {
          type: String,
          isVirtual: true,
        },
      },
    });
  });

  // Generate mongoose model
  test('Generate mongoose model', () => {
    const DB = generateMongooseModel(fullSampleModel);
    DB.forEach((mongooseModel) => {
      const processedEntity = processEntity(
        optimizedDatabaseModel,
        optimizedDatabaseModel.find(
          entity =>
            entity.collectionShortName &&
            entity.collectionShortName.toLowerCase() === mongooseModel.modelName.toLowerCase(),
        ),
      );
      expect(mongooseModel.schema.obj).toMatchObject(processedEntity.baseSchemaObject);
      Object.keys(processedEntity.virtualFields).forEach((vKey) => {
        expect(mongooseModel.schema.virtuals[vKey]).toBeDefined();
      });
    });
  });
});
