var app = require('../app');
var debug = require('debug')('camelCase:speechServer');
const http = require('http')
const dbClient = require('../models/client')
const constants = require('../tools/constants')

require('dotenv').config();

async function start(server, port) {
  try {

    // Cloud Network Access Check!
    await dbClient.init()

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

start(server, constants.port)

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof constants.port === 'string'
    ? 'Pipe ' + constants.port
    : 'Port ' + constants.port;

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

const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log("Server Listenening on ", constants.port)
}
