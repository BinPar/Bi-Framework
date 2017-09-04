import ean from 'ean';

const generateDigit = () => Math.floor(Math.random() * 10);

export default {
  getFakedValue: () => {
    const base = new Array(12).fill(0).map(() => `${generateDigit()}`);
    const checksum = ean.checksum(base);
    const fakedEan = base.join('') + checksum;
    return fakedEan;
  },
  requiredProperties: [],
  graphQLType: 'String',
  mongooseFieldType: String,
  validator: value => ean.isValid(value),
};
