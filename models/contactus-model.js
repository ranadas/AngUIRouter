const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactUs = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    asked_question: {type: String, required: true, trim: true},
    created_at: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('sitecontacts', ContactUs);