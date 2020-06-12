const express = require('express');
var speechRouter = express.Router();
const speechHandler = require('../handlers/speech');

speechRouter.get(
    '/',
    speechHandler.getALLSpeechFile
);

speechRouter.get(
    '/latest/:number',
    speechHandler.getLatestSpeechFile
);

module.exports = speechRouter;
