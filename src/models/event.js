const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EvenModel = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    nbPeoples:{
        type: String,
        required: true
    },
    emailCreator:{
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('EventModel', EventModel);