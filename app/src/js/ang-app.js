'use strict';
//http://plnkr.co/edit/IzimSVsstarlFviAm7S7?p=preview
var routerApp = angular.module('routerApp', ['ui.router', 'contactsModule', 'courseModule', 'locationModule']);

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

        .state('login', {
            url: '/login',
            templateUrl: 'dist/views/partial-login.html',
            controller: LoginController,
            controllerAs: 'loginCtrl'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'dist/views/partial-register.html',
            controller: RegisterController,
            controllerAs: 'regCtrl'
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


function RegisterController() {
    console.log('in RegisterController');
    var vm = this;

    vm.credentials = {
        name : "",
        email : "",
        password : ""
    };

    vm.onSubmit = function () {
        console.log(' yeah right, registering with '+ JSON.stringify(vm.credentials));
        //authentication
        //    .login(vm.credentials)
        //    .error(function(err){
        //        alert(err);
        //    })
        //    .then(function(){
        //        $location.path('profile');
        //    });
    };
}

function LoginController() {
    console.log('in LoginController');
    var vm = this;

    vm.credentials = {
        email : "",
        password : ""
    };

    vm.onSubmit = function () {
        console.log(' yeah right, log in now with '+ JSON.stringify(vm.credentials));
    }
}