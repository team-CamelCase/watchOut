const express = require('express');
var newsRouter = express.Router();
const newsHandler = require('../handlers/news');

newsRouter.get(
    '/',
    newsHandler.getAllNewsFile
);

newsRouter.get(
    '/latest/:number?',
    newsHandler.getLatestNewsFile
);

module.exports = newsRouter;
