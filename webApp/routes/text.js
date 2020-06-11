const express = require('express');
var textRouter = express.Router();
const textHandler = require('../handlers/text');

textRouter.get(
    '/', 
    textHandler.getTextFile
);

module.exports = textRouter;
