const { Schema, model } = require('mongoose');

const experimentSchema = new Schema({
  title: String,
  getStartedPrompts: [
    {
      type: String
    }
  ],
  conversation: [
    {
      type: String
    }
  ]
}, { timestamps: true }); // Enable timestamps

const Experiment = model('Experiment', experimentSchema);

module.exports = Experiment;
