import socketIo from 'socket.io';
import * as Events from './events';
import * as rethinkdbService from './rethinkdb';
import { ioSession } from '../../middleware/session';

export default (server) => {
  const io = socketIo(server);
  io.use(ioSession);
  io.on(Events.CONNECTION, (socket) => {
    console.log(socket.request.session);
    socket.on(Events.ON_AFTER_CONNECTION, rethinkdbService.handleOnAfterConnection);
    socket.on(Events.DRAW, rethinkdbService.handleDraw);
    socket.on(Events.ON_BEFORE_DISCONNECT, rethinkdbService.handleOnBeforeDisconnection);
    socket.on(Events.DISCONNECTION, () => {

    });
    rethinkdbService.socketConfig(socket);
  });
};
