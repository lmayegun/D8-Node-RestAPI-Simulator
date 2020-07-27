const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true},
  category: { type: String, required: true },
  author: { type: String, required: false},
  publishedOn: { type: String, required: true},
  image: { type: String, required: false },
  urlToImage: { type: String, required: false },
  sideThumbImg: { type: String, required: false },
  centerThumbImg: { type: String, required: false },
  summary: { type: String, required: false },
  body: { type: String, required: true },
  content: { type: String, required: false },
  description: { type: String, required: false },
  tags: { type: Array, required: false },
});

postSchema.index({
  summary: 'text',
  body: 'text',
});

module.exports = mongoose.model('Post', postSchema);
