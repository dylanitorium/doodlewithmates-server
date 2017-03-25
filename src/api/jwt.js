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

/*
Something funky going on here, the data being signed and returned is a doc and not the data we need2
*/
export const getIdFromToken = token => (
  new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT.SECRET, (error, data) => {
      if (error) {
        reject(error);
      }
      if (data) {
        resolve(data._doc.fbid);
      }
    });
  })
);
