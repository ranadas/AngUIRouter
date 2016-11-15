/**
 * Created by rdas on 13/11/2016.
 */
//http://stackoverflow.com/questions/35663922/angular-using-http-without-scope
//http://stackoverflow.com/questions/33641014/getting-data-from-angular-http-without-scope
//http://stackoverflow.com/questions/12505760/processing-http-response-in-service
var contactsModuleVariable = angular.module('contactsModule', []);

contactsModuleVariable.factory('contactsService', ContactService);

// Function used in service
function ContactService($http, $q) {
    var service = {};

    service.contactType = ["ADM", "MNT", "STD"];
    service.allUsers = getAll;
    service.createUser = create;

    function getAll() {
        console.log('Returning all contacts!!');
        return $http.get('/users/userlist').then(handleSuccess, handleError);
    }

    function create(user) {
        return $http.post('/users/add', user).then(handleSuccess, handleError);
    }

    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }

    // important returned object.
    return service;
}

//angular.module('contactsModule').factory('contactsService',[ '$q', '$http', function ($q, $http) {
//contactsModuleVariable.factory('contactsService',[ '$q', '$http', function ($q, $http) {
//        return {
//            contactTypes: ["ADM", "MNT", "STD"],
//
//            allUsers: function () {
//                console.log('2. Service Getting all contacts ');
//                return usersList; // retrurns the static array
//                /*
//                $http({method: 'GET', url: 'http://localhost:8088/users/userlist'}).
//                success(function(data, status, headers, config) {
//                    console.log('3. users: ', data +'   '+ (typeof data));
//                    return data;
//                }).
//                error(function(data, status, headers, config) {
//                    console.log('3x. Oops and error', data);
//                    return data;
//                });
//                */
//                /*
//                //var deferred = $q.defer();
//                var promise = $http.get('http://localhost:8088/users/userlist')
//                    .success(function (response) {
//                        console.log('3. users: ', response +'   '+ (typeof response));
//                        deferred.resolve(response);
//                    });
//                // Return the promise to the controller
//                return deferred.promise;
//                */
//                /*
//                $http.get('/users/userlist')
//                    .then(function successCallaback(response) {
//                            console.log("3. Service returning response :" + JSON.stringify(response.data));
//                            return response.data;
//                        }, function errorCallback(response) {
//                            console.log("Error " + response);
//                        }
//                    );
//                */
//
//            }
//        }
//    }]);
//
//var usersList = [
//    {
//        name: 'Erick Riley',
//        avatar: 'svg-1',
//        bio: 'I have, have together. Day green own divide wherein. Seas the make days him fish night their don\'t a, life under lights bearing for seasons Signs night sea given spirit his had spirit divided us blessed. Brought great waters. Blessed winged doesn\'t a Fly, form bring land, heaven great. Isn\'t upon. Dominion moving day. So first firmament give spirit every.',
//        notes: [
//            {title: "Pay back dinner", date: new Date("2016-01-12")},
//            {title: "Buy flowers for birthday", date: new Date("2016-01-19")}
//        ]
//    },
//    {
//        name: 'Marcia	Higgins',
//        avatar: 'svg-4',
//        bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
//        notes: []
//    },
//    {
//        name: 'Rana Das',
//        avatar: 'svg-4',
//        bio: 'Where to begin'
//
//    }
//];