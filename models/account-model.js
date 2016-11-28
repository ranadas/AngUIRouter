const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
//Additionally Passport-Local Mongoose adds some methods to your Schema.
// no need serializeUser or deserializeUser
//const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: {type: String, required: true, trim: true, unique: true},
    password: String,
    email: {type: String, required: true, trim: true, unique: true},
    gender: {type: String, required: true, trim: true},
    type: {type: String, required: false, trim: true},
    address: {type: String, required: false, trim: true},
    name: {type: String, required: true, trim: true},
    avatar: {type: String, required: false, trim: true},
    bios: {type: String, required: false, trim: true},
    notes: {},
    thumb: {type: String, required: false, trim: true}
});

//Account.plugin(passportLocalMongoose);


module.exports = mongoose.model('accounts', Account);
