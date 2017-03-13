import socketIo from 'socket.io';
import * as Events from './events';
import * as socketService from '../../api/socket';
import { ioSession } from '../../middleware/session';

export default (server) => {
  const io = socketIo(server);
  io.use(ioSession);
  io.on(Events.CONNECTION, (socket) => {
    socket.on(Events.ON_AFTER_CONNECTION, socketService.handleOnAfterConnection(io, socket));
    socket.on(Events.DRAW_PROGRESS, socketService.handleDrawProgress(socket));
    socket.on(Events.DRAW_END, socketService.handleDrawEnd);
    socket.on(Events.DISCONNECTION, socketService.handleDisconnection(socket));
  });
};
