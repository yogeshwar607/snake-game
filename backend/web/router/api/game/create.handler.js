const cuid = require('cuid');
const Game = rootRequire('models').Game;
async function handler(req, res, next) {
  try {
    const game_id = cuid().slice(3, 9);
    const details = req.body.gameDetails;
    const game_mode = req.body.gameMode;
    if (!details || !details.length) throw Error('gameDetails not provided');

    const result = await Game.create({ game_id, details, game_mode });

    if (result && result.errors) {
      throw Error(JSON.stringify(result.errors));
    }

    res.json({
      success: true,
      message: 'Game create successfully',
      gameId: result.game_id,
      gameDetails: result.details,
      gameMode: result.game_mode ? result.game_mode : 'multiplayer'
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message.includes('duplicate key error')
        ? 'gameId already exists , try different gameId'
        : error.message
    });
  }
}
module.exports = handler;
