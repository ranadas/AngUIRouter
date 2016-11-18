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