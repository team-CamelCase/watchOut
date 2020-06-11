const express = require('express');
var speechRouter = express.Router();
const speechHandler = require('../handlers/speech');

speechRouter.get(
    '/', 
    speechHandler.getSpeechFile
);

module.exports = speechRouter;
