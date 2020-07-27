const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true},
  category: { type: String, required: true },
  author: { type: String, required: false},
  publishedOn: { type: String, required: true},
  thumbImage: { type: String, required: false },
  exclusive: { type: Boolean, required: true},
  breaking: { type: Boolean, required: true},
  video: { type: Boolean, required: true },
  gated: { type: Boolean, required: true },
  body: { type: Array, required: false },
});

postSchema.index({
  title: 'text',
});

module.exports = mongoose.model('Post', postSchema);
