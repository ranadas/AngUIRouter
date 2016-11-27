const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
//Additionally Passport-Local Mongoose adds some methods to your Schema.
// no need serializeUser or deserializeUser
//const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: String,
    password: String,
    email: String,
    gender: String,
    type: String,
    address: String,
    name: String,
    avatar: String,
    bios: String,
    notes: String,
    thumb: String
});

//Account.plugin(passportLocalMongoose);


module.exports = mongoose.model('accounts', Account);
