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
    service.addNewCourse = addCourse;

    function courses() {
        console.log('Returning all courses!!');
        return $http.get('/course/courses').then(handleSuccess, handleError);
    }

    function searchCoursesByName(searchString) {
        console.log('Searching course by name!' + searchString);
        return $http.get('/course/search?name=' + searchString).then(handleSuccess, handleError);
    }

    function addCourse(course) {
        console.log('Saving course; ' + JSON.stringify(course));
        //TODO : need validation

        //var config = {
        //    headers : {
        //        'Content-Type': 'application/x-www-form-urlencoded'
        //    }
        //};

        return $http.post('/course/save', course)
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