const assert = require('assert');
let Schema = null;

function init() {
  const gameSchema = new Schema(
    {
      game_id: { type: String, required: true, unique: true },
      details: [{ player_id: { type: String }, score: { type: Number } }]
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
  );

  return gameSchema;
}

module.exports = (schema) => {
  assert.ok(schema);
  Schema = schema;
  return init();
};
