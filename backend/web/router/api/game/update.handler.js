const Game = rootRequire('models').Game;
async function handler(req, res, next) {
  try {
    const game_id = req.body.gameId;
    const details = req.body.gameDetails;

    if (!game_id) throw Error('gameId not provided');
    if (!details || !details.length) throw Error('gameDetails not provided');

    //  deep level check for duplicate player_id
    const game = await Game.findOne({ game_id });

    if (!game) throw Error('gameId not found');

    details.map((detail) => {
      game.details.unshift(detail);
    });

    const result = await game.save();

    res.json({
      success: true,
      message: 'Game updated successfully',
      gameId: result.game_id,
      gameDetails:result.details,
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
