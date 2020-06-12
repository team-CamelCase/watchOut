var app = require('../app');
var debug = require('debug')('camelCase:speechServer');
const http = require('http')
const dbClient = require('../models/client')
const constants = require('../tools/constants')

require('dotenv').config();

async function start(server, port) {
  try {

    // Cloud Network Access Check!
    await dbClient.init();
    console.log('port number : ' + port)
    app.set('port', port);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

  } catch (err) {
    console.log(err)
    process.exit(1)
    return
  }
}

const server = http.createServer(app);
start(server, constants.port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
