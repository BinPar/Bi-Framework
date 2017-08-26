const waitTimes = [1, 10, 3, 4, 5];

async function testAsync() {
  const result = await Promise.all(
    waitTimes.map(
      time =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(time);
          }, time);
        }),
    ),
  );
  return result;
}

const { describe, test, expect } = global;

describe('Promises framework', () => {
  test('Promise.all result Order', async () => {
    const result = await testAsync();
    expect(result[4]).toBe(waitTimes[4]);
  });
});
