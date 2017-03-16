import randomcolor from 'randomcolor';
import User from '../models/user';

import config from '../config/rethinkdb/config';
import { formatForEmber } from './utils/ember';
import * as jwt from './jwt';

// export const getUser = cond => User.findOne(cond);


export const getAllUsers = () => User.find().exec();

const formatQuery = query => (
  new Promise((resolve) => {
    if (query.token) {
      return jwt.getIdFromToken(query.token).then(id => resolve({ id }));
    }
    if (query.active) {
      return resolve(Object.assign({}, query, {
        active: (query.active === 'true'),
      }));
    }
    return resolve(query);
  })
);

export const getUser = ({ id }) => (User.findById(id));

export const createUser = user => (User.create(user));

export const createOrGetUser = ({ dbConn }) => (

);

export const updateUser = (id, data) => (

);

export const setUserColour = user => (
  updateUser(user.id, { color: randomcolor() }).then(() => (user))
);


export const getUsers = query => (

);
