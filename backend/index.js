// set environment variables first
require('./env.variables');

// set globals
require('./globals');

const { mongoose, serverConfig } = require('./config');
const socketIo = require('socket.io');
try {
  mongoose.init();

  // Starting API Server
  const server = require('./web/server');
  const io = socketIo(server);

  require('./sockets')(io);

  logger.info(`Environment: ${serverConfig.env}`);
} catch (error) {
  logger.error(error);
}
// uncaughtException Exception
process.on('uncaughtException', (err) => {
  logger.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  logger.error(err.stack);
  process.exit(1);
});
