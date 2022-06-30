const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('UserModel', UserModel);

