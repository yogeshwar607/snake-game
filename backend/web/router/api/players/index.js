const createHandler = require('./create.handler');
const getHandler = require('./get.handler');
// const updateHandler = require('./update.handler');

module.exports = (router) => {
  router.post('/player/create', createHandler);
  router.post('/player/get', getHandler);

  // router.post('/game/update/:id', updateHandler);

  // router.get('/game/:id', getHandler);
};
