const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
    uid: String,
    name: String,
    email: String,
    age: Number,
    summary: String,
    userProfession: String,
    apartmentClean: String,
    smoke: String,
    guests: String,
    pets: String,
}, {timestamps: false});

module.exports  = mongoose.model('Users', newUser)
