import socketIo from 'socket.io';
import * as Events from './events';
import * as rethinkdbService from './rethinkdb';
import { ioSession } from '../../middleware/session';

export default (server) => {
  const io = socketIo(server);
  io.use(ioSession);
  io.on(Events.CONNECTION, (socket) => {
    const { request } = socket;
    console.log(socket);
    socket.on(Events.ON_AFTER_CONNECTION, rethinkdbService.handleOnAfterConnection(request));
    socket.on(Events.DRAW_PROGRESS, rethinkdbService.handleDrawProgress(socket));
    // socket.on(Events.DRAW_END, rethinkdbService.handleDrawEnd(socket));
    socket.on(Events.DISCONNECTION, rethinkdbService.handleDisconnection(request));
    rethinkdbService.socketConfig(socket);
  });
};
