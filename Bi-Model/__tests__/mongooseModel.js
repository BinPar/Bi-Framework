import fullSampleModel from '../sample/full/model';
import generateMongooseModel from '../src/parser/generateMongooseModel';
import getMongooseField from '../src/parser/getMongooseField';

const { describe, test, expect } = global;

describe('Generation of mongoose model', () => {
  test('Get mongoose field from entity model', async () => {
    expect(await getMongooseField('phone', fullSampleModel[3].model.phone)).toMatchObject({
      type: String,
    });
    expect(await getMongooseField('firstContactAt', fullSampleModel[3].model.firstContactAt)).toMatchObject({
      type: Date,
      index: true,
    });
  });
});
