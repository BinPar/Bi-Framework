import fullSampleModel from '../sample/full/dataModel';
import getMongooseField from '../src/parser/getMongooseField';

const { describe, test, expect } = global;

describe('Generation of mongoose model', () => {
  test('Get mongoose field from entity model', async () => {
    expect(
      getMongooseField(
        'phone',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.phone,
      ),
    ).toMatchObject({
      type: String,
    });
    expect(
      getMongooseField(
        'firstContactAt',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.firstContactAt,
      ),
    ).toMatchObject({
      type: Date,
      index: true,
    });
    expect(
      getMongooseField(
        'fullName',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.fullName,
      ),
    ).toMatchObject({
      type: String,
    });
    expect(
      getMongooseField(
        'initials',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.initials,
      ),
    ).toMatchObject({
      type: String,
      mongooseAdditionalOptions: {
        isVirtual: true,
      },
    });
  });
});
