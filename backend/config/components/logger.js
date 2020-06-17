
const logger = {
  info: function(value) {
    console.info(value);
  },
  error: function(value) {
    console.error(value);
  },
  debug: function(value) {
    console.debug(value);
  }
};

module.exports = logger;
