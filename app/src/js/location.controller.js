'use strict';

// Controller for partial-our-location.html
function LocationController(locationService) {
    var self = this;
    console.log('in LocationController');

    self.sendUserQuestion = function sendQuestion() {

        var newQuestion = {
            name: self.name,
            email: self.email,
            asked_question: self.message
        };

        console.log('sending User Question' + JSON.stringify(newQuestion));

        locationService.sendUserQuestions(newQuestion).then(function (data) {
            console.log('after submit' + data);
            self.name = "";
            self.email = "";
            self.message = "";
        });
    }

}