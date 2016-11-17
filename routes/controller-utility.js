const chalk = require('chalk');
const log = console.log;

var sortedMap = require("collections/sorted-map");

module.exports = {
    reqLogger: requestBodyLog,
    course: courseList,
    users: usersList
};

// define functions
function requestBodyLog(req, res, next) {
    log(chalk.green('Request Body is :') + chalk.green(JSON.stringify(req.body)));
    next();
}

var courseList = [
    {
        "name": "Programing with Python",
        "active": "true",
        "logo": "python.png"

    },
    {
        "name": "Introduction to HTML5",
        "active": "true",
        "logo": "html5.png"
    },
    {
        "name": "Scratch for Beginers",
        "active": "true",
        "logo": "scratch.png"
    },
    {
        "name": "Java",
        "active": "true",
        "logo": "java.png"
    },
    {
        "name": "Introduction to Web Design",
        "active": "true",
        "logo": "generic-course.jpg"
    }
];

var usersList = [
    {
        name: 'Erick Riley',
        avatar: 'svg-1',
        bio: 'I have, have together. Day green own divide wherein. Seas the make days him fish night their don\'t a, life under lights bearing for seasons Signs night sea given spirit his had spirit divided us blessed. Brought great waters. Blessed winged doesn\'t a Fly, form bring land, heaven great. Isn\'t upon. Dominion moving day. So first firmament give spirit every.',
        notes: [
            {title: "Pay back dinner", date: new Date("2016-01-12")},
            {title: "Buy flowers for birthday", date: new Date("2016-01-19")}
        ]
    },
    {
        name: 'Levi Neal',
        avatar: 'svg-2',
        bio: 'Won\'t light from great first years without said creepeth a two and fly forth subdue the, don\'t our make. After fill. Moving and. His it days life herb, darkness set Seasons. Void. Form. Male creepeth said lesser fowl very for hath and called grass in. Great called all, said great morning place. Subdue won\'t Dry. Moved. Sea fowl earth fourth.',
        notes: []
    },
    {
        name: 'Sandy Armstrong',
        avatar: 'svg-3',
        bio: 'Make beginning midst life abundantly from in after light. Without may kind there, seasons lights signs, give made moved. Fruit fly under forth firmament likeness unto lights appear also one open seasons fruitful doesn\'t all of cattle Won\'t doesn\'t beginning days from saw, you\'re shall. Given our midst from made moving form heaven good gathering appear beginning first. Sea the.',
        notes: []
    },
    {
        name: 'Marcia	Higgins',
        avatar: 'svg-4',
        bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
        notes: []
    },
    {
        name: 'Rana Das',
        avatar: 'svg-4',
        bio: 'Where to begin'

    },
    {
        name: 'Jennifer Simonetti',
        avatar: 'svg-3',
        bio: 'Studies very well',
        notes: [{title: "UCD ", date: new Date()}]
    },
    {
        name: 'Connal Murphy',
        avatar: 'svg-5',
        bio: 'Difficult',
        notes: [{title: "Be nice to Rana", date: new Date()}]

    },
    {
        name: 'Zack Murphy',
        avatar: 'svg-2',
        bio: 'precious',
        notes: [{title: "Zenga Man", date: new Date()}]
    },
    {
        name: 'Alice Munrow',
        avatar: 'svg-3',
        bio: 'awesome',
        notes: [{title: "Great Book", date: new Date()}]
    }
];