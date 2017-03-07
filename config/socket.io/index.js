import socketIo from 'socket.io';
import * as Events from './events';
import * as rethinkdbService from './rethinkdb';

export default (server) => {
  const io = socketIo(server);
  io.on(Events.CONNECTION, (socket) => {
    socket.on(Events.ON_AFTER_CONNECTION, rethinkdbService.handleOnAfterConnection);
    socket.on(Events.DRAW, rethinkdbService.handleDraw);
    socket.on(Events.ON_BEFORE_DISCONNECT, rethinkdbService.handleOnBeforeDisconnection);
    rethinkdbService.socketConfig(socket);
  });
};
