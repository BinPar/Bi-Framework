import fullSampleModel from '../sample/full/dataModel';
import optimizeDataModel from '../src/parser/optimizeDataModel';
import biBooksSampleModel from '../sample/biBooks/dataModel';

const entities = [...optimizeDataModel(biBooksSampleModel), ...optimizeDataModel(fullSampleModel)];
const { describe, test, expect } = global;

entities.forEach((entity) => {
  describe(`Faked model for entity ${entity.shortName}`, () => {
    Object.keys(entity.model).forEach((fieldName) => {
      const field = entity.model[fieldName];
      const fieldType = field.type;

      if (!fieldType.requiresMongooseModel && !Array.isArray(fieldType)) {
        let fakedValue = null;
        if (field.getFakedValue) {
          test(`Get faked value for field ${fieldName}`, async () => {
            fakedValue = await field.getFakedValue(field);
            expect(fakedValue !== null).toBe(true);
          });
        } else {
          test(`Get faked value for type ${fieldName}`, async () => {
            fakedValue = await fieldType.getFakedValue(field);
            expect(fakedValue !== null).toBe(true);
          });
        }

        if (fieldType.validator) {
          test(`Validate faked value for type ${fieldName}`, async () => {
            const isValid = await fieldType.validator(fakedValue, field);
            expect(isValid).toBe(true);
          });
        }
      }
    });
  });
});
