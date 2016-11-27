const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    course_id:String,
    name: String,
    active: Boolean,
    logo: String,
    remarks: String
});

module.exports = mongoose.model('courses', Course);