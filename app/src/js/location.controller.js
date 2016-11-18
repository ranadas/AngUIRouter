'use strict';

// Controller for partial-our-location.html
function LocationController() {
    var self = this;
    console.log('in LocationController');

    self.sendUserQuestion = function sendQuestion() {

        var newQuestion = {
            name: self.ename,
            email: self.email,
            message: self.message
        };

        console.log('sending UserQuestion' + JSON.stringify(newQuestion));
    }

}