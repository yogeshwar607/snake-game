const joi = require('joi');
const nconf = require('nconf');

const envVarsSchema = joi
  .object({
    DB: joi.string().valid(['snake-game']).required(),
    DB_URI: joi.string().required()
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(nconf.get(), envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  db: envVars.DB,
  dbURI: envVars.DB_URI,
  connectionString: `mongodb://${envVars.DB_URI}/${envVars.DB}`
};

module.exports = config;
