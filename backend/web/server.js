const { express, serverConfig } = rootRequire('config');
const { basic, handleError } = require('./middleware');

const app = express();
const server = require('http').Server(app);

try {
  basic(app);

  // mounting routes
  require('./router')(app);

  server.listen(serverConfig.port, (err) => {
    if (err) {
      logger.error(`Error while starting server at port ${serverConfig.port} | Error: ${err.message}`);
    }
    logger.info(`Express Server Up and Running @PORT: ${serverConfig.port} | at localhost`);
  });
} catch (error) {
  logger.error(error);
}
module.exports = server;
