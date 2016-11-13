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

//var mongoose = require('mongoose');                     // mongoose for mongodb
// configuration =================
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(morgan('dev'));                                         // log every request to the console

//https://github.com/expressjs/express/blob/master/examples/static-files/index.js
app.use(express.static(path.join(__dirname, 'app')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'app/bower_components')));
app.use('/dist/views/', express.static(path.join(__dirname, 'app/dist/views')));
app.use('/src/js/', express.static(path.join(__dirname, 'app/src/js')));

app.use(express.static(path.join(__dirname, 'public', 'css')));

app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());


app.get('*', function(req, res) {
    res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


app.listen(port);
console.log("App listening on port " + port);
