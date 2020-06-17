const Player = rootRequire('models').Player;
async function handler(req, res, next) {
  try {
    const player_id = req.body.playerId;

    if (!player_id) throw Error('playerId not provided');

    const result = await Player.findOne({ player_id });

    if (!result) throw Error('playerId not found');

    if (result && result.errors) {
      throw Error(JSON.stringify(result.errors));
    }

    res.json({
      success: true,
      message: 'player founs successfully',
      playerId: result.player_id
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
}
module.exports = handler;
