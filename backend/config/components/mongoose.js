const mongoose = require('mongoose');
const database = require('./database');
const server = require('./server.config');

function init() {
  const options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
  };

  mongoose.connect(database.connectionString, options);

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    logger.info(`Mongoose default connection open to database ${database.db}`);
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose default connection error: ${err}`);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  // LOADING MODELS
  rootRequire('models');
}

module.exports = { init };
