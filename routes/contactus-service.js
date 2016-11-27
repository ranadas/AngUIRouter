const express = require('express');
const router = express.Router();

const url = require('url');
const chalk = require('chalk');
const log = console.log;

const mongoose = require('mongoose');
const ContactUs = require('../models/contactus-model');
var cUtils = require('./controller-utility');

// middleware to use for all requests
router.use(function (req, res, next) {
    cUtils.reqLogger(req, res, next);
});

/*
 * GET all questions.
 * curl localhost:8088/contact/allquestions
 */
router.get('/allquestions', function (req, res) {
    getAllQuestions(res);
});

router.post('/save', function (req, res) {
    log(chalk.green("Adding question to list :") + chalk.red(JSON.stringify(req.body)));

    saveAQuestion(req, res);
});

function getAllQuestions(res) {
    log(chalk.green('\n-->Returning all questions from database!\n'));
    ContactUs.find({}, function (err, questions) {
        if (err) {
            log(chalk.red('\n-->ERROR !\n' + err));
            throw err;
        }

        log(chalk.green(questions));
        res.send(questions);
    });
}

function saveAQuestion(req, res) {
//    //TODO : validate before saving.  : {"remarks": "for advenced", "course_id": "01007" }
    log(chalk.green("\n --> Before Adding + " + JSON.stringify(req.body) + "\n"));
//    //var newCourseDocument = new Course({ name: req.body.course.name,  active:true, logo:'generic-course.jpg'});
    var newPost = new ContactUs(req.body);
    log(chalk.blue('\n-->About to save  :' + JSON.stringify(newPost)));

    newPost.save(function (err) {
        if (err) {
            log(chalk.red('\n-->ERROR !\n' + err));
            return err;
        }
        else {
            log(chalk.red('\n-->new Question Save success !\n' + result));

        }
    });
}

require('./route-doc')(router.stack, 'express');

module.exports = router;