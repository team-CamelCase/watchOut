var express = require('express');
var app = express();
var logger = require('morgan');
var bodyparser = require('body-parser');
const speechRouter = require('./routes/speech');

app.use(logger('dev'));
app.use(express.json());
app.use(
  bodyparser.urlencoded({
    extended:false
  })
);

// Set Routers
const basePath = "/api/v1"

app.use(
  basePath + '/speech', 
  speechRouter
);

module.exports = app;
