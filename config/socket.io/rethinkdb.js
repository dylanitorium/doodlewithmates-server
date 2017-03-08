import rethinkdb from 'rethinkdb';
import service from '../../api/jwt';
import dbConfig from '../rethinkdb/config';
import { DATABASE_UPDATED } from './events';


export const handleDraw = (data) => {
  console.log('This event will handle draw. It will update the layer for the user in the database from the data');
  console.log(data);
};

export const handleOnAfterConnection = ({ token }) => {
  console.log('This event will recieve a user id from the client authenticaed session. It will callback to set the user as active and assign a colour')
  console.log(token);

};

export const handleOnBeforeDisconnection = (data) => {
  console.log('This will take the user id from the client authenticaed session and deactive the user, removing any layers from them as well as colour')
  console.log(data);
};

export const socketConfig = (client) => {
  rethinkdb.connect(dbConfig, (err, connection) => {
    rethinkdb.table('users').changes().run(connection, (error, cursor) => {
      cursor.each((cursorErr, change) => {
        client.emit(DATABASE_UPDATED, change);
      });
    });
  });
};
