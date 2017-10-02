import BPModel from '../src/classes/BPModel';

const { describe, test, expect } = global;

describe('BPModel create/update/delete/performance', () => {
  test('Performance test', () => {
    const startTime = new Date().getTime();
    const objects = new Map();
    for (let i = 0; i < 100000; i += 1) {
      const obj = new BPModel({ a: i });
      objects.set(i, obj);
    }
    const spawningTime = new Date().getTime() - startTime;
    console.log('Spawning time (ms): ', spawningTime);
    expect(spawningTime).toBeLessThanOrEqual(150);
    const startingGettingTime = new Date().getTime();
    for (let i = 0; i < 100000; i += 1) {
      const obj = objects.get(i).mongooseModel;
      obj.hola = '';
    }
    const gettingTime = new Date().getTime() - startingGettingTime;
    console.log('Getting time (ms): ', gettingTime);
    expect(gettingTime).toBeLessThanOrEqual(100);
  });
});
