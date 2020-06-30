const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const configs = require("./configs");

const app = express();
const port = 3000;

const articles = require('./routes/articles-routes');

app.use(bodyParser.json());
app.use('/api/articles', articles);

mongoose
  .connect(configs.mongodb_server)
  .then(() => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });

console.log("Wonderful time so much to me");
