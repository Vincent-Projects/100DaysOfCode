const Weight = require('./Weight');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);