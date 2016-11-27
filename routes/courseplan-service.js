var express = require('express');
var router = express.Router();

var url = require('url');
const chalk = require('chalk');
const log = console.log;

// middleware to use for all requests
router.use(function(req, res, next) {
    cUtils.reqLogger(req, res, next);
});


require('./route-doc')(router.stack, 'express');

module.exports = router;