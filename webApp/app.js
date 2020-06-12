var express = require('express');
var logger = require('morgan');
var app = express();
var bodyParser = require('body-parser');
const newsRouter = require('./routes/news');
const constants = require('./tools/constants')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended:false
  })
);

// Set Routers
app.use(
  constants.basePath + '/news',
  newsRouter
);

module.exports = app;
