/**
 * Created by rdas on 15/11/2016.
 */
'use strict';

var courseModVar = angular.module('courseModule', []);
courseModVar.factory('courseService', CourseService);

function CourseService($http, $q) {
    var service = {};

    service.courseType = ["BEGINER", "INTERMEDIATE", "ADVENCED"];
    service.courses = courses;
    service.searchByName = searchCoursesByName;

    function courses() {
        console.log('Returning all courses!!');
        return $http.get('/course/courses').then(handleSuccess, handleError);
    }

    function searchCoursesByName(searchString) {
        console.log('Searching course by name!' + searchString);
        return $http.get('/course/search?name=' + searchString).then(handleSuccess, handleError);
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