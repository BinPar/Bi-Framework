const minValue = -1000000000;
const maxValue = 1000000000;

export default {
  getFakedValue: (field) => {
    const min = field.minValue || minValue;
    const max = field.maxValue || maxValue;
    const delta = max - min;
    const base = Math.floor(Math.random() * delta);
    return base + min;
  },
  requiredProperties: [],
  graphQLType: 'Int',
  mongooseFieldType: Number,
};
