const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const articles = require('./routes/articles-routes');

app.use(bodyParser.json());
app.use('/api/articles', articles);

app.listen(port);

console.log("Wonderful time so much to me");
