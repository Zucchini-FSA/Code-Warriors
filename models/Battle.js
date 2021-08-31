const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const BattleSchema = new mongoose.Schema({
  ref: {
    type: String,
    required: true,
  },
  roomId: {
    type: Number
  },
  completed: {
    type: Boolean,
    default: false,
  },
  players: {
    type: Array,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  open: {
    type: Boolean,
    default: true
  }
});

//BattleSchema.plugin(uniqueValidator);

const Battle = mongoose.model('Battle', BattleSchema);

module.exports = Battle;
