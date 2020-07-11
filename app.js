const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

const HttpError = require('./models/http-error');

const app = express();
const port = 3000;

const articles = require('./routes/articles-routes');

app.use(bodyParser.json());
app.use('/api/articles', articles);
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
  res.status(404).json({error:error.message});
});

app.use((error, req, res, next) => {
  if (req.file){
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect()
  .then(() => {
    app.listen( process.env.PORT || port);
  })
  .catch(err => {
    console.log(err);
  });
