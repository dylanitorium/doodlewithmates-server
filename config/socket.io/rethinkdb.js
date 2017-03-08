import rethinkdb from 'rethinkdb';
import * as jwtService from '../../api/jwt';
import * as userService from '../../api/users';
import dbConfig from '../rethinkdb/config';
import { DATABASE_UPDATED } from './events';

const setUserAsActive = (id) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users').get(id).update({ active: true }).run(connection);
  });
};

const setUserAsInactive = (id) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users').get(id).update({ active: false }).run(connection);
  });
};

const setSessionToken = (request, token) => (request.session.token = token);

const getSessionToken = request => (request.session.token);

export const handleDraw = (data) => {
  console.log('This event will handle draw. It will update the layer for the user in the database from the data');
  console.log(data);
};

export const handleOnAfterConnection = request => (
  (token) => {
    console.log('This event will recieve a user id from the client authenticaed session. It will callback to set the user as active and assign a colour')
    console.log(token);
    setSessionToken(request, token);
    jwtService.getIdFromToken(token)
    .then(setUserAsActive);
  }
);

export const handleDisconnection = request => (
  () => {
    console.log('This will take the user id from the client authenticaed session and deactive the user, removing any layers from them as well as colour')
    const token = getSessionToken(request);
    console.log(token);
    jwtService.getIdFromToken(token)
    .then(setUserAsInactive);
  }
);

export const socketConfig = (client) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users').changes().run(connection, (error, cursor) => {
      cursor.each((cursorErr, change) => {
        console.log('change detected');
        console.log(change);
        client.emit(DATABASE_UPDATED, change);
      });
    });
  });
};
