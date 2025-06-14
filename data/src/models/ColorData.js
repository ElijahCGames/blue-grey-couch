const mongoose = require('mongoose');

const colorDataSchema = new mongoose.Schema({
  colorChoices: {
    grey: [String],
    blue: [String]
  },
  timeStamp: {
    type: Number,
    default: () => Date.now()
  }
});

module.exports = mongoose.model('ColorData', colorDataSchema); 