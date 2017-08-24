import faker from 'faker';

const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 3);
const endDate = new Date();
endDate.setFullYear(startDate.getFullYear() + 3);

export default {
  getFakedValue: field =>
    faker.date.between(field.minValue || startDate, field.maxValue || endDate),
  requiredProperties: [],
  graphQLType: 'Date',
  mongooseFieldType: Date,
};
