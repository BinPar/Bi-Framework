import fieldTypes from '../src/fieldTypes';

const { describe, test, expect } = global;

describe('Faked ', () => {
  Object.keys(fieldTypes).forEach((fieldTypeName) => {
    const fieldType = fieldTypes[fieldTypeName];
    if (!fieldType.requiresMongooseModel) {
      test(`Get faked value for type ${fieldTypeName}`, async () => {
        const result = await fieldType.getFakedValue({
          targetCollectionShortName: 'Contacts',
          values: ['EnumA', 'EnumB'],
        });
        expect(result !== null).toBe(true);
      });

      if (fieldType.validator) {
        test(`Validate faked value for type ${fieldTypeName}`, async () => {
          const result = await fieldType.getFakedValue({
            targetCollectionShortName: 'Contacts',
            values: ['EnumA', 'EnumB'],
          });
          const isValid = await fieldType.validator(result, {
            targetCollectionShortName: 'Contacts',
            values: ['EnumA', 'EnumB'],
          });
          expect(isValid).toBe(true);
        });
      }
    }
  });
});
