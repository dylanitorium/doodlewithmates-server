import rethinkdb from 'rethinkdb';
import randomcolor from 'randomcolor';
import config from '../config/rethinkdb/config';
import { formatForEmber } from './utils/ember';
import * as jwt from './jwt';

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

export const getUser = ({ id }) => (
  new Promise((resolve, reject) => (
    rethinkdb.connect(config, (err, connection) => (
      rethinkdb.table('users')
      .get(id)
      .run(connection)
      .then((user) => {
        resolve(user);
      })
      .error(error => reject(error))
    ))
  ))
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
    }).catch(err => err)
  )
);

export const updateUser = (id, data) => (
  rethinkdb.connect(config, (err, connection) => {
    rethinkdb.table('users')
    .get(id)
    .update(data)
    .run(connection, { durability: 'soft' });
  })
);

export const setUserColour = user => (
  updateUser(user.id, { color: randomcolor() }).then(() => (user))
);


export const getUsers = query => (
  rethinkdb.connect(config)
  .then((connection) => {
    if (query) {
      return formatQuery(query).then(formattedQuery => (
        rethinkdb.table('users').filter(formattedQuery).run(connection)
      ));
    }
    return rethinkdb.table('users').run(connection);
  })
  .then(cursor => cursor.toArray())
  .then(formatForEmber('user'))
);
