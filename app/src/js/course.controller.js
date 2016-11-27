'use strict';

// Controller for partial-courses.html
function CourseController(courseService) {
    var self = this;
    console.log('in CourseController');

    self.courses = null;
    getCourses();

    //searchCourses("Ja");

    function getCourses() {
        courseService.courses().then(function (courses) {
            self.courses = courses;
        });
    }

    function searchCourses(searchString) {
        courseService.searchByName(searchString).then(function (courses) {
            console.log("\n--* search response for " + searchString + ' is '+JSON.stringify(courses) + ".\n");
            //TODO : self.courses = courses;
        });
    }

    self.submitToAdd = function () {
        var isValid = self.courseForm.$valid;
        self.status = isValid;
        var newUser =  {
            name: self.name,
            active: self.active,
            remarks: self.remarks,
            logo: self.logo
        };

        console.log("isValid " + isValid + '  ' + JSON.stringify(newUser));

        courseService.addNewCourse(newUser).then( function(d){
            console.log('after submit' + d);
        });
    };
}