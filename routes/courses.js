var express = require('express');
var router = express.Router();

var _str = require('underscore.string');
//var _und = require('underscore');
var url = require('url');
const chalk = require('chalk');
const log = console.log;

var SortedMap = require("collections/sorted-map");

// middleware to use for all requests
router.use(function(req, res, next) {
    log(chalk.green('Request Body is :') + chalk.green(JSON.stringify(req.body)));
    next();
});

/*
 * GET courseList.
 * curl localhost:8088/course/courses
 */
router.get('/courses', function(req, res) {
    log(chalk.green("\n --> returning courses ") + chalk.yellow(JSON.stringify(courseList)));
    res.json(courseList);
});

/**
 * https://webapplog.com/url-parameters-and-routing-in-express-js/
 * GET localhost:8088/course/search?name=python
 */
router.get('/search', function(req, res) {
    var courseSearchName = req.param("name");
    log(chalk.blue("\t--1:" + JSON.stringify(courseSearchName)));
    /*
     req.params
     req.body
     req.query
     */
    var respponse = searchArray(courseSearchName);
    log(chalk.green(respponse));
    res.json(respponse);
});

//localhost:8088/course/search/<scr>
//localhost:8088/course/search/<jav>
router.get('/search/:query', function(req, res) {
    var query = req.params.query;
    log(chalk.yellow("search query is ") + chalk.blue(JSON.stringify(query)));
    // var query = url.parse(req.url, true).query;
    // console.log("query1 = " + JSON.stringify(query));
    var respponse = searchArray(query);
    res.json(respponse);
});

// TODO
router.get('/cs/:storyId/elements', function(request, response) {
    // Now we automatically get the story in the request object
    // We use story ID to create a new element for that story
    //{ story: request.story, element: newElement}
    res.send("OK");
});

router.post('/save', function(req, res) {
    log(chalk.green("POSTing to add course:") + chalk.red(req.body));
    // should be done a bit better, validations, etc.
    courseList.push(req.body);

    log(chalk.green("\n --> After adding + " + JSON.stringify(courseList) + "\n"));
    res.json("OK");
});

function searchArray(courseSearchName) {
    log(chalk.red('\n-->Searching courses containing name ', chalk.underline.blue.bgRed.bold(courseSearchName) + '!\n'));

    if (courseSearchName === undefined) {
        return "Invalid SEARCH TERM";
    }
    var foundArr = courseList.filter(function(element, index) {
        log(chalk.yellow.underline(JSON.stringify(element) + " at index " + index));
        if (_str.include(_str.capitalize(element.name), _str.capitalize(courseSearchName))) {
            log(chalk.green("\n- Found : ") + chalk.blue(JSON.stringify(element)));
            return true;
        }
    });
    log(chalk.green('- Returning Found :  %s'), JSON.stringify(foundArr));

    return foundArr;
}

var courseList = [
    {
        "name": "Programing with Python",
        "active": "true",
        "logo":"python.png"

    },
    {
        "name": "Introduction to HTML5",
        "active": "true",
        "logo":"html5.png"
    },
    {
        "name": "Scratch for Beginers",
        "active": "true",
        "logo":"scratch.png"
    },
    {
        "name": "Java",
        "active": "true",
        "logo":"java.png"
    },
    {
        "name": "Introduction to Web Design",
        "active": "true",
        "logo":"generic-course.jpg"
    }
];

require('./route-doc')(router.stack, 'express');

module.exports = router;