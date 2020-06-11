var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
const speechRouter = require('./routes/speech');
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
  constants.basePath + '/speech', 
  speechRouter
);

module.exports = app;
