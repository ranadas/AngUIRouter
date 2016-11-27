const express   = require('express');
const router    = express.Router();

const _str      = require('underscore.string');
const url       = require('url');
const chalk     = require('chalk');
const log       = console.log;

const mongoose  = require('mongoose');
const Course    = require('../models/course-model');
var cUtils      = require('./controller-utility');

// middleware to use for all requests
router.use(function (req, res, next) {
    cUtils.reqLogger(req, res, next);
});

/*
 * GET courseList.
 * curl localhost:8088/course/courses
 */
router.get('/courses', function (req, res) {
    searchAll(res);
});

/**
 * https://webapplog.com/url-parameters-and-routing-in-express-js/
 * GET localhost:8088/course/search?name=python
 */
router.get('/search', function (req, res) {
    var courseSearchName = req.param("name");
    log(chalk.blue("\t--1:" + JSON.stringify(courseSearchName)));
    searchByName(courseSearchName, res);
});

//localhost:8088/course/search/<scr>
//localhost:8088/course/search/<jav>
router.get('/search/:query', function (req, res) {
    var query = req.params.query;
    log(chalk.yellow("search query is ") + chalk.blue(JSON.stringify(query)));
    // var query = url.parse(req.url, true).query;
    // console.log("query1 = " + JSON.stringify(query));
    var respponse = searchArray(query);
    res.json(respponse);
});

// TODO
router.get('/cs/:storyId/elements', function (request, response) {
    // Now we automatically get the story in the request object
    // We use story ID to create a new element for that story
    //{ story: request.story, element: newElement}
    res.send("OK");
});

router.post('/save', function (req, res) {
    log(chalk.green("POSTing to add course:") + chalk.red(JSON.stringify(req.body)));
    // TODO validations
    saveCourse(req, res);
});

function searchArray(courseSearchName) {
    log(chalk.red('\n-->Searching courses containing name ', chalk.underline.blue.bgRed.bold(courseSearchName) + '!\n'));

    if (courseSearchName === undefined) {
        return "Invalid SEARCH TERM";
    }
    var foundArr = courseList.filter(function (element, index) {
        log(chalk.yellow.underline(JSON.stringify(element) + " at index " + index));
        if (_str.include(_str.capitalize(element.name), _str.capitalize(courseSearchName))) {
            log(chalk.green("\n- Found : ") + chalk.blue(JSON.stringify(element)));
            return true;
        }
    });
    log(chalk.green('- Returning Found :  %s'), JSON.stringify(foundArr));

    return foundArr;
}

/**
 Post.find({}).sort('test').exec(function(err, docs) { ... });
 Post.find({}).sort({test: 1}).exec(function(err, docs) { ... });
 Post.find({}, null, {sort: {date: 1}}, function(err, docs) { ... });
 Post.find({}, null, {sort: [['date', -1]]}, function(err, docs) { ... });
 */
function searchAll(response) {
    log(chalk.green('\n-->Returning all courses from database!\n'));
    Course.find({}, function (err, courses) {
        if (err) {
            log(chalk.red('\n-->ERROR !\n' + err));
            throw err;
        }

        log(chalk.green(courses));
        response.send(courses);
    });
}

function searchByName(courseSearchName, response) {
    log(chalk.red('\n-->Searching courses containing name ', chalk.underline.blue.bgYellow.bold(courseSearchName) + '!\n'));
    Course.find({'name': new RegExp(courseSearchName, 'i')}, function (err, courses) {
        if (err) {
            log(chalk.red('\n-->ERROR !\n' + err));
            throw err;
        }

        log(chalk.green(courses));
        response.send(courses);
    });
}

function searchByAnyField(courseSearchName, response) {
    //TODO
}

function saveCourse(req, res) {
    //TODO : validate before saving.  : {"remarks": "for advenced", "course_id": "01007" }
    log(chalk.green("\n --> Before Adding + " + JSON.stringify(req.body) + "\n"));
    //var newCourseDocument = new Course({ name: req.body.course.name,  active:true, logo:'generic-course.jpg'});
    //log(chalk.blue('\n-->About to save  :' + JSON.stringify(newCourseDocument)));

    var query = {'name':req.body.name};
    //request.newData.name = req.body.name;
    Course.findOneAndUpdate(query, req.body, {upsert: true},
        function (err, result) {
            if (err) {
                log(chalk.red('\n-->ERROR !\n' + err));
                return res.send(500, {error: err});
            }
            log(chalk.red('\n-->Save success !\n'+ result));
            return res.send(result);
        });


    //var query = {'name': new RegExp(course.name, 'i')},
    //    update = { expire: new Date() },
    //    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    //
    //var result;
    //// Find the document
    //Course.findOneAndUpdate(query, update, options, function(error, result) {
    //    if (error) return;
    //    if (!error) {
    //        // If the document doesn't exist
    //        if (!result) {
    //            // Create it
    //            result = new Model();
    //        }
    //        // Save the document
    //        result.save(function(error) {
    //            if (!error) {
    //                // Do something with the document
    //            } else {
    //                throw error;
    //            }
    //        });
    //    }
    //});
}

require('./route-doc')(router.stack, 'express');

module.exports = router;