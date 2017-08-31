import { toString } from '../tools/objectUtils';

export default function isEquivalent(a, b) {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i += 1) {
    const propName = aProps[i];
    if (a[propName] !== b[propName]) {
      if (
        (toString.call(a[propName]) !== '[object Object]' ||
        toString.call(b[propName])) !== '[object Object]' ||
        !isEquivalent(a[propName], b[propName])
      ) {
        return false;
      }
    }
  }

  return true;
}