import fullSampleModel from '../sample/full/model';
import getMongooseField from '../src/parser/getMongooseField';

const { describe, test, expect } = global;

describe('Generation of mongoose model', () => {
  test('Get mongoose field from entity model', async () => {
    expect(
      await getMongooseField(
        'phone',
        fullSampleModel.find(entity => entity.shortName === 'Customers').model.phone,
      ),
    ).toMatchObject({
      type: String,
    });
    expect(
      await getMongooseField(
        'firstContactAt',
        fullSampleModel.find(entity => entity.shortName === 'Customers').model.firstContactAt,
      ),
    ).toMatchObject({
      type: Date,
      index: true,
    });
  });
});
