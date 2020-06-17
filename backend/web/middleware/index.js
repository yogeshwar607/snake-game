const basic = require('./basic.middleware');
const requestLogger = require('./requestLogger.middleware');

module.exports = {
  basic,
  requestLogger,
};