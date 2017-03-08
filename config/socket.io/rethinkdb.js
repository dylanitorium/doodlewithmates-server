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

export const handleDraw = (data) => {
  console.log('This event will handle draw. It will update the layer for the user in the database from the data');
  console.log(data);
};

export const handleOnAfterConnection = (token) => {
  console.log('This event will recieve a user id from the client authenticaed session. It will callback to set the user as active and assign a colour')
  console.log(token);

  // Add token to session
  jwtService.getIdFromToken(token)
  .then(setUserAsActive);
};

export const handleOnBeforeDisconnection = (token) => {
  console.log('This will take the user id from the client authenticaed session and deactive the user, removing any layers from them as well as colour')
  jwtService.getIdFromToken(token)
  .then(setUserAsInactive);
};

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
