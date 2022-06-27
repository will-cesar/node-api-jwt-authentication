const mongoose = require('mongoose');

const user = new mongoose.Schema({
    _id : {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false // remove prop from get
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    updatedAt: { 
        type: Date,
        default: Date.now
    }
});

user.pre('save', function(next) {
    this.updatedAt = Date.now();
    return next();
});

module.exports = mongoose.model('User', user);