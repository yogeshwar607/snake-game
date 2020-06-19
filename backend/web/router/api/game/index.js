const createHandler = require('./create.handler');
const getHandler = require('./get.handler');
const updateHandler = require('./update.handler');

module.exports = (router) => {
  router.post('/game/update', updateHandler);
  router.post('/game/create', createHandler);
  router.get('/game/:id', getHandler);
};
