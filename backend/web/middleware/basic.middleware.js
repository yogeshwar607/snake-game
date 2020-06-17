const bodyParser = require('body-parser');

function basicMiddlewares(app) {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  // throws 400 error to next, if JSON is not valid
  app.use(
    bodyParser.json({
      strict: true,
      limit: '50mb'
    })
  );

  // parses the url encoded strings
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '50mb'
    })
  );
}

module.exports = basicMiddlewares;
