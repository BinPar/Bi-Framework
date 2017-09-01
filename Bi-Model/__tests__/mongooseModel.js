import fullSampleModel from '../sample/full/dataModel';
import getMongooseField from '../src/parser/getMongooseField';

const { describe, test, expect } = global;
const Customers = fullSampleModel.find(entity => entity.shortName === 'Customers');

describe('Generation of mongoose model', () => {
  test('Get mongoose field from entity model', async () => {
    expect(
      await getMongooseField(
        'phone',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.phone,
      ),
    ).toMatchObject({
      type: String,
    });
    expect(
      await getMongooseField(
        'firstContactAt',
        fullSampleModel.find(entity => entity.collectionShortName === 'Customers').model.firstContactAt,
      ),
    ).toMatchObject({
      type: Date,
      index: true,
    });
    expect(
      await getMongooseField(
        'lastName',
        Customers.model.lastName,
      ),
    ).toMatchObject({
      type: String,
      required: true,
      index: true,
    });
  });
});
