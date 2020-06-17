const assert = require('assert');
let Schema = null;

function init() {
  const playerSchema = new Schema(
    {
      player_id: { type: String, required: true, unique: true }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
  );

  return playerSchema;
}

module.exports = (schema) => {
  assert.ok(schema);
  Schema = schema;
  return init();
};
