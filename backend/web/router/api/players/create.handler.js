const Player = rootRequire('models').Player;
async function handler(req, res, next) {
  try {
    const player_id = req.body.playerId;

    if (!player_id) throw Error('playerId not provided');

    const result = await Player.create({ player_id });

    if (result && result.errors) {
      throw Error(JSON.stringify(result.errors));
    }

    res.json({
      success: true,
      message: 'player create successfully',
      playerId: result.player_id
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message.includes('duplicate key error')
        ? 'playerId already exists , try different playerId'
        : error.message
    });
  }
}
module.exports = handler;
