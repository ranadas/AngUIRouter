// node/express server js
const express         = require('express');
const app             = express();                                // create our app w/ express
const port            = process.env.PORT || 8088;

const morgan          = require('morgan');                     // log requests to the console (express4)
const bodyParser      = require('body-parser');            // pull information from HTML POST (express4)
const methodOverride  = require('method-override');    // simulate DELETE and PUT (express4)
const errorHandler    = require('error-handler');
const http            = require('http');
const path            = require('path');
const favicon         = require('serve-favicon');

const chalk           = require('chalk');
const log = console.log;
const mongoose        = require('mongoose');

app.use(morgan('dev'));                                         // log every request to the console

//https://github.com/expressjs/express/blob/master/examples/static-files/index.js
app.use(express.static(path.join(__dirname, 'app')));
//app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'app/bower_components')));
app.use('/dist/views/', express.static(path.join(__dirname, 'app/dist/views')));
app.use('/assets/', express.static(path.join(__dirname, 'app/dist/assets/')));
app.use('/svgs/', express.static(path.join(__dirname, 'app/dist/assets/svg/')));
app.use('/src/js/', express.static(path.join(__dirname, 'app/src/js')));

app.use(express.static(path.join(__dirname, 'public', 'css')));

app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

var users = require('./routes/users-service');
app.use('/users', users);

var courses = require('./routes/course-service');
app.use('/course', courses);

var contactUs = require('./routes/contactus-service');
app.use('/contact', contactUs);

app.get('/', function(req, res) {
    res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        //error: {} // this is the actual way not to return stack trace to user
        error: err
    });
});

module.exports = app;
app.use(errorHandler);


// mongoose
var dbConfig = require('./config/db.js');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);

module.exports = app;


// Allowing X-domain request
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//app.listen(port);
app.listen(port, function () {
    require('./routes/route-doc')(app._router.stack, 'express');
});


log(chalk.green('\n\nApplication listening on port: ') + chalk.red.bgCyan.underline(port));