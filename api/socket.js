import * as userService from './users';
import * as jwtService from './jwt';
import {
  USER_ACTIVATED,
  USER_DEACTIVATED,
  DRAW_CHANGE,
} from '../config/socket.io/events';

const setUserAsActive = id => (
  userService.updateUser(id, {
    active: true,
  }).then(() => ({ id }))
);

const setUserPath = ({ id, path }) => (userService.updateUser(id, { path }));

const setUserAsInactive = id => (
  userService.updateUser(id, {
    active: false,
    path: null,
  }).then(() => ({ id }))
);

const setSessionToken = (request, token) => (request.session.token = token);

const getSessionToken = request => (request.session.token);

export const handleDrawProgress = socket => (data => (socket.broadcast.emit(DRAW_CHANGE, data)));

export const handleDrawEnd = setUserPath;

export const handleOnAfterConnection = (io, socket) => (
  (token) => {
    setSessionToken(socket.request, token);
    jwtService.getIdFromToken(token)
    .then(setUserAsActive)
    .then(userService.getUser)
    .then((user) => {
      io.emit(USER_ACTIVATED, user);
    });
  }
);

export const handleDisconnection = socket => (
  () => {
    jwtService.getIdFromToken(getSessionToken(socket.request))
    .then(setUserAsInactive)
    .then(userService.getUser)
    .then(user => (socket.broadcast.emit(USER_DEACTIVATED, user)));
  }
);
