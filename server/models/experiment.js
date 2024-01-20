const { Schema, model } = require('mongoose');

const experimentSchema = new Schema({
  title: String,
  getStartedPrompts: [
    {
        type: String
    }
]
});

module.exports = model('Experiment', experimentSchema);