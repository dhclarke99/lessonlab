const { Schema, model } = require('mongoose');

const experimentSchema = new Schema({
  title: String,
  getStartedPrompts: [
    {
        type: String
    }
]
});

const Experiment = model('Experiment', experimentSchema);

module.exports = Experiment;