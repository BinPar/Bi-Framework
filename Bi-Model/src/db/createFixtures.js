import preProcessFn from './lib/preProcessFn';
// import { create } from './';

const createFixtures = (entity) => {
  // const { model, totalFixtures } = entity;
  const { totalFixtures } = entity;
  for (let i = 0; i < totalFixtures; i += 1) {
    // create(entity, model);
  }
};

export default preProcessFn(createFixtures);
