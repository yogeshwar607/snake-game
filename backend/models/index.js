const mongoose = require('mongoose');

// Setting default SYSTEM PROMISE
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// loading all the models

const Game = mongoose.model('game', require('./game.schema')(Schema));
const Player = mongoose.model('player', require('./player.schema')(Schema));


// registring models
const model = {
  Game,
  Player
};

module.exports = model;
