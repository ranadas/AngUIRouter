const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    course_id: {type: String, required: true, trim: true},
    name: {type: String, required: true, trim: true},
    active: {type: Boolean, required: true, trim: true, default:false},
    logo: {type: String, required: true, trim: true},
    remarks: {type: String, required: false, trim: true},
    created_at: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('courses', Course);