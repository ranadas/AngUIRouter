'use strict';

var routerApp = angular.module('routerApp', ['ui.router']);


routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: './app/dist/views/partial-home.html'
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
            url: '/about',
            templateUrl: './app/dist/views/partial-about.html'

        })

        .state('courses' ,{
            url: '/courses',
            template: '<b> WIP</b> '
        })

        .state('contacts' ,{
            url: '/contacts',
            template: '<b> WIP!</b> '
        })
        ;
});