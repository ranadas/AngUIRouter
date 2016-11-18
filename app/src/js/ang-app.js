'use strict';
//http://plnkr.co/edit/IzimSVsstarlFviAm7S7?p=preview
var routerApp = angular.module('routerApp', ['ui.router', 'contactsModule', 'courseModule']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'dist/views/partial-home.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'dist/views/partial-about.html'
        })

        .state('classes', {
            url: '/classes',
            template: '<h2> WIP </h2>'
        })

        .state('download', {
            url: '/download',
            template: '<h2> WIP </h2>'
        })

        .state('location', {
            url: '/location',
            templateUrl: 'dist/views/partial-our-location.html',
            controller: LocationController,
            controllerAs: 'locCtrl'
        })

        .state('courses', {
            url: '/courses',
            templateUrl: 'dist/views/partial-courses.html',
            controller: CourseController,
            controllerAs: 'crsCtrl'
        })

        .state('contacts', {
            url: '/contacts',
            templateUrl: 'dist/views/partial-contact.html',
            controller: ContactController,
            controllerAs: 'cntCtrl'
        })
    ;
});

// Controller for partial-contact.html
function ContactController(contactsService) {
    var self = this;
    self.contacts = contactsService.contactType;

    console.log('ContactController: ' + self.contacts);

    self.users = null;
    getAllServiceUsers();

    function getAllServiceUsers() {
        contactsService.allUsers().then(function (users) {
            self.users = users;
        });
    }
}

// Controller for partial-courses.html
function CourseController(courseService) {
    var self = this;
    console.log('in CourseController');

    self.courses = null;
    getCourses();

    //searchCourses("Ja");

    function getCourses() {
        courseService.courses().then(function (courses) {
            self.courses = courses;
        });
    }

    function searchCourses(searchString) {
        courseService.searchByName(searchString).then(function (courses) {
            console.log("\n--* search response for " + searchString + ' is '+JSON.stringify(courses) + ".\n");
            //TODO : self.courses = courses;
        });
    }

    self.submitToAdd = function () {
        var isValid = self.courseForm.$valid;
        self.status = isValid;
        var newUser =  {
            name: self.coursename,
            active: self.active,
            contents: self.contents
        };

        console.log("isValid " + isValid + '  ' + JSON.stringify(newUser));

        courseService.addNewCourse(newUser).then( function(d){
            console.log('after submit' + d);
        });
    };
}


// Controller for partial-courses.html
function LocationController() {
    var self = this;
    console.log('in LocationController');

    self.sendUserQuestion  = function sendQuestion() {

        var newQuestion =  {
            name: self.ename,
            email: self.email,
            message: self.message
        };

        console.log('sending UserQuestion' + JSON.stringify(newQuestion));
    }

}

routerApp.filter('searchFor', function () {
    console.log('in filter');
    return function (arr, searchString) {
        console.log('in filter with '+ JSON.stringify(arr) + " " + searchString);
        if (!searchString) {
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function (course) {
            if (course.name.toLowerCase().indexOf(searchString) !== -1) {
                result.push(course);
            }
        });
        return result;
    };
});