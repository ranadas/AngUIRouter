const chalk = require('chalk');
const log = console.log;

var sortedMap = require("collections/sorted-map");

module.exports = {
    reqLogger: requestBodyLog
};

// define functions
function requestBodyLog(req, res, next) {
    log(chalk.green('Request Body is :') + chalk.green(JSON.stringify(req.body)));
    next();
}