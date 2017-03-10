import rethinkdb from 'rethinkdb';
import randomcolor from 'randomcolor';
import * as jwtService from '../../api/jwt';
import dbConfig from '../rethinkdb/config';
import { DATABASE_UPDATED } from './events';

const setUserAsActive = id => (
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users')
    .get(id)
    .update({
      active: true,
      color: randomcolor(),
    })
    .run(connection);
  })
);

const setUserPath = path => (
  id => (
    rethinkdb.connect(dbConfig, (err, connection) => {
      rethinkdb.table('users')
      .get(id)
      .update({
        path,
      })
      .run(connection);
    })
  )
);


const setUserAsInactive = (id) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users')
    .get(id)
    .update({
      active: false,
    })
    .run(connection);
  });
};

const setSessionToken = (request, token) => (request.session.token = token);

const getSessionToken = request => (request.session.token);

export const handleDraw = (data) => {
  const { token, path } = data;
  console.log(data);
  jwtService.getIdFromToken(token)
  .then(setUserPath(path));
};

export const handleOnAfterConnection = request => (
  (token) => {
    setSessionToken(request, token);
    jwtService.getIdFromToken(token)
    .then(setUserAsActive);
  }
);

export const handleDisconnection = request => (
  () => {
    const token = getSessionToken(request);
    jwtService.getIdFromToken(token)
    .then(setUserAsInactive);
  }
);

export const socketConfig = (client) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users').changes().run(connection, (error, cursor) => {
      cursor.each((cursorErr, change) => {
        if (cursorErr) {
          return console.error(cursorErr);
        }
        return client.emit(DATABASE_UPDATED, change);
      });
    });
  });
};
