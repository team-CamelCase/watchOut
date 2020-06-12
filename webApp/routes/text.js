const express = require('express');
var textRouter = express.Router();
const textHandler = require('../handlers/text');

textRouter.get(
    '/',
    textHandler.getALLTextFile
);

textRouter.get(
    '/latest/:number',
    textHandler.getLatestTextFile
);

module.exports = textRouter;
