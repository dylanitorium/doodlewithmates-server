import jwt from 'jsonwebtoken';
import config from '../config/environment';

export const signJwtToken = user => (
  new Promise((resolve, reject) => {
    const token = jwt.sign(user, config.JWT.SECRET, {
      expiresIn: '24h',
    });
    if (!token) {
      reject('Error creating token');
    }
    resolve(token);
  })
);
