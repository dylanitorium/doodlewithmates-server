'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _environment = require('./config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _mongoose3 = require('./config/mongoose');

var _mongoose4 = _interopRequireDefault(_mongoose3);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _socket = require('./config/socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = _environment2.default.EXPRESS.PORT;

// Server Config
// =============
// Allows us to use babel on the server

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var port = PORT;

(0, _mongoose4.default)(_mongoose2.default);

// Middleware
// =================
(0, _middleware2.default)(app);

// Sockets
// =======
(0, _socket2.default)(server);

// Router
// ======
(0, _routes2.default)(app);

// Start Server
// ============
server.listen(port, function (error) {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info('----------'); // eslint-disable-line no-console
    console.info('Doodle With Mates Server listening on port ' + port + '.'); // eslint-disable-line no-console
    console.info('=========='); // eslint-disable-line no-console
  }
});
//# sourceMappingURL=server.js.map