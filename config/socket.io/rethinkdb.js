import rethinkdb from 'rethinkdb';
import config from '../rethinkdb/config';
import { DATABASE_UPDATED } from './events';

export const handleDraw = (data) => {
  console.log('This event will handle draw. It will update the layer for the user in the database from the data');
  console.log(data);
};

export const handleOnAfterConnection = (data) => {
  console.log('This event will recieve a user id from the client authenticaed session. It will callback to set the user as active and assign a colour')
  console.log(data);
};

export const handleOnBeforeDisconnection = (data) => {
  console.log('This will take the user id from the client authenticaed session and deactive the user, removing any layers from them as well as colour')
  console.log(data);
};

export const socketConfig = (client) => {
  rethinkdb.connect(config, (err, connection) => {
    rethinkdb.table('users').changes().run(connection, (error, cursor) => {
      cursor.each((cursorErr, change) => {
        client.emit(DATABASE_UPDATED, change);
      });
    });
  });
};
