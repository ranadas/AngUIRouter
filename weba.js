// node/express server js

// set up ========================
var express = require('express');
var app = express();                                // create our app w/ express
var port = process.env.PORT || 8088;

var morgan = require('morgan');                     // log requests to the console (express4)
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)
var errorHandler = require('error-handler');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');

//var mongoose = require('mongoose');                     // mongoose for mongodb
// configuration =================
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(morgan('dev'));                                         // log every request to the console

//https://github.com/expressjs/express/blob/master/examples/static-files/index.js
app.use(express.static(path.join(__dirname, 'app')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'app/bower_components')));
app.use('/dist/views/', express.static(path.join(__dirname, 'app/dist/views')));
app.use('/assets/', express.static(path.join(__dirname, 'app/dist/assets/')));
app.use('/svgs/', express.static(path.join(__dirname, 'app/dist/assets/svg/')));
app.use('/src/js/', express.static(path.join(__dirname, 'app/src/js')));

app.use(express.static(path.join(__dirname, 'public', 'css')));

app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

//var routes = require('./routes/index');
var users = require('./routes/users');
app.use('/users', users);

var course = require('./routes/courses');
app.use('/course', course);


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

//app.listen(port);
app.listen(port, function () {
    //require('./routes/route-doc')(app.router.mounts, 'restify');
    require('./routes/route-doc')(app._router.stack, 'express');
});

console.log("NodeJs listening on port " + port);
