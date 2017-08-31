import fieldTypes from '../src/fieldTypes';

const { describe, test, expect } = global;

describe('Faked ', () => {
  Object.keys(fieldTypes).forEach((fieldTypeName) => {
    const fieldType = fieldTypes[fieldTypeName];
    if (!fieldType.requiresMongooseModel) {
      test(`Get faked value for type ${fieldTypeName}`, async () => {
        const result = await fieldType.getFakedValue({ targetCollectionShortName: 'Contacts' });
        expect(result !== null).toBe(true);
      });
    }
  });
});
