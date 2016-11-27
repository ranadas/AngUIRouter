/**
 * Created by rdas on 27/11/2016.
 */
'use strict';

var locationModuleVar = angular.module('locationModule', []);
locationModuleVar.factory('locationService', LocationService);

function LocationService($http, $q) {
    var service = {};

    service.questions = questions;
    service.sendUserQuestions = sendQuestion;

    function questions() {
        console.log('Returning all questions!');
        return $http.get('/contact/allquestions').then(handleSuccess, handleError);
    }

    function sendQuestion(aQuestion) {
        console.log('Sending user question; ' + JSON.stringify(aQuestion));
        //TODO : need validation ??

        return $http.post('/contact/save', aQuestion)
            .success(function (data, status, headers, config) {
                console.log(data.data);
            })
            .error(function (data, status, header, config) {
                console.log(data.data);
            });
    }

    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }

    return service;
}