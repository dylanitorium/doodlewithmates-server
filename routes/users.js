import * as service from '../api/users';
import { formatForEmber } from './utils/ember';

export const getUsers = (req, res) => {
  service.getUsers(req.query).then((users) => {
    res.json(formatForEmber('users')(users));
  }).catch(console.error);
};
