const express = require('express');
var speechRouter = express.Router();
const speechHandler = require('../handlers/speech');

speechRouter.post(
    '/', 
    speechHandler.saveSpeechFile
);

module.exports = speechRouter;
