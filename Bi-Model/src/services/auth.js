/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import jwt from 'jsonwebtoken';
import '../config/db';
import constants from '../config/settings';

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('Unauthorized!');
  }

  // TODO: Get User

  /* const me = await users.findById(user._id);

  if (!me) {
    throw new Error('Unauthorized!');
  }

  return me; */

  return null;
}

export function decodeToken(token) {
  const arr = token.split(' ');
  if (arr[0] === 'Bearer') {
    return jwt.verify(arr[1], constants.secretEncodingKey);
  }

  throw new Error('Token not valid!');
}
