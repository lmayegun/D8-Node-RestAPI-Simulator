const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true},
  category: { type: String, required: true },
  author: { type: String, required: false},
  publishedOn: { type: Number, required: true},
  image: { type: String, required: true },
  summary: { type: String, required: false },
  body: { type: String, required: true },
});

module.exports = mongoose.model('Article', articleSchema);
