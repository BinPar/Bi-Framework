import BPModel from '../src/classes/BPModel';
import fullSampleModel from '../sample/full/dataModel';
import generateMongooseModel from '../src/parser/generateMongooseModel';
import optimizeDataModel from '../src/parser/optimizeDataModel';
import { stringifyNativeType } from '../src/parser/properties';

const { describe, test, expect } = global;
const databaseModel = generateMongooseModel(optimizeDataModel(fullSampleModel));
const DB = {};
databaseModel.forEach((obj) => {
  const { entity } = obj;
  DB[entity.entityShortName] = BPModel(obj);
});
describe('BPModel instance create/update performance', () => {
  const customers = [];
  test('Instantiation & property read performance', () => {
    const startTime = new Date().getTime();
    for (let i = 0; i < 10000; i += 1) {
      customers.push(new DB.Customer({
        firstName: 'Marcos',
        lastName: 'González',
      }));
    }
    const finalTime = new Date().getTime() - startTime;
    expect(finalTime).toBeLessThan(1300);
    // console.log(`Time (ms): ${finalTime}`);
  });
  test('Modification performance', () => {
    const startTime = new Date().getTime();
    for (let i = 0; i < 10000; i += 1) {
      const customer = customers[i];
      customer.firstName = 'Sara';
      customer.lastName = 'Martínez';
    }
    const finalTime = new Date().getTime() - startTime;
    expect(finalTime).toBeLessThan(110);
    // console.log(`Time (ms): ${finalTime}`);
  });
});

describe('BPModel instance create/update', () => {
  test('Create object and read properties', () => {
    const customer = new DB.Customer({
      firstName: 'Marcos',
      lastName: 'González',
    });
    expect(customer).toBeInstanceOf(DB.Customer);
    expect(stringifyNativeType(customer)).toBe('[object Customer]');
    expect(customer.type).toBe('[object Customer]');
    expect(customer.entityName).toBe('Customer');
    expect(customer.firstName).toBe('Marcos');
    expect(customer.initials).toBe('MG');
  });
  test('Update object', () => {
    const customer = new DB.Customer({
      firstName: 'Marcos',
      lastName: 'González',
    });
    expect(customer.firstName).toBe('Marcos');
    expect(customer.initials).toBe('MG');
    customer.firstName = 'Sara';
    customer.lastName = 'Martínez';
    expect(customer.firstName).toBe('Sara');
    expect(customer.initials).toBe('SM');
  });
});
