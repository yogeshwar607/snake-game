/**
 * Setting basic configurations for Express and only expose app (express) object
 * for further processing.
 */
const app = require('express')();
const express = require('express');
const path = require('path');

module.exports = () => {
  // disabled for security reasons
  app.disable('x-powered-by');
  app.use(express.static(path.join(__dirname, '../../build')));
  return app;
};
