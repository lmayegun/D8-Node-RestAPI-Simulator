const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { type: String, required: true},
  category: { type: String, required: true },
  thumbnail: { type: String, required: false },
  uri: { type: String, required: true},
  description: { type: String, required: false },
});

videoSchema.index({
  title: 'text',
});

module.exports = mongoose.model('Video', videoSchema);
