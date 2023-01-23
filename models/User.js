const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
    uid: {
        type: String,
        default: null
    },
    name: String,
    email: String,
    password: String,
    age: {
        type: Number,
        default: null
    },
    summary: {
        type: String,
        default: null
    },
    userProfession: {
        type: String,
        default: null
    },
    apartmentClean: {
        type: String,
        default: null
    },
    smoke: {
        type: Boolean,
        default: false
    },
    guests: {
        type: Boolean,
        default: false
    },
    pets: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'user'
    }
}, {timestamps: false});

module.exports  = mongoose.model('User', newUser)
