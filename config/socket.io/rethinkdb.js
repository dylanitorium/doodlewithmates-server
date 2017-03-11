import rethinkdb from 'rethinkdb';
import randomcolor from 'randomcolor';
import * as jwtService from '../../api/jwt';
import dbConfig from '../rethinkdb/config';
import { USER_CHANGE } from './events';

const setUserAsActive = id => (
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users')
    .get(id)
    .update({
      active: true,
      color: randomcolor(),
    })
    .run(connection, { durability: 'soft' });
  })
);

const setUserPath = ({ id, path }) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users')
    .get(id)
    .update({
      path,
    })
    .run(connection, { durability: 'soft' });
  });
};

const setUserAsInactive = (id) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users')
    .get(id)
    .update({
      active: false,
      path: null,
    })
    .run(connection);
  });
};

const setSessionToken = (request, token) => (request.session.token = token);

const getSessionToken = request => (request.session.token);

export const handleDrawProgress = socket => (data => (socket.broadcast.emit('draw:change', data)));

export const handleDrawEnd = setUserPath;

export const handleOnAfterConnection = ({ request }) => (
  (token) => {
    setSessionToken(request, token);
    jwtService.getIdFromToken(token)
    .then(setUserAsActive);
  }
);

export const handleDisconnection = socket => (
  () => {
    const token = getSessionToken(socket.request);
    jwtService.getIdFromToken(token)
    .then(setUserAsInactive);
  }
);

export const socketConfig = (socket) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users').changes().run(connection, (error, cursor) => {
      cursor.each((cursorErr, change) => {
        if (cursorErr) {
          return console.error(cursorErr);
        }
        return socket.emit(USER_CHANGE, change);
      });
    });
  });
};
