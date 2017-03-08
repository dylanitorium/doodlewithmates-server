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

export const getIdFromToken = token => (
  new Promise((resolve, reject) => (
    jwt.verify(token, config.JWT.SECRET, (error, { id }) => {
      if (error) {
        reject(error);
      }
      resolve(id);
    })
  ))
);
