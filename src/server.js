// Allows us to use babel on the server
import 'babel-polyfill';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import config from './config/environment';

import mongooseConfig from './config/mongoose';
import middlewareConfig from './middleware';
import routerConfig from './routes';
import socketConfig from './config/socket.io';

const {
  EXPRESS: {
    PORT,
  },
} = config;

// Server Config
// =============
const app = express();
const server = http.createServer(app);
const port = PORT;

mongooseConfig(mongoose);

// Middleware
// =================
middlewareConfig(app);

// Sockets
// =======
socketConfig(server);

// Router
// ======
routerConfig(app);

// Start Server
// ============
server.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info('----------'); // eslint-disable-line no-console
    console.info(`Doodle With Mates Server listening on port ${port}.`); // eslint-disable-line no-console
    console.info('==========');// eslint-disable-line no-console
  }
});
