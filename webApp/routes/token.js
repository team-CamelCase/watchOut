const express = require('express');
var tokenRouter = express.Router();
const tokenHandler = require('../handlers/token');

tokenRouter.get(
    '/',
    tokenHandler.getAccessToken
);

module.exports = tokenRouter;
