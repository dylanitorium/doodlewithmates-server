import rethinkdb from 'rethinkdb';

export const getUser = ({ id }, conn) => (
  rethinkdb.table('users')
  .get(id)
  .run(conn)
  .error(error => error)
);

export const createUser = (user, conn) => (
  rethinkdb.table('users')
  .insert(user)
  .run(conn, { durability: 'soft' })
  .then(() => (user))
);

export const createOrGetUser = ({ dbConn }) => (
  user => (
    getUser(user, dbConn)
    .then((existing) => {
      if (!existing) {
        return createUser(user, dbConn);
      }
      return existing;
    }).error(err => err)
  )
);

export const removeUser = () => {

};

export const getUsers = () => {

};

export const addUserToActiveList = () => {

};
