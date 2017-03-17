import randomcolor from 'randomcolor';
import User from '../models/user';
import * as jwt from './jwt';

const formatQuery = query => (
  new Promise((resolve) => {
    if (query.token) {
      return jwt.getIdFromToken(query.token).then(fbid => resolve({ fbid }));
    }
    if (query.isActive) {
      return resolve(Object.assign({}, query, {
        isActive: (query.isActive === 'true'),
      }));
    }
    return resolve(query);
  })
);

export const getAllUsers = () => User.find().exec();

export const queryUsers = query => User.find(query).exec();

export const getUser = ({ fbid }) => (User.findOne({ fbid }).exec());

export const createUser = user => (User.create(user));

export const createOrGetUser = user => (
  getUser(user).then(result => (result || createUser(user)))
);

export const updateUser = ({ fbid }, data) => (
  User.findOneAndUpdate({ fbid }, data, { new: true }).exec()
);

export const setUserColour = user => (
  updateUser(user, { color: randomcolor() })
);

export const getUsers = query => ((query) ? formatQuery(query).then(queryUsers) : getAllUsers());
