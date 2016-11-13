'use strict';

var routerApp = angular.module('routerApp', ['ui.router', 'contactsModule']);


routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'dist/views/partial-home.html'
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
            url: '/about',
            templateUrl: 'dist/views/partial-about.html'

        })

        .state('courses', {
            url: '/courses',
            template: '<b> WIP</b> '
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
    this.contacts =  contactsService.contactType;

    console.log('ContactController' + this.contacts);

    this.getAllUsers = function(){
        return contactsService.allUsers();
    }
}