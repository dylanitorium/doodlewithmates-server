import * as auth from '../api/auth';
import * as jwt from '../api/jwt';
import * as users from '../api/users';

export const login = (req, res) => {
  const {
    body: {
      auth_code,
    },
  } = req;

  auth.fetchFacebookAccount(auth_code)
  .then(users.createOrGetUser(req))
  .then(users.setUserColour)
  .then(jwt.signJwtToken)
  .then(token => (res.json({ token })))
  .catch(error => (console.error(error)));
};
