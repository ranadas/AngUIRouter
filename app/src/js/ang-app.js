'use strict';

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

    searchCourses("Ja");

    function getCourses() {
        courseService.courses().then(function (courses) {
            self.courses = courses;
        });
    }

    function searchCourses(searchString) {
        courseService.searchByName(searchString).then(function (courses) {
            console.log("----\n* " + JSON.stringify(courses) + "\n");
            //TODO : self.courses = courses;
        });
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