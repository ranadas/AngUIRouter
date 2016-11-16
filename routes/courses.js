var express = require('express');
var router = express.Router();

var _str = require('underscore.string');
//var _und = require('underscore');
var url = require('url');

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening. Request Body is :');
    console.log(req.body);
    next();
});

/*
 * GET courseList.
 * curl localhost:8088/course/courses
 */
router.get('/courses', function(req, res) {
    console.log("\n\n --> returning courses + " + courseList + "\n");
    res.json(courseList);
});

/**
 * https://webapplog.com/url-parameters-and-routing-in-express-js/
 * GET localhost:8088/course/search?name=python
 */
router.get('/search', function(req, res) {
    var courseSearchName = req.param("name");
    console.log("\t--1:" + JSON.stringify(courseSearchName));
    /*
     req.params
     req.body
     req.query
     */
    var respponse = searchArray(courseSearchName);
    console.log(respponse);
    res.json(respponse);
});

//localhost:8088/course/search/<scr>
//localhost:8088/course/search/<jav>
router.get('/search/:query', function(req, res) {
    var query = req.params.query;
    console.log("query = " + JSON.stringify(query));
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
    console.log("POST: ");
    console.log(req.body);
    courseList.push(req.body);
    console.log("\n --> After adding + " + JSON.stringify(courseList) + "\n");
    res.json("OK");
});

function searchArray(courseSearchName) {
    console.log("\n-->Searching courses containing name " + courseSearchName + "\n");
    if (courseSearchName === undefined) {
        return "Invalid SEARCH TERM";
    }
    var foundArr = courseList.filter(function(element, index) {
        console.log(JSON.stringify(element) + " at index " + index);
        if (_str.include(_str.capitalize(element.name), _str.capitalize(courseSearchName))) {
            console.log("\n- Found : " + JSON.stringify(element));
            return true;
        }
    });

    console.log("\n- Returning Found : " + JSON.stringify(foundArr));
    return foundArr;
}

var courseList = [
    {
        "name": "Programing with Python",
        "active": "true"
    },
    {
        "name": "Introduction to HTML5",
        "active": "true"
    },
    {
        "name": "Scratch for Beginers",
        "active": "true"
    },
    {
        "name": "Java",
        "active": "true"
    },
    {
        "name": "Introduction to Webdesign",
        "active": "true"
    }
];

require('./route-doc')(router.stack, 'express');

module.exports = router;