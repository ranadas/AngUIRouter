'use strict';

var routerApp = angular.module('routerApp', ['ui.router', 'contactsModule']);

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
function ContactController(contactsService, $http) {
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

    //(function getAllUsersSelfExecutingFunc() {
    //    $http.get('/users/userlist')
    //        .then(function successCallaback(response) {
    //                console.log("END in (self ex) : " + JSON.stringify(response.data));
    //                self.allUsrs = response.data;
    //            }, function errorCallback(response) {
    //                console.log("Error " + response);
    //            }
    //        );
    //})();
}