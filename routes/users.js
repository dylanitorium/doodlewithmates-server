import * as service from '../api/users';

export const getUsers = (req, res) => {
  service.getUsers(req.query).then((users) => {
    res.json(users);
  }).catch(console.error);
};
