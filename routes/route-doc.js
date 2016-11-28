'use strict';

const chalk     = require('chalk');
const log       = console.log;
module.exports = function (routes, src) {

    var Table = require('cli-table');
    var table = new Table({head: ["", "Name", "Path"]});
    log(chalk.italic('*=> API for this service'));
    if (src == 'restify') {
        log(chalk.blue('\n********************************************'));
        log(chalk.green('\t\tRESTIFY'));
        log(chalk.blue('********************************************\n'));
        for (var key in routes) {
            if (routes.hasOwnProperty(key)) {
                var val = routes[key];
                var _o = {};
                _o[val.method] = [val.name, val.spec.path];
                table.push(_o);
            }
        }
    }
    else {
        log(chalk.green('\n********************************************'));
        log(chalk.blue.bold('\t\tEXPRESS'));
        log(chalk.green('********************************************\n'));
        for (var key in routes) {
            if (routes.hasOwnProperty(key)) {
                var val = routes[key];
                if (val.route) {
                    val = val.route;
                    var _o = {};
                    _o[val.stack[0].method] = [val.path, val.path];
                    table.push(_o);
                }
            }
        }
    }
    log(chalk.yellow(table.toString()));
    return table;
};