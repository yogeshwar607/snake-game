const express = require('./components/express');
const serverConfig = require('./components/server.config');
const database = require('./components/database');
const mongoose = require('./components/mongoose');
const logger = require('./components/logger');

module.exports = {
  serverConfig,
  database,
  express,
  mongoose,
  logger,
};