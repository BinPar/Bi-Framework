export default function preProcessFn(fn) {
  if (!fn) {
    throw new Error('[preProcessFn] You must provide a function');
  }
  const fnName = fn.name;
  const returnedFn = {
    [fnName]: (entity, user, ...fnParams) => {
      if (!entity) {
        throw new Error(`[${fnName}] You must provide an entity`);
      }
      if (user === undefined) {
        throw new Error(`[${fnName}] You must provide an user or null. Got undefined`);
      }
      return fn(entity, user, ...fnParams);
    },
  };
  return returnedFn[fnName];
}
