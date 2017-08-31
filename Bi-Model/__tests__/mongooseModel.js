import fullSampleModel from '../sample/full/model';
import getMongooseField from '../src/parser/getMongooseField';

const { describe, test, expect } = global;
const Customers = fullSampleModel.find(entity => entity.shortName === 'Customers');

describe('Generation of mongoose model', () => {
  test('Get mongoose field from entity model', async () => {
    expect(
      await getMongooseField(
        'phone',
        Customers.model.phone,
      ),
    ).toMatchObject({
      type: String,
    });
    expect(
      await getMongooseField(
        'firstContactAt',
        Customers.model.firstContactAt,
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
