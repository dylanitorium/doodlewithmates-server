// Allows us to use babel on the server
import 'babel-polyfill';
import express from 'express';
import http from 'http';

import config from './config/environment';
import {
  createDbConnection,
  closeDbConnection,
} from './middleware/database';
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


// Open DB Connection
// =================
app.use(createDbConnection);


// Sockets
// =======
socketConfig(server);

// Middleware
// =================
middlewareConfig(app);

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


app.use(closeDbConnection);
