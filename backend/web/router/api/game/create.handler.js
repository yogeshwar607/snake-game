const Game = rootRequire('models').Game;
async function handler(req, res, next) {
  const games = await Game.find({});

  res.json({
    success: true,
    games
  });
}
module.exports = handler;
