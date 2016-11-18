'use strict';

// Controller for partial-contact.html
function ContactController(contactsService) {
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
}
